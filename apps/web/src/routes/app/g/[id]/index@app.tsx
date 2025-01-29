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
  const lineGroups = requestEvent.params.id.split(',');

  const fetchLineGroups = async (id: string) => {
    return fetch(`https://shabados.com/api/g/${id}`).then((res) => res.json());
  };

  if (lineGroups !== undefined) {
    return {
      data: await Promise.all(lineGroups.map(fetchLineGroups)),
    };
  } else return {};
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
  const res = signal.value.data!;
  console.log(res);
  const defaultSource = res[0].meta.sources[0];
  return (
    <article>
      {res.map((value) =>
        value.data.default.src.map(
          ({ src, pronunciations, translations }: DataProps) => (
            <Line
              key={1}
              id={1}
              src={src.data}
              translation={translations?.en || ''}
              pronunciation={pronunciations?.Latn || ''}
            />
          ),
        ),
      )}
      {res.length == 1 && res[0].data[defaultSource].paging && (
        <BottomBar
          prevLink={
            res[0].data[defaultSource].paging.previous &&
            `/app/g/${res[0].data[defaultSource].paging.previous}`
          }
          nextLink={
            res[0].data[defaultSource].paging.next &&
            `/app/g/${res[0].data[defaultSource].paging.next}`
          }
        />
      )}
    </article>
  );
});
