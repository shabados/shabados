import { HistoryModule } from '#~/features/history'
import { ExpressApi } from '#~/services/express'
import { SocketServer } from '#~/services/websocket-server'

import createApi from './api'
import createState from './state'

type ContentModuleOptions = {
  api: ExpressApi['api'],
  socketServer: SocketServer,
  history: HistoryModule,
}

const createContentModule = ( { api, socketServer }: ContentModuleOptions ) => {
  api.use( createApi() )

  const state = createState()
  const {
    content,
    lineId,
    trackerMainLineId,
    trackerNextLineId,
    setTrackerMainLine,
    setTrackerNextLine,
    setLine,
    clearLine,
    setContent,
    setNextLine,
    setPreviousLine,
    setNextContent,
    setPreviousContent,
  } = state

  content.onChange( socketServer.broadcast( 'content:current' ) )
  lineId.onChange( socketServer.broadcast( 'content:line:current' ) )
  trackerMainLineId.onChange( socketServer.broadcast( 'content:tracker:main-line' ) )
  trackerNextLineId.onChange( socketServer.broadcast( 'content:tracker:next-line' ) )

  socketServer.on( 'client:connected', ( { json } ) => {
    json( 'content:current', content.get() )
    json( 'content:line:current', lineId.get() )
    json( 'content:tracker:main-line', trackerMainLineId.get() )
    json( 'content:tracker:next-line', trackerNextLineId.get() )
  } )

  socketServer.on( 'content:tracker:set-main-line', setTrackerMainLine )
  socketServer.on( 'content:tracker:set-next-line', setTrackerNextLine )
  socketServer.on( 'content:line:clear', clearLine )
  socketServer.on( 'content:line:set-current', ( id ) => setLine( { id } ) )
  socketServer.on( 'content:line:set-next', setNextLine )
  socketServer.on( 'content:line:set-previous', setPreviousLine )
  socketServer.on( 'content:open', ( options ) => void setContent( options ) )
  socketServer.on( 'content:open-previous', () => void setPreviousContent() )
  socketServer.on( 'content:open-next', () => void setNextContent() )

  return state
}

export default createContentModule
