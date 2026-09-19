import { $, Glob } from 'bun'
import { readFile, writeFile } from 'node:fs/promises'

import consola from 'consola'
import { parse } from 'smol-toml'

import { type Article, type Block, page } from './lib/render'

/**
 * Rewrites every [[content]] entry's `asset` field to `assets`, a list, so one
 * entry can name several assets that render a line's text identically.
 *
 * Separate from normalise.ts on purpose: that rewrites the Gurmukhi inside
 * `data`, on primary content, for the sources a manifest names. This rewrites a
 * field's shape, on every content entry — primary, translation, note, and
 * pronunciation alike — across the whole corpus. Different axis, different tool.
 *
 *   bun scripts/pluralise.ts migrations/7-asset-list.toml
 *   bun scripts/pluralise.ts migrations/7-asset-list.toml --apply
 *
 * One field, one shape, everywhere — so unlike normalise.ts there is no per-rule
 * substitution table to read from the manifest. The manifest here only records
 * why the change happened; the edit itself is fixed.
 */

type Manifest = { description: string; issue?: number; why: string }

const [path] = process.argv.slice(2).filter((argument) => !argument.startsWith('--'))
const apply = process.argv.includes('--apply')

if (!path) {
  consola.error('usage: bun scripts/pluralise.ts <manifest.toml> [--apply]')
  process.exit(1)
}

const manifest = parse(await readFile(path, 'utf-8')) as unknown as Manifest

const RULE = /^asset = "([A-Z0-9]{3,4})"$/gm

const filePaths: string[] = []
for await (const filePath of new Glob('./collections/lines/**/*.toml').scan()) {
  filePaths.push(filePath)
}

// Every entry the rewrite touches, and the exact edit it makes to each — mirrors
// normalise.ts's own check: re-parsing before and after must agree on everything
// except the field this migration is about.
const edits: { lineId: string; asset: string; before: string; after: string }[] = []
let filesTouched = 0

for (const filePath of filePaths) {
  const before = await readFile(filePath, 'utf-8')
  if (!RULE.test(before)) continue
  RULE.lastIndex = 0
  const after = before.replace(RULE, 'assets = ["$1"]')

  const beforeParsed = parse(before) as { content: Record<string, unknown>[] }
  const afterParsed = parse(after) as { content: Record<string, unknown>[] }

  if (beforeParsed.content.length !== afterParsed.content.length) {
    throw new Error(`${filePath}: content entry count changed`)
  }

  const lineId = filePath.split('/').at(-1)?.replace('.toml', '') as string

  for (const [index, b] of beforeParsed.content.entries()) {
    const a = afterParsed.content[index] as { assets?: unknown[] }
    const { asset, ...bRest } = b as { asset: string; [key: string]: unknown }
    const { assets, ...aRest } = a as { assets: string[]; [key: string]: unknown }

    if (!Array.isArray(assets) || assets.length !== 1 || assets[0] !== asset) {
      throw new Error(`${filePath}: entry ${index} — assets does not match the original asset`)
    }
    if (JSON.stringify(bRest) !== JSON.stringify(aRest)) {
      throw new Error(`${filePath}: entry ${index} — a field other than asset/assets changed`)
    }

    edits.push({
      lineId,
      asset,
      before: `asset = "${asset}"`,
      after: `assets = ["${asset}"]`,
    })
  }

  filesTouched++
}

consola.success(`${filesTouched} files, ${edits.length} content entries verified`)

// 671,020 diffs cannot be read. A bulk rewrite reviews as the count, the
// assertion that nothing else changed, and a sample wide enough to recognise —
// which means one entry per distinct line, not the first 12 entries of
// whichever line happened to carry the most assets.
const seenLines = new Set<string>()
const sampleEdits = []
for (const edit of edits) {
  if (seenLines.has(edit.lineId)) continue
  seenLines.add(edit.lineId)
  sampleEdits.push(edit)
  if (sampleEdits.length === 12) break
}
const sample: Block[] = sampleEdits.map((edit) => ({
  kind: 'text' as const,
  id: `${edit.lineId} · ${edit.asset}`,
  note: 'content entry',
  from: edit.before,
  to: edit.after,
}))
const article: Article = {
  title: `${filesTouched} files, ${edits.length} content entries`,
  subtitle: manifest.issue
    ? `shabados/shabados#${manifest.issue} — proposed, not applied`
    : 'proposed, not applied',
  blocks: sample,
}

if (!apply) {
  await writeFile('./review.html', page('Proposed change', manifest.description, [article]))
  consola.success('./review.html — open this before applying (first 12 of 671,020 entries)')
  consola.info('Dry run. Re-run with --apply to write and commit.')
  process.exit(0)
}

// A data: commit must contain corpus files and nothing else. `git commit` sweeps
// in whatever is already staged, so applying onto a dirty tree would quietly put
// unrelated work into a corpus commit. Refuse rather than untangle it afterwards.
const status = (await $`git status --porcelain`.text()).trim()
if (status) {
  consola.error('Working tree is not clean. Commit or stash first.')
  process.exit(1)
}

for (const filePath of filePaths) {
  const before = await readFile(filePath, 'utf-8')
  if (!RULE.test(before)) continue
  RULE.lastIndex = 0
  await writeFile(filePath, before.replace(RULE, 'assets = ["$1"]'))
}

// One field, one shape change, everywhere — so it lands as one commit. Committing
// 141,264 files one at a time would describe the same rule 141,264 times.
await $`git add ${'./collections/lines'}`.quiet()
const message =
  `data: asset becomes assets, a list, on every content entry\n\n${manifest.why}\n\n` +
  `${filesTouched} files, ${edits.length} content entries. Reversible by collapsing ` +
  `each single-element assets list back to asset.\n\nManifest: database/migrations/${path.split('/').at(-1)}`
await $`git commit -m ${message}`.quiet()
consola.success(`applied and committed — ${filesTouched} files, ${edits.length} content entries`)
