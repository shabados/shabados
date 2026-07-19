import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { COPY_SHORTCUTS } from '#~/helpers/keyMap'

const mockUseLocalSettings = vi.fn()
const mockCopyToClipboard = vi.fn()

vi.mock( '#~/services/settings', () => ( {
  useLocalSettings: () => mockUseLocalSettings(),
} ) )

vi.mock( '#~/services/content', () => ( {
  useContent: () => ( {
    lines: [ { gurmukhi: 'gurmukhi one' }, { gurmukhi: 'gurmukhi two' } ],
    line: { gurmukhi: 'gurmukhi one', sourcePage: 1, shabad: { sourceId: 1, writerId: 1 } },
  } ),
} ) )

vi.mock( '#~/hooks', () => ( {
  useCopyToClipboard: () => mockCopyToClipboard,
  useTranslations: () => ( {} ),
} ) )

vi.mock( '#~/helpers/line', () => ( {
  customiseLine: ( line: string ) => line,
  getTransliterators: () => ( {} ),
} ) )

// eslint-disable-next-line import/first
import CopyHotkeys from './CopyHotkeys'

describe( 'CopyHotkeys', () => {
  it( 'fires a COPY_SHORTCUTS default sequence end-to-end', () => {
    mockUseLocalSettings.mockReturnValue( [ { hotkeys: {}, lineEnding: true }, vi.fn() ] )

    render( <CopyHotkeys><div>content</div></CopyHotkeys> )

    // COPY_SHORTCUTS.copyGurmukhiUnicode defaults to 'ctrl+c g'
    fireEvent.keyDown( document, { key: 'c', code: 'KeyC', ctrlKey: true } )
    fireEvent.keyDown( document, { key: 'g', code: 'KeyG' } )

    expect( mockCopyToClipboard ).toHaveBeenCalled()
  } )

  it( 'a user rebind (settings override) changes which sequence fires', () => {
    mockUseLocalSettings.mockReturnValue( [
      { hotkeys: { [ COPY_SHORTCUTS.copyGurmukhiUnicode.name ]: [ 'ctrl+c shift+z' ] }, lineEnding: true },
      vi.fn(),
    ] )

    render( <CopyHotkeys><div>content</div></CopyHotkeys> )

    // Old default no longer fires
    fireEvent.keyDown( document, { key: 'c', code: 'KeyC', ctrlKey: true } )
    fireEvent.keyDown( document, { key: 'g', code: 'KeyG' } )
    expect( mockCopyToClipboard ).not.toHaveBeenCalled()

    // New, user-configured sequence fires instead
    fireEvent.keyDown( document, { key: 'c', code: 'KeyC', ctrlKey: true } )
    fireEvent.keyDown( document, { key: 'Z', code: 'KeyZ', shiftKey: true } )
    expect( mockCopyToClipboard ).toHaveBeenCalled()
  } )
} )
