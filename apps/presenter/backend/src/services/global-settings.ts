import { ServerSettings } from '@presenter/contract'
import { getLogger, mutableValue, SETTINGS_FILE, subscribable } from '@presenter/node'
import { definitions, getDefaults, migrate } from '@presenter/schemas'
import { merge } from '@presenter/swiss-knife'
import type { PartialDeep, ReadonlyDeep } from 'type-fest'

import { readJSON, writeJSON } from '~/helpers/files'

const log = getLogger( 'server-settings' )

const writeSettings = ( settings: ServerSettings ) => {
  log.info( `Writing settings to ${SETTINGS_FILE}` )

  return writeJSON(
    SETTINGS_FILE,
    { ...settings, schemaVersion: definitions.serverSettings.version }
  )
}

const readSettings = () => readJSON<{ schemaVersion?: number }>( SETTINGS_FILE )
  .catch( () => {
    log.warn( 'Settings file is corrupt or non-existent. Recreating', SETTINGS_FILE )

    const defaults = getDefaults( definitions.serverSettings.schema )

    return { schemaVersion: definitions.serverSettings.version, ...defaults }
  } )
  .then( ( settings ) => migrate( definitions.serverSettings, settings, settings.schemaVersion ) )

const createGlobalSettings = () => {
  const settings = subscribable( mutableValue( {} as ReadonlyDeep<ServerSettings> ) )

  const load = async () => {
    log.info( `Loading settings from ${SETTINGS_FILE}` )

    return readSettings().then( settings.set )
  }

  settings.onChange( ( settings ) => void writeSettings( settings ) )

  const save = ( changed: PartialDeep<ServerSettings> = {} ) => settings.set(
    migrate( definitions.serverSettings, merge( settings.get(), changed ) )
  )

  return { load, save, get: settings.get, onChange: settings.onChange }
}

export type GlobalSettings = ReturnType<typeof createGlobalSettings>

export default createGlobalSettings
