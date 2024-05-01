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

export type Interface = {
  zoom: number;
  mode: string;
  slideshow: number;
  slideshowType: string;
  notes: number;
  notesContent: string;
};

export const InterfaceContext = createContextId<Interface>(
  'com.shabados.app.interface-context',
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
  const interfaceStore = useStore({
    zoom: 1,
    mode: 'classic',
    slideshow: 0,
    slideshowType: 'blank',
    notes: 0,
    notesContent: '',
  });
  useContextProvider(InterfaceContext, interfaceStore);
  useVisibleTask$(() => {
    interfaceStore.zoom = parseFloat(getLocalStorage('interfaceZoom') ?? '1');
    interfaceStore.mode = getLocalStorage('interfaceMode') ?? 'classic';
    interfaceStore.slideshow = 0; // always set slideshow to "off" on load
    interfaceStore.slideshowType =
      getLocalStorage('interfaceSlideshowType') ?? 'blank';
    interfaceStore.notes = parseInt(getLocalStorage('interfaceNotes') ?? '0');
    interfaceStore.notesContent =
      getLocalStorage('interfaceNotesContent') ?? '';
    requestWakeLock();
  });
  useStyles$(styles);
  const appRef = useSignal<HTMLElement>();
  return (
    <>
      <Header />
      {!!interfaceStore.slideshow && <Slideshow focusOnClose={appRef.value!} />}
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
                interfaceStore.slideshow = isNaN(interfaceStore.slideshow)
                  ? 0
                  : 1 - interfaceStore.slideshow;
                break;
            }
          }
        }}
      >
        <div>
          <Slot />
          {!!interfaceStore.notes && (
            <textarea
              class='notes-pane'
              maxLength={100}
              value={interfaceStore.notesContent}
              onChange$={(e) => {
                interfaceStore.notesContent = e.target.value;
                setLocalStorage('interfaceNotesContent', e.target.value);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
});
