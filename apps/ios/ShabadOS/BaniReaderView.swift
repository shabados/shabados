import SwiftUI
import UIKit

private extension UIColor {
  /// Linear RGB blend toward `other` by `fraction` (0 = self, 1 = other).
  /// Used by `DesignTokens.toner` to derive a solid colour from two existing
  /// design tokens rather than hand-picking a new hex value.
  func blended(with other: UIColor, fraction: CGFloat) -> UIColor {
    var r1: CGFloat = 0, g1: CGFloat = 0, b1: CGFloat = 0, a1: CGFloat = 0
    var r2: CGFloat = 0, g2: CGFloat = 0, b2: CGFloat = 0, a2: CGFloat = 0
    getRed(&r1, green: &g1, blue: &b1, alpha: &a1)
    other.getRed(&r2, green: &g2, blue: &b2, alpha: &a2)
    return UIColor(
      red: r1 + (r2 - r1) * fraction,
      green: g1 + (g2 - g1) * fraction,
      blue: b1 + (b2 - b1) * fraction,
      alpha: a1 + (a2 - a1) * fraction
    )
  }
}

extension DesignTokens {
  /// A solid "wash" colour — `.background` blended toward `.foreground` by
  /// `.tonerOpacity` — for any surface in this file that needs to read as
  /// distinguishable from the page without inventing a new hardcoded colour.
  /// **Not in the generated `DesignTokens.swift`** — adding it there would
  /// mean it's overwritten the next time `generate-tokens.mjs` runs; this
  /// extends the generated type from outside it instead, which Swift allows
  /// for any type regardless of which file declared it. Solid, not
  /// translucent, so it can double as a fade/overlay target wherever one is
  /// needed (`ContinuationBlock.preview`'s own use of it, previously this
  /// file's own separate `cardColor`, now just this).
  static var toner: Color { wash(DesignTokens.tonerOpacity) }

  /// The same wash, lighter: the top of the "Keep reading" card's gradient.
  static var tonerFaint: Color { wash(DesignTokens.tonerFaintOpacity) }

  private static func wash(_ fraction: Double) -> Color {
    Color(UIColor { traits in
      UIColor(DesignTokens.background).resolvedColor(with: traits)
        .blended(
          with: UIColor(DesignTokens.foreground).resolvedColor(with: traits),
          fraction: fraction
        )
    })
  }
}

/// How the reader's text is set under the `Weight` control
/// (docs/requirements/display-controls.md#weight), shared with the Controls
/// sidebar's preview so the two cannot drift.
///
/// **Every reader line keeps its distance from the Gurmukhi line.** The tokens give
/// each field's weight relative to `weightPrimary`; the control replaces
/// `weightPrimary` and every field moves with it, kept inside the font's axis.
enum ReaderType {
  /// `token`'s field drawn at the control's `control` value.
  static func weight(_ token: Double, control: Double) -> Double {
    min(900, max(100, token + control - DesignTokens.weightPrimary))
  }

  /// A Latin secondary line (a Latin pronunciation, a translation): the system
  /// font at `weightLatin`'s place under the control.
  static func latin(size: Double, control: Double) -> Font {
    let axis = weight(DesignTokens.weightLatin, control: control)
    return Font(UIFont.systemFont(ofSize: size, weight: systemWeight(axis)))
  }

  /// The system font's weight for a CSS-style axis value. San Francisco is variable,
  /// so any value between the named weights is drawn; these are the named weights'
  /// own values, joined in straight lines.
  private static func systemWeight(_ axis: Double) -> UIFont.Weight {
    let stops: [(Double, CGFloat)] = [
      (100, UIFont.Weight.ultraLight.rawValue), (200, UIFont.Weight.thin.rawValue),
      (300, UIFont.Weight.light.rawValue), (400, UIFont.Weight.regular.rawValue),
      (500, UIFont.Weight.medium.rawValue), (600, UIFont.Weight.semibold.rawValue),
      (700, UIFont.Weight.bold.rawValue), (800, UIFont.Weight.heavy.rawValue),
      (900, UIFont.Weight.black.rawValue),
    ]
    let upper = stops.firstIndex { $0.0 >= axis } ?? stops.count - 1
    guard upper > 0 else { return UIFont.Weight(stops[0].1) }
    let (a, wa) = stops[upper - 1]
    let (b, wb) = stops[upper]
    let t = CGFloat((axis - a) / (b - a))
    return UIFont.Weight(wa + (wb - wa) * t)
  }
}

/// The viewer header's Controls button: a glass circle, as the Journeys button is
/// (`ViewerBar`). One icon whether or not Controls is open
/// (docs/requirements/reading-shell.md#controls).
///
/// **It presents Controls itself, as a
/// popover pointing at this button, on every width and in both orientations**
/// (`presentationCompactAdaptation(.popover)`): on iPhone too, where the system would
/// otherwise make it a sheet. The reader stays live and undimmed around it, so a
/// slider's change shows on the reader itself. A tap outside closes it. The commit
/// before this one has the sheet on iPhone, for comparison.
///
/// **Its `Settings` row closes Controls, then opens Settings over the viewer.** A
/// sheet over a popover would leave the popover half covered
/// (reading-shell.md#settings: "On a tablet, Controls closes before Settings
/// opens").
///
/// **A long press opens Settings** (`onLongPress`; reading-shell.md#settings).
/// VoiceOver offers it as the action `Settings`.
///
/// **No large content viewer**, unlike the other bar buttons: at accessibility text
/// sizes it takes a long press too, and the two would answer the same touch. Settings
/// is the more useful answer, and the icon is the one Controls' own header repeats.
struct ControlsButton: View {
  @Binding var isPresented: Bool
  /// A long press, or the `Settings` row: Settings over the viewer.
  let onSettings: () -> Void

  /// Set when a long press has opened Settings, so the touch that held it is not
  /// also a tap when it lifts: a `Button` fires on lifting however long it was
  /// held. Cleared as each press begins.
  @State private var longPressed = false
  /// Settings asked for from the popover: opened once the popover has gone, since
  /// one presentation cannot begin while another is still leaving.
  @State private var settingsAfterClose = false

  var body: some View {
    Button {
      guard !longPressed else { return }
      isPresented.toggle()
    } label: {
      ScaledLucide(AppIcons.controls)
    }
    .simultaneousGesture(
      LongPressGesture()
        .onChanged { _ in longPressed = false }
        .onEnded { _ in
          longPressed = true
          onSettings()
        }
    )
    .sensoryFeedback(.impact(weight: .medium), trigger: longPressed) { _, pressed in pressed }
    .accessibilityLabel("Controls")
    .accessibilityAction(named: "Settings", onSettings)
    .barCircle(largeContentViewer: false)
    // After `barCircle`, so the popover points at the circle.
    .popover(isPresented: $isPresented) {
      ControlsPanel(onSettings: settingsFromPanel)
        .dynamicTypeSize(...InterfaceText.cap)
        // The popover's size: wide enough for a slider's full stroke, tall enough for
        // the three sliders. Where the screen is shorter (an
        // iPhone on its side) the system shrinks it and the panel scrolls.
        .frame(minWidth: 255, idealWidth: 255, idealHeight: 340)
        .presentationCompactAdaptation(.popover)
        .onDisappear {
          guard settingsAfterClose else { return }
          settingsAfterClose = false
          onSettings()
        }
    }
  }

  private func settingsFromPanel() {
    settingsAfterClose = true
    isPresented = false
  }
}

/// Shared sizing for `readerCardBackground` — see its own doc comment for
/// what "the reader's card treatment" means.
enum ReaderCard {
  /// **Half of the reader's own outer gutter.** `BaniReaderView.body`'s
  /// `ScrollView` content takes a bare `.padding()` — the system default,
  /// 16pt. A card bleeds outward by half of that on each side, so it reads
  /// as wider than the text column without ever touching the screen edge.
  static let bleed: CGFloat = 8
  static let cornerRadius: CGFloat = 12
  /// The reader's outer gutter: the system's default `.padding()`, named so the
  /// space between a card and the screen's edge (`gutter - bleed`) can be reused.
  static let gutter: CGFloat = 16
}

private extension View {
  /// The reader's one "card" treatment — a rounded rect, filled with
  /// `color`, bled outward past this view's own bounds by `ReaderCard.bleed`
  /// on every side. **Negative padding on the background shape alone, not on
  /// `self`**, is what lets the card extend past the content's bounds while
  /// the content itself never repositions to make room for it — the same
  /// text sits in the same place whether or not a card happens to be behind
  /// it. Used by `ContinuationBlock`'s "Keep Reading" card and
  /// `BaniReaderView`'s tap-highlight, so there is one definition of what a
  /// card looks like in this reader, not two that could drift — pass
  /// `.clear` for "no card right now" rather than reaching for a different
  /// modifier, so a row's background never silently stops matching its
  /// on-state's shape. `fill` is any shape style, so the "Keep reading" card can
  /// pass its own layered fill.
  func readerCardBackground<Fill: ShapeStyle>(_ fill: Fill) -> some View {
    background(
      RoundedRectangle(cornerRadius: ReaderCard.cornerRadius)
        .fill(fill)
        .padding(.horizontal, -ReaderCard.bleed)
        .padding(.vertical, -ReaderCard.bleed)
    )
  }
}

