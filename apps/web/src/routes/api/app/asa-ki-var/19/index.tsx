import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 19)',
    roman: 'Āsā kī vār (chakkā 19)',
  },
  paging: {
    previous: 'asa-ki-var/18',
    next: 'asa-ki-var/20',
  },
  data: [
    {
      id: '87M2',
      src: 'ਗੁਰਸਿਖਾ ਮਨਿ ਹਰਿ ਪ੍ਰੀਤਿ ਹੈ; ਹਰਿ ਨਾਮ ਹਰਿ ਤੇਰੀ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'gurasikhā man har prīt hē; har nām har terī. rām rāje ‖',
      translation:
        "The Guru's Sikh keeps the Love of the Lord, and the Name of the Lord, in his mind. He loves You, O Lord, O Lord King.",
    },
    {
      id: 'BYM4',
      src: 'ਕਰਿ ਸੇਵਹਿ. ਪੂਰਾ ਸਤਿਗੁਰੂ; ਭੁਖ ਜਾਇ ਲਹਿ ਮੇਰੀ ॥',
      pronunciation: 'kar sewahi. pūrā satigurū; bhukh jāi lah merī ‖',
      translation:
        'He serves the Perfect True Guru, and his hunger and self-conceit are eliminated.',
    },
    {
      id: 'RX02',
      src: 'ਗੁਰਸਿਖਾ ਕੀ ਭੁਖ. ਸਭ ਗਈ; ਤਿਨ ਪਿਛੈ. ਹੋਰ ਖਾਇ ਘਨੇਰੀ ॥',
      pronunciation:
        'gurasikhā kī bhukh. sabh gaī; tin pichē. hor khāi ghanerī ‖',
      translation:
        'The hunger of the Gursikh is totally eliminated; indeed, many others are satisfied through them.',
    },
    {
      id: 'RXRX',
      src: 'ਜਨ ਨਾਨਕ. ਹਰਿ ਪੁੰਨੁ ਬੀਜਿਆ; ਫਿਰਿ ਤੋਟਿ ਨ ਆਵੈ, ਹਰਿ ਪੁੰਨ ਕੇਰੀ ॥੩॥',
      pronunciation:
        'jan nānak. har puñn bījiā; phir toṭ na āvē, har puñn kerī ‖3‖',
      translation:
        "Servant Nanak has planted the Seed of the Lord's Goodness; this Goodness of the Lord shall never be exhausted. ||3||",
    },
    {
      id: 'J3LD',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '19BX',
      src: 'ਪਹਿਲਾ ਸੁਚਾ ਆਪਿ ਹੋਇ; ਸੁਚੈ ਬੈਠਾ ਆਇ ॥',
      pronunciation: 'pahilā sucā āp hoi; sucē bēṭhā āi ‖',
      translation:
        'First, purifying himself, the Brahmin comes and sits in his purified enclosure.',
    },
    {
      id: '7P6C',
      src: 'ਸੁਚੇ ਅਗੈ ਰਖਿਓਨੁ; ਕੋਇ. ਨ ਭਿਟਿਓ ਜਾਇ ॥',
      pronunciation: 'suce agē rakhionu; koi. na bhiṭio jāi ‖',
      translation:
        'The pure foods, which no one else has touched, are placed before him.',
    },
    {
      id: '9CJV',
      src: 'ਸੁਚਾ ਹੋਇ ਕੈ ਜੇਵਿਆ; ਲਗਾ ਪੜਣਿ ਸਲੋਕੁ ॥',
      pronunciation: 'sucā hoi kē jeviā; lagā paṛaṇ salok ‖',
      translation:
        'Being purified, he takes his food, and begins to read his sacred verses.',
    },
    {
      id: 'KC0G',
      src: 'ਕੁਹਥੀ ਜਾਈ ਸਟਿਆ; ਕਿਸੁ ਏਹੁ ਲਗਾ ਦੋਖੁ ॥',
      pronunciation: 'kuhathī jāī saṭiā; kis eh lagā dokh ‖',
      translation:
        'But it is then thrown into a filthy place - whose fault is this?',
    },
    {
      id: 'DWWY',
      src: 'ਅੰਨੁ ਦੇਵਤਾ ਪਾਣੀ ਦੇਵਤਾ, ਬੈਸੰਤਰੁ ਦੇਵਤਾ ਲੂਣੁ ॥',
      pronunciation: 'añn dewatā pāṇī dewatā, bēsañtar dewatā lūṇ ‖',
      translation:
        'The corn is sacred, the water is sacred; the fire and salt are sacred as well;',
    },
    {
      id: 'VHZ5',
      src: 'ਪੰਜਵਾ ਪਾਇਆ ਘਿਰਤੁ ॥ ਤਾ ਹੋਆ ਪਾਕੁ ਪਵਿਤੁ ॥',
      pronunciation: 'pañjavā pāiā ghirat ‖ tā hoā pāk pavit ‖',
      translation:
        'When the fifth thing, the ghee, is added, then the food becomes pure and sanctified.',
    },
    {
      id: 'E8C6',
      src: 'ਪਾਪੀ ਸਿਉ ਤਨੁ ਗਡਿਆ; ਥੁਕਾ ਪਈਆ ਤਿਤੁ ॥',
      pronunciation: 'pāpī siu tan gaḍiā; thukā paīā tit ‖',
      translation:
        'Coming into contact with the sinful human body, the food becomes so impure that is is spat upon.',
    },
    {
      id: 'GQRG',
      src: 'ਜਿਤੁ ਮੁਖਿ ਨਾਮੁ. ਨ ਊਚਰਹਿ; ਬਿਨੁ ਨਾਵੈ. ਰਸ ਖਾਹਿ ॥',
      pronunciation: 'jit mukh nāmu. na ūcarahi; bin nāvē. ras khāh ‖',
      translation:
        'That mouth which does not chant the Naam, and without the Name eats tasty foods',
    },
    {
      id: 'DRXM',
      src: 'ਨਾਨਕ. ਏਵੈ ਜਾਣੀਐ; ਤਿਤੁ ਮੁਖਿ ਥੁਕਾ ਪਾਹਿ ॥੧॥',
      pronunciation: 'nānak. evē jāṇīē; tit mukh thukā pāh ‖1‖',
      translation:
        '- O Nanak, know this: such a mouth is to be spat upon. ||1||',
    },
    {
      id: 'YGAL',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '45UM',
      src: 'ਭੰਡਿ ਜੰਮੀਐ. ਭੰਡਿ ਨਿੰਮੀਐ; ਭੰਡਿ ਮੰਗਣੁ ਵੀਆਹੁ ॥',
      pronunciation: 'bhañḍ jañmīē. bhañḍ niñmīē; bhañḍ mañgaṇ vīāh ‖',
      translation:
        'From woman, man is born; within woman, man is conceived; to woman he is engaged and married.',
    },
    {
      id: 'VQR7',
      src: 'ਭੰਡਹੁ ਹੋਵੈ ਦੋਸਤੀ; ਭੰਡਹੁ ਚਲੈ ਰਾਹੁ ॥',
      pronunciation: 'bhañḍah hovē dosatī; bhañḍah calē rāh ‖',
      translation:
        'Woman becomes his friend; through woman, the future generations come.',
    },
    {
      id: 'ZAYF',
      src: 'ਭੰਡੁ ਮੁਆ. ਭੰਡੁ ਭਾਲੀਐ; ਭੰਡਿ ਹੋਵੈ ਬੰਧਾਨੁ ॥',
      pronunciation: 'bhañḍ muā. bhañḍ bhālīē; bhañḍ hovē bañdhān ‖',
      translation:
        'When his woman dies, he seeks another woman; to woman he is bound.',
    },
    {
      id: 'VWSU',
      src: 'ਸੋ ਕਿਉ ਮੰਦਾ ਆਖੀਐ; ਜਿਤੁ ਜੰਮਹਿ ਰਾਜਾਨ ॥',
      pronunciation: 'so kiu mañdā ākhīē; jit jañmah rājān ‖',
      translation: 'So why call her bad? From her, kings are born.',
    },
    {
      id: 'QMG5',
      src: 'ਭੰਡਹੁ ਹੀ ਭੰਡੁ ਊਪਜੈ; ਭੰਡੈ ਬਾਝੁ. ਨ ਕੋਇ ॥',
      pronunciation: 'bhañḍah hī bhañḍ ūpajē; bhañḍē bājhu. na koi ‖',
      translation:
        'From woman, woman is born; without woman, there would be no one at all.',
    },
    {
      id: 'WTVE',
      src: 'ਨਾਨਕ. ਭੰਡੈ ਬਾਹਰਾ; ਏਕੋ ਸਚਾ ਸੋਇ ॥',
      pronunciation: 'nānak. bhañḍē bāharā; eko sacā soi ‖',
      translation: 'O Nanak, only the True Lord is without a woman.',
    },
    {
      id: 'E46Q',
      src: 'ਜਿਤੁ ਮੁਖਿ ਸਦਾ ਸਾਲਾਹੀਐ; ਭਾਗਾ ਰਤੀ ਚਾਰਿ ॥',
      pronunciation: 'jit mukh sadā sālāhīē; bhāgā ratī cār ‖',
      translation:
        'That mouth which praises the Lord continually is blessed and beautiful.',
    },
    {
      id: '0V76',
      src: 'ਨਾਨਕ. ਤੇ ਮੁਖ ਊਜਲੇ; ਤਿਤੁ ਸਚੈ ਦਰਬਾਰਿ ॥੨॥',
      pronunciation: 'nānak. te mukh ūjale; tit sacē darabār ‖2‖',
      translation:
        'O Nanak, those faces shall be radiant in the Court of the True Lord. ||2||',
    },
    {
      id: '6YH0',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: '5G81',
      src: 'ਸਭੁ ਕੋ ਆਖੈ ਆਪਣਾ; ਜਿਸੁ ਨਾਹੀ. ਸੋ ਚੁਣਿ ਕਢੀਐ ॥',
      pronunciation: 'sabh ko ākhē āpaṇā; jis nāhī. so cuṇ kaḍhīē ‖',
      translation:
        'All call You their own, Lord; one who does not own You, is picked up and thrown away.',
    },
    {
      id: 'JYK0',
      src: 'ਕੀਤਾ ਆਪੋ ਆਪਣਾ; ਆਪੇ ਹੀ ਲੇਖਾ ਸੰਢੀਐ ॥',
      pronunciation: 'kītā āpo āpaṇā; āpe hī lekhā sañḍhīē ‖',
      translation:
        'Everyone receives the rewards of his own actions; his account is adjusted accordingly.',
    },
    {
      id: 'RTFR',
      src: 'ਜਾ ਰਹਣਾ ਨਾਹੀ. ਐਤੁ ਜਗਿ; ਤਾ ਕਾਇਤੁ ਗਾਰਬਿ ਹੰਢੀਐ ॥',
      pronunciation: 'jā rahaṇā nāhī. ēt jagi; tā kāit gārab hañḍhīē ‖',
      translation:
        'Since one is not destined to remain in this world anyway, why should he ruin himself in pride?',
    },
    {
      id: '4XBW',
      src: 'ਮੰਦਾ. ਕਿਸੈ ਨ ਆਖੀਐ; ਪੜਿ ਅਖਰੁ. ਏਹੋ ਬੁਝੀਐ ॥',
      pronunciation: 'mañdā. kisē na ākhīē; paṛ akharu. eho bujhīē ‖',
      translation: 'Do not call anyone bad; read these words, and understand.',
    },
    {
      id: 'DHG8',
      src: 'ਮੂਰਖੈ ਨਾਲਿ; ਨ ਲੁਝੀਐ ॥੧੯॥',
      pronunciation: 'mūrakhē nāli; na lujhīē ‖19‖',
      translation: "Don't argue with fools. ||19||",
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
