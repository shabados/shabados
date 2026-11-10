package com.shabados.android

import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.snapshotFlow
import android.view.View
import androidx.compose.ui.platform.LocalView
import android.content.res.AssetManager
import androidx.compose.animation.core.EaseIn
import androidx.compose.animation.core.EaseOut
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.snap
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.LocalIndication
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.animateScrollBy
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.calculateZoom
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
// matchParentSize needs no import -- it's a member of BoxScope, not a top-level
// function, and resolves automatically inside a Box{} content lambda.
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.displayCutout
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.listSaver
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.compositeOver
import androidx.compose.ui.input.pointer.PointerEventPass
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontVariation
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextMotion
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

/**
 * Sant Lipi at a specific `wght` axis value. A single `Font()` entry pins one
 * static instance of a variable font — arbitrary weights (title 650, ik oankar
 * 400, body 550, ...) each need their own [FontVariation.Settings], the Android
 * equivalent of `Fonts.variable(_:size:weight:)` on iOS. Callers `remember` the
 * result keyed on the weight so this isn't rebuilt every recomposition.
 */
internal fun gurmukhiFont(assets: AssetManager, weight: Int): FontFamily =
  FontFamily(
    Font(
      path = "SantLipi-VF.ttf",
      assetManager = assets,
      variationSettings = FontVariation.Settings(FontVariation.weight(weight)),
    )
  )

/** `background` blended toward `onBackground` by [DesignTokens.TONER_OPACITY] — a
 * solid colour (not a translucent wash) for the same reason `DesignTokens.toner`
 * is solid on iOS: the Keep Reading preview's fade overlay needs one concrete
 * colour to paint toward, and a translucent fill can't serve as that target
 * without a second blend of its own. */
@Composable
private fun tonerColor(): Color =
  wash(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.onBackground, DesignTokens.TONER_OPACITY)

/** The same wash, lighter: the top of the Keep Reading card's gradient. */
@Composable
private fun tonerFaintColor(): Color =
  wash(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.onBackground, DesignTokens.TONER_FAINT_OPACITY)

/**
 * [base] blended toward [toward] by [fraction], **channel by channel in sRGB**, as
 * iOS's `DesignTokens.wash` does: [toward] at that opacity laid over [base].
 *
 * Not Compose's `lerp`, which blends in Oklab, a perceptual space. In light mode
 * the two land close; in dark mode, from black toward white, `lerp` gave 6/255 at
 * 0.12 against iOS's 31, and the tap highlight was all but invisible (Galaxy A16,
 * 2026-11-09).
 */
internal fun wash(base: Color, toward: Color, fraction: Float): Color =
  toward.copy(alpha = fraction).compositeOver(base)

/** The vertical gap between reader rows, as padding inside each row's own bounds.
 * Named because the pinch anchor discounts it: a pinch in that padding is a pinch
 * between rows. */
private val RowSpacing = 6.dp

/**
 * **The toner highlight on a tapped line, and on a pinch's anchor**: on, held, then
 * faded (docs/requirements/display-controls.md#tap-a-line). The same as iOS's
 * `tapHighlight…` constants in BaniReaderView.swift; change both together.
 */
private object Highlight {
  /** How long it takes to come on; 0 is at once, so it is fully on before the
   * scroll starts moving. */
  const val IN_MS = 0
  /** How long it then stays fully on: a tap's scroll, so the fade begins as the
   * line settles; for a pinch, from when the fingers lift. */
  const val HOLD_MS = TapScroll.DURATION_MS.toLong()
  /** Chosen on devices, 2026-11-09. */
  const val FADE_MS = 600
  /** How strong it is, as a share of the toner's own opacity: 1 is the toner. */
  const val STRENGTH = 1f
}

/**
 * How reading text is drawn. Two things, both because the reader's size is its own:
 *
 * - **The system font scale is removed.** The reader's sizes are dp: the font scale
 *   chose the starting size once (see [ReaderSize]) and must not multiply every size
 *   again on top of it. With a font scale of 1, `.sp` is exactly dp.
 * - **[TextMotion.Animated]**: glyphs laid out and drawn at their exact scaled size
 *   and position. The default, `Static`, rounds glyph positions and advances to whole
 *   pixels, so a pinch moves text in visible jumps rather than continuously. Always on,
 *   not just during a pinch: switching on release could move line breaks, and with
 *   them the row the pinch just put back.
 * - **No inherited line height** ([readerTextStyle]).
 *
 * Only reading text goes inside this; the header and the Expand button keep following
 * the system setting like the rest of the platform's UI.
 */
