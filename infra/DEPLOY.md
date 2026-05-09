# Deploy navso.tech to the shared EC2

This document captures the actual deploy that landed `https://navso.tech`
on the shared EC2 instance that already hosts `mashkanta.igal-web.com`
and `fairpick.igal-web.com`. Each project gets its own nginx server
block and its own files dir under `/home/ec2-user/<project>/`.

The site is **static** (Vite build → `dist/`), so there's no systemd
unit, no Node runtime on the box, no API. nginx serves the files
directly with an SPA fallback for client-side routes.

## Production target

| What | Value |
|---|---|
| Domain | `navso.tech` (and `www.navso.tech` via CNAME → apex) |
| Elastic IP | `16.164.44.127` |
| Region | `il-central-1c` |
| Instance | `i-0e206021a68c93a94` (t3.small, Amazon Linux 2023) — shared with mashkanta + fairpick |
| Key | `mashkanta-key.pem` (lives one level up in `peronProjects/navso_site/`) |
| App user | `ec2-user` |
| Releases | `/home/ec2-user/navso/releases/<UTC-timestamp>/` |
| Live root | `/home/ec2-user/navso/current` (symlink → latest release) |
| nginx conf | `/etc/nginx/conf.d/navso.conf` |
| TLS | Let's Encrypt (`/etc/letsencrypt/live/navso.tech/`) — auto-renewed by `certbot-renew.timer` |

## Redeploying — one command

Once bootstrap (below) has run, every subsequent deploy is one command from
your laptop, run from `navso_site/navso/`:

```bash
bash infra/deploy.sh
```

What it does:

1. Pre-flight: SSH key exists, can connect, releases dir exists on box.
2. Build locally: `npm install` (if needed) + `npm run build` → `./dist`.
3. tar `./dist` over ssh into a new `/home/ec2-user/navso/releases/<timestamp>/` dir.
4. `ln -sfn` swap of `/home/ec2-user/navso/current` to the new release (atomic).
5. Prune old releases (keeps last 3).
6. Smoke-test `https://navso.tech`.

The hot path runs entirely as `ec2-user` — no `sudo`, no nginx reload.
The script only touches `/home/ec2-user/navso/` and nothing else; mashkanta
and fairpick are unaffected.

Override the target via env vars (rare):

```bash
EC2_HOST=1.2.3.4 SSH_KEY=~/.ssh/other.pem bash infra/deploy.sh
SKIP_BUILD=1 bash infra/deploy.sh    # reuse existing ./dist (no build)
```

---

## One-time bootstrap

You only run these once. After this, `bash infra/deploy.sh` does everything.
**This was already executed on `16.164.44.127` on 2026-05-09** — these steps
are documented for re-bootstrapping a fresh box, or rebuilding the existing
one if anything is wiped.

### Step 0 — DNS

`navso.tech` and `www.navso.tech` must resolve to `16.164.44.127`. At GoDaddy:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `16.164.44.127` | 1 Hour |
| `CNAME` | `www` | `navso.tech.` | 1 Hour |

Verify from your laptop:

```bash
nslookup navso.tech 8.8.8.8
nslookup www.navso.tech 8.8.8.8
# Both should show 16.164.44.127
```

### Step 1 — `.pem` perms on Windows

OpenSSH refuses overly-permissive keys. From PowerShell:

```powershell
icacls "C:\Users\user\Desktop\peronProjects\navso_site\mashkanta-key.pem" /inheritance:r
icacls "C:\Users\user\Desktop\peronProjects\navso_site\mashkanta-key.pem" /grant:r "${env:USERNAME}:R"
```

(If `chmod 400 mashkanta-key.pem` already worked for the mashkanta deploy on
this same machine, this is already done.)

### Step 2 — Project dirs on EC2

```bash
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 \
  'mkdir -p /home/ec2-user/navso/releases'
```

### Step 3 — Install nginx config

From `navso_site/navso/`:

```bash
scp -i ../mashkanta-key.pem infra/nginx-navso.conf \
    ec2-user@16.164.44.127:/tmp/navso.conf

ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 \
    'sudo mv /tmp/navso.conf /etc/nginx/conf.d/navso.conf && \
     sudo chown root:root /etc/nginx/conf.d/navso.conf && \
     sudo chmod 644 /etc/nginx/conf.d/navso.conf && \
     sudo nginx -t && sudo systemctl reload nginx'
```

If `nginx -t` fails, **do not reload** — fix the config first. A bad
reload would not impact mashkanta or fairpick (their server blocks are
independent), but the navso block would be ignored.

### Step 4 — First deploy (HTTP only)

```bash
cd navso_site/navso
bash infra/deploy.sh
```

The smoke test will warn that TLS isn't set up yet — that's expected. Visit
`http://navso.tech/` to confirm the site renders.

### Step 5 — TLS via Let's Encrypt

`certbot` and `certbot-renew.timer` are already installed and active on
the box (mashkanta + fairpick use them). On the EC2:

```bash
sudo certbot --nginx --non-interactive --agree-tos \
    -m igalk1515@gmail.com --redirect \
    -d navso.tech -d www.navso.tech
```

