# Architecture

Monorepo layout, dependency graph, build conventions, release model. Deviating
from this is a structural decision, not a local one. For *why*, and for what is
undecided, see [`decisions/`](decisions/).

## Layout: flat taxonomy, wrappers only at ≥2 members

Top level is `apps/`, `packages/`, `database/`, `brand/`, `projects/` — no deeper
grouping wrapper (no `apps/desktop/presenter`, no `packages/rust/gurmukhi`) unless
a category has ≥2 members that need telling apart at a glance. `database/` and
`brand/` have no siblings, so they sit at root rather than inside an invented
`data/` or `assets/`. Add the wrapper the day a second member arrives — a wrapper
around one thing is pure indirection.

**`apps/` vs `projects/`** ([ADR-0015](decisions/0015-apps-vs-projects.md)):
`apps/` is the Shabad OS product's shells only — `presenter`, `ios`, `android`,
`web` — sharing `packages/design`, `packages/gurmukhi`, and `docs/requirements/`.
`projects/` holds standalone tools that support the work without being a shell of
the product — today just `library`, an Electron app for dewarping scanned pages
that the `database` component's review process uses. Don't confuse it with
[ADR-0012](decisions/0012-journeys-replace-viewing-history.md)'s "Library" feature
inside the product itself; same word, unrelated.

**`apps/presenter` is the exception, deliberately.** The migration imported each
repo's default branch, and presenter's `main` is still its pre-rewrite v2 layout:
a root orchestrator `package.json` (npm-run-all, own `package-lock.json`)
delegating into `app/` (Express backend), `app/frontend` (CRA-era React),
`app/electron`, `app/lib`. That structure moved under `apps/presenter/` unchanged
and is **not** flattened and **not** joined to the bun workspace — it stays
npm-self-managed (`npm install` in `apps/presenter`, cascading via its own
`postinstall`).

A 2024 rewrite onto a workspace layout (`backend`, `electron`, `frontend`,
`contract`, `node`, `schemas`, `swiss-knife`, `themes`, `transformers`, `tsconfig`
as flattened siblings, scoped `@presenter/*` packages) stalled and never merged —
it is preserved as the namespaced branch `presenter/next`, not materialized as a
directory. PR #700 (Vite/React18/ESM modernization) targets `main`, confirming
that is where active development happens. Adopt `presenter/next`'s shape only if a
v3 effort resumes from it; do not assume it is current.

## Dependency graph

```
gurmukhi (packages/gurmukhi — Rust core rewrite, v1.x, no internal deps,
          no in-repo consumers yet)

database (database/ — 5.0.0-next; depends on gurmukhi-utils@3.x, the
          pre-rewrite npm package, NOT packages/gurmukhi)
   │ npm registry pin: @shabados/database ^4.8.7
   ├──> presenter (apps/presenter, `main` line only — v2, npm-self-managed)
   └──> api (separate repo, external)

web (apps/web) — no internal package deps (Qwik site; talks to services)
packages/sant-lipi (font) — consumed by presenter's themes
packages/design (tokens.md, icons.md) — generates DesignTokens/AppIcons into
          apps/ios, apps/android; apps/web does not consume it yet
brand — assets only, not a code dependency

apps/ios, apps/android — platform apps, not scaffolds (ADR-0014). They bundle a
  generated corpus slice (database/scripts/export-bundled-banis.ts) and the
  released Sant Lipi font; iOS consumes packages/gurmukhi directly (Swift package,
  no FFI shim). Neither has a shared core to consume — ADR-0010 is undecided.

projects/library (apps/library until ADR-0015) — Electron desktop tool for
  dewarping scanned pages; no deps on anything above.
```

External chain: `gurmukhi` → `database` → `api` → `sdk`/`mobile`. Everything left
of `api` lives here; `api`, `sdk`, `mobile`, and `mintlify-docs` stay separate and
consume published artifacts, not source.

