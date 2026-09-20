package com.shabados.android

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BaniList(banis: List<Bani>, gurmukhi: FontFamily, onOpen: (Bani) -> Unit) {
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
