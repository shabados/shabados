import { ManyClientPartialSettings, ManyClientSettings, PartialSettings, RequiredSettings } from '@presenter/contract'
import { mutableValue, readOnly, subscribable } from '@presenter/node'
import { merge } from '@presenter/swiss-knife'
import { omit, pick } from 'radashi'

import { GlobalSettings } from '#~/services/global-settings'

type SettingsStateOptions = {
  globalSettings: GlobalSettings,
}

const createSettingsState = ( { globalSettings }: SettingsStateOptions ) => {
  const manyClientSettings = subscribable<ManyClientSettings>( mutableValue( {} ) )
  const publicSettings = subscribable( mutableValue<ManyClientSettings>( {} ) )

  const omitPrivateClients = ( allSettings: ManyClientPartialSettings ) => pick(
    allSettings,
    ( _, id ) => !manyClientSettings.get()[ id ]?.private
  )

  const removeClientSettings = ( id: string ) => {
    manyClientSettings.set( omit( manyClientSettings.get(), [ id ] ) )
  }

  const setSettings = ( id: string, { local, global, clients }: PartialSettings ) => {
    if ( global ) globalSettings.save( global )

    const newSettings = merge( manyClientSettings.get(), {
      // Only accept setting changes for public devices
      ...( clients && omitPrivateClients( clients ) ),
      ...( local && { [ id ]: local } ),
    } ) as ManyClientSettings

    manyClientSettings.set( newSettings )
  }

  const getClientSettings = ( id: string ): RequiredSettings => {
    const clients = omit( publicSettings.get(), [ id ] )
    const local = manyClientSettings.get()[ id ]
    const global = globalSettings.get()

    return { clients, local, global }
  }

  manyClientSettings.onChange(
    ( all ) => publicSettings.set( omitPrivateClients( all ) as ManyClientSettings )
  )

  return {
    getClientSettings,
    removeClientSettings,
    setSettings,
    publicSettings: readOnly( publicSettings ),
  }
}

export default createSettingsState
