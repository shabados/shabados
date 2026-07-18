import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { ControlsContext, UiContext } from '~/routes/(app)/layout';
import styles from './line.css?inline';
import isTitle, { isEndOfPauri } from '~/lib/isTitle';

// until api is updated to new sant lipi markup, need to make local fixes
const REPLACES: Record<string, string> = {
  '꠳ਯ': '︀ਯ',
  '꠴ਯ': '︂ਯ',
  '꠵ਯ': '︁︂ਯ',
  'ਁ': 'ਂ︀',
};
const REPLACE_REGEX = /꠳ਯ|꠴ਯ|꠵ਯ|ਁ/g;

const toUpdatedSrc = (src: string) =>
  src.replace(REPLACE_REGEX, (m: string) => REPLACES[m]);

const weightMap: Record<string, string> = {
  ';': 'heavy',
  ',': 'medium',
  '.': 'light',
};

const toVishraamJsx = (text: string) =>
  text.split(' ').map((word: string, index: number) => {
    const spacing = index > 0 ? ' ' : '';
    const vishraamClass = weightMap[word.slice(-1)];
    if (vishraamClass) {
      return (
        <>
          {spacing}
          <span class={vishraamClass}>{word.slice(0, -1)}</span>
        </>
      );
    }
    return (
      <>
        {spacing}
        {word}
      </>
    );
  });

const toLarivaarJsx = (text: string) => text.replace(/[ ;,.]/g, '');

export default component$(
  ({ id = '', src: oldSrc, pronunciation, en, pa, paNotes }: any) => {
    useStylesScoped$(styles);
    const controlsStore = useContext(ControlsContext);
    const uiStore = useContext(UiContext);

    const src = toUpdatedSrc(oldSrc);

    if (
      controlsStore.larivar &&
      (controlsStore.mode === 'reader' || controlsStore.mode === 'saral')
    ) {
      return (
        <span class='line'>
          <span class='bold'>{toLarivaarJsx(src)}</span>
        </span>
      );
    }

    return (
      <div
        class={`line ${isTitle(src) ? 'title' : ''}${
          isEndOfPauri(src) ? 'end-of-pauri' : ''
        }`}
        onClick$={() => {
          uiStore.inspectorId = id;
          uiStore.inspector = true;
        }}
      >
        <p class='bold'>
          {controlsStore.larivar ? toLarivaarJsx(src) : toVishraamJsx(src)}
        </p>
        {controlsStore.pronunciationField && pronunciation ? (
          <p>{toVishraamJsx(pronunciation)}</p>
        ) : (
          ''
        )}
        {(controlsStore.translationField && en && <p>{en}</p>) || ''}
        {(controlsStore.viakhiaField && pa && (
          <p class='viakhia'>
            {pa}
            {paNotes && (
              <>
                {' '}
                <span class='arth'>{paNotes}</span>
              </>
            )}
          </p>
        )) ||
          ''}
      </div>
    );
  },
);