@Composable
internal fun ReaderText(content: @Composable () -> Unit) {
  val density = LocalDensity.current
  CompositionLocalProvider(
    LocalDensity provides Density(density.density, fontScale = 1f),
    LocalTextStyle provides readerTextStyle(LocalTextStyle.current),
    content = content,
  )
}

/**
 * [ReaderText]'s style over the theme's. **The theme's line height is removed**: it
 * is a fixed sp (Body's 24), so a secondary line that set no line height of its own
 * kept 24sp at every Zoom and its wrapped lines overlapped once the text grew past it
 * (Pixel 7a, 2026-10-22). Without one, a line takes its font's own line box at its
 * own size, as on iOS; the Gurmukhi line sets `lineHeightRatio` explicitly
 * (packages/design/tokens.md#type).
 */
internal fun readerTextStyle(theme: TextStyle): TextStyle =
  theme.copy(textMotion = TextMotion.Animated, lineHeight = TextUnit.Unspecified)

private fun vishraamColor(weight: Vishraam, dark: Boolean): Color =
  when (weight) {
    Vishraam.HEAVY -> if (dark) DesignTokens.vishraamHeavyDark else DesignTokens.vishraamHeavyLight
    Vishraam.MEDIUM -> if (dark) DesignTokens.vishraamMediumDark else DesignTokens.vishraamMediumLight
    Vishraam.LIGHT -> if (dark) DesignTokens.vishraamLightDark else DesignTokens.vishraamLightLight
  }

/** The reader's one card shape: the pinch anchor's toner, the tap ripple and the
 * Keep Reading card are all clipped to it, on the same bounds. */
private object ReaderCard {
  /** How far a card extends past the text on each side: half the reader's 16dp
   * gutter, as on iOS. Vertically a row extends by [RowSpacing] instead, the gap
   * it already owns, because two rows' tap targets cannot overlap. */
  val bleed = 8.dp
  val shape = RoundedCornerShape(12.dp)
}

/** How far below the camera cutout (or the screen's top, where there is none) a
 * tapped line's highlight lands: the space a card keeps from the screen's sides,
 * the 16dp gutter less [ReaderCard.bleed]. iOS's `tapLandingGap`, the same 8. */
internal val TapLandingGap = 16.dp - ReaderCard.bleed

/**
 * One reader row. **Everything drawn behind or over the text — the Keep Reading
 * card's fill ([background]), the pinch anchor's toner ([highlight]), the tap
 * ripple — is on this one node, clipped to [ReaderCard.shape]**, so none of them can
 * differ in size or corner radius. They did when the toner was drawn bled outside
 * the row (iOS's negative-padding approach) while the ripple stayed on the row's
 * own, unrounded bounds. The text is inset instead: the list's side padding is
 * [ReaderCard.bleed] short of the gutter and [content] adds it back.
 */
@Composable
private fun ReaderRow(
  highlight: Float,
  onTap: () -> Unit,
  background: Modifier = Modifier,
  /** A line's tap is shown by [highlight] instead, as on iOS; a Keep Reading card
   * keeps the platform's pressed state (docs/interaction.md). */
  ripple: Boolean = true,
  content: @Composable () -> Unit,
) {
  Box(
    modifier = Modifier
      .fillMaxWidth()
      .clip(ReaderCard.shape)
      .then(background)
      .background(tonerColor().copy(alpha = highlight * Highlight.STRENGTH))
      .clickable(
        interactionSource = null,
        indication = if (ripple) LocalIndication.current else null,
        onClick = onTap,
      )
      .padding(vertical = RowSpacing),
  ) { content() }
}

private object Title {
  const val HEADING_SIZE_RATIO = 1.25f
  const val MOOLMANTAR_SIZE_RATIO = 1.5f
  const val WEIGHT = 650
  const val SPACE_BEFORE = 1.6f
  const val SPACE_AFTER = 0.8f
  const val IK_OANKAR_SIZE_RATIO = 2.5f
  const val IK_OANKAR_WEIGHT = 400

  fun sizeRatio(isHeading: Boolean, isMoolmantar: Boolean): Float =
    when {
      isMoolmantar -> MOOLMANTAR_SIZE_RATIO
      isHeading -> HEADING_SIZE_RATIO
      else -> 1f
    }
}

