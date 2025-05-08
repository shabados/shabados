import {
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  UiContext,
  UserDataContext,
  getLocalStorage,
} from '~/routes/(app)/layout';
import styles from './journey.css?inline';
import X from '~/components/icons/ui/x';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  useStylesScoped$(styles);
  const userDataStore = useContext(UserDataContext);
  const uiStore = useContext(UiContext);
  const { url } = useLocation();

  useVisibleTask$(() => {
    userDataStore.history = JSON.parse(
      getLocalStorage('userDataHistory') ?? '{}',
    );
  });

  const sortedHistory = Object.entries(userDataStore.history)
    .sort(([, a], [, b]) => (a['time'] as number) - (b['time'] as number))
    .reverse();

  return (
    <>
      <div class='modal-bg' onClick$={() => (uiStore.journey = false)} />
      <div class='modal'>
        <article class='modal__header'>
          <h2 class='modal__title'>Journey</h2>
          <span
            dir='rtl'
            class='modal__close'
            onClick$={() => (uiStore.journey = false)}
          >
            <X />
          </span>
        </article>
        <article class='modal__article journey__items'>
          {sortedHistory.map(([a, b]) => (
            <a
              href={url.pathname != a ? a : undefined}
              key={a}
              aria-disabled={url.pathname == a}
              class={`journey__items__item ${url.pathname == a && `disabled`}`}
            >
              <span>{b.title}</span>
              <p class='small'>
                {new Date(b['time']).toLocaleTimeString([], {
                  timeStyle: 'short',
                })}
              </p>
            </a>
          ))}
        </article>
      </div>
    </>
  );
});
