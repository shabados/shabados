# Mobile scaffolds — start here

**These are the platform apps.** Superseded 2026-09-04: they began as scaffolds to
keep the App Store and Play listings alive, and this file said they must not be grown
into the real apps. That no longer holds
([ADR-0014](../docs/architecture/decisions/0014-one-app-three-shells.md)) — one app
across three shells, and **mobile ships first**
([docs/plan.md](../docs/plan.md#step-1-in-detail--mobile)).

So logic added here is no longer a liability to be minimised, and `packages/gurmukhi`
belongs in them rather than being kept out.

Platform detail is in [ios/README.md](ios/README.md) and
[android/README.md](android/README.md). This file is the shared story.

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
| `brand/tokens.md` | `brand/scripts/generate-tokens.mjs` | `DesignTokens.swift`, `DesignTokens.kt`, `values/design_tokens.xml`, `values-night/design_tokens.xml` |
| `brand/icons.json` | `brand/scripts/generate-icons.mjs` | `AppIcons.swift`, `AppIcons.kt` |
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
bindings, and assembles `bindings/swift/gurmukhiFFI.xcframework`. `apps/build.sh` runs
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

**Android is not wired up yet.** It needs `cargo-ndk`, an `.so` per ABI, and JNA as a
runtime dependency — independent problems, deliberately left until the iOS path is
proven.

## Generators

**The icon generator fails the build on purpose.** An SF Symbol newer than
`IPHONEOS_DEPLOYMENT_TARGET` renders as *nothing* — no error, no placeholder, a blank
button in front of a congregation. Every symbol's minimum iOS version is recorded in
`brand/icons.json` (verified against the system symbol database) and compared against
the target read from the project file. It already caught one: `translate` is iOS 17.4
against a 17.0 target, and now carries a fallback. Its two *warnings* — Android
drawables not yet imported, Material Symbols names unverified — are work not done
yet, and do not stop a build.

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

Still outstanding before submission, on both: **signing/team**, and **bumping the
version** — `versionCode 1` / `MARKETING_VERSION 0.1.0` are below what is live and
will be rejected on upload.

## State of play

Both apps build, install, and run. Verified working: bani list, reader, Sant Lipi
rendering, light/dark, A−/A+ sizing.

**`packages/gurmukhi` is wired into the Swift package and verified** — see
[above](#packagesgurmukhi-in-the-apps). Not yet added to the Xcode project.

**Unverified — written but never run:** focal-point pinch-to-zoom on both platforms
(the most recent work). Watch for: whether the point under your fingers stays put,
and on Android whether the anchor row lands where expected or jumps to the top.

Known inconsistency to resolve: **iOS persists reader font size** (`@AppStorage`)
and **Android does not** (in-memory). Neither is obviously wrong but they should
agree — likely persist on both, since an operator who sets a comfortable size should
not have to redo it.

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
