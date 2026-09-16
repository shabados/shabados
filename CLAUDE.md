# CLAUDE.md

## What this is

Shabad OS presents Sikh scripture during live worship. Code in this repo runs in
gurdwaras, in front of a congregation, in the middle of kirtan. A crash is not a
bug report — it is an interruption of worship.

It must still build and run in twenty years, and it is maintained by AI agents,
not by a team carrying institutional memory. Every decision is weighed against
that. So assume: **you cannot ask the author** (anything unwritten is lost — if you
learn something the next agent needs, write it down before you finish); **you see a
fraction of the system** (code that must be held in mind whole in order to be
correct will eventually be got wrong); **tests and written specs are the only
memory that survives** (a convention living only in the code drifts the first time
something is edited around it).

## Prime directives

1. **Boring beats clever.** Given two ways, choose the one understandable from the
   file it lives in without wider context. Not readability for its own sake —
   keeping the amount of system you must hold in mind small enough to be reliably
   correct about.
2. **Dependencies are liabilities.** Adding one requires justification in the PR:
   what it does, why hand-rolling is worse, what happens when it is abandoned.
   Prefer the standard library, then vendored source, then what the platform now
   does natively — that list grows every year.
3. **The corpus is received, not repaired.** Everything follows from this. We re-zone,
   re-classify, refine — but we never *correct*, because that implies a judgement that
   something was wrong, which we most likely cannot prove to be true. Our own
   understanding gets the same treatment: state the current reading, do not narrate the
   route to it, because a history of wrong turns implies the text was obscure rather
   than that we were still learning it. This governs every word that reaches a reader —
   issue comments, commit messages, documentation, the apps themselves.

4. **Never guess at domain logic.** Gurbani line ordering, vishraam placement,
   block and rahao structure, transliteration rules, bani composition, search
   ranking — if `docs/requirements/` does not make the rule explicit, stop and ask.
   Do not infer it from examples or from v2's behaviour. A plausible-looking wrong
   rule is worse than an unanswered question, because it gets implemented and then
   depended on.
5. **Requirements are the contract.** `docs/requirements/` defines behaviour and is
   the source of truth. `docs/protocol/` holds the wire contract derived from it —
   semantics reviewed by humans, schemas generated and pinned at a release
   boundary. Code conforms to both. If any two of requirements, protocol, and code
   disagree, that is a bug in one of them — say which, and why (ADR-0009).
6. **Decisions live in ADRs** (`docs/architecture/decisions/`). Do not silently
   contradict one; if one looks wrong, propose a replacement. **Build only against
   Accepted** — writing code that assumes an answer is how an undecided question
   becomes decided by whoever implemented first.
7. **Tests carry intent; code does not.** A rule existing only as an implementation
   detail gets refactored away by someone who cannot see why it was there. Every
   domain rule needs a test that fails when the rule is broken. That test is how
   the requirement is enforced, and it is the only part of your reasoning that
   outlives you.

## Working style

- State trade-offs before implementing, not after. Name any materially different
  approach and say why you did not take it.
- Flag uncertainty explicitly. Never invent APIs, file paths, field names, or
  signatures — open the file and read it.
- Prefer changes whose correctness can be confirmed by reading them and running
  the tests, rather than by trusting they were thought through.
- Comment *why*, not *what*. The reader has the code but not the conversation.
- When a task is underspecified, ask one focused question rather than producing
  something plausible and hoping.

## Where things are written down

**Start at `docs/README.md`** — the index, and a one-screen summary of what is
decided and what is still open. Load only what you need from there.

| Path | Holds |
| --- | --- |
| `docs/requirements/` | **Source of truth.** What the app must do. |
| `docs/architecture/decisions/` | Why we chose an approach; what is still undecided. |
| `docs/protocol/` | The wire contract, derived from requirements. |
| `docs/architecture/README.md` | Monorepo layout, dependency graph, release model. |
| `docs/presenter-capabilities.md` | What v2 does today. A record of the past, **not** a target. |
| `docs/plan.md` | Rewrite sequencing: what is frozen, what is parallelisable, what blocks what. |

Docs here are written for agent context: compact, decision-first, with the reason
a thing was *not* done kept alongside the thing that was. Keep them that way.

## Technical constraints

- **Rust core**: rusqlite with the `bundled` feature. Compiles to native, wasm, and
  static libs for iOS and Android. Keep the FFI surface small and event-shaped. The
  core performs **no I/O and owns no clock** — sockets, discovery, and timers live
  at the edge. SQLite is the deliberate exception.
  - *Unresolved:* this file has previously required hand-written C-ABI bindings
    with no binding generators, while `packages/gurmukhi` ships UniFFI-generated
    bindings. Open — see ADR-0010 §1a-ii, which narrows it to two different
    boundaries. Treat neither position as settled.
- **Determinism is load-bearing.** The SQLite artifact must rebuild byte-identical
  from the same commit; delta sync depends on it entirely. Never introduce
  timestamps, autoincrement-dependent IDs, or nondeterministic iteration order into
  the build.
- **Pin everything.** `Cargo.lock` and `rust-toolchain.toml` are committed,
  dependencies vendored. No floating versions, anywhere.
- **No native Node modules.** The Electron shell reaches the core without node-gyp.
  If a change would pull it in, stop and raise it — that is a decision, not an
  implementation detail.
- **One protocol, two transports.** LAN-direct and relay carry identical messages.
  Transport concerns belong at the edge, never in the protocol.
- **Code ships with the app; the corpus does not.** Executable code cannot be
  loaded from outside the app bundle on any sandboxed platform, so core changes
  wait for store review. The SQLite corpus is data, lives in user-writable storage,
  and updates independently. Prefer putting a fix where it can ship fastest.

## Testing expectations

- Protocol changes require updated JSON Schemas and passing fixture validation
  against `fixtures/`.
- Search and navigation changes require golden-test comparison against recorded
  output. "Looks right to me" is not evidence, and there is no reviewer whose
  intuition can substitute for a fixture.
- Anything touching sync needs explicit tests for reconnection, late-joining
  clients, and two controllers issuing commands at once.
- Anything crossing the FFI boundary needs tests on both sides. A wide boundary is
  a wide surface for core and bindings to drift apart.

## Not your call

- What ships, and when.
- The accuracy of scripture text, translations, or transliterations. Data
  corrections go through the `database` component's citation-backed review process,
  never through code changes.
- Removing a user-facing feature. Propose it; do not do it. If you believe
  something is dead, prove it and record the removal in an ADR —
  `docs/presenter-capabilities.md` exists so removals are informed rather than
  accidental.
- Resolving a **Needs discussion** ADR by implementing one of its options.
