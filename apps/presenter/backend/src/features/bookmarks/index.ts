import { getBanis } from '#~/services/database'
import { SocketServer } from '#~/services/websocket-server'

type BookmarksModuleOptions = {
  socketServer: SocketServer,
}

const createBookmarksModule = ( { socketServer }: BookmarksModuleOptions ) => {
  socketServer.on( 'client:connected', ( { json } ) => {
    void getBanis().then( ( banis ) => json( 'bookmarks:list', banis.map( ( bani ) => ( { ...bani, type: 'bani' } ) ) ) )
  } )
}

export default createBookmarksModule
