import { Glob } from 'bun'
import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import { parse } from 'smol-toml'

export type Retirement = {
  id: string
  mergedInto: string
  migration: string
  date: string
}

const RETIRED_PATH = './retired-ids.toml'

export const readRetired = async () =>
  (parse(await readFile(RETIRED_PATH, 'utf-8')) as unknown as { retired: Retirement[] }).retired ??
  []

/** Line-group IDs currently on disk. */
export const existingGroupIds = async () => {
  const ids = new Set<string>()
  for await (const path of new Glob('./collections/line-groups/**/*.toml').scan()) {
    ids.add(basename(path, '.toml'))
  }
  return ids
}

/**
 * Every ID that has ever been a line-group — in use now, or retired.
 *
 * This, not the on-disk set, is what new IDs must avoid. The difference is the
 * whole point of the retirement record.
 */
export const everUsedGroupIds = async () => {
  const [existing, retired] = await Promise.all([existingGroupIds(), readRetired()])
  for (const { id } of retired) existing.add(id)
  return existing
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Mints a line-group ID that has never been used.
 *
 * Random rather than sequential: sequential IDs would encode position, and the
 * corpus reorders. `taken` must come from `everUsedGroupIds`, and callers should
 * pass the same set back for successive mints so a batch does not collide with
 * itself.
 */
export const mintGroupId = (taken: Set<string>) => {
  for (let attempt = 0; attempt < 10_000; attempt += 1) {
    const id = Array.from(
      { length: 3 },
      () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
    ).join('')
    if (!taken.has(id)) {
      taken.add(id)
      return id
    }
  }
  throw new Error('Could not mint an unused line-group ID in 10,000 attempts')
}
