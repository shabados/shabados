import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import Lotus from '../../icons/lotus'
import styles from '../../header/header.css?inline'
import moreStyles from './header.css?inline'
import Interface from '../interface/interface'

interface HeaderProps {
  mode?: string
  fontSize?: number
}

export default component$(({ mode = '', fontSize = 1 }: HeaderProps) => {
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
          <Interface
            toggled={interfaceToggled}
            mode={mode}
            fontSize={fontSize}
          />
        </>
      )}
      <header>
        <div class={mode} style={{ fontSize: `${fontSize}em` }}>
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
