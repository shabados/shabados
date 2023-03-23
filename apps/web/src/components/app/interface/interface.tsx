import {
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik'
import { InterfaceContext, setLocalStorage } from '~/routes/layout-app'
import styles from './interface.css?inline'

export default component$(() => {
  useStylesScoped$(styles)
  const fullscreen = useSignal(!!document.fullscreenElement)
  const interfaceStore = useContext(InterfaceContext)

  return (
    <div class='modal'>
      <article class='modal__article'>
        <h1>Interface</h1>
        {document.fullscreenEnabled && (
          <label
            class='gui-switch'
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
            <input
              type='checkbox'
              preventdefault:click
              checked={fullscreen.value}
            />
          </label>
        )}
        <label for='switch' class='gui-switch'>
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
        </label>
        <label for='switch' class='gui-switch'>
          Mode
          <select
            value={interfaceStore.mode}
            onChange$={(e) => {
              const v = e.target.value as string
              setLocalStorage('interfaceMode', v)
              interfaceStore.mode = v
            }}
          >
            <option>classic</option>
            <option>reader</option>
            <option>presenter</option>
          </select>
        </label>
      </article>
    </div>
  )
})
