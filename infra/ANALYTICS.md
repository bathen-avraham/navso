# Analytics — Umami self-hosted on the shared EC2

navso.tech (and any future site) gets free, privacy-first analytics via
**Umami v2.20.2** running on the same EC2 as the rest of the projects.
No cookies, no consent banner, all data stays on your box.

## Where to look

| What | URL / Path |
|---|---|
| Dashboard | `https://analytics.navso.tech` |
| Default login | `admin` / `umami` (**change immediately on first login**) |
| Tracker script | `https://analytics.navso.tech/script.js` |
| Tracking endpoint | `https://analytics.navso.tech/api/send` (called by the script) |

## Production setup (on the EC2)

| What | Value |
|---|---|
| Project dir | `/home/ec2-user/umami/` (cloned from `umami-software/umami` @ `v2.20.2`) |
| systemd unit | `umami.service` |
| Port | `3001` (localhost only; nginx fronts it) |
| Database | local PostgreSQL 16, DB `umami`, owner `umami` |
| Env file | `/home/ec2-user/umami/.env` (`DATABASE_URL`, `APP_SECRET`, `PORT`, `HOSTNAME`, `DISABLE_TELEMETRY`) — chmod 600 |
| nginx conf | `/etc/nginx/conf.d/analytics-navso.conf` (reverse-proxies `analytics.navso.tech` → `127.0.0.1:3001`) |
| TLS | Let's Encrypt (`/etc/letsencrypt/live/analytics.navso.tech/`) — auto-renewed |
| Website ID for navso | `8ca9d5df-e6ab-4618-a1a5-aa0be3f1e8a0` |

The Umami app is wired into navso via one line in `index.html`:

```html
<script defer src="https://analytics.navso.tech/script.js"
        data-website-id="8ca9d5df-e6ab-4618-a1a5-aa0be3f1e8a0"></script>
```

Pageviews, referrers, devices, countries, sessions are tracked
**automatically** once the tag is on the page. SPA route changes are
also tracked automatically (Umami listens to the History API).

---

## Tracking button clicks ("what they press")

Umami doesn't track clicks automatically — you opt in per element with
a single attribute. Two ways:

### 1. Static — `data-umami-event` attribute

Add to any element (button, link, etc.):

```html
<button data-umami-event="contact-clicked">צור קשר</button>
<a href="https://wa.me/972..." data-umami-event="whatsapp-clicked">WhatsApp</a>
```

The event fires on click. Use stable, descriptive names — they appear
verbatim in the dashboard's Events tab.

### 2. Programmatic — `umami.track(...)`

For events that aren't a click (form submit, scroll milestone, etc.):

```ts
declare global { interface Window { umami?: { track: (event: string, data?: object) => void } } }

window.umami?.track('lesson-form-submitted', { subject: 'lashon' });
```

The optional second arg is a small JSON object — useful for breaking
down events by attribute (e.g. which lesson type was selected).

**Pick a handful of important interactions** rather than instrumenting
every button — too many events make the dashboard noisy.

---

## First-login checklist

After visiting `https://analytics.navso.tech` for the first time:

