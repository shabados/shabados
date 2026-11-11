package com.shabados.android

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.TextButton
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.runtime.remember
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.ui.platform.LocalWindowInfo
import androidx.compose.ui.layout.Placeable
import androidx.compose.ui.layout.SubcomposeLayout
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.ui.input.pointer.pointerInput
import androidx.activity.compose.PredictiveBackHandler
import androidx.compose.animation.core.Animatable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.graphics.graphicsLayer
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.launch
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.drawscope.clipPath
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.saveable.listSaver
import androidx.compose.runtime.toMutableStateList
import androidx.navigation3.runtime.NavEntry
import androidx.navigation3.ui.NavDisplay

/** The pages within the sheet. */
private enum class SettingsPage(val title: String) { MAIN("Settings"), APPEARANCE("Appearance"), DISPLAY("Display") }

private val GroupShape = RoundedCornerShape(16.dp)

/**
 * Settings (docs/requirements/reading-shell.md#settings): **a stack of screens**,
 * sliding up over everything from Controls' `Settings` row while [shown], its pages
 * pushed onto it as Android's own Settings' are. **Back at the top left of every
 * page, never a ✕**: on the first page it closes Settings, on a page within it
 * returns to the one before; system Back does the same, and a drag down does
 * nothing. Its items are menus in groups without labels. Below the first group, the
 * appearance picker. Appearance's page has Reset at its top right.
 *
 * **The pages are Navigation 3's** (`NavDisplay`, 2026-11-10): the back stack is a
 * list held here, and Navigation 3 draws its top, moves between pages with the
 * platform's transitions, and gives a back swipe between pages its own predictive
 * preview, kept as it comes. Only closing Settings, from the first page, is ours
 * ([backPreview]), since nothing in the stack lies beneath it, and it imitates
 * Navigation 3's: **when Navigation 3 is updated, check the two still match.**
 *
 * **Drawn in the app's own window, not a `ModalBottomSheet`**: the sheet could be
 * pulled down, and its rounded top corners left the screen behind showing at the
 * corners (Pixel 7a, 2026-10-19).
 */
@Composable
fun SettingsScreen(shown: Boolean, controls: ReaderControls, onDismiss: () -> Unit) {
  AnimatedVisibility(
    visible = shown,
    enter = slideInVertically(initialOffsetY = { it }),
    exit = slideOutVertically(targetOffsetY = { it }),
  ) {
    /** The pages open, the first page at the bottom. Saved by name, so a rotation
     * keeps the page. */
    val pages = rememberSaveable(
      saver = listSaver(
        save = { stack -> stack.map { it.name } },
        restore = { names -> names.map(SettingsPage::valueOf).toMutableStateList() },
      ),
    ) { mutableStateListOf(SettingsPage.MAIN) }
    var confirmingReset by rememberSaveable { mutableStateOf(false) }
    val resources = LocalContext.current.resources
    val isTablet = LocalConfiguration.current.isTablet
    val scope = rememberCoroutineScope()
    val colors = MaterialTheme.colorScheme
    /** How far a page moves as it comes in or goes: Material's shared axis, 30dp. */
    val pageShift = with(LocalDensity.current) { 30.dp.roundToPx() }
    fun back() {
      if (pages.size > 1) pages.removeAt(pages.lastIndex) else onDismiss()
    }
    /** A back swipe's progress from the first page, 0 to 1 ([backPreview]); 0 when
     * there is none. */
    val swipe = remember { Animatable(0f) }
    // **Closing Settings by a back swipe previews it** (reading-shell.md, predictive
    // back, 2026-11-10), as a back swipe between its pages does: Settings shrinks
    // from its centre over the viewer. Released, it leaves with its slide down;
    // given up, it grows back. Only on the first page: between pages, Navigation 3
    // handles the swipe.
    PredictiveBackHandler(enabled = pages.size == 1) { events ->
      try {
        events.collect { event -> swipe.snapTo(event.progress) }
        onDismiss()
      } catch (e: CancellationException) {
        scope.launch { swipe.animateTo(0f) }
        throw e
      }
    }
    Box(Modifier.fillMaxSize()) {
      NavDisplay(
        backStack = pages,
        // A page's own background is see-through partway through Navigation 3's
        // crossfade between pages, and the viewer beneath Settings showed through
        // it (2026-11-10). Inside the preview, so it shrinks with the pages.
        modifier = Modifier
          .backPreview(swipe.value)
          .background(colors.background),
        onBack = ::back,
        // **Material's shared axis X**, as Android's own Settings moves between its
        // pages: the new page comes in from the right by `pageShift`, fading in, as
        // the old one goes left, fading out; Back reverses it. Navigation 3's own
        // default is a crossfade. A back swipe keeps Navigation 3's own predictive
        // preview (chosen 2026-11-10 over Android's documented full-screen spec, 90%
        // with a fade-through at 35%, as nearly the same for far less of our own).
        transitionSpec = {
          (slideInHorizontally { pageShift } + fadeIn()) togetherWith
            (slideOutHorizontally { -pageShift } + fadeOut())
        },
        popTransitionSpec = {
          (slideInHorizontally { -pageShift } + fadeIn()) togetherWith
            (slideOutHorizontally { pageShift } + fadeOut())
        },
        entryProvider = { page ->
          NavEntry(page) {
            SettingsPageSurface(
              page,
              controls,
              onBack = ::back,
              onOpen = { pages.add(it) },
              onReset = { confirmingReset = true },
            )
          }
        },
      )
      if (confirmingReset) {
        AlertDialog(
          onDismissRequest = { confirmingReset = false },
          title = { Text("Reset zoom, ratio, and weight?") },
          text = { Text("Your preferences will reset to the original settings.") },
          confirmButton = {
            TextButton(
              onClick = {
                // Zoom to this device's starting size at its current Font size; Ratio
                // and Weight to their defaults (reading-shell.md#settings).
                controls.size = DesignTokens.startingSize(isTablet, resources.bodyDp())
                controls.ratio = ReaderDefaults.RATIO
                controls.weight = ReaderDefaults.WEIGHT
                confirmingReset = false
              },
              colors = ButtonDefaults.textButtonColors(contentColor = colors.error),
            ) { Text("Reset") }
          },
          dismissButton = { TextButton(onClick = { confirmingReset = false }) { Text("Cancel") } },
        )
      }
    }
  }
}

