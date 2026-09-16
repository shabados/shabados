import { $ } from 'bun'
import { writeFile } from 'node:fs/promises'
import { appendFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'

import { loadCorpus } from './lib/corpus'
import {
  groupFilePath,
  readGroupLines,
  readManifest,
  readSectionGroups,
  writeGroupLines,
  writeSectionGroups,
} from './lib/manifest'

/**
 * Applies a migration manifest, one commit per move.
 *
 *   bun scripts/migrate.ts migrations/0001-stranded-headings.toml
 *     Verifies every move and writes the before/after rendering. Changes nothing.
 *
 *   bun scripts/migrate.ts migrations/0001-stranded-headings.toml --apply
 *     Applies each move and commits it on its own, so each commit's diff is one
 *     line moving between two groups.
 *
 * Verification is total and happens first: a half-applied migration leaves the
 * corpus in a state nobody described, and these files are the only record of
 * where a line belongs.
 */

const [path] = process.argv.slice(2).filter((argument) => !argument.startsWith('--'))
const apply = process.argv.includes('--apply')

if (!path) {
  consola.error('usage: bun scripts/migrate.ts <manifest.toml> [--apply]')
  process.exit(1)
}

const manifest = await readManifest(path)
const corpus = await loadCorpus('SGGS')

// --- verify -----------------------------------------------------------------

for (const move of manifest.move) {
  const from = corpus.groups.get(move.from)
  const to = corpus.groups.get(move.to)
  if (!from) throw new Error(`${move.line}: source group ${move.from} does not exist`)
  if (!to) throw new Error(`${move.line}: destination group ${move.to} does not exist`)

  const line = from.lines.find((candidate) => candidate.id === move.line)
  if (!line) throw new Error(`${move.line} is not in ${move.from}`)
  if (to.lines.some((candidate) => candidate.id === move.line)) {
    throw new Error(
      `${move.line} is already in ${move.to} — has this manifest already been applied?`,
    )
  }

  // The manifest's own words are checked against the corpus. Without this the
  // `text` field is decoration, and a reviewer approving it would be approving
  // something the applier never reads.
  if (line.data !== move.text) {
    throw new Error(`${move.line}: manifest says "${move.text}" but the corpus has "${line.data}"`)
  }
}

consola.success(`${manifest.move.length} moves verified`)

// --- render ------------------------------------------------------------------

const affected = [...new Set(manifest.move.flatMap((move) => [move.from, move.to]))]

const after = new Map(affected.map((id) => [id, [...(corpus.groups.get(id)?.lines ?? [])]]))
for (const move of manifest.move) {
  const source = after.get(move.from)
  const destination = after.get(move.to)
  if (!source || !destination) continue

  const [line] = source.splice(
    source.findIndex((candidate) => candidate.id === move.line),
    1,
  )
  if (!line) continue
  if (move.position === 'first') destination.unshift(line)
  else destination.push(line)
}

// The lines this migration takes out of, and puts into, each group — so the
// rendering can point at them instead of leaving the reader to diff two blocks.
const leaving = new Map<string, Set<string>>()
const arriving = new Map<string, Set<string>>()
for (const move of manifest.move) {
  if (!leaving.has(move.from)) leaving.set(move.from, new Set())
  if (!arriving.has(move.to)) arriving.set(move.to, new Set())
  leaving.get(move.from)?.add(move.line)
  arriving.get(move.to)?.add(move.line)
}

const render = (id: string) => {
  const before = corpus.groups.get(id)?.lines ?? []
  const now = after.get(id) ?? []
  const width = Math.max(...before.map((line) => line.id.length), 4)

  const column = (lines: typeof before, marked: Set<string> | undefined, marker: string) =>
    lines
      .map((line) => {
        const mark = marked?.has(line.id) ? `  ${marker}` : ''
        return `  ${line.id.padEnd(width)}  ${line.data}${mark}`
      })
      .join('\n')

  return [
    `### ${id}`,
    '',
    // From/To, not Before/After. The same rendering is read to decide whether a
    // change should happen and to confirm that it did, so it must not assume which.
    '**From**',
    '```',
    column(before, leaving.get(id), '← moves out'),
    '```',
    '',
    '**To**',
    '```',
    column(now, arriving.get(id), '← moves in'),
    '```',
    '',
  ].join('\n')
}

const renderPath = path.replace(/\.toml$/, '.md')
await writeFile(
  renderPath,
  [
    `# ${manifest.description}`,
    '',
    manifest.issue ? `shabados/shabados#${manifest.issue}\n` : '',
    ...manifest.move.map((move) => `- \`${move.line}\` ${move.from} → ${move.to} — ${move.why}`),
    '',
    '## Affected line-groups',
    '',
    ...affected.map(render),
  ].join('\n'),
)
consola.success(`Rendered ${renderPath} — read this before applying`)

if (!apply) {
  consola.info('Dry run. Re-run with --apply to write and commit.')
  process.exit(0)
}

// A db: commit must contain corpus files and nothing else. `git commit` sweeps in
// whatever is already staged, so applying onto a dirty tree would quietly put
// unrelated work into a corpus commit. Refuse rather than untangle it afterwards.
const status = (await $`git status --porcelain`.text()).trim()
if (status) {
  consola.error(
    'Working tree is not clean. Commit or stash first — a db: commit must touch only the corpus.',
  )
  consola.log(status)
  process.exit(1)
}

// --- apply, one commit per move ----------------------------------------------

const migrationName = basename(path, '.toml')
const today = new Date().toISOString().slice(0, 10)

for (const move of manifest.move) {
  const touched: string[] = []
  let emptied = false

  for (const id of [move.from, move.to] as const) {
    const { source, lines } = await readGroupLines(id)
    const next =
      id === move.from
        ? lines.filter((line) => line !== move.line)
        : move.position === 'first'
          ? [move.line, ...lines]
          : [...lines, move.line]

    // A line-group with no lines is not a thing the corpus can hold, so a move
    // that empties its source retires that source — in this same commit, because
    // a corpus between the two states is invalid.
    if (id === move.from && next.length === 0) {
      emptied = true
      const section = corpus.groups.get(id)?.sectionId
      if (!section) throw new Error(`${id} emptied but belongs to no section`)

      const { path: sectionPath, source: sectionSource, groups } = await readSectionGroups(section)
      await writeSectionGroups(
        sectionPath,
        sectionSource,
        groups.filter((group) => group !== id),
      )
      // `git rm` stages the deletion itself. It must not go through `git add` as
      // well — the path no longer exists, and adding it fails.
      await $`git rm --quiet ${groupFilePath(id)}`.quiet()
      await appendFile(
        './retired-ids.toml',
        `\n[[retired]]\nid = "${id}"\nmergedInto = "${move.to}"\nmigration = "${migrationName}"\ndate = "${today}"\n`,
      )
      touched.push(sectionPath, './retired-ids.toml')
      continue
    }

    await writeGroupLines(id, source, next)
    touched.push(groupFilePath(id))
  }

  // Stage exactly what this move touched. `git rm` above has already staged any
  // deletion; `git add` picks up the rest.
  await $`git add ${touched}`.quiet()
  const subject = emptied
    ? `db: merge ${move.from} into ${move.to}`
    : `db: move ${move.line} from ${move.from} to ${move.to}`
  const retirement = emptied
    ? `\n\n${move.from} is now empty and is retired; see retired-ids.toml.`
    : ''
  const message = `${subject}\n\n${move.text}\n\n${move.why}${retirement}\n\nManifest: database/migrations/${basename(path)}`
  // No pathspec. `git commit --only` cannot take one for a file that no longer
  // exists, which a retiring merge always produces. The clean-tree check above is
  // what keeps this honest: nothing but this migration's own writes can be staged.
  await $`git commit -m ${message}`.quiet()
  consola.success(
    `${emptied ? 'merged' : 'moved'}  ${move.from} → ${move.to}  ${move.line}  ${move.text}`,
  )
}

consola.success(`Applied ${manifest.move.length} moves, one commit each.`)
consola.info('Now run `bun run collections:check`. Checks that found fewer than their')
consola.info('`expected` count need that number lowered — commit that as the last commit')
consola.info('of this migration, so the branch ends green.')
