# Icons

**THE source of truth for which glyph means what.** Edit the table, then run
`node packages/design/scripts/generate-icons.mjs`. It emits `apps/ios/ShabadOS/AppIcons.swift`
and `apps/android/app/src/main/java/com/shabados/android/AppIcons.kt`; never edit
those, they are overwritten. `apps/build.sh` regenerates them every build.

A living document. Entries are not "verified" or "unverified" — they are right, or
they are more right than they were. **Placeholders are fine**; a wrong name is a
visible wrong icon, not a silent failure. Change one whenever you know better.

## Sets, not platforms

**Columns are icon sets, not targets.** "Lucide" is not the web column and "SF
Symbols" is not the iOS column — a set is a design language, and any target can draw
from any of them.

**Lucide comes first because it is the one set available everywhere.** It ships as
plain SVG, so it renders on every target we have. The native sets are listed after it
because matching the platform is usually worth more than matching ourselves.

**`Use Lucide` marks the exceptions.** Where an icon is central enough to the UI that
no native symbol is good enough, Lucide wins on every target and the native entries
stay as a record of what was rejected. Keep that column sparse — the reason to
override is that a particular icon is worth it, not that consistency is.

## The availability column

**`Since` is the iOS release an SF Symbol first shipped in**, a property of the set
rather than of any app. The generator compares it against the deployment target and
**fails the build** if a symbol is too new and has no fallback: a missing SF Symbol
renders as *nothing at all*, with no error — a blank button in front of a
congregation. It has already caught one, `translate`, which is 17.4.

## Lucide assets

**A `Use Lucide` icon needs its SVG copied into the app; nothing fetches it.** On iOS
that is an imageset in `apps/ios/ShabadOS/Assets.xcassets` named exactly as the
Lucide column, holding the upstream SVG unmodified, with *Preserve Vector Data* on
and *Render As: Template Image* (so it takes the tint like an SF Symbol). Draw it with
`ScaledLucide`, not a bare `Image(lucide:)`, so it follows Text Size as SF Symbols do. Lucide's
`stroke="currentColor"` needs no change: a template image is drawn from the shape's
coverage alone, so its colour is irrelevant — verified on iPhone in light and dark
mode, 2026-10-11. The generator emits these as `LucideIcon`, not a `String`, and
they are drawn with `Image(lucide:)` — `Image(systemName:)` will not accept one,
because given an asset name it draws nothing. The generator **warns** when an
imageset is missing; the release steps in `apps/ios/README.md` check for that
warning before archiving.

Pin the version and record each copy here. To add one, fetch
`https://unpkg.com/lucide-static@<version>/icons/<name>.svg`.

| Lucide | Package | Version | Source | Licence | Copied to |
| --- | --- | --- | --- | --- | --- |
| `settings-2` | `lucide-static` | 1.55.0 (current on 2026-10-10) | <https://unpkg.com/lucide-static@1.55.0/icons/settings-2.svg> | ISC | `apps/ios/ShabadOS/Assets.xcassets/settings-2.imageset/`; `apps/android/app/src/main/res/drawable/ic_controls.xml` |

**On Android a Lucide icon is a vector drawable translated by hand** from the same
SVG, named as in `AppIcons.kt` (`ic_controls`, not `settings_2`). Vector drawables
have no `<circle>`, so each circle becomes two arcs; the paths, stroke width, caps
and joins are copied unchanged, with the source element kept as a comment above each
path. The stroke colour is irrelevant for the same reason as on iOS: Compose's `Icon`
tints the shape with `LocalContentColor`.

The licence is ISC, from the package's `LICENSE`; it ships in the SVG's first line as
`@license lucide-static v1.55.0 - ISC`. A few Lucide icons derived from Feather are
additionally MIT; check that file's list before adding one. `settings-2` is not on it.

> ISC License — Copyright (c) 2026 Lucide Icons and Contributors
>
> Permission to use, copy, modify, and/or distribute this software for any purpose
> with or without fee is hereby granted, provided that the above copyright notice
> and this permission notice appear in all copies.
>
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
> REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
> FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
> OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA
> OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
> ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Android drawables

**Material Symbols icons are copied from `google/material-design-icons`**, whose
`symbols/android/<name>/materialsymbolsoutlined/<name>_24px.xml` files are already
vector drawables.
Licence Apache-2.0. Each is saved to `res/drawable/` under its `AppIcons.kt` name
with one change: **upstream's `android:tint="?attr/colorControlNormal"` is
removed.** That attr is defined by AppCompat/MDC, which the app does not depend on,
and Compose's `Icon` tints regardless. Pin the commit and record each copy here.

