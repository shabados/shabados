# Numbered endings in the SGGS

What the digits at the end of a line mean, and what they are good for.

Measured 2026-09-07 over **5,549 line-groups** across the 51 sections listed by
`sources/SGGS.toml`, in source order. Every line-group's last line was read and the
trailing run of `॥N॥` groups extracted.

## What the numbers are

| Numbers at the end | Line-groups |
| --- | --- |
| none | 56 |
| one | 2,526 |
| two | 1,250 |
| three | 1,622 |
| four or more | 95 |

Siree Raag, read in order, shows what each position does:

| Opening line | Ending |
| --- | --- |
| `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` | `॥੪॥੧॥` |
| `ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ॥` | `॥੪॥੨॥` |
| `ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ॥` | `॥੪॥੩॥` |
| `ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ॥` | `॥੫॥੧੩॥` |
| `ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ਘਰੁ ੫ ॥` | `॥੪॥੩੩॥` |
| **`ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੩ ਘਰੁ ੧ ॥`** | **`॥੪॥੧॥੩੪॥`** |

**Read from the right:**

- **Last — the running shabad count for the raag.** 1, 2, 3 … 33, 34, unbroken across
  changes of `ਘਰੁ` and across the change of author.
- **Middle — the count within the current author.** It appears only once a second
  author does, and restarts at 1: `ਮਹਲਾ ੩`'s first shabad is `॥੪॥`**`੧`**`॥੩੪॥`.
- **First — the padas in this shabad**, not a counter at all. It varies freely: 3, 4, 5.

**A two-number ending is the three-number form with the author counter omitted as
redundant**, not a different scheme.

## Where the running count appears to break

Asked naively — does the last number increase by one from the previous line-group in
the same section — **3,938 do and 1,457 do not (27%)**. Almost none are errors.

### A mangal marks a division, and the division owns the counter

`Jap` 38 → 1, and Siree Raag 100 → 1, both at a line-group opening
`ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥`. Calling that "a new work" is true but too vague to be useful. The
mangal is doing something more specific, and the lines around it say what.

**The mangal travels with a heading, as a pair.** 568 line-groups carry a mangal
somewhere. Only **77** have it as their first line; in the other **491** it is the
*second* line, and the heading comes first:

```
So Dar    4CW    ਸੋ ਦਰੁ ਰਾਗੁ ਆਸਾ ਮਹਲਾ ੧ ॥        <- heading
                 ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥              <- mangal
Siree Raag G6Z   ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥              <- mangal
                 ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ਘਰੁ ੧ ਅਸਟਪਦੀਆ ॥ <- heading
```

Either order, it is one device: **a heading-and-mangal pair opening a division.** There
are **566 such divisions across the 51 sections**, and nothing in the data model records
them — the corpus has sections and line-groups, and this level sits between the two.

**What the heading names is the division.** Reading Siree Raag's openers in order:

| Opens | Division |
| --- | --- |
| `ਰਾਗੁ ਸਿਰੀਰਾਗੁ ਮਹਲਾ ਪਹਿਲਾ ੧ ਘਰੁ ੧ ॥` | M1 shabads |
| `ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ਘਰੁ ੧ ਅਸਟਪਦੀਆ ॥` | M1 ashtpadis |
| `ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ਪਹਰੇ ਘਰੁ ੧ ॥` | M1 Pahray |
| `ਸਿਰੀਰਾਗ ਕੀ ਵਾਰ ਮਹਲਾ ੪ ਸਲੋਕਾ ਨਾਲਿ ॥` | the vaar |
| `ਸਿਰੀਰਾਗੁ ਕਬੀਰ ਜੀਉ ਕਾ ॥` | bhagat bani |

So a raag is subdivided **by author and by form**, each division opens with a
heading-and-mangal pair, and each division counts from 1.

