import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { ControlsContext, UiContext } from '~/routes/(app)/layout';
import styles from './line.css?inline';
import isTitle, { isEndOfPauri } from '~/lib/isTitle';

export default component$(
  ({ id = '', src, pronunciation, en, pa, paNotes }: any) => {
    useStylesScoped$(styles);
    const controlsStore = useContext(ControlsContext);
    const uiStore = useContext(UiContext);

    // until api is updated to new sant lipi markup, need to make local fixes
    const replaces: any = {
      '꠳ਯ': '︀ਯ',
      '꠴ਯ': '︂ਯ',
      '꠵ਯ': '︁︂ਯ',
      'ਁ': 'ਂ︀',
    };
    const newSrc = Object.keys(replaces).reduce(
      (updatedSrc, key) => updatedSrc.replaceAll(key, replaces[key]),
      src,
    );

    return (
      <div
        class={`line ${isTitle(newSrc) ? 'title' : ''}${
          isEndOfPauri(newSrc) ? 'end-of-pauri' : ''
        }`}
        onClick$={() => {
          uiStore.inspectorId = id;
          uiStore.inspector = true;
        }}
      >
        <p class='bold'>
          {newSrc.split(' ').map((word: string, index: number) => {
            const betweenWords = index == 0 ? '' : ' ';
            if (word.endsWith(';')) {
              return (
                <>
                  {betweenWords}
                  <span class='heavy'>{word.slice(0, -1)}</span>
                </>
              );
            } else if (word.endsWith(',')) {
              return (
                <>
                  {betweenWords}
                  <span class='medium'>{word.slice(0, -1)}</span>
                </>
              );
            } else if (word.endsWith('.')) {
              return (
                <>
                  {betweenWords}
                  <span class='light'>{word.slice(0, -1)}</span>
                </>
              );
            }
            return (
              <>
                {betweenWords}
                {word}
              </>
            );
          })}
        </p>
        {controlsStore.pronunciationField && pronunciation ? (
          <p>
            {pronunciation.split(' ').map((word: string) => {
              if (word.endsWith(';')) {
                return (
                  <>
                    <span class='heavy'>{word.slice(0, -1)}</span>{' '}
                  </>
                );
              } else if (word.endsWith(',')) {
                return (
                  <>
                    <span class='medium'>{word.slice(0, -1)}</span>{' '}
                  </>
                );
              } else if (word.endsWith('.')) {
                return (
                  <>
                    <span class='light'>{word.slice(0, -1)}</span>{' '}
                  </>
                );
              }
              return <>{word} </>;
            })}
          </p>
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
