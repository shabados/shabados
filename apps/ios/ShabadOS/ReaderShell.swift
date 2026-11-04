import Combine
import SwiftUI

/// When someone last used the app, for the journey's idle boundary.
///
/// **A plain class, deliberately not observed**, like `RowFrames`: it is written on
/// every tap, scroll and pinch, and must not re-render anything.
final class ActivityClock {
  private(set) var last = Date.now
  func touch() { last = .now }
}

/// The bani last read and when: what the default screen's `continue reading`
/// offers (docs/requirements/reading-shell.md#the-default-screen).
///
/// **Saved, unlike the journey itself**, so a force close still offers it: a daily
/// bani read less than `dailyWindow` ago, whether or not the app was closed since
/// (decided 2026-10-16). One rule, so the answer does not depend on how the app was
/// left. UserDefaults keys `lastReadId`, `lastReadAt` (a Date) and `lastReadLine`;
/// Android uses the same names (`PreferencesLastReadStore`), with the time in
/// milliseconds.
///
/// `line` is the line that was at the top, by `ReaderItem.id`, which `continue
/// reading` returns to; nil for the top of the bani (journeys.md: "End a journey,
/// reopen it ⇒ the same tabs, each at the position it held").
struct LastRead: Equatable {
  let id: String
  let at: Date
  var line: String? = nil

  /// The seven bundled banis: Morning Nitnem's five, Rehras Sahib and Kirtan Sohila
  /// (library.md#base-collections), all read daily.
  static let dailyIDs: Set<String> = ["JAPJ", "JAAP", "TPSS", "BNCP", "ANND", "RHRS", "SHLA"]
  static let dailyWindow: TimeInterval = 8 * 60 * 60

  /// A time ahead of `now` (the clock was set back) is not offered: it cannot be
  /// told how long ago it was.
  func offered(now: Date) -> Bool {
    let age = now.timeIntervalSince(at)
    return Self.dailyIDs.contains(id) && age >= 0 && age < Self.dailyWindow
  }

  static func saved(in defaults: UserDefaults = .standard) -> LastRead? {
    guard let id = defaults.string(forKey: "lastReadId"),
      let at = defaults.object(forKey: "lastReadAt") as? Date
    else { return nil }
    return LastRead(id: id, at: at, line: defaults.string(forKey: "lastReadLine"))
  }

  func save(in defaults: UserDefaults = .standard) {
    defaults.set(id, forKey: "lastReadId")
    defaults.set(at, forKey: "lastReadAt")
    defaults.set(line, forKey: "lastReadLine")
  }
}

/// The line at the top of the reader now, by `ReaderItem.id`, saved with `LastRead`.
///
/// **A plain class, deliberately not observed**, like `ActivityClock`: the reader
/// writes it on every scroll, and it must not re-render anything.
final class ReadingPosition {
  var line: String?
}

/// The app: the viewer, lying over the Journeys sidebar on its left and the
/// Controls sidebar on its right. "The viewer is the app"
/// (docs/requirements/reading-shell.md): it is what the app opens to, and neither
/// sidebar is a destination of its own.
///
/// **Controls is Journeys mirrored** (reading-shell.md#the-controls-sidebar): the
/// viewer slides left instead of right, by the same rules. Everything below that
/// says "Journeys" holds for Controls on the other side. At most one is open.
///
/// **Opening Journeys slides the viewer aside** to show the sidebar beneath it,
/// leaving at least `peek` of the viewer's inner edge in view, faded towards the
/// background; more in landscape, since the sidebar keeps its portrait width
/// (`travel`). Tapping that edge returns to the viewer. The sidebar does not move:
/// it starts washed in the page colour and comes up to full strength as the viewer
/// moves away (`sidebarStrength`).
///
/// **What is being read is held in memory only.** Journeys are not stored yet, so a
/// cold launch, including after a force quit, is a new journey and shows the
/// default screen. A journey also ends after `idleLimit` without activity, open or
/// in the background (docs/requirements/journeys.md#journeys). What was last read
/// is saved, so the default screen can still offer it (`LastRead`).
struct ReaderShell: View {
  /// The bani being read, by `Bani.id`; nil shows the default screen.
  @State private var baniID: String?
  /// What the default screen's `continue reading` offers, while `LastRead` allows;
  /// restored from what was saved when the app starts.
  @State private var previous: LastRead? = LastRead.saved().flatMap { $0.offered(now: .now) ? $0 : nil }
  /// The sidebar showing, if any; at most one at a time.
  @State private var openSide: Side?
  /// The drag's horizontal travel while it is moving the viewer; nil otherwise.
  @State private var dragX: CGFloat?
  /// `@State` only to keep one instance for the view's lifetime.
  @State private var activity = ActivityClock()
  /// `@State` only to keep one instance for the view's lifetime.
  @State private var position = ReadingPosition()
  /// Settings, as a sheet over everything (reading-shell.md#settings).
  @State private var settingsShown = false
  @Environment(\.horizontalSizeClass) private var horizontalSizeClass

