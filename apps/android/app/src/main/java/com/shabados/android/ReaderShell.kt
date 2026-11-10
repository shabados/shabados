package com.shabados.android

import androidx.compose.runtime.saveable.rememberSaveable
import kotlin.math.abs
import android.view.HapticFeedbackConstants
import android.view.RoundedCorner
import android.view.View
import androidx.activity.compose.BackHandler
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.ui.semantics.Role
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.waitForUpOrCancellation
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.statusBarsIgnoringVisibility
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.systemGestures
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonColors
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.RoundRect
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.drawOutline
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.PointerEventPass
import androidx.compose.ui.input.pointer.PointerInputScope
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.input.pointer.util.VelocityTracker
import androidx.compose.ui.input.pointer.util.addPointerInputChange
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.runtime.DisposableEffect
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.onClick
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

/** The viewer's header height: a Material top app bar's, so the sidebar's name sits
 * level with the viewer's Journeys button beside it. */
internal val HeaderHeight = 64.dp

/** A sidebar header title's size: Material's `titleLarge`, 22sp, growing with Font
 * size up to [HeaderTitleMax] and no further, so a header reads as a fixed mark
 * rather than text that reflows. Uncapped, `Shabad OS` broke onto two lines at large
 * Font sizes (2026-10-22). iOS pins these titles at the default size instead
 * (`BarMetrics.typeSize`); Android lets them grow this far. */
internal val HeaderTitleSize = 22.sp
internal val HeaderTitleMax = 28.dp

@Composable
internal fun headerTitleSize(): TextUnit =
  with(LocalDensity.current) { minOf(HeaderTitleSize.toDp(), HeaderTitleMax).toSp() }

/** The space on each side of the sidebar's content: one left edge for the logo, the
 * section label and every row's text (chosen on iOS 2026-10-16). */
internal val SidebarInset = 30.dp

/** How often the open app checks the idle boundary, so a journey ends within this
 * long of reaching it. Returning to the app checks at once (MainActivity.onStart). */
private const val IDLE_CHECK_MS = 10_000L

/** Opening and closing: a spring without bounce, close to iOS's `.smooth`. */
private val SlideSpec = spring<Float>(dampingRatio = Spring.DampingRatioNoBouncy, stiffness = Spring.StiffnessMediumLow)

/**
 * Interface text: the system's Body size (tokens.md#type), with [ANDROID_BODY_SIZE]
 * sp standing in for Body. Latin is set at it directly; Gurmukhi through [bodyTimes].
 */
val BodySize: TextUnit = DesignTokens.ANDROID_BODY_SIZE.sp

/**
 * [ratio] × the system's Body size, for Gurmukhi interface text
 * (packages/design/tokens.md#type). Multiplied in dp, after the person's Font size
 * has turned Body into dp, then handed back as sp, so it is exactly [ratio] × the
 * Body text beside it. Multiplying the sp instead would put a large size through
 * Android's non-linear font scaling a second time, and it would grow less than Body.
 */
@Composable
fun bodyTimes(ratio: Float): TextUnit =
  with(LocalDensity.current) { (BodySize.toDp() * ratio).toSp() }

/**
 * Content passing under a header fades rather than being cut: a hard edge through
 * the sirlekh reads as a rendering fault (docs/interaction.md, "The fading header";
 * reading-shell.md#header). Material's top bars change colour and elevation rather
 * than masking, so it is hand-built: the content is drawn into its own layer and
 * kept only as far as a gradient allows: a flat [FADE_TOP_ALPHA] down to
 * [FADE_START] of the way through the status bar ([statusBar] tall), then rising
 * evenly to full at [to], the header's bottom edge.
 */
fun Modifier.fadingUnder(statusBar: Dp, to: Dp): Modifier =
  graphicsLayer { compositingStrategy = CompositingStrategy.Offscreen }
    .drawWithContent {
      drawContent()
      drawRect(
        Brush.verticalGradient(
          listOf(Color.Black.copy(alpha = FADE_TOP_ALPHA), Color.Black),
          // Above startY the gradient's first colour holds: a flat FADE_TOP_ALPHA.
          startY = (statusBar * FADE_START).toPx(),
          endY = to.toPx(),
        ),
        blendMode = BlendMode.DstIn,
      )
    }

/** How much of the content shows at the top of the screen, behind the status bar:
 * faint enough that the clock and icons read over Gurmukhi, present enough that the
 * text visibly continues under them (chosen 2026-10-16). */
private const val FADE_TOP_ALPHA = 0.08f

