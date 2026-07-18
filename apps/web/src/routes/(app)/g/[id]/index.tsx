import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import Line from '~/components/line/line';
import BottomBar from '~/components/app/bottom-bar/bottom-bar';
import fetchLineGroup from '~/lib/fetchLineGroup';

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

  const pagination = { next: null, prev: null };

  if (lineGroups !== undefined) {
    return {
      data: await Promise.all(lineGroups.map(fetchLineGroup)),
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
  Guru?: string;
  es?: string;
}
interface DataNotesType {
  Guru?: string;
}

interface DataProps {
  src: DataSrcType;
  pronunciations: DataPronunciationsType;
  translations: DataTranslationsType;
  notes: DataNotesType;
}

export default component$(() => {
  const signal = useLineGroupsApi();
  const res = signal.value.data!;
  const defaultSource = res[0].meta.sources[0];
  const showPagination =
    res.length == 1 || signal.value.next || signal.value.prev;
  return (
    <article>
      {res.map((value) =>
        value.data.default.src.map(
          ({ src, pronunciations, translations, notes }: DataProps) => (
            <Line
              key={1}
              id={1}
              src={src.data}
              pronunciation={pronunciations?.Latn || ''}
              en={translations?.en || ''}
              pa={translations?.Guru || ''}
              paNotes={notes?.Guru || ''}
            />
          ),
        ),
      )}
      {showPagination && (
        <BottomBar
          prevLink={
            (signal.value.prev && `/g/${signal.value.prev}`) ||
            (res.length == 1 &&
              res[0].data[defaultSource].paging.previous &&
              `/g/${res[0].data[defaultSource].paging.previous}`)
          }
          nextLink={
            (signal.value.next && `/g/${signal.value.next}`) ||
            (res.length == 1 &&
              res[0].data[defaultSource].paging.next &&
              `/g/${res[0].data[defaultSource].paging.next}`)
          }
        />
      )}
    </article>
  );
});
