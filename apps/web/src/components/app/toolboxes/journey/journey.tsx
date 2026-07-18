import {
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import ModalBg from '~/components/app/toolboxes-modal/modal-bg/modal-bg';
import Modal from '~/components/app/toolboxes-modal/modal/modal';
import { getUserData } from '~/lib/localStorage';
import { UiContext, UserDataContext } from '~/routes/(app)/layout';
import styles from './journey.css?inline';

// Helper function to get category key from timestamp
const getCategoryFromTimestamp = (timestamp: number, now: Date) => {
  const itemDate = new Date(timestamp);
  const today = new Date(now);

  // Reset time to start of day for comparison
  const resetTime = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const itemDateStart = resetTime(itemDate);
  const todayStart = resetTime(today);

  // Calculate days difference
  const daysDiff = Math.floor(
    (todayStart.getTime() - itemDateStart.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysDiff === 0) {
    return 'today';
  } else if (daysDiff === 1) {
    return 'yesterday';
  } else if (daysDiff >= 2 && daysDiff <= 6) {
    // Return the day name for previous 5 days
    return itemDate.toLocaleDateString([], { weekday: 'long' }).toLowerCase();
  } else {
    // Return short date format for older items
    return itemDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

// Helper function to get display label for category
const getCategoryLabel = (category: string) => {
  if (category === 'today') return 'Today';
  if (category === 'yesterday') return 'Yesterday';
  // If it's a day name, capitalize it
  if (
    [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ].includes(category)
  ) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  // If it's a date, return as is
  return category;
};

// Helper function to format time - always show just the clock
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { timeStyle: 'short' });
};

export default component$(() => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);
  const userDataStore = useContext(UserDataContext);
  const { url } = useLocation();

  useVisibleTask$(() => {
    userDataStore.history = getUserData('history') ?? {};
  });

  const sortedHistory = Object.entries(userDataStore.history)
    .sort(([, a], [, b]) => (a['time'] as number) - (b['time'] as number))
    .reverse();

  // Categorize history items
  const now = new Date();
  const categorizedHistory = new Map<string, Array<[string, any]>>();

  sortedHistory.forEach((item) => {
    const category = getCategoryFromTimestamp(Number(item[1]['time']), now);
    if (!categorizedHistory.has(category)) {
      categorizedHistory.set(category, []);
    }
    categorizedHistory.get(category)!.push(item);
  });

  return (
    <>
      <ModalBg store={uiStore} s={'journey'} />
      <Modal position='left'>
        <article class='modal__article journey__items'>
          {Array.from(categorizedHistory.entries()).map(([category, items]) => {
            if (items.length === 0) return null;

            return (
              <>
                <p class='journey__category__title small'>
                  {getCategoryLabel(category)}
                </p>
                {items.map(([a, b]) => (
                  <a
                    href={url.pathname != a ? a : undefined}
                    key={a}
                    aria-disabled={url.pathname == a}
                    class={`journey__items__item ${
                      url.pathname == a && `disabled`
                    }`}
                  >
                    <span class='journey__items__item__title'>{b.title}</span>
                    <p class='small'>{formatTime(Number(b['time']))}</p>
                  </a>
                ))}
              </>
            );
          })}
        </article>
      </Modal>
    </>
  );
});