**`ਘਰੁ` is not a divider, and it is not authorship.** Ghar is a musical designation —
which variation or tempo the composition is sung to — not a compositional boundary. That
is exactly why it does not divide: a division is a change of *who wrote it* or *what form
it is*, and a performance instruction is neither. The corpus bears this out. In Siree Raag
the ghar changes at four places — groups 23, 25, 27 and 32 — and none carries a mangal or
resets anything; the count runs 24, 25, 26 … 33 straight through. The very next group
*does* carry a mangal, because the author changes from `ਮਹਲਾ ੧` to `ਮਹਲਾ ੩`:

```
i=32  [4, 33]      ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ਘਰੁ ੫ ॥
i=33  [4, 1, 34]   ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੩ ਘਰੁ ੧ ॥   + mangal
```

**That is the answer to why the counter resets.** `॥੪॥੧॥੩੪॥` is padas 4, *first shabad
of this division*, thirty-fourth of the raag. The middle number is the division counter,
and the mangal is what starts it. The middle number appears in the ending exactly when a
division has opened that the rightmost counter does not reflect — which is why
two-number endings are the common case and three-number endings arrive at the first
author change.

### Interleaved forms each keep their own count

In Siree Raag Mahalla 5, `ਡਖਣਾ ॥` and `ਛੰਤੁ ॥` alternate and each counts
independently — so read in file order the numbers sawtooth 1, 1, 2, 2, 3, 3, which
looks broken and is not.

### Vaars: saloks restart, the pauri counts the vaar

Asa Ki Var as the corpus holds it today:

| Line-group | Opens | Ending |
| --- | --- | --- |
| GK0 | `ਸਲੋਕੁ` | `॥੧॥` |
| 1TN | `ਮਹਲਾ ੨ ॥` | `॥੨॥` |
| DU3 | `ਮਃ ੧ ॥` | `॥੩॥` |
| 595 | **`ਪਉੜੀ ॥`** | **`॥੧॥`** |
| J3D | `ਸਲੋਕੁ ਮਃ ੧ ॥` | `॥੧॥` |
| 3JA | `ਮਃ ੧ ॥` | `॥੨॥` |
| ASY | `ਮਹਲਾ ੨ ॥` | `॥੩॥` |
| JPB | **`ਪਉੜੀ ॥`** | **`॥੨॥`** |

**The saloks restart at ੧ for every pauri; the pauri number is the vaar's own
counter.** Japji behaves the same way, with `ਜਪੁ` standing where a salok would — which
is why its pauri 1 appears to repeat.

### Separating by form recovers the sequences

Grouping each section's line-groups by the form named in their opening line, then
asking whether that form's own numbers run 1, 2, 3:

| Section | Form | Count | Clean +1 |
| --- | --- | --- | --- |
| Raag Gauree | `ਪਉੜੀ` | 117 | 94% |
| Raag Gauree | `ਸਲੋਕ` | 147 | 10% |
| Salok Kabeer Jee | shabad | 240 | 99% |
| Salok Fareed Jee | shabad | 124 | 96% |
| Raag Bhairao | shabad | 126 | 92% |
| Raag Aasaa | shabad | 375 | 85% |

The pauris come out at 94% and the saloks at 10% — **and 10% is the correct answer**,
because saloks are supposed to restart. A low score there is evidence of a sawtooth,
not of an error.

### Lead-in and main: one shape, three instances

A vaar's saloks restart while its pauri counts. That is not special to vaars. The same
shape appears wherever a **lead-in** piece precedes a **main** piece: the lead-in
restarts at ੧ every time, the main carries the division's running count.

Siree Raag's dakhna-and-chhant division, in full:

