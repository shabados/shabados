import {
  $,
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import Appearance from '~/components/icons/ui/appearance';
import Centered from '~/components/icons/ui/centered';
import Continuous from '~/components/icons/ui/continuous';
import ExternalLink from '~/components/icons/ui/external-link';
import Feedback from '~/components/icons/ui/feedback';
import Github from '~/components/icons/ui/github';
import Instagram from '~/components/icons/ui/instagram';
import Mail from '~/components/icons/ui/mail';
import Maximize from '~/components/icons/ui/maximize';
import Minimize from '~/components/icons/ui/minimize';
import Mode from '~/components/icons/ui/mode';
import Notes from '~/components/icons/ui/notes';
import Pause from '~/components/icons/ui/pause';
import Pronunciation from '~/components/icons/ui/pronunciation';
import Ratio from '~/components/icons/ui/ratio';
import Slack from '~/components/icons/ui/slack';
import Slideshow from '~/components/icons/ui/slideshow';
import Translation from '~/components/icons/ui/translation';
import Width from '~/components/icons/ui/width';
import Youtube from '~/components/icons/ui/youtube';
import Zoom from '~/components/icons/ui/zoom';
import Switch from '~/components/switch/switch';
import { setLocalStorage } from '~/lib/localStorage';
import zoomValues from '~/lib/zoomValues';
import {
  type Controls,
  ControlsContext,
  UiContext,
} from '~/routes/(app)/layout';
import ModalBg from '../../toolboxes-modal/modal-bg/modal-bg';
import Modal from '../../toolboxes-modal/modal/modal';
import styles from './controls.css?inline';
import About from '~/components/icons/footer/about';
import Blog from '~/components/icons/footer/blog';
import Support from '~/components/icons/footer/support';
import Docs from '~/components/icons/footer/docs';
import Privacy from '~/components/icons/footer/privacy';
import Donate from '~/components/icons/footer/donate';

// Utility function to update theme color meta tags
const setThemeColor = (light: string, dark: string) => {
  const lightMeta = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  );
  if (lightMeta) lightMeta.setAttribute('content', light);
  const darkMeta = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  );
  if (darkMeta) darkMeta.setAttribute('content', dark);
};

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
      <ModalBg store={uiStore} s={'controls'} />
      <Modal position='right'>
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
                const target = e.target as HTMLInputElement;
                updateControls('zoom', target?.valueAsNumber);
                document.documentElement.style.fontSize = `${zoomValues[
                  target.valueAsNumber
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
                const target = e.target as HTMLInputElement;
                updateControls('factor', target.valueAsNumber);
                document.documentElement.setAttribute(
                  'data-factor',
                  target.value,
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

          <div
            class={`controls__option clickable ${
              controlsStore.mode === 'presenter' && 'disabled'
            }`}
            onClick$={() => {
              if (controlsStore.mode === 'presenter') return;
              const v = (controlsStore.fullWidth + 1) % 2;
              document.documentElement.setAttribute(
                'data-fullWidth',
                v.toString(),
              );
              updateControls('fullWidth', v);
            }}
          >
            <div class='controls__label'>
              <Width />
              Full Width
            </div>
            <Switch
              disabled={controlsStore.mode === 'presenter'}
              toggled={
                !!controlsStore.fullWidth || controlsStore.mode === 'presenter'
              }
            />
          </div>

          <hr />

          <div
            class='controls__option clickable'
            onClick$={() => {
              const v = (controlsStore.centered + 1) % 2;
              document.documentElement.setAttribute(
                'data-centered',
                v.toString(),
              );
              updateControls('centered', v);
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
              const v = (controlsStore.larivar + 1) % 2;
              document.documentElement.setAttribute(
                'data-larivar',
                v.toString(),
              );
              updateControls('larivar', v);
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
              if (controlsStore.larivar) return;
              const v = (controlsStore.vishraman + 1) % 2;
              document.documentElement.setAttribute(
                'data-vishraman',
                v.toString(),
              );
              updateControls('vishraman', v);
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
                (controlsStore.pronunciationField + 1) % 2,
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
                (controlsStore.translationField + 1) % 2,
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
                (controlsStore.viakhiaField + 1) % 2,
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
              updateControls('notes', 1 - controlsStore.notes);
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
                Fateh
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
                  const themeColor = '#f5f3f0';
                  setThemeColor(themeColor, themeColor);
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
                  const themeColor = '#000000';
                  setThemeColor(themeColor, themeColor);
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
                  setThemeColor('#f5f3f0', '#000000');
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
              <a class='controls__card controls__card__icon' href='/about'>
                <About />
                About
              </a>
              <a class='controls__card controls__card__icon' href='/blog'>
                <Blog />
                Blog
              </a>
              <a class='controls__card controls__card__icon' href='/support'>
                <Support />
                Support
              </a>
              <a class='controls__card controls__card__icon' href='/docs'>
                <Docs />
                Docs
              </a>
              <a class='controls__card controls__card__icon' href='/privacy'>
                <Privacy />
                Privacy
              </a>
              <a class='controls__card controls__card__icon' href='/donate'>
                <Donate />
                Donate
              </a>
            </div>
          </div>
          <div class='controls__label'>
            <ExternalLink />
            Social Media
          </div>
          <div class='controls__grid'>
            <a
              class='controls__card controls__card__icon'
              href='https://www.instagram.com/shabad_os/'
              target='_blank'
            >
              <Instagram />
              Instagram
            </a>
            <a
              class='controls__card controls__card__icon'
              href='https://www.youtube.com/@shabados'
              target='_blank'
            >
              <Youtube />
              YouTube
            </a>
          </div>
          <div>
            <div class='controls__label'>
              <Feedback />
              Feedback
            </div>
            <div class='controls__grid'>
              <a
                class='controls__card controls__card__icon'
                href={`mailto:team@shabados.com?body=${encodeURIComponent(
                  'Code for developers (please keep in email): ' +
                    btoa(
                      [
                        'TZ: ' +
                          Intl.DateTimeFormat().resolvedOptions().timeZone ||
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
                target='_blank'
              >
                <Mail /> Email
              </a>
              <a
                class='controls__card controls__card__icon'
                href='https://chat.shabados.com'
                target='_blank'
              >
                <Slack /> Slack
              </a>
              <a
                class='controls__card controls__card__icon'
                href='https://www.github.com/shabados/'
                target='_blank'
              >
                <Github /> GitHub
              </a>
            </div>
          </div>
        </article>
      </Modal>
    </>
  );
});
