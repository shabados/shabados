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
  'jap-ji-sahib': {
    name: {
      Guru: 'ਜਪੁ ਜੀ ਸਾਹਿਬ',
      Latn: 'Jap Jī Sāhib',
    },
    paging: {
      next: 'jap-sahib',
    },
    lg: 'DMP,LLL,ZKH,V2A,ZF2,6UA,MUY,2CT,EWS,4AZ,CQX,7XM,MET,B09,HN6,CXN,2VK,0HP,17Z,T6J,1ZF,345,EJT,DD0,KP5,LCC,F7J,DJQ,EG0,ELX,J2V,5XX,A8N,F40,8MC,L9B,GCL,KR0,BB8',
  },
  'jap-sahib': {
    name: {
      Guru: 'ਜਾਪੁ ਸਾਹਿਬ',
      Latn: 'Jāp Sāhib',
    },
    paging: {
      prev: 'jap-ji-sahib',
      next: 'twa-prasad-swaye',
    },
    lg: 'KKH,QED,GYT,K6W,HJR,LDD,VJA,8MW,NE0,WQ6,0N5,2C7,BN0,SS2,9F0,KSP,LFH,ABN,8Y8,F0D,GF1,CEE',
  },
  'twa-prasad-swaye': {
    name: {
      Guru: 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ (ਸ੍ਰਾਵਗ ਸੁਧ)',
      Latn: 'Twa-Prasād Swaye (Sravg Sudh)',
    },
    paging: {
      prev: 'jap-sahib',
      next: 'kabyo-bac-benti-copai',
    },
    lg: 'D6Z:0:1,D6Z:2:3,CG2',
  },
  'kabyo-bac-benti-copai': {
    name: {
      Guru: 'ਕਬਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ',
      Latn: 'Kabyo Bāc Bentī Cōpaī',
    },
    paging: {
      prev: 'twa-prasad-swaye',
      next: 'anand-sahib',
    },
    lg: 'MJN:0:1,MJN:3:4,0VC::-8',
  },
  'anand-sahib': {
    name: {
      Guru: 'ਅਨੰਦੁ ਸਾਹਿਬ',
      Latn: 'Anañd Sāhib',
    },
    paging: {
      prev: 'kabyo-bac-benti-copai',
      next: 'ardas',
    },
    lg: 'TUY',
  },
  ardas: {
    name: {
      Guru: 'ਅਰਦਾਸ',
      Latn: 'Ardās',
    },
    lg: '5YD,CSQ,843,SGB,BG6,MTS,35M,ANX,08P,83K',
  },
  'rehras-sahib': {
    name: {
      Guru: 'ਰਹਰਾਸਿ ਸਾਹਿਬ',
      Latn: 'Rēhrās Sāhib',
    },
    paging: {
      next: 'ardas',
    },
    lg: 'A5W:-4,KQK,4CW,9UG,SPX,DYZ,38V,823,8GT,JHX,919,MJN:0:1,MJN:3:4,0VC::-8,VNG,78Q::-1,TUY::28,TUY:-6,A3M,BWP,0Q9,EUW:2,A9Y',
  },
  'kirtan-sohila': {
    name: {
      Guru: 'ਕੀਰਤਨ ਸੋਹਿਲਾ',
      Latn: 'Kīrtan Sohila',
    },
    paging: {
      next: 'ardas',
    },
    lg: 'GPZ,FVA,AQF,G43,J0L',
  },
  'akal-ustat': {
    name: {
      Guru: 'ਅਕਾਲ ਉਸਤਤ',
      Latn: 'Akal Ustat',
    },
    lg: 'D6Z',
  },
  alahnia: {
    name: {
      Guru: 'ਅਲਾਹਣੀਆ (ਸੋਗ ਦਾ ਗੀਤ)',
      Latn: 'Alahnia (Songs of Grief)',
    },
    lg: 'UMY,K5U,F5P,EHA,6P3',
  },
  'anand-sahib-salok': {
    name: {
      Guru: 'ਅਨੰਦੁ ਸਾਹਿਬ (੬ ਪਉੜੀਆਂ ਅਤੇ ਸਲੋਕੁ)',
      Latn: 'Anand Sahib (6 Pauris and Salok)',
    },
    lg: 'TUY::28,TUY:-6,BB8',
  },
  arti: {
    name: {
      Guru: 'ਆਰਤੀ',
      Latn: 'Aarti',
    },
    lg: '',
  },
  'arti-longer': {
    name: {
      Guru: 'ਵੱਡੀ ਆਰਤੀ',
      Latn: 'Aarti (Longer)',
    },
    lg: '',
  },
  'barah-maha': {
    name: {
      Guru: 'ਬਾਰਹ ਮਾਹਾ',
      Latn: 'Barah Maha',
    },
    lg: '',
  },
  'bavan-akhri': {
    name: {
      Guru: 'ਬਾਵਨ ਅਖਰੀ',
      Latn: 'Bavan Akhri',
    },
    lg: '',
  },
  'candi-di-var': {
    name: {
      Guru: 'ਚੰਡੀ ਦੀ ਵਾਰ',
      Latn: 'Chandi Di Var',
    },
    lg: '',
  },
  'lavan-anand-karaj': {
    name: {
      Guru: 'ਲਾਵਾਂ (ਅਨੰਦ ਕਾਰਜ)',
      Latn: 'Lavan (Anand Karaj)',
    },
    lg: '',
  },
  'sggs-bhog': {
    name: {
      Guru: 'ਸਲੋਕ ਮਹਲਾ ੯ - ਮੁੰਦਾਵਣੀ ਮਹਲਾ ੫',
      Latn: 'Salok Mehla 9 - Mundavni Mehla 5)',
    },
    lg: 'P6W,VBH,LK1,AZJ,0GD,DAD,LY5,0LS,Q57,005,DUX,PUE,CZJ,JXN,65F,0Q1,9F6,27M,CMC,64J,HDS,H0V,HSA,NXY,BFA,22M,TWV,KSM,GTA,3SS,AZG,9V5,F0F,DFV,8Z0,U7H,W99,K5H,7R7,Y10,JWA,0W2,YXU,227,JR8,HW6,KPG,ZMN,4LF,81M,3GE,YSS,C5W,FRU,CFK,539,606,A3M,BWP',
  },
  ragmala: {
    name: {
      Guru: 'ਰਾਗਮਾਲਾ',
      Latn: 'Ragmala',
    },
    lg: 'FD3',
  },
  '': {
    name: {
      Guru: 'ਓਅੰਕਾਰੁ',
      Latn: 'Oankaar',
    },
    lg: '',
  },
  '': {
    name: {
      Guru: 'ਰਾਮਕਲੀ ਸਦੁ',
      Latn: 'Raamkali Sad',
    },
    lg: '',
  },
  '': {
    name: {
      Guru: 'ਸਿਧ ਗੋਸਟਿ',
      Latn: 'Sidh Gosht',
    },
    lg: '',
  },
  '': {
    name: {
      Guru: 'ਸ਼ਬਦ ਹਜ਼ਾਰੇ ਪਾਤਿਸ਼ਾਹੀ ੧੦',
      Latn: 'Shabad Hazare Patshahi 10',
    },
    lg: '',
  },
  '': {
    name: {
      Guru: 'ਸ਼ਬਦ ਹਜ਼ਾਰੇ',
      Latn: 'Shabad Hazare',
    },
    lg: '',
  },
  '': {
    name: {
      Guru: 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸ੍ਵਯੇ (ਦੀਨਨ ਕੀ)',
      Latn: 'Tav Prasad Savaiye (Deenan Ki)',
    },
    lg: '',
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
        prevLink={bani.paging?.prev && `/${bani.paging?.prev}`}
        nextLink={bani.paging?.next && `/${bani.paging?.next}`}
      />
    </article>
  );
});
