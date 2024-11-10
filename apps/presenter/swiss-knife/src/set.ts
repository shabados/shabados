export const setFind = <T>( set: Set<T>, predicate: ( value: T ) => boolean ) => {
  // eslint-disable-next-line no-restricted-syntax
  for ( const value of set ) {
    if ( predicate( value ) ) return value
  }

  return undefined
}

export const setHas = <T>(
  set: Set<T>,
  predicate: ( value: T ) => boolean
) => setFind( set, predicate ) !== undefined
