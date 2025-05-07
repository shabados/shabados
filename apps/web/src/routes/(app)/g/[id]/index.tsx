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

  const bani = requestEvent.query.get('bani');
  const pagination = { next: null, prev: null };
  console.log(bani);
  if (bani) {
    const res = await fetch('https://shabados.com/api/bani');
    const baniData = await res.json();
    const index = baniData[bani].findIndex(
      (element: string) => element === decodeURI(requestEvent.params.id),
    );
    pagination.next = baniData[bani][index + 1] || null;
    pagination.prev = baniData[bani][index - 1] || null;
  }

  const fetchLineGroups = async (id: string) => {
    return fetch(`https://shabados.com/api/g/${id}`).then((res) => res.json());
  };

  if (lineGroups !== undefined) {
    return {
      bani,
      data: await Promise.all(lineGroups.map(fetchLineGroups)),
      next: pagination.next || undefined,
      prev: pagination.prev || undefined,
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
  console.log(signal);
  const defaultSource = res[0].meta.sources[0];
  const showPagination =
    res.length == 1 || signal.value.next || signal.value.prev;
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
      {showPagination && (
        <BottomBar
          prevLink={
            (signal.value.prev &&
              `/g/${signal.value.prev}?bani=${signal.value.bani}`) ||
            (res.length == 1 &&
              res[0].data[defaultSource].paging.previous &&
              `/g/${res[0].data[defaultSource].paging.previous}`)
          }
          nextLink={
            (signal.value.next &&
              `/g/${signal.value.next}?bani=${signal.value.bani}`) ||
            (res.length == 1 &&
              res[0].data[defaultSource].paging.next &&
              `/g/${res[0].data[defaultSource].paging.next}`)
          }
        />
      )}
    </article>
  );
});
