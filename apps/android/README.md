# Shabad OS — Android

**This is the platform app.** It began 2026-09-01/02 as a store-retention
scaffold — just enough to keep the Play listing current while the real app was
designed. **Superseded 2026-09-04**: one app across three shells, mobile ships
first ([ADR-0014](../../docs/architecture/decisions/0014-one-app-three-shells.md),
[plan.md](../../docs/plan.md#step-1-in-detail--mobile)). Logic added here is no
longer a liability to be minimised.

See [`apps/README.md`](../README.md) for what both platforms share and how it is
generated. This file is Android-specific.

```
./apps/build.sh android --run  # build, boot an emulator, install, launch
./apps/build.sh android        # build only
```

`--run` installs to an already-attached device if there is one (a plugged-in phone
counts), otherwise boots the first AVD and waits for `sys.boot_completed` before
installing — `adb wait-for-device` returns well before the launcher is up, and
installing that early fails.

The SDK now has `platform-tools`, `emulator`, a `Medium_Phone` AVD, and an
`android-37.1` system image, so `--run` has everything it needs. What is still
missing is the Gradle wrapper — open the project in Android Studio once. The script
fails with a specific message per missing piece rather than a Gradle stack trace.

Not a bun workspace member — same as `apps/presenter`. Root `bun install` does not
touch it.

## Store identity

| | |
| --- | --- |
| Application id | `com.shabados.app` |
| Display name | Shabad OS |
| Icon | `brand/assets/lotus.svg`, via the legacy app's 1024px export |
| Data safety | **No data collected** — no permissions, no network, no SDKs |

Where the application id came from, why changing it forfeits the listing, the
Sentry/PostHog reduction, and telemetry's ADR status are the same on both platforms
— see [`apps/README.md#store-identity`](../README.md#store-identity).

## Before submitting — still outstanding

The signing and version-bump items are the same shape as
[`apps/README.md`](../README.md#store-identity) on both platforms. The Android
specifics:

1. **Signing** — see [Signing](#signing). Without the upload key, release builds
   are unsigned.
2. **Bump `versionCode`** on every upload. Play rejects any code it has already
   seen; the legacy app's highest was 86 (`0.2.0`), so this app starts at 87
   (`0.3.0`). 87 was built from `7e36a29c96` and released to internal testing on
   2026-11-03, then sent for Production review. The next upload must be 88 or higher.
   Play allows one draft per track: a leftover draft (73 sat in Production) greys
   out "Promote release" until it is discarded.
3. **A proper adaptive-icon foreground.** The current one insets the square 1024px
   icon into the safe zone over an approximated gradient, which works but has a
   faint seam. The right fix is a transparent-background lotus exported from
   `brand/assets/lotus.svg`.
4. **Confirm `targetSdk 36` is still current** — Play's target-API requirement is
   the actual deprecation pressure here.

## Store listing assets

Play's listing needs graphics that are not in the app bundle. Both were made
2026-11-03 from existing brand images, not drawn fresh:

- **512×512 icon** — the iOS `AppIcon.appiconset/logo.png` (full-bleed, no alpha)
  scaled down. Play rounds the corners itself, so the source must be a full square.
- **1024×500 feature graphic** — `brand/assets/readme/screenshot-youtube-channel-art.png`
  centre-cropped to 2.048:1 and scaled. The wordmark stays centred, so the crop
  keeps all of it.

`sips` cannot write from the agent sandbox (it uses the system temp dir); the
resizes were done with a few lines of Java run on Android Studio's bundled JDK.

**Metadata policy:** Play rejects a listing where any translation's short and full
descriptions are identical ("text spam"). Each translation needs a full
description that says more than the short one, or should be removed so that
language falls back to the default listing.

## Signing

Play App Signing is on: Google holds the key that signs what users install. We
hold only the **upload key**, which proves an upload came from us. Play rejects
any upload signed with a different key.

The upload key is `shabados-upload.jks`, alias `upload`, generated with `keytool`
and registered through Play Console's upload key reset in October 2026. It is not
the legacy Expo app's key: that one was never found in the `shabados` Expo
organization's credentials. Whoever holds the keystore and its password can
release. Keep it in a password manager, never in the repo (`*.jks` is gitignored).

**Custody.** The keystore and its password are held by @bhajneet and @harjot1singh.
To release, ask one of them for access.

To sign, add to `apps/android/local.properties`:

```
upload.storeFile=/absolute/path/to/shabados-upload.jks
upload.storePassword=…
upload.keyAlias=upload
upload.keyPassword=…
```

`app/build.gradle.kts` signs release builds with it when those keys are present.
Confirm with `keytool -printcert -jarfile app/build/outputs/bundle/release/app-release.aab`.
The SHA-1 must be `2E:FB:87:D0:5D:F2:76:77:E9:B8:70:79:9E:FA:91:10:01:69:8C:DE`, as
shown at Play Console → Protected with Play → Play Store protection → *Manage Play
app signing* → upload key certificate.

If the key is lost: generate a new one, export its certificate
(`keytool -export -rfc … -file upload_certificate.pem`), and use *Request upload
key reset* on that same page. Google approves it in a few days, and the new key
works from a date it states.

## Deliberately absent

- **Nothing of `packages/gurmukhi` beyond what the reader needs.** `Bani.kt` calls
  `isHeading`/`isMoolmantar`/`hasIkoankar`/`isColophon`, `vishraams`/`detect`/`remove`
  and `transcribe` through the generated `uniffi.gurmukhi` bindings; anything else the
  crate exposes is unused here so far. Building those bindings is a one-time local
  setup step (`mise run android` in `packages/gurmukhi`, see
  [`apps/README.md#packagesgurmukhi-in-the-apps`](../README.md#packagesgurmukhi-in-the-apps))
  — `jniLibs/` and `bindings/kotlin/lib/` are build outputs and are not committed, so a
  fresh clone must run it before Gradle will compile.
- **A shared core** — no session/search/navigation core on any platform yet
  ([ADR-0010](../../docs/architecture/decisions/0010-shared-core-across-platforms.md)
  Needs discussion; see [`apps/README.md`](../README.md#what-is-shared-and-how)).

## Reader size and pinch

Ported from iOS 2026-10-14
([display-controls.md](../../docs/requirements/display-controls.md#zoom)). The
rules are in `ReaderSize.kt`, which has no Android types, so `src/test` can pin them
on the JVM. `BaniReaderView.kt` only measures and draws.

- **Sizes are dp, drawn as-is.** Reading text is rendered with the font scale
  removed (`ReaderText`), so `.sp` equals dp. Android's font scale picks only
  the starting size, once, at first launch (`MainActivity`, via
  `ReaderSize.saveStartingSizeOnce`). The header and the Expand button are outside
  that wrapper and still follow the system setting.
- **Saved in SharedPreferences** (`ReaderPreferences.kt`), not DataStore, which
  would be a dependency for one float. The reader draws the saved size clamped to
  the device's range without rewriting it.
- **Tablet means `smallestScreenWidthDp >= 600`**, and gets the iPad maximum and
  starting size. Smallest width, so rotation and split screen do not change it.
- **The pinch moves in 1/6dp steps**, iOS's grid, about half a device pixel.
  Whole pixels (0.38dp) felt stepped on a Pixel (2026-10-14): a size step moves
  every glyph along the line in proportion, so a line's end jumps by far more than
  the step. 1/24 felt no smoother than 1/6 (2026-10-15) and costs four times the
  relayouts.
- **Reading text uses `TextMotion.Animated`** (`ReaderText`), so glyphs sit at their
  exact scaled positions. The default, `Static`, rounds them to whole pixels, which
  makes a pinch move text in jumps however fine the step. Always on, not only during
  a pinch, because switching on release could move line breaks under the anchor.
- **The row under the fingers holds still on every frame of the pinch** (2026-11-04),
  while the text resizes and re-wraps around it; nothing is corrected on release.
  Each size step asks the list to lay itself out from the anchor row, at the offset
  it had when the pinch began (`LazyListState.requestScrollToItem`, `Pinch.hold`), in
  the same pass that measures the rows at the new size. **Its top holds**, and the
  row grows downward from it, as in the Flutter spike that was judged smooth on
  device: holding the point under the fingers would need the row's new height before
  it is measured.
- **The request is made from composition** (a `SideEffect` on the new size), not from
  the pinch's handler. From the handler, a layout pass could run between the request
  and the recomposition carrying the new size, as one does in tests straight after a
  touch: the request was spent at the old size and the new one arrived a frame later
  without it. `GestureMatrixTest` caught this, reading the row frame by frame.
- **The anchor is between the fingers** (`Pinch.focus`), every finger down counted.
  Compose's `calculateCentroid` leaves out a finger in the event it lands, which
  anchored the pinch under the first finger.
- **At the top of the bani the list stays anchored at its top** (accepted by the
  author 2026-11-04): a pinch in there cannot hold a lower row, since the list does
  not leave space above its first row. Mid-bani the row under the fingers holds.
- **The pinch owns the gesture once a second finger lands.** It reads pointer
  events in the Initial pass and consumes them until every finger lifts. Otherwise
  the list scrolls under the pinch, and lifting the fingers counts as a tap on the
  row (seen on device 2026-10-14).
- **Taps keep the ripple; only the pinch anchor gets the toner wash**
  ([interaction.md](../../docs/interaction.md)).
- **One node per row carries every background** (`ReaderRow`): the card fill, the
  anchor's toner and the ripple, all clipped to one 12dp rounded shape. iOS draws its
  highlight bled outside the row, and doing that here left the ripple on the row's
  own square bounds, a different size and shape from the toner. So the text is inset
  instead: the list's side padding is 8dp short of the gutter and each row adds it
  back. Vertically a row reaches 6dp past its text (the gap it already owns) rather
  than iOS's 8, because two rows' tap targets cannot overlap.
- **The Keep Reading card's gradient reaches `toner` where the preview's veil ends**,
  and is solid below. Run on to the card's bottom edge, as on iOS, the veil's bottom
  showed as a faint rectangle inside the card.

**Not yet verified on a device.** The 17sp-in-dp column of
[tokens.md's Android table](../../packages/design/tokens.md#starting-size-on-android)
is interpolated from AOSP's font-scale tables, not measured.

## Reading shell

Built 2026-10-16 to match iOS's `ReaderShell.swift`
([reading-shell.md](../../docs/requirements/reading-shell.md)). The rules are in
`Shell.kt` (Compose state, no drawing), pinned by `ShellTest`; `ReaderShell.kt`
measures and draws.

- **The app opens to the viewer.** With nothing open it shows the default screen:
  ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, the pills (`DefaultScreenPills`, ids not in the corpus skipped), and
  `continue reading` when `ContinueReading` allows. The pills sit in a row when all
  fit and one above another otherwise (`RowOrColumn`), never a row that wraps
  partway, as iOS's `ViewThatFits`.
- **The open bani lives in process memory** (`Session` in `MainActivity.kt`), not
  saved instance state. Configuration changes keep it; process death is a new
  journey (decided 2026-10-16). The reader is keyed by an id new in each process:
  its scroll position is still `rememberSaveable`, which does outlive the process,
  and without the key a reader opened after a process death restored the old
  reader's scroll position.
- **`continue reading` is saved** (`lastReadId`, `lastReadAt` in the `reader`
  preferences): at opening, when a journey ends, and in `onStop`, since a process in
  the background can be killed without warning. Not on every touch. The idle
  boundary uses `elapsedRealtime`; when something was read uses the wall clock,
  which means the same thing after the process is gone. The time is the last
  activity, carried from one clock to the other.
- **Activity is any pointer event**, read in the Initial pass at the shell's root
  and never consumed, so tap, scroll, pinch and sidebar use all count. It writes a
  plain field, not state, so it recomposes nothing. A coroutine checks the idle
  boundary every 10s while composed, and `onStart` checks on return.
- **The sidebar's width is the screen's short side less the 72dp edge**
  (`Sidebar.travel`), so it is as wide in landscape as in portrait, and the
  tap-to-close edge covers all of the viewer left in view. The drag uses the same
  distance.
- **Controls and text are inset by the side safe area** (`sideSafeArea`, the sides
  of `WindowInsets.safeDrawing`): a camera cutout or a three-button navigation bar
  in landscape, nothing in portrait. The viewer and sidebar are drawn edge to edge,
  so without it the header's buttons, the reader's text and the sidebar's rows sat
  behind the cutout. The header and the reader take both sides, so the buttons stay
  level with the text; the sidebar takes the left, its right lying under the
  viewer. Backgrounds are not inset.
- **Everything the slide moves is read in `graphicsLayer` and draw blocks**, so a
  frame of the slide redraws without recomposing or laying out. **The sidebar is
  laid out at its full width throughout and only drawn scaled and faded**; nothing
  in it re-lays out as it reaches full size. On iOS, containers that laid out again
  made the rows jump and an extra row appear.
- **The viewer's corners come from `WindowInsets.getRoundedCorner`**, read when the
  outline is made (`DisplayCorners`), since the insets may not have arrived at first
  composition. It clips only while moved. A display without rounded corners reports
  none, and the viewer stays square there.
- **The drag** (`sidebarDrag`) reads the Initial pass so it sees a drag before the
  list or a row. It is judged once, at the platform touch slop: horizontal only if
  more sideways than up or down (45°, as on iOS, 2026-11-04) and towards a change. Once horizontal it consumes
  every event, so the list does not scroll and the row does not count a tap. A drag
  that starts inside `WindowInsets.systemGestures` is left to system Back; with
  three-button navigation those insets are 0 and a drag may start anywhere. A second
  finger ends it, and a drag already moving settles back. On release, the drag plus
  0.2s of its velocity decides open or closed.
- **System Back closes the sidebar** (`BackHandler`, enabled only while open). With
  it closed, Back is the system's, and leaves the app.
- **The haptic is `HapticFeedbackConstants.CONTEXT_CLICK`**, the platform's light
  tick, played only when `ShellState.setJourneys` reports that it opened the sidebar.
- **Whichever surface is covered has no semantics** (`clearAndSetSemantics`): the
  sidebar while closed, the viewer while aside, leaving its edge as the one target.
  Otherwise TalkBack, and `check-restore.ts`, find the sidebar's rows behind the
  reader.
- **The header has no background, and the content fades beneath it**
  (`fadingUnder`): the list draws into an offscreen layer and a `DstIn` gradient
  keeps a flat 8% of it down to 60% of the way through the status bar, then rises
  evenly from there to all of it at the header's bottom edge (chosen 2026-10-16). The sidebar's list fades
  the same way under its header. Material's top bars change colour and elevation
  rather than masking.
- **The app theme sets the content colour to the text colour** (`LocalContentColor`
  in `ShabadOSTheme`). Ripples and icons are drawn in it. A `Scaffold` or `Surface`
  would set it; the shell has neither, and Material's default is black, so in dark
  mode the header's icons and every tap's ripple were black on black.
- **Header icons are `R.drawable`**, `ic_journeys` (Material Symbol
  `conversion_path`) and `ic_controls` (Lucide `settings-2`), recorded in
  [icons.md](../../packages/design/icons.md#android-drawables). A missing drawable
  fails the build instead of drawing a blank button; `HeaderIconsTest` checks the
  names still match `AppIcons`. Icons are dp and do not follow Font size. Not
  `material-icons-extended`, a large artifact holding the older Material Icons
  rather than the Material Symbols icons.md names.
- **Interface text follows Font size**: Latin at `androidBodySize` sp, Gurmukhi at a
  ratio of it through `bodyTimes`, which multiplies after Body has become dp.
  Multiplying the sp would send a large size through Android's non-linear font
  scaling again, and it would grow less than the Body text beside it.
- **Tap a line scrolls by the row's measured offset** with a 0.5s
  `FastOutSlowInEasing` tween; `animateScrollToItem` takes no duration. The first
  row never scrolls (`TapScroll`).
- **No Material You dynamic colour** (decided 2026-10-16). The sidebar and the
  viewer's controls (the pills, `continue reading`, the title pill and a persistent
  circle behind each header button) are `backgroundBase`, the same token as iOS's
  sidebar; Material's `surfaceVariant` carries it (`Theme.kt`). Dynamic roles were
  tried for both (`surfaceContainerLow`, `surfaceContainerLowest`,
  `surfaceContainerHigh`, `secondaryContainer`) and set them apart from the rest of
  the app.
- **`rememberSaveable`, not `android:configChanges`.** `configChanges` only covers
  the changes it lists, so process death would still lose state. It also leaves the
  app to handle each listed change itself, including the tablet and size logic,
  which reads `resources.configuration`.
- **The open bani is held by id in process memory** (`ShellState.openId`, see
  [Reading shell](#reading-shell)) and looked up with `List<Bani>.withId`. An id the
  corpus no longer has shows the default screen; `OpenBaniTest` covers the lookup.
  Once journeys are stored, the open item comes back from the journey. The scroll
  position does not: journeys record the line tapped, not how far the reader
  scrolled, so the saved list state below stays.
- **Scroll restores through `rememberLazyListState`**, which needs two things. The
  rows must have stable keys (`ReaderItem.id`), and the expanded continuations must
  be restored in the same first composition, so the saved index points into the
  expanded list. After a rotation, the same row is at the top. Its offset within
  that row is pixels, so it can shift when lines rewrap at the new width.
  **Verified on a phone 2026-10-15**: the top line stays put through repeated
  rotations in any order, whether it was tapped or scrolled to. iOS passes the
  same test since 2026-10-15 ([ios/README.md](../ios/README.md#state-of-play)).
- **Release builds run R8** (2026-10-19), for its optimisation of Compose's code.
  Anything reached only by reflection needs a keep rule in `app/proguard-rules.pro`,
  or release crashes where debug does not: today JNA and `uniffi.gurmukhi`, which
  the gurmukhi bindings call through. After adding a dependency that uses
  reflection or JNI, run a release build on a phone through every screen.
- **Judge animation smoothness on a release build, never a debug one.** The tap
  scroll felt juddery in debug builds and smooth in release (Pixel 7a, 2026-10-19,
  R8 still off); changing its easing did not help. To check on a phone, sign the
  release APK with the debug key so it installs over a debug build:
  `apksigner sign --ks ~/.android/debug.keystore --ks-pass pass:android` on a copy
  of `app-release.apk`. Measure with `adb shell dumpsys gfxinfo com.shabados.app`
  (`reset` first).
- **Animations that run after the finger lifts ask for the high frame rate.** A
  Pixel 7a runs at 90Hz only while touched and at 60Hz otherwise, so the tap
  scroll requests `REQUESTED_FRAME_RATE_CATEGORY_HIGH` for its length
  (`BaniReaderView.tapLine`). The sidebar's settle animation does not yet.
- **Recreation must be cheap, because rotation waits for it.** Android starts the
  rotation only once the recreated activity has drawn its first frame. Parsing the
  corpus in `App()` held every rotation for 130–150 skipped frames on a phone
  (2026-10-15, `adb logcat -s Choreographer:I`), on the list and the reader alike.
  `Corpus.load` now parses once per process. Afterwards, rotations logged nothing:
  Choreographer reports only stalls of 30 frames or more. The cold launch still
  skips about 185. Measure with that same logcat line
  after any change to what `onCreate` or the first composition does.
- **Transient state stays plain `remember`**: the pinch anchor and its highlight,
  the live pinch size, the slide's position, and whether the Controls menu is open.
  Whether the sidebar is open is in `ShellState`, so it survives rotation.
- **The open bani, scroll position and expanded continuations last for recreation
  only, not launches.** A cold launch opens the default screen, and each bani opens
  with its continuations collapsed.
- **No Compose UI test of restoration yet.** `StateRestorationTester` could now run
  beside the [gesture tests](#gesture-tests), which brought in `ui-test-junit4` and
  Robolectric; nobody has written it. Checked by hand instead: with the
  reader scrolled partway, pauses toggled and a continuation expanded, (1) rotate
  both ways, (2) toggle dark theme, (3) change Font size, (4) with Developer options
  > "Don't keep activities" on, switch away and back, (5) `adb shell am kill
  com.shabados.app` while in the background, then reopen from Recents. All five
  passed on a phone 2026-10-15; step 5 now expects the default screen with
  `continue reading`. **Scripted** as
  `bun apps/android/scripts/check-restore.ts`, which drives an attached device
  through adb alone and puts every setting back. Run it when a change touches the
  reader's state, the activity, or the first composition, not on every commit. It
  does not judge how quickly the screen rotates. It opens banis from the Journeys
  sidebar by their Gurmukhi names, and keeps the screen on for its run: a 30s screen
  timeout put a phone to sleep partway through. 11/11 on a Pixel 7a 2026-10-16. **Out
  of date since 2026-10-19:** it reads and sets Pauses and Latin through the reader's
  stand-in Controls menu, which the Controls sidebar replaced; those steps need
  rewriting against the sidebar's switches before it is run again.
- **Leave with Home or Back.** With the sidebar closed, Back leaves the app, which
  moves it to the background rather than finishing it.
- **Start the app from its icon before testing a return through the icon.**
  `apps/build.sh --run` launches with `am start -n`, which is not the intent the
  home-screen icon sends. In a task started that way, tapping the icon started a
  fresh activity on top, while Recents restored correctly. Swipe
  the app away and open it from the icon first, and the icon restores too. Play
  installs are opened from the icon, so users never see this.
- **Swiping the app away in Recents ends the process**, so it opens to the default
  screen, with `continue reading` as after any process death.

## Gesture tests

`GestureMatrixTest` (2026-11-04) drives real touches through the shell's own pointer
handling (`sidebarDrag`, the reader's pinch, each row's `clickable`): swipes, scrolls,
45° drags, pinches, a second finger joining a swipe, long presses, taps straight
after a swipe, and taps where the hidden sidebar would be. One test per cell of the
gesture matrix, ported from the Flutter spike's `test/gesture_matrix_test.dart`.
"Nothing else happened" is read from `ShellState`, `ReaderControls.size` and where
rows sit on screen. The pinch tests read the anchor row on every frame.

- **Robolectric, on the JVM**, in `testDebugUnitTest` with the other tests: chosen by
  the author over instrumented tests so they run on every build with no device. If
  Robolectric is abandoned, the file moves to `src/androidTest` unchanged.
- **Robolectric's Android 16 jar is a pinned Gradle dependency**
  (`robolectricAndroidAll` in `libs.versions.toml`), handed to Robolectric in offline
  mode, so `--offline` builds keep working. When updating `robolectric`, take the SDK
  36 jar its release names. The test JVM opens `java.base/jdk.internal.access`, which
  Robolectric's Android 16 needs on JDK 17 and later.
- **Native graphics** (`@GraphicsMode(NATIVE)`), so text is measured with real
  metrics and re-wraps as on a phone. The stand-in default measures every row alike.
- **A library built in the test**, not `banis.json`: parsing calls packages/gurmukhi
  through JNA, whose native library is built for Android only. Pronunciations stay
  off for the same reason.
- **Not covered**: how a flick or a pinch feels, and edge Back. Robolectric reports no
  `systemGestures` insets, so every drag starts "inside the content", as with
  three-button navigation.
- **One cell fails today and is `@Ignore`d**: a long press on a line taps it on lift.
  Rows have no long-press action; left as built for now (2026-11-04).
- **Two the matrix found, fixed 2026-11-04**: with Controls open, a swipe from the
  viewer's edge or the Settings row did not close it, because `sidebarDrag` gave up
  on a touch whose press a tappable child had consumed; it now gives up only when
  the movement is consumed, as a slider's is. And a vertical drag along the viewer's
  edge closed the sidebar, because `clickable` counts any press that lifts inside
  it as a tap; the edge is now a tap only within the touch slop.

## Content

`app/src/main/assets/banis.json` is generated — regenerate with
`bun run database:export-bundled` from `database/`. Never hand-edit it; scripture
corrections go through the database component's citation-backed review.

Font version, licensing, and the rest of what's bundled and why:
[`apps/README.md#generators`](../README.md#generators).

## Status

Gradle sync **succeeds** (2026-09-01, Android Studio Quail, AGP 9.2.1 + Gradle
9.4.1). `gradlew` and the wrapper jar are generated and checked in, so
`./apps/build.sh android --run` works without Android Studio.

Not yet confirmed: that the APK assembles and runs on the emulator. Sync validates
configuration and compiles nothing.

**Two Android Studio suggestions are deliberately declined.** Do not action them
without reading this first:

- **AGP Upgrade Assistant.** Upgrading AGP requires updating `kotlin` in
  `libs.versions.toml` to whatever Kotlin the new AGP embeds (read
  `kotlin-gradle-plugin` from its POM), because that value is the Compose compiler
  plugin version. The Assistant does not know this and will leave the catalog
  inconsistent. There is also no benefit here: this project exists to keep the
  store listings current, not to track AGP.
- **Migrate to Gradle Daemon toolchain.** Reasonable in principle — Studio and
  `apps/build.sh` both run Gradle, and this stops them spawning separate daemons.
  Deferred because both already use Studio's bundled JBR, so it fixes nothing today
  while adding toolchain criteria and a possible JVM download.

## Versions: inferred where possible, pinned where it matters

`compileSdk` is **not hardcoded**. `app/build.gradle.kts` reads the SDK path from
`local.properties`/`ANDROID_HOME` and picks the newest installed platform, so the
project builds on any machine and survives an SDK update without an edit. This
matters because minor SDK releases exist: the platform here is `android-36.1`, and a
literal `compileSdk = 36` resolves to `platforms/android-36`, which is not installed.

`targetSdk` **is** pinned. It changes runtime behaviour, so inferring it would make
the shipped APK depend on which machine built it.

Jetpack Compose and Material 3, declared through a version catalog
(`gradle/libs.versions.toml`) — the layout Android Studio's wizard generates and
what [developer.android.com/develop/ui](https://developer.android.com/develop/ui)
recommends.

**No `kotlin-android` plugin.** AGP 9 has Kotlin built in and rejects it outright;
`org.jetbrains.kotlin.plugin.compose` is the only Kotlin plugin applied.

**`libs.versions.toml`'s `kotlin` must equal the Kotlin that AGP embeds**, not the
latest release. AGP 9.2.1's POM depends on `kotlin-gradle-plugin:2.2.10`, so the
Compose compiler plugin is pinned to 2.2.10 and the Compose BOM is from the same era
(2025.10.01). Bumping `kotlin` past AGP's own is a compile-time failure.

JSON is parsed with `org.json` from the platform rather than kotlinx-serialization,
which would add a dependency and a second Kotlin-versioned plugin for about twenty
lines of parsing.

**AGP declares a minimum Gradle version, and enforces it.** AGP 9.2.1 requires
Gradle **≥ 9.4.1**, which is what `gradle/wrapper/gradle-wrapper.properties` pins.
Android Studio installed 9.3.0 by default, which no AGP 9.x accepts.

Do not try to infer this from the jars. Checking whether an AGP release references
newer Gradle APIs (`org/gradle/features/binding/*`) looks like it should answer the
question and does not — AGP compares version numbers and refuses regardless. When
changing `agp` in the catalog, let the sync report the minimum.

The Gradle wrapper **is** checked in, pinned to 9.4.1. `apps/build.sh` prefers it
and falls back to system `gradle` only if it goes missing.
