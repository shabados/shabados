# Search

Draft, 2026-08-25. Open questions at the end are blocking — do not guess them.
Replaces v2's search; [presenter-capabilities.md §3](../presenter-capabilities.md)
describes what is being replaced, not the target.

## One search box

**Decided 2026-09-02: there is exactly one search surface, and it is an omni box.**
No separate search inside the Library, none inside a collection, none scoped by a
view. One box, whose *results* are scoped rather than whose *instances* are.

It searches, in one query:

- **The current view** — what is on screen now.
- **The whole Library** — every asset, and across all collections and bookmarks.

**A numeric query returns angs and pages** — `1400` offers ang 1400 of the SGGS,
panaa 1400 of the Dasam Granth, and so on for every source that paginates. And if a
number matches the current position of a tracked bookmark, **that bookmark is offered
too**, by name, so typing the ang you are up to offers to continue that sehaj paath
rather than merely opening the page.

**The same rule makes URLs work**: `shabados.com/1400` opens ang 1400 of the SGGS
directly, with no prefix or query parameter.

**This depends on a corpus constraint, and it is not free.** A bare number can only
mean a page if **no ID is ever all digits**, and IDs must not start with `0` because
spreadsheets mangle them during review. 5,999 existing IDs violate that today and
must be reassigned — see
[database roadmap §3.2](../../database/docs/roadmap.md), which also explains why this
gets much more expensive once the app starts storing IDs in bookmarks and shares.

**Why one box.** Search scoped per surface means the same query gives different
answers depending on where it was typed, and no way to see that is what happened.
[ADR-0006](../architecture/decisions/0006-features-removed-in-redesign.md) already
collapsed per-view language toggles for the same reason: several places to configure
one thing is several places for them to disagree.

