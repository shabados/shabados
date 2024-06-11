import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 2)',
    roman: 'Āsā kī vār (chakkā 2)',
  },
  paging: {
    previous: 'asa-ki-var/1',
    next: 'asa-ki-var/3',
  },
  data: [
    {
      id: '5N5B',
      src: 'ਹਰਿ ਪ੍ਰੇਮ ਬਾਣੀ. ਮਨੁ ਮਾਰਿਆ; ਅਣੀਆਲੇ ਅਣੀਆ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'har prem bāṇī. man māriā; aṇīāle aṇīā. rām rāje ‖',
      translation:
        "The Bani of the Lord's Love is the pointed arrow, which has pierced my mind, O Lord King.",
    },
    {
      id: 'AAX6',
      src: 'ਜਿਸੁ ਲਾਗੀ ਪੀਰ. ਪਿਰੰਮ ਕੀ; ਸੋ ਜਾਣੈ ਜਰੀਆ ॥',
      pronunciation: 'jis lāgī pīr. pirañm kī; so jāṇē jarīā ‖',
      translation:
        'Only those who feel the pain of this love, know how to endure it.',
    },
    {
      id: '030C',
      src: 'ਜੀਵਨ ਮੁਕਤਿ ਸੋ ਆਖੀਐ; ਮਰਿ ਜੀਵੈ ਮਰੀਆ ॥',
      pronunciation: 'jīwan mukat so ākhīē; mar jīvē marīā ‖',
      translation:
        'Those who die, and remain dead while yet alive, are said to be Jivan Mukta, liberated while yet alive.',
    },
    {
      id: 'L3ET',
      src: 'ਜਨ ਨਾਨਕ. ਸਤਿਗੁਰੁ ਮੇਲਿ ਹਰਿ; ਜਗੁ ਦੁਤਰੁ ਤਰੀਆ ॥੨॥',
      pronunciation: 'jan nānak. satigur mel hari; jag dutar tarīā ‖2‖',
      translation:
        'O Lord, unite servant Nanak with the True Guru, that he may cross over the terrifying world-ocean. ||2||',
    },
    {
      id: 'F9JQ',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'FS09',
      src: 'ਸਚੇ ਤੇਰੇ ਖੰਡ; ਸਚੇ ਬ੍ਰਹਮੰਡ ॥',
      pronunciation: 'sace tere khañḍ; sace brahamañḍ ‖',
      translation: 'True are Your worlds, True are Your solar Systems.',
    },
    {
      id: 'UQS9',
      src: 'ਸਚੇ ਤੇਰੇ ਲੋਅ; ਸਚੇ ਆਕਾਰ ॥',
      pronunciation: 'sace tere loa; sace ākār ‖',
      translation: 'True are Your realms, True is Your creation.',
    },
    {
      id: '8R22',
      src: 'ਸਚੇ ਤੇਰੇ ਕਰਣੇ; ਸਰਬ ਬੀਚਾਰ ॥',
      pronunciation: 'sace tere karaṇe; sarab bīcār ‖',
      translation: 'True are Your actions, and all Your deliberations.',
    },
    {
      id: 'AFGE',
      src: 'ਸਚਾ ਤੇਰਾ ਅਮਰੁ; ਸਚਾ ਦੀਬਾਣੁ ॥',
      pronunciation: 'sacā terā amaru; sacā dībāṇ ‖',
      translation: 'True is Your Command, and True is Your Court.',
    },
    {
      id: 'J3P7',
      src: 'ਸਚਾ ਤੇਰਾ ਹੁਕਮੁ; ਸਚਾ ਫੁਰਮਾਣੁ ॥',
      pronunciation: 'sacā terā hukamu; sacā phuramāṇ ‖',
      translation: 'True is the Command of Your Will, True is Your Order.',
    },
    {
      id: '183N',
      src: 'ਸਚਾ ਤੇਰਾ ਕਰਮੁ; ਸਚਾ ਨੀਸਾਣੁ ॥',
      pronunciation: 'sacā terā karamu; sacā nīsāṇ ‖',
      translation: 'True is Your Mercy, True is Your Insignia.',
    },
    {
      id: '36M6',
      src: 'ਸਚੇ ਤੁਧੁ ਆਖਹਿ; ਲਖ ਕਰੋੜਿ ॥',
      pronunciation: 'sace tudh ākhahi; lakh karoṛ ‖',
      translation: 'Hundreds of thousands and millions call You True.',
    },
    {
      id: '4M1X',
      src: 'ਸਚੈ ਸਭਿ ਤਾਣਿ; ਸਚੈ ਸਭਿ ਜੋਰਿ ॥',
      pronunciation: 'sacē sabh tāṇi; sacē sabh jor ‖',
      translation:
        'In the True Lord is all power, in the True Lord is all might.',
    },
    {
      id: 'J3WG',
      src: 'ਸਚੀ ਤੇਰੀ ਸਿਫਤਿ; ਸਚੀ ਸਾਲਾਹ ॥',
      pronunciation: 'sacī terī siphati; sacī sālāh ‖',
      translation: 'True is Your Praise, True is Your Adoration.',
    },
    {
      id: '3TEP',
      src: 'ਸਚੀ ਤੇਰੀ ਕੁਦਰਤਿ; ਸਚੇ ਪਾਤਿਸਾਹ ॥',
      pronunciation: 'sacī terī kudarati; sace pātisāh ‖',
      translation: 'True is Your almighty creative power, True King.',
    },
    {
      id: '9S0L',
      src: 'ਨਾਨਕ ਸਚੁ, ਧਿਆਇਨਿ ਸਚੁ ॥',
      pronunciation: 'nānak sacu, dhiāin sac ‖',
      translation: 'O Nanak, true are those who meditate on the True One.',
    },
    {
      id: '1F94',
      src: 'ਜੋ ਮਰਿ ਜੰਮੇ; ਸੁ ਕਚੁ ਨਿਕਚੁ ॥੧॥',
      pronunciation: 'jo mar jañme; sa kac nikac ‖1‖',
      translation:
        'Those who are subject to birth and death are totally false. ||1||',
    },
    {
      id: 'DAWB',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'ELF9',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਜਾ ਵਡਾ ਨਾਉ ॥',
      pronunciation: 'waḍī waḍiāī; jā waḍā nāu ‖',
      translation: 'Great is His greatness, as great as His Name.',
    },
    {
      id: 'T6W3',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਜਾ ਸਚੁ ਨਿਆਉ ॥',
      pronunciation: 'waḍī waḍiāī; jā sac niāu ‖',
      translation: 'Great is His greatness, as True is His justice.',
    },
    {
      id: '00VA',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਜਾ ਨਿਹਚਲ ਥਾਉ ॥',
      pronunciation: 'waḍī waḍiāī; jā nihacal thāu ‖',
      translation: 'Great is His greatness, as permanent as His Throne.',
    },
    {
      id: '6CBR',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਜਾਣੈ ਆਲਾਉ ॥',
      pronunciation: 'waḍī waḍiāī; jāṇē ālāu ‖',
      translation: 'Great is His greatness, as He knows our utterances.',
    },
    {
      id: '2U2F',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਬੁਝੈ ਸਭਿ ਭਾਉ ॥',
      pronunciation: 'waḍī waḍiāī; bujhē sabh bhāu ‖',
      translation:
        'Great is His greatness, as He understands all our affections.',
    },
    {
      id: '26X1',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਜਾ. ਪੁਛਿ ਨ ਦਾਤਿ ॥',
      pronunciation: 'waḍī waḍiāī; jā. puch na dāt ‖',
      translation: 'Great is His greatness, as He gives without being asked.',
    },
    {
      id: 'HP4N',
      src: 'ਵਡੀ ਵਡਿਆਈ; ਜਾ ਆਪੇ ਆਪਿ ॥',
      pronunciation: 'waḍī waḍiāī; jā āpe āp ‖',
      translation: 'Great is His greatness, as He Himself is all-in-all.',
    },
    {
      id: 'T8EY',
      src: 'ਨਾਨਕ; ਕਾਰ. ਨ ਕਥਨੀ ਜਾਇ ॥',
      pronunciation: 'nānak; kār. na kathanī jāi ‖',
      translation: 'O Nanak, His actions cannot be described.',
    },
    {
      id: 'ALLL',
      src: 'ਕੀਤਾ ਕਰਣਾ; ਸਰਬ ਰਜਾਇ ॥੨॥',
      pronunciation: 'kītā karaṇā; sarab rajāi ‖2‖',
      translation:
        'Whatever He has done, or will do, is all by His Own Will. ||2||',
    },
    {
      id: 'SKRN',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'Z27H',
      src: 'ਇਹੁ ਜਗੁ, ਸਚੈ ਕੀ ਹੈ ਕੋਠੜੀ; ਸਚੇ ਕਾ ਵਿਚਿ ਵਾਸੁ ॥',
      pronunciation: 'ih jagu, sacē kī hē koṭhaṛī; sace kā vic vās ‖',
      translation:
        'This world is the room of the True Lord; within it is the dwelling of the True Lord.',
    },
    {
      id: 'Q0D9',
      src: 'ਇਕਨੑਾ. ਹੁਕਮਿ ਸਮਾਇ ਲਏ; ਇਕਨੑਾ. ਹੁਕਮੇ ਕਰੇ ਵਿਣਾਸੁ ॥',
      pronunciation: 'ikanā. hukam samāi lae; ikanā. hukame kare viṇās ‖',
      translation:
        'By His Command, some are merged into Him, and some, by His Command, are destroyed.',
    },
    {
      id: '4ESM',
      src: 'ਇਕਨੑਾ. ਭਾਣੈ ਕਢਿ ਲਏ; ਇਕਨੑਾ. ਮਾਇਆ ਵਿਚਿ ਨਿਵਾਸੁ ॥',
      pronunciation: 'ikanā. bhāṇē kaḍh lae; ikanā. māiā vic nivās ‖',
      translation:
        'Some, by the Pleasure of His Will, are lifted up out of Maya, while others are made to dwell within it.',
    },
    {
      id: '0R3L',
      src: 'ਏਵ ਭਿ. ਆਖਿ ਨ ਜਾਪਈ; ਜਿ ਕਿਸੈ. ਆਣੇ ਰਾਸਿ ॥',
      pronunciation: 'ev bhi. ākh na jāpaī; ja kisē. āṇe rās ‖',
      translation: 'No one can say who will be rescued.',
    },
    {
      id: 'NXMN',
      src: 'ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਣੀਐ; ਜਾ ਕਉ ਆਪਿ ਕਰੇ ਪਰਗਾਸੁ ॥੩॥',
      pronunciation: 'nānak. guramukh jāṇīē; jā kau āp kare paragās ‖3‖',
      translation:
        'O Nanak, he alone is known as Gurmukh, unto whom the Lord reveals Himself. ||3||',
    },
    {
      id: 'ZGMN',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'J4NV',
      src: 'ਨਾਨਕ. ਜੀਅ ਉਪਾਇ ਕੈ; ਲਿਖਿ ਨਾਵੈ ਧਰਮੁ ਬਹਾਲਿਆ ॥',
      pronunciation: 'nānak. jīa upāi kē; likh nāvē dharam bahāliā ‖',
      translation:
        'O Nanak, having created the souls, the Lord installed the Righteous Judge of Dharma to read and record their accounts.',
    },
    {
      id: '8U3R',
      src: 'ਓਥੈ. ਸਚੇ ਹੀ ਸਚਿ ਨਿਬੜੈ; ਚੁਣਿ ਵਖਿ ਕਢੇ ਜਜਮਾਲਿਆ ॥',
      pronunciation: 'othē. sace hī sac nibaṛē; cuṇ wakh kaḍhe jajamāliā ‖',
      translation:
        'There, only the Truth is judged true; the sinners are picked out and separated.',
    },
    {
      id: 'R8LW',
      src: 'ਥਾਉ. ਨ ਪਾਇਨਿ ਕੂੜਿਆਰ; ਮੁਹ ਕਾਲੑੈ. ਦੋਜਕਿ ਚਾਲਿਆ ॥',
      pronunciation: 'thāu. na pāin kūṛiār; muh kālē. dojak cāliā ‖',
      translation:
        'The false find no place there, and they go to hell with their faces blackened.',
    },
    {
      id: 'K20E',
      src: 'ਤੇਰੈ ਨਾਇ ਰਤੇ. ਸੇ ਜਿਣਿ ਗਏ; ਹਾਰਿ ਗਏ. ਸਿ ਠਗਣ ਵਾਲਿਆ ॥',
      pronunciation: 'terē nāi rate. se jiṇ gae; hār gae. sa ṭhagaṇ vāliā ‖',
      translation:
        'Those who are imbued with Your Name win, while the cheaters lose.',
    },
    {
      id: 'KUA7',
      src: 'ਲਿਖਿ ਨਾਵੈ; ਧਰਮੁ ਬਹਾਲਿਆ ॥੨॥',
      pronunciation: 'likh nāvē; dharam bahāliā ‖2‖',
      translation:
        'The Lord installed the Righteous Judge of Dharma to read and record the accounts. ||2||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
