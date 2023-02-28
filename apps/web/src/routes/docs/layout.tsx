import { component$, Slot, useStyles$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs'
import Menu from '~/components/menu/menu'
import OnThisPage from '~/components/on-this-page/on-this-page'
import styles from './docs.css?inline'

export default component$(() => {
  useStyles$(styles)

  return (
    <>
      <Menu />
      <div class='docs'>
        <OnThisPage />
        <article class='slot'>
          <Breadcrumbs />
          <Slot />
        </article>
      </div>
    </>
  )
})

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Shabad OS Docs`,
  }
}
