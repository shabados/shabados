/**
 * The review page, shared by every tool that changes the corpus.
 *
 * One surface for both halves of a review: what a migration proposes, and what it
 * did. They are the same question asked twice, so they should look the same.
 *
 * Gurmukhi renders in Sant Lipi — the project's own face, and what the apps show —
 * so a review sees what a reader will see.
 */

export type Row = { id: string; text: string; changed?: boolean }

export type Block =
  | { kind: 'pair'; id: string; note: string; from: Row[] | null; to: Row[] | null }
  | { kind: 'list'; id: string; note: string; items: string[] }
  | { kind: 'text'; id: string; note: string; from: string; to: string }

export type Article = { title: string; subtitle?: string; blocks: Block[] }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Side decides the colour: a changed line is leaving on the left, arriving on the right. */
const table = (rows: Row[] | null, side: 'from' | 'to') =>
  rows === null
    ? '<p class="gone">line-group retired</p>'
    : `<table>${rows
        .map(
          (r) =>
            `<tr class="${r.changed ? (side === 'from' ? 'out' : 'in') : ''}"><td class="i">${esc(r.id)}</td><td class="gm">${esc(r.text)}</td></tr>`,
        )
        .join('')}</table>`

const block = (b: Block) => {
  const head = `<h3>${esc(b.id)}<span class="n">${esc(b.note)}</span></h3>`
  if (b.kind === 'pair') {
    return `<section>${head}<div class="pair"><div><h4>From</h4>${table(b.from, 'from')}</div><div><h4>To</h4>${table(b.to, 'to')}</div></div></section>`
  }
  if (b.kind === 'list') {
    return `<section>${head}<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></section>`
  }
  return `<section>${head}<div class="pair"><div><h4>From</h4><table><tr class="out"><td class="gm">${esc(b.from)}</td></tr></table></div><div><h4>To</h4><table><tr class="in"><td class="gm">${esc(b.to)}</td></tr></table></div></div></section>`
}

export const page = (title: string, lead: string, articles: Article[]) => `<!doctype html>
<meta charset="utf-8"><title>${esc(title)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
 /* As apps/web/src/global.css declares it. local() first, so an installed copy
    wins; the repo's woff2 otherwise, relative to database/. */
 @font-face{font-family:"Sant Lipi";src:local("Sant Lipi"),
   url("../apps/web/public/fonts/SantLipi-VF.woff2") format("woff2-variations"),
   url("../apps/web/public/fonts/SantLipi-VF.woff2") format("woff2");
   font-weight:100 900;font-display:swap}
 body{font:15px/1.6 system-ui,sans-serif;max-width:78rem;margin:2rem auto;padding:0 1rem;color:#23211f;background:#f4f1ee}
 h1{font-size:1.5rem;margin-bottom:.2rem}
 .lead{color:#575552;margin:0 0 1.5rem}
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
 tr.out td{background:#f6e4e4;font-weight:600}
 tr.in td{background:#e7f2e2;font-weight:600}
 .gm{font-family:"Sant Lipi",serif;font-size:1.05rem;line-height:1.9}
 .i{font-family:"IBM Plex Mono",monospace;font-size:.75rem;color:#575552;white-space:nowrap}
 .gone{font-style:italic;color:#8a472a;background:#fff;border:1px solid #d8d2cb;padding:.5rem}
 ul{margin:.2rem 0;padding-left:1.2rem}
 @media(prefers-color-scheme:dark){body{background:#000;color:#fff}article{border-color:#fff}
   table,.gone{background:#1c1c1c;border-color:#3a3a3a}td{border-color:#2a2a2a}
   tr.out td{background:#2e1b1b}tr.in td{background:#1c2718}.i,.n,.sha,h4,.lead{color:#bebebe}}
</style>
<h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>
${articles
  .map(
    (a) =>
      `<article><h2>${esc(a.title)}</h2>${a.subtitle ? `<p class="sha">${esc(a.subtitle)}</p>` : ''}${a.blocks.map(block).join('')}</article>`,
  )
  .join('')}`
