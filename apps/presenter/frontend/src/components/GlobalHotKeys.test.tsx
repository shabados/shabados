import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import GlobalHotKeys from './GlobalHotKeys'

describe( 'GlobalHotKeys', () => {
  it( 'fires the matching handler and still renders children (pass-through)', async () => {
    const handler = vi.fn()

    render(
      <GlobalHotKeys keyMap={{ test: [ 'ctrl+k' ] }} handlers={{ test: handler }}>
        <div>children</div>
      </GlobalHotKeys>,
    )

    expect( screen.getByText( 'children' ) ).toBeInTheDocument()

    const user = userEvent.setup()
    await user.keyboard( '{Control>}{k}{/Control}' )

    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'preventDefaults automatically for entries marked `required`', () => {
    const handler = vi.fn()

    render( <GlobalHotKeys keyMap={{ test: [ 'ctrl+k' ] }} handlers={{ test: handler }} required={{ test: true }} /> )

    const event = new KeyboardEvent( 'keydown', {
      key: 'k', code: 'KeyK', ctrlKey: true, bubbles: true, cancelable: true,
    } )
    window.dispatchEvent( event )

    expect( event.defaultPrevented ).toBe( true )
  } )

  it( 'does not preventDefault for entries not marked `required`', () => {
    const handler = vi.fn()

    render( <GlobalHotKeys keyMap={{ test: [ 'ctrl+k' ] }} handlers={{ test: handler }} /> )

    const event = new KeyboardEvent( 'keydown', {
      key: 'k', code: 'KeyK', ctrlKey: true, bubbles: true, cancelable: true,
    } )
    window.dispatchEvent( event )

    expect( event.defaultPrevented ).toBe( false )
    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'renders nothing extra when there are no children', () => {
    const { container } = render( <GlobalHotKeys keyMap={{}} handlers={{}} /> )

    expect( container ).toBeEmptyDOMElement()
  } )

  it( 'does not error and skips a null keyMap entry (a disabled/cleared binding)', () => {
    const handler = vi.fn()

    render( <GlobalHotKeys keyMap={{ test: null as any }} handlers={{ test: handler }} /> )

    expect( () => fireEvent.keyDown( document, { key: 'k', code: 'KeyK', ctrlKey: true } ) ).not.toThrow()
    expect( handler ).not.toHaveBeenCalled()
  } )
} )
