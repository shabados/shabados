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

### 3.1 Vaar saloks are split from their pauri

**A vaar's shabad is the saloks *and* the pauri together**, and the corpus currently
holds them as separate line-groups.

**The numbering shows it.** Saloks restart at ੧ for each pauri; the pauri number is the
vaar-level counter. Asa Ki Var, as it stands today:

```
GK0  salok  …॥੧॥     1TN  …॥੨॥     DU3  …॥੩॥     595  ਪਉੜੀ …॥੧॥     <- pauri 1
J3D  salok  …॥੧॥     3JA  …॥੨॥     ASY  …॥੩॥     JPB  ਪਉੜੀ …॥੨॥     <- pauri 2
3Z2  salok  …॥੧॥     S42  …॥੨॥                   EGF  ਪਉੜੀ …॥੩॥     <- pauri 3
```

**Detect it by the numbers, not by headings.** A salok group opens `ਮਃ ੧ ॥` or
`ਮਹਲਾ ੨ ॥` as often as `ਸਲੋਕੁ ॥`, so matching heading text finds 86 cases; matching a
descending run of trailing numbers immediately before a `ਪਉੜੀ` group finds **534**.

**Measured 2026-09-07:**

| | |
| --- | --- |
| Pauri groups preceded by a salok run | **534**, across 17 raag sections |
| Saloks in the run | 2 most often (383), then 1 (95), then 3 (48) |
| Line-groups involved today | **1,578** |
| After merging | **534** |

**Raag Aasaa yields exactly 24, which is Asa Ki Var's 24 pauris.** That is the check
that the detection is finding vaars and not something else.

**Raag Gauree's 121 has now been broken down, and only 54 of them are vaar pauris:**

| Division the candidate sits in | Candidates |
| --- | --- |
| `ਗਉੜੀ ਬਾਵਨ ਅਖਰੀ ਮਹਲਾ ੫ ॥` | 67 |
| `ਗਉੜੀ ਕੀ ਵਾਰ ਮਹਲਾ ੪ ॥` | 33 |
| `ਗਉੜੀ ਕੀ; ਵਾਰ ਮਹਲਾ ੫; ਰਾਇ ਕਮਾਲਦੀ ਮੋਜਦੀ ਕੀ ਵਾਰ ॥` | 21 |

**The two vaars come out at 33 and 21, which are their known pauri counts** — the same
kind of check that validated Raag Aasaa at 24. So the vaar detection is right; it is the
**67 in Bavan Akhri that must be excluded**. Bavan Akhri is a single 52-letter acrostic
composition whose saloks and pauris are its internal structure, not a vaar's — merging
them is a separate decision, and not this one.

**Watch the spelling.** Five run members are headed `ਪਵੜੀ ॥`, a variant of `ਪਉੜੀ ॥`. A
detector matching only `ਪਉੜੀ` treats them as saloks and swallows them into a run.

**This is a merge, which fits the constraint better than a split does.** It moves line
IDs from one existing line-group into another and deletes the emptied ones — no new
line-group IDs, and the only other edit is removing the dead IDs from the section's
`lineGroups`. A reviewer confirms no scripture moved by checking that nothing under
`lines/` appears in the diff.

**Do it before the app stores anything.** A bookmark or a journey records which
line-group a reading was in; merging afterwards changes that answer under people's
feet. Line IDs themselves are stable either way.

**How the numbering works** is written up in [numbering.md](numbering.md).

**48 of these merges have already been done by hand, in the web app.** The hukamnama
route names more than one line-group for 48 of its 289 angs, and **42 of those 48 are
exactly this salok-plus-pauri shape** — someone hit the same wall and patched it in the
app instead of the data. Run any merge script against those 48 first: it should
reproduce all of them before it is trusted on the other 486. See
[numbering.md](numbering.md).

**Salok Mahalla 9 is a separate question, and not a bug.** Its 57 two-line groups match
how every salok collection in the corpus is recorded (Kabeer 242, Fareed 128,
Sehshkritee 63). Merging them is a convention change across ~500 groups that pulls
against this one, so the two need a single decision. Left open — it is a bani
composition question.

### 3.1b Chhants are split from their lead-in saloks and dakhnas

**The same lead-in/main shape as 3.1, in five divisions.** A `ਡਖਣਾ` restarts at ੧ each time
while the following `ਛੰਤੁ` carries the count — ੧,੧,੨,੧,੩,੧,੪,੧,੫ down the division. So a
dakhna and its chhant are **one reading unit**, and the corpus holds them as two.

**Measured 2026-09-07:** 26 line-groups are headed `ਡਖਣਾ` — 21 in Raag Maaroo, 4 in
Siree Raag, 1 in Raag Gauree. **Only Siree Raag has the dakhna-chhant form**; Maaroo's 21
are followed by `ਮਃ ੫ ॥` and sit in the salok position of Maaroo Ki Vaar, so §3.1 already
covers them.

| | |
| --- | --- |
| Reading units in Siree Raag | **5** |
| Line-groups involved today | 10 |
| Found by matching the `ਡਖਣਾ` heading | 4 of 5 |

**The fifth unit's lead-in is headed `ਸਿਰੀਰਾਗ ਕੇ ਛੰਤ ਮਹਲਾ ੫ ॥`**, because it doubles as the
division opener. Matching heading text misses it; matching the numbers finds it — the
same lesson as §3.1, and the reason both should be detected the same way.

