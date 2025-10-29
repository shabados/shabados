import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOnWindow,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation, type RequestHandler } from '@builder.io/qwik-city';
import Slideshow from '~/components/app/slideshow/slideshow';
import Toolbar from '~/components/app/toolbar/toolbar';
import Collections from '~/components/app/toolboxes/collections/collections';
import Controls from '~/components/app/toolboxes/controls/controls';
import Journey from '~/components/app/toolboxes/journey/journey';
import Search from '~/components/app/toolboxes/search/search';
import {
  addHistoryItem,
  getLocalStorage,
  getUserData,
  type SearchHistory,
  setLocalStorage,
} from '~/lib/localStorage';
import toGurmukhiNumerals from '~/lib/toGurmukhiNumerals';
import requestWakeLock from '~/lib/wakelock';
import zoomValues from '~/lib/zoomValues';
import styles from './layout.css?inline';
import toggleToolbox, { type ToolboxKey } from '~/lib/toggleToolbox';
// import Inspector from '~/components/app/inspector/inspector';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    // Always serve a cached response by default, up to two weeks stale
    staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
    // Max once every two days, revalidate on the server to get a fresh version of this page
    maxAge: 60 * 60 * 24 * 2,
  });
};

export type Controls = {
  zoom: number;
  factor: number;
  mode: string;
  fullWidth: number;
  centered: number;
  larivar: number;
  vishraman: number;
  pronunciationField: number;
  translationField: number;
  viakhiaField: number;
  notes: number;
  notesContent: string;
  slideshowType: string;
  appearance: string;
};

const controlsDefault: Controls = {
  zoom: 4,
  factor: 150,
  mode: 'reader',
  fullWidth: 0,
  centered: 1,
  larivar: 0,
  vishraman: 1,
  pronunciationField: 0,
  translationField: 1,
  viakhiaField: 1,
  notes: 0,
  notesContent: '',
  slideshowType: 'blank',
  appearance: 'auto',
};

export const ControlsContext = createContextId<Controls>(
  'com.shabados.app.controls-context',
);

export type Ui = {
  controls: boolean;
  collections: boolean;
  search: boolean;
  searchQuery: string;
  searchToolbar: boolean;
  fullscreen: boolean;
  slideshow: boolean;
  journey: boolean;
  inspector: boolean;
  inspectorId: string;
  scrollFar: boolean;
  scrollForward: boolean;
};

export const UiContext = createContextId<Ui>('com.shabados.app.ui-context');

type PathTimestamp = {
  [path: string]: { [key: string]: string | number };
};

export type UserData = {
  searches: SearchHistory[];
  history: PathTimestamp;
  archive: PathTimestamp;
  ang: string;
};

export const UserDataContext = createContextId<UserData>(
  'com.shabados.app.user-data-context',
);