private const val COLOPHON_OPACITY = 0.55f

/** Builds pause-coloured segments from [Line.pauses] over [Line.gurmukhi] — every
 * pause word is styled either way, its colour is just the [pauses] toggle. */
private fun coloredText(line: Line, pauses: Boolean, dark: Boolean, foreground: Color): AnnotatedString =
  buildAnnotatedString {
    val chars = line.gurmukhi
    var cursor = 0
    for (run in line.pauses) {
      val lower = run.range.first.coerceIn(cursor, chars.length)
      val upper = (run.range.last + 1).coerceIn(lower, chars.length)
      if (lower >= upper) continue
      if (lower > cursor) append(chars.substring(cursor, lower))
      val color = if (pauses) vishraamColor(run.weight, dark) else foreground
      withStyle(SpanStyle(color = color)) { append(chars.substring(lower, upper)) }
      cursor = upper
    }
    if (cursor < chars.length) append(chars.substring(cursor))
  }

/**
 * Lays the mool mantar out as `ੴ` alone on its own line, then its six word-pairs
 * flowing after it — each pair glued together so it can never split across a
 * wrap, but free to share a line with a neighbouring pair. Ported from
 * `LineText.layingOutMoolmantar` on iOS — same word-index map, same Word Joiner
 * (`⁠`) glue, same reasoning for using it over a non-breaking space (a
 * default-ignorable character renders zero-width and blocks a line break on
 * either side regardless of any specific font's own glyph metrics, where Sant
 * Lipi's own NBSP glyph is known broken — see that function's own comment for
 * the full font-table investigation behind this).
 *
 * Only called on `line.isMoolmantar` text, one exact verified spelling, so the
 * word-index map below is safe to hardcode:
 * word 0 = ੴ, 1–12 = the six pairs (sat nam / karta purakh / nirbhau nirvair /
 * akal murat / ajuni saibhan / gur prasad), 13 = the closing `॥`.
 */
private fun layOutMoolmantar(text: AnnotatedString, ikOankarStyle: SpanStyle): AnnotatedString {
  val spaceIndices = text.text.indices.filter { text.text[it] == ' ' }
  if (spaceIndices.isEmpty()) return text

  val forcedNewline = setOf(0)
  // Within-pair spaces, plus the space before the closing danda — treated as a
  // seventh pair so it can never end up orphaned alone on a line.
  val nonBreaking = setOf(1, 3, 5, 7, 9, 11, 12)

  return buildAnnotatedString {
    var segmentStart = 0
    spaceIndices.forEachIndexed { index, spaceIndex ->
      if (index !in forcedNewline && index !in nonBreaking) return@forEachIndexed
      val piece = text.subSequence(segmentStart, spaceIndex)
      if (index == 0) {
        withStyle(ikOankarStyle) { append(piece) }
      } else {
        append(piece)
      }
      if (index in forcedNewline) {
        append("\n")
      } else {
        // The ORIGINAL space, unmodified, is what actually renders — the Word
        // Joiners either side are what stop it being a valid wrap point.
        append("⁠")
        append(text.subSequence(spaceIndex, spaceIndex + 1))
        append("⁠")
      }
      segmentStart = spaceIndex + 1
    }
    append(text.subSequence(segmentStart, text.text.length))
  }
}

/** Was the row directly before `index` also a title-styled line? A line preceded
 * by a continuation card counts as *not* preceded by a title — a card is a real
 * visual break, not a sibling heading. */
private fun precedingItemIsTitle(items: List<ReaderItem>, index: Int): Boolean {
  if (index <= 0) return false
  val previous = items[index - 1] as? ReaderItem.LineItem ?: return false
  return previous.line.isHeading || previous.line.isMoolmantar
}

/** Inlines every opened continuation's lines, in place, as ordinary line items —
 * so the tap gesture and highlight background every row already gets apply to a
 * revealed line exactly the same way they apply to any other line, with no
 * separate code path. One-directional: nothing here ever re-collapses a
 * continuation, matching library.md's "no setting that removes anything". */
private fun expand(items: List<ReaderItem>, expandedIds: Set<String>): List<ReaderItem> =
  items.flatMap { item ->
    if (item is ReaderItem.ContinuationItem && item.continuation.id in expandedIds) {
      item.continuation.lines.map { line -> ReaderItem.LineItem(line.id, line) }
    } else {
      listOf(item)
    }
  }

