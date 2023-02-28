import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
  return (
    <>
      <a href='/docs/database/schema'>Return to Schema Overview</a>
      <Slot />
    </>
  )
})
