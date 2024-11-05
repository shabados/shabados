import { ComponentType, Context, createContext } from 'react'

import { SettingsState } from './options'

export const
  withContext = <T extends JSX.IntrinsicAttributes,>( Context: Context<T> ) => (
    Component: ComponentType
  ) => ( props: T ) => (
    <Context.Consumer>
      {( context ) => <Component {...context} {...props} />}
    </Context.Consumer>
  )

export const SettingsContext = createContext( {} as SettingsState )

type TransitionHistory = {
  length: number,
}

export const HistoryContext = createContext( {
  transitionHistory: {} as TransitionHistory,
  latestLines: {},
  viewedLines: {},
} )

type RecommendedSources = {
  pageNameEnglish: string,
}

export const RecommendedSourcesContext = createContext( {} as RecommendedSources )

export const WritersContext = createContext( {} )