| Line-group | Ending | Opens |
| --- | --- | --- |
| 5VL | `॥੧॥` | `ਸਿਰੀਰਾਗ ਕੇ ਛੰਤ ਮਹਲਾ ੫ ॥` |
| WY5 | `॥੧॥` | `ਛੰਤੁ ॥` |
| NBP | `॥੧॥` | `ਡਖਣਾ ॥` |
| YHD | `॥੨॥` | `ਛੰਤੁ ॥` |
| 7BZ | `॥੧॥` | `ਡਖਣਾ ॥` |
| F3Q | `॥੩॥` | `ਛੰਤੁ ॥` |
| FCZ | `॥੧॥` | `ਡਖਣਾ ॥` |
| 0T2 | `॥੪॥` | `ਛੰਤੁ ॥` |
| CV9 | `॥੧॥` | `ਡਖਣਾ ॥` |
| H29 | `॥੫॥੧॥੩॥` | `ਛੰਤੁ ॥` |

**The dakhna is to the chhant what the salok is to the pauri**, and the numbers say so:
੧ every time against 1, 2, 3, 4, 5. So this is **five reading units, not ten
line-groups** — the same over-split as the vaars.

**Saloks do the same job for chhants.** The lead-in need not be a dakhna:

| Division | Units | Line-groups | Lead-in numbering |
| --- | --- | --- | --- |
| Siree Raag `ਸਿਰੀਰਾਗ ਕੇ ਛੰਤ ਮਹਲਾ ੫ ॥` | 5 | 10 | dakhna restarts at ੧ |
| Raag Vadhans `ਰਾਗੁ ਵਡਹੰਸੁ ਮਹਲਾ ੫ ਛੰਤ ਘਰੁ ੪ ॥` | 4 | 8 | salok restarts at ੧ |
| Raag Raamkalee `ਰਾਮਕਲੀ ਮਹਲਾ ੫ ਛੰਤ ॥` | 4 | 8 | salok restarts at ੧ |
| Raag Raamkalee `ਰਾਮਕਲੀ ਮਹਲਾ ੫ ਰੁਤੀ ਸਲੋਕੁ ॥` | 8 | 16 | salok ends ੨ every time |
| Raag Jaithsree `ਜੈਤਸਰੀ ਮਹਲਾ ੫ ਘਰੁ ੨ ਛੰਤ ॥` | 4 | 8 | salok **matches** the chhant |

**25 reading units held as 50 line-groups**, plus one lone salok-chhant pair in Raag
Bilaaval (`1M3` + `PJG`) that has no run around it.

**The Vadhans division is the strongest confirmation available.** Its 8 line-groups are
`U43, 2F4, NAW, YK0, LXK, 67F, RWL, T08` — which is, character for character, the
hand-made hukamnama entry for ang 577 described below. A person stitched those exact
eight groups together by hand; the numbering says the same thing independently.

**Three lead-in numbering conventions, one structure.** This matters for detection:

```
Vadhans     salok ੧ / chhant ੧   salok ੧ / chhant ੨   salok ੧ / chhant ੩
Rutee       salok ੨ / chhant ੧   salok ੨ / chhant ੨   salok ੨ / chhant ੩
Jaithsree   salok ੨ / chhant ੨   salok ੩ / chhant ੩   salok ੪ / chhant ੪
```

Vadhans restarts at ੧; Rutee ends ੨ every time because each lead-in group holds *two*
saloks; **Jaithsree counts the salok in parallel with the chhant.** A detector keyed to
"lead-in restarts at ੧" finds the first two and misses Jaithsree entirely. The reliable
signal is not the lead-in's number but the **chhant's own run of 1, 2, 3**, with whatever
sits immediately before each one belonging to it.

**The first unit's lead-in is the division opener.** In every one of these divisions the
first lead-in carries the division heading (and often the mangal) instead of a plain
`ਸਲੋਕੁ ॥` or `ਡਖਣਾ ॥`, so heading-matching always drops unit 1 — it did so in Siree Raag
and in Jaithsree. This is the same failure as [roadmap §3.1](roadmap.md)'s
heading-matching finding 86 of 534, and it is now seen in three independent places.

