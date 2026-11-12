package com.shabados.android

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.material3.ColorScheme
import androidx.compose.ui.graphics.Color
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider

/**
 * Maps the shared design tokens onto a Material colour scheme.
 *
 * Colours themselves live in `packages/design/tokens.md` — edit there, not here.
 *
 * `MaterialTheme { }` with no colorScheme uses Material 3's baseline palette, which
 * is purple-tinted; that is where the lavender background came from, not from
 * anything Android imposes. **Dynamic colour (Material You) is not used anywhere**
 * (decided 2026-10-16): it tints from the user's wallpaper, so the same shabad would
 * look different on every device and could never be matched to iOS. It was tried for
 * the Journeys sidebar and the viewer's controls, and set them apart from the rest of
 * the app; both are on these tokens, as on iOS.
 */
// Every role is set from our tokens (packages/design/tokens.md#androids-colour-roles):
// any role left unset keeps Material's baseline purple, and the first component that
// reads it shows the tint (the off switch's track did, through
// surfaceContainerHighest). The error roles are the exception, still Material's red:
// there is no error token yet.

/** backgroundBase blended toward the text colour by the toner opacity: Journeys'
 * active row, and iOS's `tonerOnBase` (packages/design/tokens.md#toner). */
private val tonerOnBaseLight = wash(DesignTokens.backgroundBaseLight, DesignTokens.foregroundLight, DesignTokens.TONER_OPACITY)
private val tonerOnBaseDark = wash(DesignTokens.backgroundBaseDark, DesignTokens.foregroundDark, DesignTokens.TONER_OPACITY)

private val Light: ColorScheme = lightColorScheme(
  primary = DesignTokens.uiLight,
  onPrimary = DesignTokens.backgroundBaseLight,
  primaryContainer = DesignTokens.backgroundBaseLight,
  onPrimaryContainer = DesignTokens.foregroundLight,
  inversePrimary = DesignTokens.uiDark,
  secondary = DesignTokens.uiLight,
  onSecondary = DesignTokens.backgroundBaseLight,
  secondaryContainer = tonerOnBaseLight,
  onSecondaryContainer = DesignTokens.foregroundLight,
  tertiary = DesignTokens.uiLight,
  onTertiary = DesignTokens.backgroundBaseLight,
  tertiaryContainer = DesignTokens.backgroundBaseLight,
  onTertiaryContainer = DesignTokens.foregroundLight,
  background = DesignTokens.backgroundLight,
  onBackground = DesignTokens.foregroundLight,
  surface = DesignTokens.backgroundLight,
  onSurface = DesignTokens.foregroundLight,
  surfaceVariant = DesignTokens.backgroundBaseLight,
  onSurfaceVariant = DesignTokens.foregroundMutedLight,
  surfaceTint = DesignTokens.uiLight,
  inverseSurface = DesignTokens.foregroundLight,
  inverseOnSurface = DesignTokens.backgroundBaseLight,
  outline = DesignTokens.foregroundMutedLight,
  outlineVariant = DesignTokens.foregroundLight.copy(alpha = DesignTokens.TONER_OPACITY),
  scrim = Color.Black,
  surfaceDim = DesignTokens.backgroundLight,
  surfaceBright = DesignTokens.backgroundBaseLight,
  surfaceContainerLowest = DesignTokens.backgroundBaseLight,
  surfaceContainerLow = DesignTokens.backgroundBaseLight,
  surfaceContainer = DesignTokens.backgroundBaseLight,
  surfaceContainerHigh = DesignTokens.backgroundBaseLight,
  surfaceContainerHighest = tonerOnBaseLight,
  primaryFixed = DesignTokens.backgroundBaseLight,
  primaryFixedDim = DesignTokens.backgroundBaseLight,
  onPrimaryFixed = DesignTokens.foregroundLight,
  onPrimaryFixedVariant = DesignTokens.foregroundMutedLight,
  secondaryFixed = DesignTokens.backgroundBaseLight,
  secondaryFixedDim = DesignTokens.backgroundBaseLight,
  onSecondaryFixed = DesignTokens.foregroundLight,
  onSecondaryFixedVariant = DesignTokens.foregroundMutedLight,
  tertiaryFixed = DesignTokens.backgroundBaseLight,
  tertiaryFixedDim = DesignTokens.backgroundBaseLight,
  onTertiaryFixed = DesignTokens.foregroundLight,
  onTertiaryFixedVariant = DesignTokens.foregroundMutedLight,
)

