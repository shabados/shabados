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

Sizing bounds live in `brand/tokens.json` (`type.minSize` 14, `type.maxSize` 56,
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
| **Classic** | Every line, every enabled field. The default. |
| **Saral** | Paragraph-like. Groups titles, pauris, and rahao lines into blocks; hides pronunciation and translation fields. |
| **Reader** | Hides pronunciation and translation fields; renders titles larger. |
| **Presenter** | One line at a time — see below. |

Saral and Reader both hide the secondary fields; they differ in whether lines are
grouped into blocks. Block and rahao structure is
[navigation.md](navigation.md)'s, and **its open questions apply here** — Saral
cannot be built while "how blocks compose when a pauri contains a rahao" is
unanswered.

**Title rendering is deferred.** Both Saral and Reader treat titles specially and
this document does not define what a title is. The web app carries a heuristic
(`apps/web/src/lib/isTitle.ts`) and v2 carried 39 hardcoded ASCII patterns, which
[ADR-0005](../architecture/decisions/0005-line-type-derived-not-stored.md)
explicitly does not bring back. Line typing belongs to `packages/gurmukhi`.

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
- **Drag and hold advances continuously.** Holding a drag starts a repeating
  advance whose rate rises with the distance held — a longer hold-distance scrolls
  faster, a shorter one slower.
- **One haptic when continuous advance begins**, and only the first time it engages
  for that drag. It marks the transition into a different scrolling behaviour;
  repeating it per line would make it noise.
- **Zoom is doubled**, and **width is forced to full**.

**Doubling zoom must be an override, not a write.** The doubled value applies while
the mode is active and the person's own zoom is restored on leaving it. Writing 2×
into the stored setting means leaving Presenter leaves everything else at double
size, with no way to tell that is what happened. Same for width. This is a
recommendation, not something the source wording settles — open question 3.

### Centered

Default **on**. Centres the text; off means left-aligned.

### Continuous

Default **off**. Removes the spaces from the Gurmukhi line (larivaar).

**The spaces must actually be removed from the string**, not hidden with letter
spacing or zero-width rendering. Gurmukhi shaping produces different ligatures
across a word boundary than within one; anything short of deleting the characters
gives the wrong glyphs.

**This already exists.** `packages/gurmukhi` exposes `remove(input, features)` over
a `Feature` enum. Use it rather than a local `replace(/ /g, '')`, which will also
eat the vishraam markers or leave them, depending on ordering, and differ between
platforms.

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

Colours are defined for light and dark in `apps/web/src/global.css` and are **not**
yet in `brand/tokens.json`, so native and web can drift — see open question 7.

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

### Source (Gurbani)

The line. Always shown; not a toggle. Its rendering is [Continuous](#continuous),
[Pauses](#pauses), and the [Ratio](#ratio) baseline everything else is sized against.

### Pronunciations

A **dropdown** of transliteration schemes. **All off by default.**

**Pronunciations are computed, not stored.** Verified against the corpus: the only
content types that exist are `primary`, `translation`, and `note` — there is **no
transliteration content anywhere in `database/collections`**. They come from
`packages/gurmukhi`'s `transcribe(input, script)`.

**The options are the `Script` enum, and there are three:**

| Option | `Script` | What it is |
| --- | --- | --- |
| Devanagari | `Devanagari` | Pure script mapping for Hindi/Devanagari readers; no pronunciation rules. |
| Latin | `Latin` | Pronunciation-aware: haha rules, dropped grammatical vowels, hardcoded exceptions. Built "for someone following along in sangat". |
| Latin (scholarly) | `LatinScholar` | Mechanical ISO/IAST-like mapping preserving every orthographic distinction. For scholars. |

Unlike every other Variorum field, **every option is available for every line** —
there is no coverage question and no unavailable state. **The two Latin options are
not interchangeable**: `Latin` is for singing along, `LatinScholar` is for study, and
someone who picks the wrong one gets something that looks right and reads wrong. The
labels must distinguish them; `Latin (scholarly)` is a placeholder, not approved copy.

The enum notes Arabic as future work, "requires expert input for Persian-based script
conventions" — relevant, as the corpus holds Persian-language sources.

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

**A language menu with one language in it: Panjabi.** Every `note` in the corpus is
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
- **Pronunciations never vary.** All three `Script` options are offered and produce
  output for every line in the corpus.

## Open questions

1. **`Mode` versus ADR-0002's view modes.** Two axes both called "mode", both with a
   value named `presenter`. Rename before either reaches a protocol message.
2. **In Presenter, what exactly is truncated?** Read here as the top line's Variorum
   fields, with Gurbani never truncated. Confirm — and if a *pronunciation* may be
   truncated, say so, because a half-shown transliteration misleads differently than
   a half-shown interpretation.
3. **Is Presenter's doubled zoom an override or a stored value?** Recommended as an
   override, restored on leaving. Same for the forced full width. Now the *only*
   scoped behaviour in this document, which is an argument for getting it right rather
   than for adding more.
4. **Is `English`, `Panjabi`, both, or neither on for a new install?** And separately
   for Word Gloss.
5. **Is dropping Spanish permanent?** `SNST` is 60,489 translated lines a two-option
   menu cannot reach. Not a removal — the web app never showed it — but worth
   deciding rather than defaulting into.
6. **Is there a minimum weight as well as a minimum zoom?** Raised as uncertain.
7. **Does the zoom floor apply to Presenter's automatic doubling?** Doubling moves
   away from the floor so it cannot breach it — but a floor high enough that the
   doubled size exceeds the maximum needs a stated resolution.
8. **How is `Width` expressed?** A character count does not transfer to Gurmukhi
   (see [Width](#width)). Needs a measure checkable against rendered Gurmukhi, and
   whether the options are discrete presets or a range.
9. **Do the vishraam colours move into `brand/tokens.json`?** They are the last
   display colours defined only in `apps/web/src/global.css`.
10. **What happens to controls the web app has and this document does not mention** —
    `Notes`, `Slideshow`, `Fullscreen`? Their absence is **not** a decision to remove
    them; per CLAUDE.md that belongs in an ADR
    ([ADR-0006](../architecture/decisions/0006-features-removed-in-redesign.md)).
    ਵਿਆਖਿਆ is no longer among them — it is Word Gloss.
11. **Does Continuous disable Pauses?** The web app disables Pauses while Continuous
    is on. With spaces deleted, colouring the run before each marker is still
    well-defined — `gurmukhi::detect` returns character offsets that survive the
    removal — so they are not technically exclusive.
12. **When variants arrive, are they a Variorum field or a different surface?** The
    target shape shows textual variants *alongside* the line with year and asset
    labels, not stacked beneath it as another toggled block.
