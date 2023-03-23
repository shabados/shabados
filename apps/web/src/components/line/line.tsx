import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './line.css?inline'

export default component$(({ id, src, pronunciation, translation }: any) => {
  useStylesScoped$(styles)
  return (
    <div key={id} class='line'>
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
