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
  static var toner: Color {
    Color(UIColor { traits in
      UIColor(DesignTokens.background).resolvedColor(with: traits)
        .blended(
          with: UIColor(DesignTokens.foreground).resolvedColor(with: traits),
          fraction: DesignTokens.tonerOpacity
        )
    })
  }
}

/// Shared sizing for `readerCardBackground` — see its own doc comment for
/// what "the reader's card treatment" means.
private enum ReaderCard {
  /// **Half of the reader's own outer gutter.** `BaniReaderView.body`'s
  /// `ScrollView` content takes a bare `.padding()` — the system default,
  /// 16pt. A card bleeds outward by half of that on each side, so it reads
  /// as wider than the text column without ever touching the screen edge.
  static let bleed: CGFloat = 8
  static let cornerRadius: CGFloat = 12
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
  /// on-state's shape.
  func readerCardBackground(_ color: Color) -> some View {
    background(
      RoundedRectangle(cornerRadius: ReaderCard.cornerRadius)
        .fill(color)
        .padding(.horizontal, -ReaderCard.bleed)
        .padding(.vertical, -ReaderCard.bleed)
    )
  }
}

/// Collects each visible row's frame in the reader's coordinate space, so a pinch
/// can work out which line is under the fingers.
private struct RowFrames: PreferenceKey {
  static let defaultValue: [String: CGRect] = [:]

