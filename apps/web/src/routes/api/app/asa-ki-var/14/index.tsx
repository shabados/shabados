import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 14)',
    roman: 'Āsā kī vār (chakkā 14)',
  },
  paging: {
    previous: 'asa-ki-var/13',
    next: 'asa-ki-var/15',
  },
  data: [
    {
      id: 'XQZJ',
      src: 'ਜਿਨੀ. ਐਸਾ ਹਰਿ ਨਾਮੁ. ਨ ਚੇਤਿਓ; ਸੇ ਕਾਹੇ. ਜਗਿ ਆਏ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jinī. ēsā har nāmu. na cetio; se kāhe. jag āe. rām rāje ‖',
      translation:
        "Those who have not kept the Lord's Name in their consciousness - why did they bother to come into the world, O Lord King?",
    },
    {
      id: 'VV9Q',
      src: 'ਇਹੁ ਮਾਣਸ ਜਨਮੁ ਦੁਲੰਭੁ ਹੈ; ਨਾਮ ਬਿਨਾ ਬਿਰਥਾ ਸਭੁ ਜਾਏ ॥',
      pronunciation: 'ih māṇas janam dulañbh hē; nām binā birathā sabh jāe ‖',
      translation:
        'It is so difficult to obtain this human incarnation, and without the Naam, it is all futile and useless.',
    },
    {
      id: 'VPQC',
      src: 'ਹੁਣਿ ਵਤੈ. ਹਰਿ ਨਾਮੁ. ਨ ਬੀਜਿਓ; ਅਗੈ ਭੁਖਾ. ਕਿਆ ਖਾਏ ॥',
      pronunciation: 'huṇ watē. har nāmu. na bījio; agē bhukhā. kiā khāe ‖',
      translation:
        "Now, in this most fortunate season, he does not plant the seed of the Lord's Name; what will the hungry soul eat, in the world hereafter?",
    },
    {
      id: 'S3GU',
      src: 'ਮਨਮੁਖਾ ਨੋ ਫਿਰਿ ਜਨਮੁ ਹੈ; ਨਾਨਕ ਹਰਿ ਭਾਏ ॥੨॥',
      pronunciation: 'manamukhā no phir janam hē; nānak har bhāe ‖2‖',
      translation:
        "The self-willed manmukhs are born again and again. O Nanak, such is the Lord's Will. ||2||",
    },
    {
      id: '2V78',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '4YFS',
      src: 'ਸਿੰਮਲ ਰੁਖੁ ਸਰਾਇਰਾ; ਅਤਿ ਦੀਰਘ ਅਤਿ ਮੁਚੁ ॥',
      pronunciation: 'siñmal rukh sarāirā; at dīragh at muc ‖',
      translation:
        'The simmal tree is straight as an arrow; it is very tall, and very thick.',
    },
    {
      id: '8JS3',
      src: 'ਓਇ ਜਿ ਆਵਹਿ ਆਸ ਕਰਿ; ਜਾਹਿ ਨਿਰਾਸੇ ਕਿਤੁ ॥',
      pronunciation: 'oi ja āwah ās kari; jāh nirāse kit ‖',
      translation:
        'But those birds which visit it hopefully, depart disappointed.',
    },
    {
      id: '2A0G',
      src: 'ਫਲ ਫਿਕੇ ਫੁਲ ਬਕਬਕੇ; ਕੰਮਿ ਨ ਆਵਹਿ ਪਤ ॥',
      pronunciation: 'phal phike phul bakabake; kañm na āwah pat ‖',
      translation:
        'Its fruits are tasteless, its flowers are nauseating, and its leaves are useless.',
    },
    {
      id: 'Z0QP',
      src: 'ਮਿਠਤੁ ਨੀਵੀ ਨਾਨਕਾ; ਗੁਣ ਚੰਗਿਆਈਆ ਤਤੁ ॥',
      pronunciation: 'miṭhat nīvī nānakā; guṇ cañgiāīā tat ‖',
      translation:
        'Sweetness and humility, O Nanak, are the essence of virtue and goodness.',
    },
    {
      id: 'JPE4',
      src: 'ਸਭੁ ਕੋ ਨਿਵੈ ਆਪ ਕਉ; ਪਰ ਕਉ. ਨਿਵੈ ਨ ਕੋਇ ॥',
      pronunciation: 'sabh ko nivē āp kau; par kau. nivē na koi ‖',
      translation:
        'Everyone bows down to himself; no one bows down to another.',
    },
    {
      id: 'P659',
      src: 'ਧਰਿ ਤਾਰਾਜੂ ਤੋਲੀਐ; ਨਿਵੈ ਸੁ ਗਉਰਾ ਹੋਇ ॥',
      pronunciation: 'dhar tārājū tolīē; nivē sa gaurā hoi ‖',
      translation:
        'When something is placed on the balancing scale and weighed, the side which descends is heavier.',
    },
    {
      id: '8VMU',
      src: 'ਅਪਰਾਧੀ ਦੂਣਾ ਨਿਵੈ; ਜੋ ਹੰਤਾ ਮਿਰਗਾਹਿ ॥',
      pronunciation: 'aparādhī dūṇā nivē; jo hañtā miragāh ‖',
      translation: 'The sinner, like the deer hunter, bows down twice as much.',
    },
    {
      id: 'MN82',
      src: 'ਸੀਸਿ ਨਿਵਾਇਐ, ਕਿਆ ਥੀਐ; ਜਾ ਰਿਦੈ ਕੁਸੁਧੇ ਜਾਹਿ ॥੧॥',
      pronunciation: 'sīs nivāiē, kiā thīē; jā ridē kusudhe jāh ‖1‖',
      translation:
        'But what can be achieved by bowing the head, when the heart is impure? ||1||',
    },
    {
      id: 'ECMT',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '813U',
      src: 'ਪੜਿ ਪੁਸਤਕ; ਸੰਧਿਆ ਬਾਦੰ ॥',
      pronunciation: 'paṛ pusatak; sañdhiā bādañ ‖',
      translation:
        'You read your books and say your prayers, and then engage in debate;',
    },
    {
      id: 'JC1P',
      src: 'ਸਿਲ ਪੂਜਸਿ; ਬਗੁਲ ਸਮਾਧੰ ॥',
      pronunciation: 'sil pūjasi; bagul samādhañ ‖',
      translation:
        'you worship stones and sit like a stork, pretending to be in Samaadhi.',
    },
    {
      id: '08DC',
      src: 'ਮੁਖਿ ਝੂਠ; ਬਿਭੂਖਣ ਸਾਰੰ ॥',
      pronunciation: 'mukh jhūṭh; bibhūkhaṇ sārañ ‖',
      translation:
        'With your mouth you utter falsehood, and you adorn yourself with precious decorations;',
    },
    {
      id: '24SB',
      src: 'ਤ੍ਰੈਪਾਲ; ਤਿਹਾਲ ਬਿਚਾਰੰ ॥',
      pronunciation: 'trēpāl; tihāl bicārañ ‖',
      translation:
        'you recite the three lines of the Gayatri three times a day.',
    },
    {
      id: 'X3SN',
      src: 'ਗਲਿ ਮਾਲਾ; ਤਿਲਕੁ ਲਿਲਾਟੰ ॥',
      pronunciation: 'gal mālā; tilak lilāṭañ ‖',
      translation:
        'Around your neck is a rosary, and on your forehead is a sacred mark;',
    },
    {
      id: 'Q2NB',
      src: 'ਦੁਇ ਧੋਤੀ; ਬਸਤ੍ਰ ਕਪਾਟੰ ॥',
      pronunciation: 'dui dhotī; basatr kapāṭañ ‖',
      translation: 'upon your head is a turban, and you wear two loin cloths.',
    },
    {
      id: 'HDEY',
      src: 'ਜੇ ਜਾਣਸਿ; ਬ੍ਰਹਮੰ ਕਰਮੰ ॥',
      pronunciation: 'je jāṇasi; brahamañ karamañ ‖',
      translation: 'If you knew the nature of God,',
    },
    {
      id: 'MJYC',
      src: 'ਸਭਿ ਫੋਕਟ ਨਿਸਚਉ ਕਰਮੰ ॥',
      pronunciation: 'sabh phokaṭ nisacau karamañ ‖',
      translation:
        'you would know that all of these beliefs and rituals are in vain.',
    },
    {
      id: 'GDZX',
      src: 'ਕਹੁ ਨਾਨਕ. ਨਿਹਚਉ ਧਿਆਵੈ ॥',
      pronunciation: 'kah nānak. nihacau dhiāvē ‖',
      translation: 'Says Nanak, meditate with deep faith;',
    },
    {
      id: 'NXEX',
      src: 'ਵਿਣੁ ਸਤਿਗੁਰ; ਵਾਟ ਨ ਪਾਵੈ ॥੨॥',
      pronunciation: 'viṇ satigur; vāṭ na pāvē ‖2‖',
      translation: 'without the True Guru, no one finds the Way. ||2||',
    },
    {
      id: 'AQ2T',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: '2Q5R',
      src: 'ਕਪੜੁ ਰੂਪੁ ਸੁਹਾਵਣਾ; ਛਡਿ ਦੁਨੀਆ ਅੰਦਰਿ ਜਾਵਣਾ ॥',
      pronunciation: 'kapaṛ rūp suhāwaṇā; chaḍ dunīā añdar jāwaṇā ‖',
      translation:
        'Abandoning the world of beauty, and beautiful clothes, one must depart.',
    },
    {
      id: 'Z03K',
      src: 'ਮੰਦਾ ਚੰਗਾ ਆਪਣਾ; ਆਪੇ ਹੀ ਕੀਤਾ ਪਾਵਣਾ ॥',
      pronunciation: 'mañdā cañgā āpaṇā; āpe hī kītā pāwaṇā ‖',
      translation: 'He obtains the rewards of his good and bad deeds.',
    },
    {
      id: 'H5JJ',
      src: 'ਹੁਕਮ ਕੀਏ ਮਨਿ ਭਾਵਦੇ; ਰਾਹਿ ਭੀੜੈ ਅਗੈ ਜਾਵਣਾ ॥',
      pronunciation: 'hukam kīe man bhāwade; rāh bhīṛē agē jāwaṇā ‖',
      translation:
        'He may issue whatever commands he wishes, but he shall have to take to the narrow path hereafter.',
    },
    {
      id: '7TV2',
      src: 'ਨੰਗਾ. ਦੋਜਕਿ ਚਾਲਿਆ; ਤਾ. ਦਿਸੈ ਖਰਾ ਡਰਾਵਣਾ ॥',
      pronunciation: 'nañgā. dojak cāliā; tā. disē kharā ḍarāwaṇā ‖',
      translation: 'He goes to hell naked, and he looks hideous then.',
    },
    {
      id: 'GS16',
      src: 'ਕਰਿ ਅਉਗਣ; ਪਛੋਤਾਵਣਾ ॥੧੪॥',
      pronunciation: 'kar augaṇ; pachotāwaṇā ‖14‖',
      translation: 'He regrets the sins he committed. ||14||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
