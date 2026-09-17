import { $ } from 'bun'
import { readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'
import { parse } from 'smol-toml'

import { type Article, type Block, page } from './lib/render'

/**
 * Points a reference at the line it names.
 *
 * A bani, section or line-group lists line IDs. Where one of those IDs is carried
 * by no line, the reference resolves to nothing. This rewrites the reference — it
 * never touches a line's text, and never moves a line between groups.
 *
 *   bun scripts/realign.ts migrations/5-askv-references.toml
 *   bun scripts/realign.ts migrations/5-askv-references.toml --apply
 */

type Manifest = {
  description: string
  issue?: number
  realign: { file: string; from: string; to: string; why: string }[]
}

const [path] = process.argv.slice(2).filter((argument) => !argument.startsWith('--'))
const apply = process.argv.includes('--apply')

if (!path) {
  consola.error('usage: bun scripts/realign.ts <manifest.toml> [--apply]')
  process.exit(1)
}

const manifest = parse(await readFile(path, 'utf-8')) as unknown as Manifest
const blocks: Block[] = []
const linePath = (id: string) => `./collections/lines/${id[0]}/${id.slice(0, 2)}/${id}.toml`
const exists = async (id: string) => Bun.file(linePath(id)).exists()

for (const entry of manifest.realign) {
  const file = `./collections/${entry.file}`
  const source = await readFile(file, 'utf-8')

  // The reference being replaced must be present, and carried by no line. The one
  // replacing it must be carried by a line. Either way round, the manifest is
  // describing something other than what is here.
  if (!source.includes(`"${entry.from}"`))
    throw new Error(`${entry.file}: does not name ${entry.from}`)
  if (await exists(entry.from))
    throw new Error(`${entry.from} is carried by a line — this is not an unresolved reference`)
  if (!(await exists(entry.to))) throw new Error(`${entry.to} is carried by no line`)

  const occurrences = source.split(`"${entry.from}"`).length - 1
  if (occurrences !== 1)
    throw new Error(`${entry.file}: names ${entry.from} ${occurrences} times, expected once`)

  // Where the reference sits, so the surrounding IDs can be checked.
  const ids = [...source.matchAll(/"([^"]+)"/g)].map((m) => m[1] as string)
  const at = ids.indexOf(entry.from)
  const near = ids.slice(Math.max(0, at - 2), at + 3)
  blocks.push({
    kind: 'list',
    id: entry.file,
    note: `${entry.from} → ${entry.to}`,
    items: [
      `in context: ${near.join(', ')}`,
      `${entry.from} is carried by no line`,
      `${entry.to} is carried by a line`,
      entry.why,
    ],
  })
  consola.success(`${entry.file}: ${entry.from} → ${entry.to}`)

  if (!apply) continue

  const status = (await $`git status --porcelain`.text()).trim()
  if (status) {
    consola.error('Working tree is not clean. Commit or stash first.')
    process.exit(1)
  }

  await writeFile(file, source.replace(`"${entry.from}"`, `"${entry.to}"`))
  const message =
    `data: point ${entry.file} at ${entry.to}\n\n${entry.why}\n\n` +
    `Manifest: database/migrations/${basename(path)}`
  await $`git commit --only -m ${message} -- ${file}`.quiet()
  consola.success(`committed`)
}

if (!apply) {
  await writeFile(
    './review.html',
    page('Proposed change', manifest.description, [
      { title: manifest.description, subtitle: 'proposed, not applied', blocks },
    ]),
  )
  consola.success('./review.html — open this before applying')
  consola.info('Dry run. Re-run with --apply to write and commit.')
}
