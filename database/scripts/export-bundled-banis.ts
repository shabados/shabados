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
const BUNDLED = [
  'JAPJ',
  'JAAP',
  'TPSS',
  'BNCP',
  'ANND',
  'RHRS',
  'SHLA',
] as const

const OUT_DIRS = [
  '../apps/ios/ShabadOS/Resources',
  '../apps/android/app/src/main/assets',
]

type LineContent = {
  asset: string
  type: string
  language?: string
  data?: string
}

const readToml = async <T>(path: string): Promise<T> =>
  parse(await Bun.file(path).text()) as T

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
  const bani = await readToml<{
    name: Record<string, string>
    sections?: { lines?: string[] }[]
  }>(`./collections/banis/${id}.toml`)

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
  banis.push({ id, name: bani.name, sections })
}

const json = JSON.stringify({ banis }, null, 0)
for (const dir of OUT_DIRS) {
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/banis.json`, json)
  consola.success(`${dir}/banis.json — ${(json.length / 1024).toFixed(0)} KB`)
}