/** How far through the status bar the content starts coming back, as a fraction of
 * its height: the rise begins behind its lower part rather than at its edge, so it
 * is already under way where the header starts (chosen 2026-10-16). */
private const val FADE_START = 0.6f

/**
 * The viewer's header: the Journeys button at the left, the title in a centred pill,
 * [actions] at the right. **No background**: the text scrolls up beneath it.
 * In the reader with no fade, and the header hides as the
 * reader scrolls onward (`ReaderBars`); the Journeys sidebar's header still fades
 * ([fadingUnder]). One Journeys icon in both states
 * (docs/requirements/reading-shell.md#getting-between-them).
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ViewerHeader(title: String?, onJourneys: () -> Unit, actions: @Composable RowScope.() -> Unit = {}) {
  Box(
    modifier = Modifier
      .fillMaxWidth()
      // As if the status bar were showing, so it does not move when the reader
      // hides it (`ReaderBars`).
      .padding(top = WindowInsets.statusBarsIgnoringVisibility.topDp())
      .height(HeaderHeight)
      // Clear of a camera cutout or navigation bar at the sides in landscape, as
      // the reader's text is (`sideSafeArea`).
      .windowInsetsPadding(sideSafeArea)
      // 12dp, then the icon button's own 4dp around its 40dp circle: the circles sit
      // 16dp inside the safe area, on the reader's text gutter, so they line up
      // with the text below them (chosen 2026-10-16).
      .padding(horizontal = 12.dp),
  ) {
    // R.drawable rather than AppIcons' string: a missing drawable is a compile
    // error, not a blank button. HeaderIconsTest checks the names agree.
    IconButton(
      onClick = onJourneys,
      colors = chromeIconButtonColors(),
      modifier = Modifier.align(Alignment.CenterStart),
    ) {
      Icon(painterResource(R.drawable.ic_journeys), contentDescription = "Journeys")
    }
    if (title != null) {
      // The title is a control (reading-shell.md#the-viewer), so it is drawn as one.
      // The actions that hang off it do not exist yet, so it does nothing.
      Text(
        text = title,
        fontSize = BodySize,
        fontWeight = FontWeight.SemiBold,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
        color = MaterialTheme.colorScheme.onBackground,
        modifier = Modifier
          .align(Alignment.Center)
          // Clear of the buttons on both sides (12dp padding + a 48dp button), so
          // a long title ellipsises rather than running under them.
          .padding(horizontal = 60.dp)
          .clip(CircleShape)
          .background(chromeColor())
          .padding(horizontal = 16.dp, vertical = 8.dp),
      )
    }
    Row(modifier = Modifier.align(Alignment.CenterEnd), content = actions)
  }
}

/**
 * The display's unsafe areas at the sides: a camera cutout, or a three-button
 * navigation bar, in landscape; nothing in portrait. The viewer and the sidebar are
 * drawn edge to edge, so their controls and text are inset by this; the backgrounds
 * are not.
 */
val sideSafeArea: WindowInsets
  @Composable get() = WindowInsets.safeDrawing.only(WindowInsetsSides.Horizontal)

/** The status bar's height, as top padding. */
@Composable
internal fun WindowInsets.topDp(): Dp = with(LocalDensity.current) { getTop(this).toDp() }

/** Where the viewer's content starts: below the status bar and the header. Content
 * scrolls up into this space and fades there. Measured as if the status bar were
 * showing, so the reader does not move when it hides (`ReaderBars`). */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun viewerContentTop(): Dp = WindowInsets.statusBarsIgnoringVisibility.topDp() + HeaderHeight

