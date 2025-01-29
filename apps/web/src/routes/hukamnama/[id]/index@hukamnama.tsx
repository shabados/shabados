import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { component$, useVisibleTask$ } from '@builder.io/qwik';
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
    console.log(requestEvent.query);
    return {
      linegroups: requestEvent.params.id,
      date: requestEvent.query.get('date') || undefined,
      qr: requestEvent.query.get('qr') || undefined,
      data: await Promise.all(lineGroups.map(fetchLineGroups)),
    };
  } else return {};
});

const toGurmukhiNumerals = (input: string): string => {
  const numeralMap: { [key: string]: string } = {
    '1': '੧',
    '2': '੨',
    '3': '੩',
    '4': '੪',
    '5': '੫',
    '6': '੬',
    '7': '੭',
    '8': '੮',
    '9': '੯',
    '0': '੦',
  };

  return input.replace(/\d/g, (digit) => numeralMap[digit]);
};

export default component$(() => {
  const signal = useLineGroupsApi();
  const lineGroups = signal.value.data!;
  const svg = renderSVG(
    `https://shabados.com/app/g/${decodeURI(signal.value.linegroups!)}`,
    {
      border: 4,
    },
  );
  useVisibleTask$(() => {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    const scrollFactor = 0.8;
    const timeout = { ms: 0, default: 30000, minimum: 5000 };
    timeout.ms = timeout.default;

    const doScroll = () => {
      progressBar.style.width = '0%';
      progressBar.style.opacity = '40%';

      progressBar.animate(
        [
          { width: '0%', opacity: '40%' },
          { width: '100%', opacity: '100%' },
        ],
        {
          duration: timeout.ms,
          iterations: 1,
        },
      );

      setTimeout(scrollPage, timeout.ms);
    };

    const scrollPage = () => {
      const body = document.querySelector('body');
      const totalHeight = body!.scrollHeight;
      const screenHeight = window.innerHeight;

      if (totalHeight > screenHeight) {
        const curPos = window.scrollY;

        if (Math.ceil(curPos + screenHeight) >= totalHeight) {
          window.scrollTo({ top: 0, behavior: 'auto' });
          timeout.ms = timeout.default;
        } else {
          if (
            Math.ceil(curPos + screenHeight * scrollFactor) >=
            totalHeight - screenHeight
          ) {
            const scrollDistancePercentage =
              (totalHeight - screenHeight - curPos) /
              screenHeight /
              scrollFactor;
            timeout.ms =
              scrollDistancePercentage * timeout.default > timeout.minimum
                ? (timeout.ms = scrollDistancePercentage * timeout.default)
                : timeout.minimum;
            console.log(timeout.ms);
          }

          window.scrollTo({
            top: curPos + screenHeight * scrollFactor,
            behavior: 'smooth',
          });
        }
      }

      doScroll();
    };

    doScroll();
  });
  return (
    <>
      {!(signal.value.qr && parseInt(signal.value.qr) == 0) && (
        <div class='qrcode' dangerouslySetInnerHTML={svg} />
      )}
      <div class='header'>
        <div class='line'>
          <p>
            ਪੰਜਾਬੀ ਵਿਆਖਿਆ&emsp;ਅੰਗ{' '}
            {toGurmukhiNumerals(lineGroups[0].meta.source.pp[0].toString())}
            {lineGroups[0].meta.source.pp.length == 2 &&
              `-${toGurmukhiNumerals(
                lineGroups[0].meta.source.pp[1].toString(),
              )}`}
          </p>
          <div>
            <h1>
              <Lotus /> ਅੱਜ ਦਾ ਹੁਕਮਨਾਮਾ <Lotus />
            </h1>
            {signal.value.date && <span>{signal.value.date}</span>}
          </div>
          <p>
            English Translation&emsp;
            {lineGroups[0].meta.source.pp.length == 2
              ? `PP ${lineGroups[0].meta.source.pp[0]}-${lineGroups[0].meta.source.pp[1]}`
              : `Page ${lineGroups[0].meta.source.pp[0]}`}
          </p>
        </div>
        <div class='progress-bar' />
      </div>
      {lineGroups.map((lineGroup) => (
        <Hukamnama key={1} data={lineGroup} />
      ))}
    </>
  );
});
