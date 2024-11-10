import { PartialDeep } from 'type-fest'
import { InferInput, InferOutput, ObjectEntries, ObjectSchema } from 'valibot'

export type SchemaType = ObjectSchema<ObjectEntries, undefined>

export type SchemaDefinition<
  Schema extends SchemaType,
  PreviousSchema extends SchemaType,
> = {
  version: number,
  schema: Schema,
  previous?: SchemaDefinition<PreviousSchema, SchemaType>,
  up: ( from: InferOutput<PreviousSchema> ) => PartialDeep<InferInput<Schema>>,
}

export const defineSchema = <
  Schema extends SchemaType,
  PreviousSchema extends SchemaType,
>( definition: SchemaDefinition<Schema, PreviousSchema> ) => definition
