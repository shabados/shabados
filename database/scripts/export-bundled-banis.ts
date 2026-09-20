/**
 * Exports a small, self-contained slice of the corpus for the mobile scaffolds to
 * bundle. Not a distribution mechanism — the real corpus ships per
 * docs/requirements/corpus.md. This exists so apps/ios and apps/android render
 * real gurbani without carrying a 151 MB artifact or a network dependency.
 *
 * One generator, two consumers: the apps never hand-author scripture.
 */
import { Glob } from 'bun'
import { mkdir, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import { consola } from 'consola'
import { parse } from 'smol-toml'

/** Nitnem, in recitation order. Ids are collections/banis/<id>.toml. */
const BUNDLED = ['JAPJ', 'JAAP', 'TPSS', 'BNCP', 'ANND', 'RHRS', 'SHLA'] as const

/**
 * The longer reading each bani continues into — authored optionality, per
 * library.md#continuation-not-configuration, not something this script decides.
 * Neither CPDT nor RHRT is a Library entry of its own; each exists only as the
 * source `findContinuations` reads to locate the gap in its shorter counterpart.
 */
const CONTINUES_INTO: Partial<Record<(typeof BUNDLED)[number], string>> = {
  BNCP: 'CPDT',
  RHRS: 'RHRT',
}

const OUT_DIRS = ['../apps/ios/ShabadOS/Resources', '../apps/android/app/src/main/assets']

type LineContent = {
  assets: string[]
  type: string
  language?: string
  data?: string
}

type Line = { id: string; gurmukhi: string }
type BaniToml = { name: Record<string, string>; sections?: { lines?: string[] }[] }
type Continuation = { afterLine: string | null; lines: Line[] }

const readToml = async <T>(path: string): Promise<T> => parse(await Bun.file(path).text()) as T

/** Every line of a bani, sections flattened into one ordered sequence. */
const flatten = (id: string, bani: BaniToml, lines: Map<string, string>): Line[] =>
  (bani.sections ?? []).flatMap((section) =>
    (section.lines ?? []).map((lineId) => {
      const text = lines.get(lineId)
      if (!text) throw new Error(`${id}: line "${lineId}" has no line file`)
      return { id: lineId, gurmukhi: text }
    }),
  )

/**
 * Where `long` inserts material `short` omits, as one or more gaps.
 *
 * `short` is a subsequence of `long` for every pair in `CONTINUES_INTO` — verified
 * 2026-09-17 against `collections/` (RHRS→RHRT: two gaps of 9 and 72 lines at
 * positions 162 and 272 of 420, matching library.md's own numbers exactly). A
 * single pass finds every run of `long` with no next match in `short`.
 *
 * **This locates gaps in an already-known continuation** (`CONTINUES_INTO` is the
 * authored fact); it does not decide which pairs are one. Throws rather than
 * guessing if a future pair turns out not to be a clean subsequence — that shape
 * needs a human reading, not this function extended to cover it.
 */
const findContinuations = (short: Line[], long: Line[]): Continuation[] => {
  const continuations: Continuation[] = []
  let gap: Line[] = []
  let afterLine: string | null = null
  let i = 0

  for (const line of long) {
    if (i < short.length && line.id === short[i].id) {
      if (gap.length) {
        continuations.push({ afterLine, lines: gap })
        gap = []
      }
      afterLine = line.id
      i += 1
    } else {
      gap.push(line)
    }
  }
  if (gap.length) continuations.push({ afterLine, lines: gap })

  if (i !== short.length) {
    throw new Error(
      `short reading (${short.length} lines) is not a subsequence of the long one — ` +
        `${i} of ${short.length} matched. Cannot locate continuation gaps mechanically; ` +
        'this pair needs a human reading, not a diff.',
    )
  }
  return continuations
}

consola.box('Exporting bundled banis')

// One pass over lines/ rather than 8,000 individual reads.
const lines = new Map<string, string>()
for await (const file of new Glob('./collections/lines/**/*.toml').scan()) {
  const { content } = await readToml<{ content?: LineContent[] }>(file)
  // The first primary entry is the reading text. Assets disagree about
  // renderings (docs/requirements/data-model.md) — a scaffold does not need to.
  const primary = content?.find((c) => c.type === 'primary' && c.data)
  if (primary?.data) lines.set(basename(file, '.toml'), primary.data)
}
consola.info(`Indexed ${lines.size.toLocaleString()} lines`)

const banis = []
for (const id of BUNDLED) {
  const bani = await readToml<BaniToml>(`./collections/banis/${id}.toml`)

  const sections = (bani.sections ?? []).map((section) =>
    (section.lines ?? []).map((lineId) => {
      const text = lines.get(lineId)
      // Five bani entries reference line ids with no file — see
      // database/docs/roadmap.md §1.1. Fail loudly rather than render a gap.
      if (!text) throw new Error(`${id}: line "${lineId}" has no line file`)
      return { id: lineId, gurmukhi: text }
    }),
  )

  const count = sections.reduce((n, s) => n + s.length, 0)
  consola.info(`${id.padEnd(5)} ${bani.name.Latn} — ${count} lines`)

  const longerId = CONTINUES_INTO[id]
  // Always present, even empty — Swift's synthesized Decodable needs the key.
  let continuations: Continuation[] = []
  if (longerId) {
    const longer = await readToml<BaniToml>(`./collections/banis/${longerId}.toml`)
    continuations = findContinuations(flatten(id, bani, lines), flatten(longerId, longer, lines))
    const extra = continuations.reduce((n, c) => n + c.lines.length, 0)
    consola.info(`  ↳ continues into ${longerId}: +${extra} lines, ${continuations.length} gap(s)`)
  }

  banis.push({ id, name: bani.name, sections, continuations })
}

const json = JSON.stringify({ banis }, null, 0)
for (const dir of OUT_DIRS) {
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/banis.json`, json)
  consola.success(`${dir}/banis.json — ${(json.length / 1024).toFixed(0)} KB`)
}