**Where dakhnas occur.** 26 line-groups are headed `ਡਖਣਾ`: **21 in Raag Maaroo, 4 in
Siree Raag, 1 in Raag Gauree**. The Maaroo ones are followed by `ਮਃ ੫ ॥` rather than a
chhant — they sit in the *salok* position of Maaroo Ki Vaar, so the vaar rule already
covers them. Only Siree Raag has the dakhna-chhant form, and there it is 5 units.
Detecting by the `ਡਖਣਾ` heading alone finds 4 of the 5: the first unit's lead-in is
headed `ਸਿਰੀਰਾਗ ਕੇ ਛੰਤ ਮਹਲਾ ੫ ॥`, because it is also the division opener. **Merging by
heading text misses it; merging by the numbers does not** — the same lesson as the vaars.

## How much this explains

Each rule composed onto the last, measured as "does this line-group's counter equal the
previous one plus one, in its own scope":

| Model | Explained |
| --- | --- |
| Raag-wide, one counter per section | 72.6% |
| Divisions (heading + mangal) | 75.9% |
| Divisions × form | **91.6%** |

Generalising vaars and dakhna-chhant into one lead/main rule was tried and **did not
improve on this — 91.2%**, slightly worse. The pairing is structurally real, and the
numbers above prove it, but as a *counting* model plain form-separation already captures
it. Recorded so the next person does not re-try it.

**The residue is 461 line-groups, and it is not evenly spread**: Raag Raamkalee 59, Raag
Aasaa 42, Raag Gauree 33, Raag Maaroo 22. Two kinds are identified and neither is an
error:

- **Reading only the last line loses the padas.** `P84` in Raag Gauree ends `॥੧੨॥੮੧॥`
  and looks like padas 12, count 81. It is neither. The shabad's padas are numbered ੧–੪
  on earlier lines, and the closing line is `॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥੧੨॥੮੧॥` — a rahao, then
  division 12, raag 81. **The measurement was at fault, not the corpus.** See the rahao
  rule below.
- **The running count is written intermittently, not on every group.** In Svaiyay Fourth
  Mehl most groups end plainly `॥੧॥`, and the full count surfaces only occasionally —
  `॥੭॥੪੯॥`, then four groups of `॥੧॥`, then `॥੫॥੫੪॥`. The counter runs underneath
  whether or not it is printed.

That second point **revises the reading of the long endings below.** They are not
end-of-section markers and need not be end-of-work markers either: they are places where
the scribe wrote the whole stack out. Testing it — does a 4+ ending's last number equal
that group's position in its section — holds for **52 of 95**, which supports the running
-count reading for about half and leaves the rest unaccounted. Still open.

## The rahao rule

**A rahao's number is not part of the count.** Across the SGGS, 2,686 lines contain
`ਰਹਾਉ`. Where it is a *marker*, the number before it is **੧ in 2,420 cases and never
anything else** — so that ੧ counts nothing. It is not a pada, and it advances no counter.

**A marker is preceded by `॥`; the number is optional.** This is the discriminator, and
getting it wrong cost two wrong readings in earlier passes of this document. Four forms
occur:

| Form | Example |
| --- | --- |
| `॥੧॥ ਰਹਾਉ ॥` | the common case, 2,420 of them |
| `॥ ਰਹਾਉ ॥` | no number at all — `UN1/RB1K` |
| `॥ ਰਹਾਉ ਦੂਜਾ ॥` + stack | `LPK/7K86` ends `॥ ਰਹਾਉ ਦੂਜਾ ॥੧੧॥੬੧॥` |
| `॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥` + stack | `P84/8X0G` ends `॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥੧੨॥੮੧॥` |

**Without the preceding `॥` it is not a marker — it is an ordinary word:**

```
XYN/J41W   ਮੈ ਗੁਰਬਾਣੀ ਆਧਾਰੁ ਹੈ; ਗੁਰਬਾਣੀ ਲਾਗਿ ਰਹਾਉ ॥੮॥
```

