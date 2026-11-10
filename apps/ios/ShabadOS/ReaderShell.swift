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

/// The app: the viewer, lying over the Journeys sidebar on its left. "The viewer is
/// the app" (docs/requirements/reading-shell.md): it is what the app opens to, and
/// the sidebar is not a destination of its own.
///
/// **Controls is not a sidebar.** It is the
/// Controls button's own presentation (`ControlsButton`): a popover on iPhone and
/// iPad alike, with the reader live around it. Only Journeys slides.
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
  /// Whether the Journeys sidebar is showing.
  @State private var journeysOpen = false
  /// Controls, presented by its button (`ControlsButton`). Here so opening Journeys
  /// can close it.
  @State private var controlsShown = false
  /// The drag's horizontal travel while it is moving the viewer; nil otherwise.
  @State private var dragX: CGFloat?
  /// The device has a hinge: an iPhone Duo, on either display (`HingeWatch`).
  @State private var hasHinge = false
  @Environment(\.horizontalSizeClass) private var horizontalSizeClass
  /// `@State` only to keep one instance for the view's lifetime.
  @State private var activity = ActivityClock()
  /// `@State` only to keep one instance for the view's lifetime.
  @State private var position = ReadingPosition()
  /// Settings, as a sheet over everything (reading-shell.md#settings).
  @State private var settingsShown = false

  /// The line a new reader opens at: where `continue reading` left off, or nil for
  /// the top.
  @State private var startLine: String?
  @Environment(\.scenePhase) private var scenePhase

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
  /// The inset is the Dynamic Island's when it is on the leading side. The panel is padded clear of it inside
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

  /// How often an open app checks the boundary, so a journey ends within this
  /// long of reaching it. A timer does not run in the background; returning to
  /// the app checks at once (see `body`).
  private let idleCheck = Timer.publish(every: 10, on: .main, in: .common).autoconnect()

  var body: some View {
    Group {
      if oneColumn { stackShell } else if besideViewer { splitShell } else { cardShell }
    }
    // Unfolding or folding the Duo moves between the stack and the split view; the
    // reader is made anew there, so it opens where it was.
    .onChange(of: oneColumn) { _, _ in startLine = position.line }
    // The Duo, on either display, takes the iPad's shell (`besideViewer`).
    .modifier(HingeWatch { present in
      guard present != hasHinge else { return }
      // The reader is made anew in the other shell, so it opens where it was.
      startLine = position.line
      hasHinge = present
    })
    // Held awake while content is read (`keepsScreenOn`). iOS applies the flag only
    // while the app is in front.
    .onChange(of: keepsScreenOn, initial: true) { _, on in
      UIApplication.shared.isIdleTimerDisabled = on
    }
    // Swiped down or closed by its ✕, back to the viewer: opened by a long press on
    // the Controls button, or from Controls on iPad (`ControlsButton`).
    .sheet(isPresented: $settingsShown) { SettingsView() }
    // The status bar is never hidden (ADR-0018): the system minimizes its toolbar
    // but not the status bar, and one hidden by a rule of our own beside it fell out
    // of step; in Split View on the Duo the app may have none, and hiding it flickered.
    // On opening only (chosen 2026-10-16).
    .sensoryFeedback(.impact(weight: .light), trigger: journeysOpen) { old, new in new && !old }
    .onChange(of: controlsShown) { _, shown in if shown { activity.touch() } }
    .onReceive(idleCheck) { _ in refresh() }
    .onChange(of: scenePhase) { _, phase in
      if phase == .active { refresh() }
      // A suspended app can be closed without warning, so what was being read is
      // saved as it leaves the screen; not on every touch.
      if phase == .background, let baniID { LastRead(id: baniID, at: activity.last, line: position.line).save() }
    }
  }

  /// iPhone, and the Duo's outer display: the viewer, a card lying over the
  /// Journeys sidebar, slid aside to show it.
  private var cardShell: some View {
    // Respects the safe area, so its proxy reports the insets: the shell inside
    // ignores the safe area, and a proxy there reports none.
    GeometryReader { geometry in
      // The whole screen. The layout stops at the safe area on every side (the
      // Dynamic Island's in landscape); the screen does not.
      let insets = geometry.safeAreaInsets
      let screenWidth = geometry.size.width + insets.leading + insets.trailing
      let screenHeight = geometry.size.height + insets.top + insets.bottom
      let travelJ = Self.travel(width: screenWidth, height: screenHeight, edgeInset: insets.leading)
      // 0 with the viewer over the sidebar, 1 with it aside.
      let progress = openness(travel: travelJ)
      let amount = progress
      let sidebarScale = Self.sidebarScale(amount)
      let offset = travelJ * progress

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
        .allowsHitTesting(journeysOpen)

        cardViewer
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
        // The wash, mask, hairline and shadow, from where the viewer is drawn on
        // this frame, not where it is going (`ViewerCard`).
        .modifier(ViewerCard(progress: progress))
        // Moved when drawn, not laid out somewhere else: see `ViewerCard`. Its
        // layout stays where it was, so it takes no touches once moved; the
        // sidebar beneath does, and the edge below returns to it.
        .visualEffect { content, _ in content.offset(x: offset) }
        .allowsHitTesting(progress == 0)

        // While open, the visible edge, its header button included, is one target
        // that returns to the viewer.
        if journeysOpen, dragX == nil {
          Color.clear
            .contentShape(Rectangle())
            // All of the viewer still in view: the peek in portrait, more in landscape.
            .frame(width: max(0, screenWidth - travelJ))
            .frame(maxWidth: .infinity, alignment: .trailing)
            .ignoresSafeArea()
            .onTapGesture { setJourneys(false) }
        }
      }
      .gesture(sidebarPan(travel: travelJ))
      // Both layers span the whole screen, so the viewer is one rigid card whose
      // corners, once moved, are the display's (`ViewerCard`). Their contents take the insets
      // as fixed padding instead, above.
      .ignoresSafeArea(.container)
    }
  }

  /// **The platform's own shell, by device, not by width**
  /// (docs/requirements/reading-shell.md#four-surfaces-one-of-them-always-visible, chosen 2026-11-10).
  /// iPad and the iPhone Duo, on either display, have `splitShell` and the system's
  /// toolbar, as native as it goes; every other iPhone has the card (`cardShell`).
  /// An iPad window narrowed to an iPhone's width keeps the split view: a window
  /// that shrinks does not turn into the iPhone's shell.
  private var besideViewer: Bool {
    UIDevice.current.userInterfaceIdiom == .pad || hasHinge
  }

  /// The split view shows one column at a time: the Duo's outer display, or an iPad
  /// window as narrow as an iPhone. Journeys is then a screen of its own, the root
  /// the viewer is pushed onto, so choosing a bani from it shows the viewer.
  private var oneColumn: Bool { besideViewer && horizontalSizeClass == .compact }

  /// The viewer, as the one screen pushed onto Journeys (`stackShell`).
  private enum ViewerRoute: Hashable { case viewer }

  /// The viewer's Journeys button, or nil while an open panel beside the viewer
  /// holds it (`splitShell`).
  private var viewerJourneys: (() -> Void)? {
    besideViewer && journeysOpen ? nil : { setJourneys(!journeysOpen) }
  }

  /// iPad, and the Duo's inner display: Journeys as the platform's own sidebar,
  /// beside the viewer.
  ///
  /// **One open state, opened by the Journeys button or the split view's own swipe
  /// from the left edge, and closed by the button** (2026-11-10). It stays open
  /// while banis are opened from it (`open`), except in one column (`oneColumn`).
  /// There is no edge to tap. Its own toggle is removed for ours, which **moves into the panel's
  /// header while it is open** (at its trailing end, as Mail's and Notes' toggles
  /// do, 2026-11-10), and is in the viewer's bar while it is closed
  /// (`viewerJourneys`). So the bar minimizing as the reader scrolls never hides
  /// the way to close an open panel. The binding's setter is there for whatever the
  /// split view closes by itself.
  ///
  /// **`.automatic` is a trial** (2026-11-10): iPadOS may put the sidebar over the
  /// viewer rather than beside it, in portrait; the requirement is beside it
  /// always, which `.balanced` gives if `.automatic` does not.
  ///
  /// The panel's header is our own `safeAreaBar` (`JourneysPanel`); the viewer's
  /// buttons and title are the system's toolbar (`ViewerBarHost`). Plain views in a column are
  /// allowed here though not on iPhone: nothing zooms the panel.
  private var splitShell: some View {
    NavigationSplitView(
      columnVisibility: Binding(
        get: { journeysOpen ? .all : .detailOnly },
        set: { visibility in
          let open = visibility != .detailOnly
          if open != journeysOpen { setJourneys(open) }
        }
      )
    ) {
      JourneysPanel(readingID: baniID, open: open, onClose: { setJourneys(false) })
        .dynamicTypeSize(...InterfaceText.cap)
        .toolbar(removing: .sidebarToggle)
        .toolbar(.hidden, for: .navigationBar)
    } detail: {
      viewer
        .background { DesignTokens.background.ignoresSafeArea() }
    }
    .navigationSplitViewStyle(.automatic)
  }

  /// One column (`oneColumn`): **Journeys is the root, and the viewer is pushed onto
  /// it**, as a folder is in Files (2026-11-10). The app opens on the viewer (the
  /// default screen is `New journey`); the system's back swipe, from anywhere
  /// across the screen as iOS 26's is, returns to Journeys; choosing in Journeys
  /// pushes the viewer again. A stack rather than the split view's collapsed
  /// form, whose first screen in one column was Journeys (Duo simulator).
  private var stackShell: some View {
    NavigationStack(path: Binding(
      get: { journeysOpen ? [] : [ViewerRoute.viewer] },
      set: { path in
        let open = path.isEmpty
        if open != journeysOpen { setJourneys(open) }
      }
    )) {
      JourneysPanel(readingID: baniID, open: open, onClose: { setJourneys(false) })
        .dynamicTypeSize(...InterfaceText.cap)
        .toolbar(.hidden, for: .navigationBar)
        .navigationDestination(for: ViewerRoute.self) { _ in
          viewer
            .background { DesignTokens.background.ignoresSafeArea() }
        }
    }
  }

  /// Whether the screen is held awake: content open in the viewer, no sidebar
  /// (docs/requirements/reading-shell.md#the-screen-stays-awake-while-content-is-read).
  /// The 15-minute limit needs nothing here: going idle ends the journey, which
  /// closes the content. Android's `ShellState.keepsScreenOn` is the same rule.
  private var keepsScreenOn: Bool { baniID != nil && !journeysOpen }

  /// The card's viewer, in a stack for the system's toolbar (`ViewerBarHost`). UIKit's
  /// bar once recomputed its safe area as the card slid aside (2026-10-16); it slid
  /// cleanly on iOS 26 and 27 (ADR-0018).
  private var cardViewer: some View {
    NavigationStack { viewer }
  }

  @ViewBuilder
  private var viewer: some View {
    if let bani = Self.bani(baniID) {
      BaniReaderView(
        bani: bani,
        activity: activity,
        position: position,
        startLine: startLine,
        onJourneys: viewerJourneys,
        controlsShown: $controlsShown,
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
        onJourneys: viewerJourneys,
        controlsShown: $controlsShown,
        onSettings: showSettingsFromViewer
      )
    }
  }

  /// Where the viewer is: 0 covering the sidebar, 1 aside; between while dragged.
  private func openness(travel: CGFloat) -> CGFloat {
    let base: CGFloat = journeysOpen ? 1 : 0
    guard let dragX, travel > 0 else { return base }
    return min(1, max(0, base + dragX / travel))
  }

  /// A drag anywhere opens or closes Journeys: rightward on the viewer opens it, and
  /// leftward on the open sidebar or the viewer's edge closes it. A leftward drag on
  /// the viewer does nothing. On iOS it may start at the screen edge as well as
  /// inside the content: the reader has no back button, so there is no system
  /// back-swipe to collide with (docs/interaction.md).
  ///
  /// **What it wins and loses against is `SidebarPan`'s**: only a drag more sideways
  /// than up or down counts, a swipe never also taps what it started on, a scroll and a swipe never
  /// both move, a drag from a slider is the slider's, and two fingers never start
  /// it.
  private func sidebarPan(travel: CGFloat) -> SidebarPan {
    SidebarPan(
      canMove: { dx in journeysOpen ? dx < 0 : dx > 0 },
      onChanged: { dx in dragX = dx },
      onEnded: { _, predicted in
        // Where a flick would carry it, not only where the finger lifted, so a
        // short quick drag still opens or closes.
        guard travel > 0 else { withAnimation(.smooth) { dragX = nil }; return }
        let landing = (journeysOpen ? 1 : 0) + predicted / travel
        activity.touch()
        if landing > 0.5 { controlsShown = false }
        withAnimation(.smooth) {
          journeysOpen = landing > 0.5
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

  /// Opening Journeys closes Controls, which would otherwise stay over the moved
  /// viewer.
  private func setJourneys(_ open: Bool) {
    activity.touch()
    if open { controlsShown = false }
    withAnimation(.smooth) { journeysOpen = open }
  }

  /// A long press on the viewer's Controls button, or Controls' `Settings` row on
  /// iPad once Controls has closed: Settings over the viewer, so closing it returns
  /// there (reading-shell.md#settings).
  private func showSettingsFromViewer() {
    activity.touch()
    settingsShown = true
  }

  /// Every path out of the sidebar closes it on iPhone
  /// (docs/requirements/reading-shell.md#getting-between-them); beside the viewer it
  /// stays open (`splitShell`). A swipe that started on the row or pill calling this
  /// never reaches it: `SidebarPan` cancels the touch.
  private func open(_ bani: Bani) {
    activity.touch()
    baniID = bani.id
    startLine = nil
    position.line = nil
    LastRead(id: bani.id, at: activity.last).save()
    if !besideViewer || oneColumn { withAnimation(.smooth) { journeysOpen = false } }
  }

  /// `continue reading`: opens `previous` at the line that was at its top.
  private func resume() {
    guard let previous else { return }
    activity.touch()
    baniID = previous.id
    startLine = previous.line
    position.line = previous.line
    LastRead(id: previous.id, at: activity.last, line: previous.line).save()
    if !besideViewer || oneColumn { withAnimation(.smooth) { journeysOpen = false } }
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

/// Reports whether the device has a hinge: an iPhone Duo, on either display. False
/// on every device without one. The hinge is read from iOS 27.1 (`onHingeChange`);
/// before that there is no Duo.
///
/// *Unverified:* whether `onHingeChange` reports the hinge when the view appears or
/// only when it moves. UIKit's `UIHingeInteraction` documents an initial update;
/// SwiftUI's does not say. If it does not, an app launched unfolded shows the
/// iPhone's shell until the hinge moves.
private struct HingeWatch: ViewModifier {
  let changed: (_ present: Bool) -> Void

  func body(content: Content) -> some View {
    if #available(iOS 27.1, *) {
      content.onHingeChange { _, context in changed(context.hinge != nil) }
    } else {
      content
    }
  }
}

/// The viewer as a card set aside: the wash, the mask to the display's corners,
/// the hairline and the shadow, all from one `progress` (0 at rest, 1 aside).
///
/// **Read on every frame of a slide, never from where the slide is going.**
/// `ReaderShell` works `progress` out from its state, which an animation sets to
/// the end at once: in a close by animation it is already 0 on the first frame.
/// As `Animatable` data, SwiftUI hands this modifier the value it is drawing on
/// each frame instead, so "moved" holds until the viewer has landed. Checked
/// against the state, the mask went square at the start of the close, and as an
/// `if`/`else` it faded between its two shapes, so the viewer turned partly
/// see-through and the sidebar's words showed through it (iPhone, 2026-11-10).
/// Android reads the slide's animated value inside `graphicsLayer`, the same rule.
///
/// **Masked only while moved.** At rest the display's own corners hide the
/// viewer's, but a screenshot, a screen recording or AirPlay mirroring is square,
/// and a rounded mask at rest showed the white sidebar in its corners there. At
/// rest the mask is square, so it hides nothing. The shape is one view that only
/// changes its corners, so there is nothing to fade between, and the change is
/// never animated: on opening, rounded from the first frame, where the shape
/// still matches the display, and on closing, square on the frame it lands.
///
/// While moved, the outline is `ConcentricRectangle`, which matches the display
/// exactly at rest (checked against UIKit's own radius on an iPhone, 2026-10-16).
/// Two things keep it once moved:
///
/// - **The viewer is moved with `visualEffect`, not `offset`.** A concentric
///   corner shrinks by its distance from the display's corner, and `offset`
///   moves the view's frame, so the corners went square as it slid. A visual
///   effect moves only the drawing, so the shape is worked out where the viewer
///   rests.
/// - **The corners keep at least `movingCornerRadius`**, should the shape be
///   worked out from the moved position after all.
///
/// Not a radius read from the display: `GeometryProxy.concentricCornerRadii`
/// (iOS 27) came back empty on a full-screen view, and UIKit's own value is private.
private struct ViewerCard: ViewModifier, Animatable {
  var progress: CGFloat

  var animatableData: CGFloat {
    get { progress }
    set { progress = newValue }
  }

  /// The least corner radius the viewer keeps while it is moved. The display
  /// radius of the iPhone it was checked on (2026-10-16).
  private static let movingCornerRadius: CGFloat = 55

  func body(content: Content) -> some View {
    let shape = ConcentricRectangle(
      corners: progress != 0 ? .concentric(minimum: .fixed(Self.movingCornerRadius)) : .fixed(0)
    )
    content
      .overlay {
        DesignTokens.background.opacity(0.6 * progress)
          .allowsHitTesting(false)
      }
      .mask {
        shape.transaction { $0.animation = nil }
      }
      // A hairline along the viewer's edge, so it reads as a card's edge, not
      // only a shadow's.
      .overlay {
        shape
          .stroke(DesignTokens.foreground.opacity(0.08 * progress), lineWidth: 0.5)
          .transaction { $0.animation = nil }
          .allowsHitTesting(false)
      }
      .shadow(color: .black.opacity(0.18 * progress), radius: 24)
  }
}

/// **The title: a glass pill floating on the text**, as Safari's address field is;
/// never a header across the screen (2026-11-10). A button so it shows the large
/// content viewer; it does nothing else yet.
struct TitlePill: View {
  let title: String

  var body: some View {
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
  }
}

/// The Journeys button: in the viewer's toolbar (`ViewerBarHost`), which draws its
/// glass, or beside the viewer in the open panel's header (`JourneysPanel`), which
/// gives it ours (`barCircle`). One button, so both read the same.
struct JourneysButton: View {
  let action: () -> Void

  var body: some View {
    Button(action: action) {
      Image(systemName: AppIcons.journeys)
        .imageScale(.large)
    }
    .accessibilityLabel("Journeys")
  }
}

/// **The viewer's bar: the system's toolbar, at the top, on every device**
/// (ADR-0018). Journeys at the left, the title in the middle, `trailing` at the right.
///
/// **The title is always our pill (`TitlePill`), never the bar's own title**, with
/// the toolbar's shared glass behind it turned off, so it is one glass pill on the
/// text. **On iOS 27 the system minimizes the bar** on a scroll down and restores it
/// on a scroll back, holding its place, so the text never moves under the scroll;
/// a tapped line's scroll drives it as a finger's does. **Before iOS 27 it never
/// hides.** Nothing of ours hides it, and the status bar always shows (`ReaderShell`).
struct ViewerBarHost<Trailing: View>: ViewModifier {
  let title: String?
  /// Nil leaves the Journeys button out: beside the viewer, an open panel holds it
  /// (`JourneysPanel`).
  let onJourneys: (() -> Void)?
  @ViewBuilder let trailing: Trailing

  func body(content: Content) -> some View {
    if #available(iOS 27.0, *) {
      // The navigation bar alone minimizes: the bottom bar does not (iPhone), so
      // the bar is at the top on iPhone too. Not paused for a tapped line's scroll
      // with `.never`: switching to `.never` shows a minimized bar, so every tap
      // showed it and hid it again (iPhone, 2026-11-10).
      content
        .toolbar { items }
        .toolbarMinimizationBehavior(.onScrollDown, for: .navigationBar)
        .toolbarMinimizationSafeAreaAdjustment(.disabled, for: .navigationBar)
    } else {
      // Never hidden: a hidden system bar gives up its place, and the text moving
      // under a scroll under way stuttered it (2026-11-10).
      content.toolbar { items }
    }
  }

  @ToolbarContentBuilder
  private var items: some ToolbarContent {
    if let onJourneys {
      ToolbarItem(placement: .topBarLeading) { JourneysButton(action: onJourneys) }
    }
    if let title {
      ToolbarItem(placement: .principal) { TitlePill(title: title) }
        .sharedBackgroundVisibility(.hidden)
    }
    ToolbarItem(placement: .topBarTrailing) { trailing }
  }
}

/// The sidebar's header's measurements, so the logo sits level with the Journeys
/// button in either orientation, and the title pill's height.
///
/// **The buttons sit at the top of the bar, `below` beneath them** (chosen
/// 2026-10-19, by eye on an iPhone): flush under the status bar in portrait, `8`
/// from the screen's edge in landscape. A first pass copied the old navigation
/// bar's 54pt with the buttons centred, and 24pt in landscape; both sat too low.
enum BarMetrics {
  /// The glass circle behind the header's button, and the title pill's height.
  static let button: CGFloat = 44
  /// The bar's space beneath its buttons: the same gap a tapped line's highlight
  /// keeps from the bar, and from the screen's sides (chosen 2026-10-19).
  static let below: CGFloat = BaniReaderView.tapLandingGap
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
  /// A header button outside a toolbar (`JourneysPanel`): a 44pt glass circle, as a
  /// navigation bar's are on iOS 26. A long press shows the large content viewer
  /// unless `largeContentViewer` is false, for a button whose long press does
  /// something else.
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
  /// Nil while the button is in the open panel's header (`ReaderShell.splitShell`).
  let onJourneys: (() -> Void)?
  @Binding var controlsShown: Bool
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
    // than the screen, and what lay beside the viewer moved down by half the difference,
    // taking its `Settings` row off the bottom (iPhone, 2026-10-22).
    ViewThatFits(in: .vertical) {
      greeting
      ScrollView { greeting }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(DesignTokens.background)
    // No title, since nothing is being read; Controls is here too, so the preview
    // and appearance are reachable before anything is open.
    .modifier(ViewerBarHost(title: nil, onJourneys: onJourneys) {
      ControlsButton(isPresented: $controlsShown, onSettings: onSettings)
    })
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
  /// Beside the viewer only: the Journeys button, at the header's trailing end,
  /// which closes the panel (`ReaderShell.splitShell`). Nil on iPhone, where the
  /// viewer's edge returns to it.
  var onClose: (() -> Void)? = nil

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
      if let onClose {
        Spacer(minLength: 0)
        JourneysButton(action: onClose)
          .barCircle()
      }
    }
    .padding(.leading, Self.inset)
    // The button as far from the edge as the toolbar's.
    .padding(.trailing, onClose == nil ? Self.inset : 16)
    // Centred in a button's height, then the bar's space beneath, so the logo is
    // level with the Journeys button.
    .frame(maxWidth: .infinity, minHeight: BarMetrics.button, alignment: .leading)
    .padding(.bottom, BarMetrics.below)
    .padding(.top, BarMetrics.topMargin(verticalSizeClass))
    // A bar, like the viewer's: it does not follow Text Size (`BarMetrics`).
    .dynamicTypeSize(BarMetrics.typeSize)
  }
}
