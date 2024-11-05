import { SearchQuery } from '@presenter/contract'

import { firstLetterSearch, fullWordSearch } from '~/services/database'
import { SocketServer } from '~/services/websocket-server'

const searchHandlers = {
  'first-letter': firstLetterSearch,
  'full-word': fullWordSearch,
} satisfies Record<
  //! This typing is a little silly
  SearchQuery['type'],
  ( params: Parameters<typeof firstLetterSearch>[0] ) => ReturnType<typeof firstLetterSearch>
>

type SearchModuleOptions = {
  socketServer: SocketServer,
}

const createSearchModule = ( { socketServer }: SearchModuleOptions ) => {
  socketServer.on(
    'search:query',
    ( { type, query, options }, { json } ) => {
      const searchFn = searchHandlers[ type ]
      if ( !searchFn ) return

      void searchFn( query, options ).then( ( results ) => json( 'search:results', results ) )
    }
  )
}

export default createSearchModule
