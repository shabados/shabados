import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { HotkeyHandlerMap, ResolvedHotkey, useHotkeys } from '#~/helpers/hotkeys'
import { LINE_HOTKEYS } from '#~/helpers/keyMap'
import { debounceHotKey, scrollIntoCenter } from '#~/helpers/utils'

type Name = string | number

const isInput = ( element: Element ) => element instanceof HTMLElement && element.tagName.toLowerCase() === 'input'

const preventDefault = ( fn: ( event: KeyboardEvent ) => void ) => ( event: KeyboardEvent ) => {
  event.preventDefault()
  fn( event )
}

export type FocusRovingKeymap = {
  next?: string[] | null,
  previous?: string[] | null,
  first?: string[] | null,
  last?: string[] | null,
  enter?: string[] | null,
}

export type FocusRovingOptions = {
  arrowKeys?: boolean,
  lineKeys?: boolean,
  clickOnFocus?: boolean,
  keymap?: FocusRovingKeymap,
  wrapAround?: boolean,
}

export type FocusRovingApi = {
  register: ( name: Name, node: HTMLElement | null ) => void,
  updateFocus: ( name: Name, click?: boolean ) => void,
  focused: Name | undefined,
}

const DEFAULT_KEYMAP: Required<FocusRovingKeymap> = {
  next: [ 'down', 'right', 'tab', 'PageDown', 'l' ],
  previous: [ 'up', 'left', 'shift+tab', 'PageUp', 'j' ],
  first: [ 'home', 'ctrl+up' ],
  last: [ 'end', 'ctrl+down' ],
  enter: [ 'enter', 'return' ],
}

/**
 * Ref-based, hook-first replacement for the legacy `withNavigationHotkeys` class HOC.
 * No findDOMNode, no class component - `register` is handed real DOM nodes directly by
 * every consumer (MUI components forward refs straight through to their underlying DOM
 * element), so this holds them in a plain ref map and never needs `react-dom`.
 *
 * Not settings-configurable: `keymap`'s defaults are a hardcoded literal here, exactly
 * as they were on the legacy class - arrow/tab/line focus-roving was never wired to
 * `useLocalSettings()`, only the named catalogue shortcuts (Global/Navigator/Copy) are.
 */
