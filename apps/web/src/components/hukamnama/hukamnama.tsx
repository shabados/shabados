import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './hukamnama.css?inline';
import isTitle, { isEndOfPauri } from '~/lib/isTitle';

export default component$(({ data }: any) => {
  useStylesScoped$(styles);

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
        const src = Array.isArray(line[0].src) ? line[0].src : [line[0].src];
        return (
          <div key={index} class={`line ${line[0].title ? 'first' : ''}`}>
            <p class={`bold ${line[0].title ? 'title' : ''}`}>
              {src
                .join(' ')
                .split(' ')
                .map((word: string, index: number) => {
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
                      {className === '' ? (
                        wordContent
                      ) : (
                        <span class={className}>{wordContent}</span>
                      )}
                    </>
                  );
                })}
            </p>
            <p class='panjabi'>
              {line[0].Guru} <span class='notes'>{line[0].notes}</span>
            </p>
            <p class='english'>{line[0].en}</p>
          </div>
        );
      })}
    </>
  );
});