/**
 * The app: the viewer, lying over the Journeys sidebar on its left. "The viewer is
 * the app" (docs/requirements/reading-shell.md): it is what the app opens to, and the
 * sidebar is not a destination of its own.
 *
 * **Controls is a bottom sheet, not a
 * sidebar.** Material's modal sheet ([ModalBottomSheet]), with its default dim
 * (chosen 2026-11-09): Android's usual container for options opened from a button.
 * A slider's change still shows on the reader behind the dim. A tap on the reader
 * closes the sheet and goes no further, as a tap outside the iOS popover does; so
 * do Back and a drag down. The standard sheet, tried first, left the reader live
 * beneath it and so never closed on a tap there.
 *
 * **The modal sheet is a window of its own**, above this one, so Settings, drawn in
 * this window, would open beneath it: its `Settings` row closes Controls first, then
 * opens Settings, as on iOS. Only Journeys slides.
 *
 * **Opening Journeys slides the viewer aside** to show the sidebar beneath it,
 * leaving at least [Sidebar.PEEK_DP] of the viewer's inner edge in view, faded
 * towards the background; more in landscape, since the sidebar keeps its portrait
 * width ([Sidebar.travel]). Tapping that edge, Journeys button included, returns to the viewer, as
 * does system Back. The sidebar does not move: it fades in and grows to full size as
 * the viewer moves away ([Sidebar.strength], [Sidebar.scale]).
 *
 * Everything that follows the slide is read inside `graphicsLayer` and draw blocks,
 * so a frame of the slide redraws and never recomposes or re-lays out.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReaderShell(shell: ShellState, readerKey: Any, banis: List<Bani>, controls: ReaderControls) {
  val view = LocalView.current
  val assets = LocalContext.current.assets
  // Interface Gurmukhi is at weightPrimary (packages/design/tokens.md#type).
  val gurmukhi = remember(assets) { gurmukhiFont(assets, DesignTokens.WEIGHT_PRIMARY.roundToInt()) }
  val density = LocalDensity.current
  val scope = rememberCoroutineScope()
  /** Settled position, as [Sidebar.base]: 0 with the viewer over Journeys, 1 aside. */
  val slide = remember { Animatable(Sidebar.base(shell.openSide)) }
  /** Where a drag has moved the viewer to; null when no drag is moving it. */
  var dragProgress by remember { mutableStateOf<Float?>(null) }
  /** Settings, as a sheet over everything (reading-shell.md#settings). */
  var settingsShown by rememberSaveable { mutableStateOf(false) }
  fun progress() = dragProgress ?: slide.value
  /** The reader's header and the status bar, hidden while reading onward. */
  val bars = remember { ReaderBars(scope) }
  StatusBarFollows(bars) { shell.openId != null && shell.openSide == null }

  /** Whether Controls' sheet is in the composition: from opening until its closing
   * animation has finished. Shown at its contents' height, never half. */
  var controlsShown by rememberSaveable { mutableStateOf(false) }
  val sheet = rememberModalBottomSheetState(skipPartiallyExpanded = true)

  /** Opens Controls, or closes it with the sheet's own animation, then runs
   * [afterClose]. */
  fun showControls(show: Boolean, afterClose: () -> Unit = {}) {
    shell.touch()
    if (show) {
      controlsShown = true
      return
    }
    scope.launch { sheet.hide() }.invokeOnCompletion {
      if (!sheet.isVisible) {
        controlsShown = false
        afterClose()
      }
    }
  }

  fun setSide(side: Side?) {
    // Opening Journeys closes Controls, which would otherwise stay over the moved
    // viewer.
    if (side != null && controlsShown) showControls(false)
    // Back from Journeys, whatever is opened there, the bars are showing.
    if (side != null) bars.reset()
    // On opening only (docs/interaction.md, chosen 2026-10-16). CONTEXT_CLICK is
    // the platform's light tick.
    if (shell.setSide(side)) view.performHapticFeedback(HapticFeedbackConstants.CONTEXT_CLICK)
    scope.launch {
      dragProgress?.let { slide.snapTo(it) }
      dragProgress = null
      slide.animateTo(Sidebar.base(side), SlideSpec)
    }
  }

  /** A header button: opens its sidebar, or closes it if it is open. */
  fun toggle(side: Side) = setSide(if (shell.openSide == side) null else side)

  /** A long press on the viewer's Controls button: Settings, straight from the
   * viewer, and back to it on closing (reading-shell.md#settings). */
  fun openSettingsFromViewer() {
    settingsShown = true
  }

  fun open(bani: Bani) {
    bars.reset()
    shell.open(bani.id)
    scope.launch { slide.animateTo(0f, SlideSpec) }
  }

  fun resume() {
    bars.reset()
    shell.resume()
    scope.launch { slide.animateTo(0f, SlideSpec) }
  }

  BackHandler(enabled = shell.handlesBack) { setSide(null) }


  // Held awake while content is read (`ShellState.keepsScreenOn`). The flag is the
  // window's, so it applies only while the app is in front; released on leaving.
  val keepsScreenOn = shell.keepsScreenOn
  DisposableEffect(keepsScreenOn) {
    view.keepScreenOn = keepsScreenOn
    onDispose { view.keepScreenOn = false }
  }

  LaunchedEffect(Unit) {
    while (true) {
      delay(IDLE_CHECK_MS)
      shell.refresh()
    }
  }

  val gestureEdges = WindowInsets.systemGestures
  val leftEdge = gestureEdges.getLeft(density, LayoutDirection.Ltr).toFloat()
  val rightEdge = gestureEdges.getRight(density, LayoutDirection.Ltr).toFloat()
  // The Journeys panel is padded clear of the inset on its outer side, the left, so
  // its width adds it back (`Sidebar.travel`).
  val leftInset = sideSafeArea.getLeft(density, LayoutDirection.Ltr).toFloat()

  Box(Modifier.fillMaxSize()) {
    BoxWithConstraints(
      modifier = Modifier
        .fillMaxSize()
        // Any touch is activity for the idle boundary. The Initial pass and nothing
        // consumed, so it sees everything and changes nothing.
        .pointerInput(Unit) {
          awaitPointerEventScope {
            while (true) {
              awaitPointerEvent(PointerEventPass.Initial)
              shell.touch()
            }
          }
        }
        .pointerInput(leftEdge, rightEdge, leftInset) {
          sidebarDrag(
            shell = shell,
            leftEdge = leftEdge,
            rightEdge = rightEdge,
            leftInset = leftInset,
            settingsShown = { settingsShown },
            onMove = { dragProgress = it },
            onSettle = ::setSide,
          )
        },
    ) {
      val travelJDp = Sidebar.travel(maxWidth.value, maxHeight.value, Sidebar.PEEK_DP, with(density) { leftInset.toDp() }.value).dp
      val travelJPx = with(density) { travelJDp.toPx() }

      // Beneath: the sidebar, on `backgroundBase` across the whole screen
      // (Material's `surfaceVariant`, Theme.kt), so it reads as a surface apart from
      // the page-coloured viewer: packages/design/tokens.md, "Where the two
      // backgrounds are used". The same token as on iOS (decided 2026-10-16).
      Box(
        Modifier
          .fillMaxSize()
          .background(MaterialTheme.colorScheme.surfaceVariant),
      ) {
        JourneysPanel(
          banis = banis,
          readingId = shell.openId,
          gurmukhi = gurmukhi,
          onOpen = ::open,
          modifier = Modifier
            // As wide as the viewer leaves uncovered, so nothing in it sits under
            // the peek.
            .width(travelJDp)
            .fillMaxHeight()
            // Covered by the viewer while closed, so out of reach of TalkBack too.
            .then(if (shell.openSide == Side.JOURNEYS) Modifier else Modifier.clearAndSetSemantics {})
            // **Laid out at full size throughout; only its drawing is scaled and
            // faded.** Nothing inside re-lays out as the scale changes, so reaching
            // full size is only the scale reaching 1. On iOS a re-layout here made
            // the rows jump and an extra row appear (apps/ios/README.md). Grows
            // outward from its right edge: up, down and to the left.
            .graphicsLayer {
              // Only the sidebar the viewer is moving away from shows.
              val p = progress()
              alpha = if (p < 0f) 0f else Sidebar.strength(p)
              scaleX = Sidebar.scale(p.coerceAtLeast(0f))
              scaleY = scaleX
              transformOrigin = TransformOrigin(1f, 0.5f)
            },
        )
      }

      val background = MaterialTheme.colorScheme.background
      val hairline = MaterialTheme.colorScheme.onBackground
      val corners = remember(view) { DisplayCorners(view) }
      Box(
        modifier = Modifier
          .fillMaxSize()
          .graphicsLayer {
            val p = progress()
            translationX = travelJPx * p
            // The display's own corners, so the moving viewer reads as the screen
            // itself slid aside. At rest the display's corners already hide it.
            shape = corners
            clip = p != 0f
            shadowElevation = 24.dp.toPx() * abs(p)
          }
          .background(background)
          // While aside, only its edge is a target (the Box below), for TalkBack too.
          .then(if (shell.openSide != null) Modifier.clearAndSetSemantics {} else Modifier)
          .drawWithContent {
            drawContent()
            val p = abs(progress())
            if (p > 0f) {
              // Faded towards the background, so the edge reads as set aside.
              drawRect(background.copy(alpha = 0.6f * p))
              // A hairline along the edge, so it reads as a card's edge and not
              // only a shadow's.
              drawOutline(
                corners.createOutline(size, layoutDirection, this),
                hairline.copy(alpha = 0.08f * p),
                style = Stroke(width = 0.5.dp.toPx()),
              )
            }
          },
      ) {
        val bani = banis.withId(shell.openId)
        if (bani == null) {
          DefaultScreen(
            pills = DefaultScreenPills.of(banis),
            continueWith = banis.withId(shell.previousId),
            gurmukhi = gurmukhi,
            onOpen = ::open,
            onContinue = ::resume,
            onJourneys = { toggle(Side.JOURNEYS) },
            onControls = { showControls(!controlsShown) },
            onSettings = ::openSettingsFromViewer,
          )
        } else {
          // A different bani is a new reader, and so is the same bani in a new
          // process: [readerKey] is new each process, so saved scroll state from
          // before a process death is never restored into a later reader.
          key(readerKey, bani.id) {
            BaniReader(
              bani,
              controls = controls,
              startLine = shell.startLine,
              onTopLine = { shell.readingLine = it },
              onJourneys = { toggle(Side.JOURNEYS) },
              onControls = { showControls(!controlsShown) },
              onSettings = ::openSettingsFromViewer,
              bars = bars,
            )
          }
        }
      }

      // While open, the visible edge, its header button included, is one target that
      // returns to the viewer. No ripple: the slide is the feedback.
      //
      // **A tap only if the finger stayed within the touch slop**, not `clickable`,
      // which counts any press that lifts inside its bounds however far it moved: a
      // vertical drag along this full-height strip closed the sidebar (2026-11-04).
      // Nor does it consume the down, so a sideways drag from here is still the
      // sidebar's (`sidebarDrag`). TalkBack keeps the click.
      val openSide = shell.openSide
      if (openSide != null && dragProgress == null) {
        val journeys = openSide == Side.JOURNEYS
        Box(
          modifier = Modifier
            .align(if (journeys) Alignment.CenterEnd else Alignment.CenterStart)
            // All of the viewer still in view: the peek in portrait, more in landscape.
            .width(maxWidth - travelJDp)
            .fillMaxHeight()
            .semantics {
              contentDescription = if (journeys) "Journeys" else "Controls"
              onClick { setSide(null); true }
            }
            .pointerInput(Unit) {
              awaitEachGesture {
                val down = awaitFirstDown(requireUnconsumed = false)
                val up = waitForUpOrCancellation() ?: return@awaitEachGesture
                if ((up.position - down.position).getDistance() < viewConfiguration.touchSlop) setSide(null)
              }
            },
        )
      }

    }
    if (controlsShown) {
      ModalBottomSheet(
        onDismissRequest = { controlsShown = false },
        sheetState = sheet,
        // `backgroundBase`, as the Journeys sidebar (Theme.kt).
        containerColor = MaterialTheme.colorScheme.surfaceVariant,
        // The panel keeps clear of the navigation bar and the sides itself.
        contentWindowInsets = { WindowInsets(0) },
      ) {
        ControlsPanel(
          controls = controls,
          onSettings = { showControls(false) { settingsShown = true } },
          modifier = Modifier.fillMaxWidth(),
        )
      }
    }
    // Over the viewer, last. Closed by its ✕ or by Back, back to the viewer.
    SettingsScreen(shown = settingsShown, controls = controls, onDismiss = { settingsShown = false })
  }
}

