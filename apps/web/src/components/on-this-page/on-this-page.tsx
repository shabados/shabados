import { useContent } from '@builder.io/qwik-city'
import { component$, useStyles$ } from '@builder.io/qwik'
import styles from './on-this-page.css?inline'
import EditThisPage from '../edit-this-page/edit-this-page'

export default component$(() => {
  useStyles$(styles)

  const { headings } = useContent()
  const contentHeadings =
    headings?.filter((h) => h.level === 2 || h.level === 3) || []

  return (
    <aside class='on-this-page'>
      {contentHeadings.length > 0 ? (
        <>
          <h6>On This Page</h6>
          {contentHeadings.map((h) => (
            <a
              href={`#${h.id}`}
              class={{
                block: true,
                indent: h.level > 2,
              }}
            >
              {h.text}
            </a>
          ))}
        </>
      ) : null}

      <h6>More</h6>
      <EditThisPage phrase='Edit this page' />
      <a href='https://chat.shabados.com' target='_blank'>
        Join our community
      </a>
    </aside>
  )
})
