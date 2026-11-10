package com.shabados.android

import android.view.accessibility.AccessibilityManager
import androidx.activity.compose.LocalActivity
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.MaterialTheme
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.statusBarsIgnoringVisibility
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

/**
 * **Whether the reader's header and the status
 * bar are hidden**, as iOS's `ReaderBars` (docs/requirements/reading-shell.md#the-bars-follow-the-scroll).
 * The header stays at the top on Android, where a top app bar is the convention and
 * three-button navigation already fills the foot.
 *
 * **A hide or show plays to the end, and nothing starts until it has**: asked for
 * while one plays, a change is dropped, and the next scroll asks again.
 *
 * **Nothing here changes layout or recomposes the reader.** [progress] is read only in
 * a layer block ([HidingHeader]), so a frame of the animation
 * redraws and nothing more; [hidden] is read only by [HidingHeader]. The reader's
 * padding is measured from the status bar as if it were showing
 * (`statusBarsIgnoringVisibility`), so hiding it moves nothing. On iOS, letting the
 * bar's removal change the layout made a scroll during the animation stutter.
 */
@Stable
class ReaderBars(private val scope: CoroutineScope) {
  /** 0 showing, 1 hidden; between while animating. */
  val progress = Animatable(0f)

  /** Where the bars are, or are going. */
  var hidden by mutableStateOf(false)
    private set

  private var job: Job? = null

  /** Starts a hide or show, unless one is playing or there is nothing to change. */
  fun set(hidden: Boolean) {
    if (job?.isActive == true || hidden == this.hidden) return
    this.hidden = hidden
    job = scope.launch {
      progress.animateTo(if (hidden) 1f else 0f, tween(DURATION_MS, easing = FastOutSlowInEasing))
    }
  }

  /** Showing, at once and whatever is playing: a new reader, or Journeys opening. */
  fun reset() {
    job?.cancel()
    job = null
    hidden = false
    scope.launch { progress.snapTo(0f) }
  }

  companion object {
    /** As iOS's 0.35s. */
    const val DURATION_MS = 350

    /** How far the reader must move one way before the bars follow: any movement
     * at all, as on iOS (chosen on an iPhone, 2026-11-09). */
    val FOLLOW_DISTANCE: Dp = 1.dp
  }
}

/**
 * Hides [bars] on reading onward and shows them on scrolling back, from the person's
 * own scrolling only: a nested scroll connection hears drags and the flings after
 * them, never a scroll made in code (a tapped line's, a pinch's hold). At the top
 * they always show. **Never under TalkBack**, which reads the header as it moves
 * through the screen.
 */
@Composable
fun rememberBarsFollowScroll(bars: ReaderBars, atTop: () -> Boolean): NestedScrollConnection {
  val distance = with(LocalDensity.current) { ReaderBars.FOLLOW_DISTANCE.toPx() }
  val accessibility = LocalContext.current.getSystemService(AccessibilityManager::class.java)
  return remember(bars, distance, accessibility) {
    object : NestedScrollConnection {
      /** Travel onward, and back, since the scroll last turned. */
      var onward = 0f
      var back = 0f

      override fun onPostScroll(consumed: Offset, available: Offset, source: NestedScrollSource): Offset {
        if (accessibility?.isTouchExplorationEnabled == true) return Offset.Zero
        // A negative delta moves the content up: reading onward.
        val dy = consumed.y
        when {
          dy < 0f -> { onward -= dy; back = 0f }
          dy > 0f -> { back += dy; onward = 0f }
        }
        when {
          atTop() -> bars.set(hidden = false)
          onward > distance -> bars.set(hidden = true)
          back > distance -> bars.set(hidden = false)
        }
        return Offset.Zero
      }
    }
  }
}

/** The reader's header, slid up past the status bar and faded out while [bars] are
 * hidden. Its place in the layout never changes; slid off the screen, it takes no
 * touches, and hidden, TalkBack skips it. */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun HidingHeader(bars: ReaderBars, content: @Composable () -> Unit) {
  val travel = with(LocalDensity.current) {
    (WindowInsets.statusBarsIgnoringVisibility.getTop(this) + HeaderHeight.toPx())
  }
  Box(
    Modifier
      .graphicsLayer {
        val p = bars.progress.value
        translationY = -p * travel
        alpha = 1f - p
      }
      .then(if (bars.hidden) Modifier.clearAndSetSemantics {} else Modifier),
  ) {
    content()
  }
}

/** A solid band in the viewer's background behind the status bar while it shows
 * (2026-11-09), so the text scrolling up is covered under the clock and icons,
 * not run through them. Fades out with the bars, in a layer block, so it never
 * recomposes. */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun StatusBarBand(bars: ReaderBars) {
  val height = with(LocalDensity.current) { WindowInsets.statusBarsIgnoringVisibility.getTop(this).toDp() }
  Box(
    Modifier
      .fillMaxWidth()
      .height(height)
      .graphicsLayer { alpha = 1f - bars.progress.value }
      .background(MaterialTheme.colorScheme.background),
  )
}

/** The status bar follows [bars] while [allowed]: only over content being read, with
 * Journeys closed. Hidden, a swipe down from the top shows it for a moment, the
 * system's own way back to it. Shown again when this leaves the composition. */
@Composable
fun StatusBarFollows(bars: ReaderBars, allowed: () -> Boolean) {
  val window = LocalActivity.current?.window ?: return
  val view = LocalView.current
  LaunchedEffect(bars, window, view) {
    val controller = WindowCompat.getInsetsController(window, view)
    controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    try {
      snapshotFlow { bars.hidden && allowed() }.collect { hide ->
        if (hide) controller.hide(WindowInsetsCompat.Type.statusBars())
        else controller.show(WindowInsetsCompat.Type.statusBars())
      }
    } finally {
      controller.show(WindowInsetsCompat.Type.statusBars())
    }
  }
}
