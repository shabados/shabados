package com.shabados.android

import android.content.res.AssetManager
import org.json.JSONArray
import org.json.JSONObject
import uniffi.gurmukhi.Feature
import uniffi.gurmukhi.Script
import uniffi.gurmukhi.detect
import uniffi.gurmukhi.hasIkoankar
import uniffi.gurmukhi.isColophon
import uniffi.gurmukhi.isHeading
import uniffi.gurmukhi.isMoolmantar
import uniffi.gurmukhi.remove
import uniffi.gurmukhi.transcribe
import uniffi.gurmukhi.vishraams

/** The three weights of pause. Which marker means which is verified against the
 * corpus and `apps/web`: `;` heavy, `,` medium, `.` light — same as `Bani.swift`'s
 * own `Vishraam`. */
enum class Vishraam {
  HEAVY,
  MEDIUM,
  LIGHT;

  companion object {
    fun of(feature: Feature): Vishraam? =
      when (feature) {
        Feature.VISHRAM_HEAVY -> HEAVY
        Feature.VISHRAM_MEDIUM -> MEDIUM
        Feature.VISHRAM_LIGHT -> LIGHT
        else -> null
      }
  }
}

/** Character offsets into [Line.gurmukhi], not [Line.source]. */
data class PauseRun(val range: IntRange, val weight: Vishraam)

/**
 * A line of gurbani. [id] is the corpus line id and is stable across corpus
 * versions — see docs/requirements/data-model.md. Nothing here addresses a line by
 * its position.
 */
data class Line(
  val id: String,
  /** The corpus text, vishraam markers included — the *input* to pause colouring,
   * which needs their positions, not just what's left once they're stripped. */
  val source: String,
  /** What is displayed. Vishraam markers (`.` `,` `;`) are editorial notation
   * marking where a reciter pauses; they are not part of the scripture and are
   * stripped whether or not pause colouring is on
   * (docs/requirements/display-controls.md). */
  val gurmukhi: String,
  val pauses: List<PauseRun>,
  /** Three independent facts, none implying or excluding another — see
   * `gurmukhi::is_heading`/`is_moolmantar`/`has_ikoankar`'s own doc comments
   * (docs/requirements/display-controls.md#titles). Each is a classification only
   * — this app's choice to render the mool mantar larger than a heading lives in
   * `BaniReaderView.kt`, not here. */
  val isHeading: Boolean,
  val isMoolmantar: Boolean,
  val hasIkoankar: Boolean,
  /** Scripture-adjacent, not scripture (`gurmukhi::is_colophon`). SGGS-only today. */
  val isColophon: Boolean,
  val isRahaoEnding: Boolean,
  val endingText: String?,
) {
  companion object {
    /**
     * Every field but [id]/[source] is derived here, once, at parse time — mirrors
     * `Bani.swift`'s custom `Decodable` `init`, so iOS and Android cannot disagree
     * about what a line's own facts are.
     *
     * **Calls to the top-level `isHeading`/`isMoolmantar`/etc. functions, not this
     * class's own properties of the same name** — unambiguous here because a
     * `companion object` factory has no `Line` instance in scope to shadow them
     * with, but worth being explicit about, the same reason `Bani.swift` spells
     * this out.
     */
    fun parse(id: String, source: String): Line {
      val (isRahao, ending) = lineEnding(source)
      return Line(
        id = id,
        source = source,
        gurmukhi = remove(source, vishraams()),
        pauses = pauseRuns(source),
        isHeading = isHeading(source),
        isMoolmantar = isMoolmantar(source),
        hasIkoankar = hasIkoankar(source),
        isColophon = isColophon(id),
        isRahaoEnding = isRahao,
        endingText = ending,
      )
    }

    /**
     * The coloured word is the run *ending* at a marker — `ਨਿਰਵੈਰੁ` in
     * `ਨਿਰਵੈਰੁ; ਅਕਾਲ` — so each match is walked back to the preceding space.
     *
     * **Offsets are treated as Kotlin `Char` (UTF-16 code unit) indices, assumed
     * equal to `detect`'s Unicode-scalar offsets.** True for every character
     * Gurmukhi actually uses — the whole block sits at U+0A00–U+0A7F, well inside
     * the Basic Multilingual Plane, one UTF-16 unit each — the same assumption
     * `Bani.swift` has to make explicit for Swift's distinct grapheme-cluster
     * indexing; Kotlin's is a coarser mismatch (UTF-16 units vs. Unicode scalars)
     * that happens not to bite for this specific script.
     */
    private fun pauseRuns(source: String): List<PauseRun> {
      val matches = detect(source, vishraams())
      if (matches.isEmpty()) return emptyList()

      val markers = matches.map { it.start.toInt() }.sorted()
      fun shifted(index: Int) = index - markers.count { it < index }

      return matches
        .mapNotNull { match ->
          val weight = Vishraam.of(match.feature) ?: return@mapNotNull null
          val end = match.start.toInt()
          if (end > source.length) return@mapNotNull null
          var start = end
          while (start > 0 && source[start - 1] != ' ') start--
          if (start >= end) return@mapNotNull null
          PauseRun(shifted(start) until shifted(end), weight)
        }
        .sortedBy { it.range.first }
    }

    /**
     * `RahaoEnding`/`NumberedEnding` are corpus-wide numbering — this does not
     * distinguish a pauri from any other numbered verse; that needs the line's
     * heading to name the form (`classifyForm` in
     * `database/scripts/lib/gurbani.ts`, not yet ported here).
     */
    private fun lineEnding(source: String): Pair<Boolean, String?> {
      val match = detect(source, listOf(Feature.RAHAO_ENDING, Feature.NUMBERED_ENDING)).firstOrNull()
        ?: return false to null
      val start = match.start.toInt()
      val end = match.end.toInt()
      if (start < 0 || end > source.length || start >= end) return false to null
      return (match.feature == Feature.RAHAO_ENDING) to source.substring(start, end)
    }
  }
}

