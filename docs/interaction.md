# Interaction

Draft, 2026-09-02. **Layer 2 of three**
([ADR-0013](architecture/decisions/0013-three-layers-of-specification.md)): how each
platform delivers a requirement, where the platforms genuinely differ.

**This document holds judgements, not lookups.** Icon mappings are data and live in
[`brand/icons.json`](../brand/icons.json), generated into both apps by
`brand/scripts/generate-icons.mjs`. There is no icon table here on purpose — a
markdown table of symbol names is a promise, and a generator is enforcement.

## The filing rule

> **Would this change if we shipped only on web?**

| Answer | Goes in |
| --- | --- |
| No | [`requirements/`](requirements/) — platform-neutral, checkable everywhere |
| Yes, and it is a lookup | `brand/`, generated |
| Yes, and it is a judgement | here |

## What a judgement is

The clearest example is one that prompted this document.

**iOS has a native idiom for a small enumerated setting**: a `Menu` anchored to an
icon, which opens in place, shows a checkmark against the current value, and closes
on selection. It is compact enough to sit in a header beside a title, which is
exactly where `Appearance` is specified to go.

**Android has no equivalent idiom.** Compose has `DropdownMenu`, so the *mechanism*
exists — but Material's convention for choosing one of a few values is a dialog or a
bottom sheet, and an icon-anchored menu in a Material app reads as a mistake rather
than as a shortcut. Copying the iOS control would be technically possible and
locally wrong.

**The requirement does not move.** It is:

> Appearance offers Light, Dark, and Auto; the current value is discoverable without
> opening the control; choosing a value applies it immediately.

**What each platform does to satisfy it is the judgement.** iOS: an icon-anchored
`Menu` whose glyph reflects the current value. Android: something else. Both meet the
requirement. Neither is derivable from it.

**And "something else" does not have to be the nearest translation.** A bottom sheet
is the *conventional* Android answer and it is not the only one: with three values,
three inline segmented options in the row need no sheet at all, no second surface,
and one tap instead of two. **Rejecting the mechanical port and choosing per platform
is the whole point of this layer** — the failure mode it exists to prevent is one
platform's idiom being reproduced on the other because it was easier than deciding.

**The decision procedure, then:** state the requirement without naming a control;
pick the best answer per platform independently; write both on one row so the
difference is visible. Only the third step is new — the first two are what a good
engineer does anyway, and the row is what stops the two answers drifting apart
afterwards.

**Three tests of whether something belongs here.** It is a judgement if: a reasonable
engineer on the other platform would choose differently; the choice cannot be checked
by a test that runs on both; and the requirement stays true either way. A fact that
fails all three is a lookup, and belongs in `brand/`.

## Interactions

**Columns are input models, not platforms.** Every platform is a combination of
these, and several support all four; organising by platform would answer the same
question once per platform and let the answers drift apart, which is the failure this
document exists to prevent.