  /// The line a new reader opens at: where `continue reading` left off, or nil for
  /// the top.
  @State private var startLine: String?
  @Environment(\.scenePhase) private var scenePhase

  /// Which sidebar: Journeys on the left, Controls on the right.
  private enum Side { case journeys, controls }

  /// Settled in docs/requirements/journeys.md#journeys: 15 minutes without
  /// activity ends a journey, including while the app is open.
  static let idleLimit: TimeInterval = 15 * 60

  /// How much of the viewer stays in view while Journeys is open. First pass,
  /// matched by eye to the sliver other apps leave (2026-10-15).
  private static let peek: CGFloat = 72

  /// How far the viewer slides, which is also the sidebar's width: **the screen's
  /// short side less `peek`, plus the inset at the sidebar's outer edge**, so the
  /// sidebar's contents are as wide in landscape as in portrait (decided
  /// 2026-10-16). In landscape the viewer then leaves more than `peek` in view.
  ///
  /// The inset is the Dynamic Island's when it is on that side: the leading inset
  /// for Journeys, the trailing for Controls. The panel is padded clear of it inside
  /// this width, so without adding it back the panel was that much narrower in
  /// landscape (2026-10-19). In portrait it is 0.
  static func travel(width: CGFloat, height: CGFloat, edgeInset: CGFloat) -> CGFloat {
    max(0, min(width, height) - peek + edgeInset)
  }
  /// How visible the sidebar is with the viewer covering it, and how far the
  /// viewer has slid by the time it is fully visible (chosen 2026-10-16).
  private static let sidebarStartStrength: Double = 0.4
  private static let sidebarFullAt: Double = 0.5

  /// The sidebar's visibility at `progress`: `sidebarStartStrength` at rest,
  /// rising evenly to full at `sidebarFullAt`, full from there on.
  private static func sidebarStrength(_ progress: CGFloat) -> Double {
    let rise = min(1, Double(progress) / sidebarFullAt)
    return sidebarStartStrength + (1 - sidebarStartStrength) * rise
  }

  /// The sidebar's size with the viewer covering it; full size is reached only
  /// when the viewer is fully aside, though the sidebar is fully visible from
  /// `sidebarFullAt`. First pass (2026-10-16).
  private static let sidebarStartScale: CGFloat = 0.95

  private static func sidebarScale(_ progress: CGFloat) -> CGFloat {
    sidebarStartScale + (1 - sidebarStartScale) * progress
  }

  /// The sidebar's colour: `backgroundBase`, white in light mode and #222 in
  /// dark (chosen 2026-10-16), so it reads apart from the page-coloured viewer.
  /// Android uses the same token (packages/design/tokens.md#colour).
  static let sidebarBackground = DesignTokens.backgroundBase

  /// The least corner radius the viewer keeps while it is moved; see `cardShape`.
  /// The display radius of the iPhone it was checked on (2026-10-16).
  private static let movingCornerRadius: CGFloat = 55

  /// How often an open app checks the boundary, so a journey ends within this
  /// long of reaching it. A timer does not run in the background; returning to
  /// the app checks at once (see `body`).
  private let idleCheck = Timer.publish(every: 10, on: .main, in: .common).autoconnect()

