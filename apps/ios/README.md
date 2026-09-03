# Shabad OS — iOS

A deliberately minimal Nitnem reader. Its purpose is to keep the App Store listing
current while the real app is designed; it is **not** the target architecture.

```
./apps/build.sh ios --run      # build, boot a Simulator, install, launch
./apps/build.sh ios            # build only
open apps/ios/ShabadOS.xcodeproj   # then ⌘R
```

`--run` picks the first available iPhone simulator, boots it, opens Simulator.app,
then installs and launches. Nothing is published or signed — it is a local preview.

No package manager, no dependencies, no network, no permissions, no telemetry.
Sources are picked up by a file-system-synchronized group, so adding a `.swift`
file under `ShabadOS/` needs no project edit.

## Store identity

| | |
| --- | --- |
| Bundle id | `com.shabados.app` |
| Display name | Shabad OS |
| Icon | `brand/assets/lotus.svg`, via the legacy app's 1024px export |
| Privacy policy | <https://www.shabados.com/privacy/> |
| App Privacy | **Data Not Collected** — true: no network, no SDKs |

`com.shabados.app` was read from the legacy Expo app
(`config/environment/config.latest.ts`); `com.shabados.next.app` was its beta
channel. Changing the bundle id publishes a *new* app and forfeits the listing.

Note the legacy app shipped **Sentry and PostHog**; this one ships neither, so the
privacy answers are a genuine reduction rather than a claim to defend. Telemetry
remains undecided ([ADR-0007](../../docs/architecture/decisions/0007-telemetry.md)).

## Before submitting — still outstanding

1. **Set the team and signing** in Xcode (Signing & Capabilities). The build script
   passes `CODE_SIGNING_ALLOWED=NO` and targets the simulator, so it does not need
   signing; archiving for the store does.
2. **Bump `MARKETING_VERSION`** past whatever the existing listing shows — it is
   `0.1.0` here, which is almost certainly lower than the published version and
   will be rejected on upload.

## Deliberately absent

- **`packages/gurmukhi`**, so no transliteration. Consuming it needs an XCFramework
  built for device + simulator, which is real FFI plumbing that this scaffold does
  not need in order to pass review. Add it when there is a reason to.
- **A shared core.** [ADR-0010](../../docs/architecture/decisions/0010-shared-core-across-platforms.md)
  is Needs discussion — core scope, language, and whether bindings are generated are
  all undecided. Building one now would settle those by implementation.
- **`NSLocalNetworkUsageDescription`.** Connect will need it
  ([ADR-0011](../../docs/architecture/decisions/0011-distribution-channels.md)), but
  declaring a permission before a feature uses it invites review questions.

## Content

`ShabadOS/Resources/banis.json` is generated — regenerate with
`bun run database:export-bundled` from `database/`. Never hand-edit it; scripture
corrections go through the database component's citation-backed review.

`SantLipi-VF.ttf` is `v0.35.0`, downloaded unmodified from the SantLipi releases and
matching this repo's font source version. OFL-1.1-RFN: bundling unmodified is fine,
but the Reserved Font Name means any modified build must be renamed.

## Not verified

The project file and its shared scheme were hand-written and **have not been
compiled** — `xcrun` cannot write its cache under the authoring environment's
sandbox, so no build was run. If Xcode refuses to open `ShabadOS.xcodeproj`, or
`xcodebuild -scheme ShabadOS` reports no such scheme, those are the two likely
failure points and both are small files to correct.
