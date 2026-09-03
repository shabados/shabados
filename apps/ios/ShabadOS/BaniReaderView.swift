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
      }
    }
  }

  @ViewBuilder
  private func row(for item: ReaderItem) -> some View {
    switch item.kind {
    case .line(let gurmukhi):
      LineText(gurmukhi: gurmukhi, size: displaySize)
    case .divider:
      Divider()
        .background(DesignTokens.foreground.opacity(DesignTokens.tonerOpacity))
        .padding(.vertical, 8)
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
  let gurmukhi: String
  let size: Double

  var body: some View {
    Text(gurmukhi)
      .font(.custom(Fonts.gurmukhi, size: size))
      .foregroundStyle(DesignTokens.foreground)
      .lineSpacing(DesignTokens.lineSpacing(for: size, fontName: Fonts.gurmukhi))
      .frame(maxWidth: .infinity, alignment: .leading)
      .textSelection(.enabled)
  }
}
