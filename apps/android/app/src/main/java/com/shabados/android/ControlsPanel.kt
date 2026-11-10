package com.shabados.android

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.rememberTextMeasurer
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.pow
import kotlin.math.roundToInt

/** The preview's two lines (docs/requirements/reading-shell.md#settings): a space
 * before the double dandi, none before the period. */
private const val PREVIEW_GURMUKHI = "ਇਹ ਉਦਾਹਰਨ ਹੈ ॥"
private const val PREVIEW_SECONDARY = "Here's an example."

/** The footer `Settings` row's height, before the navigation bar beneath it. */
private val SettingsRowHeight = 56.dp

/**
 * Controls' contents (docs/requirements/reading-shell.md#controls): the
 * Zoom, Ratio and Weight sliders, and a `Settings` row at the foot.
 *
 * **The content of a bottom sheet**
 * (`ReaderShell`), not a sidebar, **with no header**, as iOS's popover has none
 * (2026-11-09): the sheet rises from the Controls button, which names it, and
 * Appearance stays in Settings. As tall as its contents, up to what the sheet
 * allows, with the sliders scrolling if that is less; clear of the navigation bar
 * beneath.
 *
 * Every value is [controls], shared with the reader and the theme, so a change here
 * is a change there, and a pinch made while this is closed shows here when it opens.
 * Ranges and defaults are docs/requirements/display-controls.md.
 */
@Composable
fun ControlsPanel(controls: ReaderControls, onSettings: () -> Unit, modifier: Modifier) {
  val bottom = with(LocalDensity.current) { WindowInsets.navigationBars.getBottom(this).toDp() }
  val colors = MaterialTheme.colorScheme
  Column(modifier.windowInsetsPadding(sideSafeArea)) {
    Column(
      modifier = Modifier
        .weight(1f, fill = false)
        .verticalScroll(rememberScrollState())
        .padding(horizontal = SidebarInset, vertical = 12.dp),
    ) {
      // No bylines here (2026-11-09): the titles say enough beside the reader they
      // change; Settings' Appearance page keeps them.
      ReaderSliders(controls, layout = SliderLayout.NO_BYLINES)
    }
    Row(
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(12.dp),
      modifier = Modifier
        .fillMaxWidth()
        .clickable(onClick = onSettings)
        .height(SettingsRowHeight)
        .padding(horizontal = SidebarInset),
    ) {
      Icon(painterResource(R.drawable.ic_settings), contentDescription = null)
      Text(text = "Settings", fontSize = BodySize, fontWeight = FontWeight.SemiBold, color = colors.onSurface)
    }
    Spacer(Modifier.height(bottom))
  }
}

/**
 * How the sliders are laid out, from the most room taken to the least. Settings'
 * Appearance page takes the first that leaves its preview room
 * (docs/requirements/reading-shell.md#large-text). Controls always shows
 * [NO_BYLINES] and scrolls if it must.
 */
enum class SliderLayout {
  /** The title, its byline, then the slider, stacked. */
  FULL,
  /** As [FULL], without the bylines. */
  NO_BYLINES,
  /** The title and the slider on one line, the title at no more than
   * [CompactTitleMax]: a row about half as tall as [NO_BYLINES]'. */
  COMPACT,
}

/** A compact row's title grows with Font size up to here and no further, so the
 * slider beside it keeps its length. About Body at Font size 4 of 7 (2026-10-19). */
private val CompactTitleMax = 22.dp

/**
 * The Zoom, Ratio and Weight sliders, shared by the Controls and Settings'
 * Appearance page so the two cannot drift (docs/requirements/display-controls.md).
 * Continuous: no steps, so whatever size a pinch lands on, the slider shows. Stored
 * values are kept to a few decimal places.
 */
@Composable
fun ReaderSliders(controls: ReaderControls, spacing: Dp = 24.dp, layout: SliderLayout = SliderLayout.FULL) {
  val isTablet = LocalConfiguration.current.isTablet
  val density = LocalDensity.current
  val titles = listOf("Zoom", "Ratio", "Weight")
  // A compact row's title is capped, and every title takes the widest one's width,
  // so the three sliders start and end together.
  val titleSize = with(density) { minOf(BodySize.toDp(), CompactTitleMax).toSp() }
  // Measured in the style the title is drawn in, the theme's, or the widest is cut
  // short ("Weigh", 2026-10-19).
  val measurer = rememberTextMeasurer()
  val titleStyle = LocalTextStyle.current.merge(TextStyle(fontSize = titleSize, fontWeight = FontWeight.SemiBold))
  val titleWidth = with(density) {
    titles.maxOf { measurer.measure(it, titleStyle, softWrap = false).size.width }.toDp() + 1.dp
  }
  val row = @Composable { title: String, byline: String, value: Float, range: ClosedFloatingPointRange<Float>, onChange: (Float) -> Unit ->
    if (layout == SliderLayout.COMPACT) {
      CompactSlider(title, titleSize, titleWidth, value, range, onChange)
    } else {
      ControlSlider(title, byline.takeIf { layout == SliderLayout.FULL }, value, range, onChange)
    }
  }
  Column(verticalArrangement = Arrangement.spacedBy(if (layout == SliderLayout.COMPACT) 4.dp else spacing)) {
    row(
      titles[0],
      "The overall size of text",
      ReaderSize.displaySize(controls.size, isTablet),
      DesignTokens.MIN_SIZE..DesignTokens.maxSize(isTablet),
    ) { controls.size = kept(it, places = 2) }
    row(
      titles[1],
      "Size relative to primary",
      controls.ratio,
      DesignTokens.RATIO_MIN..DesignTokens.RATIO_MAX,
    ) { controls.ratio = kept(it, places = 3) }
    row(
      titles[2],
      "Thickness of lines/strokes",
      controls.weight,
      DesignTokens.WEIGHT_MIN..DesignTokens.WEIGHT_MAX,
    ) { controls.weight = kept(it, places = 1) }
  }
}

