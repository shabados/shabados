import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RefObject, useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { GLOBAL_SHORTCUTS } from '#~/helpers/keyMap'

import { ResolvedHotkey } from './resolve'
import { useHotkeys } from './useHotkeys'

const toggleFullscreenController: ResolvedHotkey = {
  name: 'toggleFullscreenController',
  label: GLOBAL_SHORTCUTS.toggleFullscreenController.name,
  group: 'Global',
  required: true,
  sequences: [ 'ctrl+shift+f' ],
}

type ProbeProps = {
  resolved: ResolvedHotkey[],
  handlers: Record<string, ( event: KeyboardEvent ) => void>,
  active?: boolean,
  target?: Window | RefObject<HTMLElement | null>,
}

const Probe = ( { resolved, handlers, active = true, target = window }: ProbeProps ) => {
  useHotkeys( resolved, handlers, { active, target } )
  return <div>probe</div>
}

const ContainerProbe = ( { resolved, handlers, active = true }: Omit<ProbeProps, 'target'> ) => {
  const containerRef = useRef<HTMLDivElement>( null )
  useHotkeys( resolved, handlers, { active, target: containerRef } )
  return <div ref={containerRef} data-testid="container">container</div>
}

describe( 'useHotkeys', () => {
  it( 'fires the handler for a resolved binding, including a modifier combo', async () => {
    const handler = vi.fn()
    render( <Probe resolved={[ toggleFullscreenController ]} handlers={{ toggleFullscreenController: handler }} /> )

    const user = userEvent.setup()
    await user.keyboard( '{Control>}{Shift>}{f}{/Shift}{/Control}' )

    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'preventDefaults a `required` binding automatically', () => {
    const handler = vi.fn()
    render( <Probe resolved={[ toggleFullscreenController ]} handlers={{ toggleFullscreenController: handler }} /> )

    const event = new KeyboardEvent( 'keydown', {
      key: 'F', code: 'KeyF', ctrlKey: true, shiftKey: true, bubbles: true, cancelable: true,
    } )
    window.dispatchEvent( event )

    expect( event.defaultPrevented ).toBe( true )
  } )

  it( 'does not register a listener when `active` is false', () => {
    const handler = vi.fn()
    render( <Probe resolved={[ toggleFullscreenController ]} handlers={{ toggleFullscreenController: handler }} active={false} /> )

    fireEvent.keyDown( document, { key: 'f', code: 'KeyF', ctrlKey: true, shiftKey: true } )

    expect( handler ).not.toHaveBeenCalled()
  } )

  it( 'a settings rebind (a changed `resolved` array) takes effect: old sequence stops, new one fires', () => {
    const handler = vi.fn()
    const { rerender } = render(
      <Probe resolved={[ toggleFullscreenController ]} handlers={{ toggleFullscreenController: handler }} />,
    )

    const rebound: ResolvedHotkey = { ...toggleFullscreenController, sequences: [ 'ctrl+shift+g' ] }
    rerender( <Probe resolved={[ rebound ]} handlers={{ toggleFullscreenController: handler }} /> )

    // Old sequence no longer fires
    fireEvent.keyDown( document, { key: 'f', code: 'KeyF', ctrlKey: true, shiftKey: true } )
    expect( handler ).not.toHaveBeenCalled()

    // New sequence fires
    fireEvent.keyDown( document, { key: 'g', code: 'KeyG', ctrlKey: true, shiftKey: true } )
    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )

  it( 'respects `target`: a binding on a container ref does not fire from a window-only dispatch', () => {
    const handler = vi.fn()
    render( <ContainerProbe resolved={[ toggleFullscreenController ]} handlers={{ toggleFullscreenController: handler }} /> )

    // Dispatched only on window/document, never bubbled through the container element
    fireEvent.keyDown( document, { key: 'f', code: 'KeyF', ctrlKey: true, shiftKey: true } )

    expect( handler ).not.toHaveBeenCalled()
  } )

  it( 'an entry with no matching handler is silently skipped, not an error', () => {
    render( <Probe resolved={[ toggleFullscreenController ]} handlers={{}} /> )

    expect( () => fireEvent.keyDown( document, { key: 'f', code: 'KeyF', ctrlKey: true, shiftKey: true } ) )
      .not.toThrow()
  } )

  it( 'regains bindings after a handlers-only {} -> real-map toggle, with `active`/`resolved`/`target` constant - the NavigatorHotKeys pattern', () => {
    const handler = vi.fn()

    // Mirrors NavigatorHotKeys.tsx: useHotkeys's own `active` is always `true`, and the
    // wrapping component gates enablement by swapping its *handlers* map instead.
    const { rerender } = render(
      <Probe resolved={[ toggleFullscreenController ]} handlers={{}} active />,
    )

    fireEvent.keyDown( document, { key: 'f', code: 'KeyF', ctrlKey: true, shiftKey: true } )
    expect( handler ).not.toHaveBeenCalled()

    rerender(
      <Probe
        resolved={[ toggleFullscreenController ]}
        handlers={{ toggleFullscreenController: handler }}
        active
      />,
    )

    fireEvent.keyDown( document, { key: 'f', code: 'KeyF', ctrlKey: true, shiftKey: true } )
    expect( handler ).toHaveBeenCalledTimes( 1 )
  } )
} )
