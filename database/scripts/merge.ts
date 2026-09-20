import { $, Glob } from 'bun'
import { readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'
import { parse } from 'smol-toml'

import type { Lines } from '#collections-types/lines'

import { type Article, type Block, page, type Row } from './lib/render'

/**
 * Merges primary [[content]] entries that read identically into one entry
 * naming every asset that reads it that way.
 *
 *   bun scripts/merge.ts migrations/9-merge-identical-primaries.toml
 *   bun scripts/merge.ts migrations/9-merge-identical-primaries.toml --apply
 *
 * Separate from pluralise.ts, which changed a field's shape on every entry
 * without reading it. This reads entries, compares them, and removes some —
 * so unlike that rewrite it needs the corpus's own answer to what pairs up,
 * and it derives that rather than being told. The manifest records why the
 * change happened; which entries merge is a fact about the data.
 */

type Manifest = { description: string; issue?: number; why: string }

const [path] = process.argv.slice(2).filter((argument) => !argument.startsWith('--'))
const apply = process.argv.includes('--apply')

if (!path) {
  consola.error('usage: bun scripts/merge.ts <manifest.toml> [--apply]')
  process.exit(1)
}

const manifest = parse(await readFile(path, 'utf-8')) as unknown as Manifest

type Merge = {
  lineId: string
  filePath: string
  keep: number
  drop: number[]
  assets: string[]
  data: string
}

const merges: Merge[] = []

/** Entries sharing byte-identical data, keyed by that data, in file order. */
const groupsIn = (content: Lines['content']) => {
  const byData = new Map<string, number[]>()
  for (const [index, entry] of content.entries()) {
    if (entry.type !== 'primary') continue
    const at = byData.get(entry.data)
    if (at) at.push(index)
    else byData.set(entry.data, [index])
  }
  return [...byData.values()].filter((indices) => indices.length > 1)
}

const filePaths: string[] = []
for await (const filePath of new Glob('./collections/lines/**/*.toml').scan())
  filePaths.push(filePath)
filePaths.sort()

for (const filePath of filePaths) {
  const { content } = parse(await readFile(filePath, 'utf-8')) as unknown as Lines
  for (const indices of groupsIn(content)) {
    const [keep, ...drop] = indices as [number, ...number[]]
    merges.push({
      lineId: basename(filePath, '.toml'),
      filePath,
      keep,
      drop,
      assets: indices.flatMap((index) => content[index]!.assets),
      data: content[keep]!.data,
    })
  }
}

/**
 * The rewrite, as text. Splitting on the table header keeps every entry's bytes
 * exactly as they are — only the kept entry's assets line is rewritten, and the
 * dropped entries' chunks are removed whole.
 */
const rewrite = (source: string, fileMerges: Merge[]) => {
  const chunks = source.split(/(?=^\[\[content\]\]$)/m)
  // chunks[0] is empty when the file opens with the header, as every line file does.
  const offset = chunks[0] === '' ? 1 : 0
  const dropped = new Set(fileMerges.flatMap((m) => m.drop))

  for (const merge of fileMerges) {
    const at = merge.keep + offset
    const chunk = chunks[at] as string
    const replaced = chunk.replace(
      /^assets = \[[^\]]*\]$/m,
      `assets = [${merge.assets.map((a) => `"${a}"`).join(', ')}]`,
    )
    if (replaced === chunk)
      throw new Error(`${merge.filePath}: no assets line on entry ${merge.keep}`)
    chunks[at] = replaced
  }

  return chunks.filter((_, index) => !dropped.has(index - offset)).join('')
}

const byFile = new Map<string, Merge[]>()
for (const merge of merges) {
  const at = byFile.get(merge.filePath)
  if (at) at.push(merge)
  else byFile.set(merge.filePath, [merge])
}

const rewritten = new Map<string, string>()

