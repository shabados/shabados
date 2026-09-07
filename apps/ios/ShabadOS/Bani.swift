import Foundation
import SwiftUI
import Gurmukhi

/// A line of gurbani. `id` is the corpus line id and is stable across corpus
/// versions — see docs/requirements/data-model.md. Nothing here addresses a line
/// by its position.
struct Line: Decodable, Identifiable {
  let id: String

  /// The corpus text, vishraam markers included. Kept because the markers are the
  /// *input* to pause colouring, which needs their positions — stripping is not the
  /// only thing they are for.
  let source: String

  /// What is displayed. Vishraam markers (`.` `,` `;`) are editorial notation marking
  /// where a reciter pauses; they are not part of the scripture and are **stripped
  /// whether or not pause colouring is on**
  /// (docs/requirements/display-controls.md). 1,023 of the 1,935 bundled lines carry
  /// at least one, so this is not an edge case — without it the reader shows
  /// `ਨਿਰਵੈਰੁ;` on screen.
  ///
  /// Done once at decode rather than per render, and via `packages/gurmukhi` rather
  /// than a local `replacingOccurrences` so iOS and Android cannot disagree about
  /// what a marker is.
  let gurmukhi: String

  /// Where the vishraam-coloured words sit in `gurmukhi`, as character offsets.
  ///
  /// Computed once here rather than per render: `detect` crosses the FFI boundary,
  /// and toggling pause colouring must not pay for it again. The view decides the
  /// *colour*; these ranges never change.
  let pauses: [PauseRun]

  private enum CodingKeys: String, CodingKey {
    case id
    case gurmukhi
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    source = try container.decode(String.self, forKey: .gurmukhi)
    gurmukhi = remove(input: source, features: vishraams())
    pauses = Self.pauseRuns(in: source)
  }

  /// The coloured word is the run *ending* at a marker — `ਨਿਰਵੈਰੁ` in
  /// `ਨਿਰਵੈਰੁ; ਅਕਾਲ` — so each match is walked back to the preceding space.
  ///
  /// **Offsets are Unicode scalars, not Swift `Character`s.** `detect` counts with
  /// Rust's `chars()`, which is scalars; Swift's `Character` is a grapheme cluster.
  /// Gurmukhi stacks matras and nasal marks onto base letters, so the two counts
  /// diverge — `ਚੱਤ੍ਰ ਚੱਕ੍ਰ ਵਰਤੀ, …` is 37 scalars and 33 graphemes — and indexing a
  /// `[Character]` array with a scalar offset runs off the end.
  ///
  /// Offsets are then shifted from `source` into `gurmukhi` coordinates by however
  /// many markers precede them, since `remove` deleted exactly those scalars.
  private static func pauseRuns(in source: String) -> [PauseRun] {
    let matches = detect(input: source, features: vishraams())
    guard !matches.isEmpty else { return [] }

    let scalars = Array(source.unicodeScalars)
    let space = Unicode.Scalar(32)
    let markers = matches.map { Int($0.start) }.sorted()
    func shifted(_ index: Int) -> Int {
      index - markers.prefix { $0 < index }.count
    }

    return matches.compactMap { match in
      guard let weight = Vishraam(match.feature) else { return nil }
      let end = Int(match.start)
      // Never trust an offset from across the FFI boundary against a local array.
      guard end <= scalars.count else { return nil }
      var start = end
      while start > 0, scalars[start - 1] != space { start -= 1 }
      // A marker with no word before it — nothing to colour.
      guard start < end else { return nil }
      return PauseRun(range: shifted(start)..<shifted(end), weight: weight)
    }
    .sorted { $0.range.lowerBound < $1.range.lowerBound }
  }
}

/// The three weights of pause. Which marker means which is verified against the
/// corpus and `apps/web`: `;` heavy, `,` medium, `.` light.
enum Vishraam {
  case heavy, medium, light

  init?(_ feature: Feature) {
    switch feature {
    case .vishramHeavy: self = .heavy
    case .vishramMedium: self = .medium
    case .vishramLight: self = .light
    default: return nil
    }
  }

  var color: Color {
    switch self {
    case .heavy: DesignTokens.vishraamHeavy
    case .medium: DesignTokens.vishraamMedium
    case .light: DesignTokens.vishraamLight
    }
  }
}

struct PauseRun {
  /// Character offsets into `Line.gurmukhi`, not `Line.source`.
  let range: Range<Int>
  let weight: Vishraam
}

struct Bani: Decodable, Identifiable {
  let id: String
  let name: [String: String]
  /// Sections are the bani's own grouping, not the source's structure.
  let sections: [[Line]]

  var latin: String { name["Latn"] ?? id }
  var gurmukhi: String { name["Guru"] ?? "" }
}

/// A bani flattened into one addressable sequence.
///
/// The reader needs stable, unique ids per row so the scroll position can be
/// anchored to a specific line while the type size changes. Nested `ForEach`es keyed
/// on array offsets cannot provide that — the ids repeat across sections.
struct ReaderItem: Identifiable {
  enum Kind {
    case line(Line)
    case divider
  }

  let id: String
  let kind: Kind
}

extension Bani {
  var items: [ReaderItem] {
    sections.enumerated().flatMap { sectionIndex, section -> [ReaderItem] in
      let lines = section.enumerated().map { lineIndex, line in
        ReaderItem(id: "\(sectionIndex).\(lineIndex)", kind: .line(line))
      }
      let isLast = sectionIndex == sections.count - 1
      return isLast ? lines : lines + [ReaderItem(id: "d\(sectionIndex)", kind: .divider)]
    }
  }
}

enum Corpus {
  /// Generated by `bun run database:export-bundled` in `database/`.
  /// Never hand-edited: scripture edits go through the database component.
  static let banis: [Bani] = {
    guard let url = Bundle.main.url(forResource: "banis", withExtension: "json"),
      let data = try? Data(contentsOf: url)
    else {
      // A missing bundled corpus is a build configuration error, not a runtime
      // condition to degrade through — fail where it is visible.
      fatalError("banis.json missing from bundle. Run `bun run database:export-bundled`.")
    }
    struct Payload: Decodable { let banis: [Bani] }
    return try! JSONDecoder().decode(Payload.self, from: data).banis
  }()
}
