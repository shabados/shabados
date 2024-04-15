import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { $, component$, useVisibleTask$ } from '@builder.io/qwik';
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
    `https://shabados.com/api/f/${requestEvent.params.source}`,
  );
  const data = await res.json();

  const leaf = parseInt(requestEvent.params.id);
  const lineGroups = data[leaf];
  const maxLeafs = Object.keys(data).length;

  const fetchLineGroups = async (id: string) => {
    return fetch(`https://shabados.com/api/g/${id}`).then((res) => res.json());
  };

  if (lineGroups !== undefined) {
    return {
      source: requestEvent.params.source,
      paging: {
        previous: leaf > 1 ? leaf - 1 : -1,
        next: leaf < maxLeafs ? leaf + 1 : -1,
        max: maxLeafs,
      },
      data: await Promise.all(lineGroups.map(fetchLineGroups)),
    };
  } else return {};
});

export default component$(() => {
  const signal = useApi();
  const lineGroups = signal.value.data!;
  const source = signal.value.source!;
  const paging = signal.value.paging!;
  useVisibleTask$(() => {
    if (lineGroups.length == 0 && paging.next > 0) {
      window.location.href = `/app/f/${source}/${paging.next}`;
    }
  });
  const handleJump = $(() => {
    const number = parseInt(
      window!.prompt(`Please input a number between 1 and ${paging.max}`)!,
    );
    if (!isNaN(number) && isFinite(number)) {
      if (number <= paging.max && number >= 1) {
        window.location.href = `/app/f/${source}/${number}`;
      }
    }
    console.log(number, source);
  });

  return (
    <>
      <div>
        <center>
          <p class='small' onClick$={() => handleJump()}>
            ( {paging.next - 1} )
          </p>
        </center>
      </div>
      {lineGroups.map((lineGroup) =>
        lineGroup.data.default.src.map((line: any) => (
          <Line
            key={1}
            id={1}
            src={line.src.data}
            translation={line.translations.en}
            pronunciation=''
          />
        )),
      )}
      {(paging.previous > 0 || paging.next > 0) && (
        <BottomBar
          prevLink={
            paging.previous > 0
              ? `/app/f/${source}/${paging.previous}`
              : undefined
          }
          nextLink={
            paging.next > 0 ? `/app/f/${source}/${paging.next}` : undefined
          }
        >
          <a href='#' onClick$={() => handleJump()}>
            Jump...
          </a>
        </BottomBar>
      )}
    </>
  );
});
