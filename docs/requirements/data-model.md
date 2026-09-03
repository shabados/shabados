# Data model

Draft, 2026-08-25. Open questions at the end are blocking — do not guess them.
What the corpus *is* and how it is identified; [corpus.md](corpus.md) covers how it
is distributed.

## The three levels

- **Line ID** — a stable, opaque identifier, and the currency of everything:
  containers order them, assets render them, the protocol transmits them, history
  and bookmarks store them.
- **Source** — the agreed understanding of what a scripture *is* (SGGS, Sri Dasam
  Granth, Vaaran Bhai Gurdas Ji, the works of Bhai Nand Lal Ji). Not a book: the
  general ordering of lines, which lines constitute which shabads, and where the
  concept applies, which lines fall on which pages. Borrows structure from the most
  widely accepted editions; identical to none of them.
- **Asset** — something actually published: SGPC's printed SGGS, a nitnem gutka,
  STTM's data, iGurbani's data, Shabad OS's own. Assets do not line up with
  sources — one may carry several, or a tiny fraction of one, and they disagree on
  spelling, word breaks, vishraam placement, and occasionally on where a line ends.
  An asset is the concrete evidence of how a publication actually reads.

## Identity: one canonical line ID, many renderings

**Resolved.** A line has **one canonical ID**; each asset supplies its own
rendering. Assets never mint identities for the same line.

Canonical IDs live in the **required Shabad OS asset**, which cannot be removed, so
it is the identity anchor — every other asset's content is expressed in IDs it
defines. So bookmarks, history, and protocol messages carry one ID and stay
meaningful across any combination of installed assets, and "show me this line in
every asset I have" is a lookup rather than a matching problem.

- **Assets splitting a line differently** — A has one line where B has two: still
  one line ID, and the rendering carries a line-break character.
- **A line split three ways *and* reordered** does not occur in the material at
  hand — out of scope. Where a mismatch arises, rename line IDs and reshuffle them
  within their containers; never fork identity.
- A line ID and a line-group ID are each **an identity many assets attach content
  to**, not a single object: a line ID holds every asset's rendering, a line-group
  ID holds every asset's ordering *and* line-type assignment. An asset ordering
  differently is another rendering under the same identity, not a conflict.

## Containment: structure is imposed from outside in

**A thing never knows its neighbours. Its container does.** A line does not know
the next line; a line-group does not know the next line-group. Ordering at every
level is the parent container's responsibility.

The single load-bearing invariant. It is why containers exist, why the same
line-group can sit in a raag *and* a bani with different neighbours in each, and
why "next" is meaningless without knowing which container you are traversing. Read
outside inward: source → sections → subsections → line-groups → lines.

**Forbids** `next_id`, `prev_id`, and **global ordinal columns on the things being
ordered**. An ordinal on a line is that line claiming to know its position in a
sequence it is not responsible for — correct for one traversal, silently wrong for
every other. Position lives on the **placement**.

**The shipped schema violates this in two load-bearing places:**

| Column | Rows | Used for |
| --- | --- | --- |
| `lines.order_id` | 141,264 (unique index) | corpus-wide line sequence |
| `shabads.order_id` | 12,730 | previous/next-shabad navigation |

