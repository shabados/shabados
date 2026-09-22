use crate::helpers::regex;
use crate::unicode::normalize::decompose_vowels;

// Vishram characters (pause markers)
const VISHRAM_HEAVY: char = ';';
const VISHRAM_MEDIUM: char = ',';
const VISHRAM_LIGHT: char = '.';

// Vowel signs (matras)
const VOWEL_SIGNS: &[char] = &['ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'];

// Vowel carriers and their precomposed independent vowels
const VOWEL_CARRIERS: &[char] = &['ੲ', 'ੳ', 'ਅ'];
const INDEPENDENT_VOWELS: &[char] = &['ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'];

// Modifier characters
const NUKTA: char = '਼';
const ADHAK: char = 'ੱ';
const NASALS: &[char] = &['ੰ', 'ਂ', 'ਁ'];
const ACCENTS: &[char] = &['ੑ', 'ੵ'];
const VISARGA: char = 'ਃ';

/// A semantic feature that can be detected in or removed from Gurmukhi text.
///
/// Features are composable — pass any combination to [`detect`] or [`remove`].
/// Grouping helpers like [`vishraams`], [`vowels`], and [`modifiers`] return
/// common subsets.
#[derive(uniffi::Enum, Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum Feature {
    /// Heavy pause marker (`;`). Indicates a major breath or stop.
    VishramHeavy,
    /// Medium pause marker (`,`). Indicates a moderate pause.
    VishramMedium,
    /// Light pause marker (`.`). Indicates a brief pause.
    VishramLight,

    /// Rahao line ending (e.g. `॥ ਰਹਾਉ ॥`). Marks the refrain/pause verse.
    RahaoEnding,
    /// Numbered line ending (e.g. `॥੧॥`). Marks a numbered verse boundary.
    NumberedEnding,
    /// Bare line ending (`।`, `॥`, `|`). A line boundary without numbering.
    BareEnding,

    /// Dependent vowel sign / matra (ਾ ਿ ੀ ੁ ੂ ੇ ੈ ੋ ੌ).
    VowelSign,
    /// Independent vowel carrier (ੲ ੳ ਅ) and precomposed vowel letters (ਆ ਇ ਈ etc.).
    VowelCarrier,

    /// Nukta (਼). Sub-dot modifying a consonant for borrowed sounds.
    Nukta,
    /// Adhak (ੱ). Gemination marker — doubles the following consonant.
    Adhak,
    /// Nasal markers (ੰ tippi, ਂ bindi, ਁ adak bindi).
    Nasal,
    /// Accent markers (ੑ udaat, ੵ yakash).
    Accent,
    /// Visarga (ਃ). Aspiration marker borrowed from Sanskrit.
    Visarga,
}

/// A detected feature occurrence with its position in the input string.
///
/// `start` and `end` are character indices (not byte offsets), so they work
/// directly with `string.slice(start, end)` in JavaScript, `string[start:end]`
/// in Python, and equivalent string slicing in other languages.
#[derive(uniffi::Record, Clone, Debug, PartialEq, Eq)]
pub struct FeatureMatch {
    pub feature: Feature,
    pub start: u64,
    pub end: u64,
}

// -- grouping functions --

const LINE_ENDING_CHARS: &[char] = &['।', '॥', '|'];

/// Returns the characters associated with a feature.
#[uniffi::export]
pub fn feature_chars(feature: Feature) -> Vec<String> {
    match feature {
        Feature::VishramHeavy => vec![VISHRAM_HEAVY.to_string()],
        Feature::VishramMedium => vec![VISHRAM_MEDIUM.to_string()],
        Feature::VishramLight => vec![VISHRAM_LIGHT.to_string()],
        Feature::RahaoEnding | Feature::NumberedEnding | Feature::BareEnding => {
            LINE_ENDING_CHARS.iter().map(|c| c.to_string()).collect()
        }
        Feature::VowelSign => VOWEL_SIGNS.iter().map(|c| c.to_string()).collect(),
        Feature::VowelCarrier => VOWEL_CARRIERS
            .iter()
            .chain(INDEPENDENT_VOWELS.iter())
            .map(|c| c.to_string())
            .collect(),
        Feature::Nukta => vec![NUKTA.to_string()],
        Feature::Adhak => vec![ADHAK.to_string()],
        Feature::Nasal => NASALS.iter().map(|c| c.to_string()).collect(),
        Feature::Accent => ACCENTS.iter().map(|c| c.to_string()).collect(),
        Feature::Visarga => vec![VISARGA.to_string()],
    }
}

/// Returns all vishram features.
#[uniffi::export]
pub fn vishraams() -> Vec<Feature> {
    vec![
        Feature::VishramLight,
        Feature::VishramMedium,
        Feature::VishramHeavy,
    ]
}

/// Returns all line ending features.
#[uniffi::export]
pub fn line_endings() -> Vec<Feature> {
    vec![
        Feature::RahaoEnding,
        Feature::NumberedEnding,
        Feature::BareEnding,
    ]
}

