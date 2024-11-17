import { createLazyFileRoute } from '@tanstack/react-router'
import classNames from 'classnames'
import { mapValues, sift } from 'radashi'

import { LANGUAGES } from '#~/helpers/data'
import { customiseLine, getTransliterators } from '#~/helpers/line'
import { useTranslations } from '#~/hooks'
import { useContent } from '#~/services/content'
import { useGlobalSettings } from '#~/services/settings'
import { useStatus } from '#~/services/status'

import Line from './-components/Line'
import ThemeLoader from './-components/ThemeLoader'

const Overlay = () => {
  const { connected } = useStatus()

  const [ { overlay: { name, ...overlay, lineEnding } } ] = useGlobalSettings()

  const { line } = useContent()
  const { typeId } = line

  const translations = mapValues(
    useTranslations( sift( [
      overlay.englishTranslation && LANGUAGES.english,
      overlay.punjabiTranslation && LANGUAGES.punjabi,
      overlay.spanishTranslation && LANGUAGES.spanish,
    ] ) ),
    ( line ) => customiseLine( line, { lineEnding, typeId } )
  )

  const transliterators = mapValues(
    getTransliterators( sift( [
      overlay.englishTransliteration && LANGUAGES.english,
      overlay.hindiTransliteration && LANGUAGES.hindi,
      overlay.urduTransliteration && LANGUAGES.urdu,
    ] ) ),
    ( transliterate ) => ( text: string ) => transliterate(
      customiseLine( text, { lineEnding, typeId } )
    ),
  )

  if ( !connected ) return null

  return (
    <div className={classNames( { empty: !line }, 'overlay' )}>
      <ThemeLoader name={name} />

      <Line
        {...overlay}
        gurmukhi={line ? line.gurmukhi : ''}
        translations={translations}
        transliterators={transliterators}
      />
    </div>
  )
}

export const Route = createLazyFileRoute( '/overlay/' )( {
  component: Overlay,
} )
