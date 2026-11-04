package com.shabados.android

import android.content.Context
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.test.SemanticsNodeInteraction
import androidx.compose.ui.test.TouchInjectionScope
import androidx.compose.ui.test.click
import androidx.compose.ui.test.longClick
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performTouchInput
import androidx.compose.ui.unit.dp
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Ignore
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.RuntimeEnvironment
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import kotlin.math.abs

/**
 * The gesture matrix: a gesture, the thing it starts on, and what
 * docs/requirements/reading-shell.md and display-controls.md expect. Real touches
 * through the shell's own pointer handling (`sidebarDrag`, the reader's pinch, each
 * row's `clickable`), on the JVM under Robolectric.
 *
 * Ported from the Flutter spike's `test/gesture_matrix_test.dart`. "Nothing else
 * happened" is read from the state a touch would change: [ShellState] (what is open,
 * which sidebar), [ReaderControls.size], and where rows sit on screen.
 *
 * **What a synthetic touch cannot show** is left to a device: how a flick feels, a
 * pinch's smoothness, and Android's edge Back. Robolectric reports no
 * `WindowInsets.systemGestures`, so every drag here starts "inside the content", as
 * with three-button navigation; `Sidebar.startsInContent` is pinned by ShellTest.
 *
 * **Native graphics**, so text is measured with real font metrics and re-wraps as
 * it would on a phone. Under the default stand-in, every row measures the same at
 * any size and the pinch tests would prove nothing.
 *
 * The library is built here rather than read from `banis.json`: parsing calls
 * packages/gurmukhi through JNA, whose native library is built for Android only.
 * Pronunciations are off for the same reason (they transcribe through it).
 */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
// About a Galaxy A16: 1080 × 2340 at 420dpi.
@Config(qualifiers = "w411dp-h891dp-xxhdpi")
class GestureMatrixTest {
  @get:Rule val rule = createComposeRule()

  private lateinit var shell: ShellState
  private lateinit var controls: ReaderControls

  /** Each bani's rows say which bani and row they are, and are long enough to wrap. */
  private fun row(bani: String, index: Int) = "ਪੰਗਤੀ $bani $index ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ"

  private fun bani(id: String, name: String) = Bani(
    id = id,
    name = mapOf("Guru" to name, "Latn" to id),
    sections = listOf(
      (0 until 60).map { i ->
        val text = row(id, i)
        Line("$id-$i", text, text, emptyList(), false, false, false, false, false, null)
      }
    ),
    continuations = emptyList(),
  )

  /** Three of the default screen's pills (`DefaultScreenPills`), and one bani that is
   * only in Journeys. */
  private val banis = listOf(
    bani("JAPJ", "ਜਪੁ ਜੀ ਸਾਹਿਬ"),
    bani("JAAP", "ਜਾਪੁ ਸਾਹਿਬ"),
    bani("RHRS", "ਰਹਰਾਸਿ ਸਾਹਿਬ"),
    bani("SHLA", "ਕੀਰਤਨ ਸੋਹਿਲਾ"),
  )

  private var clock = 1_000_000L

  @Before fun reset() {
    clock = 1_000_000L
  }

  /** The app as MainActivity draws it, with [lastRead] saved from before, if any. */
  private fun launch(lastRead: LastRead? = null) {
    val context = RuntimeEnvironment.getApplication()
    val prefs = context.getSharedPreferences("gesture-matrix", Context.MODE_PRIVATE)
    prefs.edit().clear().commit()
    controls = ReaderControls(prefs)
    var saved = lastRead
    shell = ShellState(
      now = { clock },
      wallNow = { clock },
      store = object : LastReadStore {
        override fun get() = saved
        override fun set(value: LastRead) { saved = value }
      },
    )
    rule.setContent {
      ShabadOSTheme(dark = false) { ReaderShell(shell, "test", banis, controls) }
    }
    rule.waitForIdle()
  }

  // ------------------------------------------------------------------ helpers

  private val width get() = with(rule.density) { 411.dp.toPx() }
  private val height get() = with(rule.density) { 891.dp.toPx() }
  private val peek get() = with(rule.density) { Sidebar.PEEK_DP.dp.toPx() }
  private fun px(dp: Float) = with(rule.density) { dp.dp.toPx() }

