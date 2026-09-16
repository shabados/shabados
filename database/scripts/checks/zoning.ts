import type { Check, Finding } from '../lib/check'
import type { CorpusGroup } from '../lib/corpus'
import { isColophon, isUnzoned, parseEnding } from '../lib/gurbani'

/**
 * The running count a line-group closes on — the rightmost number of its ending.
 *
 * Read from the last line that actually carries an ending: a colophon closes a
 * division rather than a composition and carries no count, so it is stepped over.
 * Scribal suffixes are stripped by `parseEnding` itself.
 */
const closingCount = (group: CorpusGroup) => {
  for (let index = group.lines.length - 1; index >= 0; index -= 1) {
    const line = group.lines[index]
    if (!line || isColophon(line.id)) continue
    const { pada, stack } = parseEnding(line.data)
    const numbers = pada === undefined ? stack : [pada, ...stack]
    if (numbers.length > 0) return numbers.at(-1)
    return undefined
  }
  return undefined
}

/**
 * Line-groups that carry no closing count but sit in a gap the surrounding counts
 * leave open.
 *
 * `5FC` is the case that showed this is readable: the group before closes on 6 and
 * the group after on 8, so the unnumbered group between them occupies 7 — it is
 * counted by the scribe without being labelled. That is the signature of an
 * unzoned group, and it can be found rather than only stumbled upon.
 *
 * Known unzoned groups are excluded, so a finding here is a *new* one.
 */
export const zoning: Check = {
  name: 'zoning',
  expected: 0,
  run: (corpus) => {
    const findings: Finding[] = []

    for (const section of corpus.sections.values()) {
      const groups = section.groupIds.map((id) => corpus.groups.get(id))
      const counts = groups.map((group) => (group ? closingCount(group) : undefined))

      for (const [index, count] of counts.entries()) {
        const group = groups[index]
        if (count !== undefined || !group || isUnzoned(group.id)) continue

        let before: number | undefined
        let after: number | undefined
        for (let j = index - 1; j >= 0; j -= 1)
          if (counts[j] !== undefined) {
            before = counts[j]
            break
          }
        for (let j = index + 1; j < counts.length; j += 1)
          if (counts[j] !== undefined) {
            after = counts[j]
            break
          }
        if (before === undefined || after === undefined || after !== before + 2) continue

        findings.push({
          groups: [group.id],
          detail:
            `${group.id} (${section.name}) carries no count but sits between ${before} and ${after}` +
            ` — it occupies ${before + 1}: ${group.lines[0]?.data.slice(0, 50)}`,
        })
      }
    }

    return findings
  },
}
