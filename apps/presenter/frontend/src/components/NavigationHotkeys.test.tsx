import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FocusRovingApi, FocusRovingOptions, useFocusRoving, withNavigationHotkeys } from './NavigationHotkeys'

type TestListProps = FocusRovingApi & { onClickIndex?: ( index: number ) => void }

const ITEMS = [ 'one', 'two', 'three' ]

const TestList = ( { register, focused, onClickIndex = () => {} }: TestListProps ) => (
  <ul>
    {ITEMS.map( ( item, index ) => (
      <li
        key={item}
        data-testid={item}
        className={focused === index ? 'focused' : ''}
        ref={( ref ) => register( index, ref )}
        onClick={() => onClickIndex( index )}
      >
        {item}
      </li>
    ) )}
  </ul>
)

const renderList = ( options: FocusRovingOptions = {}, props: Partial<TestListProps> = {} ) => {
  const Wrapped = withNavigationHotkeys( options )( TestList )
  return render( <Wrapped {...props} /> )
}

describe( 'useFocusRoving / withNavigationHotkeys', () => {
  it( 'ArrowDown/ArrowUp move focus forward/backward', () => {
    renderList( { arrowKeys: true } )

    expect( screen.getByTestId( 'one' ) ).toHaveClass( 'focused' )

    fireEvent.keyDown( document, { key: 'ArrowDown', code: 'ArrowDown' } )
    expect( screen.getByTestId( 'two' ) ).toHaveClass( 'focused' )

    fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } )
    expect( screen.getByTestId( 'one' ) ).toHaveClass( 'focused' )
  } )

  it( 'wraps around by default when moving past the last/first item', () => {
    renderList( { arrowKeys: true } )

    fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } )
    expect( screen.getByTestId( 'three' ) ).toHaveClass( 'focused' )

    fireEvent.keyDown( document, { key: 'ArrowDown', code: 'ArrowDown' } )
    expect( screen.getByTestId( 'one' ) ).toHaveClass( 'focused' )
  } )

  it( 'does not wrap around when wrapAround is false', () => {
    renderList( { arrowKeys: true, wrapAround: false } )

    fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } )
    // Already at the first item ('one'), and wrapAround is off - stays put
    expect( screen.getByTestId( 'one' ) ).toHaveClass( 'focused' )
  } )

  it( 'a LINE_HOTKEYS character jumps directly to that index', () => {
    renderList( { arrowKeys: true, lineKeys: true } )

    // LINE_HOTKEYS[2] === '3'
    fireEvent.keyDown( document, { key: '3', code: 'Digit3' } )

    expect( screen.getByTestId( 'three' ) ).toHaveClass( 'focused' )
  } )

  it( 'clickOnFocus triggers a real click on the newly-focused DOM node', () => {
    const onClickIndex = vi.fn()
    renderList( { arrowKeys: true, clickOnFocus: true }, { onClickIndex } )

    fireEvent.keyDown( document, { key: 'ArrowDown', code: 'ArrowDown' } )

    expect( onClickIndex ).toHaveBeenCalledWith( 1 )
  } )

  it( 'Enter triggers a simulated click when clickOnFocus is false and enter is in the keymap', () => {
    const onClickIndex = vi.fn()
    renderList( { arrowKeys: true, clickOnFocus: false }, { onClickIndex } )

    fireEvent.keyDown( document, { key: 'Enter', code: 'Enter' } )

    expect( onClickIndex ).toHaveBeenCalledWith( 0 )
  } )

  it( 'injects register/updateFocus/focused with the exact prop names the legacy HOC used', () => {
    const Consumer = ( props: FocusRovingApi ) => {
      expect( typeof props.register ).toBe( 'function' )
      expect( typeof props.updateFocus ).toBe( 'function' )
      return <div>ok</div>
    }
    const Wrapped = withNavigationHotkeys( {} )( Consumer )

    render( <Wrapped /> )

    expect( screen.getByText( 'ok' ) ).toBeInTheDocument()
  } )
} )