/// Each loaded row's frame in the reader's coordinate space, so a pinch can work
/// out which line is under the fingers, and a tap on a continuation card can tell
/// its Expand button (keyed `expand:<id>`) from the rest of the card.
///
/// **A plain class, deliberately not observed.** The frames are only *read*, when a
/// pinch or tap begins, so a change to them must not re-render the reader. They used
/// to travel as a `PreferenceKey` into `@State`: every layout change then re-rendered
/// the reader, which reported frames again, and SwiftUI logged "Bound preference
/// RowFrames tried to update multiple times per frame" (2026-10-11). Writing to an
/// object SwiftUI does not observe cannot schedule a render, so there is no loop.
/// Do not make this `@Observable`.
private final class RowFrames {
  /// Keyed by `ReaderItem.id` for a whole row. Two other kinds of key share it:
  /// `expand:<continuation id>` for a "Keep reading" card's Expand button, and
  /// `gurmukhi:<ReaderItem.id>` for the Gurmukhi text alone within a line's row
  /// (read by `BaniReaderView.topLine`, which must not count a row by its
  /// transliterations).
  var frames: [String: CGRect] = [:]

  /// Whole rows only, without the Expand buttons and Gurmukhi texts.
  var rows: [String: CGRect] {
    frames.filter { !$0.key.hasPrefix("expand:") && !$0.key.hasPrefix(Self.gurmukhiPrefix) }
  }

  static let gurmukhiPrefix = "gurmukhi:"
}

/// The line a rotation keeps at the top, by `ReaderItem.id`; see
/// `BaniReaderView.holdOrRestore`.
///
/// **A plain class, deliberately not observed**, like `RowFrames`: it is written
/// on every scroll, and must not re-render the reader each time.
private final class HeldRow {
  var id: String?
  /// The width `id` was recorded at. 0 until the first measurement, which then
  /// reads as a width change with nothing to put back.
  var width: CGFloat = 0
  /// True from a width change until the line has been put back. Frames reported
  /// in between are the relayout's, so nothing is recorded from them.
  var restoring = false
}

/// What the reader reads from the scroll view's geometry: the width for a
/// rotation (`BaniReaderView.holdOrRestore`), the offset and top inset for a tap
/// (`BaniReaderView.tapLine`).
private struct ScrollSample: Equatable {
  var offsetY: CGFloat
  var insetTop: CGFloat
  var width: CGFloat
}

/// What `BaniReaderView.barsFollowScroll` remembers between scroll frames.
///
/// **A plain class, deliberately not observed**, like `LatestScroll`: it is written
/// on every scroll, and must not re-render the reader each time.
private final class BarsFollow {
  /// Whether the scroll is the user's: a drag, or the fling after it.
  var byUser = false
  /// Where the current direction began, in points from the top.
  var turn: CGFloat = 0
}

/// The latest `ScrollSample`, for `BaniReaderView.tapLine`.
///
/// **A plain class, deliberately not observed**, like `RowFrames`: it is written
/// on every scroll, and must not re-render the reader each time.
private final class LatestScroll {
  var sample = ScrollSample(offsetY: 0, insetTop: 0, width: 0)
}

private extension CGRect {
  /// Whole points. A frame read in the reader's space carries floating-point noise
  /// that changes as it scrolls — a 36pt row reads 36.0, then 36.00000000000006,
  /// then 36.0 again (logged on iPhone, 2026-10-11) — and SwiftUI logs "Geometry
  /// action is cycling between duplicate values" when a reported value flips back
  /// and forth like that. A point is far finer than a pinch or a tap needs.
  ///
  /// **The message still appears during a pinch, and that is expected.** Each step
  /// changes the font size, lines re-wrap, and `LazyVStack` re-estimates rows it
  /// has not measured, so frames really do move back and forth while the layout
  /// settles. It costs a dictionary write per row: nothing here re-renders the
  /// reader, so it cannot feed itself the way the old `PreferenceKey` did.
  var roundedToPoints: CGRect {
    CGRect(x: minX.rounded(), y: minY.rounded(), width: width.rounded(), height: height.rounded())
  }
}

/// Turns off `UIScrollView.scrollsToTop` — the system behaviour where tapping
/// the status bar snaps the frontmost scroll view straight to its absolute
/// top — for the reader specifically. On by default for every `UIScrollView`,
/// needs no deliberate action to trigger, and has no undo: one mis-tap near
/// the top edge, reaching for something else, is enough to erase however far
/// into a long bani someone had scrolled
/// (docs/requirements/display-controls.md#a-system-gesture-never-discards-a-reading-position).
///
/// **No SwiftUI modifier exposes this** — `scrollsToTop` is a plain
/// `UIScrollView` property SwiftUI's `ScrollView` never surfaces, so this
/// reaches the real `UIScrollView` the declarative `ScrollView` is backed by
/// on iOS. An invisible, zero-size `UIView` is the standard, minimal way to
/// get a foothold in that hierarchy without wrapping (and so taking over
/// layout of) the content itself.
///
/// **The responder chain, not a hardcoded run of `.superview`s** — a
/// `UIView`'s `next` responder is its superview by default, so walking `next`
/// reaches the same ancestors a `.superview?.superview?…` chain would, but
/// without assuming how many SwiftUI-internal wrapper views sit in between,
/// which isn't something this codebase controls or should depend on staying
/// fixed across OS versions.
private struct ScrollsToTopDisabler: UIViewRepresentable {
  func makeUIView(context: Context) -> UIView {
    let view = UIView(frame: .zero)
    view.isHidden = true
    return view
  }

  func updateUIView(_ uiView: UIView, context: Context) {
    // Deferred: at the moment SwiftUI calls this, the view may not yet be
    // attached to the real hierarchy the ancestor `UIScrollView` lives in.
    DispatchQueue.main.async {
      var responder: UIResponder? = uiView
      while let next = responder?.next {
        if let scrollView = next as? UIScrollView {
          scrollView.scrollsToTop = false
          return
        }
        responder = next
      }
    }
  }
}

struct BaniReaderView: View {
  let bani: Bani
  /// Told of every tap, scroll and pinch, for the journey's idle boundary; see
  /// `ReaderShell`.
  let activity: ActivityClock
  /// Told the line at the top as it changes (`topLine`), for `continue reading`.
  let position: ReadingPosition
  /// The line to open at, by `ReaderItem.id`: where `continue reading` left off, or
  /// nil for the top of the bani.
  let startLine: String?
  /// The header's Journeys button; `ReaderShell` opens or closes the sidebar.
  let onJourneys: () -> Void
  /// Whether the header's Controls button is presenting Controls; `ReaderShell`
  /// closes it when Journeys opens.
  @Binding var controlsShown: Bool
  /// Whether the bar and the status bar are hidden (`barsFollowScroll`). Owned by
  /// `ReaderShell`, which hides the status bar and shows both again from Journeys.
  /// **Never read in `body`**: only `ReaderBars`' own modifiers read `hidden`, so
  /// a hide or show redraws them alone and never the reader.
  let bars: ReaderBars
  /// A long press on the Controls button; `ReaderShell` opens Settings.
  let onSettings: () -> Void

  // fileprivate, not private: `ContinuationBlock` (a separate type in this
  // same file) needs it too, to report its Expand button's frame into the
  // same coordinate space `rowFrames` and the tap gesture below both read.
  fileprivate static let space = "reader"

  /// Also written once on first launch by `StartingSize`, which is why the key is
  /// shared rather than repeated as a literal.
  static let fontSizeKey = "fontSize"

  @AppStorage(fontSizeKey) private var fontSize = DesignTokens.defaultSize

  /// Vishraam colouring. On by default
  /// (docs/requirements/display-controls.md#pauses).
  @AppStorage("pauses") private var pauses = true

  /// Transliterations. **Both off by default**, per the Variorum defaults.
  @AppStorage("pronDevanagari") private var pronDevanagari = false
  @AppStorage("pronLatin") private var pronLatin = false

  /// Secondary text as a fraction of the Gurmukhi size — the `Ratio` control,
  /// 0.4 to 1.0 (docs/requirements/display-controls.md#ratio).
  @AppStorage("ratio") private var ratio = DesignTokens.ratioDefault

