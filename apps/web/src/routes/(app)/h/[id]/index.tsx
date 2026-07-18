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

export const useApi = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    `https://shabados.com/api/h/${requestEvent.params.id}`,
  );
  const data = await res.json();
  return data;
});

interface DataSrcType {
  data: string;
  script: string;
}
interface DataTranslationsType {
  en?: string;
}

interface DataProps {
  src: DataSrcType;
  translations: DataTranslationsType;
}

export default component$(() => {
  const signal = useApi();
  return (
    <article>
      <div>
        <h1>
          ਰੋਜ਼ਾਨਾ ਮੁੱਖਵਾਕ {signal.value.meta.date.guru.nanakshahiDay}{' '}
          {signal.value.meta.date.guru.nanakshahiMonthLong} ਤੋਂ
        </h1>
        <p>Daily Mukhwak ({signal.value.meta.date.latn.gregorianYmdShort})</p>
      </div>
      {signal.value.data &&
        signal.value.data.map(({ src, translations }: DataProps) => (
          <Line
            key={signal.value.id}
            id={signal.value.id}
            src={src.data}
            translation={translations.en}
            pronunciation=''
          />
        ))}

      {signal.value.paging && (
        <BottomBar
          prevLink={
            signal.value.paging.previous && `/h/${signal.value.paging.previous}`
          }
          nextLink={
            signal.value.paging.next && `/h/${signal.value.paging.next}`
          }
        />
      )}
    </article>
  );
});
