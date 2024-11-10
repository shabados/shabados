import { omit } from 'radashi'
import { boolean, fallback, nullable, object, string } from 'valibot'

import { defineSchema } from '#~/schema'

import previous from './v0'

export default defineSchema( {
  version: 1,
  schema: object( {
    system: object( {
      multipleDisplays: fallback( boolean(), true ),
      fullscreenOnLaunch: fallback( boolean(), false ),
      automaticUpdates: fallback( boolean(), true ),
    } ),
    notifications: object( {
      connectionEvents: fallback( boolean(), true ),
      disconnectionEvents: fallback( boolean(), false ),
      downloadEvents: fallback( boolean(), true ),
      downloadedEvents: fallback( boolean(), true ),
    } ),
    overlay: object( {
      name: fallback( string(), 'Floating Top Captions' ),
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
  previous,
  up: ( from ) => ( {
    ...from,
    system: omit( from.system, [ 'launchOnStartup', 'serverAnalytics', 'betaOptIn' ] ),
    overlay: {
      ...omit( from.overlay, [ 'overlayName' ] ),
      name: from.overlay.overlayName,
    },
  } ),
} )