/**
 * Moves the viewer with a one-finger drag. **Only a mostly horizontal drag towards a
 * change counts** ([Sidebar.judge]), **it must start inside the content**
 * ([Sidebar.startsInContent]; the edges are system Back's), and **a pinch is never a
 * drag**: a second finger ends it, and a drag already moving the viewer settles back.
 *
 * Read in the Initial pass so it sees the drag before the list or a row does; once
 * judged horizontal, every event is consumed, so the list does not scroll and the
 * row under the finger does not count a tap. Until then nothing is consumed.
 */
private suspend fun PointerInputScope.sidebarDrag(
  shell: ShellState,
  leftEdge: Float,
  rightEdge: Float,
  leftInset: Float,
  settingsShown: () -> Boolean,
  onMove: (progress: Float) -> Unit,
  onSettle: (open: Side?) -> Unit,
) {
  val decision = viewConfiguration.touchSlop
  awaitEachGesture {
    val down = awaitFirstDown(requireUnconsumed = false, pass = PointerEventPass.Initial)
    // Settings lies over the shell in the same window; its drags are its own.
    if (settingsShown()) return@awaitEachGesture
    if (!Sidebar.startsInContent(down.position.x, size.width.toFloat(), leftEdge, rightEdge)) return@awaitEachGesture
    // Per gesture, so a window resized without recreating (split screen) is used
    // at its new width.
    val peek = Sidebar.PEEK_DP.dp.toPx()
    val journeys = Sidebar.travel(size.width.toFloat(), size.height.toFloat(), peek, leftInset)
    val wasOpen = shell.openSide
    val velocity = VelocityTracker().apply { addPointerInputChange(down) }
    var axis: Sidebar.Axis? = null
    while (true) {
      val event = awaitPointerEvent(PointerEventPass.Initial)
      if (event.changes.count { it.pressed } > 1) {
        if (axis == Sidebar.Axis.HORIZONTAL) onSettle(wasOpen)
        return@awaitEachGesture
      }
      val change = event.changes.firstOrNull { it.id == down.id } ?: return@awaitEachGesture
      val dx = change.position.x - down.position.x
      val dy = change.position.y - down.position.y
      if (axis == null) {
        axis = Sidebar.judge(dx, dy, decision, wasOpen)
      }
      when (axis) {
        Sidebar.Axis.OTHER -> return@awaitEachGesture
        Sidebar.Axis.HORIZONTAL -> {
          event.changes.forEach { it.consume() }
          velocity.addPointerInputChange(change)
          if (!change.pressed) {
            onSettle(Sidebar.settle(wasOpen, dx, velocity.calculateVelocity().x, journeys))
            return@awaitEachGesture
          }
          onMove(Sidebar.progress(wasOpen, dx, journeys))
        }
        null -> {
          velocity.addPointerInputChange(change)
          if (!change.pressed) return@awaitEachGesture
        }
      }
    }
  }
}

