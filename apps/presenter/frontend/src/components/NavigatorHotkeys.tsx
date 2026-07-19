import { noop } from 'radashi'
import { useCallback, useContext, useEffect, useMemo } from 'react'

import { getJumpLines } from '#~/helpers/auto-jump'
import { HistoryContext } from '#~/helpers/contexts'
import { HotkeyHandlerMap, lineHotkeyEntries, resolveGroup } from '#~/helpers/hotkeys'
import { NAVIGATOR_SHORTCUTS } from '#~/helpers/keyMap'
import { findLineIndex } from '#~/helpers/line'
import { useWindowFocus } from '#~/hooks'
import { setLine, setNextContent, setPreviousContent, useContent } from '#~/services/content'
import { useLocalSettings } from '#~/services/settings'
import { setMainLine as setTrackerMainLine, useTracker } from '#~/services/tracker'

import GlobalHotKeys from './GlobalHotKeys'

type NavigatorHotKeysProps = {
  active?: boolean,
  children?: React.ReactNode | null,
  mouseTargetRef?: { current: EventTarget | null },
}

const NavigatorHotKeys = (
  { active = false, children = null, mouseTargetRef = { current: null } }: NavigatorHotKeysProps
) => {
  const { viewedLines } = useContext( HistoryContext )

  const { content, lineId } = useContent()
  const lines = content?.lines
  const { mainLineId, nextLineId } = useTracker()

  // firstLine/lastLine preventDefault explicitly, despite being non-`required` in the
  // catalogue, because they still fight Home/End/ctrl+up/ctrl+down's native scroll.
  const goFirstLine = ( event: KeyboardEvent ) => {
    event.preventDefault()

    if ( !lines ) return

    const [ firstLine ] = lines

    // Go to the previous shabad if the first line is highlighted (but not for banis)
    if ( content.type === 'shabad' && lineId === firstLine.id ) setPreviousContent()
    else setLine( firstLine.id )
  }

  const goLastLine = ( event: KeyboardEvent ) => {
    event.preventDefault()

    if ( !lines ) return

    const lastLine = lines[ lines.length - 1 ]

    // Go to the next shabad if the last line is highlighted (but not for banis)
    if ( content.type === 'shabad' && lineId === lastLine.id ) setNextContent()
    else setLine( lastLine.id )
  }

  const autoToggle = useCallback( () => {
    // if ( content.type === 'shabad' ) controller.autoToggleShabad( content )
    // else if ( content.type === 'bani' ) controller.autoToggleBani( content )
  }, [ content ] )

  const restoreLine = () => {
    const ids = Object
      .entries( viewedLines )
      .sort( ( [ , t1 ], [ , t2 ] ) => new Date( t1 ) - new Date( t2 ) )
      .map( ( [ id ] ) => id )

    if ( lineId || !ids ) return

    setLine( ids[ ids.length - 1 ] )
  }

  const setMainLine = () => lineId && setTrackerMainLine( lineId )

  const goMainLine = () => mainLineId && setLine( mainLineId )

  const goJumpLine = () => nextLineId && setLine( nextLineId )

  const goPreviousLine = useCallback( () => {
    if ( !lines ) return

    const currentLineIndex = findLineIndex( lines, lineId )
    const { id } = lines[ currentLineIndex ] || {}

    if ( id && currentLineIndex > 0 ) {
      setLine( lines[ currentLineIndex - 1 ].id )
    }
  }, [ lines, lineId ] )

  const goNextLine = useCallback( ( {
    target: { nodeName, className: targetClass, parentNode },
  } ) => {
    const { current: mouseTarget } = mouseTargetRef

    /* Near the bottom of the screen the targetClass
    becomes 'controller-container` instead of presenter.
    In this case, we check the targetClass or its parent node's class
    (which if the target is controller container, will be presenter) */
    if (
      // No lines
      !lines
      // Or a hotkey didn't trigger it, and another active element was clicked on
      || ( nodeName !== 'BODY' && ![ targetClass, parentNode.className ].includes( mouseTarget.className ) )
    ) return

    const currentLineIndex = findLineIndex( lines, lineId )
    const { id } = lines[ currentLineIndex ] || {}

    if ( id && currentLineIndex < lines.length - 1 ) {
      setLine( lines[ currentLineIndex + 1 ].id )
    }
  }, [ lines, lineId, mouseTargetRef ] )

  const goToIndex = ( index ) => {
    if ( !lines ) return

    // Pre-existing bug fixed in passing: matches the sibling, working call in
    // app/presenter/controller/navigator/index.tsx's own `goToIndex` - `getJumpLines`
    // takes the whole `content` object, not an (undefined) `{ shabad, bani }`.
    const jumpLines = getJumpLines( content )
    const id = jumpLines[ index ]

    setLine( id )
  }

  // Navigation Hotkey Handlers
  // (not typed as `HotkeyHandlerMap` - several of these predate this migration with
  // looser, non-KeyboardEvent handler signatures, e.g. goNextLine's mouse-shaped param)
  const hotKeyHandlers = {
    [ NAVIGATOR_SHORTCUTS.previousLine.name ]: goPreviousLine,
    [ NAVIGATOR_SHORTCUTS.nextLine.name ]: goNextLine,
    [ NAVIGATOR_SHORTCUTS.firstLine.name ]: goFirstLine,
    [ NAVIGATOR_SHORTCUTS.lastLine.name ]: goLastLine,
    [ NAVIGATOR_SHORTCUTS.autoToggle.name ]: autoToggle,
    [ NAVIGATOR_SHORTCUTS.restoreLine.name ]: restoreLine,
    [ NAVIGATOR_SHORTCUTS.setMainLine.name ]: setMainLine,
    [ NAVIGATOR_SHORTCUTS.goJumpLine.name ]: goJumpLine,
    [ NAVIGATOR_SHORTCUTS.goMainLine.name ]: goMainLine,
  }

  const [ { hotkeys } ] = useLocalSettings()

  // Merge the catalogue's default sequences with the user's `hotkeys` setting overrides
  const resolvedNavigator = useMemo(
    () => resolveGroup( NAVIGATOR_SHORTCUTS, hotkeys ),
    [ hotkeys ],
  )

  // LINE_HOTKEYS (jump-to-line) aren't settings-configurable - a fixed, ordered alphabet
  const { resolved: lineResolved, handlers: lineHandlers } = useMemo(
    () => lineHotkeyEntries( goToIndex ),
    [ goToIndex ],
  )

  const keyMap = useMemo( () => Object.fromEntries(
    [ ...resolvedNavigator, ...lineResolved ].map( ( { label, sequences } ) => [ label, sequences ] ),
  ), [ resolvedNavigator, lineResolved ] )

  const required = useMemo( () => Object.fromEntries(
    resolvedNavigator.map( ( { label, required: isRequired } ) => [ label, isRequired ] ),
  ), [ resolvedNavigator ] )

  const allHandlers = useMemo(
    () => ( { ...hotKeyHandlers, ...lineHandlers } ),
    [ lineHandlers, goPreviousLine, goNextLine, autoToggle, restoreLine, setMainLine, goMainLine, goJumpLine ],
  )

  const windowFocused = useWindowFocus()

  // Register mouse shortcuts
  useEffect( () => {
    const { current: mouseTarget } = mouseTargetRef

    if ( !active || !mouseTarget || !windowFocused ) return noop

    type CustomEvent =
      [eventName: string, handler: any]

    const events = [
      [ 'click', goNextLine ],
      [ 'contextmenu', ( event: Event ) => event.preventDefault() ],
      [ 'auxclick', ( { button } ) => ( ( {
        2: goPreviousLine,
        1: autoToggle,
      } )[ button ] || noop )() ],
    ] as CustomEvent[]

    events.forEach( ( [ event, handler ] ) => mouseTarget.addEventListener( event, handler ) )

    return () => events.forEach(
      ( [ event, handler ] ) => mouseTarget.removeEventListener( event, handler ),
    )
  }, [ mouseTargetRef, active, goNextLine, goPreviousLine, autoToggle, windowFocused ] )

  // `allHandlers` includes goNextLine, whose (pre-existing, untyped) mouse-event-shaped
  // parameter predates `HotkeyHandlerMap`'s stricter `(event: KeyboardEvent) => void`
  // contract - cast at this boundary rather than loosening that contract for everyone.
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={( active ? allHandlers : {} ) as HotkeyHandlerMap} required={required}>
      {children}
    </GlobalHotKeys>
  )
}

export default NavigatorHotKeys
