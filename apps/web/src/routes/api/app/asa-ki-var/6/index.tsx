import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 6)',
    roman: 'Āsā kī vār (chakkā 6)',
  },
  paging: {
    previous: 'asa-ki-var/5',
    next: 'asa-ki-var/7',
  },
  data: [
    {
      id: '2NC8',
      src: 'ਪੰਥੁ ਦਸਾਵਾ. ਨਿਤ ਖੜੀ; ਮੁੰਧ ਜੋਬਨਿ ਬਾਲੀ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'pañth dasāvā. nit khaṛī; muñdh joban bālī. rām rāje ‖',
      translation:
        'I stand by the roadside, and ask the way; I am just a youthful bride of the Lord King.',
    },
    {
      id: 'HNKC',
      src: 'ਹਰਿ ਹਰਿ ਨਾਮੁ. ਚੇਤਾਇ ਗੁਰ; ਹਰਿ ਮਾਰਗਿ ਚਾਲੀ ॥',
      pronunciation: 'har har nāmu. cetāi gur; har mārag cālī ‖',
      translation:
        'The Guru has caused me to remember the Name of the Lord, Har, Har; I follow the Path to Him.',
    },
    {
      id: '94AE',
      src: 'ਮੇਰੈ ਮਨਿ ਤਨਿ. ਨਾਮੁ ਆਧਾਰੁ ਹੈ; ਹਉਮੈ ਬਿਖੁ ਜਾਲੀ ॥',
      pronunciation: 'merē man tani. nām ādhār hē; haumē bikh jālī ‖',
      translation:
        'The Naam, the Name of the Lord, is the Support of my mind and body; I have burnt away the poison of ego.',
    },
    {
      id: 'U0TA',
      src: 'ਜਨ ਨਾਨਕ. ਸਤਿਗੁਰੁ ਮੇਲਿ ਹਰਿ; ਹਰਿ ਮਿਲਿਆ ਬਨਵਾਲੀ ॥੨॥',
      pronunciation: 'jan nānak. satigur mel hari; har miliā banavālī ‖2‖',
      translation:
        'O True Guru, unite me with the Lord, unite me with the Lord, adorned with garlands of flowers. ||2||',
    },
    {
      id: 'DGUG',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'QQUJ',
      src: 'ਮੁਸਲਮਾਨਾ. ਸਿਫਤਿ ਸਰੀਅਤਿ; ਪੜਿ ਪੜਿ ਕਰਹਿ ਬੀਚਾਰੁ ॥',
      pronunciation: 'musalamānā. siphat sarīati; paṛ paṛ karah bīcār ‖',
      translation:
        'The Muslims praise the Islamic law; they read and reflect upon it.',
    },
    {
      id: '6ZVX',
      src: 'ਬੰਦੇ ਸੇ. ਜਿ ਪਵਹਿ ਵਿਚਿ ਬੰਦੀ; ਵੇਖਣ ਕਉ ਦੀਦਾਰੁ ॥',
      pronunciation: 'bañde se. ja pawah vic bañdī; vekhaṇ kau dīdār ‖',
      translation:
        "The Lord's bound servants are those who bind themselves to see the Lord's Vision.",
    },
    {
      id: 'EBA7',
      src: 'ਹਿੰਦੂ ਸਾਲਾਹੀ ਸਾਲਾਹਨਿ; ਦਰਸਨਿ ਰੂਪਿ ਅਪਾਰੁ ॥',
      pronunciation: 'hiñdū sālāhī sālāhani; darasan rūp apār ‖',
      translation:
        'The Hindus praise the Praiseworthy Lord; the Blessed Vision of His Darshan, His form is incomparable.',
    },
    {
      id: 'V3XM',
      src: 'ਤੀਰਥਿ ਨਾਵਹਿ, ਅਰਚਾ ਪੂਜਾ; ਅਗਰ ਵਾਸੁ ਬਹਕਾਰੁ ॥',
      pronunciation: 'tīrath nāwahi, aracā pūjā; agar vās bahakār ‖',
      translation:
        'They bathe at sacred shrines of pilgrimage, making offerings of flowers, and burning incense before idols.',
    },
    {
      id: '1F9L',
      src: 'ਜੋਗੀ ਸੁੰਨਿ ਧਿਆਵਨੑਿ ਜੇਤੇ; ਅਲਖ ਨਾਮੁ ਕਰਤਾਰੁ ॥',
      pronunciation: 'jogī suñn dhiāwan jete; alakh nām karatār ‖',
      translation:
        'The Yogis meditate on the absolute Lord there; they call the Creator the Unseen Lord.',
    },
    {
      id: 'ARGD',
      src: 'ਸੂਖਮ ਮੂਰਤਿ. ਨਾਮੁ ਨਿਰੰਜਨ; ਕਾਇਆ ਕਾ ਆਕਾਰੁ ॥',
      pronunciation: 'sūkham mūrati. nām nirañjan; kāiā kā ākār ‖',
      translation:
        'But to the subtle image of the Immaculate Name, they apply the form of a body.',
    },
    {
      id: 'SA7X',
      src: 'ਸਤੀਆ. ਮਨਿ ਸੰਤੋਖੁ ਉਪਜੈ; ਦੇਣੈ ਕੈ ਵੀਚਾਰਿ ॥',
      pronunciation: 'satīā. man sañtokh upajē; deṇē kē vīcār ‖',
      translation:
        'In the minds of the virtuous, contentment is produced, thinking about their giving.',
    },
    {
      id: '4ZZR',
      src: 'ਦੇ ਦੇ ਮੰਗਹਿ, ਸਹਸਾ ਗੂਣਾ; ਸੋਭ ਕਰੇ ਸੰਸਾਰੁ ॥',
      pronunciation: 'de de mañgahi, sahasā gūṇā; sobh kare sañsār ‖',
      translation:
        'They give and give, but ask a thousand-fold more, and hope that the world will honor them.',
    },
    {
      id: 'BKC9',
      src: 'ਚੋਰਾ ਜਾਰਾ ਤੈ ਕੂੜਿਆਰਾ; ਖਾਰਾਬਾ ਵੇਕਾਰ ॥',
      pronunciation: 'corā jārā tē kūṛiārā; khārābā vekār ‖',
      translation: 'The thieves, adulterers, perjurers, evil-doers and sinners',
    },
    {
      id: 'XKFQ',
      src: 'ਇਕਿ. ਹੋਦਾ ਖਾਇ ਚਲਹਿ ਐਥਾਊ; ਤਿਨਾ ਭਿ ਕਾਈ ਕਾਰ ॥',
      pronunciation: 'iki. hodā khāi calah ēthāū; tinā bha kāī kār ‖',
      translation:
        '- after using up what good karma they had, they depart; have they done any good deeds here at all?',
    },
    {
      id: 'JAEC',
      src: 'ਜਲਿ ਥਲਿ ਜੀਆ ਪੁਰੀਆ ਲੋਆ; ਆਕਾਰਾ ਆਕਾਰ ॥',
      pronunciation: 'jal thal jīā purīā loā; ākārā ākār ‖',
      translation:
        'There are beings and creatures in the water and on the land, in the worlds and universes, form upon form.',
    },
    {
      id: 'U97T',
      src: 'ਓਇ ਜਿ ਆਖਹਿ. ਸੁ ਤੂੰਹੈ ਜਾਣਹਿ; ਤਿਨਾ ਭਿ. ਤੇਰੀ ਸਾਰ ॥',
      pronunciation: 'oi ja ākhahi. sa tūñhē jāṇahi; tinā bhi. terī sār ‖',
      translation: 'Whatever they say, You know; You care for them all.',
    },
    {
      id: 'HNGA',
      src: 'ਨਾਨਕ. ਭਗਤਾ ਭੁਖ ਸਾਲਾਹਣੁ; ਸਚੁ ਨਾਮੁ ਆਧਾਰੁ ॥',
      pronunciation: 'nānak. bhagatā bhukh sālāhaṇu; sac nām ādhār ‖',
      translation:
        'O Nanak, the hunger of the devotees is to praise You; the True Name is their only support.',
    },
    {
      id: 'TVY1',
      src: 'ਸਦਾ ਅਨੰਦਿ ਰਹਹਿ. ਦਿਨੁ ਰਾਤੀ; ਗੁਣਵੰਤਿਆ ਪਾ ਛਾਰੁ ॥੧॥',
      pronunciation: 'sadā anañd rahahi. din rātī; guṇawañtiā pā chār ‖1‖',
      translation:
        'They live in eternal bliss, day and night; they are the dust of the feet of the virtuous. ||1||',
    },
    {
      id: 'G25L',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'WD72',
      src: 'ਮਿਟੀ ਮੁਸਲਮਾਨ ਕੀ; ਪੇੜੈ ਪਈ ਕੁਮੑਿਆਰ ॥',
      pronunciation: 'miṭī musalamān kī; peṛē paī kumiār ‖',
      translation:
        "The clay of the Muslim's grave becomes clay for the potter's wheel.",
    },
    {
      id: 'DP7H',
      src: 'ਘੜਿ ਭਾਂਡੇ ਇਟਾ ਕੀਆ; ਜਲਦੀ ਕਰੇ ਪੁਕਾਰ ॥',
      pronunciation: 'ghaṛ bhāñḍe iṭā kīā; jaladī kare pukār ‖',
      translation:
        'Pots and bricks are fashioned from it, and it cries out as it burns.',
    },
    {
      id: 'GT2R',
      src: 'ਜਲਿ ਜਲਿ ਰੋਵੈ ਬਪੁੜੀ; ਝੜਿ ਝੜਿ ਪਵਹਿ ਅੰਗਿਆਰ ॥',
      pronunciation: 'jal jal rovē bapuṛī; jhaṛ jhaṛ pawah añgiār ‖',
      translation:
        'The poor clay burns, burns and weeps, as the fiery coals fall upon it.',
    },
    {
      id: '0ERY',
      src: 'ਨਾਨਕ. ਜਿਨਿ ਕਰਤੈ. ਕਾਰਣੁ ਕੀਆ; ਸੋ ਜਾਣੈ. ਕਰਤਾਰੁ ॥੨॥',
      pronunciation: 'nānak. jin karatē. kāraṇ kīā; so jāṇē. karatār ‖2‖',
      translation:
        'O Nanak, the Creator created the creation; the Creator Lord alone knows. ||2||',
    },
    {
      id: 'KVTT',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'ECF9',
      src: 'ਬਿਨੁ ਸਤਿਗੁਰ. ਕਿਨੈ ਨ ਪਾਇਓ; ਬਿਨੁ ਸਤਿਗੁਰ. ਕਿਨੈ ਨ ਪਾਇਆ ॥',
      pronunciation: 'bin satigur. kinē na pāio; bin satigur. kinē na pāiā ‖',
      translation:
        'Without the True Guru, no one has obtained the Lord; without the True Guru, no one has obtained the Lord.',
    },
    {
      id: 'J8C9',
      src: 'ਸਤਿਗੁਰ ਵਿਚਿ. ਆਪੁ ਰਖਿਓਨੁ; ਕਰਿ ਪਰਗਟੁ. ਆਖਿ ਸੁਣਾਇਆ ॥',
      pronunciation: 'satigur vici. āp rakhionu; kar paragaṭu. ākh suṇāiā ‖',
      translation:
        'He has placed Himself within the True Guru; revealing Himself, He declares this openly.',
    },
    {
      id: 'DJNC',
      src: 'ਸਤਿਗੁਰ ਮਿਲਿਐ. ਸਦਾ ਮੁਕਤੁ ਹੈ; ਜਿਨਿ ਵਿਚਹੁ ਮੋਹੁ ਚੁਕਾਇਆ ॥',
      pronunciation: 'satigur miliē. sadā mukat hē; jin vicah moh cukāiā ‖',
      translation:
        'Meeting the True Guru, eternal liberation is obtained; He has banished attachment from within.',
    },
    {
      id: 'EZ5K',
      src: 'ਉਤਮੁ ਏਹੁ ਬੀਚਾਰੁ ਹੈ; ਜਿਨਿ. ਸਚੇ ਸਿਉ ਚਿਤੁ ਲਾਇਆ ॥',
      pronunciation: 'utam eh bīcār hē; jini. sace siu cit lāiā ‖',
      translation:
        "This is the highest thought, that one's consciousness is attached to the True Lord.",
    },
    {
      id: 'USJC',
      src: 'ਜਗਜੀਵਨੁ ਦਾਤਾ; ਪਾਇਆ ॥੬॥',
      pronunciation: 'jagajīwan dātā; pāiā ‖6‖',
      translation:
        'Thus the Lord of the World, the Great Giver is obtained. ||6||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
