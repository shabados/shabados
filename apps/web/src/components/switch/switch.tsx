import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './switch.css?inline'

interface Props {
  toggled: boolean
}

export default component$(({ toggled }: Props) => {
  useStylesScoped$(styles)

  return (
    <input class='switch' type='checkbox' role='switch' checked={toggled} />
  )
})