private val Dark: ColorScheme = darkColorScheme(
  primary = DesignTokens.uiDark,
  onPrimary = DesignTokens.backgroundDark,
  primaryContainer = DesignTokens.backgroundBaseDark,
  onPrimaryContainer = DesignTokens.foregroundDark,
  inversePrimary = DesignTokens.uiLight,
  secondary = DesignTokens.uiDark,
  onSecondary = DesignTokens.backgroundDark,
  secondaryContainer = tonerOnBaseDark,
  onSecondaryContainer = DesignTokens.foregroundDark,
  tertiary = DesignTokens.uiDark,
  onTertiary = DesignTokens.backgroundDark,
  tertiaryContainer = DesignTokens.backgroundBaseDark,
  onTertiaryContainer = DesignTokens.foregroundDark,
  background = DesignTokens.backgroundDark,
  onBackground = DesignTokens.foregroundDark,
  surface = DesignTokens.backgroundDark,
  onSurface = DesignTokens.foregroundDark,
  surfaceVariant = DesignTokens.backgroundBaseDark,
  onSurfaceVariant = DesignTokens.foregroundMutedDark,
  surfaceTint = DesignTokens.uiDark,
  inverseSurface = DesignTokens.foregroundDark,
  inverseOnSurface = DesignTokens.backgroundBaseDark,
  outline = DesignTokens.foregroundMutedDark,
  outlineVariant = DesignTokens.foregroundDark.copy(alpha = DesignTokens.TONER_OPACITY),
  scrim = Color.Black,
  surfaceDim = DesignTokens.backgroundDark,
  surfaceBright = DesignTokens.backgroundBaseDark,
  surfaceContainerLowest = DesignTokens.backgroundBaseDark,
  surfaceContainerLow = DesignTokens.backgroundBaseDark,
  surfaceContainer = DesignTokens.backgroundBaseDark,
  surfaceContainerHigh = DesignTokens.backgroundBaseDark,
  surfaceContainerHighest = tonerOnBaseDark,
  primaryFixed = DesignTokens.backgroundBaseDark,
  primaryFixedDim = DesignTokens.backgroundBaseDark,
  onPrimaryFixed = DesignTokens.foregroundDark,
  onPrimaryFixedVariant = DesignTokens.foregroundMutedDark,
  secondaryFixed = DesignTokens.backgroundBaseDark,
  secondaryFixedDim = DesignTokens.backgroundBaseDark,
  onSecondaryFixed = DesignTokens.foregroundDark,
  onSecondaryFixedVariant = DesignTokens.foregroundMutedDark,
  tertiaryFixed = DesignTokens.backgroundBaseDark,
  tertiaryFixedDim = DesignTokens.backgroundBaseDark,
  onTertiaryFixed = DesignTokens.foregroundDark,
  onTertiaryFixedVariant = DesignTokens.foregroundMutedDark,
)

/**
 * Also sets the content colour to the text colour, for the whole app. Ripples and
 * icons are drawn in it. A `Scaffold` or `Surface` sets it; the reading shell has
 * neither, and Material's default is black, so taps' ripples and the header's icons
 * were black on black in dark mode (Pixel 7a, 2026-10-16).
 */
@Composable
fun ShabadOSTheme(dark: Boolean, content: @Composable () -> Unit) {
  val scheme = if (dark) Dark else Light
  MaterialTheme(colorScheme = scheme) {
    CompositionLocalProvider(LocalContentColor provides scheme.onBackground, LocalDark provides dark, content = content)
  }
}

/** Whether the app is drawing dark: the Appearance setting, or the system's under
 * Auto (docs/requirements/display-controls.md#appearance). Read this, never
 * `isSystemInDarkTheme`, which ignores the setting. */
val LocalDark = staticCompositionLocalOf { false }
