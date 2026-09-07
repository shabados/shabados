#!/usr/bin/env bash
#
# Build — and optionally run — the mobile scaffolds.
#
#   ./apps/build.sh                    # build both, debug
#   ./apps/build.sh ios                # build iOS only
#   ./apps/build.sh ios --run          # build, then launch in the Simulator
#   ./apps/build.sh android --run      # build, then launch in an emulator
#   ./apps/build.sh android release    # release APK
#
# Deliberately plain: no Fastlane, no CI harness, no signing automation. This
# exists so a build is one command, not so it becomes a pipeline.
set -euo pipefail

TARGET="both"
CONFIG="debug"
RUN=0

for arg in "$@"; do
  case "$arg" in
    ios | android | both) TARGET="$arg" ;;
    debug | release) CONFIG="$arg" ;;
    --run | -r) RUN=1 ;;
    -h | --help)
      sed -n '2,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "unknown argument: $arg" >&2
      echo "usage: $(basename "$0") [ios|android|both] [debug|release] [--run]" >&2
      exit 2
      ;;
  esac
done

APPS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$APPS_DIR")"
BUNDLE_ID="com.shabados.app"

log() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
die() { printf '\033[31merror:\033[0m %s\n' "$*" >&2; exit 1; }

if [[ "$RUN" == 1 && "$CONFIG" == "release" ]]; then
  die "--run builds unsigned debug artifacts; release needs signing and a real device or store upload"
fi

# The bundled corpus is generated, not authored. Regenerate when missing so a fresh
# clone builds, rather than failing deep inside Xcode or Gradle with a confusing
# missing-asset error.
ensure_assets() {
  local ios_json="$APPS_DIR/ios/ShabadOS/Resources/banis.json"
  local android_json="$APPS_DIR/android/app/src/main/assets/banis.json"

  [[ -f "$ios_json" && -f "$android_json" ]] && return

  log "Bundled corpus missing — regenerating"
  command -v bun >/dev/null \
    || die "bun not found, and banis.json is missing. Install bun (see mise.toml), then: cd database && bun run database:export-bundled"
  ( cd "$REPO_DIR/database" && bun run database:export-bundled )
}

# packages/gurmukhi is Rust reached over a C ABI: pauses, larivaar, and pronunciations
# all come from it, and reimplementing them per platform is how two apps end up
# disagreeing about the same line. Built when missing rather than every time -- unlike
# the token and icon generators this is a full cargo build, and the first one fetches
# the crate registry.
ensure_gurmukhi() {
  local pkg="$REPO_DIR/packages/gurmukhi"
  local xcf="$pkg/bindings/swift/gurmukhiFFI.xcframework"

  [[ -d "$xcf" ]] && return

  log "gurmukhi bindings missing -- building"
  command -v mise >/dev/null \
    || die "mise not found, and the gurmukhi bindings are missing. Install mise, then: cd packages/gurmukhi && mise run apple"
  # Needs a writable ~/.cargo and ~/.rustup, so this cannot run under an agent
  # sandbox. The message says so rather than surfacing a rustup download error.
  ( cd "$pkg" && mise run apple ) \
    || die "gurmukhi build failed. If this ran inside an agent sandbox, run it from a real terminal: cd packages/gurmukhi && mise run apple"
}

# Colour and type live in brand/tokens.md and are generated into both apps, so a
# design change cannot land on one platform only. Regenerated every build — it takes
# milliseconds, and a stale token file is worse than the cost of rerunning.
ensure_tokens() {
  command -v node >/dev/null \
    || die "node not found — needed to generate design tokens from brand/tokens.md"
  node "$REPO_DIR/brand/scripts/generate-tokens.mjs" >/dev/null
}

