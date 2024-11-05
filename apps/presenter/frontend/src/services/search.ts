import { ServerEventParameters } from '@presenter/contract'
import { useAtom } from 'jotai'

import websocketClient from './websocket-client'

export const search = ( params: ServerEventParameters['search:query'] ) => websocketClient.json( 'search:query', params )

export const useSearchResults = () => {
  const [ results, setResults ] = useAtom( websocketClient.getAtom( 'search:results' ) )

  return {
    results,
    clearResults: () => setResults( [] ),
  }
}
