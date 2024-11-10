import { boolean, fallback, nullable, object, string } from 'valibot'

import { defineSchema } from '#~/schema'

// Before we started versioning settings!
export default defineSchema( {
  version: 0,
  schema: object( {
    system: object( {
      launchOnStartup: fallback( boolean(), false ),
      multipleDisplays: fallback( boolean(), true ),
      fullscreenOnLaunch: fallback( boolean(), false ),
      serverAnalytics: fallback( boolean(), true ),
      automaticUpdates: fallback( boolean(), true ),
      betaOptIn: fallback( boolean(), false ),
    } ),
    notifications: object( {
      connectionEvents: fallback( boolean(), true ),
      disconnectionEvents: fallback( boolean(), false ),
      downloadEvents: fallback( boolean(), true ),
      downloadedEvents: fallback( boolean(), true ),
    } ),
    overlay: object( {
      overlayName: fallback( string(), 'Floating Top Captions' ),
      larivaarGurbani: fallback( boolean(), false ),
      larivaarAssist: fallback( boolean(), false ),
      englishTranslation: fallback( boolean(), true ),
      spanishTranslation: fallback( boolean(), false ),
      punjabiTranslation: fallback( boolean(), false ),
      englishTransliteration: fallback( boolean(), false ),
      hindiTransliteration: fallback( boolean(), false ),
      urduTransliteration: fallback( boolean(), false ),
      lineEnding: fallback( boolean(), true ),
    } ),
    closedCaptions: object( {
      zoomApiToken: fallback( nullable( string() ), null ),
      larivaarGurbani: fallback( boolean(), false ),
      englishTranslation: fallback( boolean(), true ),
      spanishTranslation: fallback( boolean(), false ),
      punjabiTranslation: fallback( boolean(), false ),
      englishTransliteration: fallback( boolean(), false ),
      hindiTransliteration: fallback( boolean(), false ),
      urduTransliteration: fallback( boolean(), false ),
      lineEnding: fallback( boolean(), true ),
    } ),
  } ),
  up: () => ( {} ),
} )
