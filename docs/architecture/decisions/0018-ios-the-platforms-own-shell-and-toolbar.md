# 18. On iOS, the platform's own shell and toolbar

2026-11-10 · **Accepted** (2026-11-10)

Supersedes, **on iOS only**, ADR-0016's placement and hiding of the viewer's bar,
and its rejection of the system toolbar. ADR-0016's Controls decision stands, and
Android keeps all of ADR-0016.

Behaviour: [reading-shell.md](../../requirements/reading-shell.md#four-surfaces-one-of-them-always-visible),
[reading-shell.md](../../requirements/reading-shell.md#the-bars-follow-the-scroll),
[interaction.md](../../interaction.md#the-system-bars).

## Context

ADR-0016 gave iOS a bar of our own (`ViewerBar`): at the foot on iPhone, at the top
on iPad, hidden by our rule (`ReaderBars`) while reading onward, together with the
status bar. The iPhone Duo (iOS 27.1) broke that shape: its inner display wants an
iPad's sidebar, its outer one a phone's, and its system bars can turn vertical,
which a bar of our own cannot follow. iOS 27 also added the system's own
minimization of its navigation bar on scroll (`toolbarMinimizationBehavior`), which
holds the bar's place so the text never moves.

Compared on devices (iPhone, iPad, the Duo and its simulator) and on an iOS 26
simulator, 2026-11-10.

## Decision

**iPad and the Duo have the platform's own shell.** A `NavigationSplitView` whose
sidebar is Journeys, beside the viewer, moving it over and never covering it; in one
column (the Duo's outer display, a narrowed iPad window) the same split view,
collapsed, opening on the viewer with Journeys its root, and the system's back button
the way to Journeys. **Chosen by device** (the `.pad` idiom, or a
hinge), not width. Every other iPhone keeps the sliding viewer card.

**The viewer's bar is the system's toolbar, at the top, on every iOS device.**

- **Journeys at the left, the title in the middle, Controls at the right.** The
  title is always our glass pill (`TitlePill`), never the bar's own title or a
  header across the screen. Beside the viewer, the Journeys button goes with the
  panel: in its header while it is open.
- **On iOS 27 the system minimizes it on a scroll down** and restores it on a
  scroll back, with its place held (`toolbarMinimizationSafeAreaAdjustment(.disabled)`),
  so the text never moves. A tapped line's scroll drives it as a finger's does.
  **Before iOS 27 it never hides.**
- **At the top on iPhone too**, giving up the foot's thumb reach: only the
  navigation bar minimizes; the bottom bar does not.
- **The status bar always shows.** The system does not minimize it with the bar.
- **Behind both, the system's scroll edge effect in its automatic style**: on iOS 27
  a hard band behind the bar while it is up, and a soft blur behind the status bar
  alone while the bar is minimized; right on iOS 26 too.
- **A tapped line lands a gutter's gap below the bar's place**, which the bar
  holds whether minimized or not.

## Consequences

- **Removed on iOS: `ViewerBar` and `ReaderBars`** (our bar, our hiding rule, and
  hiding the status bar). The system does all three, or none. Their last form is at
  commit `ca2066cd2a` (`ReaderShell.swift`, `BaniReaderView.swift`). Android keeps
  its own `ReaderBars` (ADR-0016).
- **A system bar that does not slide with the card.** The iPhone's viewer is in a
  `NavigationStack` inside the sliding card, which ADR-0016 rejected (UIKit
  recomputed the bar's safe area as the card slid, 2026-10-16); it slid cleanly
  on iPhone (2026-11-10).
- **The platforms differ more**: iOS minimizes and keeps the status bar; Android
  hides its bar and the status bar by ADR-0016's rule. The requirements say which.
- **Controls' popover closes at the system's own pace**: from a toolbar button it
  morphs back into the button, and nothing public shortens it; a second tap waits
  for it.
- **Open:** the Duo's outer display, where iOS 27.1 can turn a *bottom* bar into a
  side rail; with the bar at the top, that is not used.

## Rejected

- **Hiding the system bar with `.toolbar(.hidden)`** — it gives up its place, and the
  text moving under a scroll under way stuttered it (ADR-0016's own reason). Kept
  only as the reason iOS 26 never hides it.
- **The bottom bar** — `toolbarMinimizationBehavior` does nothing to it (iPhone).
- **Hiding the status bar with the bar** — `.statusBar` is a placement since iOS 27,
  but its documentation limits it to `toolbarVisibility` and `toolbarColorScheme`;
  passed to the minimization it stayed. Hidden by our own rule beside the system's,
  the two fell out of step. Nothing reports the bar's minimized state; the pill's
  frame does show it, but driving the status bar from that was too indirect.
- **Pausing minimization for a tapped line's scroll** (`.never` while it plays) —
  switching to `.never` shows a minimized bar, so every tap showed it and hid it.
- **A blur of our own behind the status bar alone** — a material faded by a gradient
  reads as a fade; uniform glass ends in a hard line; a `UIVisualEffectView` of any
  `UIBlurEffect.Style`, masked or not, inside the card or outside it, blurred
  nothing over the text (iPhone). No public blur ramps its radius but the system's
  edge effect.
- **A scroll edge effect style of our own** (`.soft` or `.hard`) — it covers the
  bar's held place even while the bar is minimized, its background hidden or not;
  only the automatic style keeps to the status bar then.
- **Hiding the status bar on iPad or the Duo** — in Split View the app may have none
  of its own, and hiding it flickered on every scroll.
