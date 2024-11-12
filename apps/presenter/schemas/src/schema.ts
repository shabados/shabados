import { PartialDeep } from 'type-fest'
import { fallback, getFallbacks, InferInput, InferOutput, object, ObjectEntries, ObjectSchema } from 'valibot'

export type SchemaType = ObjectSchema<ObjectEntries, undefined>

export type SchemaDefinition<
  Schema extends SchemaType,
  PreviousSchema extends SchemaType,
> = {
  version: number,
  schema: Schema,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previous?: SchemaDefinition<PreviousSchema, any>,
  up: ( from: InferOutput<PreviousSchema> ) => PartialDeep<InferInput<Schema>>,
}

export const defineSchema = <
  Schema extends SchemaType,
  PreviousSchema extends SchemaType,
>( definition: SchemaDefinition<Schema, PreviousSchema> ) => definition

export const safeObject = <T extends ObjectEntries>( entries: T ) => {
  const o = object( entries )

  return fallback( o, getFallbacks( o ) as InferOutput<typeof o> )
}
