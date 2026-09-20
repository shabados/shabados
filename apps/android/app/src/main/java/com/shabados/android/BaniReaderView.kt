package com.shabados.android

import android.content.res.AssetManager
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.calculateCentroid
import androidx.compose.foundation.gestures.calculateZoom
import androidx.compose.foundation.gestures.scrollBy
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
// matchParentSize needs no import -- it's a member of BoxScope, not a top-level
// function, and resolves automatically inside a Box{} content lambda.
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.lerp
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontVariation
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

/**
 * Sant Lipi at a specific `wght` axis value. A single `Font()` entry pins one
 * static instance of a variable font — arbitrary weights (title 650, ik oankar
 * 400, body 550, ...) each need their own [FontVariation.Settings], the Android
 * equivalent of `Fonts.variable(_:size:weight:)` on iOS. Callers `remember` the
 * result keyed on the weight so this isn't rebuilt every recomposition.
 */
private fun gurmukhiFont(assets: AssetManager, weight: Int): FontFamily =
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
  lerp(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.onBackground, DesignTokens.TONER_OPACITY)

private fun vishraamColor(weight: Vishraam, dark: Boolean): Color =
  when (weight) {
    Vishraam.HEAVY -> if (dark) DesignTokens.vishraamHeavyDark else DesignTokens.vishraamHeavyLight
    Vishraam.MEDIUM -> if (dark) DesignTokens.vishraamMediumDark else DesignTokens.vishraamMediumLight
    Vishraam.LIGHT -> if (dark) DesignTokens.vishraamLightDark else DesignTokens.vishraamLightLight
  }

/** The reader's one "card" treatment: a rounded rect filled with [color], drawn
 * bled outward by [bleed] on every side. `drawBehind` isn't clipped to this
 * composable's own layout bounds by default, so — unlike a plain
 * `Modifier.background()` — the fill can extend past them without the content
 * itself repositioning to make room for it, the same property the iOS version's
 * negative-padding trick relies on. */