| Material Symbol | Commit | Source | Licence | Copied to |
| --- | --- | --- | --- | --- |
| `conversion_path` | `6d7ca43bd6e6668531a00fcaca06d921b63dd716` (latest for that file on 2026-10-16) | `symbols/android/conversion_path/materialsymbolsoutlined/conversion_path_24px.xml` | Apache-2.0 | `apps/android/app/src/main/res/drawable/ic_journeys.xml` |
| `bedtime` | `6d7ca43bd6e6668531a00fcaca06d921b63dd716` (2026-10-19) | `symbols/android/bedtime/materialsymbolsoutlined/bedtime_24px.xml` | Apache-2.0 | `apps/android/app/src/main/res/drawable/ic_appearance.xml` |
| `settings` | `6d7ca43bd6e6668531a00fcaca06d921b63dd716` (2026-10-19) | `symbols/android/settings/materialsymbolsoutlined/settings_24px.xml` | Apache-2.0 | `apps/android/app/src/main/res/drawable/ic_settings.xml` |
| `arrow_back` | `6d7ca43bd6e6668531a00fcaca06d921b63dd716` (2026-10-19) | `symbols/android/arrow_back/materialsymbolsoutlined/arrow_back_24px.xml` | Apache-2.0 | `apps/android/app/src/main/res/drawable/ic_back.xml` |
| `close` | `6d7ca43bd6e6668531a00fcaca06d921b63dd716` (2026-10-19) | `symbols/android/close/materialsymbolsoutlined/close_24px.xml` | Apache-2.0 | `apps/android/app/src/main/res/drawable/ic_close.xml` |
| `history` | `6d7ca43bd6e6668531a00fcaca06d921b63dd716` (2026-10-19) | `symbols/android/history/materialsymbolsoutlined/history_24px.xml` | Apache-2.0 | `apps/android/app/src/main/res/drawable/ic_reset.xml` |

## Icons

| Icon | Lucide | SF Symbol | Since | Material Symbol | Use Lucide |
| --- | --- | --- | --- | --- | --- |
| journeys | `route` | `point.bottomleft.forward.to.point.topright.scurvepath` | 17.0 | `conversion_path` |  |
| controls | `settings-2` | `slider.horizontal.2.square` | 17.0 | `page_info` | **yes** |
| controlsActive | `settings-2` | `slider.horizontal.3` | 13.0 | `tune` | **yes** |
| fullscreen | `maximize-2` | `arrow.up.left.and.arrow.down.right` | 13.0 | `open_in_full` |  |
| fullscreenActive | `minimize-2` | `arrow.down.right.and.arrow.up.left` | 13.0 | `close_fullscreen` |  |
| zoom | `zoom-in` | `plus.magnifyingglass` | 13.0 | `zoom_in` |  |
| ratio | `a-large-small` | `textformat.size` | 13.0 | `format_size` |  |
| weight | `weight` | `lineweight` | 14.0 | `line_weight` |  |
| width | `unfold-horizontal` | `arrow.left.and.right` | 13.0 | `width_normal` |  |
| mode | `book-text` | `eyeglasses` | 13.0 | `eyeglasses` |  |
| centered | `align-center` | `text.aligncenter` | 13.0 | `format_align_center` |  |
| continuous | `whole-word` | `space` | 16.0 | `space_bar` |  |
| pauses | `pause` | `pause.fill` | 13.0 | `pause` |  |
| pronunciations | `speech` | `person.wave.2` | 15.0 | `record_voice_over` |  |
| translations | `languages` | `translate` | 17.4 | `translate` |  |
| notes | `panel-top` | `pad.header` | 26.0 | `toolbar` |  |
| slideshow | `tv-2` | `tv` | 13.0 | `tv` |  |
| appearance | `eclipse` | `sleep` | 14.0 | `bedtime` |  |
| filter | `list-filter` | `line.3.horizontal.decrease` | 15.0 | `filter_list` |  |
| disclosure | `chevron-right` | `chevron.forward` | 14.0 | `chevron_right` |  |
| library | `library-big` | `books.vertical` | 14.0 | `library_books` |  |
| about | `badge-info` | `info.circle` | 13.0 | `info` |  |
| search | `search` | `magnifyingglass` | 13.0 | `search` |  |
| pin | `pin` | `pin` | 13.0 | `keep` |  |
| pinned | `pin` | `pin.fill` | 13.0 | `keep` |  |
| rename | `pencil` | `pencil` | 13.0 | `edit` |  |
| remove | `circle-minus` | `minus.circle` | 13.0 | `remove_circle_outline` |  |
| undo | `undo-2` | `arrow.uturn.backward` | 14.0 | `undo` |  |
| reset | `rotate-ccw` | `clock.arrow.trianglehead.counterclockwise.rotate.90` | 18.0 | `history` |  |
| share | `share` | `square.and.arrow.up` | 13.0 | `share` |  |
| next | `chevron-right` | `chevron.forward` | 14.0 | `chevron_right` |  |
| previous | `chevron-left` | `chevron.backward` | 14.0 | `chevron_left` |  |
| streak | `flame` | `flame` | 13.0 | `local_fire_department` |  |
| settings | `settings` | `gearshape` | 14.0 | `settings` |  |
| back | `chevron-left` | `chevron.backward` | 14.0 | `arrow_back` |  |
| close | `x` | `xmark` | 13.0 | `close` |  |
| tracked | `trending-up` | `chart.line.uptrend.xyaxis` | 15.0 | `trending_up` |  |

