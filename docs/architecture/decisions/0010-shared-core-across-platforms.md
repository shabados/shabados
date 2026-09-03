# 10. Shared core across platforms

2026-08-25 · **Needs discussion**

## Context

Five targets, three shells: iOS (Swift), Android (Kotlin), macOS/Windows/Linux
(Electron), Web (browser). Priority is maximising shared logic over a twenty-year
horizon. A Rust server was proposed but is not a requirement; C++ has been
suggested because it is supported everywhere.

**The language question is downstream of a bigger one: how much logic lives in the
core.** Candidates — Gurmukhi text processing, search matching and ranking, block
detection and autoselect, session state and protocol, SQLite access — are all
deterministic logic over text and state, which is what ports well. Everything
outside (rendering, input, platform integration) is where sharing would be forced.
Note how much is already written as requirements: a requirement stated without
reference to a UI can live in the core.

**`packages/gurmukhi` is already a Rust core** shipping generated bindings to six
ecosystems (crates.io, npm, PyPI, RubyGems, Maven/Gradle, SPM). The multi-platform
binding problem — the actually hard part — is already solved and paid for.

**Fixed by CLAUDE.md:** no native Node modules, so Electron reaches the core as a
separate localhost process; rusqlite bundled; compiles to native, wasm, and static
libs for iOS and Android.

**Contradiction between two authoritative documents.** CLAUDE.md: "small, C-ABI,
hand-written — no binding generators." [architecture/README.md](../README.md):
`packages/gurmukhi` is "Rust cdylib + UniFFI-generated bindings." Resolving this
determines whether Swift and Kotlin bindings are generated or hand-written — a very
large difference in ongoing effort. Narrowed in 1a-ii.

## Decision

**None yet.** Questions in dependency order:

### 1. Maximal or minimal core?

Maximal shares more and diverges less; minimal keeps platforms idiomatic and avoids
an FFI boundary inside interactive paths.

**Mobile-as-host pushes strongly toward maximal.**
[ADR-0011](0011-distribution-channels.md) establishes that a phone must be able to
*serve* other devices, so the server — session state, protocol, search, block
detection, autoselect — runs on iOS and Android too. Under a minimal core that is
the server implemented three times: three implementations of
[ADR-0004](0004-concurrent-line-control.md)'s concurrency rules, three of the search
ranking, three of the block model. That is the divergence that produced v2's three
incompatible line-type implementations, except now where two disagreeing peers
corrupt a live session. The FFI-latency objection dissolves here too: session and
protocol work happens per user action, not per frame.

**1a. What a maximal core contains.** *In:* SQLite (rusqlite bundled) and every
corpus query; text processing (transliteration, first-letters, accent stripping,
vishraam classification, syllable counting, line-type classification); search
(match units, tiered ranking, source priority); navigation (block detection and
addressing, adaptive scope, unread tracking, autoselect); session (current
composition, line, pointers, viewed lines, history, settings scope, concurrency
rules); protocol semantics and serialisation. *Out:* rendering, themes, CSS;
sockets, mDNS, timers, permissions, file pickers, notifications, windowing; keymap
*dispatch* — though the keymap itself and the set of addressable actions are shared
data, not per-platform inventions.

**1a-i. The core does not absorb `packages/gurmukhi`.** It stays separately
published; the core depends on it. Both are Rust, so **there is no FFI between
them** — the core takes it as an ordinary crate and gurmukhi links statically inside
the core's artifact, one binary per platform. **Shabad OS never consumes gurmukhi's
generated bindings**; those exist for external non-Rust users.

```
Platform (Swift / Kotlin / JS)
        │  ← the only FFI boundary
   ┌────┴─────────────────────┐
   │  core (Rust)             │
   │    └── gurmukhi (Rust)   │  ← ordinary crate dependency, no FFI
   └──────────────────────────┘
```

**1a-ii. Which narrows the binding-generator contradiction.** Two different
boundaries: *gurmukhi → the outside world* (UniFFI, serving consumers who are not
us — the directive plausibly never scoped there) versus *core → Shabad OS
platforms* (the boundary the directive is about, genuinely undecided). The real
question: should the core's own boundary use the generator already in the tree? A
maximal core has a large API needing Swift, Kotlin, and wasm; hand-writing that is
substantial ongoing work and the tooling is already understood. **Still open**, but
the case for generators is stronger than the original directive implies.

**1a-iii. Where the line falls.** gurmukhi owns anything taking Gurmukhi text and
returning text or structure. The core owns anything involving the corpus, session,
or app policy — search *ranking* is Shabad OS domain, not a property of Gurmukhi.
Rule of thumb: if a third party with no interest in Shabad OS would want it, it
belongs in gurmukhi.

**1a-iv. Release-cadence capture is the risk.** gurmukhi is public with outside
consumers; if its releases become driven by whatever the core needs this week, they
get churn they did not ask for. Design it as a general-purpose library we happen to
be the largest consumer of. (Line-type version skew is already resolved by
[ADR-0005](0005-line-type-derived-not-stored.md): one classifier, generated into the
corpus at build time, with the build pinning an exact gurmukhi version.)

**1b. The core must be sans-IO** — no I/O, no clock. A pure state machine: platforms
feed events, it returns state and effects; sockets, discovery, and timers stay at
the edge. Buys **determinism** (what makes golden tests possible at all — same event
sequence, same state, every platform), **portability** (no platform APIs to
abstract), and compliance with CLAUDE.md's "transport concerns belong at the edge."
SQLite is the deliberate exception.

