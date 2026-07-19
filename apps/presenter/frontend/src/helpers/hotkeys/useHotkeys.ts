import { RefObject, useEffect, useRef } from 'react'

import { buildKeydownHandler, EngineBinding } from './engine'
import { HotkeyHandlerMap, ResolvedHotkey } from './resolve'

export type HotkeyTarget = Window | HTMLElement | RefObject<HTMLElement | null> | null

export type UseHotkeysOptions = {
  /** window (Global/Copy/focus-roving) or a container ref (Navigator-scoped). */
  target?: HotkeyTarget,
  /** Gate registration without unmounting anything - mirrors the existing `active` props. */
  active?: boolean,
}

const isRefObject = ( target: HotkeyTarget ): target is RefObject<HTMLElement | null> => (
  !!target && typeof target === 'object' && 'current' in target
)

const resolveTarget = ( target: HotkeyTarget ): EventTarget | null => {
  if ( !target ) return null
  return isRefObject( target ) ? target.current : target
}

/**
 * The ONLY place any component talks to the key-matching engine. Resolves a set of
 * catalogue entries against the handlers a component actually implements (a component
 * may wire only a subset of a group's entries - entries with no matching handler are
 * silently skipped), and attaches/detaches one keydown listener as `resolved`/`handlers`/
 * `active`/`target` change.
 */
export const useHotkeys = (
  resolved: ResolvedHotkey[],
  handlers: HotkeyHandlerMap,
  { target = window, active = true }: UseHotkeysOptions = {},
) => {
  // Handlers are read through a ref so that a new handler *function* identity (e.g. an
  // inline object literal re-created every render) doesn't force a listener teardown/
  // re-attach - only a change to the resolved bindings themselves (a settings rebind)
  // does that, via the `bindingsKey` dependency below.
  const handlersRef = useRef( handlers )
  handlersRef.current = handlers

  const bindingsKey = resolved
    .map( ( { name, sequences, required } ) => `${name}:${required}:${sequences.join( ',' )}` )
    .sort()
    .join( '|' )

  // A component may gate enablement not via its own `active` prop, but by swapping its
  // `handlers` map between `{}` and a real handler map while `active`/`bindingsKey`/
  // `target` stay constant (e.g. NavigatorHotKeys toggling on route changes without
  // unmounting). Track *which* entries currently have a live handler so that toggle
  // re-runs the effect too - otherwise the bindings compiled while `handlers` was `{}`
  // are never rebuilt once real handlers appear.
  const handlerKeys = resolved
    .map( ( { name } ) => name )
    .filter( ( name ) => handlers[ name ] )
    .sort()
    .join( '|' )

  useEffect( () => {
    if ( !active ) return undefined

    const eventTarget = resolveTarget( target )
    if ( !eventTarget ) return undefined

    const bindings: EngineBinding[] = resolved
      .filter( ( { name } ) => handlersRef.current[ name ] )
      .map( ( { name, sequences, required } ) => ( {
        sequences,
        required,
        handler: ( event: KeyboardEvent ) => handlersRef.current[ name ]?.( event ),
      } ) )

    const listener = buildKeydownHandler( bindings )

    eventTarget.addEventListener( 'keydown', listener )

    return () => eventTarget.removeEventListener( 'keydown', listener )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ bindingsKey, active, target, handlerKeys ] )
}
