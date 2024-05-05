import {
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
  slideshow: number;
  slideshowType: string;
  notes: number;
  notesContent: string;
};

export const ControlsContext = createContextId<Controls>(
  'com.shabados.app.controls-context',
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
    slideshow: 0,
    slideshowType: 'blank',
    notes: 0,
    notesContent: '',
  });
  useContextProvider(ControlsContext, controlsStore);
  useVisibleTask$(() => {
    controlsStore.zoom = parseFloat(getLocalStorage('controlsZoom') ?? '1');
    controlsStore.mode = getLocalStorage('controlsMode') ?? 'classic';
    controlsStore.slideshow = 0; // always set slideshow to "off" on load
    controlsStore.slideshowType =
      getLocalStorage('controlsSlideshowType') ?? 'blank';
    controlsStore.notes = parseInt(getLocalStorage('controlsNotes') ?? '0');
    controlsStore.notesContent = getLocalStorage('controlsNotesContent') ?? '';
    requestWakeLock();
  });
  useStyles$(styles);
  const appRef = useSignal<HTMLElement>();
  return (
    <>
      <Header />
      {!!controlsStore.slideshow && <Slideshow focusOnClose={appRef.value!} />}
      <main
        class='app'
        tabIndex={-1}
        ref={appRef}
        onKeyDown$={(event) => {
          if (
            event.altKey === false &&
            event.ctrlKey === false &&
            event.metaKey === false &&
            event.shiftKey === false
          ) {
            switch (event.key) {
              case 's':
                controlsStore.slideshow = isNaN(controlsStore.slideshow)
                  ? 0
                  : 1 - controlsStore.slideshow;
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