/** One page of Settings, whole: its bar (Back, title, and Appearance's Reset) and
 * its contents, on the page's background. */
@Composable
private fun SettingsPageSurface(
  page: SettingsPage,
  controls: ReaderControls,
  onBack: () -> Unit,
  onOpen: (SettingsPage) -> Unit,
  onReset: () -> Unit,
  modifier: Modifier = Modifier,
) {
  val colors = MaterialTheme.colorScheme
  Column(
    modifier
      .fillMaxSize()
      .background(colors.background)
      // Takes every touch, so nothing behind it can be reached.
      .pointerInput(Unit) { awaitPointerEventScope { while (true) awaitPointerEvent() } }
      .windowInsetsPadding(WindowInsets.safeDrawing),
  ) {
    // Back at the left, the title centred, and Appearance's Reset at the right.
    Box(
      Modifier
        .fillMaxWidth()
        .height(64.dp)
        .padding(horizontal = 8.dp),
    ) {
      IconButton(
        onClick = onBack,
        modifier = Modifier.align(Alignment.CenterStart),
      ) {
        Icon(painterResource(R.drawable.ic_back), contentDescription = "Back")
      }
      Text(
        text = page.title,
        fontSize = BodySize,
        fontWeight = FontWeight.SemiBold,
        color = colors.onBackground,
        modifier = Modifier.align(Alignment.Center),
      )
      if (page == SettingsPage.APPEARANCE) {
        IconButton(onClick = onReset, modifier = Modifier.align(Alignment.CenterEnd)) {
          Icon(painterResource(R.drawable.ic_reset), contentDescription = "Reset", tint = colors.error)
        }
      }
    }
    when (page) {
      SettingsPage.MAIN -> Page {
        Group {
          MenuRow("Appearance") { onOpen(SettingsPage.APPEARANCE) }
          RowDivider()
          MenuRow("Display") { onOpen(SettingsPage.DISPLAY) }
        }
        Group { Box(Modifier.padding(horizontal = RowInset, vertical = 16.dp)) { AppearancePicker(controls) } }
      }
      // The preview at the top, on the page's background, and the sliders in a
      // group fixed at the bottom. The sliders stay put; the preview grows with the
      // size and scrolls behind them, no lower than their bottom edge, once it
      // needs more room (reading-shell.md#settings). The preview's scroll spans the
      // page, padded beneath by the group's height so its end can scroll clear.
      SettingsPage.APPEARANCE -> Box(
        Modifier
          .fillMaxSize()
          .padding(16.dp),
      ) {
        val density = LocalDensity.current
        var groupHeight by remember { mutableIntStateOf(0) }
        Box(
          Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(start = 4.dp, end = 4.dp, bottom = with(density) { groupHeight.toDp() }),
        ) { ReaderPreview(controls) }
        Box(
          Modifier
            .align(Alignment.BottomCenter)
            .onSizeChanged { groupHeight = it.height },
        ) { FittingSliders(controls) }
      }
      SettingsPage.DISPLAY -> Page {
        Group { SettingSwitch("Pauses", controls.pauses, { controls.pauses = it }, inset = RowInset) }
        Column {
          Text(
            text = "Pronunciations",
            fontSize = bodyTimes(0.88f),
            color = colors.onSurfaceVariant,
            modifier = Modifier.padding(start = 16.dp, bottom = 6.dp),
          )
          Group {
            SettingSwitch(Pronunciation.DEVANAGARI.label, controls.pronDevanagari, { controls.pronDevanagari = it }, inset = RowInset)
            RowDivider()
            SettingSwitch(Pronunciation.LATIN.label, controls.pronLatin, { controls.pronLatin = it }, inset = RowInset)
          }
        }
      }
    }
  }
}