  var body: some View {
    // Respects the safe area, so its proxy reports the insets: the shell inside
    // ignores the safe area, and a proxy there reports none.
    GeometryReader { geometry in
      // The whole screen. The layout stops at the safe area on every side (the
      // Dynamic Island's in landscape); the screen does not.
      let insets = geometry.safeAreaInsets
      let screenWidth = geometry.size.width + insets.leading + insets.trailing
      let screenHeight = geometry.size.height + insets.top + insets.bottom
      let travelJ = Self.travel(width: screenWidth, height: screenHeight, edgeInset: insets.leading)
      let travelC = Self.travel(width: screenWidth, height: screenHeight, edgeInset: insets.trailing)
      // Signed: towards 1 as the viewer moves right to show Journeys, towards -1 as
      // it moves left to show Controls. `amount` is how far, whichever way.
      let progress = openness(journeys: travelJ, controls: travelC)
      let amount = abs(progress)
      let sidebarScale = Self.sidebarScale(amount)
      let offset = progress >= 0 ? travelJ * progress : travelC * progress

      // Two whole screens, one over the other, each a rigid card the size of the
      // display.
      //
      // **Neither sees the real safe area; each is given the insets measured
      // above, as fixed amounts.** SwiftUI works out a view's safe area from where
      // it is on screen, and the viewer moves: wherever it overlapped the Dynamic
      // Island's strip, its inset changed as it slid, so the header stretched and
      // the lines jittered mid-drag, or its page colour and mask, reaching into
      // the strip by ignoring the safe area, fell back to the safe area's edge
      // once moved, leaving the card a strip short (iPhone, landscape,
      // 2026-10-19). Fixed insets do not depend on position, so the card slides as
      // one piece.
      //
      // The top and bottom are safe-area padding, so the reader still scrolls
      // under the status bar and its header; the sides are plain padding, filled
      // with the page colour.
      ZStack(alignment: .leading) {
        // Beneath: the sidebar, on its own colour across the whole screen.
        ZStack(alignment: .leading) {
          Self.sidebarBackground.ignoresSafeArea()
          JourneysPanel(readingID: baniID, open: open)
            .dynamicTypeSize(...InterfaceText.cap)
            // Clear of the Dynamic Island in landscape, by the measured inset.
            // Inside the width, so the sidebar stays as wide.
            .padding(.leading, insets.leading)
            .safeAreaPadding(.top, insets.top)
            .safeAreaPadding(.bottom, insets.bottom)
            // As wide as the viewer leaves uncovered, so nothing in it sits under the peek.
            .frame(width: travelJ)
            // Grows to full size as the viewer slides, outward from its right
            // edge: its top rises, its bottom falls and its left edge moves left. Only the panel scales; the
            // colour behind it stays full screen, so no edge shows.
            //
            // **Laid out at full size throughout; only its drawing is scaled.**
            // `geometryGroup` settles the panel's own layout as one unit, so
            // nothing inside it moves or re-lays out while the scale changes,
            // and `visualEffect` scales the finished drawing without telling the
            // panel its size changed. Reaching full size is then only the scale
            // reaching 1: nothing in the list redraws or shifts.
            .geometryGroup()
            .visualEffect { content, _ in
              content.scaleEffect(sidebarScale, anchor: .trailing)
            }
        }
        // Washed in its own colour rather than dimmed towards black, so it reads
        // the same in light and dark.
        .overlay {
          Self.sidebarBackground.opacity(1 - Self.sidebarStrength(amount))
            .ignoresSafeArea()
            .allowsHitTesting(false)
        }
        // Only the sidebar the viewer is moving away from shows; at rest neither
        // is in view, and Journeys stays beneath.
        .opacity(progress >= 0 ? 1 : 0)
        .allowsHitTesting(openSide == .journeys)

        // Beneath, on the other side: Controls, the same in mirror image.
        ZStack(alignment: .trailing) {
          Self.sidebarBackground.ignoresSafeArea()
          ControlsPanel(onSettings: showSettings)
            .dynamicTypeSize(...InterfaceText.cap)
            .padding(.trailing, insets.trailing)
            .safeAreaPadding(.top, insets.top)
            .safeAreaPadding(.bottom, insets.bottom)
            .frame(width: travelC)
            // Grows outward from its left edge, the side the viewer leaves from.
            .geometryGroup()
            .visualEffect { content, _ in
              content.scaleEffect(sidebarScale, anchor: .leading)
            }
        }
        .frame(maxWidth: .infinity, alignment: .trailing)
        .overlay {
          Self.sidebarBackground.opacity(1 - Self.sidebarStrength(amount))
            .ignoresSafeArea()
            .allowsHitTesting(false)
        }
        .opacity(progress < 0 ? 1 : 0)
        .allowsHitTesting(openSide == .controls)

        viewer
        // The measured insets, fixed while the viewer moves (see above).
        .safeAreaPadding(.top, insets.top)
        .safeAreaPadding(.bottom, insets.bottom)
        .padding(.leading, insets.leading)
        .padding(.trailing, insets.trailing)
        // **Exactly the screen, whatever the viewer holds.** Content taller than
        // the screen made this card, and so the stack, taller, and the sidebars,
        // centred in the stack, moved down with it (2026-10-22).
        .frame(width: screenWidth, height: screenHeight)
        // **The fill, wash, mask and hairline are views filling the card's frame,
        // with no safe-area behaviour of their own.** The frame is already the
        // whole screen. `.background(_:)` with a colour, and `.ignoresSafeArea()`,
        // both reach into the safe area by working out where it is on screen, so
        // once the viewer moved they stopped short of the Dynamic Island's strip:
        // the side padding there showed the white sidebar through, not the page
        // colour, until dragged clear of the Island (iPhone, landscape, 2026-10-19).
        .background { DesignTokens.background }
        .overlay {
          DesignTokens.background.opacity(0.6 * amount)
            .allowsHitTesting(false)
        }
        .mask { cardShape(moved: progress != 0) }
        // A hairline along the viewer's edge, so it reads as a card's edge, not
        // only a shadow's.
        .overlay {
          cardShape(moved: progress != 0)
            .stroke(DesignTokens.foreground.opacity(0.08 * amount), lineWidth: 0.5)
            .allowsHitTesting(false)
        }
        .shadow(color: .black.opacity(0.18 * amount), radius: 24)
        // Moved when drawn, not laid out somewhere else: see `cardShape`. Its
        // layout stays where it was, so it takes no touches once moved; the
        // sidebar beneath does, and the edge below returns to it.
        .visualEffect { content, _ in content.offset(x: offset) }
        .allowsHitTesting(progress == 0)

        // While open, the visible edge, its header button included, is one target
        // that returns to the viewer.
        if let openSide, dragX == nil {
          Color.clear
            .contentShape(Rectangle())
            // All of the viewer still in view: the peek in portrait, more in landscape.
            .frame(width: max(0, screenWidth - (openSide == .journeys ? travelJ : travelC)))
            .frame(maxWidth: .infinity, alignment: openSide == .journeys ? .trailing : .leading)
            .ignoresSafeArea()
            .onTapGesture { setSide(nil) }
        }
      }
      .gesture(sidebarPan(journeys: travelJ, controls: travelC))
      // Both layers span the whole screen, so the viewer is one rigid card whose
      // corners are the display's (`cardShape`). Their contents take the insets
      // as fixed padding instead, above.
      .ignoresSafeArea(.container)
    }
    // Held awake while content is read (`keepsScreenOn`). iOS applies the flag only
    // while the app is in front.
    .onChange(of: keepsScreenOn, initial: true) { _, on in
      UIApplication.shared.isIdleTimerDisabled = on
    }
    // Swiped down or closed by its ✕, back to where it was opened: Controls, or
    // the viewer after a long press on its Controls button.
    .sheet(isPresented: $settingsShown) { SettingsView() }
    // On opening only (chosen 2026-10-16).
    .sensoryFeedback(.impact(weight: .light), trigger: openSide) { old, new in new != nil && new != old }
    .onReceive(idleCheck) { _ in refresh() }
    .onChange(of: scenePhase) { _, phase in
      if phase == .active { refresh() }
      // A suspended app can be closed without warning, so what was being read is
      // saved as it leaves the screen; not on every touch.
      if phase == .background, let baniID { LastRead(id: baniID, at: activity.last, line: position.line).save() }
    }
  }

