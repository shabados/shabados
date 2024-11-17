import { array, number, object, string } from 'valibot'
import { describe, expect, it } from 'vitest'

import { definitions } from '.'
import { getDefaults, migrate } from './migrate'
import { defineSchema, SchemaDefinition, SchemaType } from './schema'

describe( 'migrate', () => {
  describe( 'when the schema version is the same as the data version', () => {
    it( 'should return parsed data', () => {
      const schemaDefinition = defineSchema( {
        version: 1,
        schema: object( {
          name: string(),
          age: number(),
        } ),
        up: ( from ) => from,
        previous: undefined,
      } )

      const testData = {
        name: 'John',
        age: 30,
      }

      const result = migrate( schemaDefinition, testData, 1 )
      expect( result ).toEqual( testData )
    } )
  } )

  describe( 'when the schema version is greater than the data version', () => {
    it( 'should migrate data from the previous schema version to the current schema version', () => {
      const v0Definition = defineSchema( {
        version: 0,
        schema: object( {
          fullName: string(),
          yearOfBirth: number(),
        } ),
        up: ( from ) => from,
        previous: undefined,
      } )

      const v1Definition = defineSchema( {
        version: 1,
        schema: object( {
          firstName: string(),
          lastName: string(),
          age: number(),
        } ),
        up: ( from ) => {
          const [ firstName, lastName ] = from.fullName.split( ' ' )
          const currentYear = new Date().getFullYear()
          return {
            firstName,
            lastName,
            age: currentYear - from.yearOfBirth,
          }
        },
        previous: v0Definition,
      } )

      const oldData = {
        fullName: 'John Doe',
        yearOfBirth: 1990,
      }

      const result = migrate( v1Definition, oldData, 0 )

      const currentYear = new Date().getFullYear()
      expect( result ).toEqual( {
        firstName: 'John',
        lastName: 'Doe',
        age: currentYear - 1990,
      } )
    } )

    it( 'should migrate data from many previous schemas all through to the current schema version', () => {
      const v0Definition = defineSchema( {
        version: 0,
        schema: object( {
          fullName: string(),
          yearOfBirth: number(),
        } ),
        up: ( from ) => from,
        previous: undefined,
      } )

      const v1Definition = defineSchema( {
        version: 1,
        schema: object( {
          firstName: string(),
          lastName: string(),
          yearOfBirth: number(),
        } ),
        up: ( from ) => {
          const [ firstName, lastName ] = from.fullName.split( ' ' )
          return {
            firstName,
            lastName,
            yearOfBirth: from.yearOfBirth,
          }
        },
        previous: v0Definition,
      } )

      const v2Definition = defineSchema( {
        version: 2,
        schema: object( {
          names: array( string() ),
          age: number(),
        } ),
        up: ( from ) => {
          const currentYear = new Date().getFullYear()
          return {
            names: [ from.firstName, from.lastName ],
            age: currentYear - from.yearOfBirth,
          }
        },
        previous: v1Definition,
      } )

      const oldData = {
        fullName: 'John Doe',
        yearOfBirth: 1990,
      }

      const result = migrate( v2Definition, oldData, 0 )

      const currentYear = new Date().getFullYear()
      expect( result ).toEqual( {
        names: [ 'John', 'Doe' ],
        age: currentYear - 1990,
      } )
    } )
  } )
} )

describe.each( Object.entries( definitions ) )( 'definition: %s', ( _, definition ) => {
  it( `should migrate data from version 0 to version ${definition.version} without throwing`, () => {
    const v0 = getDefaults( definition.schema )

    expect( () => migrate(
      definition as unknown as SchemaDefinition<SchemaType, SchemaType>,
      v0,
      0
    ) ).not.toThrow()
  } )
} )
