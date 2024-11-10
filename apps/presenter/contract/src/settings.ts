import { definitions, Infer } from '@presenter/schemas'

export type ServerSettings = Infer<typeof definitions.serverSettings.schema>
export type ClientSettings = Infer<typeof definitions.clientSettings.schema>

export type ManyClientSettings = Record<string, ClientSettings>

export type Settings = {
  global: ServerSettings,
  local: ClientSettings,
} & ManyClientSettings

export type PartialSettings = {
  global?: ServerSettings,
  local?: ClientSettings,
} & ManyClientSettings