  /// The viewer's outline: **the display's own corners, kept as it moves.**
  ///
  /// `ConcentricRectangle` matches the display exactly at rest (checked against
  /// UIKit's own radius on an iPhone, 2026-10-16). Two things keep it once moved:
  ///
  /// - **The viewer is moved with `visualEffect`, not `offset`.** A concentric
  ///   corner shrinks by its distance from the display's corner, and `offset`
  ///   moves the view's frame, so the corners went square as it slid. A visual
  ///   effect moves only the drawing, so the shape is worked out where the viewer
  ///   rests.
  /// - **While moved, the corners keep at least `movingCornerRadius`**, should the
  ///   shape be worked out from the moved position after all. At rest there is no
  ///   minimum, so a display with smaller corners, or none, is matched exactly.
  ///
  /// Not a radius read from the display: `GeometryProxy.concentricCornerRadii`
  /// (iOS 27) came back empty on a full-screen view, and UIKit's own value is private.
  private func cardShape(moved: Bool) -> ConcentricRectangle {
    ConcentricRectangle(corners: moved ? .concentric(minimum: .fixed(Self.movingCornerRadius)) : .concentric)
  }

  /// Whether the screen is held awake: content open in the viewer, no sidebar
  /// (docs/requirements/reading-shell.md#the-screen-stays-awake-while-content-is-read).
  /// The 15-minute limit needs nothing here: going idle ends the journey, which
  /// closes the content. Android's `ShellState.keepsScreenOn` is the same rule.
  private var keepsScreenOn: Bool { baniID != nil && openSide == nil }

  @ViewBuilder
  private var viewer: some View {
    if let bani = Self.bani(baniID) {
      BaniReaderView(
        bani: bani,
        activity: activity,
        position: position,
        startLine: startLine,
        onJourneys: { toggle(.journeys) },
        onControls: { toggle(.controls) },
        onSettings: showSettingsFromViewer
      )
        // A different bani is a new reader: its row frames, held line and
        // expanded continuations all belong to the bani they were read from.
        .id(bani.id)
    } else {
      DefaultScreen(
        continueWith: Self.bani(previous?.id),
        open: open,
        onContinue: resume,
        onJourneys: { toggle(.journeys) },
        onControls: { toggle(.controls) },
        onSettings: showSettingsFromViewer
      )
    }
  }