**Saloks lead chhants the same way**, so this is one rule, not two:

| Division | Units | Line-groups |
| --- | --- | --- |
| Siree Raag, dakhna + chhant | 5 | 10 |
| Raag Vadhans, salok + chhant | 4 | 8 |
| Raag Raamkalee, salok + chhant | 4 | 8 |
| Raag Raamkalee Rutee, salok + chhant | 8 | 16 |
| Raag Jaithsree, salok + chhant | 4 | 8 |

**25 units held as 50 line-groups**, plus a lone pair in Raag Bilaaval (`1M3` + `PJG`).

**Raag Vadhans is already validated.** Its eight groups `U43, 2F4, NAW, YK0, LXK, 67F,
RWL, T08` are exactly the hand-made hukamnama entry for ang 577 — the merge this section
proposes is one a person already made by hand.

**Detect on the chhant's run, not the lead-in's number.** The lead-in numbers three
different ways: restarting at ੧ (Vadhans), ending ੨ every time because the group holds
two saloks (Rutee), or **counting in parallel with the chhant** (Jaithsree). Only the
chhant's own 1, 2, 3 is reliable. Whatever sits immediately before each chhant belongs
to it.

Small enough to fold into the §3.1 script rather than carry separately. See
[numbering.md](numbering.md).

### 3.1c Retired line-group IDs must never be reissued

**The merges in §3.1 and §3.1b delete line-group IDs, and the splits found by the pada
scan create them.** Both happen in the same corpus. Without a rule, a split can be handed
an ID that a merge freed, and every reference to the old meaning — a bookmark, a journey,
an external citation, a v2 or v3 URL — silently resolves to different scripture.

**The rule: a retired ID is retired permanently.** Generation of new line-group IDs must
exclude every ID that has ever existed, not merely every ID that currently exists.

**This needs a file, not a convention.** A convention living only in a generator script
is exactly the kind of thing CLAUDE.md says will drift the first time something is edited
around it. Record retirements in a tracked file — ID, the date, and what it was merged
into — so that:

- the ID generator can read it and refuse to reissue,
- a test can assert that no ID in it appears under `line-groups/`,
- and **downstream consumers can follow a v3 ID forward.** Shabad OS itself does not need
  this, but the corpus is used outside it, and a deleted ID with no forwarding record is
  an unanswerable question for anyone holding the old one.

**The first IDs this will retire** are the five heading-only line-groups in
[numbering.md](numbering.md) — `FRC`, `FF5`, `4WH`, `D89`, `5YB` — one of which is
[shabados/database#1902](https://github.com/shabados/database/issues/1902). They are a
smaller and better first exercise of the retirement record than the 534-unit vaar merge.

**Do it in the same commit as the first merge**, not after. A retirement record that
starts late is missing exactly the entries nobody thought to write down.

### 3.2 Rename the content types: `translation` and `note` are misnamed

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

### 3.3 A build step that emits a corpus subset

The apps do not ship everything in `collections/`. Two assets are excluded outright:
**`SBMS`** (22.6 MB of TOML across 120,973 blocks — kept for posterity, never
displayed) and **`SNST`** (Spanish, 7.9 MB, not reachable under a two-language menu).

**Do this as a build step, not by editing `collections/`.** The excluded content is
real, cited scholarship and stays in the corpus; what changes is what gets packaged.
`database/scripts/export-bundled-banis.ts` is the precedent — a script that reads
`collections/` and emits an artifact.

**Take an exclusion list, not a hardcoded pair.** The set will change: a Shabad OS
translation is expected to supersede `DSSK` and `PSST` in time, and the catalogue is
meant to grow to hundreds of assets. A script that names two assets inline has to be
edited every time; one that takes a list is configuration.

**Determinism applies.** The subset must rebuild byte-identical from the same commit
and the same exclusion list.

### 3.4 ID constraints: no leading zero, never all-digits

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

### 3.5 Moving a line to a different line-group

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

### 3.6 Home line-group as a generated column

Because the mapping is total and the corpus is generated and read-only, write the
home line-group onto the line at build time, the same way `depth` and `path` are
generated for containers. That makes the lookup a zero-join column read rather than
an index probe, and **needs no new table**.

The reverse direction (all lines in a container) is the ordinary child index.

### 3.7 Keep explicit line lists; do not adopt slice syntax

`collections/` already stores explicit line IDs: `banis/*.toml` list `lines`,
`line-groups/*.toml` list `lines`. Only `sections/*.toml` list `lineGroups`.

A compressed slice form exists downstream (`MJN:0:1,MJN:3:4`, `0VC::-8`, `TUY:-6`).
**Do not adopt it into the schema.** It addresses by offset, so any change to a
line-group's contents silently repoints every slice — the exact failure §3.3 exists
to prevent. It also hides intent (`MJN:0:1,MJN:3:4` skips index 2 with nothing
recording why) and `TUY:-6` versus `TUY::28` differ by one colon while trimming
opposite ends. If slices are ever convenient for authoring, resolve them to line
IDs at build time.

### 3.8 Remove corpus-wide ordinal columns

`lines.order_id` (141,264 rows, unique index) and `shabads.order_id` (12,730) make
each row claim to know its position in a sequence it does not own, and they are
wrong under partial corpora, where a global sequence has gaps. Ordering belongs to
the parent container. See
[data-model.md](../../docs/requirements/data-model.md#containment-structure-is-imposed-from-outside-in).

### 3.9 Decide whether transliterations are stored

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
