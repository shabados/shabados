import SwiftUI

/// Collects each visible row's frame in the reader's coordinate space, so a pinch
/// can work out which line is under the fingers.
private struct RowFrames: PreferenceKey {
  static let defaultValue: [String: CGRect] = [:]

  static func reduce(value: inout [String: CGRect], nextValue: () -> [String: CGRect]) {
    value.merge(nextValue()) { _, new in new }
  }
}

struct BaniReaderView: View {
  let bani: Bani

  private static let space = "reader"

  @AppStorage("fontSize") private var fontSize = DesignTokens.defaultSize

  /// Vishraam colouring. On by default
  /// (docs/requirements/display-controls.md#pauses).
  @AppStorage("pauses") private var pauses = true

  /// Transliterations. **Both off by default**, per the Variorum defaults.
  @AppStorage("pronDevanagari") private var pronDevanagari = false
  @AppStorage("pronLatin") private var pronLatin = false

  /// Secondary text as a fraction of the Gurmukhi size — the `Ratio` control,
  /// 0.4 to 1.0. **The default is not specified anywhere**; 0.7 is the middle of the
  /// range and a placeholder (docs/requirements/display-controls.md#ratio).
  @AppStorage("ratio") private var ratio = 0.7

  private var schemes: [Pronunciation] {
    Pronunciation.allCases.filter {
      switch $0 {
      case .devanagari: pronDevanagari
      case .latin: pronLatin
      }
    }
  }

  /// Live size during a pinch. Held separately from @AppStorage, which coalesces
  /// its writes and so would not re-render mid-gesture.
  @State private var livePinchSize: Double?
  /// Size when the pinch began — magnification is cumulative, so scaling the live
  /// value would compound and run away.
  @State private var pinchBaseline: Double?

  @State private var rowFrames: [String: CGRect] = [:]
  @State private var viewportHeight: CGFloat = 1
  /// The row under the fingers, and where on screen it sat when the pinch started.
  @State private var focalID: String?
  @State private var focalFraction: CGFloat = 0.5

  private var displaySize: Double { livePinchSize ?? fontSize }

  var body: some View {
    GeometryReader { viewport in
      ScrollViewReader { proxy in
        ScrollView {
          LazyVStack(alignment: .leading, spacing: 12) {
            ForEach(bani.items) { item in
              row(for: item)
                .id(item.id)
                .background(
                  GeometryReader { geo in
                    Color.clear.preference(
                      key: RowFrames.self,
                      value: [item.id: geo.frame(in: .named(Self.space))]
                    )
                  }
                )
            }
          }
          .padding()
        }
        .coordinateSpace(name: Self.space)
        .onPreferenceChange(RowFrames.self) { rowFrames = $0 }
        // simultaneousGesture, not gesture: a ScrollView installs its own
        // recognisers and an exclusive .gesture loses to them.
        .simultaneousGesture(pinchToZoom(proxy: proxy))
      }
      .onAppear { viewportHeight = viewport.size.height }
      .onChange(of: viewport.size.height) { _, height in viewportHeight = height }
    }
    .background(DesignTokens.background)
    .navigationTitle(bani.latin)
    .navigationBarTitleDisplayMode(.inline)
    .toolbar {
      ToolbarItemGroup(placement: .topBarTrailing) {
        Button("Smaller", systemImage: "textformat.size.smaller") {
          fontSize = DesignTokens.clamp(fontSize - 2)
        }
        Button("Larger", systemImage: "textformat.size.larger") {
          fontSize = DesignTokens.clamp(fontSize + 2)
        }
        controlsStandIn
      }
    }
  }

  @ViewBuilder
  private func row(for item: ReaderItem) -> some View {
    switch item.kind {
    case .line(let line):
      LineText(
        line: line,
        size: displaySize,
        pauses: pauses,
        schemes: schemes,
        ratio: ratio
      )
    case .divider:
      Divider()
        .background(DesignTokens.foreground.opacity(DesignTokens.tonerOpacity))
        .padding(.vertical, 8)
    }
  }

