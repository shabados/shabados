import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import BottomBar from '~/components/app/bottom-bar/bottom-bar';
import Line from '~/components/line/line';
import fetchLineGroup from '~/lib/fetchLineGroup';
interface Bani {
  name: {
    Guru: string;
    Latn: string;
  };
  paging?: {
    prev?: string;
    next?: string;
  };
  lg: string;
}
const banis: Record<string, Bani> = {
  '1': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 1 - Sukhmani Sahib',
    },
    paging: {
      next: '2',
    },
    lg: 'J9V,45C,ULS,L6T,H4B,SE7,K7X,1US,TF7',
  },
  '2': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੨ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 2 - Sukhmani Sahib',
    },
    paging: {
      prev: '1',
      next: '3',
    },
    lg: 'NF2,1MA,SFU,T0Y,B41,B7C,134,CYM,203',
  },
  '3': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੩ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 3 - Sukhmani Sahib',
    },
    paging: {
      prev: '2',
      next: '4',
    },
    lg: 'KJL,GH5,2K2,JTS,LWT,Y5K,31D,MTW,N03',
  },
  '4': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੪ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 4 - Sukhmani Sahib',
    },
    paging: {
      prev: '3',
      next: '5',
    },
    lg: 'BQV,N8F,4AY,234,DCL,9RE,1XQ,LG4,FNM',
  },
  '5': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੫ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 5 - Sukhmani Sahib',
    },
    paging: {
      prev: '4',
      next: '6',
    },
    lg: '3RK,V9T,7HP,FEC,AZT,AFT,DQX,74F,BKY',
  },
  '6': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੬ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 6 - Sukhmani Sahib',
    },
    paging: {
      prev: '5',
      next: '7',
    },
    lg: '9JH,HPD,K5M,CPG,RL2,2TM,HXF,AG4,FQA',
  },
  '7': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੭ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 7 - Sukhmani Sahib',
    },
    paging: {
      prev: '6',
      next: '8',
    },
    lg: '44E,ZJ4,JUG,KA7,MC8,CT2,CKH,GPX,EEW',
  },
  '8': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੮ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 8 - Sukhmani Sahib',
    },
    paging: {
      prev: '7',
      next: '9',
    },
    lg: 'XWW,F5A,2AT,FJV,E5M,FN8,5TY,Q0G,LEB',
  },
  '9': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੯ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 9 - Sukhmani Sahib',
    },
    paging: {
      prev: '8',
      next: '10',
    },
    lg: '8NQ,DC7,34F,74B,0KE,C1A,6VR,6GA,38G',
  },
  '10': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੦ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 10 - Sukhmani Sahib',
    },
    paging: {
      prev: '9',
      next: '11',
    },
    lg: 'YCP,51F,DC0,S6T,21R,B56,7CW,8LX,1RM',
  },
  '11': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੧ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 11 - Sukhmani Sahib',
    },
    paging: {
      prev: '10',
      next: '12',
    },
    lg: 'EXR,1G1,QYL,3UK,5MP,EVF,KZ9,145,W3K',
  },
  '12': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੨ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 12 - Sukhmani Sahib',
    },
    paging: {
      prev: '11',
      next: '13',
    },
    lg: 'V0T,X3L,NLN,VF0,E2G,HQ8,X3Z,7B6,LCF',
  },
  '13': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੩ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 13 - Sukhmani Sahib',
    },
    paging: {
      prev: '12',
      next: '14',
    },
    lg: 'HY9,3D5,US1,1SX,NGH,L8Q,A9J,L3Z,D6S',
  },
  '14': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੪ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 14 - Sukhmani Sahib',
    },
    paging: {
      prev: '13',
      next: '15',
    },
    lg: 'AS9,E75,B91,HJ0,GBE,0PM,427,FAE,8RL',
  },
  '15': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੫ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 15 - Sukhmani Sahib',
    },
    paging: {
      prev: '14',
      next: '16',
    },
    lg: 'BJU,DN9,1NJ,3VX,A0H,KAM,JWW,14D,9GB',
  },
  '16': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੬ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 16 - Sukhmani Sahib',
    },
    paging: {
      prev: '15',
      next: '17',
    },
    lg: 'BU7,FU9,NKQ,DAJ,FR3,14Y,HGR,1XZ,C8C',
  },
  '17': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੭ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 17 - Sukhmani Sahib',
    },
    paging: {
      prev: '16',
      next: '18',
    },
    lg: 'K7M,HG7,5WT,7RW,VD9,H67,7MR,F8J,978',
  },
  '18': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੮ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 18 - Sukhmani Sahib',
    },
    paging: {
      prev: '17',
      next: '19',
    },
    lg: '5ZP,5X9,Q1Z,9GN,GA2,4P9,FJ4,D90,D4Y',
  },
  '19': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੧੯ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 19 - Sukhmani Sahib',
    },
    paging: {
      prev: '18',
      next: '20',
    },
    lg: 'H70,C0F,ZXQ,EMF,8WW,51T,CX5,EFC,5TH',
  },
  '20': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੨੦ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 20 - Sukhmani Sahib',
    },
    paging: {
      prev: '19',
      next: '21',
    },
    lg: 'MAH,B34,U7A,T4F,VD2,GDB,BAP,0NR,5HC',
  },
  '21': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੨੧ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 21 - Sukhmani Sahib',
    },
    paging: {
      prev: '20',
      next: '22',
    },
    lg: '5DQ,NJC,DSK,G19,JMS,DF6,8TF,ZT5,ZDG',
  },
  '22': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੨੨ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 22 - Sukhmani Sahib',
    },
    paging: {
      prev: '21',
      next: '23',
    },
    lg: 'YGL,ASC,31M,2HY,FLU,UMU,YTV,VE0,00E',
  },
  '23': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੨੩ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 23 - Sukhmani Sahib',
    },
    paging: {
      prev: '22',
      next: '24',
    },
    lg: '6XE,NYQ,G60,SUZ,AU7,14J,2YE,VVN,5BY',
  },
  '24': {
    name: {
      Guru: 'ਅਸਟਪਦੀ ੨੪ - ਸੁਖਮਨੀ ਸਾਹਿਬ',
      Latn: 'Ashtpadi 24 - Sukhmani Sahib',
    },
    paging: {
      prev: '23',
    },
    lg: 'G4N,RR5,59B,9R6,EXD,VZR,S1R,DET,HVA',
  },
};