  /// Where the viewer is: 0 covering both sidebars, 1 aside for Journeys, -1 aside
  /// for Controls; between while dragged. A drag from rest goes whichever way the
  /// finger does; from open it can only close.
  private func openness(journeys: CGFloat, controls: CGFloat) -> CGFloat {
    let base = Self.base(openSide)
    guard let dragX else { return base }
    let towardsJourneys = base > 0 || (base == 0 && dragX > 0)
    let travel = towardsJourneys ? journeys : controls
    guard travel > 0 else { return base }
    let moved = base + dragX / travel
    return towardsJourneys ? min(1, max(0, moved)) : min(0, max(-1, moved))
  }

  private static func base(_ side: Side?) -> CGFloat {
    switch side {
    case .journeys: 1
    case .controls: -1
    case nil: 0
    }
  }

  /// A drag anywhere opens or closes a sidebar: rightward on the viewer opens
  /// Journeys, leftward opens Controls, and the opposite way on an open sidebar or
  /// the viewer's edge closes it. On iOS it may start at the screen edge as well as
  /// inside the content: the reader has no back button, so there is no system
  /// back-swipe to collide with (docs/interaction.md).
  ///
  /// **What it wins and loses against is `SidebarPan`'s**: only a drag more sideways
  /// than up or down counts, a swipe never also taps what it started on, a scroll and a swipe never
  /// both move, a drag from a slider is the slider's, and two fingers never start
  /// it.
  private func sidebarPan(journeys: CGFloat, controls: CGFloat) -> SidebarPan {
    SidebarPan(
      canMove: { dx in
        switch openSide {
        case .journeys: dx < 0
        case .controls: dx > 0
        case nil: true
        }
      },
      onChanged: { dx in dragX = dx },
      onEnded: { _, predicted in
        // Where a flick would carry it, not only where the finger lifted, so a
        // short quick drag still opens or closes.
        let base = Self.base(openSide)
        let towardsJourneys = base > 0 || (base == 0 && predicted > 0)
        let travel = towardsJourneys ? journeys : controls
        guard travel > 0 else { withAnimation(.smooth) { dragX = nil }; return }
        let landing = base + predicted / travel
        activity.touch()
        withAnimation(.smooth) {
          if landing > 0.5 && towardsJourneys {
            openSide = .journeys
          } else if landing < -0.5 && !towardsJourneys {
            openSide = .controls
          } else {
            openSide = nil
          }
          dragX = nil
        }
      },
      onCancelled: {
        guard dragX != nil else { return }
        withAnimation(.smooth) { dragX = nil }
      }
    )
  }

  private static func bani(_ id: String?) -> Bani? {
    id.flatMap { id in Corpus.banis.first { $0.id == id } }
  }

  private func setSide(_ side: Side?) {
    activity.touch()
    withAnimation(.smooth) { openSide = side }
  }

  /// The Controls sidebar's `Settings` row. **On iPad, Controls closes first**, then
  /// Settings opens as a window over the reader, not over a sidebar it would leave
  /// half-covered (reading-shell.md#settings). On iPhone the sheet covers the
  /// screen, and Controls stays open beneath it to come back to.
  private func showSettings() {
    guard horizontalSizeClass == .regular else {
      settingsShown = true
      return
    }
    activity.touch()
    withAnimation(.smooth) { openSide = nil } completion: { settingsShown = true }
  }

  /// A long press on the viewer's Controls button: Settings straight from the
  /// viewer, with no sidebar open, so closing it returns to the viewer
  /// (reading-shell.md#settings).
  private func showSettingsFromViewer() {
    activity.touch()
    settingsShown = true
  }

  /// A header button: opens its sidebar, or closes it if open. Opening one closes
  /// the other.
  private func toggle(_ side: Side) {
    setSide(openSide == side ? nil : side)
  }

  /// Every path out of the sidebar closes it
  /// (docs/requirements/reading-shell.md#getting-between-them). A swipe that started
  /// on the row or pill calling this never reaches it: `SidebarPan` cancels the
  /// touch.
  private func open(_ bani: Bani) {
    activity.touch()
    baniID = bani.id
    startLine = nil
    position.line = nil
    LastRead(id: bani.id, at: activity.last).save()
    withAnimation(.smooth) { openSide = nil }
  }