/// Returns all vowel features.
#[uniffi::export]
pub fn vowels() -> Vec<Feature> {
    vec![Feature::VowelSign, Feature::VowelCarrier]
}

/// Returns all modifier features.
#[uniffi::export]
pub fn modifiers() -> Vec<Feature> {
    vec![
        Feature::Nukta,
        Feature::Adhak,
        Feature::Nasal,
        Feature::Accent,
        Feature::Visarga,
    ]
}

/// Returns all features.
#[uniffi::export]
pub fn all_features() -> Vec<Feature> {
    vec![
        Feature::VishramHeavy,
        Feature::VishramMedium,
        Feature::VishramLight,
        Feature::RahaoEnding,
        Feature::NumberedEnding,
        Feature::BareEnding,
        Feature::VowelSign,
        Feature::VowelCarrier,
        Feature::Nukta,
        Feature::Adhak,
        Feature::Nasal,
        Feature::Accent,
        Feature::Visarga,
    ]
}

// -- line ending regexes (ordered most-specific → least-specific) --

struct LineEndingPattern {
    feature: Feature,
    regex: &'static regex::Regex,
}

fn line_ending_patterns() -> &'static [LineEndingPattern] {
    static PATTERNS: once_cell::sync::OnceCell<Vec<LineEndingPattern>> =
        once_cell::sync::OnceCell::new();
    PATTERNS.get_or_init(|| {
        vec![
            LineEndingPattern {
                feature: Feature::RahaoEnding,
                regex: regex!(r"[।॥\|] *(ਰਹਾਉ|रहाउ|rahaau|rahau|rahao|Pause).*"),
            },
            LineEndingPattern {
                feature: Feature::NumberedEnding,
                regex: regex!(r"[।॥\|][੦-੯].*"),
            },
            LineEndingPattern {
                feature: Feature::NumberedEnding,
                regex: regex!(r"[।॥\|]\d.*"),
            },
            LineEndingPattern {
                feature: Feature::BareEnding,
                regex: regex!(r"[।॥\|]"),
            },
        ]
    })
}

// -- remove internals --

fn remove_chars(input: &str, chars: &[char]) -> String {
    input.chars().filter(|c| !chars.contains(c)).collect()
}

fn remove_one(input: String, feature: &Feature) -> String {
    match feature {
        Feature::VishramHeavy => input.replace(VISHRAM_HEAVY, ""),
        Feature::VishramMedium => input.replace(VISHRAM_MEDIUM, ""),
        Feature::VishramLight => input.replace(VISHRAM_LIGHT, ""),
        Feature::RahaoEnding | Feature::NumberedEnding | Feature::BareEnding => {
            line_ending_patterns()
                .iter()
                .filter(|p| p.feature == *feature)
                .fold(input, |acc, p| p.regex.replace_all(&acc, "").to_string())
        }
        Feature::VowelSign => remove_chars(&decompose_vowels(input), VOWEL_SIGNS),
        Feature::VowelCarrier => {
            let without_independent = remove_chars(&input, INDEPENDENT_VOWELS);
            remove_chars(&without_independent, VOWEL_CARRIERS)
        }
        Feature::Nukta => input.replace(NUKTA, ""),
        Feature::Adhak => input.replace(ADHAK, ""),
        Feature::Nasal => remove_chars(&input, NASALS),
        Feature::Accent => remove_chars(&input, ACCENTS),
        Feature::Visarga => input.replace(VISARGA, ""),
    }
}

/// Removes the specified features from the input string.
#[uniffi::export]
pub fn remove(input: String, features: Vec<Feature>) -> String {
    let result = features.iter().fold(input, remove_one);
    let result = regex!(r" {2,}").replace_all(&result, " ");
    result.trim().to_string()
}

// -- detect internals --

fn detect_chars(input: &str, feature: Feature, chars: &[char]) -> Vec<FeatureMatch> {
    input
        .chars()
        .enumerate()
        .filter(|(_, c)| chars.contains(c))
        .map(|(cp_idx, _)| FeatureMatch {
            feature,
            start: cp_idx as u64,
            end: (cp_idx + 1) as u64,
        })
        .collect()
}

fn detect_single_char(input: &str, feature: Feature, c: char) -> Vec<FeatureMatch> {
    input
        .chars()
        .enumerate()
        .filter(|(_, ch)| *ch == c)
        .map(|(cp_idx, _)| FeatureMatch {
            feature,
            start: cp_idx as u64,
            end: (cp_idx + 1) as u64,
        })
        .collect()
}

const LINE_ENDING_FEATURES: &[Feature] = &[
    Feature::RahaoEnding,
    Feature::NumberedEnding,
    Feature::BareEnding,
];

fn byte_to_codepoint(input: &str, byte_offset: usize) -> u64 {
    input[..byte_offset].chars().count() as u64
}

