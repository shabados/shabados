# Interaction

Draft, 2026-09-02. **Layer 2 of three**
([ADR-0013](architecture/decisions/0013-three-layers-of-specification.md)): how each
platform delivers a requirement, where the platforms genuinely differ.

**This document holds judgements, not lookups.** Icon mappings are data and live in
[`brand/icons.json`](../brand/icons.json), generated into both apps by
`brand/scripts/generate-icons.mjs`. There is no icon table here on purpose — a
markdown table of symbol names is a promise, and a generator is enforcement.

## The filing rule

> **Would this change if we shipped only on web?**

| Answer | Goes in |
| --- | --- |
| No | [`requirements/`](requirements/) — platform-neutral, checkable everywhere |
| Yes, and it is a lookup | `brand/`, generated |
| Yes, and it is a judgement | here |

## What a judgement is

The clearest example is one that prompted this document.

**iOS has a native idiom for a small enumerated setting**: a `Menu` anchored to an
icon, which opens in place, shows a checkmark against the current value, and closes
on selection. It is compact enough to sit in a header beside a title, which is
exactly where `Appearance` is specified to go.

**Android has no equivalent idiom.** Compose has `DropdownMenu`, so the *mechanism*
exists — but Material's convention for choosing one of a few values is a dialog or a
bottom sheet, and an icon-anchored menu in a Material app reads as a mistake rather
than as a shortcut. Copying the iOS control would be technically possible and
locally wrong.

**The requirement does not move.** It is:

> Appearance offers Light, Dark, and Auto; the current value is discoverable without
> opening the control; choosing a value applies it immediately.

**What each platform does to satisfy it is the judgement.** iOS: an icon-anchored
`Menu` whose glyph reflects the current value. Android: something else. Both meet the
requirement. Neither is derivable from it.

**And "something else" does not have to be the nearest translation.** A bottom sheet
is the *conventional* Android answer and it is not the only one: with three values,
three inline segmented options in the row need no sheet at all, no second surface,
and one tap instead of two. **Rejecting the mechanical port and choosing per platform
is the whole point of this layer** — the failure mode it exists to prevent is one
platform's idiom being reproduced on the other because it was easier than deciding.

**The decision procedure, then:** state the requirement without naming a control;
pick the best answer per platform independently; write both on one row so the
difference is visible. Only the third step is new — the first two are what a good
engineer does anyway, and the row is what stops the two answers drifting apart
afterwards.

**Three tests of whether something belongs here.** It is a judgement if: a reasonable
engineer on the other platform would choose differently; the choice cannot be checked
by a test that runs on both; and the requirement stays true either way. A fact that
fails all three is a lookup, and belongs in `brand/`.

## Interactions

One row per interaction. **Organised by interaction, never by platform** — three
files named `ios`/`android`/`web` answer the same question three times and
eventually differently, and the divergence is invisible when it is in different
files. Here it is on the row.

Requirements are in [reading-shell.md](requirements/reading-shell.md) and
[journeys.md](requirements/journeys.md); this table says only *how*.

| Interaction | iOS | Android | Web |
| --- | --- | --- | --- |
| Open a sidebar | Header button, or horizontal drag on the viewer | Same | Header button only — **no swipe** |
| Sidebar presentation | Full-screen cover on phone; side-by-side on iPad | Same | Toggleable panel beside the viewer, claude.ai-style |
| Close a sidebar | Filled toggle, or drag back | Same, plus **system Back** | Filled toggle, or `Esc` |
| Choose an enumerated setting | Icon-anchored `Menu` | Inline options in the row where the set is small; a bottom sheet where it is not | `<select>`, or a popover |
| Row actions (rename, pin) | Long-press context menu; swipe actions | Long-press context menu | Right-click menu, or a hover `⋯` button |
| Reorder journey entries | Drag handle in the edit list | Drag handle | Drag handle; also keyboard-reorderable |
| Undo a removal | The journey's `Removed` section | Same | Same |
| Change zoom | Pinch, or the slider | Pinch, or the slider | Slider, `⌘=`/`⌘-`, `ctrl`+wheel |
| Presenter continuous advance | Drag-and-hold; **one haptic** on engage | Same; haptic via `HapticFeedbackConstants` | Drag-and-hold; **no haptic** — no equivalent |
| Header stays above scrolled content | Gradient mask over the top inset | `Box` overlay with `Brush.verticalGradient` | `position: sticky` + a `mask-image` gradient |
| Share a journey | `ShareLink` / share sheet | `Intent.ACTION_SEND` | Web Share API, falling back to copy-link |
| Open a shared journey link | Universal Link → the disposition sheet | App Link → the disposition sheet | In-page route |

