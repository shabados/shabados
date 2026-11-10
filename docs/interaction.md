# Interaction

Draft, 2026-09-02. **Layer 2 of three**
([ADR-0013](architecture/decisions/0013-three-layers-of-specification.md)): how each
platform delivers a requirement, where the platforms genuinely differ.

**This document holds judgements, not lookups.** Icon mappings are data and live in
[`packages/design/icons.md`](../packages/design/icons.md), generated into both apps by
`packages/design/scripts/generate-icons.mjs`. There is no icon table here on purpose — a
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
| Open a sidebar | Header button, or horizontal drag (iPhone); a swipe from the left edge where the sidebar is the platform's (iPad, iPhone Duo) | Header button | Header button, plus a shortcut | Focus the header button |
| Close a sidebar | Its toggle, a tap on the viewer's edge, or drag back (iPhone); its toggle alone where the sidebar is the platform's | Its toggle | `esc`, or the toggle | Back, or the toggle |
| Open Settings from the viewer | Long-press the Controls button | Right-click the Controls button | Long-press `enter` on it, or a menu key | Long-press select on it |
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
viewer drag must begin inside the content rather than at the edge.

**Where the sidebar drag may start** (decided 2026-10-15). On iOS, anywhere: inside
the content or at the screen edge. The viewer has no back button, so there is no
system back-swipe for an edge drag to collide with. On Android, inside the content
only; the edges belong to gesture navigation. Either way, **only a drag more
sideways than up or down counts** (45°, decided 2026-11-04), on every screen,
including ones with nothing to scroll: a steeper one is a scroll, or nothing, and
is left alone for its whole length. A pinch is never read as a drag.

**iOS: UIKit's recognisers decide which gesture wins**, with no timers or lists of
frames (`apps/ios/ShabadOS/Gestures.swift`, 2026-11-04):

- The sidebar drag is a pan recogniser. Once it is recognised, the touches
  beneath it are cancelled, so a swipe never also taps the pill, row or line it
  started on.
- Each scroll view's pan waits for the sidebar drag to fail, so a drag either
  scrolls or swipes, never both.
- A touch that lands on a slider or a switch never reaches the sidebar drag.
- Only a drag towards Journeys is recognised: rightward from rest, leftward with it
  open.
- Two fingers never start a swipe. A second finger joining a swipe neither ends it
  nor starts a zoom; that is accepted.
- The pinch is a pinch recogniser that runs alongside all of these. The reader
  stops scrolling while it runs.
- A swipe during a tapped line's scroll to the top jumps that line straight to
  the top; that is accepted.

**Android: one pointer handler at the shell's root decides the swipe**
(`sidebarDrag` in `apps/android/app/src/main/java/com/shabados/android/ReaderShell.kt`, 2026-11-04):

- It reads touches before the list and the rows do, and judges a drag once, at the
  platform's touch slop. Once it is a swipe it consumes every event, so the list does
  not scroll and the row it started on does not count a tap.
