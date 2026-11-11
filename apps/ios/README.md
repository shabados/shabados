# Shabad OS — iOS

**This is the platform app.** It began 2026-09-01 as a store-retention scaffold —
just enough to keep the App Store listing current while the real app was designed.
**Superseded 2026-09-04**: one app across three shells, mobile ships first
([ADR-0014](../../docs/architecture/decisions/0014-one-app-three-shells.md),
[plan.md](../../docs/plan.md#step-1-in-detail--mobile)). Logic added here is no
longer a liability to be minimised, and `packages/gurmukhi` belongs in it rather
than being kept out.

See [`apps/README.md`](../README.md) for what both platforms share and how it is
generated. This file is iOS-specific.

```
./apps/build.sh ios --run      # build, boot a Simulator, install, launch
./apps/build.sh ios            # build only
open apps/ios/ShabadOS.xcodeproj   # then ⌘R
```

`--run` picks the first available iPhone simulator, boots it, opens Simulator.app,
then installs and launches. Nothing is published or signed — it is a local preview.
**Run it from a real terminal, not Claude Code's `!` prefix** — `xcrun` needs a
cache it cannot write inside the agent sandbox.

No package manager beyond Swift Package Manager (for the local `packages/gurmukhi`
dependency), no network, no permissions, no telemetry. Sources are picked up by a
file-system-synchronized group, so adding a `.swift` file under `ShabadOS/` needs no
project edit.

## Store identity

| | |
| --- | --- |
| Bundle id | `com.shabados.app` |
| Display name | Shabad OS |
| Icon | `brand/assets/lotus.svg`, via the legacy app's 1024px export |
| App Privacy | **Data Not Collected** — true: no network, no SDKs |
| Listing | Name "Shabad OS"; categories Reference, then Education; age rating 4+; primary language English (U.S.); support URL <https://www.shabados.com/support/> |
| Seller | **"Bhajneet Kohli"** — see below |
| EU (Digital Services Act) | Declared **not a trader**, so no address or phone is shown on EU product pages |
| Orientations | iPad: all four (Apple requires it for Split View and resizable windows; Xcode warns without it). iPhone: portrait and both landscapes, Xcode's default — Face ID iPhones never turn upside-down whatever the app allows |

Where the bundle id came from, why changing it forfeits the listing, the
Sentry/PostHog reduction, and telemetry's ADR status are the same on both platforms
— see [`apps/README.md#store-identity`](../README.md#store-identity).

**The seller name is the membership's entity name**, not anything in Xcode or App
Store Connect, and it is shown on every one of the team's apps. The entity is
"Bhajneet Kohli" although the team is enrolled as an Organization. Shabad OS is a
registered 501(c)(3), so the name can become "Shabad OS": developer.apple.com →
Membership details → *Update your information*, with the legal name exactly as the
IRS has it and a D-U-N-S number in that name. Approval renames the seller on every
live app, with no resubmission; it also resets `identifierForVendor`, which this
app does not use. Not yet requested as of 2026-10-11. Apple also offers nonprofits a
fee waiver, worth asking for at the same time.

App Store Connect app id `1510358282`. It had never been released to the App
Store before this app: the legacy Expo app reached TestFlight only (versions
0.1.0–0.2.0, builds up to 71, all expired), so replacing it stranded no users. The
legacy beta-channel listing, *Shabad OS (Next)* (`6497795055`,
`com.shabados.next.app`), was likewise never released and is unused.

## Versions

`MARKETING_VERSION` is what users see; `CURRENT_PROJECT_VERSION` (the build number)
is a counter App Store Connect uses to tell uploads apart. Both are in
`project.pbxproj`, which cannot hold a comment Xcode will keep, so the reasoning is
here:

- **Started at `0.3.0` (72).** The legacy app's TestFlight builds reached `0.2.0`
  build 71. App Store Connect rejects a version that is not higher than one it has
  approved, and a build number already used under the same version. Continuing from
  there avoids both, and `0.3.0` is also Android's first production version.
- **Every upload needs a higher build number**; every App Store release a higher
  version. Bump them in Xcode (target → General → Identity) or in both build
  configurations of `project.pbxproj`.
- The version in App Store Connect's *Prepare for Submission* entry must equal
  `MARKETING_VERSION`, or the uploaded build cannot be selected for it.

## Signing

Signing is Xcode's **automatic signing with a cloud-managed distribution
certificate**. The certificate that proves a build came from this team stays with
Apple, and Xcode signs with it on behalf of whoever is signed in. There is no key
file or password to keep, unlike Android's upload keystore. Being able to release
comes down to holding the right role in the team.

| | |
| --- | --- |
| Team ID | `VN2W54FQE6`, set in `project.pbxproj`. Not a secret: it is in every signed build |
| Team name | "Shabad OS Team" in App Store Connect; Xcode lists it by its entity name, "Bhajneet Kohli" |
| Enrolled as | Organization |
| Membership renews | 2027-03-08 — if it lapses, the app is removed from sale |

**Custody.** Uploading with a cloud-managed certificate needs the **Admin** (or
Account Holder) role. @bhajneet and @harjot1singh hold Admin. To release, ask one of
them for access, or for the Admin role. The **Account Holder** is the Apple Account
team@shabados.com, held by @bhajneet and @harjot1singh. It is the only account that
can renew the membership and accept Apple's updated agreements. Until a new
agreement is accepted, Certificates, Identifiers & Profiles is locked for everyone
(last accepted 2026-10-10). Sign in to Xcode with a personal Admin account, not this
one. That keeps the team's most powerful account off build machines, and the
procedure is then the same for every Admin.

**Certificate names.** A certificate is labelled with the developer-profile name of
whoever's Xcode created it, not with the team. Only the team sees it; customers
never do. Archives are signed with the *Development* certificate and re-signed with
the cloud-managed *Distribution* one at upload, so revoking a development
certificate never affects a released build.

## Releasing

1. **Rebuild `packages/gurmukhi`** from a real terminal:
   `cd packages/gurmukhi && mise run apple`. `apps/build.sh` only builds it when the
   xcframework is missing, not when it is out of date. A stale one fails to compile
   once the app calls a function added since, or silently ships old behaviour.
2. **Bump the version and build number** (see [Versions](#versions)).
3. **Check for warnings, and deal with each one before archiving.** A warning is
   how the blank controls button was found, after it had been showing for weeks.
   Look in three places:
   - the output of `./apps/build.sh ios` (the icon generator prints `WARNING:` for a
     Lucide icon with no imageset — it draws blank);
   - Xcode's issue navigator (⌘5, or click the ⚠ count in the toolbar) after a
     build;
   - the run console (⇧⌘C) while using the app on a device — e.g. `No symbol named
     '…' found in system symbol set` is a blank icon.
4. In Xcode, sign in under Settings → Apple Accounts with an Admin's Apple Account.
   Then choose *Any iOS Device* as the destination, and Product → Archive.
5. In the Organizer that opens: Distribute App → App Store Connect → Upload.
6. Wait for processing (about 10–30 minutes). The processed build also goes to
   TestFlight's internal group automatically ("ready to test" email). Installing it
   from TestFlight is the last check on the exact binary App Review will see.
7. In App Store Connect, open the version in *Prepare for Submission*, select the
   build, and Add for Review. Its version must equal `MARKETING_VERSION`.

**Screenshots** (first done 2026-10-11, designed outside the repo in AppLaunchpad).
The upload slots take exact sizes only. The iPhone slot on the version page is the
6.1"/6.3" one: **1206 × 2622** or 1179 × 2556. The iPad slot is 13": **2048 × 2732**
or 2064 × 2752, and must show the app running on an iPad. Larger iPhone exports
(1290 × 2796) are rejected there; convert them from a real terminal:

```
mkdir -p out && for f in *.jpg; do sips --resampleHeight 2622 "$f" --out "out/$f" && sips --cropToHeightWidth 2622 1206 "out/$f"; done
```

That trims about 2 px per side, since the shapes differ slightly. Watch and iPhone
Duo slots can stay empty.

`ITSAppUsesNonExemptEncryption = NO` is set, so uploads skip the export-compliance
question. That is true while the app makes no network connections. Revisit it when
anything networked lands.

`ShabadOS/PrivacyInfo.xcprivacy` declares the one "required reason" API the app uses
(UserDefaults, via `@AppStorage`) and no collected data. Keep it in step with the
App Privacy answers in App Store Connect (**Data Not Collected**).

## `packages/gurmukhi` in this app

**Wired in and in active use** — pause colouring and both pronunciation schemes go
through it, not a local reimplementation. See `Bani.swift` (`detect`/`remove` for
vishraam ranges) and `Transliteration` (`transcribe`, cached per line/scheme, only
computed on demand). The Xcode project already carries a local Swift package
reference to `../../packages/gurmukhi` — nothing further to add there.

**Simulator builds are Apple Silicon only.** The xcframework has no Intel (x86_64)
Simulator slice, so the project sets `EXCLUDED_ARCHS[sdk=iphonesimulator*] =
x86_64`. Without it, any build for "any iOS Simulator" (including `apps/build.sh ios`
without `--run`) tries to link x86_64 and fails. Device builds and App Store
archives are arm64 only and are unaffected. To support Intel Macs, add
`x86_64-apple-ios` to the gurmukhi Apple build rather than removing this setting.

Building it is not part of `./apps/build.sh` yet when the xcframework is missing;
see [`apps/README.md`](../README.md#packagesgurmukhi-in-the-apps) for the
`mise run apple` command and why it cannot run inside an agent sandbox.

## Scope

**Step 1** ([plan.md](../../docs/plan.md#step-1-in-detail--mobile)) is: the reader
in Classic, Saral, and Reader modes; the full Variorum; zoom, ratio, weight; tabs
and journeys; the Library; bookmarks, tracking, and goals; the Tracker.
Search, Presenter mode, presets, the year in review, and anything networked are out
for now.

**Built so far:** a flat bani list, one reader mode (not yet Classic/Saral/Reader —
[reading-shell.md](../../docs/requirements/reading-shell.md) is not yet read against
this view), pause colouring (on by default), both pronunciation schemes as toggles
(off by default, per the Variorum defaults), the Ratio control, and font sizing by
a two-finger pinch (the A−/A+ buttons were removed 2026-10-16). The starting size is chosen once,
on first launch, from the device and its Text Size setting
([display-controls.md](../../docs/requirements/display-controls.md#starting-size)),
and the zoom range is per device (16–88 iPhone, 16–132 iPad; both in
`packages/design/tokens.md`). Font size persists across launches (`@AppStorage`);
pause and pronunciation
toggles live in a menu stand-in for the Controls
([reading-shell.md](../../docs/requirements/reading-shell.md#controls)),
which does not exist yet and should be deleted once that surface lands.

**Not yet built:** tabs and journeys, the Library, bookmarks, tracking, goals, the
Tracker, and the mode/weight controls.

## Deliberately absent

- **A shared core** — no session/search/navigation core on any platform yet
  ([ADR-0010](../../docs/architecture/decisions/0010-shared-core-across-platforms.md)
  Needs discussion; see [`apps/README.md`](../README.md#what-is-shared-and-how)).
  This app talks to `packages/gurmukhi` directly.
- **`NSLocalNetworkUsageDescription`.** Connect will need it
  ([ADR-0011](../../docs/architecture/decisions/0011-distribution-channels.md), also
  Needs discussion), but declaring a permission before a feature uses it invites
  review questions.

Neither ADR blocks Step 1 — mobile's in-scope list above has no networking and no
shared core in it. Don't build against either ADR's options ahead of a decision.

## Content

`ShabadOS/Resources/banis.json` is generated — regenerate with
`bun run database:export-bundled` from `database/`. Never hand-edit it; scripture
corrections go through the database component's citation-backed review process.

Font version, licensing, and the rest of what's bundled and why:
[`apps/README.md#generators`](../README.md#generators).

## State of play

**Verified working (2026-09-07):** builds, installs, and runs in Simulator. Bani
list, reader, Sant Lipi rendering, light/dark, pause colouring, both pronunciation
schemes, toolbar A−/A+ sizing.

**Submitted to App Store review (2026-10-11):** 0.3.0 (72), set to release
automatically on approval. Any further upload needs build 73.

**Verified on a real iPhone (2026-10-10):** Release configuration, version 0.3.0
(72), signed with the team's development certificate. No problems found. This is the
first device run; everything before it was Simulator only.

**Pinch-to-zoom, reworked and verified on iPhone and iPad (2026-10-10).** The font
size changes live, in 1/6pt steps, at sensitivity 0.75 (the text grows about 1.68×
when the fingers spread to twice their distance). The row under the fingers is
highlighted, and is put back where it was **once, when the fingers lift**. A pinch
that starts between rows anchors to the one nearer the middle of the screen.

**Do not correct the scroll position during the pinch.** It used to be corrected on
every step, and at large sizes the reader jittered badly: each step re-wrapped lines
and the lazy list re-estimated the heights of rows off screen, so every correction
was computed from guesses and the position bounced. Removing the per-step
correction removed the jitter entirely. Previewing by drawing the reader scaled
(`scaleEffect`) and applying the size on release was also tried: no jitter, but the
size change was too hard to judge while pinching. The reasoning is also in the doc
comment on `pinchToZoom`.

**Known limitation:** the row's return on release is accurate to within **one line
height**, because `scrollTo(_:anchor:)` aligns a row's own anchor with the viewport's
and cannot express "40% into this row at 25% down the screen". Exact positioning
needs iOS 18's `ScrollPosition` with offsets — available at this app's deployment
target (26.0, [interaction.md](../../docs/interaction.md#platform-targets)) but not
yet used. Proposed: after release, read the anchor row's frame and
`ScrollPosition.scrollTo(y:)` the offset that puts its focal point back under the
fingers.

**A rotation keeps the line being read at the top.** That line is the first row
with at least 40% of its Gurmukhi showing below the bar. Only the Gurmukhi counts,
because transliterations make rows longer or shorter. The reader records it on
every scroll while the width is unchanged, and after a width change puts it back
with `scrollTo(_:anchor: .top)`, the call a tap uses (`holdOrRestore` and `topLine`
in `BaniReaderView.swift`). It lands with its row's top just below the bar, so a
part-way offset is not kept.

- **Why by hand.** Left alone, a rotation kept whatever SwiftUI anchored to, and
  rows above it that were never measured at the new width were placed by
  estimated height, so the reader jumped upwards: the same source of error as the
  pinch jitter above. A `ScrollPosition` binding is not used: it picks its own top
  row, and on a rotation it left the reader shifted 16pt sideways.
- **"Below the bar" is 0 in the rows' coordinates.** Measured on an iPhone: the
  row just below the bar reads a top edge of 0 in portrait and landscape.
  `contentInsets.top` and `safeAreaInsets.top` report the bar's height (113 / 78)
  and must not be subtracted; with either, every rotation moved the reader down
  one line. If it drifts by a line per rotation again, check this first.

**Verified on an iPhone (2026-10-15).** The test is the observations that showed
the jump. Each must keep the line in place from the first rotation on, in a long
bani with a continuation expanded, at the default size and at a large pinched
size, with and without pronunciations:

- Scrolled to an arbitrary spot, a rotation either way used to jump upwards.
- A line tapped in portrait stayed at the top through a rotation to landscape and
  back again.
- A line tapped in landscape moved upwards on the rotation to portrait, including
  after a portrait tap that rotated correctly.
- After that first jump, ten or more rotations returned to the same line with no
  further drift. A fix that only holds from the second rotation on has not fixed
  it.

**A tap scrolls to an offset, not to the tapped row's id.** The reader binds a
`ScrollPosition` and calls `scrollTo(y:)`, animated with `.smooth` over 0.5s
(`tapLine` in `BaniReaderView.swift`).

- **Why not an id.** An animated scroll to an id leaves the scroll view holding
  that id, and it snaps back to it later. This is true of `ScrollViewProxy.scrollTo`
  and `ScrollPosition.scrollTo(id:)` alike, with or without `.scrollTargetLayout()`.
  Measured on an iPhone (2026-10-15): through the next drag, the binding still
  reported the tapped id with `isPositionedByUser` false, and partway into the drag
  the content offset returned in one frame to the tap's target, with no change in
  content height. An unanimated scroll to the id does not do this, but a second,
  unanimated scroll after the animated one does not clear it.
- **The offset.** The tapped row's top in the reader's space, plus `contentOffset.y`,
  plus `contentInsets.top`. `scrollTo(y:)` measures from below the bar and
  `contentOffset` does not: without the inset the line landed 113pt short in
  portrait. The row is on screen, so its frame is measured, not estimated.
- **Not `UIScrollView.setContentOffset`**, which also did not snap back: the
  binding keeps the tap within SwiftUI. The binding is not used for rotation (see
  above).

**Verified on an iPhone (2026-10-15).** The test is the observations that showed
the snap-back. Each must hold in a long bani, portrait and landscape, for tapped
lines near the top and further down, with and without pronunciations:

- Tap a line, wait for the highlight to fade, then scroll slowly either way. It used
  to jump back to where the tap put it, once, at some point; scrolling was normal
  after that, until the next tap.
- Where it happened varied by line and direction, with no rule found. In Jap Ji
  Sahib, the line after "Jap" was first seen to jump going up and never going
  down; in the measured runs, scrolling down, it jumped when the tapped row had
  scrolled 101pt under the bar.
- Scrolling while the tap's scroll was still animating did not cause it, and nor
  did scrolling without having tapped.

**The app opens to the viewer, with Journeys beneath it** (`ReaderShell.swift`).
The Journeys sidebar is a stand-in: a Nitnem list under the specified header. A
cold launch, and 15 minutes without activity, show the default screen (ਸਤਿ ਸ੍ਰੀ
ਅਕਾਲ and pills); what is being read is held in memory only. What was last read is
saved (`LastRead`, UserDefaults `lastReadId`/`lastReadAt`), so the default screen
offers `continue reading` for a daily bani read in the last 8 hours, even after a
force quit ([reading-shell.md](../../docs/requirements/reading-shell.md#how-long-continue-reading-is-offered)). Opening slides the
viewer aside, leaving a 72pt edge that returns to it (more in landscape: the
sidebar's width is the screen's short side less 72pt, `ReaderShell.travel`); a horizontal drag anywhere
opens and closes it; opening gives a light haptic. Findings the code relies on:

- **Nothing may clip to a layer's layout frame.** That frame stops at the safe
  area: a `clipShape` there cut the text off below the status bar and left a gap
  above the home indicator. Masks and overlays that cover a layer ignore the safe
  area themselves.
- **The viewer is moved with `visualEffect`, not `offset`.** Its outline is
  `ConcentricRectangle`, which matches the display at rest (55pt, checked against
  UIKit's own value), but a concentric corner shrinks by its distance from the
  display's corner, and `offset` moves the frame, so the corners went square.
  While moved the corners also keep a 55pt minimum. `GeometryProxy.concentricCornerRadii`
  (iOS 27) returned nothing on a full-screen view, so the radius is not read.
- **The viewer is masked only while moved**, as on Android. Masked at rest, its
  corners showed the white sidebar in screenshots, screen recordings and AirPlay
  mirroring, which are square (2026-11-10). At rest its mask is square.
- **Everything that follows the slide reads the value being drawn, never the
  state it is going to** (`ViewerCard`, an `Animatable` modifier). The shell's
  `progress` comes from `journeysOpen` and `dragX`, which an animation sets to
  their end at once, so in a close by animation (tapping the edge, or a swipe
  the animation finishes) it is 0 from the first frame. A `progress != 0` check
  against it squared the corners at the start of the close, and as an
  `if`/`else` in the mask it faded between its two shapes, so the viewer turned
  partly see-through and the sidebar's words showed through it (iPhone,
  2026-11-10). The wash, mask, hairline and shadow are one modifier given
  `progress` as animatable data; the mask is one shape whose corners change,
  never a conditional view, and its change is not animated. Android reads the
  slide's animated value inside `graphicsLayer` and draw blocks, the same rule.
- **The sidebar is plain SwiftUI: no `NavigationStack`, no `List`.** It zooms from
  95% as the viewer slides, and the UIKit-backed containers answered the zoom by
  laying out again at the smaller size; at full size everything jumped and a row
  appeared. Its header is a `safeAreaBar`, which keeps the scroll edge effect.
  **A native Journeys was tried and set aside (2026-11-10)**: one `List` (sidebar
  style, `Section`, rows as `Button`s so re-tapping the open bani still returns to
  the viewer) with `JourneysBrand` as a toolbar item, on every device; on iPhone in
  its own `NavigationStack`, hosted in a `UIHostingController` and zoomed by
  `UIView.transform` (placed by `bounds`/`center`, `safeAreaRegions = []`, set in
  `context.animate`). Run on device, both with that zoom and with none, it had
  jank the plain panel does not, and gave iPad and the Duo nothing yet needed. The
  plain panel and its SwiftUI zoom stay; revisit when Journeys needs list
  behaviour (keyboard focus on iPad, swipe actions, context menus).
- **The two layers ignore the safe area entirely; their contents take the measured
  insets as fixed amounts.** An outer `GeometryReader` respects the safe area only to
  read its insets. Inside, the sidebar and the viewer are each a card the size of the
  screen: top and bottom as `safeAreaPadding` (so the reader still scrolls under the
  status bar and header), sides as plain padding filled with the page colour.
  **Nothing in a card may read the live safe area**: SwiftUI works it out from where a
  view is on screen, and the viewer moves. That includes `.background(colour)` and
  `.ignoresSafeArea()`, which reach into the safe area the same way: the card's fill,
  wash, mask and hairline are plain views filling its frame (`.background { colour }`). Failed on an iPhone in landscape: reading
  insets from a proxy that ignores the side safe area (it reports none);
  `safeAreaPadding` on the viewer's `NavigationStack` from the window's insets (the
  default screen stopped responding: taps did nothing and the viewer did not move,
  though a drag's haptic fired; 2026-10-16); respecting the side safe area in the
  shell (the inset changed as the viewer slid away from the Dynamic Island, so its
  contents shifted and the text rewrapped; 2026-10-16); the viewer laid out in the
  safe area with its page colour and mask reaching into the Island's strip by
  ignoring it (once moved they fell back to the safe area's edge, so the card was a
  strip short until dragged clear of the Island); and the viewer alone ignoring the
  sides (its contents then overlapped the strip and stretched and jittered as it
  slid; both 2026-10-19); and the layers ignoring the safe area with the viewer's
  fill still `.background(colour)` and its mask `.ignoresSafeArea()` (the padding in
  the Island's strip turned from page colour to the white sidebar once moved;
  2026-10-19).
- **The viewer's bar is the system's toolbar (`ViewerBarHost`)**, in a
  `NavigationStack` inside the card ([ADR-0018](../../docs/architecture/decisions/0018-ios-the-platforms-own-shell-and-toolbar.md)).
  UIKit's bar once recomputed its safe area as the card slid, so the Controls
  button stuck and the text rewrapped (iPhone, landscape, 2026-10-16); it slid
  cleanly on iOS 26 and 27 (2026-11-10). Its last plain-SwiftUI form
  (`ViewerBar`, `ReaderBars`) is at commit `ca2066cd2a`.
- **The sidebar's header has fixed measurements (`BarMetrics`), and its frame
  holds everything drawn in it.** A 44pt glass circle at the top of a 48pt bar (4pt
  beneath), flush under the status bar in portrait and 8pt below the screen's edge
  in landscape (chosen 2026-10-19), so the logo is level with the Journeys button;
  the title pill is 44pt too. A first pass copied the old
  toolbar's 54pt bar with centred buttons and a 24pt landscape margin; both sat
  too low. **Bars ignore Text Size** and offer the large content viewer, as iOS's
  own do. The first version used `.controlSize(.large)` glass buttons in a fixed 44pt
  frame (2026-10-19): they grew with Text Size and drew outside the frame, and since
  the frame is what sets the safe area, the soft fade and the tapped line's landing
  stopped short of the buttons, and the buttons sat too high in landscape.
  **To verify on a device:** tap-to-scroll landing, the line kept through a rotation,
  and the fade's depth, in both orientations and at an accessibility Text Size.
- **A Lucide icon is drawn with `ScaledLucide`**, or it ignores Text Size.

**Verified on an iPhone (2026-10-16):** rounded corners through the whole slide,
the sidebar's fade and zoom with no jump, opening and closing by button, edge and
drag. **Not yet checked:** `continue reading` after a force quit
(added 2026-10-16). Android has the same shell since 2026-10-16
([android/README.md](../android/README.md#reading-shell)).

**iPad and the iPhone Duo (either display) have the platform's own shell**
(`ReaderShell.splitShell`, 2026-11-10;
[reading-shell.md](../../docs/requirements/reading-shell.md#four-surfaces-one-of-them-always-visible),
[ADR-0018](../../docs/architecture/decisions/0018-ios-the-platforms-own-shell-and-toolbar.md)):
a `NavigationSplitView` whose sidebar is `JourneysPanel`; every other iPhone has
the card. Chosen by device (`besideViewer`): the `.pad` idiom, or a hinge
(`HingeWatch`, `onHingeChange`, iOS 27.1). The split view's own toggle is removed
for the Journeys button (`JourneysButton`), which is in the panel's header while it
is open and in the viewer's bar while it is closed (`viewerJourneys`), so a
minimized bar never hides the way to close the panel. The left-edge swipe is the
split view's own. In one column (`oneColumn`: the Duo's outer display, a narrow
iPad window) the same split view collapses: Journeys its root and the viewer
pushed onto it, as Files does, opening on the viewer (`preferredCompactColumn`).
The system's back button is the way to Journeys there and the viewer's bar has no
Journeys button: hidden, the back button took both back swipes with it; drawn
with the Journeys icon (`setBackIndicatorImage`), iOS 26 ignored it. Each
binding's setter counts only in its own width; unchecked, the outer display opened
on Journeys. Whether it is one column is asked of the split view
(`SplitCollapseWatch`, `UISplitViewController.isCollapsed`), not the size class: an
iPad window still regular in width collapsed. Beside the viewer, Journeys' header is
the split view's toolbar (`JourneysBrand`, the Journeys button), which keeps clear of
an iPad window's controls; on iPhone the zoomed panel draws its own. The sidebar is not a floating glass panel: on this iPadOS (2026-11-10)
Mail's and Notes' are not either.

**The viewer's bar is the system's toolbar, at the top, on every device**
(`ViewerBarHost`). **The title is always `TitlePill`**, the toolbar's shared glass
off behind it. **On iOS 27 the system minimizes it on a scroll down**
(`toolbarMinimizationBehavior(.onScrollDown)`), with the safe area held
(`toolbarMinimizationSafeAreaAdjustment(.disabled)`), so the text never moves;
`.toolbar(.hidden)` gives up the bar's place and stuttered a scroll under way, so
**before iOS 27 it never hides**. Only the navigation bar minimizes (the bottom
bar did not, iPhone), so the bar is at the top on iPhone too. **A tapped line's
scroll drives minimization as a finger's does**, so a short one can leave the bar
part minimized; pausing it with `.never` showed a minimized bar on every tap. The
line lands below the bar's place.

**The status bar always shows.** Passed to the minimization (`.statusBar`, a
placement since iOS 27) it stayed; hidden by our own rule beside the system's bar
the two fell out of step; in Split View on the Duo the app had none of its own,
and hiding it flickered. Nothing reports the bar's minimized state, though the
pill's frame shows it (y 59 to 5 on an iPhone). **Behind the bar and the status
bar, the system's edge effect in its automatic style** (`BaniReaderView`): on iOS
27 a hard band behind the bar while it is up and a soft blur behind the status bar
alone while it is minimized; right on iOS 26 too. A style we set covers the bar's
held place even while it is minimized, and a blur of our own sized to the status
bar blurred nothing (the comment there has what was tried).

**Controls' popover closes at the system's pace**: from a toolbar button it morphs
back into the button, nothing public shortens it, and a second tap waits for it.
On the Duo simulator it once opened on either side or not at all (2026-11-10);
not since. Untried if it returns: the `ToolbarItem`'s `matchedTransitionSource`
with the popover attached outside the item.

Reader font size, pauses, pronunciations and ratio are persisted on both
platforms, under the same keys ([apps/README.md](../README.md#state-of-play)).
