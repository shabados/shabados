import type { RequestHandler } from '@builder.io/qwik-city'

const data = {
  title: {
    unicode: 'ਅਨੰਦੁ ਸਾਹਿਬ',
    roman: 'Anañd Sāhib',
  },
  paging: {
    previous: 'kabyo-bac-benti-copai',
    next: 'ardas',
  },
  data: [
    {
      id: 'LTKA',
      src: 'ਰਾਮਕਲੀ ਮਹਲਾ ੩ ਅਨੰਦੁ ॥',
      pronunciation: 'rāmakalī mahalā 3 anañd ‖',
      translation: 'Raamkalee, Third Mehl, Anand ~ The Song Of Bliss:',
    },
    {
      id: 'GE9G',
      src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation: 'ik oañkār satigur prasād ‖',
      translation: 'One Universal Creator God. By The Grace Of The True Guru:',
    },
    {
      id: '2UEB',
      src: 'ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ; ਸਤਿਗੁਰੂ. ਮੈ ਪਾਇਆ ॥',
      pronunciation: 'anañd bhaiā merī māe; satigurū. mē pāiā ‖',
      translation:
        'I am in ecstasy, O my mother, for I have found my True Guru.',
    },
    {
      id: 'BJ01',
      src: 'ਸਤਿਗੁਰੁ. ਤ ਪਾਇਆ ਸਹਜ ਸੇਤੀ; ਮਨਿ ਵਜੀਆ ਵਾਧਾਈਆ ॥',
      pronunciation: 'satiguru. ta pāiā sahaj setī; man wajīā vādhāīā ‖',
      translation:
        'I have found the True Guru, with intuitive ease, and my mind vibrates with the music of bliss.',
    },
    {
      id: '6GJM',
      src: 'ਰਾਗ ਰਤਨ ਪਰਵਾਰ ਪਰੀਆ; ਸਬਦ ਗਾਵਣ ਆਈਆ ॥',
      pronunciation: 'rāg ratan paravār parīā; sabad gāwaṇ āīā ‖',
      translation:
        'The jewelled melodies and their related celestial harmonies have come to sing the Word of the Shabad.',
    },
    {
      id: 'AR69',
      src: 'ਸਬਦੋ ਤ ਗਾਵਹੁ ਹਰੀ ਕੇਰਾ; ਮਨਿ ਜਿਨੀ ਵਸਾਇਆ ॥',
      pronunciation: 'sabado ta gāwah harī kerā; man jinī wasāiā ‖',
      translation:
        'The Lord dwells within the minds of those who sing the Shabad.',
    },
    {
      id: '439Z',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਅਨੰਦੁ ਹੋਆ; ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੧॥',
      pronunciation: 'kahē nānaku. anañd hoā; satigurū mē pāiā ‖1‖',
      translation:
        'Says Nanak, I am in ecstasy, for I have found my True Guru. ||1||',
    },
    {
      id: 'Z58C',
      src: 'ਏ ਮਨ ਮੇਰਿਆ; ਤੂ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥',
      pronunciation: 'e man meriā; tū sadā rah har nāle ‖',
      translation: 'O my mind, remain always with the Lord.',
    },
    {
      id: '5AA1',
      src: 'ਹਰਿ ਨਾਲਿ ਰਹੁ ਤੂ ਮੰਨ ਮੇਰੇ; ਦੂਖ ਸਭਿ ਵਿਸਾਰਣਾ ॥',
      pronunciation: 'har nāl rah tū mañn mere; dūkh sabh visāraṇā ‖',
      translation:
        'Remain always with the Lord, O my mind, and all sufferings will be forgotten.',
    },
    {
      id: 'YGK6',
      src: 'ਅੰਗੀਕਾਰੁ ਓਹੁ ਕਰੇ ਤੇਰਾ; ਕਾਰਜ ਸਭਿ ਸਵਾਰਣਾ ॥',
      pronunciation: 'añgīkār oh kare terā; kāraj sabh savāraṇā ‖',
      translation:
        'He will accept You as His own, and all your affairs will be perfectly arranged.',
    },
    {
      id: '350Z',
      src: 'ਸਭਨਾ ਗਲਾ ਸਮਰਥੁ ਸੁਆਮੀ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੇ ॥',
      pronunciation: 'sabhanā galā samarath suāmī; so. kiu manah visāre ‖',
      translation:
        'Our Lord and Master is all-powerful to do all things, so why forget Him from your mind?',
    },
    {
      id: 'CF7N',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਮੰਨ ਮੇਰੇ; ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥੨॥',
      pronunciation: 'kahē nānaku. mañn mere; sadā rah har nāle ‖2‖',
      translation: 'Says Nanak, O my mind, remain always with the Lord. ||2||',
    },
    {
      id: '4GE3',
      src: 'ਸਾਚੇ ਸਾਹਿਬਾ; ਕਿਆ ਨਾਹੀ. ਘਰਿ ਤੇਰੈ ॥',
      pronunciation: 'sāce sāhibā; kiā nāhī. ghar terē ‖',
      translation:
        'O my True Lord and Master, what is there which is not in Your celestial home?',
    },
    {
      id: '4N3D',
      src: 'ਘਰਿ ਤ ਤੇਰੈ. ਸਭੁ ਕਿਛੁ ਹੈ; ਜਿਸੁ ਦੇਹਿ ਸੁ ਪਾਵਏ ॥',
      pronunciation: 'ghar ta terē. sabh kich hē; jis deh sa pāwae ‖',
      translation:
        'Everything is in Your home; they receive, unto whom You give.',
    },
    {
      id: 'XG9Y',
      src: 'ਸਦਾ ਸਿਫਤਿ ਸਲਾਹ ਤੇਰੀ; ਨਾਮੁ ਮਨਿ ਵਸਾਵਏ ॥',
      pronunciation: 'sadā siphat salāh terī; nām man wasāwae ‖',
      translation:
        'Constantly singing Your Praises and Glories, Your Name is enshrined in the mind.',
    },
    {
      id: 'EWZF',
      src: 'ਨਾਮੁ ਜਿਨ ਕੈ ਮਨਿ ਵਸਿਆ; ਵਾਜੇ ਸਬਦ ਘਨੇਰੇ ॥',
      pronunciation: 'nām jin kē man wasiā; vāje sabad ghanere ‖',
      translation:
        'The divine melody of the Shabad vibrates for those, within whose minds the Naam abides.',
    },
    {
      id: 'KUUL',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੇ ਸਾਹਿਬ; ਕਿਆ ਨਾਹੀ. ਘਰਿ ਤੇਰੈ ॥੩॥',
      pronunciation: 'kahē nānaku. sace sāhib; kiā nāhī. ghar terē ‖3‖',
      translation:
        'Says Nanak, O my True Lord and Master, what is there which is not in Your home? ||3||',
    },
    {
      id: 'LRXJ',
      src: 'ਸਾਚਾ ਨਾਮੁ; ਮੇਰਾ ਆਧਾਰੋ ॥',
      pronunciation: 'sācā nāmu; merā ādhāro ‖',
      translation: 'The True Name is my only support.',
    },
    {
      id: '176Q',
      src: 'ਸਾਚੁ ਨਾਮੁ ਅਧਾਰੁ ਮੇਰਾ; ਜਿਨਿ ਭੁਖਾ ਸਭਿ ਗਵਾਈਆ ॥',
      pronunciation: 'sāc nām adhār merā; jin bhukhā sabh gavāīā ‖',
      translation: 'The True Name is my only support; it satisfies all hunger.',
    },
    {
      id: '82EB',
      src: 'ਕਰਿ ਸਾਂਤਿ ਸੁਖ ਮਨਿ ਆਇ ਵਸਿਆ; ਜਿਨਿ ਇਛਾ ਸਭਿ ਪੁਜਾਈਆ ॥',
      pronunciation: 'kar sāñt sukh man āi wasiā; jin ichā sabh pujāīā ‖',
      translation:
        'It has brought peace and tranquility to my mind; it has fulfilled all my desires.',
    },
    {
      id: 'XMGJ',
      src: 'ਸਦਾ ਕੁਰਬਾਣੁ ਕੀਤਾ ਗੁਰੂ ਵਿਟਹੁ; ਜਿਸ ਦੀਆ ਏਹਿ ਵਡਿਆਈਆ ॥',
      pronunciation: 'sadā kurabāṇ kītā gurū viṭahu; jis dīā eh waḍiāīā ‖',
      translation:
        'I am forever a sacrifice to the Guru, who possesses such glorious greatness.',
    },
    {
      id: 'P8TM',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਸਬਦਿ ਧਰਹੁ ਪਿਆਰੋ ॥',
      pronunciation: 'kahē nānaku. suṇah sañtahu; sabad dharah piāro ‖',
      translation:
        'Says Nanak, listen, O Saints; enshrine love for the Shabad.',
    },
    {
      id: 'Q3P4',
      src: 'ਸਾਚਾ ਨਾਮੁ; ਮੇਰਾ ਆਧਾਰੋ ॥੪॥',
      pronunciation: 'sācā nāmu; merā ādhāro ‖4‖',
      translation: 'The True Name is my only support. ||4||',
    },
    {
      id: 'QLZ5',
      src: 'ਵਾਜੇ ਪੰਚ ਸਬਦ; ਤਿਤੁ ਘਰਿ ਸਭਾਗੈ ॥',
      pronunciation: 'vāje pañc sabad; tit ghar sabhāgē ‖',
      translation:
        'The Panch Shabad, the five primal sounds, vibrate in that blessed house.',
    },
    {
      id: '4UD1',
      src: 'ਘਰਿ ਸਭਾਗੈ ਸਬਦ ਵਾਜੇ; ਕਲਾ ਜਿਤੁ ਘਰਿ ਧਾਰੀਆ ॥',
      pronunciation: 'ghar sabhāgē sabad vāje; kalā jit ghar dhārīā ‖',
      translation:
        'In that blessed house, the Shabad vibrates; He infuses His almighty power into it.',
    },
    {
      id: 'HBAQ',
      src: 'ਪੰਚ ਦੂਤ ਤੁਧੁ ਵਸਿ ਕੀਤੇ; ਕਾਲੁ ਕੰਟਕੁ ਮਾਰਿਆ ॥',
      pronunciation: 'pañc dūt tudh was kīte; kāl kañṭak māriā ‖',
      translation:
        'Through You, we subdue the five demons of desire, and slay Death, the torturer.',
    },
    {
      id: '7859',
      src: 'ਧੁਰਿ ਕਰਮਿ ਪਾਇਆ ਤੁਧੁ. ਜਿਨ ਕਉ; ਸਿ. ਨਾਮਿ ਹਰਿ ਕੈ ਲਾਗੇ ॥',
      pronunciation: 'dhur karam pāiā tudhu. jin kau; si. nām har kē lāge ‖',
      translation:
        "Those who have such pre-ordained destiny are attached to the Lord's Name.",
    },
    {
      id: '4RHQ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਤਹ ਸੁਖੁ ਹੋਆ; ਤਿਤੁ ਘਰਿ ਅਨਹਦ ਵਾਜੇ ॥੫॥',
      pronunciation: 'kahē nānaku. tah sukh hoā; tit ghar anahad vāje ‖5‖',
      translation:
        'Says Nanak, they are at peace, and the unstruck sound current vibrates within their homes. ||5||',
    },
    {
      id: '0225',
      src: 'ਸਾਚੀ ਲਿਵੈ ਬਿਨੁ; ਦੇਹ ਨਿਮਾਣੀ ॥',
      pronunciation: 'sācī livē binu; deh nimāṇī ‖',
      translation:
        'Without the true love of devotion, the body is without honor.',
    },
    {
      id: 'F8JR',
      src: 'ਦੇਹ ਨਿਮਾਣੀ. ਲਿਵੈ ਬਾਝਹੁ; ਕਿਆ ਕਰੇ ਵੇਚਾਰੀਆ ॥',
      pronunciation: 'deh nimāṇī. livē bājhahu; kiā kare vecārīā ‖',
      translation:
        'The body is dishonored without devotional love; what can the poor wretches do?',
    },
    {
      id: '224E',
      src: 'ਤੁਧੁ ਬਾਝੁ ਸਮਰਥ. ਕੋਇ ਨਾਹੀ; ਕ੍ਰਿਪਾ ਕਰਿ ਬਨਵਾਰੀਆ ॥',
      pronunciation: 'tudh bājh samarath. koi nāhī; kripā kar banavārīā ‖',
      translation:
        'No one except You is all-powerful; please bestow Your Mercy, O Lord of all nature.',
    },
    {
      id: 'TJQN',
      src: 'ਏਸ ਨਉ. ਹੋਰੁ ਥਾਉ ਨਾਹੀ; ਸਬਦਿ ਲਾਗਿ ਸਵਾਰੀਆ ॥',
      pronunciation: 'es nau. hor thāu nāhī; sabad lāg savārīā ‖',
      translation:
        'There is no place of rest, other than the Name; attached to the Shabad, we are embellished with beauty.',
    },
    {
      id: 'JUXQ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਲਿਵੈ ਬਾਝਹੁ; ਕਿਆ ਕਰੇ ਵੇਚਾਰੀਆ ॥੬॥',
      pronunciation: 'kahē nānaku. livē bājhahu; kiā kare vecārīā ‖6‖',
      translation:
        'Says Nanak, without devotional love, what can the poor wretches do? ||6||',
    },
    {
      id: 'ZDQR',
      src: 'ਆਨੰਦੁ ਆਨੰਦੁ ਸਭੁ ਕੋ ਕਹੈ; ਆਨੰਦੁ ਗੁਰੂ ਤੇ ਜਾਣਿਆ ॥',
      pronunciation: 'ānañd ānañd sabh ko kahē; ānañd gurū te jāṇiā ‖',
      translation:
        'Bliss, bliss - everyone talks of bliss; bliss is known only through the Guru.',
    },
    {
      id: 'SCHK',
      src: 'ਜਾਣਿਆ ਆਨੰਦੁ ਸਦਾ ਗੁਰ ਤੇ; ਕ੍ਰਿਪਾ ਕਰੇ ਪਿਆਰਿਆ ॥',
      pronunciation: 'jāṇiā ānañd sadā gur te; kripā kare piāriā ‖',
      translation:
        'Eternal bliss in known only through the Guru, when the Beloved Lord grants His Grace.',
    },
    {
      id: 'R29X',
      src: 'ਕਰਿ ਕਿਰਪਾ ਕਿਲਵਿਖ ਕਟੇ; ਗਿਆਨ ਅੰਜਨੁ ਸਾਰਿਆ ॥',
      pronunciation: 'kar kirapā kilavikh kaṭe; giān añjan sāriā ‖',
      translation:
        'Granting His Grace, He cuts away our sins; He blesses us with the healing ointment of spiritual wisdom.',
    },
    {
      id: 'CU3H',
      src: 'ਅੰਦਰਹੁ ਜਿਨ ਕਾ ਮੋਹੁ ਤੁਟਾ; ਤਿਨ ਕਾ ਸਬਦੁ ਸਚੈ ਸਵਾਰਿਆ ॥',
      pronunciation: 'añdarah jin kā moh tuṭā; tin kā sabad sacē savāriā ‖',
      translation:
        'Those who eradicate attachment from within themselves, are adorned with the Shabad, the Word of the True Lord.',
    },
    {
      id: 'G2W5',
      src: 'ਕਹੈ; ਨਾਨਕੁ. ਏਹੁ ਅਨੰਦੁ ਹੈ; ਆਨੰਦੁ ਗੁਰ ਤੇ ਜਾਣਿਆ ॥੭॥',
      pronunciation: 'kahē; nānaku. eh anañd hē; ānañd gur te jāṇiā ‖7‖',
      translation:
        'Says Nanak, this alone is bliss - bliss which is known through the Guru. ||7||',
    },
    {
      id: 'ZVK9',
      src: 'ਬਾਬਾ. ਜਿਸੁ ਤੂ ਦੇਹਿ; ਸੋਈ ਜਨੁ ਪਾਵੈ ॥',
      pronunciation: 'bābā. jis tū dehi; soī jan pāvē ‖',
      translation: 'O Baba, he alone receives it, unto whom You give it.',
    },
    {
      id: 'NVTD',
      src: 'ਪਾਵੈ ਤ ਸੋ ਜਨੁ. ਦੇਹਿ ਜਿਸ ਨੋ; ਹੋਰਿ ਕਿਆ ਕਰਹਿ ਵੇਚਾਰਿਆ ॥',
      pronunciation: 'pāvē ta so janu. deh jis no; hor kiā karah vecāriā ‖',
      translation:
        'He alone receives it, unto whom You give it; what can the other poor wretched beings do?',
    },
    {
      id: 'TK51',
      src: 'ਇਕਿ ਭਰਮਿ ਭੂਲੇ. ਫਿਰਹਿ ਦਹ ਦਿਸਿ; ਇਕਿ. ਨਾਮਿ ਲਾਗਿ ਸਵਾਰਿਆ ॥',
      pronunciation: 'ik bharam bhūle. phirah dah disi; iki. nām lāg savāriā ‖',
      translation:
        'Some are deluded by doubt, wandering in the ten directions; some are adorned with attachment to the Naam.',
    },
    {
      id: 'BCFP',
      src: 'ਗੁਰ ਪਰਸਾਦੀ. ਮਨੁ ਭਇਆ ਨਿਰਮਲੁ; ਜਿਨਾ ਭਾਣਾ ਭਾਵਏ ॥',
      pronunciation: 'gur parasādī. man bhaiā niramalu; jinā bhāṇā bhāwae ‖',
      translation:
        "By Guru's Grace, the mind becomes immaculate and pure, for those who follow God's Will.",
    },
    {
      id: 'DW95',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਸੁ ਦੇਹਿ ਪਿਆਰੇ; ਸੋਈ ਜਨੁ ਪਾਵਏ ॥੮॥',
      pronunciation: 'kahē nānaku. jis deh piāre; soī jan pāwae ‖8‖',
      translation:
        'Says Nanak, he alone receives it, unto whom You give it, O Beloved Lord. ||8||',
    },
    {
      id: '05E5',
      src: 'ਆਵਹੁ ਸੰਤ ਪਿਆਰਿਹੋ; ਅਕਥ ਕੀ ਕਰਹ ਕਹਾਣੀ ॥',
      pronunciation: 'āwah sañt piāriho; akath kī karah kahāṇī ‖',
      translation:
        'Come, Beloved Saints, let us speak the Unspoken Speech of the Lord.',
    },
    {
      id: 'FU61',
      src: 'ਕਰਹ ਕਹਾਣੀ ਅਕਥ ਕੇਰੀ; ਕਿਤੁ ਦੁਆਰੈ ਪਾਈਐ ॥',
      pronunciation: 'karah kahāṇī akath kerī; kit duārē pāīē ‖',
      translation:
        'How can we speak the Unspoken Speech of the Lord? Through which door will we find Him?',
    },
    {
      id: '3GVV',
      src: 'ਤਨੁ ਮਨੁ ਧਨੁ ਸਭੁ. ਸਉਪਿ ਗੁਰ ਕਉ; ਹੁਕਮਿ ਮੰਨਿਐ ਪਾਈਐ ॥',
      pronunciation: 'tan man dhan sabhu. saup gur kau; hukam mañniē pāīē ‖',
      translation:
        'Surrender body, mind, wealth, and everything to the Guru; obey the Order of His Will, and you will find Him.',
    },
    {
      id: '2TCU',
      src: 'ਹੁਕਮੁ ਮੰਨਿਹੁ ਗੁਰੂ ਕੇਰਾ; ਗਾਵਹੁ ਸਚੀ ਬਾਣੀ ॥',
      pronunciation: 'hukam mañnih gurū kerā; gāwah sacī bāṇī ‖',
      translation:
        "Obey the Hukam of the Guru's Command, and sing the True Word of His Bani.",
    },
    {
      id: 'QDB5',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਕਥਿਹੁ. ਅਕਥ ਕਹਾਣੀ ॥੯॥',
      pronunciation: 'kahē nānaku. suṇah sañtahu; kathihu. akath kahāṇī ‖9‖',
      translation:
        'Says Nanak, listen, O Saints, and speak the Unspoken Speech of the Lord. ||9||',
    },
    {
      id: 'JN46',
      src: 'ਏ ਮਨ ਚੰਚਲਾ; ਚਤੁਰਾਈ ਕਿਨੈ. ਨ ਪਾਇਆ ॥',
      pronunciation: 'e man cañcalā; caturāī kinē. na pāiā ‖',
      translation:
        'O fickle mind, through cleverness, no one has found the Lord.',
    },
    {
      id: '3LD3',
      src: 'ਚਤੁਰਾਈ. ਨ ਪਾਇਆ ਕਿਨੈ; ਤੂ ਸੁਣਿ ਮੰਨ ਮੇਰਿਆ ॥',
      pronunciation: 'caturāī. na pāiā kinē; tū suṇ mañn meriā ‖',
      translation:
        'Through cleverness, no one has found Him; listen, O my mind.',
    },
    {
      id: '27NL',
      src: 'ਏਹ ਮਾਇਆ ਮੋਹਣੀ; ਜਿਨਿ ਏਤੁ ਭਰਮਿ ਭੁਲਾਇਆ ॥',
      pronunciation: 'eh māiā mohaṇī; jin et bharam bhulāiā ‖',
      translation:
        'This Maya is so fascinating; because of it, people wander in doubt.',
    },
    {
      id: 'S5RG',
      src: 'ਮਾਇਆ ਤ ਮੋਹਣੀ ਤਿਨੈ ਕੀਤੀ; ਜਿਨਿ ਠਗਉਲੀ ਪਾਈਆ ॥',
      pronunciation: 'māiā ta mohaṇī tinē kītī; jin ṭhagaulī pāīā ‖',
      translation:
        'This fascinating Maya was created by the One who has administered this potion.',
    },
    {
      id: 'DKG7',
      src: 'ਕੁਰਬਾਣੁ ਕੀਤਾ ਤਿਸੈ ਵਿਟਹੁ; ਜਿਨਿ ਮੋਹੁ ਮੀਠਾ ਲਾਇਆ ॥',
      pronunciation: 'kurabāṇ kītā tisē viṭahu; jin moh mīṭhā lāiā ‖',
      translation:
        'I am a sacrifice to the One who has made emotional attachment sweet.',
    },
    {
      id: 'UW8N',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਮਨ ਚੰਚਲ; ਚਤੁਰਾਈ ਕਿਨੈ. ਨ ਪਾਇਆ ॥੧੦॥',
      pronunciation: 'kahē nānaku. man cañcal; caturāī kinē. na pāiā ‖10‖',
      translation:
        'Says Nanak, O fickle mind, no one has found Him through cleverness. ||10||',
    },
    {
      id: 'HLNA',
      src: 'ਏ ਮਨ ਪਿਆਰਿਆ; ਤੂ ਸਦਾ ਸਚੁ ਸਮਾਲੇ ॥',
      pronunciation: 'e man piāriā; tū sadā sac samāle ‖',
      translation: 'O beloved mind, contemplate the True Lord forever.',
    },
    {
      id: 'DER9',
      src: 'ਏਹੁ ਕੁਟੰਬੁ. ਤੂ ਜਿ ਦੇਖਦਾ; ਚਲੈ ਨਾਹੀ. ਤੇਰੈ ਨਾਲੇ ॥',
      pronunciation: 'eh kuṭañbu. tū ja dekhadā; calē nāhī. terē nāle ‖',
      translation: 'This family which you see shall not go along with you.',
    },
    {
      id: 'F6T1',
      src: 'ਸਾਥਿ ਤੇਰੈ. ਚਲੈ ਨਾਹੀ; ਤਿਸੁ ਨਾਲਿ. ਕਿਉ ਚਿਤੁ ਲਾਈਐ ॥',
      pronunciation: 'sāth terē. calē nāhī; tis nāli. kiu cit lāīē ‖',
      translation:
        'They shall not go along with you, so why do you focus your attention on them?',
    },
    {
      id: '6ES4',
      src: 'ਐਸਾ ਕੰਮੁ ਮੂਲੇ. ਨ ਕੀਚੈ; ਜਿਤੁ ਅੰਤਿ ਪਛੋਤਾਈਐ ॥',
      pronunciation: 'ēsā kañm mūle. na kīcē; jit añt pachotāīē ‖',
      translation: "Don't do anything that you will regret in the end.",
    },
    {
      id: 'CS43',
      src: 'ਸਤਿਗੁਰੂ ਕਾ ਉਪਦੇਸੁ ਸੁਣਿ ਤੂ; ਹੋਵੈ ਤੇਰੈ ਨਾਲੇ ॥',
      pronunciation: 'satigurū kā upades suṇ tū; hovē terē nāle ‖',
      translation:
        'Listen to the Teachings of the True Guru - these shall go along with you.',
    },
    {
      id: '640W',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਮਨ ਪਿਆਰੇ; ਤੂ ਸਦਾ ਸਚੁ ਸਮਾਲੇ ॥੧੧॥',
      pronunciation: 'kahē nānaku. man piāre; tū sadā sac samāle ‖11‖',
      translation:
        'Says Nanak, O beloved mind, contemplate the True Lord forever. ||11||',
    },
    {
      id: '0Q8G',
      src: 'ਅਗਮ ਅਗੋਚਰਾ; ਤੇਰਾ ਅੰਤੁ. ਨ ਪਾਇਆ ॥',
      pronunciation: 'agam agocarā; terā añtu. na pāiā ‖',
      translation:
        'O inaccessible and unfathomable Lord, Your limits cannot be found.',
    },
    {
      id: '5D6H',
      src: 'ਅੰਤੋ. ਨ ਪਾਇਆ ਕਿਨੈ ਤੇਰਾ; ਆਪਣਾ ਆਪੁ ਤੂ ਜਾਣਹੇ ॥',
      pronunciation: 'añto. na pāiā kinē terā; āpaṇā āp tū jāṇahe ‖',
      translation: 'No one has found Your limits; only You Yourself know.',
    },
    {
      id: '1GVQ',
      src: 'ਜੀਅ ਜੰਤ ਸਭਿ ਖੇਲੁ ਤੇਰਾ; ਕਿਆ ਕੋ ਆਖਿ ਵਖਾਣਏ ॥',
      pronunciation: 'jīa jañt sabh khel terā; kiā ko ākh wakhāṇae ‖',
      translation:
        'All living beings and creatures are Your play; how can anyone describe You?',
    },
    {
      id: 'PWVW',
      src: 'ਆਖਹਿ ਤ ਵੇਖਹਿ ਸਭੁ ਤੂਹੈ; ਜਿਨਿ ਜਗਤੁ ਉਪਾਇਆ ॥',
      pronunciation: 'ākhah ta vekhah sabh tūhē; jin jagat upāiā ‖',
      translation:
        'You speak, and You gaze upon all; You created the Universe.',
    },
    {
      id: 'MRE6',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਤੂ ਸਦਾ ਅਗੰਮੁ ਹੈ; ਤੇਰਾ ਅੰਤੁ ਨ ਪਾਇਆ ॥੧੨॥',
      pronunciation: 'kahē nānaku. tū sadā agañm hē; terā añt na pāiā ‖12‖',
      translation:
        'Says Nanak, You are forever inaccessible; Your limits cannot be found. ||12||',
    },
    {
      id: 'P4XV',
      src: 'ਸੁਰਿ ਨਰ ਮੁਨਿ ਜਨ. ਅੰਮ੍ਰਿਤੁ ਖੋਜਦੇ; ਸੁ ਅੰਮ੍ਰਿਤੁ. ਗੁਰ ਤੇ ਪਾਇਆ ॥',
      pronunciation:
        'sur nar mun jan. añmrit khojade; sa añmritu. gur te pāiā ‖',
      translation:
        'The angelic beings and the silent sages search for the Ambrosial Nectar; this Amrit is obtained from the Guru.',
    },
    {
      id: '01SM',
      src: 'ਪਾਇਆ ਅੰਮ੍ਰਿਤੁ. ਗੁਰਿ ਕ੍ਰਿਪਾ ਕੀਨੀ; ਸਚਾ ਮਨਿ ਵਸਾਇਆ ॥',
      pronunciation: 'pāiā añmritu. gur kripā kīnī; sacā man wasāiā ‖',
      translation:
        'This Amrit is obtained, when the Guru grants His Grace; He enshrines the True Lord within the mind.',
    },
    {
      id: 'VZHF',
      src: 'ਜੀਅ ਜੰਤ ਸਭਿ ਤੁਧੁ ਉਪਾਏ; ਇਕਿ ਵੇਖਿ. ਪਰਸਣਿ ਆਇਆ ॥',
      pronunciation: 'jīa jañt sabh tudh upāe; ik vekhi. parasaṇ āiā ‖',
      translation:
        'All living beings and creatures were created by You; only some come to see the Guru, and seek His blessing.',
    },
    {
      id: 'PPYM',
      src: 'ਲਬੁ ਲੋਭੁ ਅਹੰਕਾਰੁ ਚੂਕਾ; ਸਤਿਗੁਰੂ ਭਲਾ ਭਾਇਆ ॥',
      pronunciation: 'lab lobh ahañkār cūkā; satigurū bhalā bhāiā ‖',
      translation:
        'Their greed, avarice and egotism are dispelled, and the True Guru seems sweet.',
    },
    {
      id: 'V50J',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਸ ਨੋ ਆਪਿ ਤੁਠਾ; ਤਿਨਿ. ਅੰਮ੍ਰਿਤੁ ਗੁਰ ਤੇ ਪਾਇਆ ॥੧੩॥',
      pronunciation:
        'kahē nānaku. jis no āp tuṭhā; tini. añmrit gur te pāiā ‖13‖',
      translation:
        'Says Nanak, those with whom the Lord is pleased, obtain the Amrit, through the Guru. ||13||',
    },
    {
      id: 'WR06',
      src: 'ਭਗਤਾ ਕੀ; ਚਾਲ ਨਿਰਾਲੀ ॥',
      pronunciation: 'bhagatā kī; cāl nirālī ‖',
      translation: 'The lifestyle of the devotees is unique and distinct.',
    },
    {
      id: 'QPB1',
      src: 'ਚਾਲਾ ਨਿਰਾਲੀ ਭਗਤਾਹ ਕੇਰੀ; ਬਿਖਮ ਮਾਰਗਿ ਚਲਣਾ ॥',
      pronunciation: 'cālā nirālī bhagatāh kerī; bikham mārag calaṇā ‖',
      translation:
        "The devotees' lifestyle is unique and distinct; they follow the most difficult path.",
    },
    {
      id: 'F6SD',
      src: 'ਲਬੁ ਲੋਭੁ ਅਹੰਕਾਰੁ ਤਜਿ ਤ੍ਰਿਸਨਾ; ਬਹੁਤੁ. ਨਾਹੀ ਬੋਲਣਾ ॥',
      pronunciation: 'lab lobh ahañkār taj trisanā; bahutu. nāhī bolaṇā ‖',
      translation:
        'They renounce greed, avarice, egotism and desire; they do not talk too much.',
    },
    {
      id: 'RE0D',
      src: 'ਖੰਨਿਅਹੁ ਤਿਖੀ. ਵਾਲਹੁ ਨਿਕੀ; ਏਤੁ ਮਾਰਗਿ ਜਾਣਾ ॥',
      pronunciation: 'khañniah tikhī. vālah nikī; et mārag jāṇā ‖',
      translation:
        'The path they take is sharper than a two-edged sword, and finer than a hair.',
    },
    {
      id: '6UV1',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਜਿਨੀ ਆਪੁ ਤਜਿਆ; ਹਰਿ ਵਾਸਨਾ ਸਮਾਣੀ ॥',
      pronunciation: 'gur parasādī jinī āp tajiā; har vāsanā samāṇī ‖',
      translation:
        "By Guru's Grace, they shed their selfishness and conceit; their hopes are merged in the Lord.",
    },
    {
      id: '34U3',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਚਾਲ ਭਗਤਾ; ਜੁਗਹੁ ਜੁਗੁ ਨਿਰਾਲੀ ॥੧੪॥',
      pronunciation: 'kahē nānaku. cāl bhagatā; jugah jug nirālī ‖14‖',
      translation:
        'Says Nanak, the lifestyle of the devotees, in each and every age, is unique and distinct. ||14||',
    },
    {
      id: '4SA2',
      src: 'ਜਿਉ ਤੂ ਚਲਾਇਹਿ. ਤਿਵ ਚਲਹ ਸੁਆਮੀ; ਹੋਰੁ. ਕਿਆ ਜਾਣਾ ਗੁਣ ਤੇਰੇ ॥',
      pronunciation:
        'jiu tū calāihi. tiv calah suāmī; horu. kiā jāṇā guṇ tere ‖',
      translation:
        'As You make me walk, so do I walk, O my Lord and Master; what else do I know of Your Glorious Virtues?',
    },
    {
      id: 'K5MB',
      src: 'ਜਿਵ ਤੂ ਚਲਾਇਹਿ. ਤਿਵੈ ਚਲਹ; ਜਿਨਾ ਮਾਰਗਿ ਪਾਵਹੇ ॥',
      pronunciation: 'jiv tū calāihi. tivē calah; jinā mārag pāwahe ‖',
      translation:
        'As You cause them to walk, they walk - You have placed them on the Path.',
    },
    {
      id: '92ET',
      src: 'ਕਰਿ ਕਿਰਪਾ. ਜਿਨ ਨਾਮਿ ਲਾਇਹਿ; ਸਿ ਹਰਿ ਹਰਿ ਸਦਾ ਧਿਆਵਹੇ ॥',
      pronunciation: 'kar kirapā. jin nām lāihi; sa har har sadā dhiāwahe ‖',
      translation:
        'In Your Mercy, You attach them to the Naam; they meditate forever on the Lord, Har, Har.',
    },
    {
      id: '7ZH9',
      src: 'ਜਿਸ ਨੋ ਕਥਾ ਸੁਣਾਇਹਿ ਆਪਣੀ; ਸਿ ਗੁਰਦੁਆਰੈ ਸੁਖੁ ਪਾਵਹੇ ॥',
      pronunciation: 'jis no kathā suṇāih āpaṇī; sa guraduārē sukh pāwahe ‖',
      translation:
        "Those whom You cause to listen to Your sermon, find peace in the Gurdwara, the Guru's Gate.",
    },
    {
      id: 'SKVC',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੇ ਸਾਹਿਬ; ਜਿਉ ਭਾਵੈ ਤਿਵੈ ਚਲਾਵਹੇ ॥੧੫॥',
      pronunciation: 'kahē nānaku. sace sāhib; jiu bhāvē tivē calāwahe ‖15‖',
      translation:
        'Says Nanak, O my True Lord and Master, you make us walk according to Your Will. ||15||',
    },
    {
      id: 'Q51G',
      src: 'ਏਹੁ ਸੋਹਿਲਾ; ਸਬਦੁ ਸੁਹਾਵਾ ॥',
      pronunciation: 'eh sohilā; sabad suhāvā ‖',
      translation:
        'This song of praise is the Shabad, the most beautiful Word of God.',
    },
    {
      id: 'PXYG',
      src: 'ਸਬਦੋ ਸੁਹਾਵਾ ਸਦਾ ਸੋਹਿਲਾ; ਸਤਿਗੁਰੂ ਸੁਣਾਇਆ ॥',
      pronunciation: 'sabado suhāvā sadā sohilā; satigurū suṇāiā ‖',
      translation:
        'This beauteous Shabad is the everlasting song of praise, spoken by the True Guru.',
    },
    {
      id: '9F6P',
      src: 'ਏਹੁ ਤਿਨ ਕੈ ਮੰਨਿ ਵਸਿਆ; ਜਿਨ ਧੁਰਹੁ ਲਿਖਿਆ ਆਇਆ ॥',
      pronunciation: 'eh tin kē mañn wasiā; jin dhurah likhiā āiā ‖',
      translation:
        'This is enshrined in the minds of those who are so pre-destined by the Lord.',
    },
    {
      id: '1CEH',
      src: 'ਇਕਿ ਫਿਰਹਿ ਘਨੇਰੇ. ਕਰਹਿ ਗਲਾ; ਗਲੀ ਕਿਨੈ. ਨ ਪਾਇਆ ॥',
      pronunciation: 'ik phirah ghanere. karah galā; galī kinē. na pāiā ‖',
      translation:
        'Some wander around, babbling on and on, but none obtain Him by babbling.',
    },
    {
      id: 'S5T5',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਬਦੁ ਸੋਹਿਲਾ; ਸਤਿਗੁਰੂ ਸੁਣਾਇਆ ॥੧੬॥',
      pronunciation: 'kahē nānaku. sabad sohilā; satigurū suṇāiā ‖16‖',
      translation:
        'Says Nanak, the Shabad, this song of praise, has been spoken by the True Guru. ||16||',
    },
    {
      id: 'EF6Z',
      src: 'ਪਵਿਤੁ ਹੋਏ ਸੇ ਜਨਾ; ਜਿਨੀ ਹਰਿ ਧਿਆਇਆ ॥',
      pronunciation: 'pavit hoe se janā; jinī har dhiāiā ‖',
      translation: 'Those humble beings who meditate on the Lord become pure.',
    },
    {
      id: 'T3V9',
      src: 'ਹਰਿ ਧਿਆਇਆ ਪਵਿਤੁ ਹੋਏ; ਗੁਰਮੁਖਿ ਜਿਨੀ ਧਿਆਇਆ ॥',
      pronunciation: 'har dhiāiā pavit hoe; guramukh jinī dhiāiā ‖',
      translation:
        'Meditating on the Lord, they become pure; as Gurmukh, they meditate on Him.',
    },
    {
      id: '5FF5',
      src: 'ਪਵਿਤੁ ਮਾਤਾ ਪਿਤਾ. ਕੁਟੰਬ ਸਹਿਤ ਸਿਉ; ਪਵਿਤੁ ਸੰਗਤਿ ਸਬਾਈਆ ॥',
      pronunciation: 'pavit mātā pitā. kuṭañb sahit siu; pavit sañgat sabāīā ‖',
      translation:
        'They are pure, along with their mothers, fathers, family and friends; all their companions are pure as well.',
    },
    {
      id: 'Z3MV',
      src: 'ਕਹਦੇ ਪਵਿਤੁ. ਸੁਣਦੇ ਪਵਿਤੁ; ਸੇ ਪਵਿਤੁ. ਜਿਨੀ ਮੰਨਿ ਵਸਾਇਆ ॥',
      pronunciation:
        'kahade pavitu. suṇade pavitu; se pavitu. jinī mañn wasāiā ‖',
      translation:
        'Pure are those who speak, and pure are those who listen; those who enshrine it within their minds are pure.',
    },
    {
      id: 'YRCK',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੇ ਪਵਿਤੁ; ਜਿਨੀ ਗੁਰਮੁਖਿ ਹਰਿ ਹਰਿ ਧਿਆਇਆ ॥੧੭॥',
      pronunciation:
        'kahē nānaku. se pavitu; jinī guramukh har har dhiāiā ‖17‖',
      translation:
        'Says Nanak, pure and holy are those who, as Gurmukh, meditate on the Lord, Har, Har. ||17||',
    },
    {
      id: 'C5TC',
      src: 'ਕਰਮੀ ਸਹਜੁ. ਨ ਊਪਜੈ; ਵਿਣੁ ਸਹਜੈ. ਸਹਸਾ, ਨ ਜਾਇ ॥',
      pronunciation: 'karamī sahaju. na ūpajē; viṇ sahajē. sahasā, na jāi ‖',
      translation:
        'By religious rituals, intuitive poise is not found; without intuitive poise, skepticism does not depart.',
    },
    {
      id: 'Z31K',
      src: 'ਨਹ ਜਾਇ ਸਹਸਾ. ਕਿਤੈ ਸੰਜਮਿ; ਰਹੇ ਕਰਮ ਕਮਾਏ ॥',
      pronunciation: 'nah jāi sahasā. kitē sañjami; rahe karam kamāe ‖',
      translation:
        'Skepticism does not depart by contrived actions; everybody is tired of performing these rituals.',
    },
    {
      id: 'ADUT',
      src: 'ਸਹਸੈ ਜੀਉ ਮਲੀਣੁ ਹੈ; ਕਿਤੁ ਸੰਜਮਿ ਧੋਤਾ ਜਾਏ ॥',
      pronunciation: 'sahasē jīu malīṇ hē; kit sañjam dhotā jāe ‖',
      translation:
        'The soul is polluted by skepticism; how can it be cleansed?',
    },
    {
      id: 'SB6Z',
      src: 'ਮੰਨੁ ਧੋਵਹੁ. ਸਬਦਿ ਲਾਗਹੁ; ਹਰਿ ਸਿਉ ਰਹਹੁ. ਚਿਤੁ ਲਾਇ ॥',
      pronunciation: 'mañn dhowahu. sabad lāgahu; har siu rahahu. cit lāi ‖',
      translation:
        'Wash your mind by attaching it to the Shabad, and keep your consciousness focused on the Lord.',
    },
    {
      id: 'FYD3',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਗੁਰ ਪਰਸਾਦੀ ਸਹਜੁ ਉਪਜੈ; ਇਹੁ ਸਹਸਾ ਇਵ ਜਾਇ ॥੧੮॥',
      pronunciation:
        'kahē nānaku. gur parasādī sahaj upajē; ih sahasā iv jāi ‖18‖',
      translation:
        "Says Nanak, by Guru's Grace, intuitive poise is produced, and this skepticism is dispelled. ||18||",
    },
    {
      id: 'HSD3',
      src: 'ਜੀਅਹੁ ਮੈਲੇ; ਬਾਹਰਹੁ ਨਿਰਮਲ ॥',
      pronunciation: 'jīah mēle; bāharah niramal ‖',
      translation: 'Inwardly polluted, and outwardly pure.',
    },
    {
      id: 'SHSP',
      src: 'ਬਾਹਰਹੁ ਨਿਰਮਲ. ਜੀਅਹੁ ਤ ਮੈਲੇ; ਤਿਨੀ ਜਨਮੁ ਜੂਐ ਹਾਰਿਆ ॥',
      pronunciation: 'bāharah niramal. jīah ta mēle; tinī janam jūē hāriā ‖',
      translation:
        'Those who are outwardly pure and yet polluted within, lose their lives in the gamble.',
    },
    {
      id: '5BTD',
      src: 'ਏਹ ਤਿਸਨਾ ਵਡਾ ਰੋਗੁ ਲਗਾ; ਮਰਣੁ ਮਨਹੁ ਵਿਸਾਰਿਆ ॥',
      pronunciation: 'eh tisanā waḍā rog lagā; maraṇ manah visāriā ‖',
      translation:
        'They contract this terrible disease of desire, and in their minds, they forget about dying.',
    },
    {
      id: 'ELA8',
      src: 'ਵੇਦਾ ਮਹਿ ਨਾਮੁ ਉਤਮੁ. ਸੋ ਸੁਣਹਿ ਨਾਹੀ; ਫਿਰਹਿ ਜਿਉ ਬੇਤਾਲਿਆ ॥',
      pronunciation: 'vedā mah nām utamu. so suṇah nāhī; phirah jiu betāliā ‖',
      translation:
        'In the Vedas, the ultimate objective is the Naam, the Name of the Lord; but they do not hear this, and they wander around like demons.',
    },
    {
      id: '4U4N',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਨ ਸਚੁ ਤਜਿਆ. ਕੂੜੇ ਲਾਗੇ; ਤਿਨੀ ਜਨਮੁ ਜੂਐ ਹਾਰਿਆ ॥੧੯॥',
      pronunciation:
        'kahē nānaku. jin sac tajiā. kūṛe lāge; tinī janam jūē hāriā ‖19‖',
      translation:
        'Says Nanak, those who forsake Truth and cling to falsehood, lose their lives in the gamble. ||19||',
    },
    {
      id: '5HQX',
      src: 'ਜੀਅਹੁ ਨਿਰਮਲ; ਬਾਹਰਹੁ ਨਿਰਮਲ ॥',
      pronunciation: 'jīah niramal; bāharah niramal ‖',
      translation: 'Inwardly pure, and outwardly pure.',
    },
    {
      id: 'V34W',
      src: 'ਬਾਹਰਹੁ ਤ ਨਿਰਮਲ. ਜੀਅਹੁ ਨਿਰਮਲ; ਸਤਿਗੁਰ ਤੇ. ਕਰਣੀ ਕਮਾਣੀ ॥',
      pronunciation:
        'bāharah ta niramal. jīah niramal; satigur te. karaṇī kamāṇī ‖',
      translation:
        'Those who are outwardly pure and also pure within, through the Guru, perform good deeds.',
    },
    {
      id: 'ALMK',
      src: 'ਕੂੜ ਕੀ ਸੋਇ. ਪਹੁਚੈ ਨਾਹੀ; ਮਨਸਾ ਸਚਿ ਸਮਾਣੀ ॥',
      pronunciation: 'kūṛ kī soi. pahucē nāhī; manasā sac samāṇī ‖',
      translation:
        'Not even an iota of falsehood touches them; their hopes are absorbed in the Truth.',
    },
    {
      id: 'XY83',
      src: 'ਜਨਮੁ ਰਤਨੁ ਜਿਨੀ ਖਟਿਆ; ਭਲੇ ਸੇ ਵਣਜਾਰੇ ॥',
      pronunciation: 'janam ratan jinī khaṭiā; bhale se waṇajāre ‖',
      translation:
        'Those who earn the jewel of this human life, are the most excellent of merchants.',
    },
    {
      id: 'MAS1',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਨ ਮੰਨੁ ਨਿਰਮਲੁ; ਸਦਾ ਰਹਹਿ ਗੁਰ ਨਾਲੇ ॥੨੦॥',
      pronunciation: 'kahē nānaku. jin mañn niramalu; sadā rahah gur nāle ‖20‖',
      translation:
        'Says Nanak, those whose minds are pure, abide with the Guru forever. ||20||',
    },
    {
      id: 'E30Z',
      src: 'ਜੇ ਕੋ ਸਿਖੁ; ਗੁਰੂ ਸੇਤੀ ਸਨਮੁਖੁ ਹੋਵੈ ॥',
      pronunciation: 'je ko sikhu; gurū setī sanamukh hovē ‖',
      translation: 'If a Sikh turns to the Guru with sincere faith, as sunmukh',
    },
    {
      id: '6VWC',
      src: 'ਹੋਵੈ ਤ ਸਨਮੁਖੁ ਸਿਖੁ ਕੋਈ; ਜੀਅਹੁ ਰਹੈ ਗੁਰ ਨਾਲੇ ॥',
      pronunciation: 'hovē ta sanamukh sikh koī; jīah rahē gur nāle ‖',
      translation:
        'if a Sikh turns to the Guru with sincere faith, as sunmukh, his soul abides with the Guru.',
    },
    {
      id: 'HBZ7',
      src: 'ਗੁਰ ਕੇ ਚਰਨ. ਹਿਰਦੈ ਧਿਆਏ; ਅੰਤਰ ਆਤਮੈ ਸਮਾਲੇ ॥',
      pronunciation: 'gur ke caran. hiradē dhiāe; añtar ātamē samāle ‖',
      translation:
        'Within his heart, he meditates on the lotus feet of the Guru; deep within his soul, he contemplates Him.',
    },
    {
      id: 'YF6T',
      src: 'ਆਪੁ ਛਡਿ. ਸਦਾ ਰਹੈ ਪਰਣੈ; ਗੁਰ ਬਿਨੁ ਅਵਰੁ. ਨ ਜਾਣੈ ਕੋਏ ॥',
      pronunciation: 'āp chaḍi. sadā rahē paraṇē; gur bin awaru. na jāṇē koe ‖',
      translation:
        'Renouncing selfishness and conceit, he remains always on the side of the Guru; he does not know anyone except the Guru.',
    },
    {
      id: '2UCM',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਸੋ ਸਿਖੁ ਸਨਮੁਖੁ ਹੋਏ ॥੨੧॥',
      pronunciation: 'kahē nānaku. suṇah sañtahu; so sikh sanamukh hoe ‖21‖',
      translation:
        'Says Nanak, listen, O Saints: such a Sikh turns toward the Guru with sincere faith, and becomes sunmukh. ||21||',
    },
    {
      id: '18BG',
      src: 'ਜੇ ਕੋ. ਗੁਰ ਤੇ ਵੇਮੁਖੁ ਹੋਵੈ; ਬਿਨੁ ਸਤਿਗੁਰ ਮੁਕਤਿ. ਨ ਪਾਵੈ ॥',
      pronunciation: 'je ko. gur te vemukh hovē; bin satigur mukati. na pāvē ‖',
      translation:
        'One who turns away from the Guru, and becomes baymukh - without the True Guru, he shall not find liberation.',
    },
    {
      id: '1T4C',
      src: 'ਪਾਵੈ ਮੁਕਤਿ ਨ. ਹੋਰ ਥੈ ਕੋਈ; ਪੁਛਹੁ ਬਿਬੇਕੀਆ ਜਾਏ ॥',
      pronunciation: 'pāvē mukat n. hor thē koī; puchah bibekīā jāe ‖',
      translation:
        'He shall not find liberation anywhere else either; go and ask the wise ones about this.',
    },
    {
      id: 'E534',
      src: 'ਅਨੇਕ ਜੂਨੀ. ਭਰਮਿ ਆਵੈ; ਵਿਣੁ ਸਤਿਗੁਰ ਮੁਕਤਿ. ਨ ਪਾਏ ॥',
      pronunciation: 'anek jūnī. bharam āvē; viṇ satigur mukati. na pāe ‖',
      translation:
        'He shall wander through countless incarnations; without the True Guru, he shall not find liberation.',
    },
    {
      id: 'HWVB',
      src: 'ਫਿਰਿ ਮੁਕਤਿ ਪਾਏ. ਲਾਗਿ ਚਰਣੀ; ਸਤਿਗੁਰੂ ਸਬਦੁ ਸੁਣਾਏ ॥',
      pronunciation: 'phir mukat pāe. lāg caraṇī; satigurū sabad suṇāe ‖',
      translation:
        'But liberation is attained, when one is attached to the feet of the True Guru, chanting the Word of the Shabad.',
    },
    {
      id: '9V88',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਵੀਚਾਰਿ ਦੇਖਹੁ; ਵਿਣੁ ਸਤਿਗੁਰ ਮੁਕਤਿ. ਨ ਪਾਏ ॥੨੨॥',
      pronunciation:
        'kahē nānaku. vīcār dekhahu; viṇ satigur mukati. na pāe ‖22‖',
      translation:
        'Says Nanak, contemplate this and see, that without the True Guru, there is no liberation. ||22||',
    },
    {
      id: '5A6J',
      src: 'ਆਵਹੁ ਸਿਖ. ਸਤਿਗੁਰੂ ਕੇ ਪਿਆਰਿਹੋ; ਗਾਵਹੁ ਸਚੀ ਬਾਣੀ ॥',
      pronunciation: 'āwah sikh. satigurū ke piāriho; gāwah sacī bāṇī ‖',
      translation:
        'Come, O beloved Sikhs of the True Guru, and sing the True Word of His Bani.',
    },
    {
      id: 'EPV2',
      src: 'ਬਾਣੀ ਤ ਗਾਵਹੁ ਗੁਰੂ ਕੇਰੀ; ਬਾਣੀਆ ਸਿਰਿ ਬਾਣੀ ॥',
      pronunciation: 'bāṇī ta gāwah gurū kerī; bāṇīā sir bāṇī ‖',
      translation: "Sing the Guru's Bani, the supreme Word of Words.",
    },
    {
      id: 'DDQQ',
      src: 'ਜਿਨ ਕਉ ਨਦਰਿ ਕਰਮੁ ਹੋਵੈ; ਹਿਰਦੈ ਤਿਨਾ ਸਮਾਣੀ ॥',
      pronunciation: 'jin kau nadar karam hovē; hiradē tinā samāṇī ‖',
      translation:
        "Those who are blessed by the Lord's Glance of Grace - their hearts are imbued with this Bani.",
    },
    {
      id: 'UBZE',
      src: 'ਪੀਵਹੁ ਅੰਮ੍ਰਿਤੁ. ਸਦਾ ਰਹਹੁ ਹਰਿ ਰੰਗਿ; ਜਪਿਹੁ ਸਾਰਿਗਪਾਣੀ ॥',
      pronunciation: 'pīwah añmritu. sadā rahah har rañgi; japih sārigapāṇī ‖',
      translation:
        "Drink in this Ambrosial Nectar, and remain in the Lord's Love forever; meditate on the Lord, the Sustainer of the world.",
    },
    {
      id: 'UCDS',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਦਾ ਗਾਵਹੁ; ਏਹ ਸਚੀ ਬਾਣੀ ॥੨੩॥',
      pronunciation: 'kahē nānaku. sadā gāwahu; eh sacī bāṇī ‖23‖',
      translation: 'Says Nanak, sing this True Bani forever. ||23||',
    },
    {
      id: 'R5BM',
      src: 'ਸਤਿਗੁਰੂ ਬਿਨਾ; ਹੋਰ ਕਚੀ ਹੈ ਬਾਣੀ ॥',
      pronunciation: 'satigurū binā; hor kacī hē bāṇī ‖',
      translation: 'Without the True Guru, other songs are false.',
    },
    {
      id: 'D2XF',
      src: 'ਬਾਣੀ ਤ ਕਚੀ. ਸਤਿਗੁਰੂ ਬਾਝਹੁ; ਹੋਰ ਕਚੀ ਬਾਣੀ ॥',
      pronunciation: 'bāṇī ta kacī. satigurū bājhahu; hor kacī bāṇī ‖',
      translation:
        'The songs are false without the True Guru; all other songs are false.',
    },
    {
      id: 'EF4C',
      src: 'ਕਹਦੇ ਕਚੇ; ਸੁਣਦੇ ਕਚੇ; ਕਚੀਁ ਆਖਿ ਵਖਾਣੀ ॥',
      pronunciation: 'kahade kace; suṇade kace; kacīਁ ākh wakhāṇī ‖',
      translation:
        'The speakers are false, and the listeners are false; those who speak and recite are false.',
    },
    {
      id: 'U8YD',
      src: 'ਹਰਿ ਹਰਿ ਨਿਤ ਕਰਹਿ ਰਸਨਾ; ਕਹਿਆ ਕਛੂ. ਨ ਜਾਣੀ ॥',
      pronunciation: 'har har nit karah rasanā; kahiā kachū. na jāṇī ‖',
      translation:
        "They may continually chant, 'Har, Har' with their tongues, but they do not know what they are saying.",
    },
    {
      id: 'E49U',
      src: 'ਚਿਤੁ ਜਿਨ ਕਾ. ਹਿਰਿ ਲਇਆ ਮਾਇਆ; ਬੋਲਨਿ ਪਏ ਰਵਾਣੀ ॥',
      pronunciation: 'cit jin kā. hir laiā māiā; bolan pae ravāṇī ‖',
      translation:
        'Their consciousness is lured by Maya; they are just reciting mechanically.',
    },
    {
      id: 'T3PH',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਤਿਗੁਰੂ ਬਾਝਹੁ; ਹੋਰ ਕਚੀ ਬਾਣੀ ॥੨੪॥',
      pronunciation: 'kahē nānaku. satigurū bājhahu; hor kacī bāṇī ‖24‖',
      translation:
        'Says Nanak, without the True Guru, other songs are false. ||24||',
    },
    {
      id: 'UJ4T',
      src: 'ਗੁਰ ਕਾ ਸਬਦੁ. ਰਤੰਨੁ ਹੈ; ਹੀਰੇ ਜਿਤੁ ਜੜਾਉ ॥',
      pronunciation: 'gur kā sabadu. ratañn hē; hīre jit jaṛāu ‖',
      translation:
        "The Word of the Guru's Shabad is a jewel, studded with diamonds.",
    },
    {
      id: '0S9X',
      src: 'ਸਬਦੁ ਰਤਨੁ ਜਿਤੁ ਮੰਨੁ ਲਾਗਾ; ਏਹੁ ਹੋਆ ਸਮਾਉ ॥',
      pronunciation: 'sabad ratan jit mañn lāgā; eh hoā samāu ‖',
      translation:
        'The mind which is attached to this jewel, merges into the Shabad.',
    },
    {
      id: 'YXC6',
      src: 'ਸਬਦ ਸੇਤੀ ਮਨੁ ਮਿਲਿਆ; ਸਚੈ ਲਾਇਆ ਭਾਉ ॥',
      pronunciation: 'sabad setī man miliā; sacē lāiā bhāu ‖',
      translation:
        'One whose mind is attuned to the Shabad, enshrines love for the True Lord.',
    },
    {
      id: '1C5U',
      src: 'ਆਪੇ ਹੀਰਾ. ਰਤਨੁ ਆਪੇ; ਜਿਸ ਨੋ ਦੇਇ ਬੁਝਾਇ ॥',
      pronunciation: 'āpe hīrā. ratan āpe; jis no dei bujhāi ‖',
      translation:
        'He Himself is the diamond, and He Himself is the jewel; one who is blessed, understands its value.',
    },
    {
      id: '99QJ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਬਦੁ ਰਤਨੁ ਹੈ; ਹੀਰਾ ਜਿਤੁ ਜੜਾਉ ॥੨੫॥',
      pronunciation: 'kahē nānaku. sabad ratan hē; hīrā jit jaṛāu ‖25‖',
      translation:
        'Says Nanak, the Shabad is a jewel, studded with diamonds. ||25||',
    },
    {
      id: 'QW7A',
      src: 'ਸਿਵ ਸਕਤਿ. ਆਪਿ ਉਪਾਇ ਕੈ ਕਰਤਾ; ਆਪੇ ਹੁਕਮੁ ਵਰਤਾਏ ॥',
      pronunciation: 'siv sakati. āp upāi kē karatā; āpe hukam waratāe ‖',
      translation:
        'He Himself created Shiva and Shakti, mind and matter; the Creator subjects them to His Command.',
    },
    {
      id: 'BW7T',
      src: 'ਹੁਕਮੁ ਵਰਤਾਏ ਆਪਿ ਵੇਖੈ; ਗੁਰਮੁਖਿ ਕਿਸੈ ਬੁਝਾਏ ॥',
      pronunciation: 'hukam waratāe āp vekhē; guramukh kisē bujhāe ‖',
      translation:
        'Enforcing His Order, He Himself sees all. How rare are those who, as Gurmukh, come to know Him.',
    },
    {
      id: '79EN',
      src: 'ਤੋੜੇ ਬੰਧਨ. ਹੋਵੈ ਮੁਕਤੁ; ਸਬਦੁ ਮੰਨਿ ਵਸਾਏ ॥',
      pronunciation: 'toṛe bañdhan. hovē mukatu; sabad mañn wasāe ‖',
      translation:
        'They break their bonds, and attain liberation; they enshrine the Shabad within their minds.',
    },
    {
      id: 'ZFQX',
      src: 'ਗੁਰਮੁਖਿ ਜਿਸ ਨੋ ਆਪਿ ਕਰੇ ਸੁ ਹੋਵੈ; ਏਕਸ ਸਿਉ ਲਿਵ ਲਾਏ ॥',
      pronunciation: 'guramukh jis no āp kare sa hovē; ekas siu liv lāe ‖',
      translation:
        'Those whom the Lord Himself makes Gurmukh, lovingly focus their consciousness on the One Lord.',
    },
    {
      id: 'CA75',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਆਪਿ ਕਰਤਾ; ਆਪੇ ਹੁਕਮੁ ਬੁਝਾਏ ॥੨੬॥',
      pronunciation: 'kahē nānaku. āp karatā; āpe hukam bujhāe ‖26‖',
      translation:
        'Says Nanak, He Himself is the Creator; He Himself reveals the Hukam of His Command. ||26||',
    },
    {
      id: 'D53B',
      src: 'ਸਿਮ੍ਰਿਤਿ ਸਾਸਤ੍ਰ. ਪੁੰਨ ਪਾਪ ਬੀਚਾਰਦੇ; ਤਤੈ ਸਾਰ. ਨ ਜਾਣੀ ॥',
      pronunciation: 'simrit sāsatr. puñn pāp bīcārade; tatē sār. na jāṇī ‖',
      translation:
        'The Simritees and the Shaastras discriminate between good and evil, but they do not know the true essence of reality.',
    },
    {
      id: '9SCB',
      src: 'ਤਤੈ ਸਾਰ. ਨ ਜਾਣੀ ਗੁਰੂ ਬਾਝਹੁ; ਤਤੈ ਸਾਰ. ਨ ਜਾਣੀ ॥',
      pronunciation: 'tatē sār. na jāṇī gurū bājhahu; tatē sār. na jāṇī ‖',
      translation:
        'They do not know the true essence of reality without the Guru; they do not know the true essence of reality.',
    },
    {
      id: 'XSZ9',
      src: 'ਤਿਹੀ ਗੁਣੀ ਸੰਸਾਰੁ. ਭ੍ਰਮਿ ਸੁਤਾ; ਸੁਤਿਆ ਰੈਣਿ ਵਿਹਾਣੀ ॥',
      pronunciation: 'tihī guṇī sañsāru. bhram sutā; sutiā rēṇ vihāṇī ‖',
      translation:
        'The world is asleep in the three modes and doubt; it passes the night of its life sleeping.',
    },
    {
      id: '8K5G',
      src: 'ਗੁਰ ਕਿਰਪਾ ਤੇ. ਸੇ ਜਨ ਜਾਗੇ. ਜਿਨਾ ਹਰਿ ਮਨਿ ਵਸਿਆ; ਬੋਲਹਿ ਅੰਮ੍ਰਿਤ ਬਾਣੀ ॥',
      pronunciation:
        'gur kirapā te. se jan jāge. jinā har man wasiā; bolah añmrit bāṇī ‖',
      translation:
        "Those humble beings remain awake and aware, within whose minds, by Guru's Grace, the Lord abides; they chant the Ambrosial Word of the Guru's Bani.",
    },
    {
      id: 'GGQ6',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੋ ਤਤੁ ਪਾਏ. ਜਿਸ ਨੋ ਅਨਦਿਨੁ ਹਰਿ ਲਿਵ ਲਾਗੈ; ਜਾਗਤ ਰੈਣਿ ਵਿਹਾਣੀ ॥੨੭॥',
      pronunciation:
        'kahē nānaku. so tat pāe. jis no anadin har liv lāgē; jāgat rēṇ vihāṇī ‖27‖',
      translation:
        'Says Nanak, they alone obtain the essence of reality, who night and day remain lovingly absorbed in the Lord; they pass the night of their life awake and aware. ||27||',
    },
    {
      id: '5PUH',
      src: 'ਮਾਤਾ ਕੇ ਉਦਰ ਮਹਿ. ਪ੍ਰਤਿਪਾਲ ਕਰੇ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੀਐ ॥',
      pronunciation:
        'mātā ke udar mahi. pratipāl kare; so. kiu manah visārīē ‖',
      translation:
        "He nourished us in the mother's womb; why forget Him from the mind?",
    },
    {
      id: 'RF9L',
      src: 'ਮਨਹੁ. ਕਿਉ ਵਿਸਾਰੀਐ, ਏਵਡੁ ਦਾਤਾ; ਜਿ ਅਗਨਿ ਮਹਿ. ਆਹਾਰੁ ਪਹੁਚਾਵਏ ॥',
      pronunciation:
        'manahu. kiu visārīē, ewaḍ dātā; ja agan mahi. āhār pahucāwae ‖',
      translation:
        'Why forget from the mind such a Great Giver, who gave us sustenance in the fire of the womb?',
    },
    {
      id: 'L1Q2',
      src: 'ਓਸ ਨੋ ਕਿਹੁ ਪੋਹਿ. ਨ ਸਕੀ; ਜਿਸ ਨਉ ਆਪਣੀ ਲਿਵ ਲਾਵਏ ॥',
      pronunciation: 'os no kih pohi. na sakī; jis nau āpaṇī liv lāwae ‖',
      translation:
        'Nothing can harm one, whom the Lord inspires to embrace His Love.',
    },
    {
      id: 'SXM1',
      src: 'ਆਪਣੀ ਲਿਵ ਆਪੇ ਲਾਏ; ਗੁਰਮੁਖਿ ਸਦਾ ਸਮਾਲੀਐ ॥',
      pronunciation: 'āpaṇī liv āpe lāe; guramukh sadā samālīē ‖',
      translation:
        'He Himself is the love, and He Himself is the embrace; the Gurmukh contemplates Him forever.',
    },
    {
      id: 'XR8Y',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਏਵਡੁ ਦਾਤਾ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੀਐ ॥੨੮॥',
      pronunciation: 'kahē nānaku. ewaḍ dātā; so. kiu manah visārīē ‖28‖',
      translation:
        'Says Nanak, why forget such a Great Giver from the mind? ||28||',
    },
    {
      id: 'G8GB',
      src: 'ਜੈਸੀ ਅਗਨਿ ਉਦਰ ਮਹਿ; ਤੈਸੀ ਬਾਹਰਿ ਮਾਇਆ ॥',
      pronunciation: 'jēsī agan udar mahi; tēsī bāhar māiā ‖',
      translation: 'As is the fire within the womb, so is Maya outside.',
    },
    {
      id: 'Y1WZ',
      src: 'ਮਾਇਆ ਅਗਨਿ ਸਭ ਇਕੋ ਜੇਹੀ; ਕਰਤੈ ਖੇਲੁ ਰਚਾਇਆ ॥',
      pronunciation: 'māiā agan sabh iko jehī; karatē khel racāiā ‖',
      translation:
        'The fire of Maya is one and the same; the Creator has staged this play.',
    },
    {
      id: 'M74D',
      src: 'ਜਾ ਤਿਸੁ ਭਾਣਾ. ਤਾ ਜੰਮਿਆ; ਪਰਵਾਰਿ ਭਲਾ ਭਾਇਆ ॥',
      pronunciation: 'jā tis bhāṇā. tā jañmiā; paravār bhalā bhāiā ‖',
      translation:
        'According to His Will, the child is born, and the family is very pleased.',
    },
    {
      id: 'S1WY',
      src: 'ਲਿਵ ਛੁੜਕੀ. ਲਗੀ ਤ੍ਰਿਸਨਾ; ਮਾਇਆ. ਅਮਰੁ ਵਰਤਾਇਆ ॥',
      pronunciation: 'liv chuṛakī. lagī trisanā; māiā. amar waratāiā ‖',
      translation:
        'Love for the Lord wears off, and the child becomes attached to desires; the script of Maya runs its course.',
    },
    {
      id: '4EN8',
      src: 'ਏਹ ਮਾਇਆ. ਜਿਤੁ ਹਰਿ ਵਿਸਰੈ; ਮੋਹੁ ਉਪਜੈ. ਭਾਉ ਦੂਜਾ ਲਾਇਆ ॥',
      pronunciation: 'eh māiā. jit har visarē; moh upajē. bhāu dūjā lāiā ‖',
      translation:
        'This is Maya, by which the Lord is forgotten; emotional attachment and love of duality well up.',
    },
    {
      id: '4AX7',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਗੁਰ ਪਰਸਾਦੀ. ਜਿਨਾ ਲਿਵ ਲਾਗੀ; ਤਿਨੀ ਵਿਚੇ ਮਾਇਆ ਪਾਇਆ ॥੨੯॥',
      pronunciation:
        'kahē nānaku. gur parasādī. jinā liv lāgī; tinī vice māiā pāiā ‖29‖',
      translation:
        "Says Nanak, by Guru's Grace, those who enshrine love for the Lord find Him, in the midst of Maya. ||29||",
    },
    {
      id: '66A2',
      src: 'ਹਰਿ ਆਪਿ ਅਮੁਲਕੁ ਹੈ; ਮੁਲਿ. ਨ ਪਾਇਆ ਜਾਇ ॥',
      pronunciation: 'har āp amulak hē; muli. na pāiā jāi ‖',
      translation:
        'The Lord Himself is priceless; His worth cannot be estimated.',
    },
    {
      id: '33YW',
      src: 'ਮੁਲਿ. ਨ ਪਾਇਆ ਜਾਇ. ਕਿਸੈ ਵਿਟਹੁ; ਰਹੇ ਲੋਕ ਵਿਲਲਾਇ ॥',
      pronunciation: 'muli. na pāiā jāi. kisē viṭahu; rahe lok vilalāi ‖',
      translation:
        'His worth cannot be estimated, even though people have grown weary of trying.',
    },
    {
      id: '8PGN',
      src: 'ਐਸਾ ਸਤਿਗੁਰੁ. ਜੇ ਮਿਲੈ, ਤਿਸ ਨੋ ਸਿਰੁ ਸਉਪੀਐ; ਵਿਚਹੁ ਆਪੁ ਜਾਇ ॥',
      pronunciation: 'ēsā satiguru. je milē, tis no sir saupīē; vicah āp jāi ‖',
      translation:
        'If you meet such a True Guru, offer your head to Him; your selfishness and conceit will be eradicated from within.',
    },
    {
      id: '6BAF',
      src: 'ਜਿਸ ਦਾ ਜੀਉ. ਤਿਸੁ ਮਿਲਿ ਰਹੈ; ਹਰਿ ਵਸੈ ਮਨਿ ਆਇ ॥',
      pronunciation: 'jis dā jīu. tis mil rahē; har wasē man āi ‖',
      translation:
        'Your soul belongs to Him; remain united with Him, and the Lord will come to dwell in your mind.',
    },
    {
      id: 'UYFE',
      src: 'ਹਰਿ ਆਪਿ ਅਮੁਲਕੁ ਹੈ. ਭਾਗ ਤਿਨਾ ਕੇ ਨਾਨਕਾ; ਜਿਨ ਹਰਿ ਪਲੈ ਪਾਇ ॥੩੦॥',
      pronunciation:
        'har āp amulak hē. bhāg tinā ke nānakā; jin har palē pāi ‖30‖',
      translation:
        'The Lord Himself is priceless; very fortunate are those, O Nanak, who attain to the Lord. ||30||',
    },
    {
      id: 'T5F2',
      src: 'ਹਰਿ ਰਾਸਿ ਮੇਰੀ; ਮਨੁ ਵਣਜਾਰਾ ॥',
      pronunciation: 'har rās merī; man waṇajārā ‖',
      translation: 'The Lord is my capital; my mind is the merchant.',
    },
    {
      id: 'BALT',
      src: 'ਹਰਿ ਰਾਸਿ ਮੇਰੀ. ਮਨੁ ਵਣਜਾਰਾ; ਸਤਿਗੁਰ ਤੇ ਰਾਸਿ ਜਾਣੀ ॥',
      pronunciation: 'har rās merī. man waṇajārā; satigur te rās jāṇī ‖',
      translation:
        'The Lord is my capital, and my mind is the merchant; through the True Guru, I know my capital.',
    },
    {
      id: 'USCW',
      src: 'ਹਰਿ ਹਰਿ ਨਿਤ ਜਪਿਹੁ ਜੀਅਹੁ; ਲਾਹਾ ਖਟਿਹੁ ਦਿਹਾੜੀ ॥',
      pronunciation: 'har har nit japih jīahu; lāhā khaṭih dihāṛī ‖',
      translation:
        'Meditate continually on the Lord, Har, Har, O my soul, and you shall collect your profits daily.',
    },
    {
      id: 'Q9HT',
      src: 'ਏਹੁ ਧਨੁ ਤਿਨਾ ਮਿਲਿਆ; ਜਿਨ ਹਰਿ ਆਪੇ ਭਾਣਾ ॥',
      pronunciation: 'eh dhan tinā miliā; jin har āpe bhāṇā ‖',
      translation:
        "This wealth is obtained by those who are pleasing to the Lord's Will.",
    },
    {
      id: 'BV30',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਹਰਿ ਰਾਸਿ ਮੇਰੀ; ਮਨੁ ਹੋਆ ਵਣਜਾਰਾ ॥੩੧॥',
      pronunciation: 'kahē nānaku. har rās merī; man hoā waṇajārā ‖31‖',
      translation:
        'Says Nanak, the Lord is my capital, and my mind is the merchant. ||31||',
    },
    {
      id: 'BLCS',
      src: 'ਏ ਰਸਨਾ. ਤੂ ਅਨ ਰਸਿ ਰਾਚਿ ਰਹੀ; ਤੇਰੀ ਪਿਆਸ. ਨ ਜਾਇ ॥',
      pronunciation: 'e rasanā. tū an ras rāc rahī; terī piās. na jāi ‖',
      translation:
        'O my tongue, you are engrossed in other tastes, but your thirsty desire is not quenched.',
    },
    {
      id: 'UN2J',
      src: 'ਪਿਆਸ. ਨ ਜਾਇ ਹੋਰਤੁ ਕਿਤੈ; ਜਿਚਰੁ ਹਰਿ ਰਸੁ ਪਲੈ. ਨ ਪਾਇ ॥',
      pronunciation: 'piās. na jāi horat kitē; jicar har ras palē. na pāi ‖',
      translation:
        'Your thirst shall not be quenched by any means, until you attain the subtle essence of the Lord.',
    },
    {
      id: '9YRZ',
      src: 'ਹਰਿ ਰਸੁ ਪਾਇ ਪਲੈ. ਪੀਐ ਹਰਿ ਰਸੁ; ਬਹੁੜਿ. ਨ ਤ੍ਰਿਸਨਾ ਲਾਗੈ, ਆਇ ॥',
      pronunciation:
        'har ras pāi palē. pīē har rasu; bahuṛi. na trisanā lāgē, āi ‖',
      translation:
        'If you do obtain the subtle essence of the Lord, and drink in this essence of the Lord, you shall not be troubled by desire again.',
    },
    {
      id: '323D',
      src: 'ਏਹੁ ਹਰਿ ਰਸੁ. ਕਰਮੀ ਪਾਈਐ; ਸਤਿਗੁਰੁ ਮਿਲੈ ਜਿਸੁ ਆਇ ॥',
      pronunciation: 'eh har rasu. karamī pāīē; satigur milē jis āi ‖',
      translation:
        'This subtle essence of the Lord is obtained by good karma, when one comes to meet with the True Guru.',
    },
    {
      id: 'A6T2',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਹੋਰਿ ਅਨ ਰਸ ਸਭਿ ਵੀਸਰੇ; ਜਾ ਹਰਿ ਵਸੈ ਮਨਿ ਆਇ ॥੩੨॥',
      pronunciation:
        'kahē nānaku. hor an ras sabh vīsare; jā har wasē man āi ‖32‖',
      translation:
        'Says Nanak, all other tastes and essences are forgotten, when the Lord comes to dwell within the mind. ||32||',
    },
    {
      id: 'H0V6',
      src: 'ਏ ਸਰੀਰਾ ਮੇਰਿਆ. ਹਰਿ ਤੁਮ ਮਹਿ ਜੋਤਿ ਰਖੀ; ਤਾ ਤੂ. ਜਗ ਮਹਿ ਆਇਆ ॥',
      pronunciation:
        'e sarīrā meriā. har tum mah jot rakhī; tā tū. jag mah āiā ‖',
      translation:
        'O my body, the Lord infused His Light into you, and then you came into the world.',
    },
    {
      id: '8RG4',
      src: 'ਹਰਿ ਜੋਤਿ ਰਖੀ. ਤੁਧੁ ਵਿਚਿ; ਤਾ ਤੂ ਜਗ ਮਹਿ ਆਇਆ ॥',
      pronunciation: 'har jot rakhī. tudh vici; tā tū jag mah āiā ‖',
      translation:
        'The Lord infused His Light into you, and then you came into the world.',
    },
    {
      id: 'Y8HW',
      src: 'ਹਰਿ ਆਪੇ ਮਾਤਾ. ਆਪੇ ਪਿਤਾ; ਜਿਨਿ ਜੀਉ ਉਪਾਇ. ਜਗਤੁ ਦਿਖਾਇਆ ॥',
      pronunciation: 'har āpe mātā. āpe pitā; jin jīu upāi. jagat dikhāiā ‖',
      translation:
        'The Lord Himself is your mother, and He Himself is your father; He created the created beings, and revealed the world to them.',
    },
    {
      id: 'F6PW',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਬੁਝਿਆ. ਤਾ ਚਲਤੁ ਹੋਆ; ਚਲਤੁ ਨਦਰੀ ਆਇਆ ॥',
      pronunciation: 'gur parasādī bujhiā. tā calat hoā; calat nadarī āiā ‖',
      translation:
        "By Guru's Grace, some understand, and then it's a show; it seems like just a show.",
    },
    {
      id: 'D4YY',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸ੍ਰਿਸਟਿ ਕਾ ਮੂਲੁ ਰਚਿਆ. ਜੋਤਿ ਰਾਖੀ; ਤਾ ਤੂ ਜਗ ਮਹਿ ਆਇਆ ॥੩੩॥',
      pronunciation:
        'kahē nānaku. srisaṭ kā mūl raciā. jot rākhī; tā tū jag mah āiā ‖33‖',
      translation:
        'Says Nanak, He laid the foundation of the Universe, and infused His Light, and then you came into the world. ||33||',
    },
    {
      id: 'FFNC',
      src: 'ਮਨਿ ਚਾਉ ਭਇਆ; ਪ੍ਰਭ ਆਗਮੁ ਸੁਣਿਆ ॥',
      pronunciation: 'man cāu bhaiā; prabh āgam suṇiā ‖',
      translation: "My mind has become joyful, hearing of God's coming.",
    },
    {
      id: '14FA',
      src: 'ਹਰਿ ਮੰਗਲੁ ਗਾਉ ਸਖੀ; ਗ੍ਰਿਹੁ ਮੰਦਰੁ ਬਣਿਆ ॥',
      pronunciation: 'har mañgal gāu sakhī; grih mañdar baṇiā ‖',
      translation:
        "Sing the songs of joy to welcome the Lord, O my companions; my household has become the Lord's Mansion.",
    },
    {
      id: 'FJDA',
      src: 'ਹਰਿ ਗਾਉ ਮੰਗਲੁ ਨਿਤ ਸਖੀਏ; ਸੋਗੁ ਦੂਖੁ. ਨ ਵਿਆਪਏ ॥',
      pronunciation: 'har gāu mañgal nit sakhīe; sog dūkhu. na viāpae ‖',
      translation:
        'Sing continually the songs of joy to welcome the Lord, O my companions, and sorrow and suffering will not afflict you.',
    },
    {
      id: 'DLHV',
      src: 'ਗੁਰ ਚਰਨ ਲਾਗੇ. ਦਿਨ ਸਭਾਗੇ; ਆਪਣਾ ਪਿਰੁ ਜਾਪਏ ॥',
      pronunciation: 'gur caran lāge. din sabhāge; āpaṇā pir jāpae ‖',
      translation:
        "Blessed is that day, when I am attached to the Guru's feet and meditate on my Husband Lord.",
    },
    {
      id: 'WBAJ',
      src: 'ਅਨਹਤ ਬਾਣੀ. ਗੁਰ ਸਬਦਿ ਜਾਣੀ; ਹਰਿ ਨਾਮੁ ਹਰਿ ਰਸੁ ਭੋਗੋ ॥',
      pronunciation: 'anahat bāṇī. gur sabad jāṇī; har nām har ras bhogo ‖',
      translation:
        "I have come to know the unstruck sound current and the Word of the Guru's Shabad; I enjoy the sublime essence of the Lord, the Lord's Name.",
    },
    {
      id: '6QZ1',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਪ੍ਰਭੁ ਆਪਿ ਮਿਲਿਆ; ਕਰਣ ਕਾਰਣ ਜੋਗੋ ॥੩੪॥',
      pronunciation: 'kahē nānaku. prabh āp miliā; karaṇ kāraṇ jogo ‖34‖',
      translation:
        'Says Nanak, God Himself has met me; He is the Doer, the Cause of causes. ||34||',
    },
    {
      id: 'ZJ5T',
      src: 'ਏ ਸਰੀਰਾ ਮੇਰਿਆ. ਇਸੁ ਜਗ ਮਹਿ ਆਇ ਕੈ; ਕਿਆ ਤੁਧੁ ਕਰਮ ਕਮਾਇਆ ॥',
      pronunciation:
        'e sarīrā meriā. is jag mah āi kē; kiā tudh karam kamāiā ‖',
      translation:
        'O my body, why have you come into this world? What actions have you committed?',
    },
    {
      id: 'W964',
      src: 'ਕਿ ਕਰਮ ਕਮਾਇਆ. ਤੁਧੁ ਸਰੀਰਾ; ਜਾ ਤੂ. ਜਗ ਮਹਿ ਆਇਆ ॥',
      pronunciation: 'ka karam kamāiā. tudh sarīrā; jā tū. jag mah āiā ‖',
      translation:
        'And what actions have you committed, O my body, since you came into this world?',
    },
    {
      id: '41X4',
      src: 'ਜਿਨਿ ਹਰਿ ਤੇਰਾ ਰਚਨੁ ਰਚਿਆ; ਸੋ ਹਰਿ ਮਨਿ. ਨ ਵਸਾਇਆ ॥',
      pronunciation: 'jin har terā racan raciā; so har mani. na wasāiā ‖',
      translation:
        'The Lord who formed your form - you have not enshrined that Lord in your mind.',
    },
    {
      id: 'Q645',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਹਰਿ ਮੰਨਿ ਵਸਿਆ; ਪੂਰਬਿ ਲਿਖਿਆ ਪਾਇਆ ॥',
      pronunciation: 'gur parasādī har mañn wasiā; pūrab likhiā pāiā ‖',
      translation:
        "By Guru's Grace, the Lord abides within the mind, and one's pre-ordained destiny is fulfilled.",
    },
    {
      id: 'KHSD',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਏਹੁ ਸਰੀਰੁ ਪਰਵਾਣੁ ਹੋਆ; ਜਿਨਿ ਸਤਿਗੁਰ ਸਿਉ ਚਿਤੁ ਲਾਇਆ ॥੩੫॥',
      pronunciation:
        'kahē nānaku. eh sarīr paravāṇ hoā; jin satigur siu cit lāiā ‖35‖',
      translation:
        "Says Nanak, this body is adorned and honored, when one's consciousness is focused on the True Guru. ||35||",
    },
    {
      id: 'LWNF',
      src: 'ਏ ਨੇਤ੍ਰਹੁ ਮੇਰਿਹੋ. ਹਰਿ ਤੁਮ ਮਹਿ ਜੋਤਿ ਧਰੀ; ਹਰਿ ਬਿਨੁ ਅਵਰੁ. ਨ ਦੇਖਹੁ ਕੋਈ ॥',
      pronunciation:
        'e netrah meriho. har tum mah jot dharī; har bin awaru. na dekhah koī ‖',
      translation:
        'O my eyes, the Lord has infused His Light into you; do not look upon any other than the Lord.',
    },
    {
      id: '15NN',
      src: 'ਹਰਿ ਬਿਨੁ ਅਵਰੁ. ਨ ਦੇਖਹੁ ਕੋਈ; ਨਦਰੀ ਹਰਿ ਨਿਹਾਲਿਆ ॥',
      pronunciation: 'har bin awaru. na dekhah koī; nadarī har nihāliā ‖',
      translation:
        'Do not look upon any other than the Lord; the Lord alone is worthy of beholding.',
    },
    {
      id: 'WA02',
      src: 'ਏਹੁ ਵਿਸੁ ਸੰਸਾਰੁ. ਤੁਮ ਦੇਖਦੇ. ਏਹੁ ਹਰਿ ਕਾ ਰੂਪੁ ਹੈ; ਹਰਿ ਰੂਪੁ ਨਦਰੀ ਆਇਆ ॥',
      pronunciation:
        'eh vis sañsāru. tum dekhade. eh har kā rūp hē; har rūp nadarī āiā ‖',
      translation:
        'This whole world which you see is the image of the Lord; only the image of the Lord is seen.',
    },
    {
      id: 'U6WS',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਬੁਝਿਆ. ਜਾ ਵੇਖਾ ਹਰਿ ਇਕੁ ਹੈ; ਹਰਿ ਬਿਨੁ ਅਵਰੁ. ਨ ਕੋਈ ॥',
      pronunciation:
        'gur parasādī bujhiā. jā vekhā har ik hē; har bin awaru. na koī ‖',
      translation:
        "By Guru's Grace, I understand, and I see only the One Lord; there is no one except the Lord.",
    },
    {
      id: 'AG7C',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਏਹਿ ਨੇਤ੍ਰ ਅੰਧ ਸੇ; ਸਤਿਗੁਰਿ ਮਿਲਿਐ. ਦਿਬ ਦ੍ਰਿਸਟਿ ਹੋਈ ॥੩੬॥',
      pronunciation:
        'kahē nānaku. eh netr añdh se; satigur miliē. dib drisaṭ hoī ‖36‖',
      translation:
        'Says Nanak, these eyes were blind; but meeting the True Guru, they became all-seeing. ||36||',
    },
    {
      id: '12QN',
      src: 'ਏ ਸ੍ਰਵਣਹੁ ਮੇਰਿਹੋ; ਸਾਚੈ ਸੁਨਣੈ ਨੋ ਪਠਾਏ ॥',
      pronunciation: 'e srawaṇah meriho; sācē sunaṇē no paṭhāe ‖',
      translation: 'O my ears, you were created only to hear the Truth.',
    },
    {
      id: '1K3K',
      src: 'ਸਾਚੈ ਸੁਨਣੈ ਨੋ ਪਠਾਏ. ਸਰੀਰਿ ਲਾਏ; ਸੁਣਹੁ ਸਤਿ ਬਾਣੀ ॥',
      pronunciation: 'sācē sunaṇē no paṭhāe. sarīr lāe; suṇah sat bāṇī ‖',
      translation:
        'To hear the Truth, you were created and attached to the body; listen to the True Bani.',
    },
    {
      id: 'BSJX',
      src: 'ਜਿਤੁ ਸੁਣੀ. ਮਨੁ ਤਨੁ ਹਰਿਆ ਹੋਆ; ਰਸਨਾ ਰਸਿ ਸਮਾਣੀ ॥',
      pronunciation: 'jit suṇī. man tan hariā hoā; rasanā ras samāṇī ‖',
      translation:
        'Hearing it, the mind and body are rejuvenated, and the tongue is absorbed in Ambrosial Nectar.',
    },
    {
      id: 'YT8B',
      src: 'ਸਚੁ ਅਲਖ ਵਿਡਾਣੀ; ਤਾ ਕੀ ਗਤਿ ਕਹੀ. ਨ ਜਾਏ ॥',
      pronunciation: 'sac alakh viḍāṇī; tā kī gat kahī. na jāe ‖',
      translation:
        'The True Lord is unseen and wondrous; His state cannot be described.',
    },
    {
      id: 'DTNR',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਅੰਮ੍ਰਿਤ ਨਾਮੁ ਸੁਣਹੁ. ਪਵਿਤ੍ਰ ਹੋਵਹੁ; ਸਾਚੈ ਸੁਨਣੈ ਨੋ ਪਠਾਏ ॥੩੭॥',
      pronunciation:
        'kahē nānaku. añmrit nām suṇahu. pavitr howahu; sācē sunaṇē no paṭhāe ‖37‖',
      translation:
        'Says Nanak, listen to the Ambrosial Naam and become holy; you were created only to hear the Truth. ||37||',
    },
    {
      id: 'FJM8',
      src: 'ਹਰਿ ਜੀਉ. ਗੁਫਾ ਅੰਦਰਿ ਰਖਿ ਕੈ; ਵਾਜਾ ਪਵਣੁ ਵਜਾਇਆ ॥',
      pronunciation: 'har jīu. guphā añdar rakh kē; vājā pawaṇ wajāiā ‖',
      translation:
        'The Lord placed the soul to the cave of the body, and blew the breath of life into the musical instrument of the body.',
    },
    {
      id: 'JTHC',
      src: 'ਵਜਾਇਆ ਵਾਜਾ ਪਉਣ. ਨਉ ਦੁਆਰੇ ਪਰਗਟੁ ਕੀਏ; ਦਸਵਾ ਗੁਪਤੁ ਰਖਾਇਆ ॥',
      pronunciation:
        'wajāiā vājā pauṇ. nau duāre paragaṭ kīe; dasavā gupat rakhāiā ‖',
      translation:
        'He blew the breath of life into the musical instrument of the body, and revealed the nine doors; but He kept the Tenth Door hidden.',
    },
    {
      id: 'F41Z',
      src: 'ਗੁਰਦੁਆਰੈ ਲਾਇ ਭਾਵਨੀ; ਇਕਨਾ ਦਸਵਾ ਦੁਆਰੁ ਦਿਖਾਇਆ ॥',
      pronunciation: 'guraduārē lāi bhāwanī; ikanā dasavā duār dikhāiā ‖',
      translation:
        "Through the Gurdwara, the Guru's Gate, some are blessed with loving faith, and the Tenth Door is revealed to them.",
    },
    {
      id: '8G4V',
      src: 'ਤਹ ਅਨੇਕ ਰੂਪ ਨਾਉ ਨਵ ਨਿਧਿ; ਤਿਸ ਦਾ ਅੰਤੁ. ਨ ਜਾਈ ਪਾਇਆ ॥',
      pronunciation: 'tah anek rūp nāu nav nidhi; tis dā añtu. na jāī pāiā ‖',
      translation:
        'There are many images of the Lord, and the nine treasures of the Naam; His limits cannot be found.',
    },
    {
      id: 'MDJQ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਹਰਿ ਪਿਆਰੈ ਜੀਉ. ਗੁਫਾ ਅੰਦਰਿ ਰਖਿ ਕੈ; ਵਾਜਾ ਪਵਣੁ ਵਜਾਇਆ ॥੩੮॥',
      pronunciation:
        'kahē nānaku. har piārē jīu. guphā añdar rakh kē; vājā pawaṇ wajāiā ‖38‖',
      translation:
        'Says Nanak, the Lord placed the soul to the cave of the body, and blew the breath of life into the musical instrument of the body. ||38||',
    },
    {
      id: 'R6CF',
      src: 'ਏਹੁ ਸਾਚਾ ਸੋਹਿਲਾ; ਸਾਚੈ ਘਰਿ ਗਾਵਹੁ ॥',
      pronunciation: 'eh sācā sohilā; sācē ghar gāwah ‖',
      translation:
        'Sing this true song of praise in the true home of your soul.',
    },
    {
      id: 'EJTE',
      src: 'ਗਾਵਹੁ ਤ ਸੋਹਿਲਾ ਘਰਿ ਸਾਚੈ; ਜਿਥੈ ਸਦਾ ਸਚੁ ਧਿਆਵਹੇ ॥',
      pronunciation: 'gāwah ta sohilā ghar sācē; jithē sadā sac dhiāwahe ‖',
      translation:
        'Sing the song of praise in your true home; meditate there on the True Lord forever.',
    },
    {
      id: '0RQ1',
      src: 'ਸਚੋ ਧਿਆਵਹਿ ਜਾ ਤੁਧੁ ਭਾਵਹਿ; ਗੁਰਮੁਖਿ ਜਿਨਾ ਬੁਝਾਵਹੇ ॥',
      pronunciation: 'saco dhiāwah jā tudh bhāwahi; guramukh jinā bujhāwahe ‖',
      translation:
        'They alone meditate on You, O True Lord, who are pleasing to Your Will; as Gurmukh, they understand.',
    },
    {
      id: '1RVB',
      src: 'ਇਹੁ ਸਚੁ ਸਭਨਾ ਕਾ ਖਸਮੁ ਹੈ; ਜਿਸੁ ਬਖਸੇ. ਸੋ ਜਨੁ ਪਾਵਹੇ ॥',
      pronunciation:
        'ih sac sabhanā kā khasam hē; jis bakhase. so jan pāwahe ‖',
      translation:
        'This Truth is the Lord and Master of all; whoever is blessed, obtains it.',
    },
    {
      id: 'CTN5',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੁ ਸੋਹਿਲਾ; ਸਚੈ ਘਰਿ ਗਾਵਹੇ ॥੩੯॥',
      pronunciation: 'kahē nānaku. sac sohilā; sacē ghar gāwahe ‖39‖',
      translation:
        'Says Nanak, sing the true song of praise in the true home of your soul. ||39||',
    },
    {
      id: 'ELHF',
      src: 'ਅਨਦੁ ਸੁਣਹੁ ਵਡਭਾਗੀਹੋ; ਸਗਲ ਮਨੋਰਥ ਪੂਰੇ ॥',
      pronunciation: 'anad suṇah waḍabhāgīho; sagal manorath pūre ‖',
      translation:
        'Listen to the song of bliss, O most fortunate ones; all your longings shall be fulfilled.',
    },
    {
      id: 'EDPZ',
      src: 'ਪਾਰਬ੍ਰਹਮੁ ਪ੍ਰਭੁ ਪਾਇਆ; ਉਤਰੇ ਸਗਲ ਵਿਸੂਰੇ ॥',
      pronunciation: 'pārabraham prabh pāiā; utare sagal visūre ‖',
      translation:
        'I have obtained the Supreme Lord God, and all sorrows have been forgotten.',
    },
    {
      id: '2UQS',
      src: 'ਦੂਖ ਰੋਗ ਸੰਤਾਪ ਉਤਰੇ; ਸੁਣੀ ਸਚੀ ਬਾਣੀ ॥',
      pronunciation: 'dūkh rog sañtāp utare; suṇī sacī bāṇī ‖',
      translation:
        'Pain, illness and suffering have departed, listening to the True Bani.',
    },
    {
      id: 'DLUB',
      src: 'ਸੰਤ ਸਾਜਨ ਭਏ ਸਰਸੇ; ਪੂਰੇ ਗੁਰ ਤੇ ਜਾਣੀ ॥',
      pronunciation: 'sañt sājan bhae sarase; pūre gur te jāṇī ‖',
      translation:
        'The Saints and their friends are in ecstasy, knowing the Perfect Guru.',
    },
    {
      id: '51FD',
      src: 'ਸੁਣਤੇ ਪੁਨੀਤ. ਕਹਤੇ ਪਵਿਤੁ; ਸਤਿਗੁਰੁ ਰਹਿਆ ਭਰਪੂਰੇ ॥',
      pronunciation: 'suṇate punīt. kahate pavitu; satigur rahiā bharapūre ‖',
      translation:
        'Pure are the listeners, and pure are the speakers; the True Guru is all-pervading and permeating.',
    },
    {
      id: 'C1W0',
      src: 'ਬਿਨਵੰਤਿ ਨਾਨਕੁ. ਗੁਰ ਚਰਣ ਲਾਗੇ; ਵਾਜੇ ਅਨਹਦ ਤੂਰੇ ॥੪੦॥੧॥',
      pronunciation: 'binawañt nānaku. gur caraṇ lāge; vāje anahad tūre ‖40‖1‖',
      translation:
        "Prays Nanak, touching the Guru's Feet, the unstruck sound current of the celestial bugles vibrates and resounds. ||40||1||",
    },
  ],
}

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data)
}
