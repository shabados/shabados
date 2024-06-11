import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 15)',
    roman: 'Āsā kī vār (chakkā 15)',
  },
  paging: {
    previous: 'asa-ki-var/14',
    next: 'asa-ki-var/16',
  },
  data: [
    {
      id: '0MA7',
      src: 'ਤੂੰ ਹਰਿ. ਤੇਰਾ ਸਭੁ ਕੋ; ਸਭਿ ਤੁਧੁ ਉਪਾਏ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'tūñ hari. terā sabh ko; sabh tudh upāe. rām rāje ‖',
      translation:
        'You, O Lord, belong to all, and all belong to You. You created all, O Lord King.',
    },
    {
      id: '72ZN',
      src: 'ਕਿਛੁ ਹਾਥਿ ਕਿਸੈ ਦੈ ਕਿਛੁ ਨਾਹੀ; ਸਭਿ ਚਲਹਿ ਚਲਾਏ ॥',
      pronunciation: 'kich hāth kisē dē kich nāhī; sabh calah calāe ‖',
      translation:
        "Nothing is in anyone's hands; all walk as You cause them to walk.",
    },
    {
      id: '06NN',
      src: 'ਜਿਨੑ ਤੂੰ ਮੇਲਹਿ ਪਿਆਰੇ. ਸੇ ਤੁਧੁ ਮਿਲਹਿ; ਜੋ ਹਰਿ ਮਨਿ ਭਾਏ ॥',
      pronunciation: 'jin tūñ melah piāre. se tudh milahi; jo har man bhāe ‖',
      translation:
        'They alone are united with You, O Beloved, whom You cause to be so united; they alone are pleasing to Your Mind.',
    },
    {
      id: '5G7U',
      src: 'ਜਨ ਨਾਨਕ. ਸਤਿਗੁਰੁ ਭੇਟਿਆ; ਹਰਿ ਨਾਮਿ ਤਰਾਏ ॥੩॥',
      pronunciation: 'jan nānak. satigur bheṭiā; har nām tarāe ‖3‖',
      translation:
        "Servant Nanak has met the True Guru, and through the Lord's Name, he has been carried across. ||3||",
    },
    {
      id: '463X',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'LYZ8',
      src: 'ਦਇਆ ਕਪਾਹ. ਸੰਤੋਖੁ ਸੂਤੁ; ਜਤੁ ਗੰਢੀ. ਸਤੁ ਵਟੁ ॥',
      pronunciation: 'daiā kapāh. sañtokh sūtu; jat gañḍhī. sat waṭ ‖',
      translation:
        'Make compassion the cotton, contentment the thread, modesty the knot and truth the twist.',
    },
    {
      id: 'MDF1',
      src: 'ਏਹੁ ਜਨੇਊ. ਜੀਅ ਕਾ; ਹਈ ਤ. ਪਾਡੇ ਘਤੁ ॥',
      pronunciation: 'eh janeū. jīa kā; haī t. pāḍe ghat ‖',
      translation:
        'This is the sacred thread of the soul; if you have it, then go ahead and put it on me.',
    },
    {
      id: 'PQKA',
      src: 'ਨਾ ਏਹੁ ਤੁਟੈ. ਨ ਮਲੁ ਲਗੈ; ਨਾ ਏਹੁ ਜਲੈ. ਨ ਜਾਇ ॥',
      pronunciation: 'nā eh tuṭē. na mal lagē; nā eh jalē. na jāi ‖',
      translation:
        'It does not break, it cannot be soiled by filth, it cannot be burnt, or lost.',
    },
    {
      id: 'MFY0',
      src: 'ਧੰਨੁ ਸੁ ਮਾਣਸ ਨਾਨਕਾ; ਜੋ. ਗਲਿ ਚਲੇ ਪਾਇ ॥',
      pronunciation: 'dhañn sa māṇas nānakā; jo. gal cale pāi ‖',
      translation:
        'Blessed are those mortal beings, O Nanak, who wear such a thread around their necks.',
    },
    {
      id: 'GN9U',
      src: 'ਚਉਕੜਿ ਮੁਲਿ ਅਣਾਇਆ; ਬਹਿ ਚਉਕੈ ਪਾਇਆ ॥',
      pronunciation: 'caukaṛ mul aṇāiā; bah caukē pāiā ‖',
      translation:
        'You buy the thread for a few shells, and seated in your enclosure, you put it on.',
    },
    {
      id: 'AAZQ',
      src: 'ਸਿਖਾ ਕੰਨਿ ਚੜਾਈਆ; ਗੁਰੁ ਬ੍ਰਾਹਮਣੁ ਥਿਆ ॥',
      pronunciation: 'sikhā kañn caṛāīā; gur brāhamaṇ thiā ‖',
      translation:
        "Whispering instructions into others' ears, the Brahmin becomes a guru.",
    },
    {
      id: 'KDZP',
      src: 'ਓਹੁ ਮੁਆ. ਓਹੁ ਝੜਿ ਪਇਆ; ਵੇਤਗਾ ਗਇਆ ॥੧॥',
      pronunciation: 'oh muā. oh jhaṛ paiā; vetagā gaiā ‖1‖',
      translation:
        'But he dies, and the sacred thread falls away, and the soul departs without it. ||1||',
    },
    {
      id: '97FT',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '5ZPD',
      src: 'ਲਖ ਚੋਰੀਆ ਲਖ ਜਾਰੀਆ; ਲਖ ਕੂੜੀਆ ਲਖ ਗਾਲਿ ॥',
      pronunciation: 'lakh corīā lakh jārīā; lakh kūṛīā lakh gāl ‖',
      translation:
        'He commits thousands of robberies, thousands of acts of adultery, thousands of falsehoods and thousands of abuses.',
    },
    {
      id: '44NA',
      src: 'ਲਖ ਠਗੀਆ ਪਹਿਨਾਮੀਆ; ਰਾਤਿ ਦਿਨਸੁ ਜੀਅ ਨਾਲਿ ॥',
      pronunciation: 'lakh ṭhagīā pahināmīā; rāt dinas jīa nāl ‖',
      translation:
        'He practices thousands of deceptions and secret deeds, night and day, against his fellow beings.',
    },
    {
      id: '7QZ7',
      src: 'ਤਗੁ ਕਪਾਹਹੁ ਕਤੀਐ; ਬਾਮੑਣੁ ਵਟੇ ਆਇ ॥',
      pronunciation: 'tag kapāhah katīē; bāmaṇ waṭe āi ‖',
      translation:
        'The thread is spun from cotton, and the Brahmin comes and twists it.',
    },
    {
      id: 'J2DD',
      src: 'ਕੁਹਿ ਬਕਰਾ ਰਿੰਨੑਿ ਖਾਇਆ; ਸਭੁ ਕੋ ਆਖੈ ਪਾਇ ॥',
      pronunciation: 'kuh bakarā riñn khāiā; sabh ko ākhē pāi ‖',
      translation:
        'The goat is killed, cooked and eaten, and everyone then says, "Put on the sacred thread."',
    },
    {
      id: 'TL0X',
      src: 'ਹੋਇ ਪੁਰਾਣਾ ਸੁਟੀਐ; ਭੀ ਫਿਰਿ ਪਾਈਐ ਹੋਰੁ ॥',
      pronunciation: 'hoi purāṇā suṭīē; bhī phir pāīē hor ‖',
      translation:
        'When it wears out, it is thrown away, and another one is put on.',
    },
    {
      id: 'NV51',
      src: 'ਨਾਨਕ. ਤਗੁ ਨ ਤੁਟਈ; ਜੇ ਤਗਿ ਹੋਵੈ ਜੋਰੁ ॥੨॥',
      pronunciation: 'nānak. tag na tuṭaī; je tag hovē jor ‖2‖',
      translation:
        'O Nanak, the thread would not break, if it had any real strength. ||2||',
    },
    {
      id: '0VVJ',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: '43H1',
      src: 'ਨਾਇ ਮੰਨਿਐ. ਪਤਿ ਊਪਜੈ; ਸਾਲਾਹੀ ਸਚੁ ਸੂਤੁ ॥',
      pronunciation: 'nāi mañniē. pat ūpajē; sālāhī sac sūt ‖',
      translation:
        "Believing in the Name, honor is obtained. The Lord's Praise is the true sacred thread.",
    },
    {
      id: '3DZR',
      src: 'ਦਰਗਹ ਅੰਦਰਿ ਪਾਈਐ; ਤਗੁ. ਨ ਤੂਟਸਿ ਪੂਤ ॥੩॥',
      pronunciation: 'daragah añdar pāīē; tagu. na tūṭas pūt ‖3‖',
      translation:
        'Such a sacred thread is worn in the Court of the Lord; it shall never break. ||3||',
    },
    {
      id: 'NLB4',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'A98S',
      src: 'ਤਗੁ ਨ ਇੰਦ੍ਰੀ; ਤਗੁ. ਨ ਨਾਰੀ ॥',
      pronunciation: 'tag na iñdrī; tagu. na nārī ‖',
      translation:
        'There is no sacred thread for the sexual organ, and no thread for woman.',
    },
    {
      id: 'HXGT',
      src: 'ਭਲਕੇ ਥੁਕ ਪਵੈ; ਨਿਤ ਦਾੜੀ ॥',
      pronunciation: 'bhalake thuk pavē; nit dāṛī ‖',
      translation: "The man's beard is spat upon daily.",
    },
    {
      id: 'JGD6',
      src: 'ਤਗੁ ਨ ਪੈਰੀ; ਤਗੁ ਨ ਹਥੀ ॥',
      pronunciation: 'tag na pērī; tag na hathī ‖',
      translation:
        'There is no sacred thread for the feet, and no thread for the hands;',
    },
    {
      id: '5004',
      src: 'ਤਗੁ ਨ ਜਿਹਵਾ; ਤਗੁ ਨ ਅਖੀ ॥',
      pronunciation: 'tag na jihavā; tag na akhī ‖',
      translation: 'no thread for the tongue, and no thread for the eyes.',
    },
    {
      id: 'W6XK',
      src: 'ਵੇਤਗਾ; ਆਪੇ ਵਤੈ ॥',
      pronunciation: 'vetagā; āpe watē ‖',
      translation:
        'The Brahmin himself goes to the world hereafter without a sacred thread.',
    },
    {
      id: 'ZQE7',
      src: 'ਵਟਿ ਧਾਗੇ; ਅਵਰਾ ਘਤੈ ॥',
      pronunciation: 'waṭ dhāge; awarā ghatē ‖',
      translation: 'Twisting the threads, he puts them on others.',
    },
    {
      id: 'SGML',
      src: 'ਲੈ ਭਾੜਿ; ਕਰੇ ਵੀਆਹੁ ॥',
      pronunciation: 'lē bhāṛi; kare vīāh ‖',
      translation: 'He takes payment for performing marriages;',
    },
    {
      id: 'ZGH8',
      src: 'ਕਢਿ ਕਾਗਲੁ; ਦਸੇ ਰਾਹੁ ॥',
      pronunciation: 'kaḍh kāgalu; dase rāh ‖',
      translation: 'reading their horoscopes, he shows them the way.',
    },
    {
      id: 'BU3B',
      src: 'ਸੁਣਿ ਵੇਖਹੁ ਲੋਕਾ; ਏਹੁ ਵਿਡਾਣੁ ॥',
      pronunciation: 'suṇ vekhah lokā; eh viḍāṇ ‖',
      translation: 'Hear, and see, O people, this wondrous thing.',
    },
    {
      id: '994K',
      src: 'ਮਨਿ ਅੰਧਾ; ਨਾਉ ਸੁਜਾਣੁ ॥੪॥',
      pronunciation: 'man añdhā; nāu sujāṇ ‖4‖',
      translation: 'He is mentally blind, and yet his name is wisdom. ||4||',
    },
    {
      id: '9ACT',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: '53D9',
      src: 'ਸਾਹਿਬੁ ਹੋਇ ਦਇਆਲੁ, ਕਿਰਪਾ ਕਰੇ; ਤਾ ਸਾਈ ਕਾਰ ਕਰਾਇਸੀ ॥',
      pronunciation: 'sāhib hoi daiālu, kirapā kare; tā sāī kār karāisī ‖',
      translation:
        'One, upon whom the Merciful Lord bestows His Grace, performs His service.',
    },
    {
      id: 'P5C0',
      src: 'ਸੋ ਸੇਵਕੁ ਸੇਵਾ ਕਰੇ; ਜਿਸ ਨੋ ਹੁਕਮੁ ਮਨਾਇਸੀ ॥',
      pronunciation: 'so sewak sevā kare; jis no hukam manāisī ‖',
      translation:
        'That servant, whom the Lord causes to obey the Order of His Will, serves Him.',
    },
    {
      id: '5QS7',
      src: 'ਹੁਕਮਿ ਮੰਨਿਐ ਹੋਵੈ ਪਰਵਾਣੁ; ਤਾ ਖਸਮੈ ਕਾ ਮਹਲੁ ਪਾਇਸੀ ॥',
      pronunciation: 'hukam mañniē hovē paravāṇu; tā khasamē kā mahal pāisī ‖',
      translation:
        "Obeying the Order of His Will, he becomes acceptable, and then, he obtains the Mansion of the Lord's Presence.",
    },
    {
      id: 'EE73',
      src: 'ਖਸਮੈ ਭਾਵੈ ਸੋ ਕਰੇ; ਮਨਹੁ ਚਿੰਦਿਆ. ਸੋ ਫਲੁ ਪਾਇਸੀ ॥',
      pronunciation: 'khasamē bhāvē so kare; manah ciñdiā. so phal pāisī ‖',
      translation:
        "One who acts to please His Lord and Master, obtains the fruits of his mind's desires.",
    },
    {
      id: 'KGR4',
      src: 'ਤਾ. ਦਰਗਹ ਪੈਧਾ ਜਾਇਸੀ ॥੧੫॥',
      pronunciation: 'tā. daragah pēdhā jāisī ‖15‖',
      translation:
        'Then, he goes to the Court of the Lord, wearing robes of honor. ||15||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
