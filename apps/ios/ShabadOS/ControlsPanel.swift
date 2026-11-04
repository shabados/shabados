import SwiftUI
import UIKit

/// The Controls sidebar's contents (docs/requirements/reading-shell.md#the-controls-sidebar):
/// the Zoom, Ratio and Weight sliders, and a sticky `Settings` row at the foot. The
/// header is the title and the appearance control; no toggle, since the viewer's
/// Controls button stays in view on its edge.
///
/// **The settings are the reader's own `@AppStorage` keys**, so a change here is a
/// change there, and a pinch made while this is closed shows here when it opens.
/// Ranges and defaults are docs/requirements/display-controls.md.
struct ControlsPanel: View {
  /// The footer's `Settings` row; `ReaderShell` presents the sheet.
  let onSettings: () -> Void

  @AppStorage(Appearance.key) private var appearance = Appearance.auto.rawValue

  @Environment(\.verticalSizeClass) private var verticalSizeClass

  /// The space on each side of the panel's content, as the Journeys sidebar's.
  static let inset: CGFloat = 30

  var body: some View {
    ScrollView {
      ReaderSliders(spacing: 24)
        .padding(.horizontal, Self.inset)
        .padding(.vertical, 12)
    }
    // As under the Journeys sidebar's header (`BaniReaderView`'s note on `.hard`).
    .scrollEdgeEffectStyle(.hard, for: .top)
    // No scroll bar in either sidebar (2026-10-19).
    .scrollIndicators(.hidden)
    .safeAreaBar(edge: .top) { header }
    .safeAreaBar(edge: .bottom) { settingsRow }
  }

  private var header: some View {
    HStack {
      Text("Controls")
        .font(.title2.weight(.semibold))
        .foregroundStyle(DesignTokens.foreground)
      Spacer(minLength: 0)
      // Light, Dark or System (display-controls.md#appearance).
      Menu {
        Picker("Appearance", selection: $appearance) {
          ForEach(Appearance.allCases) { Text($0.label).tag($0.rawValue) }
        }
      } label: {
        // The label is the whole circle: a menu answers taps on its label only, so
        // an icon-sized label left most of the glass circle animating and not
        // opening.
        Image(systemName: AppIcons.appearance)
          .imageScale(.large)
          .frame(width: BarMetrics.button, height: BarMetrics.button)
          .contentShape(.circle)
      }
      .menuStyle(.button)
      .accessibilityLabel("Appearance")
      .barCircle()
    }
    // The Controls button on the viewer's edge sits on the left here, so the
    // header's own content starts at the panel's inset, as the Journeys header's.
    .padding(.leading, Self.inset)
    .padding(.trailing, 16)
    .frame(maxWidth: .infinity, minHeight: BarMetrics.button, alignment: .leading)
    .padding(.bottom, BarMetrics.below)
    .padding(.top, BarMetrics.topMargin(verticalSizeClass))
    // A bar, like the viewer's: it does not follow Text Size (`BarMetrics`).
    .dynamicTypeSize(BarMetrics.typeSize)
  }

  /// The door to Settings, at the foot of the sidebar whatever its scroll
  /// (reading-shell.md#the-controls-sidebar).
  private var settingsRow: some View {
    Button(action: onSettings) {
      Label("Settings", systemImage: AppIcons.settings)
        .font(.headline)
        .foregroundStyle(DesignTokens.foreground)
        .frame(maxWidth: .infinity, minHeight: 44, alignment: .leading)
        .contentShape(Rectangle())
    }
    .buttonStyle(.plain)
    .padding(.horizontal, Self.inset)
    .padding(.vertical, 8)
    .background(ReaderShell.sidebarBackground)
  }
}

/// How `ReaderSliders` lays out each slider. Settings' Appearance page takes the
/// first that fits (`AppearanceSettingsPage`); the Controls sidebar scrolls, and
/// always stacks.
enum SliderLayout: CaseIterable {
  /// The title, its byline, then the slider. The bylines are still hidden from
  /// `InterfaceText.bylinesHiddenFrom` on.
  case stacked
  /// As `stacked`, without the bylines.
  case noBylines
  /// The title and the slider on one line, the title capped at
  /// `compactTitleCap` so the slider keeps its length.
  case compact

  /// A compact row's title grows with Text Size this far and no further: Headline
  /// at xxxLarge, 23pt, about where Android caps its own.
  static let compactTitleCap: DynamicTypeSize = .xxxLarge
}

/// The Zoom, Ratio and Weight sliders, each with its byline, shared by the Controls
/// sidebar and Settings' Appearance page so the two cannot drift
/// (docs/requirements/display-controls.md). Continuous; stored values are kept to a
/// few decimal places.
struct ReaderSliders: View {
  var spacing: CGFloat = 24
  var layout: SliderLayout = .stacked

  @AppStorage(BaniReaderView.fontSizeKey) private var fontSize = DesignTokens.defaultSize
  @AppStorage("ratio") private var ratio = DesignTokens.ratioDefault
  @AppStorage("weight") private var weight = DesignTokens.weightDefault
  @Environment(\.dynamicTypeSize) private var dynamicTypeSize

  /// One slider's title, byline, value and range.
  private struct Spec: Identifiable {
    let title: String
    let byline: String
    let value: Binding<Double>
    let range: ClosedRange<Double>
    var id: String { title }
  }

