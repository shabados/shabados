import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { ControlsContext, UiContext } from '~/routes/layout-app';
import styles from './line.css?inline';

export default component$(
  ({ id = '', src, pronunciation, translation }: any) => {
    useStylesScoped$(styles);
    const controlsStore = useContext(ControlsContext);
    const uiStore = useContext(UiContext);
    const titlesFuzzy = [
      'ੴ',
      '॥ ਜਪੁ ॥',
      'ਪਾਤਿਸਾਹੀ ੧੦',
      '॥ ਤ੍ਵ ਪ੍ਰਸਾਦਿ ॥',
      '॥ ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਕਥਤੇ ॥',
      'ਭੁਜੰਗ ਪ੍ਰਯਾਤ ਛੰਦ ॥',
      '॥ ਚਾਚਰੀ ਛੰਦ ॥',
      '॥ ਸਵੱਯੇ ॥',
      '॥ ਚੌਪਈ ॥',
      'ਮਹਲਾ ੧',
      'ਮਹਲਾ ੨',
      'ਮਹਲਾ ੩',
      'ਮਹਲਾ ੪',
      'ਮਹਲਾ ੫',
      'ਮਹਲਾ ੬',
      'ਮਹਲਾ ੭',
      'ਮਹਲਾ ੮',
      'ਮਹਲਾ ੯',
      'ਮਃ ੧',
      'ਮਃ ੨',
      'ਮਃ ੩',
      'ਮਃ ੪',
      'ਮਃ ੫',
      'ਮਃ ੬',
      'ਮਃ ੭',
      'ਮਃ ੮',
      'ਮਃ ੯',
      'ਦੇਵਗੰਧਾਰੀ ੧',
      'ਦੇਵਗੰਧਾਰੀ ੨',
      'ਦੇਵਗੰਧਾਰੀ ੩',
      'ਦੇਵਗੰਧਾਰੀ ੪',
      'ਦੇਵਗੰਧਾਰੀ ੫',
      'ਦੇਵਗੰਧਾਰੀ ੬',
      'ਦੇਵਗੰਧਾਰੀ ੭',
      'ਦੇਵਗੰਧਾਰੀ ੮',
      'ਦੇਵਗੰਧਾਰੀ ੯',
    ];
    const titlesExact = [
      'ਜਾਪੁ ॥',
      'ਸਲੋਕੁ ॥',
      'ਚਾਚਰੀ ਛੰਦ ॥',
      'ਏਕ ਅਛਰੀ ਛੰਦ ॥',
      'ਸ੍ਵੈਯਾ ॥',
      'ਦੋਹਰਾ ॥',
      'ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਸਹਾਇ ॥',
      'ਵਾਰ ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਕੀ ॥',
      'ਰਹਰਾਸਿ ਸਾਹਿਬ',
      'ਪਉੜੀ।',
      'ਪਉੜੀ ।',
      'ਪਉੜੀ॥',
      'ਪਉੜੀ ॥',
      'ਆਸਾ ॥',
      // add screensaver / slideshow values here
      'ਵਾਹਿਗੁਰੂ',
      'ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ; ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ',
      'ਬੋਲੇ ਸੋ ਨਿਹਾਲ; ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
    ];
    const isTitle =
      titlesFuzzy.some((ele) => src.indexOf(ele) >= 0) ||
      titlesExact.some((ele) => ele == src);
    const isEndOfPauri =
      /॥[੧੨੩੪੫੬੭੮੯੦]+॥/.test(src) ||
      src.indexOf('ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।') >= 0 ||
      src.indexOf('॥ ਰਹਾਉ ॥') >= 0;
    return (
      <div
        class={`line ${isTitle ? 'title' : ''}${
          isEndOfPauri ? 'end-of-pauri' : ''
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
        {controlsStore.translationField && translation ? (
          <p>{translation}</p>
        ) : (
          ''
        )}
      </div>
    );
  },
);
