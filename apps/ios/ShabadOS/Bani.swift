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

  /// Three independent facts, none implying or excluding another — see
  /// `gurmukhi::is_heading`/`is_moolmantar`/`has_ikoankar`'s own doc comments
  /// (docs/requirements/display-controls.md#titles) for why they stay separate.
  /// Each is a *classification only* — this app's choice to render the mool
  /// mantar larger than a heading lives in `BaniReaderView.swift`, not here.
  ///
  /// - `isHeading`: names a division rather than being read as verse.
  /// - `isMoolmantar`: is *the* Mool Mantar — a curated match on text (vishraam
  ///   marks ignored), not "carries the ikoankar symbol." `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` is
  ///   `isHeading`, not this.
  /// - `hasIkoankar`: carries `ੴ` in any form. Rarely what a caller actually
  ///   wants — ask `isMoolmantar` for "is this the mool mantar," or `isHeading`
  ///   for "should this render like a heading."
  ///
  /// All three checked against `source`, not `gurmukhi`: the no-vishraam signal
  /// `isHeading` needs is meaningless once markers are already stripped.
  let isHeading: Bool
  let isMoolmantar: Bool
  let hasIkoankar: Bool

  /// Scripture-adjacent, not scripture — a tally, scribal note, or reading
  /// instruction (`gurmukhi::is_colophon`). Keyed by `id`, not text: the lookup is a
  /// curated list, not a pattern. **SGGS-only today** — always `false` for the
  /// Dasam Granth content this app bundles until that reading is done; see the
  /// function's own doc comment in `packages/gurmukhi`.
  let isColophon: Bool

  /// Where this line's numbered (`॥੧॥`) or rahao (`॥ ਰਹਾਉ ॥`) ending sits, if it
  /// has one — located the same way `pauses` locates vishraam markers, but **not
  /// stripped from `gurmukhi` by default**: unlike a vishraam, a closing danda is
  /// still real punctuation a verse line needs, so removing it needs its own
  /// rendering treatment, not a silent default. A future view can style
  /// `endingText` separately from the verse using these.
  let isRahaoEnding: Bool
  let endingText: String?

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
    // Unqualified: Gurmukhi's free functions, not the properties of the same name
    // being assigned here — e.g. `isHeading(input:)` is a call, `isHeading` alone
    // (as the property) is not, so Swift never confuses the two.
    isHeading = Gurmukhi.isHeading(input: source)
    isMoolmantar = Gurmukhi.isMoolmantar(input: source)
    hasIkoankar = Gurmukhi.hasIkoankar(input: source)
    isColophon = Gurmukhi.isColophon(lineId: id)
    let ending = Self.lineEnding(in: source)
    isRahaoEnding = ending.isRahao
    endingText = ending.text
  }

  /// `RahaoEnding`/`NumberedEnding` are corpus-wide numbering — a pauri's own
  /// closing count and a rahao marker share this detection, but **this does not
  /// distinguish a pauri from any other numbered verse**; that needs the line's
  /// *heading* to name the form (`classifyForm` in
  /// `database/scripts/lib/gurbani.ts`, not yet ported here). This only answers
  /// "does this line close with a marker," not "what kind of division is it in."
  private static func lineEnding(in source: String) -> (isRahao: Bool, text: String?) {
    let matches = detect(input: source, features: [.rahaoEnding, .numberedEnding])
    guard let match = matches.first else { return (false, nil) }
    let scalars = Array(source.unicodeScalars)
    let start = Int(match.start)
    let end = Int(match.end)
    guard start >= 0, end <= scalars.count, start < end else { return (false, nil) }
    let text = String(String.UnicodeScalarView(scalars[start..<end]))
    return (match.feature == .rahaoEnding, text)
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

/// An optional passage this bani continues into at one point — the "Keep reading"
/// control (docs/requirements/library.md#continuation-not-configuration).
/// Authored, not derived: `afterLine` and `lines` are located mechanically by
/// `database/scripts/export-bundled-banis.ts` within an already-known pair
/// (`BNCP`→`CPDT`, `RHRS`→`RHRT`); that file is where "mechanically" is defined
/// precisely and where its limits are written down.
struct Continuation: Decodable, Identifiable {
  /// The id of the line this continuation's content sits right after.
  let afterLine: String
  let lines: [Line]

  var id: String { afterLine }
}

struct Bani: Decodable, Identifiable {
  let id: String
  let name: [String: String]
  /// Sections are the bani's own grouping, not the source's structure.
  let sections: [[Line]]
  /// Empty for most banis. Present when this bani has a shorter reading that
  /// stops here and a longer one that keeps going — see [`Continuation`].
  let continuations: [Continuation]

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
    /// A "Keep reading" control. The view owns whether it is expanded; this only
    /// marks *where* one sits.
    case continuation(Continuation)
  }

  let id: String
  let kind: Kind
}