for (const [filePath, fileMerges] of byFile) {
  const before = await readFile(filePath, 'utf-8')
  const after = rewrite(before, fileMerges)

  const beforeParsed = parse(before) as unknown as Lines
  const afterParsed = parse(after) as unknown as Lines

  const dropped = new Set(fileMerges.flatMap((m) => m.drop))
  const expected = beforeParsed.content.filter((_, index) => !dropped.has(index))

  if (afterParsed.content.length !== expected.length) {
    throw new Error(
      `${filePath}: expected ${expected.length} entries, got ${afterParsed.content.length}`,
    )
  }

  const merged = new Map(fileMerges.map((m) => [m.keep, m.assets]))

  for (const [index, want] of expected.entries()) {
    const got = afterParsed.content[index] as Lines['content'][number]
    const beforeIndex = beforeParsed.content.indexOf(want)
    const wantAssets = merged.get(beforeIndex) ?? want.assets

    if (JSON.stringify(got.assets) !== JSON.stringify(wantAssets)) {
      throw new Error(
        `${filePath}: entry ${index} — assets are ${JSON.stringify(got.assets)}, expected ${JSON.stringify(wantAssets)}`,
      )
    }
    const { assets: _g, ...gotRest } = got
    const { assets: _w, ...wantRest } = want
    if (JSON.stringify(gotRest) !== JSON.stringify(wantRest)) {
      throw new Error(`${filePath}: entry ${index} — a field other than assets changed`)
    }
  }

  rewritten.set(filePath, after)
}

consola.success(
  `${byFile.size} files, ${merges.length} merges, ${merges.reduce((n, m) => n + m.drop.length, 0)} entries removed`,
)

// 333 diffs cannot be read. A sample is one merge per distinct line, in the
// order the corpus holds them, rather than however many happen to sit in
// whichever file sorts first.
const seen = new Set<string>()
const sample: Block[] = []
for (const merge of merges) {
  if (seen.has(merge.lineId)) continue
  seen.add(merge.lineId)
  const from: Row[] = merge.drop
    .map((index) => ({ id: `entry ${index}`, text: merge.data, changed: true }))
    .concat([{ id: `entry ${merge.keep}`, text: merge.data, changed: true }])
    .reverse()
  sample.push({
    kind: 'pair',
    id: merge.lineId,
    note: `${merge.drop.length + 1} entries → 1 · ${merge.assets.join(', ')}`,
    from,
    to: [{ id: `entry ${merge.keep}`, text: merge.data, changed: true }],
  })
  if (sample.length === 12) break
}

const article: Article = {
  title: `${merges.length} merges across ${byFile.size} files`,
  subtitle: manifest.issue
    ? `shabados/shabados#${manifest.issue} — proposed, not applied`
    : 'proposed, not applied',
  blocks: sample,
}

if (!apply) {
  await writeFile('./review.html', page('Proposed change', manifest.description, [article]))
  consola.success(
    `./review.html — open this before applying (${sample.length} of ${merges.length} merges)`,
  )
  consola.info('Dry run. Re-run with --apply to write and commit.')
  process.exit(0)
}

// A data: commit must contain corpus files and nothing else, and the whole
// manifest lands together — so the tree is checked once, before any write.
const status = (await $`git status --porcelain`.text()).trim()
if (status) {
  consola.error('Working tree is not clean. Commit or stash first.')
  process.exit(1)
}

for (const [filePath, after] of rewritten) await writeFile(filePath, after)

await $`git add ${'./collections/lines'}`.quiet()
const message =
  `data: ${manifest.description.charAt(0).toLowerCase()}${manifest.description.slice(1)}\n\n${manifest.why}\n\n` +
  `${byFile.size} files, ${merges.length} merges, ${merges.reduce((n, m) => n + m.drop.length, 0)} entries removed. ` +
  `Reversible by splitting each multi-asset primary entry back into one entry per asset.\n\n` +
  `Manifest: database/migrations/${basename(path)}`
await $`git commit -m ${message}`.quiet()
consola.success(`applied and committed — ${merges.length} merges`)
