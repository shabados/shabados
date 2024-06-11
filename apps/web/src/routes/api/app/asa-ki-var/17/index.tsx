import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 17)',
    roman: 'Āsā kī vār (chakkā 17)',
  },
  paging: {
    previous: 'asa-ki-var/16',
    next: 'asa-ki-var/18',
  },
  data: [
    {
      id: '3V1U',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ॥',
      pronunciation: 'āsā mahalā 4 ‖',
      translation: 'Aasaa, Fourth Mehl:',
    },
    {
      id: 'WKCP',
      src: 'ਜਿਨ ਅੰਤਰਿ. ਹਰਿ ਹਰਿ ਪ੍ਰੀਤਿ ਹੈ; ਤੇ ਜਨ. ਸੁਘੜ ਸਿਆਣੇ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jin añtari. har har prīt hē; te jan. sughaṛ siāṇe. rām rāje ‖',
      translation:
        'Those whose hearts are filled with the love of the Lord, Har, Har, are the wisest and most clever people, O Lord King.',
    },
    {
      id: 'ABA2',
      src: 'ਜੇ ਬਾਹਰਹੁ. ਭੁਲਿ ਚੁਕਿ ਬੋਲਦੇ; ਭੀ ਖਰੇ ਹਰਿ ਭਾਣੇ ॥',
      pronunciation: 'je bāharahu. bhul cuk bolade; bhī khare har bhāṇe ‖',
      translation:
        'Even if they misspeak outwardly, they are still very pleasing to the Lord.',
    },
    {
      id: 'WSN8',
      src: 'ਹਰਿ ਸੰਤਾ ਨੋ ਹੋਰੁ ਥਾਉ ਨਾਹੀ; ਹਰਿ ਮਾਣੁ ਨਿਮਾਣੇ ॥',
      pronunciation: 'har sañtā no hor thāu nāhī; har māṇ nimāṇe ‖',
      translation:
        "The Lord's Saints have no other place. The Lord is the honor of the dishonored.",
    },
    {
      id: '48DL',
      src: 'ਜਨ ਨਾਨਕ. ਨਾਮੁ ਦੀਬਾਣੁ ਹੈ; ਹਰਿ ਤਾਣੁ ਸਤਾਣੇ ॥੧॥',
      pronunciation: 'jan nānak. nām dībāṇ hē; har tāṇ satāṇe ‖1‖',
      translation:
        "The Naam, the Name of the Lord, is the Royal Court for servant Nanak; the Lord's power is his only power. ||1||",
    },
    {
      id: '3C6A',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'ZLUT',
      src: 'ਜੇ ਮੋਹਾਕਾ ਘਰੁ ਮੁਹੈ; ਘਰੁ ਮੁਹਿ, ਪਿਤਰੀ ਦੇਇ ॥',
      pronunciation: 'je mohākā ghar muhē; ghar muhi, pitarī dei ‖',
      translation:
        'The thief robs a house, and offers the stolen goods to his ancestors.',
    },
    {
      id: 'JA34',
      src: 'ਅਗੈ. ਵਸਤੁ ਸਿਞਾਣੀਐ ਪਿਤਰੀ; ਚੋਰ ਕਰੇਇ ॥',
      pronunciation: 'agē. wasat siñāṇīē pitarī; cor karei ‖',
      translation:
        'In the world hereafter, this is recognized, and his ancestors are considered thieves as well.',
    },
    {
      id: '1TEM',
      src: 'ਵਢੀਅਹਿ ਹਥ ਦਲਾਲ ਕੇ; ਮੁਸਫੀ ਏਹ ਕਰੇਇ ॥',
      pronunciation: 'waḍhīah hath dalāl ke; musaphī eh karei ‖',
      translation:
        "The hands of the go-between are cut off; this is the Lord's justice.",
    },
    {
      id: '1XQH',
      src: 'ਨਾਨਕ. ਅਗੈ ਸੋ ਮਿਲੈ; ਜਿ ਖਟੇ ਘਾਲੇ ਦੇਇ ॥੧॥',
      pronunciation: 'nānak. agē so milē; ja khaṭe ghāle dei ‖1‖',
      translation:
        'O Nanak, in the world hereafter, that alone is received, which one gives to the needy from his own earnings and labor. ||1||',
    },
    {
      id: 'ZKCV',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '1QA2',
      src: 'ਜਿਉ ਜੋਰੂ ਸਿਰਨਾਵਣੀ; ਆਵੈ ਵਾਰੋ ਵਾਰ ॥',
      pronunciation: 'jiu jorū siranāwaṇī; āvē vāro vār ‖',
      translation: 'As a woman has her periods, month after month,',
    },
    {
      id: '5JRK',
      src: 'ਜੂਠੇ ਜੂਠਾ ਮੁਖਿ ਵਸੈ; ਨਿਤ ਨਿਤ ਹੋਇ ਖੁਆਰੁ ॥',
      pronunciation: 'jūṭhe jūṭhā mukh wasē; nit nit hoi khuār ‖',
      translation:
        'so does falsehood dwell in the mouth of the false; they suffer forever, again and again.',
    },
    {
      id: '2QE0',
      src: 'ਸੂਚੇ ਏਹਿ. ਨ ਆਖੀਅਹਿ; ਬਹਨਿ ਜਿ ਪਿੰਡਾ ਧੋਇ ॥',
      pronunciation: 'sūce ehi. na ākhīahi; bahan ja piñḍā dhoi ‖',
      translation:
        'They are not called pure, who sit down after merely washing their bodies.',
    },
    {
      id: '4Z4G',
      src: 'ਸੂਚੇ ਸੇਈ ਨਾਨਕਾ; ਜਿਨ ਮਨਿ ਵਸਿਆ ਸੋਇ ॥੨॥',
      pronunciation: 'sūce seī nānakā; jin man wasiā soi ‖2‖',
      translation:
        'Only they are pure, O Nanak, within whose minds the Lord abides. ||2||',
    },
    {
      id: 'GCEA',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'CQM8',
      src: 'ਤੁਰੇ ਪਲਾਣੇ ਪਉਣ ਵੇਗ; ਹਰ ਰੰਗੀ ਹਰਮ ਸਵਾਰਿਆ ॥',
      pronunciation: 'ture palāṇe pauṇ veg; har rañgī haram savāriā ‖',
      translation:
        'With saddled horses, as fast as the wind, and harems decorated in every way;',
    },
    {
      id: 'WELA',
      src: 'ਕੋਠੇ ਮੰਡਪ ਮਾੜੀਆ; ਲਾਇ ਬੈਠੇ ਕਰਿ ਪਾਸਾਰਿਆ ॥',
      pronunciation: 'koṭhe mañḍap māṛīā; lāi bēṭhe kar pāsāriā ‖',
      translation:
        'in houses and pavilions and lofty mansions, they dwell, making ostentatious shows.',
    },
    {
      id: '0LZA',
      src: 'ਚੀਜ ਕਰਨਿ ਮਨਿ ਭਾਵਦੇ; ਹਰਿ ਬੁਝਨਿ ਨਾਹੀ. ਹਾਰਿਆ ॥',
      pronunciation: 'cīj karan man bhāwade; har bujhan nāhī. hāriā ‖',
      translation:
        "They act out their minds' desires, but they do not understand the Lord, and so they are ruined.",
    },
    {
      id: '80WA',
      src: 'ਕਰਿ ਫੁਰਮਾਇਸਿ ਖਾਇਆ; ਵੇਖਿ ਮਹਲਤਿ. ਮਰਣੁ ਵਿਸਾਰਿਆ ॥',
      pronunciation: 'kar phuramāis khāiā; vekh mahalati. maraṇ visāriā ‖',
      translation:
        'Asserting their authority, they eat, and beholding their mansions, they forget about death.',
    },
    {
      id: '8G3M',
      src: 'ਜਰੁ ਆਈ; ਜੋਬਨਿ ਹਾਰਿਆ ॥੧੭॥',
      pronunciation: 'jar āī; joban hāriā ‖17‖',
      translation: 'But old age comes, and youth is lost. ||17||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