export const useApi = routeLoader$(async (requestEvent) => {
  const bani = requestEvent.params.bani;

  // if bani is not in our list, exit
  if (!Object.keys(banis).includes(bani)) {
    return null;
  }

  const baniData = banis[bani as keyof typeof banis];
  const lineGroups = baniData.lg.split(',');

  if (lineGroups !== undefined) {
    return {
      bani: baniData,
      data: await Promise.all(lineGroups.map(fetchLineGroup)),
    };
  } else return null;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const res = resolveValue(useApi);
  if (res == null) {
    return {};
  }
  return {
    title: `${res.bani.name.Guru} - ਸ਼ਬਦ ਓਸੋ`,
    meta: [
      {
        name: 'description',
        content: `${res.bani.name.Latn}`,
      },
    ],
  };
};

export default component$(() => {
  const signal = useApi();
  if (signal.value == null) {
    return (
      <article>
        <h1>404</h1>
        <p>Not found</p>
      </article>
    );
  }
  const bani = signal.value!.bani!;
  const data = signal.value!.data!;
  return (
    <article>
      {data.map((value) =>
        value.data.default.src.map(
          ({ src, pronunciations, translations, notes }: any) => (
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
      <BottomBar
        prevLink={bani.paging?.prev && `/sukhmani-sahib/${bani.paging?.prev}`}
        nextLink={bani.paging?.next && `/sukhmani-sahib/${bani.paging?.next}`}
      />
    </article>
  );
});
