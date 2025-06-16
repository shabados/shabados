import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import Lotus from '../../icons/lotus';
import styles from './header.css?inline';
import { UiContext } from '~/routes/(app)/layout';
import ControlsIcon from '~/components/icons/ui/controls';
import JourneyIcon from '~/components/icons/ui/journey';

export default component$(() => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);

  return (
    <div
      class={`header__container ${uiStore.scrollForward && 'hide'} ${
        uiStore.scrollFar && 'scrolled'
      }
      }`}
    >
      <header>
        <div>
          <a href='/' class='logo' draggable={false}>
            <div class='lotus'>
              <Lotus />
            </div>
            <span>Shabad OS</span>
          </a>
          <nav>
            <a
              href='#'
              preventdefault:click
              draggable={false}
              onClick$={() => (uiStore.journey = !uiStore.journey)}
            >
              <JourneyIcon />
            </a>
            <a
              href='#'
              preventdefault:click
              draggable={false}
              onClick$={() => (uiStore.controls = !uiStore.controls)}
            >
              <ControlsIcon />
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
});
