import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 16)',
    roman: 'Āsā kī vār (chakkā 16)',
  },
  paging: {
    previous: 'asa-ki-var/15',
    next: 'asa-ki-var/17',
  },
  data: [
    {
      id: '8WA0',
      src: 'ਕੋਈ ਗਾਵੈ. ਰਾਗੀ ਨਾਦੀ ਬੇਦੀ. ਬਹੁ ਭਾਤਿ ਕਰਿ; ਨਹੀ ਹਰਿ ਹਰਿ ਭੀਜੈ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'koī gāvē. rāgī nādī bedī. bah bhāt kari; nahī har har bhījē. rām rāje ‖',
      translation:
        'Some sing of the Lord, through musical Ragas and the sound current of the Naad, through the Vedas, and in so many ways. But the Lord, Har, Har, is not pleased by these, O Lord King.',
    },
    {
      id: '1XN2',
      src: 'ਜਿਨਾ ਅੰਤਰਿ. ਕਪਟੁ ਵਿਕਾਰੁ ਹੈ; ਤਿਨਾ ਰੋਇ. ਕਿਆ ਕੀਜੈ ॥',
      pronunciation: 'jinā añtari. kapaṭ vikār hē; tinā roi. kiā kījē ‖',
      translation:
        'Those who are filled with fraud and corruption within - what good does it do for them to cry out?',
    },
    {
      id: 'F0LB',
      src: 'ਹਰਿ ਕਰਤਾ. ਸਭੁ ਕਿਛੁ ਜਾਣਦਾ; ਸਿਰਿ ਰੋਗ ਹਥੁ ਦੀਜੈ ॥',
      pronunciation: 'har karatā. sabh kich jāṇadā; sir rog hath dījē ‖',
      translation:
        'The Creator Lord knows everything, although they may try to hide their sins and the causes of their diseases.',
    },
    {
      id: 'N46V',
      src: 'ਜਿਨਾ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਹਿਰਦਾ ਸੁਧੁ ਹੈ; ਹਰਿ ਭਗਤਿ ਹਰਿ ਲੀਜੈ ॥੪॥੧੧॥੧੮॥',
      pronunciation:
        'jinā nānak. guramukh hiradā sudh hē; har bhagat har lījē ‖4‖11‖18‖',
      translation:
        'O Nanak, those Gurmukhs whose hearts are pure, obtain the Lord, Har, Har, by devotional worship. ||4||11||18||',
    },
    {
      id: '847M',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'Z2VV',
      src: 'ਗਊ ਬਿਰਾਹਮਣ ਕਉ ਕਰੁ ਲਾਵਹੁ; ਗੋਬਰਿ. ਤਰਣੁ ਨ ਜਾਈ ॥',
      pronunciation: 'gaū birāhamaṇ kau kar lāwahu; gobari. taraṇ na jāī ‖',
      translation:
        'They tax the cows and the Brahmins, but the cow-dung they apply to their kitchen will not save them.',
    },
    {
      id: '0ABK',
      src: 'ਧੋਤੀ ਟਿਕਾ ਤੈ ਜਪਮਾਲੀ; ਧਾਨੁ ਮਲੇਛਾਂ ਖਾਈ ॥',
      pronunciation: 'dhotī ṭikā tē japamālī; dhān malechāñ khāī ‖',
      translation:
        'They wear their loin cloths, apply ritual frontal marks to their foreheads, and carry their rosaries, but they eat food with the Muslims.',
    },
    {
      id: '8G8D',
      src: 'ਅੰਤਰਿ ਪੂਜਾ. ਪੜਹਿ ਕਤੇਬਾ; ਸੰਜਮੁ ਤੁਰਕਾ ਭਾਈ ॥',
      pronunciation: 'añtar pūjā. paṛah katebā; sañjam turakā bhāī ‖',
      translation:
        'O Siblings of Destiny, you perform devotional worship indoors, but read the Islamic sacred texts, and adopt the Muslim way of life.',
    },
    {
      id: 'JT2J',
      src: 'ਛੋਡੀਲੇ ਪਾਖੰਡਾ ॥',
      pronunciation: 'choḍīle pākhañḍā ‖',
      translation: 'Renounce your hypocrisy!',
    },
    {
      id: 'N7V7',
      src: 'ਨਾਮਿ ਲਇਐ; ਜਾਹਿ ਤਰੰਦਾ ॥੧॥',
      pronunciation: 'nām laiē; jāh tarañdā ‖1‖',
      translation:
        'Taking the Naam, the Name of the Lord, you shall swim across. ||1||',
    },
    {
      id: 'YR1X',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '7D3N',
      src: 'ਮਾਣਸ ਖਾਣੇ; ਕਰਹਿ ਨਿਵਾਜ ॥',
      pronunciation: 'māṇas khāṇe; karah nivāj ‖',
      translation: 'The man-eaters say their prayers.',
    },
    {
      id: 'D7LT',
      src: 'ਛੁਰੀ ਵਗਾਇਨਿ; ਤਿਨ ਗਲਿ ਤਾਗ ॥',
      pronunciation: 'churī wagāini; tin gal tāg ‖',
      translation:
        'Those who wield the knife wear the sacred thread around their necks.',
    },
    {
      id: 'MZ3N',
      src: 'ਤਿਨ ਘਰਿ; ਬ੍ਰਹਮਣ ਪੂਰਹਿ ਨਾਦ ॥',
      pronunciation: 'tin ghari; brahamaṇ pūrah nād ‖',
      translation: 'In their homes, the Brahmins sound the conch.',
    },
    {
      id: '9NZ6',
      src: 'ਉਨੑਾ ਭਿ ਆਵਹਿ ਓਈ ਸਾਦ ॥',
      pronunciation: 'unā bha āwah oī sād ‖',
      translation: 'They too have the same taste.',
    },
    {
      id: 'Y8SH',
      src: 'ਕੂੜੀ ਰਾਸਿ, ਕੂੜਾ ਵਾਪਾਰੁ ॥',
      pronunciation: 'kūṛī rāsi, kūṛā vāpār ‖',
      translation: 'False is their capital, and false is their trade.',
    },
    {
      id: '285T',
      src: 'ਕੂੜੁ ਬੋਲਿ, ਕਰਹਿ ਆਹਾਰੁ ॥',
      pronunciation: 'kūṛ boli, karah āhār ‖',
      translation: 'Speaking falsehood, they take their food.',
    },
    {
      id: 'XCJG',
      src: 'ਸਰਮ ਧਰਮ ਕਾ ਡੇਰਾ ਦੂਰਿ ॥',
      pronunciation: 'saram dharam kā ḍerā dūr ‖',
      translation: 'The home of modesty and Dharma is far from them.',
    },
    {
      id: 'B3S9',
      src: 'ਨਾਨਕ. ਕੂੜੁ ਰਹਿਆ ਭਰਪੂਰਿ ॥',
      pronunciation: 'nānak. kūṛ rahiā bharapūr ‖',
      translation: 'O Nanak, they are totally permeated with falsehood.',
    },
    {
      id: '7MPX',
      src: 'ਮਥੈ ਟਿਕਾ ਤੇੜਿ ਧੋਤੀ ਕਖਾਈ ॥',
      pronunciation: 'mathē ṭikā teṛ dhotī kakhāī ‖',
      translation:
        'The sacred marks are on their foreheads, and the saffron loin-cloths are around their waists;',
    },
    {
      id: 'D7GJ',
      src: 'ਹਥਿ ਛੁਰੀ; ਜਗਤ ਕਾਸਾਈ ॥',
      pronunciation: 'hath churī; jagat kāsāī ‖',
      translation:
        'in their hands they hold the knives - they are the butchers of the world!',
    },
    {
      id: 'UB65',
      src: 'ਨੀਲ ਵਸਤ੍ਰ ਪਹਿਰਿ; ਹੋਵਹਿ ਪਰਵਾਣੁ ॥',
      pronunciation: 'nīl wasatr pahiri; howah paravāṇ ‖',
      translation:
        'Wearing blue robes, they seek the approval of the Muslim rulers.',
    },
    {
      id: 'A1M1',
      src: 'ਮਲੇਛ ਧਾਨੁ ਲੇ; ਪੂਜਹਿ ਪੁਰਾਣੁ ॥',
      pronunciation: 'malech dhān le; pūjah purāṇ ‖',
      translation:
        'Accepting bread from the Muslim rulers, they still worship the Puraanas.',
    },
    {
      id: '6WBF',
      src: 'ਅਭਾਖਿਆ ਕਾ ਕੁਠਾ; ਬਕਰਾ ਖਾਣਾ ॥',
      pronunciation: 'abhākhiā kā kuṭhā; bakarā khāṇā ‖',
      translation:
        'They eat the meat of the goats, killed after the Muslim prayers are read over them,',
    },
    {
      id: 'Z9ZN',
      src: 'ਚਉਕੇ ਉਪਰਿ. ਕਿਸੈ ਨ ਜਾਣਾ ॥',
      pronunciation: 'cauke upari. kisē na jāṇā ‖',
      translation:
        'but they do not allow anyone else to enter their kitchen areas.',
    },
    {
      id: 'BU59',
      src: 'ਦੇ ਕੈ ਚਉਕਾ, ਕਢੀ ਕਾਰ ॥',
      pronunciation: 'de kē caukā, kaḍhī kār ‖',
      translation:
        'They draw lines around them, plastering the ground with cow-dung.',
    },
    {
      id: 'PJ1T',
      src: 'ਉਪਰਿ ਆਇ ਬੈਠੇ. ਕੂੜਿਆਰ ॥',
      pronunciation: 'upar āi bēṭhe. kūṛiār ‖',
      translation: 'The false come and sit within them.',
    },
    {
      id: 'N3CC',
      src: 'ਮਤੁ ਭਿਟੈ ਵੇ ਮਤੁ ਭਿਟੈ ॥',
      pronunciation: 'mat bhiṭē ve mat bhiṭē ‖',
      translation: 'They cry out, "Do not touch our food,',
    },
    {
      id: 'KNNK',
      src: 'ਇਹੁ ਅੰਨੁ ਅਸਾਡਾ ਫਿਟੈ ॥',
      pronunciation: 'ih añn asāḍā phiṭē ‖',
      translation: 'Or it will be polluted!"',
    },
    {
      id: 'FQL9',
      src: 'ਤਨਿ ਫਿਟੈ ਫੇੜ ਕਰੇਨਿ ॥',
      pronunciation: 'tan phiṭē pheṛ karen ‖',
      translation: 'But with their polluted bodies, they commit evil deeds.',
    },
    {
      id: '48N5',
      src: 'ਮਨਿ ਜੂਠੈ ਚੁਲੀ ਭਰੇਨਿ ॥',
      pronunciation: 'man jūṭhē culī bharen ‖',
      translation: 'With filthy minds, they try to cleanse their mouths.',
    },
    {
      id: '9G8N',
      src: 'ਕਹੁ ਨਾਨਕ. ਸਚੁ ਧਿਆਈਐ ॥',
      pronunciation: 'kah nānak. sac dhiāīē ‖',
      translation: 'Says Nanak, meditate on the True Lord.',
    },
    {
      id: 'WFBX',
      src: 'ਸੁਚਿ ਹੋਵੈ. ਤਾ ਸਚੁ ਪਾਈਐ ॥੨॥',
      pronunciation: 'suc hovē. tā sac pāīē ‖2‖',
      translation: 'If you are pure, you will obtain the True Lord. ||2||',
    },
    {
      id: 'R6DZ',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'WX0R',
      src: 'ਚਿਤੈ ਅੰਦਰਿ ਸਭੁ ਕੋ; ਵੇਖਿ ਨਦਰੀ ਹੇਠਿ ਚਲਾਇਦਾ ॥',
      pronunciation: 'citē añdar sabh ko; vekh nadarī heṭh calāidā ‖',
      translation:
        'All are within Your mind; You see and move them under Your Glance of Grace, O Lord.',
    },
    {
      id: 'BYEY',
      src: 'ਆਪੇ ਦੇ ਵਡਿਆਈਆ; ਆਪੇ ਹੀ ਕਰਮ ਕਰਾਇਦਾ ॥',
      pronunciation: 'āpe de waḍiāīā; āpe hī karam karāidā ‖',
      translation:
        'You Yourself grant them glory, and You Yourself cause them to act.',
    },
    {
      id: 'XASV',
      src: 'ਵਡਹੁ ਵਡਾ ਵਡ ਮੇਦਨੀ; ਸਿਰੇ ਸਿਰਿ ਧੰਧੈ ਲਾਇਦਾ ॥',
      pronunciation: 'waḍah waḍā waḍ medanī; sire sir dhañdhē lāidā ‖',
      translation:
        'The Lord is the greatest of the great; great is His world. He enjoins all to their tasks.',
    },
    {
      id: 'PSN0',
      src: 'ਨਦਰਿ ਉਪਠੀ ਜੇ ਕਰੇ; ਸੁਲਤਾਨਾ ਘਾਹੁ ਕਰਾਇਦਾ ॥',
      pronunciation: 'nadar upaṭhī je kare; sulatānā ghāh karāidā ‖',
      translation:
        'If he should cast an angry glance, He can transform kings into blades of grass.',
    },
    {
      id: 'HRR3',
      src: 'ਦਰਿ ਮੰਗਨਿ; ਭਿਖ ਨ ਪਾਇਦਾ ॥੧੬॥',
      pronunciation: 'dar mañgani; bhikh na pāidā ‖16‖',
      translation:
        'Even though they may beg from door to door, no one will give them charity. ||16||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
