# Design tokens

**THE source of truth for colour and type in the native apps.** Edit the tables here,
then run `node packages/design/scripts/generate-tokens.mjs`. It emits:

- `apps/ios/ShabadOS/DesignTokens.swift`
- `apps/android/app/src/main/java/com/shabados/android/DesignTokens.kt`
- `apps/android/app/src/main/res/values/design_tokens.xml`
- `apps/android/app/src/main/res/values-night/design_tokens.xml`

**Never edit those four** — they are generated and will be overwritten.
`apps/build.sh` regenerates them on every build, so a stale file cannot reach a
build.

## Why markdown rather than JSON

The values are a handful of numbers; the *reasons* are most of what matters, and JSON
has nowhere to put them. A `$comment` array is a workaround, not a home. Here a token
sits next to the sentence explaining it, and the file reads as documentation whether
or not you are about to change a value.

**The generator parses the tables below**, so their shape is load-bearing: a
three-column colour table keyed by token name, and two-column tables for the rest.
Prose around them is free.

## Colour

Light and dark pairs, matching CSS `light-dark()`. **Both platforms resolve them from
the system appearance automatically** — no theme switching code.

Values mirror `apps/web/src/global.css`, which is where this palette was designed —
in OKLCH, then converted, and the `oklch()` comments there are the real provenance.
**The web app is not yet generated from this file, so the two can still drift.**
Closing that means storing OKLCH here, computing hex in the generator, and emitting
web's custom properties too.

| Token | Light | Dark |
| --- | --- | --- |
| background | `#f4f1ee` | `#000000` |
| backgroundBase | `#ffffff` | `#222222` |
| foreground | `#23211f` | `#ffffff` |
| foregroundMuted | `#575552` | `#bebebe` |
| ui | `#2381e0` | `#3c96f7` |
| vishraamHeavy | `#8a472a` | `#ffd493` |
| vishraamMedium | `#13662b` | `#c4eda8` |
| vishraamLight | `#5e438e` | `#decbff` |

### The vishraam colours

**Three weights of pause, coloured by which marker ends the word** — verified against
`apps/web/src/components/line/line.tsx` and the corpus:

| Marker | Weight | Reads as |
| --- | --- | --- |
| `;` | heavy | orange |
| `,` | medium | green |
| `.` | light | purple |

**The markers themselves are always stripped**, whether or not pause colouring is on
— they are editorial notation, not scripture
([display-controls.md](../docs/requirements/display-controls.md#pauses)).

**These were the last display colours defined only in `global.css`.** Moving them here
is what lets a pause render the same in the apps as on the web.

## Opacity

| Token | Value |
| --- | --- |
| toner | `0.08` |

`--toner` in `global.css`: a neutral wash for dividers and inset surfaces.

## Weight

Sant Lipi's `wght` axis runs 100–900, so these are exact axis values rather than the
nine named weights a system font offers. Gurmukhi's thin horizontal strokes and
stacked matras disappear at text weights that suit Latin, which is why the primary
line sits well above regular.

**Secondary fields are lighter than the primary but not by much** — they are still
scripture-adjacent, and dropping them to a true light weight makes them look
disabled rather than subordinate.

| Token | Value |
| --- | --- |
| weightPrimary | `550` |
| weightLatin | `475` |
| weightSecondary | `440` |

`weightLatin` is heavier than `weightSecondary` because Latin at the same axis value
reads lighter than Gurmukhi does — different scripts, different apparent weight.

## Type

`ratioDefault` is the secondary-field size as a fraction of the Gurmukhi size — the
`Ratio` control's starting point, within its 0.4–1.0 range
([display-controls.md](../docs/requirements/display-controls.md#ratio)).

`lineHeight` is the total line box at `defaultSize`. **The generator emits the ratio,
not the absolute**, so it still holds when the reader is zoomed.

| Token | Value |
| --- | --- |
| ratioDefault | `0.6` |
| defaultSize | `20` |
| lineHeight | `24` |
| minSize | `14` |
| maxSize | `56` |
