#!/bin/sh
# One-time setup for a font iteration session: start the web app's dev server
# and open a single browser tab pointed at it. Leave this running, then use
# ./dev.sh to rebuild as you work.
set -eu

cd "$(dirname "$0")"

REPO="${REPO:-../..}"
WORKSPACE="${WORKSPACE:-apps/web}"
URL="${URL:-http://localhost:5173}"
BROWSER="${BROWSER:-Google Chrome}"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Install Node.js from https://nodejs.org" >&2
  exit 1
fi

if [ ! -d "$REPO/$WORKSPACE" ]; then
  echo "no workspace at $REPO/$WORKSPACE" >&2
  exit 1
fi

# workspaces hoist to the repo root, so install there rather than in the app
if [ ! -d "$REPO/node_modules" ]; then
  echo "installing dependencies (first run only)…"
  npm install --prefix "$REPO"
fi

# build the font once up front so the page has something to render
./dev.sh

# Wait for the server to answer, then open exactly one tab. Runs in the
# background because the server below holds the foreground.
(
  while ! curl -sSf -o /dev/null "$URL" 2>/dev/null; do
    sleep 1
  done
  case "$(uname)" in
  Darwin) open -a "$BROWSER" "$URL" 2>/dev/null || open "$URL" ;;
  *) xdg-open "$URL" >/dev/null 2>&1 || true ;;
  esac
  echo
  echo "  ready — $URL is open"
  echo "  leave this running. in another terminal, run ./dev.sh after each"
  echo "  change in Glyphs, then reload the tab."
  echo
) &

echo "starting $WORKSPACE — ctrl+c to stop"
cd "$REPO"
exec npm run dev --workspace "$WORKSPACE"
