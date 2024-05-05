import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import Lotus from '../../icons/lotus';
import styles from './header.css?inline';
import Controls from '../controls/controls';
import ControlsIcon from '../../icons/ui/controls';

export default component$(() => {
  useStylesScoped$(styles);
  const controlsToggled = useSignal(false);

  return (
    <>
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
    </>
  );
});
