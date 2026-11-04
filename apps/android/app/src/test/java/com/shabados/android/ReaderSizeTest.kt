package com.shabados.android

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertSame
import org.junit.Test
import kotlin.math.abs
import kotlin.math.roundToInt

/**
 * The reader's sizing rules (docs/requirements/display-controls.md#zoom and
 * #starting-size). Run with `./gradlew :app:testDebugUnitTest` from apps/android.
 */
class ReaderSizeTest {
  private class FakeStore(var value: Float? = null) : SizeStore {
    override fun get() = value
    override fun set(size: Float) { value = size }
  }

  // ------------------------------------------------------------ starting size

  @Test fun `the default font scale starts at defaultSize`() {
    assertEquals(DesignTokens.DEFAULT_SIZE, DesignTokens.startingSize(isTablet = false, bodyDp = 17f))
  }

  /** The rows of tokens.md's Android table. The generator checks the table against
   * its own arithmetic; this checks that the Kotlin arithmetic agrees. */
  @Test fun `each Pixel font scale step starts at its tokens_md row`() {
    val rows = mapOf(14.45f to 24f, 17f to 28f, 18.95f to 32f, 20.9f to 34f, 23.5f to 38f, 26.8f to 44f, 29f to 48f)
    for ((body, size) in rows) {
      assertEquals("body $body dp", size, DesignTokens.startingSize(isTablet = false, bodyDp = body))
    }
  }

  @Test fun `a tablet starts at the pad size whatever the font scale`() {
    for (body in listOf(14.45f, 17f, 29f)) {
      assertEquals(DesignTokens.PAD_STARTING_SIZE, DesignTokens.startingSize(isTablet = true, bodyDp = body))
    }
  }

  @Test fun `a phone starting size stays within the zoom range`() {
    assertEquals(DesignTokens.PHONE_MAX_SIZE, DesignTokens.startingSize(isTablet = false, bodyDp = 100f))
    assertEquals(DesignTokens.MIN_SIZE, DesignTokens.startingSize(isTablet = false, bodyDp = 5f))
  }

  @Test fun `the starting size is saved on first launch`() {
    val store = FakeStore()
    ReaderSize.saveStartingSizeOnce(store, isTablet = false) { 23.5f }
    assertEquals(38f, store.value)
  }

  @Test fun `the starting size is never recomputed after a font scale change`() {
    val store = FakeStore()
    ReaderSize.saveStartingSizeOnce(store, isTablet = false) { 17f }
    ReaderSize.saveStartingSizeOnce(store, isTablet = false) { 29f }
    assertEquals(DesignTokens.DEFAULT_SIZE, store.value)
  }

  @Test fun `a pinched size is never overwritten`() {
    val store = FakeStore(61.5f)
    ReaderSize.saveStartingSizeOnce(store, isTablet = false) { error("must not be asked for the body size") }
    assertEquals(61.5f, store.value)
  }

  // -------------------------------------------------------------- display size

  @Test fun `a saved size above the phone maximum draws at the maximum and is kept`() {
    val saved = 120f
    assertEquals(DesignTokens.PHONE_MAX_SIZE, ReaderSize.displaySize(saved, isTablet = false))
    // The same saved value draws as-is where the range allows it.
    assertEquals(saved, ReaderSize.displaySize(saved, isTablet = true))
  }

  // --------------------------------------------------------------------- pinch

  @Test fun `pinch size follows magnification to the power 0_75`() {
    // 28 × 2^0.75 = 47.09; in sixths, 282.54 rounds to 283.
    assertEquals(283f / 6, Pinch.size(28f, 2f, isTablet = false))
  }

  @Test fun `pinch size moves in sixths of a dp, as on iOS`() {
    for (magnification in listOf(0.7f, 1.13f, 1.5f, 2.2f)) {
      val steps = Pinch.size(28f, magnification, isTablet = false) * 6
      assertEquals("magnification $magnification", 0f, abs(steps - steps.roundToInt()), 1e-3f)
    }
  }

  @Test fun `pinch size is clamped to the device's range`() {
    assertEquals(DesignTokens.PHONE_MAX_SIZE, Pinch.size(80f, 4f, isTablet = false))
    assertEquals(DesignTokens.PAD_MAX_SIZE, Pinch.size(100f, 4f, isTablet = true))
    assertEquals(DesignTokens.MIN_SIZE, Pinch.size(20f, 0.1f, isTablet = false))
  }

  @Test fun `a pinch starts from the displayed size, not a saved size beyond range`() {
    val baseline = ReaderSize.displaySize(120f, isTablet = false)
    assertEquals(DesignTokens.PHONE_MAX_SIZE, Pinch.size(baseline, 1f, isTablet = false))
    // Pinching in from there shrinks at once, rather than first working down from 120.
    assertEquals((88 * 6 * Math.pow(0.9, 0.75)).roundToInt() / 6f, Pinch.size(baseline, 0.9f, isTablet = false))
  }

  // ------------------------------------------------------------------- anchor

  private val a = Pinch.Row("a", 0, top = 0f, bottom = 100f)
  private val b = Pinch.Row("b", 1, top = 120f, bottom = 220f)
  private val c = Pinch.Row("c", 2, top = 240f, bottom = 340f)
  private val rows = listOf(a, b, c)
  private val viewport = 400f // middle at 200

  @Test fun `a pinch on a row anchors to that row`() {
    assertSame(b, Pinch.anchor(150f, rows, viewport))
  }

  @Test fun `a pinch in a gap in the top half anchors to the row below`() {
    assertSame(b, Pinch.anchor(110f, rows, viewport))
  }

  @Test fun `a pinch in a gap in the bottom half anchors to the row above`() {
    assertSame(b, Pinch.anchor(230f, rows, viewport))
  }

  @Test fun `a pinch past the last row anchors to it`() {
    assertSame(c, Pinch.anchor(390f, rows, viewport))
  }

  @Test fun `no rows means no anchor`() {
    assertNull(Pinch.anchor(150f, emptyList(), viewport))
  }

  @Test fun `a pinch holds the anchor row's top where the list placed it`() {
    // Below where the content starts: the list is asked to place it that far down.
    assertEquals(-120, Pinch.hold(Pinch.Row("b", 1, top = 126f, bottom = 220f, listOffset = 120)))
    // Partly scrolled under the header: that far up.
    assertEquals(30, Pinch.hold(Pinch.Row("a", 0, top = 0f, bottom = 100f, listOffset = -30)))
  }
}
