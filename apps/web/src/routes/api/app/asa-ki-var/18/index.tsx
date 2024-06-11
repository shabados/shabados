import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 18)',
    roman: 'Āsā kī vār (chakkā 18)',
  },
  paging: {
    previous: 'asa-ki-var/17',
    next: 'asa-ki-var/19',
  },
  data: [
    {
      id: '3J14',
      src: 'ਜਿਥੈ ਜਾਇ ਬਹੈ. ਮੇਰਾ ਸਤਿਗੁਰੂ; ਸੋ ਥਾਨੁ ਸੁਹਾਵਾ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jithē jāi bahē. merā satigurū; so thān suhāvā. rām rāje ‖',
      translation:
        'Wherever my True Guru goes and sits, that place is beautiful, O Lord King.',
    },
    {
      id: 'EQWT',
      src: 'ਗੁਰਸਿਖਂ‍ੀ. ਸੋ ਥਾਨੁ ਭਾਲਿਆ; ਲੈ ਧੂਰਿ ਮੁਖਿ ਲਾਵਾ ॥',
      pronunciation: 'gurasikhañ‍ī. so thān bhāliā; lē dhūr mukh lāvā ‖',
      translation:
        "The Guru's Sikhs seek out that place; they take the dust and apply it to their faces.",
    },
    {
      id: 'RBYW',
      src: 'ਗੁਰਸਿਖਾ ਕੀ ਘਾਲ. ਥਾਇ ਪਈ; ਜਿਨ ਹਰਿ ਨਾਮੁ ਧਿਆਵਾ ॥',
      pronunciation: 'gurasikhā kī ghāl. thāi paī; jin har nām dhiāvā ‖',
      translation:
        "The works of the Guru's Sikhs, who meditate on the Lord's Name, are approved.",
    },
    {
      id: 'DCP5',
      src: 'ਜਿਨੑ ਨਾਨਕੁ. ਸਤਿਗੁਰੁ ਪੂਜਿਆ; ਤਿਨ ਹਰਿ ਪੂਜ ਕਰਾਵਾ ॥੨॥',
      pronunciation: 'jin nānaku. satigur pūjiā; tin har pūj karāvā ‖2‖',
      translation:
        'Those who worship the True Guru, O Nanak - the Lord causes them to be worshipped in turn. ||2||',
    },
    {
      id: '5Y3U',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '2TTQ',
      src: 'ਜੇ ਕਰਿ ਸੂਤਕੁ ਮੰਨੀਐ; ਸਭ ਤੈ ਸੂਤਕੁ ਹੋਇ ॥',
      pronunciation: 'je kar sūtak mañnīē; sabh tē sūtak hoi ‖',
      translation:
        'If one accepts the concept of impurity, then there is impurity everywhere.',
    },
    {
      id: '7YT8',
      src: 'ਗੋਹੇ ਅਤੈ ਲਕੜੀ; ਅੰਦਰਿ ਕੀੜਾ ਹੋਇ ॥',
      pronunciation: 'gohe atē lakaṛī; añdar kīṛā hoi ‖',
      translation: 'In cow-dung and wood there are worms.',
    },
    {
      id: 'MLXW',
      src: 'ਜੇਤੇ ਦਾਣੇ ਅੰਨ ਕੇ; ਜੀਆ ਬਾਝੁ. ਨ ਕੋਇ ॥',
      pronunciation: 'jete dāṇe añn ke; jīā bājhu. na koi ‖',
      translation: 'As many as are the grains of corn, none is without life.',
    },
    {
      id: '8YTC',
      src: 'ਪਹਿਲਾ ਪਾਣੀ ਜੀਉ ਹੈ; ਜਿਤੁ ਹਰਿਆ ਸਭੁ ਕੋਇ ॥',
      pronunciation: 'pahilā pāṇī jīu hē; jit hariā sabh koi ‖',
      translation:
        'First, there is life in the water, by which everything else is made green.',
    },
    {
      id: 'W5QX',
      src: 'ਸੂਤਕੁ ਕਿਉ ਕਰਿ ਰਖੀਐ; ਸੂਤਕੁ ਪਵੈ ਰਸੋਇ ॥',
      pronunciation: 'sūtak kiu kar rakhīē; sūtak pavē rasoi ‖',
      translation:
        'How can it be protected from impurity? It touches our own kitchen.',
    },
    {
      id: 'KZES',
      src: 'ਨਾਨਕ. ਸੂਤਕੁ ਏਵ. ਨ ਉਤਰੈ; ਗਿਆਨੁ ਉਤਾਰੇ ਧੋਇ ॥੧॥',
      pronunciation: 'nānak. sūtak ev. na utarē; giān utāre dhoi ‖1‖',
      translation:
        'O Nanak, impurity cannot be removed in this way; it is washed away only by spiritual wisdom. ||1||',
    },
    {
      id: 'CQS8',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '0EDF',
      src: 'ਮਨ ਕਾ ਸੂਤਕੁ ਲੋਭੁ ਹੈ; ਜਿਹਵਾ ਸੂਤਕੁ ਕੂੜੁ ॥',
      pronunciation: 'man kā sūtak lobh hē; jihavā sūtak kūṛ ‖',
      translation:
        'The impurity of the mind is greed, and the impurity of the tongue is falsehood.',
    },
    {
      id: '53U1',
      src: 'ਅਖੀ ਸੂਤਕੁ ਵੇਖਣਾ; ਪਰ ਤ੍ਰਿਅ ਪਰ ਧਨ ਰੂਪੁ ॥',
      pronunciation: 'akhī sūtak vekhaṇā; par tria par dhan rūp ‖',
      translation:
        "The impurity of the eyes is to gaze upon the beauty of another man's wife, and his wealth.",
    },
    {
      id: 'X3WG',
      src: 'ਕੰਨੀ ਸੂਤਕੁ ਕੰਨਿ ਪੈ; ਲਾਇਤਬਾਰੀ ਖਾਹਿ ॥',
      pronunciation: 'kañnī sūtak kañn pē; lāitabārī khāh ‖',
      translation:
        'The impurity of the ears is to listen to the slander of others.',
    },
    {
      id: 'YQB2',
      src: 'ਨਾਨਕ. ਹੰਸਾ ਆਦਮੀ; ਬਧੇ ਜਮ ਪੁਰਿ ਜਾਹਿ ॥੨॥',
      pronunciation: 'nānak. hañsā ādamī; badhe jam pur jāh ‖2‖',
      translation:
        "O Nanak, the mortal's soul goes, bound and gagged to the city of Death. ||2||",
    },
    {
      id: 'Q7ZK',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '8ZNE',
      src: 'ਸਭੋ ਸੂਤਕੁ ਭਰਮੁ ਹੈ; ਦੂਜੈ ਲਗੈ ਜਾਇ ॥',
      pronunciation: 'sabho sūtak bharam hē; dūjē lagē jāi ‖',
      translation: 'All impurity comes from doubt and attachment to duality.',
    },
    {
      id: 'FEL9',
      src: 'ਜੰਮਣੁ ਮਰਣਾ ਹੁਕਮੁ ਹੈ; ਭਾਣੈ ਆਵੈ ਜਾਇ ॥',
      pronunciation: 'jañmaṇ maraṇā hukam hē; bhāṇē āvē jāi ‖',
      translation:
        "Birth and death are subject to the Command of the Lord's Will; through His Will we come and go.",
    },
    {
      id: 'G1HH',
      src: 'ਖਾਣਾ ਪੀਣਾ ਪਵਿਤ੍ਰੁ ਹੈ; ਦਿਤੋਨੁ ਰਿਜਕੁ ਸੰਬਾਹਿ ॥',
      pronunciation: 'khāṇā pīṇā pavitr hē; diton rijak sañbāh ‖',
      translation:
        'Eating and drinking are pure, since the Lord gives nourishment to all.',
    },
    {
      id: 'PWYA',
      src: 'ਨਾਨਕ. ਜਿਨੑੀ ਗੁਰਮੁਖਿ ਬੁਝਿਆ; ਤਿਨੑਾ ਸੂਤਕੁ ਨਾਹਿ ॥੩॥',
      pronunciation: 'nānak. jinī guramukh bujhiā; tinā sūtak nāh ‖3‖',
      translation:
        'O Nanak, the Gurmukhs, who understand the Lord, are not stained by impurity. ||3||',
    },
    {
      id: 'KT1N',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: '4LTB',
      src: 'ਸਤਿਗੁਰੁ ਵਡਾ ਕਰਿ ਸਾਲਾਹੀਐ; ਜਿਸੁ ਵਿਚਿ ਵਡੀਆ ਵਡਿਆਈਆ ॥',
      pronunciation: 'satigur waḍā kar sālāhīē; jis vic waḍīā waḍiāīā ‖',
      translation:
        'Praise the Great True Guru; within Him is the greatest greatness.',
    },
    {
      id: '61QA',
      src: 'ਸਹਿ ਮੇਲੇ; ਤਾ ਨਦਰੀ ਆਈਆ ॥',
      pronunciation: 'sah mele; tā nadarī āīā ‖',
      translation:
        'When the Lord causes us to meet the Guru, then we come to see them.',
    },
    {
      id: '3ZAA',
      src: 'ਜਾ ਤਿਸੁ ਭਾਣਾ; ਤਾ ਮਨਿ ਵਸਾਈਆ ॥',
      pronunciation: 'jā tis bhāṇā; tā man wasāīā ‖',
      translation: 'When it pleases Him, they come to dwell in our minds.',
    },
    {
      id: '9VHK',
      src: 'ਕਰਿ ਹੁਕਮੁ ਮਸਤਕਿ ਹਥੁ ਧਰਿ; ਵਿਚਹੁ ਮਾਰਿ ਕਢੀਆ ਬੁਰਿਆਈਆ ॥',
      pronunciation: 'kar hukam masatak hath dhari; vicah mār kaḍhīā buriāīā ‖',
      translation:
        'By His Command, when He places His hand on our foreheads, wickedness departs from within.',
    },
    {
      id: 'EE1B',
      src: 'ਸਹਿ ਤੁਠੈ; ਨਉ ਨਿਧਿ ਪਾਈਆ ॥੧੮॥',
      pronunciation: 'sah tuṭhē; nau nidh pāīā ‖18‖',
      translation:
        'When the Lord is thoroughly pleased, the nine treasures are obtained. ||18||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
