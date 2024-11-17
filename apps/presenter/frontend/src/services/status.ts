import { atom, useAtomValue } from 'jotai'

import { store } from '#~/services/jotai'
import websocketClient from '#~/services/websocket-client'

const connectedAtom = atom( false )

websocketClient.on( 'connected', () => {
  store.set( connectedAtom, true )
} )

websocketClient.on( 'disconnected', () => {
  store.set( connectedAtom, false )
} )

const statusAtom = atom( ( get ) => {
  const connected = get( connectedAtom )

  return connected
    ? { connected: true, connectedAt: new Date() } as const
    : { connected: false, connectedAt: undefined } as const
} )

export const useStatus = () => useAtomValue( statusAtom )
