import './__root.css'

import { RecommendedSources, Writer } from '@presenter/contract'
import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import classNames from 'classnames'
import { Provider } from 'jotai'
import { SnackbarProvider } from 'notistack'
import { PureComponent, Suspense } from 'react'

import Loader from '~/components/Loader'
import { API_URL, isDesktop, isMobile, isTablet } from '~/helpers/consts'
import {
  HistoryContext,
  RecommendedSourcesContext,
  SettingsContext,
  WritersContext,
} from '~/helpers/contexts'
import { DEFAULT_OPTIONS } from '~/helpers/options'
import { merge } from '~/helpers/utils'
import { store } from '~/services/jotai'
// import controller from '~/services/controller'

// const loadSettings = () => merge( { local: controller.readSettings() }, DEFAULT_OPTIONS )
const loadSettings = () => DEFAULT_OPTIONS

class App extends PureComponent {
  state = {
    viewedLines: {},
    transitionHistory: {},
    latestLines: {},
    recommendedSources: {} as RecommendedSources['recommendedSources'],
    writers: {},
    settings: loadSettings(),
  }

  componentDidMount() {
    // Register controller event
    // controller.on( 'history:viewed-lines', this.onViewedLines )
    // controller.on( 'history:transitions', this.onTransitionHistory )
    // controller.on( 'history:latest-lines', this.onLatestLineHistory )
    // controller.on( 'banis:list', this.onBanis )
    // controller.on( 'settings', this.onSettings )

    // Get recommended sources and set as settings, if there are none
    void fetch( `${API_URL}/sources` )
      .then( ( res ) => res.json() )
      .then( ( { recommendedSources }: { recommendedSources: RecommendedSources['recommendedSources'] } ) => {
        //* Update default options and settings with fetched recommended sources
        DEFAULT_OPTIONS.local.sources = recommendedSources
        //! Re-load settings since we've modified DEFAULT_OPTIONS directly
        this.setState( { recommendedSources, settings: loadSettings() } )
      } )

    // Get writers
    void fetch( `${API_URL}/writers` )
      .then( ( res ) => res.json() )
      .then( ( { writers }: { writers: Writer[] } ) => this.setState( { writers } ) )
  }

  componentWillUnmount() {
    // Deregister event listeners from controller
    // controller.off( 'shabads:current', this.onShabad )
    // controller.off( 'lines:current', this.onLine )
    // controller.off( 'history:transitions', this.onTransitionHistory )
    // controller.off( 'history:latest-lines', this.onLatestLineHistory )
    // controller.off( 'lines:main', this.onMainLine )
    // controller.off( 'lines:next', this.onNextLine )
    // controller.off( 'lines:viewed', this.onViewedLines )
    // controller.off( 'banis:list', this.onBanis )
    // controller.off( 'banis:current', this.onBani )
    // controller.off( 'settings', this.onSettings )
  }

  onBanis = ( banis: any[] ) => this.setState( { banis } )

  onSettings = ( { global = {}, local = {}, ...settings } ) => {
    // controller.saveLocalSettings( local, false )

    this.setState( ( state: typeof this.state ) => ( {
      settings: {
        ...Object
          .entries( settings )
          .filter( ( [ , config ] ) => config )
          .reduce( ( deviceSettings, [ host, config ] ) => ( {
            ...deviceSettings,
            [ host ]: merge( DEFAULT_OPTIONS.local, config ),
          } ), {} ),
        // local: controller.readSettings(),
        global: merge( state.settings.global, global ),
      },
    } ) )
  }

  render() {
    const {
      recommendedSources,
      writers,
      viewedLines,
      transitionHistory,
      latestLines,
      settings,
    } = this.state

    return (
      <div className={classNames( { mobile: isMobile, tablet: isTablet, desktop: isDesktop }, 'app' )}>
        <Provider store={store}>
          <Suspense fallback={<Loader />}>
            <SettingsContext.Provider value={settings}>
              <HistoryContext.Provider value={{ viewedLines, transitionHistory, latestLines }}>
                <WritersContext.Provider value={writers}>
                  <RecommendedSourcesContext.Provider value={recommendedSources}>
                    <SnackbarProvider>
                      <Outlet />
                    </SnackbarProvider>
                  </RecommendedSourcesContext.Provider>
                </WritersContext.Provider>
              </HistoryContext.Provider>
            </SettingsContext.Provider>
          </Suspense>
        </Provider>
      </div>
    )
  }
}

export const Route = createRootRoute( {
  component: App,
  notFoundComponent: () => <Navigate to="/presenter" />,
} )
