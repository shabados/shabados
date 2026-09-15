# Corpus migrations

A migration is a manifest — the change written down as data and committed before it
runs — plus a rendering of what it does, with every line ID resolved to Gurmukhi.
The reviewable artefact is the manifest and the rendering, not the applier.

```
bun scripts/migrate.ts migrations/1-stranded-headings.toml            # verify + render
bun scripts/migrate.ts migrations/1-stranded-headings.toml --apply    # one commit per move
bun run ci:full                                                       # the gate
```

Applying refuses on a dirty tree and commits an explicit pathspec, so a `db:` commit
cannot pick up unrelated work. It verifies every move first — including that each
manifest's `text` matches the corpus — and writes nothing if any check fails.

**Numbering is sequential and unpadded**: `1`, `2`, `3` … `100`, `101` … `10050`.
No leading zeros. Padding only ever guesses at how many there will eventually be,
and the guess is wrong in one direction or the other.

**After applying**, some check will find fewer than its `expected` count. Lower it
and commit that as the last commit of the migration, so the branch ends green. The
count is a tracked fact, not a threshold — it failing in *either* direction is the
point.

**A move that empties its source retires that line-group ID** into `retired-ids.toml`,
in the same commit, because a corpus holding an empty group is not valid in between.
Retired IDs are never reissued.