extension Bani {
  /// **No separator between sections.** A section boundary here is the corpus's
  /// own grouping (docs/requirements/data-model.md's structural containers), not
  /// a visual break a reader is meant to notice — a horizontal rule between, say,
  /// the mangal and the heading that follows it read as an unintended gap, not a
  /// meaningful one. Spacing alone (the outer `LazyVStack`'s own `spacing: 12`)
  /// separates rows; nothing draws a line.
  var items: [ReaderItem] {
    // Keyed by the line a continuation sits after — at most one per line in
    // bundled content today, so last-writer-wins is not a real concern.
    let continuationsByLine = Dictionary(uniqueKeysWithValues: continuations.map { ($0.afterLine, $0) })

    return sections.enumerated().flatMap { sectionIndex, section -> [ReaderItem] in
      section.enumerated().flatMap { lineIndex, line -> [ReaderItem] in
        var items = [ReaderItem(id: "\(sectionIndex).\(lineIndex)", kind: .line(line))]
        if let continuation = continuationsByLine[line.id] {
          items.append(ReaderItem(id: "keep-reading.\(continuation.id)", kind: .continuation(continuation)))
        }
        return items
      }
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


/// Transliteration schemes offered in the app.
///
/// **Two, not the three `Script` declares.** `Script.latin` applies pronunciation
/// rules — dropped grammatical vowels, hardcoded exceptions — and is deliberately
/// not exposed; the mechanical mapping ships under the plain name `Latin`
/// (docs/requirements/display-controls.md#pronunciations).
enum Pronunciation: String, CaseIterable, Identifiable {
  case devanagari
  case latin

  var id: String { rawValue }

  var label: String {
    switch self {
    case .devanagari: "Devanagari"
    case .latin: "Latin"
    }
  }

  /// **`latin` maps to `.latinScholar`, not `.latin`.** Both produce plausible Latin
  /// text, so getting this backwards is invisible on inspection and wrong on every
  /// line. This one line is the whole reason the trap is documented.
  var script: Script {
    switch self {
    case .devanagari: .devanagari
    case .latin: .latinScholar
    }
  }
}

/// Transliterations, computed on demand and kept.
///
/// **Not computed at decode.** Pronunciations ship off, so most readers never ask for
/// one, and transcribing all 1,935 bundled lines into both schemes at launch would be
/// ~3,900 FFI calls nobody wanted. **Not computed per render either** — a row rebuilds
/// on every scroll and every pinch step.
///
/// Main-actor isolated rather than locked: it is only ever touched while building a
/// view body.
@MainActor
enum Transliteration {
  private static var cache: [Key: String] = [:]

  private struct Key: Hashable {
    let line: String
    let scheme: Pronunciation
  }

  static func of(_ line: Line, _ scheme: Pronunciation) -> String {
    let key = Key(line: line.id, scheme: scheme)
    if let hit = cache[key] { return hit }
    // Transcribed from `gurmukhi`, not `source`: the markers are already gone, and a
    // transliteration containing `;` would be nonsense in any script.
    let value = transcribe(input: line.gurmukhi, script: scheme.script)
    cache[key] = value
    return value
  }
}