  /// The Gurmukhi line's weight — the `Weight` control; every other line keeps its
  /// distance from it (`ReaderType`, docs/requirements/display-controls.md#weight).
  @AppStorage("weight") private var weight = DesignTokens.weightDefault

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

  /// `@State` only to keep one instance for the view's lifetime; see `RowFrames`.
  @State private var rowFrames = RowFrames()
  @State private var viewportHeight: CGFloat = 1
  /// The row under the fingers, and where its top sat when the pinch started, as a
  /// fraction of the viewport's height (below 0 if it started above the bar).
  @State private var focalID: String?
  @State private var focalTop: CGFloat = 0

  /// `@State` only to keep one instance for the view's lifetime.
  @State private var heldRow = HeldRow()

  /// `@State` only to keep one instance for the view's lifetime.
  @State private var latestScroll = LatestScroll()

  /// `@State` only to keep one instance; see `BarsFollow`.
  @State private var barsFollow = BarsFollow()

  /// The bars never hide under VoiceOver, which reads them as it moves through the
  /// screen.
  @Environment(\.accessibilityVoiceOverEnabled) private var voiceOverEnabled

  /// At the foot on iPhone, at the top on iPad (`VerticalEdge.viewerBar`).
  @Environment(\.horizontalSizeClass) private var horizontalSizeClass
  private var barEdge: VerticalEdge { .viewerBar(horizontalSizeClass) }

  /// Bound only so `tapLine` can scroll to an offset; see its doc comment.
  @State private var scrollPosition = ScrollPosition(idType: String.self)

  /// The size the reader draws at. Kept within the zoom range here rather than
  /// only when the size changes, so a saved size from a wider range (an older
  /// version, or the other device's maximum) is drawn within this one's limits.
  /// The saved value itself is not rewritten.
  private var displaySize: Double { livePinchSize ?? DesignTokens.clamp(fontSize) }

  /// Which "Keep reading" controls are expanded, by `Continuation.id`. Not
  /// persisted — collapsed is the state library.md's controls are read against on
  /// every fresh open (docs/requirements/library.md#continuation-not-configuration).
  @State private var expandedContinuations: Set<String> = []

  /// The row a tap highlighted, by `ReaderItem.id` — a `DesignTokens.toner`
  /// background wash that appears, sits through the scroll, then fades away,
  /// so the eye has something to track while the page moves (see `tapLine`).
  /// At most one at a time; a second tap while one is still fading simply
  /// retargets it.
  @State private var highlightedLineID: String?
  /// **The tapped line's highlight, the same on Android** (`Highlight` in
  /// BaniReaderView.kt; display-controls.md#tap-a-line): change both together.
  /// How long it takes to come on; 0 is at once, so it is fully on before the
  /// scroll starts moving.
  private static let tapHighlightFadeInDuration: Double = 0
  /// How long `tapLine`'s scroll takes (display-controls.md#tap-a-line; Android's
  /// `TapScroll.DURATION_MS`). Chosen on devices, 2026-11-09.
  private static let tapScrollDuration: Double = 0.6
  /// How long it then stays fully on before it starts fading: the length of the
  /// scroll, so the fade begins as the line settles.
  private static let tapHighlightHoldDuration: Double = tapScrollDuration
  /// Chosen on devices, 2026-11-09.
  private static let tapHighlightFadeOutDuration: Double = 0.6
  /// How strong it is, as a share of the toner's own opacity: 1 is the toner.
  private static let tapHighlightStrength: Double = 1

