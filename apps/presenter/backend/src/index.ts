import { ensureAppFolders, getLogger } from '@presenter/node'

import createActionsModule from '#~/features/actions'

// eslint-disable-next-line import/no-relative-packages
import { version } from '../../../package.json'
import { handleError } from './error'
import createBookmarksModule from './features/bookmarks'
import createContentModule from './features/content'
import createDiagnosticsModule from './features/diagnostics'
import createHistoryModule from './features/history'
import createSearchModule from './features/search'
import createSettingsModule from './features/settings'
import createStatusModule from './features/status'
import createThemesModule from './features/themes'
import createExpress from './services/express'
import createGlobalSettings from './services/global-settings'
import ipc from './services/ipc'
import createUpdater from './services/updater'
import createWebSocketServer from './services/websocket-server'

const log = getLogger( 'main' )

const main = async () => {
  log.info( `Starting Shabad OS ${version}` )

  await ensureAppFolders()

  ipc.registerListener()

  const globalSettings = createGlobalSettings()
  await globalSettings.load()

  const updater = createUpdater( { globalSettings } )

  const { httpServer, api, listen } = createExpress()
  const socketServer = createWebSocketServer( { httpServer } )

  createSettingsModule( { socketServer, globalSettings } )
  createSearchModule( { socketServer } )
  createActionsModule( { socketServer } )
  createStatusModule( { socketServer, globalSettings, updater } )
  await createThemesModule( { api } )
  createDiagnosticsModule( { api } )
  const history = createHistoryModule( {} )
  createContentModule( { api, socketServer, history } )
  createBookmarksModule( { socketServer } )

  listen()

  updater.start()
}

process.on( 'uncaughtException', handleError )
process.on( 'unhandledRejection', handleError )

main().catch( handleError )