  private var specs: [Spec] {
    [
      Spec(
        title: "Zoom",
        byline: "The overall size of text",
        value: Binding(
          get: { DesignTokens.clamp(fontSize) },
          set: { fontSize = Self.kept($0, places: 2) }
        ),
        range: DesignTokens.minSize...DesignTokens.maxSize
      ),
      Spec(
        title: "Ratio",
        byline: "Size relative to primary",
        value: Binding(get: { ratio }, set: { ratio = Self.kept($0, places: 3) }),
        range: DesignTokens.ratioMin...DesignTokens.ratioMax
      ),
      Spec(
        title: "Weight",
        byline: "Thickness of lines/strokes",
        value: Binding(get: { weight }, set: { weight = Self.kept($0, places: 1) }),
        range: DesignTokens.weightMin...DesignTokens.weightMax
      ),
    ]
  }

  var body: some View {
    switch layout {
    case .stacked, .noBylines:
      VStack(alignment: .leading, spacing: spacing) {
        ForEach(specs) { spec in
          let showsByline = layout == .stacked && dynamicTypeSize < InterfaceText.bylinesHiddenFrom
          slider(spec, byline: showsByline ? spec.byline : nil)
        }
      }
    case .compact:
      // A grid, so every title takes the widest one's width and the sliders start
      // level.
      Grid(alignment: .leading, horizontalSpacing: 12, verticalSpacing: 4) {
        ForEach(specs) { spec in
          GridRow {
            Text(spec.title)
              .font(.headline)
              .foregroundStyle(DesignTokens.foreground)
              .lineLimit(1)
              .fixedSize()
              .dynamicTypeSize(...SliderLayout.compactTitleCap)
            Slider(value: spec.value, in: spec.range)
              .tint(DesignTokens.ui)
              .accessibilityLabel(spec.title)
          }
        }
      }
    }
  }

  /// Continuous values, kept to a few decimal places: whatever the slider reports,
  /// without a tail of floating-point noise in storage (display-controls.md).
  private static func kept(_ value: Double, places: Int) -> Double {
    let scale = pow(10, Double(places))
    return (value * scale).rounded() / scale
  }

  private func slider(_ spec: Spec, byline: String?) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      Text(spec.title)
        .font(.headline)
        .foregroundStyle(DesignTokens.foreground)
      if let byline {
        Text(byline)
          .font(.subheadline)
          .foregroundStyle(DesignTokens.foregroundMuted)
      }
      Slider(value: spec.value, in: spec.range)
        .tint(DesignTokens.ui)
    }
  }
}

/// Two lines drawn exactly as the reader draws a line and its secondary field, at
/// the reader's size, ratio and weight, on whatever lies behind it — Settings'
/// background, with no card of its own (docs/requirements/reading-shell.md#settings).
/// Each stays on one line, cut short rather than wrapped. Not selectable and not
/// tappable: it shows, it does not read.
struct ReaderPreview: View {
  @AppStorage(BaniReaderView.fontSizeKey) private var fontSize = DesignTokens.defaultSize
  @AppStorage("ratio") private var ratio = DesignTokens.ratioDefault
  @AppStorage("weight") private var weight = DesignTokens.weightDefault

  var body: some View {
    let size = DesignTokens.clamp(fontSize)
    VStack(alignment: .leading, spacing: 2) {
      Text("ਇਹ ਉਦਾਹਰਨ ਹੈ ॥")
        .font(Fonts.variable(
          Fonts.gurmukhi,
          size: size,
          weight: ReaderType.weight(DesignTokens.weightPrimary, control: weight)
        ))
        .foregroundStyle(DesignTokens.foreground)
        .lineSpacing(DesignTokens.lineSpacing(for: size, fontName: Fonts.gurmukhi))
        .lineLimit(1)
      Text("Here's an example.")
        .font(ReaderType.latin(size: size * ratio, control: weight))
        .foregroundStyle(DesignTokens.foregroundMuted)
        .lineLimit(1)
    }
    .frame(maxWidth: .infinity, alignment: .leading)
    .accessibilityElement(children: .combine)
    .accessibilityLabel("Preview")
  }
}

/// A switch whose whole row is the target (reading-shell.md#the-controls-sidebar):
/// a tap on the label toggles it, as a tap on the switch does. VoiceOver reads one
/// switch.
struct SettingSwitch: View {
  let label: String
  @Binding var isOn: Bool

  var body: some View {
    HStack {
      Text(label)
        .foregroundStyle(DesignTokens.foreground)
      Spacer(minLength: 8)
      Toggle(label, isOn: $isOn)
        .labelsHidden()
        .tint(DesignTokens.ui)
    }
    .contentShape(Rectangle())
    .onTapGesture { isOn.toggle() }
    .accessibilityElement(children: .ignore)
    .accessibilityLabel(label)
    .accessibilityValue(isOn ? "On" : "Off")
    .accessibilityAddTraits(.isButton)
    .accessibilityAction { isOn.toggle() }
  }
}

/// The `Appearance` setting (docs/requirements/display-controls.md#appearance):
/// stored under `key` as the raw value, applied to every window by `ShabadOSApp`.
enum Appearance: String, CaseIterable, Identifiable {
  case light, dark, auto

  static let key = "appearance"

  var id: String { rawValue }

  /// `auto` is shown as `System`.
  var label: String {
    switch self {
    case .auto: "System"
    case .light: "Light"
    case .dark: "Dark"
    }
  }

  /// `.unspecified` follows the system.
  var interfaceStyle: UIUserInterfaceStyle {
    switch self {
    case .auto: .unspecified
    case .light: .light
    case .dark: .dark
    }
  }
}