  var body: some View {
    GeometryReader { viewport in
      ScrollViewReader { proxy in
        ScrollView {
          // Indexed, not a plain `ForEach(bani.items)` — a title's own top
          // margin needs to know whether the *previous* row was also a title,
          // to avoid two adjacent titles each contributing full spacing (see
          // `row(for:precededByTitle:)`). `Self.expanded` additionally inlines
          // any `.continuation` the reader has opened, in place, as ordinary
          // `.line` rows — see its own doc comment for why: it's what makes a
          // revealed line get the same tap-to-scroll-and-highlight as every
          // other line, for free, rather than needing a second copy of that
          // gesture wired up inside `ContinuationBlock`.
          let items = Self.expanded(bani.items, expandedContinuations)
          LazyVStack(alignment: .leading, spacing: 12) {
            ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
              row(for: item, precededByTitle: Self.precedingItemIsTitle(items, before: index), proxy: proxy)
                .id(item.id)
                // The row's top as a scroll target of its own, which a pinch holds
                // still (`pinchBegan`). Zero height, so aligning it with a point
                // on screen puts the row's top there whatever height the row has
                // grown to; aligning the row itself would not.
                .background(alignment: .top) {
                  Color.clear.frame(height: 0).id(Self.topMarker(item.id))
                }
                // Reports this row's own frame in `Self.space` — read by
                // the pinch's focal-row lookup (`pinchAnchor`), and, for a
                // `.continuation` row, by the tap gesture just below to tell
                // "on the card" from "on the Expand button" apart (the
                // button reports its own frame into this same dictionary,
                // under a distinct key — see `ContinuationBlock`).
                .onGeometryChange(for: CGRect.self) { $0.frame(in: .named(Self.space)).roundedToPoints } action: {
                  rowFrames.frames[item.id] = $0
                }
                // A row the lazy stack unloads stops reporting, and its last frame
                // would otherwise stay behind to be matched by a later pinch.
                .onDisappear { rowFrames.frames[item.id] = nil }
                .readerCardBackground(
                  highlightedLineID == item.id ? DesignTokens.toner.opacity(Self.tapHighlightStrength) : .clear
                )
                // Makes the WHOLE row tappable, not just the glyphs.
                // `LineText`'s own `.frame(maxWidth: .infinity)` stretches
                // its *layout* box to the row's full width — on phone,
                // every mode's reading column is full width, there being no
                // narrower "measure" choice at all
                // (docs/requirements/display-controls.md#width) — but
                // SwiftUI only hit-tests a view's actually-drawn content by
                // default, so the empty space around a short line (or beside
                // centred text) stayed dead to taps without this. A rare
                // case where reaching for `Rectangle()` over the view's own
                // shape is correct: the point is exactly to hit-test the
                // full rectangular frame, glyphs or not.
                .contentShape(Rectangle())
                // `.simultaneousGesture`, not the `.onTapGesture` convenience
                // modifier. `.onTapGesture` installs an *exclusive* gesture, and
                // `LineText`'s `.textSelection(.enabled)` gives the row its
                // own long-press-based selection recognizer; an exclusive tap
                // sitting alongside that has to wait for the system to
                // disambiguate "is this becoming a long-press" before it can
                // fire, which reads as exactly the lag reported — the
                // highlight *was* instant in code, the tap just hadn't fired
                // yet. A simultaneous gesture doesn't wait for that
                // resolution.
                //
                // `SpatialTapGesture`, not plain `TapGesture` — a
                // `.continuation` row needs the tap's *location* to exclude
                // the Expand button's own area (`rowFrames.frames["expand:…"]`,
                // reported by `ContinuationBlock`). **Not solved by attaching
                // a second, exclusive gesture directly to the button's own
                // area instead** — that was tried twice (a `ZStack` sibling,
                // then an `.overlay`) and neither reliably let taps outside
                // the button reach a gesture on a *sibling/base* view several
                // `LazyVStack`/`ScrollView` layers down from this one; a
                // location check on the one gesture already proven to fire
                // reliably here sidesteps that hit-testing question
                // entirely, rather than trying to win it a third time.
                .simultaneousGesture(
                  SpatialTapGesture(coordinateSpace: .named(Self.space)).onEnded { value in
                    // The very first row never scrolls — see `tapLine`'s own
                    // comment on the `scroll` parameter for why.
                    let scroll = index > 0
                    switch item.kind {
                    case .line:
                      tapLine(item, proxy: proxy, scroll: scroll)
                    case .continuation(let continuation):
                      if let buttonFrame = rowFrames.frames["expand:\(continuation.id)"],
                        buttonFrame.contains(value.location)
                      {
                        return
                      }
                      tapLine(item, proxy: proxy, scroll: scroll)
                    }
                  }
                )
            }
          }
          .padding(ReaderCard.gutter)
          // See its own doc comment — this exists so a stray tap on the
          // status bar can never silently discard however far into a long
          // bani someone has read
          // (docs/requirements/display-controls.md#a-system-gesture-never-discards-a-reading-position).
          .background(ScrollsToTopDisabler())
        }
        .scrollPosition($scrollPosition)
        // Nothing scrolls during a pinch: the pinch alone decides where the text is
        // (`pinchBegan`).
        .scrollDisabled(pinchBaseline != nil)
        // The bar has no background (`ViewerBar`), so this is all that sits behind
        // its buttons: the text is covered as it passes under them rather than
        // simply cut, which interaction.md requires.
        //
        // **`.hard`, not `.soft`** (chosen 2026-10-19), here and under the
        // sidebar's header. `.soft` is a gradient blur that runs on past the bar
        // by a fixed amount iOS does not let us set, about 24pt, so a tapped line
        // landed partly blurred. `.hard` is a band that ends at the bar's edge.
        //
        // The bar is at the foot. At the top only the
        // status bar is left, and `.soft` (a fading blur) is enough behind it; it
        // goes with the bars (`ReaderBars`). At the foot there is nothing at all
        // (chosen 2026-11-09): only the glass buttons over the text, as Mail's
        // look, so the text passes under them unfaded. That departs from
        // interaction.md's fade, which asks for the header.
        // With the bar at the top (iPad) the band behind it is `.hard`, as above.
        .scrollEdgeEffectStyle(barEdge == .top ? .hard : .soft, for: .top)
        .modifier(ReaderBars.EdgeEffects(bars: bars))
        .onScrollPhaseChange { _, phase in
          if phase == .interacting { activity.touch() }
          barsFollow.byUser = phase == .interacting || phase == .decelerating
        }
        .onScrollGeometryChange(for: CGFloat.self) {
          $0.contentOffset.y + $0.contentInsets.top
        } action: { _, offset in
          barsFollowScroll(to: offset)
        }
        .coordinateSpace(name: Self.space)
        // `continue reading` opens at the line that was at the top, as a rotation
        // puts it back (`holdOrRestore`). Deferred so the rows have laid out. A
        // line inside a collapsed continuation is not in the list and is skipped.
        .onAppear {
          guard let startLine,
            Self.expanded(bani.items, expandedContinuations).contains(where: { $0.id == startLine })
          else { return }
          heldRow.id = startLine
          DispatchQueue.main.async { proxy.scrollTo(startLine, anchor: .top) }
        }
        // Keeps the line being read through a rotation; see `holdOrRestore`.
        .onScrollGeometryChange(for: ScrollSample.self) {
          ScrollSample(offsetY: $0.contentOffset.y, insetTop: $0.contentInsets.top, width: $0.containerSize.width)
        } action: { _, sample in
          latestScroll.sample = sample
          holdOrRestore(sample, items: Self.expanded(bani.items, expandedContinuations), proxy: proxy)
        }
        // A UIKit recogniser, which runs alongside the scroll view's own and the
        // shell's drag (`ReaderPinch`).
        .gesture(ReaderPinch(space: Self.space, onBegan: pinchBegan, onChanged: pinchChanged, onEnded: pinchEnded))
      }
      .onAppear { viewportHeight = viewport.size.height }
      .onChange(of: viewport.size.height) { _, height in viewportHeight = height }
    }
    .background(DesignTokens.background)
    // No bar background: the text scrolls under the buttons, with nothing
    // blurred or tinted behind them.
    .safeAreaBar(edge: barEdge) {
      ViewerBar(title: bani.latin, edge: barEdge, onJourneys: onJourneys) {
        ControlsButton(isPresented: $controlsShown, onSettings: onSettings)
      }
      .modifier(ReaderBars.Follows(bars: bars, edge: barEdge))
    }
  }

  @ViewBuilder
  private func row(for item: ReaderItem, precededByTitle: Bool, proxy: ScrollViewProxy) -> some View {
    switch item.kind {
    case .line(let line):
      LineText(
        line: line,
        size: displaySize,
        pauses: pauses,
        schemes: schemes,
        ratio: ratio,
        weight: weight,
        precededByTitle: precededByTitle,
        gurmukhiFrame: (rowFrames, RowFrames.gurmukhiPrefix + item.id)
      )
    case .continuation(let continuation):
      // Only ever reached collapsed — `Self.expanded` already replaces an
      // opened continuation with its lines before this switch sees it.
      // Scroll-to-top-and-highlight for the card itself is handled by the
      // row's own gesture above, not here — this view only needs to report
      // its button's frame so that gesture can exclude it.
      ContinuationBlock(
        continuation: continuation,
        size: displaySize,
        pauses: pauses,
        schemes: schemes,
        ratio: ratio,
        weight: weight,
        highlighted: highlightedLineID == item.id,
        frames: rowFrames,
        toggle: { expandedContinuations.insert(continuation.id) }
      )
    }
  }

  /// Inlines every opened continuation's lines, in place, as ordinary
  /// `.line` items — so `row(for:)`'s `.line` case, and the tap gesture and
  /// highlight background wrapping every row below, apply to a revealed line
  /// exactly the same way they apply to any other line in the bani, with no
  /// separate code path. **One-directional**: nothing here ever re-collapses
  /// a continuation — matching `library.md#continuation-not-configuration`'s
  /// "no setting that removes anything," `toggle` above only ever inserts.
  /// A flattened line keeps its own corpus `Line.id` as its `ReaderItem.id`,
  /// not a derived one — those ids are already globally unique
  /// (`data-model.md`'s per-occurrence identity), so nothing else needs to
  /// manufacture one.
  private static func expanded(_ items: [ReaderItem], _ expandedContinuations: Set<String>) -> [ReaderItem] {
    items.flatMap { item -> [ReaderItem] in
      guard case .continuation(let continuation) = item.kind,
        expandedContinuations.contains(continuation.id)
      else { return [item] }
      return continuation.lines.map { ReaderItem(id: $0.id, kind: .line($0)) }
    }
  }

  /// Was the row directly before `index` also a title-styled line? A `.line`
  /// preceded by a `.continuation` (a "Keep Reading" card) counts as *not*
  /// preceded by a title — a card is a real visual break, not a sibling
  /// heading, so the usual spacing still applies there.
  private static func precedingItemIsTitle(_ items: [ReaderItem], before index: Int) -> Bool {
    guard index > 0, case .line(let previous) = items[index - 1].kind else { return false }
    return previous.isHeading || previous.isMoolmantar
  }

  /// Highlights the tapped line with `DesignTokens.toner`, scrolls its own
  /// top toward the viewport's top unless `scroll` is `false`, then fades the
  /// highlight away; the highlight gives the eye something to hold onto
  /// while the page moves, rather than just acknowledging the tap in
  /// isolation.
  ///
  /// **`scroll: false` is for the bani's first row specifically** — verified
  /// on screen recordings, twice: at true rest there's real but purely
  /// decorative space above the first row (the reader's own outer margin, a
  /// title's own top spacing), and `scrollTo(anchor: .top)` has no way to
  /// know that isn't "content" — it just aligns the row's own top with the
  /// viewport's, which means moving *past* natural rest to hide that space,
  /// even though the row was already fully visible with nowhere better to
  /// go. Every other row still scrolls normally, including ones only
  /// partially visible near the top — this is specific to there being
  /// nothing above the very first row, not a general "already visible" skip.
  ///
  /// **Scrolls the `ScrollPosition` binding to an offset, not to the row's id.**
  /// An animated scroll to an id — `ScrollViewProxy.scrollTo` or
  /// `ScrollPosition.scrollTo(id:)`, with or without `.scrollTargetLayout()` —
  /// leaves the scroll view holding that id: the binding still reported it, with
  /// `isPositionedByUser` false, through the user's next drag, and partway into it
  /// the reader snapped back to the tapped line (iPhone, 2026-10-15). A scroll to
  /// an offset leaves no id behind. Not `UIScrollView.setContentOffset`, which also
  /// worked: the binding keeps it within SwiftUI.
  ///
  /// The offset is exact, not estimated: the tapped row is on screen, so its frame
  /// has been measured. It is the row's top in `space` plus the content offset plus
  /// the bar's height (`contentInsets.top`), because `scrollTo(y:)` measures from
  /// below the bar while `contentOffset` does not; without the inset the line
  /// landed 113pt short in portrait.
  ///
  /// `.smooth`, a spring without bounce, for `tapScrollDuration`.
  /// How far below the bar a tapped line's highlight lands: the same space it
  /// keeps from the screen's sides (chosen 2026-10-19).
  static let tapLandingGap: CGFloat = ReaderCard.gutter - ReaderCard.bleed

  private func tapLine(_ item: ReaderItem, proxy: ScrollViewProxy, scroll: Bool = true) {
    activity.touch()
    // At once while `tapHighlightFadeInDuration` is 0: the highlight should
    // already be visibly on before the scroll below starts moving, not fading in
    // alongside it.
    if Self.tapHighlightFadeInDuration > 0 {
      withAnimation(.easeIn(duration: Self.tapHighlightFadeInDuration)) { highlightedLineID = item.id }
    } else {
      highlightedLineID = item.id
    }

    // Deferred one run-loop tick, not called inline — issuing this
    // `withAnimation` in the same synchronous call as the state change above
    // risks SwiftUI coalescing both into one update transaction, so the
    // highlight never gets a frame fully on-screen before the scroll's own
    // layout-heavy work begins.
    if scroll {
      // A tap reads onward, as a scroll down does (`barsFollowScroll`).
      setBarsHidden(true)
      DispatchQueue.main.async {
        guard let frame = rowFrames.frames[item.id] else {
          // Not expected: the row was just tapped, so it has reported a frame.
          // An unanimated scroll to the id leaves nothing behind to snap back to.
          proxy.scrollTo(item.id, anchor: .top)
          return
        }
        let sample = latestScroll.sample
        // Less `bleed`, so the highlight's top lands below the bar, not the
        // row's own top: the highlight reaches `bleed` above the row, and landed
        // the row itself under the header's buttons (2026-10-19). Less
        // `tapLandingGap` too, so it lands that far below the bar.
        // With the bar at the top (iPad), the tap hides it, so the line lands
        // where it was, below the status bar, not below the bar: the bar keeps its
        // place in the layout (`ReaderBars`), so the inset still counts it.
        let hiddenBar = barEdge == .top && !voiceOverEnabled && !controlsShown ? BarMetrics.height : 0
        withAnimation(.smooth(duration: Self.tapScrollDuration)) {
          scrollPosition.scrollTo(
            y: sample.offsetY + sample.insetTop + frame.minY - ReaderCard.bleed - Self.tapLandingGap + hiddenBar
          )
        }
      }
    }

    DispatchQueue.main.asyncAfter(
      deadline: .now() + Self.tapHighlightFadeInDuration + Self.tapHighlightHoldDuration
    ) {
      // Unless another tap or a pinch has taken the highlight since.
      guard highlightedLineID == item.id else { return }
      withAnimation(.easeOut(duration: Self.tapHighlightFadeOutDuration)) {
        highlightedLineID = nil
      }
    }
  }

  /// How far a scroll down must go before the bars hide, and back up before they
  /// show: any movement past a resting finger's sub-point drift (chosen on an
  /// iPhone, 2026-11-09). The lock in `ReaderBars` keeps it from flickering.
  private static let barsHideDistance: CGFloat = 1
  private static let barsShowDistance: CGFloat = 1

  /// **The bars follow the scroll, as a browser's do.**
  /// Scrolled down by a finger (a drag or its fling), past `barsHideDistance`,
  /// the bar and the status bar hide; scrolled back up past `barsShowDistance`,
  /// they return. At the
  /// very top they always show. Only the user's own scrolling counts: a tap's
  /// scroll hides them itself (`tapLine`), and a pinch or a rotation, which move
  /// the offset too, change nothing. Not while Controls is open, whose popover
  /// points at the bar, nor under VoiceOver.
  private func barsFollowScroll(to offset: CGFloat) {
    let follow = barsFollow
    if offset <= 0 {
      follow.turn = offset
      setBarsHidden(false)
      return
    }
    guard follow.byUser else {
      follow.turn = offset
      return
    }
    // `turn` is the furthest point reached in the current direction: the
    // deepest point while hidden, the shallowest while showing.
    if bars.hidden {
      follow.turn = max(follow.turn, offset)
      if follow.turn - offset > Self.barsShowDistance {
        follow.turn = offset
        setBarsHidden(false)
      }
    } else {
      follow.turn = min(follow.turn, offset)
      if offset - follow.turn > Self.barsHideDistance {
        follow.turn = offset
        setBarsHidden(true)
      }
    }
  }

  private func setBarsHidden(_ hidden: Bool) {
    bars.set(hidden: hidden && !voiceOverEnabled && !controlsShown)
  }

  /// How strongly the size follows the fingers. The size changes by the pinch's
  /// magnification raised to this power: at 0.75, spreading the fingers to twice
  /// their distance enlarges the text about 1.68×, not 2×. Below 1 is slower and
  /// finer than the fingers; above 1, faster. Chosen 2026-10-10 by trying values
  /// from 0.25 to 1.5 on an iPhone and an iPad.
  private static let pinchSensitivity: Double = 0.75

  /// The row a pinch starting at height `y` is anchored to.
  ///
  /// The row under the fingers if there is one. **A pinch that starts in the gap
  /// between two rows still picks one: the one nearer the middle of the screen**,
  /// not the one nearer the top or bottom edge. So a gap in the top half takes
  /// the row below it, and a gap in the bottom half the row above it. Only whole
  /// rows count (`RowFrames.rows`): the Expand buttons and Gurmukhi texts that
  /// share the dictionary are never an anchor.
  private static func pinchAnchor(
    at y: CGFloat, in rows: [String: CGRect], viewportHeight: CGFloat
  ) -> String? {
    if let under = rows.first(where: { $0.value.minY <= y && y <= $0.value.maxY }) {
      return under.key
    }
    let above = rows.filter { $0.value.maxY < y }.max { $0.value.maxY < $1.value.maxY }
    let below = rows.filter { $0.value.minY > y }.min { $0.value.minY < $1.value.minY }
    let inTopHalf = y < viewportHeight / 2
    return (inTopHalf ? below ?? above : above ?? below)?.key
  }

  /// Keeps the line being read at the top through a rotation (or an iPad window
  /// resize): records `topLine` on every scroll while the width is unchanged, and
  /// after the width changes puts it back with `scrollTo(_:anchor: .top)`, the
  /// call a tap uses.
  ///
  /// **Done by hand because SwiftUI does not keep it.** Left alone, a rotation
  /// keeps whatever the scroll view anchors to, and rows above that were never
  /// measured at the new width are placed by estimated height, so the reader
  /// jumped upwards (iPhone, 2026-10-15). **The `ScrollPosition` binding does not
  /// do this**: it chooses for itself which row is at the top, and when it was
  /// relied on for rotation it also left the reader shifted 16pt sideways until
  /// the next scroll. It is bound only for `tapLine`.
  ///
  /// Nothing is recorded from a width change until the line has been put back:
  /// the relayout reports new frames first, and recording from them would hold
  /// the wrong line. A held id no longer in the list (a continuation since
  /// expanded) is left alone.
  private func holdOrRestore(_ sample: ScrollSample, items: [ReaderItem], proxy: ScrollViewProxy) {
    guard sample.width == heldRow.width else {
      heldRow.width = sample.width
      if let id = heldRow.id, items.contains(where: { $0.id == id }) {
        heldRow.restoring = true
        // Deferred so the new width has laid out; recording resumes a turn
        // later, once the scroll has.
        DispatchQueue.main.async {
          proxy.scrollTo(id, anchor: .top)
          DispatchQueue.main.async { heldRow.restoring = false }
        }
      }
      return
    }

    // Deferred so the rows' frames from this same layout pass are the ones read;
    // dropped if the width has changed since.
    let width = sample.width
    DispatchQueue.main.async {
      guard heldRow.width == width, !heldRow.restoring else { return }
      if let id = Self.topLine(in: rowFrames) {
        heldRow.id = id
        position.line = id
      }
    }
  }

  /// The line a rotation keeps at the top: **the first row with at least 40% of
  /// its Gurmukhi showing below the bar** (chosen 2026-10-15).
  ///
  /// - **Only the Gurmukhi counts**, from its own frame (`gurmukhi:` keys), because
  ///   transliterations make rows longer or shorter. A row showing only its
  ///   transliteration, or only the descenders of its Gurmukhi, passes to the
  ///   next. A "Keep reading" card has no separate Gurmukhi, so its whole frame
  ///   counts.
  /// - **40% of the Gurmukhi's whole height**, however many lines it wraps to, so
  ///   it means the same at any size and width. Any part at all was too little: 14pt
  ///   of descenders under the bar held a line whose Gurmukhi was out of sight.
  /// - **"Below the bar" is 0 in `space`.** Measured on an iPhone: the row just
  ///   below the bar reads `minY` 0 in portrait and landscape. The scroll view's
  ///   `contentInsets.top` and `safeAreaInsets.top` both report the bar's height
  ///   (113 / 78) and **must not be subtracted**: with either, the line at the top
  ///   counted as hidden and every rotation moved the reader down one line.
  private static let minimumShowing: CGFloat = 0.4

  private static func topLine(in frames: RowFrames) -> String? {
    let all = frames.frames
    return frames.rows
      .filter {
        let gurmukhi = all[RowFrames.gurmukhiPrefix + $0.key] ?? $0.value
        // Only the bar cuts off the rows that matter here: the nearest to the top
        // is wanted, so the bottom of the screen is irrelevant.
        let showing = gurmukhi.maxY - max(gurmukhi.minY, 0)
        return showing > 0 && showing >= gurmukhi.height * minimumShowing
      }
      .min { $0.value.minY < $1.value.minY }?
      .key
  }

  /// The id of `id`'s row-top marker (see `body`).
  private static func topMarker(_ id: String) -> String { "top:" + id }

  /// A pinch (`ReaderPinch`): the font size changes live, and **the row under the fingers stays where it was
  /// on screen, on every frame**, while the text resizes and re-wraps around it
  /// (display-controls.md#zoom). Nothing is corrected when the fingers lift,
  /// because nothing has moved.
  ///
  /// **The size itself changes during the pinch**, so the effect is unambiguous.
  /// Previewing by drawing the reader scaled (`scaleEffect`) and applying the size
  /// on release was tried 2026-10-10: no jitter, but what the size would become was
  /// too hard to judge while pinching.
  ///
  /// **How the row is held:** each size step moves the `ScrollPosition` to the row's
  /// top marker (`topMarker`), at the fraction of the viewport where that top was
  /// when the pinch began. The size and the position change in the same state
  /// update, so the scroll view lays the new size out already positioned, rather
  /// than drawing it once out of place and then putting it back. A marker of zero
  /// height is what keeps the row's *top* still: aligning the row itself would
  /// align a point a fraction of the way down it, and that point moves as the row
  /// grows or re-wraps.
  ///
  /// **Scrolling is off for the length of the pinch** (`scrollDisabled` in `body`),
  /// so a finger moving during the pinch cannot fight the held position.
  ///
  /// Two earlier versions did not hold the row: correcting with
  /// `ScrollViewProxy.scrollTo` after each step, anchored at the fingers' height
  /// rather than the row's top, jittered at large sizes (2026-10-10); correcting
  /// once on lift left the row drifting during the pinch and jumping back after it.
  private func pinchBegan(at location: CGPoint) {
    activity.touch()
    pinchBaseline = DesignTokens.clamp(fontSize)
    // Where the fingers are, and which row is there. Both are in the reader's
    // coordinate space, so they are directly comparable.
    let y = location.y
    focalID = Self.pinchAnchor(at: y, in: rowFrames.rows, viewportHeight: viewportHeight)
    // Not clamped to the screen: a tall row whose top is above the bar keeps it
    // there, and is aligned the same way.
    focalTop = (focalID.flatMap { rowFrames.frames[$0]?.minY } ?? y) / max(viewportHeight, 1)
    // Shows which row the pinch is anchored to, with the same wash a tap uses.
    highlightedLineID = focalID
  }

  private func pinchChanged(_ magnification: CGFloat) {
    guard let pinchBaseline else { return }
    activity.touch()
    // Snapped to steps of 1/6pt (chosen 2026-10-10, for smoothness). It was whole
    // points before, because text layout rounds font size and line height to
    // device pixels independently, so off-pixel sizes can make the two drift. If
    // that shows as shimmer, go back to `.rounded()` on the whole size.
    let step = 1.0 / 6
    let raw = pinchBaseline * pow(Double(magnification), Self.pinchSensitivity)
    let next = DesignTokens.clamp((raw / step).rounded() * step)
    guard next != (livePinchSize ?? pinchBaseline) else { return }
    livePinchSize = next
    if let focalID {
      scrollPosition.scrollTo(id: Self.topMarker(focalID), anchor: UnitPoint(x: 0.5, y: focalTop))
    }
  }

  private func pinchEnded() {
    if let final = livePinchSize { fontSize = final }
    livePinchSize = nil
    pinchBaseline = nil

    let id = focalID
    focalID = nil
    guard let id else { return }
    // **The position is handed back as an offset, where it already is.** A scroll
    // to an id leaves the scroll view holding that id, and it snapped back to it
    // partway into a later drag (see `tapLine`). Deferred so the offset read is the
    // final layout's.
    DispatchQueue.main.async {
      let sample = latestScroll.sample
      scrollPosition.scrollTo(y: sample.offsetY + sample.insetTop)
    }
    // Then fade the anchor highlight exactly as a tap's fades, unless something
    // else (a tap) has taken the highlight over meanwhile.
    DispatchQueue.main.asyncAfter(deadline: .now() + Self.tapHighlightHoldDuration) {
      guard highlightedLineID == id else { return }
      withAnimation(.easeOut(duration: Self.tapHighlightFadeOutDuration)) {
        highlightedLineID = nil
      }
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
  /// The `Weight` control's value; see `ReaderType`.
  let weight: Double
  /// Was the immediately preceding row also a title-styled line? Two adjacent
  /// titles (e.g. the mool mantar, then a heading, then another heading —
  /// a real bundled sequence in `BNCP`/`RHRS`) previously each contributed
  /// their own full `Title.spaceBefore` *and* `Title.spaceAfter`, stacking
  /// into a gap far bigger than either was meant to read as on its own.
  /// Suppressing the second title's `spaceBefore` when this is `true` keeps
  /// the first title's `spaceAfter` (plus the ordinary row spacing) as the
  /// only separation — still visibly more than two body lines get, just not
  /// doubled. Defaults `false` so `ContinuationBlock`'s own call sites, which
  /// don't yet compute this, keep today's spacing rather than silently losing
  /// it.
  var precededByTitle = false
  /// Where to report the Gurmukhi text's own frame, and under which key; see
  /// `BaniReaderView.topLine`. Transliterations are not part of it.
  var gurmukhiFrame: (frames: RowFrames, key: String)?

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
    return line.isMoolmantar ? Self.layingOutMoolmantar(out, bodySize: size, weight: weight) : out
  }

  /// Lays the mool mantar out as `ੴ` alone on its own line, then its six
  /// word-pairs flowing after it — **each pair glued together so it can
  /// never itself split across a wrap, but free to share a line with a
  /// neighbouring pair whenever there's room**, the same as an ordinary
  /// paragraph reflowing at different widths, just with the wrap points
  /// restricted to pair boundaries. Done with **one real newline, plus a
  /// pair of Word Joiners flanking the *ordinary* space within each pair,
  /// inserted into this same `AttributedString`, not separate `Text`
  /// views.** Ordinary breakable spaces stay *between* pairs (so the
  /// system's own wrapping decides how many fit per line, at any font size
  /// or screen width); the space *within* a pair is never replaced or
  /// specially attributed, just surrounded so wrapping can't land on it.
  /// Keeping it all one `AttributedString` is also what keeps the whole mool
  /// mantar one selectable, copyable unit: `.textSelection(.enabled)` (on
  /// the `Text` this returns into) treats one `AttributedString` as a single
  /// span no matter how many visual lines it wraps onto.
  ///
  /// **Word Joiner (`U+2060`), not `U+00A0` non-breaking space.** A first
  /// version used NBSP in place of the space and hit a real font bug,
  /// checked directly against `SantLipi-VF.ttf`'s own tables rather than
  /// guessed: the font's NBSP glyph — a real, separate glyph from regular
  /// space's, not a missing-glyph fallback — has advance width `0`. A
  /// version after that added a `.kern` override sized from the font's
  /// static `hmtx` metrics to compensate, and *that* was wrong for a
  /// subtler reason: this is a variable font with an `HVAR` table, so actual
  /// advance widths shift with the weight axis, and one hardcoded
  /// compensation number can't track that. Word Joiner sidesteps the whole
  /// class of problem: it's a Unicode *default-ignorable* character, which
  /// text engines render as zero-width regardless of any specific font's
  /// glyph coverage — nothing to measure, nothing that can drift out of sync
  /// with a font update. And [UAX #14](https://unicode.org/reports/tr14/)
  /// rule LB11 prohibits a line break immediately before or after one, on
  /// either side — so `WJ` + `" "` + `WJ` keeps the *real* space character
  /// (same glyph, same metrics as literally every other space in this app)
  /// while making that one position un-breakable. No compensation value of
  /// any kind, because nothing about the space itself changed.
  ///
  /// Only ever called on `line.isMoolmantar` text, which is one exact,
  /// verified spelling (`gurmukhi::is_moolmantar`'s own doc comment) — so the
  /// word structure below is safe to hardcode, not derived by searching for
  /// anything:
  ///
  /// ```
  /// word:  0    1    2     3      4       5        6         7      8       9       10     11   12        13
  ///        ੴ    ਸਤਿ  ਨਾਮੁ  ਕਰਤਾ   ਪੁਰਖੁ   ਨਿਰਭਉ    ਨਿਰਵੈਰੁ   ਅਕਾਲ   ਮੂਰਤਿ   ਅਜੂਨੀ   ਸੈਭੰ   ਗੁਰ  ਪ੍ਰਸਾਦਿ    ॥
  ///        └ikOankar┘└─sat nam─┘└─karta purakh─┘└nirbhau nirvair┘└─akal murat─┘└ajuni saibhan┘└gur prasad ॥┘
  /// ```
  ///
  /// The space after word 0 (`ੴ`) is the one *forced* newline — always its
  /// own line, regardless of width; that space is consumed, not kept
  /// alongside the newline. The space *within* each pair (after words 1, 3,
  /// 5, 7, 9, 11) gets Word-Joiner-flanked. So does the space before the
  /// closing `॥` (after word 12) — treated exactly like a seventh pair, so
  /// the danda can never end up orphaned alone on a line. The space
  /// *between* pairs (after words 2, 4, 6, 8, 10) is the one left
  /// completely untouched.
  ///
  /// Only the `ੴ` run gets an explicit `.font` override (`Title.ikOankarSizeRatio`
  /// / `.ikOankarWeight`); every word-pair segment is untouched, so it keeps
  /// inheriting whatever `Text(text).font(...)` in `body` gives every other
  /// title-styled line (`Title.moolmantarSizeRatio` / `.weight`) — and any
  /// existing pause-colour run (`ਨਿਰਵੈਰੁ`, in the one bundled spelling that
  /// carries a vishraam) survives untouched too, since this only wraps space
  /// characters, never re-touches a word's own attributes.
  ///
  /// **Builds a fresh `AttributedString` from slices of the original**,
  /// mirroring `text`'s own `out += segment(...)` pattern just above, rather
  /// than mutating `attributed` in place — every slice is read from the
  /// untouched original, so there is no risk of an earlier edit invalidating
  /// an index a later one depends on.
  private static func layingOutMoolmantar(_ attributed: AttributedString, bodySize: Double, weight: Double) -> AttributedString {
    var spaces: [AttributedString.Index] = []
    var searchStart = attributed.startIndex
    while let space = attributed.characters[searchStart...].firstIndex(of: " ") {
      spaces.append(space)
      searchStart = attributed.characters.index(after: space)
    }
    guard !spaces.isEmpty else { return attributed } // shorter than expected; render unmodified

    let forcedNewline: Set<Int> = [0]
    let nonBreaking: Set<Int> = [1, 3, 5, 7, 9, 11, 12]
    let wordJoiner = AttributedString("\u{2060}")

    var out = AttributedString()
    var segmentStart = attributed.startIndex
    for (index, space) in spaces.enumerated() where forcedNewline.contains(index) || nonBreaking.contains(index) {
      var piece = AttributedString(attributed[segmentStart..<space])
      if index == 0 {
        piece.font = Fonts.variable(
          Fonts.gurmukhi,
          size: bodySize * Title.ikOankarSizeRatio,
          weight: ReaderType.weight(Title.ikOankarWeight, control: weight)
        )
      }
      out += piece

      let spaceEnd = attributed.characters.index(after: space)
      if forcedNewline.contains(index) {
        out += AttributedString("\n")
      } else {
        // The ORIGINAL space, unmodified — not a substitute character — is
        // what actually renders; the two Word Joiners either side of it are
        // what stop it being a valid wrap point.
        out += wordJoiner
        out += AttributedString(attributed[space..<spaceEnd])
        out += wordJoiner
      }
      segmentStart = spaceEnd
    }
    out += AttributedString(attributed[segmentStart...])
    return out
  }

  /// This app's own choice of what to do with `Line`'s classification — `Line`
  /// only reports facts, never a size; composing them into a rendering decision
  /// belongs here, not in `packages/gurmukhi`.
  /// **`moolmantarSizeRatio`/`ikOankarSizeRatio`/`ikOankarWeight` are first
  /// passes, not measured values** — adjust once they can be seen rendered.
  /// **Local to this view, not yet promoted to `packages/design/tokens.md`**:
  /// Android has no reader view to share them with yet.
  private enum Title {
    static let headingSizeRatio: Double = 1.25
    static let moolmantarSizeRatio: Double = 1.5
    static let weight: Double = 650
    static let spaceBefore: Double = 1.6
    static let spaceAfter: Double = 0.8

    /// The `ੴ` alone, on its own line within the mool mantar — 250% of the
    /// base reading size, same convention as `headingSizeRatio`/
    /// `moolmantarSizeRatio` (relative to `size`, not stacked on top of
    /// `moolmantarSizeRatio`).
    static let ikOankarSizeRatio: Double = 2.5
    /// Deliberately lighter than `weight` (650), the value every other
    /// title-styled run still uses. Sant Lipi is a variable font, so stroke
    /// thickness scales with size as well as weight — holding `weight`
    /// constant while `ikOankarSizeRatio` more than doubles the size would
    /// render noticeably heavier than the rest of the line, not just bigger.
    /// Bhajneet's own value, tuned once already (450 → 400) after seeing it
    /// rendered.
    static let ikOankarWeight: Double = 400

    /// **Negative, and not `DesignTokens.lineSpacing`.** That shared function
    /// is `max(0, size * lineHeightRatio - natural)` — clamped so it can never
    /// go below zero, which is exactly wrong here: the `ੴ` line renders at
    /// `ikOankarSizeRatio` (2.5×), so its own natural line box (the font's
    /// real ascent+descent at that size) is already far taller than the body
    /// text below it, and `.lineSpacing()` adds on top of that natural
    /// height rather than replacing it. A shared, always-non-negative helper
    /// has no way to claw that back; only a dedicated negative value pulls
    /// the second line up to compensate. Bhajneet's own value, first pass —
    /// adjust directly, there is no formula to re-derive it from.
    static let ikOankarLineSpacing: Double = -20

    static func sizeRatio(isHeading: Bool, isMoolmantar: Bool) -> Double {
      if isMoolmantar { return moolmantarSizeRatio }
      if isHeading { return headingSizeRatio }
      return 1
    }
  }

  /// Scripture-adjacent, not scripture — rendered dimmed rather than hidden
  /// (`gurmukhi::is_colophon`'s own doc comment).
  private static let colophonOpacity: Double = 0.55

  var body: some View {
    // `line.isHeading` drives rendering again as of 2026-09-18 — its earlier
    // false-positive rates (16%-69% on bundled content) came from a
    // structure-only rule; `gurmukhi::is_heading` now also requires a marker
    // word or a short numbered-form shape, verified against all 1935 bundled
    // lines with zero false positives. See its own doc comment before touching
    // this again.
    let isTitle = line.isHeading || line.isMoolmantar
    let titleSize = size * Title.sizeRatio(isHeading: line.isHeading, isMoolmantar: line.isMoolmantar)

    VStack(alignment: isTitle ? .center : .leading, spacing: 2) {
      Text(text)
        .font(
          Fonts.variable(
            Fonts.gurmukhi,
            size: isTitle ? titleSize : size,
            weight: ReaderType.weight(isTitle ? Title.weight : DesignTokens.weightPrimary, control: weight)
          )
        )
        .foregroundStyle(DesignTokens.foreground)
        // Mool mantar text gets its own (negative) value, pulling the line
        // after the giant `ੴ` back up — see `Title.ikOankarLineSpacing`'s own
        // comment for why the shared `DesignTokens.lineSpacing` can't do this.
        .lineSpacing(
          line.isMoolmantar
            ? Title.ikOankarLineSpacing
            : DesignTokens.lineSpacing(for: size, fontName: Fonts.gurmukhi)
        )
        .multilineTextAlignment(isTitle ? .center : .leading)
        .onGeometryChange(for: CGRect.self) { $0.frame(in: .named(BaniReaderView.space)).roundedToPoints } action: {
          if let gurmukhiFrame { gurmukhiFrame.frames.frames[gurmukhiFrame.key] = $0 }
        }
        .onDisappear { if let gurmukhiFrame { gurmukhiFrame.frames.frames[gurmukhiFrame.key] = nil } }

      // A Variorum field beneath the Gurmukhi, sized by Ratio. Devanagari needs the
      // Gurmukhi face for its own conjuncts; Latin does not, so it takes the system
      // font rather than borrowing glyph fallbacks from Sant Lipi.
      ForEach(schemes) { scheme in
        let secondary = size * ratio
        Text(Transliteration.of(line, scheme))
          .font(scheme == .devanagari
            ? Fonts.variable(Fonts.gurmukhi, size: secondary, weight: ReaderType.weight(DesignTokens.weightSecondary, control: weight))
            : ReaderType.latin(size: secondary, control: weight))
          .foregroundStyle(DesignTokens.foregroundMuted)
          .multilineTextAlignment(isTitle ? .center : .leading)
      }
    }
    .frame(maxWidth: .infinity, alignment: isTitle ? .center : .leading)
    // "em" here means a multiple of this line's own font size, matching how the
    // spec states it — not the surrounding text's size, so a title's own spacing
    // scales with its own (larger) rendered size.
    //
    // spaceBefore is suppressed when the row right above was also a title —
    // see `precededByTitle`'s own doc comment. Without this, three titles in a
    // row (a real bundled sequence: the mool mantar, then a heading, then
    // another heading) each stacked their own spaceAfter *and* the next one's
    // spaceBefore into one gap, far bigger than either margin was meant to
    // read as alone.
    .padding(.top, isTitle && !precededByTitle ? size * Title.spaceBefore : 0)
    .padding(.bottom, isTitle ? size * Title.spaceAfter : 0)
    .opacity(line.isColophon ? Self.colophonOpacity : 1)
    .textSelection(.enabled)
  }
}

