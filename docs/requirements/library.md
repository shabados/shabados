# Library

Draft, 2026-09-03. Specified by the author; open questions at the end are blocking.
**Layer 1** — platform-neutral
([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md)).

The Library is **where you find something to read**. Its counterpart is
[journeys.md](journeys.md) — what you did read, grouped into sessions. The two are
deliberately separate surfaces: one is a catalogue, the other is a history.

## What is in it

| | Holds | Authored by |
| --- | --- | --- |
| **Collections** | Nitnem, Asa Ki Var, user-made folders | Corpus, and users |
| **Bookmarks** | A named, self-updating position — "Sehaj Paath 2026" | Users |
| **Assets and their tables of contents** | Every source, entered by page, chapter, topic; the SGGS also by raag and by author | Corpus |
| **Digitized images** | Scans of the assets | Corpus |

**The Library is not `Collections`.** Collections are one of four things in it. The
sidebar's bottom row opens the Library ([reading-shell.md](reading-shell.md)).

## Collections are overlay containers

**A collection is a non-default container**: something assembled *across* the work
rather than the work's own structure. Nitnem, Asa Ki Var, and a folder someone made
are collections. **A line-group's parent subsection is not**, and neither is that
subsection's parent section.

This is not a new distinction — it is exactly the one
[data-model.md](data-model.md#structural-versus-overlay-containers) already settled:

| | Structural | Overlay |
| --- | --- | --- |
| Examples | subsection, section, source | bani, bani-group, page |
| Coverage | partitions the work | cuts across; may overlap or omit |

**So: a collection is an overlay container. A default parent is a structural one.**
Nothing new is needed in the data model to support collections, and user-made
collections are overlay containers whose author happens to be a person rather than
the corpus.

### Which is why "next" is a property of the way in

The same shabad reached two ways traverses differently:

- Opened **from a search**, it sits in its structural parent, and `next` is the next
  shabad of that subsection.
- Opened **from Nitnem**, `next` is the next item of Nitnem.

**The container you entered through is carried with the tab**, not inferred from the
line-group — which is the same rule the data model already states, that ordering is
owned by the parent container and the session carries the container as a **path**.
A line-group does not know which of its containers you came in by; the tab does.

## The collections that ship

**Draft, 2026-09-06.** Every one of the corpus's 30 banis is placed. Bani-groups may
live as local app logic before they are corpus containers; **moving them later does
not change their identity** unless their contents change.

### Base collections

| Collection | Contains |
| --- | --- |
| **Morning Nitnem** | `JAPJ` · `JAAP` · `TPSS` · `BNCP` · `ANND` |
| **Asa Ki Var** | `ASKV`, its 24 vaars reachable individually |
| **Sukhmani Sahib** | `SKMI`, its 24 ashtpadis reachable individually |
| **Rehras Sahib** | Itself |
| **Kirtan Sohila** | Itself |
| **Arti-Arta** | Pre-Arta, Arti, post-Arta and its variations — **not necessarily read in sequence** |
| **Sundar Gutka** | `SHZR` · `BRMH` · `SHPD` · `TPDK` · `BVAK` · `OANK` · `SGST` · `CDDV` · `SLK9` |
| **Akal Ustat** | `AKUS`. One item for now; segmenting it into a bani-group is later work |

**Rehras and Kirtan Sohila are top-level, not inside Nitnem.** Nitnem is the five
morning banis. This is what makes `BNCP` appear **once** rather than twice — it is
otherwise also inside Rehras, and a collection containing it at two positions would
force completion to be reckoned by path rather than by line.

**Pills sit at the top of this section**: `Japji Sahib`, `Rehras Sahib`,
`Kirtan Sohila`, `Ardas`.

**A pill is a shortcut *into* a collection, not a standalone item.** Tapping
`Japji Sahib` enters Morning Nitnem at Japji, and `next` goes to Jaap Sahib. This is
the general rule already stated — a tab carries the container it was entered through
([above](#which-is-why-next-is-a-property-of-the-way-in)) — so pills need no mechanism
of their own.

### Diwans and ceremonies

| Collection | Contains |
| --- | --- |
| **Janamdin Sanskar** *(naming)* | `2LSD` *Pootaa maataa kee aasees* · `T644` *Parmesar ditaa bannaa* |
| **Anand Karaj** | `95W2` *Keetaa loṛeeai kamm* · `LAVA` |
| **Antim Sanskar** *(final rites)* | `SHLA` · `4EXD` *Baabaa bolte te kahaa ge* · `ALHN` · `RKSD` |
| **Path Bhog** | Salok M9 · Dohra · Mundavni M5 · Salok M5 · **optional Ragmala** · 6-pauri Anand · Ardas |

**Pills at the top of this section** include the 6-pauri Anand Sahib.

**Path Bhog is one collection and always ends the same way** — 6-pauri Anand then
Ardas. There is no separate Rag Mala item: **Ragmala is an optional passage inside
it**, offered at its own position with a control to read it or to skip ahead to the
Anand.

**Four of these collections need containers the corpus does not have.** Three ceremony
collections are assembled from **line-groups, not banis** — the shabads above are not
bani entries. And Path Bhog does not match either bani of a similar name: `MDVI` (169)
is Salok M9 plus 11 lines plus the 6-pauri Anand, and `RGMA` (231) is all of `MDVI`
plus 62 Ragmala lines. **Neither is usable as-is**; both are cut from.

### Continuation, not configuration

**Where readings differ in length, the reader sees a control at the point of
divergence** — `Keep reading` to continue into the longer text, or in Path Bhog's case
an optional passage that can be read or skipped. Tapping continues in place. **There
is no setting that removes anything.**

**Three reasons this beats a toggle:**

- **It works mid-recitation.** Someone whose sangat keeps going can join at the moment
  it happens, without leaving the text to find a setting.
- **It is additive, and that matters here.** A toggle frames the shorter reading as
  *removing* bani, and to people who regard Gurbani as a living Guru that imagery is
  damaging. Nothing is ever taken away; more is offered.
- **It is less to build.** No settings surface is needed, so variant handling stops
  blocking a first release.

**Everyone sees the controls, whichever length they read.** They are how a person
reaches the Taksali extent — and beyond it the Buddha Dal extent — without declaring
an allegiance in a settings screen.

**The default at each point is a property of that point.** Rehras, Chaupai, and Aarti
default to the shorter reading and extend on request; Path Bhog reaches Ragmala in
flow and offers to skip it. One mechanism, two defaults.

**Where the divergences actually fall** — measured against `collections/` on
2026-09-06:

| Base | Extends by | At |
| --- | --- | --- |
| `BNCP` → `CPDT` | +26 | **Appended at the end** |
| `RHRS` → `RHRT` | +9, +72 | Interior — positions 162 and 272 of 420 |
| `ARTI` → `ARTL` | +17, +36 | Interior at 55; appended at 80 |
| Path Bhog, Ragmala | +62 | Interior — before the closing Anand and salok |

**Only Chaupai is a clean append.** Three of the four splice material into the middle,
which is why a control at the divergence point is the right shape and "read to the end
and stop" is not.

**`ANND`/`ANN6` is not this shape.** `ANN6` holds 7 lines `ANND` does not — a closing
salok — so it is an abridgement *plus* an addition, not a truncation.

### Numbered divisions are derived, not stored

| | Corpus structure | Divisions shown |
| --- | --- | --- |
| Sukhmani | **1 section, 2027 lines — no internal divisions** | 24 |
| Asa Ki Var | 48 sections | 24 |

Neither maps. What derives them is [navigation.md](navigation.md)'s **pauri** — a block
terminating in a numbered line ending `॥੧॥`, `॥੨॥`… reachable through
`gurmukhi::detect` with `Feature::NumberedEnding`.

**One piece of work serves three features**: Saral and Reader's paragraph breaks
([display-controls.md](display-controls.md#end-of-a-pauri)), these divisions, and
navigation's pauri addressing. Build it once.

### Tidbits

**A collection may carry a short piece of context** — the kind of thing a game shows
on a loading screen. Opening Arti-Arta might explain that Buddha Dal performs the same
Arti section merged with a much larger Aarta, known together as Arti-Arta.

**They do structural work, not decoration.** They are what explains why two
collections have similar names and different contents, which is the confusion the
variant readings create. Static text is fine to begin with; rotating them later is an
enhancement.

**They must never be generated, and they need citations.** A tidbit is a factual claim
about a living tradition — what a particular jatha does, when a practice arose — and
being confidently slightly wrong in an app used in gurdwaras is a real harm, because
people repeat it. **Treat them as corpus content under the same citation-backed review
as everything else** (CLAUDE.md, "Not your call"). This is not scripture, but it is
adjacent to it.

### Open

1. **Why are there two Aartis?** Author researching. `ARTL` is Arti plus the Aarta
   continuation; neither appears in Nitnem gutkas of any maryada.
2. **Is Taksali morning Chaupai `CPDT` or `BNCP`?** Nitnem is specified with `BNCP`,
   but by the Rehras principle the base would be the longer `CPDT`. Or `CPDT` is only
   ever read inside Rehras.
3. **Do the morning `BNCP` and `ANND` also become continuations?** Everything else in
   Nitnem's variance now resolves without a setting. If those do too, Nitnem needs no
   configuration surface at all.
4. **Are divergence points marked in the corpus, or derived by comparing readings?**
   Six of them are known; how they are stored is not.
5. **What is the pill section called?** Not "Quick Links".
6. **Where do tidbits live, and are they localised?** They are prose about Sikh
   practice, so they need translating like anything else — but they are not scripture,
   translation, or gloss, so they fit none of the existing content types.

## Bookmarks

**A bookmark is a named, self-updating position.** It is created from the title menu
in the viewer — `Create bookmark` on an ang view — and a toast then lets the person
name it. **The default name is the current date and time**, so a bookmark made and
ignored is still identifiable; a person doing a yearly paath renames it to
"Sehaj Paath 2026".

**Self-updating is the whole point.** Reading against a bookmark moves it. It is not
a snapshot, and there is no separate act of saving progress.

**`Save to collection…`** is the other title-menu action: definitely available on a
line-group, and possibly on an ang (open question 5).

**A bookmark always has a position; a goal is optional.** A plain "come back to this"
bookmark carries no target and no streak. **Several can exist at once**, including
several into the same container — see [Tracking](#tracking).

**A bookmark can never be pinned.** Pinning and tracking are different promises, and
keeping them on disjoint kinds of thing is what stops "what does pinning this mean?"
from having four answers
([journeys.md](journeys.md#pinning-and-tracking-are-different-promises)).

## Presets

**A preset is a named, user-authored set of control values**, created in
[Settings](reading-shell.md#settings) and applied when something is opened. Three
places apply one:

| | Applied when |
| --- | --- |
| **Collection preset** | An item of that collection is opened |
| **Bookmark preset** | That bookmark is opened |
| **Search preset** | A search result is opened that no other preset claims |

**A preset may set any control, including Zoom and Weight.** Authoring one is an
advanced act by someone who wants exactly this; restricting what it can touch would
only stop the customisation it exists for. Zoom in particular is a pinch away from
being corrected.

**Presets are entirely optional.** Collections, bookmarks, and search results all
work with none set, and nothing about ordinary use requires authoring one.

### Rules

- **A preset seeds the view; it does not own it.** A change the person makes
  afterwards wins and holds while that context is active.
- **Nothing writes back to a preset** without an explicit action. Otherwise adjusting
  a setting once silently redefines what a collection means for every future reading.
- **Leaving for something no preset claims changes nothing.**
- **Opening something a different preset claims applies that one.**
- **Controls must show which values are contextual**, with a way back to the
  person's own defaults ([display-controls.md](display-controls.md#presets--deferred-not-built-yet)).

### Floors are the accessibility guard, not restrictions on authorship

**The risk is not a badly authored preset — it is unreadable text with no obvious way
back**, and the person most likely to hit it is an older reader who pinched too far
and cannot tell what happened.

So the guard is a **minimum zoom** (and optionally a minimum weight) in
[Settings](display-controls.md#accessibility-floors), below which nothing may go.

**A floor is only a floor if it is applied last**, after presets, after the slider,
and after pinch. Applied anywhere else it is a default with extra steps. This
matters most for a preset that arrives with a **shared collection**, where the values
were chosen by someone else on a different device: the floor that applies is the
reader's own.

**Pinch-to-zoom can also be switched off entirely** in Settings, which removes the
gesture that causes the problem rather than clamping its result.

## Tracking

**Tracking is one thing: a saved position in a container, optionally with a goal.**

**"Bookmark" and "tracked" sound alike because they are the same mechanism.** That
similarity was a signal, not a naming problem. Underneath there is one object — a
tracked position — reached two ways:

| Reached by | Gives |
| --- | --- |
| Toggling **Track** on a collection | The collection's own position. One per collection. |
| **Create bookmark** on anything | A named position. **Many are allowed**, including several into the same container. |

**That plurality is the only real difference, and it earns its keep.** Someone still
learning Nitnem can hold a bookmark that walks through it slowly, while the
collection itself is tracked for a daily streak — two positions in one container,
which a single tracked flag could never express.

### Goals

**A goal is an amount plus, optionally, a period.**

| | Values |
| --- | --- |
| **Amount** | **`Complete`** — finish the whole thing — or a **quantity**, counted either in **items of the container being tracked** (pauris of a var, shabads of a collection, angs of a source) or in **time** |
| **Period** | None, or daily / weekly on given days, optionally AM or PM |

**Everything else is derived from those two.** No separate schedule flag, no
recurring-versus-progressive choice:

| Amount | Period | Position when the period turns over | Streak |
| --- | --- | --- | --- |
| `Complete` | daily | **Starts over from the beginning** | Periods the goal was met |
| `Complete` | weekly | **Starts over from the beginning** | Periods the goal was met |
| `Complete` | none | Keeps its place | — |
| Quantity | daily | **Keeps its place** | Periods the goal was met |
| Quantity | none | Keeps its place | — |
| *(no goal)* | — | Keeps its place | — |

**The streak column is the same rule in every row: periods in which the goal was
met.** Missing a day breaks the streak whichever kind of goal it is. **Only the
position behaves differently**, and that is the entire distinction:

> *"If I say I'm going to do the entire Asa Ki Var every day but don't finish it one
> day, I don't want to finish it the next — I want to start over from the beginning.
> If I say I want to do a quarter of Asa Ki Var every day, it's okay if I don't
> finish; the next day picks up where I left off. Either way I lose my streak."*

**`Complete` is what makes something start fresh.** Nitnem with a goal of `Complete`,
daily, starts over each day — which is exactly the old "scheduled collection", now
falling out of the goal rather than being declared separately.

### Why this beats a schedule flag: Asa Ki Var, four pauris a day

**Someone reads four pauris of Asa Ki Var each day and finishes the whole var about
every sixth day.** An earlier draft made *the schedule* decide whether a position
resets, which made this unrepresentable — scheduling Asa Ki Var reset it nightly, so
a person keeping a real daily discipline could never hold a streak.

**Under a goal it works without a special case.** Amount `4 items`, period daily: the
position persists, the streak counts days the four were read, and the completion every
sixth day is recorded like any other. If the item **repeats**, the seventh day begins
the var again and the streak carries straight across
([Reaching the end](#reaching-the-end-repeat-or-stop)). **The streak is on the goal,
not on finishing** — which is what the person is actually doing.

### Untracked stays the default

Tracking something a person never meant to finish produces a permanent 4%-complete
reproach. **Collections are untracked by default**, with a few shipped tracked;
**user-made collections can be tracked** on the same flag. **A bookmark always has a
position** — that is what it is — but **a goal is optional**, so a plain "come back
to this" bookmark carries no target and no streak.

### Pace

**Pace applies to anything with a position**, goal or not: intervals between
[activations](journeys.md#what-goes-on-it), which routinely span days for someone
reading a physical saroop and recording their place afterwards.

### The period turns over between journeys, never inside one

**A journey is evaluated against the period it started in.** A goal's period never
turns over underneath someone mid-reading; the **next journey** that begins in a new
period is where the change applies
([journeys.md](journeys.md#journeys)).

**So a diwan running past midnight stays in the evening it started in**, and someone
halfway through Nitnem when the clock passes noon keeps the morning's reckoning until
they stop. Tying the boundary to the journey rather than to the wall clock means the
app never changes what it is measuring while a person is in the middle of measuring
it.

**Missed periods are still missed.** Someone who does not open the app for three days
finds the boundary applied on their next journey, with the streak broken for the days
in between.

### Reaching the end: repeat, or stop

**When a position reaches the end of its container, it either starts again or it
finishes. The default is to repeat.**

| | Behaviour |
| --- | --- |
| **Repeats** — the default | The position returns to the beginning and carries on |
| **One-off** | It is finished, stops updating, and shows as finished in the Library |

**`My Sehaj Paath` and `Shared Sehaj Paath` are the worked example.** A personal
paath is an ongoing practice — finish it and begin again. A paath read once with a
group is a specific reading with an end, and restarting it would be a different
reading, not a continuation of that one.

#### The mechanism is a moment at the end, not a setting at the start

**Nobody knows at creation time whether they will want to repeat.** Asking then asks
too early, and the answer is worth having at the moment the information exists.

**So reaching the end produces a completion state in the viewer**, in place of
`next`:

- It **names what was finished, and how long it took** — a paath begun in January and
  finished in September is worth stating plainly.
- **`Begin again`** is the primary action. **`Finish`** is the secondary.
- **Doing nothing repeats it.** Continuing to read, or opening the item again later,
  begins it again without the person choosing anything. **The choice is offered,
  never required** — which is what makes "repeat" the default in behaviour and not
  merely in a settings file.

**Never a modal, never blocking.** This runs during worship, and a dialogue appearing
at the end of a paath in the middle of a diwan is precisely the interruption this
project exists to avoid. The completion state is somewhere the person arrives, not
something that arrives at them.

**It can also be chosen in advance**, in the goal editor, for the case where it is
already known — a shared paath the group has agreed is one reading. Optional, and
default repeat.

**`Finish` destroys nothing.** The item shows as finished in the Library and stops
updating; it can be reopened and restarted by hand at any time.

#### A `Complete` goal with a period does not show this

**Reaching the end of Nitnem *is* meeting its goal.** The acknowledgement is the
Tracker row turning green ([reading-shell.md](reading-shell.md#new-journey-and-tracker)),
and it starts over at the next period by definition — so offering `Begin again` every
morning would be asking a question that has already been answered. **The completion
state is for items whose goal is a quantity, or which have no goal**, where reaching
the end is a genuine end rather than a daily occurrence.

#### Every completion is recorded

**Each completed pass is kept, with its start and end dates.** That is what
[read history](journeys.md#reading-this-shabad-before) counts, what
[the year in review](#the-year-in-review) reports as "completed three times", and
what makes repeating meaningful rather than a counter silently rolling over.

**Repeating does not break a streak.** Asa Ki Var at a quarter a day reaches the end
roughly every fourth day; the fifth day begins the var again and the daily streak
carries straight across
([Goals](#goals)).

### Setting a goal must show what it will do

**Because reset is derived rather than declared, the goal editor has to say what the
combination produces** — "resets each day", "keeps your place". Otherwise someone
sets `Complete` + daily on a sehaj paath and silently loses their position every
night, having chosen two reasonable-looking values.

## The year in review

**Once a year, a summary of what was read.** The model is a music service's year-end
review, and the material is already there: the [timeline](journeys.md#the-timeline),
tracking history, and completions.

What it reports:

- **Everything tracked that was finished** — collections and bookmarks alike, which
  are the same object underneath.
- **How many times**, where that is more than once. A sehaj paath may have been
  completed several times in a year.
- **How fast** — pace, and how it changed.
- **How many periods a goal was met** — "Nitnem on 203 days", "Asa Ki Var four pauris
  on 180 days".

**It needs a year of retained data**, which is the first thing in this project to
require a retention period at all.
[ADR-0008](../architecture/decisions/0008-history-capture-for-audio-alignment.md) is
**Needs discussion** on exactly that, so this feature cannot be built without
answering it — a year in review silently establishes "we keep everything for at least
a year" as policy (open question 4).

**Decided: the framing is positive throughout.** The purpose is building better
habits, not auditing. "Nitnem on 203 days" and "you missed 162 days" are the same
number, and only the first is what this is for. The psychology beyond that — how
partial years, first years, and broken streaks read — is deliberately left for later;
the concept is settled, the wording is not.

**Whether it can be shared is a separate decision from whether it exists.** A
year-end summary is shareable by design in every product it is borrowed from, and
here it would be a public statement about someone's religious practice. Open
question 5.

## Periods, and the clock

**A period is the second half of a [goal](#goals)**, not a separate schedule. The
model is an alarm rather than a fixed list the app knows about.

| Axis | Values |
| --- | --- |
| Repeat | Daily, weekly on given days, or none |
| Time of day | AM, PM, or both |

Worked examples, which are **defaults to start from, not rules**. Each is a goal —
an amount and a period — and the reset behaviour follows from the amount:

| Item | Amount | Period | Effect |
| --- | --- | --- | --- |
| Morning Nitnem | `Complete` | Daily, AM | Resets daily; streak on days finished |
| Rehras Sahib, Kirtan Sohila | `Complete` | Daily, PM | Same, evening |
| Sukhmani Sahib | `Complete` | Daily AM + PM, or Wednesday PM | Resets each occurrence |
| Asa Ki Var, read through | `Complete` | Weekly — Fri / Sat / Sun, AM | Resets weekly |
| Asa Ki Var, four pauris a day | `4 items` | Daily | **Keeps its place**; streak on days the four were read |
| A sehaj paath | `1 ang` or `30 minutes` | Daily | Keeps its place |
| Ardas | `Complete` | Mon–Fri, AM and PM | Resets each occurrence |

**AM is midnight to noon and PM is noon to midnight. No configuration is required.**

The boundary **can** be changed, in [Settings](reading-shell.md#settings) among the
tracking options, but nothing depends on anyone doing so. A scheduling feature that
demands setup before it works is a scheduling feature most people never turn on.

**Clock time is deliberate, not a compromise forced by anything.** Rehras is read at
sunset and Japji at amrit vela — solar events — but solar times need a **location**,
and the app has committed to asking for no permissions and collecting no data
([apps/README.md](../../apps/README.md#store-identity)). The device **clock and time
zone are free on both platforms** and need no permission. Noon is what people's own
days are already organised around, and it is right often enough.

**A person who does not want a time chooses Daily and gets both.**

## What a test must pin down

- **Collections are overlay containers.** A structural parent — a subsection, a
  section — never appears among the Library's Collections.
- **Entry decides traversal.** The same line-group opened from search and from Nitnem
  yields different `next` targets; both are correct.
- **Reset is derived from the amount.** `Complete` + daily, half-read yesterday ⇒ 0%
  today. A quantity + daily, half-read yesterday ⇒ the same position today.
- **Asa Ki Var, four a day.** Goal `4 items`, daily. Read four on six consecutive days
  ⇒ streak of six, one recorded completion, and the position never reset.
- **Streaks need a period.** A goal with no period produces progress and no streak.
- **Overshooting does not bank credit.** Ten angs against a one-ang daily goal ⇒ one
  day of streak, not ten, and tomorrow still requires an ang.
- **The period turns over between journeys.** Start a journey before a boundary,
  cross it mid-journey ⇒ nothing resets. End the journey, start another ⇒ the new
  period applies.
- **A diwan past midnight stays in its own evening.** A `Complete` PM goal met at
  00:30 in a journey begun at 19:00 counts for that evening.
- **Missed periods break the streak.** Three days without opening the app ⇒ the streak
  is broken on the next journey, not silently preserved.
- **Repeat carries the streak across the end.** A `4 items` daily goal on a 16-item
  container ⇒ reading four a day for six days gives an unbroken six-day streak
  spanning one completion.
- **Doing nothing repeats.** Reach the end, dismiss nothing, keep reading ⇒ the
  position is at the beginning and no choice was recorded.
- **`Finish` stops and keeps.** Reach the end, choose `Finish` ⇒ it reports finished,
  stops updating, and can still be reopened and restarted by hand.
- **No blocking UI at completion.** Reaching the end never presents a modal, and
  never interrupts a reading in progress.
- **A `Complete` daily goal shows no begin-again offer.** Finishing Nitnem turns the
  Tracker row green and presents no completion prompt.
- **Completions are recorded individually.** Three passes ⇒ three records, each with
  its own start and end date, and the year in review reports three.
- **Two positions in one container.** Track Nitnem *and* hold a bookmark into it ⇒
  both advance independently.
- **A bookmark without a goal.** Reports a position, no target, no streak, and does
  not appear in the Tracker.
- **Untracked is the general default.** A newly created user collection reports no
  progress. A shipped Nitnem collection reports tracked.
- **Bookmarks are never pinned and never scheduled into resetting** unless their own
  goal says `Complete`.
- **Default bookmark name is unique.** Two created in the same minute do not collide.
- **The goal editor states the consequence.** Choosing `Complete` + daily surfaces
  "resets each day" before it is saved.
- **Year in review counts goal periods met and completions**, not openings. A
  collection opened thirty times and completed twice reports two.
- **Period arithmetic.** Asserted across a DST change, across midnight in a non-UTC
  zone, and with the AM/PM boundary left at its default and moved.
- **Presets, when they exist.** A preset applies its values on open; the floor clamps
  zoom whether it came from a preset, the slider, or a pinch; pinch off means off and
  the slider still works.

## Open questions

1. **Which collections ship tracked, and with what goal?** Nitnem is the obvious one.
   Anything shipped with a `Complete` daily goal starts generating streak pressure the
   day someone installs the app.
2. **What is the default goal when someone tracks a collection themselves?** No goal
   is the safe answer — tracking then means "remember my place" — but it is not stated.
3. **What is the retention period?** The year in review requires a year of data, and
   nothing in this project has established one.
   [ADR-0008](../architecture/decisions/0008-history-capture-for-audio-alignment.md)
   is undecided on exactly this, so building the review answers it by default.
4. **Is the year in review shareable?** Shareability is the point of every product
   this borrows from, and here it is a statement about someone's religious practice.
   Also: what does it show for someone who tracked nothing?
5. **Can a preset be shared, and does a shared collection carry one?** A shared
   collection arriving with someone else's Zoom, Weight, and mode is either a
   convenience or a surprise.
6. **Is `Save to collection…` available on an ang?** Definite on a line-group. An ang
   is a slice of the work rather than a unit of meaning, which may make it a strange
   thing to file.
7. **How does the Library present a source with almost no structure?** Raag and author
    exist for the SGGS. Several sources have neither chapters nor topics.
8. **What are the digitized images for?** Listed as Library content with no stated
    behaviour: a facing-page reference, a proofreading source, or a reading surface of
    their own. They are also by a wide margin the largest thing the corpus could ship
    ([corpus.md](corpus.md)).
9. **Is there a minimum weight as well as a minimum zoom?** Raised as uncertain. Thin
    text at a large size is legible in a way small text at any weight is not, which
    argues the zoom floor is the one that matters.
