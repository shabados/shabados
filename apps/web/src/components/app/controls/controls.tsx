import {
  $,
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  Controls,
  ControlsContext,
  UiContext,
  setLocalStorage,
} from '~/routes/(app)/layout';
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
import Mail from '~/components/icons/ui/mail';
import ExternalLink from '~/components/icons/ui/external-link';
import Instagram from '~/components/icons/ui/instagram';
import Youtube from '~/components/icons/ui/youtube';
import Slack from '~/components/icons/ui/slack';
import Github from '~/components/icons/ui/github';
import Pause from '~/components/icons/ui/pause';
import Continuous from '~/components/icons/ui/continuous';
import Centered from '~/components/icons/ui/centered';
import zoomValues from '~/lib/zoomValues';
import Ratio from '~/components/icons/ui/ratio';
import Appearance from '~/components/icons/ui/appearance';

export default component$(() => {
  useStylesScoped$(styles);
  const controlsStore = useContext(ControlsContext);
  const uiStore = useContext(UiContext);
  const updateControls = $(
    <Key extends keyof Controls>(key: Key, value: Controls[Key]) => {
      controlsStore[key] = value;
      setLocalStorage('controlsStore', controlsStore);
    },
  );
  useVisibleTask$(() => {
    uiStore.fullscreen = !!document.fullscreenElement;
  });

  return (
    <>
      <div class='modal-bg' onClick$={() => (uiStore.controls = false)} />
      <div class='modal'>
        <article class='modal__header'>
          <h2 class='modal__title'>Controls</h2>
          <span
            dir='rtl'
            class='modal__close'
            onClick$={() => (uiStore.controls = false)}
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
                    uiStore.fullscreen = true;
                  } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                    uiStore.fullscreen = false;
                  }
                }}
              >
                <div class='controls__label'>
                  {uiStore.fullscreen ? <Minimize /> : <Maximize />}
                  Fullscreen
                </div>
                <Switch toggled={uiStore.fullscreen} />
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
              min={0}
              max={zoomValues.length - 1}
              step={1}
              value={controlsStore.zoom}
              onChange$={(e) => {
                updateControls('zoom', e.target.valueAsNumber);
                document.documentElement.style.fontSize = `${zoomValues[
                  e.target.valueAsNumber
                ].toString()}em`;
              }}
            />
          </div>
          <div class='controls__option'>
            <div class='controls__label'>
              <Ratio />
              Ratio
            </div>

            <input
              type='range'
              min={100}
              max={200}
              step={25}
              value={controlsStore.factor}
              onChange$={(e) => {
                updateControls('factor', e.target.valueAsNumber);
                document.documentElement.setAttribute(
                  'data-factor',
                  e.target.value,
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
                  updateControls('mode', v);
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
                  updateControls('mode', v);
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
                  updateControls('mode', v);
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
                  updateControls('mode', v);
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
                  updateControls('width', v);
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
                  updateControls('width', v);
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
                  updateControls('width', v);
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
                  updateControls('width', v);
                  document.documentElement.setAttribute('data-width', v);
                }}
              >
                Widest
              </a>
            </div>
          </div>

          <hr />

          <div
            class='controls__option clickable'
            onClick$={() => {
              updateControls(
                'centered',
                isNaN(controlsStore.centered) ? 0 : 1 - controlsStore.centered,
              );
              document.documentElement.setAttribute(
                'data-centered',
                controlsStore.centered.toString(),
              );
            }}
          >
            <div class='controls__label'>
              <Centered />
              Centered
            </div>
            <Switch toggled={!!controlsStore.centered} />
          </div>
          <div
            class='controls__option clickable'
            onClick$={() => {
              updateControls(
                'larivar',
                isNaN(controlsStore.larivar) ? 0 : 1 - controlsStore.larivar,
              );
              document.documentElement.setAttribute(
                'data-larivar',
                String(controlsStore.larivar),
              );
            }}
          >
            <div class='controls__label'>
              <Continuous />
              Continuous
            </div>
            <Switch toggled={!!controlsStore.larivar} />
          </div>
          <div
            class={`controls__option clickable ${
              !!controlsStore.larivar && 'disabled'
            }`}
            onClick$={() => {
              if (controlsStore.larivar) {
                return;
              }
              updateControls(
                'vishraman',
                isNaN(controlsStore.vishraman)
                  ? 0
                  : 1 - controlsStore.vishraman,
              );
              document.documentElement.setAttribute(
                'data-vishraman',
                String(controlsStore.vishraman),
              );
            }}
          >
            <div class='controls__label'>
              <Pause />
              Pauses
            </div>
            <Switch
              disabled={!!controlsStore.larivar}
              toggled={!!controlsStore.vishraman}
            />
          </div>
          <div
            class='controls__option clickable'
            onClick$={() => {
              updateControls(
                'pronunciationField',
                isNaN(controlsStore.pronunciationField)
                  ? 0
                  : 1 - controlsStore.pronunciationField,
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
              updateControls(
                'translationField',
                isNaN(controlsStore.translationField)
                  ? 0
                  : 1 - controlsStore.translationField,
              );
            }}
          >
            <div class='controls__label'>
              <Translation />
              Translations
            </div>
            <Switch toggled={!!controlsStore.translationField} />
          </div>
          <div
            class='controls__option clickable'
            onClick$={() => {
              updateControls(
                'viakhiaField',
                isNaN(controlsStore.viakhiaField)
                  ? 0
                  : 1 - controlsStore.viakhiaField,
              );
            }}
          >
            <div class='controls__label'>
              <Translation />
              ਵਿਆਖਿਆ
            </div>
            <Switch toggled={!!controlsStore.viakhiaField} />
          </div>

          <hr />

          <div
            class='controls__option clickable'
            onClick$={() => {
              updateControls(
                'notes',
                isNaN(controlsStore.notes) ? 0 : 1 - controlsStore.notes,
              );
            }}
          >
            <div class='controls__label'>
              <Notes />
              Notes
            </div>
            <Switch toggled={!!controlsStore.notes} />
          </div>
          <div>
            <div class='controls__label'>
              <Slideshow />
              Slideshow
            </div>
            <div class='controls__grid'>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'blank' &&
                  uiStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'blank';

                  if (controlsStore.slideshowType == v && uiStore.slideshow) {
                    // untoggle
                    uiStore.slideshow = false;
                  } else {
                    updateControls('slideshowType', v);
                    uiStore.slideshow = true;
                  }
                }}
              >
                Blank
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'waheguru' &&
                  uiStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'waheguru';

                  if (controlsStore.slideshowType == v && uiStore.slideshow) {
                    // untoggle
                    uiStore.slideshow = false;
                  } else {
                    updateControls('slideshowType', v);
                    uiStore.slideshow = true;
                  }
                }}
              >
                Waheguru
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'wjkk' &&
                  uiStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'wjkk';

                  if (controlsStore.slideshowType == v && uiStore.slideshow) {
                    // untoggle
                    uiStore.slideshow = false;
                  } else {
                    updateControls('slideshowType', v);
                    uiStore.slideshow = true;
                  }
                }}
              >
                Wjkk Wjkf
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'mulmantar' &&
                  uiStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'mulmantar';

                  if (controlsStore.slideshowType == v && uiStore.slideshow) {
                    // untoggle
                    uiStore.slideshow = false;
                  } else {
                    updateControls('slideshowType', v);
                    uiStore.slideshow = true;
                  }
                }}
              >
                Mul Mantar
              </a>
              <a
                class={`controls__card ${
                  controlsStore.slideshowType == 'bsnssa' &&
                  uiStore.slideshow &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'bsnssa';

                  if (controlsStore.slideshowType == v && uiStore.slideshow) {
                    // untoggle
                    uiStore.slideshow = false;
                  } else {
                    updateControls('slideshowType', v);
                    uiStore.slideshow = true;
                  }
                }}
              >
                Bole So Nihal
              </a>
            </div>
          </div>

          <hr />

          <div>
            <div class='controls__label'>
              <Appearance />
              Appearance
            </div>
            <div class='controls__grid'>
              <a
                class={`controls__card ${
                  controlsStore.appearance == 'light' &&
                  'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'light';
                  updateControls('appearance', v);
                  document.documentElement.setAttribute('data-appearance', v);
                }}
              >
                Light
              </a>
              <a
                class={`controls__card ${
                  controlsStore.appearance == 'dark' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'dark';
                  updateControls('appearance', v);
                  document.documentElement.setAttribute('data-appearance', v);
                }}
              >
                Dark
              </a>
              <a
                class={`controls__card ${
                  controlsStore.appearance == 'auto' && 'controls__card__active'
                }`}
                href='#'
                preventdefault:click
                onClick$={() => {
                  const v = 'auto';
                  updateControls('appearance', v);
                  document.documentElement.setAttribute('data-appearance', v);
                }}
              >
                Auto
              </a>
            </div>
          </div>

          <hr />

          <div>
            <div class='controls__label'>
              <ExternalLink />
              Links
            </div>
            <div class='controls__grid'>
              <a
                class='controls__card controls__card__icon'
                href='https://www.instagram.com/shabad_os/'
                target='_blank'
              >
                <Instagram />
              </a>
              <a
                class='controls__card controls__card__icon'
                href='https://www.youtube.com/@shabados'
                target='_blank'
              >
                <Youtube />
              </a>
              <a
                class='controls__card controls__card__icon'
                href='https://chat.shabados.com'
                target='_blank'
              >
                <Slack />
              </a>
              <a
                class='controls__card controls__card__icon'
                href='https://www.github.com/shabados/'
                target='_blank'
              >
                <Github />
              </a>
            </div>
          </div>
          <a
            href={`mailto:team@shabados.com?body=${encodeURIComponent(
              'Code for developers (please keep in email): ' +
                btoa(
                  [
                    'TZ: ' + Intl.DateTimeFormat().resolvedOptions().timeZone ||
                      '',
                    'Platform: ' +
                      (('userAgentData' in navigator &&
                        (navigator as any).userAgentData.platform) ||
                        ''),
                    'Brands: ' +
                      ('brands' in navigator &&
                        (navigator as any).userAgentData.brands.reduce(
                          (a: string, c: any) =>
                            a + c.brand + ' ' + c.version + ', ',
                          '',
                        )),
                    'mobile' in navigator &&
                    (navigator as any).userAgentData.mobile
                      ? 'Mobile: true'
                      : 'Mobile: false',
                    'URL: ' + window.location.href || '',
                    'UA: ' + window.navigator.userAgent || '',
                  ].join('\n'),
                ),
            )}`}
            class='controls__option clickable'
          >
            <div class='controls__label'>
              <Feedback />
              Feedback
            </div>
            <span class='controls__icon'>
              <Mail />
            </span>
          </a>
        </article>
      </div>
    </>
  );
});
