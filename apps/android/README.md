# Shabad OS — Android

A deliberately minimal Nitnem reader. Its purpose is to keep the Play listing
current while the real app is designed; it is **not** the target architecture.

```
./apps/build.sh android --run  # build, boot an emulator, install, launch
./apps/build.sh android        # build only
```

`--run` installs to an already-attached device if there is one (a plugged-in phone
counts), otherwise boots the first AVD and waits for `sys.boot_completed` before
installing — `adb wait-for-device` returns well before the launcher is up, and
installing that early fails.

The SDK now has `platform-tools`, `emulator`, a `Medium_Phone` AVD, and an
`android-37.1` system image, so `--run` has everything it needs. What is still
missing is the Gradle wrapper — open the project in Android Studio once. The script
fails with a specific message per missing piece rather than a Gradle stack trace.

Not a bun workspace member — same as `apps/presenter`. Root `bun install` does not
touch it.

## Store identity

| | |
| --- | --- |
| Application id | `com.shabados.app` |
| Display name | Shabad OS |
| Icon | `brand/assets/lotus.svg`, via the legacy app's 1024px export |
| Privacy policy | <https://www.shabados.com/privacy/> |
| Data safety | **No data collected** — no permissions, no network, no SDKs |

`com.shabados.app` was read from the legacy Expo app
(`config/environment/config.latest.ts`); `com.shabados.next.app` was its beta
channel. Changing it publishes a *new* app and forfeits the listing.

Note the legacy app shipped **Sentry and PostHog**; this one ships neither, so the
data-safety answers are a genuine reduction rather than a claim to defend.
Telemetry remains undecided
([ADR-0007](../../docs/architecture/decisions/0007-telemetry.md)).

## Before submitting — still outstanding

1. **Signing config** — release builds are unsigned as written.
2. **Bump `versionCode`/`versionName`** past the published listing; `1` / `0.1.0`
   here will be rejected as lower than what is live.
3. **A proper adaptive-icon foreground.** The current one insets the square 1024px
   icon into the safe zone over an approximated gradient, which works but has a
   faint seam. The right fix is a transparent-background lotus exported from
   `brand/assets/lotus.svg`. Play also wants a separate 512×512 listing icon.
4. **Confirm `targetSdk 36` is still current** — Play's target-API requirement is
   the actual deprecation pressure here.

## Deliberately absent

- **`packages/gurmukhi`**, so no transliteration. Consuming it needs NDK
  cross-compilation for four ABIs — real FFI plumbing that this scaffold does not
  need in order to publish.
- **A shared core.** [ADR-0010](../../docs/architecture/decisions/0010-shared-core-across-platforms.md)
  is Needs discussion; building one now would settle it by implementation.
- **ProGuard/R8 shrinking.** There is nothing to shrink, and an unverified
  ProGuard config is how you ship a release build that crashes where debug does not.

## Content

`app/src/main/assets/banis.json` is generated — regenerate with
`bun run database:export-bundled` from `database/`. Never hand-edit it; scripture
corrections go through the database component's citation-backed review.

`SantLipi-VF.ttf` is `v0.35.0`, downloaded unmodified from the SantLipi releases and
matching this repo's font source version. OFL-1.1-RFN: bundling unmodified is fine,
but the Reserved Font Name means any modified build must be renamed.

## Status

Gradle sync **succeeds** (2026-09-01, Android Studio Quail, AGP 9.2.1 + Gradle
9.4.1). `gradlew` and the wrapper jar are generated and checked in, so
`./apps/build.sh android --run` works without Android Studio.

Not yet confirmed: that the APK assembles and runs on the emulator. Sync validates
configuration and compiles nothing.

**Two Android Studio suggestions are deliberately declined.** Do not action them
without reading this first:

- **AGP Upgrade Assistant.** Upgrading AGP requires updating `kotlin` in
  `libs.versions.toml` to whatever Kotlin the new AGP embeds (read
  `kotlin-gradle-plugin` from its POM), because that value is the Compose compiler
  plugin version. The Assistant does not know this and will leave the catalog
  inconsistent. There is also no benefit here: this project exists to keep the
  store listings current, not to track AGP.
- **Migrate to Gradle Daemon toolchain.** Reasonable in principle — Studio and
  `apps/build.sh` both run Gradle, and this stops them spawning separate daemons.
  Deferred because both already use Studio's bundled JBR, so it fixes nothing today
  while adding toolchain criteria and a possible JVM download.

## Versions: inferred where possible, pinned where it matters

`compileSdk` is **not hardcoded**. `app/build.gradle.kts` reads the SDK path from
`local.properties`/`ANDROID_HOME` and picks the newest installed platform, so the
project builds on any machine and survives an SDK update without an edit. This
matters because minor SDK releases exist: the platform here is `android-36.1`, and a
literal `compileSdk = 36` resolves to `platforms/android-36`, which is not installed.

`targetSdk` **is** pinned. It changes runtime behaviour, so inferring it would make
the shipped APK depend on which machine built it.

Jetpack Compose and Material 3, declared through a version catalog
(`gradle/libs.versions.toml`) — the layout Android Studio's wizard generates and
what [developer.android.com/develop/ui](https://developer.android.com/develop/ui)
recommends.

**No `kotlin-android` plugin.** AGP 9 has Kotlin built in and rejects it outright;
`org.jetbrains.kotlin.plugin.compose` is the only Kotlin plugin applied.

**`libs.versions.toml`'s `kotlin` must equal the Kotlin that AGP embeds**, not the
latest release. AGP 9.2.1's POM depends on `kotlin-gradle-plugin:2.2.10`, so the
Compose compiler plugin is pinned to 2.2.10 and the Compose BOM is from the same era
(2025.10.01). Bumping `kotlin` past AGP's own is a compile-time failure.

JSON is parsed with `org.json` from the platform rather than kotlinx-serialization,
which would add a dependency and a second Kotlin-versioned plugin for about twenty
lines of parsing.

**AGP declares a minimum Gradle version, and enforces it.** AGP 9.2.1 requires
Gradle **≥ 9.4.1**, which is what `gradle/wrapper/gradle-wrapper.properties` pins.
Android Studio installed 9.3.0 by default, which no AGP 9.x accepts.

Do not try to infer this from the jars. Checking whether an AGP release references
newer Gradle APIs (`org/gradle/features/binding/*`) looks like it should answer the
question and does not — AGP compares version numbers and refuses regardless. When
changing `agp` in the catalog, let the sync report the minimum.

The Gradle wrapper **is** checked in, pinned to 9.4.1. `apps/build.sh` prefers it
and falls back to system `gradle` only if it goes missing.
