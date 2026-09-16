import type { Check, Finding } from '../lib/check'
import { nextInSection } from '../lib/corpus'
import { isHeading } from '../lib/gurbani'

/**
 * A line-group holding nothing but a heading. The mirror of a stranded heading:
 * there the heading sits one group too early, here it sits alone.
 *
 * Fixing these empties a line-group, so unlike `stranded-headings` they retire an
 * ID and must not be applied before the retirement record exists.
 */
export const headingOnlyGroups: Check = {
  name: 'heading-only-groups',
  issue: 13,
  // Resolved by migrations/2-heading-only-groups.toml. Kept rather than deleted:
  // the corpus can reacquire this, and it is the mirror of stranded-headings.
  expected: 0,
  run: (corpus) => {
    const findings: Finding[] = []

    for (const group of corpus.ordered) {
      if (group.lines.length !== 1) continue

      const only = group.lines[0]
      if (!only || !isHeading(only.data)) continue

      const destination = nextInSection(corpus, group)
      if (!destination) continue

      findings.push({
        groups: [group.id, destination.id],
        detail: `${group.id} is only a heading, belonging to ${destination.id}: ${only.data}`,
        move: {
          line: only.id,
          from: group.id,
          to: destination.id,
          position: 'first',
          text: only.data,
        },
      })
    }

    return findings
  },
}
