# Display controls

Draft, 2026-09-02. Specified by the author; open questions at the end are blocking.
Covers **how the text is rendered** — sizing, mode, and which fields are shown.
The surface that presents these is
[reading-shell.md](reading-shell.md#the-controls-sidebar).

Applies to every platform, not only mobile. `Width` is documented here and shown
only on wide surfaces; everything else appears everywhere.

## Persistence

**Controls persist across compositions and across launches.** Someone who set a
comfortable size for Japji Sahib must not have to set it again for the next shabad,
or tomorrow. This is a settled expectation from v2 and from the web app, and it is
also the one thing the mobile scaffolds currently disagree on: **iOS persists reader
font size and Android does not**
([apps/README.md](../../apps/README.md#state-of-play)). Persisting on both is the
resolution.

**Controls are per-device**, matching the display config in
[ADR-0002](../architecture/decisions/0002-view-modes-and-overlay-endpoints.md).
They are not part of the corpus and not synced by anything specified so far.

**A control that a composition cannot honour is not unset.** If a chosen
translation does not exist for what is being read, the selection stays stored and
becomes active again when something that has it is opened. Clearing it would mean
a person's settings are silently rewritten by whatever they happened to open.

## Text — how it looks

### Zoom

Font size of the reading area.

> *Use pinch-to-zoom to change font size in the viewer.*

**The slider and the pinch gesture are the same value**, and the slider must track
a pinch made while it is not visible. The byline exists to teach the gesture; the
slider is the fallback for someone who cannot make it.

Sizing bounds live in `packages/design/tokens.md` (`type.minSize` 14, `type.maxSize` 56,
`type.defaultSize` 20) and are generated into both platforms — they are not to be
restated in platform code.

### Ratio

Size of the secondary lines — translations, pronunciations — relative to the
Gurmukhi line.

> *Set the font size relative to the first line.*

**The current formulation is a divisor and it runs backwards.** Today the value is
`gurmukhi ÷ secondary`, from **1** (secondary the same size as the Gurmukhi) to
**2.5** (Gurmukhi 2.5× larger), in steps of 0.125 — 13 stops. Sliding right makes
the secondary text *smaller*, which is the opposite of what a slider that grows to
the right means.

**The fix is to store the thing being adjusted, not its reciprocal.** Store
**secondary size as a percentage of the Gurmukhi size**: `40%` to `100%`, in steps
of `5%`.

| | Old | New |
| --- | --- | --- |
| Left end | 1 (secondary equals Gurmukhi) | 40% (Gurmukhi 2.5× larger) |
| Right end | 2.5 (Gurmukhi 2.5× larger) | 100% (secondary equals Gurmukhi) |
| Stops | 13 | 13 |
| Direction | right = smaller | right = bigger |
| Spacing | uneven in rendered size | even in rendered size |

The endpoints are **exactly** the existing ones — `1/2.5 = 0.4` — so nothing about
the range changes, only its parameterisation. It is preferred over simply reversing
the slider (2.5 on the left, 1 on the right) because reversal leaves the stored
number moving opposite to the control, which every future reader of the code has to
re-derive. It also fixes the spacing: reciprocal steps cluster at one end, so the
old slider's stops were visibly uneven in the thing a person is actually looking at.

**Migration from a stored divisor:** `percent = round(100 / divisor / 5) × 5`.

### Weight

> *Adjust the thickness of text.*

**250 to 750, in steps of 25, default 500.**

Verified: the bundled `SantLipi-VF.ttf` exposes a `wght` axis spanning **100–900**,
so the whole range is inside the font and needs no synthetic emboldening. Do not
widen the control to the font's full range without a reason — the useful reading
band is narrower than what the font permits.

### Width

**Wide surfaces only** (iPad, web). How wide the reading column is allowed to grow.
Not shown on phones, where there is only one sensible answer.

Documented now so the two platforms do not each invent it. The intent is a measure
control — roughly, a comfortable line length, a long line length, or fill the
available width.

**The usual measure rule does not transfer.** "40–60 characters" is a Latin
typographic heuristic, and a CSS `ch` unit measures the advance of `0`. Gurmukhi
composes with a continuous headline and stacked matras, so a character count is not
a reliable proxy for line length here. The rule must be expressed in a measure that
can actually be checked against rendered Gurmukhi — see open question 6.

**Presentation mode forces full width** and the control is disabled there
([Mode](#mode)).

## Content — what is shown

### Mode

Four rendering modes. **Order in the UI: `Classic`, `Saral`, `Reader`,
`Presenter`.**

**Mode is a single global value, like every other control here.** Default `Classic`.

**It is deliberately not per tab, and there is no separate "default mode" setting.**
Both were tried in earlier drafts and both bought complexity nobody needs: a per-tab
mode raises "what does a new tab inherit — the previous tab, or the previous
session?", and a default setting adds a second place where mode lives. **In practice
a gurdwara sits in `Presenter` permanently and a person doing their nitnem picks one
rendering and keeps it.** One value they set and it stays is the whole requirement.

**When [presets](#presets--deferred-not-built-yet) exist, a preset simply sets this value**, the same as if
the person had. Nothing is layered, scoped, or restored on exit.

**This is the only control that is per-tab.** Everything else in this document is one
remembered value, and [Zoom](#zoom) and [Weight](#weight) must stay that way — see
[Presets](#presets--deferred-not-built-yet).

| Mode | Shows |
| --- | --- |
| **Classic** | Every line as its own block, every enabled Variorum field. The default. |
| **Saral** | Verse layout: **one line per line**, Variorum fields hidden, titles enlarged, a blank line between pauris. |
| **Reader** | Prose layout: **lines run together into flowing paragraphs**, otherwise as Saral. |
| **Presenter** | One line at a time — see below. |

**Saral and Reader differ only in whether lines break.** Both hide the Variorum
fields, both enlarge titles, both break paragraphs at the end of a pauri.

- **Reader is the paragraph mode** — lines flow together, as in a book.
- **Saral is the simple mode** — *saral* is Panjabi for simple or easy — one line per
  line, still grouped into paragraphs at pauri boundaries.

#### Layout, in both

Measured from `apps/web/src/routes/(app)/layout.css`, which is the working
implementation:

| | Saral and Reader |
| --- | --- |
| Variorum fields | Hidden |
| Titles | Own block, **1.25×** size, heavier weight |
| Space before a title | ~1.6em |
| Space after a title | ~0.8em plus a line break |
| End of a pauri | **A blank line** — a paragraph break |
| Lines within a pauri | Saral: one per line. Reader: flowed, separated by a space |

**Larivaar collapses all of it.** With [Continuous](#continuous) on, the injected
spaces and paragraph breaks are dropped and titles lose their size and block
treatment — the whole composition becomes one continuous run. That is the existing
behaviour and it follows from what larivaar is; it is not an oversight.

**The mool mantar's `ੴ` breaks out onto its own line, larger still** — 250% of
body size, at a lighter weight than the title rule above (400, not the titles'
650) so the stroke doesn't grow heavier along with the glyph. Its six word-pairs
(ਸਤਿ ਨਾਮੁ, ਕਰਤਾ ਪੁਰਖੁ, ਨਿਰਭਉ ਨਿਰਵੈਰੁ, ਅਕਾਲ ਮੂਰਤਿ, ਅਜੂਨੀ ਸੈਭੰ, ਗੁਰ ਪ੍ਰਸਾਦਿ) follow at
body size, each pair kept on one line but otherwise free to share a line with its
neighbour. **All of it stays one selectable, copyable span** — tapping or copying
any part of the mool mantar must never fragment it.

#### Titles

**Three independent facts, not a ranked type.** `gurmukhi::is_heading`,
`is_moolmantar`, and `has_ikoankar` each answer their own question; none implies
or excludes another, and none says how large anything should render — that
composition is the app's call, made in `apps/ios`'s case in
[`BaniReaderView.swift`](../../apps/ios/ShabadOS/BaniReaderView.swift), not
`packages/gurmukhi`'s.

**Superseded 2026-09-17, three times over — the last one a real content error,
not a rule refinement.**

1. A single `gurmukhi::is_title` on "no vishraam and three words or fewer,"
   measured at 88% recall / 4.9% false-fire against a hand-kept list — replaced
   because it disagreed with `database/scripts/lib/gurbani.ts`'s
   independently-derived, whole-SGGS-tested `isHeading` on the mangal (`ੴ`): the
   word-count rule called it a title, `isHeading` didn't.
2. `is_heading` folding the mangal in unconditionally as its own largest
   `HeadingLevel` — **wrong**, and confidently so: it treated *any* line carrying
   `ੴ` as "the mool mantar," when a short invocation like `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥`
   ("by the Guru's grace") is a heading that happens to carry the mangal symbol,
   not the mool mantar itself. Caught and corrected the same day, from the
   corpus, not a rule.
3. **The mool mantar** — `ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ
   ਗੁਰ ਪ੍ਰਸਾਦਿ ॥`, not any line that opens with `ੴ`. Confirmed from
   `database/collections/lines/.../0NVY.toml` (Japji Sahib's opening line), which
   carries its own scholarly note naming it outright: *"ਇਹ 'ਜਪੁ' ਬਾਣੀ ਦੇ ਆਦਿ ਵਿਚ,
   ਰਵਾਇਤ ਅਨੁਸਾਰ, ਸਤਿਗੁਰਾਂ ਵਲੋਂ ਪਰਮਾਤਮਾ ਦਾ ਮੰਗਲਾਚਰਨ ਹੈ"* — "this, at Jap[u]'s
   opening, is traditionally the Satguru's manglacharan [invocation]." Every other
   bundled Nitnem `ੴ` occurrence (`ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` in JAAP/TPSS/ANND/RHRS,
   `ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥` opening BNCP) is a heading, not this.

**`is_moolmantar`** is a curated lookup, the same shape as `is_colophon` — a
known text, extended by reading a new occurrence, never by pattern-matching
length or word count against it. It could never have been a structural rule
anyway: the mool mantar carries its own vishraam in 1 of its 33 recorded SGGS
occurrences, which rules that spelling out of `is_heading` on the same terms as
any other verse line. **Confirmed 2026-09-17 to recur 33 times in the SGGS**
(asset `SSA2`, pages 1–1410; none in any bundled Nitnem bani) — **32 of the 33
carry no vishraam** after `ਨਿਰਵੈਰੁ`, only Japji's opening does, so the match
strips vishraam marks before comparing rather than keeping two near-duplicate
entries. **Deliberately excludes the shorter "chhota" forms** some raag sections
open with (`...ਕਰਤਾ ਪੁਰਖੁ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥`, 9 occurrences; `...ਸਤਿ ਨਾਮੁ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥`, 2)
— whether Sikh tradition treats those as the mool mantar too is left open, not
decided by this rule.

**`is_heading`** needs no mangal-specific check at all, now that the mool mantar
has its own function — a short mangal invocation already passes on its own merits
(ends `॥`, no vishraam, no trailing number), and the mool mantar's one
vishraam-bearing spelling already fails on its own merits. **The other 32
spellings pass `is_heading` too** — nothing disqualifies them, and `is_moolmantar`
was never meant to exclude `is_heading`, only to answer a different question; a
line being both is not a contradiction (`BaniReaderView.swift` checks
`is_moolmantar` first regardless, so this never affects rendering).
`database/docs/numbering.md`'s
own exclusion of the mangal from *its* "heading" stays exactly as written — it
answers a narrower zoning question (telling a mangal apart from the line that
opens a *numbered division* next to it) that this rule was never trying to
answer.

**`is_heading` broke, was caught by actually reading the app, and was fixed the
same day — twice patched, once rebuilt.** Structure alone (ends `॥`, no trailing
number) over-fires badly: measured against every bundled Nitnem bani, false
positives on ordinary verse ran from 1% (`JAPJ`, `ANND`) to **69% on `JAAP`**, 44%
on `BNCP`, 21% on `RHRS`. Cause: a multi-line pauri or a Dasam Granth chhand
numbers only its *last* line, so every interior line ends bare — the same shape
as a real heading. **Not Dasam-Granth-specific**: two of `JAPJ`'s own four
structure-only hits were real SGGS verse, Pauri 37's `ਅੰਤੁ ਨ ਜਾਪੈ ਪਾਰਾਵਾਰੁ ॥` and
`ਸਚ ਖੰਡਿ ਵਸੈ ਨਿਰੰਕਾਰੁ ॥`, not headings. `database/docs/numbering.md`'s derivation
was real, but "tested across the whole SGGS" described finding heading-and-mangal
*pairs* for zoning, not a measured false-positive rate against blind
line-by-line classification — assuming the latter from the former was the
mistake, not the derivation itself.

**The fix, verified 2026-09-18 against all 1935 bundled lines, zero false
positives: require a marker word or a specific numbered shape, not structure
alone.** Two additional conditions, either satisfies:

- **[`HEADING_WORDS`](../../packages/gurmukhi/src/feature.rs)** — a curated set of
  raag/author/form marker words (`ਛੰਦ`, `ਮਹਲਾ`, `ਮਃ`, `ਰਾਗੁ`, `ਪਾਤਿਸਾਹੀ`, `ਸਲੋਕ`,
  `ਸਵੈਯਾ`, `ਦੋਹਰਾ`, `ਚੌਪਈ`, and others), substring-matched. **This reintroduces a
  vocabulary** — the thing the legacy web app's list, further down this section,
  was treated as "a Unicode list of the same shape [ADR-0005] undid" — deliberately,
  and differently: that list was
  the *sole* mechanism, tuned to maximise recall (it still only caught 48% of real
  openings); this one is a *precision gate* layered on the structural rule,
  explicitly trading recall for near-zero false positives, and every word in it
  is checked against every bundled line before being added, not assumed safe from
  looking like a plausible marker — `ਜਪੁ` looked safe and wasn't (real Rehras
  verse: `ਜਪੁ ਤਪੁ ਸੰਜਮੁ ਧਰਮੁ ਨ ਕਮਾਇਆ ॥`), caught only by that check, not by
  inspection.
- **A short numbered marker** — 1 to 3 words then a bare one- or two-digit
  numeral (`ਦੇਵਗੰਧਾਰੀ ੫ ॥`, `ਘਰੁ ੧ ॥`, `ਪਾਤਿਸਾਹੀ ੧੦ ॥`), distinct from a pada count
  (`॥੧॥`, already excluded — no space, no words before the digit). Bhajneet's own
  rule, verified before acceptance: adds zero matches beyond `HEADING_WORDS` on
  bundled content today, kept because it will catch a raag name or author
  attribution not yet in that list without needing the list to be exhaustive.

**A word-count shortcut was proposed and rejected the same way — checked, not
assumed.** "A bare-ending line with exactly one word is a heading" is wrong for
this corpus: Jaap Sahib's own verse is built from single-word divine epithets,
one per line (`ਅਜੂ ॥`, `ਅਭੈ ॥`, `ਅਲੇਖ ॥`, `ਦਿਆਲ ॥`) — 32 of those in `JAAP` alone
would misclassify. **A false negative is the accepted failure mode, never a false
positive** — an unlisted marker renders a real heading as plain verse, a smaller
error than plain verse rendering as a heading.

**No vishraam gate, on principle, not just in practice.** Vishraams mark where a
reciter pauses; that is not a principled definition of what a heading is or
isn't. Dropping it recovers the mool mantar's own vishraam-bearing spelling as
`is_heading` too (not a contradiction with `is_moolmantar` — see above) and adds
no false positive across bundled content.

**`has_ikoankar`** — carries `ੴ` in any form. Its original justification (3 of 645
mangal-bearing lines satisfied neither other function — `DDTK`, a vishraam glued
to the mangal) closed for free when the vishraam gate came out; kept anyway as a
simple, independent primitive for a caller that only needs "does this carry
`ੴ`," not the heavier logic either other function runs.

**Measured 2026-09-07 against every line-group's opening line**, which is where a
shabad's heading sits — from before either the word-count or the vocabulary-gated
rule existed, kept because it's exactly what informed `HEADING_WORDS`' contents
once a vocabulary came back into the design. The legacy web app's `isTitle` list
matched **6,188 of 12,730 (48%)** of openings. The **6,542 it missed split cleanly
by length**, once vishraam markers are stripped before counting words:

| Words | Openings | |
| --- | --- | --- |
| 1–2 | **3,329** | `ਪਉੜੀ ੨੨`, `ਚੌਪਈ ॥` — titles |
| 3 | 601 | `ਗਉੜੀ ੧੨ ॥`, `ਪਾਧਰੀ ਛੰਦ ॥`, `ਮਾਧਵ ਬਾਚ ॥` — mostly titles |
| 4–5 | 448 | mixed |
| **6+** | **2,164** | `ਕਬੀਰ. ਭਲੀ ਮਧੂਕਰੀ; ਨਾਨਾ ਬਿਧਿ ਕੋ ਨਾਜੁ ॥` — verse |

**Three separable failures in that list:**

- **Spelling variants.** It has `ਚਉਪਈ ॥`; the corpus has **1,509** openings beginning
  `ਚੌਪਈ`. One vowel.
- **Absent categories.** Chhand names (`ਅੜਿਲ` 408, `ਸਵੈਯਾ` 381, `ਸੋਰਠਾ`, `ਰਸਾਵਲ`,
  `ਕਬਿਤੁ`), section openers (`ਅਥ` 195), speaker attributions (`ਮਾਧਵ ਬਾਚ ॥`,
  `ਲਛਮਣ ਬਾਚ ॥`), numbered forms (`ਪਉੜੀ ੨੨` — the list has `ਪਉੜੀ ॥` but not with a
  numeral), and nearly every raag name — it holds `ਦੇਵਗੰਧਾਰੀ` and misses `ਗਉੜੀ`,
  `ਕਾਨ੍ਰਹ` and the rest.
- **Length is a signal a list does not use, and a word-count rule uses too bluntly**
  — see below.

**Position is deliberately not a signal**, in either rule. `ਚੌਪਈ ॥` and `ਸਵੈਯਾ ॥`
appear partway through long works as internal headings, so a rule that only looked
at opening lines would miss them.

**`ਧਿਆਏ ਗਾਏ ਕਰਨੈਹਾਰ ॥` — the word-count rule's known false positive, and the
structure-only rule's too — is correctly verse under the current rule.** It ends
with `॥` and carries no trailing number, so structure alone still can't tell it
from a heading; it carries no `HEADING_WORDS` marker and no short numbered
ending, so the vocabulary gate excludes it. This is that gate doing its actual
job, not a coincidence — the whole reason it exists.

**A title is a line that names or introduces rather than being read as verse** — a
raag heading, an authorship line, a chhand name, a `ੴ`.

**The web app detects them by matching against two hardcoded lists**
(`apps/web/src/lib/isTitle.ts`): a *fuzzy* list matched as substrings — `ੴ`,
`ਪਾਤਿਸਾਹੀ ੧੦`, `ਮਹਲਾ ੧`–`੯`, `ਮਃ ੧`–`੯`, `ਦੇਵਗੰਧਾਰੀ ੧`–`੯`, `ਘਰੁ ੧ ॥`–`੯ ॥`, several
chhand names — and an *exact* list of about thirty whole strings including `ਸਲੋਕੁ ॥`,
`ਦੋਹਰਾ ॥`, `ਅਸਟਪਦੀ ॥`, `ਰਾਗ ਮਾਲਾ ॥`.

**Treat the list as evidence of which words to check, not as the design to
copy wholesale.** [ADR-0005](../architecture/decisions/0005-line-type-derived-not-stored.md)
removed v2's 39 hardcoded ASCII title patterns and moved line typing into
`packages/gurmukhi`, generated into the corpus at build time — a *sole*,
recall-tuned Unicode list of the same shape would undo that. `HEADING_WORDS`
isn't that: it's a precision gate on top of a structural rule, every entry
checked against bundled content rather than copied on the strength of looking
like a real marker (see `HEADING_WORDS`' and `is_heading`'s own doc comments).

**What survives the move and what does not** — measured against `collections/` on
2026-09-04, and now the shape of `HEADING_WORDS` itself:

| Entries | Verdict |
| --- | --- |
| `ਮਹਲਾ ੧`–`੯`, `ਮਃ ੧`–`੯`, `ਦੇਵਗੰਧਾਰੀ ੧`–`੯`, `ੴ`, chhand names | **Real titles, and in `HEADING_WORDS` now** — caught from a marker word, not from structure alone, and each checked against bundled content before joining |
| `ਘਰੁ ੧ ॥`–`੯ ॥` | **Real titles, but not a `HEADING_WORDS` entry** — this shape is exactly what `ends_with_short_numbered_marker` catches without needing the word listed |
| `ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਸਹਾਇ ॥`, `ਵਾਰ ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਕੀ ॥`, `ਪਾਤਿਸਾਹੀ ੧੦` | **Real titles** — the headers of Ardas's opening pauri, `banis/ARDS.toml` section 1, from `DGDG` |
| `ਵਾਹਿਗੁਰੂ`, the fateh, `ਬੋਲੇ ਸੋ ਨਿਹਾਲ…` | **Not titles.** Slideshow strings, filed here because the mechanism was convenient. The *view* should mark slideshow lines as titles — they should not look smaller than headings — and the classifier should never see them |
| `ਪਉੜੀ।`, `ਪਉੜੀ ।`, `ਪਉੜੀ॥` | **Dead.** Only `ਪਉੜੀ ॥` ever matches primary text — 551 lines, 515 in `SSA2` and 36 in `DGDG`. `ਪਉੜੀ।` occurs 493 times as **`SBMS` translation text**, an asset that is never displayed |

That last row is the argument against lists in miniature: three of four entries match
nothing, and the one that looks like a near-miss is text from an excluded asset.

#### End of a pauri

**Two of the three cases are already solved and need no list.**

| Marker | Source |
| --- | --- |
| `॥੧॥`, `॥੨॥`… | `gurmukhi::detect` with `Feature::NumberedEnding` |
| `॥ ਰਹਾਉ ॥` | `Feature::RahaoEnding` |
| **`ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।`** | **Nothing — it is a phrase, not a structural feature** |

**The third is a real domain rule about Ardas**, not a workaround. It marks where the
sangat responds, and a paragraph break there is what makes the recited Ardas readable.
In the corpus it ends lines `RZCQ` and `V26Z` of the `NTHB` asset — the second section
of `banis/ARDS.toml`, which is the spoken Ardas.

**It has nowhere to live yet.** `NumberedEnding` and `RahaoEnding` are properties of
line endings; this is a specific phrase in one composition. Whether it becomes a
gurmukhi feature, corpus-authored block structure, or something else belongs with
[navigation.md](navigation.md) — open question 5.

**Title detection is the one genuinely new piece of logic Saral and Reader need**, and
it belongs in `packages/gurmukhi` alongside the features that already exist.

**This section's own name overstates what `NumberedEnding` tells you.** It fires on
*any* numbered verse close, not specifically a pauri's — a shabad's `॥੨॥੭॥੧੨੩॥` and
a pauri's `॥੧॥` are the same feature. Telling a pauri apart from an ordinary numbered
shabad needs the line's *heading* to name the form (`classifyForm` in
`database/scripts/lib/gurbani.ts`, matching `ਪਉੜੀ`/`ਪਵੜੀ`; not yet ported to
`packages/gurmukhi`), not the ending alone. `apps/ios`'s `Line.isRahaoEnding` and
`Line.endingText` (`BaniReaderView.swift`) expose exactly `NumberedEnding` and
`RahaoEnding` as written here — a marker is present or it isn't, distinguished from
the verse text it closes but not yet classified by which form it belongs to.

**Naming collision.** `Mode` here means a *rendering density* and its values include
`presenter`.
[ADR-0002](../architecture/decisions/0002-view-modes-and-overlay-endpoints.md)
already uses "view mode" for addressable surfaces (`/view/presenter`,
`/view/screenreader`). These are different axes that share a word and a value. See
open question 1.

#### Presenter mode

Distinct enough to specify separately.

- **Shows the main line, at the top, and a preview of the next line's Gurmukhi
  only.** The preview never carries translations or pronunciations.
- **Both must always fit.** If they do not, the top line's **secondary** text is
  truncated to make room.
- **Gurmukhi is never truncated.** Scripture displayed to a congregation with words
  missing is not a layout compromise, it is wrong. If the Gurmukhi genuinely cannot
  fit, that is a sizing failure to solve some other way. *(This reads "truncate the
  extra text of the top line" as meaning the secondary fields. Stated as a rule
  because the alternative reading is unacceptable, but see open question 2.)*
- **Scrolling snaps to lines.** A swipe advances **exactly one line**, however far
  it travelled.
- **A sustained hold advances continuously.** Holding starts a repeating advance
  whose rate rises with how far the hold has travelled or how long it has been held.
  On touch that is drag distance; with a remote or keyboard it is a held arrow, where
  the rate rises with duration. Same behaviour, same control, different measure of
  "how hard am I pressing"
  ([interaction.md](../interaction.md#interactions)).
- **One haptic when continuous advance begins**, and only the first time it engages
  for that drag. It marks the transition into a different scrolling behaviour;
  repeating it per line would make it noise.
- **Zoom is doubled**, and **width is forced to full**.

**Doubling zoom must be an override, not a write.** The doubled value applies while
the mode is active and the person's own zoom is restored on leaving it. Writing 2×
into the stored setting means leaving Presenter leaves everything else at double
size, with no way to tell that is what happened. Same for width. This is a
recommendation, not something the source wording settles — open question 3.

### Transformations happen to the text, not to its presentation

**Every rendering rule above must change the text and the block structure, not be
faked in the presentation layer.**

The web app does the opposite in two places, and both have visible costs:

- **Larivaar squashes word spacing rather than removing spaces.** The spaces are still
  there, so the font shapes across word boundaries that no longer look like word
  boundaries — the wrong ligatures. [Continuous](#continuous) already requires actual
  removal, via `gurmukhi::remove`.
- **Paragraph and line breaks are injected with CSS `content: '\A\A'`.** Generated
  content is not part of the document, so it is unreliable to copy.

**What a person copies out of the app must match what they see** — the same text, the
same line breaks, the same paragraph breaks, and no injected characters. Copying
Gurbani out of Shabad OS and pasting it somewhere is an ordinary thing to do, and it
is broken on the website today. **This is a checkable requirement, not a preference.**

SwiftUI and Compose do not have CSS pseudo-elements to reach for, so building this
correctly is the natural path on both — provided the model, rather than the view,
carries the structure.

### Centered

Default **on**. Centres the text; off means left-aligned.

**Two modes override it, and the override is not a bug to work around:**

| Mode | Effect on Centered |
| --- | --- |
| **Reader**, **Saral** | **Paragraphs and lines are always left-aligned.** Centered applies to **titles only**. |
| **Presenter** | Everything is centred, and **the control is disabled** |

**Left-aligning flowed text is not a preference.** Centred prose gives every line a
different left edge, so the eye hunts for the start of each one — which is exactly
what Reader's paragraphs and Saral's line lists exist to avoid. Titles are short and
free-standing, so centring them still reads.

**Presenter disables the control rather than ignoring it.** A toggle that silently has
no effect is worse than one that visibly cannot be changed: a disabled control says
"this is fixed", a dead one says the app is broken.

### Continuous

Default **off**. Removes the spaces from the Gurmukhi line (larivaar).

**With Continuous on, pause colouring is not shown and the
[Pauses](#pauses) control becomes non-interactive** — visibly faded, not silently
inert, so it reads as "fixed here" rather than broken. The colouring has nowhere to
land: the word boundaries it marks are exactly what larivaar removes.

**The spaces must actually be removed from the string**, not hidden with letter
spacing or zero-width rendering. Gurmukhi shaping produces different ligatures
across a word boundary than within one; anything short of deleting the characters
gives the wrong glyphs.

**`gurmukhi::remove` cannot do this.** Its `Feature` enum covers vishraams, line
endings, vowel signs, nukta, adhak, nasals, accents and visarga — **there is no
whitespace feature**, so larivaar is a plain space removal in platform code. That is
acceptable precisely because a space is not domain knowledge; nothing about it can
differ between platforms the way a marker or a matra could.

**Order matters, though.** The markers are already stripped
([Pauses](#pauses)), so larivaar operates on text that has none left. Removing spaces
from the raw corpus text instead would leave the markers behind, joined to the words
they follow.

### Pauses

Default **on**. Colours the word preceding each vishraam marker by weight:

| Marker | Weight | Colour token |
| --- | --- | --- |
| `.` | light | `--light-vishraam` — purple |
| `,` | medium | `--medium-vishraam` — green |
| `;` | heavy | `--heavy-vishraam` — orange |

Verified against `apps/web/src/components/line/line.tsx` and the corpus, where the
markers appear inline in `type = "primary"` text.

**The markers are stripped whether or not this control is on.** They are editorial
markup for interpreters, not part of the text. This restates
[ADR-0006](../architecture/decisions/0006-features-removed-in-redesign.md), which
removed the *option to display vishraam symbols* while keeping the colours and the
strip-on-render rule.

**Both halves already exist in `packages/gurmukhi`.** `detect(input, features)`
returns `FeatureMatch { feature, start, end }` with **character** indices — directly
sliceable in Swift, Kotlin, and JS — over `VishramHeavy` (`;`), `VishramMedium`
(`,`), and `VishramLight` (`.`); `vishraams()` returns that set. `remove()` does the
stripping. Neither platform should be splitting on spaces and inspecting the last
character, which is what the web app does today
(`apps/web/src/components/line/line.tsx`).

Colours are in [`packages/design/tokens.md`](../../packages/design/tokens.md) as `vishraamHeavy`,
`vishraamMedium` and `vishraamLight`, generated into both apps. They were the last
display colours defined only in `apps/web/src/global.css`; **web is still not
generated from the token file**, so that is where drift would now come from.

## Variorum

**The fields shown against a line are one group, called `Variorum`.** They are four
different kinds of thing, and naming them as one group is what makes room for the
fifth and sixth without renaming everything again.

| Field | Contains | Corpus type today |
| --- | --- | --- |
| **Source (Gurbani)** | The line itself | `primary` |
| **Pronunciations** | Transliteration schemes | *computed* — not in the corpus |
| **Interpretation** | A rendering of the line's meaning, in English or Panjabi | `translation` |
| **Word Gloss** | Word-by-word definitions. Panjabi only | `note` |

**These names are the resolution of an earlier naming problem, and they are better
than what they replace.** The corpus type called `translation` is largely
interpretive — the Faridkot teeka and Sahib Singh's Punjabi are commentary, and even
`DSSK` in English is a reading of the line rather than a lexical mapping — so
**Interpretation** is honest for both languages, which "Commentary" was not. And the
type called `note` is literally a word gloss (`ਗੁਣੀ = ਗੁਣਵਾਨ। ਮਿਲਿ = ਮਿਲ ਕੇ।`), so
**Word Gloss** names it exactly, where "Translations" would have had a reader take
scholarship for scripture translation.

**The corpus still uses the old names**, so `translation` and `note` are what the
data says while the UI says Interpretation and Word Gloss. That gap is recorded as
database work ([roadmap](../../database/docs/roadmap.md)); until it closes, every
implementer needs this table.

**Where this is going.** A variorum edition shows a text alongside its variants and
its scholarship, attributed and dated — textual variants down one side, the text in
the middle, commentary notes keyed to each line down the other. That is the target
shape: eventually **textual variants of the source line itself**, and every reading
labelled by **year and asset** so a person can see who said what and when. Nothing
below builds that yet; the grouping exists so that it does not require renaming the
world when it arrives.

### Defaults

| Field | Ships |
| --- | --- |
| Source (Gurbani) | On — not a toggle |
| Pronunciations — Devanagari | Off |
| Pronunciations — Latin | Off |
| Interpretation — English | **On** |
| Interpretation — Panjabi | **On** |
| Word Gloss — Panjabi | **On** |

**A default SGGS line therefore renders four blocks beneath the Gurbani**: `DSSK`
English, `PSST` Panjabi, `NKFT` Panjabi, and the `PSST` word gloss — because
Interpretation's Panjabi option resolves to two assets. That is the densest
configuration the app supports, arrived at by default rather than by choice, and it is
the case [Ratio](#ratio) has to stay usable at.

**It also fixes the base pack.** Everything default-on must be present or the app
opens with empty fields: scripture 19.5 MB, `DSSK` 8.0, `PSST` 16.4, `NKFT` 16.1,
`PSST` notes 10.0 — **~70 MB of TOML**. Bundled today that is fine; it is the number
that matters when the web codebase has to download it
([corpus.md](corpus.md)).

**These defaults are expected to change, and that is fine.** Showing everything up
front suits an audience that does not yet know the app can do more. Once people expect
to add fields themselves — and once download cost is real — a leaner default becomes
the better one. **Nothing should be built as though this table is permanent.**

### Source (Gurbani)

The line. Always shown; not a toggle. Its rendering is [Continuous](#continuous),
[Pauses](#pauses), and the [Ratio](#ratio) baseline everything else is sized against.

### Pronunciations

A **dropdown** of transliteration schemes. **All off by default.**

**Pronunciations are computed, not stored.** Verified against the corpus: the only
content types that exist are `primary`, `translation`, and `note` — there is **no
transliteration content anywhere in `database/collections`**. They come from
`packages/gurmukhi`'s `transcribe(input, script)`.

**Two options, both off by default:**

| Option | `Script` variant | What it is |
| --- | --- | --- |
| Devanagari | `Devanagari` | Pure script mapping for Hindi/Devanagari readers; no pronunciation rules. |
| **Latin** | **`LatinScholar`** | Mechanical ISO/IAST-like mapping preserving every orthographic distinction. |

**`Script::Latin` is not offered.** The enum's pronunciation-aware variant — haha
rules, dropped grammatical vowels, hardcoded exceptions — is deliberately not exposed.
The mechanical mapping is what ships, under the plain name `Latin`.

**This is an implementation trap worth naming.** The option labelled `Latin` must be
wired to **`Script::LatinScholar`**, not to `Script::Latin`. Both produce plausible
Latin text, so getting it backwards is invisible on inspection and wrong in every
line. There is a test for it below.

`Script::Latin` stays in `packages/gurmukhi` — other consumers exist, and this is a
decision about what this app offers, not about the package.

Unlike every other Variorum field, **both options are available for every line** —
no coverage question, no unavailable state.

The enum notes Arabic as future work, "requires expert input for Persian-based script
conventions" — relevant, as the corpus holds Persian-language sources.

#### The scholarly scheme emits two characters almost nothing can render

**Measured 2026-09-07.** `latin_scholar` maps the two nasal marks to Supplemental
Punctuation:

| Gurmukhi | Emits | |
| --- | --- | --- |
| `ੰ` tippi | **U+2E1B** tilde with ring above | |
| `ਂ` bindi | **U+2E1E** tilde with dot above | |

**Of 242 fonts installed on macOS, exactly one covers them — Geneva.** Sant Lipi does
not, and neither does the system UI font. Everything else the scheme emits — `ā` `ē`
`ī` `ʰ` `ʳ` `˘` — renders fine, so on screen `ਓਅੰਕਾਰ` reads `oa□kār` and `ਸੈਭੰ` reads
`sēbha□`: a missing-glyph box in the middle of the Mool Mantar.

**This is not a rendering bug to work around in the app.** It affects every platform
equally, and no font choice available to us fixes it.

**`Script::Latin` already solves this, and shows the trade.** It post-processes the
scholar output and folds every exotic codepoint down to something ordinary:

| Scholar | Latin | |
| --- | --- | --- |
| `⸛` U+2E1B (tippi) | **`ñ`** | |
| `⸞` U+2E1E (bindi) | **`ñ`** | tippi and bindi collapse to one mark |
| `ʰ ʳ ᵛ ⁿ ᶜ` | `h r v n c` | |
| `ƴ ʸ` | `y` | |

Everything it emits is universally renderable. **The cost is precision** — tippi and
bindi become the same character, and the modifier letters lose their distinction from
ordinary consonants.

**So the two schemes sit at opposite ends of one trade**, and neither is wrong:
`latinScholar` is precise and unrenderable, `latin` is renderable and lossy.

**Replacing the two codepoints is a transliteration decision, not an encoding one**,
so it is not an implementer's to make (CLAUDE.md). A middle position exists —
characters that are both universal and distinct, such as `ṁ` (U+1E41) and `ṃ`
(U+1E43) — but which marks are *correct* for tippi and bindi is a judgement about
romanisation. See open question 14.

### Interpretation

*(Corpus type `translation`.)* **Two options: `English` and `Panjabi`.** Each names a
*language*; which asset supplies it follows from what is being read and is not a user
choice.

| Option | SGGS | Dasam Granth | Vārān | Kabit Sawaiye | Bhai Nand Lal |
| --- | --- | --- | --- | --- | --- |
| **English** | `DSSK` 100% | `DSKO` **49.7%** | `JVBG` 90.1% | `SSPK` 99.9% | `KEGP` 99.9% |
| **Panjabi** | `PSST` 93.4% **+ `NKFT`** 91.4% | `RSJD` 99.9% | `VBGS` 85.1% | `SSSK` 99.7% | `GSNL` 99.0% |

Percentages are of the lines in that edition, measured across all 141,264 line files
on 2026-09-02.

**`DSSK` is chosen for the SGGS because it is by a wide margin the one Sikhs
expect**, not for its coverage or its scholarship. That it also has the only 100%
SGGS coverage is a bonus, not the reason.

**A line shows zero, one, or several — all three are normal**, and none is an error.
The menu is stable because it names languages; only the content varies. **The menu
does not consult availability**; only rendering does.

**Coverage has one large gap:** English on Dasam Granth reaches **under half** its
lines, so a reader with English on passes through long stretches with nothing. It is
the most likely source of "the app is broken" reports arising from this design.

#### In the corpus and not offered

- **`SBMS` — never use it.** It is in the corpus for posterity only, in both English
  and Punjabi, and is not to be shown in any app. Written here because it has the
  second-highest SGGS coverage of any English asset and will otherwise look like an
  oversight to whoever reads the survey next.
- **`SNST`** (Spanish, SGGS, 99.9%) — 60,489 translated lines, the only non-en/pa
  translation, unreachable under a two-option menu. The web app never surfaced it, so
  this is scope rather than a removal — but it is real work currently unreadable.

### Word Gloss

*(Corpus type `note`.)* Punjabi only, and effectively one asset: **`PSST` notes,
over 81.4% of the SGGS** — 49,486 lines in total across the corpus.

**On by default.** A language menu with one language in it: Panjabi. Every `note` in the corpus is
Punjabi today — 49,486 lines, effectively all `PSST`, covering 81.4% of the SGGS —
but English word glosses are expected, and a menu that has to grow a second option
later is cheaper than a toggle that has to become a menu. Build the menu now.

**One entry is not an error state.** It must render as a menu with a single choice,
not collapse into a checkbox that then has to be rebuilt.

**The content is word-by-word:** `ਗੁਣੀ = ਗੁਣਵਾਨ। ਮਿਲਿ = ਮਿਲ ਕੇ। ਲਾਹਾ = ਲਾਭ।` This is
the ਵਿਆਖਿਆ the web app shows.

**With Panjabi Interpretation and Word Gloss both on, an SGGS line renders three
blocks.** That is the densest configuration supported, and the case
[Ratio](#ratio) has to stay usable at.

## Presets — deferred, not built yet

**Not to be implemented for a long time.** Recorded so the shape is known when it is,
and so nothing built before then makes it harder.

**A preset is a named set of control values**, authored in
[Settings](reading-shell.md#settings) and applied when a collection item, a bookmark,
or a search result is opened ([library.md](library.md#presets) has which applies
where). **A preset may set any control**, Zoom and Weight included.

**A preset sets the global values, exactly as the person would have.** It does not
create a scope, is not restored on exit, and does not need to be marked as contextual
— because there is nothing contextual about it. Undoing a preset is changing the
setting back.

**This is the simplification that makes the feature small.** An earlier draft had
presets seed a scope, hold while active, release on leaving, and be visibly marked in
this sidebar so a person could tell which values were not their own. That is a great
deal of machinery, and the audience is a small number of people who want deep
customisation. **The floors below are the part that must exist regardless** — they
protect against a stray pinch, which everyone can do today.

## Accessibility floors

**In [Settings](reading-shell.md#settings): a minimum zoom, below which nothing may
go.**

**The risk is not a badly authored preset — it is unreadable text with no obvious way
back.** The person most likely to hit it is an older reader who pinched too far and
cannot tell what happened, which is exactly the reader least able to recover. A floor
addresses that; restricting what a preset may contain would not, because a stray
pinch causes it just as easily.

**A floor is only a floor if it is applied last** — after presets, after the slider,
after pinch. Applied anywhere else it is a default with extra steps. It must be the
**reader's own** floor, which matters for a preset arriving with a shared collection
whose values were chosen by someone else on another device.

**Whether a minimum weight is also needed is open** — thin text at a large size stays
legible in a way small text at any weight does not, so the zoom floor is the one that
carries the case.

## Gestures

**Pinch-to-zoom can be switched off** in Settings. It removes the gesture that causes
the problem rather than clamping its result, and it is the simpler answer for someone
who keeps triggering it by accident.

**The slider is unaffected.** Turning off the gesture must never remove the only
other way to change size — that would turn an accessibility setting into a trap.

### Tap a line

**Tapping a line scrolls it to the top of the viewer and confirms which one was
tapped**, visibly, in whatever way is native to the platform
([ADR-0013](../architecture/decisions/0013-three-layers-of-specification.md):
the confirmation is the requirement, the mechanism is layer 2). For someone who
has lost their place, or is following along with a sangat reading aloud, this is
the fastest way back in sync — faster than the scrollbar, and with no separate
"find my place" control to build.

**iOS answers this with a brief highlight**, held then faded, on the same
[toner](../../packages/design/tokens.md) surface a card elsewhere in the reader
uses — built because a plain SwiftUI tap gesture has no feedback of its own.
**Android answers it with the platform's own default ripple** on the row's
`clickable` — Compose already gives every tappable row one, so nothing further
needed building; a second, custom highlight layered on top would be redundant
with what the platform already does, not an improvement on it. Two different
answers to the same requirement, not one platform behind the other.

**The whole row is the target, not just its glyphs** — a short or centred line
(a title) has empty space beside it that must tap the same as the text.

**Applies to a `Keep reading` card's own revealed lines too, once opened** — once a
continuation ([library.md](library.md#continuation-not-configuration)) is expanded,
every line it reveals is an ordinary line for every purpose from that point on,
tap-to-scroll included. There is no second, lesser version of this behaviour for
text that arrived by expansion rather than being there from the start. The
collapsed card itself is a distinct unit — tapping it (not its `Expand` control)
scrolls the whole card the same way, confirmed the same platform-native way any
other row is.

### A system gesture never discards a reading position

**Nothing incidental may silently jump the reader back to the very start of what
they're reading.** Twenty minutes into a long paath, one stray touch scrolling
everything back to line one is a worse failure than not offering whatever gesture
caused it — there is no undo for a scroll that already happened, and the longer
the reading, the more there is to lose finding the way back.

**iOS's status-bar tap-to-scroll-to-top is the concrete case addressed today** — it
applies to a scroll view automatically, with no opt-in and no confirmation, so a
mis-tap near the top edge while reaching for something else is enough to trigger
it. Turned off outright, not just guarded with a confirmation: [Tap a
line](#tap-a-line) already covers "get back to the top on purpose" more precisely
than this gesture ever did, so there is nothing it offers a reader mid-bani that
disabling it costs them.

**Not specific to this one gesture** — the requirement is the general one above;
this is its first instance. Any other incidental, no-confirmation gesture found to
have the same effect, on any platform, gets the same answer.

## Appearance

**`Light`, `Dark`, `Auto`. Default `Auto`**, following the system scheme.

Placed at the **right of the Controls sidebar header**, beside the title — an icon,
not a row in the list, because it is the one setting people change for reasons that
have nothing to do with what they are reading.

## What a test must pin down

- **Persistence.** Set each control, restart, reopen a different composition ⇒ every
  value is unchanged. Run on both platforms; they currently disagree.
- **Ratio direction and endpoints.** Slider at minimum ⇒ secondary is 40% of the
  Gurmukhi size; at maximum ⇒ 100%; 13 stops; rendered secondary size increases
  monotonically left to right.
- **Ratio migration.** Every legacy divisor from 1 to 2.5 maps to a percentage in
  range, and 1 and 2.5 map to 100 and 40 exactly.
- **Weight bounds.** 250 and 750 both render, and neither falls back to a synthetic
  weight.
- **Continuous deletes.** With Continuous on, the rendered string contains no space
  characters — asserted on the string, since a screenshot cannot distinguish this
  from zero-width spacing.
- **Markers always stripped.** With Pauses both on and off, no `.`, `,` or `;` from
  the markup reaches the rendered Gurmukhi.
- **Pause colour mapping.** A golden test over a line containing all three markers,
  in light and dark.
- **Presenter never truncates Gurmukhi.** The longest line in the corpus, at maximum
  zoom, on the smallest supported screen ⇒ the Gurmukhi is complete.
- **Presenter snap.** A swipe of 10 points and a swipe of 400 points each advance
  exactly one line.
- **Presenter zoom is restored.** Note the zoom, enter Presenter, leave ⇒ the stored
  zoom is what it was.
- **Interpretation menu is stable.** Exactly two options — `English`, `Panjabi` — on
  a line of SGGS, a line of Dasam Granth, and the default screen alike.
- **`SBMS` never renders.** No control setting, in any combination, produces `SBMS`
  content.
- **Asset selection follows the edition.** `English` on SGGS renders `DSSK`; on
  Kabit Sawaiye it renders `SSPK`. No user action selects the asset.
- **Mode is per tab.** Set Saral on an Asa Ki Var tab and Classic on a shabad tab ⇒
  switching between them switches the rendering, with no further action.
- **Presets seed and release.** Open a Nitnem item ⇒ Saral. Change to Classic ⇒ it
  holds within Nitnem, the collection's preset is unchanged, and a shabad opened from
  search is unaffected.
- **The floor is applied last.** A slider drag and a pinch each below the minimum
  zoom both clamp to it — and a preset too, once presets exist.
- **Pinch off means off**, and the slider still works.
- **Mode is one value.** Set it, open anything else, restart ⇒ it is unchanged.
- **Word Gloss is a menu.** It renders as a language menu with one entry, not a
  checkbox.
- **Zero, one, and several all render.** Panjabi Interpretation plus Word Gloss on an
  SGGS line shows three blocks; `English` on a `DSKO`-less Dasam Granth line shows
  none; neither is drawn as an error or an empty placeholder row.
- **Pronunciations never vary.** Both options are offered and produce output for
  every line in the corpus.
- **`Latin` is `LatinScholar`.** The option labelled `Latin` produces the mechanical
  mapping, not `Script::Latin`'s pronunciation-aware output. Asserted against a known
  line where the two differ — this is invisible to inspection and wrong everywhere.
- **Defaults on first launch.** English and Panjabi Interpretation on, Word Gloss on,
  both Pronunciations off ⇒ an SGGS line renders four blocks under the Gurbani.
- **Copyable output matches the display.** Select a pauri in Saral and copy ⇒ the
  clipboard holds the same lines, with the same line breaks, and no injected
  characters. Repeat in Reader ⇒ flowed text with the paragraph break intact.
- **Larivaar copies without spaces.** With Continuous on, copied Gurbani contains no
  space characters — asserted on the clipboard string, not on a screenshot.
- **Titles are typed, not matched.** `ਮਹਲਾ ੫`, `ਘਰੁ ੩ ॥`, `ਸਲੋਕੁ ॥`, `ੴ`, and the
  Ardas headers all classify as titles from one rule, not from a lookup.
- **End of pauri uses gurmukhi.** Numbered and rahao endings go through
  `NumberedEnding` / `RahaoEnding`, not a local regex.
- **Ardas breaks at the response.** In Reader and Saral, `RZCQ` and `V26Z` end a
  paragraph.
- **Centered is title-only in Reader and Saral.** With Centered on, paragraphs and
  lines stay left-aligned and only titles centre.
- **Presenter disables Centered.** The control renders disabled, not merely inert.

## Open questions

1. **`Mode` versus ADR-0002's view modes.** Two axes both called "mode", both with a
   value named `presenter`. Rename before either reaches a protocol message.
2. **In Presenter, what exactly is truncated?** Read here as the top line's Variorum
   fields, with Gurbani never truncated. Confirm — and if a *pronunciation* may be
   truncated, say so, because a half-shown transliteration misleads differently than
   a half-shown interpretation.
3. **Is Presenter's doubled zoom an override or a stored value?** Recommended as an
   override, restored on leaving. Same for the forced full width.
4. **Is three words the right limit, and what fixes the short-verse over-fire?**
   The rule ships ([Titles](#titles)); these are the knobs. Adding a small vocabulary
   as a *second* signal rather than the primary one is the obvious next move.
5. **Where does the Ardas response marker live?** `ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।` ends a paragraph
   and is not a line-ending feature. A gurmukhi feature, corpus-authored block
   structure, or a third thing — and whichever it is, it is the first rule that is
   about *one composition* rather than about Gurmukhi in general, which is why it
   does not obviously belong in the package.
6. **Does a title's larger size interact with the zoom floor?** Titles render at 1.25×
   the body size. Whether the floor applies to the body size or the smallest rendered
   size changes what it guarantees.
7. **Is dropping Spanish permanent?** `SNST` is 60,489 translated lines a two-language
   menu cannot reach. Not a removal — the web app never showed it.
8. **Is there a minimum weight as well as a minimum zoom?** Raised as uncertain.
9. **How is `Width` expressed?** A character count does not transfer to Gurmukhi.
   Needs a measure checkable against rendered Gurmukhi.
10. **When does the web app read `packages/design/tokens.md`?** It is the only surface still
    defining colours of its own, so it is now the sole remaining source of drift.
11. **What happens to controls the web app has and this document does not mention** —
    `Notes`, `Slideshow`, `Fullscreen`? Their absence is **not** a decision to remove
    them; per CLAUDE.md that belongs in an ADR
    ([ADR-0006](../architecture/decisions/0006-features-removed-in-redesign.md)).
12. *(Settled: Continuous disables Pauses — see [Continuous](#continuous).)*
13. **When variants arrive, are they a Variorum field or a different surface?** The
    target shape shows textual variants *alongside* the line with year and asset
    labels, not stacked beneath it as another toggled block.
14. **What should `latin_scholar` emit for tippi and bindi?** U+2E1B and U+2E1E are
    unrenderable in practice — see
    [above](#the-scholarly-scheme-emits-two-characters-almost-nothing-can-render).
    The replacement must keep the two marks distinct from each other. This is a
    `packages/gurmukhi` change and a transliteration judgement.
15. **What is the default `Ratio`?** The range is 40–100% in 5% steps and nothing
    states a starting value; the app currently uses 70% as a placeholder.
16. **What colour is secondary Variorum text?** The app uses `foregroundMuted`;
    nothing specifies it.