## Meanings

| Icon | |
| --- | --- |
| journeys | Open the Journeys sidebar, and close it from the sidebar's header. The same icon in both states, not a filled variant for open (chosen 2026-10-15). Specified by the author. |
| controls | Open Controls. |
| controlsActive | Controls is open. PROPOSED; under review alongside journeys, which uses one icon for both states. |
| fullscreen | Enter fullscreen. PROPOSED. |
| fullscreenActive | Exit fullscreen. Unlike controlsActive this is a distinct Lucide glyph, not the same shape filled — Lucide has no fullscreen fill variant. PROPOSED. |
| zoom | Font size of the reading area. Specified by the author. |
| ratio | Secondary text size relative to the Gurmukhi line. Specified by the author. |
| weight | Font weight. Specified by the author. |
| width | Reading column width. Wide surfaces only. PROPOSED — not specified. |
| mode | Rendering mode: classic / saral / reader / presenter. Specified by the author. |
| centered | Centre the text. Specified by the author. |
| continuous | Larivaar — remove spaces from the Gurmukhi line. Specified by the author. |
| pauses | Colour vishraam words. Specified by the author. |
| pronunciations | Transliteration schemes, computed by packages/gurmukhi. Specified by the author. |
| translations | Translation languages. Specified by the author. |
| notes | Toggle a line-notes panel in Controls. PROPOSED. |
| slideshow | Choose a full-screen card — Blank, Waheguru, Fateh, Mul Mantar, Bole So Nihal — to display over the text. PROPOSED. |
| appearance | Light / dark / auto. Specified by the author. |
| filter | Filter in All recents: All / Pinned / Recent / Inactive. PROPOSED. |
| disclosure | Trailing chevron on the All recents row. PROPOSED. |
| library | Open the Library — collections, bookmarks, assets and their tables of contents. Pinned below Recents in the Journeys sidebar. Specified by the author ([library.md](../../docs/requirements/library.md), [reading-shell.md](../../docs/requirements/reading-shell.md#getting-between-them)). |
| about | About Shabad OS — links, social, feedback. PROPOSED. |
| search | Search. PROPOSED — the shell has no specified entry point yet. |
| pin | Pin a journey. PROPOSED. |
| pinned | Pinned state. PROPOSED. |
| rename | Rename a journey. PROPOSED. |
| remove | Move an entry to a journey's Removed section. Not a delete. PROPOSED. |
| undo | Restore a removed entry to its original position. PROPOSED. |
| reset | Reset Settings' Appearance (zoom, ratio, weight) to the original settings, after a confirmation. Drawn in red. |
| share | Share a journey — a bookmark position, or a Defined journey. PROPOSED. |
| next | Next entry in a journey. PROPOSED. |
| previous | Previous entry in a journey. PROPOSED. |
| streak | Consecutive days with a complete Defined instance. PROPOSED. |
| settings | Open Settings, from Controls' footer row. |
| back | Android Settings' top left on every page: closes Settings from its first page, returns to it from the others. iOS's navigation draws its own. |
| close | Close Settings: the ✕ at the top right of its first page, on iOS only (Android uses Back). Also proposed for closing a tab, which removes it from the journey permanently; the timeline keeps it. |
| tracked | A tracked collection or bookmark. PROPOSED. |
