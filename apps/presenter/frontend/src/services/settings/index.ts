import { ClientSettings, ManyClientPartialSettings, ManyClientSettings, ServerSettings } from '@presenter/contract'
import { definitions, getDefaults, migrate, parse } from '@presenter/schemas'
import { decode, encode, merge } from '@presenter/swiss-knife'
import { dequal } from 'dequal'
import { atom, useAtom } from 'jotai'
import { tryit } from 'radashi'
import { PartialDeep } from 'type-fest'

import { store } from '~/services/jotai'
import websocketClient from '~/services/websocket-client'

const writeSettings = ( settings: ClientSettings ) => {
  localStorage.setItem(
    'settings',
    encode( { ...settings, schemaVersion: definitions.clientSettings.version } )
  )
}

const readSettings = () => {
  const [ err, data ] = tryit( decode<{ schemaVersion?: number }> )( localStorage.getItem( 'settings' ) ?? '' )

  if ( err ) console.warn( 'Settings non-existent or corrupted. Resetting to default.', err )

  const settings = migrate( definitions.clientSettings, data, data?.schemaVersion ?? 0 )
  writeSettings( settings )

  return settings
}

const baseLocalSettingsAtom = atom<ClientSettings>( readSettings() )
const localSettingsAtom = atom(
  ( get ) => get( baseLocalSettingsAtom ),
  ( get, set, update: PartialDeep<ClientSettings> ) => {
    const local = parse(
      definitions.clientSettings.schema,
      merge( get( baseLocalSettingsAtom ), update )
    )

    set( baseLocalSettingsAtom, local )
    writeSettings( local )
    websocketClient.json( 'settings:all', { local } )
  }
)

websocketClient.on( 'settings:all', ( settings ) => {
  if ( !settings.local ) return
  if ( dequal( store.get( baseLocalSettingsAtom ), settings?.local ) ) return

  const local = parse( definitions.clientSettings.schema, settings?.local )
  store.set( baseLocalSettingsAtom, local )
  writeSettings( local )
} )

const baseClientSettingsAtom = atom<ManyClientSettings>( {} )
const clientSettingsAtom = atom(
  ( get ) => get( baseClientSettingsAtom ),
  ( get, set, clients: ManyClientPartialSettings ) => {
    websocketClient.json( 'settings:all', { clients } )
  }
)

websocketClient.on( 'settings:all', ( settings ) => {
  if ( !settings.clients ) return
  if ( dequal( store.get( baseClientSettingsAtom ), settings?.clients ) ) return

  store.set( baseClientSettingsAtom, settings.clients )
} )

const baseGlobalSettingsAtom = atom<ServerSettings>( getDefaults(
  definitions.serverSettings.schema
) )
const globalSettingsAtom = atom(
  ( get ) => get( baseGlobalSettingsAtom ),
  ( get, set, global: PartialDeep<ServerSettings> ) => {
    websocketClient.json( 'settings:all', { global } )
  }
)

websocketClient.on( 'settings:all', ( settings ) => {
  if ( !settings.global ) return
  if ( dequal( store.get( baseGlobalSettingsAtom ), settings?.global ) ) return

  store.set( baseGlobalSettingsAtom, settings.global )
} )

export const useLocalSettings = () => useAtom( localSettingsAtom )
export const useClientsSettings = () => useAtom( clientSettingsAtom )
export const useGlobalSettings = () => useAtom( globalSettingsAtom )
