import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 7)',
    roman: 'Āsā kī vār (chakkā 7)',
  },
  paging: {
    previous: 'asa-ki-var/6',
    next: 'asa-ki-var/8',
  },
  data: [
    {
      id: '2KEE',
      src: 'ਗੁਰਮੁਖਿ ਪਿਆਰੇ ਆਇ ਮਿਲੁ; ਮੈ ਚਿਰੀ ਵਿਛੁੰਨੇ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'guramukh piāre āi milu; mē cirī vichuñne, rām rāje ‖',
      translation:
        'O my Love, come and meet me as Gurmukh; I have been separated from You for so long, Lord King.',
    },
    {
      id: 'AZMN',
      src: 'ਮੇਰਾ ਮਨੁ ਤਨੁ ਬਹੁਤੁ ਬੈਰਾਗਿਆ; ਹਰਿ ਨੈਣ ਰਸਿ ਭਿੰਨੇ ॥',
      pronunciation: 'merā man tan bahut bērāgiā; har nēṇ ras bhiñne ‖',
      translation:
        "My mind and body are sad; my eyes are wet with the Lord's sublime essence.",
    },
    {
      id: 'JNUZ',
      src: 'ਮੈ ਹਰਿ ਪ੍ਰਭੁ ਪਿਆਰਾ ਦਸਿ ਗੁਰੁ; ਮਿਲਿ ਹਰਿ ਮਨੁ ਮੰਨੇ ॥',
      pronunciation: 'mē har prabh piārā das guru; mil har man mañne ‖',
      translation:
        'Show me my Lord God, my Love, O Guru; meeting the Lord, my mind is pleased.',
    },
    {
      id: '6PBQ',
      src: 'ਹਉ ਮੂਰਖੁ ਕਾਰੈ ਲਾਈਆ; ਨਾਨਕ ਹਰਿ ਕੰਮੇ ॥੩॥',
      pronunciation: 'hau mūrakh kārē lāīā; nānak har kañme ‖3‖',
      translation:
        'I am just a fool, O Nanak, but the Lord has appointed me to perform His service. ||3||',
    },
    {
      id: 'GEBB',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'LVYD',
      src: 'ਹਉ ਵਿਚਿ ਆਇਆ; ਹਉ ਵਿਚਿ ਗਇਆ ॥',
      pronunciation: 'hau vic āiā; hau vic gaiā ‖',
      translation: 'In ego they come, and in ego they go.',
    },
    {
      id: '2BJR',
      src: 'ਹਉ ਵਿਚਿ ਜੰਮਿਆ; ਹਉ ਵਿਚਿ ਮੁਆ ॥',
      pronunciation: 'hau vic jañmiā; hau vic muā ‖',
      translation: 'In ego they are born, and in ego they die.',
    },
    {
      id: 'ZZ9C',
      src: 'ਹਉ ਵਿਚਿ ਦਿਤਾ; ਹਉ ਵਿਚਿ ਲਇਆ ॥',
      pronunciation: 'hau vic ditā; hau vic laiā ‖',
      translation: 'In ego they give, and in ego they take.',
    },
    {
      id: '9C0F',
      src: 'ਹਉ ਵਿਚਿ ਖਟਿਆ; ਹਉ ਵਿਚਿ ਗਇਆ ॥',
      pronunciation: 'hau vic khaṭiā; hau vic gaiā ‖',
      translation: 'In ego they earn, and in ego they lose.',
    },
    {
      id: 'R989',
      src: 'ਹਉ ਵਿਚਿ; ਸਚਿਆਰੁ ਕੂੜਿਆਰੁ ॥',
      pronunciation: 'hau vici; saciār kūṛiār ‖',
      translation: 'In ego they become truthful or false.',
    },
    {
      id: '0F2V',
      src: 'ਹਉ ਵਿਚਿ; ਪਾਪ ਪੁੰਨ ਵੀਚਾਰੁ ॥',
      pronunciation: 'hau vici; pāp puñn vīcār ‖',
      translation: 'In ego they reflect on virtue and sin.',
    },
    {
      id: 'Y5P1',
      src: 'ਹਉ ਵਿਚਿ; ਨਰਕਿ ਸੁਰਗਿ ਅਵਤਾਰੁ ॥',
      pronunciation: 'hau vici; narak surag awatār ‖',
      translation: 'In ego they go to heaven or hell.',
    },
    {
      id: 'SGDK',
      src: 'ਹਉ ਵਿਚਿ ਹਸੈ; ਹਉ ਵਿਚਿ ਰੋਵੈ ॥',
      pronunciation: 'hau vic hasē; hau vic rovē ‖',
      translation: 'In ego they laugh, and in ego they weep.',
    },
    {
      id: 'SJ9B',
      src: 'ਹਉ ਵਿਚਿ ਭਰੀਐ; ਹਉ ਵਿਚਿ ਧੋਵੈ ॥',
      pronunciation: 'hau vic bharīē; hau vic dhovē ‖',
      translation:
        'In ego they become dirty, and in ego they are washed clean.',
    },
    {
      id: '2NRW',
      src: 'ਹਉ ਵਿਚਿ; ਜਾਤੀ ਜਿਨਸੀ ਖੋਵੈ ॥',
      pronunciation: 'hau vici; jātī jinasī khovē ‖',
      translation: 'In ego they lose social status and class.',
    },
    {
      id: 'PBLW',
      src: 'ਹਉ ਵਿਚਿ ਮੂਰਖੁ; ਹਉ ਵਿਚਿ ਸਿਆਣਾ ॥',
      pronunciation: 'hau vic mūrakhu; hau vic siāṇā ‖',
      translation: 'In ego they are ignorant, and in ego they are wise.',
    },
    {
      id: 'XYW9',
      src: 'ਮੋਖ ਮੁਕਤਿ ਕੀ; ਸਾਰ ਨ ਜਾਣਾ ॥',
      pronunciation: 'mokh mukat kī; sār na jāṇā ‖',
      translation: 'They do not know the value of salvation and liberation.',
    },
    {
      id: '8459',
      src: 'ਹਉ ਵਿਚਿ ਮਾਇਆ; ਹਉ ਵਿਚਿ ਛਾਇਆ ॥',
      pronunciation: 'hau vic māiā; hau vic chāiā ‖',
      translation:
        'In ego they love Maya, and in ego they are kept in darkness by it.',
    },
    {
      id: 'ZRKP',
      src: 'ਹਉਮੈ ਕਰਿ ਕਰਿ; ਜੰਤ ਉਪਾਇਆ ॥',
      pronunciation: 'haumē kar kari; jañt upāiā ‖',
      translation: 'Living in ego, mortal beings are created.',
    },
    {
      id: 'S52L',
      src: 'ਹਉਮੈ ਬੂਝੈ; ਤਾ ਦਰੁ ਸੂਝੈ ॥',
      pronunciation: 'haumē būjhē; tā dar sūjhē ‖',
      translation: "When one understands ego, then the Lord's gate is known.",
    },
    {
      id: 'CLBJ',
      src: 'ਗਿਆਨ ਵਿਹੂਣਾ; ਕਥਿ ਕਥਿ ਲੂਝੈ ॥',
      pronunciation: 'giān vihūṇā; kath kath lūjhē ‖',
      translation: 'Without spiritual wisdom, they babble and argue.',
    },
    {
      id: '84H3',
      src: 'ਨਾਨਕ. ਹੁਕਮੀ; ਲਿਖੀਐ ਲੇਖੁ ॥',
      pronunciation: 'nānak. hukamī; likhīē lekh ‖',
      translation: "O Nanak, by the Lord's Command, destiny is recorded.",
    },
    {
      id: '91YV',
      src: 'ਜੇਹਾ ਵੇਖਹਿ; ਤੇਹਾ ਵੇਖੁ ॥੧॥',
      pronunciation: 'jehā vekhahi; tehā vekh ‖1‖',
      translation: 'As the Lord sees us, so are we seen. ||1||',
    },
    {
      id: 'R5UM',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'D3LL',
      src: 'ਹਉਮੈ ਏਹਾ ਜਾਤਿ ਹੈ; ਹਉਮੈ ਕਰਮ ਕਮਾਹਿ ॥',
      pronunciation: 'haumē ehā jāt hē; haumē karam kamāh ‖',
      translation:
        'This is the nature of ego, that people perform their actions in ego.',
    },
    {
      id: 'CCL9',
      src: 'ਹਉਮੈ ਏਈ ਬੰਧਨਾ; ਫਿਰਿ ਫਿਰਿ ਜੋਨੀ ਪਾਹਿ ॥',
      pronunciation: 'haumē eī bañdhanā; phir phir jonī pāh ‖',
      translation:
        'This is the bondage of ego, that time and time again, they are reborn.',
    },
    {
      id: 'NZXQ',
      src: 'ਹਉਮੈ. ਕਿਥਹੁ ਊਪਜੈ; ਕਿਤੁ ਸੰਜਮਿ. ਇਹ ਜਾਇ ॥',
      pronunciation: 'haumē. kithah ūpajē; kit sañjami. ih jāi ‖',
      translation: 'Where does ego come from? How can it be removed?',
    },
    {
      id: '6CB0',
      src: 'ਹਉਮੈ ਏਹੋ ਹੁਕਮੁ ਹੈ; ਪਇਐ ਕਿਰਤਿ ਫਿਰਾਹਿ ॥',
      pronunciation: 'haumē eho hukam hē; paiē kirat phirāh ‖',
      translation:
        "This ego exists by the Lord's Order; people wander according to their past actions.",
    },
    {
      id: '8D52',
      src: 'ਹਉਮੈ ਦੀਰਘ ਰੋਗੁ ਹੈ; ਦਾਰੂ ਭੀ ਇਸੁ ਮਾਹਿ ॥',
      pronunciation: 'haumē dīragh rog hē; dārū bhī is māh ‖',
      translation:
        'Ego is a chronic disease, but it contains its own cure as well.',
    },
    {
      id: 'LW9D',
      src: 'ਕਿਰਪਾ ਕਰੇ ਜੇ ਆਪਣੀ; ਤਾ ਗੁਰ ਕਾ ਸਬਦੁ ਕਮਾਹਿ ॥',
      pronunciation: 'kirapā kare je āpaṇī; tā gur kā sabad kamāh ‖',
      translation:
        "If the Lord grants His Grace, one acts according to the Teachings of the Guru's Shabad.",
    },
    {
      id: 'DKDD',
      src: 'ਨਾਨਕੁ ਕਹੈ. ਸੁਣਹੁ ਜਨਹੁ; ਇਤੁ ਸੰਜਮਿ. ਦੁਖ ਜਾਹਿ ॥੨॥',
      pronunciation: 'nānak kahē. suṇah janahu; it sañjami. dukh jāh ‖2‖',
      translation:
        'Nanak says, listen, people: in this way, troubles depart. ||2||',
    },
    {
      id: 'ZN1B',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'HV79',
      src: 'ਸੇਵ ਕੀਤੀ. ਸੰਤੋਖੀਈਁ; ਜਿਨੑੀ. ਸਚੋ ਸਚੁ ਧਿਆਇਆ ॥',
      pronunciation: 'sev kītī. sañtokhīīਁ; jinī. saco sac dhiāiā ‖',
      translation:
        'Those who serve are content. They meditate on the Truest of the True.',
    },
    {
      id: 'BQPR',
      src: 'ਓਨੑੀ ਮੰਦੈ ਪੈਰੁ. ਨ ਰਖਿਓ; ਕਰਿ ਸੁਕ੍ਰਿਤੁ ਧਰਮੁ ਕਮਾਇਆ ॥',
      pronunciation: 'onī mañdē pēru. na rakhio; kar sukrit dharam kamāiā ‖',
      translation:
        'They do not place their feet in sin, but do good deeds and live righteously in Dharma.',
    },
    {
      id: 'SEQ2',
      src: 'ਓਨੑੀ. ਦੁਨੀਆ ਤੋੜੇ ਬੰਧਨਾ; ਅੰਨੁ ਪਾਣੀ ਥੋੜਾ ਖਾਇਆ ॥',
      pronunciation: 'onī. dunīā toṛe bañdhanā; añn pāṇī thoṛā khāiā ‖',
      translation:
        'They burn away the bonds of the world, and eat a simple diet of grain and water.',
    },
    {
      id: 'Y20X',
      src: 'ਤੂੰ ਬਖਸੀਸੀ ਅਗਲਾ; ਨਿਤ ਦੇਵਹਿ. ਚੜਹਿ ਸਵਾਇਆ ॥',
      pronunciation: 'tūñ bakhasīsī agalā; nit dewahi. caṛah savāiā ‖',
      translation:
        'You are the Great Forgiver; You give continually, more and more each day.',
    },
    {
      id: '323E',
      src: 'ਵਡਿਆਈ ਵਡਾ ਪਾਇਆ ॥੭॥',
      pronunciation: 'waḍiāī waḍā pāiā ‖7‖',
      translation: 'By His greatness, the Great Lord is obtained. ||7||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
