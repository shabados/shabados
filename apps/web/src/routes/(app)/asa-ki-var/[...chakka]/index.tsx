import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import BottomBar from '~/components/app/bottom-bar/bottom-bar';
import Line from '~/components/line/line';

export const useApi = routeLoader$(async (requestEvent) => {
  const chakka = requestEvent.params.chakka;
  const response = await fetch(
    `https://www.shabados.com/api/app/asa-ki-var/${chakka}`,
  );
  if (response.status !== 404) {
    const data = await response.json();
    return data;
  }
  return null;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const res = resolveValue(useApi);
  if (res !== null) {
    return {
      title: `${res.title.unicode} - Shabad OS`,
      meta: [
        {
          name: 'description',
          content: `${res.title.roman}`,
        },
      ],
    };
  }
  return {
    title: `404 - Shabad OS`,
  };
};

export default component$(() => {
  const data = useApi();
  if (data.value !== null) {
    return (
      <article>
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
            data.value.paging?.previous && `/${data.value.paging.previous}`
          }
          nextLink={data.value.paging?.next && `/${data.value.paging.next}`}
        />
      </article>
    );
  }
  return (
    <article>
      <h1>404</h1>
      <p>Not found</p>
    </article>
  );
});
