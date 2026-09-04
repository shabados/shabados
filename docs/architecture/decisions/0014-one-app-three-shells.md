# 14. One app, three shells

2026-09-04 · **Accepted**

## Context

`plan.md` Phase 3 previously listed four platform apps — Electron desktop, iOS,
Android, Web — as one parallel stream, and treated them as separate products sharing
a core. Two things were wrong with that.

**There is no "reader" and no "presenter". There is Shabad OS.** The personal
practice features specified in
[journeys.md](../../requirements/journeys.md) and
[library.md](../../requirements/library.md), and the operator features in
[navigation.md](../../requirements/navigation.md) and
[connect.md](../../requirements/connect.md), belong to one app on every platform.
Someone who learns it in one place must be confident they can do the same things
elsewhere.

**Four platform UIs is more surface than this project can carry.** CLAUDE.md's
horizon is twenty years, maintained by agents rather than a team, and every
additional renderer is another thing that must keep working.

## Decision

**One app. Three shells.**

| Shell | Covers |
| --- | --- |
| **Swift / SwiftUI** | iOS, iPadOS, macOS, tvOS |
| **Kotlin / Compose** | Android — phone, tablet, Android TV |
| **Web** | Windows Store (WebView2 shell), Flatpak (WebKitGTK shell), and a browser |

**The web codebase is an implementation strategy, not a distribution one.** Windows
and Linux users install an app from the channel they expect — Store, Flatpak — which
happens to be web technology inside an OS-provided webview. Nobody is asked to
install a PWA from a browser. The browser build is the same codebase without a native
host.

**macOS is SwiftUI multiplatform, not Catalyst**, because the menu bar, window
management, and keyboard handling are where the operator features live and where
Catalyst is weakest.

**Every action has a focusable target, and the D-pad is the design constraint**
([reading-shell.md](../../requirements/reading-shell.md#input)). Six inputs — up,
down, left, right, select, back — is the tightest budget any supported platform
imposes, and anything satisfying it works with keyboard, gamepad, pointer, and touch.
Gestures and shortcuts are accelerators over the focusable route.

**Feature parity is the target; interaction parity is not.** How an action is reached
differs by input model, and [interaction.md](../../interaction.md) is organised by
input rather than by platform for exactly that reason.

**The web server is core, not an enhancement.** A browser page cannot host one today;
every other target can. Treat the browser as "not implementable yet" rather than "out
of scope".

**TV builds are hosts, not displays.** A small TV box on a gurdwara's HDMI can serve
the display and be controlled from the devices already in the room — a portable setup
where nobody surrenders their personal device.

## Consequences

- **Electron is gone.** No bundled Chromium per platform, no `electron-updater`, no
  Node in the shipped product, and the webview is patched by the OS rather than by a
  release. **CLAUDE.md's "no native Node modules" constraint becomes obsolete** and
  should be removed.
- **Most of [ADR-0011](0011-distribution-channels.md) is obsolete.** Its three
  problems — the runtime database overwrite of the app's own bundle, `electron-updater`,
  and custom theme folders at arbitrary paths — are Electron-shaped. A native shell
  around a webview has ordinary file access, and the store channels manage updates
  themselves. **ADR-0011 needs revisiting against this**; it is not superseded
  wholesale, because its sandbox analysis still applies to where the corpus lives.
- **[ADR-0010](0010-shared-core-across-platforms.md) becomes urgent rather than
  deferrable.** Three shells rendering one feature set is precisely the situation
  where a shared core stops three implementations diverging. The core must reach
  native, Android, and **wasm**.
- **The riskiest assumption is SQLite in the browser.** CLAUDE.md asserts the core
  compiles to wasm; nothing here has proven `rusqlite` with a working persistence
  layer under OPFS across Chromium, WebKit, and WebKitGTK, whose version on a given
  distribution is outside our control. **Spike it before three shells are written
  against the assumption.**
- **Service worker correctness is a new reliability hazard.** Stale caches and update
  loops strand someone on an old version with no visible cause, which is the worst
  failure mode this design introduces and one Electron did not have.
- **The corpus cannot be fully bundled on the web**, and will not be bundleable
  anywhere once the catalogue reaches hundreds of assets.
  [corpus.md](../../requirements/corpus.md)'s base-plus-packs design becomes
  load-bearing rather than an optimisation. **A minimum seed always ships** — the
  scripture itself, with pronunciations computed by `packages/gurmukhi` — so someone
  who installs and never opens the app online can still read and search.
- **Two desktop hosts must exist** to provide the web server and local file access.
  Whether they are `wry` + `tao` or hand-rolled webview embedding is unresolved; the
  comparison has not been done ([interaction.md](../../interaction.md#open-questions)).
- **A gamepad mapping is now owed.** It is named as a supported input model and has
  no assignments.

## Rejected

- **Separate "reader" and "presenter" products.** Proposed on the grounds that the
  audiences, input models, and failure costs differ. They do — but the features are
  one product, and splitting it would mean a person's confidence in Shabad OS stopped
  at a device boundary.
- **React Native.** Claims every platform and delivers a compromised version of each.
- **Electron for desktop.** Ships a browser engine per app per platform, on our patch
  cadence rather than the OS's, and drags Node into the product.
- **Shipping the web build as a browser-installed PWA only**, skipping the native
  hosts. Cheaper, and it gives up the Store and Flatpak channels people actually
  install from — and with them the web server, which is core.
- **Treating TV as a display-only target** served by pointing a browser at
  `/view/presenter`. Cheaper still, and it misses that the TV box is the most portable
  *host* available.