# Icons live in brand/icons.json for the same reason colours do, plus one of its own:
# an SF Symbol newer than the deployment target renders as NOTHING, with no error. The
# generator checks every symbol against IPHONEOS_DEPLOYMENT_TARGET and exits non-zero,
# so a blank button cannot reach a build. Its warnings (unimported Android drawables,
# unverified Material Symbols names) are left visible rather than silenced.
ensure_icons() {
  command -v node >/dev/null \
    || die "node not found — needed to generate icon mappings from brand/icons.json"
  node "$REPO_DIR/brand/scripts/generate-icons.mjs" >/dev/null \
    || die "icon generation failed — see the errors above"
}

# ---------------------------------------------------------------- iOS

ios_simulator_udid() {
  # First available iPhone. Parsed from the text listing rather than the JSON one
  # so this needs no JSON tool; the UDID is the only 36-char hex-and-dash field.
  xcrun simctl list devices available \
    | sed -n 's/.*iPhone.*(\([0-9A-F-]\{36\}\)).*/\1/p' \
    | head -1
}

build_ios() {
  command -v xcodebuild >/dev/null || die "xcodebuild not found — install Xcode"

  local configuration="Debug"
  [[ "$CONFIG" == "release" ]] && configuration="Release"

  local destination="generic/platform=iOS Simulator"
  local udid=""

  if [[ "$RUN" == 1 ]]; then
    udid="$(ios_simulator_udid)"
    [[ -n "$udid" ]] || die "no available iPhone simulator — add one in Xcode > Settings > Components"
    destination="id=$udid"

    log "Booting simulator $udid"
    # Already-booted is not an error worth stopping for.
    xcrun simctl boot "$udid" 2>/dev/null || true
    open -a Simulator
  fi

  log "iOS ($configuration)"
  # CODE_SIGNING_ALLOWED=NO keeps this runnable on a machine with no signing
  # identity. Archiving for the App Store is a separate, deliberate Xcode step.
  xcodebuild \
    -project "$APPS_DIR/ios/ShabadOS.xcodeproj" \
    -scheme ShabadOS \
    -configuration "$configuration" \
    -destination "$destination" \
    -derivedDataPath "$APPS_DIR/ios/build" \
    CODE_SIGNING_ALLOWED=NO \
    build

  if [[ "$RUN" == 1 ]]; then
    local app="$APPS_DIR/ios/build/Build/Products/${configuration}-iphonesimulator/ShabadOS.app"
    [[ -d "$app" ]] || die "built app not found at $app"

    log "Installing and launching"
    xcrun simctl install "$udid" "$app"
    xcrun simctl launch "$udid" "$BUNDLE_ID"
  fi
}

# ------------------------------------------------------------ Android

android_sdk() {
  local sdk="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Library/Android/sdk}}"
  # An empty sdk/ directory gets created early in an Android Studio install, so
  # test for a real component rather than for the directory.
  [[ -d "$sdk/platforms" ]] || return 1
  printf '%s' "$sdk"
}

# macOS ships a /usr/bin/java stub that resolves on PATH but fails to run when no
# JDK is installed, so `command -v java` is not a sufficient test — it has to be
# executed. Android Studio bundles a JBR, which is what Studio itself builds with,
# so preferring it also keeps CLI and IDE on the same JVM.
ensure_java() {
  if [[ -n "${JAVA_HOME:-}" && -x "$JAVA_HOME/bin/java" ]]; then
    return
  fi
  if java -version >/dev/null 2>&1; then
    return
  fi

  local candidate
  for candidate in \
    "/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
    "$HOME/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
    "/Applications/Android Studio Preview.app/Contents/jbr/Contents/Home"; do
    if [[ -x "$candidate/bin/java" ]]; then
      export JAVA_HOME="$candidate"
      echo "note: using the JDK bundled with Android Studio ($candidate)" >&2
      return
    fi
  done

  die "no JDK found — set JAVA_HOME, or install Android Studio (its bundled JBR is used automatically)"
}

