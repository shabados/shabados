import {
  faBell,
  faClosedCaptioning as farClosedCaptioning,
  faKeyboard,
  faPauseCircle,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'
import {
  faAlignCenter,
  faAlignJustify,
  faArrowsAltH,
  faBalanceScale,
  faBook,
  faCalculator,
  faChartPie,
  faClosedCaptioning,
  faCompressAlt,
  faDesktop,
  faDoorOpen,
  faDownload,
  faEllipsisH,
  faExpandArrowsAlt,
  faFill,
  faFillDrip,
  faFlask,
  faFont,
  faHeadphones,
  faImage,
  faInfo,
  faList,
  faLock,
  faLowVision,
  faMarker,
  faPaintBrush,
  faPalette,
  faParagraph,
  faPercentage,
  faPlug,
  faPowerOff,
  faRemoveFormat,
  faSearch,
  faSearchPlus,
  faServer,
  faShareSquare,
  faShieldAlt,
  faSubscript,
  faSync,
  faTags,
  faTextHeight,
  faTextWidth,
  faWindowMaximize,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import type { ClientSettings, RecommendedSources, ServerSettings } from '@presenter/contract'

import { API_URL } from './consts'
import { LANGUAGES } from './data'
import SHORTCUTS from './keyMap'

type CommonOption = {
  name: string,
  icon: IconDefinition,
}

type DropdownOption<T> = CommonOption & {
  type: 'dropdown',
  values: { name: string, value: T }[],
}

type SliderOption = CommonOption & {
  type: 'slider',
  min: number,
  max: number,
  step: number,
}

type ColorPickerOption = CommonOption & {
  type: 'colorPicker',
}

type TextInputOption = CommonOption & {
  type: 'textInput',
}

type ToggleOption = CommonOption & {
  type: 'toggle',
}

type UrlDropdownOption = CommonOption & {
  type: 'urlDropdown',
  values: string[],
  url: string,
}

type Option<T = unknown> = DropdownOption<T>
  | SliderOption
  | ColorPickerOption
  | TextInputOption
  | ToggleOption
  | UrlDropdownOption

type ClientOption<T = unknown> = Option<T> & {
  defaultValue: T,
  isProtected?: boolean,
}

type ServerOption<T = unknown> = Option<T>

export const CLIENT_SETTINGS_CONFIG = {
  controllerZoom: { name: 'Controller Zoom', icon: faSearchPlus, type: 'slider', min: 0.1, max: 2.5, step: 0.1, defaultValue: 1 },
  presenterFontSize: { name: 'Font Size', icon: faFont, type: 'slider', min: 3, max: 13, step: 0.1, defaultValue: 8 },
  relativeGurmukhiFontSize: { name: 'Relative Gurmukhi Font Size', icon: faPercentage, type: 'slider', min: 0.5, max: 1.5, step: 0.01, defaultValue: 1 },
  relativeEnglishFontSize: { name: 'Relative Latin Font Size', icon: faPercentage, type: 'slider', min: 0.5, max: 1.5, step: 0.01, defaultValue: 0.6 },
  relativePunjabiFontSize: { name: 'Relative Punjabi Font Size', icon: faPercentage, type: 'slider', min: 0.5, max: 1.5, step: 0.01, defaultValue: 0.7 },
  relativeHindiFontSize: { name: 'Relative Hindi Font Size', icon: faPercentage, type: 'slider', min: 0.5, max: 1.5, step: 0.01, defaultValue: 0.71 },
  relativeUrduFontSize: { name: 'Relative Urdu Font Size', icon: faPercentage, type: 'slider', min: 0.5, max: 1.5, step: 0.01, defaultValue: 0.5 },
  centerText: { name: 'Center Align', icon: faAlignCenter, type: 'toggle', defaultValue: true },
  justifyText: { name: 'Justify Multiple Lines', icon: faAlignJustify, type: 'toggle', defaultValue: false },
  inlineTransliteration: { name: 'Inline Transliterations', icon: faCompressAlt, type: 'toggle', defaultValue: false },
  inlineColumnGuides: { name: 'Inline Column Guides', icon: faCompressAlt, type: 'toggle', defaultValue: false },
  splitOnVishraam: { name: 'Primary Pause Wrap Gurbani', icon: faParagraph, type: 'toggle', defaultValue: true },
  spacing: {
    name: 'Current Line Spacing',
    type: 'dropdown',
    icon: faTextHeight,
    values: [
      { name: 'Space Between', value: 'space-between' },
      { name: 'Space Around', value: 'space-around' },
      { name: 'Space Evenly', value: 'space-evenly' },
      { name: 'Top', value: 'flex-start' },
      { name: 'Middle', value: 'center' },
      { name: 'Bottom', value: 'flex-end' },
    ],
    defaultValue: 'space-evenly',
  },
  previousLines: { name: 'Previous Lines', icon: faAlignJustify, type: 'slider', min: 0, max: 5, step: 1, defaultValue: 0 },
  nextLines: { name: 'Next Lines', icon: faAlignJustify, type: 'slider', min: 0, max: 5, step: 1, defaultValue: 1 },
  larivaarGurbani: { name: 'Larivaar', icon: faTextWidth, type: 'toggle', defaultValue: false },
  larivaarAssist: { name: 'Larivaar Assist', icon: faMarker, type: 'toggle', defaultValue: false },
  syllabicWeights: { name: 'Syllabic Weights', icon: faBalanceScale, type: 'toggle', defaultValue: false },
  syllableCount: { name: 'Syllable Count', icon: faCalculator, type: 'toggle', defaultValue: false },
  englishTranslation: { name: 'English Translation', icon: faClosedCaptioning, type: 'toggle', defaultValue: true },
  spanishTranslation: { name: 'Spanish Translation', icon: faClosedCaptioning, type: 'toggle', defaultValue: false },
  punjabiTranslation: { name: 'Punjabi Translation', icon: faClosedCaptioning, type: 'toggle', defaultValue: false },
  englishTransliteration: { name: 'English Transliteration', icon: farClosedCaptioning, type: 'toggle', defaultValue: true },
  hindiTransliteration: { name: 'Hindi Transliteration', icon: farClosedCaptioning, type: 'toggle', defaultValue: false },
  urduTransliteration: { name: 'Urdu Transliteration', icon: farClosedCaptioning, type: 'toggle', defaultValue: false },
  lineEnding: { name: 'Hide Line Ending', icon: faRemoveFormat, type: 'toggle', defaultValue: true },
  themeName: { name: 'Theme Name', icon: faPalette, type: 'urlDropdown', values: [], url: `${API_URL}/themes/presenter`, defaultValue: 'Day' },
  simpleGraphics: { name: 'Remove Visual Effects', icon: faLowVision, type: 'toggle', defaultValue: false },
  backgroundImage: { name: 'Background Image', icon: faImage, type: 'toggle', defaultValue: true },
  highlightCurrentLine: { name: 'Current Line Background', icon: faFillDrip, type: 'toggle', defaultValue: false },
  dimNextAndPrevLines: { name: 'Next and Previous Lines Background', icon: faFillDrip, type: 'toggle', defaultValue: true },
  vishraamHeavy: { name: 'Primary Pause', icon: faPauseCircle, type: 'toggle', defaultValue: true },
  vishraamMedium: { name: 'Secondary Pause', icon: faPauseCircle, type: 'toggle', defaultValue: true },
  vishraamLight: { name: 'Tertiary Pause', icon: faPauseCircle, type: 'toggle', defaultValue: true },
  vishraamCharacters: { name: 'Show Symbols', icon: faSubscript, type: 'toggle', defaultValue: false },
  vishraamColors: { name: 'Show Colors', icon: faFill, type: 'toggle', defaultValue: true },
  displayAnalytics: { name: 'Display Usage Analytics', icon: faChartPie, type: 'toggle', defaultValue: true },
  private: { name: 'Private Settings', icon: faLock, type: 'toggle', isProtected: true, defaultValue: false },
  showResultCitations: { name: 'Show Citations', icon: faTags, type: 'toggle', defaultValue: false },
  resultTranslationLanguage: {
    name: 'Translation',
    icon: faClosedCaptioning,
    type: 'dropdown',
    values: [
      { name: 'None', value: false },
      { name: 'English', value: LANGUAGES.english },
      { name: 'Spanish', value: LANGUAGES.spanish },
      { name: 'Punjabi', value: LANGUAGES.punjabi },
    ],
    defaultValue: false,
  },
  resultTransliterationLanguage: {
    name: 'Transliteration',
    icon: farClosedCaptioning,
    type: 'dropdown',
    values: [
      { name: 'None', value: false },
      { name: 'English', value: LANGUAGES.english },
      { name: 'Hindi', value: LANGUAGES.hindi },
      { name: 'Urdu', value: LANGUAGES.urdu },
    ],
    defaultValue: false,
  },
} satisfies Record<keyof ClientSettings, ClientOption>

export const SERVER_OPTIONS = {
  connectionEvents: { name: 'Connections', icon: faPlug, type: 'toggle' },
  disconnectionEvents: { name: 'Disconnections', icon: faPowerOff, type: 'toggle' },
  downloadEvents: { name: 'Update Download', icon: faDownload, type: 'toggle' },
  downloadedEvents: { name: 'Update Download Complete', icon: faServer, type: 'toggle' },
  launchOnStartup: { name: 'Launch On Startup', icon: faDoorOpen, type: 'toggle' },
  multipleDisplays: { name: 'Launch on All Displays', icon: faDesktop, type: 'toggle' },
  fullscreenOnLaunch: { name: 'Launch In Fullscreen', icon: faExpandArrowsAlt, type: 'toggle' },
  serverAnalytics: { name: 'Server Usage Analytics', icon: faChartPie, type: 'toggle' },
  automaticUpdates: { name: 'Automatic Updates', icon: faSync, type: 'toggle' },
  betaOptIn: { name: 'Beta Updates', icon: faFlask, type: 'toggle' },
  zoomApiToken: { name: 'Zoom API Token', icon: faShareSquare, type: 'textInput' },
} satisfies Record<string, ServerOption>