export const useFocusRoving = ( {
  arrowKeys = true,
  lineKeys = false,
  clickOnFocus = false,
  keymap: keymapOverride,
  wrapAround = true,
}: FocusRovingOptions = {} ): FocusRovingApi => {
  const nodesRef = useRef( new Map<Name, HTMLElement>() )
  const [ focusedIndex, setFocusedIndex ] = useState( 0 )
  const [ focused, setFocused ] = useState<Name | undefined>()

  const focusedIndexRef = useRef( focusedIndex )
  focusedIndexRef.current = focusedIndex

  const register = useCallback( ( name: Name, node: HTMLElement | null ) => {
    if ( node ) nodesRef.current.set( name, node )
    else nodesRef.current.delete( name )
  }, [] )

  // Stable across renders (like the class field it replaces) so the debounce's
  // internal "leading" timer isn't reset on every render.
  const simulateClick = useMemo( () => debounceHotKey( () => {
    const node = [ ...nodesRef.current.values() ][ focusedIndexRef.current ]
    if ( node ) node.click()
  } ), [] )

  const jumpTo = useCallback( ( index: number, click = true ) => {
    // Update the ref synchronously, ahead of the (batched, async) state update - so that
    // `simulateClick`'s synchronous leading-edge call (below) reads the node we just
    // navigated to, not the one about to be replaced.
    focusedIndexRef.current = index
    setFocusedIndex( index )
    if ( clickOnFocus && click ) simulateClick()
  }, [ clickOnFocus, simulateClick ] )

  const jumpToName = useCallback( ( name: Name, click = true ) => {
    const index = [ ...nodesRef.current.keys() ].findIndex( ( key ) => key === name )
    jumpTo( index, click )
  }, [ jumpTo ] )

  const jumpToFirst = useCallback( () => {
    const index = [ ...nodesRef.current.values() ].findIndex( ( node ) => !isInput( node ) )
    jumpTo( index )
  }, [ jumpTo ] )

  const prevItem = useCallback( () => {
    const prevIndex = focusedIndexRef.current

    if ( !wrapAround && prevIndex === 0 ) return

    const { size } = nodesRef.current
    jumpTo( prevIndex > 0 ? prevIndex - 1 : size - 1 )
  }, [ wrapAround, jumpTo ] )

  const nextItem = useCallback( () => {
    const prevIndex = focusedIndexRef.current
    const { size } = nodesRef.current

    if ( !wrapAround && prevIndex === size - 1 ) return

    jumpTo( prevIndex < size - 1 ? prevIndex + 1 : 0 )
  }, [ wrapAround, jumpTo ] )

  // Scroll the focused node into view whenever focus moves (and purge any stale (null)
  // registrations first) - mirrors the legacy class's componentDidMount/componentDidUpdate.
  // Also (re-)derives the `focused` *name* here, rather than reading `nodesRef` directly
  // during render: refs are only populated by children's ref callbacks during commit,
  // strictly after this render function has already returned, so a direct read at render
  // time is always one commit stale (invisible on the legacy class too, but only because
  // some unrelated prop change always re-rendered it again very shortly after mount in
  // practice) - deriving it via this effect makes the very first paint correct too.
  useEffect( () => {
    nodesRef.current.forEach( ( node, name ) => {
      if ( !node ) nodesRef.current.delete( name )
    } )

    const name = [ ...nodesRef.current.keys() ][ focusedIndex ]
    setFocused( name )

    const node = name !== undefined ? nodesRef.current.get( name ) : undefined
    if ( node ) scrollIntoCenter( node )
  }, [ focusedIndex ] )

  const arrowHandlers: HotkeyHandlerMap = useMemo( () => ( {
    first: preventDefault( jumpToFirst ),
    last: preventDefault( () => jumpTo( nodesRef.current.size - 1 ) ),
    previous: preventDefault( prevItem ),
    next: preventDefault( nextItem ),
    enter: simulateClick,
  } ), [ jumpToFirst, jumpTo, prevItem, nextItem, simulateClick ] )

  const lineHandlers: HotkeyHandlerMap = useMemo( () => LINE_HOTKEYS.reduce( ( handlers, key, index ) => ( {
    ...handlers,
    [ key ]: () => jumpTo( index ),
  } ), {} as HotkeyHandlerMap ), [ jumpTo ] )

  const keymap = useMemo( () => ( {
    next: DEFAULT_KEYMAP.next,
    previous: DEFAULT_KEYMAP.previous,
    ...( !clickOnFocus && { enter: DEFAULT_KEYMAP.enter } ),
    first: DEFAULT_KEYMAP.first,
    last: DEFAULT_KEYMAP.last,
    ...( lineKeys && LINE_HOTKEYS.reduce( ( acc, hotkey ) => ( { ...acc, [ hotkey ]: [ hotkey ] } ), {} ) ),
    ...keymapOverride,
  } ), [ clickOnFocus, lineKeys, keymapOverride ] )

  const resolved: ResolvedHotkey[] = useMemo( () => Object
    .entries( keymap )
    .map( ( [ name, sequences ] ) => ( {
      name,
      label: name,
      group: '',
      required: false,
      sequences: sequences ?? [],
    } ) ), [ keymap ] )

  const handlers: HotkeyHandlerMap = useMemo( () => ( {
    ...( arrowKeys && arrowHandlers ),
    ...( lineKeys && lineHandlers ),
  } ), [ arrowKeys, lineKeys, arrowHandlers, lineHandlers ] )

  useHotkeys( resolved, handlers, { target: window, active: true } )

  return { register, updateFocus: jumpToName, focused }
}

/**
 * Thin, consumer-facing wrapper preserving the exact call shape every route/controller
 * file already uses: `withNavigationHotkeys({...})(Component)`, injecting `register`/
 * `updateFocus`/`focused` props - same names, same behaviour as the legacy HOC.
 */
export const withNavigationHotkeys = ( options: FocusRovingOptions = {} ) => (
  WrappedComponent: ComponentType<any>,
) => ( props: any ) => {
  const api = useFocusRoving( options )

  return <WrappedComponent {...props} {...api} />
}
