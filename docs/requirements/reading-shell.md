# Reading shell

Draft, 2026-09-03. Specified by the author; open questions at the end are blocking.
Covers the **frame around the text** — the viewer, the two sidebars, their headers,
and the gestures between them. What the text itself looks like is
[display-controls.md](display-controls.md); what the Journeys sidebar lists is
[journeys.md](journeys.md).

**Layer note.** This is **layer 1** — what must be observably true, on every
platform ([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md)).
It carries no gesture names, no icon names, and no framework names; those are
[interaction.md](../interaction.md) and [`brand/icons.json`](../../brand/icons.json).

**Scope note.** This describes the platform reading app —
[plan.md](../plan.md) Phase 3. It is **not** a description of `apps/ios` and
`apps/android` as they stand: those are store-retention scaffolds that
[apps/README.md](../../apps/README.md) and [plan.md](../plan.md#outside-the-phases-store-retention-scaffolds)
both say must not be grown into the real apps. Building this into them contradicts
that, and is a decision to take deliberately rather than by accident.

## Four surfaces, one of them always visible

```
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│ Journeys  │      │  Viewer   │      │ Controls  │      │ Settings  │
│           │ ◀─── │           │ ───▶ │           │ ───▶ │           │
│ sidebar   │      │ (always   │      │ sidebar   │ ◀─── │  (deeper) │
│           │ ───▶ │  present) │ ◀─── │           │ back │           │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
```

**Settings sits one level beyond Controls**, not beside it. It is reached only from
Controls and returns only to Controls, which is what keeps a rarely-visited surface
from competing with the two that are used constantly.

**The viewer is the app.** It shows whatever is being read — a bani, a shabad, a
page — and it is what the app opens to. The two sidebars are transient surfaces
over it, never destinations in their own right.

**On mobile a sidebar takes the whole screen.** On wider surfaces (web, iPad) it
behaves like claude.ai's sidebar: a toggleable panel alongside the viewer rather
than over it. The same states and the same controls; only the presentation of
"open" differs.

**Exactly one sidebar is open at a time.** Opening one closes the other.

## Getting between them

**At least one way in, and every way in must agree with the way out.**

- **The header button.** Top-left of the viewer reaches Journeys; top-right reaches
  Controls. Present on every platform.
- **A direct gesture from the viewer**, where the platform has one. Journeys is
  reached by moving the viewer towards the side Journeys is on, Controls likewise —
  so the gesture and the layout state the same thing.

**Which gestures exist is a platform judgement, not a requirement.** Web has no
horizontal swipe and does not gain one; the header button alone satisfies this.
[interaction.md](../interaction.md#interactions) has the per-platform answers
([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md)).

**The sidebar's own toggle is the same icon, filled.** When Journeys is open, the
Journeys button is drawn filled to say "this is on", and tapping it turns it off
and returns to the viewer. Same for Controls. **The icon never changes shape
between states** — only its fill — because a shape change reads as a different
button, and the person is trying to get back to where they were.

**Every path back to the viewer closes the sidebar.** Tapping a journey, tapping
`Inactive sessions`, tapping `Library`, and tapping the filled toggle all return to
the viewer in one action. There is no state where a person has tapped something and
is still looking at the sidebar wondering whether it worked.

**Where a gesture exists it competes with text selection and with pinch-to-zoom**
([display-controls.md](display-controls.md#zoom)), and the conflict must be resolved
deliberately rather than by whichever recogniser happens to win. The
platform-specific collisions — system back-swipe, gesture navigation — are in
[interaction.md](../interaction.md#open-questions).

## The viewer

A header and a reading area.

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

## The default screen

**What the viewer shows when there is nothing to resume**: a blank screen reading
**ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ**.

It carries a **continue reading** affordance whose byline names the anchor of the
most recent journey ([journeys.md](journeys.md#recents-and-inactive-sessions)) — "what it was on last
open". If there is no previous journey, the greeting stands alone with no
affordance; an empty or dead control on a first launch is worse than nothing.

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
│ (lotus) Shabad OS      [◧ on]  │  header — fixed
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

Lotus logo plus **Shabad OS** at the left; the filled Journeys toggle at the right,
returning to the viewer.

**The header does not scroll with the list.** It floats above the scrolling content,
and the content **fades to nothing** as it passes beneath — a mask, not an opaque
bar. Gurmukhi has tall ascenders and a continuous headline; a hard edge cutting
through the sirlekh of a row reads as a rendering fault. The fade is not decoration,
and it is required on every platform. No platform provides it for free —
[interaction.md](../interaction.md#interactions).

### New journey, and Tracker

A sticky band directly below the header.

**`New journey`** — always present. Opens the surface where a person chooses
something to read. **It is also what is selected when the viewer is showing the
default screen**, so the sidebar always reflects where you are.

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

## The Controls sidebar

Same shell, mirrored: header with the filled Controls toggle at the left of the
title `Controls`, appearance control at the right. Its contents — every setting, its
range, its default, and its persistence — are
[display-controls.md](display-controls.md).

**A sticky `Settings` row sits at its footer**, in the position the Journeys sidebar
gives to `Library`. Both sidebars therefore end with the door to the deeper surface
on their side.

## Settings

**One level to the right of Controls.** Its header carries a **`Back`** button at the
top left, returning to Controls with the viewer to its left — so the way out is the
way in reversed, and Settings is never a place you can get stranded in.

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

## About, links, and feedback

Links, social media, and feedback live behind an **About Shabad OS** entry rather
than sitting in the settings list. Settings are things you change while reading;
these are things you visit once. The web app already carries the full set
(`apps/web/src/components/app/toolboxes/controls/controls.tsx`) — About, Blog,
Support, Docs, Privacy, Donate, Instagram, YouTube, email, Slack, GitHub — and that
list, not a new one, is what should be presented.

**Placement within the Controls sidebar is not fixed** and is open question 5.

## What a test must pin down

- **Mutual exclusion.** Open Journeys, then trigger Controls ⇒ Journeys is closed.
- **Toggle symmetry.** For each sidebar: header button opens it, swipe opens it, the
  filled toggle closes it, and all three land in the same state.
- **Swipe direction.** Rightward on the viewer ⇒ Journeys; leftward ⇒ Controls.
  Asserted on both platforms, including with the device in RTL locale — see open
  question 2.
- **Everything closes the sidebar.** Journey row, tab row, `Inactive sessions`,
  `Library`, and the toggle each leave the viewer visible.
- **Header does not scroll.** With the list scrolled to an arbitrary offset, the
  header's frame is unchanged.
- **Inactive means inactive.** A journey at 13 days appears in the sidebar and not in
  `Inactive sessions`; at 15 days, the reverse. Neither list shows it twice.
- **Empty states.** No journeys at all ⇒ the default screen shows the greeting with
  no `continue reading`; `Inactive sessions` renders an empty list without crashing.
- **Long labels.** A renamed journey with a 200-character label must not break row
  layout in either the sidebar or `Inactive sessions`.

## Open questions

1. **What is on the `New journey` surface?** Referenced from the sidebar and from the
   default screen, specified nowhere: how something is chosen, whether the Library is
   simply what it opens, and what happens if the person backs out.
2. **Does `Current` disappear or empty when a journey ends?** A section that vanishes
   makes the sidebar jump; one that lingers with stale tabs lies about what is open.
3. **Can a tab be closed from `Current`?** Browsers make this the most-used control
   on a tab. Whether it also edits the journey's timeline is
   [journeys.md](journeys.md#open-questions) question 3.
4. **How many Tracker rows show before `See all goals`, and in what order?** Due
   today, most overdue, and largest streak-at-risk are three different orders, and a
   tracker that shows the wrong three is worse than one that shows none.
5. **What does the Tracker show when nothing is scheduled?** A new install has no
   goals and no dailies, and an empty band directly under the header is the first
   thing a new user sees.
6. **Where does `Read history` render?** It is a list of dated occurrences reached
   from the title menu, and could be a sheet, a panel, or a view in the viewer —
   which matters because it is the one surface that spans journeys.
8. **Where does `About Shabad OS` sit** — a row in the Controls sidebar, a separate
   sheet, or a section at the bottom?
9. **Does the shell change on iPad and web beyond the sidebar presentation?** The
   `Width` control ([display-controls.md](display-controls.md#width)) exists only
   there, which implies at least one control present on one form factor and absent on
   another.
10. **Is there any search entry point?** [search.md](search.md) specifies search
    behaviour and this shell has nowhere to invoke it. The Library covers browsing,
    which makes the absence of search more conspicuous, not less.

Platform-specific interaction questions — gesture collisions, RTL mirroring, the
desktop shell — are in [interaction.md](../interaction.md#open-questions).
