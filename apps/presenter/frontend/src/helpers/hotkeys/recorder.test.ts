import { describe, expect, it, vi } from 'vitest'

import { recordSequence } from './recorder'

const keydown = ( key: string ) => window.dispatchEvent( new KeyboardEvent( 'keydown', { key, bubbles: true } ) )
const keyup = ( key: string ) => window.dispatchEvent( new KeyboardEvent( 'keyup', { key, bubbles: true } ) )

describe( 'recordSequence', () => {
  it( 'invokes the callback once, when the last key of a combination is released', () => {
    const callback = vi.fn()
    recordSequence( callback )

    keydown( 'Control' )
    keydown( 'f' )
    expect( callback ).not.toHaveBeenCalled()

    keyup( 'f' )
    expect( callback ).not.toHaveBeenCalled()

    keyup( 'Control' )
    expect( callback ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'passes a `keys` dictionary of every key that was part of the combination', () => {
    const callback = vi.fn()
    recordSequence( callback )

    keydown( 'Control' )
    keydown( 'f' )
    keyup( 'f' )
    keyup( 'Control' )

    expect( callback ).toHaveBeenCalledWith( { keys: { Control: true, f: true } } )
  } )

  it( 'starts a fresh combination after the previous one fully released', () => {
    const callback = vi.fn()
    recordSequence( callback )

    keydown( 'a' )
    keyup( 'a' )
    expect( callback ).toHaveBeenCalledTimes( 1 )
    expect( callback ).toHaveBeenLastCalledWith( { keys: { a: true } } )

    keydown( 'b' )
    keyup( 'b' )
    expect( callback ).toHaveBeenCalledTimes( 2 )
    expect( callback ).toHaveBeenLastCalledWith( { keys: { b: true } } )
  } )

  it( 'ignores repeat keydowns (held keys) rather than re-adding them', () => {
    const callback = vi.fn()
    recordSequence( callback )

    keydown( 'a' )
    window.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'a', repeat: true, bubbles: true } ) )
    keyup( 'a' )

    expect( callback ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'stops listening once unsubscribed', () => {
    const callback = vi.fn()
    const unsubscribe = recordSequence( callback )

    unsubscribe()

    keydown( 'a' )
    keyup( 'a' )

    expect( callback ).not.toHaveBeenCalled()
  } )
} )
