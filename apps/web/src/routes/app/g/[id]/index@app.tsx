import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import Line from '~/components/line/line';
import BottomBar from '~/components/app/bottom-bar/bottom-bar';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
    maxAge: 60 * 60 * 24 * 2,
  });
  cacheControl(
    {
      staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
      maxAge: 60 * 60 * 24 * 2,
    },
    'CDN-Cache-Control',
  );
};

export const useLineGroupsApi = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    `https://shabados.com/api/g/${requestEvent.params.id}`,
  );
  const data = await res.json();
  return data;
});

interface DataSrcType {
  data: string;
  script: string;
}
interface DataPronunciationsType {
  Latn?: string;
}
interface DataTranslationsType {
  en?: string;
}

interface DataProps {
  src: DataSrcType;
  pronunciations: DataPronunciationsType;
  translations: DataTranslationsType;
}

export default component$(() => {
  const signal = useLineGroupsApi();
  const defaultSource = signal.value.meta.sources[0];
  return (
    <article>
      {signal.value.data.default.src.map(
        ({ src, pronunciations, translations }: DataProps) => (
          <Line
            key={1}
            id={1}
            src={src.data}
            translation={translations?.en || ''}
            pronunciation={pronunciations?.Latn || ''}
          />
        ),
      )}
      {signal.value.data[defaultSource].paging && (
        <BottomBar
          prevLink={
            signal.value.data[defaultSource].paging.previous &&
            `/app/g/${signal.value.data[defaultSource].paging.previous}`
          }
          nextLink={
            signal.value.data[defaultSource].paging.next &&
            `/app/g/${signal.value.data[defaultSource].paging.next}`
          }
        />
      )}
    </article>
  );
});