/** Every Sant Lipi weight the reader needs, built once per reader session (see
 * `gurmukhiFont`'s own comment) and threaded down, rather than rebuilt by every
 * row each time it scrolls back into view — `LazyColumn` disposes off-screen row
 * composables, which would otherwise re-run a per-row `remember` on every
 * re-entry.
 *
 * Built at the Weight control's [weight]: every field keeps its distance from the
 * Gurmukhi line ([ReaderWeight]). Rebuilt when the weight changes, in whole axis
 * units, which is as fine as the font's `wght` axis is set. */
internal class GurmukhiFonts(assets: AssetManager, weight: Float) {
  val title = gurmukhiFont(assets, ReaderWeight.of(Title.WEIGHT.toFloat(), weight).roundToInt())
  val body = gurmukhiFont(assets, ReaderWeight.of(DesignTokens.WEIGHT_PRIMARY, weight).roundToInt())
  val secondary = gurmukhiFont(assets, ReaderWeight.of(DesignTokens.WEIGHT_SECONDARY, weight).roundToInt())
  val ikOankar = gurmukhiFont(assets, ReaderWeight.of(Title.IK_OANKAR_WEIGHT.toFloat(), weight).roundToInt())
  /** The system font's weight for a Latin secondary line. */
  val latin = FontWeight(ReaderWeight.of(DesignTokens.WEIGHT_LATIN, weight).roundToInt())
}

@Composable
private fun LineRow(
  line: Line,
  size: Float,
  pauses: Boolean,
  schemes: List<Pronunciation>,
  ratio: Float,
  fonts: GurmukhiFonts,
  precededByTitle: Boolean,
) {
  val dark = LocalDark.current
  val isTitle = line.isHeading || line.isMoolmantar
  val titleSize = size * Title.sizeRatio(line.isHeading, line.isMoolmantar)

  val foreground = MaterialTheme.colorScheme.onBackground
  val base = remember(line.id, pauses, dark, foreground) { coloredText(line, pauses, dark, foreground) }
  val text = if (line.isMoolmantar) {
    remember(base, size) {
      layOutMoolmantar(
        base,
        SpanStyle(fontSize = (size * Title.IK_OANKAR_SIZE_RATIO).sp, fontFamily = fonts.ikOankar),
      )
    }
  } else {
    base
  }

  ReaderText {
    Column(
      horizontalAlignment = if (isTitle) Alignment.CenterHorizontally else Alignment.Start,
      modifier = Modifier
        .fillMaxWidth()
        .padding(
          top = if (isTitle && !precededByTitle) (size * Title.SPACE_BEFORE).dp else 0.dp,
          bottom = if (isTitle) (size * Title.SPACE_AFTER).dp else 0.dp,
        )
        .alpha(if (line.isColophon) COLOPHON_OPACITY else 1f),
    ) {
      Text(
        text = text,
        fontFamily = if (isTitle) fonts.title else fonts.body,
        color = foreground,
        fontSize = (if (isTitle) titleSize else size).sp,
        lineHeight = ((if (isTitle) titleSize else size) * DesignTokens.LINE_HEIGHT_RATIO).sp,
        textAlign = if (isTitle) TextAlign.Center else TextAlign.Start,
        modifier = Modifier.fillMaxWidth(),
      )
      schemes.forEach { scheme ->
        val secondary = size * ratio
        Text(
          text = Transliteration.of(line, scheme),
          fontFamily = if (scheme == Pronunciation.DEVANAGARI) fonts.secondary else FontFamily.Default,
          fontWeight = if (scheme == Pronunciation.LATIN) fonts.latin else null,
          fontSize = secondary.sp,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
          textAlign = if (isTitle) TextAlign.Center else TextAlign.Start,
          modifier = Modifier.fillMaxWidth(),
        )
      }
    }
  }
}

/**
 * The "Keep reading" control. Tapping the card body scrolls it to the top, the
 * same as any other row; tapping `Expand` only expands. **No button-frame
 * exclusion hack needed here** — unlike SwiftUI's `.simultaneousGesture`, which
 * fires regardless of what else claims a touch, Compose's `clickable`/`Button`
 * consume their own touch sequence, so a plain nested `Button` inside a
 * `clickable` card correctly gets first claim on its own area for free.
 *
 * A tap gets the platform ripple, unlike a line row, not a toner fill:
 * docs/interaction.md gives a continuation card the platform's ordinary pressed
 * state and nothing more.
 */
