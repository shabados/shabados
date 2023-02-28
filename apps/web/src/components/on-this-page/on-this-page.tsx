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
          <ul>
            {contentHeadings.map((h) => (
              <li>
                <a
                  href={`#${h.id}`}
                  class={{
                    block: true,
                    indent: h.level > 2,
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h6>More</h6>
      <ul>
        <li>
          <EditThisPage phrase='Edit this page' />
        </li>
        <li>
          <a href='https://chat.shabados.com' target='_blank'>
            Join our community
          </a>
        </li>
      </ul>
    </aside>
  )
})
