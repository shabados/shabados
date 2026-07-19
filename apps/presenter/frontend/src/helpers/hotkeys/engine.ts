import { createKeybindingsHandler, parseKeybinding } from 'tinykeys'

import { isDev } from '#~/helpers/consts'

import { translateSequence } from './translate'

export type EngineBinding = {
  sequences: string[],
  handler: ( event: KeyboardEvent ) => void,
  required: boolean,
}

/**
 * The only place this system deviates from tinykeys' own default ignore behaviour:
 * `createKeybindingsHandler`'s default `ignore` skips events from contenteditable/
 * input/select/textarea elements. This app deliberately fires global shortcuts
 * regardless of focused element (the same "ignoreTags: []" stance the old
 * react-hotkeys `configure()` call took) - so we still ignore a held-key repeat (to
 * avoid flooding sequence matching with synthetic repeats) and, unchanged from
 * tinykeys' own default, an in-progress IME composition (`isComposing`) - firing a
 * shortcut mid-composition (e.g. committing Gurmukhi/other script input with Enter)
 * would otherwise double as a hotkey press.
 */
const ignore = ( event: KeyboardEvent ) => event.repeat || event.isComposing

/**
 * Builds one keydown listener from a flat list of bindings. `required` bindings get
 * an automatic `event.preventDefault()` before their handler runs (these are global-app/
 * core-navigation shortcuts with a native browser default - ctrl+f, Home/End scroll,
 * Tab focus, etc. - that must never leak through). Non-required bindings get no implicit
 * preventDefault; a handler that needs it still calls it itself.
 */
export const buildKeydownHandler = ( bindings: EngineBinding[] ) => {
  const keybindings: Record<string, ( event: KeyboardEvent ) => void> = {}

  bindings.forEach( ( { sequences, handler, required } ) => {
    sequences.forEach( ( sequence ) => {
      const translated = translateSequence( sequence )

      if ( isDev ) {
        try {
          parseKeybinding( translated )
        } catch ( err ) {
          // eslint-disable-next-line no-console
          console.warn( `hotkeys: could not parse sequence "${sequence}" (translated to "${translated}")`, err )
          return
        }
      }

      keybindings[ translated ] = required
        ? ( event: KeyboardEvent ) => {
          event.preventDefault()
          handler( event )
        }
        : handler
    } )
  } )

  return createKeybindingsHandler( keybindings, { ignore } )
}
