/**
 * Translates keyMap.ts's mousetrap-style hotkey strings ('ctrl+shift+f', 'ctrl+c a')
 * into tinykeys' `createKeybindingsHandler` grammar
 * (`<press> <press> ...` where `<press> = <mods>+<key>`).
 *
 * This is the ONLY place that knows both grammars - every other module only ever
 * sees mousetrap-style strings (from keyMap.ts / the `hotkeys` setting) or
 * tinykeys-style strings (fed straight into the engine).
 */

// Modifiers keyMap.ts writes lowercase, mapped to tinykeys' expected names.
const MODIFIER_TOKENS = [ 'ctrl', 'cmd', 'meta', 'shift', 'alt', 'win' ] as const

const MODIFIER_TRANSLATE: Record<typeof MODIFIER_TOKENS[number], string> = {
  ctrl: 'Control',
  cmd: 'Meta',
  meta: 'Meta',
  shift: 'Shift',
  alt: 'Alt',
  win: 'Meta',
}

// Matches a run of `<modifier>+` prefixes, leaving whatever remains (which may
// itself contain a literal '+' - see SYMBOL_KEYS below) as the key.
const MODIFIER_PREFIX = new RegExp( `^((?:(?:${MODIFIER_TOKENS.join( '|' )})\\+)*)(.+)$`, 'i' )

/**
 * Keys that are symbols on a US layout. Translated via `KeyboardEvent.code` so they're
 * layout-safe, since tinykeys matches a key string against either `event.key` or
 * `event.code`. `optionalShift` marks symbols that require Shift to type on a US
 * layout (e.g. '+') but where keyMap.ts's string doesn't say so explicitly - Shift is
 * added as an *optional* modifier so it doesn't fail to match when Shift is,
 * in practice, being held.
 */
const SYMBOL_KEYS: Record<string, { key: string, optionalShift?: boolean }> = {
  '+': { key: 'Equal', optionalShift: true },
  '=': { key: 'Equal' },
  '-': { key: 'Minus' },
  ',': { key: 'Comma' },
  '.': { key: 'Period' },
  '/': { key: 'Slash' },
}

// Named keys that don't map 1:1 onto `KeyboardEvent.key`/`.code`.
// 'space' is deliberately mapped to the `Space` *code*, not the literal ' ' character,
// because tinykeys' `parseKeybinding` splits whole sequences on literal spaces.
const KEY_NAME_MAP: Record<string, string> = {
  esc: 'Escape',
  enter: 'Enter',
  return: 'Enter',
  space: 'Space',
  tab: 'Tab',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pagedown: 'PageDown',
  pageup: 'PageUp',
}

const translatePress = ( press: string ): string => {
  const [ , modsRaw = '', rawKey = press ] = press.match( MODIFIER_PREFIX ) ?? []

  const modifiers = modsRaw
    .split( '+' )
    .filter( Boolean )
    .map( ( mod ) => MODIFIER_TRANSLATE[ mod.toLowerCase() as typeof MODIFIER_TOKENS[number] ] )

  const symbol = SYMBOL_KEYS[ rawKey ]
  const named = KEY_NAME_MAP[ rawKey.toLowerCase() ]
  const key = symbol?.key ?? named ?? rawKey

  const optionalModifiers = symbol?.optionalShift && !modifiers.includes( 'Shift' )
    ? [ '[Shift]' ]
    : []

  return [ ...modifiers, ...optionalModifiers, key ].join( '+' )
}

/** Translates one full mousetrap-style sequence (space-separated presses). */
export const translateSequence = ( sequence: string ): string => sequence
  .trim()
  .split( /\s+/ )
  .map( translatePress )
  .join( ' ' )
