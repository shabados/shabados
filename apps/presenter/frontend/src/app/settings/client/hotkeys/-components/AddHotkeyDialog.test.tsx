import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import AddHotkeyDialog from './AddHotkeyDialog'

const pressAndRelease = ( ...keys: string[] ) => {
  keys.forEach( ( key ) => fireEvent.keyDown( window, { key } ) )
  ;[ ...keys ].reverse().forEach( ( key ) => fireEvent.keyUp( window, { key } ) )
}

describe( 'AddHotkeyDialog', () => {
  it( 'records a pressed combo via the recorder and enables Save', async () => {
    const onRecorded = vi.fn()
    render( <AddHotkeyDialog open name="Test Shortcut" assigned={{}} onRecorded={onRecorded} /> )

    pressAndRelease( 'Control', 'k' )

    await waitFor( () => expect( screen.getByText( /ctrl\+k/ ) ).toBeInTheDocument() )
    expect( screen.getByText( 'Save' ) ).not.toBeDisabled()

    fireEvent.click( screen.getByText( 'Save' ) )
    expect( onRecorded ).toHaveBeenCalledWith( 'ctrl+k' )
  } )

  it( 'blocks Save when the sequence conflicts with an already-assigned hotkey', async () => {
    const onRecorded = vi.fn()
    render(
      <AddHotkeyDialog open name="Test Shortcut" assigned={{ 'ctrl+k': 'Other Shortcut' }} onRecorded={onRecorded} />,
    )

    pressAndRelease( 'Control', 'k' )

    await waitFor( () => expect( screen.getByText( /conflict/i ) ).toBeInTheDocument() )
    expect( screen.getByText( 'Save' ) ).toBeDisabled()

    fireEvent.click( screen.getByText( 'Save' ) )
    expect( onRecorded ).not.toHaveBeenCalled()
  } )

  it( 'blocks Save when only modifier keys are pressed', async () => {
    const onRecorded = vi.fn()
    render( <AddHotkeyDialog open name="Test Shortcut" assigned={{}} onRecorded={onRecorded} /> )

    pressAndRelease( 'Control' )

    await waitFor( () => expect( screen.getByText( /combine another key/i ) ).toBeInTheDocument() )
    expect( screen.getByText( 'Save' ) ).toBeDisabled()
  } )

  it( 'Reset clears a recorded sequence', async () => {
    const onRecorded = vi.fn()
    render( <AddHotkeyDialog open name="Test Shortcut" assigned={{}} onRecorded={onRecorded} /> )

    pressAndRelease( 'Control', 'k' )
    await waitFor( () => expect( screen.getByText( 'Save' ) ).not.toBeDisabled() )

    fireEvent.click( screen.getByText( 'Reset' ) )

    expect( screen.getByText( 'Save' ) ).toBeDisabled()
  } )
} )