certbot edits `/etc/nginx/conf.d/navso.conf` in place, adding:
- 443 server block with `ssl_certificate` directives.
- HTTP→HTTPS 301 redirect (because of `--redirect`).

### Step 6 — Add security headers

certbot doesn't add HSTS / X-Frame-Options / etc. — match the mashkanta
convention by replacing the conf with the full version (see
`infra/nginx-navso.conf` plus the certbot-managed bits, exactly as it
exists on the box now). Then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Verify:

```bash
curl -sI https://navso.tech/ | grep -iE "strict-transport|x-frame|x-content-type|referrer-policy"
```

Should show all four headers.

### Step 7 — End-to-end verify

```bash
DOMAIN=navso.tech

curl -sI https://$DOMAIN/ | head -1                 # → HTTP/1.1 200 OK
curl -sI http://$DOMAIN/ | head -1                  # → HTTP/1.1 301 Moved Permanently
curl -sI https://$DOMAIN/some/spa/route | head -1   # → HTTP/1.1 200 (SPA fallback)
curl -sI https://www.$DOMAIN/ | head -1             # → HTTP/1.1 200 OK

# Check the cert
echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null \
  | openssl x509 -noout -subject -dates

# Confirm nothing else broke
curl -sS https://mashkanta.igal-web.com/health
curl -sI https://fairpick.igal-web.com/ | head -1
```

---

## Operations

```bash
# Redeploy after a local code change
bash infra/deploy.sh

# Reuse existing dist/ (skip the build step)
SKIP_BUILD=1 bash infra/deploy.sh

# nginx logs (run on the box)
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# List releases
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 \
  'ls -1t /home/ec2-user/navso/releases'

# Manual rollback to a previous release (run on the box)
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127
ls -1t /home/ec2-user/navso/releases    # pick the one before the current
ln -sfn /home/ec2-user/navso/releases/<timestamp> /home/ec2-user/navso/current.new
mv -Tf /home/ec2-user/navso/current.new /home/ec2-user/navso/current
# No nginx reload needed — symlink swap is atomic and nginx re-resolves on each request.

# Force-renew TLS (rare — the timer handles this automatically)
sudo certbot renew --force-renewal
```

---

## Topology on the shared box

```
                  ┌──────────────────────────────────────────────┐
   Internet ─────▶│  nginx :80, :443 (Let's Encrypt TLS)         │
                  │  /etc/nginx/conf.d/{mashkanta,fairpick,navso}│
                  └─┬────────────────┬───────────────┬───────────┘
                    │ navso.tech     │ fairpick.igal │ mashkanta.igal
                    ▼                ▼               ▼
           static dir              static dir +     uvicorn :8000 +
           /home/ec2-user/         Express :8001    Next.js :3000
           navso/current
```

Each server block lives in its own `/etc/nginx/conf.d/<project>.conf` —
edits to one don't touch the others.

---

## Troubleshooting

### "Cannot SSH to ec2-user@16.164.44.127"
- The .pem perms aren't right (see Step 1) — OpenSSH will silently refuse.
- Security group only allows SSH from a specific IP. If you've moved
  networks, update inbound rules → SSH.

### certbot fails with "DNS problem: NXDOMAIN" or "Connection refused"
- DNS isn't pointing at `16.164.44.127`. Check
  `nslookup navso.tech 8.8.8.8`.

### Site loads at `/` but `/<route>` returns 404
- nginx isn't doing the SPA fallback. Confirm `location /` in
  `/etc/nginx/conf.d/navso.conf` has `try_files $uri $uri/ /index.html;`
  and reload nginx.

### Old version of the site still showing after deploy
- Browser cached `index.html`. Hard-refresh (Ctrl+Shift+R) or use
  incognito. Hashed asset filenames prevent stale JS/CSS; the only
  thing the browser caches at the top is `/`.

### Symlink swap left a broken state
- Manually point `current` at any release dir:
  ```bash
  ssh ... ec2-user@16.164.44.127
  ln -sfn /home/ec2-user/navso/releases/<good> /home/ec2-user/navso/current.new
  mv -Tf /home/ec2-user/navso/current.new /home/ec2-user/navso/current
  ```

### Disk filling up over many deploys
- The script keeps the last 3 releases. To prune more aggressively:
  ```bash
  ssh ... ec2-user@16.164.44.127
  cd /home/ec2-user/navso/releases
  ls -1tr | head -n -3 | xargs -r rm -rf
  ```

---

## What this deploy does NOT include

- Docker / containers — same convention as mashkanta and fairpick: native.
- A backend / API — navso is a static SPA. If you add an API later, run it
  on a port that's free (8001 is fairpick, 8000 is mashkanta, 3000 is the
  mashkanta Next.js app), and add a `location /api/ { proxy_pass ... }`
  block to `navso.conf`.
- CI/CD — deploys are manual from your laptop. If you want GitHub Actions
  to run `deploy.sh` on push, add an SSH deploy key to the box and store
  it as a GitHub secret.
