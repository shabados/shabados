import { $ } from 'bun'

import consola from 'consola'

import { loadCorpus } from './lib/corpus'

/**
 * Shows what a range of commits did to the corpus, with line IDs resolved to the
 * Gurmukhi they name.
 *
 *   bun scripts/review.ts                    everything not yet pushed
 *   bun scripts/review.ts main..HEAD         an explicit range
 *   bun scripts/review.ts b842d70a7a         a single commit
 *
 * A raw diff of `lines = [ "NEKY", "8LK7" ]` is accurate and unreadable; whether a
 * change is correct depends entirely on text the diff does not contain.
 */

const range = process.argv[2] ?? '@{upstream}..HEAD'
const target = range.includes('..') ? range : `${range}~1..${range}`

const commits = (await $`git log --format=%H ${target}`.text()).trim().split('\n').filter(Boolean)
if (commits.length === 0) {
  consola.info(`No commits in ${target}`)
  process.exit(0)
}

// The corpus as it stands now, for resolving IDs. A line's text is not what these
// commits change — only which group holds it — so current text is the right text.
const corpus = await loadCorpus('SGGS')
const text = new Map<string, string>()
for (const group of corpus.groups.values()) {
  for (const line of group.lines) text.set(line.id, line.data)
}

const LINES = /^[-+]lines = \[(.*)\]$/

for (const sha of commits.reverse()) {
  const subject = (await $`git log -1 --format=%s ${sha}`.text()).trim()
  const files = (await $`git show --name-only --format= ${sha}`.text())
    .trim()
    .split('\n')
    .filter((file) => file.includes('line-groups/'))
  if (files.length === 0) continue

  consola.log(`\n\x1b[1m${sha.slice(0, 10)}  ${subject}\x1b[0m`)

  for (const file of files) {
    const id = file.split('/').pop()?.replace('.toml', '') ?? file
    // `:/` anchors the pathspec at the repo root: git log reports paths from there,
    // but this runs from database/, so a bare path matches nothing.
    const diff = await $`git show --format= ${sha} -- ${`:/${file}`}`.text()

    const before: string[] = []
    const after: string[] = []
    for (const row of diff.split('\n')) {
      const match = LINES.exec(row)
      if (!match?.[1]) continue
      const ids = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1] as string)
      if (row.startsWith('-')) before.push(...ids)
      else after.push(...ids)
    }

    if (before.length === 0 && after.length === 0) {
      consola.log(`  \x1b[2m${id}: removed\x1b[0m`)
      continue
    }

    const gained = after.filter((lineId) => !before.includes(lineId))
    const lost = before.filter((lineId) => !after.includes(lineId))

    consola.log(`  \x1b[36m${id}\x1b[0m  ${before.length} → ${after.length} lines`)
    for (const lineId of gained)
      consola.log(`    \x1b[32m+ ${lineId}\x1b[0m  ${text.get(lineId) ?? '(unknown)'}`)
    for (const lineId of lost)
      consola.log(`    \x1b[31m- ${lineId}\x1b[0m  ${text.get(lineId) ?? '(gone from the corpus)'}`)
  }
}