@Composable
private fun ContinuationCard(
  continuation: Continuation,
  size: Float,
  fonts: GurmukhiFonts,
  highlight: Float,
  onTapCard: () -> Unit,
  onExpand: () -> Unit,
) {
  val toner = tonerColor()
  val tonerFaint = tonerFaintColor()
  val previewVisualLines = 3
  val previewLineSpacing = 4.dp
  val previewPadding = 16.dp

  ReaderRow(
    highlight = highlight,
    onTap = onTapCard,
    // At rest, a gradient from `tonerFaint` at the top to `toner`
    // (packages/design/tokens.md#opacity), **reaching `toner` exactly where the
    // preview's veil ends** and solid below it. The veil ends in `toner` too, so
    // the two meet without an edge. A gradient running on to the card's bottom
    // edge, as on iOS, left the veil's bottom a shade darker than the card behind
    // it: a faint rectangle inside the card.
    background = Modifier.drawBehind {
      val solid = (RowSpacing + previewPadding).toPx()
      drawRect(Brush.verticalGradient(listOf(tonerFaint, toner), startY = 0f, endY = this.size.height - solid))
    },
  ) {
    Box(
      modifier = Modifier
        .fillMaxWidth()
        .padding(vertical = previewPadding),
      contentAlignment = Alignment.Center,
    ) {
      // No fixed `.height()` here any more — a first attempt tried to
      // independently estimate one line's rendered height
      // (`(size * LINE_HEIGHT_RATIO).sp.toDp()`) to budget for exactly three,
      // and that estimate didn't actually match what `Text(lineHeight:)` renders
      // in practice: the box came out shorter than three real lines *and* a
      // visibly different size from the card's own bled bounds around it — which
      // is what read as a second, inset background rather than one card. Taking
      // exactly three real lines and letting the Column size itself to however
      // tall they actually are removes the estimate entirely, so there's nothing
      // left that can disagree with reality.
      ReaderText {
        Column(
          verticalArrangement = Arrangement.spacedBy(previewLineSpacing),
          modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = ReaderCard.bleed),
        ) {
          continuation.lines.take(previewVisualLines).forEach { line ->
            Text(
              text = line.gurmukhi,
              fontFamily = fonts.body,
              fontSize = size.sp,
              lineHeight = (size * DesignTokens.LINE_HEIGHT_RATIO).sp,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
          }
        }
      }
      // A solid-colour veil painted over the text, top to bottom, ending exactly
      // at `toner` — not a mask of the text's own alpha, which multiplies unevenly
      // against Gurmukhi's stacked matras. See `preview`'s own comment on iOS.
      // **The card's full width**, not the text's, so it has no side edges to
      // show against the gradient behind it.
      Box(
        modifier = Modifier
          .matchParentSize()
          .background(Brush.verticalGradient(0f to Color.Transparent, 1f to toner)),
      )
      Button(onClick = onExpand) { Text("Expand") }
    }
  }
}

/** Saves a set of ids as a list. Explicit, rather than relying on the set being
 * `Serializable`, which depends on which Set implementation is behind it. */
private val StringSetSaver = listSaver<Set<String>, String>(save = { it.toList() }, restore = { it.toSet() })

