import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { buildKeydownHandler } from './engine'

// happy-dom's KeyboardEvent needs `code` (and a working `getModifierState`) for
// tinykeys' `isKeyboardEvent`/`matchKeybindingPress` checks to pass at all.
const CODES: Record<string, string> = { a: 'KeyA', c: 'KeyC', f: 'KeyF' }

const press = ( listener: ( event: KeyboardEvent ) => void, init: KeyboardEventInit ) => {
  const code = init.code ?? CODES[ ( init.key ?? '' ).toLowerCase() ]
  listener( new KeyboardEvent( 'keydown', { code, ...init } ) as any )
}

describe( 'buildKeydownHandler', () => {
  it( 'fires the handler for a matching single-press binding', () => {
    const handler = vi.fn()
    const listener = buildKeydownHandler( [
      { sequences: [ 'ctrl+shift+f' ], handler, required: false },
    ] )

    press( listener, { key: 'f', ctrlKey: true, shiftKey: true } )

    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'fires the handler once a full multi-press sequence completes', () => {
    const handler = vi.fn()
    const listener = buildKeydownHandler( [
      { sequences: [ 'ctrl+c a' ], handler, required: false },
    ] )

    press( listener, { key: 'c', ctrlKey: true } )
    expect( handler ).not.toHaveBeenCalled()

    press( listener, { key: 'a' } )
    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'calls preventDefault automatically for `required` bindings', () => {
    const handler = vi.fn()
    const listener = buildKeydownHandler( [
      { sequences: [ 'ctrl+f' ], handler, required: true },
    ] )

    const event = new KeyboardEvent( 'keydown', { key: 'f', code: 'KeyF', ctrlKey: true } )
    listener( event as any )

    expect( event.defaultPrevented ).toBe( true )
    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'does not call preventDefault for non-`required` bindings', () => {
    const handler = vi.fn()
    const listener = buildKeydownHandler( [
      { sequences: [ 'ctrl+f' ], handler, required: false },
    ] )

    const event = new KeyboardEvent( 'keydown', { key: 'f', code: 'KeyF', ctrlKey: true } )
    listener( event as any )

    expect( event.defaultPrevented ).toBe( false )
  } )

  it( 'ignores a keydown mid-IME-composition (does not double-fire alongside committing the composition)', () => {
    const handler = vi.fn()
    const listener = buildKeydownHandler( [
      { sequences: [ 'a' ], handler, required: false },
    ] )

    const composingEvent = new KeyboardEvent( 'keydown', { key: 'a', code: 'KeyA', isComposing: true } )
    listener( composingEvent as any )

    expect( handler ).not.toHaveBeenCalled()

    // Once composition ends, the same key press fires normally
    press( listener, { key: 'a' } )
    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  describe( 'triple-press regression (the react-hotkeys "g g g fires g g twice" bug)', () => {
    beforeEach( () => vi.useFakeTimers() )
    afterEach( () => vi.useRealTimers() )

    it( 'does not double-fire a two-press sequence when its terminal key is pressed a third time', () => {
      const handler = vi.fn()
      const listener = buildKeydownHandler( [
        { sequences: [ 'ctrl+c a' ], handler, required: false },
      ] )

      // Complete the sequence once: hold ctrl+c, release, press a.
      press( listener, { key: 'c', ctrlKey: true } )
      press( listener, { key: 'a' } )
      expect( handler ).toHaveBeenCalledTimes( 1 )

      // Press the terminal key ('a') twice more in quick succession, without redoing
      // 'ctrl+c' first - a naive "rolling window" matcher (the bug this migration
      // exists to retire) would fire again; the correct behaviour is that each bare
      // 'a' press mismatches the sequence's first required press and resets.
      vi.advanceTimersByTime( 10 )
      press( listener, { key: 'a' } )
      vi.advanceTimersByTime( 10 )
      press( listener, { key: 'a' } )

      expect( handler ).toHaveBeenCalledTimes( 1 )
    } )

    it( 'fires again on a genuine second full press of the sequence', () => {
      const handler = vi.fn()
      const listener = buildKeydownHandler( [
        { sequences: [ 'ctrl+c a' ], handler, required: false },
      ] )

      press( listener, { key: 'c', ctrlKey: true } )
      press( listener, { key: 'a' } )
      expect( handler ).toHaveBeenCalledTimes( 1 )

      vi.advanceTimersByTime( 10 )

      press( listener, { key: 'c', ctrlKey: true } )
      press( listener, { key: 'a' } )
      expect( handler ).toHaveBeenCalledTimes( 2 )
    } )
  } )
} )
