import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const mockUseLocalSettings = vi.fn()
const mockSetSettings = vi.fn()

vi.mock( '#~/services/settings', () => ( {
  useLocalSettings: () => mockUseLocalSettings(),
} ) )

// ResetButton (imported via DynamicOptions) still references the legacy controller
// module - stub it so importing this page never pulls the real module in.
vi.mock( '#~/services/controller', () => ( {
  default: { resetSettingGroup: vi.fn() },
} ) )

// eslint-disable-next-line import/first
import { Route } from '.'

const Hotkeys = Route.options.component as React.ComponentType

describe( '<Hotkeys /> (settings)', () => {
  it( 'renders every catalogue shortcut with its default sequences for a fresh (empty hotkeys) user', () => {
    // The `hotkeys` client setting defaults to `{}` until a user rebinds something -
    // this must not throw (the bug: reading `mappedKeys[name]` when `name` has no
    // override entry yet), and every catalogue default sequence should still show up.
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <Hotkeys /> )

    expect( screen.getByText( 'Toggle Fullscreen' ) ).toBeInTheDocument()
    expect( screen.getByText( 'ctrl+f' ) ).toBeInTheDocument()
  } )

  it( 'does not crash opening the delete dialog on first render (no initial `deleting` state)', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    expect( () => render( <Hotkeys /> ) ).not.toThrow()
  } )

  it( 'deleting a non-required, user-added key saves the remaining sequences', () => {
    mockUseLocalSettings.mockReturnValue( [
      { hotkeys: { 'New Controller': [ 'ctrl+x', 'ctrl+shift+x', 'ctrl+alt+n' ] } },
      mockSetSettings,
    ] )

    render( <Hotkeys /> )

    fireEvent.click( screen.getByRole( 'button', { name: 'ctrl+alt+n' } ) )
    fireEvent.click( screen.getByRole( 'button', { name: 'Delete' } ) )

    expect( mockSetSettings ).toHaveBeenCalledWith( {
      hotkeys: { 'New Controller': [ 'ctrl+x', 'ctrl+shift+x' ] },
    } )
  } )

  it( 'a required default sequence cannot be deleted', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <Hotkeys /> )

    // toggleFullscreen (ctrl+f) is `required: true` in the catalogue
    expect( screen.getByRole( 'button', { name: 'ctrl+f' } ) ).toBeDisabled()
  } )
} )
