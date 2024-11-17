import './index.css'

import { List, ListItem } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

import { withNavigationHotkeys } from '#~/components/NavigationHotkeys'
import { LINE_HOTKEYS } from '#~/helpers/keyMap'
import { useBookmarks } from '#~/services/bookmarks'
import { setContent } from '#~/services/content'

type BookmarkProps = {
  focused?: number,
  register: ( index: number, ref: HTMLElement | null ) => void,
}

const Bookmarks = ( { register, focused = 0 }: BookmarkProps ) => {
  const bookmarks = useBookmarks()

  return (
    <List className="bookmarks">
      {bookmarks?.map( ( { id, nameGurmukhi }, index ) => (
        <ListItem
          className={focused === index ? 'focused' : ''}
          key={id}
          ref={( ref ) => register( index, ref )}
          onClick={() => setContent( { id, type: 'bani' } )}
        >
          <span className="hotkey meta">{LINE_HOTKEYS[ index ]}</span>
          <span className="gurmukhi text">{nameGurmukhi}</span>
        </ListItem>
      ) )}
    </List>
  )
}

export const Route = createFileRoute( '/presenter/controller/bookmarks/' )( {
  component: withNavigationHotkeys( {
    arrowKeys: true,
    lineKeys: true,
  } )( Bookmarks ),
} )