/**
 * The display's own corner radii, read from the window
 * (`WindowInsets.getRoundedCorner`, API 31; minSdk is 36). A display without
 * rounded corners reports none, and the viewer is square there too. Read when the
 * outline is made, once the view is attached, rather than in composition, where the
 * insets may not have arrived yet.
 */
private class DisplayCorners(private val view: View) : Shape {
  override fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline {
    val insets = view.rootWindowInsets
    fun radius(position: Int) = CornerRadius(insets?.getRoundedCorner(position)?.radius?.toFloat() ?: 0f)
    return Outline.Rounded(
      RoundRect(
        left = 0f,
        top = 0f,
        right = size.width,
        bottom = size.height,
        topLeftCornerRadius = radius(RoundedCorner.POSITION_TOP_LEFT),
        topRightCornerRadius = radius(RoundedCorner.POSITION_TOP_RIGHT),
        bottomRightCornerRadius = radius(RoundedCorner.POSITION_BOTTOM_RIGHT),
        bottomLeftCornerRadius = radius(RoundedCorner.POSITION_BOTTOM_LEFT),
      )
    )
  }
}

/**
 * Behind every control on the viewer: the default screen's pills and `continue
 * reading`, the title pill, and a circle behind each header button.
 * `backgroundBase` (Material's `surfaceVariant`, Theme.kt), as the sidebar is. **Not
 * Material You's dynamic colour** (decided 2026-10-16): a wallpaper tint set the
 * controls apart from the text they sit among.
 */
