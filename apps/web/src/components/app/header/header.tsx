import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import Lotus from '../../icons/lotus'
import styles from '../../header/header.css?inline'
import moreStyles from './header.css?inline'
import Interface from '../interface/interface'

export default component$(() => {
  useStylesScoped$(styles)
  useStylesScoped$(moreStyles)
  const interfaceToggled = useSignal(false)

  return (
    <>
      {interfaceToggled.value && (
        <>
          <div
            class='modal-bg'
            onClick$={() => (interfaceToggled.value = false)}
          />
          <Interface />
        </>
      )}
      <header>
        <div>
          <a href='/' class='logo' draggable={false}>
            <div class='lotus'>
              <Lotus />
            </div>
            <span>Shabad OS</span>
          </a>
          <ul>
            <li>
              <a href='/app' draggable={false}>
                ⋈<span class='label'>App</span>
              </a>
            </li>
            <li>
              <a href='/articles' draggable={false}>
                ☐<span class='label'>Articles</span>
              </a>
            </li>
            <li>
              <a
                href='#'
                preventdefault:click
                draggable={false}
                onClick$={() =>
                  (interfaceToggled.value = !interfaceToggled.value)
                }
              >
                ≡<span class='label'>Interface</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
})
