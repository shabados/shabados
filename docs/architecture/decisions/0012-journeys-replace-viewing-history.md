# 12. Tabs, journeys, and a Library replace viewing history

2026-09-02 · **Accepted** (2026-09-04)

**Revised in place on 2026-09-02, while still Proposed.** Two earlier drafts of this
decision — journeys with *kinds*, then journeys with *modes* — are superseded by the
model below. They are not preserved: nothing was ever built against them, and
[ADR-0001](0001-record-architecture-decisions.md)'s rule that ADRs are superseded
rather than edited protects the record of what was **Accepted**, which this never
was. What each attempt got wrong is recorded under [Rejected](#rejected), because
that is the part worth keeping.

Behaviour: [journeys.md](../../requirements/journeys.md),
[library.md](../../requirements/library.md),
[reading-shell.md](../../requirements/reading-shell.md),
[display-controls.md](../../requirements/display-controls.md).

## Context

v2 records **every line viewed, with a timestamp**, and presents it as one flat list.
Three problems, and only the first is a UI problem:

- **A log is not a history you can navigate.** The unit of recall is a *sitting*; the
  unit of storage is a *line*. Someone who read Nitnem this morning gets dozens of
  rows and cannot find "this morning".
- **Nothing in the app has the shape of a session.** Resuming, "continue reading",
  and grouping all want a bounded interval of use, and there is no such object — so
  each feature invents its own, which is how v2 ended up with several pointers that
  disagreed ([navigation.md](../../requirements/navigation.md#main-line-and-autoselect)).
- **Nothing has the shape of a catalogue either.** Nitnem exists only as a hard-coded
  array in `database/scripts/export-bundled-banis.ts`. A list in a build script cannot
  be referenced, versioned, or shown to anyone.

## Decision

**Adopt the browser model.** The correspondence is exact enough to be the
specification rather than an analogy, which is the point: it is a model every user
already has, and every unresolved question has a known-good answer to borrow.

| Browser | Here | Is |
| --- | --- | --- |
| Tab | **Tab** | One thing being viewed — a shabad, a collection, an ang, a bookmark |
| Session | **Journey** | The set of tabs read together; ends after 15 idle minutes |
| Bookmarks and folders | **Library** | Collections, bookmarks, assets and their tables of contents, digitized images |

**Three consequences carry the design:**

**1. A tab carries the container it was entered through.** This is what makes `next`
meaningful: the same shabad traverses its subsection when reached from search and
traverses Nitnem when reached from Nitnem. It reuses the settled rule that ordering is
owned by the parent container and the session carries the container as a **path**
([data-model.md](../../requirements/data-model.md#structural-versus-overlay-containers)).

**2. Collections are overlay containers; default parents are structural ones.** That
distinction is already in the data model, so collections — including ones users
author — need nothing new. Nitnem becomes a **bani-group**, which is a corpus change
and a prerequisite, not a note.

**3. Every journey has a timeline** — which tab was active, when. It has **three
consumers and must be built once**: journey export (YouTube chapter markers for a
recorded diwan), reading pace, and
[ADR-0008](0008-history-capture-for-audio-alignment.md)'s audio alignment.

**Rendering stays one global value.** Mode is a single setting like every other
control. **Presets** — named, user-authored, optional, in a Settings surface beyond
Controls — are **deferred**: when built, a preset simply sets the global values as the
person would have, with no scope to enter, hold, or leave. In practice a gurdwara sits
in `Presenter` permanently and a person doing nitnem picks one rendering and keeps it,
so the machinery an earlier draft specified served almost nobody.

**Accessibility is guarded by a floor, not by restricting authorship.** A minimum
zoom, applied *last* — after presets, after the slider, after pinch — and pinch-to-zoom
switchable off. The real failure is not a badly authored preset but unreadable text
with no obvious way back, which a stray pinch causes just as easily; a floor covers
both, a prohibition covers neither.

**Tracking is one thing: a saved position in a container, with an optional goal.**
"Bookmark" and "tracked" name the same mechanism, reached two ways — a collection's own
single position, or user-named bookmarks of which there may be many, including several
into one container.

**A goal is an amount plus an optional period, and everything else derives from it.**
Amount is either `Complete` or a quantity; period is daily, weekly on given days, or
none. **A `Complete` amount is what makes something recurring** — its position resets
each period — and a quantity keeps its place. Streaks count periods in which the goal
was met, whichever kind it is.

**Two further rules complete it.** A goal's period turns over **between journeys,
never inside one**, so a boundary cannot move underneath someone mid-reading and a
diwan past midnight stays in its own evening. And a tracked thing either **repeats**
on reaching the end or is **one-off** — `My Sehaj Paath` against `Shared Sehaj Paath`
— which is a fact about what the thing is, not a setting about how it is read.

**That is the difference between this and a schedule flag, and Asa Ki Var is the
case that decides it.** Someone reading four pauris a day finishes the whole var about
every sixth day. Under a schedule flag, scheduling Asa Ki Var reset it nightly and the
practice was unrepresentable. Under a goal of `4 items, daily` the position persists,
the streak counts days the four were read, and completion is recorded when it happens.
**The streak is on the goal, not on finishing** — and if the var repeats, it carries
straight across the completion rather than breaking at it.

**A yearly review** summarises what was finished, how often, and how fast, framed by
what was done rather than what was missed — which makes retention a decision this
project has never had to make before.

**Pin and track are different promises on disjoint kinds of thing.** Pinning gives
quick access and **starts fresh in each journey**; tracking keeps progress **across**
them. **A bookmark cannot be pinned** — it *is* a persistent position, so pinning one
would mean two contradictory things about one object.

## Consequences

- **A new persistent entity with a clock dependence**, in an app whose core owns no
  clock (CLAUDE.md). Journey boundaries, schedules, and streaks are therefore an
  **edge** concern feeding the core, not something the core computes.
- **Determinism.** Journeys, bookmarks, and collections are user data in
  user-writable storage and must never reach the corpus artifact or any build input;
  the SQLite build must still be byte-identical from a commit.
- **Three corpus prerequisites, all cheapest now.** Nitnem must become a bani-group;
  the content types `translation` and `note` are misnamed for what the UI calls them
  ([roadmap §3.1](../../../database/docs/roadmap.md)); and **5,999 IDs must be
  reassigned** so that no ID is all digits or starts with `0`
  ([roadmap §3.3](../../../database/docs/roadmap.md)) — without which a bare number in
  the omni search box, and `shabados.com/1400`, cannot unambiguously mean an ang. **The
  ID change is the one that stops being cheap**: once bookmarks, timelines, and shares
  persist line IDs, reassigning one breaks user data permanently.
- **Retention becomes a decision.** A yearly review requires a year of history, and
  nothing here has ever established a retention period.
  [ADR-0008](0008-history-capture-for-audio-alignment.md) is undecided on exactly
  that, so shipping the review answers it by default.
- **Sharing makes this a wire contract.** A share crosses between independently
  updating installs: identifier stability across corpus versions, what a recipient
  does with a line their corpus lacks, and a size bound — a completed sehaj paath is
  tens of thousands of timeline entries, which is a file, not a link.
- **A share carries references, never text.** Otherwise the format is a channel for
  unreviewed scripture wearing a Shabad OS wrapper, around the `database` component's
  citation-backed review.
- **The app now holds a detailed record of someone's practice** — streaks, pace,
  per-shabad read history across years, and optionally *who* read which angs in a
  shared paath. That is the most sensitive data this project has contemplated, and
  the boundary against [ADR-0007](0007-telemetry.md) and
  [ADR-0008](0008-history-capture-for-audio-alignment.md) must be stated rather than
  assumed.
- **Presets are deferred, and that removes their cost for now.** Because a preset sets
  global values rather than creating a scope, the Controls sidebar needs no
  contextual-value marking — the mitigation an earlier draft called load-bearing is no
  longer needed, because there is nothing to mitigate.
- **The zoom floor must be enforced at every path that changes zoom.** A floor
  applied anywhere but last is a default with extra steps, and the case that matters
  is a preset arriving with a *shared* collection, where the values were chosen by
  someone else — the floor that applies is the reader's own.
- **"Book" is banned** as a term for a complete work, in copy and in code. Many Sikhs
  regard the SGGS as a living Guru.
- **This ships first.** [ADR-0014](0014-one-app-three-shells.md) makes `apps/ios` and
  `apps/android` the platform apps, and
  [plan.md](../../plan.md#step-1-in-detail--mobile) puts a daily-usable mobile build
  at the head of the sequence.

## Rejected

- **Keep the flat history and add grouping to the view.** Cheapest, and it puts the
  session boundary in the renderer where every other consumer must recompute it and
  can disagree. The boundary is a fact about use, not about presentation.
- **Journeys with *kinds*, then journeys with *modes*** (two earlier drafts). Both
  attached "how is this read" to the **session**. It belongs to the **thing being
  read**: Nitnem is recited whoever opens it, and a session containing Nitnem *and*
  four shabads has no single answer. Presets on Library items put the property where
  its reason lives, and the tab model makes the session need no category at all.
- **Three read-styles — `Recurring` / `Progressive` / `Untracked`.** The middle
  distinction was never about tracking.
- **A schedule flag deciding whether a position resets.** Simpler-looking and it made
  Asa Ki Var at four pauris a day impossible to express: scheduling the var reset it
  nightly, so a real daily discipline could hold no streak. Deriving reset from the
  goal's *amount* costs nothing and handles it.
- **Treating bookmarks and tracked collections as different objects.** They are the
  same mechanism; the similar names were a signal. What survives is that a collection
  has one position while bookmarks are plural — which is what lets someone learning
  Nitnem walk through it slowly *and* keep a daily streak on the same collection.
- **Mode per tab, and a separate default-mode setting.** Both raised questions with no
  good answer (what does a new tab inherit — the last tab, or the last session?) to
  serve a case almost nobody has.
- **Forbidding presets from setting Zoom and Weight**, on accessibility grounds.
  Right about the risk, wrong about the remedy: it would not have prevented the
  actual failure (a stray pinch) while blocking the customisation presets exist for.
  A floor applied last does prevent it.
- **"Excursions"** — a mechanism for entries inside a Defined journey that do not
  count toward completion, invented to handle Asa Ki Var, where a jatha alternates
  pauris and shabads. **The tab model dissolves it**: the var is one tab holding its
  position, each shabad is its own tab, and the timeline records the interleaving. A
  special mechanism that disappears when the model improves was a sign the model was
  wrong.
- **Nesting journeys inside journeys**, the other answer to Asa Ki Var. Every rule —
  label, idle boundary, streak, traversal, export — would need a second answer for
  "at which level?", and those shabads are not a separate sitting.
- **Merging Library and Collections.** Collections are one of four things in the
  Library; naming the whole after its smallest part is what made `Collections` look
  like a duplicate of browsing.
- **A tab bar instead of two sidebars.** Would remove the swipe conflicts in
  [interaction.md](../../interaction.md#open-questions) outright, but permanently
  spends vertical space on chrome in a view whose entire job is showing as much
  scripture as legibly as possible.