  /// `continue reading`: opens `previous` at the line that was at its top.
  private func resume() {
    guard let previous else { return }
    activity.touch()
    baniID = previous.id
    startLine = previous.line
    position.line = previous.line
    LastRead(id: previous.id, at: activity.last, line: previous.line).save()
    withAnimation(.smooth) { openSide = nil }
  }

  /// Withdraws `continue reading` once `LastRead` no longer allows it, so a default
  /// screen left showing does not keep offering it, then ends the journey if idle.
  private func refresh() {
    if let previous, !previous.offered(now: .now) { self.previous = nil }
    guard Date.now.timeIntervalSince(activity.last) >= Self.idleLimit else { return }
    endJourney()
  }

  /// What was being read becomes `continue reading`, timed from its last activity.
  private func endJourney() {
    guard let baniID else { return }
    let read = LastRead(id: baniID, at: activity.last, line: position.line)
    read.save()
    previous = read.offered(now: .now) ? read : nil
    self.baniID = nil
  }
}

/// The viewer's header: the Journeys button at the left, the title in a centred
/// glass pill, `trailing` at the right (docs/requirements/reading-shell.md#the-viewer).
/// The title is a control, but its actions do not exist yet, so it does nothing.
///
/// **Plain SwiftUI in a `safeAreaBar`, not a `NavigationStack` toolbar.** A
/// navigation bar is UIKit, which works out its safe area from where it sits on
/// screen: as the viewer slid aside, the part going past the screen's edge counted
/// as unsafe, so the trailing button stayed put, the text rewrapped and the
/// contents shifted inside the card (iPhone, landscape, 2026-10-16). A
/// `safeAreaBar` keeps the scroll edge effect beneath it, as the sidebar's header does.
///
/// **Laid out as a navigation bar is, so it behaves like one** (`BarMetrics`):
/// fixed sizes that do not follow Text Size, and a frame that holds everything
/// drawn in it. The bar's frame is what the reader measures from: the safe area
/// beneath it, the edge effect's height, and the line a tap scrolls to the top
/// (`BaniReaderView.tapLine`). Buttons that grew past a fixed frame drew outside
/// it, so the fade and the tapped line stopped short of them (2026-10-19).
struct ViewerBar<Trailing: View>: View {
  let title: String?
  let onJourneys: () -> Void
  /// Styled by the caller with `barCircle()`, so an absent one draws nothing.
  @ViewBuilder let trailing: Trailing

  @Environment(\.verticalSizeClass) private var verticalSizeClass

  var body: some View {
    HStack {
      Button(action: onJourneys) {
        Image(systemName: AppIcons.journeys)
          .imageScale(.large)
      }
      .accessibilityLabel("Journeys")
      .barCircle()
      Spacer(minLength: 0)
      trailing
    }
    .overlay {
      if let title {
        Button {} label: {
          Text(title)
            .font(.headline)
            .lineLimit(1)
            .padding(.horizontal, 16)
            .frame(height: BarMetrics.button)
        }
        .buttonStyle(.plain)
        .contentShape(.capsule)
        .glassEffect(.regular.interactive(), in: .capsule)
        .accessibilityShowsLargeContentViewer()
        // Clear of the buttons on both sides, so a long title truncates.
        .padding(.horizontal, BarMetrics.button + 20)
      }
    }
    .padding(.horizontal, 16)
    .frame(height: BarMetrics.height, alignment: .top)
    .padding(.top, BarMetrics.topMargin(verticalSizeClass))
    .dynamicTypeSize(BarMetrics.typeSize)
  }
}

/// The header's measurements, which `ViewerBar` and the sidebar's header share
/// so the logo sits level with the Journeys button in either orientation.
///
/// **The buttons sit at the top of the bar, `below` beneath them** (chosen
/// 2026-10-19, by eye on an iPhone): flush under the status bar in portrait, `8`
/// from the screen's edge in landscape. A first pass copied the old navigation
/// bar's 54pt with the buttons centred, and 24pt in landscape; both sat too low.
enum BarMetrics {
  /// The glass circle behind each button, and the title pill's height.
  static let button: CGFloat = 44
  /// The bar's space beneath its buttons: the same gap a tapped line's highlight
  /// keeps from the bar, and from the screen's sides (chosen 2026-10-19).
  static let below: CGFloat = BaniReaderView.tapLandingGap
  static let height: CGFloat = button + below
  /// iPhone in landscape only (a compact height); elsewhere the status bar's
  /// safe area already sits above the bar.
  static func topMargin(_ verticalSizeClass: UserInterfaceSizeClass?) -> CGFloat {
    verticalSizeClass == .compact ? 8 : 0
  }
  /// **Bars do not follow Text Size**, as iOS's own do not: at the largest
  /// accessibility sizes the buttons grew past a third of the screen (2026-10-19).
  /// They stay at the default size, and a long press shows the large content
  /// viewer instead, which is iOS's answer for bars.
  static let typeSize: DynamicTypeSize = .large
}

