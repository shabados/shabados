import { atom, useAtomValue } from 'jotai'

import websocketClient from './websocket-client'

const connectedAtom = atom( false )

connectedAtom.onMount = ( set ) => {
  const unlistenConnected = websocketClient.listen( 'connected', () => {
    set( true )
  } )

  const unlistenDisconnected = websocketClient.listen( 'disconnected', () => {
    set( false )
  } )

  return () => {
    unlistenConnected()
    unlistenDisconnected()
  }
}

const statusAtom = atom( ( get ) => {
  const connected = get( connectedAtom )

  return connected
    ? { connected: true, connectedAt: new Date() } as const
    : { connected: false, connectedAt: undefined } as const
} )

export const useStatus = () => useAtomValue( statusAtom )
