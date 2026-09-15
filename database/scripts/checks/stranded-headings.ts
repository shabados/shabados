import type { Check, Finding } from '../lib/check'
import { nextInSection } from '../lib/corpus'
import { isHeading } from '../lib/gurbani'

/**
 * A line-group's last line should never be a heading — it belongs to the group it
 * heads. Colophons look identical to a matcher and are correctly placed, so they
 * are listed separately rather than proposed as moves.
 *
 * Colophons count what just ended ("seventeen ashtpadis of the First Mehl"). They
 * are recognised by naming a quantity rather than a raag and author, which no rule
 * captures cleanly — so they are pinned by ID. Five, and they do not grow.
 */
const COLOPHONS = new Set(['P6Q', 'CG1', '8M3', 'PRP', 'YLS'])

export const strandedHeadings: Check = {
  name: 'stranded-headings',
  issue: 8,
  expected: 4,
  run: (corpus) => {
    const findings: Finding[] = []

    for (const group of corpus.ordered) {
      if (group.lines.length < 2) continue

      const last = group.lines.at(-1)
      if (!last || !isHeading(last.data)) continue
      if (COLOPHONS.has(group.id)) continue

      const destination = nextInSection(corpus, group)
      if (!destination) continue

      findings.push({
        groups: [group.id, destination.id],
        detail: `${group.id} ends with ${destination.id}'s heading: ${last.data}`,
        move: {
          line: last.id,
          from: group.id,
          to: destination.id,
          position: 'first',
          text: last.data,
        },
      })
    }

    return findings
  },
}