  private fun bounds(node: SemanticsNodeInteraction): Rect = node.fetchSemanticsNode().boundsInRoot
  /** In the merged tree, as TalkBack reads it: what is covered is cleared from it
   * (`clearAndSetSemantics` in ReaderShell), so a label behind the viewer is not
   * found. A row's bounds are its tappable row's, padding included. */
  private fun text(t: String) = rule.onNodeWithText(t, substring = true)
  private fun centre(t: String) = bounds(text(t)).center
  private fun top(t: String) = bounds(text(t)).top
  /** Null once the row has left the screen and the list has let it go. */
  private fun topOrNull(t: String): Float? =
    rule.onAllNodesWithText(t, substring = true).fetchSemanticsNodes().singleOrNull()?.boundsInRoot?.top

  /** Opens a bani through its pill. */
  private fun openReader(id: String = "JAPJ") {
    tap(centre(banis.withId(id)!!.gurmukhi))
    assertEquals(id, shell.openId)
  }

  /** Opens a sidebar with its header button. */
  private fun openSide(side: Side) {
    rule.onNodeWithContentDescription(if (side == Side.JOURNEYS) "Journeys" else "Controls").performTouchInput { click() }
    rule.waitForIdle()
    assertEquals(side, shell.openSide)
  }

  private fun touch(block: TouchInjectionScope.() -> Unit) {
    rule.onRoot().performTouchInput(block)
  }

  private fun tap(at: Offset) {
    touch { click(at) }
    rule.waitForIdle()
  }

  /** A one-finger drag in [steps] moves of 16ms each, so the velocity is a real one.
   * Lifts unless [lift] is false. */
  private fun drag(from: Offset, by: Offset, steps: Int = 12, lift: Boolean = true) {
    touch {
      down(from)
      repeat(steps) { moveBy(by / steps.toFloat(), delayMillis = 16) }
      if (lift) up()
    }
    if (lift) rule.waitForIdle()
  }

  /** The middle of the viewer's edge left in view with [side] open: in portrait the
   * viewer slides by the width less the peek (`Sidebar.travel`), so the edge is the
   * last [peek] on the right with Journeys open, the first on the left with Controls. */
  private fun edge(side: Side): Offset =
    Offset(if (side == Side.JOURNEYS) width - peek / 2 else peek / 2, height / 2)

  /** The reader's 4th row: below the first, which never scrolls on a tap. */
  private val someRow get() = row("JAPJ", 3)

  /** Where reader content starts: no status bar under Robolectric, then the header. */
  private val contentTop get() = px(64f)

  // ---------------------------------------------------------------------- tap

  @Test fun `tap a pill - opens that bani`() {
    launch()
    tap(centre("ਰਹਰਾਸਿ ਸਾਹਿਬ"))
    assertEquals("RHRS", shell.openId)
    assertNull(shell.openSide)
  }

  @Test fun `tap Continue reading - opens the last bani`() {
    launch(lastRead = LastRead("JAAP", clock - 1000))
    tap(centre("Continue reading"))
    assertEquals("JAAP", shell.openId)
  }

  @Test fun `tap a line - scrolls it to the top, nothing else`() {
    launch()
    openReader()
    tap(centre(someRow))
    assertEquals(contentTop, top(someRow), 2f)
    assertNull(shell.openSide)
  }

  @Test fun `tap a Journeys row - opens it and closes Journeys`() {
    launch()
    openSide(Side.JOURNEYS)
    tap(centre("ਜਾਪੁ ਸਾਹਿਬ"))
    assertEquals("JAAP", shell.openId)
    assertNull(shell.openSide)
  }

  @Test fun `tap the viewer's edge - returns to the viewer`() {
    launch()
    openSide(Side.JOURNEYS)
    tap(edge(Side.JOURNEYS))
    assertNull(shell.openSide)
  }

  // ---------------------------------------------------------- horizontal swipe

