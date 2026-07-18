# Architecture

Monorepo layout, dependency graph, build conventions, release model. Read this before restructuring anything — deviating from it is a structural decision, not a local one.

## Layout rationale: flat taxonomy, wrappers only when ≥2 members

Top level is `apps/`, `packages/`, `database/`, `brand/` — no deeper grouping wrapper (no `apps/desktop/presenter`, no `packages/rust/gurmukhi`) unless a category actually has ≥2 members that need to be told apart at a glance. `apps/` and `packages/` clear that bar today; `database/` and `brand/` don't have siblings, so they sit at root rather than inside an invented `data/` or `assets/` wrapper. Add the wrapper directory the day a second member shows up, not before — a wrapper around one thing is pure indirection.

Inside `apps/presenter`, the flat-taxonomy rule does *not* apply yet — the migration imports each repo's default branch, and presenter's default branch (`main`) is still its pre-rewrite v2 layout: a root orchestrator `package.json` (npm-run-all, own `package-lock.json`) delegating into `app/` (Express backend), `app/frontend` (CRA-era React), `app/electron`, `app/lib`. That nested structure moves into `apps/presenter/` unchanged, and is deliberately *not* flattened and *not* joined to the bun workspace at migration time — `apps/presenter` stays npm-self-managed (`npm install` in `apps/presenter`, which cascades via its own `postinstall` into `app/` and `app/frontend`).

A 2024 rewrite onto a workspace layout (`backend`, `electron`, `frontend`, `contract`, `node`, `schemas`, `swiss-knife`, `themes`, `transformers`, `tsconfig` as flattened siblings, scoped `@presenter/*` packages) stalled and never merged to `main` — it lives on presenter's `next` branch, preserved here as the namespaced branch `presenter/next` (not materialized as a directory). Bhajneet's open PR #700 (Vite/React18/ESM modernization) targets `main`, i.e. the legacy layout above, confirming it's still where active development happens. Adopt `presenter/next`'s flattened/workspace shape deliberately — including bun-workspace membership — only if a v3 effort resumes from it; don't assume it's the current layout.

## Dependency graph

```
                    ┌─────────────┐
                    │   gurmukhi  │  (packages/gurmukhi — Rust core rewrite,
                    │   (v1.x)    │   no internal deps, no in-repo consumers yet)
                    └─────────────┘

                    ┌─────────────┐
                    │   database  │  (database/ — depends on gurmukhi-utils@3.x,
                    │ (5.0.0-next)│   the pre-rewrite npm package, NOT packages/gurmukhi)
                    └──────┬──────┘
                           │ npm registry pin: @shabados/database ^4.8.7
                           │ (same pin used inside and outside the monorepo)
              ┌────────────┴────────────────┐
              ▼                             ▼
      ┌───────────┐                 ┌──────────────────┐
      │  presenter │                 │  api (separate   │
      │ (apps/)    │                 │  repo, external) │
      └───────────┘                 └──────────────────┘

      presenter = apps/presenter, `main` line only (v2, npm-self-managed) —
        presenter/next (stalled workspace rewrite) is a branch, not a graph node
      web (apps/) — no internal package deps (Qwik site; talks to services, not npm packages)
      packages/sant-lipi (font) — consumed by presenter's themes
      brand — assets only, not a code dependency of anything
```

External to this monorepo: `gurmukhi` → `database` → `api` (separate repo) → `sdk`/`mobile` (separate repos). Everything left of `api` lives here; `api`, `sdk`, `mobile`, and `mintlify-docs` stay separate and consume published artifacts, not source.

**No `workspace:*` linking anywhere at migration time.** Every internal consumer keeps its registry pin exactly as it had pre-migration: `apps/presenter`'s `app/package.json` pins `@shabados/database ^4.8.7` and `gurmukhi-utils ^3.2.1`; `database` itself pins `gurmukhi-utils@3.x`. This is deliberate, not an oversight — the in-repo heads are new-major rewrites (`database` is `5.0.0-next`; the Rust `gurmukhi` crate is a `1.x` with a breaking API vs. the `gurmukhi-utils@3.x` JS package consumers actually target). Linking with `workspace:*` today would silently upgrade every consumer onto an unreleased major and break them.

`workspace:*` is the documented **upgrade path**, not a migration-day step: when a consumer deliberately wants to move onto `database@5` or the Rust `gurmukhi@1`, that's its own PR that flips the dependency to `workspace:*` and fixes whatever the major bump breaks. The monorepo makes that PR atomic (consumer + dependency change land together) — that's the payoff of the migration, not something migration day forces on every consumer at once. `apps/presenter` additionally has to opt into bun-workspace membership before it can use `workspace:*` at all (see "Layout rationale" above) — it's npm-self-managed until then.

