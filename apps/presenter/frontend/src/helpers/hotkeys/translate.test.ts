import { parseKeybinding } from 'tinykeys'
import { describe, expect, it } from 'vitest'

import { COPY_SHORTCUTS, GLOBAL_SHORTCUTS, NAVIGATOR_SHORTCUTS } from '#~/helpers/keyMap'

import { translateSequence } from './translate'

describe( 'translateSequence', () => {
  it( 'translates a simple modifier combo', () => {
    // The key part passes through untouched - tinykeys matches keys case-insensitively.
    expect( translateSequence( 'ctrl+shift+f' ) ).toBe( 'Control+Shift+f' )
  } )

  it( 'translates a multi-press sequence (hold, release, then press)', () => {
    expect( translateSequence( 'ctrl+c a' ) ).toBe( 'Control+c a' )
  } )

  it( 'translates a multi-press sequence with a modifier on the second press', () => {
    expect( translateSequence( 'ctrl+c shift+a' ) ).toBe( 'Control+c Shift+a' )
  } )

  it( 'translates named keys to KeyboardEvent.key names', () => {
    expect( translateSequence( 'esc' ) ).toBe( 'Escape' )
    expect( translateSequence( 'enter' ) ).toBe( 'Enter' )
    expect( translateSequence( 'return' ) ).toBe( 'Enter' )
    expect( translateSequence( 'PageDown' ) ).toBe( 'PageDown' )
    expect( translateSequence( 'PageUp' ) ).toBe( 'PageUp' )
    expect( translateSequence( 'up' ) ).toBe( 'ArrowUp' )
    expect( translateSequence( 'down' ) ).toBe( 'ArrowDown' )
    expect( translateSequence( 'home' ) ).toBe( 'Home' )
    expect( translateSequence( 'end' ) ).toBe( 'End' )
  } )

  it( 'translates the space key to the Space *code*, not a literal space character', () => {
    // A literal ' ' would break tinykeys' own space-separated multi-press parsing.
    expect( translateSequence( 'space' ) ).toBe( 'Space' )
    expect( translateSequence( 'ctrl+space' ) ).toBe( 'Control+Space' )
  } )

  it( 'translates shift-ambiguous symbol keys via KeyboardEvent.code with optional Shift', () => {
    // 'ctrl++' doesn't say "shift" explicitly, but producing '+' on a US layout needs it -
    // Shift is added as an *optional* modifier so the binding still matches.
    expect( translateSequence( 'ctrl++' ) ).toBe( 'Control+[Shift]+Equal' )
    // '=' and '+' are the same physical key; the explicit-shift variant needs no help.
    expect( translateSequence( 'ctrl+shift+=' ) ).toBe( 'Control+Shift+Equal' )
  } )

  it( 'translates non-ambiguous symbol keys via KeyboardEvent.code', () => {
    expect( translateSequence( 'ctrl+-' ) ).toBe( 'Control+Minus' )
    expect( translateSequence( 'ctrl+,' ) ).toBe( 'Control+Comma' )
    expect( translateSequence( 'ctrl+/' ) ).toBe( 'Control+Slash' )
    expect( translateSequence( 'shift+,' ) ).toBe( 'Shift+Comma' )
    expect( translateSequence( 'shift+.' ) ).toBe( 'Shift+Period' )
  } )

  it( 'passes plain single keys through untouched', () => {
    expect( translateSequence( 'q' ) ).toBe( 'q' )
    expect( translateSequence( '0' ) ).toBe( '0' )
  } )

  it( 'every catalogued sequence (Global/Copy/Navigator) parses without throwing', () => {
    const catalogue = { ...GLOBAL_SHORTCUTS, ...COPY_SHORTCUTS, ...NAVIGATOR_SHORTCUTS }

    Object.values( catalogue ).forEach( ( { sequences } ) => {
      sequences.forEach( ( sequence ) => {
        expect( () => parseKeybinding( translateSequence( sequence ) ) ).not.toThrow()
      } )
    } )
  } )
} )
