import { debounce } from 'radashi'
import scrollIntoView from 'scroll-into-view'

import { isMac } from './consts'

// Callers always pass a real DOM element (NavigationHotkeys registers raw refs),
// so no findDOMNode indirection is needed - it is removed entirely in React 19.
export const scrollIntoCenter = ( element: HTMLElement, options?: __ScrollIntoView.Settings ) => scrollIntoView(
  element,
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
