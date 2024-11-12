import { debounce } from 'radashi'
import { findDOMNode } from 'react-dom'
import scrollIntoView from 'scroll-into-view'

import { isMac } from './consts'

// eslint-disable-next-line react/no-find-dom-node
export const scrollIntoCenter = ( ref: any, options?: __ScrollIntoView.Settings ) => scrollIntoView(
  findDOMNode( ref ) as any,
  { time: 200, ...options }
)

export const debounceHotKey = ( fn: () => void ) => debounce( { leading: true, delay: 300 }, fn )

export const mapPlatformKey = ( key: string ) => ( isMac ? key.replace( 'ctrl', 'cmd' ) : key )

export type KeyMap = Record<string, string[]>

export const mapPlatformKeys = ( keyMap: KeyMap ) => ( isMac
  ? Object.entries( keyMap ).reduce( ( keyMap, [ name, sequences ] ) => ( {
    ...keyMap,
    [ name ]: sequences ? sequences.map( mapPlatformKey ) : null,
  } ), {} )
  : keyMap
)
