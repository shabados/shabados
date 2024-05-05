import {
  type Signal,
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { ControlsContext, setLocalStorage } from '~/routes/layout-app';
import styles from './controls.css?inline';
import Switch from '~/components/switch/switch';
import Minimize from '~/components/icons/ui/minimize';
import Maximize from '~/components/icons/ui/maximize';
import Zoom from '~/components/icons/ui/zoom';
import Mode from '~/components/icons/ui/mode';
import Slideshow from '~/components/icons/ui/slideshow';
import Notes from '~/components/icons/ui/notes';
import Feedback from '~/components/icons/ui/feedback';
import X from '~/components/icons/ui/x';
import Translation from '~/components/icons/ui/translation';
import Pronunciation from '~/components/icons/ui/pronunciation';
import Width from '~/components/icons/ui/width';

interface Props {
  toggled: Signal<boolean>;
}

export default component$(({ toggled }: Props) => {
  useStylesScoped$(styles);
  const fullscreen = useSignal(!!document.fullscreenElement);
  const controlsStore = useContext(ControlsContext);

  return (
    <>
      <div class='modal-bg' onClick$={() => (toggled.value = false)} />
      <div class='modal'>
        <article class='modal__header'>
          <h2 class='modal__title'>Controls</h2>
          <span
            dir='rtl'
            class='modal__close'
            onClick$={() => (toggled.value = false)}
          >
            <X />
          </span>
        </article>
        <article class='modal__article'>
          {document.fullscreenEnabled && (
            <>
              <div
                class='controls__option clickable'
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
                <div class='controls__label'>
                  {fullscreen.value ? <Minimize /> : <Maximize />}Fullscreen
                </div>
                <Switch toggled={fullscreen.value} />
              </div>
              <hr />
            </>
          )}
          <div class='controls__option'>
            <div class='controls__label'>
              <Zoom />
              Zoom
            </div>
            <input
              type='range'
              min={1}
              max={4}
              step={0.25}
              value={controlsStore.zoom}
              onChange$={(e) => {
                setLocalStorage('controlsZoom', e.target.value);
                document.documentElement.style.fontSize = `${e.target.value}em`;
                controlsStore.zoom = parseFloat(
                  e.target.value as unknown as string,
                );
              }}
            />
          </div>
          <div>
            <div class='controls__label'>
              <Mode />
              Mode
            </div>
            <div class='controls__grid'>
              <a
                class={`controls__card ${
                  controlsStore.mode == 'classic' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'classic';
                  setLocalStorage('controlsMode', v);
                  controlsStore.mode = v;
                  document.documentElement.setAttribute('data-mode', v);
                }}
              >
                Classic
              </a>
              <a
                class={`controls__card ${
                  controlsStore.mode == 'presenter' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'presenter';
                  setLocalStorage('controlsMode', v);
                  controlsStore.mode = v;
                  document.documentElement.setAttribute('data-mode', v);
                }}
              >
                Presenter
              </a>
              <a
                class={`controls__card ${
                  controlsStore.mode == 'reader' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'reader';
                  setLocalStorage('controlsMode', v);
                  controlsStore.mode = v;
                  document.documentElement.setAttribute('data-mode', v);
                }}
              >
                Reader
              </a>
              <a
                class={`controls__card ${
                  controlsStore.mode == 'saral' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'saral';
                  setLocalStorage('controlsMode', v);
                  controlsStore.mode = v;
                  document.documentElement.setAttribute('data-mode', v);
                }}
              >
                Saral
              </a>
            </div>
          </div>

          <div class='controls__width'>
            <div class='controls__label'>
              <Width />
              Width
            </div>
            <div class='controls__grid'>
              <a
                class={`controls__card ${
                  controlsStore.width == 'narrower' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'narrower';
                  setLocalStorage('controlsWidth', v);
                  controlsStore.width = v;

                  document.documentElement.setAttribute('data-width', v);
                }}
              >
                Narrower
              </a>
              <a
                class={`controls__card ${
                  controlsStore.width == 'base' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'base';
                  setLocalStorage('controlsWidth', v);
                  controlsStore.width = v;

                  document.documentElement.setAttribute('data-width', v);
                }}
              >
                Base
              </a>
              <a
                class={`controls__card ${
                  controlsStore.width == 'wider' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'wider';
                  setLocalStorage('controlsWidth', v);
                  controlsStore.width = v;

                  document.documentElement.setAttribute('data-width', v);
                }}
              >
                Wider
              </a>
              <a
                class={`controls__card ${
                  controlsStore.width == 'widest' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'widest';
                  setLocalStorage('controlsWidth', v);
                  controlsStore.width = v;

                  document.documentElement.setAttribute('data-width', v);
                }}
              >
                Widest
              </a>
            </div>
          </div>

          <hr />

          <div>
            <div class='controls__label'>
              <Slideshow />
              Slideshow
            </div>
            <div class='controls__grid'>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'blank' &&
                  controlsStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'blank';

                  if (
                    controlsStore.slideshowType == v &&
                    controlsStore.slideshow
                  ) {
                    // untoggle
                    controlsStore.slideshow = 0;
                  } else {
                    setLocalStorage('controlsSlideshowType', v);
                    controlsStore.slideshowType = v;
                    controlsStore.slideshow = 1;
                  }
                }}
              >
                Blank
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'waheguru' &&
                  controlsStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'waheguru';

                  if (
                    controlsStore.slideshowType == v &&
                    controlsStore.slideshow
                  ) {
                    // untoggle
                    controlsStore.slideshow = 0;
                  } else {
                    setLocalStorage('controlsSlideshowType', v);
                    controlsStore.slideshowType = v;
                    controlsStore.slideshow = 1;
                  }
                }}
              >
                Waheguru
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'wjkk' &&
                  controlsStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'wjkk';

                  if (
                    controlsStore.slideshowType == v &&
                    controlsStore.slideshow
                  ) {
                    // untoggle
                    controlsStore.slideshow = 0;
                  } else {
                    setLocalStorage('controlsSlideshowType', v);
                    controlsStore.slideshowType = v;
                    controlsStore.slideshow = 1;
                  }
                }}
              >
                Wjkk Wjkf
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'mulmantar' &&
                  controlsStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'mulmantar';

                  if (
                    controlsStore.slideshowType == v &&
                    controlsStore.slideshow
                  ) {
                    // untoggle
                    controlsStore.slideshow = 0;
                  } else {
                    setLocalStorage('controlsSlideshowType', v);
                    controlsStore.slideshowType = v;
                    controlsStore.slideshow = 1;
                  }
                }}
              >
                Mul Mantar
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'bsnssa' &&
                  controlsStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'bsnssa';

                  if (
                    controlsStore.slideshowType == v &&
                    controlsStore.slideshow
                  ) {
                    // untoggle
                    controlsStore.slideshow = 0;
                  } else {
                    setLocalStorage('controlsSlideshowType', v);
                    controlsStore.slideshowType = v;
                    controlsStore.slideshow = 1;
                  }
                }}
              >
                Bole So Nihal
              </a>
            </div>
          </div>
          <div
            class='controls__option clickable'
            onClick$={() => {
              controlsStore.notes = isNaN(controlsStore.notes)
                ? 0
                : 1 - controlsStore.notes;
              setLocalStorage('controlsNotes', controlsStore.notes.toString());
            }}
          >
            <div class='controls__label'>
              <Notes />
              Notes
            </div>
            <Switch toggled={!!controlsStore.notes} />
          </div>
          <hr />
          <div
            class='controls__option clickable'
            onClick$={() => {
              controlsStore.pronunciationField = isNaN(
                controlsStore.pronunciationField,
              )
                ? 0
                : 1 - controlsStore.pronunciationField;
              setLocalStorage(
                'controlsPronunciationField',
                controlsStore.pronunciationField.toString(),
              );
            }}
          >
            <div class='controls__label'>
              <Pronunciation />
              Pronunciations
            </div>
            <Switch toggled={!!controlsStore.pronunciationField} />
          </div>
          <div
            class='controls__option clickable'
            onClick$={() => {
              controlsStore.translationField = isNaN(
                controlsStore.translationField,
              )
                ? 0
                : 1 - controlsStore.translationField;
              setLocalStorage(
                'controlsTranslationField',
                controlsStore.translationField.toString(),
              );
            }}
          >
            <div class='controls__label'>
              <Translation />
              Translations
            </div>
            <Switch toggled={!!controlsStore.translationField} />
          </div>
          <hr />
          <a href='mailto:team@shabados.com' class='controls__option clickable'>
            <div class='controls__label'>
              <Feedback />
              Feedback
            </div>
            <span class='controls__icon'>↗</span>
          </a>
        </article>
      </div>
    </>
  );
});