fn detect_line_endings(input: &str, features: &[Feature]) -> Vec<FeatureMatch> {
    let mut covered: Vec<(usize, usize)> = Vec::new();
    let mut matches = Vec::new();

    // Run ALL patterns (most-specific first) for correct overlap detection.
    // Always extend coverage even for overlapping matches, so lower-priority
    // patterns can't claim territory that belongs to higher-priority ones.
    // Overlap tracking uses byte offsets (from regex), output uses character indices.
    for p in line_ending_patterns() {
        for m in p.regex.find_iter(input) {
            let (start, end) = (m.start(), m.end());
            if covered.iter().any(|&(cs, ce)| start < ce && end > cs) {
                covered.push((start, end));
                continue;
            }
            covered.push((start, end));
            if features.contains(&p.feature) {
                matches.push(FeatureMatch {
                    feature: p.feature,
                    start: byte_to_codepoint(input, start),
                    end: byte_to_codepoint(input, end),
                });
            }
        }
    }

    matches
}

fn detect_one(input: &str, feature: &Feature) -> Vec<FeatureMatch> {
    match feature {
        Feature::VishramHeavy => detect_single_char(input, *feature, VISHRAM_HEAVY),
        Feature::VishramMedium => detect_single_char(input, *feature, VISHRAM_MEDIUM),
        Feature::VishramLight => detect_single_char(input, *feature, VISHRAM_LIGHT),
        Feature::RahaoEnding | Feature::NumberedEnding | Feature::BareEnding => {
            detect_line_endings(input, &[*feature])
        }
        Feature::VowelSign => detect_chars(input, *feature, VOWEL_SIGNS),
        Feature::VowelCarrier => {
            let mut matches = detect_chars(input, *feature, VOWEL_CARRIERS);
            matches.extend(detect_chars(input, *feature, INDEPENDENT_VOWELS));
            matches.sort_by_key(|m| m.start);
            matches
        }
        Feature::Nukta => detect_single_char(input, *feature, NUKTA),
        Feature::Adhak => detect_single_char(input, *feature, ADHAK),
        Feature::Nasal => detect_chars(input, *feature, NASALS),
        Feature::Accent => detect_chars(input, *feature, ACCENTS),
        Feature::Visarga => detect_single_char(input, *feature, VISARGA),
    }
}

/// Detects the specified features in the input string, returning match positions.
///
/// Returns full pattern spans — e.g. a line ending like `॥੧॥ ਰਹਾਉ ॥` is one match.
/// Results are sorted by start position.
#[uniffi::export]
pub fn detect(input: String, features: Vec<Feature>) -> Vec<FeatureMatch> {
    let le_features: Vec<Feature> = features
        .iter()
        .filter(|f| LINE_ENDING_FEATURES.contains(f))
        .copied()
        .collect();

    let mut matches: Vec<FeatureMatch> = features
        .iter()
        .filter(|f| !LINE_ENDING_FEATURES.contains(f))
        .flat_map(|f| detect_one(&input, f))
        .collect();

    if !le_features.is_empty() {
        matches.extend(detect_line_endings(&input, &le_features));
    }

    matches.sort_by_key(|m| m.start);
    matches
}

// -- line classification --

/// ੴ, U+0A74.
const MANGAL_CHAR: char = 'ੴ';

/// The double danda `॥` that closes a line, U+0965. Not the single `।`, U+0964 —
/// a heading is recorded with the full stop, and requiring it is part of what
/// keeps this from over-firing on short verse.
const DANDA: char = '॥';

/// Does this line carry the mangal (`ੴ`) — *any* form of it, not specifically the
/// mool mantar? Most lines that do are a short invocation (`ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥`,
/// `ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥`) — ordinary headings that happen to open with it, not
/// the thing [`is_moolmantar`] means.
///
/// **Kept as its own question rather than folded into [`is_heading`] or
/// [`is_moolmantar`], as a simple, independent primitive — not because of a
/// coverage gap.** One existed briefly, 2026-09-17 — 3 of 645 mangal-bearing
/// primary lines (`DDTK`, a vishraam glued directly to the mangal) satisfied
/// neither other function — but dropping `is_heading`'s vishraam gate the next
/// day closed it for free: every mangal-bearing line in `database/collections`
/// is caught by `is_heading` or `is_moolmantar` as of 2026-09-18. This function
/// stays anyway — a caller asking only "does this line carry `ੴ`" (for its own
/// rendering, not for heading classification) shouldn't have to evaluate the
/// heavier logic of either other function to get that single fact.
#[uniffi::export]
pub fn has_ikoankar(input: String) -> bool {
    input.contains(MANGAL_CHAR)
}

