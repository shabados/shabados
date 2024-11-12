import './index.css'

import classNames from 'classnames'
import { mapValues, sift } from 'radashi'

import { LANGUAGES } from '~/helpers/data'
import { customiseLine, getTransliterators } from '~/helpers/line'
import { useTranslations } from '~/hooks'
import { useContent } from '~/services/content'
import { useLocalSettings } from '~/services/settings'

import Line from '../Line'

const Display = () => {
  const [ {
    accessibility: {
      reducedMotion: simple,
    },
    dimNextAndPrevLines: dim,
    backgroundImage: background,
    highlightCurrentLine: highlight,
    lineEnding,
    nextLines: nextLineCount,
    previousLines: previousLineCount,
    translations: translationSettings,
    transliterations,
  } ] = useLocalSettings()

  // Find the correct line in the Shabad
  const { line, lineIndex, lines } = useContent()

  // Get the next lines
  const previousLines = previousLineCount && lineIndex
    ? lines.slice( Math.max( lineIndex - previousLineCount, 0 ), lineIndex )
    : []
  const nextLines = line ? lines.slice( lineIndex + 1, lineIndex + nextLineCount + 1 ) : []

  const translations = mapValues(
    useTranslations( sift( [
      translationSettings.english && LANGUAGES.english,
      translationSettings.punjabi && LANGUAGES.punjabi,
      translationSettings.spanish && LANGUAGES.spanish,
    ] ) ),
    ( line ) => customiseLine( line, { lineEnding, typeId: line.typeId } ),
  )

  const transliterators = mapValues(
    getTransliterators( sift( [
      transliterations.english && LANGUAGES.english,
      transliterations.hindi && LANGUAGES.hindi,
      transliterations.urdu && LANGUAGES.urdu,
    ] ) ),
    ( transliterate ) => ( text: string ) => transliterate(
      customiseLine( text, { lineEnding, typeId: line?.typeId } ),
    ),
  )

  return (
    <div className={classNames( { simple, background }, 'display' )}>
      <div className="background-image" />

      <div className={classNames( { dim }, 'previous-lines' )}>
        {line && previousLines.map( ( { id, gurmukhi } ) => (
          <Line
            key={id}
            className="previous-line"
            gurmukhi={gurmukhi}
          />
        ) )}
      </div>

      {line && (
        <Line
          className={classNames( { highlight }, 'current-line' )}
          gurmukhi={line.gurmukhi}
          translations={translations}
          transliterators={transliterators}
        />
      )}

      <div className={classNames( { dim }, 'next-lines' )}>
        {line && nextLines.map( ( { id, gurmukhi } ) => (
          <Line
            key={id}
            className="next-line"
            gurmukhi={gurmukhi}
          />
        ) )}
      </div>

    </div>
  )
}

export default Display
