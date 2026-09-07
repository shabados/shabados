# Docs index

Read this first. It is the map — load only the documents you actually need.

These docs are written for agent context: compact, decision-first, with the reason
a thing was *not* done kept next to the thing that was. Keep them that way.

| Path | Holds | Read it when |
| --- | --- | --- |
| [plan.md](plan.md) | Rewrite sequencing; what blocks what | Deciding what to work on |
| [requirements/](requirements/) | **Source of truth** — what the app must do | Building or specifying behaviour |
| [requirements/journeys.md](requirements/journeys.md) · [library.md](requirements/library.md) · [reading-shell.md](requirements/reading-shell.md) · [display-controls.md](requirements/display-controls.md) | The reading app: tabs and journeys, the Library, the viewer and its two sidebars, display settings | Building any platform reading UI |
| [interaction.md](interaction.md) | **Layer 2** — how each platform delivers a requirement; icons live in `brand/icons.md` | Building any platform UI |
| [architecture/decisions/](architecture/decisions/) | Why we chose an approach; what is undecided | Before making a structural choice |
| [architecture/README.md](architecture/README.md) | Monorepo layout, dependency graph, release model | Touching build, packaging, or layout |
| [protocol/](protocol/) | The wire contract (not yet written) | Implementing client↔server messages |
| [presenter-capabilities.md](presenter-capabilities.md) | What v2 does today — **a record of the past, not a target** | Checking whether something already exists, or why it exists |

## Current state, in one screen

**Nothing is frozen yet**, but the protocol is no longer blocked. 48 numbered open
questions across the original six requirements documents, 11 further inline `Open`
markers, and 7 of 13 ADRs not Accepted. Per CLAUDE.md an agent that hits an
unanswered domain question must stop, so **an area with open questions is an area
that cannot be handed off.**