/// The "Keep reading" control. **Only ever the collapsed state** — once
/// `toggle` opens it, `BaniReaderView.expanded(_:_:)` replaces this view
/// entirely with `continuation.lines` rendered as ordinary rows, so they get
/// the same tap-to-scroll-and-highlight as any other line in the bani. This
/// view itself never re-collapses anything.
///
/// **Tapping continues in place** — no navigation, no new screen
/// (docs/requirements/library.md#continuation-not-configuration: "It works
/// mid-recitation"). There is no collapse-again affordance once a passage has been
/// read into, matching that same requirement's "no setting that removes anything" —
/// `expandedContinuations` only ever grows.
///
/// **Collapsed, it previews the actual upcoming words**, not an abstract "more
/// content" placeholder — `continuation.lines` are the real next lines, muted,
/// clipped to roughly three lines tall, and faded into the card's own colour
/// (`preview`'s own comment) rather than cutting off mid-line. The "Expand"
/// control sits centred on top, as a `.glass` button — the same treatment the
/// toolbar's icon buttons get automatically from their container; this one is
/// inline in content, not a toolbar, so it asks for `.glass` explicitly. **A
/// button straddling the card's bottom edge (half on, half off) was tried and
/// reverted** — the geometry looked right on paper but rendered wrong, and
/// wasn't worth further debugging time against a purely decorative detail;
/// simple centring is the known-good fallback.
private struct ContinuationBlock: View {
  let continuation: Continuation
  let size: Double
  let pauses: Bool
  let schemes: [Pronunciation]
  let ratio: Double
  /// The `Weight` control's value; see `ReaderType`.
  let weight: Double
  /// Whether this card is the tapped row, so it can show the highlight itself
  /// (see the end of `body`).
  let highlighted: Bool
  /// Where this card reports its Expand button's frame; see `RowFrames`.
  let frames: RowFrames
  let toggle: () -> Void

