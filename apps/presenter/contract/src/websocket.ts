import type { Merge } from 'type-fest'

import { BaniList, Content, Line, ViewedLines } from './data'
import { SearchQuery } from './search'
import { PartialSettings, Settings } from './settings'

type DefineParameters<
  Name extends string,
  Parameters extends Partial<Record<Name, unknown>>
> = Merge<Record<Name, undefined>, Parameters>

export const serverEvents = [
  'content:open',
  'content:open-previous',
  'content:open-next',
  'content:line:set-current',
  'content:line:set-next',
  'content:line:set-previous',
  'content:line:clear',
  'content:tracker:set-next-line',
  'content:tracker:set-main-line',
  'content:tracker:autojump',
  'history:clear',
  'settings:all',
  'search:query',
  'action:open-overlay-folder',
  'action:open-logs-folder',
  'action:open-external-url',
  'action:open-window',
] as const

export type ServerEvent = typeof serverEvents[number]
export type ServerEventParameters = DefineParameters<ServerEvent, {
  'content:open': { id: string, lineId?: string, type: 'shabad' } | { id: number, lineId?: string, type: 'bani' },
  'content:line:set-current': string,
  'content:tracker:set-main-line': string,
  'content:tracker:set-next-line': string,
  'settings:all': PartialSettings,
  'search:query': SearchQuery,
  'action:open-external-url': string,
}>

export const clientEvents = [
  'content:current',
  'content:line:current',
  'content:tracker:main-line',
  'content:tracker:next-line',
  'history:viewed-lines',
  'bookmarks:list',
  'status',
  'history:transitions',
  'history:latest-lines',
  'settings:all',
  'search:results',
] as const

export type ClientEvent = typeof clientEvents[number]
export type ClientEventParameters = DefineParameters<ClientEvent, {
  'content:current': Content | null,
  'content:line:current': string | null,
  'content:tracker:main-line': string | null,
  'content:tracker:next-line': string | null,
  // TODO: Rename to notification(s)
  'status': string | null,
  'bookmarks:list': ( BaniList & { type: 'bani' } )[],
  'history:viewed-lines': ViewedLines,
  // 'history:transitions',
  // 'history:latest-lines',
  'settings:all': PartialSettings,
  'search:results': Line[],
}>
