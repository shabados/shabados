import { $ } from 'bun'
import { writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'

import { loadCorpus } from './lib/corpus'

/**
 * Renders what a range of commits did to the corpus, as a page.
 *
 *   bun run review                  everything not yet pushed
 *   bun scripts/review.ts <sha>     one commit
 *   bun scripts/review.ts main..HEAD
 *
 * HTML rather than terminal output: Gurmukhi needs a real font, and a monospace
 * column misaligns it. A raw diff is no better — `lines = [ "NEKY", … ]` is accurate
 * and says nothing about whether the change is right.
 *
 * Three kinds of change are read: a line-group's membership, a line's text, and a
 * reference in a bani or section.
 */

const range = process.argv[2] ?? '@{upstream}..HEAD'
const target = range.includes('..') ? range : `${range}~1..${range}`
const out = process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? './review.html'

const commits = (await $`git log --format=%H ${target}`.text()).trim().split('\n').filter(Boolean)
if (commits.length === 0) {
  consola.info(`No commits in ${target}`)
  process.exit(0)
}

// Current text, for resolving IDs. Corpus-wide: a change may touch any source.
const text = new Map<string, string>()
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
    for (const group of corpus.groups.values()) {
      for (const line of group.lines) text.set(line.id, line.data)
    }
  } catch {
    // a source that cannot be loaded is not one this range touched
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const link = (id: string) => `<a href="https://shabados.com/g/${id}">${id}</a>`
const LINES = /^([-+])lines = \[(.*)\]$/
const GROUPS = /^([-+])lineGroups = \[(.*)\]$/

const sections: string[] = []

for (const sha of commits.reverse()) {
  const subject = (await $`git log -1 --format=%s ${sha}`.text()).trim()
  const files = (await $`git show --name-only --format= ${sha}`.text())
    .trim()
    .split('\n')
    .filter(Boolean)
  const rows: string[] = []

  for (const file of files) {
    const id = basename(file, '.toml')
    const diff = await $`git show --format= ${sha} -- ${`:/${file}`}`.text()

    if (file.includes('line-groups/')) {
      const before: string[] = []
      const after: string[] = []
      for (const row of diff.split('\n')) {
        const m = LINES.exec(row)
        if (!m?.[2]) continue
        const ids = [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1] as string)
        ;(m[1] === '-' ? before : after).push(...ids)
      }
      if (!before.length && !after.length) {
        rows.push(`<tr><td>${id}</td><td colspan="3"><em>line-group retired</em></td></tr>`)
        continue
      }
      for (const lineId of after.filter((x) => !before.includes(x))) {
        rows.push(
          `<tr><td>${link(id)}</td><td class="i">${lineId}</td><td class="add">joins</td><td class="gm">${esc(text.get(lineId) ?? '')}</td></tr>`,
        )
      }
      for (const lineId of before.filter((x) => !after.includes(x))) {
        rows.push(
          `<tr><td>${link(id)}</td><td class="i">${lineId}</td><td class="del">leaves</td><td class="gm">${esc(text.get(lineId) ?? '')}</td></tr>`,
        )
      }
    } else if (file.includes('lines/')) {
      for (const row of diff.split('\n')) {
        if (!/^[-+]data = /.test(row)) continue
        const kind = row.startsWith('-') ? 'del' : 'add'
        rows.push(
          `<tr><td class="i">${id}</td><td colspan="2" class="${kind}">${kind === 'del' ? 'from' : 'to'}</td><td class="gm">${esc(row.slice(8).replace(/^"|"$/g, ''))}</td></tr>`,
        )
      }
    } else {
      for (const row of diff.split('\n')) {
        const m = GROUPS.exec(row)
        if (m) {
          rows.push(
            `<tr><td>${id}</td><td colspan="3"><em>section membership changed</em></td></tr>`,
          )
          break
        }
        if (/^[-+]lines = /.test(row) || /^[+-]\s*"/.test(row)) {
          rows.push(
            `<tr><td>${id}</td><td colspan="2" class="${row.startsWith('-') ? 'del' : 'add'}">${row.startsWith('-') ? 'from' : 'to'}</td><td class="i">${esc(row.slice(1).trim()).slice(0, 120)}</td></tr>`,
          )
        }
      }
    }
  }

  if (rows.length === 0) continue
  sections.push(
    `<h2>${esc(subject)}</h2><p class="sha">${sha.slice(0, 10)}</p><table>${rows.join('')}</table>`,
  )
}

await writeFile(
  out,
  `<!doctype html><meta charset="utf-8"><title>Corpus review</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Gurmukhi&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
 body{font:15px/1.6 system-ui,sans-serif;max-width:60rem;margin:2rem auto;padding:0 1rem;color:#23211f;background:#f4f1ee}
 h1{font-size:1.5rem} h2{font-size:1.05rem;margin:2rem 0 .2rem}
 .sha{font-family:"IBM Plex Mono",monospace;font-size:.75rem;color:#575552;margin:0 0 .5rem}
 table{border-collapse:collapse;width:100%;background:#fff;border:1px solid #d8d2cb}
 td{padding:.4rem .6rem;border-bottom:1px solid #eee;vertical-align:baseline}
 .gm{font-family:"Noto Serif Gurmukhi",serif;font-size:1.05rem}
 .i{font-family:"IBM Plex Mono",monospace;font-size:.8rem;color:#575552}
 .add{color:#13662b;font-weight:600} .del{color:#8a472a;font-weight:600}
 a{color:#2381e0;text-decoration:none} a:hover{text-decoration:underline}
 @media(prefers-color-scheme:dark){body{background:#000;color:#fff}table{background:#1c1c1c;border-color:#3a3a3a}td{border-color:#2a2a2a}.i,.sha{color:#bebebe}.add{color:#c4eda8}.del{color:#ffd493}a{color:#3c96f7}}
</style>
<h1>Corpus review — ${esc(target)}</h1>
<p>${commits.length} commits.</p>
${sections.join('')}`,
)
consola.success(`${out} — ${commits.length} commits, ${sections.length} touching the corpus`)
