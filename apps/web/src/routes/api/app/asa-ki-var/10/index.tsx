import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 10)',
    roman: 'Āsā kī vār (chakkā 10)',
  },
  paging: {
    previous: 'asa-ki-var/9',
    next: 'asa-ki-var/11',
  },
  data: [
    {
      id: 'Q6G8',
      src: 'ਸਚੁ ਸਾਹੁ ਹਮਾਰਾ ਤੂੰ ਧਣੀ; ਸਭੁ ਜਗਤੁ ਵਣਜਾਰਾ ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'sac sāh hamārā tūñ dhaṇī; sabh jagat waṇajārā rām rāje ‖',
      translation:
        'You are my True Banker, O Lord; the whole world is Your trader, O Lord King.',
    },
    {
      id: '9JUW',
      src: 'ਸਭ ਭਾਂਡੇ ਤੁਧੈ ਸਾਜਿਆ; ਵਿਚਿ ਵਸਤੁ ਹਰਿ ਥਾਰਾ ॥',
      pronunciation: 'sabh bhāñḍe tudhē sājiā; vic wasat har thārā ‖',
      translation:
        'You fashioned all vessels, O Lord, and that which dwells within is also Yours.',
    },
    {
      id: 'LW84',
      src: 'ਜੋ ਪਾਵਹਿ ਭਾਂਡੇ ਵਿਚਿ ਵਸਤੁ, ਸਾ ਨਿਕਲੈ; ਕਿਆ ਕੋਈ ਕਰੇ ਵੇਚਾਰਾ ॥',
      pronunciation:
        'jo pāwah bhāñḍe vic wasatu, sā nikalē; kiā koī kare vecārā ‖',
      translation:
        'Whatever You place in that vessel, that alone comes out again. What can the poor creatures do?',
    },
    {
      id: 'C7KD',
      src: 'ਜਨ ਨਾਨਕ ਕਉ. ਹਰਿ ਬਖਸਿਆ; ਹਰਿ ਭਗਤਿ ਭੰਡਾਰਾ ॥੨॥',
      pronunciation: 'jan nānak kau. har bakhasiā; har bhagat bhañḍārā ‖2‖',
      translation:
        'The Lord has given the treasure of His devotional worship to servant Nanak. ||2||',
    },
    {
      id: 'DETE',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '2M3H',
      src: 'ਕੂੜੁ ਰਾਜਾ. ਕੂੜੁ ਪਰਜਾ; ਕੂੜੁ ਸਭੁ ਸੰਸਾਰੁ ॥',
      pronunciation: 'kūṛ rājā. kūṛ parajā; kūṛ sabh sañsār ‖',
      translation:
        'False is the king, false are the subjects; false is the whole world.',
    },
    {
      id: 'BMMK',
      src: 'ਕੂੜੁ ਮੰਡਪ. ਕੂੜੁ ਮਾੜੀ; ਕੂੜੁ ਬੈਸਣਹਾਰੁ ॥',
      pronunciation: 'kūṛ mañḍap. kūṛ māṛī; kūṛ bēsaṇahār ‖',
      translation:
        'False is the mansion, false are the skyscrapers; false are those who live in them.',
    },
    {
      id: 'YGJA',
      src: 'ਕੂੜੁ ਸੁਇਨਾ. ਕੂੜੁ ਰੁਪਾ; ਕੂੜੁ ਪੈਨੑਣਹਾਰੁ ॥',
      pronunciation: 'kūṛ suinā. kūṛ rupā; kūṛ pēnaṇahār ‖',
      translation:
        'False is gold, and false is silver; false are those who wear them.',
    },
    {
      id: 'HNWX',
      src: 'ਕੂੜੁ ਕਾਇਆ. ਕੂੜੁ ਕਪੜੁ; ਕੂੜੁ ਰੂਪੁ ਅਪਾਰੁ ॥',
      pronunciation: 'kūṛ kāiā. kūṛ kapaṛu; kūṛ rūp apār ‖',
      translation:
        'False is the body, false are the clothes; false is incomparable beauty.',
    },
    {
      id: 'GXWC',
      src: 'ਕੂੜੁ ਮੀਆ ਕੂੜੁ ਬੀਬੀ; ਖਪਿ ਹੋਏ ਖਾਰੁ ॥',
      pronunciation: 'kūṛ mīā kūṛ bībī; khap hoe khār ‖',
      translation:
        'False is the husband, false is the wife; they mourn and waste away.',
    },
    {
      id: 'S373',
      src: 'ਕੂੜਿ ਕੂੜੈ ਨੇਹੁ ਲਗਾ; ਵਿਸਰਿਆ ਕਰਤਾਰੁ ॥',
      pronunciation: 'kūṛ kūṛē neh lagā; visariā karatār ‖',
      translation: 'The false ones love falsehood, and forget their Creator.',
    },
    {
      id: 'C65Y',
      src: 'ਕਿਸੁ ਨਾਲਿ ਕੀਚੈ ਦੋਸਤੀ; ਸਭੁ ਜਗੁ ਚਲਣਹਾਰੁ ॥',
      pronunciation: 'kis nāl kīcē dosatī; sabh jag calaṇahār ‖',
      translation:
        'With whom should I become friends, if all the world shall pass away?',
    },
    {
      id: 'N8SL',
      src: 'ਕੂੜੁ ਮਿਠਾ. ਕੂੜੁ ਮਾਖਿਉ; ਕੂੜੁ ਡੋਬੇ ਪੂਰੁ ॥',
      pronunciation: 'kūṛ miṭhā. kūṛ mākhiu; kūṛ ḍobe pūr ‖',
      translation:
        'False is sweetness, false is honey; through falsehood, boat-loads of men have drowned.',
    },
    {
      id: 'Z22J',
      src: 'ਨਾਨਕੁ ਵਖਾਣੈ ਬੇਨਤੀ; ਤੁਧੁ ਬਾਝੁ ਕੂੜੋ ਕੂੜੁ ॥੧॥',
      pronunciation: 'nānak wakhāṇē benatī; tudh bājh kūṛo kūṛ ‖1‖',
      translation:
        'Nanak speaks this prayer: without You, Lord, everything is totally false. ||1||',
    },
    {
      id: '4PVS',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'N6C9',
      src: 'ਸਚੁ. ਤਾ ਪਰੁ ਜਾਣੀਐ; ਜਾ ਰਿਦੈ ਸਚਾ ਹੋਇ ॥',
      pronunciation: 'sacu. tā par jāṇīē; jā ridē sacā hoi ‖',
      translation: 'One knows the Truth only when the Truth is in his heart.',
    },
    {
      id: 'SPFC',
      src: 'ਕੂੜ ਕੀ ਮਲੁ ਉਤਰੈ; ਤਨੁ ਕਰੇ ਹਛਾ ਧੋਇ ॥',
      pronunciation: 'kūṛ kī mal utarē; tan kare hachā dhoi ‖',
      translation:
        'The filth of falsehood departs, and the body is washed clean.',
    },
    {
      id: '060V',
      src: 'ਸਚੁ. ਤਾ ਪਰੁ ਜਾਣੀਐ; ਜਾ ਸਚਿ ਧਰੇ ਪਿਆਰੁ ॥',
      pronunciation: 'sacu. tā par jāṇīē; jā sac dhare piār ‖',
      translation:
        'One knows the Truth only when he bears love to the True Lord.',
    },
    {
      id: 'DFZH',
      src: 'ਨਾਉ ਸੁਣਿ. ਮਨੁ ਰਹਸੀਐ; ਤਾ ਪਾਏ ਮੋਖ ਦੁਆਰੁ ॥',
      pronunciation: 'nāu suṇi. man rahasīē; tā pāe mokh duār ‖',
      translation:
        'Hearing the Name, the mind is enraptured; then, he attains the gate of salvation.',
    },
    {
      id: 'LPS3',
      src: 'ਸਚੁ. ਤਾ ਪਰੁ ਜਾਣੀਐ; ਜਾ ਜੁਗਤਿ ਜਾਣੈ ਜੀਉ ॥',
      pronunciation: 'sacu. tā par jāṇīē; jā jugat jāṇē jīu ‖',
      translation:
        'One knows the Truth only when he knows the true way of life.',
    },
    {
      id: 'ZLSC',
      src: 'ਧਰਤਿ ਕਾਇਆ ਸਾਧਿ ਕੈ; ਵਿਚਿ ਦੇਇ ਕਰਤਾ ਬੀਉ ॥',
      pronunciation: 'dharat kāiā sādh kē; vic dei karatā bīu ‖',
      translation:
        'Preparing the field of the body, he plants the Seed of the Creator.',
    },
    {
      id: '5ZT8',
      src: 'ਸਚੁ. ਤਾ ਪਰੁ ਜਾਣੀਐ; ਜਾ ਸਿਖ. ਸਚੀ ਲੇਇ ॥',
      pronunciation: 'sacu. tā par jāṇīē; jā sikh. sacī lei ‖',
      translation:
        'One knows the Truth only when he receives true instruction.',
    },
    {
      id: '1MX9',
      src: 'ਦਇਆ ਜਾਣੈ ਜੀਅ ਕੀ; ਕਿਛੁ ਪੁੰਨੁ ਦਾਨੁ ਕਰੇਇ ॥',
      pronunciation: 'daiā jāṇē jīa kī; kich puñn dān karei ‖',
      translation:
        'Showing mercy to other beings, he makes donations to charities.',
    },
    {
      id: 'SK7J',
      src: 'ਸਚੁ. ਤਾਂ ਪਰੁ ਜਾਣੀਐ; ਜਾ ਆਤਮ ਤੀਰਥਿ ਕਰੇ ਨਿਵਾਸੁ ॥',
      pronunciation: 'sacu. tāñ par jāṇīē; jā ātam tīrath kare nivās ‖',
      translation:
        'One knows the Truth only when he dwells in the sacred shrine of pilgrimage of his own soul.',
    },
    {
      id: 'ZLZQ',
      src: 'ਸਤਿਗੁਰੂ ਨੋ ਪੁਛਿ ਕੈ; ਬਹਿ ਰਹੈ. ਕਰੇ ਨਿਵਾਸੁ ॥',
      pronunciation: 'satigurū no puch kē; bah rahē. kare nivās ‖',
      translation:
        'He sits and receives instruction from the True Guru, and lives in accordance with His Will.',
    },
    {
      id: '3V6J',
      src: 'ਸਚੁ. ਸਭਨਾ ਹੋਇ ਦਾਰੂ; ਪਾਪ ਕਢੈ ਧੋਇ ॥',
      pronunciation: 'sacu. sabhanā hoi dārū; pāp kaḍhē dhoi ‖',
      translation:
        'Truth is the medicine for all; it removes and washes away our sins.',
    },
    {
      id: 'ZBV9',
      src: 'ਨਾਨਕੁ. ਵਖਾਣੈ ਬੇਨਤੀ; ਜਿਨ ਸਚੁ ਪਲੈ ਹੋਇ ॥੨॥',
      pronunciation: 'nānaku. wakhāṇē benatī; jin sac palē hoi ‖2‖',
      translation:
        'Nanak speaks this prayer to those who have Truth in their laps. ||2||',
    },
    {
      id: 'RMSX',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'ZUXC',
      src: 'ਦਾਨੁ ਮਹਿੰਡਾ ਤਲੀ ਖਾਕੁ; ਜੇ ਮਿਲੈ. ਤ ਮਸਤਕਿ ਲਾਈਐ ॥',
      pronunciation: 'dān mahiñḍā talī khāku; je milē. ta masatak lāīē ‖',
      translation:
        'The gift I seek is the dust of the feet of the Saints; if I were to obtain it, I would apply it to my forehead.',
    },
    {
      id: 'H0QY',
      src: 'ਕੂੜਾ ਲਾਲਚੁ ਛਡੀਐ; ਹੋਇ ਇਕ ਮਨਿ. ਅਲਖੁ ਧਿਆਈਐ ॥',
      pronunciation: 'kūṛā lālac chaḍīē; hoi ik mani. alakh dhiāīē ‖',
      translation:
        'Renounce false greed, and meditate single-mindedly on the unseen Lord.',
    },
    {
      id: '11D2',
      src: 'ਫਲੁ ਤੇਵੇਹੋ ਪਾਈਐ; ਜੇਵੇਹੀ ਕਾਰ ਕਮਾਈਐ ॥',
      pronunciation: 'phal teveho pāīē; jevehī kār kamāīē ‖',
      translation:
        'As are the actions we commit, so are the rewards we receive.',
    },
    {
      id: 'XX3L',
      src: 'ਜੇ ਹੋਵੈ ਪੂਰਬਿ ਲਿਖਿਆ; ਤਾ ਧੂੜਿ ਤਿਨੑਾ ਦੀ ਪਾਈਐ ॥',
      pronunciation: 'je hovē pūrab likhiā; tā dhūṛ tinā dī pāīē ‖',
      translation:
        'If it is so pre-ordained, then one obtains the dust of the feet of the Saints.',
    },
    {
      id: '6B9M',
      src: 'ਮਤਿ ਥੋੜੀ; ਸੇਵ ਗਵਾਈਐ ॥੧੦॥',
      pronunciation: 'mat thoṛī; sev gavāīē ‖10‖',
      translation:
        'But through small-mindedness, we forfeit the merits of selfless service. ||10||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
