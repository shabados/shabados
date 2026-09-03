# Journeys

Draft, 2026-09-03. Specified by the author; open questions at the end are blocking.
**Layer 1** — platform-neutral
([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md)).
Structural rationale: [ADR-0012](../architecture/decisions/0012-journeys-replace-viewing-history.md).

Counterpart: [library.md](library.md) is where you *find* something — collections,
bookmarks, assets. This is what you *did*.

## Terminology that is not negotiable

**Never call the Sri Guru Granth Sahib a book**, in code, in copy, or in a variable
name. Many Sikhs regard the SGGS as a living Guru, and "book" is not a neutral
technical word to them. Progress copy needs a generic term for a complete work and it
must not be `book` — **work**, **volume**, **reading** (open question 10).

## The model, in browser terms

The design is a browser, and the correspondence is exact enough to be the
specification rather than an analogy:

| Browser | Here | Is |
| --- | --- | --- |
| Tab | **Tab** | One thing being viewed |
| Session | **Journey** | The set of tabs read together |
| Bookmarks / folders | [Library](library.md) | Where things are found |

**"Journey" and "session" are the same object. Use one word.** This document uses
**journey** throughout, including in code, because it is already the word in the UI
and a model word that differs from the interface word is a translation everyone has
to keep doing (open question 9).

## Tabs

**A tab is one thing being viewed**, and it is always exactly one:

| A tab may be | Notes |
| --- | --- |
| A **shabad** (line-group) | |
| A **collection** — Nitnem, Asa Ki Var | Has internal anchors: its banis and sections, like a page's headings |
| An **ang** | |
| A **bookmark** | Self-updating; the tab is the reading, the bookmark is the position |

**Several shabads never merge into one tab.** They are separate entities and each
gets its own. This is what the old `12 shabads` label was reaching for and getting
wrong: they were never one thing.

