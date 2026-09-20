package com.shabados.android

import android.content.res.AssetManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily

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
    BaniReader(current) { open = null }
  }
}
