# Rewrite plan

Sequencing and parallelism only. Scope lives in [`requirements/`](requirements/),
rationale in [`architecture/decisions/`](architecture/decisions/).

## The constraint that governs everything

Work parallelises across agents **only where the interface between the pieces is
already frozen.** Where it is not, two agents make incompatible assumptions and
integration costs more than the parallelism saved.

So the question is not "can database, core, and presenter be built at once" but
**"which interfaces are frozen yet?"** Today: almost none. **49 numbered open
questions across the six requirements documents**, 11 further inline `Open`
markers, and **6 ADRs not yet Accepted** (0004 and 0009 Proposed; 0007, 0008,
0010, 0011 Needs discussion).

That makes Phase 0 unavoidable, and it is the phase that parallelises worst,
because it needs decisions rather than labour.

## How this is actually sequenced: something usable, then the next thing

**The phases below describe dependencies, not a schedule.** Working through them to
completion in order would mean shipping nothing for a long time, and the phases have
a way of never finishing.

**So the real sequence is a chain where each step motivates the next**, and each one
ends with something a person can use:

| | Ship | What it makes obvious |
| --- | --- | --- |
| **1** | **Mobile**, daily-usable — read, track, bookmark. Corpus bundled as it is today, minus Spanish and `SBMS`. | That the reading model works, and that `packages/gurmukhi` belongs in the apps |
| **1½** | **The wasm SQLite spike** — a gate, not a step | Whether the web codebase is even the right shape |
| **2** | **The web codebase**, in beta on Windows, Linux, and the browser | Whether one app across three shells holds up in practice |
| **3** | **`api.shabados.com`** and the split corpus | Mobile stops bundling everything — which is what makes the database work worth doing |
| **4** | **Connect** — discovery, host and client, the TV builds | The web server, which is core rather than an enhancement |

**A dependency is not always a blocker.** The database can be a *goal* rather than a
prerequisite: the corpus ships as it is today, and bundling only the scripture becomes
a progressive improvement once step 3 gives the app somewhere else to read from.
Nothing has to be finished to 100% before the next thing starts.

### Step 1½ — spike wasm SQLite before committing to the web codebase

**Do this between mobile and the web codebase, and treat it as a gate.**

Compile `packages/gurmukhi` and `rusqlite` to wasm, put a real corpus in **OPFS**, run
real queries, in **Chromium, WebKit, and WebKitGTK** — the last because its version on
a given Linux distribution is outside our control and it is the one most likely to
disappoint.

**Why it gates rather than blocks.** The expectation is that it works, and if it does,
everything below proceeds as written. But three shells written against "one core
everywhere" is expensive to unwind, and if browser storage turns out to be unworkable
the web codebase needs a different data layer — which is a strategy question, not a
bug to fix later.

**Revisit the unification strategy here**, with mobile shipped and the spike answered.
That is the moment when both the assumptions and the evidence exist.

### Step 1 in detail — mobile

**In:** the reader in Classic, Saral, and Reader modes; the full Variorum; zoom,
ratio, weight; tabs and journeys; the Library; bookmarks, tracking, and goals; the
Tracker. `packages/gurmukhi` wired in, which is what makes pauses, continuous, and
pronunciations real rather than reimplemented twice. A corpus subset excluding Spanish
and `SBMS`, produced by a build step rather than by editing `database/`.

**Out for now:** search, Presenter mode, presets, the year in review, and anything
networked.

**Needed before it starts:** the Variorum defaults, which collections ship, and
**title logic** — Saral and Reader both render titles differently and nothing defines
what a title is ([navigation.md](requirements/navigation.md)).

## Phase 0 — close the specs

Mostly not agent work: domain and product judgements, which CLAUDE.md forbids
inferring. **Deliverable: every open question either answered or explicitly
deferred with a reason.**

**Blocking everything** — settle these first, in this order:

| # | Question | Where | Blocks |
| --- | --- | --- | --- |
| 1 | **ADR-0004** → Accepted or revised, with a debounce number | [ADR-0004](architecture/decisions/0004-concurrent-line-control.md) | protocol concurrency rules |
| 2 | **ADR-0010** — core scope, Rust vs C++, and generated vs hand-written FFI | [ADR-0010](architecture/decisions/0010-shared-core-across-platforms.md) | core API surface → Phase 2 stream C |

**Closed 2026-08-27** — the three that blocked the protocol schema:

- **Position identity** — every occurrence keeps its own line ID, so a plain line ID
  names one position and `lines:current` needs no change. Jap Sahib settled it: 22
  texts repeat *inside* a single line-group, so a shared ID would have collided
  within a shabad, not merely within a bani.
- **Which repeats merge** — none. Measured saving from sharing text is ~1.4 MB of
  151 MB. The fragmentation goal is served instead by a build report over lines with
  identical Gurmukhi and differing translations (~1,014 items, 91% of repeated
  texts).
- **Traversal context** — the parent container owns ordering; nothing carries its
  own `prev`/`next`. The session carries the container as a **path**, and the
  frontend always knows which container it is rendering.

