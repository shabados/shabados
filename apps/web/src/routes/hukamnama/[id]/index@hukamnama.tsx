import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import Hukamnama from '~/components/hukamnama/hukamnama';
import Lotus from '~/components/icons/lotus';
import { renderSVG } from 'uqr';

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
      param: requestEvent.params.id,
      data: await Promise.all(lineGroups.map(fetchLineGroups)),
    };
  } else return {};
});

export default component$(() => {
  const signal = useLineGroupsApi();
  const lineGroups = signal.value.data!;
  const svg = renderSVG(
    `https://shabados.com/app/g/${decodeURI(signal.value.param!)}`,
    {
      border: 4,
    },
  );
  return (
    <>
      <div class='qrcode' dangerouslySetInnerHTML={svg} />
      <div class='line header'>
        <p>
          ਪੰਜਾਬੀ ਵਿਆਖਿਆ&emsp;ਅੰਗ {lineGroups[0].meta.source.pp[0]}
          {lineGroups[0].meta.source.pp.length == 2 &&
            `-${lineGroups[0].meta.source.pp[1]}`}
        </p>
        <h1>
          <Lotus /> ਅੱਜ ਦਾ ਹੁਕਮਨਾਮਾ <Lotus />
        </h1>
        <p>
          English Translation&emsp;
          {lineGroups[0].meta.source.pp.length == 2
            ? `PP ${lineGroups[0].meta.source.pp[0]}-${lineGroups[0].meta.source.pp[1]}`
            : `Page ${lineGroups[0].meta.source.pp[0]}`}
        </p>
      </div>
      {lineGroups.map((lineGroup) => (
        <Hukamnama key={1} data={lineGroup} />
      ))}
    </>
  );
});