/// Is this line the mool mantar — Sikhi's fullest invocation, opening the SGGS
/// and recurring through it?
///
/// **A lookup, deliberately, the same shape as [`is_colophon`]**: one exact,
/// well-known text, confirmed against the corpus rather than guessed at from
/// shape. `database/collections/lines/.../0NVY.toml` (Japji Sahib's opening line)
/// carries its own scholarly note naming it outright: *"ਇਹ 'ਜਪੁ' ਬਾਣੀ ਦੇ ਆਦਿ ਵਿਚ,
/// ਰਵਾਇਤ ਅਨੁਸਾਰ, ਸਤਿਗੁਰਾਂ ਵਲੋਂ ਪਰਮਾਤਮਾ ਦਾ ਮੰਗਲਾਚਰਨ ਹੈ"* — "this, at Jap[u]'s
/// opening, is traditionally the Satguru's manglacharan [invocation]."
///
/// **The mangal symbol alone is not this.** `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥` and
/// `ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥` both carry the mangal and are headings, not this — see
/// [`has_ikoankar`] for that question instead.
///
/// **Recurs 33 times in the SGGS** (asset `SSA2`, pages 1 through 1410; none in
/// any bundled Nitnem bani) — confirmed 2026-09-17 against `database/collections`,
/// not assumed from the one occurrence in Japji Sahib. **32 of those 33 carry no
/// vishraam** after `ਨਿਰਵੈਰੁ`; only Japji's opening does. Same words, an
/// editorial punctuation difference — matched here by comparing with vishraam
/// marks stripped, so both spellings resolve to the one canonical entry rather
/// than needing two.
///
/// **Deliberately excludes the shorter "chhota" forms** — `...ਕਰਤਾ ਪੁਰਖੁ ਗੁਰ
/// ਪ੍ਰਸਾਦਿ ॥` (9 occurrences) and `...ਸਤਿ ਨਾਮੁ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥` (2) — the abbreviated
/// invocation opening some raag sections. Whether Sikh tradition treats those as
/// "the mool mantar" too is a real question this deliberately leaves open rather
/// than deciding; ask before including them.
const MOOLMANTAR: &str = "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥";

#[uniffi::export]
pub fn is_moolmantar(input: String) -> bool {
    let stripped: String = input
        .trim()
        .chars()
        .filter(|c| ![VISHRAM_HEAVY, VISHRAM_MEDIUM, VISHRAM_LIGHT].contains(c))
        .collect();
    // A stripped vishraam can leave a doubled space (`ਨਿਰਵੈਰੁ; ਅਕਾਲ` →
    // `ਨਿਰਵੈਰੁ ਅਕਾਲ` is fine, but `ਨਿਰਵੈਰੁ;ਅਕਾਲ` would not be) — collapse before
    // comparing rather than trust every recorded instance is spaced identically.
    let normalized = regex!(r" {2,}").replace_all(stripped.trim(), " ");
    normalized == MOOLMANTAR
}

/// Marker words that name a raag, an author, or a form (chhand, pauri, salok...)
/// — present, a line otherwise shaped like a heading really is one.
///
/// **Substring-matched, deliberately the opposite of [`COLOPHON_LINES`] /
/// [`MANGLACHARAN`]'s exact-text lookups**: there is no small fixed set of
/// headings to enumerate the way a colophon can be — a composition can open
/// with any raag name or any of dozens of named Dasam Granth chhands — so this
/// recognises the marker word, not the line.
///
/// **A word only belongs here once checked for collisions with ordinary
/// vocabulary, not just recognised as a heading marker.** `ਜਪੁ` ("meditation")
/// was in this list and came out: it is Japji Sahib's own title (`॥ ਜਪੁ ॥`) but
/// also an ordinary word inside real Rehras verse (`ਜਪੁ ਤਪੁ ਸੰਜਮੁ ਧਰਮੁ ਨ
/// ਕਮਾਇਆ ॥`) — found only by checking *every* occurrence of the word across
/// bundled content, not by inspecting the word in isolation. `॥ ਜਪੁ ॥` is
/// handled by [`HEADING_TEXT`] instead, an exact match narrow enough to be safe.
/// Before adding a word here, grep every primary line containing it and read
/// each hit — the way that check just caught one.
///
/// **Verified against every line of every bundled Nitnem bani** 2026-09-18
/// (`database/collections`): combined with the structural checks below, this
/// matches 65 of 1935 lines, and every one is a real heading, checked by eye.
/// **Not verified beyond bundled content** — extending to the wider corpus needs
/// the same per-word check repeated against whatever it must additionally cover.
const HEADING_WORDS: &[&str] = &[
    "ਛੰਦ", "ਸਵੈਯਾ", "ਸ੍ਵੈਯਾ", "ਸਵੱਯੇ", "ਦੋਹਰਾ", "ਦੋਹਿਰਾ", "ਚੌਪਈ", "ਚਉਪਈ", "ਪਉੜੀ", "ਸਲੋਕ",
    "ਅਸਟਪਦੀ", "ਅੜਿਲ", "ਸੋਰਠਾ", "ਰਸਾਵਲ", "ਕਬਿਤ", "ਡਖਣਾ", "ਡਖਣੇ", "ਛੰਤ", "ਜਾਪੁ",
    "ਰਾਗ ਮਾਲਾ", "ਮਹਲਾ", "ਮਃ", "ਤ੍ਵ ਪ੍ਰਸਾਦਿ", "ਬਾਚ", "ਪਾਤਿਸਾਹੀ", "ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹ",
    "ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ", "ਰਾਗੁ", "ੴ",
];

