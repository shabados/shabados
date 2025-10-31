import { component$, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import BottomBar from '~/components/app/bottom-bar/bottom-bar';
import HeaderJump from '~/components/app/header-jump/header-jump';
import JumpButton from '~/components/app/jump-button/jump-button';
import Line from '~/components/line/line';
import fetchLineGroup from '~/lib/fetchLineGroup';
import toGurmukhiNumerals from '~/lib/toGurmukhiNumerals';
import styles from './index.css?inline';

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
  const source = requestEvent.params.source;
  const isValidSource = ['sggs', 'sdgr', 'gjnl'];
  if (!isValidSource.includes(source)) {
    return null;
  }

  const res = await fetch(`https://shabados.com/api/f/${source}`);
  const data = await res.json();

  const leaf = parseInt(requestEvent.params.id);
  const lineGroups = data[leaf];
  const maxLeafs = Object.keys(data).length;

  if (lineGroups !== undefined) {
    return {
      source: requestEvent.params.source,
      paging: {
        previous: leaf > 1 ? leaf - 1 : -1,
        next: leaf < maxLeafs ? leaf + 1 : -1,
        max: maxLeafs,
      },
      data: await Promise.all(lineGroups.map(fetchLineGroup)),
    };
  } else return {};
});

export default component$(() => {
  useStyles$(styles);
  const signal = useApi();
  if (signal.value === null) {
    return <></>;
  }
  const lineGroups = signal.value.data!;
  const source = signal.value.source!;
  const paging = signal.value.paging!;
  useVisibleTask$(() => {
    if (lineGroups.length == 0 && paging.next > 0) {
      window.location.href = `/${source}/${paging.next}`;
    }
  });

  return (
    <article>
      <HeaderJump
        source={source}
        max={paging.max}
        title={toGurmukhiNumerals((paging.next - 1).toString())}
      />
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
            paging.previous > 0 ? `/${source}/${paging.previous}` : undefined
          }
          nextLink={paging.next > 0 ? `/${source}/${paging.next}` : undefined}
        >
          <JumpButton source={source} max={paging.max} />
        </BottomBar>
      )}
    </article>
  );
});
