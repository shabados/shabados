# Shabad OS — iOS

**This is the platform app.** It began 2026-09-01 as a store-retention scaffold —
just enough to keep the App Store listing current while the real app was designed.
**Superseded 2026-09-04**: one app across three shells, mobile ships first
([ADR-0014](../../docs/architecture/decisions/0014-one-app-three-shells.md),
[plan.md](../../docs/plan.md#step-1-in-detail--mobile)). Logic added here is no
longer a liability to be minimised, and `packages/gurmukhi` belongs in it rather
than being kept out.

See [`apps/README.md`](../README.md) for what both platforms share and how it is
generated. This file is iOS-specific.

```
./apps/build.sh ios --run      # build, boot a Simulator, install, launch
./apps/build.sh ios            # build only
open apps/ios/ShabadOS.xcodeproj   # then ⌘R
```

`--run` picks the first available iPhone simulator, boots it, opens Simulator.app,
then installs and launches. Nothing is published or signed — it is a local preview.
**Run it from a real terminal, not Claude Code's `!` prefix** — `xcrun` needs a
cache it cannot write inside the agent sandbox.

No package manager beyond Swift Package Manager (for the local `packages/gurmukhi`
dependency), no network, no permissions, no telemetry. Sources are picked up by a
file-system-synchronized group, so adding a `.swift` file under `ShabadOS/` needs no
project edit.

## Store identity

| | |
| --- | --- |
| Bundle id | `com.shabados.app` |
| Display name | Shabad OS |
| Icon | `brand/assets/lotus.svg`, via the legacy app's 1024px export |
| App Privacy | **Data Not Collected** — true: no network, no SDKs |

Where the bundle id came from, why changing it forfeits the listing, the
Sentry/PostHog reduction, and telemetry's ADR status are the same on both platforms
— see [`apps/README.md#store-identity`](../README.md#store-identity).

## Before submitting — still outstanding

Same two items as [`apps/README.md`](../README.md#store-identity) on both
platforms. The iOS mechanics:

1. **Set the team and signing** in Xcode (Signing & Capabilities). The build script
   passes `CODE_SIGNING_ALLOWED=NO` and targets the simulator, so it does not need
   signing; archiving for the store does.
2. **Bump `MARKETING_VERSION`** past whatever the existing listing shows — it is
   `0.1.0` here, which is almost certainly lower than the published version and
   will be rejected on upload.

## `packages/gurmukhi` in this app

**Wired in and in active use** — pause colouring and both pronunciation schemes go
through it, not a local reimplementation. See `Bani.swift` (`detect`/`remove` for
vishraam ranges) and `Transliteration` (`transcribe`, cached per line/scheme, only
computed on demand). The Xcode project already carries a local Swift package
reference to `../../packages/gurmukhi` — nothing further to add there.

Building it is not part of `./apps/build.sh` yet when the xcframework is missing;
see [`apps/README.md`](../README.md#packagesgurmukhi-in-the-apps) for the
`mise run apple` command and why it cannot run inside an agent sandbox.

## Scope

**Step 1** ([plan.md](../../docs/plan.md#step-1-in-detail--mobile)) is: the reader
in Classic, Saral, and Reader modes; the full Variorum; zoom, ratio, weight; tabs
and journeys; the Library; bookmarks, tracking, and goals; the Tracker.
Search, Presenter mode, presets, the year in review, and anything networked are out
for now.

**Built so far:** a flat bani list, one reader mode (not yet Classic/Saral/Reader —
[reading-shell.md](../../docs/requirements/reading-shell.md) is not yet read against
this view), pause colouring (on by default), both pronunciation schemes as toggles
(off by default, per the Variorum defaults), the Ratio control, and font sizing by
toolbar buttons or a two-finger pinch that holds the line under your fingers in
place. Font size persists across launches (`@AppStorage`); pause and pronunciation
toggles live in a menu stand-in for the Controls sidebar
([reading-shell.md](../../docs/requirements/reading-shell.md#the-controls-sidebar)),
which does not exist yet and should be deleted once that surface lands.

**Not yet built:** tabs and journeys, the Library, bookmarks, tracking, goals, the
Tracker, and the mode/weight controls.

## Deliberately absent

- **A shared core** — no session/search/navigation core on any platform yet
  ([ADR-0010](../../docs/architecture/decisions/0010-shared-core-across-platforms.md)
  Needs discussion; see [`apps/README.md`](../README.md#what-is-shared-and-how)).
  This app talks to `packages/gurmukhi` directly.
- **`NSLocalNetworkUsageDescription`.** Connect will need it
  ([ADR-0011](../../docs/architecture/decisions/0011-distribution-channels.md), also
  Needs discussion), but declaring a permission before a feature uses it invites
  review questions.

Neither ADR blocks Step 1 — mobile's in-scope list above has no networking and no
shared core in it. Don't build against either ADR's options ahead of a decision.

## Content

`ShabadOS/Resources/banis.json` is generated — regenerate with
`bun run database:export-bundled` from `database/`. Never hand-edit it; scripture
corrections go through the database component's citation-backed review process.

Font version, licensing, and the rest of what's bundled and why:
[`apps/README.md#generators`](../README.md#generators).

## State of play

**Verified working (2026-09-07):** builds, installs, and runs in Simulator. Bani
list, reader, Sant Lipi rendering, light/dark, pause colouring, both pronunciation
schemes, toolbar A−/A+ sizing.

**Unverified — written but never run:** focal-point pinch-to-zoom (the most recent
work). Watch for whether the point under your fingers stays put during the gesture.

**Known limitation:** focal zoom is accurate to within **one line height**, because
`scrollTo(_:anchor:)` aligns a row's own anchor with the viewport's and cannot
express "40% into this row at 25% down the screen". Exact positioning needs iOS 18's
`ScrollPosition` with offsets — available at this app's deployment target (26.0,
[interaction.md](../../docs/interaction.md#platform-targets)) but not yet used.

**Known inconsistency to resolve:** this app persists reader font size
(`@AppStorage`); Android does not (in-memory only). Neither is obviously wrong but
they should agree — likely persist on both, since an operator who sets a comfortable
size should not have to redo it.
