/**
 * Replaces react-hotkeys' `recordKeyCombination`. Records the set of keys held down
 * together in one press-and-release cycle, and invokes `callback` once, when the LAST
 * key of that combination is released (mirroring react-hotkeys' KeyEventManager:
 * `_allKeysAreReleased()` fires the `keyCombination` listener with the full key
 * dictionary of the combination that just completed).
 *
 * Returns an unsubscribe function, so it's a drop-in for the existing call shape:
 * `useEffect(() => recordSequence(recordHotkey), [...])`.
 */
export type RecordedCombination = { keys: Record<string, boolean> }

export const recordSequence = ( callback: ( combination: RecordedCombination ) => void ) => {
  let seen: Record<string, boolean> = {}
  const held = new Set<string>()

  const onKeyDown = ( event: KeyboardEvent ) => {
    if ( event.repeat ) return

    held.add( event.key )
    seen[ event.key ] = true
  }

  const onKeyUp = ( event: KeyboardEvent ) => {
    held.delete( event.key )

    if ( held.size === 0 && Object.keys( seen ).length > 0 ) {
      callback( { keys: seen } )
      seen = {}
    }
  }

  window.addEventListener( 'keydown', onKeyDown )
  window.addEventListener( 'keyup', onKeyUp )

  return () => {
    window.removeEventListener( 'keydown', onKeyDown )
    window.removeEventListener( 'keyup', onKeyUp )
  }
}
