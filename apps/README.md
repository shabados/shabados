# Shabad OS apps — start here

**These are the platform apps.** Superseded 2026-09-04: they began as scaffolds to
keep the App Store and Play listings alive, and this file said they must not be grown
into the real apps. That no longer holds
([ADR-0014](../docs/architecture/decisions/0014-one-app-three-shells.md)) — one app
across three shells, and **mobile ships first**
([docs/plan.md](../docs/plan.md#step-1-in-detail--mobile)).

So logic added here is no longer a liability to be minimised, and `packages/gurmukhi`
belongs in them rather than being kept out.

**This file is the single copy of anything true of both platforms** — store
identity, ADR status, what's generated and how, bundled-content licensing. Platform
detail — build commands, toolchain traps, and each app's own state of play — is in
[ios/README.md](ios/README.md) and [android/README.md](android/README.md), and
those files point back here rather than restating anything below. If a fact belongs
in both, it gets written once, here.

## Running

```
./apps/build.sh                    # build both, debug
./apps/build.sh ios --run          # build + boot Simulator + install + launch
./apps/build.sh android --run      # same, emulator
```

**Run it from a real terminal, not Claude Code's `!` prefix.** The agent sandbox
only permits writes under the project directory; Gradle needs `~/.gradle` and
`xcrun` needs its own cache, so both fail there. The script detects this and says
so rather than emitting a Java stack trace. It also finds a JDK automatically —
macOS's `/usr/bin/java` is a stub that resolves but does not run, so it falls back
to the JBR bundled with Android Studio.

Pinch in a simulator needs a modifier: **⌥ Option** on iOS, **Ctrl** on the Android
emulator. Two grey circles confirm it.

## What is shared, and how

There is no shared core (ADR-0010 undecided), so anything both apps must agree on
is **generated from one source** rather than written twice:

| Source | Generator | Emits |
| --- | --- | --- |
| `packages/design/tokens.md` | `packages/design/scripts/generate-tokens.mjs` | `DesignTokens.swift`, `DesignTokens.kt`, `values/design_tokens.xml`, `values-night/design_tokens.xml` |
| `packages/design/icons.md` | `packages/design/scripts/generate-icons.mjs` | `AppIcons.swift`, `AppIcons.kt` |
| `database/collections` | `database/scripts/export-bundled-banis.ts` | `banis.json` into both apps |

`apps/build.sh` runs all three, so a stale generated file cannot reach a build. Never
edit the outputs — they are overwritten.

## packages/gurmukhi in the apps

**Pauses, larivaar, and pronunciations all come from `packages/gurmukhi`.** It is Rust
reached over a C ABI, and reimplementing any of it per platform is how two apps end up
disagreeing about the same line — `transcribe` alone is three scripts with
pronunciation rules and hardcoded exceptions.

**Verified working 2026-09-07** on macOS + Apple Silicon: `mise run smoke:swift` builds
all three slices, assembles the xcframework, links against its macOS slice, and passes.

**One command, from a real terminal:**

```
cd packages/gurmukhi && mise run apple
```

That builds the library for macOS, iOS device, and iOS Simulator, generates the Swift
bindings, and assembles `bindings/swift/gurmukhiFFI.xcframework`. `apps/build.sh ios` runs
it when the xcframework is missing. **It cannot run under an agent sandbox** — cargo
needs a writable `~/.cargo` and rustup a writable `~/.rustup`, the same reason Gradle
and `xcrun` fail there.

**Then add the package to the Xcode project once**: File → Add Package Dependencies →
Add Local, and choose `packages/gurmukhi`. After that `import Gurmukhi` works.

**Why an xcframework rather than a plain static library.** iOS device and Simulator are
both arm64, so a fat binary cannot tell them apart; an xcframework keeps the slices
separate and lets Xcode pick. Its macOS slice is also what `mise run smoke:swift`
links, so the dev harness and the shipped app exercise the same artifact — a linking
problem shows up in the smoke test rather than only in Xcode.

**The bindings and the xcframework are build outputs and are not committed.** They are
derived from the Rust source, and committing them would be two sources of truth for
one API. A fresh clone therefore cannot resolve `Package.swift` until the command
above has run.

**Targets are pinned in `packages/gurmukhi/rust-toolchain.toml`**, so rustup installs
them on first build. Adding a platform is a line in that file, not a `rustup target
add` in a README that goes stale.

**Each slice is ~40 MB and that is expected.** An unstripped Rust static archive with
regex, serde and uniffi in it, ~75k symbols. The linker pulls only what is referenced
and dead-strips the rest, so the app binary will be far smaller — **measure it once
the app links, rather than adding `[profile.release]` settings blind.** There is no
`[profile.release]` section in `Cargo.toml` today; the default is in use.

**Android, wired and verified working 2026-09-19**: all four ABIs built and the Kotlin
bindings landed at `uniffi.gurmukhi`, exactly where `build.gradle.kts` looks for them,
on the first real run. One command, from a real terminal, once the NDK itself is
installed:

```
cd packages/gurmukhi && mise run android
```

That cross-compiles the four ABIs Play requires (via `cargo-ndk`) straight into
`apps/android/app/src/main/jniLibs/`, and generates the Kotlin bindings into
`bindings/kotlin/lib/`. `apps/android/app/build.gradle.kts` already points its main
source set at that `lib/` directory and carries the JNA runtime dependency the
generated bindings call into — nothing further to wire up in Gradle. **`apps/build.sh
android` runs it when any output is missing** (2026-10-15): the Kotlin bindings, or
`libgurmukhi.so` for any of the four ABIs. Otherwise it skips the build, so a checkout that
already has them pays only a file check. A change to the Rust is not picked up: rerun
the command above by hand. The one-time NDK install below is still yours to do. The
script cannot, and fails naming what is missing. Without the outputs, Gradle run
directly fails with "Unresolved reference 'uniffi'" throughout `Bani.kt`.

**Needs `cargo-ndk` and the NDK itself, once, before the command above works**:
`cargo install cargo-ndk`, then install an NDK version via Android Studio's SDK
Manager (SDK Tools → NDK) and set `ANDROID_NDK_HOME` to it (e.g.
`$ANDROID_HOME/ndk/<version>`). Neither is installed by default the way Xcode already
carries everything the Apple path needs — this is real one-time setup, not a rerun of
the same command.

**Same reasons as the Apple path apply**: `jniLibs/` and `bindings/kotlin/lib/` are
build outputs, not committed, and `mise run android` cannot run under an agent sandbox
(cargo needs a writable `~/.cargo`, Gradle a writable `~/.gradle`).

## Generators

**The icon generator fails the build on purpose.** An SF Symbol newer than
`IPHONEOS_DEPLOYMENT_TARGET` renders as *nothing* — no error, no placeholder, a blank
button in front of a congregation. Every symbol's minimum iOS version is recorded in
`packages/design/icons.md` (verified against the system symbol database) and compared against
the target read from the project file. It already caught one: `translate` is iOS 17.4
against a 17.0 target, and now carries a fallback. Its *warnings* — a `Use Lucide`
icon with no iOS imageset (which draws blank), Android drawables not yet imported —
are work not done yet, and do not stop a build; the iOS release steps check for them
before archiving.

**Colour/type values mirror `apps/web/src/global.css`**, which is where the palette
was actually designed (in OKLCH, then converted — the `oklch()` comments there are
the provenance). **The web app is not yet generated from `tokens.md`**, so web and
native can still drift. Closing that is the obvious next improvement: store OKLCH as
the source, compute hex in the generator, and emit web's custom properties too.

Decided: **stay sRGB.** Every colour is well inside the gamut, so P3/HDR buys
nothing visible and costs predictability on unknown projector hardware. OKLCH is
valuable for *authoring*, not output.

Bundled content: the 7 Nitnem banis, ~186 KB, and `SantLipi-VF.ttf` v0.35.0
(OFL-1.1-RFN — bundling unmodified is fine; a *modified* build must be renamed).

## Store identity

Both apps use bundle id **`com.shabados.app`**, read from the legacy Expo app at
`../../old/mobile/config/environment/config.latest.ts` (`com.shabados.next.app` was
its beta channel). **Changing it publishes a new app and forfeits the listing** —
this is the single thing most likely to defeat the purpose of the exercise.

Privacy policy <https://www.shabados.com/privacy/>. Both stores get
**no data collected**, which is true: no network, no permissions, no SDKs. Note the
legacy app shipped Sentry *and* PostHog, so this is a real reduction, not a claim to
defend. Telemetry remains undecided (ADR-0007).

Signing, custody, and versions are platform-specific: see
[android/README.md#signing](android/README.md#signing) and
[ios/README.md#signing](ios/README.md#signing). Both apps start production at
`0.3.0`.

## State of play

Both apps build, install, and run. Verified working: reader, Sant Lipi rendering,
light/dark. **Both open to the viewer, with the Journeys sidebar beneath it**
(Android since 2026-10-16): the default screen when nothing is being read, a bar
with the Journeys button, the title in a pill and the Controls button, and no
A−/A+.

### The reading shell on both platforms (2026-10-16)

What iOS built first in the reading shell, and where Android stands on each.
**Same requirement** means the spec applies to both; **own mechanism** means the
behaviour is shared but each platform does it its own way; **iOS only** answers an
iOS or SwiftUI problem Android does not have; **to decide** is not settled.

| Feature | Spec | Android |
| --- | --- | --- |
| Opens to the viewer; default screen ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, with `continue reading` | [reading-shell.md](../docs/requirements/reading-shell.md#the-default-screen) | **Done.** |
| `continue reading` for a daily bani read in the last 8 hours, even after a force close; sehaj paath's 2 weeks not built | [reading-shell.md](../docs/requirements/reading-shell.md#how-long-continue-reading-is-offered) | **Done on both** (2026-10-16). Saved as `lastReadId`/`lastReadAt` on both. |
| Journey ends after 15 minutes without activity, open or in the background; held in memory only | [journeys.md](../docs/requirements/journeys.md#journeys) | **Done.** Process memory: configuration changes keep it, process death is a new journey ([android/README.md](android/README.md#reading-shell)). |
| Journeys sidebar beneath the viewer; 72pt/dp edge returns to it; fades 40% → full at half the slide, zooms 95% → full; as wide in landscape as in portrait | [reading-shell.md](../docs/requirements/reading-shell.md#four-surfaces-one-of-them-always-visible) | **Done.** The amounts are first passes, the same on both. The landscape width is the short side less the peek, plus a left cutout's inset, on both since 2026-10-19 (`Sidebar.travel`, `ReaderShell.travel`). |
| Drag to open and close | [interaction.md](../docs/interaction.md#notes-on-the-rows-that-are-not-obvious) | **Done, own mechanism:** from inside the content only; system Back closes the sidebar. |
| One Journeys icon, unchanged when open; no toggle in the sidebar | [reading-shell.md](../docs/requirements/reading-shell.md#getting-between-them), [icons.md](../packages/design/icons.md) | **Done.** `ic_journeys`, Material Symbol `conversion_path`. |
| Light haptic on opening, none on closing | [interaction.md](../docs/interaction.md#notes-on-the-rows-that-are-not-obvious) | **Done, own mechanism:** `CONTEXT_CLICK`. |
| Viewer's corners follow the display's while it slides | — | **Done, own mechanism:** `WindowInsets.getRoundedCorner`. |
| Sidebar colour: `backgroundBase` | [tokens.md](../packages/design/tokens.md#where-the-two-backgrounds-are-used) | **Done.** No Material You dynamic colour anywhere (decided 2026-10-16). The viewer's controls are `backgroundBase` too; iOS uses glass. |
| Header and sidebar list fade under their bars | [interaction.md](../docs/interaction.md#notes-on-the-rows-that-are-not-obvious) | **Done, own mechanism:** a hand-built `DstIn` mask (`fadingUnder`). |
| Title in a centred pill, inert until its actions exist | [reading-shell.md](../docs/requirements/reading-shell.md#the-viewer) | **Done.** |
| Header has no background; A−/A+ removed | [display-controls.md](../docs/requirements/display-controls.md#zoom) | **Done.** |
| A tapped line scrolls to the top in 0.6s, no overshoot, under a toner highlight held 0.6s and faded over 0.6s; the first row never scrolls | [display-controls.md](../docs/requirements/display-controls.md#tap-a-line) | **Done on both** (2026-11-09). Android: a tween by the row's measured offset. |
| Default-screen pills: Jap Ji Sahib, Rehras Sahib, Kirtan Sohila (Ardas once bundled); greeting `greetingRatio` and pills `pillRatio` × Body | [library.md](../docs/requirements/library.md#base-collections), [tokens.md](../packages/design/tokens.md#type) | **Done.** The ratios are generated tokens on both since 2026-10-16. |
| Interface Gurmukhi at `uiGurmukhiRatio` × Body, `weightPrimary`; Latin at Body | [tokens.md](../packages/design/tokens.md#type) | **Done.** Android's Body is `androidBodySize` sp. |
| Bani list in Gurmukhi only | — | **Done.** |
| Screen held awake while content is read with no sidebar open; released when the journey goes idle | [reading-shell.md](../docs/requirements/reading-shell.md#the-screen-stays-awake-while-content-is-read) | **Done on both** (2026-10-19): `keepsScreenOn` in `ShellState` and `ReaderShell`. |
| Controls: a popover on iOS/iPadOS, a modal bottom sheet on Android; no header; Zoom, Ratio and Weight sliders (continuous, no bylines); a Settings row at the foot that closes Controls first. Settings: a sheet with Appearance (preview, sliders) and Display (Pauses, pronunciations) menus and a Light/Dark/System picker | [reading-shell.md](../docs/requirements/reading-shell.md#controls), [#settings](../docs/requirements/reading-shell.md#settings), [display-controls.md](../docs/requirements/display-controls.md), [ADR-0016](../docs/architecture/decisions/0016-controls-and-the-viewers-bar.md) | **Built on both** (2026-11-09). iOS: `ControlsButton` presents `ControlsPanel`; `SettingsView` in a sheet. Android: `ModalBottomSheet` in `ReaderShell`; `SettingsScreen` (SettingsSheet.kt), a full-screen dialog closed by ✕ or Back. Android's settings are one observable `ReaderControls`, shared by the sheet, reader and theme; iOS shares `@AppStorage` keys. |
| The viewer's bar follows the scroll: at the foot on iPhone, at the top on iPad and Android; hidden with the status bar while reading onward | [reading-shell.md](../docs/requirements/reading-shell.md#the-bars-follow-the-scroll), [interaction.md](../docs/interaction.md#the-system-bars) | **Built on both** (2026-11-09). iOS: `ReaderBars` and `VerticalEdge.viewerBar` in ReaderShell.swift; Android: ReaderBars.kt. |
| Rehras listed without (ਸ:) | — | **Done on both:** it comes from the bundled export. |
| Lucide icons follow Text Size (`ScaledLucide`) | [icons.md](../packages/design/icons.md#lucide-assets) | **To decide.** Android icons are sized in dp and do not follow font scale, which is the platform norm. |
| A tap scrolls to an offset, not a row id | — | **iOS only.** It works around SwiftUI keeping an animated scroll's target. Android scrolls by offset for a different reason: a duration. |
| Sidebar and viewer header built without `NavigationStack`/`List`; viewer moved with `visualEffect` | — | **iOS only.** SwiftUI findings; [ios/README.md](ios/README.md#state-of-play). Android's equivalent, laying the sidebar out at full size and scaling only its drawing, is in [android/README.md](android/README.md#reading-shell). |

**iOS 0.3.0 (72) was submitted to App Store review on 2026-10-11**
([ios/README.md](ios/README.md#state-of-play)).

**`packages/gurmukhi` is wired into the Swift package, added to the Xcode project,
and verified** — see [above](#packagesgurmukhi-in-the-apps). In active use for pause
colouring and both pronunciation schemes.

**Pinch-to-zoom works the same way on both platforms.** Live size changes,
sensitivity 0.75, the anchor row highlighted with toner, and the anchor put back
once on release rather than on every step, which is what removed a severe jitter at
large sizes on iOS ([ios/README.md](ios/README.md#state-of-play)). iOS was verified
on device 2026-10-10; Android was ported 2026-10-14
([android/README.md](android/README.md#reader-size-and-pinch)).

**Reader font size is persisted on both, and starts from the system text setting
once** ([display-controls.md](../docs/requirements/display-controls.md#starting-size)).
Pauses, pronunciations and ratio are persisted on both too, under the same keys
(`pauses`, `pronDevanagari`, `pronLatin`, `ratio`); Android since 2026-10-15.
Android has no Ratio control yet, so it only reads that one. Android also keeps the
open bani and the scroll position across rotation, theme and font size changes; process
death is a new journey, as on iOS ([android/README.md](android/README.md#reader-state-across-recreation)).
iOS keeps the line being read at the top through a rotation (verified on an iPhone
2026-10-15; [ios/README.md](ios/README.md#state-of-play)).

Known limitation: iOS focal zoom is accurate to within **one line height**, because
`scrollTo(_:anchor:)` aligns a row's own anchor with the viewport's and cannot
express "40% into this row at 25% down the screen". Exact positioning needs iOS 18's
`ScrollPosition` with offsets — **now available**: the deployment target moved to
**26.0** on 2026-09-02 ([interaction.md](../docs/interaction.md#platform-targets)),
so this is fixable rather than a constraint.

## Toolchain traps

Every Android build failure in this project's history was two independently
versioned pieces disagreeing. iOS has none of this because Apple ships compiler,
SDK, and build system as one versioned unit.

- **AGP declares a minimum Gradle version and enforces it by number**, regardless of
  which APIs it uses. AGP 9.2.1 requires Gradle **≥ 9.4.1**. Inspecting jars for
  missing Gradle classes looks like it should answer this and does not — let the
  sync report the minimum.
- **`libs.versions.toml`'s `kotlin` must equal the Kotlin that AGP embeds.** AGP
  9.2.1's POM depends on `kotlin-gradle-plugin:2.2.10`, so the Compose compiler
  plugin is 2.2.10. Read it from the POM; do not use the latest Kotlin release.
- **No `kotlin-android` plugin.** AGP 9 has Kotlin built in and rejects it. It also
  removed `kotlinOptions` from the android extension with no replacement — Kotlin
  follows `compileOptions`.
- **`compileSdk` is inferred** from the newest installed platform, because minor SDK
  releases exist: `android-36.1` is a different directory from `android-36`, and a
  literal `compileSdk = 36` fails. `targetSdk` is pinned — it changes runtime
  behaviour and must not depend on the build machine.

Two Android Studio suggestions are **deliberately declined**; see
[android/README.md](android/README.md) before actioning either.
