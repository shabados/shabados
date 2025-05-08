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
      vicar: 'ਅਕਾਲ ਪੁਰਖ ਇੱਕ ਹੈ ਅਤੇ ਸਤਿਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਮਿਲਦਾ ਹੈ।',
    },
    {
      id: '2PQF',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ਛੰਤ ਘਰੁ ੪ ॥',
      pronunciation: 'āsā mahalā 4 chañt ghar 4 ‖',
      translation: 'Aasaa, Fourth Mehl, Chhant, Fourth House:',
      vicar: "ਰਾਗ ਆਸਾ, ਘਰ ੪ ਵਿੱਚ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਦੀ ਬਾਣੀ 'ਛੰਤ'।",
    },
    {
      id: '5006',
      src: 'ਹਰਿ ਅੰਮ੍ਰਿਤ ਭਿੰਨੇ ਲੋਇਣਾ; ਮਨੁ ਪ੍ਰੇਮਿ ਰਤੰਨਾ ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'har añmrit bhiñne loiṇā; man prem ratañnā rām rāje ‖',
      translation:
        'My eyes are wet with the Nectar of the Lord, and my mind is imbued with His Love, O Lord King.',
      vicar:
        'ਮੇਰੀਆਂ ਅੱਖਾਂ ਆਤਮਕ ਜੀਵਨ ਦੇਣ ਵਾਲੇ ਹਰਿ-ਨਾਮ-ਜਲ ਨਾਲ ਸਰੂਰ ਵਿਚ ਆ ਗਈਆਂ ਹਨ, ਮੇਰਾ ਮਨ ਪ੍ਰਭੂ ਦੇ ਪ੍ਰੇਮ-ਰੰਗ ਵਿਚ ਰੰਗਿਆ ਗਿਆ ਹੈ। ਭਿੰਨੇ = ਭਿੱਜੇ ਹੋਏ ਹਨ, ਤਰ ਹੋ ਗਏ ਹਨ, ਸਰੂਰ ਵਿਚ ਆ ਗਏ ਹਨ। ਲੋਇਣ = ਅੱਖਾਂ। ਪ੍ਰੇਮਿ = ਪ੍ਰੇਮ-ਰੰਗ ਵਿਚ। ਰਤੰਨਾ = ਰੱਤਾ ਹੋਇਆ, ਰੰਗਿਆ ਗਿਆ ਹੈ।',
    },
    {
      id: '2H1C',
      src: 'ਮਨੁ. ਰਾਮਿ ਕਸਵਟੀ ਲਾਇਆ; ਕੰਚਨੁ ਸੋਵਿੰਨਾ ॥',
      pronunciation: 'manu. rām kasawaṭī lāiā; kañcan soviñnā ‖',
      translation:
        'The Lord applied His touch-stone to my mind, and found it one hundred per cent gold.',
      vicar:
        'ਪਰਮਾਤਮਾ ਨੇ ਮੇਰੇ ਮਨ ਨੂੰ (ਆਪਣੇ ਨਾਮ ਦੀ) ਕਸਵੱਟੀ ਉਤੇ ਘਸਾਇਆ ਹੈ, ਤੇ ਇਹ ਸੁੱਧ ਸੋਨਾ ਬਣ ਗਿਆ ਹੈ। ਰਾਮਿ = ਰਾਮ ਨੇ। ਕੰਚਨੁ = ਸੋਨਾ। ਸੋਵਿੰਨਾ = ਸੁਵੰਨ, ਸੋਹਣੇ ਰੰਗ ਵਾਲਾ।',
    },
    {
      id: 'Z0WT',
      src: 'ਗੁਰਮੁਖਿ ਰੰਗਿ ਚਲੂਲਿਆ; ਮੇਰਾ ਮਨੁ ਤਨੋ ਭਿੰਨਾ ॥',
      pronunciation: 'guramukh rañg calūliā; merā man tano bhiñnā ‖',
      translation:
        'As Gurmukh, I am dyed in the deep red of the poppy, and my mind and body are drenched with His Love.',
      vicar:
        'ਗੁਰੂ ਦੀ ਸਰਨ ਪਿਆਂ ਮੇਰਾ ਮਨ ਪ੍ਰਭੂ ਦੇ ਪ੍ਰੇਮ-ਰੰਗ ਵਿਚ ਗੂੜ੍ਹਾ ਲਾਲ ਹੋ ਗਿਆ ਹੈ, ਮੇਰਾ ਮਨ ਤਰੋ-ਤਰ ਹੋ ਗਿਆ ਹੈ, ਮੇਰਾ ਹਿਰਦਾ ਤਰੋ-ਤਰ ਹੋ ਗਿਆ ਹੈ। ਗੁਰਮੁਖਿ = ਗੁਰੂ ਦੀ ਸਰਨ ਪਿਆਂ। ਚਲੂਲਿਆ = ਗੂੜ੍ਹੇ ਲਾਲ ਰੰਗ ਨਾਲ ਰੰਗਿਆ ਗਿਆ ਹੈ। ਤਨੋ = ਤਨੁ, ਸਰੀਰ, ਹਿਰਦਾ।',
    },
    {
      id: 'Z41R',
      src: 'ਜਨੁ ਨਾਨਕੁ. ਮੁਸਕਿ ਝਕੋਲਿਆ; ਸਭੁ ਜਨਮੁ ਧਨੁ ਧੰਨਾ ॥੧॥',
      pronunciation: 'jan nānaku. musak jhakoliā; sabh janam dhan dhañnā ‖1‖',
      translation:
        'Servant Nanak is drenched with His Fragrance; blessed, blessed is his entire life. ||1||',
      vicar:
        '(ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ) ਦਾਸ ਨਾਨਕ (ਪ੍ਰਭੂ ਦੇ ਨਾਮ ਦੀ) ਕਸਤੂਰੀ ਨਾਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਗੰਧਿਤ ਹੋ ਗਿਆ ਹੈ, (ਦਾਸ ਨਾਨਕ ਦਾ) ਸਾਰਾ ਜੀਵਨ ਹੀ ਭਾਗਾਂ ਵਾਲਾ ਬਣ ਗਿਆ ਹੈ ॥੧॥ ਮੁਸਕਿ = ਕਸਤੂਰੀ ਨਾਲ। ਝਕੋਲਿਆ = ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਗੰਧਿਤ ਹੋ ਗਿਆ ਹੈ। ਧਨੁ ਧੰਨਾ = ਭਾਗਾਂ ਵਾਲਾ, ਸਫਲ ॥੧॥',
    },
    {
      id: '6WX1',
      src: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation:
        'ik oañkār sat nām karatā purakh nirabhau niravēr akāl mūrat ajūnī sēbhañ gur prasād ‖',
      translation:
        "One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru's Grace:",
      vicar:
        "ਅਕਾਲ ਪੁਰਖ ਇੱਕ ਹੈ; ਜਿਸ ਦਾ ਨਾਮ 'ਹੋਂਦ ਵਾਲਾ' ਹੈ, ਜੋ ਸ੍ਰਿਸ਼ਟੀ ਦਾ ਰਚਨਹਾਰ ਹੈ, ਜੋ ਸਭ ਵਿਚ ਵਿਆਪਕ ਹੈ, ਭੈ ਤੋਂ ਰਹਿਤ ਹੈ, ਵੈਰ-ਰਹਿਤ ਹੈ, ਜਿਸ ਦਾ ਸਰੂਪ ਕਾਲ ਤੋਂ ਪਰੇ ਹੈ, (ਭਾਵ, ਜਿਸ ਦਾ ਸਰੀਰ ਨਾਸ-ਰਹਿਤ ਹੈ) ਜੋ ਜੂਨਾਂ ਵਿਚ ਨਹੀਂ ਆਉਂਦਾ, ਜਿਸ ਦਾ ਪ੍ਰਕਾਸ਼ ਆਪਣੇ ਆਪ ਤੋਂ ਹੋਇਆ ਹੈ ਅਤੇ ਜੋ ਸਤਿਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਮਿਲਦਾ ਹੈ। ੴ = 'ਓਅੰਕਾਰ' ਸੰਸਕ੍ਰਿਤ ਦੇ 'ਓਅੰ' ਸ਼ਬਦ ਤੋਂ ਲਿਆ ਗਿਆ ਹੈ। ਇਹ ਸ਼ਬਦ 'ਓਅੰ' ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਉਪਨਿਸ਼ਦਾਂ ਵਿਚ ਵਰਤਿਆ ਗਿਆ ਹੈ 'ਮਾਂਡੂਕਯ' ਉਪਨਿਸ਼ਦ ਵਿਚ ਲਿਖਿਆ ਹੈ ਕਿ ਜੋ ਕੁਝ ਹੋ ਚੁਕਿਆ ਹੈ, ਜੋ ਐਸ ਵੇਲੇ ਮੌਜੂਦ ਹੈ ਅਤੇ ਜੋ ਹੋਵੇਗਾ, ਇਹ 'ਓਅੰ' ਹੀ ਹੈ। ਉਪਨਿਸ਼ਦਾਂ ਤੋਂ ਪਿਛੋਂ ਦੇ ਸਮੇ ਵਿਚ ਸ਼ਬਦ 'ਓਅੰ' ਵਿਸ਼ਨੂੰ, ਸ਼ਿਵ ਅਤੇ ਬ੍ਰਹਮਾ ਦੇ ਸਮੁਦਾਇ ਲਈ ਵਰਤਿਆ ਗਿਆ। 'ਓਅੰਕਾਰ' ਸ਼ਬਦ 'ਅਕਾਲ ਪੁਰਖ' ਦੇ ਅਰਥ ਵਿਚ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿਚ ਆਉਂਦਾ ਹੈ, ਜਿਵੇਂ: ਓਅੰਕਾਰਿ ਬ੍ਰਹਮਾ ਉਤਪਤਿ ॥ ਓਅੰਕਾਰ ਕੀਆ ਜਿਨਿ ਚਿਤਿ ॥ ਓਅੰਕਾਰਿ ਸੈਲ ਜੁਗ ਭਏ ॥ ਓਅੰਕਾਰ ਬੇਦ ਨਿਰਮਏ ॥ (ਰਾਮਕਲੀ ਮਹਲਾ ੧ ਦਖਣੀ, ਓਅੰਕਾਰ)।ੁ ਸ਼ਬਦ 'ਏਕੰਕਾਰ' ਭੀ (ਜੋ ੴ ਦਾ ਉਚਾਰਨ ਹੈ) ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਵਿਚ ਵਰਤਿਆ ਗਿਆ ਹੈ, ਯਥਾ: ਏਕਮ ਏਕੰਕਾਰੁ ਨਿਰਾਲਾ ॥ ਅਮਰੁ ਅਜੋਨੀ ਜਾਤਿ ਨ ਜਾਲਾ ॥ (ਬਿਲਾਵਲੁ ਮਹਲਾ ੧ ਥਿਤੀ ਘਰੁ ੧੦ ਜਤਿ)। ਸਤਿਨਾਮੁ: ਜਿਸ ਦਾ ਨਾਮ 'ਸਤਿ' ਹੈ। ਸ਼ਬਦ 'ਸਤਿ' ਸੰਸਕ੍ਰਿਤ ਦੇ ਧਾਤੂ 'ਅਸ' ਤੋਂ ਹੈ, ਜਿਸ ਦਾ ਅਰਥ ਹੈ 'ਹੋਣਾ'। 'ਸਤਿ' ਦਾ ਸੰਸਕ੍ਰਿਤ ਰੂਪ 'ਸਤਯ' ਹੈ। ਇਸ ਦਾ ਅਰਥ ਹੈ 'ਹੋਂਦ ਵਾਲਾ'। 'ਸਤਿਨਾਮੁ' ਦਾ ਅਰਥ ਹੈ, 'ਉਹ ਇਕ ਓਅੰਕਾਰ ਜਿਸ ਦਾ ਨਾਮ ਹੈ ਹੋਂਦ ਵਾਲਾ'। ਪੁਰਖੁ: ਸੰਸਕ੍ਰਿਤ ਵਿਚ ਵਿਉਤਪੱਤੀ ਅਨੁਸਾਰ ਇਸ ਦੇ ਅਰਥ ਇਉਂ ਕੀਤੇ ਹਨ: 'ਪੁਰਿ ਸ਼ੇਤੇ ਇਤਿ ਪੁਰੁਸ਼ਹ'। ਭਾਵ, ਜੋ ਸਰੀਰ ਵਿਚ ਲੇਟਿਆ ਹੋਇਆ ਹੈ। ਸੰਸਕ੍ਰਿਤ ਵਿਚ ਸ਼ਬਦ 'ਪੁ",
    },
    {
      id: 'XUVA',
      src: 'ਆਸਾ ਮਹਲਾ ੧ ॥',
      pronunciation: 'āsā mahalā 1 ‖',
      translation: 'Aasaa, First "Mehl":',
      vicar:
        "ਰਾਗ ਆਸਾ ਵਿੱਚ ਗੁਰੂ ਨਾਨਕ ਜੀ ਦੀ ਬਾਣੀ। 'ਵਾਰ' ਸਲੋਕਾਂ ਸਮੇਤ, ਵਾਰ ਤੇ ਸਲੋਕ ਵੀ ਗੁਰੂ ਨਾਨਕ ਦੇ ਹਨ।",
    },
    {
      id: '3XNE',
      src: 'ਵਾਰ ਸਲੋਕਾ ਨਾਲਿ, ਸਲੋਕ ਭੀ ਮਹਲੇ ਪਹਿਲੇ ਕੇ ਲਿਖੇ; ਟੁੰਡੇ ਅਸ ਰਾਜੈ ਕੀ, ਧੁਨੀ ॥',
      pronunciation:
        'vār salokā nāli, salok bhī mahale pahile ke likhe; ṭuñḍe as rājē kī, dhunī ‖',
      translation:
        "Vaar With Saloks, And Saloks Written By The First Mehl. To Be Sung To The Tune Of 'Tunda-Asraajaa':",
      vicar:
        '(ਇਹ ਵਾਰ) ਟੁੰਡੇ (ਰਾਜਾ) ਅਸਰਾਜ ਦੀ (ਵਾਰ ਦੀ) ਸੁਰ ਉਤੇ (ਗਾਉਣੀ ਹੈ)। ਧੁਨੀ = ਸੁਰ।',
    },
    {
      id: '6CSW',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First "Mehl":',
    },
    {
      id: 'MMX1',
      src: 'ਬਲਿਹਾਰੀ ਗੁਰ ਆਪਣੇ; ਦਿਉਹਾੜੀ ਸਦ ਵਾਰ ॥',
      pronunciation: 'balihārī gur āpaṇe; diuhāṛī sad vār ‖',
      translation: 'A hundred times a day, I am a sacrifice to my Guru;',
      vicar:
        'ਮੈਂ ਆਪਣੇ ਗੁਰੂ ਤੋਂ (ਇਕ) ਦਿਨ ਵਿਚ ਸੌ ਵਾਰੀ ਸਦਕੇ ਹੁੰਦਾ ਹਾਂ, ਦਿਉਹਾੜੀ = ਦਿਹਾੜੀ ਵਿਚ। ਸਦ ਵਾਰ = ਸਉ (ਸੌ) ਵਾਰੀ।',
    },
    {
      id: '4UK9',
      src: 'ਜਿਨਿ. ਮਾਣਸ ਤੇ ਦੇਵਤੇ ਕੀਏ; ਕਰਤ. ਨ ਲਾਗੀ ਵਾਰ ॥੧॥',
      pronunciation: 'jini. māṇas te dewate kīe; karat. na lāgī vār ‖1‖',
      translation: 'He made angels out of men, without delay. ||1||',
      vicar:
        'ਜਿਸ (ਗੁਰੂ) ਨੇ ਮਨੁੱਖਾਂ ਤੋਂ ਦੇਵਤੇ ਬਣਾ ਦਿੱਤੇ ਤੇ ਬਣਾਉਂਦਿਆਂ (ਰਤਾ) ਚਿਰ ਨਾਹ ਲੱਗਾ ॥੧॥ ਜਿਨਿ = ਜਿਸ (ਗੁਰੂ) ਨੇ। ਮਾਣਸ ਤੇ = ਮਨੁੱਖਾਂ ਤੋਂ। ਕਰਤ = ਬਣਾਉਂਦਿਆਂ। ਵਾਰ = ਦੇਰ, ਚਿਰ ॥੧॥',
    },
    {
      id: 'TDMN',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second "Mehl":',
    },
    {
      id: 'DMU7',
      src: 'ਜੇ. ਸਉ ਚੰਦਾ ਉਗਵਹਿ; ਸੂਰਜ ਚੜਹਿ ਹਜਾਰ ॥',
      pronunciation: 'je. sau cañdā ugawahi; sūraj caṛah hajār ‖',
      translation:
        'If a hundred moons were to rise, and a thousand suns appeared,',
      vicar:
        'ਜੇ (ਇਕ) ਸੌ ਚੰਦ੍ਰਮਾ ਚੜ੍ਹਨ ਅਤੇ ਹਜ਼ਾਰ ਸੂਰਜ ਚੜ੍ਹਨ, ਸਉ ਚੰਦਾ = ਇਕ ਸੌ ਚੰਦ੍ਰਮਾ।',
    },
    {
      id: 'VFGS',
      src: 'ਏਤੇ ਚਾਨਣ ਹੋਦਿਆਂ; ਗੁਰ ਬਿਨੁ. ਘੋਰ ਅੰਧਾਰ ॥੨॥',
      pronunciation: 'ete cānaṇ hodiāñ; gur binu. ghor añdhār ‖2‖',
      translation:
        'even with such light, there would still be pitch darkness without the Guru. ||2||',
      vicar:
        "ਜੇ ਇਤਨੇ ਭੀ ਚਾਨਣ ਹੋ ਜਾਣ (ਭਾਵ, ਚਾਨਣ ਕਰਨ ਵਾਲੇ ਜੇ ਇਤਨੇ ਭੀ ਚੰਦ੍ਰਮਾ ਸੂਰਜ ਆਦਿਕ ਗ੍ਰਹਿ ਅਕਾਸ਼ ਵਿਚ ਚੜ੍ਹ ਪੈਣ), ਗੁਰੂ ਤੋਂ ਬਿਨਾ (ਫੇਰ ਭੀ) ਘੁੱਪ ਹਨੇਰਾ ਹੈ ॥੨॥ ਏਤੇ ਚਾਨਣ = ਇਤਨੇ ਚਾਨਣ। ਗੁਰ ਬਿਨੁ = ਗੁਰੂ ਤੋਂ ਬਿਨਾ। ਘੋਰ ਅੰਧਾਰ = ਘੁੱਪ ਹਨੇਰਾ।੨। ❀ ਇਸ ਸਲੋਕ ਵਿਚ 'ਸਉ ਨਾਹ' ਪਦ ਵਰਤਿਆ ਗਿਆ ਹੈ। ਕਈ ਸੱਜਣ ਪਹਿਲੇ 'ਸਉ' ਦਾ ਅਰਥ 'ਸੈਂਕੜਾ' ਕਰਦੇ ਹਨ ਅਤੇ ਦੂਜੇ 'ਸਉ' ਦਾ ਅਰਥ 'ਸ਼ਹੁ' 'ਖਸਮ' ਕਰਦੇ ਹਨ। ਇਹ ਉੱਕਾ ਹੀ ਅਸ਼ੁੱਧ ਹੈ। ਦੋਹੀ ਥਾਂਈ ਸ਼ਬਦ 'ਸਉ' ਦਾ ਜੋੜ ਇਕੋ ਹੀ ਹੈ। ਦੂਜੇ ਥਾਂ 'ਸਉ' ਦਾ ਉਚਾਰਨ ਕਰਨ ਵੇਲੇ 'ਹ' ਦਾ ਉਚਾਰਨ ਕਰ ਕੇ 'ਸਹੁ' ਆਖਣਾ ਵੱਡੀ ਭੁੱਲ ਹੈ। ਇਸ ਦੂਜੇ 'ਸਉ' ਦਾ ਉਚਾਰਨ ਤੇ ਅਰਥ 'ਸਹੁ' ਕਰਨ ਵਾਲੇ ਸੱਜਣ ਸ਼ਬਦ 'ਨਾਹ' ਦਾ ਅਰਥ 'ਨਹੀਂ' ਕਰਦੇ ਹਨ। ਇਕ ਇਹ ਹੋਰ ਭੁੱਲ ਹੈ। ਇਸ ਤਰ੍ਹਾਂ ਉਹ ਸਜਣ ਇਸ ਸ਼ਬਦ 'ਨਾਹ' ਨੂੰ ਕ੍ਰਿਆ-ਵਿਸ਼ੇਸ਼ਣ (Adverb) ਬਣਾ ਦੇਂਦੇ ਹਨ। ਗੁਰਬਾਣੀ ਨੂੰ ਵਿਆਕਰਣ ਅਨੁਸਾਰ ਪੜ੍ਹਨ ਵਾਲੇ ਸੱਜਣ ਜਾਣਦੇ ਹਨ ਕਿ ਜਦੋਂ ਕਦੇ ਇਹ ਸ਼ਬਦ ਕ੍ਰਿਆ-ਵਿਸ਼ੇਸ਼ਣ ਹੋਵੇ, ਤਾਂ ਇਸ ਦਾ ਰੂਪ 'ਨਾਹਿ' ਹੁੰਦਾ ਹੈ, ਭਾਵ ਇਸ ਦੇ ਅੰਤ ਵਿਚ (ਿ) ਹੁੰਦੀ ਹੈ, ਕਿਉਂਕਿ ਇਹ 'ਨਾਹਿ' ਸ਼ਬਦ ਅਸਲ ਵਿਚ ਸੰਸਕ੍ਰਿਤ ਦੇ ਦੋ ਸ਼ਬਦਾਂ 'ਨ' (न) ਅਤੇ 'ਹਿ' (हि) ਦੇ ਜੋੜ ਤੋਂ ਬਣਿਆ ਹੋਇਆ ਹੈ। ਸ਼ਬਦ 'ਨਾਹ' ਸੰਸਕ੍ਰਿਤ ਦੇ ਸ਼ਬਦ 'ਨਾਥ' (नाथ) ਦਾ ਪ੍ਰਾਕ੍ਰਿਤ ਰੂਪ ਹੈ। 'ਥ' ਤੋਂ 'ਹ' ਕਿਉਂ ਹੋ ਗਿਆ, ਇਸ ਵਿਸ਼ੇ ਉੱਤੇ 'ਗੁਰਬਾਣੀ ਵਿਆਕਰਣ' ਵਿਚ ਵਿਸਥਾਰ ਨਾਲ ਵਿਚਾਰ ਕੀਤੀ ਗਈ ਹੈ। ਗੁਰਬਾਣੀ ਵਿਚ ਕਈ ਥਾਈਂ ਸ਼ਬਦ 'ਨਾਹ' ਆਇਆ ਹੈ, ਜਿਸ ਦਾ ਅਰਥ ਹੈ 'ਖਸਮ'। ਨਾਹੁ-ਇਕ ਖਸਮ (ਇਕ-ਵਚਨ, Singular) ਨਾਹ-(ਬਹੁਤੇ",
    },
    {
      id: 'VNS9',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First "Mehl":',
    },
    {
      id: 'JAGE',
      src: 'ਨਾਨਕ. ਗੁਰੂ ਨ ਚੇਤਨੀ; ਮਨਿ ਆਪਣੈ ਸੁਚੇਤ ॥',
      pronunciation: 'nānak. gurū na cetanī; man āpaṇē sucet ‖',
      translation:
        'O Nanak, those who do not think of the Guru, and who think of themselves as clever,',
      vicar:
        'ਹੇ ਨਾਨਕ! (ਜੋ ਮਨੁੱਖ) ਗੁਰੂ ਨੂੰ ਚੇਤੇ ਨਹੀਂ ਕਰਦੇ ਆਪਣੇ ਆਪ ਵਿਚ ਚਤਰ (ਬਣੇ ਹੋਏ) ਹਨ, ਨਾਨਕ = ਹੇ ਨਾਨਕ! ਨ ਚੇਤਨੀ = ਨਹੀਂ ਚੇਤਦੇ। ਮਨਿ ਆਪਣੈ = ਆਪਣੇ ਮਨ ਵਿਚ।',
    },
    {
      id: 'VHL4',
      src: 'ਛੁਟੇ ਤਿਲ ਬੂਆੜ ਜਿਉ; ਸੁੰਞੇ ਅੰਦਰਿ ਖੇਤ ॥',
      pronunciation: 'chuṭe til būāṛ jiu; suññe añdar khet ‖',
      translation:
        'shall be left abandoned in the field, like the scattered sesame.',
      vicar:
        'ਉਹ ਇਉਂ ਹਨ ਜਿਵੇਂ ਕਿਸੇ ਸੁੰਞੀ ਪੈਲੀ ਵਿਚ ਅੰਦਰੋਂ ਸੜੇ ਤਿਲ ਨਿਖਸਮੇ ਪਏ ਹੋਏ ਹਨ। ਤਿਲ ਬੂਆੜ ਜਿਉ = ਬੂਆੜ ਤਿਲਾਂ ਵਾਂਗ। ਛੁਟੇ = ਛੁੱਟੜ ਪਏ ਹਨ।',
    },
    {
      id: 'RQMF',
      src: 'ਖੇਤੈ ਅੰਦਰਿ ਛੁਟਿਆ; ਕਹੁ ਨਾਨਕ. ਸਉ ਨਾਹ ॥',
      pronunciation: 'khetē añdar chuṭiā; kah nānak. sau nāh ‖',
      translation:
        'They are abandoned in the field, says Nanak, and they have a hundred masters to please.',
      vicar:
        'ਹੇ ਨਾਨਕ! (ਬੇਸ਼ਕ) ਆਖ ਕਿ ਪੈਲੀ ਵਿਚ ਨਿਖਸਮੇ ਪਏ ਹੋਏ ਉਹਨਾਂ ਬੂਆੜ ਤਿਲਾਂ ਦੇ ਸੌ ਖਸਮ ਹਨ, ਛੁਟਿਆ = ਛੁੱਟੜ ਪਏ ਹੋਇਆਂ ਦੇ। ਸਉ = (ਇਕ) ਸੌ। ਨਾਹ = ਖਸਮ।',
    },
    {
      id: '8JG5',
      src: 'ਫਲੀਅਹਿ ਫੁਲੀਅਹਿ ਬਪੁੜੇ; ਭੀ. ਤਨ ਵਿਚਿ ਸੁਆਹ ॥੩॥',
      pronunciation: 'phalīah phulīah bapuṛe; bhī. tan vic suāh ‖3‖',
      translation:
        'The wretches bear fruit and flower, but within their bodies, they are filled with ashes. ||3||',
      vicar:
        'ਉਹ ਵਿਚਾਰੇ ਫੁੱਲਦੇ ਭੀ ਹਨ (ਭਾਵ, ਉਹਨਾਂ ਨੂੰ ਫੁੱਲ ਭੀ ਲੱਗਦੇ ਹਨ), ਫਲਦੇ ਭੀ ਹਨ, ਫੇਰ ਭੀ ਉਹਨਾਂ ਦੇ ਤਨ ਵਿਚ (ਭਾਵ, ਉਹਨਾਂ ਦੀ ਫਲੀ ਵਿਚ ਤਿਲਾਂ ਦੀ ਥਾਂ) ਸੁਆਹ ਹੀ ਹੁੰਦੀ ਹੈ ॥੩॥ ਬਪੁੜੇ = ਵਿਚਾਰੇ। ਬੂਆੜ = ਸੜਿਆ ਹੋਇਆ (सः व्युष्ट) ॥੩॥',
    },
    {
      id: 'F51J',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: '"Pauree":',
    },
    {
      id: 'W3WR',
      src: 'ਆਪੀਨੑੈ ਆਪੁ ਸਾਜਿਓ; ਆਪੀਨੑੈ ਰਚਿਓ ਨਾਉ ॥',
      pronunciation: 'āpīnē āp sājio; āpīnē racio nāu ‖',
      translation: 'He Himself created Himself; He Himself assumed His Name.',
      vicar:
        'ਅਕਾਲ ਪੁਰਖ ਨੇ ਆਪ ਹੀ ਆਪਣੇ ਆਪ ਨੂੰ ਸਾਜਿਆ, ਅਤੇ ਆਪ ਹੀ ਆਪਣਾ ਨਾਮਣਾ ਬਣਾਇਆ। ਆਪੀਨ੍ਹ੍ਹੈ = ਆਪ ਹੀ ਨੇ, (ਅਕਾਲ ਪੁਰਖ) ਨੇ ਆਪ ਹੀ। ਆਪੁ = ਆਪਣੇ ਆਪ ਨੂੰ। ਨਾਉ = ਨਾਮਣਾ, ਵਡਿਆਈ।',
    },
    {
      id: '4LKX',
      src: 'ਦੁਯੀ. ਕੁਦਰਤਿ ਸਾਜੀਐ; ਕਰਿ ਆਸਣੁ ਡਿਠੋ ਚਾਉ ॥',
      pronunciation: 'duyī. kudarat sājīē; kar āsaṇ ḍiṭho cāu ‖',
      translation:
        'Secondly, He fashioned the creation; seated within the creation, He beholds it with delight.',
      vicar:
        'ਫਿਰ, ਉਸ ਨੇ ਕੁਦਰਤ ਰਚੀ (ਅਤੇ ਉਸ ਵਿਚ) ਆਸਣ ਜਮਾ ਕੇ, (ਭਾਵ, ਕੁਦਰਤ ਵਿਚ ਵਿਆਪਕ ਹੋ ਕੇ, ਇਸ ਜਗਤ ਦਾ) ਆਪ ਤਮਾਸ਼ਾ ਵੇਖਣ ਲੱਗ ਪਿਆ ਹੈ। ਦੁਯੀ = ਦੂਜੀ। ਸਾਜੀਐ = ਬਣਾਈ ਹੈ। ਕਰਿ = ਕਰ ਕੇ, ਬਣਾ ਕੇ। ਚਾਉ = ਤਮਾਸ਼ਾ।',
    },
    {
      id: 'VGFR',
      src: 'ਦਾਤਾ ਕਰਤਾ. ਆਪਿ ਤੂੰ; ਤੁਸਿ ਦੇਵਹਿ. ਕਰਹਿ ਪਸਾਉ ॥',
      pronunciation: 'dātā karatā. āp tūñ; tus dewahi. karah pasāu ‖',
      translation:
        'You Yourself are the Giver and the Creator; by Your Pleasure, You bestow Your Mercy.',
      vicar:
        '(ਹੇ ਪ੍ਰਭੂ!) ਤੂੰ ਆਪ ਹੀ (ਜੀਵਾਂ ਨੂੰ) ਦਾਤਾਂ ਦੇਣ ਵਾਲਾ ਹੈਂ ਅਤੇ ਆਪ ਹੀ (ਇਹਨਾਂ ਦੇ) ਸਾਜਣ ਵਾਲਾ ਹੈਂ। (ਤੂੰ ਆਪ ਹੀ ਤ੍ਰੁੱਠ ਕੇ (ਜੀਵਾਂ ਨੂੰ) ਦੇਂਦਾ ਹੈਂ ਅਤੇ ਬਖ਼ਸ਼ਸ਼ ਕਰਦਾ ਹੈਂ। ਤੁਸਿ = ਤ੍ਰੁੱਠ ਕੇ, ਪ੍ਰਸੰਨ ਹੋ ਕੇ। ਦੇਵਹਿ = ਤੂੰ ਦੇਂਦਾ ਹੈਂ। ਕਰਹਿ = ਤੂੰ ਕਰਦਾ ਹੈਂ। ਪਸਾਉ = ਪ੍ਰਸਾਦ, ਕਿਰਪਾ, ਬਖ਼ਸ਼ਸ਼।',
    },
    {
      id: '1GRF',
      src: 'ਤੂੰ ਜਾਣੋਈ ਸਭਸੈ; ਦੇ ਲੈਸਹਿ. ਜਿੰਦੁ ਕਵਾਉ ॥',
      pronunciation: 'tūñ jāṇoī sabhasē; de lēsahi. jiñd kavāu ‖',
      translation:
        'You are the Knower of all; You give life, and take it away again with a word.',
      vicar:
        'ਤੂੰ ਸਭਨਾਂ ਜੀਆਂ ਦੀ ਜਾਣਨਹਾਰ ਹੈਂ। ਜਿੰਦ ਅਤੇ ਸਰੀਰ ਦੇ ਕੇ (ਤੂੰ ਆਪ ਹੀ) ਲੈ ਲਵੇਂਗਾ (ਭਾਵ, ਤੂੰ ਆਪ ਹੀ ਜਿੰਦ ਤੇ ਸਰੀਰ ਦੇਂਦਾ ਹੈਂ, ਆਪ ਹੀ ਮੁੜ ਲੈ ਲੈਂਦਾ ਹੈਂ)। ਜਾਣੋਈ = ਜਾਣਨਹਾਰਾ, ਜਾਣੂ। ਸਭਸੈ = ਸਭਨਾਂ ਦਾ। ਦੇ = ਦੇ ਕੇ। ਲੈਸਹਿ = ਲੈ ਲਵੇਂਗਾ। ਜਿੰਦੁ ਕਵਾਉ = ਜਿੰਦ ਅਤੇ ਜਿੰਦ ਦਾ ਕਵਾਉ (ਲਿਬਾਸ, ਪੋਸ਼ਾਕ), ਭਾਵ, ਸਰੀਰ।',
    },
    {
      id: 'N5Y1',
      src: 'ਕਰਿ ਆਸਣੁ; ਡਿਠੋ ਚਾਉ ॥੧॥',
      pronunciation: 'kar āsaṇu; ḍiṭho cāu ‖1‖',
      translation:
        'Seated within the creation, You behold it with delight. ||1||',
      vicar: 'ਤੂੰ (ਕੁਦਰਤ ਵਿਚ) ਆਸਣ ਜਮਾ ਕੇ ਤਮਾਸ਼ਾ ਵੇਖ ਰਿਹਾ ਹੈਂ ॥੧॥',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
