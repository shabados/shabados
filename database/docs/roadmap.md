# Database roadmap

Known data and schema work, ordered by whether it corrupts output today. Findings
are measured against `collections/` at the commit noted; re-measure before acting.

Text corrections go through the citation-backed review process, never through code
([CLAUDE.md](../../CLAUDE.md), "Not your call"). This file records *what* needs
fixing and *how it is detected*, not what the correct text is.

## 1. Correctness — wrong output today

### 1.1 Dangling line references in banis

Five bani entries reference line IDs that have no file in `lines/`:

| Line ID | Referenced by |
| --- | --- |
| `1XXX` | `banis/ASKV.toml` |
| `SEXU` | `banis/ASKV.toml` |
| `SEXD` | `banis/SKMI.toml` |
| `FUKH` | `banis/BRMH.toml` |
| `BUMH` | `banis/AKUS.toml` |

`1XXX`, `SEXD`, and `SEXU` look like placeholders that were never replaced. Every
other bani line resolves, so this is five broken rows, not a systemic problem.

**Fix:** resolve or remove each. **Prevent:** a build validator asserting every
referenced line ID exists. This should fail the build, not warn.

### 1.2 Translations attached to the wrong line

`ਚੌਪਈ ॥` — a two-word section header — carries
`"And running his horses, chased and killed the deer.(4)"` as one of its English
translations. That is a translation of a different line, attached to this row.

Off-by-one attachment is unlikely to be isolated: it usually indicates a run of
shifted rows from a bulk import. **Before fixing individual rows, survey the
scope** — look for translations whose length or content is wildly inconsistent with
their line's word count, and check whether the mismatches are contiguous in
`order_id`. A run tells you an import shifted; scattered singletons tell you
something else.

## 2. Fragmentation — a review queue, not a bug

Where the same Gurmukhi appears more than once, its translations usually disagree
with themselves:

- **1,112** distinct Gurmukhi texts occur more than once
- **1,014 (91%)** have inconsistent translations in at least one language
- `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` — 574 occurrences, **162 distinct English translations**
- `ਦੋਹਰਾ ॥` — 11 variants (`DOHRA`, `DOHRA,`, `DOHRA (COUPLET)` …)
- `ਭੁਜੰਗ ਪ੍ਰਯਾਤ ਛੰਦ ॥` — 4× `BHUJANG PRAYAAT STANZA`, once with a trailing comma,
  once misspelled `PRYAAT`

**Not all of these are errors.** The mangal heads many different compositions and
some translators fold the composition name into it. This is a review list ranked by
occurrence count, not an auto-fix list — meaning decides, not string equality.

### 2.1 Fragmentation report

Build-time report (or a test that prints, rather than fails): group lines by
identical primary text, list those whose translations differ within a language,
sort by occurrence count. Needs no schema change.

Because legitimate divergences exist, the report needs a **suppression list** — a
small checked-in file of reviewed-and-accepted divergences — or it never converges
to zero and stops being read. Suppression entries should carry a reason.