  @Test fun `swipe a pill - opens Journeys, never opens the bani`() {
    launch()
    drag(centre("ਜਪੁ ਜੀ ਸਾਹਿਬ"), Offset(px(200f), 0f))
    assertEquals(Side.JOURNEYS, shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `swipe a pill slowly leftward - opens Controls, never opens the bani`() {
    launch()
    drag(centre("ਜਪੁ ਜੀ ਸਾਹਿਬ"), Offset(px(-220f), 0f), steps = 60)
    assertEquals(Side.CONTROLS, shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `swipe Continue reading - opens Controls, never continues`() {
    launch(lastRead = LastRead("JAAP", clock - 1000))
    drag(centre("Continue reading"), Offset(px(-200f), 0f))
    assertEquals(Side.CONTROLS, shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `swipe a line - opens Journeys, never taps the line`() {
    launch()
    openReader()
    val before = top(someRow)
    drag(centre(someRow), Offset(px(200f), 0f))
    assertEquals(Side.JOURNEYS, shell.openSide)
    // A tap would have scrolled it to the top. Measured once the viewer is back.
    tap(edge(Side.JOURNEYS))
    assertEquals(before, top(someRow), 1f)
  }

  @Test fun `swipe a Journeys row leftward - closes Journeys, never opens the row`() {
    launch()
    openSide(Side.JOURNEYS)
    drag(centre("ਜਾਪੁ ਸਾਹਿਬ"), Offset(px(-200f), 0f))
    assertNull(shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `swipe the viewer's edge - closes the sidebar`() {
    launch()
    openSide(Side.JOURNEYS)
    drag(edge(Side.JOURNEYS), Offset(px(-200f), 0f))
    assertNull(shell.openSide)
  }

  @Test fun `swipe the Zoom slider with Controls open - moves the slider, Controls stays`() {
    launch()
    openSide(Side.CONTROLS)
    val before = controls.size
    drag(bounds(rule.onNodeWithContentDescription("Zoom")).center, Offset(px(120f), 0f))
    assertEquals(Side.CONTROLS, shell.openSide)
    assertTrue("size ${controls.size} after $before", controls.size > before)
  }

  @Test fun `swipe a Controls title away from its slider - closes Controls`() {
    launch()
    openSide(Side.CONTROLS)
    drag(centre("Zoom"), Offset(px(200f), 0f))
    assertNull(shell.openSide)
  }

  // ----------------------------------------------------------- vertical scroll

  @Test fun `scroll a line - scrolls only`() {
    launch()
    openReader()
    val before = top(someRow)
    drag(centre(someRow), Offset(0f, px(-300f)))
    val after = topOrNull(someRow)
    assertTrue("from $before to $after", after == null || after < before - px(100f))
    assertNull(shell.openSide)
  }

  @Test fun `scroll from a pill - nothing opens`() {
    launch()
    drag(centre("ਜਪੁ ਜੀ ਸਾਹਿਬ"), Offset(0f, px(200f)))
    assertNull(shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `scroll a Journeys row - nothing opens, Journeys stays`() {
    launch()
    openSide(Side.JOURNEYS)
    drag(centre("ਜਾਪੁ ਸਾਹਿਬ"), Offset(0f, px(-150f)))
    assertEquals(Side.JOURNEYS, shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `scroll the Zoom slider - size unchanged, Controls stays`() {
    launch()
    openSide(Side.CONTROLS)
    val before = controls.size
    drag(bounds(rule.onNodeWithContentDescription("Zoom")).center, Offset(0f, px(150f)))
    assertEquals(before, controls.size, 0f)
    assertEquals(Side.CONTROLS, shell.openSide)
  }

  @Test fun `scroll the viewer's edge - nothing`() {
    launch()
    openSide(Side.JOURNEYS)
    drag(edge(Side.JOURNEYS), Offset(0f, px(250f)))
    assertEquals(Side.JOURNEYS, shell.openSide)
  }

  // --------------------------------------------------------------- 45° drag

  /** Exactly one of a scroll or a swipe, for a drag along [direction] in dp. */
  private fun diagonal(direction: Offset) {
    launch()
    openReader()
    // Scrolled a little first, so an upward scroll has room to show.
    drag(Offset(width / 2, height * 0.7f), Offset(0f, px(-300f)))
    // Whichever row is in the middle of the screen now.
    val watched = (0 until 60).map { row("JAPJ", it) }.first { t ->
      topOrNull(t)?.let { it > height * 0.4f && it < height * 0.6f } == true
    }
    val before = top(watched)
    drag(Offset(width / 2, height / 2), Offset(px(direction.x), px(direction.y)))
    val scrolled = topOrNull(watched)?.let { abs(it - before) > 1f } ?: true
    val swiped = shell.openSide != null
    assertTrue("$direction: scrolled $scrolled, swiped $swiped", scrolled != swiped)
  }

  @Test fun `a 45 degree drag down-right on a line - exactly one of scroll or swipe`() = diagonal(Offset(150f, 150f))

  @Test fun `a 45 degree drag up-left on a line - exactly one of scroll or swipe`() = diagonal(Offset(-150f, -150f))

  @Test fun `a 45 degree drag on a pill - never opens the bani`() {
    launch()
    drag(centre("ਜਪੁ ਜੀ ਸਾਹਿਬ"), Offset(px(150f), px(150f)))
    assertNull(shell.openId)
  }

  @Test fun `a 45 degree drag on the Zoom slider - Controls stays`() {
    launch()
    openSide(Side.CONTROLS)
    drag(bounds(rule.onNodeWithContentDescription("Zoom")).center, Offset(px(100f), px(100f)))
    assertEquals(Side.CONTROLS, shell.openSide)
  }

  // --------------------------------------------------------------------- pinch

  /**
   * Two fingers [gap] apart vertically around [at], spreading by [spread] each, one
   * frame per step. [eachFrame] runs after every frame is drawn.
   */
  private fun pinch(at: Offset, gap: Float = px(60f), spread: Float = px(80f), steps: Int = 10, eachFrame: () -> Unit = {}) {
    rule.mainClock.autoAdvance = false
    touch {
      down(1, at - Offset(0f, gap / 2))
      down(2, at + Offset(0f, gap / 2))
    }
    rule.mainClock.advanceTimeByFrame()
    repeat(steps) {
      touch {
        updatePointerBy(1, Offset(0f, -spread / steps))
        updatePointerBy(2, Offset(0f, spread / steps))
        move()
      }
      // Two frames a step, each checked: the new size may be applied in either.
      repeat(2) {
        rule.mainClock.advanceTimeByFrame()
        eachFrame()
      }
    }
    touch {
      up(1)
      up(2)
    }
    rule.mainClock.autoAdvance = true
    rule.waitForIdle()
  }

  @Test fun `pinch a line - zooms only, and the row holds still on every frame`() {
    launch()
    openReader()
    // Mid-list, so there are rows above the anchor to re-wrap.
    drag(Offset(width / 2, height * 0.8f), Offset(0f, px(-400f)))
    val anchor = row("JAPJ", 10)
    val start = top(anchor)
    val before = controls.size
    val tops = mutableListOf<Float>()
    pinch(centre(anchor)) { tops += top(anchor) }
    assertTrue("size ${controls.size} after $before", controls.size > before)
    assertNull(shell.openSide)
    assertEquals("an open bani", "JAPJ", shell.openId)
    tops.forEachIndexed { frame, y -> assertEquals("frame $frame", start, y, 2f) }
    // And nothing moves it once the fingers lift.
    assertEquals("after release", start, top(anchor), 2f)
  }

  @Test fun `pinch in mid-list - the row holds still on every frame`() {
    launch()
    openReader()
    drag(Offset(width / 2, height * 0.8f), Offset(0f, px(-400f)))
    val anchor = row("JAPJ", 10)
    val start = top(anchor)
    val before = controls.size
    val tops = mutableListOf<Float>()
    pinch(centre(anchor), gap = px(160f), spread = px(-50f)) { tops += top(anchor) }
    assertTrue("size ${controls.size} after $before", controls.size < before)
    tops.forEachIndexed { frame, y -> assertEquals("frame $frame", start, y, 2f) }
    assertEquals("after release", start, top(anchor), 2f)
  }

  /** At the top of the bani the list stays anchored at its top: there is nothing
   * above the first row to hold another row still, and the list does not leave space
   * above it. Accepted as right by the author (2026-11-04). */
  @Test fun `pinch in at the top of the bani - the list stays anchored at its top`() {
    launch()
    openReader()
    val first = row("JAPJ", 0)
    val start = top(first)
    val before = controls.size
    val tops = mutableListOf<Float>()
    pinch(centre(row("JAPJ", 2)), gap = px(160f), spread = px(-50f)) { tops += top(first) }
    assertTrue("size ${controls.size} after $before", controls.size < before)
    tops.forEachIndexed { frame, y -> assertEquals("frame $frame", start, y, 2f) }
  }

  /** The Settings row at Controls' foot is tappable, like the viewer's edge. */
  @Test fun `swipe Controls' Settings row - closes Controls, never opens Settings`() {
    launch()
    openSide(Side.CONTROLS)
    drag(centre("Settings"), Offset(px(200f), 0f))
    assertNull(shell.openSide)
    rule.onNodeWithContentDescription("Back").assertDoesNotExist()
  }

  @Test fun `swipe the Controls viewer's edge - closes Controls`() {
    launch()
    openSide(Side.CONTROLS)
    drag(edge(Side.CONTROLS), Offset(px(200f), 0f))
    assertNull(shell.openSide)
  }

  @Test fun `a second pinch starts from the size the first left`() {
    launch()
    openReader()
    pinch(centre(someRow))
    val first = controls.size
    // Fingers that land and lift without spreading leave the size where it is.
    pinch(centre(someRow), spread = 0f)
    assertEquals(first, controls.size, 0f)
    pinch(centre(someRow), spread = px(10f))
    assertTrue("from $first to ${controls.size}", controls.size > first)
  }

  @Test fun `a pinch spread sideways - zooms, never swipes`() {
    launch()
    openReader()
    val before = controls.size
    val c = centre(someRow)
    rule.mainClock.autoAdvance = false
    touch {
      down(1, c - Offset(px(30f), 0f))
      down(2, c + Offset(px(30f), 0f))
    }
    repeat(10) {
      touch {
        updatePointerBy(1, Offset(px(-8f), 0f))
        updatePointerBy(2, Offset(px(8f), 0f))
        move()
      }
      rule.mainClock.advanceTimeByFrame()
    }
    touch { up(1); up(2) }
    rule.mainClock.autoAdvance = true
    rule.waitForIdle()
    assertNull(shell.openSide)
    assertTrue(controls.size > before)
  }

  @Test fun `pinch a pill - nothing (no zoom on the default screen)`() {
    launch()
    val before = controls.size
    pinch(centre("ਜਪੁ ਜੀ ਸਾਹਿਬ"), gap = px(20f))
    assertNull(shell.openSide)
    assertNull(shell.openId)
    assertEquals(before, controls.size, 0f)
  }

  @Test fun `pinch a Journeys row - nothing opens, Journeys stays`() {
    launch()
    openSide(Side.JOURNEYS)
    pinch(centre("ਜਾਪੁ ਸਾਹਿਬ"), gap = px(20f))
    assertEquals(Side.JOURNEYS, shell.openSide)
    assertNull(shell.openId)
  }

  @Test fun `the slider shows the size a pinch made while it was hidden`() {
    launch()
    openReader()
    pinch(centre(someRow))
    val pinched = controls.size
    openSide(Side.CONTROLS)
    val range = rule.onNodeWithContentDescription("Zoom").fetchSemanticsNode()
      .config[androidx.compose.ui.semantics.SemanticsProperties.ProgressBarRangeInfo]
    assertEquals(pinched, range.current, 0.01f)
  }

  // ------------------------------------------------- a second finger joins

  @Test fun `a second finger joins a swipe on a line - the swipe is abandoned`() {
    launch()
    openReader()
    val start = centre(someRow) + Offset(px(-100f), 0f)
    drag(start, Offset(px(80f), 0f), lift = false)
    touch { down(9, start + Offset(px(80f), px(120f))) }
    // Both fingers keep going right, past halfway open: only abandoning the swipe
    // leaves the viewer closed.
    repeat(10) {
      touch {
        updatePointerBy(0, Offset(px(16f), 0f))
        updatePointerBy(9, Offset(px(16f), 0f))
        move(delayMillis = 16)
      }
    }
    touch { up(0); up(9) }
    rule.waitForIdle()
    assertNull("the swipe settles back", shell.openSide)
    assertEquals("JAPJ", shell.openId)
  }

  @Test fun `a second finger joins a swipe on a pill - abandoned, nothing opens`() {
    launch()
    val start = centre("ਜਪੁ ਜੀ ਸਾਹਿਬ")
    drag(start, Offset(px(80f), 0f), lift = false)
    touch { down(9, start + Offset(0f, px(120f))) }
    repeat(10) { touch { updatePointerBy(0, Offset(px(16f), 0f)); move(delayMillis = 16) } }
    touch { up(0); up(9) }
    rule.waitForIdle()
    assertNull(shell.openSide)
    assertNull(shell.openId)
  }

  // ---------------------------------------------------------------- long press

  @Test fun `long press the Controls button - Settings, no sidebar, the lift does not tap`() {
    launch()
    rule.onNodeWithContentDescription("Controls").performTouchInput { longClick() }
    rule.waitForIdle()
    assertNull(shell.openSide)
    rule.onNodeWithContentDescription("Back").assertExists("Settings shows")
  }

  /** A row is a plain `clickable` with no long-press action, and Compose counts a held
   * press that lifts as a tap. The requirements give a line no long press. */
  @Ignore("Finding 2026-11-04: a long press on a line taps it when the finger lifts")
  @Test fun `long press a line - the lift does not tap`() {
    launch()
    openReader()
    val before = top(someRow)
    touch { longClick(centre(someRow)) }
    rule.waitForIdle()
    assertEquals("a tap would scroll it to the top", before, top(someRow), 1f)
    assertNull(shell.openSide)
  }

  // ---------------------------------------------------- a tap after a swipe

  @Test fun `a tap on a Journeys row the frame after the swipe that opened Journeys`() {
    launch()
    rule.mainClock.autoAdvance = false
    drag(Offset(width / 2, height * 0.85f), Offset(px(200f), 0f), lift = false)
    touch { up() }
    rule.mainClock.advanceTimeByFrame()
    rule.mainClock.autoAdvance = true
    tap(centre("ਜਾਪੁ ਸਾਹਿਬ"))
    assertEquals("JAAP", shell.openId)
  }

  @Test fun `a tap on a line right after a swipe that closed Controls`() {
    launch()
    openReader()
    openSide(Side.CONTROLS)
    drag(edge(Side.CONTROLS), Offset(px(200f), 0f))
    assertNull(shell.openSide)
    tap(centre(someRow))
    assertEquals(contentTop, top(someRow), 2f)
  }

  // ------------------------------------- a tap where the hidden sidebar would be

  @Test fun `Controls open, a tap on a Journeys row's place - never reaches Journeys`() {
    launch()
    openSide(Side.JOURNEYS)
    val place = centre("ਜਾਪੁ ਸਾਹਿਬ")
    tap(edge(Side.JOURNEYS))
    openSide(Side.CONTROLS)
    tap(place)
    assertNull(shell.openId)
    assertEquals(Side.CONTROLS, shell.openSide)
  }

  @Test fun `Journeys open, a tap on the slider's place - the viewer's edge, not the slider`() {
    launch()
    openSide(Side.CONTROLS)
    val slider = bounds(rule.onNodeWithContentDescription("Zoom")).center
    tap(edge(Side.CONTROLS))
    openSide(Side.JOURNEYS)
    val before = controls.size
    tap(Offset(slider.x.coerceIn(width - peek + px(8f), width - px(8f)), slider.y))
    assertEquals(before, controls.size, 0f)
    assertNull(shell.openSide)
  }

  @Test fun `nothing open, a tap on the slider's place - the viewer only`() {
    launch()
    openReader()
    openSide(Side.CONTROLS)
    val slider = bounds(rule.onNodeWithContentDescription("Zoom")).center
    tap(edge(Side.CONTROLS))
    val before = controls.size
    tap(slider)
    assertEquals(before, controls.size, 0f)
    assertNull(shell.openSide)
  }

  // ------------------------------------------------------------------ Settings

  @Test fun `swipe the Pauses switch in Settings - the switch's, never the viewer's`() {
    launch()
    rule.onNodeWithContentDescription("Controls").performTouchInput { longClick() }
    rule.waitForIdle()
    tap(centre("Display"))
    drag(centre("Pauses"), Offset(px(200f), 0f))
    assertNull(shell.openSide)
    rule.onNodeWithText("Pauses").assertExists("still Settings")
  }
}
