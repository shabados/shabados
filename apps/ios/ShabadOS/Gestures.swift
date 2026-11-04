import SwiftUI
import UIKit

// **Which gesture wins is decided by UIKit's recognisers, not by timers or lists of
// frames** (docs/interaction.md). The two recognisers here sit among the system's
// own: each scroll view's pan, each SwiftUI button and tap, each slider. The rules
// between them, all in this file:
//
// - **A sideways drag that moves the viewer cancels every touch beneath it**
//   (`SidebarPan`, `cancelsTouchesInView`), so a swipe that started on a pill, a
//   row or a line never also taps it (reading-shell.md#getting-between-them).
// - **Only a drag more sideways than up or down is a swipe** (45°). Over a scroll
//   view its own pan already splits drags there, and limits of 30° and 10° written
//   here changed nothing on an iPhone (2026-11-04). The check is for screens with
//   no scroll view, like the default screen when it fits: without it a mostly
//   vertical drag there moved the viewer sideways.
// - **A scroll view's own pan waits for the sideways drag to fail**, so a drag is
//   exactly one of scroll or swipe, never both.
// - **A drag that starts on a slider or a switch never reaches the sideways drag**
//   (reading-shell.md#the-controls-sidebar).
// - **Two fingers never start the sideways drag**, so a pinch is never read as a
//   drag (interaction.md). A second finger joining a swipe is meant to end it; on an
//   iPhone (2026-11-04) the swipe carried on and no pinch began, which is accepted.
//   The pinch (`ReaderPinch`) runs alongside everything; the reader stops its own
//   scrolling for it.

/// The shell's sideways drag, which opens and closes the sidebars (`ReaderShell`).
/// It reports horizontal travel only; `ReaderShell` decides what it means.
struct SidebarPan: UIGestureRecognizerRepresentable {
  /// Whether a drag going this way (by the sign of its horizontal travel) can move
  /// the viewer from where it is now: from rest either way, from open only back.
  let canMove: (CGFloat) -> Bool
  /// The horizontal travel so far, from when the drag began.
  let onChanged: (CGFloat) -> Void
  /// The travel at lift, and where a flick would carry it.
  let onEnded: (_ translation: CGFloat, _ predicted: CGFloat) -> Void
  /// The drag was abandoned: a second finger, or the system took the touch.
  let onCancelled: () -> Void

  func makeCoordinator(converter: CoordinateSpaceConverter) -> Coordinator {
    Coordinator()
  }

  func makeUIGestureRecognizer(context: Context) -> UIPanGestureRecognizer {
    let pan = UIPanGestureRecognizer()
    // UIKit's default, stated because it is the rule: once the drag is recognised,
    // the buttons and rows under the finger are told the touch was cancelled, so
    // its lift is not a tap.
    pan.cancelsTouchesInView = true
    pan.delegate = context.coordinator
    return pan
  }

  func updateUIGestureRecognizer(_ pan: UIPanGestureRecognizer, context: Context) {
    context.coordinator.canMove = canMove
  }

  func handleUIGestureRecognizerAction(_ pan: UIPanGestureRecognizer, context: Context) {
    let dx = pan.translation(in: pan.view).x
    switch pan.state {
    case .began, .changed:
      guard pan.numberOfTouches == 1 else {
        // A second finger: the swipe is abandoned and the viewer settles back.
        // Toggling `isEnabled` is UIKit's way to cancel a recogniser in progress.
        onCancelled()
        pan.isEnabled = false
        pan.isEnabled = true
        return
      }
      onChanged(dx)
    case .ended:
      onEnded(dx, dx + Self.projection(pan.velocity(in: pan.view).x))
    case .cancelled, .failed:
      onCancelled()
    default:
      break
    }
  }

  /// How much further a flick at `velocity` (points per second) would carry, with
  /// the deceleration a scroll view uses, so a short quick drag still opens or
  /// closes. The formula is the one Apple gives for projecting a scroll view's
  /// resting point (WWDC 2018, "Designing Fluid Interfaces").
  private static func projection(_ velocity: CGFloat) -> CGFloat {
    let rate = UIScrollView.DecelerationRate.normal.rawValue
    return velocity / 1000 * rate / (1 - rate)
  }