All three in [data-model.md](requirements/data-model.md#repeated-lines-keep-distinct-identities).
**The database schema and the protocol message shape are now unblocked** — Phase 1
items 1 and 2 can start once ADR-0004 lands.

**Blocking their own areas only** — these can be settled in parallel with each
other, and each unblocks one stream:

- **Search** — the 2–4 rule, tier-3 ordering, fuzzy approach ([9 questions](requirements/search.md#open-questions))
- **Navigation** — rahao numbering, scope trigger, unread semantics ([10](requirements/navigation.md#open-questions))
- **Corpus** — base composition, pack granularity, remote query owner ([10](requirements/corpus.md#open-questions))
- **Keyboard** — focus ownership for `left`/`right`, `tab`, `home`/`end` ([7](requirements/keyboard.md#open-questions))
- **Connect** — QR contents, PIN handling, device naming ([7](requirements/connect.md#open-questions))
- **ADR-0007** (telemetry), **ADR-0008** (history/ML), **ADR-0011** (distribution)
- **ADR-0009** — the version-skew compatibility policy, before the first pin

## `apps/ios` and `apps/android` are the real apps now

**Superseded 2026-09-04.** These were store-retention scaffolds, and this file
previously said they must not be grown into the platform apps. **That no longer
holds.** They are the platform apps, and work goes into them directly
([ADR-0014](architecture/decisions/0014-one-app-three-shells.md)).

What that changes: logic added to them is no longer a liability to be minimised, and
`packages/gurmukhi` belongs in them rather than being kept out.

## Phase 1 — freeze the interfaces

The three artifacts that make everything after this parallelisable. **Highest
leverage work in the plan.**

1. **Protocol spec + JSON Schemas + fixtures** ([protocol/](protocol/)) — the
   contract every client is written against. Without it, agents building iOS and
   Electron diverge silently.
2. **Database schema** — containers, placements, variants, membership. Unblocks
   both the corpus build and the core.
3. **Core API surface** — the sans-IO event/state boundary. Can be defined before
   it is implemented, and should be.

**Also here: golden fixtures.** Capture search and navigation behaviour as
recorded input/output pairs — the only way an agent verifies a change without a
human judging "looks right". **v2 currently runs and can be interrogated; once it
stops, "matches v2" is no longer a checkable claim.**

## Phase 2 — foundations, parallel

| Stream | Work | Depends on |
| --- | --- | --- |
| **A — gurmukhi** | Line-type/block classifier, fuzzy variant generation, Unicode | Phase 0 domain rules |
| **B — database** | New schema, TOML migration incl. `var` dedup, build pipeline, pack splitting | Phase 1 schema, Stream A |
| **C — core** | sans-IO Rust: session, search, navigation, protocol | Phase 1 API + schema |
| **D — design system** | Semantic HTML, web components, themeable surface. **Human-led** | Nothing |
| **E — relay** | WebSocket relay, standalone and testable | Phase 1 protocol |

Stream D blocks on nothing and everything visual blocks on it, so it can start
immediately.

## Phase 3 — platforms

**One app, three shells** ([ADR-0014](architecture/decisions/0014-one-app-three-shells.md)):
Swift for iOS / iPadOS / macOS / tvOS, Kotlin for Android including TV, and a web
codebase shipped through the Windows Store and Flatpak in an OS-provided webview, and
served in a browser. **Electron is not in the plan.**

Each shell is a renderer and an input mapper over shared logic. **Feature parity is
the target; interaction parity is not** — the same features reached differently by
touch, pointer, keyboard, and D-pad
([interaction.md](interaction.md#interactions)).

**Build platform UI against a mock core** implementing the frozen API, so this
overlaps Phase 2 rather than waiting on it.

## "Should database, core, and presenter go at once?"

Partly, and the order matters more than the overlap.

- **Database and gurmukhi genuinely go first** — everything reads from them, and
  the corpus migration is large, mechanical, and well suited to agents *once the
  schema is frozen*.
- **Core cannot start before the schema is stable**, or it is rewritten against a
  moving target.
- **Presenter's UI can start immediately** against a mock core; its data layer
  cannot.

So database-first is the right instinct, **provided Phase 1 happens first**.

## What agents need to work independently, in priority order

1. **The protocol spec with fixtures.** Two agents on two platforms cannot agree
   without it.
2. **Golden tests.** The only way an agent verifies correctness without a human.
3. **A frozen core API**, even as a stub.
4. **Requirements with no open markers in their area.** An agent hitting an
   unanswered domain question must stop, so an area with open questions is an area
   that cannot be handed off.

**Anti-pattern:** handing an agent an area with open questions and expecting it to
choose. It will choose plausibly and wrongly, and the choice becomes load-bearing
before anyone notices.

## Sequencing risks

- **Migrating the corpus before the schema freezes** — doing it twice.
- **Building the core before position identity is settled** — it is in the session
  state, the protocol, and the navigation logic simultaneously.
- **Letting an unsandboxed desktop build become the reference** — every other
  platform then perpetually catches up ([ADR-0011](architecture/decisions/0011-distribution-channels.md)).
- **Deferring golden capture until v2 is retired** — see Phase 1.