1. Log in with `admin` / `umami`.
2. Top-right avatar → **Profile** → **Change password**. Use a real one.
3. **Settings → Websites** → confirm `navso.tech` is listed.
4. **Websites → navso.tech → Edit** → copy/verify the script tag (the
   `data-website-id` value should match what's in `navso/index.html`).

---

## Operations

```bash
# Service control
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 'sudo systemctl status umami'
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 'sudo systemctl restart umami'

# Logs (tail)
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 'sudo journalctl -u umami -f'

# Database (Postgres) shell
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 'sudo -u postgres psql umami'

# Backup the DB (one-shot dump)
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 \
  'sudo -u postgres pg_dump umami | gzip' > umami-backup-$(date +%F).sql.gz

# Restore (overwrites current DB — be careful)
gunzip -c umami-backup-YYYY-MM-DD.sql.gz | \
  ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 \
  'sudo -u postgres psql umami'
```

### Upgrading Umami

```bash
ssh -i ../mashkanta-key.pem ec2-user@16.164.44.127 'bash -s' <<'REMOTE'
set -euo pipefail
cd /home/ec2-user/umami
sudo systemctl stop umami
git fetch --tags
NEW_TAG=$(git tag -l 'v2.*' --sort=-v:refname | head -1)
git checkout "$NEW_TAG"
npm install --legacy-peer-deps --no-audit --no-fund
NEXT_TELEMETRY_DISABLED=1 npm run build
sudo systemctl start umami
echo "Upgraded to $NEW_TAG"
REMOTE
```

Stay on the v2.x line — v3 has peer-dep issues with React 19 that break
the build (verified during initial setup, 2026-05-09).

---

## Troubleshooting

### Dashboard shows zero visits even though the site is live
- Check the page source in a browser: the `<script defer src="...analytics.navso.tech/script.js" ...>` tag must be in `<head>`. If missing, redeploy navso (script is in `navso/index.html`).
- Open DevTools → Network → filter "send" — every pageview should POST to `https://analytics.navso.tech/api/send`. If those fail with CORS or 403, check `client_max_body_size` and CORS in `analytics-navso.conf`.
- **Self-traffic is filtered if you're logged into Umami in the same browser** — open the site in incognito to test, or log out of Umami first.
- Ad blockers (uBlock, Brave shields) sometimes block self-hosted analytics by hostname. Test in a clean browser.

### `502 Bad Gateway` from analytics.navso.tech
- Umami service down. `sudo systemctl status umami` and `sudo journalctl -u umami -n 50`.
- Most common cause: Postgres restart killed Umami. Service has `Wants=postgresql.service` so it'll come back; if it didn't, just restart it.

### After Postgres restart, Umami throws `Can't reach database server`
- Postgres might be slow to come up. `sudo systemctl restart umami` after Postgres is fully ready.
- The systemd unit has `Restart=on-failure` so it auto-recovers within ~5s anyway.

### Build fails on upgrade with `eresolve`
- Use `npm install --legacy-peer-deps --no-audit --no-fund`. Umami v2 has a `react ^19` declaration but several peer deps still want `^18`. The `--legacy-peer-deps` resolver picks the right tree.

### Default admin password still `umami`
- Login → Profile → Change password. **Do this before exposing the dashboard publicly.**

---

## What's NOT included

- **Session recordings / heatmaps** — Umami v2 self-host doesn't record sessions. If you want to *watch* what people do, add **Microsoft Clarity** alongside (free, ~5 min, requires a small consent notice because it records).
- **Cookie consent banner** — Umami is cookieless and doesn't need one. If you later add Clarity or any cookie-based tool, you'll need a banner.
- **Email reports / alerts** — not in Umami. Possible via the API + a cron, or upgrade to Umami Cloud.
- **A/B testing** — not in Umami. Use a separate tool (PostHog, Optimizely).

---

## Re-running the bootstrap (disaster recovery)

If the EC2 is wiped, reproducing this setup means:

1. Bootstrap Postgres: `sudo postgresql-setup --initdb && sudo systemctl enable --now postgresql`. Set local-socket auth to `peer` in `/var/lib/pgsql/data/pg_hba.conf`.
2. Create role + DB:
   ```sql
   CREATE ROLE umami WITH LOGIN PASSWORD '<random>';
   CREATE DATABASE umami OWNER umami;
   ```
3. Clone + build:
   ```bash
   git clone --depth=1 --branch v2.20.2 https://github.com/umami-software/umami.git /home/ec2-user/umami
   ```
   Write `/home/ec2-user/umami/.env` with `DATABASE_URL`, `APP_SECRET`, `PORT=3001`, `HOSTNAME=127.0.0.1`, `DISABLE_TELEMETRY=1`.
   Then `npm install --legacy-peer-deps && npm run build`.
4. systemd unit at `/etc/systemd/system/umami.service` (see live unit on the box for the exact contents).
5. nginx conf at `/etc/nginx/conf.d/analytics-navso.conf` (copy of `infra/nginx-analytics.conf` from this repo).
6. DNS A record `analytics → 16.164.44.127`.
7. `sudo certbot --nginx --redirect -d analytics.navso.tech`.
8. Add `data-umami-event` attributes to any buttons you want to track in `navso/src/...`.
9. `bash infra/deploy.sh` to redeploy with the tracking script.

Total time from a fresh EC2: ~30 min (most of it the npm install + Next.js build).