  /// A stand-in for the Controls sidebar, which does not exist yet
  /// (docs/requirements/reading-shell.md#the-controls-sidebar). Here only so the
  /// settings can be exercised; it is not the specified surface and should be
  /// deleted when that one lands.
  private var controlsStandIn: some View {
    Menu {
      Toggle("Pauses", isOn: $pauses)
      Section("Pronunciations") {
        Toggle(Pronunciation.devanagari.label, isOn: $pronDevanagari)
        Toggle(Pronunciation.latin.label, isOn: $pronLatin)
      }
    } label: {
      Image(systemName: AppIcons.controls)
    }
  }

  private func pinchToZoom(proxy: ScrollViewProxy) -> some Gesture {
    MagnifyGesture()
      .onChanged { value in
        if pinchBaseline == nil {
          pinchBaseline = fontSize
          // Where the fingers went down, and which row was there. Both are in the
          // reader's coordinate space, so they are directly comparable.
          let y = value.startLocation.y
          focalFraction = min(1, max(0, y / max(viewportHeight, 1)))
          focalID = rowFrames.first { $0.value.minY <= y && y <= $0.value.maxY }?.key
        }

        // Rounded to whole points: text layout rounds font size and line height to
        // device pixels independently, so fractional sizes make the two drift and
        // the lines visibly jitter.
        let next = DesignTokens.clamp(((pinchBaseline ?? fontSize) * value.magnification).rounded())
        guard next != livePinchSize else { return }
        livePinchSize = next

        // Put the focal row back where it started. scrollTo aligns the row's own
        // anchor with the same fraction of the viewport, so the error is bounded by
        // one line height rather than by the length of the bani.
        if let id = focalID {
          proxy.scrollTo(id, anchor: UnitPoint(x: 0.5, y: focalFraction))
        }
      }
      .onEnded { _ in
        if let final = livePinchSize { fontSize = final }
        livePinchSize = nil
        pinchBaseline = nil
        focalID = nil
      }
  }
}

/// Extracted rather than inlined: the reader body was slow enough to type-check
/// that SwiftUI warned about it, and gestures made it worse.
private struct LineText: View {
  let line: Line
  let size: Double
  let pauses: Bool
  let schemes: [Pronunciation]
  let ratio: Double

  /// Every pause word is styled either way — its colour is the toggle, not its
  /// existence. The ranges were computed once at decode, so turning colouring on
  /// and off never re-runs `detect`.
  ///
  /// Built by appending segments rather than by indexing into an `AttributedString`:
  /// the offsets are Unicode scalars and `AttributedString` indexes by grapheme, so
  /// converting between them is exactly the mismatch this whole path already got
  /// wrong once.
  private var text: AttributedString {
    let scalars = Array(line.gurmukhi.unicodeScalars)
    func segment(_ range: Range<Int>) -> AttributedString {
      AttributedString(String(String.UnicodeScalarView(scalars[range])))
    }

    var out = AttributedString()
    var cursor = 0
    for run in line.pauses {
      // Clamp rather than trap. A bad range is a rendering bug; a crash mid-paath
      // is an interruption of worship.
      let lower = min(max(run.range.lowerBound, cursor), scalars.count)
      let upper = min(max(run.range.upperBound, lower), scalars.count)
      guard lower < upper else { continue }

      if lower > cursor { out += segment(cursor..<lower) }
      var word = segment(lower..<upper)
      word.foregroundColor = pauses ? run.weight.color : DesignTokens.foreground
      out += word
      cursor = upper
    }
    if cursor < scalars.count { out += segment(cursor..<scalars.count) }
    return out
  }

  var body: some View {
    VStack(alignment: .leading, spacing: 2) {
      Text(text)
        .font(.custom(Fonts.gurmukhi, size: size))
        .foregroundStyle(DesignTokens.foreground)
        .lineSpacing(DesignTokens.lineSpacing(for: size, fontName: Fonts.gurmukhi))

      // A Variorum field beneath the Gurmukhi, sized by Ratio. Devanagari needs the
      // Gurmukhi face for its own conjuncts; Latin does not, so it takes the system
      // font rather than borrowing glyph fallbacks from Sant Lipi.
      ForEach(schemes) { scheme in
        let secondary = size * ratio
        Text(Transliteration.of(line, scheme))
          .font(scheme == .devanagari
            ? .custom(Fonts.gurmukhi, size: secondary)
            : .system(size: secondary))
          .foregroundStyle(DesignTokens.foregroundMuted)
      }
    }
    .frame(maxWidth: .infinity, alignment: .leading)
    .textSelection(.enabled)
  }
}
