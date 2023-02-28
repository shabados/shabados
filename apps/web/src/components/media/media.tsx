import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './media.css?inline'

interface MediaProps {
  src: string
  alt: string
  link?: boolean
  padded?: boolean
}

export default component$(({ src, alt, link, padded }: MediaProps) => {
  useStylesScoped$(styles)

  return (
    <>
      {link ? (
        <a class='media-link button' href={src} target='_blank'>
          <img class={`media ${padded ? 'list' : ''}`} alt={alt} src={src} />
        </a>
      ) : (
        <img class={`media ${padded ? 'list' : ''}`} alt={alt} src={src} />
      )}
      <div class='media-caption'>
        <Slot />
      </div>
    </>
  )
})
