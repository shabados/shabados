import './index.css'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, List, ListItem, Tooltip, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import classNames from 'classnames'
import { group } from 'radashi'
import { useMemo, useState } from 'react'

import { resolveHotkeys } from '#~/helpers/hotkeys'
import keyMap from '#~/helpers/keyMap'
import { useLocalSettings } from '#~/services/settings'

import { ResetButton } from '../../-components/DynamicOptions'
import AddHotkeyDialog from './-components/AddHotkeyDialog'
import DeleteHotkeyDialog from './-components/DeleteHotkeyDialog'

type Deleting = { keyName: string, name: string } | null

// Not driven by props from a route loader (TanStack Router's `component` doesn't accept
// arbitrary props) - pulled directly via hooks, matching the pattern every sibling
// settings page uses (see `DynamicOptions`/`$category.tsx`).
const Hotkeys = () => {
  const [ { hotkeys }, setSettings ] = useLocalSettings()
  const device = 'local'

  const editable = device === 'local'

  const [ editing, setEditing ] = useState<string | undefined>()
  const [ deleting, setDeleting ] = useState<Deleting>( null )

  // Merge the catalogue's default sequences with the user's `hotkeys` setting overrides -
  // the same `resolveHotkeys` used by GlobalHotKeys/NavigatorHotkeys/CopyHotkeys. The
  // `hotkeys` setting defaults to `{}` (no customisations yet), so without this merge
  // every catalogue entry the user hasn't personally rebound would resolve to
  // `undefined` instead of falling back to its built-in sequences.
  const resolved = useMemo( () => resolveHotkeys( keyMap, hotkeys ), [ hotkeys ] )

  // Which of the catalogue's own *default* sequences are non-removable - kept separate
  // from `resolved` (which reflects the user's current, possibly-extended sequences) so
  // that a user-added extra key on a required entry stays deletable, only the catalogue's
  // own required defaults are protected.
  const catalogueDefaults = useMemo( () => resolveHotkeys( keyMap ), [] )
  const requiredKeys = useMemo( () => catalogueDefaults.reduce( (
    acc, { required, sequences },
  ) => (
    required
      ? { ...acc, ...sequences.reduce( ( a, key ) => ( { ...a, [ key ]: true } ), {} ) }
      : acc
  ), {} as Record<string, boolean> ), [ catalogueDefaults ] )

  const assignedKeys = useMemo( () => resolved.reduce( ( acc, { label, sequences } ) => ( {
    ...acc,
    ...sequences.reduce( ( a, key ) => ( { ...a, [ key ]: label } ), {} ),
  } ), {} as Record<string, string> ), [ resolved ] )

  const setRecorded = ( hotkey: string ) => {
    const editingLabel = editing
    setEditing( undefined )

    if ( !hotkey || !editingLabel ) return

    const entry = resolved.find( ( { label } ) => label === editingLabel )
    if ( !entry ) return

    const nextHotkeys = Array.from( new Set( [ ...entry.sequences, hotkey ] ) )

    setSettings( { hotkeys: { [ editingLabel ]: nextHotkeys } } )
  }

  const onDelete = ( confirmed: boolean ) => {
    const target = deleting
    setDeleting( null )

    if ( !confirmed || !target ) return

    const entry = resolved.find( ( { label } ) => label === target.name )
    if ( !entry ) return

    const nextHotkeys = entry.sequences.filter( ( key ) => key !== target.keyName )

    setSettings( { hotkeys: { [ target.name ]: nextHotkeys } } )
  }

  return (
    <>

      <AddHotkeyDialog
        open={!!editing}
        name={editing}
        assigned={assignedKeys}
        onRecorded={setRecorded}
      />
      <DeleteHotkeyDialog open={!!deleting} {...( deleting ?? {} )} onClose={onDelete} />

      <List className="hotkeys">
        {Object
          .entries( group( resolved, ( { group: groupName } ) => groupName ) )
          .map( ( [ groupName, groupHotkeys ] ) => (
            <ListItem key={groupName} className="group">

              <Typography className="name" variant="subtitle2">{groupName}</Typography>

              <div className="group-hotkeys">
                {groupHotkeys?.map( ( { label, description, sequences } ) => (
                  <div key={label} className="hotkey">
                    <Grid container className="name" alignItems="center">

                      <Grid item xs={4}>
                        <Typography className="text">{label}</Typography>
                      </Grid>

                      <Grid item xs={1}>
                        {description && (
                          <Tooltip title={description}>
                            <span>
                              <FontAwesomeIcon icon={faQuestionCircle} />
                            </span>
                          </Tooltip>
                        )}
                      </Grid>

                      <Grid className={classNames( { editable }, 'keys' )} item xs={6}>
                        {sequences.map( ( key ) => (
                          <Button
                            key={key}
                            className={classNames( 'key', { removable: !requiredKeys[ key ] } )}
                            disabled={!!requiredKeys[ key ]}
                            onClick={() => (
                              !requiredKeys[ key ] && setDeleting( { keyName: key, name: label } )
                            )}
                          >
                            {key}
                          </Button>
                        ) )}

                        <Button
                          variant="outlined"
                          className="new key"
                          onClick={() => setEditing( label )}
                        >
                          Add
                        </Button>

                      </Grid>

                    </Grid>
                  </div>
                ) )}
              </div>

            </ListItem>
          ) )}

        <ResetButton group="hotkeys" disabled={!editable} device={device} />

      </List>

    </>
  )
}

export const Route = createFileRoute( '/settings/client/hotkeys/' )( {
  component: Hotkeys,
} )
