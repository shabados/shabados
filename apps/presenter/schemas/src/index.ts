import clientSchemaDefinition from './schemas/client/v1'
import serverSchemaDefinition from './schemas/server/v1'

export const definitions = {
  clientSettings: clientSchemaDefinition,
  serverSettings: serverSchemaDefinition,
} as const

export * from './migrate'
