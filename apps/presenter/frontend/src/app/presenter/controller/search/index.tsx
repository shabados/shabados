import './index.css'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Input, InputAdornment, List } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'

import { withNavigationHotkeys } from '#~/components/NavigationHotkeys'
import {
  MIN_SEARCH_CHARS,
  SEARCH_ANCHORS,
  SEARCH_CHARS,
  SEARCH_TYPES,
} from '#~/helpers/consts'
import { search, useSearchResults } from '#~/services/search'
import { useLocalSettings } from '#~/services/settings'

import Result from './-components/Result'
import getHighlighter from './-match-highlighter'

// Generate the regex for capturing anchor chars, optionally
const searchRegex = new RegExp( `^([${Object.keys( SEARCH_ANCHORS ).map( ( anchor ) => `\\${anchor}` ).join( '' )}])?(.*)` )

const getSearchParams = ( searchQuery = '' ) => {
  // Extract anchors and search query
  const [ , anchor, query ] = searchQuery.match( searchRegex ) ?? []

  // Get search type from anchor char, if any
  const type = SEARCH_ANCHORS[ anchor ] || SEARCH_TYPES.firstLetter

  const value = type === SEARCH_TYPES.firstLetter
    ? query.slice().replace( new RegExp( SEARCH_CHARS.wildcard, 'g' ), '_' )
    : query

  return { anchor, value, type }
}

type SearchProps = {
  updateFocus?: () => any,
  register?: () => any,
  focused?: string | number,
}

const Search = ( { updateFocus, register, focused }: SearchProps ) => {
  const [ {
    results: {
      citations,
      transliterationLanguage,
      translationLanguage,
    },
  } ] = useLocalSettings()

  // Set the initial search query from URL
  const navigate = useNavigate()
  const { query } = Route.useSearch()

  const [ searchedValue, setSearchedValue ] = useState( '' )

  const { anchor: initialAnchor, value: initialInputValue } = getSearchParams( query )
  const inputValue = useRef( initialInputValue )
  const [ anchor, setAnchor ] = useState( initialAnchor )

  const [ isInputFocused, setInputFocused ] = useState( false )

  const inputRef = useRef( null )

  const { results, clearResults } = useSearchResults()

  const onResults = useCallback( ( results ) => {
    setSearchedValue( inputValue.current )
    setResults( results )

    updateFocus( 0 )
  }, [ updateFocus ] )

  const onChange = useCallback( ( { target: { value } } ) => {
    const { anchor, type: searchType, value: searchValue } = getSearchParams( value )

    // Search if enough letters
    const doSearch = searchValue.length >= MIN_SEARCH_CHARS

    if ( doSearch ) {
      search( {
        query: searchValue,
        type: searchType,
        options: {
          translations: !!translationLanguage,
          transliterations: !!transliterationLanguage,
          citations: !!citations,
        },
      } )
    } else clearResults()

    inputValue.current = searchValue
    setAnchor( anchor )

    // Update URL with search
    void navigate( {
      search: ( s ) => ( {
        ...s,
        query: value,
      } ),
      replace: true,
    } )
  }, [
    navigate,
    translationLanguage,
    transliterationLanguage,
    citations,
  ] )

  const filterInputKeys = ( event ) => {
    const ignoreKeys = [ 'ArrowUp', 'ArrowDown' ]

    if ( ignoreKeys.includes( event.key ) ) event.preventDefault()
  }

  const refocus = ( { target } ) => {
    setInputFocused( false )
    target.focus()
  }

  const highlightSearch = () => inputRef.current.select()

  useEffect( () => {
    if ( inputValue.current ) onChange( { target: { value: `${anchor || ''}${inputValue.current}` } } )
  }, [
    onChange,
    anchor,
    transliterationLanguage,
    translationLanguage,
    citations,
  ] )

  useEffect( () => { highlightSearch() }, [] )

  // Get match highlighter for the current search mode
  const searchMode = SEARCH_ANCHORS[ anchor ] || SEARCH_TYPES.firstLetter
  const highlighter = getHighlighter( searchedValue, searchMode )

  return (
    <div className="search">
      <Input
        className={classNames( 'input', { 'input-focused': isInputFocused } )}
        inputRef={inputRef}
        onBlur={refocus}
        onKeyDown={filterInputKeys}
        onFocus={() => setInputFocused( true )}
        onChange={onChange}
        value={`${anchor || ''}${inputValue.current}`}
        placeholder="Koj"
        disableUnderline
        autoFocus
        endAdornment={inputValue.current && (
          <InputAdornment>
            <IconButton
              className="clear"
              onClick={() => onChange( { target: { value: '' } } )}
              size="large"
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </InputAdornment>
        )}
        inputProps={{
          spellCheck: false,
          autoCapitalize: 'off',
          autoCorrect: 'off',
          autoComplete: 'off',
        }}
      />

      <List className="results">
        {results?.map( ( result, index ) => (
          <Result
            {...result}
            key={result.id}
            ref={( ref ) => register( index, ref )}
            focused={focused === index}
            highlighter={highlighter}
          />
        ) )}
      </List>
    </div>
  )
}

export const Route = createFileRoute( '/presenter/controller/search/' )( {
  component: withNavigationHotkeys( {
    keymap: {
      next: [ 'down', 'tab' ],
      previous: [ 'up', 'shift+tab' ],
      first: null,
      last: null,
    },
  } )( Search ),
} )