  /// Enough source lines to fill the preview even for short ones; the frame
  /// below clips whatever doesn't fit, so overshooting costs nothing.
  private static let previewLineCount = 6
  private static let previewVisualLines: Double = 3
  private static let previewLineSpacing: Double = 4

  /// `DesignTokens.toner` — solid, not a translucent wash, on purpose:
  /// `preview`'s fade overlay needs one concrete colour to paint toward, and
  /// a translucent fill can't serve as that target without a second blend of
  /// its own. The card's fill is a gradient that *ends* in this colour, and
  /// the overlay ends in it too, so the fade meets the card's bottom without a
  /// visible seam. Now shared with
  /// `BaniReaderView`'s own tap-highlight, so there is exactly one "toner
  /// wash" definition in this file, not two that could drift.
  private static var cardColor: Color { DesignTokens.toner }

  /// A single un-wrapped Gurmukhi line's true rendered height — **not**
  /// `size * DesignTokens.lineHeightRatio`, which is a *target* `LineText` only
  /// reaches by adding `lineSpacing` on top of the font's own metrics, and Sant
  /// Lipi's natural line height already exceeds that target at most sizes, so
  /// the added spacing is usually zero. Measuring the same way
  /// `DesignTokens.lineSpacing` does keeps this box's "three lines" the same
  /// three lines `LineText` would actually render, not an approximation that
  /// undershoots.
  private var previewLineHeight: Double {
    let natural = UIFont(name: Fonts.gurmukhi, size: size)?.lineHeight ?? size * DesignTokens.lineHeightRatio
    return max(natural, size * DesignTokens.lineHeightRatio)
  }

