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
import requestWakeLock from '~/lib/wakelock'

export type Interface = {
  zoom: number
  mode: string
  notes: number
  notesContent: string
}

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
  const interfaceStore = useStore({
    zoom: 1,
    mode: 'classic',
    notes: 0,
    notesContent: '',
  })
  useContextProvider(InterfaceContext, interfaceStore)
  useVisibleTask$(() => {
    interfaceStore.zoom = parseFloat(getLocalStorage('interfaceZoom') ?? '1')
    interfaceStore.mode = getLocalStorage('interfaceMode') ?? 'classic'
    interfaceStore.notes = parseInt(getLocalStorage('interfaceNotes') ?? '0')
    interfaceStore.notesContent = getLocalStorage('interfaceNotesContent') ?? ''
    requestWakeLock()
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
          {!!interfaceStore.notes && (
            <textarea
              class='notes-pane'
              style={{ fontSize: `${interfaceStore.zoom * 1.2}em` }}
              maxLength={100}
              value={interfaceStore.notesContent}
              onChange$={(e) => {
                interfaceStore.notesContent = e.target.value
                setLocalStorage('interfaceNotesContent', e.target.value)
              }}
            />
          )}
        </div>
      </main>
    </>
  )
})
