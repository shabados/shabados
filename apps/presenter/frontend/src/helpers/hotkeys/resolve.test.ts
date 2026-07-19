import { describe, expect, it } from 'vitest'

import { Catalogue, resolveGroup, resolveHotkeys } from './resolve'

const catalogue: Catalogue = {
  toggleThing: {
    group: 'Global',
    name: 'Toggle Thing',
    sequences: [ 'ctrl+t' ],
    required: true,
  },
  otherThing: {
    group: 'Global',
    name: 'Other Thing',
    description: 'Does another thing',
    sequences: [ 'ctrl+o' ],
  },
}

describe( 'resolveHotkeys', () => {
  it( 'passes default sequences through untouched when no override exists', () => {
    const [ resolved ] = resolveHotkeys( catalogue, {}, false )

    expect( resolved.sequences ).toEqual( [ 'ctrl+t' ] )
  } )

  it( 'lets an override fully replace the default sequences for that entry', () => {
    const [ resolved ] = resolveHotkeys( catalogue, { 'Toggle Thing': [ 'ctrl+shift+t' ] }, false )

    expect( resolved.sequences ).toEqual( [ 'ctrl+shift+t' ] )
  } )

  it( 'only overrides the entry it targets, by label - not by catalogue key', () => {
    const [ , otherThing ] = resolveHotkeys( catalogue, { 'Toggle Thing': [ 'ctrl+shift+t' ] }, false )

    expect( otherThing.sequences ).toEqual( [ 'ctrl+o' ] )
  } )

  it( 'rewrites ctrl -> cmd in default sequences on Mac', () => {
    const [ resolved ] = resolveHotkeys( catalogue, {}, true )

    expect( resolved.sequences ).toEqual( [ 'cmd+t' ] )
  } )

  it( 'rewrites ctrl -> cmd in overridden sequences on Mac too', () => {
    const [ resolved ] = resolveHotkeys( catalogue, { 'Toggle Thing': [ 'ctrl+shift+t' ] }, true )

    expect( resolved.sequences ).toEqual( [ 'cmd+shift+t' ] )
  } )

  it( 'carries the `required` flag through unchanged', () => {
    const [ toggleThing, otherThing ] = resolveHotkeys( catalogue, {}, false )

    expect( toggleThing.required ).toBe( true )
    expect( otherThing.required ).toBe( false )
  } )

  it( 'carries the catalogue key as `name` and the display string as `label`', () => {
    const [ resolved ] = resolveHotkeys( catalogue, {}, false )

    expect( resolved.name ).toBe( 'toggleThing' )
    expect( resolved.label ).toBe( 'Toggle Thing' )
  } )

  it( 'resolveGroup only returns entries from the given group/subset', () => {
    const resolved = resolveGroup( { toggleThing: catalogue.toggleThing }, {}, false )

    expect( resolved ).toHaveLength( 1 )
    expect( resolved[ 0 ].name ).toBe( 'toggleThing' )
  } )
} )