**1c. Size is not the constraint; the corpus is.** Rust core: 2–5 MB per
architecture native (opt-level="z", LTO, stripped), 1.5–3 MB as wasm (~0.5–1 MB
compressed over the wire). The SQLite corpus is **151 MB**, which drives every
distribution question worth arguing about ([corpus.md](../../requirements/corpus.md)).

**1d. Web is a different profile.** `wasm-bindgen` generates the JS↔wasm
marshalling, so there is no hand-written FFI on the web side — but a browser tab
**cannot bind a LAN port**, so web is a client only, never a host, and it cannot
hold 151 MB. Web most likely consumes a **subset**: protocol client and rendering,
with search and corpus served by the host it connects to. Design for that asymmetry
deliberately rather than discovering it when the wasm build turns out unusable.
**Open:** offline mode with a reduced corpus, or strictly an online client?

**1e. The core cannot be patched outside the app; the corpus can.** Executable code
must ship inside the bundle — iOS review prohibits downloading code that changes
functionality, macOS hardened runtime and notarisation prevent unsigned dylibs from
arbitrary locations, Android restricts dynamic code loading — so core updates go
through store release cycles. Data is not code: the SQLite artifact lives in
user-writable storage and updates independently, the property worth preserving from
v2's hot-patch ([ADR-0011](0011-distribution-channels.md)). This is why
[ADR-0005](0005-line-type-derived-not-stored.md) generates line typing **into the
corpus at build time** — a classification fix then ships as a data update rather
than an app release on five platforms.

**1f. Performance.** The shared core is *faster* than what it replaces: v2's search
path is Node → Objection/knex → SQLite → JSON → WebSocket → React, and a Rust core
in-process removes the ORM, the IPC hop, and the JSON round-trip. FFI crossing costs
tens to low hundreds of nanoseconds — irrelevant **provided the API is
coarse-grained** (an event in, a state out, per user action). It becomes relevant in
two avoidable shapes: **chatty APIs** — rendering must receive a prepared structure,
not query per token, and note v2's `Line.js` transliterates per word at render time,
a pattern that must not survive the boundary; and **large payload marshalling** —
search results with translations, mitigated by returning identifiers and pulling
details lazily, or a zero-copy representation. Both are API-design consequences,
another argument for 1b.

### 2. Rust or C++?

**For C++:** near-universal platform support including the long tail; larger
developer pool; forty years of toolchain stability.

**For Rust:** a Rust core already exists and already ships to six ecosystems, so C++
discards working, paid-for infrastructure; the binding story is materially better
(C++ → Swift needs a C shim or Objective-C++, C++ → Kotlin needs JNI, C++ → web
needs Emscripten, versus UniFFI and wasm-bindgen); and memory safety matters more
here than usual, because a crash is an interruption of worship — a class of bug the
compiler refuses to accept is worth more under agent maintenance, not less, since an
author working from a partial view of the system is exactly who benefits from
unrepresentable lifetime and aliasing errors.

The longevity argument for C++ is weaker than it looks: Rust's edition system makes
the same promise, and Rust ships in the Linux kernel, Windows, and Android.
**Leaning: stay with Rust** — not because it is better in the abstract, but because
the hard problem is bindings, that problem is already solved here, and solving it
again in C++ is strictly more work for a less safe result.

### 3. How does Electron reach the core?

CLAUDE.md says a localhost process. The alternative is **wasm in the renderer**,
which satisfies "no native Node modules" differently — no child process, no port, no
localhost surface to sandbox or firewall. Weigh against store sandboxing
([ADR-0011](0011-distribution-channels.md)); the web platform needs a wasm build
regardless.

### 4. What happens to the `@shabados/database` dependency?

A core owning SQLite replaces it entirely. Whether the core exposes queries or a
higher-level API is part of question 1.

## Consequences

To be filled in once decided. Already visible:

- Each platform needs a binding maintained for it — four targets minimum. Generated
  bindings make that tractable; hand-written C-ABI does not at this surface area.
- **The FFI surface becomes the main design problem** — keeping a maximal core's API
  small, stable, and versionable is real ongoing work.
- **Core changes ship on store release cycles**; corpus fixes do not. That asymmetry
  should influence what lives where.
- **Debugging across an FFI boundary is worse**, so the golden-test suite must
  compensate: core work should be "change the rule, run the tests," never "attach a
  debugger across the boundary."
- Requirements documents become more valuable, not less — they keep platforms honest
  where logic *cannot* be shared.

**Maintainer model.** Stated 2026-08-25: there are no human contributors and there
will not be; maintenance is by AI agents (CLAUDE.md updated accordingly — it
previously grounded directives in "volunteers who are not full-time developers").
This **dissolves** the language-familiarity barrier, removing one argument here;
**strengthens** machine-checkable specification, golden tests, deterministic builds,
and explicit requirements, since an agent can only read what was written and run
what exists; and leaves **unchanged** that a wide FFI boundary is a wide surface for
drift, to which agents are at least as susceptible as humans — arguably more, since
they see less of the system at once. "Boring beats clever" survives on its own
merits: it was never only about human comprehension.

## Rejected

- **No shared core; each platform implements requirements independently.** Maximum
  idiomaticity, and viable precisely because the requirements are written. Rejected
  as a default: it multiplies the surface where two platforms silently disagree
  about search ranking or block detection — the class of bug the v2 line-type
  divergence produced.
- **TypeScript core shared everywhere via a JS runtime on mobile.** Fewest
  languages, largest contributor pool. Rejected: puts a JS runtime inside otherwise
  native mobile apps, works against store review and app size, and contradicts the
  intent that mobile be genuinely native.