/** The scale Navigation 3's default back-swipe preview shrinks a page to
 * (`defaultPredictivePopTransitionSpec`'s `scaleOut(0.7)`, read from navigation3-ui
 * 1.2.1; not exposed by it). **When Navigation 3 is updated, check it still is.** */
private const val NAV3_PREDICTIVE_POP_SCALE = 0.7f

/**
 * Closing Settings by a back swipe: at a swipe's [progress] it shrinks from its
 * centre toward [NAV3_PREDICTIVE_POP_SCALE], as a back swipe between its pages does.
 * Nothing at 0.
 */
private fun Modifier.backPreview(progress: Float): Modifier = graphicsLayer {
  val scale = 1f - (1f - NAV3_PREDICTIVE_POP_SCALE) * progress
  scaleX = scale
  scaleY = scale
}

/**
 * Appearance's sliders, in their group, laid out to leave the preview room
 * (reading-shell.md#large-text): **the group starts no higher than halfway down the
 * screen**, so it takes the first [SliderLayout] that fits — with bylines, without
 * them, then compact rows. Compact rows are used even if they do not fit, as in
 * landscape: they are the least the sliders can take.
 *
 * **Decided by measuring, not by Font size and Display size.** On a Pixel 7a,
 * Font size 7 fitted with bylines at Display size 1 while Font size 1 did not at
 * Display size 5: the sliders' own height grows with Display size, and the screen
 * gets shorter in dp (2026-10-19). Thresholds tuned to one phone would be wrong on
 * the next.
 */
@Composable
private fun FittingSliders(controls: ReaderControls) {
  val screen = LocalWindowInfo.current.containerSize.height
  val belowGroup = WindowInsets.safeDrawing.getBottom(LocalDensity.current)
  SubcomposeLayout { constraints ->
    // The page's padding beneath the group, as on the Appearance page.
    val budget = screen / 2 - belowGroup - 16.dp.roundToPx()
    val loose = constraints.copy(minHeight = 0)
    var chosen: Placeable? = null
    for (layout in SliderLayout.entries) {
      chosen = subcompose(layout) {
        Group {
          Box(Modifier.padding(horizontal = RowInset, vertical = 16.dp)) {
            ReaderSliders(controls, spacing = 20.dp, layout = layout)
          }
        }
      }.single().measure(loose)
      if (chosen.height <= budget) break
    }
    val group = chosen!!
    layout(group.width, group.height) { group.place(0, 0) }
  }
}

/** A page of groups that scrolls if it must. */
@Composable
private fun Page(content: @Composable () -> Unit) {
  Column(
    verticalArrangement = Arrangement.spacedBy(24.dp),
    modifier = Modifier
      .fillMaxSize()
      .verticalScroll(rememberScrollState())
      .padding(horizontal = 16.dp, vertical = 8.dp),
  ) { content() }
}

/** A group of rows, without a label, on the sidebar colour. **No padding of its
 * own**: each row pads itself inside its touch target, so a row's ripple reaches the
 * group's edges (2026-10-19). [RowInset] is that padding. */
@Composable
private fun Group(content: @Composable () -> Unit) {
  Column(
    Modifier
      .fillMaxWidth()
      .clip(GroupShape)
      .background(MaterialTheme.colorScheme.surfaceVariant),
  ) { content() }
}

