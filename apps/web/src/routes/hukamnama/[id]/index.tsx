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

const pageMap: { [key: number]: string } = {
  399: 'FMA',
  401: '79A',
  403: 'Z53',
  405: 'AT5',
  407: '3GH',
  409: 'BH0',
  411: 'BWM',
  413: 'JL2',
  415: '2EE',
  416: 'Q2D',
  417: 'FUN',
  419: '4BL',
  421: 'GYQ',
  423: '507',
  426: '3GA',
  427: 'C17',
  429: '21H',
  431: 'EQ4',
  432: '8KZ',
  435: '31R',
  438: '6ZR',
  439: '78D',
  440: 'W2V',
  442: 'ARB',
  445: 'BS6',
  448: 'BCC',
  449: 'DH2',
  451: '2BZ',
  453: 'CTY',
  455: '933,DWP',
  457: 'JKX,CYL',
  459: '9VR',
  461: 'CWK',
  463: '3Z2,S42,EGF',
  465: 'SKD,T0T,L8E',
  467: 'G53,VWE,DFJ',
  469: 'KQK,BC5,BPL,GXF,WSM',
  470: '37N,F6F,T18',
  471: 'TND,5V5,AWG',
  473: 'HXP,6N0,8U3',
  475: 'PFB',
  476: '8BW',
  477: 'F7S',
  479: 'FDS',
  481: 'JVJ',
  483: '9G0',
  484: 'AL1',
  485: '12P',
  486: '1JT',
  487: 'H09',
  491: '51S',
  492: '2W0',
  493: 'RCE',
  495: '5FP',
  497: 'G9F',
  499: 'XHM',
  500: 'KRA',
  501: '335',
  503: 'AC6',
  505: 'HR4',
  507: 'XRD',
  509: 'YPS,JFT,PNE',
  511: 'CHZ,3WF,EFY',
  513: 'FMP,0C5,68Q',
  515: '27Q,CN0,CKT',
  517: 'EUW,A9Y,JTQ',
  519: 'MWL,XPV,JET',
  520: '0U6,4PQ,5QF',
  521: '8VW,4Y2,44N',
  523: 'D50,146,MV4',
  525: '5PG',
  527: 'G1K',
  529: 'XCZ',
  531: 'F2M',
  533: '7F2',
  535: '9CE',
  537: 'D6G',
  539: '7KR',
  541: 'MGG',
  543: 'RR2',
  545: 'FB6',
  547: 'ULT',
  549: 'GTP,AGL,CKY',
  551: '8N9,BD6,8U1',
  553: 'CTX,R2L,F73',
  555: '9TL,JZ0,DDP',
  557: 'NG8',
  559: 'UBV',
  561: '1DV',
  563: 'FJW',
  565: '1P0',
  567: 'PPM',
  569: '352',
  571: 'YBW',
  573: 'FJA',
  575: '75T',
  577: 'U43,2F4,NAW,YK0,LXK,67F,RWL,T08',
  579: 'K5U',
  581: '6P3',
  583: '9DH',
  585: 'M85,935,GSG,6AS',
  587: 'BS7,PPR,63E',
  589: 'YHE,5KR,49S',
  591: 'J8Q,KMW,G7Q',
  593: '1RS,M33,FXW',
  595: 'APG',
  597: '0Y8',
  599: 'RBJ',
  601: 'L4C',
  603: 'WZZ',
  605: 'CJ0',
  607: 'T2P',
  609: 'F6Q',
  611: '3QD',
  613: 'LMP',
  615: 'TD3',
  617: 'CWG',
  619: 'Q8V',
  621: 'SAA',
  623: 'M17',
  625: '2UH',
  627: 'WWY',
  629: 'STN',
  631: '00R',
  633: '7RB',
  635: 'C30',
  637: 'DH8',
  639: '7ZM',
  641: 'UN1',
  643: 'WH7,N7Y,STX',
  645: 'AKG,J2R,DC8',
  647: 'ME8,GHL,WW4',
  649: '74K,MR4,M1T',
  651: 'E62,XU1,BUS',
  653: 'F79,NCZ,BTB',
  655: 'C1L',
  657: 'MR0',
  660: '25S',
  661: '3UA',
  663: 'PHG',
  664: 'PG7',
  665: 'EU7',
  666: '1GE',
  667: 'SJ9',
  668: 'R5B',
  669: 'J60',
  671: 'QTM',
  673: '6GE',
  675: 'EYW',
  676: '57B',
  677: '0G7',
  678: '028',
  679: 'JK9',
  681: 'F09',
  682: '1HU',
  683: 'ER6',
  685: '8RA',
  687: 'G10',
  689: '98R',
  690: '7J3',
  691: '59X',
  693: '897',
  696: 'G8E',
  697: 'TCB',
  700: 'EH2',
  701: '2BG',
  703: '9KD,W2D',
  705: 'D3J,MXN',
  707: 'AGX,DS1',
  709: 'BW3,NUY',
  711: 'G0V',
  713: 'FUF',
  716: 'XA8',
  717: 'A4T',
  718: 'XR3',
  719: 'SN3',
  721: 'E2R',
  723: 'JCV',
  725: 'GUU',
  728: '6YM',
  729: 'CJP',
  730: '1WD',
  731: 'J0U',
  733: 'LV0',
  735: 'C3B',
  737: '40P',
  739: '64T',
  740: 'R1W',
  741: 'KJ7',
  742: 'MFH',
  743: 'D9J',
  745: 'YJH',
  746: '0UC',
  747: 'ZHF',
  749: 'MMQ',
  751: 'FTJ',
  753: 'PSB',
  755: 'RTL',
  757: '8WL',
  759: 'EWH',
  760: 'G2A',
  761: 'VR6',
  763: 'Q1Y',
  765: 'FU5',
  767: 'M7W',
  769: '9AT',
  771: 'MFA',
  773: '8XC',
  775: '7WQ',
  777: 'H6G',
  779: 'BY9',
  781: '156',
  783: 'UBH',
  785: '86Z,KVL,2XX',
  787: 'ELW,FXP,U59,82X,K9T',
  789: 'YS7,BFH,6SS',
  790: 'F58,LBE,30K',
  791: 'MPZ,Z1F,9Z3',
  793: 'E3H',
  795: 'HD2',
  797: 'AF6',
  799: 'ASQ',
  801: '86C',
  803: '1P2',
  805: '3CE',
  807: 'JWM',
  809: '7D0',
  811: 'K3Z',
  812: '8XG',
  813: 'M3P',
  815: 'BPR',
  817: 'KAS',
  819: 'CDD',
  821: 'ABD',
  823: '1ZH',
  825: 'B1W',
  827: 'G54',
  829: 'TUH',
  831: '7XV',
  832: 'M1H',
  833: '33E',
  835: 'CM9',
  837: '0TH',
  838: 'D8X',
  841: '0QS',
  843: 'SDT',
  845: 'FP7',
  847: '4PV,H82',
  849: '3MJ,CNN,5PA',
  850: '3Q3,0NT,7JR',
  851: '1C9,UZE,DWD,HQQ',
  853: 'X8W,D6K,GAA',
  855: '4V4',
  857: '9VB',
  859: 'TY0',
  861: '4JB',
  863: 'BWH',
  865: '9RZ',
  867: 'ET9',
  870: '18L',
  872: '96B',
  873: 'S40',
  874: 'F6S',
  875: '8RF',
  876: '9JD',
  877: 'FWS',
  878: 'KWV',
  880: '37L',
  881: 'KTL',
  882: 'CUB',
  883: '7L4',
  884: 'B23',
  885: '771',
  887: 'E3W',
  889: '03L',
  891: 'QJQ',
  893: '4SP',
  895: 'X4G',
  896: 'FQR',
  898: 'PN8',
  900: 'KX9',
  901: '3N2',
  903: 'V04',
  905: '67K',
  907: 'DHW',
  909: 'TZ9',
  911: '2U8',
  913: '071',
  915: 'F6X',
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
  const page = requestEvent.params.id;

  if (!(requestEvent.params.id in pageMap)) {
    return {
      e: true,
      m: 'Page not found. Please use the ਅੰਗ (ang) of where you begin reading the hukamnama.',
    };
  }

  const lineGroups = pageMap[parseInt(page)];

  if (page !== undefined) {
    return {
      linegroups: lineGroups,
      date: requestEvent.query.get('date') || undefined,
      larivar: requestEvent.query.get('larivar') || undefined,
      qr: requestEvent.query.get('qr') || undefined,
      pb: requestEvent.query.get('pb') || undefined,
      data: await Promise.all(lineGroups.split(',').map(fetchLineGroup)),
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
