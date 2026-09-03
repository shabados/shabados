# Navigation

Draft, 2026-08-25. Open questions at the end are blocking — do not guess them.
Replaces v2's main-line / jump-line / autoselect model;
[presenter-capabilities.md §4](../presenter-capabilities.md) describes what is
being replaced, not the target.

## The core idea

v2 tracked two arbitrary pointers into a flat list of lines — a "main line" and a
"next jump line" — because it had no understanding of a shabad's structure. Every
smart behaviour was a heuristic bolted onto that, which is why Asa Ki Vaar needed
bespoke code.

The replacement is structural: **a composition is made of blocks**, blocks are
derived from the text, and navigation addresses blocks. Depends on line-type
classification being trustworthy
([ADR-0005](../architecture/decisions/0005-line-type-derived-not-stored.md)).

**Block types:** **manglacharan** (introductory lines, usually neither read nor
sung — `ik oankar satgur prasad`, `mehla 1`); **pauri** (a block terminating in a
numbered line ending `॥੧॥`, `॥੨॥`…); **rahao** (a rahao line is the **first line of
its block**, addressed like any other block — a block opener, not a terminator).

## Keymap

Single keypresses for everything common; binding style is governed by
[keyboard.md](keyboard.md#binding-principles).

**Fixed — never change meaning:**

| Key | Always means |
| --- | --- |
| `` ` `` | Manglacharan. No-op when the composition has none. |
| `9` / `m` | Main line |
| `0` / `u` | Next unread |
| `r` | The first rahao, if one exists |
| `<` / `>` | Jump backward / forward one block |
| `space` | Autoselect |
| `shift`+digit | The *n*th rahao |

`9`/`m` and `0`/`u` are aliases so an operator can work from either hand position.
The top row then reads as a complete navigation surface: `` ` `` for the intro,
`1`–`8` positional, `9` and `0` as the two fixed anchors at the end.

**Positional — reassigned per scope:** `1`–`8` address blocks, or lines within a
block, depending on scope.

**`qwertyuiopasdfg` is no longer positional.** v2 used those 15 keys to address
individual lines in a flat list; block addressing does not need them. Freed for
other functions, minus `r` and `u`, now fixed semantic keys.

**Multiple rahaos:** `r` reaches the first and covers ordinary use. Shabads with
more than one rahao are uncommon, so subsequent ones take `shift`+digit — a
modifier deliberately spent on a rare case rather than a bare key
([keyboard.md](keyboard.md#binding-principles), principle 1).

## Positional keys versus semantic keys

Positional keys remap when scope changes, and **this is intended** — they were
never a stable interface. Operators do not have the corpus memorised; reaching for
`1` is already a guess, and they do not know where it lands until they get there.
Positional keys are a **scanning tool**, and remapping cannot break a mental model
built on relative discovery rather than absolute position.

The semantic keys are the contract: position-independent, scope-independent, and
what makes positional keys safe to be adaptive, because there is always a known
way back. **Any future change must preserve this split.**

## Adaptive scope

A composition may be dozens of pauris long. Opened at pauri 24, addressing every
pauri is neither useful nor possible with eight keys.

**The trigger is the key budget.** Once a composition runs longer than **8
pauris**, the positional keys can no longer address its blocks, so the working
scope narrows: the pauri the operator opened into is treated as the shabad.
Scope adapts exactly when the positional keys run out — not on a separate
heuristic. Compositions that long also tend to have pauris of more than four
lines, so there is real structure inside the narrowed scope worth addressing.

Within a narrowed scope, `1`–`8` address **lines within that pauri**, and "next
unread" resolves to the first line of that pauri. Navigating outside the scope
**re-evaluates** it. One re-evaluation outcome is that no meaningful scope exists:
an operator who opened at pauri 24 and is reading straight through is doing a
reading exercise, not presenting a shabad — there "next unread" means literally
the next line and positional addressing matters little.

`<` / `>` are the stable substrate, behaving identically in every scope, which is
precisely why they must never join the positional set.

## Main line and autoselect

The main line may be **any line, in any block** — including one inside a pauri or
a rahao block. It is user-settable, because an operator who searched into the
wrong line must be able to correct it.

Two rules make autoselect work; both are corrections to specific v2 defects.

**1. Autoselect is block-aware.** When the current line is *another line within the
same block as the main line*, autoselect does **not** return to the main line — it
advances to the next unread line. This fixes v2's ping-pong, where autoselect
alternated blindly between two pointers, so working through the lines of the
refrain kept snapping back to its first line. Being anywhere inside the main
line's block already counts as "being at the main line".

**2. The unread position survives time spent in the main block.** It is captured
**at the moment of jumping into the main block**, recording the line following the
departure point, and moving around *within* the main block does not change it.
v2 recomputed the pointer on every autoselect, setting it to the line after
wherever the operator was standing:

- Reading verse on line 12, unread pointer at 13.
- Autoselect to the refrain — v2 correctly sets unread to 13.
- Navigate within the refrain to its third line, autoselect again — v2 clobbers
  unread to the refrain's fourth line.

Line 13, the operator's actual place in the composition, is silently lost, and
they land in the middle of the refrain expecting the verse. The requirement:
**departure into the main block sets the unread position; nothing inside the main
block may move it.**

## Open questions

1. **Do rahao blocks also occupy general block numbers?** Resolved that `r` handles
   the first rahao and `shift`+digit the rare multi-rahao case. Still open: since a
   rahao is the first line of its block, does that block *also* take a slot in the
   `1`–`8` sequence alongside pauris, or is rahao addressing exclusively `r` /
   `shift`+digit? Affects how blocks are numbered.
2. **Is `>8 pauris` the whole trigger, or is pauri length a second condition?**
   Stated as "more than 8 pauris long, we have to consider… that each pauri has
   more than 4 lines". Read above as: the 8-block key budget is the trigger and
   pauri length is a supporting observation. If both must hold, the rule differs.
3. **What exactly triggers re-evaluation** once scoped — one line beyond the
   boundary, any non-adjacent jump, an explicit action? Lower stakes since semantic
   keys stay fixed, but it determines whether positional keys feel coherent in live
   use.
4. **What happens at exactly 8 blocks or fewer with long pauris?** Scope stays wide
   by the rule above, so lines within a block are unaddressable except by `<`/`>`
   and next/previous. Confirm that is acceptable.
5. **What is "unread"?** Per session, per composition, persistent across restarts?
   Does clearing the display or switching away reset it? v2 tracked viewed lines
   per shabad with timestamps.
6. **Does the manglacharan key cycle** through several manglacharan lines, or
   always land on the first?
7. **How do blocks compose when a pauri contains a rahao?** Do block types nest,
   overlap, or partition the line list exclusively? Related to question 1.
8. **Do banis get blocks?** Banis are assembled across shabads, so block boundaries
   may not align with source structure. This is where v2's bani special-casing
   lived, so it needs an answer rather than an inheritance
   ([ADR-0005](../architecture/decisions/0005-line-type-derived-not-stored.md)).
9. **What happens with a composition that has no detectable blocks?** Presumably
   flat line addressing — confirm, and confirm it is distinguishable from a
   composition whose blocks failed to classify.
10. **Does the unread position survive leaving the composition** and returning
    later? Rule 2 governs movement within one session on one shabad; v2 restored
    pointers from history when reopening. Related to question 5.

Focus and keyboard-ownership questions are in
[keyboard.md](keyboard.md#open-questions).
