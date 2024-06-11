import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 8)',
    roman: 'Āsā kī vār (chakkā 8)',
  },
  paging: {
    previous: 'asa-ki-var/7',
    next: 'asa-ki-var/9',
  },
  data: [
    {
      id: '1MJB',
      src: 'ਗੁਰ ਅੰਮ੍ਰਿਤ ਭਿੰਨੀ ਦੇਹੁਰੀ; ਅੰਮ੍ਰਿਤੁ ਬੁਰਕੇ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'gur añmrit bhiñnī dehurī; añmrit burake. rām rāje ‖',
      translation:
        "The Guru's body is drenched with Ambrosial Nectar; He sprinkles it upon me, O Lord King.",
    },
    {
      id: '7KBS',
      src: 'ਜਿਨਾ. ਗੁਰਬਾਣੀ ਮਨਿ ਭਾਈਆ; ਅੰਮ੍ਰਿਤਿ ਛਕਿ ਛਕੇ ॥',
      pronunciation: 'jinā. gurabāṇī man bhāīā; añmrit chak chake ‖',
      translation:
        "Those whose minds are pleased with the Word of the Guru's Bani, drink in the Ambrosial Nectar again and again.",
    },
    {
      id: '3B62',
      src: 'ਗੁਰ ਤੁਠੈ. ਹਰਿ ਪਾਇਆ; ਚੂਕੇ ਧਕ ਧਕੇ ॥',
      pronunciation: 'gur tuṭhē. har pāiā; cūke dhak dhake ‖',
      translation:
        'As the Guru is pleased, the Lord is obtained, and you shall not be pushed around any more.',
    },
    {
      id: 'ZWJD',
      src: 'ਹਰਿ ਜਨੁ. ਹਰਿ ਹਰਿ ਹੋਇਆ; ਨਾਨਕੁ. ਹਰਿ ਇਕੇ ॥੪॥੯॥੧੬॥',
      pronunciation: 'har janu. har har hoiā; nānaku. har ike ‖4‖9‖16‖',
      translation:
        "The Lord's humble servant becomes the Lord, Har, Har; O Nanak, the Lord and His servant are one and the same. ||4||9||16||",
    },
    {
      id: 'S72C',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'U6G9',
      src: 'ਪੁਰਖਾਂ ਬਿਰਖਾਂ ਤੀਰਥਾਂ; ਤਟਾਂ ਮੇਘਾਂ ਖੇਤਾਂਹ ॥',
      pronunciation: 'purakhāñ birakhāñ tīrathāñ; taṭāñ meghāñ khetāñh ‖',
      translation:
        'Men, trees, sacred shrines of pilgrimage, banks of sacred rivers, clouds, fields,',
    },
    {
      id: 'QDQU',
      src: 'ਦੀਪਾਂ ਲੋਆਂ ਮੰਡਲਾਂ; ਖੰਡਾਂ ਵਰਭੰਡਾਂਹ ॥',
      pronunciation: 'dīpāñ loāñ mañḍalāñ; khañḍāñ warabhañḍāñh ‖',
      translation: 'islands, continents, worlds, solar systems, and universes;',
    },
    {
      id: 'P8X9',
      src: 'ਅੰਡਜ ਜੇਰਜ ਉਤਭੁਜਾਂ; ਖਾਣੀ ਸੇਤਜਾਂਹ ॥',
      pronunciation: 'añḍaj jeraj utabhujāñ; khāṇī setajāñh ‖',
      translation:
        'the four sources of creation - born of eggs, born of the womb, born of the earth and born of sweat;',
    },
    {
      id: '576E',
      src: 'ਸੋ ਮਿਤਿ ਜਾਣੈ ਨਾਨਕਾ; ਸਰਾਂ ਮੇਰਾਂ ਜੰਤਾਹ ॥',
      pronunciation: 'so mit jāṇē nānakā; sarāñ merāñ jañtāh ‖',
      translation:
        'oceans, mountains, and all beings - O Nanak, He alone knows their condition.',
    },
    {
      id: 'SBQ8',
      src: 'ਨਾਨਕ. ਜੰਤ ਉਪਾਇ ਕੈ; ਸੰਮਾਲੇ ਸਭਨਾਹ ॥',
      pronunciation: 'nānak. jañt upāi kē; sañmāle sabhanāh ‖',
      translation:
        'O Nanak, having created the living beings, He cherishes them all.',
    },
    {
      id: 'RSNE',
      src: 'ਜਿਨਿ ਕਰਤੈ ਕਰਣਾ ਕੀਆ; ਚਿੰਤਾ ਭਿ ਕਰਣੀ ਤਾਹ ॥',
      pronunciation: 'jin karatē karaṇā kīā; ciñtā bha karaṇī tāh ‖',
      translation:
        'The Creator who created the creation, takes care of it as well.',
    },
    {
      id: 'DZC6',
      src: 'ਸੋ ਕਰਤਾ ਚਿੰਤਾ ਕਰੇ; ਜਿਨਿ ਉਪਾਇਆ ਜਗੁ ॥',
      pronunciation: 'so karatā ciñtā kare; jin upāiā jag ‖',
      translation: 'He, the Creator who formed the world, cares for it.',
    },
    {
      id: 'Q3LT',
      src: 'ਤਿਸੁ ਜੋਹਾਰੀ. ਸੁਅਸਤਿ ਤਿਸੁ; ਤਿਸੁ ਦੀਬਾਣੁ ਅਭਗੁ ॥',
      pronunciation: 'tis johārī. suasat tisu; tis dībāṇ abhag ‖',
      translation:
        'Unto Him I bow and offer my reverence; His Royal Court is eternal.',
    },
    {
      id: '9N7B',
      src: 'ਨਾਨਕ. ਸਚੇ ਨਾਮ ਬਿਨੁ; ਕਿਆ ਟਿਕਾ. ਕਿਆ ਤਗੁ ॥੧॥',
      pronunciation: 'nānak. sace nām binu; kiā ṭikā. kiā tag ‖1‖',
      translation:
        'O Nanak, without the True Name, of what use is the frontal mark of the Hindus, or their sacred thread? ||1||',
    },
    {
      id: '8EW0',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '99ZL',
      src: 'ਲਖ ਨੇਕੀਆ ਚੰਗਿਆਈਆ; ਲਖ ਪੁੰਨਾ ਪਰਵਾਣੁ ॥',
      pronunciation: 'lakh nekīā cañgiāīā; lakh puñnā paravāṇ ‖',
      translation:
        'Hundreds of thousands of virtues and good actions, and hundreds of thousands of blessed charities,',
    },
    {
      id: 'Y89L',
      src: 'ਲਖ ਤਪ ਉਪਰਿ ਤੀਰਥਾਂ; ਸਹਜ ਜੋਗ ਬੇਬਾਣ ॥',
      pronunciation: 'lakh tap upar tīrathāñ; sahaj jog bebāṇ ‖',
      translation:
        'hundreds of thousands of penances at sacred shrines, and the practice of Sehj Yoga in the wilderness,',
    },
    {
      id: '7H3B',
      src: 'ਲਖ ਸੂਰਤਣ ਸੰਗਰਾਮ; ਰਣ ਮਹਿ ਛੁਟਹਿ ਪਰਾਣ ॥',
      pronunciation: 'lakh sūrataṇ sañgarām; raṇ mah chuṭah parāṇ ‖',
      translation:
        'hundreds of thousands of courageous actions and giving up the breath of life on the field of battle,',
    },
    {
      id: '23N6',
      src: 'ਲਖ ਸੁਰਤੀ. ਲਖ ਗਿਆਨ ਧਿਆਨ; ਪੜੀਅਹਿ ਪਾਠ ਪੁਰਾਣ ॥',
      pronunciation: 'lakh suratī. lakh giān dhiān; paṛīah pāṭh purāṇ ‖',
      translation:
        'hundreds of thousands of divine understandings, hundreds of thousands of divine wisdoms and meditations and readings of the Vedas and the Puraanas',
    },
    {
      id: '7TXP',
      src: 'ਜਿਨਿ ਕਰਤੈ ਕਰਣਾ ਕੀਆ; ਲਿਖਿਆ ਆਵਣ ਜਾਣੁ ॥',
      pronunciation: 'jin karatē karaṇā kīā; likhiā āwaṇ jāṇ ‖',
      translation:
        '- before the Creator who created the creation, and who ordained coming and going,',
    },
    {
      id: '5TDG',
      src: 'ਨਾਨਕ. ਮਤੀ ਮਿਥਿਆ; ਕਰਮੁ ਸਚਾ ਨੀਸਾਣੁ ॥੨॥',
      pronunciation: 'nānak. matī mithiā; karam sacā nīsāṇ ‖2‖',
      translation:
        'O Nanak, all these things are false. True is the Insignia of His Grace. ||2||',
    },
    {
      id: '022Y',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'H061',
      src: 'ਸਚਾ ਸਾਹਿਬੁ ਏਕੁ ਤੂੰ; ਜਿਨਿ ਸਚੋ ਸਚੁ ਵਰਤਾਇਆ ॥',
      pronunciation: 'sacā sāhib ek tūñ; jin saco sac waratāiā ‖',
      translation:
        'You alone are the True Lord. The Truth of Truths is pervading everywhere.',
    },
    {
      id: 'RB3K',
      src: 'ਜਿਸੁ ਤੂੰ ਦੇਹਿ, ਤਿਸੁ ਮਿਲੈ ਸਚੁ; ਤਾ ਤਿਨੑੀ ਸਚੁ ਕਮਾਇਆ ॥',
      pronunciation: 'jis tūñ dehi, tis milē sacu; tā tinī sac kamāiā ‖',
      translation:
        'He alone receives the Truth, unto whom You give it; then, he practices Truth.',
    },
    {
      id: 'F4LQ',
      src: 'ਸਤਿਗੁਰਿ ਮਿਲਿਐ. ਸਚੁ ਪਾਇਆ; ਜਿਨੑ ਕੈ ਹਿਰਦੈ ਸਚੁ ਵਸਾਇਆ ॥',
      pronunciation: 'satigur miliē. sac pāiā; jin kē hiradē sac wasāiā ‖',
      translation:
        'Meeting the True Guru, Truth is found. In His Heart, Truth is abiding.',
    },
    {
      id: 'GKLA',
      src: 'ਮੂਰਖ. ਸਚੁ ਨ ਜਾਣਨੑੀ; ਮਨਮੁਖੀ ਜਨਮੁ ਗਵਾਇਆ ॥',
      pronunciation: 'mūrakh. sac na jāṇanī; manamukhī janam gavāiā ‖',
      translation:
        'The fools do not know the Truth. The self-willed manmukhs waste their lives away in vain.',
    },
    {
      id: 'NPE9',
      src: 'ਵਿਚਿ ਦੁਨੀਆ; ਕਾਹੇ ਆਇਆ ॥੮॥',
      pronunciation: 'vic dunīā; kāhe āiā ‖8‖',
      translation: 'Why have they even come into the world? ||8||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
