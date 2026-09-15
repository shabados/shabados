import type { Check, Finding } from '../lib/check'

/**
 * Page and line must not go backwards through a section. A regression is usually
 * one field: either the page failed to advance when the line number reset, or a
 * line number is off by one.
 *
 * No `move` — the fix edits a line's page/line, not a line-group's membership.
 */
export const pageOrder: Check = {
  name: 'page-order',
  issue: 10,
  expected: 3,
  run: (corpus) => {
    const findings: Finding[] = []
    let previous:
      | { sectionId: string; groupId: string; id: string; page: number; line: number }
      | undefined

    for (const group of corpus.ordered) {
      for (const { id, page, line, data } of group.lines) {
        if (page === undefined || line === undefined) continue

        if (previous && previous.sectionId === group.sectionId) {
          const wentBack = page < previous.page || (page === previous.page && line < previous.line)
          if (wentBack) {
            findings.push({
              groups: [previous.groupId, group.id],
              detail:
                `${previous.groupId}/${previous.id} p${previous.page}:${previous.line}` +
                ` → ${group.id}/${id} p${page}:${line}  ${data}`,
            })
          }
        }

        previous = { sectionId: group.sectionId, groupId: group.id, id, page, line }
      }
    }

    return findings
  },
}