@Composable
fun chromeColor(): Color = MaterialTheme.colorScheme.surfaceVariant

/** The viewer header's Controls button. One icon whether or not Controls is open
 * (docs/requirements/reading-shell.md#controls). R.drawable, for the
 * same reason as the Journeys button's.
 *
 * **A long press opens Settings** ([onLongClick]; reading-shell.md#settings). Drawn
 * as the header's [IconButton]s are — a 40dp circle in a 48dp target — because
 * `IconButton` takes no long click. TalkBack offers the long press as "Settings",
 * and a held D-pad select is the same long click. */
@Composable
fun ControlsButton(onClick: () -> Unit, onLongClick: () -> Unit) {
  val view = LocalView.current
  Box(
    contentAlignment = Alignment.Center,
    modifier = Modifier
      .minimumInteractiveComponentSize()
      .size(40.dp)
      .clip(CircleShape)
      .background(chromeColor())
      .combinedClickable(
        role = Role.Button,
        onLongClickLabel = "Settings",
        onLongClick = {
          view.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS)
          onLongClick()
        },
        onClick = onClick,
      ),
  ) {
    Icon(painterResource(R.drawable.ic_controls), contentDescription = "Controls")
  }
}

/** The header's icon buttons, with a persistent circle of [chromeColor] behind
 * them. The icon keeps the text colour the header sets. */
@Composable
fun chromeIconButtonColors(): IconButtonColors =
  IconButtonDefaults.iconButtonColors(containerColor = chromeColor(), contentColor = LocalContentColor.current)

/**
 * A stand-in for the Journeys sidebar (docs/requirements/reading-shell.md#the-journeys-sidebar),
 * which needs journeys, pins and the Library, none of which exist yet. It has the
 * specified header; the bani list stands in for the rest and goes when they land.
 * `New journey` is left out until that band is designed. **No toggle of its own**:
 * the viewer's Journeys button stays in view on the viewer's edge.
 */