  private var previewHeight: Double {
    Self.previewVisualLines * previewLineHeight + (Self.previewVisualLines - 1) * Self.previewLineSpacing
  }

  var body: some View {
    // Collapsed only — `BaniReaderView.expanded(_:_:)` replaces an opened
    // continuation with its own lines before this view is ever built, so
    // there is no expanded branch to render here any more.
    //
    // `.overlay(alignment:)`, not `ZStack { preview; Button }` — the button
    // is unambiguously layered over `preview` this way, not a sibling
    // competing with it for the same region.
    preview
      .overlay(alignment: .center) {
        Button(action: toggle) {
          Label("Expand", systemImage: AppIcons.fullscreen)
            .font(.subheadline.weight(.semibold))
        }
        .buttonStyle(.glass)
        .tint(DesignTokens.ui)
        // Reports this button's own frame into the same `RowFrames` the
        // reader's row-level tap gesture reads — see that gesture's own
        // comment (`BaniReaderView.body`) for why the card's tap-to-scroll
        // lives there now rather than as a gesture on `preview` here: two
        // attempts at excluding this button by view structure alone
        // (`ZStack`, then this `.overlay`) did not reliably work, so the
        // row-level gesture instead checks the tap's location directly
        // against this frame.
        .onGeometryChange(for: CGRect.self) { $0.frame(in: .named(BaniReaderView.space)).roundedToPoints } action: {
          frames.frames["expand:\(continuation.id)"] = $0
        }
        .onDisappear { frames.frames["expand:\(continuation.id)"] = nil }
      }
      // `readerCardBackground` bleeds outward via negative padding on the
      // shape alone, not on this content — the text stays exactly where
      // every other row's text sits. **No extra `.padding(.vertical:)` on
      // the block itself** — that was stacking on top of the outer
      // `LazyVStack`'s own 12pt gap, making the gap into the card visibly
      // bigger than the gap between any two ordinary lines. The card's
      // bleed eats into part of that existing 12pt gap instead of adding
      // to it, the same as it already does horizontally into the reader's
      // side gutter.
      //
      // **Tapped, the whole card fills with `toner`, then fades back.** This
      // layer sits above the gradient below; the row's own highlight cannot do
      // it, because it is drawn behind the card and the card's opaque fill
      // hides it. Driven by the same `highlightedLineID` as a tapped line, so
      // the fade back uses that line highlight's own animation and timing.
      .readerCardBackground(Self.cardColor.opacity(highlighted ? 1 : 0))
      // **At rest, a gradient from `tonerFaint` at the top to `toner` at the
      // bottom** (2026-10-10). Both ends are solid colours, so the gradient
      // blends cleanly, and its bottom matches the end of the preview's fade.
      .readerCardBackground(
        LinearGradient(
          colors: [DesignTokens.tonerFaint, Self.cardColor],
          startPoint: .top,
          endPoint: .bottom
        )
      )
  }

