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
import { type RequestHandler } from '@builder.io/qwik-city';
import Header from '~/components/app/header/header';
import requestWakeLock from '~/lib/wakelock';
import styles from './app.css?inline';
import Slideshow from '~/components/app/slideshow/slideshow';
import Controls from '~/components/app/controls/controls';

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
};

export const UiContext = createContextId<Ui>('com.shabados.app.ui-context');

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
    zoom: 1.5,
    mode: 'classic',
    width: 'base',
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
  });
  useContextProvider(UiContext, uiStore);

  useVisibleTask$(() => {
    controlsStore.zoom = parseFloat(getLocalStorage('controlsZoom') ?? '1.5');
    controlsStore.mode = getLocalStorage('controlsMode') ?? 'classic';
    controlsStore.width = getLocalStorage('controlsWidth') ?? 'base';
    uiStore.slideshow = false; // always set slideshow to "off" on load
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

  return (
    <>
      {uiStore.controls && <Controls />}
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
            console.log(event.key);
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
                setLocalStorage('controlsNotesContent', e.target.value);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
});
