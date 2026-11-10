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
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.ui.input.pointer.pointerInput
import androidx.activity.compose.BackHandler
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

/** The pages within the sheet. */
private enum class SettingsPage(val title: String) { MAIN("Settings"), APPEARANCE("Appearance"), DISPLAY("Display") }

private val GroupShape = RoundedCornerShape(16.dp)

/**
 * Settings (docs/requirements/reading-shell.md#settings): **a full-screen dialog**,
 * Android's form for this, sliding up over everything from Controls'
 * `Settings` row while [shown]. **Back at the top left of every page, never a ✕**:
 * on the first page it closes Settings, on a page within it returns to the first;
 * system Back does the same, and a swipe does nothing. Its items are menus in groups
 * without labels. Below the first group, the appearance picker. Appearance's page
 * has Reset at its top right.
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
    var page by rememberSaveable { mutableStateOf(SettingsPage.MAIN) }
    var confirmingReset by rememberSaveable { mutableStateOf(false) }
    val colors = MaterialTheme.colorScheme
    val resources = LocalContext.current.resources
    val isTablet = LocalConfiguration.current.isTablet
    // System Back leaves a page first, then Settings.
    BackHandler {
      if (page != SettingsPage.MAIN) page = SettingsPage.MAIN else onDismiss()
    }
    Column(
      Modifier
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
          onClick = { if (page == SettingsPage.MAIN) onDismiss() else page = SettingsPage.MAIN },
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
          IconButton(onClick = { confirmingReset = true }, modifier = Modifier.align(Alignment.CenterEnd)) {
            Icon(painterResource(R.drawable.ic_reset), contentDescription = "Reset", tint = colors.error)
          }
        }
      }
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
      when (page) {
        SettingsPage.MAIN -> Page {
          Group {
            MenuRow("Appearance") { page = SettingsPage.APPEARANCE }
            RowDivider()
            MenuRow("Display") { page = SettingsPage.DISPLAY }
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
