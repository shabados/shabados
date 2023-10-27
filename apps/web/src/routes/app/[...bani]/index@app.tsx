import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import BottomBar from '~/components/app/bottom-bar/bottom-bar'
import Line from '~/components/line/line'

export const useApi = routeLoader$(async (requestEvent) => {
  const bani = requestEvent.params.bani
  const response = await fetch(`https://www.shabados.com/api/app/${bani}`)
  const data = await response.json()
  return data
})

export const head: DocumentHead = ({ resolveValue }) => {
  const res = resolveValue(useApi)
  return {
    title: `${res.title.unicode} - Shabad OS`,
    meta: [
      {
        name: 'description',
        content: `Nitnem Bāṇī ${res.title.roman}`,
      },
    ],
  }
}

export default component$(() => {
  const data = useApi()
  return (
    <>
      {data.value.data.map(({ id, src, pronunciation, translation }: any) => (
        <Line
          key={id}
          id={id}
          src={src}
          pronunciation={pronunciation}
          translation={translation}
        />
      ))}
      <BottomBar
        prevLink={
          data.value.paging?.previous && `/app/${data.value.paging.previous}`
        }
        nextLink={data.value.paging?.next && `/app/${data.value.paging.next}`}
      />
    </>
  )
})
