import {
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import Header from '~/components/app/header/header';
import Line from '~/components/line/line';
import requestWakeLock from '~/lib/wakelock';
import styles from './app.css?inline';

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

interface LineProps {
  src: string;
  translation: string;
  pronunciation: string;
}

interface SlideshowProps {
  focusOnClose: HTMLElement;
}

export const Slideshow = component$<SlideshowProps>(({ focusOnClose }) => {
  const interfaceStore = useContext(InterfaceContext);
  const map: { [key: string]: LineProps } = {
    waheguru: {
      src: 'ਵਾਹਿਗੁਰੂ',
      pronunciation: 'wāhegurū',
      translation: 'Waheguru',
    },
    mulmantar: {
      src: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ; ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ',
      pronunciation:
        'ik oañkār sat nām kartā purakh nirbhau nirvēr; akāl mūrat ajūnī sēbhañ gur prasād',
      translation:
        "One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. Image Of The Undying, Beyond Birth, Self-Existent. By Guru's Grace ~",
    },
    bsnssa: {
      src: 'ਬੋਲੇ ਸੋ ਨਿਹਾਲ; ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
      pronunciation: 'bole so nihāl; sat srī akāl',
      translation: 'Whoever says, transcends; Truth is the Timeless One!',
    },
    wjkk: {
      src: 'ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ; ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ',
      pronunciation: 'wāhegurū jī kā khālsā; wāhegurū jī kī fateh',
      translation: "Waheguru's pure, Waheguru's victory",
    },
  };
  const data = map[interfaceStore.slideshowType] || {};

  return (
    <main
      class='slideshow'
      onClick$={() => {
        interfaceStore.slideshow = 0;
        focusOnClose.focus();
      }}
    >
      <div>
        <article>
          <Line
            src={'src' in data ? data.src : ''}
            pronunciation={'src' in data ? data.pronunciation : ''}
            translation={'translation' in data ? data.translation : ''}
          />
        </article>
      </div>
      <p class='small slideshow__hint'>Click to exit slideshow</p>
    </main>
  );
});

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
          <article>
            <Slot />
          </article>
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