**A search result may carry a preset** — a *search preset*, applied when no bookmark
or collection preset claims the result
([library.md](library.md#presets)). Entirely optional.

**Where the box is invoked from is not specified** —
[reading-shell.md](reading-shell.md#open-questions) has no entry point for it.

## Match units

First-letter search does not match only whole lines. A line is divided by **heavy
vishraams** into phrases, and each phrase is independently matchable, so one line
yields at least two kinds of unit: the **whole line**, and each **heavy phrase**
within it. A query matches a unit when the query's letters are the leading letters
of that unit's words, in order.

## Ranking

Tiered. Intent: **when a short query is an exact, complete match for something,
that something comes first** — a user typing three letters and getting a line that
is exactly those three words has almost certainly found what they meant.

For a query of length *N*:

1. **Exact whole-line match** — the line's first-letter form is exactly *N* letters
   and matches.
2. **Exact heavy-phrase match** — a heavy phrase within the line is exactly *N*
   letters and matches.
3. **Everything else** — the query matches somewhere within a longer unit.

Within a tier, order by **source priority**. **Tier strictly dominates source
priority**: an exact heavy-phrase match from Bhai Gurdas Ji ranks above a partial
match from SGGS. Source priority only breaks ties *within* a tier and never
promotes a result across one.

**Source priority** is a curated ordering over scriptures, most authoritative
first: (1) Sri Guru Granth Sahib Ji, (2) Sri Dasam Granth Ji, (3) Bhai Gurdas Ji
(Vaaran, Kabit Svaiye), (4) remaining sources. It is **not** the database's source
id order and must not be inferred from it. It grows as sources are added and must
stay in sync with what is actually in the database — a source present in data but
missing from the list is a bug, and should be detectable rather than silently
sorting last.

**"Source" means scripture, not pack.** Ranking is two-dimensional and the axes do
different jobs: **scripture priority orders results**; **pack preference selects
which variant to show** when the same line comes from more than one publication,
and never promotes or demotes a result. Conflating them would rank an SGGS line
below a minor scripture because of which book it arrived in.

## Variation lookup

A line can be written many ways across assets — different spellings, different
word breaks — and a user must find it regardless of which variant they typed or
which asset they hold. **A dedicated lookup table maps every known variation to
the canonical line ID**
([data-model.md](data-model.md#identity-one-canonical-line-id-many-renderings)),
which lives in the required Shabad OS asset and is therefore always resolvable.
This is a search-index concern, not a corpus concern: the variations exist so
queries land, not so text is rendered.

## Fuzzy matching

Similar-sounding letters must match each other — searching `b` should find
`vismaad`, spelled `bismaad` in some publications.

**Fuzzy variants are generated *before* first letters are computed, not after:**

```
line text → generate spelling variants → extract first letters per variant → index
```

Computing first letters first and fuzzing them afterwards produces different, and
wrong, results.

**The hard constraint:** fuzziness must apply **only where the two spellings are
the same word**. `b` should reach `vismaad` without turning every `b` query into a
`v` query against unrelated words. Pure letter substitution cannot express that —
it has no notion of wordhood. Three approaches, none chosen:

1. **Curated variant list** — explicit known pairs. Most accurate, ongoing
   editorial work, always incomplete.
2. **Unconstrained substitution** — every combination, accepting false positives.
   Cheapest, and degrades results exactly the way tiered ranking exists to prevent.
3. **Corpus-constrained substitution** — generate substitutions, keep only variants
   whose words actually occur somewhere in the corpus. Bounded automatically, no
   curation, approximates "is this a real word" without a lexicon.

Option 3 looks strongest but is a domain judgement, not an engineering one
(open question 8).

**Sizing: fuzz first letters, not full text.** Generating variants of full line
text is combinatorial and would explode the index. For first-letter search this is
avoidable entirely — only the first letter of each word participates in matching,
so a ten-word line with three ambiguous initials yields eight first-letter strings
of ten characters each. **Full-word search has no such shortcut** (matching happens
inside words) and needs its own answer; treat them as two problems.

## Duplicates across packs

Two installed packs carrying the same scripture can match the same line twice.
Showing both is almost never wanted mid-kirtan; silently dropping one hides that a
variant reading exists.

Tractable because [identity is canonical](data-model.md#identity-one-canonical-line-id-many-renderings):
duplicates **collapse by ID** — one result, rendered from the user's preferred
asset, with an affordance to see the other readings. No text-similarity matching,
which is fortunate since it would be least reliable exactly where publications
differ most. Remote results carry canonical IDs too, so they collapse the same way.

## Non-requirements

- Search results do **not** carry their own translation or transliteration
  configuration. That was v2 behaviour and is removed
  ([ADR-0006](../architecture/decisions/0006-features-removed-in-redesign.md)).

## Open questions

1. **Is "2–4 characters" a rule or an example?** Stated as "if you use 2-4
   characters… results that are exactly 2-4 characters long should be
   prioritized." Read above as *a query of length N prioritises units of length
   exactly N*, which generalises cleanly. If the tiering applies only in the 2–4
   range and longer queries rank differently, the rule is different.
2. **Ordering within tier 3.** After tier and source, what breaks ties among
   partial matches — match position within the line, line length, corpus order?
   v2 effectively returned database order, which nobody decided.
3. **Does the whole-line tier subsume the heavy-phrase tier** when a line has no
   heavy vishraam — is such a line eligible for tier 2 at all, or only 1 and 3?
4. **Does any of this apply to full-word search?** The requirements as stated
   describe first-letter search; full-word exists and needs its own ranking
   statement, even if the answer is "same tiers".
5. **Where does the source priority list live** so it stays in sync — a column or
   table in the database, or configuration in the search layer? And what happens
   when a source exists in data but not in the list?
6. **Result limit.** v2 capped at 50. Applied before ranking makes the tiers
   meaningless; applied after requires ranking the full match set.
7. **`^` (word order) and `%` (larivaar accentless) modifiers** are wanted but were
   never implemented. How do they interact with these tiers?
8. **Which fuzzy approach** of the three above?
9. **Which asset's rendering is shown for a collapsed result** — see
   [data-model.md](data-model.md#open-questions) question 3.