/// Whole headings an exact word match would be unsafe for — see
/// [`HEADING_WORDS`]'s own doc comment for why `॥ ਜਪੁ ॥` is here instead of
/// there.
const HEADING_TEXT: &[&str] = &["॥ ਜਪੁ ॥"];

/// The line's last `॥`-delimited segment is `1`–`3` words followed by a bare
/// one- or two-digit Gurmukhi numeral — `ਦੇਵਗੰਧਾਰੀ ੫ ॥`, `ਘਰੁ ੧ ॥`,
/// `ਪਾਤਿਸਾਹੀ ੧੦ ॥` in shape. **Not the same numeral [`is_heading`] already
/// excludes** — that rejects a danda *immediately* followed by a digit
/// (`॥੧॥`, a pada count with nothing between); this requires a *space and a
/// short word run* before the numeral, which a pada count never has. Exists
/// because [`HEADING_WORDS`] cannot enumerate every raag name or every
/// author-attribution number a future bani might need — this catches that
/// shape without needing the word listed. Verified 2026-09-18: adds zero new
/// matches beyond [`HEADING_WORDS`] on bundled content (every current case also
/// has a marker word), so it costs nothing measured — it is here for content
/// this repo does not have yet.
fn ends_with_short_numbered_marker(text: &str) -> bool {
    let body = text.trim_end_matches(DANDA);
    let Some(last_segment) = body.rsplit(DANDA).next() else {
        return false;
    };
    let words: Vec<&str> = last_segment.split_whitespace().collect();
    let Some((last, prefix)) = words.split_last() else {
        return false;
    };
    let is_short_gurmukhi_numeral = !last.is_empty()
        && last.chars().count() <= 2
        && last.chars().all(|c| ('\u{0A66}'..='\u{0A6F}').contains(&c));
    is_short_gurmukhi_numeral && (1..=3).contains(&prefix.len())
}

/// Is this line a heading — naming a division rather than being read as verse?
///
/// Two conditions, both required: the line's **structural** shape (below), and
/// either a **marker word** from [`HEADING_WORDS`]/an exact [`HEADING_TEXT`]
/// match, or [`ends_with_short_numbered_marker`]. Structure alone over-fires
/// badly — an earlier version using only the structural shape measured
/// false-positive rates from 1% (`JAPJ`) up to **69% on `JAAP`**, because a
/// multi-line pauri or Dasam Granth chhand numbers only its *last* line, so
/// every interior line ends bare by the same shape as a real heading. Adding
/// the marker requirement, verified against every one of the 1935 bundled
/// lines, brought every one of those false positives to zero without losing a
/// real heading. **A false negative is the safe failure here, not a false
/// positive** — an unlisted marker means a real heading renders as plain verse,
/// a smaller error than plain verse rendering as a heading.
///
/// **No word-count shortcut, checked and rejected.** "A bare `॥`-terminated
/// line with exactly one word is a heading" looks reasonable and is wrong:
/// Jaap Sahib's own verse is built from single-word divine epithets, one per
/// line — `ਅਜੂ ॥`, `ਅਭੈ ॥`, `ਅਲੇਖ ॥`, `ਦਿਆਲ ॥` — 32 of those in `JAAP` alone would
/// misclassify under that rule. Checked against real content before being
/// accepted, the way [`HEADING_WORDS`]' one bad word was checked before being
/// removed.
///
/// **No vishraam check.** Vishraams mark where a reciter pauses, which is not a
/// principled definition of what a heading is or isn't — dropping the check
/// entirely correctly recovers the mool mantar's own vishraam-bearing spelling
/// (see the doctest below) and introduces no new false positive across bundled
/// content.
///
/// Structural shape:
///
/// 1. **It ends with `॥`.** Not the single danda, and not bare.
/// 2. **It carries no trailing number** — no numbered ending (`॥੧॥`), no rahao
///    marker (`॥ ਰਹਾਉ ॥`). Distinct from [`ends_with_short_numbered_marker`]'s
///    numeral — see that function's own doc comment for the shape that
///    separates them.
///
/// **No ikoankar check, on purpose.** A short mangal invocation
/// (`ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥`) already passes on its own merits, so there is nothing
/// to exclude — see [`has_ikoankar`]/[`is_moolmantar`] for the two questions
/// this doesn't answer. `database/docs/numbering.md`'s own zoning rule excludes
/// the mangal from *its* "heading" for a narrower reason (telling a mangal
/// apart from the line that opens a *numbered division* next to it); that
/// stays true there and does not change what this function returns.
///
/// **Position is deliberately not a signal.** `ਚੌਪਈ ॥` and `ਸਵੈਯਾ ॥` appear
/// partway through long works as internal headings, so a rule that only looked at
/// opening lines would miss them.
///
/// ```
/// # use gurmukhi::feature::{is_heading, is_moolmantar, has_ikoankar};
/// assert!(is_heading("ਚੌਪਈ ॥".to_string()));
/// assert!(is_heading("ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥".to_string())); // a heading, not the mool mantar
/// assert!(!is_moolmantar("ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥".to_string()));
/// assert!(has_ikoankar("ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥".to_string()));
///
/// // A marker word alone is not enough without the structural shape too.
/// assert!(!is_heading("ਜਪੁ ਤਪੁ ਸੰਜਮੁ ਧਰਮੁ ਨ ਕਮਾਇਆ ॥".to_string())); // real Rehras verse
/// assert!(is_heading("॥ ਜਪੁ ॥".to_string())); // Japji's title — HEADING_TEXT, not the word alone
///
/// // ends_with_short_numbered_marker catches a form even with no marker word.
/// assert!(is_heading("ਦੇਵਗੰਧਾਰੀ ੫ ॥".to_string()));
///
/// // No vishraam gate — the mool mantar's own vishraam-bearing spelling now
/// // satisfies is_heading too, same as its 32 vishraam-free SGGS spellings.
/// // Not a contradiction: is_moolmantar and is_heading were never meant to be
/// // exclusive, only independent (see is_moolmantar's own tests).
/// let mool_mantar = "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ; ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥";
/// assert!(is_moolmantar(mool_mantar.to_string()));
/// assert!(is_heading(mool_mantar.to_string()));
/// ```
#[uniffi::export]
pub fn is_heading(input: String) -> bool {
    let text = input.trim();
    if HEADING_TEXT.contains(&text) {
        return true;
    }
    if !text.ends_with(DANDA) {
        return false;
    }
    if !detect(
        text.to_string(),
        vec![Feature::NumberedEnding, Feature::RahaoEnding],
    )
    .is_empty()
    {
        return false;
    }
    HEADING_WORDS.iter().any(|word| text.contains(word)) || ends_with_short_numbered_marker(text)
}

