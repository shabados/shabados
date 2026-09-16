import consola from 'consola'

import { headingOnlyGroups } from './checks/heading-only-groups'
import { pageOrder } from './checks/page-order'
import { retiredIds } from './checks/retired-ids'
import { strandedHeadings } from './checks/stranded-headings'
import { vishraams } from './checks/vishraams'
import { zoning } from './checks/zoning'
import type { Check } from './lib/check'
import { loadCorpus } from './lib/corpus'

/**
 * Structural checks over the corpus, run in CI beside `collections:validate`.
 * Validation answers "does this match the schema"; these answer "is this the
 * right scripture in the right place", which no schema can express.
 *
 * Each check carries an `expected` count — the findings we currently know about.
 * A mismatch fails, in both directions: more than expected is a regression, fewer
 * means a fix landed and the constant should come down in that same commit. The
 * count is a tracked fact, not a threshold.
 */

const CHECKS: Check[] = [
  retiredIds,
  strandedHeadings,
  headingOnlyGroups,
  vishraams,
  pageOrder,
  zoning,
]

const verbose = process.argv.includes('--verbose')

consola.start('Loading SGGS')
const corpus = await loadCorpus('SGGS')
consola.success(`${corpus.ordered.length} line-groups across ${corpus.sections.size} sections`)

let failed = false

for (const check of CHECKS) {
  const findings = await check.run(corpus)
  const label = check.issue ? `${check.name} (#${check.issue})` : check.name

  if (findings.length === check.expected) {
    consola.success(`${label}: ${findings.length} known`)
  } else {
    failed = true
    consola.error(
      `${label}: found ${findings.length}, expected ${check.expected}. ` +
        (findings.length > check.expected
          ? 'New findings — review before doing anything else.'
          : 'Findings resolved — lower `expected` in this check, in the commit that fixed them.'),
    )
  }

  if (verbose || findings.length !== check.expected) {
    for (const finding of findings) consola.log(`    ${finding.detail}`)
  }
}

if (failed) process.exit(1)