@Composable
private fun JourneysPanel(
  banis: List<Bani>,
  readingId: String?,
  gurmukhi: FontFamily,
  onOpen: (Bani) -> Unit,
  modifier: Modifier,
) {
  val top = WindowInsets.statusBars.topDp()
  val bottom = with(LocalDensity.current) { WindowInsets.navigationBars.getBottom(this).toDp() }
  val colors = MaterialTheme.colorScheme
  // The toner wash, blended from the sidebar's own colour rather than the page's.
  val toner = wash(colors.surfaceVariant, colors.onSurface, DesignTokens.TONER_OPACITY)
  // Clear of a camera cutout, or a navigation bar, on its left in landscape: the
  // sidebar is drawn edge to edge, so its inset alone would put the logo and rows
  // behind it (seen on a Pixel 7a, 2026-10-16). Left only: its right side lies
  // under the viewer's edge.
  Box(modifier.windowInsetsPadding(sideSafeArea.only(WindowInsetsSides.Left))) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        // The list fades under the header rather than being cut
        // (reading-shell.md#header).
        .fadingUnder(statusBar = top, to = top + HeaderHeight)
        .verticalScroll(rememberScrollState())
        .padding(top = top + HeaderHeight + 12.dp, bottom = bottom + 12.dp),
    ) {
      Text(
        text = stringResource(R.string.nitnem),
        // A section label, as Settings' `Pronunciations` is (2026-10-22).
        fontSize = bodyTimes(0.88f),
        color = colors.onSurfaceVariant,
        modifier = Modifier.padding(start = SidebarInset, end = SidebarInset, bottom = 8.dp),
      )
      banis.forEachIndexed { index, bani ->
        if (index > 0) HorizontalDivider(Modifier.padding(horizontal = SidebarInset), color = colors.outlineVariant)
        // Gurmukhi only (chosen 2026-10-16). No card behind a row: the bani being
        // read takes the toner wash in the reader's card shape, bled 8dp outward
        // from the text as a tapped line's is, and a press takes the ripple there.
        Text(
          text = bani.gurmukhi,
          fontFamily = gurmukhi,
          fontSize = bodyTimes(DesignTokens.UI_GURMUKHI_RATIO),
          color = colors.onSurface,
          modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = SidebarInset - 8.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(if (bani.id == readingId) toner else Color.Transparent)
            .clickable { onOpen(bani) }
            .padding(horizontal = 8.dp, vertical = 14.dp),
        )
      }
    }
    // The header does not scroll with the list (reading-shell.md#header).
    Row(
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(8.dp),
      modifier = Modifier
        .padding(top = top, start = SidebarInset, end = SidebarInset)
        .height(HeaderHeight),
    ) {
      // The app icon, round (res/drawable-nodpi/ic_launcher_logo.png, the lotus
      // over its gradient, from brand/assets/lotus.svg via the legacy export).
      // A logo: the icon keeps its 32dp-to-22sp proportion to the name as the name
      // grows, and the name stays on one line.
      val titleSize = headerTitleSize()
      Image(
        painter = painterResource(R.drawable.ic_launcher_logo),
        contentDescription = null,
        modifier = Modifier
          .size(with(LocalDensity.current) { titleSize.toDp() } * (32f / 22f))
          .clip(CircleShape),
      )
      Text(
        text = stringResource(R.string.app_name),
        style = MaterialTheme.typography.titleLarge,
        fontSize = titleSize,
        fontWeight = FontWeight.SemiBold,
        color = colors.onSurface,
        maxLines = 1,
        softWrap = false,
      )
    }
  }
}

/**
 * What the viewer shows when there is nothing to resume: **ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ**, pills
 * for a few banis, and `continue reading` naming the last journey's bani when there
 * is one (docs/requirements/reading-shell.md#the-default-screen). No title: the
 * title names what is being read, and nothing is.
 *
 * The greeting and pills are sized from the system's Body size, not from the
 * reader's size, so pinching the reader does not change them: the pills at the
 * interface Gurmukhi size, the greeting at `GREETING_RATIO` × that
 * (packages/design/tokens.md#type).
 */
