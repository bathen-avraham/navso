#!/usr/bin/env bash
# ----------------------------------------------------------------------------
# navso.tech — fully automated deploy to the shared production EC2 instance.
#
# What it does:
#   1. Pre-flight: checks SSH key, project layout, connectivity.
#   2. Build locally: npm install (if needed) + npm run build → ./dist
#   3. Sync dist via tar-over-ssh into /home/ec2-user/navso/releases/<ts>/.
#   4. Atomic swap: ln -sfn the "current" symlink to the new release.
#   5. Prune old releases (keep last 3) so disk doesn't fill up.
#   6. Smoke-test http(s)://navso.tech.
#
# What it WILL NOT touch:
#   - mashkanta or fairpick files / services / nginx confs.
#   - nginx config or TLS certs (those are bootstrap-only — see DEPLOY.md).
#   - Anything outside /home/ec2-user/navso/ on the box.
#
# No sudo is needed — the deploy hot path runs entirely as ec2-user.
#
# Usage (run from navso/ — i.e. the dir with package.json):
#   bash infra/deploy.sh                       # use defaults below
#   EC2_HOST=1.2.3.4 bash infra/deploy.sh      # override target host
#   SKIP_BUILD=1     bash infra/deploy.sh      # reuse existing ./dist
#
# Tested on Git Bash (Windows). Linux/macOS should also work.
# ----------------------------------------------------------------------------

set -euo pipefail

# --- Config (overridable via env) ------------------------------------------- #

EC2_HOST="${EC2_HOST:-16.164.44.127}"
EC2_USER="${EC2_USER:-ec2-user}"
SSH_KEY="${SSH_KEY:-../mashkanta-key.pem}"
DOMAIN="${DOMAIN:-navso.tech}"
PROJECT_DIR="${PROJECT_DIR:-/home/ec2-user/navso}"
SKIP_BUILD="${SKIP_BUILD:-0}"

SSH_OPTS="-i $SSH_KEY -o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new"

# --- Output helpers --------------------------------------------------------- #

if [ -t 1 ]; then
  C_BLUE=$'\033[1;34m'; C_GREEN=$'\033[1;32m'; C_YELLOW=$'\033[1;33m'
  C_RED=$'\033[1;31m'; C_DIM=$'\033[2m'; C_RESET=$'\033[0m'
else
  C_BLUE=""; C_GREEN=""; C_YELLOW=""; C_RED=""; C_DIM=""; C_RESET=""
fi

step() { printf '\n%s==> %s%s\n' "$C_BLUE" "$1" "$C_RESET"; }
ok()   { printf '%s    ✓ %s%s\n' "$C_GREEN" "$1" "$C_RESET"; }
warn() { printf '%s    ! %s%s\n' "$C_YELLOW" "$1" "$C_RESET"; }
die()  { printf '%s!! %s%s\n' "$C_RED" "$1" "$C_RESET" >&2; exit 1; }

# --- Pre-flight ------------------------------------------------------------- #

step "Pre-flight checks"

[ -f "package.json" ] || die "Run this from navso/ (no package.json here)."
[ -f "$SSH_KEY" ]     || die "SSH key not found at: $SSH_KEY (set SSH_KEY=...)"

ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" 'echo ok' >/dev/null 2>&1 \
  || die "Cannot SSH to $EC2_USER@$EC2_HOST (host reachable? key valid?)"
ok "SSH connection ok ($EC2_USER@$EC2_HOST)"

ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" "test -d $PROJECT_DIR/releases" \
  || die "Remote releases dir $PROJECT_DIR/releases is missing. Run the bootstrap from infra/DEPLOY.md first."
ok "Remote releases dir exists ($PROJECT_DIR/releases)"

# --- Phase 1: build --------------------------------------------------------- #

if [ "$SKIP_BUILD" = "1" ]; then
  step "Phase 1 — Build (skipped, SKIP_BUILD=1)"
  [ -d dist ] || die "SKIP_BUILD=1 but ./dist does not exist."
  ok "Reusing existing ./dist"
else
  step "Phase 1 — Build (npm run build)"
  if [ ! -d node_modules ]; then
    echo "    node_modules missing, running npm install..."
    npm install --no-audit --no-fund 2>&1 | tail -3
  fi
  npm run build 2>&1 | tail -8
  [ -f dist/index.html ] || die "Build did not produce dist/index.html"
  ok "Build complete"
fi

# --- Phase 2: ship dist to a fresh release dir ----------------------------- #

step "Phase 2 — Ship dist/ to remote release dir"

RELEASE_NAME="$(date -u +%Y%m%d-%H%M%S)"
REMOTE_RELEASE="$PROJECT_DIR/releases/$RELEASE_NAME"

ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" "mkdir -p '$REMOTE_RELEASE'"

tar -C dist -cf - . \
  | ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" "tar -xf - -C '$REMOTE_RELEASE'"
ok "Uploaded to $REMOTE_RELEASE"

# --- Phase 3: atomic swap + prune ------------------------------------------ #

step "Phase 3 — Atomic symlink swap + prune old releases"

ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" \
  REMOTE_RELEASE="$REMOTE_RELEASE" \
  PROJECT_DIR="$PROJECT_DIR" \
  'bash -s' <<'REMOTE_SWAP'
set -euo pipefail

# Atomic-ish swap via a temp link + mv -T (rename(2) on Linux is atomic).
TMP_LINK="$PROJECT_DIR/current.new"
ln -sfn "$REMOTE_RELEASE" "$TMP_LINK"
mv -Tf "$TMP_LINK" "$PROJECT_DIR/current"

# Keep only the last 3 release dirs (and never delete the live one).
LIVE="$(basename "$(readlink "$PROJECT_DIR/current")")"
cd "$PROJECT_DIR/releases"
ls -1tr | head -n -3 | while read -r old; do
  if [ -n "$old" ] && [ "$old" != "$LIVE" ]; then
    rm -rf -- "$old"
    echo "    pruned $old"
  fi
done
REMOTE_SWAP
ok "Live → $REMOTE_RELEASE"

# --- Phase 4: smoke test ---------------------------------------------------- #

step "Phase 4 — Smoke test"

# Try HTTPS first, fall back to HTTP if certbot hasn't run yet.
if HTTP_CODE=$(curl -sS -o /dev/null -w '%{http_code}' "https://$DOMAIN/" 2>/dev/null) && [ "$HTTP_CODE" = "200" ]; then
  ok "https://$DOMAIN/ → 200"
elif HTTP_CODE=$(curl -sS -o /dev/null -w '%{http_code}' "http://$DOMAIN/" 2>/dev/null) && [ "$HTTP_CODE" = "200" ]; then
  warn "Site is up on http (no TLS yet) → 200. Run certbot per DEPLOY.md to enable HTTPS."
else
  warn "Smoke test could not reach $DOMAIN (DNS may not point at $EC2_HOST yet, or nginx not configured)."
fi

# --- Done ------------------------------------------------------------------- #

printf '\n%s🟢 Deploy complete:%s https://%s\n' "$C_GREEN" "$C_RESET" "$DOMAIN"
