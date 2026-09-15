import { readFile, writeFile } from 'node:fs/promises'

import { parse } from 'smol-toml'

/**
 * A migration manifest is the change written down as data, committed before it
 * runs. The reviewable artefact is this file, not the applier — so every move
 * carries the Gurmukhi it moves and the reason it moves.
 */
export type Move = {
  line: string
  from: string
  to: string
  position: 'first' | 'last'
  /** The line's text. Verified against the corpus before anything is written. */
  text: string
  why: string
}

export type Manifest = {
  description: string
  issue?: number
  move: Move[]
}

export const readManifest = async (path: string) =>
  parse(await readFile(path, 'utf-8')) as unknown as Manifest

const groupPath = (id: string) => `./collections/line-groups/${id[0]}/${id}.toml`

/** Only the `lines` array is rewritten; every other byte of the file is left alone. */
const LINES_ARRAY = /^lines = \[(.*)\]$/m

export const readGroupLines = async (id: string) => {
  const source = await readFile(groupPath(id), 'utf-8')
  const match = LINES_ARRAY.exec(source)
  if (!match?.[1]) throw new Error(`${id}: no \`lines\` array`)
  return {
    source,
    lines: [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1] as string),
  }
}

/** The section that names this group, and that group's place in its list. */
const SECTION_GROUPS = /^lineGroups = \[(.*)\]$/m

export const readSectionGroups = async (sectionId: string) => {
  const path = `./collections/sections/${sectionId}.toml`
  const source = await readFile(path, 'utf-8')
  const match = SECTION_GROUPS.exec(source)
  if (!match?.[1]) throw new Error(`${sectionId}: no \`lineGroups\` array`)
  return { path, source, groups: [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1] as string) }
}

export const writeSectionGroups = async (path: string, source: string, groups: string[]) =>
  writeFile(
    path,
    source.replace(SECTION_GROUPS, `lineGroups = [ ${groups.map((g) => `"${g}"`).join(', ')} ]`),
  )

export const groupFilePath = (id: string) => groupPath(id)

export const writeGroupLines = async (id: string, source: string, lines: string[]) =>
  writeFile(
    groupPath(id),
    source.replace(LINES_ARRAY, `lines = [ ${lines.map((line) => `"${line}"`).join(', ')} ]`),
  )
