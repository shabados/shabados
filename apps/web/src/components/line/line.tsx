import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { ControlsContext, UiContext } from '~/routes/(app)/layout';
import styles from './line.css?inline';
import isTitle, { isEndOfPauri } from '~/lib/isTitle';

export default component$(
  ({ id = '', src, pronunciation, translation, vicar }: any) => {
    useStylesScoped$(styles);
    const controlsStore = useContext(ControlsContext);
    const uiStore = useContext(UiContext);

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
          {src.split(' ').map((word: string, index: number) => {
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
        {(controlsStore.translationField && translation && (
          <p>{translation}</p>
        )) ||
          ''}
        {(controlsStore.vicarField && vicar && <p class='vicar'>{vicar}</p>) ||
          ''}
      </div>
    );
  },
);