- **Only towards Journeys**: rightward from rest, leftward with Journeys open. A
  leftward drag from rest is not the shell's; Controls has no gesture
  ([reading-shell.md](requirements/reading-shell.md#getting-between-them)).
- **The viewer's edge is a tap only if the finger stays within the touch slop.** A
  drag along the edge does nothing.
- A second finger ends a swipe, which settles back where it started; the two
  fingers then pinch.
- **The pinch holds its line** by telling the reader's list, on every size step, to
  lay itself out from the row between the fingers at the offset it had when the
  pinch began (`LazyListState.requestScrollToItem`). The request is made from the
  recomposition that applies the new size, so the size and the position reach the
  same layout pass, whatever the order of input, recomposition and layout.
- **Gestures are tested** by `GestureMatrixTest`: real touches through these
  handlers, one test per cell of the gesture matrix, run on the JVM under Robolectric
  in every unit-test build, with the pinch checked frame by frame. How a flick or a
  pinch feels, and edge Back, are checked on a device, on a release build: debug
  builds drop frames, and a pinch there moves in visible jumps.
- A long press on a line taps it when the finger lifts; that is accepted for now.

**Opening a sidebar gives a light haptic** on platforms that have haptics, by the
header button or a drag alike. Closing one gives none (2026-10-16).

**Continuous advance is one control with two measures of intent.** Touch has drag
distance; a remote has hold duration. Both answer "how fast do you want this to go",
and the haptic that marks entry into continuous advance
([display-controls.md](requirements/display-controls.md#mode)) fires on both — on
platforms that have haptics.

**Reorder is where the D-pad diverges most.** Drag is meaningless on a remote, so it
becomes pick-up / move / drop with the select button. That is a genuinely different
interaction for the same feature, and the reason this table has a D-pad column at all.

**Confirming which line was tapped is the same on both** (2026-11-09). Tapping a
line scrolls it to the top
([display-controls.md](requirements/display-controls.md#tap-a-line)), and a scroll
alone does not tell you which line you hit. Both platforms flash the toner behind the
line, hold it through the scroll and fade it out, with the same timings; Android's
line rows have no ripple, so the two do not compete. Not Compose's ripple alone: it
is gone in about 0.4 seconds, before the line has settled. **A pinch is marked the same
way**: the row a pinch is anchored to gets the toner wash, held through the pinch and
faded after release.

**A continuation card is content, not a control, and that constrains its feedback.** The
card offering the longer reading
([library.md](requirements/library.md#continuation-not-configuration)) sits inline
between lines, so on touch and pointer it takes the platform's ordinary pressed state
and nothing more — a line-tap confirmation on it would say "this line is now the
subject", which is the wrong claim about a card whose job is to open. Opening it inlines
the lines in place and there is no collapse, because nothing was removed and so there is
nothing to restore.

### The system bars

What sits behind the viewer's bar and the system's bars (2026-11-09,
[ADR-0016](architecture/decisions/0016-controls-and-the-viewers-bar.md); iOS
2026-11-10, [ADR-0018](architecture/decisions/0018-ios-the-platforms-own-shell-and-toolbar.md)).
The Journeys sidebar's header keeps its own: a fade on Android, iOS's `.hard` edge
effect.

**iOS: the system's scroll edge effect in its automatic style**, behind the
system's toolbar at the top and the status bar, which always shows: on iOS 27 a
band behind the bar while it is up, and a soft blur behind the status bar alone
while the bar is minimized. Never a style of the app's choosing: a set `.soft` or
`.hard` covers the bar's held place even while it is minimized
([reading-shell.md](requirements/reading-shell.md#the-bars-follow-the-scroll)).

**Android: no fade under the reader's header**; the text runs under it as it is. **Behind the status bar, while it shows, a solid band in the viewer's
background**, exactly the status bar's height, so text never runs through the clock
and icons. Both hide as the reader scrolls onward, the band fading with them
([reading-shell.md](requirements/reading-shell.md#the-bars-follow-the-scroll)).

**Android: the system decides what sits behind its navigation bar**, by the
navigation mode the person has chosen in the system's settings. There are two:

- **Gesture navigation**: a thin handle at the foot of the screen; back is a swipe
  in from either side edge, home a swipe up. The handle draws over the app with
  nothing behind it, and needs nothing: it adapts its own colour to what is under
  it.
- **Three-button navigation**: back, home and recents as buttons in a bar along the
  foot (or along a side, on a phone held sideways). Text scrolling under those
  buttons would collide with them, so they need a background.

The app asks the system for this rather than drawing it: the window keeps its
navigation bar contrast enforced (`Window.isNavigationBarContrastEnforced`), and
with it the system draws a translucent scrim behind three-button navigation and
nothing behind the gesture handle. It follows the mode as the person changes it,
and covers a tablet's taskbar too. **Only `SystemBarStyle.auto` leaves contrast
enforced** in androidx.activity's `enableEdgeToEdge` (1.11.0); `light` and `dark`
turn it off. The app passes `auto` its own Appearance, so the bar's icons still
follow the Appearance setting (`MainActivity`).

*Not taken:* drawing our own fade behind three-button navigation. The mode can be
detected — `WindowInsets.tappableElement` reports an inset for the buttons, which
can be tapped, and none for the gesture handle, which cannot — but the scrim is the
platform's own answer and needs no code to keep correct across modes, orientations
and the taskbar. The scrim is flat, not a gradient; if a gradient is wanted, that
detection is how to do it. `Settings.Secure`'s `navigation_mode` is not public API
and is not to be read.

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

**In [`packages/design/icons.md`](../packages/design/icons.md). Do not restate them here.**

Two things worth knowing without opening the file:

**Availability is checked, and it fails the build.** An SF Symbol newer than
`IPHONEOS_DEPLOYMENT_TARGET` renders as **nothing at all** — no error, no
placeholder, a blank button. The generator compares every `minIOS` against the
target read from the project file and exits non-zero. This already caught one:
`translate` landed in **iOS 17.4** and the app targets **17.0**, so it now carries a
`character.bubble` fallback. Every `minIOS` in the file was verified against the
system symbol database, not recalled.

**Lucide comes first, and it is not the web column.** Columns there are icon *sets*,
not targets: a set is a design language and any target can draw from any of them.
Lucide leads because it ships as plain SVG and therefore renders everywhere, and a
`Use Lucide` mark makes it win on every target for an icon central enough that no
native symbol is good enough. Keep that sparse.

**Names are placeholders until someone knows better.** There is no verified flag —
the file is a living document, and a wrong icon name is a visibly wrong icon rather
than a silent failure.

## Browsing icons

**Naming an icon is enough — the mapping is a lookup, so hand over names, not
files.** For Android, a Material Symbols name from
[fonts.google.com/icons](https://fonts.google.com/icons) is exactly what
`packages/design/icons.md` wants: give the semantic slot and the icon name (`route`,
`format_size`), it goes in the file with `verified: true`, and the generator carries
it to both platforms. Same for iOS with an SF Symbols name. Naming them per control,
the way the Controls icons were named, is the right granularity.

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
to record the exact name per icon in `packages/design/icons.md` rather than in anyone's head.

## Open questions

1. **Which web framework?** Constraints: deploys well to Cloudflare (Vite-based),
   works inside WebView2 and WebKitGTK, offline-first with a service worker, and
   tolerant of a wasm core. Qwik is being retired.
2. **`wry` + `tao`, or hand-rolled webview embedding?** The comparison has not been
   done. What it needs to measure: how much platform glue each really is (COM interop
   and a message loop on Windows; GObject and `webkit2gtk` on Linux), what breaks when
   those components version, whether `wry` vendors cleanly, and what its abandonment
   would actually cost given vendored source.
3. **Resolved 2026-10-15:** where the viewer drag may start is now under "Where the
   sidebar drag may start", above.
4. **Do the sidebars mirror in RTL?** "Journeys is on the left" is a claim about
   reading direction, not about the screen, and this app renders Urdu-script content.
5. **What is the gamepad mapping?** Named as a supported input model and absent from
   the table. It is close to the D-pad column, but face buttons, triggers, and stick
   input have no assignments.
6. **Are the Android drawables imported by hand forever?** Thirty-three vector assets
   imported through Android Studio is a manual step no generator covers, and a new
   icon in `packages/design/icons.md` silently has no drawable until someone reads the build
   warning.
7. **What does Liquid Glass change beyond the header?** Targeting iOS 26 was partly
   justified by it. If it changes how sidebars, sheets, and toolbars should be built,
   those are rows in the table above that nobody has written yet.