### Notes on the rows that are not obvious

**Web has no swipe, and that is not a gap to fill.** A horizontal drag on a page
means "go back" in every browser and "switch desktop" on a trackpad. Simulating one
fights the platform. The requirement — that a sidebar is reachable and that every way
in agrees with the way out — is met by the header button alone.

**Android's system Back must close a sidebar**, and there is no iOS counterpart. A
sidebar that ignores Back is the single most reliable way to make an Android app feel
foreign. It also interacts with the drag gesture: gesture navigation owns the screen
edges, so a viewer drag must begin inside the content, not at the edge
([reading-shell.md](requirements/reading-shell.md#open-questions) question 1).

**The fading header is now free on iOS and hand-built on Android.** The deployment
target is **26.0**, so `scrollEdgeEffect` does exactly this and the hand-rolled
gradient mask is no longer needed. Android's `TopAppBar` scroll behaviours change
elevation and colour rather than masking — a different effect that will not match —
so the overlay stays hand-built there. The requirement is that Gurmukhi passing under
the header fades rather than being cut, because a hard edge through the sirlekh reads
as a rendering fault.

**No haptic on web.** The Presenter mode haptic marks entry into continuous
advance. The Vibration API is unavailable on iOS Safari and inappropriate on desktop,
so web signals the same transition visually. The requirement is that the transition is
*perceptible*, not that it is felt.

**Long-press has no desktop equivalent**, so web gets right-click and a visible
affordance. A desktop user cannot discover a long-press, and an interaction that is
only discoverable on two of three platforms is a requirement that is only met on two.

## Platform targets

**iOS: deployment target 26.0.** Set 2026-09-02, on the author's judgement that
adoption is around 80% and rising, and that Liquid Glass changed enough patterns that
supporting the previous generation means maintaining two designs. Maintenance and
simplicity win over reach here: there are other apps for Sikhs, and this one has to
still work in twenty years. **Revisit only if a lower target turns out to cost
nothing** — a target lowered at the price of compromises is the trade this decision
declined.

Consequences, both good: `scrollEdgeEffect` replaces the hand-built header mask, and
`translate` (iOS 17.4) no longer needs the fallback the generator forced.

**Android: `minSdk` 36 (Android 16).** Decided 2026-09-02, with the reach cost
understood and accepted: roughly **7.5%** of devices today. It buys variable-font
control (available at 35) and **progress-centric notifications** at 36 — Live
Updates, which is how a sehaj paath's daily goal and a Nitnem completion reach the
notification shade, and how the app can check in on someone who has not finished when
expected.

**The reasoning is maintenance, not reach.** These apps are built to last twenty
years rather than to be redeveloped continuously, and Android is the harder platform
to develop for; supporting Android 8 alongside 16 is a compatibility matrix carried
forever against a share that shrinks every year. The 7.5% grows on its own — an
estimated 40–50% within two years — while the cost of the alternative never falls.
There are other apps for Sikhs; this one is chosen to be the best-maintained rather
than the most widely installable.

**Consequence worth stating: this is the most aggressive floor in the project**, and
it is the number to re-examine first if Android adoption disappoints. Everything
built against 36-only APIs is what makes lowering it later expensive, so keep those
uses few and named — today that is Live Updates and variable-font axes, and nothing
else.

**Variable fonts matter more here than in most apps**:
[Weight](requirements/display-controls.md#weight) is a `wght` axis on
`SantLipi-VF.ttf`, driven by a slider.

## Icons

**In [`brand/icons.json`](../brand/icons.json). Do not restate them here.**

Two things worth knowing without opening the file:

**Availability is checked, and it fails the build.** An SF Symbol newer than
`IPHONEOS_DEPLOYMENT_TARGET` renders as **nothing at all** — no error, no
placeholder, a blank button. The generator compares every `minIOS` against the
target read from the project file and exits non-zero. This already caught one:
`translate` landed in **iOS 17.4** and the app targets **17.0**, so it now carries a
`character.bubble` fallback. Every `minIOS` in the file was verified against the
system symbol database, not recalled.

**No Android name has been verified.** All 33 are marked `verified: false`, and the
generator says so on every build. Verify before trusting any of them —
[Browsing icons](#browsing-icons) below.

## Browsing icons

**Naming an icon is enough — the mapping is a lookup, so hand over names, not
files.** For Android, a Material Symbols name from
[fonts.google.com/icons](https://fonts.google.com/icons) is exactly what
`brand/icons.json` wants: give the semantic slot and the icon name (`route`,
`format_size`), it goes in the file with `verified: true`, and the generator carries
it to both platforms. Same for iOS with an SF Symbols name. Naming them per control,
the way the Controls sidebar icons were named, is the right granularity.

**iOS:** the SF Symbols app (installed here as `SF Symbols Beta.app`). The
authoritative availability data is also readable directly:
`/System/Library/CoreServices/CoreGlyphs.bundle/Contents/Resources/name_availability.plist`
maps every symbol to a release year, and `year_to_release` maps that to an iOS
version. That plist is what verified this repo's symbols; prefer it over
recollection.

**Android: there is no first-party desktop app equivalent to SF Symbols.** The three
practical options, best first:

1. **Android Studio → New → Vector Asset → Clip Art.** Already installed, offline,
   searchable, and it imports the chosen icon straight into `res/drawable/` as the
   vector XML the build needs. Closest thing to SF Symbols in workflow, and it is the
   one that produces a usable artifact rather than just a name.
2. **fonts.google.com/icons** — the full Material Symbols catalogue, filterable, with
   the variable-font axes (weight, fill, grade, optical size) exposed. Richer and
   newer than what Android Studio bundles, but it is a website, and downloads land as
   loose SVGs you must convert.
3. **`androidx.compose.material:material-icons-extended`** — the legacy Material
   Icons set as Kotlin objects (`Icons.Filled.Search`), so autocomplete becomes the
   browser and missing icons become compile errors. **Not currently a dependency**,
   and adding it needs the justification CLAUDE.md requires: it is a large artifact
   that ships every icon, against roughly 33 needed. Importing 33 vector assets is
   almost certainly the better trade.

**Roboto is the typeface, not the icons.** The icon set is Material Symbols (current,
variable-font based) or Material Icons (legacy, what `material-icons-extended`
ships). They are different catalogues with overlapping names, which is a good reason
to record the exact name per icon in `brand/icons.json` rather than in anyone's head.

## Open questions

1. **What is Android's `minSdk`?** See [Platform targets](#platform-targets). Blocked
   on real distribution figures, not on a preference.
2. **Does the viewer drag start at the edge or inside the content?** Edge-initiated
   collides with the iOS back-swipe and Android gesture navigation; content-initiated
   does not, but then a drag from the very edge does nothing, which people report as a
   bug. One answer, both platforms.
3. **Do the sidebars mirror in RTL?** "Journeys is on the left" is a claim about
   reading direction, not about the screen, and this app renders Urdu-script content.
   Answering "they never mirror" is fine; answering nothing means the platforms differ.
4. **What is the desktop shell?** Electron is in [plan.md](plan.md) Phase 3 and has no
   column above. Closer to web than to either mobile platform, but it has a menu bar,
   real keyboard focus ([keyboard.md](requirements/keyboard.md)), and no touch.
5. **Are the Android drawables imported by hand forever?** Thirty-three vector assets
   imported through Android Studio is a manual step no generator covers, and a new
   icon in `brand/icons.json` silently has no drawable until someone reads the build
   warning.
6. **What does Liquid Glass change beyond the header?** Targeting iOS 26 was partly
   justified by it. If it changes how sidebars, sheets, and toolbars should be built,
   those are rows in the table above that nobody has written yet.