  /// The faded, non-interactive preview of the words behind the button. Plain
  /// muted text, not `LineText` — pause colouring and transliterations are for
  /// reading, and this is deliberately not readable, only legible enough to
  /// signal "there is more, and here is what it says."
  private var preview: some View {
    VStack(alignment: .leading, spacing: Self.previewLineSpacing) {
      ForEach(continuation.lines.prefix(Self.previewLineCount)) { line in
        Text(line.gurmukhi)
          .font(Fonts.variable(Fonts.gurmukhi, size: size, weight: ReaderType.weight(DesignTokens.weightPrimary, control: weight)))
          .foregroundStyle(DesignTokens.foregroundMuted)
      }
    }
    .frame(maxWidth: .infinity, alignment: .topLeading)
    .frame(height: previewHeight, alignment: .top)
    .clipped()
    // A solid-colour veil painted OVER the text, not a `.mask()` of the text's
    // own alpha. `.mask()` multiplies the gradient's alpha against each
    // glyph's anti-aliased edge alpha, pixel by pixel — thin strokes and thick
    // strokes cross the same gradient value at different visible rates, so the
    // fade reads as patchy rather than smooth, worse on Gurmukhi's stacked
    // matras than on plain Latin text. An opaque-colour overlay has no such
    // interaction: it just progressively covers the text with `Self.cardColor`,
    // which is why that colour has to be solid, not a wash — see its own
    // comment. A straight two-stop ramp, top to bottom of the box: 0% covering
    // at the very top, 100% `Self.cardColor` at the very bottom, where
    // `.clipped()` also cuts. The card behind is itself a gradient ending in
    // that colour, but it extends `ReaderCard.bleed` past this box, so at this
    // box's bottom it is a shade lighter than the veil, a difference of well
    // under 1% of the text colour.
    .overlay(
      LinearGradient(
        colors: [.clear, Self.cardColor],
        startPoint: .top,
        endPoint: .bottom
      )
    )
  }
}
