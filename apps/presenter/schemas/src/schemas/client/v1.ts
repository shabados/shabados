import { invert } from 'radashi'
import { array, boolean, fallback, number, picklist, record, string } from 'valibot'

import { defineSchema, safeObject } from '#~/schema'

import v0 from './v0'

const TRANSLATION_LANGUAGES = invert( {
  english: 1,
  punjabi: 2,
  spanish: 3,
} as const )

const TRANSLITERATION_LANGUAGES = invert( {
  english: 1,
  hindi: 4,
  urdu: 5,
} as const )

export default defineSchema( {
  version: 1,
  previous: v0,
  schema: safeObject( {
    private: fallback( boolean(), false ),
    previousLines: fallback( number(), 0 ),
    nextLines: fallback( number(), 1 ),
    larivaarGurbani: fallback( boolean(), false ),
    larivaarAssist: fallback( boolean(), false ),
    syllabicWeights: fallback( boolean(), false ),
    syllableCount: fallback( boolean(), false ),
    lineEnding: fallback( boolean(), true ),
    controllerZoom: fallback( number(), 1 ),
    fontSizes: safeObject( {
      base: fallback( number(), 8 ),
      relativeGurmukhi: fallback( number(), 1 ),
      relativeEnglish: fallback( number(), 0.6 ),
      relativePunjabi: fallback( number(), 0.7 ),
      relativeHindi: fallback( number(), 0.71 ),
      relativeUrdu: fallback( number(), 0.5 ),
    } ),
    centerText: fallback( boolean(), true ),
    inlineTransliteration: fallback( boolean(), false ),
    inlineColumnGuides: fallback( boolean(), false ),
    spacing: fallback( picklist( [ 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end', 'center' ] ), 'space-between' ),
    themeName: fallback( string(), 'Day' ),
    accessibility: safeObject( {
      reducedMotion: fallback( boolean(), false ),
    } ),
    backgroundImage: fallback( boolean(), true ),
    highlightCurrentLine: fallback( boolean(), false ),
    dimNextAndPrevLines: fallback( boolean(), true ),
    translations: safeObject( {
      english: fallback( boolean(), true ),
      spanish: fallback( boolean(), false ),
      punjabi: fallback( boolean(), false ),
    } ),
    transliterations: safeObject( {
      english: fallback( boolean(), true ),
      hindi: fallback( boolean(), false ),
      urdu: fallback( boolean(), false ),
    } ),
    pauses: safeObject( {
      characters: fallback( boolean(), false ),
      mode: fallback( picklist( [ 'all', 'only-primary' ] ), 'all' ),
      splitLine: fallback( boolean(), true ),
    } ),
    results: safeObject( {
      translationLanguage: fallback( picklist( [ 'english', 'spanish', 'punjabi' ] ), 'english' ),
      transliterationLanguage: fallback( picklist( [ 'english', 'hindi', 'urdu' ] ), 'english' ),
      lineEnding: fallback( boolean(), true ),
      citations: fallback( boolean(), false ),
    } ),
    hotkeys: fallback( record( string(), array( string() ) ), {} ),
    sources: fallback(
      record(
        string(),
        safeObject( {
          translationSources: record(
            string(),
            safeObject( {
              id: number(),
              languageId: number(),
              nameEnglish: string(),
              nameGurmukhi: string(),
              sourceId: number(),
            } ),
          ),
        } ),
      ),
      {},
    ),
  } ),
  up: ( from ) => ( {
    previousLines: from.display.previousLines,
    nextLines: from.display.nextLines,
    larivaarGurbani: from.display.larivaarGurbani,
    larivaarAssist: from.display.larivaarAssist,
    syllabicWeights: from.display.syllabicWeights,
    syllableCount: from.display.syllableCount,
    lineEnding: from.display.lineEnding,
    controllerZoom: from.layout?.controllerZoom,
    fontSizes: {
      base: from.layout.presenterFontSize,
      relativeGurmukhi: from.layout.relativeGurmukhiFontSize,
      relativeEnglish: from.layout.relativeEnglishFontSize,
      relativePunjabi: from.layout.relativePunjabiFontSize,
      relativeHindi: from.layout.relativeHindiFontSize,
      relativeUrdu: from.layout.relativeUrduFontSize,
    },
    centerText: from.layout?.centerText,
    inlineTransliteration: from.layout.inlineTransliteration,
    inlineColumnGuides: from.layout.inlineColumnGuides,
    spacing: from.layout.spacing,
    themeName: from.theme.themeName,
    accessibility: {
      reducedMotion: from.theme.simpleGraphics,
    },
    backgroundImage: from.theme.backgroundImage,
    highlightCurrentLine: from.theme.highlightCurrentLine,
    dimNextAndPrevLines: from.theme.dimNextAndPrevLines,
    translations: {
      english: from.display.englishTranslation,
      spanish: from.display.spanishTranslation,
      punjabi: from.display.punjabiTranslation,
    },
    transliterations: {
      english: from.display?.englishTransliteration,
      hindi: from.display?.hindiTransliteration,
      urdu: from.display?.urduTransliteration,
    },
    pauses: {
      characters: from.vishraams.vishraamCharacters,
      mode: ( from.vishraams.vishraamLight ?? from.vishraams.vishraamMedium ) ? 'only-primary' as const : 'all' as const,
      splitLine: from.layout.splitOnVishraam,
    },
    results: {
      translationLanguage: typeof from.search.resultTranslationLanguage === 'boolean'
        ? 'english'
        : TRANSLATION_LANGUAGES[ from.search.resultTranslationLanguage ],
      transliterationLanguage: typeof from.search.resultTransliterationLanguage === 'boolean'
        ? 'english'
        : TRANSLITERATION_LANGUAGES[ from.search.resultTransliterationLanguage ],
      lineEnding: from.search.lineEnding,
      citations: from.search.showResultCitations,
    },
    hotkeys: from.hotkeys,
    sources: from.sources,
  } ),
} )
