import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Hukamnama from '~/components/hukamnama/hukamnama';
import Lotus from '~/components/icons/lotus';
import { renderSVG } from 'uqr';
import fetchLineGroup from '~/lib/fetchLineGroup';

const recommendedFontSize = (numUnits: number) => {
  // return '2.155vh';
  const factor = 14.2452 - 0.814962 * Math.log(8.36441 * numUnits - 691962);
  return `${numUnits < 107297 ? 4.25 : factor < 1.33 ? 1.33 : factor}vh`;
};

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
  const lineGroups = requestEvent.params.id;

  if (lineGroups !== undefined) {
    return {
      linegroups: lineGroups,
      date: requestEvent.query.get('date') || undefined,
      larivar: requestEvent.query.get('larivar') || undefined,
      qr: requestEvent.query.get('qr') || undefined,
      pb: requestEvent.query.get('pb') || undefined,
      data: await Promise.all(lineGroups.split(',').map(fetchLineGroup)),
    };
  } else {
    return {
      e: true,
      m: 'Page not found.',
    };
  }
  // unknown error
  return {};
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
  if ('e' in signal.value) {
    return (
      <>
        <h1>404</h1>
        <p>
          {signal.value.m}{' '}
          <a href='https://www.shabados.com/support/guide/web/hukamnama/'>
            For more information please see our documentation.
          </a>
        </p>
      </>
    );
  }
  const lineGroups = signal.value.data!;
  const svg = renderSVG(
    `https://shabados.com/g/${decodeURI(signal.value.linegroups!)}`,
    {
      border: 4,
    },
  );

  const larivar =
    (signal.value.larivar && parseInt(signal.value.larivar) == 1) ?? false;

  const hukamnama = lineGroups.reduce(
    (total, lineGroup) =>
      total +
      lineGroup.data.default.src.reduce(
        (acc: string, obj: any) =>
          acc +
          (larivar ? obj.src.data.replaceAll(' ', '') : obj.src.data)
            .replaceAll(',', '')
            .replaceAll(';', '')
            .replaceAll('.', '') +
          (larivar ? '' : ' '),
        '',
      ),
    '',
  );
  const baseCharMarks = [
    '੍ਹ',
    '੍ਰ',
    '੍ਵ',
    '੍ਟ',
    '੍ਤ',
    '੍ਨ',
    '੍ਚ',
    '਼',
    'ੑ',
    'ੵ',
    'ੇ',
    'ੈ',
    'ੋ',
    'ੌ',
    'ੁ',
    'ੂ',
    'ਁ',
    'ੱ',
    'ਂ',
    'ੰ',
    'ਃ',
  ];
  const baseCharMarksRegex = new RegExp(baseCharMarks.join('|'), 'g');
  const hukamChars = hukamnama.replace(baseCharMarksRegex, '');

  const pWidth = ['ਲ'];
  const pWidthRegex = new RegExp(pWidth.join('|'), 'g');
  const pWidthCount = (hukamChars.match(pWidthRegex) || []).length;

  const ppWidth = ['ਅ', 'ਐ', 'ਔ', 'ਗ', 'ਯ', 'ਘ'];
  const ppWidthRegex = new RegExp(ppWidth.join('|'), 'g');
  const ppWidthCount = (hukamChars.match(ppWidthRegex) || []).length;

  const pppWidth = ['ਇ', 'ਈ'];
  const pppWidthRegex = new RegExp(pppWidth.join('|'), 'g');
  const pppWidthCount = (hukamChars.match(pppWidthRegex) || []).length;

  const ppppWidth = ['ੴ'];
  const ppppWidthRegex = new RegExp(ppppWidth.join('|'), 'g');
  const ppppWidthCount = (hukamChars.match(ppppWidthRegex) || []).length;

  const mWidth = ['੦', '੨', '੩', '੬', '੮', '੯'];
  const mWidthRegex = new RegExp(mWidth.join('|'), 'g');
  const mWidthCount = (hukamChars.match(mWidthRegex) || []).length;

  const mmWidth = ['੧', '॥'];
  const mmWidthRegex = new RegExp(mmWidth.join('|'), 'g');
  const mmWidthCount = (hukamChars.match(mmWidthRegex) || []).length;

  const mmmWidth = ['ਿ', 'ੀ', 'ਾ'];
  const mmmWidthRegex = new RegExp(mmmWidth.join('|'), 'g');
  const mmmWidthCount = (hukamChars.match(mmmWidthRegex) || []).length;

  const mmmmWidth = [' '];
  const mmmmWidthRegex = new RegExp(mmmmWidth.join('|'), 'g');
  const mmmmWidthCount = (hukamChars.match(mmmmWidthRegex) || []).length;

  const nWidthCount =
    hukamChars.length -
    pWidthCount -
    ppWidthCount -
    pppWidthCount -
    ppppWidthCount -
    mWidthCount -
    mmWidthCount -
    mmmWidthCount -
    mmmmWidthCount;

  const numUnits =
    nWidthCount * 560 +
    pWidthCount * 640 +
    ppWidthCount * 702 +
    pppWidthCount * 797 +
    ppppWidthCount * 1021 +
    mWidthCount * 490 +
    mmWidthCount * 457 +
    mmmWidthCount * 240 +
    mmmmWidthCount * 210;

  useVisibleTask$(() => {
    const progressBar = document.querySelector('#progress-bar') as HTMLElement;

    const timeout = { ms: 0, maximum: 90000, minimum: 4000 };

    const body = document.querySelector('.exposition');
    const bodyHeight = body?.getBoundingClientRect().height;
    const lines = body?.querySelectorAll('.line');
    const lineInfo = { index: 0, top: 0 };

    const animateProgressBar = () => {
      if (progressBar) {
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
      }
    };

    const goNextLine = () => {
      const scrollToNextLine = () => {
        const currentLine = lines![lineInfo.index];
        const gurmukhiLine = currentLine.querySelector('.bold');
        if (progressBar) currentLine.insertBefore(progressBar!, gurmukhiLine);
        lineInfo.top = currentLine.getBoundingClientRect().top + 2;
        console.log(lineInfo.top);
        const lineHeight = currentLine.getBoundingClientRect().height;
        const factor = lineHeight > bodyHeight! ? 1 : lineHeight / bodyHeight!;
        timeout.ms =
          factor * timeout.maximum < timeout.minimum
            ? timeout.minimum
            : factor * timeout.maximum;

        console.log(timeout.ms);

        currentLine.scrollIntoView({ behavior: 'smooth' });

        animateProgressBar();

        // Increment the index or reset to 0 if at the end
        lineInfo.index = (lineInfo.index + 1) % lines!.length;

        // Schedule the next scroll
        setTimeout(scrollToNextLine, timeout.ms);
      };

      scrollToNextLine();
    };

    goNextLine();
  });

  const fontSize = recommendedFontSize(numUnits);
  return (
    <>
      {!(signal.value.qr && parseInt(signal.value.qr) == 0) && (
        <div class='qrcode' dangerouslySetInnerHTML={svg} />
      )}

      <div class='hukamnama'>
        <div>
          <div class='header'>
            <div>
              {signal.value.date && <p>{signal.value.date}</p>}
              <h1>
                <Lotus /> ਅੱਜ ਦਾ ਹੁਕਮਨਾਮਾ <Lotus />
              </h1>
              <p>
                ਅੰਗ{' '}
                {toGurmukhiNumerals(
                  lineGroups[0].meta.source.pp.sort()[0].toString(),
                )}
                {lineGroups[0].meta.source.pp.length == 2 &&
                  `-${toGurmukhiNumerals(
                    lineGroups[0].meta.source.pp.sort()[1].toString(),
                  )}`}
              </p>
            </div>
          </div>
          <div
            class={`hukam ${larivar && 'hukam__larivar'}`}
            style={{ fontSize }}
          >
            {hukamnama}
          </div>
        </div>
        <div class='exposition'>
          {!(signal.value.pb && parseInt(signal.value.pb) == 0) && (
            <div id='progress-bar' />
          )}
          {lineGroups.map((lineGroup) => (
            <Hukamnama key={1} data={lineGroup} />
          ))}
        </div>
      </div>
    </>
  );
});