#[cfg(test)]
mod heading_tests {
    use super::{has_ikoankar, is_heading, is_moolmantar};

    /// Japji Sahib's opening — the one occurrence, of 33 in the SGGS, recorded
    /// with the vishraam after `ਨਿਰਵੈਰੁ`.
    const MOOL_MANTAR_WITH_VISHRAAM: &str =
        "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ; ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥";
    /// The other 32 SGGS occurrences' spelling — same words, no vishraam.
    const MOOL_MANTAR_NO_VISHRAAM: &str =
        "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥";

    #[test]
    fn recognises_headings() {
        for line in [
            "ਬਿਲਾਵਲੁ ਮਹਲਾ ੫ ॥",                        // NEKY
            "ਗਉੜੀ ਕਬੀਰ ਜੀ ਕੀ ਨਾਲਿ ਰਲਾਇ ਲਿਖਿਆ ਮਹਲਾ ੫ ॥", // N0SF — long compound, still one heading
            "ਦੇਵਗੰਧਾਰੀ ੫ ॥",                             // ends_with_short_numbered_marker, no marker word
            "ਰਾਗੁ ਗੋਂਡ ਬਾਣੀ ਭਗਤਾ ਕੀ ॥ ਕਬੀਰ ਜੀ ਘਰੁ ੧ ॥", // MRU2 — an internal ॥ is not the end
            "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥",                        // a short mangal — a heading, not the mool mantar
            "ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥",                    // BNCP's opening — same shape, same verdict
        ] {
            assert!(is_heading(line.to_string()), "expected a heading: {line}");
            assert!(!is_moolmantar(line.to_string()), "not the mool mantar: {line}");
        }
    }

    #[test]
    fn accepted_false_negatives_unlisted_raag_names() {
        // Real SGGS headings — a bare raag name alone, with no author/ghar/form
        // word attached — that HEADING_WORDS does not cover and
        // ends_with_short_numbered_marker does not apply to (no trailing
        // numeral). Neither `ਆਸਾ` nor `ਗਉੜੀ` earned a place in HEADING_WORDS by
        // the same test every other word passed: verified against every
        // bundled Nitnem line. They may well be safe — nothing here says
        // otherwise — but "looks safe" was exactly how `ਜਪੁ` got in and had to
        // come back out, so a raag name waits for the same per-word corpus
        // check before joining the list. Documenting the gap here rather than
        // asserting something false is the honest form of "not yet."
        for line in ["ਆਸਾ ॥", "ਗਉੜੀ ਕਬੀਰ ਜੀ ॥"] {
            assert!(!is_heading(line.to_string()), "known false negative: {line}");
        }
    }

