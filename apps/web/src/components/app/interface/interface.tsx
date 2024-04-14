import {
  type Signal,
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { InterfaceContext, setLocalStorage } from '~/routes/layout-app';
import styles from './interface.css?inline';
import Switch from '~/components/switch/switch';

interface Props {
  toggled: Signal<boolean>;
}

export default component$(({ toggled }: Props) => {
  useStylesScoped$(styles);
  const fullscreen = useSignal(!!document.fullscreenElement);
  const interfaceStore = useContext(InterfaceContext);

  return (
    <>
      <div class='modal-bg' onClick$={() => (toggled.value = false)} />
      <div class='modal'>
        <article class='modal__article'>
          <h2>
            Interface
            <span
              dir='rtl'
              class='modal__close'
              onClick$={() => (toggled.value = false)}
            >
              X
            </span>
          </h2>
          {document.fullscreenEnabled && (
            <div
              class='interface__option clickable'
              onClick$={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                  fullscreen.value = true;
                } else if (document.exitFullscreen) {
                  document.exitFullscreen();
                  fullscreen.value = false;
                }
              }}
            >
              Fullscreen
              <Switch toggled={fullscreen.value} />
            </div>
          )}
          <div class='interface__option'>
            Zoom
            <input
              type='range'
              min={1}
              max={4}
              step={0.25}
              value={interfaceStore.zoom}
              onChange$={(e) => {
                setLocalStorage('interfaceZoom', e.target.value);
                document.documentElement.style.fontSize = `${e.target.value}em`;
                interfaceStore.zoom = parseFloat(
                  e.target.value as unknown as string,
                );
              }}
            />
          </div>
          <div class='interface__option'>
            Mode
            <select
              class='interface__select'
              value={interfaceStore.mode}
              onChange$={(e) => {
                const v = e.target.value as string;
                setLocalStorage('interfaceMode', v);
                interfaceStore.mode = v;
                document.documentElement.className = v;
              }}
            >
              <option value='classic'>Classic</option>
              <option value='saral'>Saral</option>
              <option value='reader'>Reader</option>
              <option value='presenter'>Presenter</option>
            </select>
          </div>
          <div class='interface__option'>
            Slideshow
            <select
              class='interface__select'
              value={interfaceStore.slideshowType}
              onChange$={(e) => {
                const v = e.target.value as string;
                setLocalStorage('interfaceSlideshowType', v);
                interfaceStore.slideshowType = v;
              }}
              onMouseDown$={() => {
                interfaceStore.slideshow = 1;
              }}
            >
              <option value='blank'>Blank</option>
              <option value='waheguru'>ਵਾਹਿਗੁਰੂ (Waheguru)</option>
              <option value='mulmantar'>ਮੂਲ ਮੰਤਰ (Mul Mantar)</option>
              <option value='bsnssa'>Bole So Nihal</option>
              <option value='wjkk'>Wjkk Wjkf</option>
            </select>
          </div>
          <div
            class='interface__option clickable'
            onClick$={() => {
              interfaceStore.notes = isNaN(interfaceStore.notes)
                ? 0
                : 1 - interfaceStore.notes;
              setLocalStorage(
                'interfaceNotes',
                interfaceStore.notes.toString(),
              );
            }}
          >
            Notes
            <Switch toggled={!!interfaceStore.notes} />
          </div>
          <a
            href='mailto:team@shabados.com'
            class='interface__option clickable'
          >
            Send Feedback
            <span class='interface__icon'>↗</span>
          </a>
        </article>
      </div>
    </>
  );
});
