import { $ } from 'bun'

import consola from 'consola'

/**
 * Runs what `.github/workflows/database-ci.yml` runs. CI only fires on a pull
 * request or a push to main, so on a long-lived branch this is the gate.
 *
 *   bun run ci        lint, types, validate, structural checks, tests
 *   bun run ci --full adds database:build — the 165M artifact and its determinism
 *
 * The fast tier runs its steps concurrently: they share no state and are each
 * either I/O- or CPU-bound alone. The build is excluded because it is write-bound
 * on 165M and would set the wall time on its own; run --full before pushing, and
 * always after a corpus migration, since that is what changes the artifact.
 */

const full = process.argv.includes('--full')

// Once, up front: both `types` and `database:build` declare a pre-script that
// regenerates these, and two of them racing would write the same directory.
await $`bun run collections:generate-types`.quiet()

type Step = { name: string; run: () => Promise<unknown> }

const parallel: Step[] = [
  { name: 'lint', run: () => $`bun run lint`.quiet() },
  { name: 'types', run: () => $`bunx tsc --noEmit`.quiet() },
  { name: 'collections:validate', run: () => $`bun scripts/validate-collections.ts`.quiet() },
  { name: 'collections:check', run: () => $`bun scripts/check-collections.ts`.quiet() },
]

const started = performance.now()
let failed = false

const results = await Promise.allSettled(parallel.map((step) => step.run()))
for (const [index, result] of results.entries()) {
  const name = parallel[index]?.name ?? 'step'
  if (result.status === 'fulfilled') {
    consola.success(name)
  } else {
    failed = true
    consola.error(name)
    consola.log(String((result.reason as { stderr?: Buffer })?.stderr ?? result.reason))
  }
}

// Serial from here: the build writes dist/master.sqlite and the tests read it.
if (!failed && full) {
  try {
    await $`bun scripts/build-database.ts`.quiet()
    consola.success('database:build')
  } catch (error) {
    failed = true
    consola.error('database:build')
    consola.log(String((error as { stderr?: Buffer })?.stderr ?? error))
  }
}

if (!failed) {
  try {
    await $`bun test`.quiet()
    consola.success('test')
  } catch (error) {
    failed = true
    consola.error('test')
    consola.log(String((error as { stderr?: Buffer })?.stderr ?? error))
  }
}

const elapsed = ((performance.now() - started) / 1000).toFixed(2)
if (failed) {
  consola.error(`Failed in ${elapsed}s`)
  process.exit(1)
}
consola.success(`Green in ${elapsed}s${full ? '' : ' (add --full for database:build)'}`)
