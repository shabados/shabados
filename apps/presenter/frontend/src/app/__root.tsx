import './__root.css'
import 'jotai-devtools/styles.css'

import { RecommendedSources, Writer } from '@presenter/contract'
import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import classNames from 'classnames'
import { Provider } from 'jotai'
import { DevTools } from 'jotai-devtools'
import { SnackbarProvider } from 'notistack'
import { PureComponent, Suspense } from 'react'

import Loader from '#~/components/Loader'
import { API_URL, isDesktop, isMobile, isTablet } from '#~/helpers/consts'
import {
  HistoryContext,
  RecommendedSourcesContext,
  WritersContext,
} from '#~/helpers/contexts'
import { store } from '#~/services/jotai'

class App extends PureComponent {
  state = {
    viewedLines: {},
    transitionHistory: {},
    latestLines: {},
    recommendedSources: {} as RecommendedSources['recommendedSources'],
    writers: {},
  }

  componentDidMount() {
    void fetch( `${API_URL}/sources` )
      .then( ( res ) => res.json() )
      .then( ( { recommendedSources }: { recommendedSources: RecommendedSources['recommendedSources'] } ) => {
        //* Update default options and settings with fetched recommended sources
        // DEFAULT_OPTIONS.local.sources = recommendedSources
        //! Re-load settings since we've modified DEFAULT_OPTIONS directly
        this.setState( { recommendedSources } )
      } )

    // Get writers
    void fetch( `${API_URL}/writers` )
      .then( ( res ) => res.json() )
      .then( ( { writers }: { writers: Writer[] } ) => this.setState( { writers } ) )
  }

  render() {
    const {
      recommendedSources,
      writers,
      viewedLines,
      transitionHistory,
      latestLines,
    } = this.state

    return (
      <div className={classNames( { mobile: isMobile, tablet: isTablet, desktop: isDesktop }, 'app' )}>
        <Provider store={store}>
          <DevTools store={store} />
          <Suspense fallback={<Loader />}>
            <HistoryContext.Provider value={{ viewedLines, transitionHistory, latestLines }}>
              <WritersContext.Provider value={writers}>
                <RecommendedSourcesContext.Provider value={recommendedSources}>
                  <SnackbarProvider>
                    <Outlet />
                  </SnackbarProvider>
                </RecommendedSourcesContext.Provider>
              </WritersContext.Provider>
            </HistoryContext.Provider>
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