**Settled 2026-08-27** (see [data-model.md](requirements/data-model.md#repeated-lines-keep-distinct-identities)):
every occurrence of a line keeps its own **unique line ID**, so a plain line ID names
exactly one position — repeated phrases are *not* merged. Ordering is owned by the
**parent container**, never by `prev`/`next` pointers on the thing itself, and the
session carries the container as a path. Together these unblock the database schema
and the protocol message shape.

**Added 2026-09-02 — the reading app** ([ADR-0012](architecture/decisions/0012-journeys-replace-viewing-history.md),
Proposed). **The model is a browser**, and the correspondence is the specification
rather than an analogy:

- A **tab** is one thing being viewed, and it **carries the container it was entered
  through** — which is why the same shabad's `next` differs from search and from
  Nitnem.
- A **journey** is the set of tabs read together, ending after 15 idle minutes. Every
  journey has a **timeline** with three consumers that must not be built three times:
  export (YouTube chapters for a recorded diwan), reading pace, and
  [ADR-0008](architecture/decisions/0008-history-capture-for-audio-alignment.md)'s
  audio alignment.
- The **Library** is the catalogue: collections, bookmarks, assets and their tables of
  contents, digitized images. **Collections are overlay containers**, default parents
  are structural ones — a distinction
  [data-model.md](requirements/data-model.md#structural-versus-overlay-containers)
  already settled, so collections need nothing new.
- **Rendering is one global value.** User-authored **presets** are specified but
  **deferred**; when built they simply set those values. Accessibility is guarded by a
  **minimum zoom applied last**, after the slider, a pinch, or a preset.
- **Tracking is a saved position with an optional goal**, and "bookmark" names the
  same mechanism. **A goal is an amount plus a period**, and everything derives from
  it: `Complete` resets each period, a quantity keeps its place, and streaks count
  periods where the goal was met — so Asa Ki Var at four pauris a day streaks daily
  and completes every sixth day. **Pin** and **track** stay different promises on
  disjoint kinds: pinning starts fresh each journey, and a bookmark is never pinned.

**Three corpus prerequisites**, all cheapest before the protocol schema is pinned:
Nitnem must become a **bani-group**; the content types `translation` and `note` are
misnamed for what the UI calls them — **Interpretation** and **Word Gloss**
([roadmap §3.2](../database/docs/roadmap.md)); and **5,999 IDs must be reassigned** so
no ID is all digits or starts with `0`
([roadmap §3.4](../database/docs/roadmap.md)), without which a bare number in the omni
search box cannot unambiguously mean an ang. **The ID change stops being cheap the
moment the app stores an ID** in a bookmark, timeline, or share.

**Platform targets settled 2026-09-02:** iOS deployment target **26.0**, Android
`minSdk` **36** — the latter reaching ~7.5% of devices today, accepted deliberately
because these apps are built once to last rather than maintained against a widening
compatibility matrix ([interaction.md](interaction.md#platform-targets)).

**Specification is now three layers**
([ADR-0013](architecture/decisions/0013-three-layers-of-specification.md), Accepted):
requirements stay platform-neutral; per-platform judgements go in
[interaction.md](interaction.md); icon mappings are **data** in `brand/icons.md`,
generated into both apps and checked against the iOS deployment target at build time.

**Two prerequisites are corpus work, not app work.** Nitnem must become a
**bani-group** container before named journeys can be general rather than a special
case. And a corpus survey on 2026-09-02 established that **transliterations do not
exist in `database/collections`** — pronunciations come from `packages/gurmukhi`'s
`transcribe()`, three schemes, always available — while translations are nine assets
across en/es/pa, complete for SGGS but covering **under half** of Dasam Granth in
English.

**`apps/ios` and `apps/android` are the platform apps now**, not store-retention
scaffolds ([ADR-0014](architecture/decisions/0014-one-app-three-shells.md)) — one app
across three shells, with Electron dropped and the D-pad as the input constraint every
screen is designed against. **Mobile is what ships first**
([plan.md](plan.md#how-this-is-actually-sequenced-something-usable-then-the-next-thing).

**Accepted (build against these):**

- [ADR-0002](architecture/decisions/0002-view-modes-and-overlay-endpoints.md) —
  `/view/<mode>` shares per-device config; `/overlay/<name>` are named,
  server-global configs.
- [ADR-0003](architecture/decisions/0003-relay-transport.md) — plain WebSocket
  relay, not WebRTC; LAN-direct stays primary.
- [ADR-0005](architecture/decisions/0005-line-type-derived-not-stored.md) — one
  line-type classifier in `packages/gurmukhi`, generated into the corpus at build
  time.
- [ADR-0006](architecture/decisions/0006-features-removed-in-redesign.md) — what is
  being removed, and why each one.

**Not settled — do not assume an answer:** ADR-0004 (concurrent line control,
Proposed), ADR-0009 (requirements-are-the-contract, Proposed), ADR-0012 (journeys,
Proposed), ADR-0007 (telemetry), ADR-0008 (history/ML), ADR-0010 (shared core),
ADR-0011 (distribution).

**The five questions blocking everything else** are listed in
[plan.md](plan.md#phase-0--close-the-specs) — position identity, traversal context,
which repeats merge, ADR-0004, and ADR-0010.

## The rules that govern these documents

- **Requirements state what must be observably true**, never how to achieve it, and
  every one must be checkable. Payload shapes are *not* authored there — they are
  derived during implementation and then published
  ([ADR-0009](architecture/decisions/0009-requirements-are-the-contract.md)).
- **Undecided domain rules go in an Open questions section, explicitly.** A
  plausible-looking guess written in the imperative is worse than a question,
  because it gets implemented and then depended on.
- **ADRs are superseded, never edited into a different decision.** The record of
  what we believed and when is the point
  ([ADR-0001](architecture/decisions/0001-record-architecture-decisions.md)).
- **If requirements, protocol, and code disagree, that is a bug in one of them** —
  say which, and why.
