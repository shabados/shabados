import { definitions, Infer } from '@presenter/schemas'
import { PartialDeep } from 'type-fest'

export type ServerSettings = Infer<typeof definitions.serverSettings.schema>
export type ClientSettings = Infer<typeof definitions.clientSettings.schema>

export type ManyClientSettings = Record<string, ClientSettings>
export type ManyClientPartialSettings = Record<string, PartialDeep<ClientSettings>>

export type RequiredSettings = {
  local: ClientSettings,
  global: ServerSettings,
  clients: ManyClientSettings,
}

export type Settings = {
  global?: ServerSettings,
  local?: ClientSettings,
  clients?: ManyClientSettings,
}

export type PartialSettings = {
  global?: PartialDeep<ServerSettings>,
  local?: PartialDeep<ClientSettings>,
  clients?: ManyClientPartialSettings,
}
