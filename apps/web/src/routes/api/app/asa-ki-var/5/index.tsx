import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 5)',
    roman: 'Āsā kī vār (chakkā 5)',
  },
  paging: {
    previous: 'asa-ki-var/4',
    next: 'asa-ki-var/6',
  },
  data: [
    {
      id: 'Q7MQ',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ॥',
      pronunciation: 'āsā mahalā 4 ‖',
      translation: 'Aasaa, Fourth Mehl:',
    },
    {
      id: 'JSQU',
      src: 'ਗੁਰਮੁਖਿ. ਢੂੰਢਿ ਢੂਢੇਦਿਆ; ਹਰਿ ਸਜਣੁ ਲਧਾ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'guramukhi. ḍhūñḍh ḍhūḍhediā; har sajaṇ ladhā. rām rāje ‖',
      translation:
        'As Gurmukh, I searched and searched, and found the Lord, my Friend, my Sovereign Lord King.',
    },
    {
      id: 'HPU6',
      src: 'ਕੰਚਨ ਕਾਇਆ ਕੋਟ ਗੜ; ਵਿਚਿ ਹਰਿ ਹਰਿ ਸਿਧਾ ॥',
      pronunciation: 'kañcan kāiā koṭ gaṛ; vic har har sidhā ‖',
      translation:
        'Within the walled fortress of my golden body, the Lord, Har, Har, is revealed.',
    },
    {
      id: 'E839',
      src: 'ਹਰਿ ਹਰਿ ਹੀਰਾ ਰਤਨੁ ਹੈ; ਮੇਰਾ ਮਨੁ ਤਨੁ ਵਿਧਾ ॥',
      pronunciation: 'har har hīrā ratan hē; merā man tan vidhā ‖',
      translation:
        'The Lord, Har, Har, is a jewel, a diamond; my mind and body are pierced through.',
    },
    {
      id: 'KVVG',
      src: 'ਧੁਰਿ ਭਾਗ ਵਡੇ ਹਰਿ ਪਾਇਆ; ਨਾਨਕ. ਰਸਿ ਗੁਧਾ ॥੧॥',
      pronunciation: 'dhur bhāg waḍe har pāiā; nānak. ras gudhā ‖1‖',
      translation:
        'By the great good fortune of pre-ordained destiny, I have found the Lord. Nanak is permeated with His sublime essence. ||1||',
    },
    {
      id: '2ZUX',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '60GC',
      src: 'ਘੜੀਆ, ਸਭੇ ਗੋਪੀਆ; ਪਹਰ ਕੰਨੑ ਗੋਪਾਲ ॥',
      pronunciation: 'ghaṛīā, sabhe gopīā; pahar kañn gopāl ‖',
      translation:
        'All the hours are the milk-maids, and the quarters of the day are the Krishnas.',
    },
    {
      id: '0VSR',
      src: 'ਗਹਣੇ ਪਉਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ; ਚੰਦੁ ਸੂਰਜੁ ਅਵਤਾਰ ॥',
      pronunciation: 'gahaṇe pauṇ pāṇī bēsañtaru; cañd sūraj awatār ‖',
      translation:
        'The wind, water and fire are the ornaments; the sun and moon are the incarnations.',
    },
    {
      id: 'MWZG',
      src: 'ਸਗਲੀ ਧਰਤੀ ਮਾਲੁ ਧਨੁ; ਵਰਤਣਿ ਸਰਬ ਜੰਜਾਲ ॥',
      pronunciation: 'sagalī dharatī māl dhanu; warataṇ sarab jañjāl ‖',
      translation:
        'All of the earth, property, wealth and articles are all entanglements.',
    },
    {
      id: 'RS8R',
      src: 'ਨਾਨਕ. ਮੁਸੈ ਗਿਆਨ ਵਿਹੂਣੀ; ਖਾਇ ਗਇਆ ਜਮਕਾਲੁ ॥੧॥',
      pronunciation: 'nānak. musē giān vihūṇī; khāi gaiā jamakāl ‖1‖',
      translation:
        'O Nanak, without divine knowledge, one is plundered, and devoured by the Messenger of Death. ||1||',
    },
    {
      id: 'NFPS',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'DZH8',
      src: 'ਵਾਇਨਿ ਚੇਲੇ; ਨਚਨਿ ਗੁਰ ॥',
      pronunciation: 'vāin cele; nacan gur ‖',
      translation: 'The disciples play the music, and the gurus dance.',
    },
    {
      id: 'SNYK',
      src: 'ਪੈਰ ਹਲਾਇਨਿ; ਫੇਰਨੑਿ ਸਿਰ ॥',
      pronunciation: 'pēr halāini; pheran sir ‖',
      translation: 'They move their feet and roll their heads.',
    },
    {
      id: 'UEPC',
      src: 'ਉਡਿ ਉਡਿ ਰਾਵਾ; ਝਾਟੈ ਪਾਇ ॥',
      pronunciation: 'uḍ uḍ rāvā; jhāṭē pāi ‖',
      translation: 'The dust flies and falls upon their hair.',
    },
    {
      id: 'Y373',
      src: 'ਵੇਖੈ ਲੋਕੁ; ਹਸੈ ਘਰਿ ਜਾਇ ॥',
      pronunciation: 'vekhē loku; hasē ghar jāi ‖',
      translation: 'Beholding them, the people laugh, and then go home.',
    },
    {
      id: 'H6QS',
      src: 'ਰੋਟੀਆ ਕਾਰਣਿ; ਪੂਰਹਿ ਤਾਲ ॥',
      pronunciation: 'roṭīā kāraṇi; pūrah tāl ‖',
      translation: 'They beat the drums for the sake of bread.',
    },
    {
      id: '4A25',
      src: 'ਆਪੁ ਪਛਾੜਹਿ; ਧਰਤੀ ਨਾਲਿ ॥',
      pronunciation: 'āp pachāṛahi; dharatī nāl ‖',
      translation: 'They throw themselves upon the ground.',
    },
    {
      id: 'HT4R',
      src: 'ਗਾਵਨਿ ਗੋਪੀਆ; ਗਾਵਨਿ ਕਾਨੑ ॥',
      pronunciation: 'gāwan gopīā; gāwan kān ‖',
      translation: 'They sing of the milk-maids, they sing of the Krishnas.',
    },
    {
      id: '15R0',
      src: 'ਗਾਵਨਿ; ਸੀਤਾ ਰਾਜੇ ਰਾਮ ॥',
      pronunciation: 'gāwani; sītā rāje rām ‖',
      translation: 'They sing of Sitas, and Ramas and kings.',
    },
    {
      id: 'HL7W',
      src: 'ਨਿਰਭਉ ਨਿਰੰਕਾਰੁ ਸਚੁ ਨਾਮੁ ॥',
      pronunciation: 'nirabhau nirañkār sac nām ‖',
      translation: 'The Lord is fearless and formless; His Name is True.',
    },
    {
      id: 'NSKZ',
      src: 'ਜਾ ਕਾ ਕੀਆ; ਸਗਲ ਜਹਾਨੁ ॥',
      pronunciation: 'jā kā kīā; sagal jahān ‖',
      translation: 'The entire universe is His Creation.',
    },
    {
      id: 'EZ9M',
      src: 'ਸੇਵਕ ਸੇਵਹਿ; ਕਰਮਿ ਚੜਾਉ ॥',
      pronunciation: 'sewak sewahi; karam caṛāu ‖',
      translation: 'Those servants, whose destiny is awakened, serve the Lord.',
    },
    {
      id: '445K',
      src: 'ਭਿੰਨੀ ਰੈਣਿ; ਜਿਨੑਾ ਮਨਿ ਚਾਉ ॥',
      pronunciation: 'bhiñnī rēṇi; jinā man cāu ‖',
      translation:
        'The night of their lives is cool with dew; their minds are filled with love for the Lord.',
    },
    {
      id: 'H87L',
      src: 'ਸਿਖੀ ਸਿਖਿਆ; ਗੁਰ ਵੀਚਾਰਿ ॥',
      pronunciation: 'sikhī sikhiā; gur vīcār ‖',
      translation:
        'Contemplating the Guru, I have been taught these teachings;',
    },
    {
      id: 'HN5Y',
      src: 'ਨਦਰੀ ਕਰਮਿ. ਲਘਾਏ ਪਾਰਿ ॥',
      pronunciation: 'nadarī karami. laghāe pār ‖',
      translation: 'granting His Grace, He carries His servants across.',
    },
    {
      id: 'CA5N',
      src: 'ਕੋਲੂ ਚਰਖਾ; ਚਕੀ ਚਕੁ ॥',
      pronunciation: 'kolū carakhā; cakī cak ‖',
      translation:
        "The oil-press, the spinning wheel, the grinding stones, the potter's wheel,",
    },
    {
      id: 'NL01',
      src: 'ਥਲ ਵਾਰੋਲੇ; ਬਹੁਤੁ ਅਨੰਤੁ ॥',
      pronunciation: 'thal vārole; bahut anañt ‖',
      translation: 'the numerous, countless whirlwinds in the desert,',
    },
    {
      id: 'X0SE',
      src: 'ਲਾਟੂ ਮਾਧਾਣੀਆ; ਅਨਗਾਹ ॥',
      pronunciation: 'lāṭū mādhāṇīā; anagāh ‖',
      translation: 'the spinning tops, the churning sticks, the threshers,',
    },
    {
      id: '5LCD',
      src: 'ਪੰਖੀ ਭਉਦੀਆ; ਲੈਨਿ ਨ ਸਾਹ ॥',
      pronunciation: 'pañkhī bhaudīā; lēn na sāh ‖',
      translation: 'the breathless tumblings of the birds,',
    },
    {
      id: 'TYQR',
      src: 'ਸੂਐ ਚਾੜਿ; ਭਵਾਈਅਹਿ ਜੰਤ ॥',
      pronunciation: 'sūē cāṛi; bhavāīah jañt ‖',
      translation: 'and the men moving round and round on spindles',
    },
    {
      id: 'E91W',
      src: 'ਨਾਨਕ. ਭਉਦਿਆ; ਗਣਤ ਨ ਅੰਤ ॥',
      pronunciation: 'nānak. bhaudiā; gaṇat na añt ‖',
      translation: 'O Nanak, the tumblers are countless and endless.',
    },
    {
      id: '0LF9',
      src: 'ਬੰਧਨ ਬੰਧਿ; ਭਵਾਏ ਸੋਇ ॥',
      pronunciation: 'bañdhan bañdhi; bhavāe soi ‖',
      translation: 'The Lord binds us in bondage - so do we spin around.',
    },
    {
      id: '584P',
      src: 'ਪਇਐ ਕਿਰਤਿ; ਨਚੈ ਸਭੁ ਕੋਇ ॥',
      pronunciation: 'paiē kirati; nacē sabh koi ‖',
      translation: 'According to their actions, so do all people dance.',
    },
    {
      id: 'FQFJ',
      src: 'ਨਚਿ ਨਚਿ ਹਸਹਿ; ਚਲਹਿ ਸੇ ਰੋਇ ॥',
      pronunciation: 'nac nac hasahi; calah se roi ‖',
      translation:
        'Those who dance and dance and laugh, shall weep on their ultimate departure.',
    },
    {
      id: 'L1JA',
      src: 'ਉਡਿ. ਨ ਜਾਹੀ; ਸਿਧ. ਨ ਹੋਹਿ ॥',
      pronunciation: 'uḍi. na jāhī; sidh. na hoh ‖',
      translation:
        'They do not fly to the heavens, nor do they become Siddhas.',
    },
    {
      id: '4270',
      src: 'ਨਚਣੁ ਕੁਦਣੁ; ਮਨ ਕਾ ਚਾਉ ॥',
      pronunciation: 'nacaṇ kudaṇu; man kā cāu ‖',
      translation: 'They dance and jump around on the urgings of their minds.',
    },
    {
      id: '92BJ',
      src: 'ਨਾਨਕ. ਜਿਨੑ ਮਨਿ ਭਉ; ਤਿਨੑਾ ਮਨਿ ਭਾਉ ॥੨॥',
      pronunciation: 'nānak. jin man bhau; tinā man bhāu ‖2‖',
      translation:
        'O Nanak, those whose minds are filled with the Fear of God, have the love of God in their minds as well. ||2||',
    },
    {
      id: 'LRS4',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'UKTR',
      src: 'ਨਾਉ ਤੇਰਾ ਨਿਰੰਕਾਰੁ ਹੈ; ਨਾਇ ਲਇਐ. ਨਰਕਿ, ਨ ਜਾਈਐ ॥',
      pronunciation: 'nāu terā nirañkār hē; nāi laiē. naraki, na jāīē ‖',
      translation:
        'Your Name is the Fearless Lord; chanting Your Name, one does not have to go to hell.',
    },
    {
      id: 'UC30',
      src: 'ਜੀਉ ਪਿੰਡੁ ਸਭੁ ਤਿਸ ਦਾ; ਦੇ ਖਾਜੈ. ਆਖਿ ਗਵਾਈਐ ॥',
      pronunciation: 'jīu piñḍ sabh tis dā; de khājē. ākh gavāīē ‖',
      translation:
        'Soul and body all belong to Him; asking Him to give us sustenance is a waste.',
    },
    {
      id: 'LV4N',
      src: 'ਜੇ ਲੋੜਹਿ ਚੰਗਾ ਆਪਣਾ; ਕਰਿ ਪੁੰਨਹੁ. ਨੀਚੁ ਸਦਾਈਐ ॥',
      pronunciation: 'je loṛah cañgā āpaṇā; kar puñnahu. nīc sadāīē ‖',
      translation:
        'If you yearn for goodness, then perform good deeds and feel humble.',
    },
    {
      id: 'KUKL',
      src: 'ਜੇ ਜਰਵਾਣਾ ਪਰਹਰੈ; ਜਰੁ ਵੇਸ ਕਰੇਦੀ ਆਈਐ ॥',
      pronunciation: 'je jaravāṇā paraharē; jar ves karedī āīē ‖',
      translation:
        'Even if you remove the signs of old age, old age shall still come in the guise of death.',
    },
    {
      id: 'QG90',
      src: 'ਕੋ ਰਹੈ ਨ; ਭਰੀਐ ਪਾਈਐ ॥੫॥',
      pronunciation: 'ko rahē n; bharīē pāīē ‖5‖',
      translation:
        'No one remains here when the count of the breaths is full. ||5||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
