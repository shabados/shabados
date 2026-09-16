import { $ } from 'bun'
import { readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'
import { parse } from 'smol-toml'

import { loadCorpus } from './lib/corpus'
import { type Article, type Block, page } from './lib/render'

/**
 * Applies a character normalisation across one source's lines.
 *
 * Separate from `migrate.ts` on purpose. A migration moves a line ID between
 * line-groups and never touches text, so its diff is a handful of 3-character
 * files. This rewrites line text, so its diff is thousands of 4-character files —
 * a different thing to review, and worth a different verb.
 *
 *   bun scripts/normalise.ts migrations/4-kabit-dandi.toml
 *   bun scripts/normalise.ts migrations/4-kabit-dandi.toml --apply
 *
 * The change is one substitution, so it lands as one commit. Committing 2,756
 * files one at a time would describe the same rule 2,756 times.
 */

type Manifest = {
  description: string
  issue?: number
  substitute: { source: string; from: string; to: string; why: string }[]
}

const [path] = process.argv.slice(2).filter((argument) => !argument.startsWith('--'))
const apply = process.argv.includes('--apply')

if (!path) {
  consola.error('usage: bun scripts/normalise.ts <manifest.toml> [--apply]')
  process.exit(1)
}

const manifest = parse(await readFile(path, 'utf-8')) as unknown as Manifest
const articles: Article[] = []

for (const rule of manifest.substitute) {
  const corpus = await loadCorpus(rule.source)

  // Every line the rule touches, and the exact edit it makes to each.
  const edits: { id: string; before: string; after: string }[] = []
  for (const group of corpus.ordered) {
    for (const line of group.lines) {
      if (!line.data.includes(rule.from)) continue
      edits.push({
        id: line.id,
        before: line.data,
        after: line.data.replaceAll(rule.from, rule.to),
      })
    }
  }

  // The only difference between before and after must be this substitution. If the
  // two disagree once `from` is mapped to `to`, something else changed.
  for (const edit of edits) {
    if (edit.before.replaceAll(rule.from, rule.to) !== edit.after) {
      throw new Error(`${edit.id}: the edit is not the stated substitution`)
    }
  }

  const occurrences = edits.reduce(
    (total, edit) => total + edit.before.split(rule.from).length - 1,
    0,
  )
  consola.info(`${rule.source}: ${edits.length} lines, ${occurrences} occurrences`)

  // How many occurrences a line carries. One is an ordinary line ending; two or
  // three is a numbered ending, the single-dandi form of ॥N॥N॥. More than that is
  // worth looking at before applying anything.
  const perLine = new Map<number, number>()
  for (const edit of edits) {
    const n = edit.before.split(rule.from).length - 1
    perLine.set(n, (perLine.get(n) ?? 0) + 1)
  }
  const distribution = [...perLine]
    .sort((a, b) => a[0] - b[0])
    .map(([n, count]) => `${n}×:${count}`)
    .join('  ')
  consola.info(`  per line — ${distribution}`)

  const unusual = edits.filter((edit) => edit.before.split(rule.from).length - 1 > 4)
  if (unusual.length) {
    consola.warn(`  ${unusual.length} lines carry more than four; review before applying`)
    for (const edit of unusual.slice(0, 10)) consola.warn(`    ${edit.id}`)
  }

  // 12,000 diffs cannot be read. A bulk substitution reviews as the count, the
  // assertion that nothing else changed, and a sample wide enough to recognise.
  const sample: Block[] = edits.slice(0, 12).map((edit) => ({
    kind: 'text' as const,
    id: edit.id,
    note: 'line text',
    from: edit.before,
    to: edit.after,
  }))
  articles.push({
    title: `${rule.source} — ${edits.length} lines, ${occurrences} occurrences`,
    subtitle: rule.why,
    blocks: sample,
  })

  if (!apply) continue

  const status = (await $`git status --porcelain`.text()).trim()
  if (status) {
    consola.error('Working tree is not clean. Commit or stash first.')
    process.exit(1)
  }

  for (const edit of edits) {
    const file = `./collections/lines/${edit.id[0]}/${edit.id.slice(0, 2)}/${edit.id}.toml`
    const source = await readFile(file, 'utf-8')
    // Only the primary content is rewritten; translations and notes keep their own
    // punctuation, which is a separate question from the source text's.
    const rewritten = source.replace(
      /(type = "primary"\ndata = ")([^"]*)(")/,
      (_, open: string, data: string, close: string) =>
        `${open}${data.replaceAll(rule.from, rule.to)}${close}`,
    )
    if (rewritten !== source) await writeFile(file, rewritten)
  }

  await $`git add ${'./collections/lines'}`.quiet()
  const message =
    `db: normalise ${rule.source} line endings\n\n${rule.why}\n\n` +
    `${edits.length} lines, ${occurrences} occurrences. Reversible by the inverse ` +
    `substitution.\n\nManifest: database/migrations/${basename(path)}`
  await $`git commit -m ${message}`.quiet()
  consola.success(`${rule.source}: applied and committed`)
}

if (!apply) {
  await writeFile('./review.html', page('Proposed change', manifest.description, articles))
  consola.success('./review.html — open this before applying (first 12 lines of each source)')
  consola.info('Dry run. Re-run with --apply to write and commit.')
}