v2 builds previous/next-shabad directly on `shabads.order_id`
(`getShabadByOrderId`; `controller.previousShabad`/`nextShabad` send `orderId ± 1`).
Both columns go and that navigation rebuilds on container traversal — which is also
what makes it correct under partial corpora, where a global sequence has gaps
([corpus.md](corpus.md#what-the-splitting-mechanism-must-provide)).

## Containers

**The line is the only primitive.** Everything else is a container with a `kind`,
including the line-group — which keeps a new container type from needing new
machinery.

### One recursive container table, not fixed levels

**One container type with a nullable parent and a `kind` label.** A "subsection" is
a container with a parent. A work with no divisions has **no containers** and its
line-groups attach to the composition directly, so nothing synthetic is fabricated.
**The composition *is* the root container** — a container with no parent.

```sql
CREATE TABLE containers (
  id         INTEGER PRIMARY KEY,
  parent_id  INTEGER REFERENCES containers(id),  -- NULL only for a composition
  kind       TEXT    NOT NULL,   -- 'composition' | 'raag' | 'vaar' | 'ansu' | ...
  name_english  TEXT NOT NULL,
  name_gurmukhi TEXT NOT NULL,
  position   INTEGER NOT NULL,   -- order among siblings
  depth      INTEGER NOT NULL,   -- generated at build time
  path       TEXT    NOT NULL    -- generated, e.g. '/sggs/raag-aasaa/mahalaa-5'
);
```

- **Not two fixed tables (`sections` + `subsections`).** Observed max depth is 2
  today, but **Suraj Prakash Granth** — named as future Extended-asset content — is
  part → rut → ansu, which is three. Fixed levels would need a schema change to
  admit it; a nullable parent would not.
- **Query by `kind`, never by depth.** "All raags in SGGS" is `WHERE kind =
  'raag'`, never `WHERE depth = 1` — depth 1 means *raag* in SGGS, *vaar* in
  Vaaran, nothing in Uggardanti. Depth is an artefact of the material; `kind` is the
  meaning. Code branching on depth is a bug waiting for the first differently
  shaped source.
- **At runtime it is not recursive at all.** The corpus is generated at build time
  and read-only after, so the tree walk happens once and `depth`/`path` become
  ordinary columns. The two queries anyone needs are then flat: top-down is
  `WHERE path LIKE '/sggs/%' ORDER BY path, position`; bottom-up (the citation
  breadcrumb `Line → Line-group → Mahalaa 5 → Raag Aasaa → SGGS`) comes from the
  stored path with no walk. *Trade-off:* `path`/`depth` are denormalised and wrong
  if a container moves without regeneration — acceptable only because the corpus is
  never mutated in place, and the byte-identical guarantee already requires
  regeneration to be the only way it changes.
- **Recursive to author, flat to query.** TOML source nests because the material
  does; the built artifact is flat because generation resolved the tree. At runtime
  there are no levels to learn — a `kind`, a `path`, a `position`.

### What the shipped data says

**139 sections and 403 subsections** over **12,730 shabads**, source-scoped, each
section carrying `source_id` + `start_page`/`end_page`. `Raagmala` is section 51 of
SGGS. Empirically for SGGS, **sections are raags** and **subsections are the
author/form groupings inside a raag** (Raag Aasaa → Mahalaa 1, Mahalaa 4, Mahalaa
5, Mahalaa 1 AsaTapadheeaa, Mahalaa 5 BirahaRe…). Book analogy: line-group ≈
paragraph, subsection ≈ a break within a chapter, section ≈ chapter.

| Source | Sections | Subsections |
| --- | --- | --- |
| Sri Guru Granth Sahib Ji | 51 | 356 |
| Sri Dasam Granth | 17 | 47 |
| Vaaran Bhai Gurdas Ji | 41 | **0** |
| Ganj Nama Bhai Nand Lal Ji | 11 | **0** |
| Rehitname | 9 | **0** |
| Ghazals Bhai Nand Lal Ji | 3 | **0** |
| Kabit Savaiye Bhai Gurdas Ji | **1** | **0** |
| Ardaas | **1** | **0** |
| Uggardanti | **0** | **0** |

**Nine of twelve sources use no subsections**, so the hierarchy is already optional
and the shipped data already works that way. It also exposes an inconsistency to
fix rather than preserve: Kabit Savaiye has **one** synthetic section meaning "the
whole work" while Uggardanti has **none** — two treatments of the same situation,
one fabricating a level that is not in the material.

### Structural versus overlay containers

Both nest — a gutka is a collection of banis, so an overlay container can hold
other overlay containers. **Nesting is not the distinction:**

| | Structural | Overlay |
| --- | --- | --- |
| Examples | subsection, section, source | bani, bani-group, page |
| Placement | whole line-groups only | may **slice** a line-group |
| Coverage | partitions the work | cuts across; may overlap or omit |

A section never holds half a shabad; a page routinely does, and so does a bani.
**Slicing belongs on the placement, not the container**, so one table serves both
classes and structural containers simply never populate the bounds — a validation
rule keyed on `kind`, not a second table or a schema branch.

**Decided 2026-08-27: a container's children are an ordered list, and a child is
either another container or a line.** One relation, no separate slicing machinery.

```sql
CREATE TABLE container_children (
  container_id  INTEGER NOT NULL REFERENCES containers(id),
  position      INTEGER NOT NULL,
  child_container_id INTEGER REFERENCES containers(id),  -- exactly one of
  child_line_id      TEXT                                -- these two is set
);
```

This is what `collections/` already does: `line-groups/*.toml` list `lines`,
`banis/*.toml` list `lines` grouped under anonymous `[[sections]]`, and
`sections/*.toml` list `lineGroups`. A line-group becomes a container of `kind =
'line-group'`; nothing else changes shape.

**A section must not list lines directly**, even though the relation allows it — a
raag holds hundreds of line-groups and thousands of lines, so flattening would
duplicate every ID and destroy the shabad grouping that citation depends on.

### Overlay containers name lines, they do not slice ranges

An overlay container that takes part of a line-group **lists the line IDs it
wants**. There is no `from`/`to`, because there is nothing to bound.

This matters more than it looks. A compressed slice form exists downstream of the
source (`MJN:0:1,MJN:3:4`, `0VC::-8`, `TUY:-6`) and it must not be adopted into the
schema: it addresses by offset, so any change to a line-group's contents silently
repoints every slice. It also hides intent — `MJN:0:1,MJN:3:4` skips index 2 with
nothing recording why — and `TUY:-6` (last six) versus `TUY::28` (first twenty-eight)
differ by one colon while trimming opposite ends. Naming lines removes all three
failure modes, and it is what makes moving a line between line-groups a safe,
routine correction rather than a migration.

**Every line has exactly one home line-group.** Measured: 141,264 lines, **zero**
appearing in more than one line-group, and all 12,730 line-groups placed in a
section. So the home is a total function, and it is generated onto the line at build
time like `depth` and `path` — a zero-join lookup, no extra table. Membership of a
bani is separate and additive; it never competes with the home.

### Assets vary at the line level only

**Only *lines* carry asset-specific data.** Line-groups, subsections, sections, and
the source root are shared concept — one structure every asset is understood
against. An asset contributes exactly two things: **line variants** (its rendering
of a line's text) and **membership** (which lines and line-groups it contains).

**Not an asset tree** (an earlier draft proposed one; recorded so it is not
re-proposed): a gutka's table of contents is an *ordered list of banis*, not a
structural tree over line-groups; another publisher's printed SGGS has the same
raag structure, so its tree is a duplicate; and no case was found where an asset
needs organisation that membership plus banis cannot express. Building it now means
maintaining two identical trees in every shipped source. Watch for a
thematically-organised compilation as the case that would change this.

### Navigation follows the path you entered through

"Next line-group" means the next one in whatever container is being traversed, and
this holds without any asset tree. The site URLs already encode it: `/sggs/1` is
page 1 of the SGGS *source*, so "next" is page 2; `/g/09Q` is a line-group in a
flat global namespace needing no source prefix. That scheme is itself evidence for
the decision above — source as root namespace, line-groups globally addressable, no
asset anywhere in the path. `/<source>/<ordinal>` uses the source's natural unit:
angs for SGGS, vaars for Vaaran, chapters elsewhere.

**Decided 2026-08-27: the parent container owns ordering, and the traversal context
travels with the session.** Two consequences:

- **A thing carries no `prev`/`next` pointers of its own.** v2's bani definitions do
  (`paging: { prev, next }`), and the data already shows why that fails: `ardas` has
  no `prev`, because three sequences lead into it — the nitnem chain,
  `rehras-sahib`, and `kirtan-sohila`. "What comes before ardas" has no answer until
  you know which container you are in. With the parent owning order, ardas sits in
  all three and each supplies its own previous.
- **The frontend must always know which container it is rendering**, which is
  already true of shabados.com today. It is not device-local state: the display has
  to follow the controller into the same container or it renders the wrong
  neighbours, so the container crosses the wire.

Carry it as a **path** (`/sggs/2`, `/bani/rehras`), not an index — self-describing,
queryable, durable across corpus updates, and already the URL scheme in use.

**Still open:** what happens at the end of a container — walk up to the parent and
continue, or stop? Affects whether next-past-the-last-line of a raag enters the
next raag ([open question 1](#open-questions)).

### Source shape in TOML — not settled

~550 containers (139 sections + 403 subsections + roots), so none of the sharding
the 154,000 line files require. Beyond that the authoring format is **open**. A
sketch, not a decision:

```toml
# sources/sggs.toml
kind = "source"
name_english = "Sri Guru Granth Sahib Ji"

[[container]]
slug = "raag-aasaa"
kind = "raag"
name_english = "Raag Aasaa"

[[container]]
slug = "mahalaa-5"
parent = "raag-aasaa"
kind = "author-group"
line_groups = ["ABCD", "EFGH", "IJKL"]
```

Properties worth preserving in whatever shape is chosen: **the whole tree readable
in one file**, so an agent sees the structure rather than reconstructing it from
550 files; **arbitrary depth without syntax change** — TOML's `[[a.b.c]]` nesting is
unreadable past two levels, hence flat entries with `parent` slugs; and **file order
as sibling order**, so there is no `position` field to keep in sync with itself.

That last point is deliberately the opposite of the choice made for variants below,
and the distinction is the useful part: there array position is a *reference
target*, so reordering silently repoints it; here array position *is* the content —
the reading order — so reordering is how you change it. **Order-as-data is safe;
order-as-address is not.**

Settling the format waits on how banis group and whether asset organisation ever
needs more than membership, since both change what the file must express.

## Variants: no rendering is the correct one

**90–95% of line IDs read identically across all assets**, and well over 90% of
line-groups agree on ordering and line typing. Storing each asset's copy separately
would multiply the corpus by the number of assets to record almost nothing.

But sharing must not imply canonicity. **There is no right or wrong rendering —
only variants.** Being the one most assets point at makes a rendering common, not
correct, and a "default" others "deviate" from is an editorial claim the data has
no business making. So a line ID owns a set of variants and each asset points at
one; an asset with a unique reading supplies its own text inline.

```toml
[var]
a = "some text"
b = "diff text"

[[content]]
asset = "foo"
type = "primary"
var = "a"
page = 1335

[[content]]
asset = "baz"
type = "primary"
data = "some unique asset data"
page = 1335

[[content]]
asset = "bar"
type = "translation"
language = "en"
data = "some translation"
```

- **Exactly one of `data` or `var` per entry. Never both, never neither.** Enforced
  by the build validator (TOML has no schema mechanism); violating it is a build
  failure, not a silently-resolved precedence.
- **No separate membership mechanism is needed.** A `[[content]]` row *is*
  membership; two rows sharing a `var` *is* agreement; a row with its own `data`
  *is* variance. Three facts, one structure.
- **The key name carries the meaning**, so no string is ambiguous: `var = "a"` is a
  reference because the key says so, and a variant named `a` cannot collide with an
  asset whose text is `"a"`. *Not a sigil* (`data = "@a"`) — it needs escaping for
  literal `@` and puts the distinguishing mark inside the value, where ordinary
  text editing can corrupt it.
- **Variant names are scoped to their line.** No global namespace, because a variant
  is by definition a rendering of one line. Short names stay safe indefinitely.
- **Name variants, do not index them.** Inserting or reordering a variant silently
  rewrites meaning in every entry referencing a later index — across 154,000
  hand-editable, git-reviewed files that is silent corruption with no failing test,
  whereas a missing name fails loudly at build time. Index references also make
  output sensitive to array ordering, exactly the nondeterminism the byte-identical
  guarantee excludes. Names cost nothing over indices.
- **TOML note:** `data = var.a` is not expressible — TOML has no reference
  mechanism, values are literals only. `var = "a"` resolved at build time is valid
  and preserves the intent. `[var]` is a table with named keys, not `[[var]]`.
- **Scaling:** membership costs one entry per (asset, line) — a multiple of 141,000.
  Entries for agreeing assets should carry little more than asset + variant
  reference, which argues for moving per-asset-per-line fields like `page` into
  their own container rather than repeating them on every entry.

## Repeated lines keep distinct identities

**Decided 2026-08-27.** Repetition is normal in poetry, and a repeated line still
occupies a distinct position. **Every occurrence keeps its own line ID**, so a line
ID names exactly one position anywhere in the corpus. This is already what the
shipped data does and it is not to be changed.

`ਭੁਜੰਗ ਪ੍ਰਯਾਤ ਛੰਦ ॥` opens six of Jap Sahib's line-groups under six distinct IDs
(`NNJS`, `HS47`, `RAZ5`, `G95H`, `WXL0`, `LV30`). Merging them to one shared ID
would be a regression in addressability, because that ID would then occur six times
inside one container.

**Repeats are not confined to headers, and not confined to across-group cases.**
Measured over Jap Sahib's 801 lines: 24 distinct texts span multiple line-groups,
and **22 more repeat inside a single line-group**, across 9 of its 22 groups —
`ਅਕ੍ਰਿਤਾ ਕ੍ਰਿਤ ਹੈਂ ॥` occurs three times within line-group `8Y8` alone (indices 27,
31, 35). These are body lines of a naming litany, which is repetitive by design. So
a shared ID would collide *within* a shabad, not just within a bani.

**What this preserves**, all of which a merge would have broken: `lines:current`
keeps carrying a plain line ID; lines-to-line-groups stays one-to-many so
`lines.shabad_id` survives as an ordinary placement; v2's `line.shabad` eager-load
and the citation UI that reads writer and source through it keep working; and
previous/next context, unread tracking, and jump-key mapping cannot resolve to the
wrong occurrence.

### Deduplicating text: measured, and not worth a schema change

The merge was originally proposed to reduce fragmentation and size. Measured over
the whole source corpus:

| | Entries | Distinct | Redundant | Saving if shared |
| --- | --- | --- | --- | --- |
| Primary (Gurmukhi) | 142,278 | 130,260 | 12,018 (8.4%) | **0.4 MB** |
| Translations | 479,256 | 450,357 | 28,899 (6.0%) | **1.0 MB** |

**~1.4 MB against a 151 MB artifact — under 1%.** The repeats are overwhelmingly
short headers, so deduplicating them saves almost nothing: 1,726 copies of
`ਦੋਹਰਾ ॥` is roughly 34 KB. (An earlier draft claimed "the saving is a multiple of
the row count," which overstated it by two orders of magnitude.) Sharing text is
therefore **not** worth restructuring storage for.

If sharing is ever revisited, share in the **built artifact**, never in the source.
One self-contained file per line is what makes 154,000 files independently editable
and reviewable in a diff; a shared string table means editing one row silently
changes six lines and a reviewer reading one file cannot see its own text. Same
principle as *recursive to author, flat to query* above.

### Fragmentation is real, but a report fixes it, not the schema

The fragmentation concern is well founded and larger than expected:

- **1,112** distinct Gurmukhi texts occur more than once
- **1,014 of them (91%)** carry inconsistent translations in at least one language
- `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` — 574 occurrences, **162 distinct English translations**
- `ਦੋਹਰਾ ॥` — 11 English variants (`DOHRA`, `DOHRA,`, `DOHRA (COUPLET)` …)
- `ਭੁਜੰਗ ਪ੍ਰਯਾਤ ਛੰਦ ॥` — 4× `BHUJANG PRAYAAT STANZA`, once with a trailing comma,
  once misspelled `PRYAAT`
- `ਚੌਪਈ ॥` — one of its 11 variants is
  `"And running his horses, chased and killed the deer.(4)"`, a translation of a
  different line attached to the wrong row

**Shared storage would prevent future drift but cannot resolve existing
disagreement** — someone still has to decide which of the 162 is correct, and that
goes through the `database` component's citation-backed review, never through a
schema. What *finds* them is a **build-time report**: lines with identical Gurmukhi
but differing translations, ranked by occurrence count. No model change, works
today, and it turns the goal into a review queue of ~1,014 items.

**The queue is a review list, not an auto-fix list.** Not all 162 are errors — the
mangal heads many different compositions and some translators fold the composition
name into it. Meaning, not string equality, still decides.

## Three independent grouping schemes

Not hierarchical with each other; they do not share boundaries.

- **Line-groups** — the primary container; a shabad is a kind of line-group. Owns
  the ordering of its line IDs *and* the **block structure** of those lines (which
  are manglacharan, which belong to pauri 1, which to rahao 1 —
  [navigation.md](navigation.md), [ADR-0005](../architecture/decisions/0005-line-type-derived-not-stored.md)).
  Block structure is therefore a property of the line-group, not of the line in
  isolation: the same line may sit in different line-groups across assets, and its
  block position is defined by the group it is in.
- **Pages** — an alternate container, not a subdivision: line-groups routinely span
  page boundaries, so the schemes cross-cut. Pages exist at **both** levels with
  different meanings — at source level, ang 100 of SGGS (viable because SGGS and Sri
  Dasam Granth have standardised modern pagination virtually every publication
  agrees on; a modern convention historical manuscripts do not follow, which is
  accepted); at asset level, page 10 of a specific gutka. **Not every source has
  pages** — there is no shared understanding of a "page" of Vaaran because no
  publication became standard, and that absence is not a defect. This is what lets a
  user open a gutka, find a line in Japji Sahib, and learn it is most commonly cited
  as SGGS ang *n*.
- **Banis** — group lines and almost always follow line-group boundaries; where they
  do not, a bani is a subset (slice or trim) of a line-group. A significant
  simplification over v2, where banis were assembled by ordering individual lines
  across shabads with `line_group` sequencing — the origin of the bani-specific
  navigation special-casing.

## Open questions

1. **What happens at the end of a container?** Walk up to the parent and continue
   into the next sibling, or stop? Determines whether next-past-the-last-line of a
   raag enters the next raag, and whether ardas ends or returns.
2. **Which asset's rendering is shown** when several are installed and all contain
   the line? Presumably a user preference order, but it needs stating, and it
   interacts with search ranking ([search.md](search.md)).
3. **How are page numbers stored**, given they exist at source and asset level with
   different meanings, are absent for some sources, and can attach at line level or
   as line-group slices?
4. **What happens to history and bookmarks referencing a removed asset?** Canonical
   IDs survive, so the line stays resolvable from the base asset — confirm that is
   the intended fallback rather than an error.
5. **What is the default rendering of a line?** Sharing depends on there being a
   version assets agree *with*. Is it the Shabad OS asset's rendering by definition,
   or a separately-maintained canonical text that even Shabad OS's asset is a
   variant of?

**Closed 2026-08-27:** *How is position identified* — line IDs stay unique per
occurrence, so a plain line ID names one position and the protocol needs no change.
*Which repeats are the same phrase* — none are merged; the fragmentation goal is
served by a build report instead.
