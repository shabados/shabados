import { ClientEvent, ClientEventParameters, clientEvents, ServerEvent, ServerEventParameters } from '@presenter/contract'
import { decode, encode } from '@presenter/swiss-knife'
import EventEmitter from 'eventemitter3'
import { atom, WritableAtom } from 'jotai'
import { WebSocket } from 'partysocket'

import { BASE_URL } from '#~/helpers/consts'

import { store } from './jotai'

const WS_URL = `ws://${BASE_URL}/api`

type ClientEvents = {
  'connected': [undefined],
  'disconnected': [undefined],
} & {
  [Event in ClientEvent]: [ClientEventParameters[Event]]
}

const createWebSocketClient = () => {
  const emitter = new EventEmitter<ClientEvents>()

  const socket = new WebSocket( WS_URL, undefined, {
    minReconnectionDelay: 300 + Math.random() * 200,
    connectionTimeout: 1000,
  } )

  socket.addEventListener( 'open', () => emitter.emit( 'connected', undefined ) )
  socket.addEventListener( 'close', () => emitter.emit( 'disconnected', undefined ) )
  socket.addEventListener( 'message', ( { data } ) => {
    const { event, payload } = decode<{
      event: ClientEvent,
      payload: ClientEventParameters[ClientEvent],
    }>( data as string )

    emitter.emit( event, payload )
  } )

  const send = ( data: string ) => {
    if ( socket.readyState === WebSocket.OPEN ) socket.send( data )
    else emitter.once( 'connected', () => socket.send( data ) )
  }

  const json = <Event extends ServerEvent>(
    event: Event,
    payload: ServerEventParameters[Event]
  ) => send( encode( { event, payload } ) )

  const listen = <Event extends keyof ClientEvents>(
    event: Event,
    listener: ( payload: ClientEvents[Event][0] ) => void
  ) => {
    emitter.on( event, listener )
    return () => emitter.off( event, listener )
  }

  const atoms = new Map<
    keyof ClientEvents,
    WritableAtom<ClientEvents[keyof ClientEvents][0], [ClientEvents[keyof ClientEvents][0]], void>
  >()

  const getAtom = <Event extends keyof ClientEvents>( event: Event ) => {
    if ( atoms.has( event ) ) {
      return atoms.get( event ) as WritableAtom<
        ClientEvents[Event][0] | undefined,
        [ClientEvents[Event][0] | undefined],
        void
      >
    }

    const a = atom<ClientEvents[Event][0]>( null )
    atoms.set( event, a )

    return a
  }

  // Listen to events and set atoms at this point so that we don't miss any events
  clientEvents.forEach(
    /* eslint-disable-next-line
      @typescript-eslint/no-unsafe-argument,
      @typescript-eslint/no-explicit-any
    */
    ( event ) => emitter.on( event, ( payload ) => store.set( getAtom( event ) as any, payload ) )
  )

  return {
    json,
    on: emitter.on.bind( emitter ),
    once: emitter.once.bind( emitter ),
    off: emitter.off.bind( emitter ),
    listen,
    getAtom,
  }
}

export default createWebSocketClient()