/** Continuous values, kept to a few decimal places: whatever the slider reports,
 * without a tail of floating-point noise in storage (display-controls.md). */
private fun kept(value: Float, places: Int): Float {
  val scale = 10.0.pow(places)
  return ((value * scale).roundToInt() / scale).toFloat()
}

/**
 * Drawn as the reader draws a line and its secondary field, at the reader's size,
 * ratio and weight, on the page itself (reading-shell.md#settings): the same fonts
 * ([GurmukhiFonts]), line height and colours as `LineRow`. Each stays on one line,
 * cut short rather than wrapped. Shows only; TalkBack hears one "Preview".
 */
@Composable
fun ReaderPreview(controls: ReaderControls) {
  val context = LocalContext.current
  val isTablet = LocalConfiguration.current.isTablet
  val size = ReaderSize.displaySize(controls.size, isTablet)
  val weightAxis = controls.weight.roundToInt()
  val fonts = remember(context.assets, weightAxis) { GurmukhiFonts(context.assets, weightAxis.toFloat()) }
  val colors = MaterialTheme.colorScheme
  ReaderText {
    Column(
      // No card or padding of its own: it sits on the page, as on iOS
      // (reading-shell.md#settings), and starts where the page's content does.
      modifier = Modifier
        .fillMaxWidth()
        .clearAndSetSemantics { contentDescription = "Preview" },
    ) {
      Text(
        text = PREVIEW_GURMUKHI,
        fontFamily = fonts.body,
        color = colors.onBackground,
        fontSize = size.sp,
        lineHeight = (size * DesignTokens.LINE_HEIGHT_RATIO).sp,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
      )
      Text(
        text = PREVIEW_SECONDARY,
        fontFamily = FontFamily.Default,
        fontWeight = fonts.latin,
        fontSize = (size * controls.ratio).sp,
        color = colors.onSurfaceVariant,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
      )
    }
  }
}

@Composable
private fun ControlSlider(
  title: String,
  byline: String?,
  value: Float,
  range: ClosedFloatingPointRange<Float>,
  onChange: (Float) -> Unit,
) {
  val colors = MaterialTheme.colorScheme
  Column {
    Text(text = title, fontSize = BodySize, fontWeight = FontWeight.SemiBold, color = colors.onSurface)
    if (byline != null) Text(text = byline, fontSize = bodyTimes(0.88f), color = colors.onSurfaceVariant)
    ReaderSlider(title, value, range, onChange, Modifier)
  }
}

/** [SliderLayout.COMPACT]'s row: the title at [titleSize] in [titleWidth], then the
 * slider in the rest of the line. */
@Composable
private fun CompactSlider(
  title: String,
  titleSize: TextUnit,
  titleWidth: Dp,
  value: Float,
  range: ClosedFloatingPointRange<Float>,
  onChange: (Float) -> Unit,
) {
  Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
    Text(
      text = title,
      fontSize = titleSize,
      fontWeight = FontWeight.SemiBold,
      color = MaterialTheme.colorScheme.onSurface,
      maxLines = 1,
      softWrap = false,
      modifier = Modifier.width(titleWidth),
    )
    ReaderSlider(title, value, range, onChange, Modifier.weight(1f))
  }
}

/** TalkBack hears the slider by its title, whichever layout shows it. */
@Composable
private fun ReaderSlider(
  title: String,
  value: Float,
  range: ClosedFloatingPointRange<Float>,
  onChange: (Float) -> Unit,
  modifier: Modifier,
) {
  val colors = MaterialTheme.colorScheme
  Slider(
    value = value.coerceIn(range),
    onValueChange = onChange,
    valueRange = range,
    colors = SliderDefaults.colors(thumbColor = colors.primary, activeTrackColor = colors.primary),
    modifier = modifier.semantics { contentDescription = title },
  )
}

/** A switch whose whole row is the target (reading-shell.md#controls):
 * one toggleable row, so a tap on the label works and TalkBack reads one switch. */
@Composable
fun SettingSwitch(
  label: String,
  checked: Boolean,
  onChange: (Boolean) -> Unit,
  modifier: Modifier = Modifier,
  /** Padding inside the touch target, so the ripple reaches past the content. */
  inset: Dp = 0.dp,
) {
  Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = modifier
      .fillMaxWidth()
      .heightIn(min = 48.dp)
      .toggleable(value = checked, role = Role.Switch, onValueChange = onChange)
      .padding(horizontal = inset),
  ) {
    Text(text = label, fontSize = BodySize, color = MaterialTheme.colorScheme.onSurface, modifier = Modifier.weight(1f))
    Spacer(Modifier.width(8.dp))
    Switch(checked = checked, onCheckedChange = null)
  }
}

