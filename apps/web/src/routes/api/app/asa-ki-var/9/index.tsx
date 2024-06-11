import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 9)',
    roman: 'Āsā kī vār (chakkā 9)',
  },
  paging: {
    previous: 'asa-ki-var/8',
    next: 'asa-ki-var/10',
  },
  data: [
    {
      id: 'MTM0',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ॥',
      pronunciation: 'āsā mahalā 4 ‖',
      translation: 'Aasaa, Fourth Mehl:',
    },
    {
      id: '732T',
      src: 'ਹਰਿ ਅੰਮ੍ਰਿਤ ਭਗਤਿ ਭੰਡਾਰ ਹੈ; ਗੁਰ ਸਤਿਗੁਰ ਪਾਸੇ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'har añmrit bhagat bhañḍār hē; gur satigur pāse. rām rāje ‖',
      translation:
        "The treasure of Ambrosial Nectar, the Lord's devotional service, is found through the Guru, the True Guru, O Lord King.",
    },
    {
      id: 'EDD3',
      src: 'ਗੁਰੁ ਸਤਿਗੁਰੁ ਸਚਾ ਸਾਹੁ ਹੈ; ਸਿਖ ਦੇਇ. ਹਰਿ ਰਾਸੇ ॥',
      pronunciation: 'gur satigur sacā sāh hē; sikh dei. har rāse ‖',
      translation:
        'The Guru, the True Guru, is the True Banker, who gives to His Sikh the capital of the Lord.',
    },
    {
      id: 'SDLT',
      src: 'ਧਨੁ ਧੰਨੁ ਵਣਜਾਰਾ ਵਣਜੁ ਹੈ; ਗੁਰੁ ਸਾਹੁ ਸਾਬਾਸੇ ॥',
      pronunciation: 'dhan dhañn waṇajārā waṇaj hē; gur sāh sābāse ‖',
      translation:
        'Blessed, blessed is the trader and the trade; how wonderful is the Banker, the Guru!',
    },
    {
      id: 'UMK0',
      src: 'ਜਨੁ ਨਾਨਕੁ. ਗੁਰੁ ਤਿਨੑੀ ਪਾਇਆ; ਜਿਨ ਧੁਰਿ ਲਿਖਤੁ ਲਿਲਾਟਿ ਲਿਖਾਸੇ ॥੧॥',
      pronunciation:
        'jan nānaku. gur tinī pāiā; jin dhur likhat lilāṭ likhāse ‖1‖',
      translation:
        'O servant Nanak, they alone obtain the Guru, who have such pre-ordained destiny written upon their foreheads. ||1||',
    },
    {
      id: '56YW',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '9E6Q',
      src: 'ਪੜਿ ਪੜਿ ਗਡੀ ਲਦੀਅਹਿ; ਪੜਿ ਪੜਿ ਭਰੀਅਹਿ ਸਾਥ ॥',
      pronunciation: 'paṛ paṛ gaḍī ladīahi; paṛ paṛ bharīah sāth ‖',
      translation:
        'You may read and read loads of books; you may read and study vast multitudes of books.',
    },
    {
      id: 'CRDD',
      src: 'ਪੜਿ ਪੜਿ ਬੇੜੀ ਪਾਈਐ; ਪੜਿ ਪੜਿ ਗਡੀਅਹਿ ਖਾਤ ॥',
      pronunciation: 'paṛ paṛ beṛī pāīē; paṛ paṛ gaḍīah khāt ‖',
      translation:
        'You may read and read boat-loads of books; you may read and read and fill pits with them.',
    },
    {
      id: 'YBVV',
      src: 'ਪੜੀਅਹਿ ਜੇਤੇ ਬਰਸ ਬਰਸ; ਪੜੀਅਹਿ ਜੇਤੇ ਮਾਸ ॥',
      pronunciation: 'paṛīah jete baras baras; paṛīah jete mās ‖',
      translation:
        'You may read them year after year; you may read them as many months are there are.',
    },
    {
      id: '4QRR',
      src: 'ਪੜੀਐ ਜੇਤੀ ਆਰਜਾ; ਪੜੀਅਹਿ ਜੇਤੇ ਸਾਸ ॥',
      pronunciation: 'paṛīē jetī ārajā; paṛīah jete sās ‖',
      translation:
        'You may read them all your life; you may read them with every breath.',
    },
    {
      id: '1827',
      src: 'ਨਾਨਕ. ਲੇਖੈ ਇਕ ਗਲ; ਹੋਰੁ ਹਉਮੈ ਝਖਣਾ ਝਾਖ ॥੧॥',
      pronunciation: 'nānak. lekhē ik gal; hor haumē jhakhaṇā jhākh ‖1‖',
      translation:
        'O Nanak, only one thing is of any account: everything else is useless babbling and idle talk in ego. ||1||',
    },
    {
      id: '9SFP',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'YGF5',
      src: 'ਲਿਖਿ ਲਿਖਿ ਪੜਿਆ; ॥ ਤੇਤਾ ਕੜਿਆ ॥',
      pronunciation: 'likh likh paṛiā; ‖ tetā kaṛiā ‖',
      translation: 'The more one write and reads, the more one burns.',
    },
    {
      id: 'YRD5',
      src: 'ਬਹੁ ਤੀਰਥ ਭਵਿਆ. ॥ ਤੇਤੋ ਲਵਿਆ ॥',
      pronunciation: 'bah tīrath bhaviā. ‖ teto laviā ‖',
      translation:
        'The more one wanders at sacred shrines of pilgrimage, the more one talks uselessly.',
    },
    {
      id: '493V',
      src: 'ਬਹੁ ਭੇਖ ਕੀਆ; ਦੇਹੀ ਦੁਖੁ ਦੀਆ ॥',
      pronunciation: 'bah bhekh kīā; dehī dukh dīā ‖',
      translation:
        'The more one wears religious robes, the more pain he causes his body.',
    },
    {
      id: 'S04M',
      src: 'ਸਹੁ ਵੇ ਜੀਆ, ਅਪਣਾ ਕੀਆ ॥',
      pronunciation: 'sah ve jīā, apaṇā kīā ‖',
      translation:
        'O my soul, you must endure the consequences of your own actions.',
    },
    {
      id: 'DY8W',
      src: 'ਅੰਨੁ. ਨ ਖਾਇਆ; ਸਾਦੁ ਗਵਾਇਆ ॥',
      pronunciation: 'añnu. na khāiā; sād gavāiā ‖',
      translation: 'One who does not eat the corn, misses out on the taste.',
    },
    {
      id: 'ZM3Q',
      src: 'ਬਹੁ ਦੁਖੁ ਪਾਇਆ; ਦੂਜਾ ਭਾਇਆ ॥',
      pronunciation: 'bah dukh pāiā; dūjā bhāiā ‖',
      translation: 'One obtains great pain, in the love of duality.',
    },
    {
      id: 'PL8D',
      src: 'ਬਸਤ੍ਰ ਨ ਪਹਿਰੈ; ॥ ਅਹਿਨਿਸਿ ਕਹਰੈ ॥',
      pronunciation: 'basatr na pahirē; ‖ ahinis kaharē ‖',
      translation: 'One who does not wear any clothes, suffers night and day.',
    },
    {
      id: 'WPSU',
      src: 'ਮੋਨਿ ਵਿਗੂਤਾ; ॥ ਕਿਉ ਜਾਗੈ. ਗੁਰ ਬਿਨੁ, ਸੂਤਾ ॥',
      pronunciation: 'mon vigūtā; ‖ kiu jāgē. gur binu, sūtā ‖',
      translation:
        'Through silence, he is ruined. How can the sleeping one be awakened without the Guru?',
    },
    {
      id: 'E709',
      src: 'ਪਗ ਉਪੇਤਾਣਾ; ॥ ਅਪਣਾ ਕੀਆ ਕਮਾਣਾ ॥',
      pronunciation: 'pag upetāṇā; ‖ apaṇā kīā kamāṇā ‖',
      translation: 'One who goes barefoot suffers by his own actions.',
    },
    {
      id: 'LJU1',
      src: 'ਅਲੁ ਮਲੁ ਖਾਈ; ਸਿਰਿ ਛਾਈ ਪਾਈ ॥',
      pronunciation: 'al mal khāī; sir chāī pāī ‖',
      translation: 'One who eats filth and throws ashes on his head',
    },
    {
      id: 'T8LZ',
      src: 'ਮੂਰਖਿ ਅੰਧੈ; ਪਤਿ ਗਵਾਈ ॥',
      pronunciation: 'mūrakh añdhē; pat gavāī ‖',
      translation: 'the blind fool loses his honor.',
    },
    {
      id: 'R5ZK',
      src: 'ਵਿਣੁ ਨਾਵੈ; ਕਿਛੁ. ਥਾਇ ਨ ਪਾਈ ॥',
      pronunciation: 'viṇ nāvē; kichu. thāi na pāī ‖',
      translation: 'Without the Name, nothing is of any use.',
    },
    {
      id: 'ZVGP',
      src: 'ਰਹੈ ਬੇਬਾਣੀ; ਮੜੀ ਮਸਾਣੀ ॥',
      pronunciation: 'rahē bebāṇī; maṛī masāṇī ‖',
      translation:
        'One who lives in the wilderness, in cemetaries and cremation grounds',
    },
    {
      id: 'BCWR',
      src: 'ਅੰਧੁ ਨ ਜਾਣੈ; ਫਿਰਿ ਪਛੁਤਾਣੀ ॥',
      pronunciation: 'añdh na jāṇē; phir pachutāṇī ‖',
      translation:
        '- that blind man does not know the Lord; he regrets and repents in the end.',
    },
    {
      id: 'PAPD',
      src: 'ਸਤਿਗੁਰੁ ਭੇਟੇ; ਸੋ ਸੁਖੁ ਪਾਏ ॥',
      pronunciation: 'satigur bheṭe; so sukh pāe ‖',
      translation: 'One who meets the True Guru finds peace.',
    },
    {
      id: '1P09',
      src: 'ਹਰਿ ਕਾ ਨਾਮੁ; ਮੰਨਿ ਵਸਾਏ ॥',
      pronunciation: 'har kā nāmu; mañn wasāe ‖',
      translation: 'He enshrines the Name of the Lord in his mind.',
    },
    {
      id: '9WJN',
      src: 'ਨਾਨਕ. ਨਦਰਿ ਕਰੇ; ਸੋ ਪਾਏ ॥',
      pronunciation: 'nānak. nadar kare; so pāe ‖',
      translation: 'O Nanak, when the Lord grants His Grace, He is obtained.',
    },
    {
      id: 'BJLC',
      src: 'ਆਸ ਅੰਦੇਸੇ ਤੇ. ਨਿਹਕੇਵਲੁ; ਹਉਮੈ. ਸਬਦਿ ਜਲਾਏ ॥੨॥',
      pronunciation: 'ās añdese te. nihakewalu; haumē. sabad jalāe ‖2‖',
      translation:
        'He becomes free of hope and fear, and burns away his ego with the Word of the Shabad. ||2||',
    },
    {
      id: '73EQ',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'JY3A',
      src: 'ਭਗਤ. ਤੇਰੈ ਮਨਿ ਭਾਵਦੇ; ਦਰਿ ਸੋਹਨਿ. ਕੀਰਤਿ ਗਾਵਦੇ ॥',
      pronunciation: 'bhagat. terē man bhāwade; dar sohani. kīrat gāwade ‖',
      translation:
        'Your devotees are pleasing to Your Mind, Lord. They look beautiful at Your door, singing Your Praises.',
    },
    {
      id: 'CHF5',
      src: 'ਨਾਨਕ. ਕਰਮਾ ਬਾਹਰੇ; ਦਰਿ ਢੋਅ. ਨ ਲਹਨੑੀ ਧਾਵਦੇ ॥',
      pronunciation: 'nānak. karamā bāhare; dar ḍhoa. na lahanī dhāwade ‖',
      translation:
        'O Nanak, those who are denied Your Grace, find no shelter at Your Door; they continue wandering.',
    },
    {
      id: 'BN22',
      src: 'ਇਕਿ. ਮੂਲੁ ਨ ਬੁਝਨੑਿ, ਆਪਣਾ; ਅਣਹੋਦਾ ਆਪੁ ਗਣਾਇਦੇ ॥',
      pronunciation: 'iki. mūl na bujhani, āpaṇā; aṇahodā āp gaṇāide ‖',
      translation:
        'Some do not understand their origins, and without cause, they display their self-conceit.',
    },
    {
      id: '84WZ',
      src: 'ਹਉ ਢਾਢੀ ਕਾ ਨੀਚ ਜਾਤਿ; ਹੋਰਿ ਉਤਮ ਜਾਤਿ ਸਦਾਇਦੇ ॥',
      pronunciation: 'hau ḍhāḍhī kā nīc jāti; hor utam jāt sadāide ‖',
      translation:
        "I am the Lord's minstrel, of low social status; others call themselves high caste.",
    },
    {
      id: '35QW',
      src: 'ਤਿਨੑ ਮੰਗਾ; ਜਿ ਤੁਝੈ ਧਿਆਇਦੇ ॥੯॥',
      pronunciation: 'tin mañgā; ja tujhē dhiāide ‖9‖',
      translation: 'I seek those who meditate on You. ||9||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
