import {
  component$,
  useContext,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import Lotus from '../../icons/lotus';
import styles from './header.css?inline';
import ControlsIcon from '../../icons/ui/controls';
import { UiContext } from '~/routes/layout-app';

export default component$(() => {
  useStylesScoped$(styles);
  const scrollPos = useStore({ is: 0, was: 0, further: false });
  const uiStore = useContext(UiContext);

  return (
    <div
      window:onScroll$={() => {
        scrollPos.is = window.scrollY;
        scrollPos.further = scrollPos.is > scrollPos.was;
        scrollPos.was = scrollPos.is;
      }}
      class={`header__container ${
        scrollPos.is > 1 && scrollPos.further ? 'hide' : ''
      } ${scrollPos.is > 22.5 && 'border'}
      }`}
    >
      <header>
        <div>
          <a href='/app' class='logo' draggable={false}>
            <div class='lotus'>
              <Lotus />
            </div>
            <span>Shabad OS</span>
          </a>
          <ul>
            <li>
              <a
                href='#'
                preventdefault:click
                draggable={false}
                onClick$={() =>
                  (uiStore.controlsToggled = !uiStore.controlsToggled)
                }
              >
                <ControlsIcon />
                <span class='label'>Controls</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
});
