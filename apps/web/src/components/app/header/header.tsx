import {
  component$,
  useContext,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import Lotus from '../../icons/lotus';
import styles from './header.css?inline';
import { UiContext } from '~/routes/(app)/layout';
import ControlsIcon from '~/components/icons/ui/controls';
import JourneyIcon from '~/components/icons/ui/journey';

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
      } ${scrollPos.is > 22.5 && 'scrolled'}
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