build_android() {
  local dir="$APPS_DIR/android"
  local gradle

  ensure_java

  # Gradle writes its distributions and caches to GRADLE_USER_HOME. Agent sandboxes
  # commonly deny writes outside the project directory, which surfaces as a Java
  # FileSystemException on a .lck file — unreadable unless you already know why.
  local gradle_home="${GRADLE_USER_HOME:-$HOME/.gradle}"
  if ! mkdir -p "$gradle_home" 2>/dev/null || ! touch "$gradle_home/.write-probe" 2>/dev/null; then
    die "cannot write to $gradle_home.
       Gradle needs a writable home. If you are running inside a sandboxed shell
       (Claude Code's ! prefix, for instance), run this from a normal terminal —
       or set GRADLE_USER_HOME to a writable directory."
  fi
  rm -f "$gradle_home/.write-probe"

  android_sdk >/dev/null \
    || die "no usable Android SDK (looked for platforms/ under \$ANDROID_HOME or ~/Library/Android/sdk). Install via Android Studio > SDK Manager."

  if [[ -x "$dir/gradlew" ]]; then
    gradle="$dir/gradlew"
  elif command -v gradle >/dev/null; then
    gradle="gradle"
    echo "note: no Gradle wrapper checked in; using system gradle." >&2
    echo "      run 'gradle wrapper' in apps/android to pin a version." >&2
  else
    die "no gradlew and no system gradle — install Gradle, or open apps/android in Android Studio once to generate the wrapper"
  fi

  local task="assembleDebug"
  [[ "$CONFIG" == "release" ]] && task="assembleRelease"

  log "Android ($task)"
  ( cd "$dir" && "$gradle" "$task" )

  [[ "$RUN" == 1 ]] || return 0

  local sdk adb emu
  sdk="$(android_sdk)"
  adb="$sdk/platform-tools/adb"
  emu="$sdk/emulator/emulator"
  [[ -x "$adb" ]] \
    || die "adb not found at $adb — install 'Android SDK Platform-Tools' in Android Studio > SDK Manager > SDK Tools"

  # Boot an emulator only if nothing is already attached (a plugged-in phone counts).
  if ! "$adb" devices | awk 'NR>1 && $2=="device" {found=1} END {exit !found}'; then
    [[ -x "$emu" ]] || die "no device attached and no emulator installed at $emu"
    local avd
    avd="$("$emu" -list-avds | head -1)"
    [[ -n "$avd" ]] || die "no AVD defined — create one in Android Studio > Device Manager"

    log "Starting emulator $avd"
    "$emu" -avd "$avd" >/dev/null 2>&1 &
    "$adb" wait-for-device
    # wait-for-device returns as soon as adb connects, which is well before the
    # launcher is up; installing that early fails.
    until [[ "$("$adb" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do
      sleep 2
    done
  fi

  local apk="$dir/app/build/outputs/apk/debug/app-debug.apk"
  [[ -f "$apk" ]] || die "built APK not found at $apk"

  log "Installing and launching"
  "$adb" install -r "$apk"
  # applicationId is com.shabados.app; the activity class lives in the
  # com.shabados.android namespace. Both halves are needed.
  "$adb" shell am start -n "$BUNDLE_ID/com.shabados.android.MainActivity"
}

# ---------------------------------------------------------------- main

ensure_assets
ensure_tokens
ensure_icons
ensure_gurmukhi

case "$TARGET" in
  ios) build_ios ;;
  android) build_android ;;
  both)
    # Android first: it fails faster and its errors are easier to read than a
    # 200-line xcodebuild dump.
    build_android
    build_ios
    ;;
esac

log "Done"
if [[ "$RUN" != 1 ]]; then
  if [[ "$TARGET" != "android" ]]; then
    echo "  iOS:     apps/ios/build/Build/Products/"
  fi
  if [[ "$TARGET" != "ios" ]]; then
    echo "  Android: apps/android/app/build/outputs/apk/"
  fi
fi
