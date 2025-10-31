import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import BottomBar from '~/components/app/bottom-bar/bottom-bar';
import HeaderJump from '~/components/app/header-jump/header-jump';
import JumpButton from '~/components/app/jump-button/jump-button';
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
      Guru: 'ਛੱਕਾ ੧ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 1 - Asa Ki Var',
    },
    paging: {
      next: '2',
    },
    lg: 'MK1::6,GK0,1TN,DU3,595',
  },
  '2': {
    name: {
      Guru: 'ਛੱਕਾ ੨ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 2 - Asa Ki Var',
    },
    paging: {
      prev: '1',
      next: '3',
    },
    lg: 'MK1:6:10,J3D,3JA,ASY,JPB',
  },
  '3': {
    name: {
      Guru: 'ਛੱਕਾ ੩ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 3 - Asa Ki Var',
    },
    paging: {
      prev: '2',
      next: '4',
    },
    lg: 'MK1:10:14,3Z2,S42,EGF',
  },
  '4': {
    name: {
      Guru: 'ਛੱਕਾ ੪ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 4 - Asa Ki Var',
    },
    paging: {
      prev: '3',
      next: '5',
    },
    lg: 'MK1:14:18,KKA,EZL,PL9',
  },
  '5': {
    name: {
      Guru: 'ਛੱਕਾ ੫ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 5 - Asa Ki Var',
    },
    paging: {
      prev: '4',
      next: '6',
    },
    lg: 'DH2::5,PBQ,UYZ,7M8',
  },
  '6': {
    name: {
      Guru: 'ਛੱਕਾ ੬ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 6 - Asa Ki Var',
    },
    paging: {
      prev: '5',
      next: '7',
    },
    lg: 'DH2:5:9,SKD,T0T,L8E',
  },
  '7': {
    name: {
      Guru: 'ਛੱਕਾ ੭ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 7 - Asa Ki Var',
    },
    paging: {
      prev: '6',
      next: '8',
    },
    lg: 'DH2:9:13,337,3FU,WF8',
  },
  '8': {
    name: {
      Guru: 'ਛੱਕਾ ੮ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 8 - Asa Ki Var',
    },
    paging: {
      prev: '7',
      next: '9',
    },
    lg: 'DH2:13:17,LNY,6BM,GS3',
  },
  '9': {
    name: {
      Guru: 'ਛੱਕਾ ੯ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 9 - Asa Ki Var',
    },
    paging: {
      prev: '8',
      next: '10',
    },
    lg: '79E::5,G53,VWE,DFJ',
  },
  '10': {
    name: {
      Guru: 'ਛੱਕਾ ੧੦ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 10 - Asa Ki Var',
    },
    paging: {
      prev: '9',
      next: '11',
    },
    lg: '79E:5:9,X5G,6NM,3SX',
  },
  '11': {
    name: {
      Guru: 'ਛੱਕਾ ੧੧ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 11 - Asa Ki Var',
    },
    paging: {
      prev: '10',
      next: '12',
    },
    lg: '79E:9:13,71U,EZG,8AP,G3A',
  },
  '12': {
    name: {
      Guru: 'ਛੱਕਾ ੧੨ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 12 - Asa Ki Var',
    },
    paging: {
      prev: '11',
      next: '13',
    },
    lg: '79E:13:17,KQK,BC5,BPL,GXF,WSM',
  },
  '13': {
    name: {
      Guru: 'ਛੱਕਾ ੧੩ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 13 - Asa Ki Var',
    },
    paging: {
      prev: '12',
      next: '14',
    },
    lg: 'FHF::5,37N,F6F,T18',
  },
  '14': {
    name: {
      Guru: 'ਛੱਕਾ ੧੪ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 14 - Asa Ki Var',
    },
    paging: {
      prev: '13',
      next: '15',
    },
    lg: 'FHF:5:9,76A,VWX,GT2',
  },
  '15': {
    name: {
      Guru: 'ਛੱਕਾ ੧੫ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 15 - Asa Ki Var',
    },
    paging: {
      prev: '14',
      next: '16',
    },
    lg: 'FHF:9:13,H3B,LFW,YHQ,JE4,P49',
  },
  '16': {
    name: {
      Guru: 'ਛੱਕਾ ੧੬ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 16 - Asa Ki Var',
    },
    paging: {
      prev: '15',
      next: '17',
    },
    lg: 'FHF:13:17,TND,5V5,AWG',
  },
  '17': {
    name: {
      Guru: 'ਛੱਕਾ ੧੭ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 17 - Asa Ki Var',
    },
    paging: {
      prev: '16',
      next: '18',
    },
    lg: 'NB5::5,3UJ,C0V,TSC',
  },
  '18': {
    name: {
      Guru: 'ਛੱਕਾ ੧੮ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 18 - Asa Ki Var',
    },
    paging: {
      prev: '17',
      next: '19',
    },
    lg: 'NB5:5:9,3B4,7XW,7NZ,A6B',
  },
  '19': {
    name: {
      Guru: 'ਛੱਕਾ ੧੯ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 19 - Asa Ki Var',
    },
    paging: {
      prev: '18',
      next: '20',
    },
    lg: 'NB5:9:13,7GK,RBL,6Q8',
  },
  '20': {
    name: {
      Guru: 'ਛੱਕਾ ੨੦ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 20 - Asa Ki Var',
    },
    paging: {
      prev: '19',
      next: '21',
    },
    lg: 'NB5:13:17,HXP,6N0,8U3',
  },
  '21': {
    name: {
      Guru: 'ਛੱਕਾ ੨੧ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 21 - Asa Ki Var',
    },
    paging: {
      prev: '20',
      next: '22',
    },
    lg: 'A5W::5,3VR,FR8,X5L',
  },
  '22': {
    name: {
      Guru: 'ਛੱਕਾ ੨੨ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 22 - Asa Ki Var',
    },
    paging: {
      prev: '21',
      next: '23',
    },
    lg: 'A5W:5:9,G2B,2KL,CYN,U9D,NH1,8JR',
  },
  '23': {
    name: {
      Guru: 'ਛੱਕਾ ੨੩ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 23 - Asa Ki Var',
    },
    paging: {
      prev: '22',
      next: '24',
    },
    lg: 'A5W:9:13,A16,ML8,XNN',
  },
  '24': {
    name: {
      Guru: 'ਛੱਕਾ ੨੪ - ਆਸਾ ਕੀ ਵਾਰ',
      Latn: 'Chakka 24 - Asa Ki Var',
    },
    paging: {
      prev: '23',
    },
    lg: 'A5W:13:17,WDW,ELT,3GL',
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
      <HeaderJump source='asa-ki-var' max={24} title={bani.name.Guru} />
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
        prevLink={bani.paging?.prev && `/asa-ki-var/${bani.paging?.prev}`}
        nextLink={bani.paging?.next && `/asa-ki-var/${bani.paging?.next}`}
      >
        <JumpButton source='asa-ki-var' max={24} />
      </BottomBar>
    </article>
  );
});
