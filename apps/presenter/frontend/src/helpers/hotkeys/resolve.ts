import { isMac } from '#~/helpers/consts'
import { LINE_HOTKEYS } from '#~/helpers/keyMap'

/** Shape of every entry in keyMap.ts's GLOBAL_SHORTCUTS/COPY_SHORTCUTS/NAVIGATOR_SHORTCUTS. */
export type CatalogueEntry = {
  group: string,
  name: string,
  description?: string,
  sequences: string[],
  required?: boolean,
}

export type Catalogue = Record<string, CatalogueEntry>

/** One hotkey, fully resolved: user overrides applied, platform-mapped, engine-ready. */
export type ResolvedHotkey = {
  /** Catalogue object key, e.g. 'zoomInController'. */
  name: string,
  /** Catalogue entry's display string, e.g. 'Zoom Controller In' - this is the key the
   *  `hotkeys` setting itself is stored under, so it's what settings-page consumers need. */
  label: string,
  group: string,
  description?: string,
  required: boolean,
  sequences: string[],
}

export type HotkeyHandlerMap = Record<string, ( event: KeyboardEvent ) => void>

/**
 * Merges a catalogue (or catalogue group) with the user's `hotkeys` setting overrides,
 * then applies the platform key mapping (ctrl -> cmd on Mac) uniformly to both.
 *
 * Overrides are keyed by the catalogue entry's *label* (display name) - matching both
 * the settings page's read/write contract (`setSettings({ hotkeys: { [name]: ... } })` via `useLocalSettings`,
 * where `name` is the display string) and the existing handler objects in
 * route.lazy.tsx/NavigatorHotkeys.tsx/CopyHotkeys.tsx (keyed by `*_SHORTCUTS.X.name`).
 *
 * An override, when present, fully replaces the catalogue's default sequences for that
 * entry (not merged) - this matches the settings page's own write-back semantics, which
 * already unions in the required defaults before saving.
 *
 * The platform mapping is inlined here (rather than delegating to
 * `#~/helpers/utils`'s `mapPlatformKey`) purely so `mac` stays an injectable parameter
 * for tests - `mapPlatformKey` itself always checks the real, detected `isMac`
 * regardless of any argument, so it can't be overridden from a test. Byte-identical
 * output to `mapPlatformKey` for the real (`mac = isMac`) call path.
 */
const mapPlatformKey = ( mac: boolean ) => ( key: string ) => ( mac ? key.replace( 'ctrl', 'cmd' ) : key )

export const resolveHotkeys = (
  catalogue: Catalogue,
  overrides: Record<string, string[]> = {},
  mac = isMac,
): ResolvedHotkey[] => Object.entries( catalogue ).map( ( [ name, entry ] ) => {
  const sequences = overrides[ entry.name ] ?? entry.sequences

  return {
    name,
    label: entry.name,
    group: entry.group,
    description: entry.description,
    required: !!entry.required,
    sequences: sequences.map( mapPlatformKey( mac ) ),
  }
} )

/** Alias for call sites resolving a single catalogue group (semantic clarity only). */
export const resolveGroup = resolveHotkeys

/**
 * Builds ResolvedHotkeys + handlers for the LINE_HOTKEYS jump-to-line group, shared
 * between NavigatorHotkeys.tsx and the focus-roving hook so the `.reduce` isn't
 * duplicated. Not settings-configurable - LINE_HOTKEYS is a fixed, ordered alphabet.
 */
export const lineHotkeyEntries = (
  onJump: ( index: number ) => void,
): { resolved: ResolvedHotkey[], handlers: HotkeyHandlerMap } => ( {
  resolved: LINE_HOTKEYS.map( ( key ) => ( {
    name: key,
    label: key,
    group: 'Navigator',
    required: false,
    sequences: [ key ],
  } ) ),
  handlers: LINE_HOTKEYS.reduce( ( handlers, key, index ) => ( {
    ...handlers,
    [ key ]: () => onJump( index ),
  } ), {} as HotkeyHandlerMap ),
} )
