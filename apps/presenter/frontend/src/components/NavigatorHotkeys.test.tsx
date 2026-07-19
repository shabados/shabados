import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NAVIGATOR_SHORTCUTS } from '#~/helpers/keyMap'
import { setLine } from '#~/services/content'
import { setMainLine } from '#~/services/tracker'

const mockUseLocalSettings = vi.fn()

vi.mock( '#~/services/settings', () => ( {
  useLocalSettings: () => mockUseLocalSettings(),
} ) )

const LINES = [ { id: 'line-0' }, { id: 'line-1' }, { id: 'line-2' } ]

vi.mock( '#~/services/content', () => ( {
  useContent: () => ( { content: { type: 'shabad', lines: LINES }, lineId: 'line-1' } ),
  setLine: vi.fn(),
  setNextContent: vi.fn(),
  setPreviousContent: vi.fn(),
} ) )

vi.mock( '#~/services/tracker', () => ( {
  useTracker: () => ( { mainLineId: 'line-main', nextLineId: 'line-next' } ),
  setMainLine: vi.fn(),
  setNextLine: vi.fn(),
} ) )

vi.mock( '#~/hooks', () => ( { useWindowFocus: () => true } ) )

vi.mock( '#~/helpers/auto-jump', () => ( { getJumpLines: () => [] } ) )

// eslint-disable-next-line import/first
import NavigatorHotKeys from './NavigatorHotkeys'

describe( 'NavigatorHotkeys', () => {
  it( 'fires a NAVIGATOR_SHORTCUTS default sequence end-to-end when active', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active /> )

    // NAVIGATOR_SHORTCUTS.setMainLine defaults to 'ctrl+space'
    fireEvent.keyDown( document, { key: ' ', code: 'Space', ctrlKey: true } )

    expect( setMainLine ).toHaveBeenCalledWith( 'line-1' )
  } )

  it( 'does not fire when `active` is false', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active={false} /> )

    fireEvent.keyDown( document, { key: ' ', code: 'Space', ctrlKey: true } )

    expect( setMainLine ).not.toHaveBeenCalled()
  } )

  it( 'a user rebind (settings override) changes which sequence fires', () => {
    mockUseLocalSettings.mockReturnValue( [
      { hotkeys: { [ NAVIGATOR_SHORTCUTS.setMainLine.name ]: [ 'ctrl+j' ] } },
      vi.fn(),
    ] )

    render( <NavigatorHotKeys active /> )

    // Old default no longer fires
    fireEvent.keyDown( document, { key: ' ', code: 'Space', ctrlKey: true } )
    expect( setMainLine ).not.toHaveBeenCalled()

    // New, user-configured sequence fires instead
    fireEvent.keyDown( document, { key: 'j', code: 'KeyJ', ctrlKey: true } )
    expect( setMainLine ).toHaveBeenCalledWith( 'line-1' )
  } )

  it( 'jumps to a LINE_HOTKEYS letter (jump-to-line), unaffected by settings', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active /> )

    // LINE_HOTKEYS[0] === '1'
    fireEvent.keyDown( document, { key: '1', code: 'Digit1' } )

    expect( setLine ).toHaveBeenCalled()
  } )

  // Regression: previousLine/nextLine used an unimported `findLineIndex`, and
  // goMainLine/goJumpLine read never-declared `mainLineId`/`nextLineId` - all four threw
  // ReferenceErrors instead of navigating.
  it( 'previousLine moves to the line before the current one', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active /> )

    // NAVIGATOR_SHORTCUTS.previousLine defaults include 'j'
    fireEvent.keyDown( document, { key: 'j', code: 'KeyJ' } )

    expect( setLine ).toHaveBeenCalledWith( 'line-0' )
  } )

  it( 'nextLine moves to the line after the current one (mouse-click-shaped handler)', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active /> )

    // NAVIGATOR_SHORTCUTS.nextLine defaults include 'l' - dispatched on document.body so
    // the handler's `nodeName === 'BODY'` guard passes.
    fireEvent.keyDown( document.body, { key: 'l', code: 'KeyL' } )

    expect( setLine ).toHaveBeenCalledWith( 'line-2' )
  } )

  it( 'goMainLine jumps straight to the tracked main line', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active /> )

    // NAVIGATOR_SHORTCUTS.goMainLine defaults to 'shift+,'
    fireEvent.keyDown( document, { key: ',', code: 'Comma', shiftKey: true } )

    expect( setLine ).toHaveBeenCalledWith( 'line-main' )
  } )

  it( 'goJumpLine jumps to the tracked next (jump) line', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {} }, vi.fn() ] )

    render( <NavigatorHotKeys active /> )

    // NAVIGATOR_SHORTCUTS.goJumpLine defaults to 'shift+.'
    fireEvent.keyDown( document, { key: '.', code: 'Period', shiftKey: true } )

    expect( setLine ).toHaveBeenCalledWith( 'line-next' )
  } )
} )
