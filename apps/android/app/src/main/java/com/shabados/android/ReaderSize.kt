package com.shabados.android

import kotlin.math.pow
import kotlin.math.roundToInt

// The reader's sizing rules, with no Android or Compose types, so the JVM tests in
// src/test can pin each one (CLAUDE.md: every domain rule needs a test that fails
// when it breaks). The Compose code in BaniReaderView.kt only measures and draws.
//
// Every size here is in dp, drawn as-is. The system font scale chooses the starting
// size once and is then not applied again
// (docs/requirements/display-controls.md#starting-size).

/** Where the reader's size is saved: SharedPreferences in the app, a field in tests. */
interface SizeStore {
  fun get(): Float?
  fun set(size: Float)
}

object ReaderSize {
  /**
   * Saves the starting size if no size is saved yet. **Written once, never
   * recomputed**: changing the system Font size later does not move the reader, and a
   * size set by pinch is never overwritten. [bodyDp] is asked for only when it
   * is needed.
   */
  fun saveStartingSizeOnce(store: SizeStore, isTablet: Boolean, bodyDp: () -> Float) {
    if (store.get() != null) return
    store.set(DesignTokens.startingSize(isTablet, bodyDp()))
  }

  /**
   * The size the reader draws at: the saved size, within this device's range. The
   * saved value is not rewritten, so a size saved on a tablet's wider range (or by an
   * older version) comes back when the range allows it again.
   */
  fun displaySize(saved: Float, isTablet: Boolean): Float = DesignTokens.clamp(saved, isTablet)
}

object Pinch {
  /**
   * How strongly the size follows the fingers: size × magnification^0.75, so
   * spreading the fingers to twice their distance enlarges the text about 1.68×.
   * Chosen on iOS 2026-10-10 by trying 0.25 to 1.5 on an iPhone and an iPad
   * (`BaniReaderView.pinchSensitivity` there). Kept on Android after trying 0.5
   * on a Pixel (2026-10-15), which needs a 10× finger spread to go from 28 to 88.
   */
  const val SENSITIVITY = 0.75

  /**
   * The step the live size moves in: 1/6dp, the same grid as iOS's 1/6pt, so a saved
   * size means the same on both. About half a device pixel on a typical phone. A font
   * size step moves every glyph along a line in proportion, so a line's end shifts by
   * many pixels per step: whole pixels (0.38dp at 2.625x) felt stepped on a Pixel
   * (2026-10-14). 1/24 felt no smoother than 1/6 on the same Pixel (2026-10-15), so
   * the iOS grid, with fewer relayouts per pinch.
   */
  const val STEPS_PER_DP = 6

  /**
   * The live size for a pinch that began at [baseline] and has reached
   * [magnification] (cumulative since the pinch began, not per event, so it cannot
   * compound and run away), on the [STEPS_PER_DP] grid.
   *
   * Callers pass the *displayed* size as [baseline], already within range, so a saved
   * size above this device's maximum starts the pinch from the maximum, rather than
   * from a size the reader is not showing.
   */
  fun size(baseline: Float, magnification: Float, isTablet: Boolean): Float {
    val raw = baseline * magnification.toDouble().pow(SENSITIVITY)
    val snapped = (raw * STEPS_PER_DP).roundToInt().toFloat() / STEPS_PER_DP
    return DesignTokens.clamp(snapped, isTablet)
  }

  /**
   * A row's visible extent, in pixels from the top of the reader, and [listOffset],
   * where the list itself places the row's top: pixels from where its content starts,
   * below the top content padding (`LazyListItemInfo.offset`).
   */
  data class Row(val key: Any, val index: Int, val top: Float, val bottom: Float, val listOffset: Int = 0)

  /**
   * The row a pinch starting at height [y] is anchored to: the row under the fingers
   * if there is one. **A pinch that starts in the gap between two rows picks the one
   * nearer the middle of the screen**, so a gap in the top half takes the row below
   * and a gap in the bottom half the row above. Same rule as iOS's `pinchAnchor`.
   */
  fun anchor(y: Float, rows: List<Row>, viewportHeight: Float): Row? {
    rows.firstOrNull { y >= it.top && y <= it.bottom }?.let { return it }
    val above = rows.filter { it.bottom < y }.maxByOrNull { it.bottom }
    val below = rows.filter { it.top > y }.minByOrNull { it.top }
    return if (y < viewportHeight / 2) below ?: above else above ?: below
  }

  /**
   * The scroll offset that keeps [row]'s top where it is, for
   * `LazyListState.requestScrollToItem(row.index, hold(row))`, requested on every
   * size step of the pinch. **The list is laid out from the anchor row**: it is placed
   * first, at this offset, and the rows around it at their new sizes, in the same
   * measure pass that draws the new size. So the row is never drawn out of place and
   * nothing is corrected afterwards.
   *
   * **The row's top holds, not the point under the fingers.** The new size grows the
   * row downward from a top that does not move. Holding the point under the fingers
   * would need the row's height at the new size before it is measured; using the
   * last frame's height draws each step once out of place, the jitter the per-step
   * correction had (apps/ios/README.md#state-of-play). The Flutter spike held the top
   * in the same way, and it was judged smooth on device (2026-11).
   *
   * The list's offset counts forward: positive takes the row's top above where the
   * content starts, so a row whose top is below it is held with a negative offset.
   */
  fun hold(row: Row): Int = -row.listOffset
}
