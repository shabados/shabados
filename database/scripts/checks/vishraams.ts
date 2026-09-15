import type { Check, Finding } from '../lib/check'
import { findVishraamFaults } from '../lib/gurbani'

/**
 * Vishraam markers that break placement. These are faults in a line's *text*, so
 * they carry no `move` — fixing them edits scripture-adjacent data and goes
 * through the citation-backed review, never through a line-group migration.
 */
export const vishraams: Check = {
  name: 'vishraams',
  issue: 9,
  expected: 4,
  run: (corpus) => {
    const findings: Finding[] = []

    for (const group of corpus.ordered) {
      for (const line of group.lines) {
        for (const fault of findVishraamFaults(line.data)) {
          findings.push({
            groups: [group.id],
            detail: `${group.id}/${line.id} ${fault.reason} (${fault.marker} at ${fault.index}): ${line.data}`,
          })
        }
      }
    }

    return findings
  },
}
