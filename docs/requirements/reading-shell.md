# Reading shell

Draft, 2026-09-03. Specified by the author; open questions at the end are blocking.
Covers the **frame around the text** — the viewer, the two sidebars, their headers,
and the gestures between them. What the text itself looks like is
[display-controls.md](display-controls.md); what the Journeys sidebar lists is
[journeys.md](journeys.md).

**Layer note.** This is **layer 1** — what must be observably true, on every
platform ([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md)).
It carries no gesture names, no icon names, and no framework names; those are
[interaction.md](../interaction.md) and [`packages/design/icons.md`](../../packages/design/icons.md).

**Scope note.** This is the app on every platform, not a mobile-only design
([ADR-0014](../architecture/decisions/0014-one-app-three-shells.md)). `apps/ios` and
`apps/android` are the real apps and work goes into them directly; the web codebase
and the TV builds render the same features through different input models
([interaction.md](../interaction.md#interactions)).

## Four surfaces, one of them always visible

```
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│ Journeys  │      │  Viewer   │      │ Controls  │      │ Settings  │
│           │ ◀─── │           │ ───▶ │ (popover/ │ ───▶ │           │
│ sidebar   │      │ (always   │      │  sheet)   │      │  (deeper) │
│           │ ───▶ │  present) │ ◀─── │           │      │           │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
```

**Settings sits one level beyond Controls**, not beside it. It is reached from
Controls, which is what keeps a rarely-visited surface from competing with the two
that are used constantly; Controls closes as it opens, and closing Settings returns
to the viewer ([Settings](#settings)). **One accelerator skips the
step** (2026-10-22): a long press on the viewer's Controls button opens Settings
straight from the viewer, and closing it returns to the viewer
([Settings](#settings)).

**The viewer is the app.** It shows whatever is being read — a bani, a shabad, a
page — and it is what the app opens to. Journeys and Controls are transient
surfaces over it, never destinations in their own right.

**On mobile the viewer slides aside to show the Journeys sidebar beneath it**
(2026-10-15).
The viewer lies over the sidebar; opening one moves the viewer towards the far side,
leaving its inner edge in view, faded towards the background. Tapping that edge
returns to the viewer. **The sidebar is as wide in landscape as in portrait**
(2026-10-16): its width comes from the screen's short side, so turning the device
leaves more of the viewer in view rather than stretching the sidebar across it.
The width is that of its contents, clear of a camera cutout at its edge: a cutout's
inset is added to the sidebar, not taken from it (2026-10-19).

**On iPad and the iPhone Duo, Journeys is the platform's own sidebar beside the
viewer** (2026-11-10), with the platform's own toolbar for the viewer's buttons and
title: as native a setup as each allows. On iPadOS that is `NavigationSplitView`
(`.automatic` on trial, `.balanced` if that puts it over the viewer in portrait).
The web is to behave the same way. **Which one is decided by the device, not the
width**: every other iPhone, in portrait and landscape, keeps the sliding viewer
above; iPad, and the Duo on either display, have the sidebar. A window that
shrinks to an iPhone's width does not turn into the iPhone's shell. (The viewer's
bar is placed by width, [ADR-0016](../architecture/decisions/0016-controls-and-the-viewers-bar.md).)

- **Opening it moves the viewer over and narrows it; it never covers it.** There
  is no overlay ("unpinned") form and no edge to tap.
- **It opens by the Journeys button or by a swipe from the screen's left edge**,
  the split view's own, and **closes by the button**. It stays open while things
  are tapped and read in it or in the viewer.
- **Where the screen holds one column** (the Duo's outer display, an iPad window
  as narrow as an iPhone), one screen shows at a time, as in Files: **the app
  opens on the viewer** (the default screen is `New journey`), pushed onto
  Journeys; a horizontal swipe from anywhere on it, the system's back swipe,
  returns to Journeys; choosing something there shows the viewer again.
- **The button goes with the panel**, as the sidebar toggle does in iPadOS's Mail
  and Notes: while the panel is open it sits at the trailing end of the panel's
  header, and the viewer's bar has none; while closed it is in the viewer's bar.
  So when the viewer's bar hides as the reader scrolls, an open panel can still be
  closed; a closed one opens again once the bar returns, or by the swipe.
- **Opening or closing it changes the viewer's width**, and the line at the top is
  kept as through a rotation or a resized window. That is measured below the bar's
  place even while the bar is hidden, so with it hidden the reader can move by
  about a line; accepted (2026-11-10).

The same states as on a phone; only the presentation of "open" differs. *Open:*
whether an open panel is still open after a relaunch; whether the screen stays
awake while reading with the panel open
([below](#the-screen-stays-awake-while-content-is-read) says no sidebar may be
open); Android tablets.

**Controls is not a sidebar** ([ADR-0016](../architecture/decisions/0016-controls-and-the-viewers-bar.md)):
it is the platform's own container for options opened from a button — a popover on
iOS and iPadOS, a modal bottom sheet on Android ([Controls](#controls)).

**Journeys and Controls are never open together.** Opening Journeys closes Controls.

## Input

**Every action has a focusable target.** There is no action reachable only by a
gesture, only by a pointer, or only by a hotkey. Gestures and shortcuts are
accelerators over the focusable route, the way keyboard shortcuts always have been.

**Design against the D-pad; the rest follow.** A remote gives six inputs — up, down,
left, right, select, back — and it is the tightest budget of any input model this app
supports. Anything that works with those six works with a keyboard (arrows, enter,
escape), a gamepad, a mouse (click the focusable thing), and touch (tap it).

**The D-pad is not as small as it looks.** Select can be held, which is the remote's
long-press; arrows repeat when held. So a secondary action on a row and a
press-and-hold rate control both have remote equivalents, and neither needs a
touch-only design.

### Destructive actions require friction — the mechanism is not specified here

**The requirement is that a destructive action cannot be triggered in one casual
step.** Closing a tab removes it from the journey permanently
([journeys.md](journeys.md#closing-a-tab)); removing a timeline entry destroys export
data. Neither may sit under a single tap, click, or select.

**How that friction is delivered belongs to the input model, not to this document.**
A secondary press — right-click, long-press, long-press select, long-press enter —
is friction. So is a confirmation step. **They need not match across inputs**: a
pointer, where mis-clicks are cheap and common, may warrant a confirmation that touch
does not. [interaction.md](../interaction.md#interactions) holds the per-input
answers.

**What must match is the feature.** Every input can close a tab, and every input has
to work to do it.

## Getting between them

**At least one way in, and every way in must agree with the way out.**

- **The bar's buttons.** Journeys at the left of the viewer's bar, Controls at the
  right ([where the bar sits](#the-bars-follow-the-scroll)). Present on every
  platform.
- **A direct gesture from the viewer**, where the platform has one, for Journeys
  only: it is reached by moving the viewer towards the side Journeys is on, so the
  gesture and the layout state the same thing. **Controls has no gesture**: a
  popover or a sheet is opened from its button, and a leftward drag from rest moves
  nothing.

**Which gestures exist is a platform judgement, not a requirement.** Web has no
horizontal swipe and does not gain one; the header button alone satisfies this.
[interaction.md](../interaction.md#interactions) has the per-platform answers
([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md)).

**One Journeys button, on the viewer** (2026-10-15). While Journeys is open the
viewer's edge stays in view, and the button with it; tapping it, or anywhere on that
edge, returns to the viewer. **A drag along the edge is not a tap** (2026-11-04),
and does nothing. The sidebar's header carries no second toggle. **The
icon does not change between states**, because a changed icon reads as a different
button, and the person is trying to get back to where they were. Controls has one
button too, the same in both states ([Controls](#controls)).

**Every path back to the viewer closes the sidebar.** Tapping a journey, tapping
`Inactive sessions`, tapping `Library`, and tapping the viewer's edge or its
Journeys button all return to the viewer in one action. There is no state where a person has
tapped something and is still looking at the sidebar wondering whether it worked.

**A swipe that moves the viewer is only a swipe** (2026-10-22): it never also
activates the pill, row or button it started on. **With Controls open, the reader
takes no touches**: a tap outside Controls closes it and goes no further, so it
never also taps a line.

**Where a gesture exists it competes with pinch-to-zoom**
([display-controls.md](display-controls.md#zoom)), and with a long press on a line
once one opens its menu ([display-controls.md](display-controls.md#copying)). There
is no text selection to compete with (ADR-0017). Each conflict must be resolved
deliberately rather than by whichever recogniser happens to win. The
platform-specific collisions — system back-swipe, gesture navigation — are in
[interaction.md](../interaction.md#open-questions).

## The viewer

A bar and a reading area. The bar's place differs by platform
([below](#the-bars-follow-the-scroll)); its order does not.

| Position | Contents |
| --- | --- |
| Left | Journeys toggle. Filled when Journeys is open. |
| Centre | Title — what is being read, or the name of the view (`Inactive sessions`). **Interactive.** |
| Right | The Controls toggle. |

**The title is a control, not a caption.** It is the only per-tab surface in the
viewer, and everything that belongs to *this reading* hangs off it:

| Action | Available on |
| --- | --- |
| **Create bookmark** | An ang view — names it with the current date and time, then a toast offers a rename ([library.md](library.md#bookmarks)) |
| **Save to collection…** | A line-group definitely; an ang possibly ([library.md](library.md#open-questions)) |
| **Read history** | Any tab — every previous time this shabad or collection was read, and in which journey ([journeys.md](journeys.md#reading-this-shabad-before)) |
| **Goal** | A tracked item — set and change its amount and period ([library.md](library.md#goals)) |
| **Contents** | A collection tab — its items in order, showing position within them |

**Next / previous traversal belongs to the viewer**, not to a list: someone working
through Asa Ki Var, a prepared set, or a sehaj paath moves between items without
going back to any list. **What `next` means comes from the container the tab was
entered through** ([library.md](library.md#which-is-why-next-is-a-property-of-the-way-in)),
which is why the same shabad traverses differently from search and from Nitnem.

The reading area is specified entirely by
[display-controls.md](display-controls.md) — mode, alignment, sizing, which fields
are shown.

### The bars follow the scroll

Decided 2026-11-09 ([ADR-0016](../architecture/decisions/0016-controls-and-the-viewers-bar.md)).

- **Where the bar is differs by platform**:
  - **iOS, every device: the system's toolbar at the top of the viewer**
    (2026-11-10, a trial, pending review): Journeys at the left, the title in the
    middle, Controls at the right. Behind it and the status bar, the system's
    own scroll edge effect, so the text passing under the clock does not clash
    with it ([interaction.md](../interaction.md#the-system-bars)): the
    system's automatic style, a band behind the bar while it is up, and a soft
    blur behind the status bar alone while it is minimized (iOS 27). **On iOS 27 the system
    minimizes it on a scroll down and restores it on a scroll back**, holding its
    place so the text never moves; only the top bar does this, the bottom bar
    does not, so the foot's thumb reach is given up for it. It was at the foot on
    iPhone (2026-11-09), as Safari's, within thumb's reach.
  - **The title is always a glass pill floating on the text**, as Safari's address
    field is: never a header across the screen, on any device or orientation
    (2026-11-10). On iOS the system's edge effect lies under it (above), chosen
    over a status bar with nothing behind it (2026-11-10).
  - **Android: at the top**, where a top app bar is the convention, and where the
    foot may already hold three-button navigation; the two together at the foot
    would crowd it. Hidden, it slides up past the status bar. **No fade under it**:
    the text runs under it as it is. Behind the status bar, while it shows, a solid
    band in the viewer's background.
- **Everything below holds on every platform.**
- **Reading onward hides it, and the status bar** (not on iOS, 2026-11-10, a trial
  with the system's toolbar: the status bar always shows there, since the system
  minimizes its bar but not the status bar, and the two hidden by different rules
  fell out of step; nor, before that, on iPad or the iPhone Duo, since in Split
  View or a window the app may have none of its own, and hiding it flickered), as
  a browser hides its bars:
  scrolling down, or tapping a line (whose scroll carries the reader down). **A
  tapped line lands just below the camera cutout**, where the hidden bar was,
  rather than below the bar; its highlight's top a gutter's gap
  (8) below the cutout, or below the screen's top where there is none, as on iOS,
  whose safe area plays the cutout's part; under a screen reader, where
  the header stays, below it. **On iOS, with the system's toolbar (2026-11-10,
  a trial), a tap's scroll moves the bar as a finger's does**, and the line
  lands a gutter's gap below the bar's place, which the bar holds; a short
  scroll can leave the bar part minimized. **The rules below are for the
  app's own bar**: the system's minimizes by its own (iOS 27), and before iOS
  27 it never hides, since a hidden system bar gives up its place and the text
  moving under a scroll under way stuttered it. Scrolling
  back up shows them; so does reaching the top, and coming back from Journeys
  on a phone. Closing a panel beside the viewer only hides the panel: hidden
  bars stay hidden (2026-11-10).
- **Any movement counts**: 1pt down hides, 1pt up shows (chosen on an iPhone).
  Only the person's own scrolling counts — a
  drag and the fling after it — never a pinch or a rotation, which move the text
  too.
- **A hide or show plays to the end** (0.35s), and nothing starts until it has.
  Instant, it flickers at some scroll speeds; animated but interruptible, a turn
  mid-animation starts another.
- **It never touches the scroll.** The bar keeps its place and is only slid and
  faded; removing it would change the reading area's size, which lays the text out
  again mid-scroll and stutters. Nor does the status bar: the reader is laid out as if it
  were showing (on Android, `statusBarsIgnoringVisibility`), so hiding it moves
  nothing. Whatever is drawn behind the bars goes with them.
- **Never while Controls is open** (the popover points at the bar), **nor under a
  screen reader**, which reads the bar as it moves through the screen.
- The status bar hides only over content being read: the default screen and the
  Journeys sidebar keep it. On Android, while it is hidden a swipe down from the top shows
  it for a moment, the system's own way back to it.

### The screen stays awake while content is read

**While the viewer shows content — a bani, shabad, ang, anything being read — and
no sidebar is open, the app keeps the screen from sleeping** (decided 2026-10-19).
Someone reading along during kirtan or paath is not touching the phone, and a
screen that dims and locks mid-pauri interrupts them.

- **It lasts until the journey goes idle** ([journeys.md](journeys.md#journeys)):
  15 minutes without activity end the journey, the viewer returns to the default
  screen, and the hold goes with it. A phone left reading does not stay lit all
  night.
- **Everywhere else the device's own auto-lock applies**: the default screen, and
  the viewer while either sidebar is open.
- This is separate from hosting a Connect session, which holds the screen for its
  own reasons ([connect.md](connect.md)).

## The default screen

**What the viewer shows when there is nothing to resume**: a blank screen reading
**ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ**.

It carries a **continue reading** affordance whose byline names the anchor of the
most recent journey ([journeys.md](journeys.md#recents-and-inactive-sessions)) — "what it was on last
open". If there is no previous journey, the greeting stands alone with no
affordance; an empty or dead control on a first launch is worse than nothing.

**Both its lines stay on one line** (2026-10-22): where `Continue reading` does not
fit it reads `Continue`, never wrapped and never `Continue…`, and the bani's name is
cut short with an ellipsis.

#### How long `continue reading` is offered

**It depends on what was being read** (decided 2026-10-16). Different readings are
picked up again over different spans, so one window cannot serve them all:

| What was read | Offered for | Built |
| --- | --- | --- |
| **A daily bani**: Morning Nitnem's five, Rehras Sahib, Kirtan Sohila — every bani bundled today | **8 hours** since it was last read | iOS, Android |
| **A sehaj paath** | **2 weeks** since it was last read | Not yet: needs bookmarks ([library.md](library.md#bookmarks)) |

- **"Last read" is the last activity on it**, not when it was opened: someone who
  read Rehras for forty minutes is measured from the end of those forty minutes.
- **One rule, however the app was left.** The same window applies after a journey
  ends by going idle, after the app is closed from the app switcher, and after the
  system ends it in the background. The open journey itself is not saved yet, so a
  closed app always opens to this screen; only what was last read is remembered.
- **Beyond its window the affordance is absent**, as on a first launch, and it is
  withdrawn from a screen left showing when its window passes.
- **Anything else read** — not yet possible in the apps — is not offered until its
  window is decided.

#### What is due now

**The scheduled items for right now appear here, and only here.** This screen is the
app's most-seen surface and otherwise holds a greeting and nothing else, and the goal
is to get someone reading immediately — zero taps here, at least one anywhere else.

**It is not repeated in the sidebar.** Someone who wanted it has already acted on it,
and the sidebar's `Tracker` covers the same items from a different angle: this screen
asks *what now*, the Tracker asks *how am I doing*. The same list appearing twice
would be two places to keep correct for one question.

What it shows: the Library items scheduled for this time of day and this day of the
week ([library.md](library.md#periods-and-the-clock)) — Japji Sahib in the morning, Rehras Sahib
and Kirtan Sohila in the evening, Asa Ki Var on the days it is set for.

**Recommendation: order by schedule, do not filter by it.** Put what is due first and
keep the rest below, rather than hiding anything. A list whose *contents* change
across a boundary appears broken — someone opening at 11:58 and again at 12:02 sees a
different app and has no way to learn the rule. Reordering is as fast to use and is
never wrong.

**Everything scheduled is still browsable in the Library** as a suggested reading,
which is what makes ordering rather than filtering safe.

**The 15-minute idle boundary that produces this state is settled**, including that
it may take effect while the app is open —
[journeys.md](journeys.md#journeys) records why fifteen minutes is safe in
live use. A **continuous** journey is not ended by it, only its session, so its
`continue reading` remains accurate the next morning.

## The Journeys sidebar

**Four bands. Only the third scrolls.**

```
┌────────────────────────────────┐
│ (lotus) Shabad OS              │  header — fixed
├────────────────────────────────┤
│ New journey                    │  ┐ sticky
│ Tracker    Nitnem  ▓▓▓▓▓░░ 71% │  │
│            See all goals     › │  ┘
├────────────────────────────────┤
│ Pinned                         │  ┐
│   Asa Ki Var                   │  │
│   Anand Sahib (6 Pauri)        │  │
│ 2 September 2026          ⋯    │  │ scrolls
│   Dhanaasaree Mahalaa 5        │  │
│ Recents                        │  │
│   1 September 2026             │  │
│   Inactive sessions          › │  ┘
├────────────────────────────────┤
│ Library                        │  fixed
└────────────────────────────────┘
```

### Header

Lotus logo plus **Shabad OS** at the left. No toggle: the viewer's Journeys button,
on the viewer's edge to the right, returns to the viewer.

**The header does not scroll with the list.** It floats above the scrolling content,
and the content **fades to nothing** as it passes beneath — a mask, not an opaque
bar. Gurmukhi has tall ascenders and a continuous headline; a hard edge cutting
through the sirlekh of a row reads as a rendering fault. The fade is not decoration,
and it is required on every platform. No platform provides it for free —
[interaction.md](../interaction.md#interactions).

### New journey, and Tracker

A sticky band directly below the header.

**`New journey`** — always present. **The default screen *is* this surface**
([The default screen](#the-default-screen)); there is no separate one. Selecting it
shows the default screen in the viewer, and it reads as selected whenever the viewer
is showing it.

**There is no `Continue journey`.** Continuing is opening the first row of Recents,
which is already the most recent journey. A second affordance for the same action is
a second thing to keep correct.

**`Tracker`** — the goal-bearing items from the Library
([library.md](library.md#goals)), each with its progress for the current period:

- A **percentage, 0 to 100**, which **becomes a green badge at 100**.
- **`See all goals`**, with a chevron, for everything not shown.

**This is also how a sehaj paath is resumed**, and it is a better route than a
history list: the most recent paath is the one with a goal outstanding today, not
necessarily the one read most recently.

**What appears here is due, not recent.** An item whose goal has a period covering
now belongs here whether or not it has been opened; that is the point of a tracker.
**A tracked item with no goal does not appear** — there is nothing to be due.

**A row's progress is against its goal, not against the whole work.** Asa Ki Var at
four pauris a day shows progress toward today's four, not toward finishing the var,
and turns green when the four are read
([library.md](library.md#why-this-beats-a-schedule-flag-asa-ki-var-four-pauris-a-day)).

### Pinned

**Items kept for quick selection** — a shabad, a collection, or an item within one. A
gurdwara pins `Asa Ki Var` and `Anand Sahib (6 Pauri)` so a diwan starts in one tap
rather than a search.

**Pinned items sit above Current and are excluded from it.** An item that is pinned
appears here and not there, which keeps the current journey's list to what is
actually new.

**A pinned item does not remember its position across journeys** — its progress
belongs to the journey it was read in, and a new journey starts it fresh. That is
right for the gurdwara case, where last week's position in Asa Ki Var is not where
this week begins.

**Bookmarks can never be pinned**, which is what makes the rule above unambiguous —
see [journeys.md](journeys.md#pinning-and-tracking-are-different-promises).

### The current journey

**The tabs of the journey in progress**, one row each
([journeys.md](journeys.md#the-current-journey-and-recents)), excluding anything
pinned. Absent when there is no journey in progress.

**Its section heading is the journey's own name** — the date, by default — not the
word "Current", with the **rename control beside it**. When the journey ends, that
same heading becomes its row in Recents, so a person watches their session move down
the list rather than vanish and be replaced by something unfamiliar.

**These are tabs, not journeys** — the section below lists journeys. Tapping a row
brings that tab forward in the viewer.

**Long-pressing a tab offers `Share`, `Pin`, and `Close`.** Closing sits behind a long
press deliberately: it removes the tab from the journey permanently, and someone
tidying a crowded list must not be able to do that by brushing a row
([journeys.md](journeys.md#closing-a-tab)).

### Recents

**Recents lists whole journeys, one row each** — never tabs. Opening a row restores
that journey's tabs. A gurdwara diwan is one row, not forty.

**Journeys are labelled by date**, and can be renamed while one is in progress
([journeys.md](journeys.md#labels)). Recents covers the last 14 days; everything
older is **inactive** and reachable from the row below.

**Row actions.** Tapping restores the journey. Long-pressing offers **rename**.

**`Inactive sessions` is the last row of Recents**, with a trailing chevron marking it
as a way further in rather than a journey.

### The Library row

Permanently pinned below Recents; does not scroll. **Opens the Library**
([library.md](library.md)) — collections, bookmarks, every asset and its table of
contents, and the digitized images.

**This is the only route to content the person has not already read.** Every other
section of this sidebar shows history. Naming it `Library` rather than `Collections`
is deliberate: collections are one of four things inside it, and the earlier name
described the smallest of them.

## Inactive sessions

Opens **in the viewer**, not in the sidebar: tapping the row closes the sidebar and
the viewer shows the list.

- **Title:** `Inactive sessions`.
- **Contents:** every journey older than the 14-day Recents window, most recent
  first. **Nothing else** — recent journeys are already one tap away in the sidebar,
  and listing them twice is two places to keep correct.
- **Rows carry a byline** — what the journey was and when. The sidebar omits it; this
  view exists for finding something, and a date alone is not enough to find by.

**There is no filter.** An earlier draft had one offering `All / Pinned / Recent /
Inactive`. Journeys are never pinned, recent ones are not in this list, and inactive
is all that remains — leaving a control with one option. **A filter returns when
there is a use case for one**, which there is not yet.

**The word is `Inactive`.** Not `Archived`, not two words for one concept.

## Controls

**The platform's own container for options opened from a button**
([ADR-0016](../architecture/decisions/0016-controls-and-the-viewers-bar.md)): **a
popover on iOS and iPadOS**, pointing at the Controls button, on iPhone too and in
either orientation; **a modal bottom sheet on Android**, with Material's default dim,
always at its contents' full height. Either way the reader stays in view behind it,
so a slider's change shows on the reader itself, and **a tap outside closes it and
goes no further**; on Android so do Back and a drag down.

**One Controls button, on the viewer's bar**, as for Journeys: the icon does not
change when open. **A long press on it opens Settings** ([Settings](#settings)).

**No header** (2026-11-09): it opens from the Controls button, which names it. The
appearance control lives in [Settings](#settings).

**Contents** (2026-10-19): **Zoom, Ratio and Weight**, sliders, **without their
bylines** (2026-11-09): the titles say enough beside the reader they change, and
Settings' Appearance page keeps them. The preview and the toggles live in
[Settings](#settings); the sliders are in both for now.

**A `Settings` row sits at its foot**, in view whatever the sliders' scroll, so
Controls ends with the door to the deeper surface, as the Journeys sidebar ends with
`Library`.

**Its size on iOS** is 255 × 340 points (2026-11-09), enough for the three sliders
without scrolling; the system shrinks it where the screen is shorter (an iPhone on
its side) and the sliders then scroll.

Every setting's range, default and persistence is
[display-controls.md](display-controls.md).

**A setting's whole row is its target**, here and in Settings: tapping `Pauses`
toggles it, not only tapping its switch.

**Not taken** (2026-11-09):

- **A sidebar mirroring Journeys**, as before: it hid the reader its sliders change.
- **Android's standard (non-modal) sheet**: it left the reader live beneath it, so a
  tap there never closed it. The modal sheet's dim is Android's usual sign of a
  sheet opened from a button.
- **A menu**: iOS menus cannot hold sliders.
- **A sheet on iPhone, and a custom overlay**: the popover is the platform's own,
  and an overlay would own its dismissal, accessibility and sizing.

## Settings

**It slides up over everything, full screen**, from Controls' `Settings` row
(decided 2026-10-19). **Controls closes first, then Settings opens** (2026-11-09), on
every platform: a popover or a modal sheet would otherwise sit beneath Settings or
over it half-covered. Closing Settings returns to the viewer, so it is never a place
you can get stranded in.

**A long press on the viewer's Controls button opens it too** (2026-10-22), and it
closes back to the viewer. An accelerator over the
`Settings` row, not a replacement for it ([input](#input)): the long press is touch's,
a held select is the remote's, and the screen reader offers it as an action named
`Settings`. On iOS that button gives up the large content viewer the other bar
buttons show on a long press at accessibility text sizes, since both would answer the
same touch.
Its title, `Settings`, is centred at the top. **How it closes follows the platform**:

- **iOS**: a sheet, closed by swiping it down or by a ✕ at the top right of its first
  page. Pages within it have the system's back at the top left and no ✕.
- **Android**: a full-screen dialog with no gap at its corners. **Back at the top left
  of every page, never a ✕**: on the first page it closes Settings, on a page within
  it returns to the first. System Back does the same. A swipe does not close it.

**Its items are menus, in groups without labels.** A menu opens a page within the
sheet, with a way back to Settings at its top left.

**The first group** (2026-10-19):

| Menu | Holds |
| --- | --- |
| **Appearance** | A **preview** at the top, and the **Zoom, Ratio and Weight** sliders in a group fixed at the bottom; **Reset** at the top right |
| **Display** | **Pauses**, and the two **pronunciations** |

**The preview** shows what the sliders do: two lines drawn exactly as the reader
draws them, at the reader's size, ratio and weight. Gurmukhi `ਇਹ ਉਦਾਹਰਨ ਹੈ ॥` (a space
before the double dandi) and beneath it, as a secondary line, `Here's an example.`
(no space before the period). **Each stays on one line**, cut short with an ellipsis
rather than wrapping, so a large size does not push the sliders away. Fixed text, not
taken from the bani being read, so it means the same everywhere; it will carry
continuous and larivaar when those exist. Only Appearance has one. **It sits on the
Settings background with no card of its own**, and grows with the size. **The sliders
are always in view**, at the bottom, whatever the size: once the preview needs more
room than the sliders leave it, it scrolls, and they do not move (2026-10-22; a
large Zoom had pushed them off an iPad's Settings window). **It scrolls behind the
sliders' group**, which covers it, **and no lower than the group's bottom edge**: it
is never seen in the space beneath the group, and never cut off above it.

**Appearance's Reset** is a red reset icon at the top right of its page, where
nothing else sits (on iOS the page has no ✕; on Android it would have been the ✕'s
place). It is destructive, so it asks first: **"Reset zoom, ratio, and weight?"**,
"Your preferences will reset to the original settings.", with **Reset** (in red) and
**Cancel**. Reset returns Ratio and Weight to their defaults and Zoom to the starting
size this device would be given on a first launch, at its current text size setting
([display-controls.md](display-controls.md#starting-size)). Nothing else changes.

**Below the group, the appearance picker**, in a group of its own: three boxes side by
side, labelled `Light`, `Dark` and `System` beneath, choosing the Appearance setting
([display-controls.md](display-controls.md#appearance)).

- **Each box is a small picture of the reader in that appearance**: its background,
  two horizontal bars at the top left in its text colour, standing for lines, and
  three circles at the bottom right in its three vishraam colours. The circles show
  whether or not Pauses is on: they illustrate the appearance, not the setting.
- **`System` is split on a diagonal**: Light's picture in the top-left half, with its
  bars, and Dark's in the bottom-right half, black, with its circles.
- **Each label stays on one line**, cut short with an ellipsis at the largest text
  sizes rather than broken across two (`Sys-tem`, 2026-10-22).
- **The chosen box has a blue outline and a blue label**, in the platform's own blue
  (iOS's system blue; on Android, which has none, the app's `ui` colour).

**It holds what Controls deliberately does not**: things set once and rarely, or set
by someone who wants more than the app assumes.

| Holds | Specified in |
| --- | --- |
| **Preset authoring** — named sets of control values | [library.md](library.md#presets) |
| **Accessibility floors** — minimum zoom | [display-controls.md](display-controls.md#accessibility-floors) |
| **Gesture toggles** — pinch-to-zoom on or off | [display-controls.md](display-controls.md#gestures) |
| **Default view mode**, and whether it follows the last used | [display-controls.md](display-controls.md#mode) |
| **Tracking options** — the AM/PM boundary | [library.md](library.md#periods-and-the-clock) |

**Nothing here is required to use the app.** Every option has a working default, and
a person who never opens Settings must not encounter a feature that is inert until
they do.

## Large text

The interface follows the platform's text size, **within limits that keep
Appearance's preview in view** (2026-10-19). Interface text is Journeys, Controls
and Settings. **Never the reader or the preview**, which Zoom sizes, and never the
bars, which stay at the default size on iOS ([header](#header)).

**The sidebars' header titles are marks, not text** (2026-10-22): `Shabad OS` with
its icon, and `Controls`, stay on one line at every size. On iOS they do not follow
Text Size, as no bar does. On Android they grow with Font size up to 28dp and stop,
the icon keeping its proportion to the name, so the pair reads as a logo.

The goal on Appearance's page: **the sliders' group starts no higher than halfway
down the screen**, at every text size and display size, so the preview keeps the
top half.

**Appearance's page measures, on both platforms**, and takes the first layout whose
group starts halfway down or lower:

1. title, byline, slider, stacked;
2. the same without bylines;
3. **compact rows**: the title and the slider on one line, the title's size capped
   (about Body at Android's Font size 4 of 7; Headline at iOS's xxxLarge) so the
   slider keeps its length. Used even when it does not fit, as in landscape: it is
   the least the sliders take.

The text size alone does not say which fits:

- **iOS** (iPhone and iPad alike): interface text grows **no further than
  Accessibility 3**, and **from Accessibility 1 on, the sliders' bylines are
  hidden**, everywhere the sliders show. Even so, the stacked sliders took more than
  half of an iPad's Settings window, which is shorter than the screen (2026-10-22).
- **Android**: Font size and Display size together set what fits, and neither
  predicts it alone. On a Pixel 7a, Font size 7 of 7 fitted with bylines at Display
  size 1 of 5, while Font size 1 did not at Display size 5: the sliders themselves
  grow with Display size, and the screen gets shorter.

Controls always stacks its sliders, **without bylines at any size** ([Controls](#controls));
Settings' Appearance page keeps them as above. **Its `Settings` row stays in view at
every text size**: the sliders scroll, the row does not.

**The default screen scrolls when it does not fit**, on both platforms, as at the
largest text sizes. On iOS it had not, and being taller than the screen it made the
shell taller too, moving what lay beside the viewer down past the bottom
(2026-10-22). Whatever the viewer holds, it is the size of the screen.

## About, links, and feedback

Links, social media, and feedback live behind an **About Shabad OS** entry rather
than sitting in the settings list. Settings are things you change while reading;
these are things you visit once. The web app already carries the full set
(`apps/web/src/components/app/toolboxes/controls/controls.tsx`) — About, Blog,
Support, Docs, Privacy, Donate, Instagram, YouTube, email, Slack, GitHub — and that
list, not a new one, is what should be presented.

**Placement within Controls is not fixed** and is open question 6.

## What a test must pin down

- **Screen awake.** A bani open with no sidebar ⇒ held awake; Journeys opened ⇒
  released; the default screen ⇒ released; 15 minutes without activity ⇒ the
  journey ends and the hold is released.
- **Mutual exclusion.** With Controls open, opening Journeys ⇒ Controls is closed.
- **Toggle symmetry.** For Journeys: the bar's button opens it, a swipe opens it, the
  same button closes it, and all three land in the same state. For Controls: its
  button opens it and closes it.
- **Swipe direction.** Rightward on the viewer ⇒ Journeys; leftward from rest ⇒
  nothing. Asserted on both platforms, including with the device in RTL locale — see
  open question 2.
- **Controls closes on a tap outside**, and the tap does not reach the reader: no
  line is tapped, nothing scrolls.
- **The bars follow the scroll.** A drag onward hides them; a drag back, or reaching
  the top, shows them; a tap on a line hides them and lands it below the cutout; a
  pinch moves neither; under a screen reader they never hide.
- **Everything closes the sidebar.** Journey row, tab row, `Inactive sessions`,
  `Library`, and the toggle each leave the viewer visible.
- **Header does not scroll.** With the list scrolled to an arbitrary offset, the
  header's frame is unchanged.
- **Inactive means inactive.** A journey at 13 days appears in the sidebar and not in
  `Inactive sessions`; at 15 days, the reverse. Neither list shows it twice.
- **`continue reading` windows.** A daily bani last read 7h59m ago is offered and at
  8h is not, including after the app is closed and reopened; a sehaj paath at 13
  days is offered and at 14 is not.
- **Empty states.** No journeys at all ⇒ the default screen shows the greeting with
  no `continue reading`; `Inactive sessions` renders an empty list without crashing.
- **Settings from the viewer.** A long press on the viewer's Controls button opens
  Settings with Controls closed; closing it shows the viewer, not Controls. A tap
  still opens Controls, and the touch that held the long press does not also tap.
- **Long labels.** A renamed journey with a 200-character label must not break row
  layout in either the sidebar or `Inactive sessions`.

## Open questions

1. **What is on the `New journey` surface?** Referenced from the sidebar and from the
   default screen, specified nowhere: how something is chosen, whether the Library is
   simply what it opens, and what happens if the person backs out.
2. **Does `Current` disappear or empty when a journey ends?** A section that vanishes
   makes the sidebar jump; one that lingers with stale tabs lies about what is open.
2. **Can a tab be closed from `Current`?** Browsers make this the most-used control
   on a tab. Whether it also edits the journey's timeline is
   [journeys.md](journeys.md#open-questions) question 3.
3. **How many Tracker rows show before `See all goals`, and in what order?** Due
   today, most overdue, and largest streak-at-risk are three different orders, and a
   tracker that shows the wrong three is worse than one that shows none.
4. **What does the Tracker show when nothing is due?** A new install has no
   goals and no dailies, and an empty band directly under the header is the first
   thing a new user sees.
5. **Where does `Read history` render?** It is a list of dated occurrences reached
   from the title menu, and could be a sheet, a panel, or a view in the viewer —
   which matters because it is the one surface that spans journeys.
6. **Where does `About Shabad OS` sit** — a row in Controls, a separate
   sheet, or a section at the bottom?
7. **Does the shell change on iPad and web beyond the sidebar presentation?** The
   `Width` control ([display-controls.md](display-controls.md#width)) exists only
   there, which implies at least one control present on one form factor and absent on
   another.
8. **Where is the omni search box invoked from?** Deferred with search itself — not
   in the first mobile release ([search.md](search.md#one-search-box)). It needs an
   answer before search ships, not before the shell does.

Platform-specific interaction questions — gesture collisions, RTL mirroring, the
desktop shell — are in [interaction.md](../interaction.md#open-questions).