**No `workspace:*` linking anywhere.** Every internal consumer keeps its
pre-migration registry pin: `apps/presenter`'s `app/package.json` pins
`@shabados/database ^4.8.7` and `gurmukhi-utils ^3.2.1`; `database` pins
`gurmukhi-utils@3.x`. Deliberate — the in-repo heads are new-major rewrites
(`database` 5.0.0-next; the Rust `gurmukhi` 1.x has a breaking API versus the
`gurmukhi-utils@3.x` JS package consumers target), so linking today would silently
upgrade every consumer onto an unreleased major and break them.

`workspace:*` is the documented **upgrade path**, not a migration step: when a
consumer deliberately moves onto `database@5` or Rust `gurmukhi@1`, that is its own
PR flipping the dependency and fixing what the major bump breaks. The monorepo
makes that PR atomic — that is the payoff, not something migration forces on
everyone at once. `apps/presenter` must also opt into bun-workspace membership
first.

## Built-package convention

Three packages ship compiled artifacts and each exposes a build task:
`packages/gurmukhi` (Rust cdylib + UniFFI-generated bindings — `mise run build`,
`mise run generate:all`), `database` (Drizzle build of `collections/*.json` into
SQLite — `bun run database:build`), `packages/sant-lipi` (compiled fonts,
convention TBD).

Root `postinstall` orchestrates these so a fresh `bun install` leaves every
bun-workspace consumer with working artifacts. `apps/presenter` is outside that
orchestration and gets its dependencies from npm like any external consumer, as are
`apps/ios` (Xcode) and `apps/android` (Gradle), which are not JS projects at all,
and `projects/library`, which manages its own npm install like `apps/presenter`.

`database`'s build has two modes once orchestration lands: **fetch-prebuilt**
(default — download the released SQLite artifact; fast, no Rust/Drizzle toolchain,
right for anyone not editing gurbani data) and **`--build`** (rebuild from
`collections/`; required when editing collection JSON, and catches schema/data
errors the prebuilt artifact would mask). **TODO:** fetch-prebuilt is not wired up
— today building `database` always rebuilds from `collections/`.

## Sparse checkout

`database/collections` is the one heavy zone: **604 MB across 154k JSON files**,
versus everything else combined being a rounding error. If you are not editing
gurbani/Panthic source data, exclude it:

```shell
git sparse-checkout set --no-cone '/*' '!database/collections'
```

Combine with `git clone --filter=blob:none` to avoid ever fetching those blobs.

## Release model

Release-please in manifest mode, one component per releasable unit — `presenter`,
`web`, `library`, `gurmukhi`, `sant-lipi`, `database`. Versioning and changelogs
cover all six; *registry publishing* is narrower — `database` (npm), `gurmukhi`
(crates/npm/PyPI/gems/Maven), `sant-lipi` (TBD) — while the apps release as desktop
builds. Each component has its own version, changelog, and tag
(`<component>-v<version>`, e.g. `database-v1.2.3`), so a change to `apps/web` does
not bump `database`. Conventional Commits drive bumps.

## Imported history

All 7 source repos (`presenter`, `web`, `library`, `gurmukhi-utils`, `SantLipi`,
`brand`, `database`) were merged with full history via `git-filter-repo`, not
squashed.

- **Branches** are namespaced per origin repo: `presenter/dev`, `database/master`,
  `gurmukhi-utils/main` — `git branch --list 'database/*'` finds them.
- **Tags** are prefixed per component: `gurmukhi-3.2.2`, `database-4.8.7`,
  `presenter-2.11.3`, matching the release-please prefixes. (A few pre-migration
  tags carried a `v` themselves, e.g. `database-v5.0.0-next.0` — historical, not a
  pattern to continue.)
- **Presenter's `main` keeps its original nested layout**, so blame and log on any
  presenter file walk back through its original history unaltered.
- `main` starts from an empty "chore: monorepo genesis" commit; each source repo's
  default branch is merged with `--allow-unrelated-histories --no-ff`, so the merge
  graph documents which repo landed when.
