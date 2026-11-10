package com.shabados.android

import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import android.content.Context
import android.content.SharedPreferences
import android.content.res.Configuration
import android.content.res.Resources
import android.util.TypedValue

/**
 * Android's tablet line: smallest screen width of at least 600dp, the platform's own
 * `sw600dp` qualifier (decided 2026-10-14, packages/design/tokens.md#type). Smallest
 * width rather than current width so rotation and split screen do not change the
 * answer. An unfolded foldable is a tablet; folded, a phone.
 */
private const val TABLET_SMALLEST_WIDTH_DP = 600

val Configuration.isTablet: Boolean get() = smallestScreenWidthDp >= TABLET_SMALLEST_WIDTH_DP

/**
 * The reader's size in the platform's SharedPreferences. Not Jetpack DataStore,
 * which would be a dependency for one float.
 */
class PreferencesSizeStore(private val prefs: SharedPreferences) : SizeStore {
  override fun get(): Float? = if (prefs.contains(KEY)) prefs.getFloat(KEY, 0f) else null
  override fun set(size: Float) = prefs.edit().putFloat(KEY, size).apply()

  companion object {
    /** Also read and written by [ReaderControls]: one key for the size. */
    const val KEY = "fontSize"
  }
}

/**
 * The bani last read and when, for `continue reading` after the process is gone
 * (ContinueReading in Shell.kt). Keys `lastReadId`, `lastReadAt` (the time in
 * wall-clock milliseconds) and `lastReadLine` (the line at the top); iOS uses the
 * same key names in UserDefaults, with a Date.
 */
class PreferencesLastReadStore(private val prefs: SharedPreferences) : LastReadStore {
  override fun get(): LastRead? {
    val id = prefs.getString(ID, null) ?: return null
    if (!prefs.contains(AT)) return null
    return LastRead(id, prefs.getLong(AT, 0), prefs.getString(LINE, null))
  }

  override fun set(value: LastRead) =
    prefs.edit().putString(ID, value.id).putLong(AT, value.atMs).putString(LINE, value.line).apply()

  private companion object {
    const val ID = "lastReadId"
    const val AT = "lastReadAt"
    const val LINE = "lastReadLine"
  }
}

fun Context.lastReadStore() = PreferencesLastReadStore(getSharedPreferences("reader", Context.MODE_PRIVATE))

fun Context.readerSizeStore() = PreferencesSizeStore(getSharedPreferences("reader", Context.MODE_PRIVATE))

/** What the reader shows before the person changes anything
 * (docs/requirements/display-controls.md#pauses, #pronunciations, #ratio, #weight). */
object ReaderDefaults {
  const val PAUSES = true
  const val PRON_DEVANAGARI = false
  const val PRON_LATIN = false
  const val RATIO = DesignTokens.RATIO_DEFAULT
  const val WEIGHT = DesignTokens.WEIGHT_DEFAULT
}

/** The `Appearance` setting (docs/requirements/display-controls.md#appearance),
 * stored as [key], iOS's raw values; `auto` is shown as `System`. In the order the
 * pickers show them. */
enum class Appearance(val key: String, val label: String) {
  LIGHT("light", "Light"),
  DARK("dark", "Dark"),
  AUTO("auto", "System");

  /** Whether the app draws dark, given whether the system is. */
  fun dark(systemDark: Boolean): Boolean = when (this) {
    AUTO -> systemDark
    LIGHT -> false
    DARK -> true
  }

  companion object {
    fun of(key: String?): Appearance = entries.firstOrNull { it.key == key } ?: AUTO
  }
}

/**
 * Every display control, saved across launches as on iOS
 * (docs/requirements/display-controls.md#persistence), and **observable**, so the
 * Controls, the reader and the theme all see one value: a slider moved in
 * the sidebar resizes the reader behind it, and a pinch in the reader moves the
 * slider. The keys are iOS's `@AppStorage` keys, so a setting has one name on both.
 *
 * **A value is written only when the person changes it**, so a setting never
 * touched keeps following [ReaderDefaults] if a default changes. One per activity;
 * every instance reads the same storage.
 */
class ReaderControls(private val prefs: SharedPreferences) {
  private val sizeState = mutableFloatStateOf(prefs.getFloat(PreferencesSizeStore.KEY, DesignTokens.DEFAULT_SIZE))
  private val ratioState = mutableFloatStateOf(prefs.getFloat(RATIO, ReaderDefaults.RATIO))
  private val weightState = mutableFloatStateOf(prefs.getFloat(WEIGHT, ReaderDefaults.WEIGHT))
  private val pausesState = mutableStateOf(prefs.getBoolean(PAUSES, ReaderDefaults.PAUSES))
  private val pronDevanagariState = mutableStateOf(prefs.getBoolean(PRON_DEVANAGARI, ReaderDefaults.PRON_DEVANAGARI))
  private val pronLatinState = mutableStateOf(prefs.getBoolean(PRON_LATIN, ReaderDefaults.PRON_LATIN))
  private val appearanceState = mutableStateOf(Appearance.of(prefs.getString(APPEARANCE, null)))

  /** The reader's saved size, before it is clamped to the device's range. */
  var size: Float
    get() = sizeState.floatValue
    set(value) {
      sizeState.floatValue = value
      prefs.edit().putFloat(PreferencesSizeStore.KEY, value).apply()
    }

  /** Secondary lines as a fraction of the Gurmukhi size, `RATIO_MIN` to `RATIO_MAX`. */
  var ratio: Float
    get() = ratioState.floatValue
    set(value) {
      ratioState.floatValue = value
      prefs.edit().putFloat(RATIO, value).apply()
    }

  /** The Gurmukhi line's weight; every other reader line follows ([ReaderWeight]). */
  var weight: Float
    get() = weightState.floatValue
    set(value) {
      weightState.floatValue = value
      prefs.edit().putFloat(WEIGHT, value).apply()
    }

  var pauses: Boolean
    get() = pausesState.value
    set(value) {
      pausesState.value = value
      prefs.edit().putBoolean(PAUSES, value).apply()
    }

  var pronDevanagari: Boolean
    get() = pronDevanagariState.value
    set(value) {
      pronDevanagariState.value = value
      prefs.edit().putBoolean(PRON_DEVANAGARI, value).apply()
    }

  var pronLatin: Boolean
    get() = pronLatinState.value
    set(value) {
      pronLatinState.value = value
      prefs.edit().putBoolean(PRON_LATIN, value).apply()
    }

  var appearance: Appearance
    get() = appearanceState.value
    set(value) {
      appearanceState.value = value
      prefs.edit().putString(APPEARANCE, value.key).apply()
    }

  private companion object {
    const val PAUSES = "pauses"
    const val PRON_DEVANAGARI = "pronDevanagari"
    const val PRON_LATIN = "pronLatin"
    const val RATIO = "ratio"
    const val WEIGHT = "weight"
    const val APPEARANCE = "appearance"
  }
}

fun Context.readerControls() = ReaderControls(getSharedPreferences("reader", Context.MODE_PRIVATE))

/**
 * The dp Android gives [DesignTokens.ANDROID_BODY_SIZE] sp at the person's Font size.
 * `applyDimension` goes through the display's font scale converter, so this follows
 * Android's non-linear scaling above ~1.03, not a straight multiple.
 */
fun Resources.bodyDp(): Float =
  TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, DesignTokens.ANDROID_BODY_SIZE, displayMetrics) /
    displayMetrics.density