  final class Coordinator: NSObject, UIGestureRecognizerDelegate {
    var canMove: (CGFloat) -> Bool = { _ in false }

    /// Asked once, when the finger has moved far enough for UIKit to call it a
    /// drag: one finger, more sideways than up or down, going a way that can move
    /// the viewer. Saying no fails the drag for the rest of the touch, and the
    /// scroll view waiting on it (below) takes over.
    func gestureRecognizerShouldBegin(_ recognizer: UIGestureRecognizer) -> Bool {
      guard let pan = recognizer as? UIPanGestureRecognizer, pan.numberOfTouches == 1 else { return false }
      let t = pan.translation(in: pan.view)
      return abs(t.x) > abs(t.y) && canMove(t.x)
    }

    /// A touch that lands on a slider or a switch is that control's
    /// (reading-shell.md#the-controls-sidebar). SwiftUI's `Slider` and `Toggle`
    /// are drawn by `UISlider` and `UISwitch` on iOS, so the touch's view says so.
    func gestureRecognizer(_ recognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
      var view = touch.view
      while let current = view {
        if current is UISlider || current is UISwitch { return false }
        view = current.superview
      }
      return true
    }

    /// Only the pinch runs alongside: it must be able to begin while a drag is
    /// under way, which the drag then abandons. Everything else under the finger
    /// (buttons, taps) is failed once the drag is recognised.
    func gestureRecognizer(
      _ recognizer: UIGestureRecognizer,
      shouldRecognizeSimultaneouslyWith other: UIGestureRecognizer
    ) -> Bool {
      other is UIPinchGestureRecognizer
    }

    /// A scroll view's pan waits for this drag to fail, so exactly one of them
    /// moves anything. A vertical drag fails this one at once (`shouldBegin`), so
    /// scrolling starts when it always did.
    func gestureRecognizer(
      _ recognizer: UIGestureRecognizer,
      shouldBeRequiredToFailBy other: UIGestureRecognizer
    ) -> Bool {
      guard let scrollView = other.view as? UIScrollView else { return false }
      return other === scrollView.panGestureRecognizer
    }
  }
}

/// The reader's pinch (`BaniReaderView.pinchBegan`). It reports where it began,
/// in the coordinate space named `space`, and its scale since then.
struct ReaderPinch: UIGestureRecognizerRepresentable {
  let space: String
  let onBegan: (CGPoint) -> Void
  /// The fingers' distance now over their distance when the pinch began.
  let onChanged: (CGFloat) -> Void
  let onEnded: () -> Void

  func makeCoordinator(converter: CoordinateSpaceConverter) -> Coordinator {
    Coordinator()
  }

  func makeUIGestureRecognizer(context: Context) -> UIPinchGestureRecognizer {
    let pinch = UIPinchGestureRecognizer()
    // UIKit's default, stated because it is the rule: a line under a finger is not
    // also tapped by a pinch.
    pinch.cancelsTouchesInView = true
    pinch.delegate = context.coordinator
    return pinch
  }

  func handleUIGestureRecognizerAction(_ pinch: UIPinchGestureRecognizer, context: Context) {
    switch pinch.state {
    case .began:
      onBegan(context.converter.location(in: .named(space)))
      onChanged(pinch.scale)
    case .changed:
      onChanged(pinch.scale)
    case .ended, .cancelled, .failed:
      onEnded()
    default:
      break
    }
  }

  final class Coordinator: NSObject, UIGestureRecognizerDelegate {
    /// Alongside everything: the scroll already under way when the second finger
    /// lands is stopped by the reader, and the sideways drag abandons itself.
    func gestureRecognizer(
      _ recognizer: UIGestureRecognizer,
      shouldRecognizeSimultaneouslyWith other: UIGestureRecognizer
    ) -> Bool {
      true
    }
  }
}
