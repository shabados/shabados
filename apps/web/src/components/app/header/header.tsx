import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import Lotus from '../../icons/lotus';
import styles from './header.css?inline';
import Controls from '../controls/controls';
import ControlsIcon from '../../icons/ui/controls';

export default component$(() => {
  useStylesScoped$(styles);
  const controlsToggled = useSignal(false);
  const scrollPos = useStore({ is: 0, was: 0, further: false });

  return (
    <div
      window:onScroll$={() => {
        scrollPos.is = window.scrollY;
        scrollPos.further = scrollPos.is > scrollPos.was;
        scrollPos.was = scrollPos.is;
      }}
      class={`header__container ${scrollPos.further ? 'hide' : ''} ${
        scrollPos.is > 22.5 && 'border'
      }
      }`}
    >
      {controlsToggled.value && (
        <>
          <Controls toggled={controlsToggled} />
        </>
      )}
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
                  (controlsToggled.value = !controlsToggled.value)
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
