package com.shabados.android

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * The reading shell's rules (Shell.kt): the journey's idle boundary, the Journeys
 * sidebar's open and close, its drag, the default screen's pills, and tap-to-scroll.
 *
 * What this cannot check: the drawing, and that the Compose wiring calls these (a
 * Compose UI test is a dependency not yet taken, README.md#tests). Those are checked
 * on a device.
 */
class ShellTest {
  private class FakeStore(var value: LastRead? = null) : LastReadStore {
    override fun get() = value
    override fun set(value: LastRead) { this.value = value }
  }

  /** Both clocks move together, as they do unless the device sleeps or the time is
   * changed; [wall] starts somewhere else, so mixing the two up shows. */
  private var clock = 0L
  private val wall get() = 1_800_000_000_000L + clock
  private val store = FakeStore()
  private fun shell() = ShellState(now = { clock }, wallNow = { wall }, store = store)
  private val minute = 60_000L
  private val hour = 60 * minute

  // ---------------------------------------------------------------- journeys

  @Test fun `nothing open at first shows the default screen with no continue reading`() {
    val shell = shell()
    assertNull(shell.openId)
    assertNull(shell.previousId)
  }

  @Test fun `14 minutes without activity does not end a journey`() {
    val shell = shell()
    shell.open("JAPJ")
    clock += 15 * minute - 1
    shell.refresh()
    assertEquals("JAPJ", shell.openId)
  }

  @Test fun `15 minutes without activity ends a journey and offers it to continue`() {
    // docs/requirements/journeys.md#journeys
    val shell = shell()
    shell.open("JAPJ")
    clock += 15 * minute
    shell.refresh()
    assertNull(shell.openId)
    assertEquals("JAPJ", shell.previousId)
  }

  @Test fun `activity restarts the 15 minutes`() {
    val shell = shell()
    shell.open("JAPJ")
    clock += 10 * minute
    shell.touch()
    clock += 10 * minute
    shell.refresh()
    assertEquals("JAPJ", shell.openId)
  }

  @Test fun `using the sidebar is activity`() {
    val shell = shell()
    shell.open("JAPJ")
    clock += 10 * minute
    shell.setSide(Side.JOURNEYS)
    clock += 10 * minute
    shell.refresh()
    assertEquals("JAPJ", shell.openId)
  }

  @Test fun `going idle with nothing open keeps the last continue reading`() {
    val shell = shell()
    shell.open("JAPJ")
    clock += 15 * minute
    shell.refresh()
    clock += 15 * minute
    shell.refresh()
    assertEquals("JAPJ", shell.previousId)
  }

  // ---------------------------------------------------------- continue reading

  @Test fun `a daily bani read under 8 hours ago is offered after a force close`() {
    // reading-shell.md#the-default-screen, decided 2026-10-16.
    shell().open("JAPJ")
    clock += 8 * hour - 1
    val restarted = shell() // a new process, the same saved store
    assertNull(restarted.openId)
    assertEquals("JAPJ", restarted.previousId)
  }

  @Test fun `a daily bani read 8 hours ago is not offered`() {
    shell().open("JAPJ")
    clock += 8 * hour
    assertNull(shell().previousId)
  }

  @Test fun `the 8 hours run from the last activity, not from opening`() {
    val shell = shell()
    shell.open("RHRS")
    clock += 3 * hour
    shell.touch()
    shell.saveLastRead() // the app leaves the screen
    clock += 6 * hour
    assertEquals("RHRS", shell().previousId)
  }

  @Test fun `every bundled bani is a daily bani, Rehras and Sohila included`() {
    assertEquals(setOf("JAPJ", "JAAP", "TPSS", "BNCP", "ANND", "RHRS", "SHLA"), ContinueReading.DAILY_IDS)
  }

  @Test fun `a bani that is not a daily bani is not offered`() {
    shell().open("ASKV")
    clock += minute
    assertNull(shell().previousId)
  }

  @Test fun `a time ahead of the clock is not offered`() {
    assertFalse(ContinueReading.offers(LastRead("JAPJ", atMs = 2_000L), nowMs = 1_000L))
  }

  @Test fun `the same 8 hours apply without a force close`() {
    val shell = shell()
    shell.open("SHLA")
    clock += 15 * minute
    shell.refresh()
    assertEquals("SHLA", shell.previousId)
    clock += 8 * hour - 15 * minute
    shell.refresh()
    assertNull("8 hours after it was last read", shell.previousId)
  }

  @Test fun `a journey that ends records when it was last read, not when it ended`() {
    val shell = shell()
    shell.open("JAPJ")
    clock += 15 * minute
    shell.refresh()
    assertEquals(wall - 15 * minute, store.value?.atMs)
  }

  // ---------------------------------------------------------------- reading position
  // journeys.md: "End a journey, reopen it ⇒ the same tabs, each at the position it held"

  @Test fun `continue reading returns to the line that was at the top`() {
    val shell = shell()
    shell.open("JAPJ")
    shell.readingLine = "line-40"
    clock += 15 * minute
    shell.refresh()
    assertEquals("line-40", store.value?.line)
    shell.resume()
    assertEquals("JAPJ", shell.openId)
    assertEquals("line-40", shell.startLine)
  }

  @Test fun `the line survives the app being closed`() {
    val first = shell()
    first.open("JAPJ")
    first.readingLine = "line-40"
    first.saveLastRead() // the app leaves the screen
    val second = shell() // a new process, reading what was saved
    second.resume()
    assertEquals("line-40", second.startLine)
  }

  @Test fun `opening a bani from a list starts at its top`() {
    val shell = shell()
    shell.open("JAPJ")
    shell.readingLine = "line-40"
    shell.open("RHRS")
    assertNull(shell.startLine)
    assertNull(shell.readingLine)
  }

  // ---------------------------------------------------------------- screen awake
  // reading-shell.md#the-screen-stays-awake-while-content-is-read

  @Test fun `the screen is held awake while a bani is open with no sidebar`() {
    val shell = shell()
    assertFalse("default screen", shell.keepsScreenOn)
    shell.open("JAPJ")
    assertTrue(shell.keepsScreenOn)
    shell.setSide(Side.JOURNEYS)
    assertFalse("Journeys open", shell.keepsScreenOn)
    shell.setSide(null)
    assertTrue(shell.keepsScreenOn)
  }

  @Test fun `going idle releases the screen`() {
    val shell = shell()
    shell.open("JAPJ")
    clock += 15 * minute
    shell.refresh()
    assertFalse(shell.keepsScreenOn)
  }

  @Test fun `the idle limit is 15 minutes`() {
    assertEquals(15 * minute, ShellState.IDLE_LIMIT_MS)
  }

  // ---------------------------------------------------------------- sidebar

  @Test fun `opening a bani closes the sidebar`() {
    // reading-shell.md: every path out of the sidebar closes it.
    val shell = shell()
    shell.setSide(Side.JOURNEYS)
    shell.open("RHRS")
    assertFalse(shell.journeysOpen)
    assertEquals("RHRS", shell.openId)
  }

  @Test fun `the haptic plays on opening only`() {
    // docs/interaction.md: a light haptic on opening, none on closing.
    val shell = shell()
    assertTrue(shell.setSide(Side.JOURNEYS))
    assertFalse("already open", shell.setSide(Side.JOURNEYS))
    assertFalse("closing", shell.setSide(null))
    assertTrue("Controls", shell.setSide(Side.CONTROLS))
    assertTrue("switching to Journeys opens it", shell.setSide(Side.JOURNEYS))
  }

  @Test fun `at most one sidebar is open`() {
    // reading-shell.md#the-controls-sidebar: opening one sidebar closes the other.
    val shell = shell()
    shell.setSide(Side.JOURNEYS)
    shell.toggle(Side.CONTROLS)
    assertEquals(Side.CONTROLS, shell.openSide)
    assertFalse(shell.journeysOpen)
  }

  @Test fun `a header button opens its sidebar and closes it again`() {
    val shell = shell()
    shell.toggle(Side.CONTROLS)
    assertEquals(Side.CONTROLS, shell.openSide)
    shell.toggle(Side.CONTROLS)
    assertNull(shell.openSide)
  }

  @Test fun `Controls open releases the screen and Back closes it`() {
    val shell = shell()
    shell.open("JAPJ")
    shell.setSide(Side.CONTROLS)
    assertFalse(shell.keepsScreenOn)
    assertTrue(shell.handlesBack)
    shell.back()
    assertNull(shell.openSide)
  }

  @Test fun `Back closes the sidebar`() {
    val shell = shell()
    shell.setSide(Side.JOURNEYS)
    assertTrue(shell.handlesBack)
    shell.back()
    assertFalse(shell.journeysOpen)
  }

  @Test fun `Back with the sidebar closed is left to the system`() {
    assertFalse(shell().handlesBack)
  }

  @Test fun `Controls is not laid out over Journeys`() {
    // Faded out over Journeys it still took touches: taps on Journeys' rows moved
    // its hidden sliders (2026-10-22).
    assertFalse(Sidebar.controlsLaidOut(0.01f))
    assertFalse(Sidebar.controlsLaidOut(1f))
    assertTrue(Sidebar.controlsLaidOut(0f))
    assertTrue(Sidebar.controlsLaidOut(-1f))
  }

  @Test fun `the sidebar fades from 40 percent to full by half the slide`() {
    assertEquals(0.4f, Sidebar.strength(0f), 1e-6f)
    assertEquals(0.7f, Sidebar.strength(0.25f), 1e-6f)
    assertEquals(1f, Sidebar.strength(0.5f), 1e-6f)
    assertEquals(1f, Sidebar.strength(1f), 1e-6f)
  }

  @Test fun `the sidebar zooms from 95 percent to full at the end of the slide`() {
    assertEquals(0.95f, Sidebar.scale(0f), 1e-6f)
    assertEquals(0.975f, Sidebar.scale(0.5f), 1e-6f)
    assertEquals(1f, Sidebar.scale(1f), 1e-6f)
  }

  @Test fun `the viewer leaves a 72dp edge`() {
    assertEquals(72f, Sidebar.PEEK_DP)
  }

  @Test fun `in portrait the sidebar is the screen's width less the edge`() {
    assertEquals(339f, Sidebar.travel(width = 411f, height = 914f, peek = 72f, edgeInset = 0f))
  }

  @Test fun `in landscape the sidebar is as wide as in portrait`() {
    assertEquals(
      Sidebar.travel(width = 411f, height = 914f, peek = 72f, edgeInset = 0f),
      Sidebar.travel(width = 914f, height = 411f, peek = 72f, edgeInset = 0f),
    )
  }

  @Test fun `a cutout on the left widens the sidebar by its inset, so its contents keep their width`() {
    // The panel is padded clear of the cutout inside the travel.
    val portrait = Sidebar.travel(width = 411f, height = 914f, peek = 72f, edgeInset = 0f)
    val landscape = Sidebar.travel(width = 914f, height = 411f, peek = 72f, edgeInset = 48f)
    assertEquals(portrait, landscape - 48f)
  }

  // ---------------------------------------------------------------- drag

  private val slop = 10f

  @Test fun `a drag is undecided until it has moved the decision distance`() {
    assertNull(Sidebar.judge(dx = 9f, dy = 2f, decision = slop, open = null))
  }

  @Test fun `a mostly horizontal rightward drag opens`() {
    assertEquals(Sidebar.Axis.HORIZONTAL, Sidebar.judge(dx = 30f, dy = 10f, decision = slop, open = null))
  }

  @Test fun `a drag more sideways than up or down is a swipe`() {
    // About 40°: more sideways than up or down.
    assertEquals(Sidebar.Axis.HORIZONTAL, Sidebar.judge(dx = 30f, dy = 25f, decision = slop, open = null))
  }

  @Test fun `a steeper drag is a scroll`() {
    // 45° exactly is not more sideways than up or down.
    assertEquals(Sidebar.Axis.OTHER, Sidebar.judge(dx = 30f, dy = 30f, decision = slop, open = null))
    assertEquals(Sidebar.Axis.OTHER, Sidebar.judge(dx = 30f, dy = 31f, decision = slop, open = null))
    assertEquals(Sidebar.Axis.OTHER, Sidebar.judge(dx = 2f, dy = 40f, decision = slop, open = null))
  }

  @Test fun `a leftward drag opens Controls`() {
    assertEquals(Sidebar.Axis.HORIZONTAL, Sidebar.judge(dx = -30f, dy = 0f, decision = slop, open = null))
  }

  @Test fun `with Controls open a rightward drag closes and a leftward one does not`() {
    assertEquals(Sidebar.Axis.HORIZONTAL, Sidebar.judge(dx = 30f, dy = 0f, decision = slop, open = Side.CONTROLS))
    assertEquals(Sidebar.Axis.OTHER, Sidebar.judge(dx = -30f, dy = 0f, decision = slop, open = Side.CONTROLS))
  }

  @Test fun `a leftward drag closes and a rightward one does not`() {
    assertEquals(Sidebar.Axis.HORIZONTAL, Sidebar.judge(dx = -30f, dy = 0f, decision = slop, open = Side.JOURNEYS))
    assertEquals(Sidebar.Axis.OTHER, Sidebar.judge(dx = 30f, dy = 0f, decision = slop, open = Side.JOURNEYS))
  }

  @Test fun `a drag from the gesture navigation edges does not count`() {
    // docs/interaction.md: on Android the edges belong to system Back.
    val width = 1000f
    assertFalse(Sidebar.startsInContent(x = 20f, width = width, leftEdge = 60f, rightEdge = 60f))
    assertFalse(Sidebar.startsInContent(x = 980f, width = width, leftEdge = 60f, rightEdge = 60f))
    assertTrue(Sidebar.startsInContent(x = 500f, width = width, leftEdge = 60f, rightEdge = 60f))
  }

  @Test fun `with three-button navigation a drag may start anywhere`() {
    assertTrue(Sidebar.startsInContent(x = 0f, width = 1000f, leftEdge = 0f, rightEdge = 0f))
  }

  @Test fun `a drag moves the viewer by its share of the travel, within the ends`() {
    val j = 800f
    val c = 600f
    assertEquals(0.25f, Sidebar.progress(open = null, dx = 200f, journeys = j, controls = c), 1e-6f)
    assertEquals(0.75f, Sidebar.progress(open = Side.JOURNEYS, dx = -200f, journeys = j, controls = c), 1e-6f)
    assertEquals(1f, Sidebar.progress(open = null, dx = 2000f, journeys = j, controls = c), 1e-6f)
    assertEquals(0f, Sidebar.progress(open = Side.JOURNEYS, dx = -2000f, journeys = j, controls = c), 1e-6f)
  }

  @Test fun `towards Controls the viewer moves left, over Controls' own travel`() {
    val j = 800f
    val c = 600f
    assertEquals(-0.5f, Sidebar.progress(open = null, dx = -300f, journeys = j, controls = c), 1e-6f)
    assertEquals(-1f, Sidebar.progress(open = null, dx = -3000f, journeys = j, controls = c), 1e-6f)
    assertEquals(-0.5f, Sidebar.progress(open = Side.CONTROLS, dx = 300f, journeys = j, controls = c), 1e-6f)
    // From Controls a drag only closes: it cannot carry on into Journeys.
    assertEquals(0f, Sidebar.progress(open = Side.CONTROLS, dx = 3000f, journeys = j, controls = c), 1e-6f)
  }

  @Test fun `a released drag lands past halfway, or where a flick carries it`() {
    val j = 800f
    val c = 800f
    assertNull(Sidebar.settle(open = null, dx = 300f, velocityX = 0f, journeys = j, controls = c))
    assertEquals(Side.JOURNEYS, Sidebar.settle(open = null, dx = 500f, velocityX = 0f, journeys = j, controls = c))
    // 100px quickly: 100 + 2000 × 0.2 = 500 of 800.
    assertEquals(Side.JOURNEYS, Sidebar.settle(open = null, dx = 100f, velocityX = 2000f, journeys = j, controls = c))
    assertNull(Sidebar.settle(open = Side.JOURNEYS, dx = -100f, velocityX = -2000f, journeys = j, controls = c))
    assertEquals(Side.CONTROLS, Sidebar.settle(open = null, dx = -500f, velocityX = 0f, journeys = j, controls = c))
    assertNull(Sidebar.settle(open = Side.CONTROLS, dx = 100f, velocityX = 2000f, journeys = j, controls = c))
  }

  // ---------------------------------------------------------------- weight
  // display-controls.md#weight: every reader line keeps its distance from the Gurmukhi.

  @Test fun `at the default weight every field is drawn the same distance lighter`() {
    val control = DesignTokens.WEIGHT_DEFAULT
    assertEquals(500f, ReaderWeight.of(DesignTokens.WEIGHT_PRIMARY, control))
    assertEquals(DesignTokens.WEIGHT_SECONDARY - 50f, ReaderWeight.of(DesignTokens.WEIGHT_SECONDARY, control))
    assertEquals(DesignTokens.WEIGHT_LATIN - 50f, ReaderWeight.of(DesignTokens.WEIGHT_LATIN, control))
  }

  @Test fun `a heavier weight makes the secondary fields heavier by as much`() {
    assertEquals(540f, ReaderWeight.of(DesignTokens.WEIGHT_SECONDARY, 650f))
  }

  @Test fun `no field leaves the font's axis`() {
    assertEquals(900f, ReaderWeight.of(850f, DesignTokens.WEIGHT_MAX))
    assertEquals(100f, ReaderWeight.of(100f, DesignTokens.WEIGHT_MIN))
  }

  // ---------------------------------------------------------------- default screen

  private fun bani(id: String) = Bani(id, mapOf("Latn" to id), sections = emptyList(), continuations = emptyList())

  @Test fun `the pills are Jap Ji, Rehras and Kirtan Sohila in that order, skipping what is not bundled`() {
    // reading-shell.md#the-default-screen; Ardas is not in the corpus yet.
    val banis = listOf("SHLA", "ZERL", "RHRS", "JAPJ").map(::bani)
    assertEquals(listOf("JAPJ", "RHRS", "SHLA"), DefaultScreenPills.of(banis).map { it.id })
  }

  @Test fun `Ardas joins the pills once bundled`() {
    val banis = listOf("ARDS", "SHLA", "RHRS", "JAPJ").map(::bani)
    assertEquals(listOf("JAPJ", "RHRS", "SHLA", "ARDS"), DefaultScreenPills.of(banis).map { it.id })
  }

  // ---------------------------------------------------------------- tap a line

  @Test fun `a tapped line scrolls by its offset to the top`() {
    assertEquals(640f, TapScroll.distance(index = 5, rowTop = 640f))
  }

  @Test fun `the first row never scrolls on tap`() {
    assertNull(TapScroll.distance(index = 0, rowTop = 0f))
    assertNull(TapScroll.distance(index = 0, rowTop = -30f))
  }

  @Test fun `the tap scroll takes half a second`() {
    // display-controls.md#tap-a-line, on both platforms (2026-10-16).
    assertEquals(500, TapScroll.DURATION_MS)
  }
}
