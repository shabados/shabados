import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 22)',
    roman: 'Āsā kī vār (chakkā 22)',
  },
  paging: {
    previous: 'asa-ki-var/21',
    next: 'asa-ki-var/23',
  },
  data: [
    {
      id: '5F4S',
      src: 'ਜਿਨੀ ਗੁਰਮੁਖਿ ਨਾਮੁ ਧਿਆਇਆ; ਤਿਨਾ ਫਿਰਿ ਬਿਘਨੁ. ਨ ਹੋਈ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jinī guramukh nām dhiāiā; tinā phir bighanu. na hoī, rām rāje ‖',
      translation:
        'Those who, as Gurmukh, meditate on the Naam, meet no obstacles in their path, O Lord King.',
    },
    {
      id: '61R0',
      src: 'ਜਿਨੀ ਸਤਿਗੁਰੁ ਪੁਰਖੁ ਮਨਾਇਆ; ਤਿਨ ਪੂਜੇ ਸਭੁ ਕੋਈ ॥',
      pronunciation: 'jinī satigur purakh manāiā; tin pūje sabh koī ‖',
      translation:
        'Those who are pleasing to the almighty True Guru are worshipped by everyone.',
    },
    {
      id: 'DJXD',
      src: 'ਜਿਨੑੀ ਸਤਿਗੁਰੁ ਪਿਆਰਾ ਸੇਵਿਆ; ਤਿਨੑਾ ਸੁਖੁ ਸਦ ਹੋਈ ॥',
      pronunciation: 'jinī satigur piārā seviā; tinā sukh sad hoī ‖',
      translation:
        'Those who serve their Beloved True Guru obtain eternal peace.',
    },
    {
      id: '3MWN',
      src: 'ਜਿਨੑਾ ਨਾਨਕੁ. ਸਤਿਗੁਰੁ ਭੇਟਿਆ; ਤਿਨੑਾ ਮਿਲਿਆ ਹਰਿ ਸੋਈ ॥੨॥',
      pronunciation: 'jinā nānaku. satigur bheṭiā; tinā miliā har soī ‖2‖',
      translation:
        'Those who meet the True Guru, O Nanak - the Lord Himself meets them. ||2||',
    },
    {
      id: 'ARG7',
      src: 'ਸਲੋਕੁ ਮਹਲਾ ੨ ॥',
      pronunciation: 'salok mahalā 2 ‖',
      translation: 'Salok, Second Mehl:',
    },
    {
      id: 'WMYY',
      src: 'ਚਾਕਰੁ ਲਗੈ ਚਾਕਰੀ; ਨਾਲੇ ਗਾਰਬੁ ਵਾਦੁ ॥',
      pronunciation: 'cākar lagē cākarī; nāle gārab vād ‖',
      translation:
        'If a servant performs service, while being vain and argumentative,',
    },
    {
      id: 'BAA0',
      src: 'ਗਲਾ ਕਰੇ ਘਣੇਰੀਆ; ਖਸਮ. ਨ ਪਾਏ ਸਾਦੁ ॥',
      pronunciation: 'galā kare ghaṇerīā; khasam. na pāe sād ‖',
      translation:
        'he may talk as much as he wants, but he shall not be pleasing to his Master.',
    },
    {
      id: '6TUY',
      src: 'ਆਪੁ ਗਵਾਇ ਸੇਵਾ ਕਰੇ; ਤਾ ਕਿਛੁ ਪਾਏ ਮਾਨੁ ॥',
      pronunciation: 'āp gavāi sevā kare; tā kich pāe mān ‖',
      translation:
        'But if he eliminates his self-conceit and then performs service, he shall be honored.',
    },
    {
      id: 'Z2PQ',
      src: 'ਨਾਨਕ. ਜਿਸ ਨੋ ਲਗਾ ਤਿਸੁ ਮਿਲੈ; ਲਗਾ ਸੋ ਪਰਵਾਨੁ ॥੧॥',
      pronunciation: 'nānak. jis no lagā tis milē; lagā so paravān ‖1‖',
      translation:
        'O Nanak, if he merges with the one with whom he is attached, his attachment becomes acceptable. ||1||',
    },
    {
      id: '7C2Q',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'SLG9',
      src: 'ਜੋ ਜੀਇ ਹੋਇ ਸੁ ਉਗਵੈ; ਮੁਹ ਕਾ ਕਹਿਆ ਵਾਉ ॥',
      pronunciation: 'jo jīi hoi sa ugavē; muh kā kahiā vāu ‖',
      translation:
        'Whatever is in the mind, comes forth; spoken words by themselves are just wind.',
    },
    {
      id: 'JGHG',
      src: 'ਬੀਜੇ ਬਿਖੁ ਮੰਗੈ ਅੰਮ੍ਰਿਤੁ; ਵੇਖਹੁ ਏਹੁ ਨਿਆਉ ॥੨॥',
      pronunciation: 'bīje bikh mañgē añmritu; vekhah eh niāu ‖2‖',
      translation:
        'He sows seeds of poison, and demands Ambrosial Nectar. Behold - what justice is this? ||2||',
    },
    {
      id: 'W4SR',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'DX3G',
      src: 'ਨਾਲਿ ਇਆਣੇ ਦੋਸਤੀ; ਕਦੇ. ਨ ਆਵੈ ਰਾਸਿ ॥',
      pronunciation: 'nāl iāṇe dosatī; kade. na āvē rās ‖',
      translation: 'Friendship with a fool never works out right.',
    },
    {
      id: '8G5S',
      src: 'ਜੇਹਾ ਜਾਣੈ. ਤੇਹੋ ਵਰਤੈ; ਵੇਖਹੁ ਕੋ ਨਿਰਜਾਸਿ ॥',
      pronunciation: 'jehā jāṇē. teho waratē; vekhah ko nirajās ‖',
      translation: 'As he knows, he acts; behold, and see that it is so.',
    },
    {
      id: 'UZGW',
      src: 'ਵਸਤੂ ਅੰਦਰਿ. ਵਸਤੁ ਸਮਾਵੈ; ਦੂਜੀ ਹੋਵੈ ਪਾਸਿ ॥',
      pronunciation: 'wasatū añdari. wasat samāvē; dūjī hovē pās ‖',
      translation:
        'One thing can be absorbed into another thing, but duality keeps them apart.',
    },
    {
      id: '8HUH',
      src: 'ਸਾਹਿਬ ਸੇਤੀ. ਹੁਕਮੁ ਨ ਚਲੈ; ਕਹੀ ਬਣੈ ਅਰਦਾਸਿ ॥',
      pronunciation: 'sāhib setī. hukam na calē; kahī baṇē aradās ‖',
      translation:
        'No one can issue commands to the Lord Master; offer instead humble prayers.',
    },
    {
      id: 'VVP3',
      src: 'ਕੂੜਿ ਕਮਾਣੈ. ਕੂੜੋ ਹੋਵੈ; ਨਾਨਕ. ਸਿਫਤਿ ਵਿਗਾਸਿ ॥੩॥',
      pronunciation: 'kūṛ kamāṇē. kūṛo hovē; nānak. siphat vigās ‖3‖',
      translation:
        "Practicing falsehood, only falsehood is obtained. O Nanak, through the Lord's Praise, one blossoms forth. ||3||",
    },
    {
      id: '0MR2',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'RWSZ',
      src: 'ਨਾਲਿ ਇਆਣੇ ਦੋਸਤੀ; ਵਡਾਰੂ ਸਿਉ ਨੇਹੁ ॥',
      pronunciation: 'nāl iāṇe dosatī; waḍārū siu neh ‖',
      translation: 'Friendship with a fool, and love with a pompous person,',
    },
    {
      id: 'T6AN',
      src: 'ਪਾਣੀ ਅੰਦਰਿ ਲੀਕ ਜਿਉ; ਤਿਸ ਦਾ ਥਾਉ ਨ ਥੇਹੁ ॥੪॥',
      pronunciation: 'pāṇī añdar līk jiu; tis dā thāu na theh ‖4‖',
      translation:
        'are like lines drawn in water, leaving no trace or mark. ||4||',
    },
    {
      id: 'VQVH',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: '8263',
      src: 'ਹੋਇ ਇਆਣਾ ਕਰੇ ਕੰਮੁ; ਆਣਿ ਨ ਸਕੈ ਰਾਸਿ ॥',
      pronunciation: 'hoi iāṇā kare kañmu; āṇ na sakē rās ‖',
      translation: 'If a fool does a job, he cannot do it right.',
    },
    {
      id: 'MRCL',
      src: 'ਜੇ ਇਕ ਅਧ ਚੰਗੀ ਕਰੇ; ਦੂਜੀ ਭੀ ਵੇਰਾਸਿ ॥੫॥',
      pronunciation: 'je ik adh cañgī kare; dūjī bhī verās ‖5‖',
      translation:
        'Even if he does something right, he does the next thing wrong. ||5||',
    },
    {
      id: '84LK',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'RW0R',
      src: 'ਚਾਕਰੁ ਲਗੈ ਚਾਕਰੀ; ਜੇ ਚਲੈ ਖਸਮੈ ਭਾਇ ॥',
      pronunciation: 'cākar lagē cākarī; je calē khasamē bhāi ‖',
      translation:
        'If a servant, performing service, obeys the Will of his Master,',
    },
    {
      id: 'EBL1',
      src: 'ਹੁਰਮਤਿ ਤਿਸ ਨੋ ਅਗਲੀ; ਓਹੁ ਵਜਹੁ ਭਿ ਦੂਣਾ ਖਾਇ ॥',
      pronunciation: 'huramat tis no agalī; oh wajah bha dūṇā khāi ‖',
      translation: 'his honor increases, and he receives double his wages.',
    },
    {
      id: 'S169',
      src: 'ਖਸਮੈ ਕਰੇ ਬਰਾਬਰੀ; ਫਿਰਿ ਗੈਰਤਿ ਅੰਦਰਿ ਪਾਇ ॥',
      pronunciation: 'khasamē kare barābarī; phir gērat añdar pāi ‖',
      translation:
        "But if he claims to be equal to his Master, he earns his Master's displeasure.",
    },
    {
      id: '7APQ',
      src: 'ਵਜਹੁ ਗਵਾਏ ਅਗਲਾ; ਮੁਹੇ ਮੁਹਿ ਪਾਣਾ ਖਾਇ ॥',
      pronunciation: 'wajah gavāe agalā; muhe muh pāṇā khāi ‖',
      translation:
        'He loses his entire salary, and is also beaten on his face with shoes.',
    },
    {
      id: 'JXZ2',
      src: 'ਜਿਸ ਦਾ ਦਿਤਾ ਖਾਵਣਾ; ਤਿਸੁ ਕਹੀਐ ਸਾਬਾਸਿ ॥',
      pronunciation: 'jis dā ditā khāwaṇā; tis kahīē sābās ‖',
      translation:
        'Let us all celebrate Him, from whom we receive our nourishment.',
    },
    {
      id: 'WVUX',
      src: 'ਨਾਨਕ. ਹੁਕਮੁ ਨ ਚਲਈ; ਨਾਲਿ ਖਸਮ ਚਲੈ ਅਰਦਾਸਿ ॥੨੨॥',
      pronunciation: 'nānak. hukam na calaī; nāl khasam calē aradās ‖22‖',
      translation:
        'O Nanak, no one can issue commands to the Lord Master; let us offer prayers instead. ||22||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
