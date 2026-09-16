/**
 * The structural rules of the corpus text, as functions.
 *
 * These are derived in `database/docs/numbering.md` from reading every SGGS
 * line-group in source order. They live here rather than in `packages/gurmukhi`
 * because no app needs them — they are corpus tooling. They live here rather
 * than in prose because a rule that exists only as prose gets re-derived, and
 * two of these were got wrong on the way to being written down.
 *
 * Every function is pure. The corpus is 604M; these must be testable without it.
 */

/** ੦-੯, U+0A66-U+0A6F. */
const DIGIT = '੦-੯'
/** The double danda ॥ that closes a line, U+0965. Not the single ।, U+0964. */
const DANDA = '॥'
/** ੴ, U+0A74. */
export const MANGAL_CHAR = 'ੴ'

/** Vishraam markers, heaviest first. Editorial notation, never scripture. */
export const VISHRAAMS = { heavy: ';', medium: ',', light: '.' } as const
const VISHRAAM_CHARS = Object.values(VISHRAAMS)

const gurmukhiToArabic = (digits: string) =>
  Number([...digits].map((c) => c.charCodeAt(0) - 0x0a66).join(''))

/**
 * A rahao marker, which may or may not carry a number:
 *   ॥੧॥ ਰਹਾਉ ॥      ॥ ਰਹਾਉ ॥      ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥      ॥ ਰਹਾਉ ਦੂਜਾ ॥
 *
 * The leading ॥ is load-bearing. `ਰਹਾਉ` also occurs as an ordinary word mid-verse
 * ("ਗੁਰਬਾਣੀ ਲਾਗਿ ਰਹਾਉ ॥੮॥"), where the number after it is a pada, not a stack.
 * Matching the word alone loses that line and reports a hole in the run.
 */
const RAHAO_MARKER = new RegExp(
  `${DANDA}\\s*(?:[${DIGIT}]+\\s*${DANDA}\\s*)?ਰਹਾਉ(?:\\s*ਦੂਜਾ)?\\s*${DANDA}`,
)

/**
 * Scribal words a scribe appended after a line's closing count. They record
 * something about the text rather than being part of it — `ਸੁਧੁ` ("correct") after
 * a vaar's final pauri, `ਛਕਾ ੧` marking a set of six — and they are not part of the
 * ending, so they are stripped before the numbers are read.
 *
 * Sometimes terminated (`ਸੁਧੁ ॥`), sometimes bare (`ਸੁਧੁ`). 31 lines in the SGGS.
 */
const SCRIBAL_SUFFIX = new RegExp(
  `\\s*(?:ਸੁਧੁ\\s*ਕੀਚੇ|ਸੁਧੁ|ਛਕਾ|ਛਕੇ|ਜੁਮਲਾ|ਦੁਤੁਕੇ|ਜੋੜੁ)(?:\\s*[${DIGIT}]+)?\\s*${DANDA}?\\s*$`,
)

/** The text with any trailing scribal word removed. */
export const stripScribalSuffix = (line: string) => line.replace(SCRIBAL_SUFFIX, '')

/** The trailing run of ॥N॥ groups at the very end of a line. */
const TRAILING = new RegExp(`((?:${DANDA}\\s*[${DIGIT}]+\\s*)+)${DANDA}?\\s*$`)

export const isRahaoMarker = (line: string) => RAHAO_MARKER.test(line)

export type Ending = {
  /** The pada number this line closes, if it closes one. */
  pada?: number
  /**
   * Counters after the pada, narrowest first: division count, then the running
   * raag count. Empty on an ordinary mid-shabad line.
   */
  stack: number[]
}

/**
 * Reads the numbers at the end of a line.
 *
 * A rahao marker contributes no pada — its ੧ counts nothing — but numbers *after*
 * it are the closing stack. So `॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥੧੨॥੮੧॥` is `{ stack: [12, 81] }`,
 * and the shabad's padas were numbered on earlier lines.
 */
