import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 3)',
    roman: 'Āsā kī vār (chakkā 3)',
  },
  paging: {
    previous: 'asa-ki-var/2',
    next: 'asa-ki-var/4',
  },
  data: [
    {
      id: 'FSJ9',
      src: 'ਹਮ ਮੂਰਖ ਮੁਗਧ ਸਰਣਾਗਤੀ; ਮਿਲੁ ਗੋਵਿੰਦ ਰੰਗਾ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'ham mūrakh mugadh saraṇāgatī; mil goviñd rañgā, rām rāje ‖',
      translation:
        'I am foolish and ignorant, but I have taken to His Sanctuary; may I merge in the Love of the Lord of the Universe, O Lord King.',
    },
    {
      id: 'DW5K',
      src: 'ਗੁਰਿ ਪੂਰੈ ਹਰਿ ਪਾਇਆ; ਹਰਿ ਭਗਤਿ ਇਕ ਮੰਗਾ ॥',
      pronunciation: 'gur pūrē har pāiā; har bhagat ik mañgā ‖',
      translation:
        'Through the Perfect Guru, I have obtained the Lord, and I beg for the one blessing of devotion to the Lord.',
    },
    {
      id: 'YTAB',
      src: 'ਮੇਰਾ ਮਨੁ ਤਨੁ. ਸਬਦਿ ਵਿਗਾਸਿਆ; ਜਪਿ ਅਨਤ ਤਰੰਗਾ ॥',
      pronunciation: 'merā man tanu. sabad vigāsiā; jap anat tarañgā ‖',
      translation:
        'My mind and body blossom forth through the Word of the Shabad; I meditate on the Lord of infinite waves.',
    },
    {
      id: 'QZ8P',
      src: 'ਮਿਲਿ ਸੰਤ ਜਨਾ. ਹਰਿ ਪਾਇਆ; ਨਾਨਕ. ਸਤਸੰਗਾ ॥੩॥',
      pronunciation: 'mil sañt janā. har pāiā; nānak. satasañgā ‖3‖',
      translation:
        'Meeting with the humble Saints, Nanak finds the Lord, in the Sat Sangat, the True Congregation. ||3||',
    },
    {
      id: 'SDZS',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'B2L5',
      src: 'ਵਿਸਮਾਦੁ ਨਾਦ; ਵਿਸਮਾਦੁ ਵੇਦ ॥',
      pronunciation: 'visamād nād; visamād ved ‖',
      translation:
        'Wonderful is the sound current of the Naad, wonderful is the knowledge of the Vedas.',
    },
    {
      id: 'QCAE',
      src: 'ਵਿਸਮਾਦੁ ਜੀਅ; ਵਿਸਮਾਦੁ ਭੇਦ ॥',
      pronunciation: 'visamād jīa; visamād bhed ‖',
      translation: 'Wonderful are the beings, wonderful are the species.',
    },
    {
      id: 'CJLJ',
      src: 'ਵਿਸਮਾਦੁ ਰੂਪ; ਵਿਸਮਾਦੁ ਰੰਗ ॥',
      pronunciation: 'visamād rūp; visamād rañg ‖',
      translation: 'Wonderful are the forms, wonderful are the colors.',
    },
    {
      id: '2TJJ',
      src: 'ਵਿਸਮਾਦੁ; ਨਾਗੇ ਫਿਰਹਿ ਜੰਤ ॥',
      pronunciation: 'visamādu; nāge phirah jañt ‖',
      translation: 'Wonderful are the beings who wander around naked.',
    },
    {
      id: 'YUXF',
      src: 'ਵਿਸਮਾਦੁ ਪਉਣੁ; ਵਿਸਮਾਦੁ ਪਾਣੀ ॥',
      pronunciation: 'visamād pauṇu; visamād pāṇī ‖',
      translation: 'Wonderful is the wind, wonderful is the water.',
    },
    {
      id: '6FXQ',
      src: 'ਵਿਸਮਾਦੁ ਅਗਨੀ; ਖੇਡਹਿ ਵਿਡਾਣੀ ॥',
      pronunciation: 'visamād aganī; kheḍah viḍāṇī ‖',
      translation: 'Wonderful is fire, which works wonders.',
    },
    {
      id: 'UJ48',
      src: 'ਵਿਸਮਾਦੁ ਧਰਤੀ; ਵਿਸਮਾਦੁ ਖਾਣੀ ॥',
      pronunciation: 'visamād dharatī; visamād khāṇī ‖',
      translation: 'Wonderful is the earth, wonderful the sources of creation.',
    },
    {
      id: 'RS37',
      src: 'ਵਿਸਮਾਦੁ; ਸਾਦਿ ਲਗਹਿ ਪਰਾਣੀ ॥',
      pronunciation: 'visamādu; sād lagah parāṇī ‖',
      translation: 'Wonderful are the tastes to which mortals are attached.',
    },
    {
      id: 'H9QC',
      src: 'ਵਿਸਮਾਦੁ ਸੰਜੋਗੁ; ਵਿਸਮਾਦੁ ਵਿਜੋਗੁ ॥',
      pronunciation: 'visamād sañjogu; visamād vijog ‖',
      translation: 'Wonderful is union, and wonderful is separation.',
    },
    {
      id: 'GR0R',
      src: 'ਵਿਸਮਾਦੁ ਭੁਖ; ਵਿਸਮਾਦੁ ਭੋਗੁ ॥',
      pronunciation: 'visamād bhukh; visamād bhog ‖',
      translation: 'Wonderful is hunger, wonderful is satisfaction.',
    },
    {
      id: '2MP6',
      src: 'ਵਿਸਮਾਦੁ ਸਿਫਤਿ; ਵਿਸਮਾਦੁ ਸਾਲਾਹ ॥',
      pronunciation: 'visamād siphati; visamād sālāh ‖',
      translation: 'Wonderful is His Praise, wonderful is His adoration.',
    },
    {
      id: '6PMX',
      src: 'ਵਿਸਮਾਦੁ ਉਝੜ; ਵਿਸਮਾਦੁ ਰਾਹ ॥',
      pronunciation: 'visamād ujhaṛ; visamād rāh ‖',
      translation: 'Wonderful is the wilderness, wonderful is the path.',
    },
    {
      id: 'XNJM',
      src: 'ਵਿਸਮਾਦੁ ਨੇੜੈ; ਵਿਸਮਾਦੁ ਦੂਰਿ ॥',
      pronunciation: 'visamād neṛē; visamād dūr ‖',
      translation: 'Wonderful is closeness, wonderful is distance.',
    },
    {
      id: 'CP34',
      src: 'ਵਿਸਮਾਦੁ; ਦੇਖੈ ਹਾਜਰਾ ਹਜੂਰਿ ॥',
      pronunciation: 'visamādu; dekhē hājarā hajūr ‖',
      translation: 'How wonderful to behold the Lord, ever-present here.',
    },
    {
      id: 'G06H',
      src: 'ਵੇਖਿ ਵਿਡਾਣੁ; ਰਹਿਆ ਵਿਸਮਾਦੁ ॥',
      pronunciation: 'vekh viḍāṇu; rahiā visamād ‖',
      translation: 'Beholding His wonders, I am wonder-struck.',
    },
    {
      id: 'LJUJ',
      src: 'ਨਾਨਕ. ਬੁਝਣੁ; ਪੂਰੈ ਭਾਗਿ ॥੧॥',
      pronunciation: 'nānak. bujhaṇu; pūrē bhāg ‖1‖',
      translation:
        'O Nanak, those who understand this are blessed with perfect destiny. ||1||',
    },
    {
      id: '86PX',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'HPV2',
      src: 'ਕੁਦਰਤਿ ਦਿਸੈ. ਕੁਦਰਤਿ ਸੁਣੀਐ; ਕੁਦਰਤਿ. ਭਉ ਸੁਖ ਸਾਰੁ ॥',
      pronunciation: 'kudarat disē. kudarat suṇīē; kudarati. bhau sukh sār ‖',
      translation:
        'By His Power we see, by His Power we hear; by His Power we have fear, and the essence of happiness.',
    },
    {
      id: '2BTN',
      src: 'ਕੁਦਰਤਿ ਪਾਤਾਲੀ ਆਕਾਸੀ; ਕੁਦਰਤਿ ਸਰਬ ਆਕਾਰੁ ॥',
      pronunciation: 'kudarat pātālī ākāsī; kudarat sarab ākār ‖',
      translation:
        'By His Power the nether worlds exist, and the Akaashic ethers; by His Power the entire creation exists.',
    },
    {
      id: '3LQ2',
      src: 'ਕੁਦਰਤਿ ਵੇਦ ਪੁਰਾਣ ਕਤੇਬਾ; ਕੁਦਰਤਿ ਸਰਬ ਵੀਚਾਰੁ ॥',
      pronunciation: 'kudarat ved purāṇ katebā; kudarat sarab vīcār ‖',
      translation:
        'By His Power the Vedas and the Puraanas exist, and the Holy Scriptures of the Jewish, Christian and Islamic religions. By His Power all deliberations exist.',
    },
    {
      id: '9WJ5',
      src: 'ਕੁਦਰਤਿ ਖਾਣਾ ਪੀਣਾ ਪੈਨੑਣੁ; ਕੁਦਰਤਿ ਸਰਬ ਪਿਆਰੁ ॥',
      pronunciation: 'kudarat khāṇā pīṇā pēnaṇu; kudarat sarab piār ‖',
      translation:
        'By His Power we eat, drink and dress; by His Power all love exists.',
    },
    {
      id: '31JA',
      src: 'ਕੁਦਰਤਿ ਜਾਤੀ ਜਿਨਸੀ ਰੰਗੀ; ਕੁਦਰਤਿ ਜੀਅ ਜਹਾਨ ॥',
      pronunciation: 'kudarat jātī jinasī rañgī; kudarat jīa jahān ‖',
      translation:
        '- By His Power come the species of all kinds and colors; by His Power the living beings of the world exist.',
    },
    {
      id: 'TXG2',
      src: 'ਕੁਦਰਤਿ ਨੇਕੀਆ. ਕੁਦਰਤਿ ਬਦੀਆ; ਕੁਦਰਤਿ ਮਾਨੁ ਅਭਿਮਾਨੁ ॥',
      pronunciation: 'kudarat nekīā. kudarat badīā; kudarat mān abhimān ‖',
      translation:
        'By His Power virtues exist, and by His Power vices exist. By His Power come honor and dishonor.',
    },
    {
      id: 'R5T7',
      src: 'ਕੁਦਰਤਿ ਪਉਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ; ਕੁਦਰਤਿ ਧਰਤੀ ਖਾਕੁ ॥',
      pronunciation: 'kudarat pauṇ pāṇī bēsañtaru; kudarat dharatī khāk ‖',
      translation:
        'By His Power wind, water and fire exist; by His Power earth and dust exist.',
    },
    {
      id: 'TJUE',
      src: 'ਸਭ ਤੇਰੀ ਕੁਦਰਤਿ, ਤੂੰ ਕਾਦਿਰੁ ਕਰਤਾ; ਪਾਕੀ ਨਾਈ ਪਾਕੁ ॥',
      pronunciation: 'sabh terī kudarati, tūñ kādir karatā; pākī nāī pāk ‖',
      translation:
        'Everything is in Your Power, Lord; You are the all-powerful Creator. Your Name is the Holiest of the Holy.',
    },
    {
      id: 'ZU0T',
      src: 'ਨਾਨਕ. ਹੁਕਮੈ ਅੰਦਰਿ ਵੇਖੈ; ਵਰਤੈ ਤਾਕੋ ਤਾਕੁ ॥੨॥',
      pronunciation: 'nānak. hukamē añdar vekhē; waratē tāko tāk ‖2‖',
      translation:
        'O Nanak, through the Command of His Will, He beholds and pervades the creation; He is absolutely unrivalled. ||2||',
    },
    {
      id: 'XFHQ',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'EGUF',
      src: 'ਆਪੀਨੑੈ ਭੋਗ ਭੋਗਿ ਕੈ; ਹੋਇ ਭਸਮੜਿ, ਭਉਰੁ ਸਿਧਾਇਆ ॥',
      pronunciation: 'āpīnē bhog bhog kē; hoi bhasamaṛi, bhaur sidhāiā ‖',
      translation:
        'Enjoying his pleasures, one is reduced to a pile of ashes, and the soul passes away.',
    },
    {
      id: 'TD8H',
      src: 'ਵਡਾ ਹੋਆ ਦੁਨੀਦਾਰੁ; ਗਲਿ ਸੰਗਲੁ ਘਤਿ, ਚਲਾਇਆ ॥',
      pronunciation: 'waḍā hoā dunīdāru; gal sañgal ghati, calāiā ‖',
      translation:
        'He may be great, but when he dies, the chain is thrown around his neck, and he is led away.',
    },
    {
      id: 'XM1T',
      src: 'ਅਗੈ ਕਰਣੀ ਕੀਰਤਿ ਵਾਚੀਐ; ਬਹਿ ਲੇਖਾ ਕਰਿ ਸਮਝਾਇਆ ॥',
      pronunciation: 'agē karaṇī kīrat vācīē; bah lekhā kar samajhāiā ‖',
      translation:
        'There, his good and bad deeds are added up; sitting there, his account is read.',
    },
    {
      id: 'W315',
      src: 'ਥਾਉ ਨ ਹੋਵੀ. ਪਉਦੀਈ; ਹੁਣਿ ਸੁਣੀਐ ਕਿਆ ਰੂਆਇਆ ॥',
      pronunciation: 'thāu na hovī. paudīī; huṇ suṇīē kiā rūāiā ‖',
      translation:
        'He is whipped, but finds no place of rest, and no one hears his cries of pain.',
    },
    {
      id: 'LLCH',
      src: 'ਮਨਿ ਅੰਧੈ; ਜਨਮੁ ਗਵਾਇਆ ॥੩॥',
      pronunciation: 'man añdhē; janam gavāiā ‖3‖',
      translation: 'The blind man has wasted his life away. ||3||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