private fun Modifier.readerCardBackground(color: Color, bleed: androidx.compose.ui.unit.Dp = 8.dp, cornerRadius: androidx.compose.ui.unit.Dp = 12.dp) =
  this.drawBehind {
    val bleedPx = bleed.toPx()
    drawRoundRect(
      color = color,
      topLeft = Offset(-bleedPx, -bleedPx),
      size = androidx.compose.ui.geometry.Size(size.width + bleedPx * 2, size.height + bleedPx * 2),
      cornerRadius = androidx.compose.ui.geometry.CornerRadius(cornerRadius.toPx()),
    )
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
 * re-entry. */
private class GurmukhiFonts(assets: AssetManager) {
  val title = gurmukhiFont(assets, Title.WEIGHT)
  val body = gurmukhiFont(assets, DesignTokens.WEIGHT_PRIMARY.roundToInt())
  val secondary = gurmukhiFont(assets, DesignTokens.WEIGHT_SECONDARY.roundToInt())
  val ikOankar = gurmukhiFont(assets, Title.IK_OANKAR_WEIGHT)
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
  val dark = isSystemInDarkTheme()
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
        fontWeight = if (scheme == Pronunciation.LATIN) FontWeight(DesignTokens.WEIGHT_LATIN.roundToInt()) else null,
        fontSize = secondary.sp,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        textAlign = if (isTitle) TextAlign.Center else TextAlign.Start,
        modifier = Modifier.fillMaxWidth(),
      )
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
 */
@Composable
private fun ContinuationCard(
  continuation: Continuation,
  size: Float,
  fonts: GurmukhiFonts,
  onTapCard: () -> Unit,
  onExpand: () -> Unit,
) {
  val toner = tonerColor()
  val previewVisualLines = 3
  val previewLineSpacing = 4.dp

  Box(
    // No `.clip()` on this Box — it would clip away `readerCardBackground`'s own
    // bleed, which draws outside these bounds on purpose (see that modifier's own
    // comment). The rounded shape comes from the drawn rect itself, not a clip.
    modifier = Modifier
      .fillMaxWidth()
      .readerCardBackground(toner)
      // Default ripple, deliberately not suppressed (unlike a plain line row's
      // own clickable) — this card already has a permanent toner background,
      // so it has no "flash toner then fade" highlight of its own to give it a
      // tap cue; the ripple is that cue instead, and is the idiomatic Android
      // answer to "how do I show a tap happened" generally.
      .clickable { onTapCard() }
      // Vertical only. A horizontal inset here would push the preview text in
      // past where every ordinary reading line already sits (the LazyColumn's
      // own 16dp start/end contentPadding applies to this row already) — the
      // two need to line up, not add a second, larger indent on top.
      .padding(vertical = 16.dp),
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
    Column(
      verticalArrangement = Arrangement.spacedBy(previewLineSpacing),
      modifier = Modifier.fillMaxWidth(),
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
    // A solid-colour veil painted over the text, top to bottom, ending exactly
    // at `toner` — not a mask of the text's own alpha, which multiplies unevenly
    // against Gurmukhi's stacked matras. See `preview`'s own comment on iOS.
    Box(
      modifier = Modifier
        .matchParentSize()
        .background(Brush.verticalGradient(0f to Color.Transparent, 1f to toner)),
    )
    Button(onClick = onExpand) { Text("Expand") }
  }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BaniReader(bani: Bani, onBack: () -> Unit) {
  val assets = LocalContext.current.assets
  val fonts = remember(assets) { GurmukhiFonts(assets) }
  var zoomAccumulator by remember { mutableFloatStateOf(DesignTokens.DEFAULT_SIZE) }
  var size by remember { mutableFloatStateOf(DesignTokens.DEFAULT_SIZE) }
  var pauses by remember { mutableStateOf(true) }
  var pronDevanagari by remember { mutableStateOf(false) }
  var pronLatin by remember { mutableStateOf(false) }
  var ratio by remember { mutableFloatStateOf(DesignTokens.RATIO_DEFAULT) }
  val schemes = remember(pronDevanagari, pronLatin) {
    buildList {
      if (pronDevanagari) add(Pronunciation.DEVANAGARI)
      if (pronLatin) add(Pronunciation.LATIN)
    }
  }

  var expandedContinuations by remember { mutableStateOf(setOf<String>()) }
  val rawItems = remember(bani.id) { bani.items() }
  val items = remember(rawItems, expandedContinuations) { expand(rawItems, expandedContinuations) }

  val listState = rememberLazyListState()
  val scope = rememberCoroutineScope()

  /** Scrolls the tapped row to the top. **No custom highlight here** — that was
   * iOS's own answer to "confirm which line was tapped," built because
   * SwiftUI's plain tap gestures have no feedback of their own. Android
   * already has one: the default ripple every `clickable` gets, which is why
   * neither this row's own `clickable` nor `ContinuationCard`'s suppresses it.
   * Same requirement (docs/requirements/display-controls.md#tap-a-line), a
   * platform-appropriate mechanism rather than a ported one. */
  fun tapLine(index: Int) {
    scope.launch { listState.animateScrollToItem(index) }
  }

  // The row under the fingers when a pinch begins, plus where within that row and
  // where on screen. LazyColumn holds the *top* item across a size change, so
  // without this the page slides away as type grows.
  var anchorIndex by remember { mutableIntStateOf(-1) }
  var anchorFraction by remember { mutableFloatStateOf(0f) }
  var anchorScreenY by remember { mutableFloatStateOf(0f) }

  fun captureAnchor(focalY: Float) {
    val info = listState.layoutInfo
    val hit = info.visibleItemsInfo.firstOrNull {
      val top = it.offset - info.viewportStartOffset
      focalY >= top && focalY <= top + it.size
    }
    if (hit == null) {
      anchorIndex = listState.firstVisibleItemIndex
      anchorFraction = 0f
    } else {
      anchorIndex = hit.index
      val top = hit.offset - info.viewportStartOffset
      anchorFraction = if (hit.size > 0) (focalY - top) / hit.size else 0f
    }
    anchorScreenY = focalY
  }

  fun restoreAnchor(scale: Float) {
    if (anchorIndex < 0) return
    scope.launch {
      val info = listState.layoutInfo
      val measured = info.visibleItemsInfo.firstOrNull { it.index == anchorIndex }?.size ?: 0
      val newHeight = measured * scale
      val targetTop = anchorScreenY - anchorFraction * newHeight
      listState.scrollToItem(anchorIndex, 0)
      listState.scrollBy(-targetTop)
    }
  }

  Scaffold(
    topBar = {
      TopAppBar(
        title = { Text(bani.latin) },
        navigationIcon = { TextButton(onClick = onBack) { Text("Back") } },
        actions = {
          TextButton(onClick = { size = DesignTokens.clamp(size - 2f) }) { Text("A-") }
          TextButton(onClick = { size = DesignTokens.clamp(size + 2f) }) { Text("A+") }
          var menuOpen by remember { mutableStateOf(false) }
          TextButton(onClick = { menuOpen = true }) { Text("⋯") }
          DropdownMenu(expanded = menuOpen, onDismissRequest = { menuOpen = false }) {
            DropdownMenuItem(
              text = { Text("Pauses") },
              trailingIcon = { Checkbox(checked = pauses, onCheckedChange = { pauses = it }) },
              onClick = { pauses = !pauses },
            )
            DropdownMenuItem(
              text = { Text(Pronunciation.DEVANAGARI.label) },
              trailingIcon = { Checkbox(checked = pronDevanagari, onCheckedChange = { pronDevanagari = it }) },
              onClick = { pronDevanagari = !pronDevanagari },
            )
            DropdownMenuItem(
              text = { Text(Pronunciation.LATIN.label) },
              trailingIcon = { Checkbox(checked = pronLatin, onCheckedChange = { pronLatin = it }) },
              onClick = { pronLatin = !pronLatin },
            )
          }
        },
      )
    }
  ) { inset ->
    LazyColumn(
      state = listState,
      modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
          awaitEachGesture {
            awaitFirstDown(requireUnconsumed = false)
            var zooming = false
            do {
              val event = awaitPointerEvent()
              if (event.changes.count { it.pressed } >= 2) {
                if (!zooming) {
                  captureAnchor(event.calculateCentroid(useCurrent = true).y)
                  zoomAccumulator = size
                  zooming = true
                }
                val zoom = event.calculateZoom()
                if (zoom != 1f) {
                  zoomAccumulator = DesignTokens.clamp(zoomAccumulator * zoom)
                  val stepped = zoomAccumulator.roundToInt().toFloat()
                  if (stepped != size) {
                    val scale = stepped / size
                    size = stepped
                    restoreAnchor(scale)
                  }
                  event.changes.forEach { it.consume() }
                }
              }
            } while (event.changes.any { it.pressed })
            anchorIndex = -1
          }
        },
      contentPadding = PaddingValues(
        top = inset.calculateTopPadding(),
        bottom = inset.calculateBottomPadding(),
        start = 16.dp,
        end = 16.dp,
      ),
    ) {
      itemsIndexed(items, key = { _, item -> item.id }) { index, item ->
        Box(
          modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        ) {
          when (item) {
            is ReaderItem.LineItem ->
              // Default ripple, same reasoning as ContinuationCard's own
              // clickable — see tapLine's comment.
              Box(
                modifier = Modifier
                  .fillMaxWidth()
                  .clickable { tapLine(index) },
              ) {
                LineRow(
                  line = item.line,
                  size = size,
                  pauses = pauses,
                  schemes = schemes,
                  ratio = ratio,
                  fonts = fonts,
                  precededByTitle = precedingItemIsTitle(items, index),
                )
              }
            is ReaderItem.ContinuationItem ->
              ContinuationCard(
                continuation = item.continuation,
                size = size,
                fonts = fonts,
                onTapCard = { tapLine(index) },
                onExpand = { expandedContinuations = expandedContinuations + item.continuation.id },
              )
          }
        }
      }
    }
  }
}
