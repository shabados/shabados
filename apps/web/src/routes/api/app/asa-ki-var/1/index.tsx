import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 1)',
    roman: 'Āsā kī vār (chakkā 1)',
  },
  paging: {
    next: 'asa-ki-var/2',
  },
  data: [
    {
      id: 'RWU7',
      src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation: 'ik oañkār satigur prasād ‖',
      translation: 'One Universal Creator God. By The Grace Of The True Guru:',
    },
    {
      id: '2PQF',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ਛੰਤ ਘਰੁ ੪ ॥',
      pronunciation: 'āsā mahalā 4 chañt ghar 4 ‖',
      translation: 'Aasaa, Fourth Mehl, Chhant, Fourth House:',
    },
    {
      id: '5006',
      src: 'ਹਰਿ ਅੰਮ੍ਰਿਤ ਭਿੰਨੇ ਲੋਇਣਾ; ਮਨੁ ਪ੍ਰੇਮਿ ਰਤੰਨਾ ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'har añmrit bhiñne loiṇā; man prem ratañnā rām rāje ‖',
      translation:
        'My eyes are wet with the Nectar of the Lord, and my mind is imbued with His Love, O Lord King.',
    },
    {
      id: '2H1C',
      src: 'ਮਨੁ. ਰਾਮਿ ਕਸਵਟੀ ਲਾਇਆ; ਕੰਚਨੁ ਸੋਵਿੰਨਾ ॥',
      pronunciation: 'manu. rām kasawaṭī lāiā; kañcan soviñnā ‖',
      translation:
        'The Lord applied His touch-stone to my mind, and found it one hundred per cent gold.',
    },
    {
      id: 'Z0WT',
      src: 'ਗੁਰਮੁਖਿ ਰੰਗਿ ਚਲੂਲਿਆ; ਮੇਰਾ ਮਨੁ ਤਨੋ ਭਿੰਨਾ ॥',
      pronunciation: 'guramukh rañg calūliā; merā man tano bhiñnā ‖',
      translation:
        'As Gurmukh, I am dyed in the deep red of the poppy, and my mind and body are drenched with His Love.',
    },
    {
      id: 'Z41R',
      src: 'ਜਨੁ ਨਾਨਕੁ. ਮੁਸਕਿ ਝਕੋਲਿਆ; ਸਭੁ ਜਨਮੁ ਧਨੁ ਧੰਨਾ ॥੧॥',
      pronunciation: 'jan nānaku. musak jhakoliā; sabh janam dhan dhañnā ‖1‖',
      translation:
        'Servant Nanak is drenched with His Fragrance; blessed, blessed is his entire life. ||1||',
    },
    {
      id: '6WX1',
      src: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation:
        'ik oañkār sat nām karatā purakh nirabhau niravēr akāl mūrat ajūnī sēbhañ gur prasād ‖',
      translation:
        "One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru's Grace:",
    },
    {
      id: 'XUVA',
      src: 'ਆਸਾ ਮਹਲਾ ੧ ॥',
      pronunciation: 'āsā mahalā 1 ‖',
      translation: 'Aasaa, First Mehl:',
    },
    {
      id: '3XNE',
      src: 'ਵਾਰ ਸਲੋਕਾ ਨਾਲਿ, ਸਲੋਕ ਭੀ ਮਹਲੇ ਪਹਿਲੇ ਕੇ ਲਿਖੇ; ਟੁੰਡੇ ਅਸ ਰਾਜੈ ਕੀ, ਧੁਨੀ ॥',
      pronunciation:
        'vār salokā nāli, salok bhī mahale pahile ke likhe; ṭuñḍe as rājē kī, dhunī ‖',
      translation:
        "Vaar With Saloks, And Saloks Written By The First Mehl. To Be Sung To The Tune Of 'Tunda-Asraajaa':",
    },
    {
      id: '6CSW',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'MMX1',
      src: 'ਬਲਿਹਾਰੀ ਗੁਰ ਆਪਣੇ; ਦਿਉਹਾੜੀ ਸਦ ਵਾਰ ॥',
      pronunciation: 'balihārī gur āpaṇe; diuhāṛī sad vār ‖',
      translation: 'A hundred times a day, I am a sacrifice to my Guru;',
    },
    {
      id: '4UK9',
      src: 'ਜਿਨਿ. ਮਾਣਸ ਤੇ ਦੇਵਤੇ ਕੀਏ; ਕਰਤ. ਨ ਲਾਗੀ ਵਾਰ ॥੧॥',
      pronunciation: 'jini. māṇas te dewate kīe; karat. na lāgī vār ‖1‖',
      translation: 'He made angels out of men, without delay. ||1||',
    },
    {
      id: 'TDMN',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'DMU7',
      src: 'ਜੇ. ਸਉ ਚੰਦਾ ਉਗਵਹਿ; ਸੂਰਜ ਚੜਹਿ ਹਜਾਰ ॥',
      pronunciation: 'je. sau cañdā ugawahi; sūraj caṛah hajār ‖',
      translation:
        'If a hundred moons were to rise, and a thousand suns appeared,',
    },
    {
      id: 'VFGS',
      src: 'ਏਤੇ ਚਾਨਣ ਹੋਦਿਆਂ; ਗੁਰ ਬਿਨੁ. ਘੋਰ ਅੰਧਾਰ ॥੨॥',
      pronunciation: 'ete cānaṇ hodiāñ; gur binu. ghor añdhār ‖2‖',
      translation:
        'even with such light, there would still be pitch darkness without the Guru. ||2||',
    },
    {
      id: 'VNS9',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'JAGE',
      src: 'ਨਾਨਕ. ਗੁਰੂ ਨ ਚੇਤਨੀ; ਮਨਿ ਆਪਣੈ ਸੁਚੇਤ ॥',
      pronunciation: 'nānak. gurū na cetanī; man āpaṇē sucet ‖',
      translation:
        'O Nanak, those who do not think of the Guru, and who think of themselves as clever,',
    },
    {
      id: 'VHL4',
      src: 'ਛੁਟੇ ਤਿਲ ਬੂਆੜ ਜਿਉ; ਸੁੰਞੇ ਅੰਦਰਿ ਖੇਤ ॥',
      pronunciation: 'chuṭe til būāṛ jiu; suññe añdar khet ‖',
      translation:
        'shall be left abandoned in the field, like the scattered sesame.',
    },
    {
      id: 'RQMF',
      src: 'ਖੇਤੈ ਅੰਦਰਿ ਛੁਟਿਆ; ਕਹੁ ਨਾਨਕ. ਸਉ ਨਾਹ ॥',
      pronunciation: 'khetē añdar chuṭiā; kah nānak. sau nāh ‖',
      translation:
        'They are abandoned in the field, says Nanak, and they have a hundred masters to please.',
    },
    {
      id: '8JG5',
      src: 'ਫਲੀਅਹਿ ਫੁਲੀਅਹਿ ਬਪੁੜੇ; ਭੀ. ਤਨ ਵਿਚਿ ਸੁਆਹ ॥੩॥',
      pronunciation: 'phalīah phulīah bapuṛe; bhī. tan vic suāh ‖3‖',
      translation:
        'The wretches bear fruit and flower, but within their bodies, they are filled with ashes. ||3||',
    },
    {
      id: 'F51J',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'W3WR',
      src: 'ਆਪੀਨੑੈ ਆਪੁ ਸਾਜਿਓ; ਆਪੀਨੑੈ ਰਚਿਓ ਨਾਉ ॥',
      pronunciation: 'āpīnē āp sājio; āpīnē racio nāu ‖',
      translation: 'He Himself created Himself; He Himself assumed His Name.',
    },
    {
      id: '4LKX',
      src: 'ਦੁਯੀ. ਕੁਦਰਤਿ ਸਾਜੀਐ; ਕਰਿ ਆਸਣੁ ਡਿਠੋ ਚਾਉ ॥',
      pronunciation: 'duyī. kudarat sājīē; kar āsaṇ ḍiṭho cāu ‖',
      translation:
        'Secondly, He fashioned the creation; seated within the creation, He beholds it with delight.',
    },
    {
      id: 'VGFR',
      src: 'ਦਾਤਾ ਕਰਤਾ. ਆਪਿ ਤੂੰ; ਤੁਸਿ ਦੇਵਹਿ. ਕਰਹਿ ਪਸਾਉ ॥',
      pronunciation: 'dātā karatā. āp tūñ; tus dewahi. karah pasāu ‖',
      translation:
        'You Yourself are the Giver and the Creator; by Your Pleasure, You bestow Your Mercy.',
    },
    {
      id: '1GRF',
      src: 'ਤੂੰ ਜਾਣੋਈ ਸਭਸੈ; ਦੇ ਲੈਸਹਿ. ਜਿੰਦੁ ਕਵਾਉ ॥',
      pronunciation: 'tūñ jāṇoī sabhasē; de lēsahi. jiñd kavāu ‖',
      translation:
        'You are the Knower of all; You give life, and take it away again with a word.',
    },
    {
      id: 'N5Y1',
      src: 'ਕਰਿ ਆਸਣੁ; ਡਿਠੋ ਚਾਉ ॥੧॥',
      pronunciation: 'kar āsaṇu; ḍiṭho cāu ‖1‖',
      translation:
        'Seated within the creation, You behold it with delight. ||1||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
