import { component$, Slot } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div>
      <article>
        <Slot />
      </article>
    </div>
  )
})

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Shabad OS Blog`,
  }
}
