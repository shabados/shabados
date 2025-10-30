import {
  component$,
  Resource,
  sync$,
  useContext,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import {
  addHistoryItem,
  addSearchQuery,
  getUserData,
} from '~/lib/localStorage';
import { UiContext } from '~/routes/(app)/layout';
import ModalBg from '../../toolboxes-modal/modal-bg/modal-bg';
import Modal from '../../toolboxes-modal/modal/modal';
import styles from './search.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);

  const searches = (getUserData('searches') as string[]) || [];
  // const searches = ['asd', 'qwe', 'zxc']; // temp for development

  const getResults = useResource$<any>(async ({ track }) => {
    track(() => uiStore.searchQuery);

    if (uiStore.searchQuery.length < 1) {
      return null;
    }

    try {
      const response = await fetch(
        `/api/search/${encodeURIComponent(uiStore.searchQuery)}`,
      );
      // const response = await fetch(''); // temp for development

      if (!response.ok) {
        console.error('Search API error:', response.statusText);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Search fetch error:', error);
      return null;
    }
  });

  // Add scroll handler
  // const handleScroll = $();

  // until api is updated to new sant lipi markup, need to make local fixes
  const replaces: any = {
    '꠳ਯ': '︀ਯ',
    '꠴ਯ': '︂ਯ',
    '꠵ਯ': '︁︂ਯ',
    'ਁ': 'ਂ︀',
  };

  return (
    <>
      <ModalBg store={uiStore} s={'search'} />
      <Modal position='center' type='search'>
        {uiStore.searchQuery.length >= 1 ? (
          <Resource
            value={getResults}
            onPending={() => (
              <article
                onScroll$={sync$(() => {
                  if (
                    typeof window.orientation !== 'undefined' ||
                    navigator.userAgent.indexOf('IEMobile') !== -1 ||
                    window.innerWidth <= 768
                  ) {
                    if (document.activeElement instanceof HTMLInputElement) {
                      document.activeElement.blur();
                    }
                  }
                })}
              >
                Searching...
              </article>
            )}
            onRejected={(error) => (
              <article
                onScroll$={sync$(() => {
                  if (
                    typeof window.orientation !== 'undefined' ||
                    navigator.userAgent.indexOf('IEMobile') !== -1 ||
                    window.innerWidth <= 768
                  ) {
                    if (document.activeElement instanceof HTMLInputElement) {
                      document.activeElement.blur();
                    }
                  }
                })}
              >
                Error: {error.message}
              </article>
            )}
            onResolved={(data) => {
              if (!data || !data.exact || !Array.isArray(data.exact)) {
                return (
                  <article
                    onScroll$={sync$(() => {
                      if (
                        typeof window.orientation !== 'undefined' ||
                        navigator.userAgent.indexOf('IEMobile') !== -1 ||
                        window.innerWidth <= 768
                      ) {
                        if (
                          document.activeElement instanceof HTMLInputElement
                        ) {
                          document.activeElement.blur();
                        }
                      }
                    })}
                  >
                    No results found
                  </article>
                );
              }

              return (
                <article
                  class='search_results'
                  onScroll$={sync$(() => {
                    if (
                      typeof window.orientation !== 'undefined' ||
                      navigator.userAgent.indexOf('IEMobile') !== -1 ||
                      window.innerWidth <= 768
                    ) {
                      const activeElement = document.activeElement;
                      if (activeElement instanceof HTMLInputElement) {
                        activeElement.blur();
                      }
                    }
                  })}
                >
                  {data.exact.map(
                    ({ container, blocks, id, source, title }: any) => {
                      const newTitle = Object.keys(replaces).reduce(
                        (updatedSrc, key) =>
                          updatedSrc.replaceAll(key, replaces[key]),
                        title,
                      );
                      return (
                        <a
                          key={id}
                          href={`/g/${container.id}`}
                          onClick$={() => {
                            addHistoryItem(`/g/${container.id}`, {
                              title: newTitle,
                            });
                            addSearchQuery(uiStore.searchQuery);
                          }}
                        >
                          {/* <p style='color: var(--fg);'>{source.name} </p> */}
                          <p class='small'>
                            {source.id}
                            {' > '}
                            {container.id}
                            {' > '}
                            {id}
                          </p>
                          <h2>{newTitle}</h2>
                          <p style='color: var(--fg);'>
                            {blocks.map(({ str, match }: any, idx: number) =>
                              match ? (
                                <b key={idx}>{str} </b>
                              ) : (
                                <span key={idx}>{str} </span>
                              ),
                            )}
                          </p>
                        </a>
                      );
                    },
                  )}
                </article>
              );
            }}
          />
        ) : (
          <article
            class='search_history'
            onClick$={sync$(() => {
              if (
                typeof window.orientation !== 'undefined' ||
                navigator.userAgent.indexOf('IEMobile') !== -1 ||
                window.innerWidth <= 768
              ) {
                const activeElement = document.activeElement;
                if (activeElement instanceof HTMLInputElement) {
                  activeElement.blur();
                }
              }
            })}
            onScroll$={sync$(() => {
              if (
                typeof window.orientation !== 'undefined' ||
                navigator.userAgent.indexOf('IEMobile') !== -1 ||
                window.innerWidth <= 768
              ) {
                const activeElement = document.activeElement;
                if (activeElement instanceof HTMLInputElement) {
                  activeElement.blur();
                }
              }
            })}
          >
            <div>
              <h3>Note</h3>
              <p>
                Searches are experimental and may not work as expected. It may
                take some time to open a search result in the main window.
              </p>
            </div>
            <div>
              <h3>Tip</h3>
              <p>
                To find "ਸਤਿਗੁਰੁ ਹੋਇ ਦਇਆਲੁ, ਨ ਕਬਹੂੰ ਝੂਰੀਐ", try searching with
                first-letter gurbani or pronunciation within the logical pause.
                For example "ਸਹਦ", "ਨਕਝ", "shd", or "nkj" will work, but "ਸਹਦਨ"
                and "shdn" will not.
              </p>
            </div>
            {searches.length > 0 && (
              <>
                <div>
                  <h3>Recent Searches</h3>
                </div>
                {searches.map((query) => (
                  <a
                    key={query}
                    href='#'
                    preventdefault:click
                    draggable={false}
                    onClick$={() => {
                      uiStore.searchQuery = query;
                    }}
                  >
                    {query}
                  </a>
                ))}
              </>
            )}
          </article>
          // })
        )}
      </Modal>
    </>
  );
});
