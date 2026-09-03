import CoreText
import SwiftUI

@main
struct ShabadOSApp: App {
  init() {
    Fonts.register()
  }

  var body: some Scene {
    WindowGroup {
      NavigationStack {
        BaniListView()
      }
    }
  }
}

/// Sant Lipi is bundled rather than relying on system Gurmukhi fonts, whose
/// coverage of conjuncts and yayya variants is poor on both platforms.
enum Fonts {
  /// Resolved from the font file rather than hardcoded, because `Font.custom`
  /// needs the PostScript name and a variable font's is not reliably guessable
  /// from the family name. A wrong guess fails silently into a system fallback,
  /// which is precisely the rendering this bundle exists to avoid.
  private(set) static var gurmukhi = "Sant Lipi"

  /// Registered at app init, not `onAppear` — a view that renders before
  /// registration completes falls back to the system font for its first frame.
  static func register() {
    guard let url = Bundle.main.url(forResource: "SantLipi-VF", withExtension: "ttf")
    else {
      assertionFailure("SantLipi-VF.ttf missing from bundle")
      return
    }

    CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)

    if let descriptors = CTFontManagerCreateFontDescriptorsFromURL(url as CFURL)
      as? [CTFontDescriptor],
      let first = descriptors.first,
      let name = CTFontDescriptorCopyAttribute(first, kCTFontNameAttribute) as? String
    {
      gurmukhi = name
    }
  }
}
