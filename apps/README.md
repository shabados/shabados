# Mobile scaffolds — start here

`apps/ios` and `apps/android` exist to **keep the App Store and Play listings
alive**. The accounts and app names are lost if nothing ships. They are throwaway:
not the Phase 3 platform apps, and they must not be grown into them
([docs/plan.md](../docs/plan.md)). When ADR-0010 lands, the real apps are built
against the frozen core API.

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
| `brand/tokens.json` | `brand/scripts/generate-tokens.mjs` | `DesignTokens.swift`, `DesignTokens.kt`, `values/design_tokens.xml`, `values-night/design_tokens.xml` |
| `brand/icons.json` | `brand/scripts/generate-icons.mjs` | `AppIcons.swift`, `AppIcons.kt` |
| `database/collections` | `database/scripts/export-bundled-banis.ts` | `banis.json` into both apps |

`apps/build.sh` runs all three, so a stale generated file cannot reach a build. Never
edit the outputs — they are overwritten.

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
the provenance). **The web app is not yet generated from `tokens.json`**, so web and
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
