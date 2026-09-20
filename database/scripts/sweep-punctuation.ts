import { Glob } from 'bun'
import { readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'
import { parse } from 'smol-toml'

import type { Lines } from '#collections-types/lines'

import { VISHRAAMS } from './lib/gurbani'
import { type Article, type Block, page, type Row } from './lib/render'

/**
 * Two punctuation sweeps over every content entry, primary and not.
 *
 *   A — two consecutive words carrying the same vishraam marker.
 *   B — a marker immediately preceded by a space.
 *
 * A survey, not a migration: it proposes no edit and writes no file but the
 * review. Whether A is a fault is a reading question — no requirement states
 * that consecutive words cannot share a pause — so this reports and stops.
 */

const MARKERS = Object.values(VISHRAAMS)
const NAME = { ';': 'heavy', ',': 'medium', '.': 'light' } as const

type Hit = {
  id: string
  group: string
  type: string
  lang?: string
  assets: string
  data: string
  marker: string
  n: number
}

const groupOf = new Map<string, string>()
for await (const p of new Glob('./collections/line-groups/**/*.toml').scan()) {
  const g = parse(await readFile(p, 'utf-8')) as { lines?: string[] }
  for (const l of g.lines ?? []) groupOf.set(l, basename(p, '.toml'))
}

const adjacent: Hit[] = []
const spaced: Hit[] = []
let entries = 0

for await (const p of new Glob('./collections/lines/**/*.toml').scan()) {
  const id = basename(p, '.toml')
  const { content } = parse(await readFile(p, 'utf-8')) as unknown as Lines
  for (const e of content) {
    entries++
    const d = e.data
    const base = {
      id,
      group: groupOf.get(id) ?? '—',
      type: e.type,
      // `language` is absent on primary entries, present on every other type.
      lang: 'language' in e ? e.language : undefined,
      assets: e.assets.join('+'),
      data: d,
    }

    const words = d.split(/\s+/).filter(Boolean)
    const perMarker = new Map<string, number>()
    for (let i = 0; i + 1 < words.length; i++) {
      const m = MARKERS.find((k) => words[i]!.endsWith(k) && words[i + 1]!.endsWith(k))
      if (m) perMarker.set(m, (perMarker.get(m) ?? 0) + 1)
    }
    for (const [marker, n] of perMarker) adjacent.push({ ...base, marker, n })

    const chars = [...d]
    const perSpaced = new Map<string, number>()
    for (const [i, ch] of chars.entries()) {
      // An ellipsis is one mark, not three: only its first dot is judged.
      if (i === 0 || !MARKERS.includes(ch as never)) continue
      if (chars[i - 1] !== ' ') continue
      perSpaced.set(ch, (perSpaced.get(ch) ?? 0) + 1)
    }
    for (const [marker, n] of perSpaced) spaced.push({ ...base, marker, n })
  }
}

const row = (h: Hit): Row => ({
  id: `${h.id} · ${h.group} · ${h.assets}${h.lang ? '/' + h.lang : ''}${h.n > 1 ? ` · ×${h.n}` : ''}`,
  text: h.data,
})

const blocksFor = (hits: Hit[], label: (h: Hit) => string) => {
  const by = new Map<string, Hit[]>()
  for (const h of hits) {
    const k = label(h)
    if (!by.has(k)) by.set(k, [])
    by.get(k)!.push(h)
  }
  return [...by]
    .sort((a, b) => b[1].length - a[1].length)
    .map(
      ([k, hs]): Block => ({ kind: 'rows', id: k, note: `${hs.length} lines`, rows: hs.map(row) }),
    )
}

const isPrimary = (h: Hit) => h.type === 'primary'
const kind = (h: Hit) => `${h.type}${h.lang ? '/' + h.lang : ''}`

const articles: Article[] = [
  {
    title: 'A — two consecutive words carrying the same marker, primary',
    subtitle: `${adjacent.filter(isPrimary).length} lines — survey only, no edit proposed`,
    blocks: blocksFor(
      adjacent.filter(isPrimary),
      (h) => `${h.marker}  ${NAME[h.marker as keyof typeof NAME]}`,
    ),
  },
  {
    title: 'B — a marker preceded by a space, primary',
    subtitle: `${spaced.filter(isPrimary).length} lines`,
    blocks: blocksFor(
      spaced.filter(isPrimary),
      (h) => `${h.marker}  ${NAME[h.marker as keyof typeof NAME]}`,
    ),
  },
  {
    title: 'B — a marker preceded by a space, translations and notes',
    subtitle: `${spaced.filter((h) => !isPrimary(h)).length} lines`,
    blocks: blocksFor(
      spaced.filter((h) => !isPrimary(h)),
      kind,
    ),
  },
]

const LEAD = `${entries.toLocaleString()} content entries. A lists every primary line where two consecutive words carry the same vishraam marker; B lists every line where a marker follows a space. Sweep A over translations is omitted — prose commas are not vishraams.`

await writeFile('./review.html', page('Punctuation sweep', LEAD, articles))

/**
 * The same survey as markdown, one file per issue. Tables rather than fenced
 * blocks — a fence renders Gurmukhi in the monospace face, which most do not
 * cover. Each group folds, so a long survey stays navigable in one issue.
 */
const cell = (s: string) => s.replace(/\|/g, '\\|')
const link = (h: Hit) =>
  h.group === '—' ? h.group : `[${h.group}](https://shabados.com/g/${h.group})`

const toMarkdown = (heading: string, lead: string, sections: { label: string; hits: Hit[] }[]) => {
  const md = ['## ' + heading, '', lead, '', '| Group | Lines |', '| --- | --- |']
  for (const { label, hits } of sections) md.push(`| \`${cell(label)}\` | ${hits.length} |`)
  md.push('', 'Regenerate with `bun scripts/sweep-punctuation.ts`.', '')
  for (const { label, hits } of sections) {
    md.push(`<details><summary><code>${cell(label)}</code> — ${hits.length} lines</summary>`, '')
    md.push('| Line | Line-group | Asset | Text |', '| --- | --- | --- | --- |')
    for (const h of hits) {
      md.push(
        `| \`${h.id}\` | ${link(h)} | ${cell(h.assets)}${h.lang ? '/' + h.lang : ''}${h.n > 1 ? ` ×${h.n}` : ''} | ${cell(h.data)} |`,
      )
    }
    md.push('', '</details>', '')
  }
  return md.join('\n')
}

const group = (hits: Hit[], label: (h: Hit) => string) => {
  const by = new Map<string, Hit[]>()
  for (const h of hits) {
    const k = label(h)
    if (!by.has(k)) by.set(k, [])
    by.get(k)!.push(h)
  }
  return [...by].sort((a, b) => b[1].length - a[1].length).map(([label, hits]) => ({ label, hits }))
}

const marker = (h: Hit) => `${h.marker}  ${NAME[h.marker as keyof typeof NAME]}`

await writeFile(
  './review-adjacent.md',
  toMarkdown(
    'Consecutive words carrying the same vishraam marker',
    `Every primary line in the corpus where two consecutive words end in the same vishraam marker — ${adjacent.filter(isPrimary).length} lines out of ${entries.toLocaleString()} content entries scanned.\n\nWhether this is a fault is an open reading question. No requirement states that consecutive words cannot share a pause, so this is a survey and proposes no edit. Translations are excluded — a prose comma is not a vishraam.`,
    group(adjacent.filter(isPrimary), marker),
  ),
)

await writeFile(
  './review-spaced.md',
  toMarkdown(
    'Vishraam markers and punctuation preceded by a space',
    `Every content entry, of any type, where a \`.\`, \`,\` or \`;\` immediately follows a space — ${spaced.length} lines out of ${entries.toLocaleString()} scanned.\n\nOne is in \`primary\` and is deliberate: \`TQAC\`'s ellipsis. The rest are translations and notes, where a space before a mark is a typographic slip rather than a reading question.`,
    group(spaced, (h) => (isPrimary(h) ? 'primary' : kind(h))),
  ),
)

consola.success(`./review.html`)
consola.success(`./review-adjacent.md`)
consola.success(`./review-spaced.md`)
consola.info(
  `A primary ${adjacent.filter(isPrimary).length} · B primary ${spaced.filter(isPrimary).length} · B other ${spaced.filter((h) => !isPrimary(h)).length}`,
)
