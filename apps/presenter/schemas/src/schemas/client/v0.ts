// Before we started versioning settings!

import { array, boolean, fallback, number, object, picklist, record, string, union } from 'valibot'

import { defineSchema } from '#~/schema'

export default defineSchema( {
  version: 0,
  schema: object( {
    display: object( {
      previousLines: fallback( number(), 0 ),
      nextLines: fallback( number(), 1 ),
      larivaarGurbani: fallback( boolean(), false ),
      larivaarAssist: fallback( boolean(), false ),
      syllabicWeights: fallback( boolean(), false ),
      syllableCount: fallback( boolean(), false ),
      englishTranslation: fallback( boolean(), true ),
      spanishTranslation: fallback( boolean(), false ),
      punjabiTranslation: fallback( boolean(), false ),
      englishTransliteration: fallback( boolean(), true ),
      hindiTransliteration: fallback( boolean(), false ),
      urduTransliteration: fallback( boolean(), false ),
      lineEnding: fallback( boolean(), true ),
    } ),
    layout: object( {
      controllerZoom: fallback( number(), 1 ),
      presenterFontSize: fallback( number(), 8 ),
      relativeGurmukhiFontSize: fallback( number(), 1 ),
      relativeEnglishFontSize: fallback( number(), 0.6 ),
      relativePunjabiFontSize: fallback( number(), 0.7 ),
      relativeHindiFontSize: fallback( number(), 0.71 ),
      relativeUrduFontSize: fallback( number(), 0.5 ),
      centerText: fallback( boolean(), true ),
      justifyText: fallback( boolean(), false ),
      inlineTransliteration: fallback( boolean(), false ),
      inlineColumnGuides: fallback( boolean(), false ),
      splitOnVishraam: fallback( boolean(), true ),
      spacing: fallback( picklist( [ 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end', 'center' ] ), 'space-between' ),
    } ),
    theme: object( {
      themeName: fallback( string(), 'Day' ),
      simpleGraphics: fallback( boolean(), false ),
      backgroundImage: fallback( boolean(), true ),
      highlightCurrentLine: fallback( boolean(), false ),
      dimNextAndPrevLines: fallback( boolean(), true ),
    } ),
    vishraams: object( {
      vishraamHeavy: fallback( boolean(), true ),
      vishraamMedium: fallback( boolean(), true ),
      vishraamLight: fallback( boolean(), true ),
      vishraamColors: fallback( boolean(), true ),
      vishraamCharacters: fallback( boolean(), false ),
    } ),
    sources: fallback(
      record(
        string(),
        object( {
          translationSources: record(
            string(),
            object( {
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
    hotkeys: fallback( record( string(), array( string() ) ), {} ),
    security: object( {
      displayAnalytics: fallback( boolean(), true ),
      private: fallback( boolean(), false ),
    } ),
    search: object( {
      resultTranslationLanguage: fallback( union( [ boolean(), picklist( [ 1, 2, 3 ] ) ] ), false ),
      resultTransliterationLanguage: fallback( union( [
        boolean(),
        picklist( [ 1, 4, 5 ] ),
      ] ), false ),
      showResultCitations: fallback( boolean(), false ),
      lineEnding: fallback( boolean(), true ),
    } ),
  } ),
  up: () => ( {} ),
} )
