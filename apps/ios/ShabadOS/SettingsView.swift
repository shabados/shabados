import SwiftUI
import UIKit

/// Settings (docs/requirements/reading-shell.md#settings): a sheet over everything,
/// opened from Controls' `Settings` row and closed by swiping it down or
/// by the ✕ at its top right. Its items are menus in groups without labels; below the
/// first group, the appearance picker.
///
/// **A `NavigationStack` here is fine**, unlike in the viewer (`ViewerBar`'s note):
/// the sheet does not slide sideways, so UIKit's bar keeps its safe area.
struct SettingsView: View {
  @Environment(\.dismiss) private var dismiss

  var body: some View {
    NavigationStack {
      List {
        Section {
          NavigationLink("Appearance") { AppearanceSettingsPage() }
          NavigationLink("Display") { DisplaySettingsPage() }
        }
        // A group of its own, on the rows' background, so the outline is never
        // cut by the group's corners.
        Section {
          AppearancePicker()
            .padding(.vertical, 8)
        }
      }
      .navigationTitle("Settings")
      .navigationBarTitleDisplayMode(.inline)
      .toolbar {
        ToolbarItem(placement: .topBarTrailing) {
          Button("Close", systemImage: AppIcons.close) { dismiss() }
        }
      }
    }
    .dynamicTypeSize(...InterfaceText.cap)
  }
}

/// The preview at the top, on Settings' background, and the Zoom, Ratio and Weight
/// sliders in a group fixed at the bottom. **The sliders are always in view**: the
/// preview grows with the size and, once it needs more room than is left, scrolls
/// behind them, no lower than their bottom edge (reading-shell.md#settings). Laid out one above the other without a
/// scroll view, a large Zoom pushed the sliders off an iPad's Settings window
/// (2026-10-22). Reset, in red at the top right, asks before it changes anything.
///
/// **The group starts no higher than halfway down the page**
/// (reading-shell.md#large-text), so it takes the first `SliderLayout` that fits in
/// the bottom half: stacked, without bylines, then compact rows. Compact rows are
/// used even when they do not fit, as on an iPhone in landscape: they are the least
/// the sliders take. **Measured, not set by Text Size alone**: the cap at
/// Accessibility 3 left the stacked sliders over half an iPad's Settings window,
/// which is shorter than the screen (2026-10-22).
private struct AppearanceSettingsPage: View {
  @AppStorage(BaniReaderView.fontSizeKey) private var fontSize = DesignTokens.defaultSize
  @AppStorage("ratio") private var ratio = DesignTokens.ratioDefault
  @AppStorage("weight") private var weight = DesignTokens.weightDefault
  @State private var confirmingReset = false

  /// The space beneath the sliders' group, and at its sides.
  private static let below: CGFloat = 16

  private func sliders(_ layout: SliderLayout) -> some View {
    ReaderSliders(spacing: 20, layout: layout)
      .padding(16)
      .background(
        Color(UIColor.secondarySystemGroupedBackground),
        in: RoundedRectangle(cornerRadius: 26, style: .continuous)
      )
  }

  var body: some View {
    GeometryReader { page in
      // Half the page, bars included, less what lies beneath the group.
      let whole = page.size.height + page.safeAreaInsets.top + page.safeAreaInsets.bottom
      let budget = max(0, whole / 2 - page.safeAreaInsets.bottom - Self.below)
      ScrollView {
        ReaderPreview()
          .padding(.horizontal, 20)
          .padding(.top, 16)
      }
      .scrollBounceBehavior(.basedOnSize)
      // **The preview passes behind the group and stops at its bottom edge**
      // (2026-10-22): the group is an inset over the scroll view, which ends where
      // the group does. Above it, the preview scrolled only as far as the group's
      // top, and the second line was cut there.
      .safeAreaInset(edge: .bottom, spacing: 0) {
        HeightCap(maxHeight: budget) {
          ViewThatFits(in: .vertical) {
            sliders(.stacked)
            sliders(.noBylines)
            sliders(.compact)
          }
        }
        .padding(.horizontal, 16)
      }
      .padding(.bottom, Self.below)
    }
    .background(Color(UIColor.systemGroupedBackground))
    .navigationTitle("Appearance")
    .navigationBarTitleDisplayMode(.inline)
    .toolbar {
      ToolbarItem(placement: .topBarTrailing) {
        Button("Reset", systemImage: AppIcons.reset, role: .destructive) { confirmingReset = true }
          .tint(.red)
      }
    }
    .alert("Reset zoom, ratio, and weight?", isPresented: $confirmingReset) {
      Button("Reset", role: .destructive) {
        // Zoom to this device's starting size at its current text size; Ratio and
        // Weight to their defaults (reading-shell.md#settings).
        // The system's Text Size, not this view's: Settings is capped at
        // `InterfaceText.cap`, and the starting size follows the uncapped one.
        let textSize = DynamicTypeSize(UIApplication.shared.preferredContentSizeCategory) ?? .large
        fontSize = StartingSize.deviceSize(at: textSize)
        ratio = DesignTokens.ratioDefault
        weight = DesignTokens.weightDefault
      }
      Button("Cancel", role: .cancel) {}
    } message: {
      Text("Your preferences will reset to the original settings.")
    }
  }
}

