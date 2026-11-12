#!/usr/bin/env node
//
// Generates platform token files from packages/design/tokens.md.
//
//   node packages/design/scripts/generate-tokens.mjs
//
// Plain Node with no dependencies, deliberately: this has to run from apps/build.sh
// on a machine that may have neither bun nor a JS toolchain set up, and a generator
// that cannot run is a generator that gets bypassed.
//
// The apps share no code (ADR-0010 is undecided), so without this the same decision
// gets written twice and drifts. Anything both apps must agree on belongs here.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

// The source is markdown, not JSON, so a token can sit next to the sentence
// explaining it — see packages/design/tokens.md. Only the tables are read; prose is
// ignored. Parsing is deliberately strict: an unrecognised table shape is a silent
// omission otherwise, and a missing token becomes a compile error three files away.
const md = readFileSync(join(root, 'packages/design/tokens.md'), 'utf8')

/** Rows of a markdown table inside the named `##` section. */
const section = (heading) => {
  const body = md.split(new RegExp(`^## ${heading}$`, 'm'))[1]
  if (!body) throw new Error(`packages/design/tokens.md: no "## ${heading}" section`)
  return body.split(/^## /m)[0]
}

const colorRows = [...section('Colour').matchAll(/^\| (\w+) \| `(#[0-9a-fA-F]{6})` \| `(#[0-9a-fA-F]{6})` \|$/gm)]
if (!colorRows.length) throw new Error('packages/design/tokens.md: no colour rows parsed')
const color = Object.fromEntries(colorRows.map(([, name, light, dark]) => [name, { light, dark }]))

const scalars = (heading) => {
  const rows = [...section(heading).matchAll(/^\| (\w+) \| `([\d.]+)` \|$/gm)]
  if (!rows.length) throw new Error(`packages/design/tokens.md: no rows parsed under "## ${heading}"`)
  return Object.fromEntries(rows.map(([, name, value]) => [name, Number(value)]))
}

const opacity = scalars('Opacity')
const weight = scalars('Weight')
const type = scalars('Type')
const controls = scalars('Controls')

for (const key of ['defaultSize', 'listSize', 'uiGurmukhiRatio', 'greetingRatio', 'lineHeightRatio', 'minSize', 'phoneMaxSize', 'padMaxSize', 'startingSizeFactor', 'padStartingSize', 'androidBodySize', 'ratioMin', 'ratioMax']) {
  if (type[key] === undefined) throw new Error(`packages/design/tokens.md: type.${key} missing`)
}
for (const key of ['weightMin', 'weightMax', 'weightDefault']) {
  if (weight[key] === undefined) throw new Error(`packages/design/tokens.md: weight.${key} missing`)
}
if (controls.sliderTrackHeight === undefined) throw new Error('packages/design/tokens.md: controls.sliderTrackHeight missing')
for (const key of ['toner', 'tonerFaint']) {
  if (opacity[key] === undefined) throw new Error(`packages/design/tokens.md: opacity.${key} missing`)
}
const { lineHeightRatio } = type

// The starting-size rule, written once here for the table checks and once each in
// the generated Swift and Kotlin below; the three must stay the same arithmetic.
// Nearest even number (tokens.md#starting-size says why it stays even). JS Math.round, Swift's default
// .rounded() and Kotlin's Double.roundToInt() all round halves up for positive
// numbers, so they agree on ties.
const startingSizeFor = (body) =>
  Math.min(type.phoneMaxSize, Math.max(type.minSize, 2 * Math.round((body * type.startingSizeFactor) / 2)))

// The table in tokens.md shows what the rule gives at each Text Size setting. The app
// computes from the live Body size, not from this table, so the table is checked
// here: a row that disagrees with the rule means someone edited one without the
// other. Twelve rows, one per setting; a missing row is a gap in what was reviewed.
const startingRows = [...section('Starting size').matchAll(/^\| ([^|]+?) \| (\d+) \| `(\d+)` \|$/gm)]
if (startingRows.length !== 12) {
  throw new Error(`packages/design/tokens.md: expected 12 starting-size rows (one per Text Size setting), found ${startingRows.length}`)
}
for (const [, label, body, size] of startingRows) {
  const expected = startingSizeFor(Number(body))
  if (Number(size) !== expected) {
    throw new Error(`packages/design/tokens.md: starting size for ${label} is ${size}, but the rule gives ${expected} (${body} × ${type.startingSizeFactor})`)
  }
}
const defaultRow = startingRows.find(([, label]) => label.startsWith('L '))
if (!defaultRow || Number(defaultRow[3]) !== type.defaultSize) {
  throw new Error(`packages/design/tokens.md: defaultSize (${type.defaultSize}) must equal the L (default) starting size`)
}
// Android's table: the same rule, fed the dp Android gives `androidBodySize` sp at
// each Font size step (see tokens.md). Seven rows, Pixel's steps; the 1.0 row is the
// default and must land on defaultSize, as iOS's L row does.
const androidRows = [...section('Starting size on Android').matchAll(/^\| ([\d.]+) \| ([\d.]+) \| `(\d+)` \|$/gm)]
if (androidRows.length !== 7) {
  throw new Error(`packages/design/tokens.md: expected 7 Android starting-size rows (one per Pixel Font size step), found ${androidRows.length}`)
}
for (const [, scale, body, size] of androidRows) {
  const expected = startingSizeFor(Number(body))
  if (Number(size) !== expected) {
    throw new Error(`packages/design/tokens.md: Android starting size at font scale ${scale} is ${size}, but the rule gives ${expected} (${body} × ${type.startingSizeFactor})`)
  }
}
const androidDefault = androidRows.find(([, scale]) => Number(scale) === 1)
if (!androidDefault || Number(androidDefault[2]) !== type.androidBodySize || Number(androidDefault[3]) !== type.defaultSize) {
  throw new Error(`packages/design/tokens.md: the Android 1.0 row must be ${type.androidBodySize}dp and defaultSize (${type.defaultSize})`)
}
if (type.padStartingSize < type.minSize || type.padStartingSize > type.padMaxSize) {
  throw new Error(`packages/design/tokens.md: padStartingSize ${type.padStartingSize} is outside ${type.minSize}–${type.padMaxSize}`)
}

const rgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const swiftComponents = (hex) => {
  const [r, g, b] = rgb(hex).map((c) => (c / 255).toFixed(4))
  return `red: ${r}, green: ${g}, blue: ${b}`
}
const kotlinHex = (hex) => `0xFF${hex.replace('#', '').toUpperCase()}`

const banner = (comment) => `${comment} Generated by packages/design/scripts/generate-tokens.mjs — do not edit.
${comment} Source of truth: packages/design/tokens.md`

// ---------------------------------------------------------------- Swift

const swiftColor = (name, pair) => `  /// light-dark(${pair.light}, ${pair.dark})
  static let ${name} = Color(UIColor { traits in
    traits.userInterfaceStyle == .dark
      ? UIColor(${swiftComponents(pair.dark)}, alpha: 1)
      : UIColor(${swiftComponents(pair.light)}, alpha: 1)
  })`

const swift = `${banner('//')}

import SwiftUI
import UIKit

/// Colour and type shared with the Android app. A UIColor provider is used rather
/// than reading \`@Environment(\\.colorScheme)\` so the value resolves itself —
/// including inside UIKit-backed views that never see the SwiftUI environment.
enum DesignTokens {
${Object.entries(color).map(([k, v]) => swiftColor(k, v)).join('\n\n')}

  static let tonerOpacity: Double = ${opacity.toner}
  static let tonerFaintOpacity: Double = ${opacity.tonerFaint}

  static let weightPrimary: Double = ${weight.weightPrimary}
  static let weightLatin: Double = ${weight.weightLatin}
  static let weightSecondary: Double = ${weight.weightSecondary}
  static let weightMin: Double = ${weight.weightMin}
  static let weightMax: Double = ${weight.weightMax}
  static let weightDefault: Double = ${weight.weightDefault}

  static let ratioDefault: Double = ${type.ratioDefault}
  static let ratioMin: Double = ${type.ratioMin}
  static let ratioMax: Double = ${type.ratioMax}

  static let defaultSize: Double = ${type.defaultSize}
  static let listSize: Double = ${type.listSize}
  static let uiGurmukhiRatio: Double = ${type.uiGurmukhiRatio}
  static let greetingRatio: Double = ${type.greetingRatio}
  static let minSize: Double = ${type.minSize}
  static let phoneMaxSize: Double = ${type.phoneMaxSize}
  static let padMaxSize: Double = ${type.padMaxSize}

  /// The zoom maximum for the device this runs on: an iPad fits larger text.
  @MainActor static var maxSize: Double {
    UIDevice.current.userInterfaceIdiom == .pad ? padMaxSize : phoneMaxSize
  }

  /// Total line box as a multiple of font size, so it holds when zoomed.
  /// Gurmukhi stacks vowel signs above and below the base line; at 1.0 the lagaa
  /// matraa collide with the line above.
  static let lineHeightRatio: Double = ${lineHeightRatio}

  @MainActor static func clamp(_ size: Double) -> Double {
    min(maxSize, max(minSize, size))
  }

  static let startingSizeFactor: Double = ${type.startingSizeFactor}
  static let padStartingSize: Double = ${type.padStartingSize}

  /// The reader's size on first launch
  /// (docs/requirements/display-controls.md#starting-size): on a phone,
  /// \`startingSizeFactor\` × the system Body text size, to the nearest even number,
  /// within the zoom range; on iPad, a fixed size. Chosen once and saved, never
  /// recomputed. Same arithmetic as \`startingSizeFor\` in generate-tokens.mjs, which
  /// checks the table in tokens.md against it.
  @MainActor static func startingSize(isPad: Bool, bodySize: Double) -> Double {
    if isPad { return padStartingSize }
    return clamp(2 * (bodySize * startingSizeFactor / 2).rounded())
  }

  /// SwiftUI's \`lineSpacing\` is *extra* space on top of the font's natural line
  /// height, not the total line box, so the target has to be measured against the
  /// real font metrics. Android's \`lineHeight\` is the total directly.
  static func lineSpacing(for size: Double, fontName: String) -> Double {
    let natural = UIFont(name: fontName, size: size)?.lineHeight ?? size * 1.2
    return max(0, size * lineHeightRatio - natural)
  }
}
`

// --------------------------------------------------------------- Kotlin

const kotlinColor = (name, pair) => `  /** light-dark(${pair.light}, ${pair.dark}) */
  val ${name}Light = Color(${kotlinHex(pair.light)})
  val ${name}Dark = Color(${kotlinHex(pair.dark)})`

const kotlin = `${banner('//')}

package com.shabados.android

import androidx.compose.ui.graphics.Color

/** Colour and type shared with the iOS app. */
object DesignTokens {
${Object.entries(color).map(([k, v]) => kotlinColor(k, v)).join('\n\n')}

  const val TONER_OPACITY = ${opacity.toner}f
  const val TONER_FAINT_OPACITY = ${opacity.tonerFaint}f

  const val WEIGHT_PRIMARY = ${weight.weightPrimary}f
  const val WEIGHT_LATIN = ${weight.weightLatin}f
  const val WEIGHT_SECONDARY = ${weight.weightSecondary}f
  const val WEIGHT_MIN = ${weight.weightMin}f
  const val WEIGHT_MAX = ${weight.weightMax}f
  const val WEIGHT_DEFAULT = ${weight.weightDefault}f

  const val RATIO_DEFAULT = ${type.ratioDefault}f
  const val RATIO_MIN = ${type.ratioMin}f
  const val RATIO_MAX = ${type.ratioMax}f

  const val DEFAULT_SIZE = ${type.defaultSize}f
  const val LIST_SIZE = ${type.listSize}f
  const val UI_GURMUKHI_RATIO = ${type.uiGurmukhiRatio}f
  const val GREETING_RATIO = ${type.greetingRatio}f
  const val MIN_SIZE = ${type.minSize}f
  const val PHONE_MAX_SIZE = ${type.phoneMaxSize}f
  const val PAD_MAX_SIZE = ${type.padMaxSize}f

  /** The zoom maximum for the device: a tablet fits larger text. */
  fun maxSize(isTablet: Boolean) = if (isTablet) PAD_MAX_SIZE else PHONE_MAX_SIZE

  /**
   * Total line box as a multiple of font size, so it holds when zoomed. Gurmukhi
   * stacks vowel signs above and below the base line; at 1.0 the lagaa matraa
   * collide with the line above.
   */
  const val LINE_HEIGHT_RATIO = ${lineHeightRatio}f

  fun clamp(size: Float, isTablet: Boolean) = size.coerceIn(MIN_SIZE, maxSize(isTablet))

  const val STARTING_SIZE_FACTOR = ${type.startingSizeFactor}
  const val PAD_STARTING_SIZE = ${type.padStartingSize}f
  /** Android has no Body text style; this many sp stands in for it. */
  const val ANDROID_BODY_SIZE = ${type.androidBodySize}f

  /** dp. Every slider's track; Android only (tokens.md#controls). */
  const val SLIDER_TRACK_HEIGHT = ${controls.sliderTrackHeight}f

  /**
   * The reader's size on first launch
   * (docs/requirements/display-controls.md#starting-size): on a phone,
   * [STARTING_SIZE_FACTOR] × [bodyDp] — the dp Android gives [ANDROID_BODY_SIZE] sp at
   * the person's Font size — to the nearest even number, within the zoom range; on a
   * tablet, a fixed size. Same arithmetic as \`startingSizeFor\` in
   * generate-tokens.mjs, which checks the table in tokens.md against it. In Double,
   * as the generator computes, so the two agree on ties.
   */
  fun startingSize(isTablet: Boolean, bodyDp: Float): Float {
    if (isTablet) return PAD_STARTING_SIZE
    val even = 2 * Math.round(bodyDp * STARTING_SIZE_FACTOR / 2)
    return clamp(even.toFloat(), isTablet = false)
  }
}
`

// ------------------------------------------------- Android XML resources
//
// Compose cannot style the *window* — the surface behind it is set by the framework
// theme in res/values/themes.xml, which needs real colour resources. Without these
// the window stays light in dark mode, showing as a pale flash on launch.

const androidXml = (variant) => `<?xml version="1.0" encoding="utf-8"?>
<!-- Generated by packages/design/scripts/generate-tokens.mjs — do not edit. -->
<resources>
${Object.entries(color)
  .map(([name, pair]) => `    <color name="${name.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())}">${pair[variant]}</color>`)
  .join('\n')}
</resources>
`

const outputs = [
  ['apps/ios/ShabadOS/DesignTokens.swift', swift],
  ['apps/android/app/src/main/java/com/shabados/android/DesignTokens.kt', kotlin],
  ['apps/android/app/src/main/res/values/design_tokens.xml', androidXml('light')],
  ['apps/android/app/src/main/res/values-night/design_tokens.xml', androidXml('dark')],
]

for (const [path, contents] of outputs) {
  const full = join(root, path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, contents)
  console.log(`wrote ${path}`)
}