  static func reduce(value: inout [String: CGRect], nextValue: () -> [String: CGRect]) {
    value.merge(nextValue()) { _, new in new }
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

  // fileprivate, not private: `ContinuationBlock` (a separate type in this
  // same file) needs it too, to report its Expand button's frame into the
  // same coordinate space `rowFrames` and the tap gesture below both read.
  fileprivate static let space = "reader"

  @AppStorage("fontSize") private var fontSize = DesignTokens.defaultSize

  /// Vishraam colouring. On by default
  /// (docs/requirements/display-controls.md#pauses).
  @AppStorage("pauses") private var pauses = true

  /// Transliterations. **Both off by default**, per the Variorum defaults.
  @AppStorage("pronDevanagari") private var pronDevanagari = false
  @AppStorage("pronLatin") private var pronLatin = false

  /// Secondary text as a fraction of the Gurmukhi size — the `Ratio` control,
  /// 0.4 to 1.0 (docs/requirements/display-controls.md#ratio).
  @AppStorage("ratio") private var ratio = DesignTokens.ratioDefault

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
  /// How long the highlight stays fully on before it starts fading — long
  /// enough to still be visible once `tapLine`'s `withAnimation()` scroll
  /// (SwiftUI's own default duration, not a value this file controls) has
  /// finished. SwiftUI doesn't expose that duration as a constant to read, so
  /// this is a deliberate overestimate (the commonly-cited default is
  /// ~0.35s) rather than a measured number — adjust directly if the
  /// highlight is disappearing before the scroll settles, or the reverse.
  private static let tapHighlightHoldDuration: Double = 0.5
  private static let tapHighlightFadeOutDuration: Double = 0.25

  private var displaySize: Double { livePinchSize ?? fontSize }

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
                // Reports this row's own frame in `Self.space` — read by
                // `pinchToZoom`'s focal-row lookup below, and, for a
                // `.continuation` row, by the tap gesture just below to tell
                // "on the card" from "on the Expand button" apart (the
                // button reports its own frame into this same dictionary,
                // under a distinct key — see `ContinuationBlock`).
                .background(
                  GeometryReader { geo in
                    Color.clear.preference(
                      key: RowFrames.self,
                      value: [item.id: geo.frame(in: .named(Self.space))]
                    )
                  }
                )
                .readerCardBackground(highlightedLineID == item.id ? DesignTokens.toner : .clear)
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
                // modifier — same reasoning as `pinchToZoom`'s own comment
                // below. `.onTapGesture` installs an *exclusive* gesture, and
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
                // the Expand button's own area (`rowFrames["expand:…"]`,
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
                      if let buttonFrame = rowFrames["expand:\(continuation.id)"],
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
          .padding()
          // See its own doc comment — this exists so a stray tap on the
          // status bar can never silently discard however far into a long
          // bani someone has read
          // (docs/requirements/display-controls.md#a-system-gesture-never-discards-a-reading-position).
          .background(ScrollsToTopDisabler())
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
  private func row(for item: ReaderItem, precededByTitle: Bool, proxy: ScrollViewProxy) -> some View {
    switch item.kind {
    case .line(let line):
      LineText(
        line: line,
        size: displaySize,
        pauses: pauses,
        schemes: schemes,
        ratio: ratio,
        precededByTitle: precededByTitle
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
  /// **Always `anchor: .top` when scrolling at all, including the bani's own
  /// last row** — an earlier version special-cased rows near the end to
  /// `anchor: .bottom`, reasoning that there's categorically no content below
  /// the very last row to satisfy `.top` with. True, but it turned out not to
  /// matter: the spring below (see its own comment) absorbs an unreachable
  /// target the same way it absorbs an ordinary revised one — it settles
  /// wherever the real maximum scroll offset is, smoothly, target label
  /// notwithstanding. The special case bought nothing and cost real
  /// correctness: a *wider* window (the last 3 rows) forced `.bottom` on rows
  /// that could actually reach `.top` fine, which sometimes scrolled
  /// backwards past content that didn't need to move at all.
  private func tapLine(_ item: ReaderItem, proxy: ScrollViewProxy, scroll: Bool = true) {
    // Instant, not animated — the highlight should already be visibly on
    // before the scroll below starts moving, not fading in alongside it.
    highlightedLineID = item.id

    // Deferred one run-loop tick, not called inline — issuing this
    // `withAnimation` in the same synchronous call as the state change above
    // risks SwiftUI coalescing both into one update transaction, so the
    // highlight never gets a frame fully on-screen before the scroll's own
    // layout-heavy work begins.
    //
    // A spring, not `withAnimation{}`'s implicit `.default` ease curve.
    // `LazyVStack` hasn't measured every row up front, so `scrollTo` starts
    // toward an *assumed* offset and only discovers the real one as layout
    // resolves along the way — near either end of the bani (not enough
    // content left to satisfy `anchor: .top`/`.bottom`) that revision can be
    // large. An ease curve is computed for a fixed start and end, so
    // revising the end mid-flight makes it visually snap; a spring is
    // velocity-driven and can be redirected toward a new target smoothly,
    // with no snap — this doesn't stop the target from being revised, it
    // just stops that revision from being visible as a pop. `response: 0.4,
    // dampingFraction: 1` is *critically damped* — reaches the target
    // directly with no bounce/overshoot of its own on top of everything
    // above, which would only add a second source of jank. First pass, not a
    // measured value — retune directly if it still reads as abrupt.
    //
    // Genuine smooth long-distance scrolling with an exact, always-reachable
    // target would still need a different mechanism entirely (a UIKit-backed
    // scroll view, which lays out and reports real content extent) — a real
    // architecture change, not something to build speculatively while this
    // remains merely "a bit janky at the very ends of a bani," not broken.
    if scroll {
      DispatchQueue.main.async {
        withAnimation(.spring(response: 0.4, dampingFraction: 1)) {
          proxy.scrollTo(item.id, anchor: .top)
        }
      }
    }

    DispatchQueue.main.asyncAfter(deadline: .now() + Self.tapHighlightHoldDuration) {
      withAnimation(.easeOut(duration: Self.tapHighlightFadeOutDuration)) {
        highlightedLineID = nil
      }
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
    return line.isMoolmantar ? Self.layingOutMoolmantar(out, bodySize: size) : out
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
  private static func layingOutMoolmantar(_ attributed: AttributedString, bodySize: Double) -> AttributedString {
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
          weight: Title.ikOankarWeight
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
            weight: isTitle ? Title.weight : DesignTokens.weightPrimary
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

      // A Variorum field beneath the Gurmukhi, sized by Ratio. Devanagari needs the
      // Gurmukhi face for its own conjuncts; Latin does not, so it takes the system
      // font rather than borrowing glyph fallbacks from Sant Lipi.
      ForEach(schemes) { scheme in
        let secondary = size * ratio
        Text(Transliteration.of(line, scheme))
          .font(scheme == .devanagari
            ? Fonts.variable(Fonts.gurmukhi, size: secondary, weight: DesignTokens.weightSecondary)
            : .system(size: secondary, weight: .medium))
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
  let toggle: () -> Void

  /// Enough source lines to fill the preview even for short ones; the frame
  /// below clips whatever doesn't fit, so overshooting costs nothing.
  private static let previewLineCount = 6
  private static let previewVisualLines: Double = 3
  private static let previewLineSpacing: Double = 4

  /// `DesignTokens.toner` — solid, not a translucent wash, on purpose:
  /// `preview`'s fade overlay needs one concrete colour to paint toward, and
  /// a translucent fill can't serve as that target without a second blend of
  /// its own — using the same colour for both the card's fill and the
  /// overlay's endpoint is what makes the fade disappear seamlessly into the
  /// card rather than leaving a visible seam. Now shared with
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
        .background(
          GeometryReader { geo in
            Color.clear.preference(
              key: RowFrames.self,
              value: ["expand:\(continuation.id)": geo.frame(in: .named(BaniReaderView.space))]
            )
          }
        )
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
      .readerCardBackground(Self.cardColor)
  }

  /// The faded, non-interactive preview of the words behind the button. Plain
  /// muted text, not `LineText` — pause colouring and transliterations are for
  /// reading, and this is deliberately not readable, only legible enough to
  /// signal "there is more, and here is what it says."
  private var preview: some View {
    VStack(alignment: .leading, spacing: Self.previewLineSpacing) {
      ForEach(continuation.lines.prefix(Self.previewLineCount)) { line in
        Text(line.gurmukhi)
          .font(Fonts.variable(Fonts.gurmukhi, size: size, weight: DesignTokens.weightPrimary))
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
    // at the very top, 100% — exactly `Self.cardColor`, matching the card
    // behind it — at the very bottom, where `.clipped()` also cuts.
    .overlay(
      LinearGradient(
        colors: [.clear, Self.cardColor],
        startPoint: .top,
        endPoint: .bottom
      )
    )
  }
}