/** The space between a group's edge and its rows' content. */
private val RowInset = 16.dp

@Composable
private fun RowDivider() {
  HorizontalDivider(Modifier.padding(horizontal = RowInset), color = MaterialTheme.colorScheme.outlineVariant)
}

/** A menu: its whole row opens its page. */
@Composable
private fun MenuRow(label: String, onClick: () -> Unit) {
  Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier
      .fillMaxWidth()
      .heightIn(min = 52.dp)
      .clickable(onClick = onClick)
      .padding(horizontal = RowInset),
  ) {
    Text(text = label, fontSize = BodySize, color = MaterialTheme.colorScheme.onSurface)
  }
}

/** Light, Dark and System as three pictures of the reader, the chosen one outlined
 * and labelled in the app's `ui` blue, Android having no system blue
 * (reading-shell.md#settings). */
@Composable
private fun AppearancePicker(controls: ReaderControls) {
  val colors = MaterialTheme.colorScheme
  Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
    Appearance.entries.forEach { choice ->
      val selected = controls.appearance == choice
      Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
          .weight(1f)
          .selectable(selected = selected, role = Role.RadioButton) { controls.appearance = choice },
      ) {
        Box(
          Modifier
            .fillMaxWidth()
            .height(96.dp)
            .clip(RoundedCornerShape(12.dp))
            .border(
              width = if (selected) 3.dp else 1.dp,
              color = if (selected) colors.primary else colors.onBackground.copy(alpha = 0.15f),
              shape = RoundedCornerShape(12.dp),
            ),
        ) {
          when (choice) {
            Appearance.LIGHT -> AppearanceSwatch(dark = false)
            Appearance.DARK -> AppearanceSwatch(dark = true)
            Appearance.AUTO -> {
              // Light in the top-left half, with its bars; Dark in the bottom-right
              // half, with its circles.
              AppearanceSwatch(dark = false)
              AppearanceSwatch(dark = true, lowerRightOnly = true)
            }
          }
        }
        Text(
          text = choice.label,
          fontSize = bodyTimes(0.88f),
          color = if (selected) colors.primary else colors.onBackground,
          // One line, cut short, as on iOS, where `System` broke as `Sys-tem`.
          maxLines = 1,
          overflow = TextOverflow.Ellipsis,
        )
      }
    }
  }
}

/**
 * A small picture of the reader in one appearance: its background, two bars at the
 * top left in its text colour, and its three vishraam colours as circles at the
 * bottom right, whatever Pauses is set to. [lowerRightOnly] draws only the triangle
 * below the diagonal from the top-right corner to the bottom-left.
 */
@Composable
private fun AppearanceSwatch(dark: Boolean, lowerRightOnly: Boolean = false) {
  val background = if (dark) DesignTokens.backgroundDark else DesignTokens.backgroundLight
  val text = if (dark) DesignTokens.foregroundDark else DesignTokens.foregroundLight
  val circles = if (dark) {
    listOf(DesignTokens.vishraamHeavyDark, DesignTokens.vishraamMediumDark, DesignTokens.vishraamLightDark)
  } else {
    listOf(DesignTokens.vishraamHeavyLight, DesignTokens.vishraamMediumLight, DesignTokens.vishraamLightLight)
  }
  Canvas(Modifier.fillMaxSize()) {
    val inset = 12.dp.toPx()
    val bar = 7.dp.toPx()
    val radius = 5.dp.toPx()
    val gap = 4.dp.toPx()
    fun draw() {
      drawRect(background)
      drawRoundRect(text, Offset(inset, inset), Size(40.dp.toPx(), bar), CornerRadius(bar / 2))
      drawRoundRect(text, Offset(inset, inset + bar + 6.dp.toPx()), Size(26.dp.toPx(), bar), CornerRadius(bar / 2))
      circles.forEachIndexed { index, colour ->
        val fromRight = circles.size - 1 - index
        val cx = size.width - inset - radius - fromRight * (2 * radius + gap)
        drawCircle(colour, radius, Offset(cx, size.height - inset - radius))
      }
    }
    if (lowerRightOnly) {
      val triangle = Path().apply {
        moveTo(size.width, 0f)
        lineTo(size.width, size.height)
        lineTo(0f, size.height)
        close()
      }
      clipPath(triangle) { draw() }
    } else {
      draw()
    }
  }
}
