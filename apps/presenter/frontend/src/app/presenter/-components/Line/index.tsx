/* eslint-disable react/no-array-index-key */
import './index.css'

import classNames from 'classnames'
import { countSyllables, toSyllabicSymbols } from 'gurmukhi-utils'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
  LANGUAGE_NAMES,
  LANGUAGES,
  TRANSLATION_ORDER,
  Translations,
  TRANSLITERATION_ORDER,
  Transliterators,
} from '#~/helpers/data'
import { classifyWords, partitionLine, sortBy } from '#~/helpers/line'
import { useLocalSettings } from '#~/services/settings'

type LineProps = {
  className?: string,
  gurmukhi: string,
  translations?: Translations,
  transliterators?: Transliterators,
}

const Line = ( {
  className = undefined,
  gurmukhi,
  translations = {},
  transliterators = {},
}: LineProps ) => {
  const [ {
    fontSizes,
    larivaarGurbani,
    larivaarAssist,
    pauses,
    accessibility: { reducedMotion },
    spacing,
    centerText,
    inlineColumnGuides,
    inlineTransliteration,
    syllabicWeights,
    syllableCount,
  } ] = useLocalSettings()

  const languageFontSizes = {
    [ LANGUAGES.english ]: fontSizes.relativeEnglish,
    [ LANGUAGES.spanish ]: fontSizes.relativeEnglish,
    [ LANGUAGES.punjabi ]: fontSizes.relativePunjabi,
    [ LANGUAGES.hindi ]: fontSizes.relativeHindi,
    [ LANGUAGES.urdu ]: fontSizes.relativeUrdu,
  }

  return (
    <div
      className={classNames(
        className,
        {
          assist: larivaarGurbani && larivaarAssist,
          light: pauses.mode === 'all',
          medium: pauses.mode === 'all',
          heavy: true,
          vishraams: pauses.mode === 'all',
          larivaar: larivaarGurbani,
          simple: reducedMotion,
          'center-text': centerText,
          'justify-text': spacing,
        },
        'line'
      )}
      style={{ justifyContent: spacing, fontSize: `${fontSizes.base}vh` }}
    >
      <TransitionGroup appear exit={false} component={null}>
        <CSSTransition key={gurmukhi} classNames="fade" timeout={0}>
          <p className="source">
            {partitionLine( gurmukhi, !pauses.characters ).map(
              ( line, lineIndex ) => (
                <span
                  key={lineIndex}
                  className={classNames(
                    'partition',
                    pauses.splitLine ? 'block' : 'inline'
                  )}
                >
                  {line.map( ( { word, type }, i ) => (
                    // TODO: If classifyWord's type type can be changed
                    // to string instead of string | null,
                    // then we won't have to || the type value here in the template string
                    <span
                      key={`${word}-${type || ''}-${i}`}
                      className={classNames( type, 'word', {
                        'with-guides': inlineColumnGuides,
                        'with-rows':
                          inlineTransliteration
                          || syllabicWeights
                          || inlineColumnGuides,
                      } )}
                      style={{ fontSize: `${fontSizes.relativeGurmukhi}em` }}
                    >
                      <span className="gurmukhi">{word}</span>

                      {syllabicWeights && (
                        <span className="syllabic-weights">
                          {toSyllabicSymbols( word )}
                        </span>
                      )}

                      {inlineTransliteration
                        && Object.entries( transliterators )
                          .sort( sortBy( TRANSLITERATION_ORDER ) )
                          .map( ( [ languageId, transliterate ] ) => (
                            <span
                              key={`${word}-${type || ''}-${i}-${languageId}-transliteration`}
                              className={classNames( LANGUAGE_NAMES[ Number( languageId ) ] )}
                              style={languageFontSizes[ Number( languageId ) ] ? { fontSize: `${languageFontSizes[ Number( languageId ) ]}em` } : {}}
                            >
                              {transliterate( word )}
                            </span>
                          ) )}
                    </span>
                  ) )}
                </span>
              )
            )}

            {syllableCount && (
              <span className="syllable-count">{countSyllables( gurmukhi )}</span>
            )}
          </p>
        </CSSTransition>

        {Object.entries( translations )
          .sort( sortBy( TRANSLATION_ORDER ) )
          .map( ( [ languageId, translation ] ) => (
            <CSSTransition
              key={`${gurmukhi}-${languageId}-translation`}
              classNames="fade"
              timeout={0}
            >
              <p
                className={classNames(
                  LANGUAGE_NAMES[ Number( languageId ) ],
                  'translation'
                )}
                style={{ fontSize: `${languageFontSizes[ Number( languageId ) ]}em` }}
              >
                {translation}
              </p>
            </CSSTransition>
          ) )}

        {!inlineTransliteration
          && Object.entries( transliterators )
            .sort( sortBy( TRANSLITERATION_ORDER ) )
            .map( ( [ languageId, transliterate ] ) => (
              <CSSTransition
                key={`${gurmukhi}-${languageId}-transliteration`}
                classNames="fade"
                timeout={0}
              >
                <p
                  className={classNames(
                    LANGUAGE_NAMES[ Number( languageId ) ],
                    'transliteration'
                  )}
                  style={{ fontSize: `${languageFontSizes[ Number( languageId ) ]}em` }}
                >
                  {classifyWords(
                    transliterate( gurmukhi ),
                    !pauses.characters
                  ).map( ( { word, type }, i ) => (
                    <span
                      key={`${word}-${type || ''}-${i}`}
                      className={classNames( type, 'word' )}
                    >
                      {word}
                    </span>
                  ) )}
                </p>
              </CSSTransition>
            ) )}
      </TransitionGroup>
    </div>
  )
}

export default Line
