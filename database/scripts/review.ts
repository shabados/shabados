import { $ } from 'bun'
import { writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

import consola from 'consola'

import { loadCorpus } from './lib/corpus'

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

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** The ID list a collection file held at a given commit, or null if absent. */
const idsAt = async (sha: string, file: string, key: 'lines' | 'lineGroups') => {
  const body = await $`git show ${`${sha}:${file}`}`.text().catch(() => '')
  if (!body) return null
  const m = new RegExp(`^${key} = \\[(.*)\\]$`, 'm').exec(body)
  return m?.[1] ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1] as string) : []
}

const sections: string[] = []

for (const sha of commits.reverse()) {
  const subject = (await $`git log -1 --format=%s ${sha}`.text()).trim()
  const files = (await $`git show --name-only --format= ${sha}`.text())
    .trim()
    .split('\n')
    .filter(Boolean)
  const blocks: string[] = []

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
      const column = (ids: string[] | null) =>
        ids === null
          ? '<p class="gone">line-group retired</p>'
          : `<table>${ids
              .map(
                (lineId) =>
                  `<tr class="${changed.has(lineId) ? 'hit' : ''}"><td class="i">${lineId}</td><td class="gm">${esc(text.get(lineId) ?? '—')}</td></tr>`,
              )
              .join('')}</table>`

      blocks.push(
        `<section><h3>${id}<span class="n">${before?.length ?? 0} → ${after?.length ?? 0} lines</span></h3>` +
          `<div class="pair"><div><h4>From</h4>${column(before)}</div><div><h4>To</h4>${column(after)}</div></div></section>`,
      )
    } else if (file.includes('sections/')) {
      const before = (await idsAt(`${sha}~1`, file, 'lineGroups')) ?? []
      const after = (await idsAt(sha, file, 'lineGroups')) ?? []
      const removed = before.filter((x) => !after.includes(x))
      const added = after.filter((x) => !before.includes(x))
      const name = sectionName.get(id) ?? id
      const parts = [
        ...removed.map((x) => `<li><b>${x}</b> no longer listed</li>`),
        ...added.map((x) => `<li><b>${x}</b> now listed</li>`),
      ]
      blocks.push(
        `<section><h3>${name}<span class="n">section ${id}</span></h3><ul>${parts.join('')}</ul></section>`,
      )
    } else if (file.includes('lines/')) {
      const diff = await $`git show --format= ${sha} -- ${`:/${file}`}`.text()
      const from = /^-data = "(.*)"$/m.exec(diff)?.[1]
      const to = /^\+data = "(.*)"$/m.exec(diff)?.[1]
      if (from === undefined || to === undefined) continue
      blocks.push(
        `<section><h3>${id}<span class="n">line text</span></h3>` +
          `<table><tr><td class="i">from</td><td class="gm">${esc(from)}</td></tr>` +
          `<tr><td class="i">to</td><td class="gm">${esc(to)}</td></tr></table></section>`,
      )
    } else if (file.includes('banis/') || file.includes('retired-ids')) {
      const diff = await $`git show --format= ${sha} -- ${`:/${file}`}`.text()
      const rows = diff
        .split('\n')
        .filter((r) => /^[-+]/.test(r) && !/^[-+][-+]/.test(r))
        .map((r) => `<tr><td class="i ${r.startsWith('-') ? 'del' : 'add'}">${esc(r)}</td></tr>`)
      if (rows.length)
        blocks.push(`<section><h3>${basename(file)}</h3><table>${rows.join('')}</table></section>`)
    }
  }

  if (blocks.length)
    sections.push(
      `<article><h2>${esc(subject)}</h2><p class="sha">${sha.slice(0, 10)}</p>${blocks.join('')}</article>`,
    )
}

await writeFile(
  out,
  `<!doctype html><meta charset="utf-8"><title>Corpus review</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
 /* The project's own face, as apps/web/src/global.css declares it. local() first so
    an installed copy is used; the repo's woff2 otherwise, resolved relative to
    database/review.html. */
 @font-face{
   font-family:"Sant Lipi";
   src:local("Sant Lipi"),
       url("../apps/web/public/fonts/SantLipi-VF.woff2") format("woff2-variations"),
       url("../apps/web/public/fonts/SantLipi-VF.woff2") format("woff2");
   font-weight:100 900;
   font-display:swap;
 }
 body{font:15px/1.6 system-ui,sans-serif;max-width:78rem;margin:2rem auto;padding:0 1rem;color:#23211f;background:#f4f1ee}
 h1{font-size:1.5rem}
 article{margin:2.5rem 0;padding-top:1rem;border-top:2px solid #23211f}
 h2{font-size:1.1rem;margin:0}
 .sha{font-family:"IBM Plex Mono",monospace;font-size:.75rem;color:#575552;margin:.1rem 0 1rem}
 section{margin:1.2rem 0}
 h3{font-size:.95rem;margin:0 0 .4rem;display:flex;gap:.6rem;align-items:baseline}
 .n{font-family:"IBM Plex Mono",monospace;font-size:.72rem;color:#575552;font-weight:400}
 h4{font-family:"IBM Plex Mono",monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:#575552;margin:0 0 .3rem}
 .pair{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
 @media(max-width:60rem){.pair{grid-template-columns:1fr}}
 table{border-collapse:collapse;width:100%;background:#fff;border:1px solid #d8d2cb}
 td{padding:.3rem .5rem;border-bottom:1px solid #f0ece7;vertical-align:baseline}
 tr.hit td{background:#e7f2e2;font-weight:600}
 .gm{font-family:"Sant Lipi",serif;font-size:1.05rem;line-height:1.9}
 .i{font-family:"IBM Plex Mono",monospace;font-size:.75rem;color:#575552;white-space:nowrap}
 .add{color:#13662b}.del{color:#8a472a}
 .gone{font-style:italic;color:#8a472a;background:#fff;border:1px solid #d8d2cb;padding:.5rem}
 ul{margin:.2rem 0;padding-left:1.2rem}
 @media(prefers-color-scheme:dark){body{background:#000;color:#fff}article{border-color:#fff}table,.gone{background:#1c1c1c;border-color:#3a3a3a}td{border-color:#2a2a2a}tr.hit td{background:#1c2718}.i,.n,.sha,h4{color:#bebebe}.add{color:#c4eda8}.del{color:#ffd493}}
</style>
<h1>Corpus review — ${esc(target)}</h1><p>${commits.length} commits.</p>${sections.join('')}`,
)
consola.success(`${out} — ${sections.length} of ${commits.length} commits touch the corpus`)