/// Offers its one subview at most `maxHeight`, and is as tall as the subview then is,
/// placed at the bottom. **Not `.frame(maxHeight:)`**, which grows to its maximum
/// whatever the subview takes: around the sliders it left a transparent band above
/// the group that the preview could not scroll behind (2026-10-22). A subview taller
/// than `maxHeight` is drawn whole, as the compact sliders are when nothing fits.
private struct HeightCap: Layout {
  let maxHeight: CGFloat

  private func capped(_ proposal: ProposedViewSize) -> ProposedViewSize {
    ProposedViewSize(width: proposal.width, height: min(proposal.height ?? maxHeight, maxHeight))
  }

  func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
    subviews.first?.sizeThatFits(capped(proposal)) ?? .zero
  }

  func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
    subviews.first?.place(
      at: CGPoint(x: bounds.minX, y: bounds.maxY),
      anchor: .bottomLeading,
      proposal: capped(proposal)
    )
  }
}

/// Pauses, and the two pronunciations.
private struct DisplaySettingsPage: View {
  @AppStorage("pauses") private var pauses = true
  @AppStorage("pronDevanagari") private var pronDevanagari = false
  @AppStorage("pronLatin") private var pronLatin = false

  var body: some View {
    List {
      Section {
        SettingSwitch(label: "Pauses", isOn: $pauses)
      }
      Section("Pronunciations") {
        SettingSwitch(label: Pronunciation.devanagari.label, isOn: $pronDevanagari)
        SettingSwitch(label: Pronunciation.latin.label, isOn: $pronLatin)
      }
    }
    .navigationTitle("Display")
    .navigationBarTitleDisplayMode(.inline)
  }
}

/// Light, Dark and System as three pictures of the reader, the chosen one outlined
/// and labelled in the system blue (reading-shell.md#settings).
struct AppearancePicker: View {
  @AppStorage(Appearance.key) private var appearance = Appearance.auto.rawValue
  /// What the outline shows, set on the tap itself. Read from `appearance` alone,
  /// the outline moved once and then stayed put while the appearance went on
  /// changing (iPhone, 2026-10-19): the row did not redraw as the window's style
  /// changed under it.
  @State private var chosen: String?

  /// "The same kind of blue used by the system": iOS's own, not the app's `ui` token.
  private static let selected = Color(UIColor.systemBlue)
  private static let shape = RoundedRectangle(cornerRadius: 12, style: .continuous)

  var body: some View {
    HStack(spacing: 12) {
      ForEach(Appearance.allCases) { choice in
        let isSelected = (chosen ?? appearance) == choice.rawValue
        Button {
          chosen = choice.rawValue
          appearance = choice.rawValue
        } label: {
          VStack(spacing: 8) {
            swatch(choice)
              .frame(maxWidth: .infinity)
              .frame(height: 96)
              .clipShape(Self.shape)
              .overlay {
                Self.shape.strokeBorder(
                  isSelected ? Self.selected : DesignTokens.foreground.opacity(0.15),
                  lineWidth: isSelected ? 3 : 1
                )
              }
            // One line, cut short: at the largest sizes `System` broke as `Sys-tem`.
            Text(choice.label)
              .font(.subheadline)
              .lineLimit(1)
              .foregroundStyle(isSelected ? Self.selected : DesignTokens.foreground)
          }
          .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(choice.label)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
      }
    }
  }

  @ViewBuilder
  private func swatch(_ choice: Appearance) -> some View {
    switch choice {
    case .light: AppearanceSwatch(style: .light)
    case .dark: AppearanceSwatch(style: .dark)
    case .auto:
      // Light in the top-left half, with its bars; Dark in the bottom-right half,
      // with its circles.
      ZStack {
        AppearanceSwatch(style: .light)
        AppearanceSwatch(style: .dark).clipShape(LowerRightHalf())
      }
    }
  }
}

/// A small picture of the reader in one appearance: its background, two bars at the
/// top left in its text colour, and its three vishraam colours as circles at the
/// bottom right, whatever Pauses is set to.
private struct AppearanceSwatch: View {
  let style: UIUserInterfaceStyle

  var body: some View {
    let text = DesignTokens.foreground.resolved(style)
    ZStack {
      DesignTokens.background.resolved(style)
      VStack(alignment: .leading, spacing: 6) {
        Capsule().fill(text).frame(width: 40, height: 7)
        Capsule().fill(text).frame(width: 26, height: 7)
      }
      .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
      .padding(12)
      HStack(spacing: 4) {
        ForEach(
          [DesignTokens.vishraamHeavy, DesignTokens.vishraamMedium, DesignTokens.vishraamLight],
          id: \.self
        ) { colour in
          Circle().fill(colour.resolved(style)).frame(width: 10, height: 10)
        }
      }
      .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
      .padding(12)
    }
  }
}

/// The triangle below the diagonal from the top-right corner to the bottom-left.
private struct LowerRightHalf: Shape {
  func path(in rect: CGRect) -> Path {
    Path { path in
      path.move(to: CGPoint(x: rect.maxX, y: rect.minY))
      path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
      path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
      path.closeSubpath()
    }
  }
}

private extension Color {
  /// This token's colour in `style`, whatever the app is showing: a picture of Dark
  /// must be dark even in light mode.
  func resolved(_ style: UIUserInterfaceStyle) -> Color {
    Color(UIColor(self).resolvedColor(with: UITraitCollection(userInterfaceStyle: style)))
  }
}
