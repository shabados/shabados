package com.shabados.android

import android.content.res.AssetManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.calculateZoom
import androidx.compose.foundation.gestures.calculateCentroid
import androidx.compose.foundation.gestures.scrollBy
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.roundToInt

/**
 * Sant Lipi is bundled rather than relying on system Gurmukhi fonts, whose coverage
 * of conjuncts and yayya variants is poor on both platforms.
 */
private fun santLipi(assets: AssetManager) =
  FontFamily(Font(path = "SantLipi-VF.ttf", assetManager = assets))

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      ShabadOSTheme(dark = isSystemInDarkTheme()) { App() }
    }
  }
}

@Composable
private fun App() {
  val assets = LocalContext.current.assets
  val banis = remember { Corpus.load(assets) }
  val gurmukhi = remember { santLipi(assets) }
  var open by remember { mutableStateOf<Bani?>(null) }

  val current = open
  if (current == null) {
    BaniList(banis, gurmukhi) { open = it }
  } else {
    BackHandler { open = null }
    BaniReader(current, gurmukhi) { open = null }
  }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun BaniList(banis: List<Bani>, gurmukhi: FontFamily, onOpen: (Bani) -> Unit) {
  Scaffold(topBar = { TopAppBar(title = { Text(stringResource(R.string.nitnem)) }) }) { inset ->
    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = inset) {
      items(banis, key = { it.id }) { bani ->
        Column(
          modifier = Modifier
            .fillMaxWidth()
            .clickable { onOpen(bani) }
            .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
          Text(
            text = bani.gurmukhi,
            fontFamily = gurmukhi,
            fontSize = DesignTokens.DEFAULT_SIZE.sp,
            lineHeight = (DesignTokens.DEFAULT_SIZE * DesignTokens.LINE_HEIGHT_RATIO).sp,
          )
          Text(bani.latin, style = MaterialTheme.typography.bodyMedium)
        }
        HorizontalDivider()
      }
    }
  }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun BaniReader(bani: Bani, gurmukhi: FontFamily, onBack: () -> Unit) {
  // Two values on purpose. `zoomAccumulator` tracks the pinch continuously so the
  // gesture feels proportional; `size` is quantised to whole sp and is what the
  // text actually uses. Rendering the raw float makes font size and line height
  // round to device pixels independently, so they drift against each other and the
  // lines jitter at every frame.
  var zoomAccumulator by remember { mutableFloatStateOf(DesignTokens.DEFAULT_SIZE) }
  var size by remember { mutableFloatStateOf(DesignTokens.DEFAULT_SIZE) }
  val items = remember(bani.id) { bani.items() }
  val listState = rememberLazyListState()
  val scope = rememberCoroutineScope()

  // The row under the fingers when a pinch begins, plus where within that row and
  // where on screen. LazyColumn holds the *top* item across a size change, so
  // without this the page slides away as type grows.
  var anchorIndex by remember { mutableIntStateOf(-1) }
  // mutableFloatStateOf, not remember { 0f }: the latter returns a value, so writes
  // would be thrown away on the next recomposition.
  var anchorFraction by remember { mutableFloatStateOf(0f) } // point within the row
  var anchorScreenY by remember { mutableFloatStateOf(0f) } // where it sat on screen

  /** Records which row is under [focalY], measured from the top of the list. */
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

  /**
   * Puts the focal point back where it was. Rows scale roughly with font size, so
   * the row's new height is estimated from [scale] rather than waiting a frame for
   * layout — which would lag a frame behind every pinch step.
   *
   * scrollToItem then scrollBy, rather than a negative scrollOffset: the offset
   * argument clamps at zero, which would pin the row to the top instead.
   */
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
        },
      )
    }
  ) { inset ->
    LazyColumn(
      state = listState,
      modifier = Modifier
        .fillMaxSize()
        // Hand-rolled rather than detectTransformGestures, which also reports pan
        // and consumes single-pointer drags — that competes with LazyColumn's
        // scrolling, so one of the two always loses. This engages only once a
        // second pointer is down, leaving one-finger scroll untouched.
        //
        // calculateZoom returns a per-event delta (unlike SwiftUI's cumulative
        // magnification), so it multiplies rather than scaling from a baseline.
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
                  // Re-anchor only when the rendered size actually changes, not on
                  // every pointer event — otherwise each frame launches a competing
                  // scrollToItem and the list fights itself.
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
      items(items, key = { it.id }) { item ->
        when (item) {
          is ReaderItem.LineItem -> Text(
            text = item.gurmukhi,
            fontFamily = gurmukhi,
            fontSize = size.sp,
            lineHeight = (size * DesignTokens.LINE_HEIGHT_RATIO).sp,
            modifier = Modifier.padding(vertical = 4.dp),
          )
          is ReaderItem.Divider ->
            HorizontalDivider(Modifier.padding(vertical = 12.dp))
        }
      }
    }
  }
}
