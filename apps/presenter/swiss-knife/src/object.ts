import deepmerge from '@fastify/deepmerge'

export const merge = <T, S>( target: T, source: S ) => deepmerge( {
  mergeArray: () => ( _: unknown[], source: unknown[] ) => source,
} )( target, source )