/// Text Size in the interface: Journeys, Controls and Settings
/// (docs/requirements/reading-shell.md#large-text). Never the reader or the preview,
/// which are sized by Zoom; never the bars, pinned at `BarMetrics.typeSize`.
enum InterfaceText {
  /// **Text grows no further than this.** Past it the sliders' group on Settings'
  /// Appearance page took most of an iPhone's screen, leaving the preview no room
  /// (2026-10-19). The same on iPad, where Settings is a window of its own size.
  static let cap: DynamicTypeSize = .accessibility3
  /// **From this size on, the sliders' bylines are hidden**, everywhere they show:
  /// they wrapped to several lines each, and the titles say enough on their own.
  static let bylinesHiddenFrom: DynamicTypeSize = .accessibility1
}

extension View {
  /// A header button: a 44pt glass circle, as a navigation bar's are on iOS 26.
  /// A long press shows the large content viewer unless `largeContentViewer` is
  /// false, for a button whose long press does something else (`ControlsButton`).
  @ViewBuilder
  func barCircle(largeContentViewer: Bool = true) -> some View {
    let circle = buttonStyle(.plain)
      .frame(width: BarMetrics.button, height: BarMetrics.button)
      .contentShape(.circle)
      .glassEffect(.regular.interactive(), in: .circle)
    if largeContentViewer {
      circle.accessibilityShowsLargeContentViewer()
    } else {
      circle
    }
  }
}

/// What the viewer shows when there is nothing to resume: **ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ**, pills
/// for a few banis, and `continue reading` naming the last journey's bani when
/// there is one (docs/requirements/reading-shell.md#the-default-screen). No title:
/// the title names what is being read, and nothing is.
private struct DefaultScreen: View {
  let continueWith: Bani?
  let open: (Bani) -> Void
  /// `continue reading`, which returns to where the bani was left.
  let onContinue: () -> Void
  let onJourneys: () -> Void
  let onControls: () -> Void
  let onSettings: () -> Void

  /// The system's Body text size: 17pt at the default Text Size, following the
  /// person's setting. The greeting and pills are sized from it, not from the
  /// reader's size, so pinching the reader does not change them: the pills at the
  /// interface Gurmukhi size, the greeting at `greetingRatio` × that
  /// (packages/design/tokens.md#type).
  @ScaledMetric(relativeTo: .body) private var uiSize: CGFloat = 17
  /// Added to each side of a pill's text, beyond the glass button's own inset.
  /// First pass (2026-10-16).
  private static let pillPadding: CGFloat = 12

  /// The pills, by `Bani.id`, in order (chosen 2026-10-15). A fixed stand-in for
  /// the spec's "what is due now", which needs goals and schedules. Ardas was also
  /// chosen but is not bundled yet; an id not in the corpus is skipped, so it
  /// appears once `ARDS` is exported.
  private static let pills = ["JAPJ", "RHRS", "SHLA", "ARDS"]

  private var pillBanis: [Bani] {
    Self.pills.compactMap { id in Corpus.banis.first { $0.id == id } }
  }

