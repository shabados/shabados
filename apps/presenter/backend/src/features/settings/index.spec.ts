import { SETTINGS_FILE } from '@presenter/node'
import { describe, expect, it, vi } from 'vitest'
import waitForExpect from 'wait-for-expect'

import { createServer, createSocketClient } from '~/../test/utils/socket'
import { writeJSON } from '~/helpers/files'
import createGlobalSettings from '~/services/global-settings'

import createSettingsModule from '.'

vi.mock( '~/helpers/files' )

const setup = () => {
  const { httpServer, socketServer } = createServer()

  const globalSettings = createGlobalSettings()

  const module = createSettingsModule( { socketServer, globalSettings } )

  const createClient = createSocketClient( { httpServer } )

  return { module, createClient }
}

describe( 'Settings', () => {
  describe( 'on client connection', () => {
    it( 'should send all other settings to the client', async () => {
      const { createClient } = setup()
      const client = createClient()
      await client.sendEvent( 'settings:all', { clients: { hostA: {}, hostB: {} } } )

      const settings = await client.waitForEvent( 'settings:all' )

      expect( settings.local ).toBeUndefined()
      expect( settings.clients?.hostA ).toBeDefined()
      expect( settings.clients?.hostB ).toBeDefined()
      expect( settings.global ).toBeDefined()
    } )

    it( 'should map client settings settings to local field', async () => {
      const { createClient } = setup()
      const client = createClient( { host: 'hostA' } )

      await client.sendEvent( 'settings:all', { clients: { hostA: { private: false }, hostB: {} } } )
      const settings = await client.waitForEvent( 'settings:all' )

      expect( settings.local?.private ).toBe( false )
    } )
  } )

  describe( 'on settings change', () => {
    it( 'should send the updated settings to all clients', async () => {
      const { createClient } = setup()
      const main = createClient( { host: 'main' } )
      const others = Array.from(
        { length: 4 },
        ( _, index ) => createClient( { host: index.toString() } )
      )
      await Promise.all( [ main, ...others ].map( ( client ) => client.waitForEvent( 'settings:all' ) ) )

      await main.sendEvent( 'settings:all', { local: { controllerZoom: 1.2 } } )
      const [ mainSettings, ...otherSettings ] = await Promise.all( [ main, ...others ].map( ( client ) => client.waitForEvent( 'settings:all' ) ) )

      expect( mainSettings.local?.controllerZoom ).toBe( 1.2 )
      otherSettings.forEach(
        ( settings ) => expect( settings.clients?.[ main.host ]?.controllerZoom ).toBe( 1.2 )
      )
    } )

    it( 'should omit private clients from settings', async () => {
      const { createClient } = setup()
      const client = createClient()
      const privateClient = createClient( { host: '192.168.1.100' } )

      await Promise.all( [
        client.sendEvent( 'settings:all', { local: {} } ),
        privateClient.sendEvent( 'settings:all', { local: { private: true } } ),
      ] )
      const settings = await client.waitForEvent( 'settings:all' )

      expect( settings.clients?.[ privateClient.host ] ).toBeUndefined()
    } )

    it( 'should map local to the host', async () => {
      const { createClient } = setup()
      const client = createClient( { host: 'A' } )

      await client.sendEvent( 'settings:all', { clients: { [ client.host ]: {} } } )
      const settings = await client.waitForEvent( 'settings:all' )

      expect( settings.local ).toBeDefined()
      expect( settings.clients?.[ client.host ] ).toBeUndefined()
    } )

    it( 'should ignore changes set on private clients', async () => {
      const { createClient } = setup()
      const client = createClient()
      const privateClient = createClient( { host: '192.168.1.100' } )
      await Promise.all( [
        client.sendEvent( 'settings:all', { local: {} } ),
        privateClient.sendEvent( 'settings:all', { local: { private: true } } ),
      ] )
      await Promise.all( [
        client.waitForEvent( 'settings:all' ),
        privateClient.waitForEvent( 'settings:all' ),
      ] )

      await client.sendEvent( 'settings:all', { [ privateClient.host ]: { private: false } } )
      const [ settings, privateSettings ] = await Promise.all( [
        client.waitForEvent( 'settings:all' ),
        privateClient.waitForEvent( 'settings:all' ),
      ] )

      expect( settings.clients?.[ privateClient.host ] ).toBeUndefined()
      expect( privateSettings.local?.private ).toBe( true )
    } )

    it( 'should save the global settings to file', async () => {
      const { createClient } = setup()
      const client = createClient()
      const global = { system: { multipleDisplays: false } }

      await client.sendEvent( 'settings:all', { global } )

      await waitForExpect( () => expect( writeJSON )
        .toHaveBeenCalledWith( SETTINGS_FILE, expect.objectContaining( {
          system: expect.objectContaining( { multipleDisplays: false } ),
        } ) ) )
    } )
  } )
} )