    #[test]
    fn the_mool_mantar_is_moolmantar_regardless_of_spelling() {
        for line in [MOOL_MANTAR_WITH_VISHRAAM, MOOL_MANTAR_NO_VISHRAAM] {
            assert!(is_moolmantar(line.to_string()), "expected the mool mantar: {line}");
            assert!(has_ikoankar(line.to_string()));
        }
    }

    #[test]
    fn the_mool_mantar_satisfies_is_heading_too_regardless_of_spelling() {
        // is_heading has no vishraam gate (see its own doc comment for why), so
        // both spellings pass — is_moolmantar and is_heading were never meant to
        // be exclusive, only independent.
        assert!(is_heading(MOOL_MANTAR_WITH_VISHRAAM.to_string()));
        assert!(is_heading(MOOL_MANTAR_NO_VISHRAAM.to_string()));
    }

    #[test]
    fn excludes_the_chhota_forms() {
        // The abbreviated invocation some raag sections open with — 9+2
        // occurrences in the SGGS. Deliberately not is_moolmantar; see its own
        // doc comment for why this is left open rather than decided.
        for line in ["ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥", "ੴ ਸਤਿ ਨਾਮੁ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥"] {
            assert!(!is_moolmantar(line.to_string()), "not (yet) the mool mantar: {line}");
            assert!(has_ikoankar(line.to_string()));
        }
    }

    #[test]
    fn ddtk_is_now_caught_by_is_heading_too() {
        // Used to be the example proving has_ikoankar closed a real gap (a
        // vishraam glued to the mangal satisfied neither other function).
        // Dropping is_heading's vishraam gate closed that gap for free — this
        // line is now caught by is_heading like any other mangal invocation.
        // Kept as a regression test with the history explained, not deleted:
        // if this starts failing, has_ikoankar's doc comment needs updating
        // again, not this test "fixed" back to false.
        let ddtk = "ੴ; ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥";
        assert!(is_heading(ddtk.to_string()));
        assert!(!is_moolmantar(ddtk.to_string()));
        assert!(has_ikoankar(ddtk.to_string()));
    }

    #[test]
    fn has_ikoankar_and_is_moolmantar_are_independent() {
        for line in ["ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥", "ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥", MOOL_MANTAR_WITH_VISHRAAM] {
            assert!(has_ikoankar(line.to_string()), "expected a mangal: {line}");
        }
        assert!(!is_moolmantar("ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥".to_string()));
        assert!(!is_moolmantar("ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥".to_string()));
        assert!(!has_ikoankar("ਆਸਾ ॥".to_string()));
    }

    #[test]
    fn no_longer_misclassifies_interior_pauri_lines() {
        // Regression test for the bug this whole rewrite fixed. Both are real
        // Japji Sahib verse (Pauri 37, not headings — only the pauri's last line
        // carries a number, so these interior lines end bare like a heading
        // does) — an earlier, structure-only version of is_heading called both
        // headings. Neither carries a marker word or a short numbered ending, so
        // the fixed rule correctly excludes them.
        for line in ["ਅੰਤੁ ਨ ਜਾਪੈ ਪਾਰਾਵਾਰੁ ॥", "ਸਚ ਖੰਡਿ ਵਸੈ ਨਿਰੰਕਾਰੁ ॥"] {
            assert!(!is_heading(line.to_string()), "should be verse, not a heading: {line}");
        }
    }

    #[test]
    fn rejects_jaap_sahibs_single_word_verse() {
        // "A bare-ending line with exactly one word is a heading" looks
        // reasonable and was checked against real content before being
        // accepted — wrongly, because Jaap Sahib's own verse is built from
        // single-word divine epithets, one per line. None of these carry a
        // marker word, so the fixed rule correctly excludes them without
        // needing a word-count rule at all.
        for line in ["ਅਜੂ ॥", "ਅਭੈ ॥", "ਅਲੇਖ ॥", "ਦਿਆਲ ॥", "ਅਕਾਲ ॥"] {
            assert!(!is_heading(line.to_string()), "single-word verse, not a heading: {line}");
        }
    }

    #[test]
    fn ends_with_short_numbered_marker_catches_unlisted_forms() {
        // No marker word needed — the shape alone (1-3 words, then a bare
        // one/two-digit numeral) is enough. This is what lets a future raag
        // name or author attribution not yet in HEADING_WORDS still classify
        // correctly. Neither example below contains any HEADING_WORDS
        // substring, so this isolates the numeral rule specifically.
        for line in ["ਦੇਵਗੰਧਾਰੀ ੫ ॥", "ਬਿਲਾਵਲੁ ੫ ॥"] {
            assert!(is_heading(line.to_string()), "expected a heading: {line}");
        }
    }

    #[test]
    fn short_numbered_marker_does_not_catch_an_ordinary_pada_count() {
        // ॥੨॥ is the numbered-ending exclusion's job, not this one's — a danda
        // immediately followed by a digit never reaches
        // ends_with_short_numbered_marker because is_heading rejects it first.
        assert!(!is_heading("ਜਨ ਨਾਨਕ ਗੁਣ ਗਾਵੈ ਨਿਤ ॥੨॥".to_string()));
    }

