import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation, type RequestHandler } from '@builder.io/qwik-city';
import Header from '~/components/app/header/header';
import requestWakeLock from '~/lib/wakelock';
import styles from './layout.css?inline';
import Slideshow from '~/components/app/slideshow/slideshow';
import Controls from '~/components/app/controls/controls';
import Journey from '~/components/app/journey/journey';
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
  mode: string;
  width: string;
  centered: number;
  slideshowType: string;
  notes: number;
  notesContent: string;
  larivar: number;
  vishraman: number;
  pronunciationField: number;
  translationField: number;
};

export const ControlsContext = createContextId<Controls>(
  'com.shabados.app.controls-context',
);

export type Ui = {
  controls: boolean;
  fullscreen: boolean;
  slideshow: boolean;
  journey: boolean;
  inspector: boolean;
  inspectorId: string;
};

export const UiContext = createContextId<Ui>('com.shabados.app.ui-context');

type PathTimestamp = {
  [path: string]: { [key: string]: string | number };
};

export type UserData = {
  history: PathTimestamp;
  archive: PathTimestamp;
};

export const UserDataContext = createContextId<UserData>(
  'com.shabados.app.user-data-context',
);

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

export default component$(() => {
  const controlsStore = useStore({
    zoom: 1,
    mode: 'classic',
    width: 'wider',
    centered: 0,
    slideshowType: 'blank',
    notes: 0,
    notesContent: '',
    larivar: 1,
    vishraman: 1,
    pronunciationField: 0,
    translationField: 1,
  });
  useContextProvider(ControlsContext, controlsStore);

  const uiStore = useStore({
    controls: false,
    fullscreen: false,
    slideshow: false,
    journey: false,
    inspector: false,
    inspectorId: '',
  });
  useContextProvider(UiContext, uiStore);

  const userDataStore = useStore({
    history: {} as PathTimestamp,
    archive: {} as PathTimestamp,
  });
  useContextProvider(UserDataContext, userDataStore);
  const { url } = useLocation();
  // url in
  useVisibleTask$(() => {
    uiStore.slideshow = false; // always set slideshow to "off" on load

    controlsStore.zoom = parseFloat(getLocalStorage('controlsZoom') ?? '1');
    controlsStore.mode = getLocalStorage('controlsMode') ?? 'classic';
    controlsStore.width = getLocalStorage('controlsWidth') ?? 'wider';
    controlsStore.centered = parseInt(
      getLocalStorage('controlsCentered') ?? '0',
    );
    controlsStore.slideshowType =
      getLocalStorage('controlsSlideshowType') ?? 'blank';
    controlsStore.notes = parseInt(getLocalStorage('controlsNotes') ?? '0');
    controlsStore.notesContent = getLocalStorage('controlsNotesContent') ?? '';
    controlsStore.larivar = parseInt(getLocalStorage('controlsLarivar') ?? '0');
    controlsStore.vishraman = parseInt(
      getLocalStorage('controlsVishraman') ?? '1',
    );
    controlsStore.pronunciationField = parseInt(
      getLocalStorage('controlsPronunciationField') ?? '0',
    );
    controlsStore.translationField = parseInt(
      getLocalStorage('controlsTranslationField') ?? '1',
    );

    userDataStore.history = JSON.parse(
      getLocalStorage('userDataHistory') ?? '{}',
    );
    userDataStore.archive = JSON.parse(
      getLocalStorage('userDataArchive') ?? '{}',
    );

    if (
      url.pathname !== '/' &&
      url.pathname !== '/app/' &&
      !url.pathname.includes('/search/')
    ) {
      userDataStore.history[url.pathname] = {};
      if (
        url.pathname.includes('/sggs/') ||
        url.pathname.includes('/sdgr/') ||
        url.pathname.includes('/gjnl/')
      ) {
        const m: { [key: string]: { [key: string]: string } } = {
          sggs: { title: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ', leaf: 'ਅੰਗ' },
          sdgr: { title: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ', leaf: 'ਅੰਗ' },
          gjnl: { title: 'ਗੰਜ ਨਾਮਾ', leaf: 'ਪਾਤਸ਼ਾਹੀ' },
        };
        const composition = url.pathname.split('/').slice(-3, -2)[0];
        const cTitle = m[composition]['title'];
        const leaf = url.pathname.split('/').slice(-2, -1)[0];
        const lTitle = m[composition]['leaf'] + ' ' + leaf;
        userDataStore.history[url.pathname]['title'] = `${cTitle} (${lTitle})`;
      } else if (url.pathname.includes('/g/')) {
        userDataStore.history[url.pathname]['title'] = `ਸ਼ਬਦ (${
          url.pathname.split('/').slice(-2, -1)[0]
        })`;
      } else if (url.pathname.includes('/h/')) {
        const yymmdd = url.pathname.split('/').slice(-2, -1)[0];
        const year = parseInt(yymmdd.slice(0, 2));
        const date = new Date(
          year < 75 ? year + 2000 : year + 1900,
          parseInt(yymmdd.slice(2, 4)) - 1,
          parseInt(yymmdd.slice(4, 6)),
        );
        userDataStore.history[url.pathname][
          'title'
        ] = `ਰੋਜ਼ਾਨਾ ਮੁੱਖਵਾਕ (${date.toLocaleDateString()})`;
      } else if (url.pathname.includes('/asa-ki-var/')) {
        userDataStore.history[url.pathname]['title'] = `ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ ${
          url.pathname.split('/').slice(-2, -1)[0]
        })`;
      } else {
        const m: { [key: string]: string } = {
          'jap-ji-sahib': 'ਜਪੁ ਜੀ ਸਾਹਿਬ',
          'jap-sahib': 'ਜਾਪੁ ਸਾਹਿਬ',
          'twa-prasad-swaye': 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ',
          'kabyo-bac-benti-copai': 'ਕਬ︀︁ਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ',
          'anand-sahib': 'ਅਨੰਦੁ ਸਾਹਿਬ',
          'rehras-sahib': 'ਰਹਰਾਸਿ ਸਾਹਿਬ',
          'kirtan-sohila': 'ਕੀਰਤਨ ਸੋਹਿਲਾ',
          ardas: 'ਅਰਦਾਸ',
        };
        userDataStore.history[url.pathname]['title'] =
          m[url.pathname.split('/').slice(-2, -1)[0]];
      }
      userDataStore.history[url.pathname]['time'] = new Date().valueOf();
      setLocalStorage('userDataHistory', JSON.stringify(userDataStore.history));
    }

    requestWakeLock();
  });

  useStyles$(styles);

  const appRef = useSignal<HTMLElement>();

  const toggleControls = $(() => {
    uiStore.controls = !uiStore.controls;
  });

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

  const zoomLess = $(() => {
    const initial = controlsStore.zoom;
    controlsStore.zoom -= 0.25;
    if (controlsStore.zoom < 1) {
      controlsStore.zoom = 1;
    }
    if (initial != controlsStore.zoom) {
      setLocalStorage('controlsZoom', String(controlsStore.zoom));
      document.documentElement.style.fontSize = `${controlsStore.zoom}em`;
    }
  });

  const zoomMore = $(() => {
    const initial = controlsStore.zoom;
    controlsStore.zoom += 0.25;
    if (controlsStore.zoom > 4) {
      controlsStore.zoom = 4;
    }
    if (initial != controlsStore.zoom) {
      setLocalStorage('controlsZoom', String(controlsStore.zoom));
      document.documentElement.style.fontSize = `${controlsStore.zoom}em`;
    }
  });

  const toggleJourney = $(() => {
    uiStore.journey = !uiStore.journey;
  });

  return (
    <>
      {uiStore.controls && <Controls />}
      {uiStore.journey && <Journey />}
      {/* {uiStore.inspector && <Inspector id={uiStore.inspectorId} />} */}
      <Header />
      {!!uiStore.slideshow && <Slideshow focusOnClose={appRef.value!} />}
      <main
        class='app'
        tabIndex={-1}
        ref={appRef}
        onKeyDown$={(event) => {
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
                toggleControls();
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
                toggleJourney();
                break;
              case 'Y':
                toggleJourney();
                break;
            }
          }
        }}
      >
        <div style={{ width: '656px' }}>
          <Slot />
          {!!controlsStore.notes && (
            <textarea
              class='notes-pane'
              maxLength={100}
              value={controlsStore.notesContent}
              onChange$={(e) => {
                controlsStore.notesContent = e.target.value;
                setLocalStorage('controlsNotesContent', e.target.value);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
});
