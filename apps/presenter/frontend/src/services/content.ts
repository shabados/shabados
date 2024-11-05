import { ServerEventParameters } from '@presenter/contract'
import { atom, useAtomValue } from 'jotai'

import websocketClient from './websocket-client'

const linesByIdAtom = atom( ( get ) => {
  const content = get( websocketClient.getAtom( 'content:current' ) )
  const lines = content?.lines

  return lines?.reduce(
    ( acc, line, lineIndex ) => ( { ...acc, [ line.id ]: { line, lineIndex } } ),
    {} as Record<string, { line: typeof lines[number], lineIndex: number }>,
  )
} )

const contentAtom = atom( ( get ) => {
  const content = get( websocketClient.getAtom( 'content:current' ) )

  const lines = content?.lines
  const lineId = get( websocketClient.getAtom( 'content:line:current' ) )

  const linesById = get( linesByIdAtom )
  const line = lineId ? linesById?.[ lineId ] : undefined

  return { content, lineId, lines, ...line }
} )

export const useContent = () => useAtomValue( contentAtom )

export const setNextContent = () => websocketClient.json( 'content:open-next', undefined )
export const setPreviousContent = () => websocketClient.json( 'content:open-previous', undefined )
export const setPreviousLine = () => websocketClient.json( 'content:line:set-previous', undefined )
export const setNextLine = () => websocketClient.json( 'content:line:set-next', undefined )
export const setLine = ( lineId: ServerEventParameters['content:line:set-current'] ) => websocketClient.json( 'content:line:set-current', lineId )
export const setContent = ( content: ServerEventParameters['content:open'] ) => websocketClient.json( 'content:open', content )
export const clearLine = () => websocketClient.json( 'content:line:clear', undefined )