  var body: some View {
    // Centred when it fits; **scrolls when it does not**, as at the largest Text
    // Size. Taller than the screen and not scrolling, it made the whole shell taller
    // than the screen, and the Controls sidebar moved down by half the difference,
    // taking its `Settings` row off the bottom (iPhone, 2026-10-22).
    ViewThatFits(in: .vertical) {
      greeting
      ScrollView { greeting }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(DesignTokens.background)
    // No title, since nothing is being read; Controls is here too, so the preview
    // and appearance are reachable before anything is open.
    .safeAreaBar(edge: .top) {
      ViewerBar(title: nil, onJourneys: onJourneys) { ControlsButton(action: onControls, onLongPress: onSettings) }
    }
  }

  private var greeting: some View {
    VStack(spacing: 24) {
      Text("ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ")
        .font(Fonts.variable(
          Fonts.gurmukhi,
          size: uiSize * DesignTokens.uiGurmukhiRatio * DesignTokens.greetingRatio,
          weight: DesignTokens.weightPrimary
        ))
        .foregroundStyle(DesignTokens.foreground)
        .multilineTextAlignment(.center)

      // In a row when they fit, stacked when they do not (narrow screens, large
      // Text Size).
      ViewThatFits(in: .horizontal) {
        HStack(spacing: 8) { pillButtons }
        VStack(spacing: 8) { pillButtons }
      }

      // Absent, not disabled, when there is nothing to continue: "an empty or dead
      // control on a first launch is worse than nothing".
      if let bani = continueWith {
        Button(action: onContinue) {
          // Each on one line (reading-shell.md#the-default-screen): the label
          // shortens to `Continue` rather than wrapping, and the bani's name is cut
          // short.
          VStack(spacing: 2) {
            ViewThatFits(in: .horizontal) {
              Text("Continue reading")
              Text("Continue")
            }
            .font(.headline)
            .lineLimit(1)
            Text(bani.latin)
              .font(.subheadline)
              .foregroundStyle(DesignTokens.foregroundMuted)
              .lineLimit(1)
          }
        }
        .buttonStyle(.glass)
        .tint(DesignTokens.ui)
      }
    }
    .padding()
    .frame(maxWidth: .infinity)
  }

  private var pillButtons: some View {
    ForEach(pillBanis) { bani in
      // Gurmukhi in the greeting's weight and colour (chosen 2026-10-16).
      Button { open(bani) } label: {
        Text(bani.gurmukhi)
          .font(Fonts.variable(Fonts.gurmukhi, size: uiSize * DesignTokens.uiGurmukhiRatio, weight: DesignTokens.weightPrimary))
          .foregroundStyle(DesignTokens.foreground)
          .padding(.horizontal, Self.pillPadding)
      }
      .buttonStyle(.glass)
      .lineLimit(1)
    }
  }
}

/// A stand-in for the Journeys sidebar (docs/requirements/reading-shell.md#the-journeys-sidebar),
/// which needs journeys, pins and the Library, none of which exist yet. It has the
/// specified header; the bani list stands in for the rest and should be deleted
/// when they land. `New journey` is left out until that band is designed. It lies
/// beneath the viewer; see `ReaderShell`.
///
/// **No toggle of its own.** The viewer's Journeys button stays in view on the
/// viewer's edge while this is open, and returns to the viewer.
///
/// **Plain SwiftUI views only: no `NavigationStack`, no `List`.** The panel is zoomed
/// as the viewer slides (`ReaderShell.sidebarScale`), and UIKit-backed containers
/// answered the zoom by laying themselves out again at the smaller size instead of
/// being drawn smaller: the text stayed full size while rows moved, and at full size
/// everything jumped and a row that had not fitted appeared (iPhone, 2026-10-16).
/// SwiftUI views are drawn scaled and never re-laid out. The header is a
/// `safeAreaBar`, which keeps the scroll edge effect beneath it that a navigation bar gave.
private struct JourneysPanel: View {
  /// The bani the viewer is showing, drawn as selected.
  let readingID: String?
  let open: (Bani) -> Void

  /// The space on each side of the panel's content: one left edge for the logo,
  /// the section label and every row's text, and the same on the right
  /// (chosen 2026-10-16).
  static let inset: CGFloat = 30

  @Environment(\.verticalSizeClass) private var verticalSizeClass

  var body: some View {
    ScrollView {
      VStack(alignment: .leading, spacing: 0) {
        // A section label, as a grouped list's header is: Subheadline, muted
        // (2026-10-22). Not a `List` section, so set to match by hand.
        Text("Nitnem")
          .font(.subheadline)
          .foregroundStyle(DesignTokens.foregroundMuted)
          .padding(.horizontal, Self.inset)
          .padding(.bottom, 8)
        BaniRows(selectedID: readingID, inset: Self.inset, open: open)
      }
      .padding(.vertical, 12)
    }
    // The list fades under the header rather than being cut
    // (reading-shell.md#header, interaction.md).
    .scrollEdgeEffectStyle(.hard, for: .top)
    // No scroll bar in either sidebar (2026-10-19).
    .scrollIndicators(.hidden)
    .safeAreaBar(edge: .top) { header }
  }

  private var header: some View {
    HStack(spacing: 8) {
      // The app icon, round, without the white corners of its export
      // (Assets.xcassets/lotus, derived from brand/assets/lotus.svg).
      Image("lotus")
        .resizable()
        .scaledToFit()
        .frame(width: 32, height: 32)
        .accessibilityHidden(true)
      Text("Shabad OS")
        .font(.title2.weight(.semibold))
        .foregroundStyle(DesignTokens.foreground)
    }
    .padding(.horizontal, Self.inset)
    // Centred in a button's height, then the bar's space beneath, so the logo is
    // level with the Journeys button.
    .frame(maxWidth: .infinity, minHeight: BarMetrics.button, alignment: .leading)
    .padding(.bottom, BarMetrics.below)
    .padding(.top, BarMetrics.topMargin(verticalSizeClass))
    // A bar, like the viewer's: it does not follow Text Size (`BarMetrics`).
    .dynamicTypeSize(BarMetrics.typeSize)
  }
}