That `॥੮॥` is **pada 8**. Matching on the word alone loses it and reports a hole in the
run; matching on `॥ … ਰਹਾਉ` does not.

**Numbers after the marker are the closing counter stack.** So `LPK` reads padas ੧–੪,
then division 11, raag 61 — a well-formed shabad, not the irregular run reported before
this rule was understood. `UN1` likewise reads padas ੧–੮, then 1, 3.

## Malformed vishraams

Vishraam markers (`;` heavy, `,` medium, `.` light) attach to the **end** of a word and
are followed by a space. Scanning every line for markers that break that shape finds
**4 in the whole SGGS**, all of the same kind — a marker with no word before it:

| Line | Text |
| --- | --- |
| `ZFV/BSCQ` | `…ਸਬਦਿ ਸਾਲਾਹੀ; ਹੋਰੁ; ਕੋਇ. `**`.ਨ`**` ਕੀਮਤਿ ਪਾਵਣਿਆ ॥੬॥` |
| `XEU/T4FX` | `…ਦੋਵੈ ਗਵਾਏ ਸੁਪਨੈ; ਸੁਖੁ. `**`.ਨ`**` ਪਾਵਣਿਆ ॥੪॥` |
| `YDH/J0UW` | `…ਅਗੰਮ ਅਗੋਚਰ ਨਾ; ਤਿਸੁ ਕਾਲੁ. `**`.ਨ`**` ਕਰਮਾ ॥` |
| `ST5/7K2S` | `…ਸੋਗ ਹਰਖੰ; ਭੈ ਖੀਣੰ `**`.ਤ`**` ਨਿਰਭਵਹ ॥` |

Three are a **doubled marker** — the word already carries its own `.`, and a second one
is stranded on the front of the next word. The fourth has no partner. **This is a text
fix, not a line-group move**, so it belongs to the `database` component's review process,
not here. Recorded so the checker exists.

## Lines in the wrong line-group

### Headings stranded at the end of the previous group

