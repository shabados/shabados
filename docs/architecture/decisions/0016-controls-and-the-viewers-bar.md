# 16. Controls is the platform's own container; the viewer's bar follows the scroll

2026-11-09 · **Accepted** (2026-11-09)

Behaviour: [reading-shell.md](../../requirements/reading-shell.md#controls),
[reading-shell.md](../../requirements/reading-shell.md#the-bars-follow-the-scroll),
[display-controls.md](../../requirements/display-controls.md#tap-a-line),
[interaction.md](../../interaction.md#the-system-bars).

## Context

Controls was a second sidebar, mirroring Journeys (decided 2026-10-19): the viewer
slid left to show it. Two things followed from that shape:

- **The sliders hid what they change.** Zoom, Ratio and Weight act on the reader, and
  the reader was pushed aside while they moved.
- **It was custom on every platform**: its own slide, its own gesture arbitration
  (a slider's drag against the sidebar's), its own rule that its hidden sliders take
  no touches over Journeys. Every one of those is code an agent must hold whole to
  keep correct.

The viewer's header was a fixed bar at the top, always shown. On a phone that is the
far edge from the thumb, and the bar and status bar take reading space the whole
time. The iPhone Duo (2026) also brings screens where the right place for a bar
depends on the screen, not the device.

Both were compared on devices, in a local build installed beside the app, on iPhone, iPad
and a Galaxy A16.

## Decision

**Controls is the platform's own container for options opened from a button.**

- **iOS and iPadOS: a popover**, pointing at the Controls button, on iPhone too
  (`presentationCompactAdaptation(.popover)`), in either orientation. 255 × 340
  points; the system shrinks it where the screen is shorter.
- **Android: a modal bottom sheet** (`ModalBottomSheet`) with Material's default dim:
  Android's usual container for a set of options opened from a button.
- **No header; no slider bylines.** The button names it; Appearance lives in Settings;
  Settings' Appearance page keeps the bylines.
- **The reader stays in view** behind it, so a slider's change shows on the reader.
  **A tap outside closes it and goes no further.**
- **Its `Settings` row closes Controls, then opens Settings**, on every platform: a
  popover or a modal sheet would otherwise sit beneath Settings or over it
  half-covered.
- **Controls has no gesture.** Journeys keeps its slide; a leftward drag from rest
  moves nothing.

**The viewer's bar follows the scroll, and its place is the platform's.**

- **iPhone: at the foot**, within the thumb's reach, as Safari's, with nothing drawn
  behind its glass buttons. **iPad: at the top**, as iPadOS's own bars. Decided by
  width (a regular width puts it at the top), not by device.
- **Android: at the top**, where a top app bar is the convention and where
  three-button navigation may already fill the foot.
- **Reading onward hides the bar and the status bar**, as a browser hides its bars;
  scrolling back, reaching the top, or opening Journeys shows them. A hide or show
  plays to the end, and the layout never changes, so the scroll is never touched.
- **A tapped line lands where the hidden bar was**, just below the camera cutout or
  safe area, and is confirmed by the same toner highlight on both platforms.

## Consequences

- **Removed: the Controls sidebar and its leftward swipe.** Nothing it offered is
  lost: the sliders, the `Settings` row and the long press are all on Controls' button;
  Appearance is in Settings.
- **Superseded: "Gurmukhi passing under the header fades rather than being cut"**
  (interaction.md). Under the iPhone's bar at the foot and Android's header nothing is
  drawn; the text passes beneath the buttons as it is. iPad keeps a band behind its
  bar at the top.
- **Less custom code**: the Controls slide, its gesture arbitration on Android, and
  the rule keeping its hidden sliders from taking touches are gone. Android's sidebar
  model (`Sidebar`, `Side`) is Journeys only.
- **New code to keep correct**: `ReaderBars` on both platforms. Its rules — any
  movement counts, only the person's own scrolling, a hide or show plays to the end,
  never under a screen reader or with Controls open — are in reading-shell.md and
  tested on Android (`GestureMatrixTest`, `ShellTest`).
- **Open:** the iPhone Duo. When iOS turns system bars vertical on its outer display
  the viewer's bar, being custom, stays horizontal; following
  `EnvironmentValues.toolbarVerticalEdge` (iOS 27.1) is the likely route.
  *Trial since 2026-11-10:* the Duo takes the system's toolbar instead (amendment
  under Rejected). The inner
  display's gutters and a fold-aware title are unspecified.

## Rejected

- **Controls as a sidebar mirroring Journeys** — hid the reader its sliders change.
- **A sheet on iPhone** (a popover adapting to a sheet, with detents) — tried; the
  popover was preferred, the same container on iPhone and iPad.
- **Android's standard (non-modal) bottom sheet** — left the reader live beneath it,
  so a tap there never closed it.
- **A menu** — iOS menus cannot hold sliders; steppers would need step sizes the
  requirements do not give.
- **A custom overlay** — no arrow and any size, but its dismissal, accessibility,
  sizing and gesture arbitration would all be ours.
- **The system toolbar (`NavigationStack`) for the viewer's bar** — UIKit's bar
  recomputed its safe area as the viewer slid aside for Journeys (2026-10-16). Rejected
  for the card shell only: **amended 2026-11-10, pending review** — iPad and the
  iPhone Duo have the system's split view, where the viewer does not slide, and
  take the system's toolbar ([reading-shell.md](../../requirements/reading-shell.md#four-surfaces-one-of-them-always-visible)).
  It gives up its place when hidden, which the entry below rejects for a
  scroll under way; on those devices that is accepted as a trial. **Since
  2026-11-10 the trial covers the iPhone's card too**, the case this entry was
  rejected for, to see whether iOS 26 still fails it (`ReaderShell.systemToolbar`).
  **Hiding it gave up its place and stuttered a scroll under way, as the entry
  below records**; on iOS 27 the system's own minimization (`toolbarMinimizationBehavior`,
  with the safe area held) replaces that hiding and scrolls better than ours did
  (iPad, 2026-11-10). It works for the navigation bar only, so **the iPhone's bar
  moves to the top** for it, giving up "iPhone: at the foot" below. The system
  does not minimize the status bar, so with its toolbar **the status bar always
  shows**, giving up "reading onward hides … the status bar" below.
- **Bars that hide instantly, or after a distance, or interruptibly** — instant
  flickered at some scroll speeds; removing the bar from the layout stuttered a scroll
  under way; an interruptible animation restarted on every turn.
