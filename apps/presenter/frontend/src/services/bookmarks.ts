import { useAtomValue } from 'jotai'

import websocketClient from './websocket-client'

export const useBookmarks = () => useAtomValue( websocketClient.getAtom( 'bookmarks:list' ) )
