import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './hukamnama.css?inline';

export default component$(({ data }: any) => {
  useStylesScoped$(styles);
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
    'ਅਸਟਪਦੀ ॥',
    // add screensaver / slideshow values here
    'ਵਾਹਿਗੁਰੂ',
    'ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ; ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ',
    'ਬੋਲੇ ਸੋ ਨਿਹਾਲ; ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
  ];
  const isTitle = (string: string): boolean =>
    [...titlesFuzzy, ...titlesExact].some((ele) => string.includes(ele));

  const isEndOfPauri = (string: string): boolean =>
    /॥[੧੨੩੪੫੬੭੮੯੦]+॥/.test(string) ||
    ['ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।', '॥ ਰਹਾਉ ॥'].some((ele) => string.includes(ele));

  const remapped = data.data.default.src.map((obj: any) => {
    const src = obj.src.data;
    const title = isTitle(src);
    const endOfPauri = isEndOfPauri(src);

    const translations = ['en', 'Guru'].map((field) =>
      field in obj.translations ? obj.translations[field] : '',
    );
    const notes = 'notes' in obj ? obj.notes.Guru : '';

    return {
      src,
      en: translations[0],
      Guru: translations[1],
      notes,
      title,
      endOfPauri,
    };
  });

  const combinedRemapped = remapped.reduce((acc: any[][], item: any) => {
    const lastGroup = acc[acc.length - 1];

    if (
      lastGroup &&
      !lastGroup[lastGroup.length - 1].title &&
      !lastGroup[lastGroup.length - 1].endOfPauri
    ) {
      const updatedLastGroup = [...lastGroup, item];
      const concatenatedItem = {
        src: updatedLastGroup.flatMap((i) =>
          Array.isArray(i.src) ? i.src : [i.src],
        ),
        en: updatedLastGroup.map((i) => i.en).join(' '),
        Guru: updatedLastGroup.map((i) => i.Guru).join(' '),
        notes: updatedLastGroup.map((i) => i.notes).join(' '),
        title: updatedLastGroup.some((i) => i.title),
        endOfPauri: updatedLastGroup.some((i) => i.endOfPauri),
      };
      return [...acc.slice(0, -1), [concatenatedItem]];
    } else {
      return [...acc, [item]];
    }
  }, []);

  return (
    <>
      {combinedRemapped.map((line: any, index: number) => {
        const lines = Array.isArray(line[0].src) ? line[0].src : [line[0].src];
        return (
          <div key={index} class={`line ${line[0].title ? 'first' : ''}`}>
            <p>
              {line[0].Guru} <span class='notes'>{line[0].notes}</span>
            </p>
            <div>
              {lines.map((ln: any) => (
                <p class={`bold ${line[0].title ? 'title' : ''}`} key={1}>
                  {ln.split(' ').map((word: string, index: number) => {
                    const betweenWords = index === 0 ? '' : ' ';
                    const className = word.endsWith(';')
                      ? 'heavy'
                      : word.endsWith(',')
                      ? 'medium'
                      : word.endsWith('.')
                      ? 'light'
                      : '';
                    const wordContent = [';', ',', '.'].some((char) =>
                      word.endsWith(char),
                    )
                      ? word.slice(0, -1)
                      : word;

                    return (
                      <>
                        {betweenWords}
                        <span class={className}>{wordContent}</span>
                      </>
                    );
                  })}
                </p>
              ))}
            </div>
            <p>{line[0].en}</p>
          </div>
        );
      })}
    </>
  );
});