/** The reader: [bani] under the viewer's header, whose Journeys button calls
 * [onJourneys], and whose Controls button calls [onControls], or [onSettings] when
 * long-pressed. It opens with [startLine] at the top (`continue reading`; null for
 * the top of the bani) and reports the line at the top as it scrolls ([onTopLine]),
 * both by `ReaderItem.id`. */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun BaniReader(
  bani: Bani,
  controls: ReaderControls,
  startLine: String?,
  onTopLine: (String) -> Unit,
  onJourneys: () -> Unit,
  onControls: () -> Unit,
  onSettings: () -> Unit,
  /** The header and the status bar, hidden while reading
   * onward ([rememberBarsFollowScroll]); owned by the shell. */
  bars: ReaderBars,
) {
  val context = LocalContext.current
  val weightAxis = controls.weight.roundToInt()
  val fonts = remember(context.assets, weightAxis) { GurmukhiFonts(context.assets, weightAxis.toFloat()) }
  val isTablet = LocalConfiguration.current.isTablet

  // Saved across launches and shared with the Controls
  // (docs/requirements/display-controls.md#persistence). The starting size was
  // written before any UI, in MainActivity.
  val savedSize = controls.size
  fun saveSize(value: Float) {
    controls.size = value
  }
  /** The saved size as of the latest composition, for the pinch: its handler is
   * started once (`pointerInput(isTablet)`), so a plain read of [savedSize] there
   * kept the size the reader opened at, and every pinch after the first jumped back
   * to it. */
  val currentSavedSize by rememberUpdatedState(savedSize)
  /** The size during a pinch, saved only when the fingers lift. */
  var livePinchSize by remember { mutableStateOf<Float?>(null) }
  val readerSize = livePinchSize ?: ReaderSize.displaySize(savedSize, isTablet)

  val pauses = controls.pauses
  val pronDevanagari = controls.pronDevanagari
  val pronLatin = controls.pronLatin
  val ratio = controls.ratio
  val schemes = remember(pronDevanagari, pronLatin) {
    buildList {
      if (pronDevanagari) add(Pronunciation.DEVANAGARI)
      if (pronLatin) add(Pronunciation.LATIN)
    }
  }

  // Saveable, and restored in the same first composition as `listState` below, so the
  // saved scroll index points into the list with these continuations already
  // expanded. Restoring it any later would land the scroll on the wrong row.
  var expandedContinuations by rememberSaveable(stateSaver = StringSetSaver) { mutableStateOf(setOf<String>()) }
  val rawItems = remember(bani.id) { bani.items() }
  val items = remember(rawItems, expandedContinuations) { expand(rawItems, expandedContinuations) }

  // Saves the first visible row's index and offset, and its key, which the list uses
  // to find that row again. Keys are ReaderItem.id, stable for a given bani. The
  // starting index applies only to a new reader: a recreated one restores its own.
  // A start line inside a collapsed continuation is not in the list and is skipped.
  val listState = rememberLazyListState(
    initialFirstVisibleItemIndex = startLine?.let { id -> items.indexOfFirst { it.id == id } }?.takeIf { it >= 0 } ?: 0,
  )
  // The first visible item is the one at the top of the content, just below the
  // header, which is where `continue reading` puts it back.
  val currentItems by rememberUpdatedState(items)
  val currentOnTopLine by rememberUpdatedState(onTopLine)
  LaunchedEffect(listState) {
    snapshotFlow { listState.firstVisibleItemIndex }.collect { index ->
      currentItems.getOrNull(index)?.let { currentOnTopLine(it.id) }
    }
  }
  val scope = rememberCoroutineScope()
  val view = LocalView.current
  val accessibility = context.getSystemService(android.view.accessibility.AccessibilityManager::class.java)
  val contentTopPx = with(LocalDensity.current) { viewerContentTop().toPx() }
  val cutoutTopPx = WindowInsets.displayCutout.getTop(LocalDensity.current).toFloat()
  val landingGapPx = with(LocalDensity.current) { TapLandingGap.toPx() }
  val barsFollowScroll = rememberBarsFollowScroll(bars) { !listState.canScrollBackward }

  /** The row drawn with the toner wash, by item key: a tapped line, or the row a
   * pinch is anchored to ([Highlight]). */
  var highlightedKey by remember { mutableStateOf<Any?>(null) }
  /** Holds the wash, then fades it; cancelled by the next tap or pinch. */
  var fadeJob by remember { mutableStateOf<Job?>(null) }

  /**
   * Scrolls the tapped row to the top in [TapScroll.DURATION_MS], easing in and out
   * with no overshoot (docs/requirements/display-controls.md#tap-a-line); the first
   * row never scrolls ([TapScroll.distance]).
   *
   * **`FastOutSlowInEasing`, not a curve without the ease-in**: starting at full
   * speed was tried and felt worse (2026-10-19).
   *
   * **By the row's measured offset, not `animateScrollToItem`**, which has no
   * duration or easing of its own. The tapped row is on screen, so its offset is
   * exact. The offset is from where the content starts, below the header's
   * padding, so the row lands just under the header.
   *
   * **The toner highlight is the confirmation, as on iOS** (2026-11-09): on at
   * once, held through the scroll, then faded ([Highlight]). A line's row has no
   * ripple, so the two do not compete. A Keep Reading card keeps its ripple and
   * gets no toner (`highlight = false`): it is content, not the line being read
   * (docs/interaction.md). The ripple alone, tried first, was gone in about 0.4s,
   * before the line had settled.
   *
   * **At the display's high frame rate.** A finger on the screen raises a Pixel 7a
   * from 60Hz to 90Hz; this scroll runs after the finger lifts, so it ran at 60Hz
   * and juddered beside the finger's own scrolling (2026-10-19, `dumpsys display`:
   * `frameRateCategoryRate normal=60, high=90`). The view asks for the high
   * category for the animation's length, then hands the choice back.
   */
  fun tapLine(index: Int, highlight: Boolean = true) {
    // The toner on the tapped line, as on iOS (`Highlight`), even when it does not
    // scroll; not on a Keep Reading card, which keeps its ripple.
    if (highlight) items.getOrNull(index)?.let { item ->
      fadeJob?.cancel()
      highlightedKey = item.id
      fadeJob = scope.launch {
        delay(Highlight.IN_MS + Highlight.HOLD_MS)
        if (highlightedKey == item.id) highlightedKey = null
      }
    }
    val row = listState.layoutInfo.visibleItemsInfo.firstOrNull { it.index == index } ?: return
    // A tap reads onward, as a scroll down does (`rememberBarsFollowScroll`), and
    // lands the line just below the camera cutout, where the hidden header was. Not
    // under TalkBack, where the header stays and the line lands below it.
    val hidesBars = accessibility?.isTouchExplorationEnabled != true
    val raise = if (hidesBars) (contentTopPx - cutoutTopPx - landingGapPx).coerceAtLeast(0f) else 0f
    val distance = TapScroll.distance(index, row.offset.toFloat(), raise) ?: return
    if (hidesBars) bars.set(hidden = true)
    scope.launch {
      view.requestedFrameRate = View.REQUESTED_FRAME_RATE_CATEGORY_HIGH
      try {
        listState.animateScrollBy(distance, tween(TapScroll.DURATION_MS, easing = FastOutSlowInEasing))
      } finally {
        view.requestedFrameRate = View.REQUESTED_FRAME_RATE_CATEGORY_DEFAULT
      }
    }
  }

  /**
   * The row a pinch under way holds still, and the size it was last held at. Plain
   * fields, not state: written by the pinch, read only below.
   */
  val hold = remember { object { var row: Pinch.Row? = null; var size = 0f } }
  /**
   * **Requested from the composition that applies the new size**, so the list lays
   * the rows out at that size and from the anchor in one pass (Pinch.hold).
   * Requested from the pinch's handler instead, a layout pass could run between the
   * two, as one does in tests straight after a touch: the request was spent at the
   * old size, and the new size then arrived without it, a frame out of place.
   * Side effects run after composition and before the layout that uses it.
   */
  SideEffect {
    val row = hold.row ?: return@SideEffect
    if (readerSize != hold.size) {
      hold.size = readerSize
      listState.requestScrollToItem(row.index, Pinch.hold(row))
    }
  }

  /** Each visible row's extent, without the [RowSpacing] padding inside it, so a
   * pinch in that padding counts as between rows. Pixels from the reader's top, the
   * same space the pointer reports in. */
  fun visibleRows(spacingPx: Float): List<Pinch.Row> {
    val info = listState.layoutInfo
    return info.visibleItemsInfo.map {
      val top = (it.offset - info.viewportStartOffset).toFloat()
      Pinch.Row(it.key, it.index, top + spacingPx, top + it.size - spacingPx, listOffset = it.offset)
    }
  }

  val contentTop = viewerContentTop()
  val bottomInset = with(LocalDensity.current) { WindowInsets.navigationBars.getBottom(this).toDp() }
  val sides = sideSafeArea.asPaddingValues()

  Box(Modifier.fillMaxSize()) {
    LazyColumn(
      state = listState,
      modifier = Modifier
        .fillMaxSize()
        // No fade under the status bar and the header
        // (2026-11-09); the text runs under them as it is.
        .nestedScroll(barsFollowScroll)
        .pointerInput(isTablet) {
          val spacingPx = RowSpacing.toPx()
          // **The Initial pass, and every event consumed once a second finger is
          // down**, so the pinch owns the gesture. In the Main pass the list and the
          // rows see each event first: the list can scroll with the fingers
          // mid-pinch, and lifting them counted as a tap on the row (seen on device
          // 2026-10-14) — a ripple beside the anchor's toner, and a scroll to the
          // top competing with the pinch's hold. The first finger's down is not
          // consumed, so a one-finger scroll or tap is untouched.
          awaitEachGesture {
            awaitFirstDown(requireUnconsumed = false, pass = PointerEventPass.Initial)
            // Set when a second finger lands; null means this gesture is not a pinch.
            var baseline: Float? = null
            // Cumulative since the pinch began, so the size cannot compound.
            var magnification = 1f
            var anchor: Pinch.Row? = null
            do {
              val event = awaitPointerEvent(PointerEventPass.Initial)
              if (baseline == null && event.changes.count { it.pressed } >= 2) {
                // From the size on screen, within range, not the saved value.
                baseline = ReaderSize.displaySize(currentSavedSize, isTablet)
                val focalY = Pinch.focus(event.changes.filter { it.pressed }.map { it.position.y })
                anchor = Pinch.anchor(focalY, visibleRows(spacingPx), size.height.toFloat())
                hold.row = anchor
                hold.size = baseline
                // At once too, before any size step: it stops a fling still running
                // from a scroll, which would otherwise move the row off its offset.
                anchor?.let { listState.requestScrollToItem(it.index, Pinch.hold(it)) }
                fadeJob?.cancel()
                highlightedKey = anchor?.key
              }
              if (baseline != null) {
                // Until every finger lifts, including the ups, so none ends as a tap.
                event.changes.forEach { it.consume() }
                val zoom = event.calculateZoom()
                if (zoom != 1f) {
                  magnification *= zoom
                  val next = Pinch.size(baseline, magnification, isTablet)
                  // The row is held by the SideEffect above, as this size is applied.
                  if (next != livePinchSize) livePinchSize = next
                }
              }
            } while (event.changes.any { it.pressed })
            if (baseline != null) {
              // The saved size is the live one, so nothing moves on release.
              hold.row = null
              livePinchSize?.let(::saveSize)
              livePinchSize = null
              anchor?.let { row ->
                fadeJob = scope.launch {
                  delay(Highlight.HOLD_MS)
                  if (highlightedKey == row.key) highlightedKey = null
                }
              }
            }
          }
        },
      contentPadding = PaddingValues(
        top = contentTop,
        bottom = bottomInset,
        // The 16dp gutter, less the card's bleed, which each row adds back as
        // padding inside its own rounded bounds (see ReaderRow), inside the side
        // safe area: clear of a cutout in landscape, and level with the header's
        // buttons, which are inset the same way.
        start = sides.calculateLeftPadding(LayoutDirection.Ltr) + 16.dp - ReaderCard.bleed,
        end = sides.calculateRightPadding(LayoutDirection.Ltr) + 16.dp - ReaderCard.bleed,
      ),
    ) {
      itemsIndexed(items, key = { _, item -> item.id }) { index, item ->
        // On at once, so it shows as the pinch starts; off with a fade.
        val highlight by animateFloatAsState(
          targetValue = if (highlightedKey == item.id) 1f else 0f,
          animationSpec = when {
            highlightedKey != item.id -> tween(Highlight.FADE_MS, easing = EaseOut)
            Highlight.IN_MS == 0 -> snap()
            else -> tween(Highlight.IN_MS, easing = EaseIn)
          },
          label = "pinch anchor",
        )
        when (item) {
          is ReaderItem.LineItem ->
            // The toner, not a ripple, confirms the tap — see tapLine's comment.
            ReaderRow(highlight = highlight, onTap = { tapLine(index) }, ripple = false) {
              Box(Modifier.padding(horizontal = ReaderCard.bleed)) {
                LineRow(
                  line = item.line,
                  size = readerSize,
                  pauses = pauses,
                  schemes = schemes,
                  ratio = ratio,
                  fonts = fonts,
                  precededByTitle = precedingItemIsTitle(items, index),
                )
              }
            }
          is ReaderItem.ContinuationItem ->
            ContinuationCard(
              continuation = item.continuation,
              size = readerSize,
              fonts = fonts,
              highlight = highlight,
              onTapCard = { tapLine(index, highlight = false) },
              onExpand = { expandedContinuations = expandedContinuations + item.continuation.id },
            )
        }
      }
    }
    StatusBarBand(bars)
    HidingHeader(bars) {
      ViewerHeader(title = bani.latin, onJourneys = onJourneys) {
        ControlsButton(onClick = onControls, onLongClick = onSettings)
      }
    }
  }
}