export const parseEnding = (line: string): Ending => {
  const marker = RAHAO_MARKER.exec(line)
  if (marker) {
    const after = line.slice(marker.index + marker[0].length)
    return {
      stack: [...after.matchAll(new RegExp(`[${DIGIT}]+`, 'g'))].map((m) => gurmukhiToArabic(m[0])),
    }
  }

  const trailing = TRAILING.exec(stripScribalSuffix(line).trimEnd())
  if (!trailing) return { stack: [] }

  const [pada, ...stack] = [...trailing[1].matchAll(new RegExp(`[${DIGIT}]+`, 'g'))].map((m) =>
    gurmukhiToArabic(m[0]),
  )
  return pada === undefined ? { stack: [] } : { pada, stack }
}

export const hasMangal = (line: string) => line.includes(MANGAL_CHAR)

/** Form words that name what a line-group is. `ਪਵੜੀ` is a real variant of `ਪਉੜੀ`. */
const FORMS = [
  ['ਪਉੜੀ', 'pauri'],
  ['ਪਵੜੀ', 'pauri'],
  ['ਡਖਣਾ', 'dakhna'],
  ['ਡਖਣੇ', 'dakhna'],
  ['ਸਲੋਕ', 'salok'],
  ['ਛੰਤ', 'chhant'],
  ['ਅਸਟਪਦੀ', 'ashtpadi'],
] as const

export type Form = (typeof FORMS)[number][1] | 'shabad'

export const classifyForm = (heading: string): Form =>
  FORMS.find(([word]) => heading.includes(word))?.[1] ?? 'shabad'

/**
 * Whether a line names a composition rather than being one.
 *
 * Defined by what a heading lacks, not by a vocabulary. An earlier version
 * required a word from a list — which had `ਰਾਗੁ` but not the raag names, and so
 * missed 203 real headings in the SGGS: `ਆਸਾ ॥`, `ਗਉੜੀ ਕਬੀਰ ਜੀ ॥`,
 * `ਦੇਵਗੰਧਾਰੀ ੫ ॥`. Any such list is a guess at a vocabulary nobody wrote down.
 *
 * What holds instead: a heading carries no pada or counter, and no vishraam,
 * because it is not phrased for pausing. Tested across the whole SGGS, those two
 * conditions separate headings from verse without naming a single word.
 *
 * A mangal is excluded because it opens a division alongside a heading rather
 * than being one.
 */
export const isHeading = (line: string) => {
  const text = line.trim()
  if (!text.endsWith(DANDA)) return false
  if (text.includes(MANGAL_CHAR)) return false
  if (VISHRAAM_CHARS.some((vishraam) => text.includes(vishraam))) return false

  const { pada, stack } = parseEnding(text)
  return pada === undefined && stack.length === 0
}

/**
 * Lines that close a line-group without being part of the composition.
 *
 * **This is a lookup, deliberately.** Every rule tried against these — a word
 * list, spelled-out numbers, position plus the absence of a counter — either
 * missed real ones or swallowed verse. There are a few dozen in the whole corpus,
 * they do not grow, and a human can identify each in seconds. A lookup is the
 * honest shape for that.
 *
 * Three kinds occur, and they mean different things to a reader:
 *
 * 1. **Tallies** count what just ended — `ਮਹਲੇ ਪਹਿਲੇ ਸਤਾਰਹ ਅਸਟਪਦੀਆ ॥`
 *    ("seventeen ashtpadis of the First Mehl"), `ਦੂਜੇ ਘਰ ਕੇ ਚਉਤੀਸ ॥`
 *    ("thirty-four of the second ghar").
 * 2. **Scribal notes** record something about the text itself, not its content —
 *    `ਸੁਧੁ` ("correct"), at the end of Asa Ki Var and elsewhere.
 * 3. **Instructions** tell a reader what to do — `ਏਹੁ ਸਲੋਕੁ ਆਦਿ ਅੰਤਿ ਪੜਣਾ ॥`
 *    ("read this salok at the beginning and at the end").
 *
 * They are scripture-adjacent rather than scripture: a reader should be able to
 * see them, and should not feel obliged to recite them. The app is expected to
 * render them dimmed rather than hide them.
 *
 * Keyed by line ID, which is stable, with the text alongside so the entry can be
 * checked by eye. Only SGGS is enumerated so far; Dasam bani has its own, and
 * Kabit Savaiye has not been looked at.
 */
