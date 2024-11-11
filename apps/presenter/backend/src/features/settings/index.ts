import { GlobalSettings } from '~/services/global-settings'
import { SocketServer } from '~/services/websocket-server'

import createSettingsState from './state'

type SettingsModuleOptions = {
  socketServer: SocketServer,
  globalSettings: GlobalSettings,
}

const createSettingsModule = ( { socketServer, globalSettings }: SettingsModuleOptions ) => {
  const state = createSettingsState( { globalSettings } )

  const { getClientSettings, publicSettings, setSettings, removeClientSettings } = state

  socketServer.on( 'client:connected', ( { json, host } ) => json( 'settings:all', getClientSettings( host ) ) )
  socketServer.on( 'client:disconnected', ( { host } ) => removeClientSettings( host ) )

  const broadcastSettings = () => socketServer.broadcast( 'settings:all' )( ( { host } ) => getClientSettings( host ) )

  publicSettings.onChange( broadcastSettings )
  globalSettings.onChange( broadcastSettings )

  socketServer.on( 'settings:all', ( settings, client ) => setSettings( client.host, settings ) )

  return state
}

export type SettingsModule = Awaited<ReturnType<typeof createSettingsModule>>

export default createSettingsModule
