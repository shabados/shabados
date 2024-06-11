import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 11)',
    roman: 'Āsā kī vār (chakkā 11)',
  },
  paging: {
    previous: 'asa-ki-var/10',
    next: 'asa-ki-var/12',
  },
  data: [
    {
      id: 'CLG9',
      src: 'ਹਮ ਕਿਆ ਗੁਣ ਤੇਰੇ ਵਿਥਰਹ ਸੁਆਮੀ; ਤੂੰ ਅਪਰ ਅਪਾਰੋ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'ham kiā guṇ tere vitharah suāmī; tūñ apar apāro. rām rāje ‖',
      translation:
        'What Glorious Virtues of Yours can I describe, O Lord and Master? You are the most infinite of the infinite, O Lord King.',
    },
    {
      id: '0PZ5',
      src: 'ਹਰਿ ਨਾਮੁ ਸਾਲਾਹਹ. ਦਿਨੁ ਰਾਤਿ; ਏਹਾ ਆਸ ਆਧਾਰੋ ॥',
      pronunciation: 'har nām sālāhah. din rāti; ehā ās ādhāro ‖',
      translation:
        "I praise the Lord's Name, day and night; this alone is my hope and support.",
    },
    {
      id: '4Q7S',
      src: 'ਹਮ ਮੂਰਖ. ਕਿਛੂਅ ਨ ਜਾਣਹਾ; ਕਿਵ ਪਾਵਹ ਪਾਰੋ ॥',
      pronunciation: 'ham mūrakh. kichūa na jāṇahā; kiv pāwah pāro ‖',
      translation:
        'I am a fool, and I know nothing. How can I find Your limits?',
    },
    {
      id: 'S6V8',
      src: 'ਜਨੁ ਨਾਨਕੁ. ਹਰਿ ਕਾ ਦਾਸੁ ਹੈ; ਹਰਿ ਦਾਸ ਪਨਿਹਾਰੋ ॥੩॥',
      pronunciation: 'jan nānaku. har kā dās hē; har dās panihāro ‖3‖',
      translation:
        'Servant Nanak is the slave of the Lord, the water-carrier of the slaves of the Lord. ||3||',
    },
    {
      id: 'BE2M',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'SKRK',
      src: 'ਸਚਿ ਕਾਲੁ. ਕੂੜੁ ਵਰਤਿਆ; ਕਲਿ ਕਾਲਖ ਬੇਤਾਲ ॥',
      pronunciation: 'sac kālu. kūṛ waratiā; kal kālakh betāl ‖',
      translation:
        'There is a famine of Truth; falsehood prevails, and the blackness of the Dark Age of Kali Yuga has turned men into demons.',
    },
    {
      id: '03QU',
      src: 'ਬੀਉ ਬੀਜਿ. ਪਤਿ ਲੈ ਗਏ; ਅਬ ਕਿਉ ਉਗਵੈ ਦਾਲਿ ॥',
      pronunciation: 'bīu bīji. pat lē gae; ab kiu ugavē dāl ‖',
      translation:
        'Those who planted their seed have departed with honor; now, how can the shattered seed sprout?',
    },
    {
      id: 'NG90',
      src: 'ਜੇ ਇਕੁ ਹੋਇ; ਤ ਉਗਵੈ. ਰੁਤੀ ਹੂ ਰੁਤਿ ਹੋਇ ॥',
      pronunciation: 'je ik hoi; ta ugavē. rutī hū rut hoi ‖',
      translation:
        'If the seed is whole, and it is the proper season, then the seed will sprout.',
    },
    {
      id: '4JYA',
      src: 'ਨਾਨਕ. ਪਾਹੈ ਬਾਹਰਾ; ਕੋਰੈ. ਰੰਗੁ ਨ ਸੋਇ ॥',
      pronunciation: 'nānak. pāhē bāharā; korē. rañg na soi ‖',
      translation: 'O Nanak, without treatment, the raw fabric cannot be dyed.',
    },
    {
      id: '7ZD9',
      src: 'ਭੈ ਵਿਚਿ. ਖੁੰਬਿ ਚੜਾਈਐ; ਸਰਮੁ ਪਾਹੁ ਤਨਿ ਹੋਇ ॥',
      pronunciation: 'bhē vici. khuñb caṛāīē; saram pāh tan hoi ‖',
      translation:
        'In the Fear of God it is bleached white, if the treatment of modesty is applied to the cloth of the body.',
    },
    {
      id: 'SMVU',
      src: 'ਨਾਨਕ. ਭਗਤੀ ਜੇ ਰਪੈ; ਕੂੜੈ. ਸੋਇ ਨ ਕੋਇ ॥੧॥',
      pronunciation: 'nānak. bhagatī je rapē; kūṛē. soi na koi ‖1‖',
      translation:
        'O Nanak, if one is imbued with devotional worship, his reputation is not false. ||1||',
    },
    {
      id: 'WNUE',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '5CC6',
      src: 'ਲਬੁ ਪਾਪੁ ਦੁਇ. ਰਾਜਾ ਮਹਤਾ; ਕੂੜੁ ਹੋਆ ਸਿਕਦਾਰੁ ॥',
      pronunciation: 'lab pāp dui. rājā mahatā; kūṛ hoā sikadār ‖',
      translation:
        'Greed and sin are the king and prime minister; falsehood is the treasurer.',
    },
    {
      id: '10Y9',
      src: 'ਕਾਮੁ ਨੇਬੁ ਸਦਿ. ਪੁਛੀਐ; ਬਹਿ ਬਹਿ ਕਰੇ ਬੀਚਾਰੁ ॥',
      pronunciation: 'kām neb sadi. puchīē; bah bah kare bīcār ‖',
      translation:
        'Sexual desire, the chief advisor, is summoned and consulted; they all sit together and contemplate their plans.',
    },
    {
      id: '7FZL',
      src: 'ਅੰਧੀ ਰਯਤਿ. ਗਿਆਨ ਵਿਹੂਣੀ; ਭਾਹਿ ਭਰੇ ਮੁਰਦਾਰੁ ॥',
      pronunciation: 'añdhī rayati. giān vihūṇī; bhāh bhare muradār ‖',
      translation:
        'Their subjects are blind, and without wisdom, they try to please the will of the dead.',
    },
    {
      id: 'VC4F',
      src: 'ਗਿਆਨੀ ਨਚਹਿ. ਵਾਜੇ ਵਾਵਹਿ; ਰੂਪ ਕਰਹਿ ਸੀਗਾਰੁ ॥',
      pronunciation: 'giānī nacahi. vāje vāwahi; rūp karah sīgār ‖',
      translation:
        'The spiritually wise dance and play their musical instruments, adorning themselves with beautiful decorations.',
    },
    {
      id: 'YGP6',
      src: 'ਊਚੇ ਕੂਕਹਿ. ਵਾਦਾ ਗਾਵਹਿ; ਜੋਧਾ ਕਾ ਵੀਚਾਰੁ ॥',
      pronunciation: 'ūce kūkahi. vādā gāwahi; jodhā kā vīcār ‖',
      translation:
        'They shout out loud, and sing epic poems and heroic stories.',
    },
    {
      id: 'JRA9',
      src: 'ਮੂਰਖ ਪੰਡਿਤ. ਹਿਕਮਤਿ ਹੁਜਤਿ; ਸੰਜੈ ਕਰਹਿ ਪਿਆਰੁ ॥',
      pronunciation: 'mūrakh pañḍit. hikamat hujati; sañjē karah piār ‖',
      translation:
        'The fools call themselves spiritual scholars, and by their clever tricks, they love to gather wealth.',
    },
    {
      id: '67AD',
      src: 'ਧਰਮੀ. ਧਰਮੁ ਕਰਹਿ ਗਾਵਾਵਹਿ; ਮੰਗਹਿ ਮੋਖ ਦੁਆਰੁ ॥',
      pronunciation: 'dharamī. dharam karah gāvāwahi; mañgah mokh duār ‖',
      translation:
        'The righteous waste their righteousness, by asking for the door of salvation.',
    },
    {
      id: '0YQK',
      src: 'ਜਤੀ ਸਦਾਵਹਿ, ਜੁਗਤਿ. ਨ ਜਾਣਹਿ; ਛਡਿ ਬਹਹਿ ਘਰ ਬਾਰੁ ॥',
      pronunciation: 'jatī sadāwahi, jugati. na jāṇahi; chaḍ bahah ghar bār ‖',
      translation:
        'They call themselves celibate, and abandon their homes, but they do not know the true way of life.',
    },
    {
      id: 'WRMM',
      src: 'ਸਭੁ ਕੋ ਪੂਰਾ ਆਪੇ ਹੋਵੈ; ਘਟਿ ਨ ਕੋਈ ਆਖੈ ॥',
      pronunciation: 'sabh ko pūrā āpe hovē; ghaṭ na koī ākhē ‖',
      translation:
        'Everyone calls himself perfect; none call themselves imperfect.',
    },
    {
      id: 'SKD9',
      src: 'ਪਤਿ ਪਰਵਾਣਾ. ਪਿਛੈ ਪਾਈਐ; ਤਾ ਨਾਨਕ. ਤੋਲਿਆ ਜਾਪੈ ॥੨॥',
      pronunciation: 'pat paravāṇā. pichē pāīē; tā nānak. toliā jāpē ‖2‖',
      translation:
        'If the weight of honor is placed on the scale, then, O Nanak, one sees his true weight. ||2||',
    },
    {
      id: 'CC79',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '9SQP',
      src: 'ਵਦੀ ਸੁ ਵਜਗਿ ਨਾਨਕਾ; ਸਚਾ ਵੇਖੈ ਸੋਇ ॥',
      pronunciation: 'wadī sa wajag nānakā; sacā vekhē soi ‖',
      translation:
        'Evil actions become publicly known; O Nanak, the True Lord sees everything.',
    },
    {
      id: 'XWHT',
      src: 'ਸਭਨੀ ਛਾਲਾ ਮਾਰੀਆ; ਕਰਤਾ ਕਰੇ ਸੁ ਹੋਇ ॥',
      pronunciation: 'sabhanī chālā mārīā; karatā kare sa hoi ‖',
      translation:
        'Everyone makes the attempt, but that alone happens which the Creator Lord does.',
    },
    {
      id: 'SGQW',
      src: 'ਅਗੈ ਜਾਤਿ ਨ ਜੋਰੁ ਹੈ; ਅਗੈ ਜੀਉ ਨਵੇ ॥',
      pronunciation: 'agē jāt na jor hē; agē jīu nave ‖',
      translation:
        'In the world hereafter, social status and power mean nothing; hereafter, the soul is new.',
    },
    {
      id: '67CM',
      src: 'ਜਿਨ ਕੀ ਲੇਖੈ ਪਤਿ ਪਵੈ; ਚੰਗੇ ਸੇਈ ਕੇਇ ॥੩॥',
      pronunciation: 'jin kī lekhē pat pavē; cañge seī kei ‖3‖',
      translation: 'Those few, whose honor is confirmed, are good. ||3||',
    },
    {
      id: '6KQ1',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'HU5Y',
      src: 'ਧੁਰਿ ਕਰਮੁ. ਜਿਨਾ ਕਉ ਤੁਧੁ ਪਾਇਆ; ਤਾ ਤਿਨੀ ਖਸਮੁ ਧਿਆਇਆ ॥',
      pronunciation: 'dhur karamu. jinā kau tudh pāiā; tā tinī khasam dhiāiā ‖',
      translation:
        'Only those whose karma You have pre-ordained from the very beginning, O Lord, meditate on You.',
    },
    {
      id: '5S1H',
      src: 'ਏਨਾ ਜੰਤਾ ਕੈ ਵਸਿ. ਕਿਛੁ ਨਾਹੀ; ਤੁਧੁ. ਵੇਕੀ ਜਗਤੁ ਉਪਾਇਆ ॥',
      pronunciation: 'enā jañtā kē wasi. kich nāhī; tudhu. vekī jagat upāiā ‖',
      translation:
        'Nothing is in the power of these beings; You created the various worlds.',
    },
    {
      id: '8J6H',
      src: 'ਇਕਨਾ ਨੋ ਤੂੰ ਮੇਲਿ ਲੈਹਿ; ਇਕਿ ਆਪਹੁ ਤੁਧੁ ਖੁਆਇਆ ॥',
      pronunciation: 'ikanā no tūñ mel lēhi; ik āpah tudh khuāiā ‖',
      translation: 'Some, You unite with Yourself, and some, You lead astray.',
    },
    {
      id: 'V9D7',
      src: 'ਗੁਰ ਕਿਰਪਾ ਤੇ ਜਾਣਿਆ; ਜਿਥੈ ਤੁਧੁ ਆਪੁ ਬੁਝਾਇਆ ॥',
      pronunciation: 'gur kirapā te jāṇiā; jithē tudh āp bujhāiā ‖',
      translation:
        "By Guru's Grace You are known; through Him, You reveal Yourself.",
    },
    {
      id: 'T8YM',
      src: 'ਸਹਜੇ ਹੀ; ਸਚਿ ਸਮਾਇਆ ॥੧੧॥',
      pronunciation: 'sahaje hī; sac samāiā ‖11‖',
      translation: 'We are easily absorbed in You. ||11||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
