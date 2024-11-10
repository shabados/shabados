import { tryit } from 'radashi'
import invariant from 'tiny-invariant'
import { InferOutput, parse as vParse } from 'valibot'

import { SchemaDefinition, SchemaType } from './schema'

export const parse = vParse

export const migrate = <
  Schema extends SchemaType,
  PreviousSchema extends SchemaType,
>(
  { version, up, previous, schema }: SchemaDefinition<Schema, PreviousSchema>,
  data: unknown,
  dataVersion = 0
): InferOutput<Schema> => {
  invariant( previous, 'No previous schema definition. This should not be possible.' )

  if ( dataVersion === version ) return parse( schema, data )

  // Given the latest schema version, run backwards until we find the first schema that matches
  const [ , previousData ] = tryit( migrate )( previous, data, dataVersion )

  invariant( previousData, `Failed to migrate data from version ${dataVersion} to ${version}` )

  const upgradedData = up( previousData )
  return parse( schema, upgradedData )
}

export type Infer<T extends SchemaType> = InferOutput<T>