## Built-package convention

Three packages in this monorepo ship compiled/generated artifacts rather than raw source, and each exposes a `build` script/task that produces them:

- `packages/gurmukhi` — Rust cdylib + UniFFI-generated bindings (`mise run build`, `mise run generate:all`)
- `database` — Drizzle build of `collections/*.json` into SQLite (`bun run database:build`)
- `packages/sant-lipi` — compiled font files (convention TBD — package hasn't landed in this monorepo yet)

Root `postinstall` orchestrates these so a fresh `bun install` leaves every bun-workspace consumer with working artifacts, not just source. `apps/presenter` isn't a bun-workspace member (see "Layout rationale" above), so it's outside this orchestration — it gets `@shabados/database`/`gurmukhi-utils` from npm via its own `npm install`, same as any external consumer.

`database`'s build has two modes once the orchestration lands:

- **fetch-prebuilt** (default) — download the released SQLite artifact instead of rebuilding from `collections/`. Fast, no Rust/Drizzle toolchain needed, right for anyone not editing gurbani data.
- **`--build`** — rebuild from `collections/` source. Required for anyone editing collection JSON; catches schema/data errors the prebuilt artifact would silently mask.

**TODO**: fetch-prebuilt isn't wired up yet — today, building `database` always means rebuilding from `collections/`. Land this before treating "fast default" as real.

## Sparse-checkout guidance

`database/collections` is the one heavy zone in this repo: 604MB across 154k JSON files, versus everything else in the monorepo combined being a rounding error by comparison. If you're not editing gurbani/Panthic source data, exclude it:

```shell
git sparse-checkout set --no-cone '/*' '!database/collections'
```

Everyone else — `database/src`, `database/scripts`, all of `apps/`, `packages/` — stays fully checked out; this only carves out the one directory that's disproportionately large. Combine with `git clone --filter=blob:none` (see root `README.md`) if you want to avoid ever fetching those blobs, not just avoid materializing them in the working tree.

## Release model

Release-please in manifest mode, one component per releasable unit — all six: `presenter`, `web`, `library`, `gurmukhi`, `sant-lipi`, `database`. Versioning/changelogs cover all six; *registry publishing* is narrower — `database` (npm), `gurmukhi` (crates/npm/PyPI/gems/Maven), `sant-lipi` (TBD) — while the apps release as desktop builds/deploys. `publish.yml` reflects that split. Each component gets its own version, changelog, and tag — a change to `apps/web` doesn't bump `database`'s version, and vice versa. Tags follow release-please's manifest default: `<component>-v<version>` — e.g. `database-v1.2.3`, `gurmukhi-v1.4.0`. Conventional Commits drive what bumps (`feat:` → minor, `fix:` → patch, breaking-change footer → major), same as each component used pre-migration.

## Old-repo history and tags, post-migration

Each of the 7 source repos (`presenter`, `web`, `library`, `gurmukhi-utils`, `SantLipi`, `brand`, `database`) was merged in with full history via `git-filter-repo`, not squashed:

- **Branches** are namespaced per origin repo: `presenter/dev`, `database/master`, `gurmukhi-utils/main`, etc. — `git branch --list 'database/*'` finds them.
- **Tags** are prefixed per component during import: `gurmukhi-3.2.2`, `database-4.8.7`, `presenter-2.11.3`, matching the release-please tag prefixes above so historical and future tags read consistently. (A handful of pre-migration tags already carried a `v` themselves, e.g. `database-v5.0.0-next.0` — that inconsistency is historical, not a pattern to continue.)
- **`presenter`'s imported `main` keeps its original nested layout** (root + `app/` + `app/frontend` + `app/electron` + `app/lib`) — moved under `apps/presenter/` as-is, no flattening, so blame/log on any presenter file walks back through its original repo history without alteration. The flattened `apps/*`/`packages/*` → sibling-names rewrite (`backend`, `contract`, `schemas`, ...) only ever existed on presenter's stalled `next` branch, preserved unmodified as the namespaced branch `presenter/next` — it was never applied to `main`, so it never touched the directory tree.
- The monorepo's `main` starts from an empty "chore: monorepo genesis" commit; each source repo's default branch is merged into it with `--allow-unrelated-histories --no-ff`, so the merge commit graph itself documents which repo landed when.