/**
 * An optional passage this bani continues into at one point — the "Keep reading"
 * control (docs/requirements/library.md#continuation-not-configuration). Authored,
 * not derived: `afterLine` and `lines` are located mechanically by
 * `database/scripts/export-bundled-banis.ts` within an already-known pair.
 */
data class Continuation(val afterLine: String, val lines: List<Line>) {
  val id: String get() = afterLine
}

data class Bani(
  val id: String,
  val name: Map<String, String>,
  /** The bani's own grouping, not the source's structure. */
  val sections: List<List<Line>>,
  /** Empty for most banis. Present when this bani has a shorter reading that stops
   * here and a longer one that keeps going — see [Continuation]. */
  val continuations: List<Continuation>,
) {
  val latin: String get() = name["Latn"] ?: id
  val gurmukhi: String get() = name["Guru"] ?: ""
}

/**
 * A bani flattened into one addressable sequence.
 *
 * The reader needs stable, unique ids per row so the scroll position can be
 * anchored to a specific line while the type size changes. Nested loops keyed on
 * array offsets cannot provide that — the ids repeat across sections.
 */
sealed interface ReaderItem {
  val id: String

  data class LineItem(override val id: String, val line: Line) : ReaderItem

  /** A "Keep reading" control. The view owns whether it is expanded; this only
   * marks *where* one sits. */
  data class ContinuationItem(override val id: String, val continuation: Continuation) : ReaderItem
}

/**
 * No separator between sections — a section boundary is the corpus's own grouping
 * (docs/requirements/data-model.md's structural containers), not a visual break a
 * reader is meant to notice.
 */
fun Bani.items(): List<ReaderItem> {
  // Keyed by the line a continuation sits after — at most one per line in bundled
  // content today, so last-writer-wins is not a real concern.
  val continuationsByLine = continuations.associateBy { it.afterLine }

  return buildList {
    sections.forEachIndexed { sectionIndex, section ->
      section.forEachIndexed { lineIndex, line ->
        add(ReaderItem.LineItem("$sectionIndex.$lineIndex", line))
        continuationsByLine[line.id]?.let { continuation ->
          add(ReaderItem.ContinuationItem("keep-reading.${continuation.id}", continuation))
        }
      }
    }
  }
}

/** Two, not the three [Script] declares — `Script.LATIN` applies pronunciation
 * rules the reader doesn't expose; the mechanical mapping ships under the plain
 * name `Latin` (docs/requirements/display-controls.md#pronunciations). */
enum class Pronunciation(val label: String) {
  DEVANAGARI("Devanagari"),
  LATIN("Latin");

  /** `LATIN` maps to `Script.LATIN_SCHOLAR`, not `Script.LATIN` — both produce
   * plausible Latin text, so getting this backwards is invisible on inspection and
   * wrong on every line. */
  val script: Script
    get() = when (this) {
      DEVANAGARI -> Script.DEVANAGARI
      LATIN -> Script.LATIN_SCHOLAR
    }
}

/**
 * Transliterations, computed on demand and kept. Not computed at parse time —
 * pronunciations ship off, so most readers never ask for one. Not computed per
 * recomposition either — a row recomposes on every scroll and every pinch step.
 */
object Transliteration {
  private data class Key(val line: String, val scheme: Pronunciation)
  private val cache = mutableMapOf<Key, String>()

  fun of(line: Line, scheme: Pronunciation): String =
    cache.getOrPut(Key(line.id, scheme)) { transcribe(line.gurmukhi, scheme.script) }
}

object Corpus {
  /**
   * Generated by `bun run database:export-bundled` in `database/`.
   * Never hand-edited: scripture edits go through the database component.
   *
   * Parsed with org.json, which ships in the platform — a JSON library would be a
   * dependency, a Gradle plugin, and a version to keep in step, for a few nested
   * arrays.
   */
  fun load(assets: AssetManager): List<Bani> {
    val text = assets.open("banis.json").bufferedReader().use { it.readText() }
    val banis = JSONObject(text).getJSONArray("banis")

    fun parseLines(array: JSONArray): List<Line> =
      List(array.length()) { i ->
        val line = array.getJSONObject(i)
        Line.parse(line.getString("id"), line.getString("gurmukhi"))
      }

    fun parseContinuations(bani: JSONObject): List<Continuation> {
      val array = bani.optJSONArray("continuations") ?: return emptyList()
      return List(array.length()) { i ->
        val continuation = array.getJSONObject(i)
        Continuation(
          afterLine = continuation.getString("afterLine"),
          lines = parseLines(continuation.getJSONArray("lines")),
        )
      }
    }

    return List(banis.length()) { b ->
      val bani = banis.getJSONObject(b)
      val nameObj = bani.getJSONObject("name")
      val sections = bani.getJSONArray("sections")

      Bani(
        id = bani.getString("id"),
        name = nameObj.keys().asSequence().associateWith { nameObj.getString(it) },
        sections = List(sections.length()) { s -> parseLines(sections.getJSONArray(s)) },
        continuations = parseContinuations(bani),
      )
    }
  }
}