**Explicitly not doing:** deduplicating text into a shared table. Measured saving is
**~1.4 MB against a 151 MB artifact** (0.4 MB Gurmukhi + 1.0 MB translations),
because the repeats are short headers — 1,726 copies of `ਦੋਹਰਾ ॥` is about 34 KB.
Sharing would prevent *future* drift but cannot resolve existing disagreement, and
it costs the property that one self-contained file per line is independently
reviewable in a diff. See
[data-model.md](../../docs/requirements/data-model.md#deduplicating-text-measured-and-not-worth-a-schema-change).

## 3. Schema

### 3.1 Rename the content types: `translation` and `note` are misnamed

The corpus calls two content types `translation` and `note`. **Neither name matches
what the field holds**, and the apps hit this the moment they had to label them.

| Today | Holds | Should be |
| --- | --- | --- |
| `translation` | A rendering of the line's meaning. The Faridkot teeka and Sahib Singh's Punjabi are interpretive; `DSSK` in English is a reading, not a lexical mapping. | **`interpretation`** |
| `note` | Word-by-word definitions: `ਗੁਣੀ = ਗੁਣਵਾਨ। ਮਿਲਿ = ਮਿਲ ਕੇ। ਲਾਹਾ = ਲਾਭ।` | **`word_gloss`** |

**Why it matters beyond tidiness.** A reader shown a word gloss under the heading
"Translation" takes scholarship for scripture translation, and a reader shown `DSSK`
under "Note" does the opposite. The UI has already adopted **Interpretation** and
**Word Gloss**
([display-controls.md](../../docs/requirements/display-controls.md#variorum)), so
until this lands the corpus and the apps use different words for the same field and
every implementer needs a translation table.

**Scope.** 479,256 `translation` rows and 49,486 `note` rows across 141,264 line
files, measured 2026-09-02. Mechanical: a key rename in the TOML and in the schema,
no text changes, so it does not go through citation-backed review.

**Determinism.** The rename must not alter row ordering or emitted bytes beyond the
key itself — the SQLite artifact must still rebuild byte-identical from a given
commit (CLAUDE.md).

**Sequencing.** Do it before the protocol schema is pinned
([ADR-0009](../../docs/architecture/decisions/0009-requirements-are-the-contract.md)),
or the wrong names are frozen into the wire contract and the rename stops being
cheap.

### 3.2 ID constraints: no leading zero, never all-digits

**Decided 2026-09-02.** No ID, at any length from 1 to 5 characters, may **begin with
`0`** or **consist entirely of digits**.

**Two reasons, and they are different.** All-digit IDs must go because the omni search
box and URLs need a bare number to mean exactly one thing: `1400` is ang 1400, and
`shabados.com/1400` opens it ([search.md](../../docs/requirements/search.md#one-search-box)).
Leading-zero IDs must go because spreadsheets mangle them — `0123` becomes `123` the
moment corpus data passes through Excel or Sheets, which it does during review.

**Measured against `collections/` on 2026-09-02:**

| | Total | Violating |
| --- | --- | --- |
| `lines` (4 chars) | 141,264 | **5,203** |
| `line-groups` (3 chars) | 12,730 | **795** |
| `sections` (4 chars) | 127 | **1** |
| **Total** | | **5,999** |

**Headroom is ample.** Lines and line-groups draw from a 34-character alphabet
(`0-9 A-H J-N P-Z` — I and O already excluded). After the rule, `lines` occupies 10.9%
of its namespace and `line-groups` 33.4%. The 3-character line-group space is the one
to watch if the corpus grows.

**Rejected: "an ID must start with a letter."** One clause instead of two, and it
covers both problems — but it invalidates every ID starting with any digit:
**47,251 reassignments instead of 5,999**, eight times the churn for no additional
guarantee. It also drops line-group occupancy to 45.9%.

**Also found: `sections` uses a different alphabet.** Its 127 IDs draw from all 36
alphanumerics, including `I` and `O`, which lines and line-groups deliberately
exclude. Unify while reassigning, or the ambiguous characters stay in one collection
for no reason.

**Sequencing — this is the expensive one to defer.** Line IDs will be stored in user
bookmarks, journeys, timelines, and shared payloads
([journeys.md](../../docs/requirements/journeys.md#sharing-and-export)). **Once any of
that persists, reassigning an ID breaks user data permanently**, and a share sent
between two installs on different corpus versions resolves to the wrong line. Do this
before the app stores anything, and before the protocol schema is pinned.

**Prevent:** a build validator asserting the rule over every ID in every collection.
It should fail the build, not warn.

### 3.3 Moving a line to a different line-group

Lines are sometimes positioned in the wrong line-group — typically the first or
last line of a shabad belonging to its neighbour. This must be a supported,
routine correction rather than a migration.

**Requirement: nothing may address a line by its position or by its parent.**
Anything referencing a line — bookmarks, history, banis, protocol messages — uses
the **line ID** plus, where context matters, the **container it was viewed in**.
A `(line-group, line)` pair or an index into a line-group would break on exactly
this operation.

Measured, this is cheap to support: **every one of 141,264 lines belongs to exactly
one line-group — zero exceptions** — and all 12,730 line-groups sit in a section. So
"which line-group holds this line" is a total function, and moving a line is a
single reassignment.

### 3.4 Home line-group as a generated column

Because the mapping is total and the corpus is generated and read-only, write the
home line-group onto the line at build time, the same way `depth` and `path` are
generated for containers. That makes the lookup a zero-join column read rather than
an index probe, and **needs no new table**.

The reverse direction (all lines in a container) is the ordinary child index.

### 3.5 Keep explicit line lists; do not adopt slice syntax

`collections/` already stores explicit line IDs: `banis/*.toml` list `lines`,
`line-groups/*.toml` list `lines`. Only `sections/*.toml` list `lineGroups`.

A compressed slice form exists downstream (`MJN:0:1,MJN:3:4`, `0VC::-8`, `TUY:-6`).
**Do not adopt it into the schema.** It addresses by offset, so any change to a
line-group's contents silently repoints every slice — the exact failure §3.3 exists
to prevent. It also hides intent (`MJN:0:1,MJN:3:4` skips index 2 with nothing
recording why) and `TUY:-6` versus `TUY::28` differ by one colon while trimming
opposite ends. If slices are ever convenient for authoring, resolve them to line
IDs at build time.

### 3.6 Remove corpus-wide ordinal columns

`lines.order_id` (141,264 rows, unique index) and `shabads.order_id` (12,730) make
each row claim to know its position in a sequence it does not own, and they are
wrong under partial corpora, where a global sequence has gaps. Ordering belongs to
the parent container. See
[data-model.md](../../docs/requirements/data-model.md#containment-structure-is-imposed-from-outside-in).

### 3.7 Decide whether transliterations are stored

38 MB including indexes — a quarter of the artifact — exactly 3 per line, entirely
generated from the Gurmukhi, and v2's frontend already computes them at render time
rather than reading the column. Open question in
[corpus.md](../../docs/requirements/corpus.md#open-questions).

**`collections/` has already answered it by omission.** Measured 2026-09-02: the
only content types present are `primary`, `translation`, and `note` — **no
transliteration content exists in the TOML corpus at all**. The apps therefore
compute pronunciations from `packages/gurmukhi`'s `transcribe(input, script)`, which
offers exactly three schemes
([display-controls.md](../../docs/requirements/display-controls.md#pronunciations)).
So the live question is not whether to keep the v2 column but whether to ever
reintroduce one; ADR-0005's derived-not-stored reasoning applies unchanged.

## 4. Validators to add

Each of these turns an assumption the model depends on into a build failure:

- Every referenced line ID exists (§1.1).
- Every line belongs to exactly one line-group (currently true; nothing enforces it).
- Every line-group is placed in exactly one section (currently true).
- Every `[[content]]` entry carries exactly one of `data` or `var`.
- No container lists the same child twice.
