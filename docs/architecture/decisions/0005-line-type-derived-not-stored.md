# 5. Line type is derived by gurmukhi, generated into the corpus

2026-08-25 · **Accepted**

## Context

`@shabados/database` lines carry a `typeId` (manglaCharan / sirlekh / rahao /
pankti) that was never populated correctly. Consumers worked around it instead of
fixing it, producing **three divergent classifiers**, none of them the field that
nominally answers the question:

- the `database` repo grew a separate table / lookup method;
- `web` carries a further refined version of that logic;
- Presenter never uses `typeId` structurally — its screen reader identifies titles
  and pauri endings with **39 hardcoded ASCII patterns and two regexes**
  (`app/frontend/src/ScreenReader/index.js:10-60`).

Presenter's is the weakest and is the likely root cause of the Asa Ki Vaar
autoselect special-casing: the generic bani jump rule mis-categorises a line as a
title, so a bespoke workaround was written for one bani.

Line type gates sirlekh handling in line-ending stripping, title rendering, and
the rahao/pauri structure a correct autoselect depends on.

## Decision

**Line type stops being authored data.** One classifier lives in
`packages/gurmukhi` (Rust); the three existing implementations retire (`web`'s is
the most developed and is the natural starting point).

**The classification is generated into the built SQLite artifact at build time**,
not computed at runtime and not hand-edited. When a line is misclassified, the fix
is to the gurmukhi function — never to a value for that id.

**What is stored is block identity**, not a bare type: the line's type plus which
block instance it belongs to, using the same vocabulary as the navigation keymap
([navigation.md](../../requirements/navigation.md)) so a consumer can read a
composition's structure out of a column instead of running a classifier.

| Value | Meaning |
| --- | --- |
| `` ` `` | Title / manglacharan |
| `1`, `2`, `3`… | Belongs to pauri *n* |
| `r1`, `r2`… | Belongs to rahao block *n* |

Size is not a factor: ~154,000 lines × ~2–3 bytes packed = **~400 KB, 0.26% of the
151 MB artifact** (two typed columns ≈ 600 KB). Measured, not estimated.

**Structure is stored; addressing is still computed.** Block membership is a
stable property of a line within its composition. The hotkey is not — once a
composition exceeds 8 pauris, `1`–`8` address lines within the current pauri
rather than pauris, and no static column encodes both modes. The column removes
the need to *classify*; deriving addressing from the classification is cheap and
happens per session anyway.

**gurmukhi's role generalises:** anything derivable from the Gurmukhi text that
every consumer would otherwise recompute identically is generated into the corpus
by gurmukhi at build time. Transliterations already work this way; block structure
now does too. The corpus needs gurmukhi at *build* time only.

## Consequences

- **gurmukhi's version becomes an input to corpus determinism.** Byte-identical
  rebuilds are load-bearing for delta sync, so the database build pins an exact
  gurmukhi version and bumping it is a deliberate, releasable act — not transitive
  drift. This is the main cost and must be wired before the first generated build.
- **Open, on the critical path:** `database` currently depends on
  `gurmukhi-utils@3.x`, the old npm package, not `packages/gurmukhi`, and the APIs
  are incompatible ([architecture](../README.md)). Block-structure generation needs
  the new one, so that migration is no longer deferrable.
- Classifier changes need golden-test comparison across the whole corpus: fixing
  one line can reclassify others. Stored output makes that blast radius reviewable
  as a diff *before* shipping, rather than discovered in a gurdwara.
- A classification fix ships as a **data update**, not an app release through store
  review on five platforms.
- External consumers of `@shabados/database` read the column without needing
  gurmukhi at all.
- Line type stops being scripture data, so corrections no longer go through the
  citation-backed review process. Corrections to the *text* still do.
- Asa Ki Vaar's bespoke autoselect logic can most likely be **deleted** rather than
  ported, once line typing is trustworthy enough to confirm it was a workaround.
  To be verified — CLAUDE.md forbids inferring domain rules, and that cuts both
  ways: we do not get to delete one on a hunch either.
- **Open:** a line inside a bani assembled across shabads has block identity
  relative to its *source* shabad. Whether banis get their own block structure or
  derive it is unresolved, and it is where v2's bani special-casing lived.

## Rejected

- **Compute at runtime instead of storing** (the direction this ADR held for part
  of one day). It removes gurmukhi from corpus determinism and lets a fix improve
  old corpus versions too — but a misclassification then ships as an app release
  through store review on five platforms instead of a data update, and the change
  is invisible until it runs on a user's device. Reviewability plus fix latency
  outweighed determinism, once storage was measured at 0.26%.
- **Fix `typeId` and keep it authoritative** — available for years without
  happening. Curating 154k values by hand is a permanent correctness liability;
  every new line needs a human, and every classification can be wrong
  independently.
- **Keep the lookup table in the `database` repo, delete the other two** — better
  than today, but it puts text analysis in the data layer in a different language
  from the text-analysis package that exists for it, and leaves non-JS consumers
  unable to reuse it.
- **Each consumer keeps its own** — the status quo: three behaviours and bugs
  nobody can trace to a root cause.
