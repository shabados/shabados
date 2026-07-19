import { ReactNode, useMemo } from 'react'

import { HotkeyHandlerMap, ResolvedHotkey, useHotkeys } from '#~/helpers/hotkeys'
import { KeyMap } from '#~/helpers/utils'

type GlobalHotKeysProps = {
  keyMap: KeyMap,
  handlers: HotkeyHandlerMap,
  /** Per-entry `required` flags (same keys as `keyMap`/`handlers`) - required entries
   *  get an automatic `event.preventDefault()` before their handler runs. Entries
   *  absent from this map default to `required: false`. */
  required?: Record<string, boolean>,
  children?: ReactNode,
}

const GlobalHotKeys = ( {
  keyMap, handlers, required = {}, children = null,
}: GlobalHotKeysProps ) => {
  // Platform (ctrl->cmd) mapping is the caller's responsibility: every consumer builds
  // its keyMap via resolveHotkeys/resolveGroup, which already applies it. Mapping again
  // here would silently double-transform if the remap ever became non-idempotent.
  const resolved: ResolvedHotkey[] = useMemo( () => Object
    .entries( keyMap )
    .map( ( [ name, sequences ] ) => ( {
      name,
      label: name,
      group: '',
      required: !!required[ name ],
      sequences: sequences ?? [],
    } ) ), [ keyMap, required ] )

  useHotkeys( resolved, handlers, { target: window, active: true } )

  return children
}

export default GlobalHotKeys
