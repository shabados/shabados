import type { Corpus } from './corpus'

/**
 * A finding is one defect, stated so a human can judge it without reading code.
 * `detail` carries the Gurmukhi, because a 4-character line ID tells a reviewer
 * nothing about whether a change is correct.
 */
export type Finding = {
  /** Line-groups involved, source first. */
  groups: string[]
  detail: string
  /** A move this finding implies, when the fix is mechanical. */
  move?: { line: string; from: string; to: string; position: 'first' | 'last'; text: string }
}

export type Check = {
  name: string
  /** The issue this check answers, for the report. */
  issue?: number
  /**
   * What the corpus looked like when this was written. A check that suddenly finds
   * more than it used to has either found a regression or drifted — either way a
   * human should look before it is auto-applied.
   */
  expected: number
  run: (corpus: Corpus) => Finding[] | Promise<Finding[]>
}
