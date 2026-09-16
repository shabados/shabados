import { $ } from 'bun'
import { writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'

import { loadCorpus } from './lib/corpus'
import { type Article, type Block, page } from './lib/render'

/**
 * Renders what a range of commits did to the corpus, as a page.
 *
 *   bun run review                  everything not yet pushed
 *   bun scripts/review.ts <sha>
 *   bun scripts/review.ts main..HEAD
 *
 * Shows each affected line-group whole, before and after, because whether a move is
 * right depends on what surrounds it — a list of lines that joined and left says
 * nothing a reader can judge.
 */

const range = process.argv[2] ?? '@{upstream}..HEAD'
const target = range.includes('..') ? range : `${range}~1..${range}`
const out = process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? './review.html'

const commits = (await $`git log --format=%H ${target}`.text()).trim().split('\n').filter(Boolean)
if (commits.length === 0) {
  consola.info(`No commits in ${target}`)
  process.exit(0)
}

// Line text and section names, for resolving IDs. A move never changes a line's
// text, so the current corpus is the right source for both sides.
const text = new Map<string, string>()
const sectionName = new Map<string, string>()
for (const source of [
  'SGGS',
  'SDGR',
  'KSBG',
  'VBGJ',
  'ARDS',
  'GJNL',
  'GZNL',
  'JBNL',
  'SRBL',
  'ZNNL',
]) {
  try {
    const corpus = await loadCorpus(source)
    for (const group of corpus.groups.values())
      for (const line of group.lines) text.set(line.id, line.data)
    for (const section of corpus.sections.values()) sectionName.set(section.id, section.name)
  } catch {}
}

/** The ID list a collection file held at a given commit, or null if the file was absent. */
const idsAt = async (
  sha: string,
  file: string,
  key: 'lines' | 'lineGroups',
): Promise<string[] | null> => {
  const body = await $`git show ${`${sha}:${file}`}`.text().catch(() => '')
  if (!body) return null
  const match = new RegExp(`^${key} = \\[(.*)\\]$`, 'm').exec(body)
  return match?.[1] ? [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1] as string) : []
}

const articles: Article[] = []

for (const sha of commits.reverse()) {
  const subject = (await $`git log -1 --format=%s ${sha}`.text()).trim()
  const files = (await $`git show --name-only --format= ${sha}`.text())
    .trim()
    .split('\n')
    .filter(Boolean)
  const blocks: Block[] = []

  for (const file of files) {
    const id = basename(file, '.toml')

    if (file.includes('line-groups/')) {
      const before = await idsAt(`${sha}~1`, file, 'lines')
      const after = await idsAt(sha, file, 'lines')
      if (before === null && after === null) continue

      const changed = new Set([
        ...(before ?? []).filter((x) => !(after ?? []).includes(x)),
        ...(after ?? []).filter((x) => !(before ?? []).includes(x)),
      ])
      const rows = (ids: string[] | null) =>
        ids === null
          ? null
          : ids.map((lineId) => ({
              id: lineId,
              text: text.get(lineId) ?? '—',
              changed: changed.has(lineId),
            }))

      blocks.push({
        kind: 'pair',
        id,
        note: `${before?.length ?? 0} → ${after?.length ?? 0} lines`,
        from: rows(before),
        to: rows(after),
      })
    } else if (file.includes('sections/')) {
      const wasListed: string[] = (await idsAt(`${sha}~1`, file, 'lineGroups')) ?? []
      const nowListed: string[] = (await idsAt(sha, file, 'lineGroups')) ?? []
      const removed = wasListed.filter((groupId) => !nowListed.includes(groupId))
      const added = nowListed.filter((groupId) => !wasListed.includes(groupId))
      const name = sectionName.get(id) ?? id
      blocks.push({
        kind: 'list',
        id: name,
        note: `section ${id}`,
        items: [
          ...removed.map((groupId) => `${groupId} no longer listed`),
          ...added.map((groupId) => `${groupId} now listed`),
        ],
      })
    } else if (file.includes('lines/')) {
      const diff = await $`git show --format= ${sha} -- ${`:/${file}`}`.text()
      const from = /^-data = "(.*)"$/m.exec(diff)?.[1]
      const to = /^\+data = "(.*)"$/m.exec(diff)?.[1]
      if (from === undefined || to === undefined) continue
      blocks.push({ kind: 'text', id, note: 'line text', from, to })
    } else if (file.includes('banis/') || file.includes('retired-ids')) {
      const diff = await $`git show --format= ${sha} -- ${`:/${file}`}`.text()
      const items = diff
        .split('\n')
        .filter((r) => /^[-+]/.test(r) && !/^[-+][-+]/.test(r))
        .map((r) => r.trim())
      if (items.length) blocks.push({ kind: 'list', id: basename(file), note: '', items })
    }
  }

  if (blocks.length) articles.push({ title: subject, subtitle: sha.slice(0, 10), blocks })
}

await writeFile(out, page('Corpus review', `${target} — ${commits.length} commits`, articles))
consola.success(`${out} — ${articles.length} of ${commits.length} commits touch the corpus`)
