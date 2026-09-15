import type { Check, Finding } from '../lib/check'
import { existingGroupIds, readRetired } from '../lib/ids'

/**
 * A retired line-group ID must never come back. This is the check that makes the
 * rule enforceable rather than a note in a file nobody reads.
 *
 * It reads the corpus directly rather than the loaded `Corpus`, because a retired
 * ID reappearing as an orphan file — present on disk, named by no section — is
 * exactly the case a section-ordered walk would miss.
 */
export const retiredIds: Check = {
  name: 'retired-ids',
  expected: 0,
  run: async (corpus) => {
    const [retired, existing] = await Promise.all([readRetired(), existingGroupIds()])
    const findings: Finding[] = []

    for (const { id, mergedInto } of retired) {
      if (existing.has(id)) {
        findings.push({
          groups: [id],
          detail: `${id} was retired (merged into ${mergedInto}) but a line-group file for it exists again`,
        })
      }
      if (corpus.groups.has(id)) {
        findings.push({ groups: [id], detail: `${id} was retired but is still named by a section` })
      }
      if (!corpus.groups.has(mergedInto)) {
        findings.push({
          groups: [id, mergedInto],
          detail: `${id} forwards to ${mergedInto}, which does not exist`,
        })
      }
    }

    return findings
  },
}
