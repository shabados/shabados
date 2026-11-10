package com.shabados.android

import android.graphics.Color
import androidx.activity.SystemBarStyle
import androidx.compose.runtime.LaunchedEffect
import android.content.Context
import android.os.Bundle
import android.os.SystemClock
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import java.util.UUID

/**
 * What is being read, held in **process memory only**
 * (docs/requirements/journeys.md#journeys; journeys are not stored yet).
 *
 * In an `object` rather than saved instance state, so it lasts exactly as long as
 * the process: rotation, a theme or Font size change, or the activity being
 * destroyed while the process lives all bring the reader back; process death starts
 * a new journey on the default screen, as an iOS cold launch does (decided
 * 2026-10-16). Saved instance state would also survive process death.
 */
private object Session {
  /** `elapsedRealtime` for the idle boundary: it counts time asleep and does not
   * jump when the clock is changed, so it measures real time away. The wall clock
   * only for when something was read, which must outlive the process. */
  lateinit var shell: ShellState

  /** Once per process, from the first activity's context, for the saved last read. */
  fun start(context: Context) {
    if (::shell.isInitialized) return
    shell = ShellState(
      now = SystemClock::elapsedRealtime,
      wallNow = System::currentTimeMillis,
      store = context.lastReadStore(),
    )
  }

  /** New in every process. Keys the reader so that its saved scroll state, which
   * does survive process death, is never restored into a reader opened afterwards. */
  val readerKey: String = UUID.randomUUID().toString()
}

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Before any UI, so the reader only ever reads a saved size
    // (docs/requirements/display-controls.md#starting-size). Does nothing once a
    // size is saved.
    ReaderSize.saveStartingSizeOnce(readerSizeStore(), resources.configuration.isTablet) { resources.bodyDp() }
    Session.start(applicationContext)
    enableEdgeToEdge()
    setContent {
      // Created after the starting size above is saved, so it reads that size.
      val controls = remember { readerControls() }
      val dark = controls.appearance.dark(isSystemInDarkTheme())
      // The status and navigation bar icons follow the Appearance setting, not only
      // the system's scheme.
      //
      // **The navigation bar's style is `auto`, told our Appearance**, not `light`
      // or `dark`: only `auto` leaves the window's navigation bar contrast enforced
      // (androidx.activity 1.11.0, `EdgeToEdgeApi29`). Enforced, the system draws
      // its own translucent scrim behind three-button navigation, and nothing
      // behind the gesture handle (docs/interaction.md#the-system-bars).
      LaunchedEffect(dark) {
        val status = if (dark) SystemBarStyle.dark(Color.TRANSPARENT) else SystemBarStyle.light(Color.TRANSPARENT, Color.TRANSPARENT)
        val navigation = SystemBarStyle.auto(Color.TRANSPARENT, Color.TRANSPARENT) { dark }
        enableEdgeToEdge(statusBarStyle = status, navigationBarStyle = navigation)
      }
      ShabadOSTheme(dark = dark) {
        val assets = LocalContext.current.assets
        val banis = remember { Corpus.load(assets) }
        ReaderShell(Session.shell, Session.readerKey, banis, controls)
      }
    }
  }

  /** A journey can end while the app is in the background; coming back checks at
   * once, before the reader is seen, rather than at the next periodic check. */
  override fun onStart() {
    super.onStart()
    Session.shell.refresh()
  }

  /** The process can be killed once the app is out of sight, so what was being read
   * is saved now, for `continue reading` after a force close. */
  override fun onStop() {
    super.onStop()
    Session.shell.saveLastRead()
  }
}
