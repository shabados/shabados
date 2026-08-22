#!/bin/sh
# Rebuild the variable font, copy it where the web app can see it, and focus
# Glyphs. Safe to re-run on every iteration. Run ./start.sh once beforehand to
# bring up the web server and a browser tab.
set -eu

cd "$(dirname "$0")"

SOURCE="sources/SantLipiFlex.glyphs"
BUILD="build/variable"
WEB_FONTS="${WEB_FONTS:-../../apps/web/public/fonts}"
# fontmake names output after the source's familyName, but the web app loads a
# fixed path — so copy over that name. git restore undoes it.
WEB_FONT_NAME="${WEB_FONT_NAME:-SantLipi-VF.woff2}"

if ! command -v uv >/dev/null 2>&1; then
  echo "uv is not installed. Install it with one of:" >&2
  echo "  curl -LsSf https://astral.sh/uv/install.sh | sh" >&2
  echo "  brew install uv" >&2
  exit 1
fi

# no-op in well under a second once the environment matches uv.lock
uv sync --quiet

uv run make var

# hand the fresh font to the web app, overwriting the font it already loads
font=$(ls "$BUILD"/*.woff2 2>/dev/null | head -n 1)
if [ -z "$font" ]; then
  echo "no .woff2 in $BUILD" >&2
  exit 1
fi
if [ -d "$WEB_FONTS" ]; then
  cp "$font" "$WEB_FONTS/$WEB_FONT_NAME"
  echo "copied $(basename "$font") -> $WEB_FONTS/$WEB_FONT_NAME"
else
  echo "warning: $WEB_FONTS does not exist, skipping copy" >&2
fi

# Opening the file by type lets macOS pick whichever Glyphs version is
# installed. Already open? This just focuses it.
case "$(uname)" in
Darwin) open "$SOURCE" ;;
*) echo "note: Glyphs is macOS only, skipping" >&2 ;;
esac
