import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik'
import Header from '~/components/app/header/header'
import styles from './app.css?inline'

export type Interface = { zoom: number; mode: string }

export const InterfaceContext = createContextId<Interface>(
  'com.shabados.app.interface-context'
)

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
}

export default component$(() => {
  const interfaceStore = useStore({ zoom: 1, mode: 'classic' })
  useContextProvider(InterfaceContext, interfaceStore)
  useVisibleTask$(() => {
    interfaceStore.zoom = parseFloat(getLocalStorage('interfaceZoom') ?? '1')
    interfaceStore.mode = getLocalStorage('interfaceMode') ?? 'classic'
  })
  useStyles$(styles)
  return (
    <>
      <Header />
      <main>
        <div>
          <article
            class={interfaceStore.mode}
            style={{ fontSize: `${interfaceStore.zoom}em` }}
          >
            <Slot />
          </article>
        </div>
      </main>
    </>
  )
})
