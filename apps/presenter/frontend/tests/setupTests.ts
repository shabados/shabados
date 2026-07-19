import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

vi.mock( 'detect-browser' )
vi.mock( 'notistack' )

// @testing-library/react's own automatic per-test cleanup only registers itself when it
// detects a global `afterEach` (e.g. vitest's `test.globals: true`) - this project's
// vitest config doesn't set that, so without this, components stay mounted (and any
// window/document event listeners they attached stay attached) across tests within the
// same file, leaking state between them.
afterEach( cleanup )

global.fetch = vi.fn()

// happy-dom's KeyboardEvent doesn't implement `getModifierState` at all (it's simply
// absent from the class), but tinykeys - the hotkey-matching engine - requires it to
// detect "extra" held modifiers that aren't part of a binding. Polyfill it from the
// standard modifier boolean properties happy-dom does track.
if ( !KeyboardEvent.prototype.getModifierState ) {
  const MODIFIER_PROPERTIES: Record<string, string> = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  }

  KeyboardEvent.prototype.getModifierState = function getModifierState( key: string ) {
    const property = MODIFIER_PROPERTIES[ key ]
    return property ? !!( this as any )[ property ] : false
  }
}

const actualConsole = console.error

// We do not want to know about any errors that occur during teardown
afterEach( () => {
  console.error = vi.fn()
} )

beforeEach( () => {
  console.error = actualConsole
} )