**A tab carries the container it was entered through**, which is what makes `next`
and `previous` meaningful — the same shabad traverses its subsection when reached
from search and traverses Nitnem when reached from Nitnem
([library.md](library.md#which-is-why-next-is-a-property-of-the-way-in)).

**A collection tab keeps its own position.** Leaving Asa Ki Var and coming back
returns to where it was, and brings that tab forward.

## Journeys

**A journey is the set of tabs read in one continuous stretch.** It ends after 15
minutes with no activity, and may do so while the app is open — the longest anyone
dwells on a single line in live use is about five minutes, so fifteen minutes without
interaction is a put-down device rather than kirtan or paath.

**Ending a journey closes nothing that matters.** Its tabs are its record. Reopening
a journey restores them, the way session restore does.

**A journey is also the unit that goal periods turn over on.** A journey is evaluated
against the period it started in, so a daily or AM/PM boundary never takes effect
inside one — a diwan running past midnight stays in the evening it began in, and
someone halfway through Nitnem at noon keeps the morning's reckoning until they stop
([library.md](library.md#the-period-turns-over-between-journeys-never-inside-one)).

### The current journey, and Recents

Two different things, and they were previously conflated:

| Section | Lists | Each row is |
| --- | --- | --- |
| **The current journey** | The journey in progress | One **tab** |
| **Recents** | Past journeys | One whole **journey** |

**A row in Recents is a journey, never a tab.** Opening it restores that journey's
tabs. This is what makes a whole gurdwara diwan one row instead of forty
([reading-shell.md](reading-shell.md#the-journeys-sidebar)).

**The current journey's section is titled with its own name** — the date, by default
— rather than the word "Current". So the heading a person has been looking at all
session is the same text that appears in Recents once the journey ends, and the
journey visibly moves down rather than being replaced by something unfamiliar. **The
rename control sits beside that heading**, which is the only place a journey is named
while it is still running.

## The timeline

**Every journey has a timeline: which tab was active, and when.** It is the journey's
real content — the ordered list of tabs is a summary of it.

**This is what Asa Ki Var needs, and it needs nothing else.** A jatha sings some
pauris, then a shabad or three, then returns to the var. In tabs: Asa Ki Var is one
tab that keeps its position; each shabad is its own tab; returning to the var brings
its tab forward and continues where it left off. At the end there is one Asa Ki Var
tab and a list of shabad tabs — **and the timeline is what says when each shabad
happened inside the var.** An earlier draft proposed "excursions" as a special
mechanism for exactly this; **the tab model makes it unnecessary**, which is the
better outcome.

**Three consumers, one record.** This must not be built three times:

1. **Export** — a journey's timestamps, for YouTube chapter markers on a recorded
   diwan.
2. **Reading pace** — intervals between activations
   ([library.md](library.md#goals)).
3. **Audio alignment** —
   [ADR-0008](../architecture/decisions/0008-history-capture-for-audio-alignment.md)
   wants precisely this timeline and is **Needs discussion** on consent and
   retention. Building export first decides both by default (open question 7).

### What goes on it

**A line is active when the person acts on it** — tapped or otherwise interacted
with, or **jumped to** by a user action (a table of contents, a navigation view, a
search result, a next/previous step).

**Scrolling past a line does not activate it.** Only a deliberate act does. This is
what makes the timeline mean something: it records what someone attended to, not what
crossed the viewport. It is also why **reading does not move a bookmark** — a person
who opens a paath and reads two angs ahead without touching anything has not changed
their position, and that is correct.

**Opening a path is recorded too, and is a different thing:**

| Record | Created by | Moves a bookmark? |
| --- | --- | --- |
| **Path open** | Opening an ang, shabad, or collection | **No** — it is history |
| **Activation** | Interacting with a line, or jumping to one | **Yes** |

### Reading this shabad before

**A tab's title menu shows every previous time that tab was read** — how many times,
and when, across all journeys. Same for a collection: how many times Nitnem has been
read, and when.

**This is an index over the timeline, not a second record.** It answers the question
that a flat history never could: *in what context did I read this before?* — because
each occurrence names the journey it belonged to.

**It is also the most personal thing the app holds.** A per-shabad history across
years is a detailed record of someone's practice. Local-only is one answer; it is not
the default that falls out of building it (open question 7).

## Sharing and export

**A share carries the journey's history, not just a position.** A sequence of
entries, each a **path plus a line**, with a timestamp and optionally the **person**
who recorded it.

**Paths are relative.** The source and asset are named once for the journey; each
entry carries only the part of the path that changes plus the line —
`ang_14 + line_xyz`, or `line-group_abc + line_xyz`. Repeating the full path per
entry is the same string thousands of times in a record meant to be sendable.

**Attribution makes a shared paath legible**, and several people reading one sehaj
paath together get **per-person pace** alongside a **group pace**. It is also the
most sensitive field in the format: it turns a reading record into a record of who
worshipped when, shared with a group. Optional per entry, per share, or per person —
open question 8, and it must be settled before the format is fixed.

**Opening a shared link never silently changes anything.** It offers: update an
existing bookmark to this position, or create a new one. **One app cannot write into
another's state**, and nothing here should be built as though it could.

## Labels

**A journey is labelled by its date.** That is the whole rule, and it is enough: a
diwan holding Asa Ki Var, shabads, sequential katha, more shabads, and a six-pauri
Anand Sahib has no derivable name, and every attempt to derive one produces something
worse than the date it happened.

**A journey in progress can be renamed**, and a renamed label is **frozen** — never
recomputed. Which of the two kinds is stored must be recorded **explicitly**, never
inferred by comparing the stored string to what the deriver would produce today.

**Dates collide.** Two journeys on one day both label as that day, and a gurdwara has
a morning and an evening diwan. The disambiguator — a time, an ordinal, or the period
of day — is open question 2.

## Closing a tab

**A tab can be closed**, because people search the wrong thing and open the wrong
ang. Closing is reached by **long-pressing the tab in the sidebar**, alongside
`Share` and `Pin` — never a swipe and never a visible button, because the most likely
reason to reach for it is that the list feels crowded, and tidying must not be able
to destroy a record.

**Two levels, and they are separate acts:**

| Act | Effect |
| --- | --- |
| **Close the tab** | Gone from the journey's tab list, permanently. **The timeline keeps it.** |
| **Remove from the timeline** | Gone entirely. |

**The timeline surviving a close is the point.** It is what exports as YouTube
chapter markers, so someone tidying a crowded sidebar mid-diwan must not silently
destroy the timestamps for a recording that is still running.

**Closed tabs appear in the timeline behind a `deleted items` toggle**, and read
differently from open ones: an ordinary entry says `xyz`; a closed one says
`xyz opened` and `xyz closed`, at two timestamps.

**Neither act has an undo**, and that is accepted: **removing a timeline entry takes
a second long-press of its own.** Someone who has long-pressed twice is trying hard
to delete it, and no confirmation dialogue adds information they do not already
have.

## Pinning and tracking are different promises

Two mechanisms that could easily have been one, kept apart deliberately — and applied
to **disjoint kinds of thing**, so "what does pinning this mean?" never has four
answers.

| | Applies to | Means | Across journeys |
| --- | --- | --- | --- |
| **Pin** | A shabad, a collection, an item in one | Quick access | **Starts fresh** — position is per journey |
| **Track** | A bookmark, a collection | A position is kept, with an optional goal | **Persists**, unless the goal says `Complete` |

**A bookmark cannot be pinned. It can only be tracked.** A bookmark *is* a persistent
position, so pinning one would have to mean both "start fresh each journey" and
"remember where I was" about the same object. Forbidding it removes the contradiction
instead of resolving it case by case.

**Several bookmarks can exist at once**, including several into the same container,
and each keeps its self-updating behaviour regardless of anything above
([library.md](library.md#tracking)).

**Everything pinnable starts fresh in a new journey.** A gurdwara that pins Asa Ki Var
begins this week's diwan at its start, not where last week ended.

**Pinned items are excluded from `Current`** and shown in their own section, which is
what keeps the current journey's list to what is actually new
([reading-shell.md](reading-shell.md#pinned)).

## Recents and inactive sessions

**Recents lists journeys active within the last 14 days**, most recent first.
**Older is inactive** — absent from the sidebar, reachable from `Inactive sessions`
([reading-shell.md](reading-shell.md#inactive-sessions)). **Inactive is derived,
never stored**: a flag plus a date is two sources of truth that drift the first time
a clock is wrong.

**Journeys are never pinned** — pinning applies to items, and always did. **The
filter on that screen is removed entirely**: with pinning gone from journeys and
recent ones already in the sidebar, it would have one option left. A filter returns
when there is a use case for one.

**The term is `Inactive`, not `Archived`**, everywhere — one word for the concept.

**Continuing is opening the first row of Recents**, which is why there is no separate
continue affordance.

## What a test must pin down

- **One thing per tab.** Reading four shabads produces four tabs, never one.
- **Tabs remember entry.** The same line-group opened from search and from Nitnem
  produces tabs with different `next` targets.
- **A collection tab holds position within a journey.** Advance Asa Ki Var three
  items, open two shabads, return ⇒ it resumes at the fourth.
- **A pinned item does not hold position across journeys.** Advance Asa Ki Var three
  items, end the journey, start a new one ⇒ it opens at the first.
- **A tracked bookmark does hold position across journeys**, in the same sequence.
- **Bookmarks cannot be pinned.** No action produces a pinned bookmark.
- **Pinned items are absent from `Current`** while present in `Pinned`.
- **Recents rows are journeys.** A journey with forty tabs is one row; opening it
  restores forty tabs.
- **Closing keeps the timeline.** Close a tab ⇒ it leaves the tab list, and the
  timeline still holds it with both an opened and a closed timestamp under
  `deleted items`.
- **Removing from the timeline removes it from the export.** Asserted on the exported
  payload, not on the UI.
- **Timeline ordering.** Asa Ki Var interleaved with three shabads yields a timeline
  in the order things happened, not the order tabs are listed.
- **Activation, not scrolling.** Scroll a full screen without tapping ⇒ nothing
  recorded, and no bookmark moves. Tap one line and jump to another ⇒ exactly two
  activations, timestamped.
- **Export round-trips.** Export, re-import ⇒ identical timeline.
- **Read history is complete.** A shabad read in three journeys reports three
  occurrences, each naming its journey.
- **Boundary.** Activity, a 15-minute gap, activity ⇒ two journeys. A 14-minute gap ⇒
  one.
- **Journey restore.** End a journey, reopen it ⇒ the same tabs, each at the position
  it held.
- **Labels.** A new journey labels as its date; renaming it survives further tabs
  being added.
- **Shares carry no scripture.** A serialised share contains no line text — only
  identifiers. Asserted on the payload.
- **Clock hostility.** Journeys timestamped in the future or before the epoch must not
  crash the list, reorder it into nonsense, or corrupt a pace figure.

## Open questions

1. **Is there a tab limit, and what happens at it?** A full diwan is a long journey,
   and every browser has had to answer this. Related: does `Current` stay usable at
   forty rows?
2. **How are two journeys on the same day distinguished?** A morning and an evening
   diwan both label as that date. A time, an ordinal, or the period of day — and
   whichever it is, it has to appear in Recents, not only on the journey itself.
3. **Where does the omni search box live?** [search.md](search.md#one-search-box)
   settles that there is exactly one, spanning the current view, the Library,
   collections, and bookmarks. Nothing in the shell says where it is invoked from.
4. **Are tabs shared across devices?** Session restore is a browser expectation.
   Nothing here requires a network, and streaks and read history make the answer more
   consequential than it looks.
5. **What ends a journey other than idle?** A browser has explicit close. Fifteen
   minutes is the only stated boundary, and a diwan with a long break in it is one
   journey or two depending on the answer.
6. **What is a "user" in a shared journey?** Attribution implies identity, and nothing
   in this app has one. A name typed per share, an account, and a device are three
   answers with three privacy stories.
7. **Who owns the timeline?** It is the same record
   [ADR-0008](../architecture/decisions/0008-history-capture-for-audio-alignment.md)
   wants for audio alignment, and that ADR is undecided on consent and retention. Read
   history across years makes this more pressing, not less. Related:
   [ADR-0007](../architecture/decisions/0007-telemetry.md).
8. **Is attribution optional, and at what granularity?** Per entry, per share, or per
    person.
9. **Is `journey` the word, everywhere?** Recommended: one word, in code and in copy.
    `Session` is the more accurate model word and `journey` the better UI word; using
    both guarantees a permanent translation step.
10. **What is the generic term for a complete work?** Needed for progress copy.
    **Not `book`** — see [Terminology](#terminology-that-is-not-negotiable).
11. **What is the share size bound?** A completed sehaj paath is tens of thousands of
    timeline entries. That is a file, not a link, and not a QR code.