**This is [shabados/database#1889](https://github.com/shabados/database/issues/1889)** —
"Run program to check for misplaced headers/manglacharan", opened 28 June 2023, still
open, no detail beyond a screenshot. This is that program.

A line-group's last line should never be a heading. Scanning for one finds **9**, and
they split into two kinds.

**Four are genuinely misplaced**, and three of those form a chain — each group ends
holding the *next* group's heading:

| Group | Stranded line | Belongs to |
| --- | --- | --- |
| `BBH` | `NEKY` `ਬਿਲਾਵਲੁ ਮਹਲਾ ੫ ॥` | `7ZA` |
| `LSM` | `5AWP` `ਸਾਰਗ ਮਹਲਾ ੫ ॥` | `B0U` |
| `B0U` | `E1D5` `ਸਾਰਗ ਮਹਲਾ ੫ ॥` | `K84` |
| `K84` | `GJXW` `ਸਾਰਗ ਮਹਲਾ ੫ ॥` | `R0Z` |

`BBH` properly ends at `36FE …॥੨॥੭॥੧੨੩॥`; `NEKY` is the heading `7ZA` is missing. **This
is exactly the permitted change** — move a line ID from one group to another, no text
edited, no group created or destroyed.

### A heading with no composition attached

**This is [shabados/database#1902](https://github.com/shabados/database/issues/1902)**
(`FF5 + 18L`), and it is the same defect the other way round: instead of a heading
stranded at the end of the previous group, the heading is a **line-group all by itself**.

The scan above skipped single-line groups. Looking for them finds **5**:

| Group | Heading | Belongs to | Which opens |
| --- | --- | --- | --- |
| `FRC`/`QKH1` | `ਰਾਗੁ ਆਸਾ ਮਹਲਾ ੩ ਪਟੀ ॥` | `YGD` | `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` |
| `FF5`/`MRU2` | `ਰਾਗੁ ਗੋਂਡ ਬਾਣੀ ਭਗਤਾ ਕੀ ॥ ਕਬੀਰ ਜੀ ਘਰੁ ੧ ॥` | `18L` | `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` |
| `4WH`/`T7NB` | `ਬਸੰਤੁ ਬਾਣੀ ਭਗਤਾਂ ਕੀ ॥ ਕਬੀਰ ਜੀ ਘਰੁ ੧ ॥` | `7B1` | `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` |
| `D89`/`4B1H` | `ਰਾਮਕਲੀ ਮਹਲਾ ੫ ਛੰਤ ॥` | `7NK` | `ਸਲੋਕੁ ॥` |
| `5YB`/`8H18` | `ਮਾਰੂ ਮਹਲਾ ੧ ॥` | `JVC` | `ਸਲੋਕੁ ॥` |

**Three of them split a heading from its own mangal**, which the division rule says travel
as a pair. The other two sit directly in front of a lead-in salok — `D89` is the bare
opener already noted in front of the Raamkalee salok-and-chhant run.

**These are merges that delete a line-group ID**, unlike the four stranded headings, which
are pure moves. They are therefore blocked on [roadmap §3.1c](roadmap.md): the retirement
record has to exist before the first ID is freed.

**Five are colophons and belong where they are.** They close a division by counting what
just ended:

| Group | Line |
| --- | --- |
| `P6Q` | `ਮਹਲੇ ਪਹਿਲੇ ਸਤਾਰਹ ਅਸਟਪਦੀਆ ॥` — seventeen ashtpadis of the First Mehl |
| `CG1` | `ਸਤ ਚਉਪਦੇ ਮਹਲੇ ਚਉਥੇ ਕੇ ॥` — seven chaupade of the Fourth Mehl |
| `8M3` | `ਸੋਲਹ ਅਸਟਪਦੀਆ ਗੁਆਰੇਰੀ ਗਉੜੀ ਕੀਆ ॥` — sixteen ashtpadis of Gauree Guareri |
| `PRP` | `ਗਉੜੀ ਗੁਆਰੇਰੀ ਕੇ ਪਦੇ ਪੈਤੀਸ ॥` — thirty-five padas of Gauree Guareri |
| `YLS` | `ਏਹੁ ਸਲੋਕੁ ਆਦਿ ਅੰਤਿ ਪੜਣਾ ॥` — an instruction, not a tally |

**These four colophons are independent confirmation of the counter reading.** They state
in words what the numbered endings state in digits: a division ends, and its contents are
counted. Nothing else in this document confirms the division model from outside the
numbers themselves.

### More than one composition inside one line-group

With the rahao rule applied, the pada-run scan over all 5,549 groups gives:

| Finding | Groups |
| --- | --- |
| Internal pada run is clean | 3,589 |
| Run starts above ੧ — one composition split across groups | 45 |
| More than one pada run inside one group | 9 |

Of the 9, **six hold two or three complete compositions** and are candidates for a split:

| Group | Section | Padas | Closes | Reading |
| --- | --- | --- | --- | --- |
| `6RA` | Raag Gauree | 3 + 3 | `॥੩॥੨॥` | two Ravidas shabads |
| `9N9` | Raag Aasaa | 3 + 3 | `॥੩॥੬॥` | two Ravidas shabads |
| `BLU` | Raag Todee | 2 + 2 | `॥੨॥੨॥` | two Namdev shabads |
| `E5C` | Raag Kalyaan | 2 + 2 | `॥੨॥੨॥` | two shabads |
| `0HB` | Raag Aasaa | 5 + 4 | `॥੪॥੧੫॥` | two shabads |
| `EQ4` | Raag Aasaa | 8 + 8 + 8 | `॥੮॥੩॥੨੨॥…` | three Birharray chhants |

**These are splits, which create line-group IDs** — a different proposition from the
merges in [roadmap §3.1](roadmap.md), and the reason the ID-reuse rule there matters.
Flagged for review, not proposed.

**Three are not defects.** `DMP` is Jap's mangal-plus-`ਜਪੁ`-plus-pauri opening; `FD3`
(Raagmala) numbers every couplet `॥੧॥` by its own convention; and `LHY` is a
`ਸਲੋਕੁ ॥` leading an eight-pada ashtpadi — **a fourth instance of the lead-in/main shape**,
after salok+pauri, dakhna+chhant and salok+chhant.

### The one thing that does not resolve

`LT5` in Raag Maaroo. Padas run ੧–੫, the fifth closing `॥੫॥੨॥`, and the group then ends
`॥ ਰਹਾਉ ਦੂਜਾ ॥੨॥੧੧॥`. **The ੨ appears twice.** The printed source has been checked and
shows `॥੫॥੨॥` on that line, so the corpus is faithful to it. Whether that is a printing
artifact or a convention not yet understood is **an open question about the source, not
about the data** — and not one to be resolved by inference.

## What this is good for

- **A vaar's shabad is its saloks and its pauri together**, and the corpus splits
  them. Matching a descending run of salok numbers immediately before a pauri finds
  **534** such places across 17 raag sections, folding **1,578 line-groups into 534**.
  Raag Aasaa yields exactly 24, which is Asa Ki Var's 24 pauris. See
  [roadmap §3.1](roadmap.md).
- **Raag Gauree yields 121 and needs review first** — it also holds Sukhmani and Bavan
  Akhri, whose ashtpadi numbering can look like a salok run.
- **The numbers are a better structural signal than headings.** Matching heading text
  finds 86 of those 534, because a salok line-group opens `ਮਃ ੧ ॥` as often as
  `ਸਲੋਕੁ ॥`.

## Four or more numbers: a stack of nested counters

95 line-groups end in four or more numbers. Reading the Gauree Bairagan run in order
shows what they are — not a tally, but a **stack of counters, broadest on the right**:

| Group | Ending | Opens with |
| --- | --- | --- |
| `XKH` | `4, 1, 15, 35` | `ਮਹਲਾ ੩ ਗਉੜੀ ਬੈਰਾਗਣਿ ॥` |
| `02X` | `4, 2, 16, 36` | |
| `TMW` | `4, 4, 18, 38` | |
| `UHK` | `4, 1, 7, 45` | `ਗਉੜੀ ਬੈਰਾਗਣਿ ਮਹਲਾ ੪ ॥` |
| `QMK` | `4, 4, 10, 48` | |

Reading right to left: the last number is the running count for the whole raag and
never restarts; the ones inside it count progressively narrower scopes; the leftmost
is padas. At `UHK` the mehla changes from ੩ to ੪, and **only the counters narrower
than that scope reset** — 45 and 48 carry straight on. Levels appear in the ending as
they stop being redundant, which is why the width of the ending varies within a single
run.

**A hypothesis that did not survive.** The obvious reading of a 6-to-9-number ending is
an end-of-section tally. It is wrong, or at least not that: **93 of the 95 sit
mid-section**, and of the 20 with six or more numbers, **19 are mid-section**. Only
`NJM` in Svaiyay Fifth Mehl — nine numbers — is genuinely the last group in its
section. `ZY8` in Raag Bhairao ends `॥੨॥੧॥੫੭॥੮॥੨੧॥੭॥੫੭॥੯੩॥` and sits at group 93 of
132.

What the position does fit is the **end of an embedded work** rather than the end of a
raag. A raag section holds several complete compositions; the widest counters close one
of them out, and the next composition starts again at 1. That also explains the 778
restarts-to-1 above. Stated as the best available reading, not as settled: nobody has
confirmed it against a published tika, and doing so is the next step.

## What survives all three explanations

Classifying every break as sequential, restart-to-1, interleaved-form, restart-at-mangal
or section-start leaves **185 unexplained out of 5,493 — 3.4%**, concentrated in three
sections:

| Section | Unexplained |
| --- | --- |
| Raag Raamkalee | 44 |
| Raag Gauree | 38 |
| Raag Jaithsree | 20 |

Inspecting them shows two kinds, and **neither is a numbering error**:

1. **Vaar saloks already merged in pairs.** A `ਸਲੋਕ ॥` group ending `॥੨॥` is two saloks
   in one group. The detection above matches a *descending run of singles*, so it walks
   past these. They are the same structure, recorded differently — which means any merge
   script has to handle both shapes.
2. **A raag counter resuming after an embedded sub-work.** Consistent with the counter
   stack: the narrow counter restarted for the sub-work, the broad one did not, and
   comparing only adjacent endings sees a jump.

So this pass found **no confirmed numbering error anywhere in the SGGS**. Every break it
could not explain is explained by something it was not looking for. That is a stronger
result than a clean sweep would have been, because each residue kind is a structural
fact worth recording.

## Salok Mahalla 9 is consistent, not broken

Salok Mahalla 9 is **117 lines in 57 line-groups**, and **55 of those are exactly two
lines** — one couplet per group. That is not an anomaly. Every salok collection in the
corpus is recorded the same way:

(Total line-groups, so these differ slightly from the form-matched counts in the table
above — 242 against 240 for Kabeer, 128 against 124 for Fareed. The gap is groups whose
opening line the form-matcher did not recognise.)

| Collection | Line-groups |
| --- | --- |
| Salok Kabeer Jee | 242 |
| Salok Fareed Jee | 128 |
| Salok Sehshkritee | 63 |
| Salok Ninth Mehl | 57 |
| Salok Vaaran Thay Vadheek | 6 |

So "Salok Mahalla 9 should be one line-group" is not a bug fix — it is a **convention
change** that would apply to roughly 500 groups across all five collections, and it
conflicts with the vaar work above, which is about *merging saloks into their pauri*.
The two need one decision between them, not two independent ones. **This is a domain
question and is left open** (CLAUDE.md: never guess at bani composition).

## The hukamnama route already carries a hand-made answer

`apps/web/src/routes/hukamnama/[id]/index.tsx` maps ang number to line-group, and the
loader splits the value on commas. Of its **289 entries, 48 name more than one
line-group** — 148 groups stitched into 48 reading units. **All 48 runs are consecutive
in corpus order**, and their shapes are:

| Count | Shape |
| --- | --- |
| 35 | salok + mehla + pauri |
| 3 | salok + pauri |
| 2 | salok + mehla + mehla + mehla + pauri |
| 2 | chhant + chhant |
| 2 | other + chhant |
| 1 | salok + chhant ×4 |
| 1 | salok + mehla + mehla + pauri |
| 1 | other + mehla + pauri |
| 1 | other + mehla + mehla + pauri |

**42 of the 48 are vaar salok-plus-pauri units** — the exact structure of
[roadmap §3.1](roadmap.md), arrived at independently by a person doing it by hand,
across Raag Aasaa (9), Gujri (9), Vadhans (6), Sorath (6), Soohee (5), Bilaaval (5),
Bihaagraa (4) and Jaithsree (4).

Two things follow. First, it is **independent confirmation** that the line-group is not
the unit a reader wants; someone hit the same wall and patched around it in the app
rather than in the data. Second, and more useful: these 48 are a **hand-checked ground
truth**. Any merge script written for §3.1 should be run against them first, and should
reproduce all 48 before it is trusted on the other 486.

## Not yet examined

- **Confirming the counter stack against a published tika.** The reading above is
  inferred from the corpus alone. It is the one finding here that most needs an
  external source, because it is a claim about what the numbers *mean*.
- **Raag Gauree's 121 vaar candidates**, which overlap Sukhmani and Bavan Akhri.
- **Whether the 6 non-vaar hukamnama merges** (the chhant shapes) generalise, or are
  particular to those angs.
