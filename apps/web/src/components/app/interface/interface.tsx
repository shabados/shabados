import {
  type Signal,
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik'
import { InterfaceContext, setLocalStorage } from '~/routes/layout-app'
import styles from './interface.css?inline'
import Switch from '~/components/switch/switch'

interface Props {
  toggled: Signal<boolean>
}

export default component$(({ toggled }: Props) => {
  useStylesScoped$(styles)
  const fullscreen = useSignal(!!document.fullscreenElement)
  const interfaceStore = useContext(InterfaceContext)

  return (
    <div class='modal'>
      <article class='modal__article'>
        <h1>
          Interface
          <span
            dir='rtl'
            class='modal__close'
            onClick$={() => (toggled.value = false)}
          >
            ╳
          </span>
        </h1>
        {document.fullscreenEnabled && (
          <div
            class='interface__option clickable'
            onClick$={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
                fullscreen.value = true
              } else if (document.exitFullscreen) {
                document.exitFullscreen()
                fullscreen.value = false
              }
            }}
          >
            Fullscreen
            <Switch toggled={fullscreen.value} />
          </div>
        )}
        <div class='interface__option'>
          Zoom
          <input
            type='range'
            min={1}
            max={4}
            step={0.25}
            value={interfaceStore.zoom}
            onChange$={(e) => {
              setLocalStorage('interfaceZoom', e.target.value)
              interfaceStore.zoom = parseFloat(
                e.target.value as unknown as string
              )
            }}
          />
        </div>
        <div class='interface__option'>
          Mode
          <select
            class='interface__select'
            value={interfaceStore.mode}
            onChange$={(e) => {
              const v = e.target.value as string
              setLocalStorage('interfaceMode', v)
              interfaceStore.mode = v
            }}
          >
            <option>classic</option>
            <option>saral</option>
            <option>reader</option>
            <option>presenter</option>
          </select>
        </div>
        <div
          class='interface__option clickable'
          onClick$={() => {
            interfaceStore.notes = isNaN(interfaceStore.notes)
              ? 0
              : 1 - interfaceStore.notes
            setLocalStorage('interfaceNotes', interfaceStore.notes.toString())
          }}
        >
          Bottom Notes
          <Switch toggled={!!interfaceStore.notes} />
        </div>
        <a href='mailto:team@shabados.com' class='interface__option clickable'>
          Send Feedback
          <span class='interface__icon'>↗</span>
        </a>
      </article>
    </div>
  )
})
