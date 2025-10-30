import {
  $,
  component$,
  sync$,
  useComputed$,
  useContext,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import ButtonArea from '~/components/button-area/button-area';
import Bookmark from '~/components/icons/ui/bookmark';
import ControlsIcon from '~/components/icons/ui/controls';
import JourneyIcon from '~/components/icons/ui/journey';
import Search from '~/components/icons/ui/search';
import XBig from '~/components/icons/ui/x-big';
import toggleToolbox, { type ToolboxKey } from '~/lib/toggleToolbox';
import { UiContext } from '~/routes/(app)/layout';
import styles from './toolbox.css?inline';

interface Props {
  // title: string;
  active?: boolean;
}

export default component$<Props>(({ active = false }) => {
  useStylesScoped$(styles);

  const uiStore = useContext(UiContext);
  const searchInput = useComputed$(() => uiStore.search);
  const searchRef = useSignal<HTMLInputElement>();
  const searchToolbarRef = useSignal<HTMLDivElement>();
  const defaultToolbarRef = useSignal<HTMLDivElement>();

  useVisibleTask$(({ track }) => {
    track(searchInput);
    if (searchInput) {
      searchRef.value?.focus();
      searchRef.value?.select();
    }
  });

  return (
    <>
      <div
        ref={searchToolbarRef}
        class={`toolbar search-toolbar ${uiStore.search ? 'show' : 'hide'}`}
      >
        <form preventdefault:submit>
          <input
            class='search'
            type='search'
            name='search'
            placeholder='Search'
            value={uiStore.searchQuery}
            maxLength={4}
            minLength={1}
            spellcheck={false}
            ref={searchRef}
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
            autoFocus={true}
            tabIndex={0}
            onInput$={(_, el) => {
              uiStore.searchQuery = el.value;
            }}
          />
        </form>
        <ButtonArea>
          <button
            onClick$={(_, el) => {
              el.blur();
              toggleToolbox(uiStore, 'search' as ToolboxKey);
            }}
          >
            <XBig />
          </button>
        </ButtonArea>
      </div>
      <div
        ref={defaultToolbarRef}
        class={`toolbar ${active ? 'active' : 'inactive'} ${
          uiStore.search ? 'hide' : 'show'
        }`}
      >
        {/* <ButtonArea main={true} titleOnly={titleOnly}>
          <span class='title'>{title}</span>
        </ButtonArea> */}

        <ButtonArea>
          <button
            onClick$={(_, el) => {
              el.blur();
              toggleToolbox(uiStore, 'journey' as ToolboxKey);
            }}
          >
            <span class='hint'>
              Journey<span class='hotkey'>y</span>
            </span>
            <JourneyIcon />
          </button>
        </ButtonArea>
        <ButtonArea>
          <button
            onClick$={[
              sync$((_: any, el: any) => {
                el.blur();
                const position = window.scrollY;
                const searchToolbar = document.querySelector('.search-toolbar');
                const defaultToolbar = document.querySelector(
                  '.toolbar:not(.search-toolbar)',
                );

                if (searchToolbar && defaultToolbar) {
                  searchToolbar.classList.remove('hide');
                  searchToolbar.classList.add('show');
                  defaultToolbar.classList.remove('show');
                  defaultToolbar.classList.add('hide');
                }

                const searchInput = searchToolbar?.querySelector(
                  'input[type="search"]',
                );
                if (searchInput instanceof HTMLInputElement) {
                  searchInput.focus();
                  searchInput.select();
                }
                setTimeout(() => {
                  window.scrollTo(0, position);
                }, 120);
              }),
              $(() => {
                uiStore.search = true;
              }),
            ]}
          >
            <span class='hint'>
              Search<span class='hotkey'>/</span>
            </span>
            <Search />
          </button>
          <button
            onClick$={(_, el) => {
              el.blur();
              toggleToolbox(uiStore, 'collections' as ToolboxKey);
            }}
          >
            <span class='hint'>
              Collections<span class='hotkey'>b</span>
            </span>
            <Bookmark />
          </button>
        </ButtonArea>

        <ButtonArea>
          <button
            onClick$={(_, el) => {
              el.blur();
              toggleToolbox(uiStore, 'controls' as ToolboxKey);
            }}
          >
            <span class='hint'>
              Controls<span class='hotkey'>,</span>
            </span>
            <ControlsIcon />
          </button>
        </ButtonArea>
      </div>
    </>
  );
});