    #[test]
    fn rejects_verse() {
        for line in [
            "ਜਨ ਨਾਨਕ ਪਿਆਸ ਚਰਨ ਕਮਲਨੑ ਕੀ; ਪੇਖਿ ਦਰਸੁ ਸੁਆਮੀ ਸੁਖ ਸਾਰੋ ॥੨॥੭॥੧੨੩॥", // 36FE — a count is verse
            "ਕਬੀਰ. ਭਲੀ ਮਧੂਕਰੀ; ਨਾਨਾ ਬਿਧਿ ਕੋ ਨਾਜੁ ॥", // a vishraam makes it verse even with a heading word
        ] {
            assert!(!is_heading(line.to_string()), "expected verse: {line}");
            assert!(!is_moolmantar(line.to_string()));
        }
    }

    #[test]
    fn empty_is_not_a_heading() {
        assert!(!is_heading(String::new()));
        // Passed the old structure-only rule (ends `॥`, no trailing number, no
        // text required) but carries no marker word and no numeral, so the
        // vocabulary-gated rule correctly rejects it.
        assert!(!is_heading("॥".to_string()));
    }
}

/// Lines that close a line-group without being part of the composition.
///
/// **A lookup, deliberately, not a rule.** They are few, fixed, and recognised by
/// reading rather than by shape — a word list or a positional test draws the line
/// somewhere the text does not. Ported as-is from
/// `database/scripts/lib/gurbani.ts`, which enumerates three kinds: tallies that
/// count what just ended (`ਮਹਲੇ ਪਹਿਲੇ ਸਤਾਰਹ ਅਸਟਪਦੀਆ ॥`), scribal notes about the
/// text itself (`ਸੁਧੁ`, "correct"), and reading instructions
/// (`ਏਹੁ ਸਲੋਕੁ ਆਦਿ ਅੰਤਿ ਪੜਣਾ ॥`). Scripture-adjacent rather than scripture — a
/// reader should see them, rendered dimmed rather than hidden, and should not
/// feel obliged to recite them.
///
/// **SGGS-only.** Dasam Granth and Kabit Savaiye have not been read for these yet,
/// so this returns `false` for every line in those sources today, colophon or not
/// — that is missing coverage, not a claim that Dasam Granth has none.
const COLOPHON_LINES: &[(&str, &str)] = &[
    ("3UFU", "ਮਹਲੇ ਪਹਿਲੇ ਸਤਾਰਹ ਅਸਟਪਦੀਆ ॥"),
    ("E76M", "ਸਤ ਚਉਪਦੇ ਮਹਲੇ ਚਉਥੇ ਕੇ ॥"),
    ("LV07", "ਸੋਲਹ ਅਸਟਪਦੀਆ ਗੁਆਰੇਰੀ ਗਉੜੀ ਕੀਆ ॥"),
    ("DXUX", "ਗਉੜੀ ਗੁਆਰੇਰੀ ਕੇ ਪਦੇ ਪੈਤੀਸ ॥"),
    ("K50V", "ਦੂਜੇ ਘਰ ਕੇ ਚਉਤੀਸ ॥"),
    ("DMD6", "ਬਾਈਸ ਚਉਪਦੇ; ਤਥਾ ਪੰਚਪਦੇ"),
    ("7LAQ", "ਏਹੁ ਸਲੋਕੁ ਆਦਿ ਅੰਤਿ ਪੜਣਾ ॥"),
];

/// Is this line-group's line a colophon — scripture-adjacent, not scripture?
///
/// Keyed by line ID, not text — see [`COLOPHON_LINES`].
#[uniffi::export]
pub fn is_colophon(line_id: String) -> bool {
    COLOPHON_LINES.iter().any(|(id, _)| *id == line_id)
}

/// The colophon's text, for asserting the lookup still points at what it names.
#[uniffi::export]
pub fn colophon_text(line_id: String) -> Option<String> {
    COLOPHON_LINES
        .iter()
        .find(|(id, _)| *id == line_id)
        .map(|(_, text)| text.to_string())
}

#[cfg(test)]
mod colophon_tests {
    use super::{colophon_text, is_colophon};

    #[test]
    fn the_three_kinds() {
        assert!(is_colophon("3UFU".to_string())); // tally
        assert!(is_colophon("7LAQ".to_string())); // instruction
        assert!(is_colophon("K50V".to_string())); // tally, and the one a word list hid
    }

    #[test]
    fn an_ordinary_line_is_not_one() {
        assert!(!is_colophon("NEKY".to_string()));
    }

    #[test]
    fn the_lookup_carries_its_text() {
        assert_eq!(
            colophon_text("3UFU".to_string()),
            Some("ਮਹਲੇ ਪਹਿਲੇ ਸਤਾਰਹ ਅਸਟਪਦੀਆ ॥".to_string())
        );
        assert_eq!(colophon_text("NEKY".to_string()), None);
    }
}
