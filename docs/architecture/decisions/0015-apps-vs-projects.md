# 15. `apps/` holds the product's shells; `projects/` holds everything else

2026-09-16 · **Accepted**

## Context

[ADR-0014](0014-one-app-three-shells.md) settled what Shabad OS *is*: one product,
rendered by three shells (Swift, Kotlin, web). [`architecture/README.md`](../README.md)'s
flat taxonomy put every runnable thing under `apps/` regardless of whether it was a
shell of that product — `apps/presenter` (the current shell), `apps/ios`,
`apps/android`, `apps/web` (today the marketing site, later the web shell), and
`apps/library`, an Electron desktop tool for dewarping scanned pages that the
`database` component's citation-backed review process uses. Nothing there shares
`packages/design`'s tokens, `packages/gurmukhi`, the reading-shell requirements, or
any of the journeys/search/controls/Connect surface the rest of this document set
specifies. It is a tool the corpus work depends on, not a shell of Shabad OS.

**Name collision worth flagging so it doesn't confuse a future agent:**
[ADR-0012](0012-journeys-replace-viewing-history.md)'s "Library" is a Shabad OS
*feature* — the in-app catalogue of saved bookmarks and journeys, built into the
product shells. `apps/library` (now `projects/library`) is an unrelated standalone
desktop app for the database team. Same word, no other connection.

Flat taxonomy already carried an exception for exactly one thing not shaped like
its neighbours (`apps/presenter`'s unflattened v2 layout). This is the same
situation one level up: one directory that doesn't belong in the same category as
the rest, not a reason to keep stretching the category.

**This is a live decision, not a retroactive label.** The next thing in this shape
is already anticipated: an `about` project for what is currently footer/legal
content on shabados.com (privacy policy, support pages), addressable independently
(e.g. `about.shabados.com/privacy`) once it exists. `apps/web` stays exactly what
it is today for now — becoming the ADR-0014 web shell is Phase 2 work
([plan.md](../../plan.md)), gated on the wasm-SQLite spike, and moving it or
carving `about` out of it is a separate decision for when that phase starts.

## Decision

**Two top-level categories where there was one:**

| | Holds | Shares |
| --- | --- | --- |
| `apps/` | Shells of the Shabad OS product — `presenter`, `ios`, `android`, `web` | Design tokens/icons (`packages/design`), `packages/gurmukhi`, the requirements in `docs/requirements/` |
| `projects/` | Standalone tools that support the work but aren't a shell of the product | Nothing structural — each is its own thing |

`apps/README.md`'s promise — "anything true of both platforms gets written once" —
is exactly the thing that stops making sense once a directory doesn't share the
product at all. That is the dividing line: not "is it runnable," but "does it
belong to the shared design language, corpus, and requirements the rest of `apps/`
is written against."

**Not a GUI-only category.** `library` happens to be an Electron app, but nothing
about `projects/` is scoped to desktop GUIs — a CLI or TUI tool with a standalone
purpose belongs there on the same test: does it share the product's design
language and requirements, or is it its own thing.
[`projects/README.md`](../../../projects/README.md) is the index.

**Moved now:** `apps/library` → `projects/library`. No code changes — Electron app,
build tooling, and CI move as-is. Everything referencing the old path (root
`README.md`, `package.json` workspaces, `.release-please-manifest.json`,
`release-please-config.json`, `.github/workflows/_ci.yml`, `library-ci.yml`,
`library-publish.yml`) is updated in the same commit as the move. The
release-please **component name stays `library`** — only the path key changes —
so version and changelog history are preserved.

**Deferred:** moving or splitting `apps/web`. Out of scope until Phase 2 starts and
there is an actual `about` project to move footer content into.

## Consequences

- [`architecture/README.md`](../README.md)'s flat-taxonomy rule gets a fifth
  top-level name (`apps`, `packages`, `database`, `brand`, `projects`) and its
  stale description of `apps/ios`/`apps/android` as "store-retention scaffolds" is
  corrected to match ADR-0014 in the same pass.
- Future non-shell tools (`about`, and whatever else the corpus or design work
  needs standalone tooling for) go in `projects/` from the start rather than
  landing in `apps/` and needing a later move.
- `projects/` starts with exactly one member. Flat taxonomy's own rule — a wrapper
  around one thing is pure indirection — would argue against inventing it for a
  single directory; the justification here is that a second, concrete member
  (`about`) is already anticipated, not hypothetical, so the category is being
  established ahead of that member rather than invented to hold one thing
  permanently.

## Rejected

- **Leave `apps/library` where it is; handle `about` when it arrives.** Defers the
  decision but doesn't undo the mismatch already present — `apps/library` sharing
  the same top-level ancestor as `apps/ios`/`apps/android`/`apps/web` invites
  reading it as a fourth shell candidate, which it has never been.
- **`apps/tools/library`, a grouping wrapper inside `apps/`.** Flat taxonomy's own
  rule reserves grouping wrappers for ≥2 members needing telling apart *within a
  category that genuinely belongs together*. `library` isn't a variety of shell;
  nesting it under `apps/` still implies it is one.
