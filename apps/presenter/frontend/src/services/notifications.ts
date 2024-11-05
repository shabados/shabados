import { useAtomValue } from 'jotai'

import websocketClient from './websocket-client'

export const useNotifications = () => {
  const notifications = useAtomValue( websocketClient.getAtom( 'status' ) )

  return notifications
}