@Composable
private fun DefaultScreen(
  pills: List<Bani>,
  continueWith: Bani?,
  gurmukhi: FontFamily,
  onOpen: (Bani) -> Unit,
  onContinue: () -> Unit,
  onJourneys: () -> Unit,
  onControls: () -> Unit,
  onSettings: () -> Unit,
) {
  val colors = MaterialTheme.colorScheme
  BoxWithConstraints(Modifier.fillMaxSize()) {
    // Centred in the screen below the header, and scrollable should the largest
    // Font size in landscape not fit.
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.spacedBy(24.dp, Alignment.CenterVertically),
      modifier = Modifier
        .verticalScroll(rememberScrollState())
        .fillMaxWidth()
        .heightIn(min = maxHeight)
        .padding(top = viewerContentTop(), bottom = 16.dp, start = 16.dp, end = 16.dp),
    ) {
      Text(
        text = "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
        fontFamily = gurmukhi,
        fontSize = bodyTimes(DesignTokens.UI_GURMUKHI_RATIO * DesignTokens.GREETING_RATIO),
        lineHeight = bodyTimes(DesignTokens.UI_GURMUKHI_RATIO * DesignTokens.GREETING_RATIO * DesignTokens.LINE_HEIGHT_RATIO),
        color = colors.onBackground,
        textAlign = TextAlign.Center,
      )
      RowOrColumn(spacing = 8.dp) {
        pills.forEach { bani ->
          // Gurmukhi in the greeting's weight and colour (chosen 2026-10-16).
          Text(
            text = bani.gurmukhi,
            fontFamily = gurmukhi,
            fontSize = bodyTimes(DesignTokens.UI_GURMUKHI_RATIO),
            color = colors.onBackground,
            maxLines = 1,
            modifier = Modifier
              .clip(CircleShape)
              .background(chromeColor())
              .clickable { onOpen(bani) }
              .padding(horizontal = 24.dp, vertical = 8.dp),
          )
        }
      }
      // Absent, not disabled, when there is nothing to continue: "an empty or dead
      // control on a first launch is worse than nothing".
      if (continueWith != null) {
        Column(
          horizontalAlignment = Alignment.CenterHorizontally,
          modifier = Modifier
            .clip(RoundedCornerShape(24.dp))
            .background(chromeColor())
            .clickable { onContinue() }
            .padding(horizontal = 24.dp, vertical = 10.dp),
        ) {
          // Each on one line (reading-shell.md#the-default-screen): the label
          // shortens to `Continue` rather than wrapping, and the bani's name is cut
          // short.
          FirstThatFits {
            Text("Continue reading", fontSize = BodySize, fontWeight = FontWeight.SemiBold, color = colors.primary, maxLines = 1)
            Text("Continue", fontSize = BodySize, fontWeight = FontWeight.SemiBold, color = colors.primary, maxLines = 1)
          }
          Text(
            continueWith.latin,
            style = MaterialTheme.typography.bodyMedium,
            color = colors.onSurfaceVariant,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
          )
        }
      }
    }
    // No title, since nothing is being read; Controls is here too, so the preview
    // and appearance are reachable before anything is open.
    ViewerHeader(title = null, onJourneys = onJourneys) { ControlsButton(onClick = onControls, onLongClick = onSettings) }
  }
}

/**
 * The first of its children whose one-line width fits, or the last if none does
 * (iOS's `ViewThatFits`). Only the one chosen is measured and drawn.
 */
@Composable
private fun FirstThatFits(content: @Composable () -> Unit) {
  Layout(content) { measurables, constraints ->
    val chosen = measurables.firstOrNull { it.maxIntrinsicWidth(constraints.maxHeight) <= constraints.maxWidth }
      ?: measurables.last()
    val placeable = chosen.measure(constraints.copy(minWidth = 0, minHeight = 0))
    layout(placeable.width, placeable.height) { placeable.placeRelative(0, 0) }
  }
}

/**
 * Its children in a row when they fit the width, otherwise one above another,
 * centred: never a row that wraps partway (iOS's `ViewThatFits` over an `HStack`
 * and a `VStack`). Narrow screens and large Font sizes stack the pills.
 */
@Composable
private fun RowOrColumn(spacing: Dp, content: @Composable () -> Unit) {
  Layout(content) { measurables, constraints ->
    val gap = spacing.roundToPx()
    val loose = constraints.copy(minWidth = 0, minHeight = 0)
    val placeables = measurables.map { it.measure(loose) }
    val rowWidth = placeables.sumOf { it.width } + gap * (placeables.size - 1).coerceAtLeast(0)
    if (rowWidth <= constraints.maxWidth) {
      val height = placeables.maxOfOrNull { it.height } ?: 0
      layout(rowWidth, height) {
        var x = 0
        placeables.forEach {
          it.placeRelative(x, (height - it.height) / 2)
          x += it.width + gap
        }
      }
    } else {
      val width = placeables.maxOfOrNull { it.width } ?: 0
      val height = placeables.sumOf { it.height } + gap * (placeables.size - 1).coerceAtLeast(0)
      layout(width, height) {
        var y = 0
        placeables.forEach {
          it.placeRelative((width - it.width) / 2, y)
          y += it.height + gap
        }
      }
    }
  }
}
