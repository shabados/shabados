import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './line.css?inline'

export default component$(({ id, src, pronunciation, translation }: any) => {
  useStylesScoped$(styles)
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
  ]
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
  ]
  const isTitle =
    titlesFuzzy.some((ele) => src.indexOf(ele) >= 0) ||
    titlesExact.some((ele) => ele == src)
  const isEndOfPauri =
    /॥[੧੨੩੪੫੬੭੮੯੦]+॥/.test(src) || src.indexOf('ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।') >= 0
  return (
    <div
      key={id}
      class={`line ${isTitle ? 'title' : ''}${
        isEndOfPauri ? 'end-of-pauri' : ''
      }`}
    >
      <p class='bold'>
        {src.split(' ').map((word: string, index: number) => {
          const betweenWords = index == 0 ? '' : ' '
          if (word.endsWith(';')) {
            return (
              <>
                {betweenWords}
                <span class='heavy'>{word.slice(0, -1)}</span>
              </>
            )
          } else if (word.endsWith(',')) {
            return (
              <>
                {betweenWords}
                <span class='medium'>{word.slice(0, -1)}</span>
              </>
            )
          } else if (word.endsWith('.')) {
            return (
              <>
                {betweenWords}
                <span class='light'>{word.slice(0, -1)}</span>
              </>
            )
          }
          return (
            <>
              {betweenWords}
              {word}
            </>
          )
        })}
      </p>
      <p>
        {pronunciation.split(' ').map((word: string) => {
          if (word.endsWith(';')) {
            return (
              <>
                <span class='heavy'>{word.slice(0, -1)}</span>{' '}
              </>
            )
          } else if (word.endsWith(',')) {
            return (
              <>
                <span class='medium'>{word.slice(0, -1)}</span>{' '}
              </>
            )
          } else if (word.endsWith('.')) {
            return (
              <>
                <span class='light'>{word.slice(0, -1)}</span>{' '}
              </>
            )
          }
          return <>{word} </>
        })}
      </p>
      <p>{translation}</p>
    </div>
  )
})