const COLOPHON_LINES = new Map<string, string>([
  ['3UFU', 'ਮਹਲੇ ਪਹਿਲੇ ਸਤਾਰਹ ਅਸਟਪਦੀਆ ॥'],
  ['E76M', 'ਸਤ ਚਉਪਦੇ ਮਹਲੇ ਚਉਥੇ ਕੇ ॥'],
  ['LV07', 'ਸੋਲਹ ਅਸਟਪਦੀਆ ਗੁਆਰੇਰੀ ਗਉੜੀ ਕੀਆ ॥'],
  ['DXUX', 'ਗਉੜੀ ਗੁਆਰੇਰੀ ਕੇ ਪਦੇ ਪੈਤੀਸ ॥'],
  ['K50V', 'ਦੂਜੇ ਘਰ ਕੇ ਚਉਤੀਸ ॥'],
  ['DMD6', 'ਬਾਈਸ ਚਉਪਦੇ; ਤਥਾ ਪੰਚਪਦੇ'],
  ['7LAQ', 'ਏਹੁ ਸਲੋਕੁ ਆਦਿ ਅੰਤਿ ਪੜਣਾ ॥'],
])

export const isColophon = (lineId: string) => COLOPHON_LINES.has(lineId)

/** The colophon's text, for asserting the lookup still points at what it names. */
export const colophonText = (lineId: string) => COLOPHON_LINES.get(lineId)

/**
 * Line-groups that stand outside the usual bounds — an **unzoned** composition.
 *
 * The term matters. These are not incomplete, deficient, or missing anything:
 * they are as they are in the source, and calling them "incomplete" imports a
 * judgement the text does not make. Unzoned says the true thing —
 * the ordinary zoning that closes a shabad does not apply here.
 *
 * Confirmed individually, not detected. A rule that tried to find them would have
 * to decide what "should" have been there, which is exactly the judgement not to
 * make automatically.
 */
const UNZONED_GROUPS = new Map<string, string>([
  ['5FC', 'ਛਾਡਿ ਮਨ; ਹਰਿ, ਬਿਮੁਖਨ ਕੋ ਸੰਗੁ ॥'],
  ['GU2', 'ਸਤਿਗੁਰੁ. ਤੁਮ ਸੇਵਿ ਸਖੀ; ਮਨਿ ਚਿੰਦਿਅੜਾ ਫਲੁ ਪਾਵਹੁ ॥'],
])

export const isUnzoned = (groupId: string) => UNZONED_GROUPS.has(groupId)

export type VishraamFault = {
  index: number
  marker: string
  reason: 'no-word-before' | 'no-space-after'
}

/**
 * A vishraam attaches to the end of a word and is followed by a space.
 *
 * Both halves matter: `ਸੁਖੁ. .ਨ` is a doubled marker whose second copy has no word
 * in front of it, and a marker glued to the next word would run two words together.
 */
export const findVishraamFaults = (line: string): VishraamFault[] => {
  const faults: VishraamFault[] = []
  for (let index = 0; index < line.length; index += 1) {
    const marker = line[index] as string
    if (!VISHRAAM_CHARS.includes(marker as never)) continue

    const before = line[index - 1] ?? ' '
    const after = line[index + 1] ?? ' '
    if (before === ' ' || VISHRAAM_CHARS.includes(before as never)) {
      faults.push({ index, marker, reason: 'no-word-before' })
    } else if (after !== ' ' && after !== '') {
      faults.push({ index, marker, reason: 'no-space-after' })
    }
  }
  return faults
}