export default component$(() => {
  const controlsStore = useStore(controlsDefault);
  useContextProvider(ControlsContext, controlsStore);

  const uiStore = useStore({
    controls: false,
    collections: false,
    search: false,
    searchQuery: '',
    searchToolbar: false,
    fullscreen: false,
    slideshow: false,
    journey: false,
    inspector: false,
    inspectorId: '',
    scrollFar: false,
    scrollForward: false,
  });
  useContextProvider(UiContext, uiStore);
  const userDataStore = useStore({
    searches: [] as SearchHistory[],
    history: {} as PathTimestamp,
    archive: {} as PathTimestamp,
    ang: '0',
  });
  useContextProvider(UserDataContext, userDataStore);
  const { url } = useLocation();
  // url in

  const scrollPos = useStore({
    is: 0,
    was: 0,
    max: 0,
  });
  // const isFine = useSignal<boolean>(false);
  // const modalWidth = 372;
  // const windowWidth = useSignal<number>(1);
  // const zoomFactor = useComputed$(
  //   () =>
  //     (windowWidth.value -
  //       modalWidth * (uiStore.journey || uiStore.controls ? 1 : 0)) /
  //     windowWidth.value,
  // );

  // useOnWindow(
  //   'resize',
  //   $(() => {
  //     windowWidth.value = window.innerWidth;
  //   }),
  // );

  useOnWindow(
    'scroll',
    $(() => {
      if (scrollPos.max <= 0)
        scrollPos.max = document.body.scrollHeight - window.innerHeight;

      scrollPos.is = window.scrollY;
      uiStore.scrollForward =
        scrollPos.is > 1 &&
        (scrollPos.is > scrollPos.was || scrollPos.is >= scrollPos.max);

      scrollPos.was = scrollPos.is;

      if (scrollPos.is > 22.5) {
        uiStore.scrollFar = true;
      } else {
        uiStore.scrollFar = false;
      }
    }),
  );

  useOnWindow(
    'load',
    $(() => {
      // isFine.value = matchMedia('(pointer:fine)').matches;
      // windowWidth.value = window.innerWidth;
      scrollPos.max = document.body.scrollHeight - window.innerHeight;
      uiStore.slideshow = false; // always set slideshow to "off" on load
    }),
  );

  useVisibleTask$(() => {
    const localControlsStore = getLocalStorage('controlsStore');
    if (localControlsStore) {
      Object.entries(localControlsStore).map(([key, value]) => {
        if (
          key in controlsStore &&
          typeof controlsStore[key as keyof Controls] === typeof value
        ) {
          (controlsStore as any)[key] = value;
        } else {
          delete (localControlsStore as any)[key];
        }
      });

      Object.entries(controlsStore).map(([key, value]) => {
        if (!(key in localControlsStore)) {
          (localControlsStore as any)[key] = value;
        }
      });
      setLocalStorage('controlsStore', localControlsStore);
    }

    // Initialize userDataStore from local storage
    const localUserDataStore = getUserData();
    userDataStore.searches = localUserDataStore.searches ?? [];
    uiStore.searchQuery = userDataStore.searches[0]?.query || '';

    const lastSearch = (getUserData('searches') as string[])[0] || '';
    if (uiStore.searchQuery === '' && lastSearch !== '') {
      uiStore.searchQuery = lastSearch;
    }

    userDataStore.history = localUserDataStore.history ?? {};
    userDataStore.archive = localUserDataStore.archive ?? {};
    userDataStore.ang = localUserDataStore.ang ?? '0';

    if (
      url.pathname.includes('/sggs/') ||
      url.pathname.includes('/sdgr/') ||
      url.pathname.includes('/gjnl/') ||
      url.pathname.includes('/sukhmani-sahib/') ||
      url.pathname.includes('/asa-ki-var/')
    ) {
      const m: { [key: string]: { [key: string]: string } } = {
        sggs: { title: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ', leaf: 'ਅੰਗ' },
        sdgr: { title: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ', leaf: 'ਅੰਗ' },
        gjnl: { title: 'ਗੰਜ ਨਾਮਾ', leaf: 'ਪਾਤਸ਼ਾਹੀ' },
        'asa-ki-var': { title: 'ਆਸਾ ਕੀ ਵਾਰ', leaf: 'ਛੱਕਾ' },
        'sukhmani-sahib': { title: 'ਸੁਖਮਨੀ ਸਾਹਿਬ', leaf: 'ਅਸਟਪਦੀ' },
      };
      const composition = url.pathname.split('/').slice(-3, -2)[0];
      const cTitle = m[composition]['title'];
      const leaf = url.pathname.split('/').slice(-2, -1)[0];
      const lTitle = m[composition]['leaf'] + ' ' + toGurmukhiNumerals(leaf);
      addHistoryItem(url.pathname, {
        title: `${lTitle} - ${cTitle}`,
      });
      if (composition === 'sggs') {
        if (parseInt(leaf) <= 1 || parseInt(leaf) >= 1426) {
          userDataStore.ang = '0';
        } else {
          userDataStore.ang = leaf;
        }
        setLocalStorage('userDataStore', userDataStore);
      }
    } else if (url.pathname.includes('/h/')) {
      const yymmdd = url.pathname.split('/').slice(-2, -1)[0];
      const year = parseInt(yymmdd.slice(0, 2));
      const date = new Date(
        year < 75 ? year + 2000 : year + 1900,
        parseInt(yymmdd.slice(2, 4)) - 1,
        parseInt(yymmdd.slice(4, 6)),
      );
      addHistoryItem(url.pathname, {
        title: `ਰੋਜ਼ਾਨਾ ਮੁੱਖਵਾਕ (${date.toLocaleDateString()})`,
      });
    } else {
      const pathTitleMap: { [key: string]: string } = {
        '/jap-ji-sahib/': 'ਜਪੁ ਜੀ ਸਾਹਿਬ',
        '/jap-sahib/': 'ਜਾਪੁ ਸਾਹਿਬ',
        '/twa-prasad-swaye/': 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ',
        '/kabyo-bac-benti-copai/': 'ਕਬ︀︁ਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ',
        '/anand-sahib/': 'ਅਨੰਦੁ ਸਾਹਿਬ',
        '/rehras-sahib/': 'ਰਹਰਾਸਿ ਸਾਹਿਬ',
        '/kirtan-sohila/': 'ਕੀਰਤਨ ਸੋਹਿਲਾ',
        '/ardas/': 'ਅਰਦਾਸ',
        '/sggs-bhog/': 'ਭੋਗ - ਸਲੋਕ ਮਹਲਾ ੯',
        '/ragmala/': 'ਰਾਗਮਾਲਾ',
      };

      const isPathExist = Object.keys(pathTitleMap).some(
        (p) => p === url.pathname,
      );

      if (isPathExist) {
        addHistoryItem(url.pathname, {
          title: pathTitleMap[url.pathname],
        });
        if (url.pathname === '/sggs-bhog/' || url.pathname === '/ragmala/') {
          userDataStore.ang = '0';
          setLocalStorage('userDataStore', userDataStore);
        }
      }
    }

    requestWakeLock();
  });

  useStyles$(styles);

  const appRef = useSignal<HTMLElement>();

  const toggleFullscreen = $(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      uiStore.fullscreen = true;
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      uiStore.fullscreen = false;
    }
  });

  const toggleSlideshow = $(() => {
    uiStore.slideshow = !uiStore.slideshow;
  });

  const updateZoomDom = $((v: number) => {
    setLocalStorage('controls', controlsStore);
    document.documentElement.style.fontSize = `${zoomValues[v]}em`;
  });

  const zoomLess = $(() => {
    const initial = controlsStore.zoom;
    controlsStore.zoom -= 1;
    if (controlsStore.zoom < 0) {
      controlsStore.zoom = 0;
    }
    if (initial != controlsStore.zoom) {
      updateZoomDom(controlsStore.zoom);
    }
  });

  const zoomMore = $(() => {
    const initial = controlsStore.zoom;
    controlsStore.zoom += 1;
    if (controlsStore.zoom > zoomValues.length - 1) {
      controlsStore.zoom = zoomValues.length - 1;
    }
    if (initial != controlsStore.zoom) {
      updateZoomDom(controlsStore.zoom);
    }
  });

  // const mainStyle = useComputed$(() => {
  //   if (isFine.value) {
  //     return {
  //       zoom: zoomFactor.value.toString(),
  //       // paddingLeft: `${
  //       //   (modalWidth / zoomFactor.value) * (uiStore.journey ? 1 : 0)
  //       // }px`,
  //       paddingRight: `${
  //         (modalWidth / zoomFactor.value) *
  //         (uiStore.controls || uiStore.journey ? 1 : 0)
  //       }px`,
  //     };
  //   }
  //   return {};
  // });

  return (
    <>
      {uiStore.controls && <Controls />}
      {uiStore.journey && <Journey />}
      {uiStore.collections && <Collections />}
      {/* {uiStore.inspector && <Inspector id={uiStore.inspectorId} />} */}
      {/* <div class='statusbar'></div> */}
      {/* {url.pathname !== '/' && <Header />} */}
      {uiStore.search && <Search />}
      {/* {url.pathname !== '/' && <TrackControls />} */}
      {!!uiStore.slideshow && <Slideshow focusOnClose={appRef.value!} />}
      <main
        class='app'
        tabIndex={-1}
        ref={appRef}
        // style={mainStyle.value}
        document:onKeyDown$={(event) => {
          if (
            event.altKey === false &&
            event.ctrlKey === false &&
            event.metaKey === false &&
            (event.target as HTMLInputElement).nodeName.toLowerCase() !==
              'input' &&
            (event.target as HTMLInputElement).nodeName.toLowerCase() !==
              'textarea'
          ) {
            switch (event.key) {
              case ',':
                toggleToolbox(uiStore, 'controls' as ToolboxKey);
                break;
              case '/':
                toggleToolbox(uiStore, 'search' as ToolboxKey);
                break;
              case 'f':
                toggleFullscreen();
                break;
              case 'F':
                toggleFullscreen();
                break;
              case 's':
                toggleSlideshow();
                break;
              case 'S':
                toggleSlideshow();
                break;
              case '-':
                zoomLess();
                break;
              case '_':
                zoomLess();
                break;
              case '=':
                zoomMore();
                break;
              case '+':
                zoomMore();
                break;
              case 'y':
                toggleToolbox(uiStore, 'journey' as ToolboxKey);
                break;
              case 'Y':
                toggleToolbox(uiStore, 'journey' as ToolboxKey);
                break;
              case 'b':
                toggleToolbox(uiStore, 'collections' as ToolboxKey);
                break;
              case 'B':
                toggleToolbox(uiStore, 'collections' as ToolboxKey);
                break;
            }
          }
        }}
      >
        <div>
          <Slot />
          {!!controlsStore.notes && (
            <textarea
              class='notes-pane'
              maxLength={100}
              value={controlsStore.notesContent}
              onChange$={(e) => {
                controlsStore.notesContent = e.target.value;
                setLocalStorage('controls', controlsStore);
              }}
            />
          )}
        </div>
      </main>
      {url.pathname !== '/' && <Toolbar />}
    </>
  );
});
