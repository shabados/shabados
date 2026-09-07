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

### A restart marks a new work

`Jap` 38 → 1, and Siree Raag 100 → 1, both at a line-group opening
`ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥`. **A mangal begins a new work and the counter starts again.**
591 of the breaks are restarts of this kind.

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

## Not yet examined

- The **95 line-groups ending in four or more numbers**.
- **Salok Mahalla 9**, and hukamnamas spanning multiple shabads.
- **Whether any break survives all three explanations** — restart, interleaving, vaar.
  Those would be the genuine errors, and this pass did not isolate them.
