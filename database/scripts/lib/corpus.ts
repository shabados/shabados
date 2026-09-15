import { Glob } from 'bun'
import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import { parse } from 'smol-toml'

import type { LineGroups } from '#collections-types/line-groups'
import type { Lines } from '#collections-types/lines'
import type { Sections } from '#collections-types/sections'
import type { Sources } from '#collections-types/sources'

/**
 * Reads the TOML collections into memory, in source order, so checks and
 * migrations can walk the corpus without each one re-globbing 604M.
 */

/** A line reduced to the fields structural checks need. */
export type CorpusLine = {
  id: string
  /** The primary asset's text — the scripture itself, vishraam markers included. */
  data: string
  page?: number
  line?: number
}

export type CorpusGroup = {
  id: string
  author: string
  lines: CorpusLine[]
  /** Section this group belongs to, and its position within that section. */
  sectionId: string
  sectionName: string
  index: number
}

export type Corpus = {
  groups: Map<string, CorpusGroup>
  /** Every group of the source, in reading order. */
  ordered: CorpusGroup[]
  sections: Map<string, { id: string; name: string; groupIds: string[] }>
}

const read = async <T>(path: string) => parse(await readFile(path, 'utf-8')) as unknown as T

const readAll = async <T>(collection: string) => {
  const entries = new Map<string, T>()
  for await (const path of new Glob(`./collections/${collection}/**/*.toml`).scan()) {
    entries.set(basename(path, '.toml'), await read<T>(path))
  }
  return entries
}

/**
 * Only the primary content is kept. A line carries its translations and notes in
 * the same file — the bulk of the 604M — and no structural check reads them, so
 * holding them would cost gigabytes for nothing.
 *
 * The files are parsed properly rather than pattern-matched. Parsing 60k TOML
 * files is slower, but a regex over the raw text silently misreads the first line
 * whose quoting is unusual, and there is no reviewer to catch that.
 */
const loadLines = async () => {
  const lines = new Map<string, CorpusLine>()
  for await (const path of new Glob('./collections/lines/**/*.toml').scan()) {
    const id = basename(path, '.toml')
    const { content } = await read<Lines>(path)
    const primary = content.find((entry) => entry.type === 'primary')
    if (!primary) continue
    lines.set(id, { id, data: primary.data, page: primary.page, line: primary.line })
  }
  return lines
}

export const loadCorpus = async (sourceId: string): Promise<Corpus> => {
  const [source, sectionFiles, groupFiles, lineFiles] = await Promise.all([
    read<Sources>(`./collections/sources/${sourceId}.toml`),
    readAll<Sections>('sections'),
    readAll<LineGroups>('line-groups'),
    loadLines(),
  ])

  const groups = new Map<string, CorpusGroup>()
  const sections = new Map<string, { id: string; name: string; groupIds: string[] }>()
  const ordered: CorpusGroup[] = []

  for (const sectionId of source.sections ?? []) {
    const section = sectionFiles.get(sectionId)
    if (!section) throw new Error(`${sourceId} names section ${sectionId}, which does not exist`)

    const name = section.name?.Latn ?? sectionId
    sections.set(sectionId, { id: sectionId, name, groupIds: section.lineGroups })

    for (const [index, groupId] of section.lineGroups.entries()) {
      const file = groupFiles.get(groupId)
      if (!file)
        throw new Error(`Section ${sectionId} names line-group ${groupId}, which does not exist`)

      const group: CorpusGroup = {
        id: groupId,
        author: file.author,
        sectionId,
        sectionName: name,
        index,
        lines: file.lines.map((lineId) => {
          const line = lineFiles.get(lineId)
          if (!line)
            throw new Error(`Line-group ${groupId} names line ${lineId}, which does not exist`)
          return line
        }),
      }

      groups.set(groupId, group)
      ordered.push(group)
    }
  }

  return { groups, ordered, sections }
}

/** The group before this one in reading order, or undefined across a section boundary. */
export const previousInSection = (corpus: Corpus, group: CorpusGroup) => {
  if (group.index === 0) return undefined
  const previousId = corpus.sections.get(group.sectionId)?.groupIds[group.index - 1]
  return previousId ? corpus.groups.get(previousId) : undefined
}

/** The group after this one in reading order, or undefined across a section boundary. */
export const nextInSection = (corpus: Corpus, group: CorpusGroup) => {
  const nextId = corpus.sections.get(group.sectionId)?.groupIds[group.index + 1]
  return nextId ? corpus.groups.get(nextId) : undefined
}
