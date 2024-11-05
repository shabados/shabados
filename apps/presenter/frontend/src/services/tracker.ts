import { useAtomValue } from 'jotai'

import websocketClient from './websocket-client'

export const useTracker = () => {
  const mainLineId = useAtomValue( websocketClient.getAtom( 'content:tracker:main-line' ) )
  const nextLineId = useAtomValue( websocketClient.getAtom( 'content:tracker:next-line' ) )

  return { mainLineId, nextLineId }
}