**Every row must have an answer in every column** —
[reading-shell.md](requirements/reading-shell.md#input) requires that every action has
a focusable target. A blank cell is a feature that does not exist on some device.

| Interaction | Touch | Pointer | Keyboard | D-pad / remote |
| --- | --- | --- | --- | --- |
| Move focus | Tap the target | Hover and click | `tab`, arrows | Arrows |
| Primary action | Tap | Click | `enter` | Select |
| Secondary action on a row | Long-press | Right-click | Long-press `enter`, or a menu key | Long-press select |
| Go back / dismiss | Back gesture | Click outside, or a close control | `esc` | Back |
| Open a sidebar | Header button, or horizontal drag | Header button | Header button, plus a shortcut | Focus the header button |
| Close a sidebar | Its filled toggle, or drag back | Its filled toggle | `esc`, or the toggle | Back, or the toggle |
| Choose from an enumerated setting | Platform-native menu or sheet | Menu or popover | Focus and arrow through | Focus and arrow through |
| Change zoom | Pinch, or the slider | Scroll with modifier, or the slider | `⌘=` / `⌘-`, or the slider | Focus the slider, arrows |
| Presenter continuous advance | Drag and hold; rate rises with distance | Press and hold | Hold an arrow; rate rises with duration | Hold an arrow |
| Reorder a list | Drag handle | Drag handle | Focus, then a move shortcut | Select to pick up, arrows to move, select to drop |
| Confirm a destructive action | The secondary action is the friction | Secondary action **plus a confirmation** | Secondary action, plus confirmation | Long-press select |

**The destructive row is the one where the answers deliberately differ.** A pointer
mis-click is cheap and common in a way a long-press is not, so a confirmation earns
its place there and would be noise on touch. The *feature* is identical everywhere —
[reading-shell.md](requirements/reading-shell.md#destructive-actions-require-friction--the-mechanism-is-not-specified-here)
requires friction, not a particular mechanism.

### Notes on the rows that are not obvious

**Horizontal drag exists only where the platform has one to spare.** In a web
browser a horizontal drag means "go back", and on a trackpad it means "switch
desktop"; simulating one fights the platform. Nothing is lost, because the header
button is the focusable route and the drag was only ever an accelerator over it.

**Android's system Back must close a sidebar**, and there is no iOS counterpart. A
sidebar that ignores Back is the most reliable way to make an Android app feel
foreign. It also constrains the drag: gesture navigation owns the screen edges, so a
viewer drag must begin inside the content rather than at the edge
([open questions](#open-questions)).

**Continuous advance is one control with two measures of intent.** Touch has drag
distance; a remote has hold duration. Both answer "how fast do you want this to go",
and the haptic that marks entry into continuous advance
([display-controls.md](requirements/display-controls.md#mode)) fires on both — on
platforms that have haptics.

**Reorder is where the D-pad diverges most.** Drag is meaningless on a remote, so it
becomes pick-up / move / drop with the select button. That is a genuinely different
interaction for the same feature, and the reason this table has a D-pad column at all.

**The fading header has no shared mechanism.** iOS 26's `scrollEdgeEffect` does it
directly. Android's `TopAppBar` scroll behaviours change elevation and colour rather
than masking, so the overlay is hand-built there. The requirement is that Gurmukhi
passing under the header fades rather than being cut, because a hard edge through the
sirlekh reads as a rendering fault.

## The web server is core, not an enhancement

**Shabad OS Connect is one of the app's central concepts**, not something bolted onto
the platforms that happen to allow it. A host serves the display and other devices
control it; that is what the product is for in a gurdwara.

**A web browser cannot host a server, and that is a limitation of the browser rather
than a choice in the design.** Every other target can:

| | Can host |
| --- | --- |
| Windows (WebView2 shell), Linux (WebKitGTK shell) | Yes — the shell is a native process |
| macOS, iOS, iPadOS | Yes |
| Android, Android TV | Yes, with a foreground service |
| tvOS | Yes |
| **A page in a web browser** | **No — not implementable today** |

**Treat the browser case as "not yet", not as "out of scope".** If browsers gain a
way to do it, it goes in.

**tvOS and Android TV are not display-only targets.** A small TV box plugged into a
gurdwara's HDMI can *be* the host — serving the display, discoverable over Bonjour or
Avahi, controlled from whatever devices are in the room. That is a portable setup
where nobody surrenders their personal device, and it is a reason for the TV builds
to exist rather than an afterthought.

## Platform targets

**One app, everywhere. Three shells.**

| Shell | Covers |
| --- | --- |
| **Swift / SwiftUI** | iOS, iPadOS, macOS, tvOS |
| **Kotlin / Compose** | Android — phone, tablet, Android TV |
| **Web** | The PWA, shipped through the **Windows Store** (WebView2 shell) and **Flatpak** (WebKitGTK shell), and served in a browser |

**The PWA is an implementation strategy, not a distribution one.** Windows and Linux
users install an app from the channel they expect; that app happens to be web
technology inside an OS-provided webview. Nobody is asked to "install a PWA from a
browser", and the browser build is the same codebase without a native host.

**Electron is not in this plan.** No bundled Chromium per platform, no
`electron-updater`, no Node in the shipped product, and the webview gets its security
updates from the OS rather than from a release cadence. That deletes most of what
[ADR-0011](architecture/decisions/0011-distribution-channels.md) was worried about,
and makes CLAUDE.md's "no native Node modules" constraint obsolete.

**Not React Native.** It claims every platform and delivers a compromised version of
each, which is the opposite of the goal.

**Feature parity is the target; interaction parity is not.** Someone who learns
Shabad OS in one place should be confident they can do the same things elsewhere. How
they do them differs by input model, which is what the table above is for.

### Versions

**iOS: deployment target 26.0.** Set 2026-09-02, on the judgement that adoption is
around 80% and rising, and that Liquid Glass changed enough patterns that supporting
the previous generation means maintaining two designs.

**Android: `minSdk` 36 (Android 16).** Decided 2026-09-02 at roughly 7.5% of devices,
accepted deliberately: these apps are built once to last rather than maintained
against a widening compatibility matrix, and the share grows on its own while the
cost of the alternative never falls. It buys variable-font control (35) and
progress-centric notifications (36).

**Keep the 36-only API surface few and named** — today Live Updates and variable-font
axes — so lowering the floor later stays cheap if Android adoption disappoints.

**macOS: SwiftUI multiplatform, not Catalyst.** One codebase either way; SwiftUI gets
native AppKit behaviour for the menu bar, window management, and keyboard handling,
which is exactly where the operator features live.

## Icons

**In [`brand/icons.json`](../brand/icons.json). Do not restate them here.**

Two things worth knowing without opening the file:

**Availability is checked, and it fails the build.** An SF Symbol newer than
`IPHONEOS_DEPLOYMENT_TARGET` renders as **nothing at all** — no error, no
placeholder, a blank button. The generator compares every `minIOS` against the
target read from the project file and exits non-zero. This already caught one:
`translate` landed in **iOS 17.4** and the app targets **17.0**, so it now carries a
`character.bubble` fallback. Every `minIOS` in the file was verified against the
system symbol database, not recalled.

**No Android name has been verified.** All 33 are marked `verified: false`, and the
generator says so on every build. Verify before trusting any of them —
[Browsing icons](#browsing-icons) below.

## Browsing icons

**Naming an icon is enough — the mapping is a lookup, so hand over names, not
files.** For Android, a Material Symbols name from
[fonts.google.com/icons](https://fonts.google.com/icons) is exactly what
`brand/icons.json` wants: give the semantic slot and the icon name (`route`,
`format_size`), it goes in the file with `verified: true`, and the generator carries
it to both platforms. Same for iOS with an SF Symbols name. Naming them per control,
the way the Controls sidebar icons were named, is the right granularity.

**iOS:** the SF Symbols app (installed here as `SF Symbols Beta.app`). The
authoritative availability data is also readable directly:
`/System/Library/CoreServices/CoreGlyphs.bundle/Contents/Resources/name_availability.plist`
maps every symbol to a release year, and `year_to_release` maps that to an iOS
version. That plist is what verified this repo's symbols; prefer it over
recollection.

**Android: there is no first-party desktop app equivalent to SF Symbols.** The three
practical options, best first:

1. **Android Studio → New → Vector Asset → Clip Art.** Already installed, offline,
   searchable, and it imports the chosen icon straight into `res/drawable/` as the
   vector XML the build needs. Closest thing to SF Symbols in workflow, and it is the
   one that produces a usable artifact rather than just a name.
2. **fonts.google.com/icons** — the full Material Symbols catalogue, filterable, with
   the variable-font axes (weight, fill, grade, optical size) exposed. Richer and
   newer than what Android Studio bundles, but it is a website, and downloads land as
   loose SVGs you must convert.
3. **`androidx.compose.material:material-icons-extended`** — the legacy Material
   Icons set as Kotlin objects (`Icons.Filled.Search`), so autocomplete becomes the
   browser and missing icons become compile errors. **Not currently a dependency**,
   and adding it needs the justification CLAUDE.md requires: it is a large artifact
   that ships every icon, against roughly 33 needed. Importing 33 vector assets is
   almost certainly the better trade.

**Roboto is the typeface, not the icons.** The icon set is Material Symbols (current,
variable-font based) or Material Icons (legacy, what `material-icons-extended`
ships). They are different catalogues with overlapping names, which is a good reason
to record the exact name per icon in `brand/icons.json` rather than in anyone's head.

## Open questions

1. **Which web framework?** Constraints: deploys well to Cloudflare (Vite-based),
   works inside WebView2 and WebKitGTK, offline-first with a service worker, and
   tolerant of a wasm core. Qwik is being retired.
2. **`wry` + `tao`, or hand-rolled webview embedding?** The comparison has not been
   done. What it needs to measure: how much platform glue each really is (COM interop
   and a message loop on Windows; GObject and `webkit2gtk` on Linux), what breaks when
   those components version, whether `wry` vendors cleanly, and what its abandonment
   would actually cost given vendored source.
3. **Does the viewer drag start at the edge or inside the content?** Edge-initiated
   collides with the iOS back-swipe and Android gesture navigation; content-initiated
   does not, but a drag from the very edge then does nothing, which people report as a
   bug.
4. **Do the sidebars mirror in RTL?** "Journeys is on the left" is a claim about
   reading direction, not about the screen, and this app renders Urdu-script content.
5. **What is the gamepad mapping?** Named as a supported input model and absent from
   the table. It is close to the D-pad column, but face buttons, triggers, and stick
   input have no assignments.
6. **Are the Android drawables imported by hand forever?** Thirty-three vector assets
   imported through Android Studio is a manual step no generator covers, and a new
   icon in `brand/icons.json` silently has no drawable until someone reads the build
   warning.
7. **What does Liquid Glass change beyond the header?** Targeting iOS 26 was partly
   justified by it. If it changes how sidebars, sheets, and toolbars should be built,
   those are rows in the table above that nobody has written yet.
