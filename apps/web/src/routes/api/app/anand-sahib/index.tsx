import type { RequestHandler } from '@builder.io/qwik-city';

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
      vicar: "ਰਾਗ ਰਾਮਕਲੀ ਵਿੱਚ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੀ ਬਾਣੀ 'ਅਨੰਦ'।",
    },
    {
      id: 'GE9G',
      src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation: 'ik oañkār satigur prasād ‖',
      translation: 'One Universal Creator God. By The Grace Of The True Guru:',
      vicar: 'ਅਕਾਲ ਪੁਰਖ ਇੱਕ ਹੈ ਅਤੇ ਸਤਿਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਮਿਲਦਾ ਹੈ।',
    },
    {
      id: '2UEB',
      src: 'ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ; ਸਤਿਗੁਰੂ. ਮੈ ਪਾਇਆ ॥',
      pronunciation: 'anañd bhaiā merī māe; satigurū. mē pāiā ‖',
      translation:
        'I am in ecstasy, O my mother, for I have found my True Guru.',
      vicar:
        'ਹੇ ਭਾਈ ਮਾਂ! (ਮੇਰੇ ਅੰਦਰ) ਪੂਰਨ ਖਿੜਾਉ ਪੈਦਾ ਹੋ ਗਿਆ ਹੈ (ਕਿਉਂਕਿ) ਮੈਨੂੰ ਗੁਰੂ ਮਿਲ ਪਿਆ ਹੈ। ਅਨੰਦੁ = ਪੂਰਨ ਖਿੜਾਉ। ਪਾਇਆ = ਪ੍ਰਾਪਤ ਕਰ ਲਿਆ ਹੈ।',
    },
    {
      id: 'BJ01',
      src: 'ਸਤਿਗੁਰੁ. ਤ ਪਾਇਆ ਸਹਜ ਸੇਤੀ; ਮਨਿ ਵਜੀਆ ਵਾਧਾਈਆ ॥',
      pronunciation: 'satiguru. ta pāiā sahaj setī; man wajīā vādhāīā ‖',
      translation:
        'I have found the True Guru, with intuitive ease, and my mind vibrates with the music of bliss.',
      vicar:
        'ਮੈਨੂੰ ਗੁਰੂ ਮਿਲਿਆ ਹੈ, ਤੇ ਨਾਲ ਹੀ ਅਡੋਲ ਅਵਸਥਾ ਭੀ ਪ੍ਰਾਪਤ ਹੋ ਗਈ ਹੈ (ਭਾਵ, ਗੁਰੂ ਦੇ ਮਿਲਣ ਨਾਲ ਮੇਰਾ ਮਨ ਡੋਲਣੋਂ ਹਟ ਗਿਆ ਹੈ); ਮੇਰੇ ਮਨ ਵਿਚ (ਮਾਨੋ) ਖ਼ੁਸ਼ੀ ਦੇ ਵਾਜੇ ਵੱਜ ਪਏ ਹਨ, ਸਹਜ = ਅਡੋਲ ਅਵਸਥਾ। ਸਹਜ ਸੇਤੀ = ਅਡੋਲ ਅਵਸਥਾ ਦੇ ਨਾਲ। ਮਨਿ = ਮਨ ਵਿਚ। ਵਾਧਾਈ = ਚੜ੍ਹਦੀ ਕਲਾ, ਉਤਸ਼ਾਹ ਪੈਦਾ ਕਰਨ ਵਾਲਾ ਗੀਤ।',
    },
    {
      id: '6GJM',
      src: 'ਰਾਗ ਰਤਨ ਪਰਵਾਰ ਪਰੀਆ; ਸਬਦ ਗਾਵਣ ਆਈਆ ॥',
      pronunciation: 'rāg ratan paravār parīā; sabad gāwaṇ āīā ‖',
      translation:
        'The jewelled melodies and their related celestial harmonies have come to sing the Word of the Shabad.',
      vicar:
        'ਸੋਹਣੇ ਰਾਗ ਆਪਣੇ ਪਰਵਾਰ ਤੇ ਰਾਣੀਆਂ ਸਮੇਤ (ਮੇਰੇ ਮਨ ਵਿਚ, ਮਾਨੋ,) ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੇ ਗੀਤ ਗਾਵਣ ਆ ਗਏ ਹਨ। ਪਰੀਆ = ਰਾਗਾਂ ਦੀਆਂ ਪਰੀਆਂ, ਰਾਗਣੀਆਂ। ਰਾਗ ਰਤਨ = ਸੋਹਣੇ ਰਾਗ।',
    },
    {
      id: 'AR69',
      src: 'ਸਬਦੋ ਤ ਗਾਵਹੁ ਹਰੀ ਕੇਰਾ; ਮਨਿ ਜਿਨੀ ਵਸਾਇਆ ॥',
      pronunciation: 'sabado ta gāwah harī kerā; man jinī wasāiā ‖',
      translation:
        'The Lord dwells within the minds of those who sing the Shabad.',
      vicar:
        '(ਤੁਸੀ ਭੀ) ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦਾ ਗੀਤ ਗਾਵੋ। ਜਿਨ੍ਹਾਂ ਜਿਨ੍ਹਾਂ ਨੇ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦਾ ਸ਼ਬਦ ਮਨ ਵਿਚ ਵਸਾਇਆ ਹੈ (ਉਹਨਾਂ ਦੇ ਅੰਦਰ ਪੂਰਨ ਖਿੜਾਉ ਪੈਦਾ ਹੋ ਜਾਂਦਾ ਹੈ)। ਕੇਰਾ = ਦਾ।',
    },
    {
      id: '439Z',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਅਨੰਦੁ ਹੋਆ; ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੧॥',
      pronunciation: 'kahē nānaku. anañd hoā; satigurū mē pāiā ‖1‖',
      translation:
        'Says Nanak, I am in ecstasy, for I have found my True Guru. ||1||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ (ਮੇਰੇ ਅੰਦਰ ਭੀ) ਆਨੰਦ ਬਣ ਗਿਆ ਹੈ (ਕਿਉਂਕਿ) ਮੈਨੂੰ ਸਤਿਗੁਰੂ ਮਿਲ ਪਿਆ ਹੈ ॥੧॥',
    },
    {
      id: 'Z58C',
      src: 'ਏ ਮਨ ਮੇਰਿਆ; ਤੂ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥',
      pronunciation: 'e man meriā; tū sadā rah har nāle ‖',
      translation: 'O my mind, remain always with the Lord.',
      vicar: 'ਹੇ ਮੇਰੇ ਮਨ! ਤੂੰ ਸਦਾ ਪ੍ਰਭੂ ਦੇ ਨਾਲ (ਜੁੜਿਆ) ਰਹੁ।',
    },
    {
      id: '5AA1',
      src: 'ਹਰਿ ਨਾਲਿ ਰਹੁ ਤੂ ਮੰਨ ਮੇਰੇ; ਦੂਖ ਸਭਿ ਵਿਸਾਰਣਾ ॥',
      pronunciation: 'har nāl rah tū mañn mere; dūkh sabh visāraṇā ‖',
      translation:
        'Remain always with the Lord, O my mind, and all sufferings will be forgotten.',
      vicar:
        'ਹੇ ਮੇਰੇ ਮਨ! ਤੂੰ ਸਦਾ ਪ੍ਰਭੂ ਨੂੰ ਯਾਦ ਰੱਖ। ਮੰਨ ਮੇਰੇ = ਹੇ ਮੇਰੇ ਮਨ! ਸਭਿ = ਸਾਰੇ। ਵਿਸਾਰਣਾ = ਦੂਰ ਕਰਨ ਵਾਲਾ।',
    },
    {
      id: 'YGK6',
      src: 'ਅੰਗੀਕਾਰੁ ਓਹੁ ਕਰੇ ਤੇਰਾ; ਕਾਰਜ ਸਭਿ ਸਵਾਰਣਾ ॥',
      pronunciation: 'añgīkār oh kare terā; kāraj sabh savāraṇā ‖',
      translation:
        'He will accept You as His own, and all your affairs will be perfectly arranged.',
      vicar: 'ਉਹ ਪ੍ਰਭੂ ਸਾਰੇ ਦੁੱਖ ਦੂਰ ਕਰਨ ਵਾਲਾ ਹੈ। ਅੰਗੀਕਾਰੁ = ਪੱਖ, ਸਹਾਇਤਾ।',
    },
    {
      id: '350Z',
      src: 'ਸਭਨਾ ਗਲਾ ਸਮਰਥੁ ਸੁਆਮੀ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੇ ॥',
      pronunciation: 'sabhanā galā samarath suāmī; so. kiu manah visāre ‖',
      translation:
        'Our Lord and Master is all-powerful to do all things, so why forget Him from your mind?',
      vicar:
        'ਉਹ ਸਦਾ ਤੇਰੀ ਸਹਾਇਤਾ ਕਰਨ ਵਾਲਾ ਹੈ ਤੇਰੇ ਸਾਰੇ ਕੰਮ ਸਿਰੇ ਚਾੜ੍ਹਨ ਦੇ ਸਮਰੱਥ ਹੈ। ਸਮਰਥੁ = ਕਰਨ-ਯੋਗ। ਮਨਹੁ = ਮਨ ਤੋਂ। ਵਿਸਰੇ = ਵਿਸਰਦਾ ਹੈਂ।',
    },
    {
      id: 'CF7N',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਮੰਨ ਮੇਰੇ; ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥੨॥',
      pronunciation: 'kahē nānaku. mañn mere; sadā rah har nāle ‖2‖',
      translation: 'Says Nanak, O my mind, remain always with the Lord. ||2||',
      vicar:
        'ਉਸ ਮਾਲਕ ਨੂੰ ਕਿਉਂ (ਆਪਣੇ) ਮਨ ਤੋਂ ਭੁਲਾਂਦਾ ਹੈਂ ਜੋ ਸਾਰੇ ਕੰਮ ਕਰਨ-ਜੋਗਾ ਹੈ? ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਮੇਰੇ ਮਨ! ਤੂੰ ਸਦਾ ਪ੍ਰਭੂ ਦੇ ਚਰਨਾਂ ਵਿਚ ਜੁੜਿਆ ਰਹੁ ॥੨॥',
    },
    {
      id: '4GE3',
      src: 'ਸਾਚੇ ਸਾਹਿਬਾ; ਕਿਆ ਨਾਹੀ. ਘਰਿ ਤੇਰੈ ॥',
      pronunciation: 'sāce sāhibā; kiā nāhī. ghar terē ‖',
      translation:
        'O my True Lord and Master, what is there which is not in Your celestial home?',
      vicar:
        'ਹੇ ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲੇ ਮਾਲਕ (-ਪ੍ਰਭੂ)! (ਮੈਂ ਤੇਰੇ ਦਰ ਤੋਂ ਮਨ ਦਾ ਆਨੰਦ ਮੰਗਦਾ ਹਾਂ, ਪਰ) ਤੇਰੇ ਘਰ ਵਿਚ ਕੇਹੜੀ ਚੀਜ਼ ਨਹੀਂ ਹੈ? ਘਰਿ ਤੇਰੈ = ਤੇਰੇ ਘਰ ਵਿਚ।',
    },
    {
      id: '4N3D',
      src: 'ਘਰਿ ਤ ਤੇਰੈ. ਸਭੁ ਕਿਛੁ ਹੈ; ਜਿਸੁ ਦੇਹਿ ਸੁ ਪਾਵਏ ॥',
      pronunciation: 'ghar ta terē. sabh kich hē; jis deh sa pāwae ‖',
      translation:
        'Everything is in Your home; they receive, unto whom You give.',
      vicar:
        'ਤੇਰੇ ਘਰ ਵਿਚ ਤਾਂ ਹਰੇਕ ਚੀਜ਼ ਮੌਜੂਦ ਹੈ, ਉਹੀ ਮਨੁੱਖ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ ਜਿਸ ਨੂੰ ਤੂੰ ਆਪ ਦੇਂਦਾ ਹੈਂ। ਤ = ਤਾਂ। ਸਭੁ ਕਿਛੁ = ਹਰੇਕ ਚੀਜ਼। ਦੇਹਿ = ਤੂੰ ਦੇਂਦਾ ਹੈਂ। ਸੁ = ਉਹ ਮਨੁੱਖ। ਪਾਵਏ = ਪਾਵੈ, ਪਾ ਲੈਂਦਾ ਹੈ, ਹਾਸਲ ਕਰਦਾ ਹੈ।',
    },
    {
      id: 'XG9Y',
      src: 'ਸਦਾ ਸਿਫਤਿ ਸਲਾਹ ਤੇਰੀ; ਨਾਮੁ ਮਨਿ ਵਸਾਵਏ ॥',
      pronunciation: 'sadā siphat salāh terī; nām man wasāwae ‖',
      translation:
        'Constantly singing Your Praises and Glories, Your Name is enshrined in the mind.',
      vicar:
        '(ਫਿਰ, ਉਹ ਮਨੁੱਖ) ਤੇਰਾ ਨਾਮ ਤੇ ਤੇਰੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ (ਆਪਣੇ) ਮਨ ਵਿਚ ਵਸਾਂਦਾ ਹੈ (ਜਿਸ ਦੀ ਬਰਕਤਿ ਨਾਲ ਉਸ ਦੇ ਅੰਦਰ ਆਨੰਦ ਪੈਦਾ ਹੋ ਜਾਂਦਾ ਹੈ)। ਸਿਫਤਿ ਸਲਾਹ = ਵਡਿਆਈ। ਮਨਿ = ਮਨ ਵਿਚ। ਵਸਾਵਏ = ਵਸਾਵੈ, ਵਸਾਂਦਾ ਹੈ।',
    },
    {
      id: 'EWZF',
      src: 'ਨਾਮੁ ਜਿਨ ਕੈ ਮਨਿ ਵਸਿਆ; ਵਾਜੇ ਸਬਦ ਘਨੇਰੇ ॥',
      pronunciation: 'nām jin kē man wasiā; vāje sabad ghanere ‖',
      translation:
        'The divine melody of the Shabad vibrates for those, within whose minds the Naam abides.',
      vicar:
        'ਜਿਨ੍ਹਾਂ ਬੰਦਿਆਂ ਦੇ ਮਨ ਵਿਚ (ਤੇਰਾ) ਨਾਮ ਵੱਸਦਾ ਹੈ (ਉਹਨਾਂ ਦੇ ਅੰਦਰ, ਮਾਨੋ,) ਬੇਅੰਤ ਸਾਜ਼ਾਂ ਦੀਆਂ (ਮਿਲਵੀਆਂ) ਸੁਰਾਂ ਵੱਜਣ ਲੱਗ ਪੈਂਦੀਆਂ ਹਨ (ਭਾਵ, ਉਹਨਾਂ ਦੇ ਮਨ ਵਿਚ ਉਹ ਖ਼ੁਸ਼ੀ ਤੇ ਚਾਉ ਪੈਦਾ ਹੁੰਦਾ ਹੈ ਜੋ ਕਈ ਸਾਜ਼ਾਂ ਦਾ ਮਿਲਵਾਂ ਰਾਗ ਸੁਣ ਕੇ ਪੈਦਾ ਹੁੰਦਾ ਹੈ)। ਜਿਨ ਕੈ ਮਨਿ = ਜਿਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿਚ। ਵਾਜੇ = ਵੱਜਦੇ ਹਨ। ਸਬਦ = ਸਾਜਾਂ ਦੇ ਆਵਾਜ਼, ਰਾਗਾਂ ਦੀਆਂ ਸੁਰਾਂ। ਘਨੇਰੇ = ਬੇਅੰਤ।',
    },
    {
      id: 'KUUL',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੇ ਸਾਹਿਬ; ਕਿਆ ਨਾਹੀ. ਘਰਿ ਤੇਰੈ ॥੩॥',
      pronunciation: 'kahē nānaku. sace sāhib; kiā nāhī. ghar terē ‖3‖',
      translation:
        'Says Nanak, O my True Lord and Master, what is there which is not in Your home? ||3||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲੇ ਮਾਲਕ! ਤੇਰੇ ਘਰ ਵਿਚ ਕਿਸੇ ਸ਼ੈ ਦਾ ਘਾਟਾ ਨਹੀਂ ਹੈ (ਤੇ, ਮੈਂ ਤੇਰੇ ਦਰ ਤੋਂ ਆਨੰਦ ਦਾ ਦਾਨ ਮੰਗਦਾ ਹਾਂ) ॥੩॥ ਸਚੇ = ਹੇ ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲੇ! ॥੩॥',
    },
    {
      id: 'LRXJ',
      src: 'ਸਾਚਾ ਨਾਮੁ; ਮੇਰਾ ਆਧਾਰੋ ॥',
      pronunciation: 'sācā nāmu; merā ādhāro ‖',
      translation: 'The True Name is my only support.',
      vicar:
        '(ਪ੍ਰਭੂ ਦੀ ਮੇਹਰ ਨਾਲ ਉਸ ਦਾ) ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲਾ ਨਾਮ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਆਸਰਾ (ਬਣ ਗਿਆ) ਹੈ। ਆਧਾਰੋ = ਆਸਰਾ।',
    },
    {
      id: '176Q',
      src: 'ਸਾਚੁ ਨਾਮੁ ਅਧਾਰੁ ਮੇਰਾ; ਜਿਨਿ ਭੁਖਾ ਸਭਿ ਗਵਾਈਆ ॥',
      pronunciation: 'sāc nām adhār merā; jin bhukhā sabh gavāīā ‖',
      translation: 'The True Name is my only support; it satisfies all hunger.',
      vicar:
        'ਉਹ ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲਾ ਨਾਮ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਆਸਰਾ ਬਣ ਗਿਆ) ਹੈ, ਜਿਸ (ਹਰਿ-ਨਾਮ) ਨੇ ਮੇਰੇ ਸਾਰੇ ਲਾਲਚ ਦੂਰ ਕਰ ਦਿੱਤੇ ਹਨ। ਜਿਨਿ = ਜਿਸ (ਨਾਮ) ਨੇ। ਭੁਖ = ਲਾਲਚ।',
    },
    {
      id: '82EB',
      src: 'ਕਰਿ ਸਾਂਤਿ ਸੁਖ ਮਨਿ ਆਇ ਵਸਿਆ; ਜਿਨਿ ਇਛਾ ਸਭਿ ਪੁਜਾਈਆ ॥',
      pronunciation: 'kar sāñt sukh man āi wasiā; jin ichā sabh pujāīā ‖',
      translation:
        'It has brought peace and tranquility to my mind; it has fulfilled all my desires.',
      vicar:
        'ਜੋ ਹਰਿ-ਨਾਮ (ਮੇਰੇ ਅੰਦਰ) ਸ਼ਾਂਤੀ ਤੇ ਸੁਖ ਪੈਦਾ ਕਰਕੇ ਮੇਰੇ ਮਨ ਵਿਚ ਆ ਟਿਕਿਆ ਹੈ, ਜਿਸ (ਹਰਿ-ਨਾਮ) ਨੇ ਮੇਰੇ ਮਨ ਦੀਆਂ ਸਾਰੀਆਂ ਕਾਮਨਾਂ ਪੂਰੀਆਂ ਕਰ ਦਿੱਤੀਆਂ ਹਨ। ਕਰਿ = (ਪੈਦਾ) ਕਰ ਕੇ। ਮਨਿ = ਮਨ ਵਿਚ। ਇਛਾ = ਮਨ ਦੀਆਂ ਕਾਮਨਾਂ। ਸਭਿ = ਸਾਰੀਆਂ।',
    },
    {
      id: 'XMGJ',
      src: 'ਸਦਾ ਕੁਰਬਾਣੁ ਕੀਤਾ ਗੁਰੂ ਵਿਟਹੁ; ਜਿਸ ਦੀਆ ਏਹਿ ਵਡਿਆਈਆ ॥',
      pronunciation: 'sadā kurabāṇ kītā gurū viṭahu; jis dīā eh waḍiāīā ‖',
      translation:
        'I am forever a sacrifice to the Guru, who possesses such glorious greatness.',
      vicar:
        'ਮੈਂ (ਆਪਣੇ ਆਪ ਨੂੰ) ਆਪਣੇ ਗੁਰੂ ਤੋਂ ਸਦਕੇ ਕਰਦਾ ਹਾਂ, ਕਿਉਂਕਿ ਇਹ ਸਾਰੀਆਂ ਬਰਕਤਾਂ ਗੁਰੂ ਦੀਆਂ ਹੀ ਹਨ। ਕੁਰਬਾਣੁ = ਸਦਕੇ। ਵਿਟਹੁ = ਤੋਂ।',
    },
    {
      id: 'P8TM',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਸਬਦਿ ਧਰਹੁ ਪਿਆਰੋ ॥',
      pronunciation: 'kahē nānaku. suṇah sañtahu; sabad dharah piāro ‖',
      translation:
        'Says Nanak, listen, O Saints; enshrine love for the Shabad.',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਸੰਤ ਜਨੋ! (ਗੁਰੂ ਦਾ ਸ਼ਬਦ) ਸੁਣੋ, ਗੁਰੂ ਦੇ ਸ਼ਬਦ ਵਿਚ ਪਿਆਰ ਬਣਾਓ।',
    },
    {
      id: 'Q3P4',
      src: 'ਸਾਚਾ ਨਾਮੁ; ਮੇਰਾ ਆਧਾਰੋ ॥੪॥',
      pronunciation: 'sācā nāmu; merā ādhāro ‖4‖',
      translation: 'The True Name is my only support. ||4||',
      vicar:
        '(ਸਤਿਗੁਰੂ ਦੀ ਮੇਹਰ ਨਾਲ ਹੀ ਪ੍ਰਭੂ ਦਾ) ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲਾ ਨਾਮ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਆਸਰਾ (ਬਣ ਗਿਆ) ਹੈ ॥੪॥',
    },
    {
      id: 'QLZ5',
      src: 'ਵਾਜੇ ਪੰਚ ਸਬਦ; ਤਿਤੁ ਘਰਿ ਸਭਾਗੈ ॥',
      pronunciation: 'vāje pañc sabad; tit ghar sabhāgē ‖',
      translation:
        'The Panch Shabad, the five primal sounds, vibrate in that blessed house.',
      vicar:
        'ਉਸ ਭਾਗਾਂ ਵਾਲੇ (ਹਿਰਦੇ-) ਘਰ ਵਿਚ (ਮਾਨੋ) ਪੰਜ ਕਿਸਮਾਂ ਦੇ ਸਾਜ਼ਾਂ ਦੀਆਂ ਮਿਲਵੀਆਂ ਸੁਰਾਂ ਵੱਜ ਪੈਂਦੀਆਂ ਹਨ, ਵਾਜੇ = ਵੱਜਦੇ ਹਨ, ਵੱਜੇ ਹਨ। ਪੰਚ ਸਬਦ = ਪੰਜ ਕਿਸਮਾਂ ਦੇ ਸਾਜ਼ਾਂ ਦੀਆਂ ਮਿਲਵੀਆਂ ਸੁਰਾਂ। ਤਿਤੁ = ਉਸ ਵਿਚ। ਤਿਤੁ ਘਰਿ = ਉਸ ਹਿਰਦੇ-ਘਰਿ ਵਿਚ। ਸਭਾਗੈ = ਭਾਗਾਂ ਵਾਲੇ ਵਿਚ।',
    },
    {
      id: '4UD1',
      src: 'ਘਰਿ ਸਭਾਗੈ ਸਬਦ ਵਾਜੇ; ਕਲਾ ਜਿਤੁ ਘਰਿ ਧਾਰੀਆ ॥',
      pronunciation: 'ghar sabhāgē sabad vāje; kalā jit ghar dhārīā ‖',
      translation:
        'In that blessed house, the Shabad vibrates; He infuses His almighty power into it.',
      vicar:
        'ਜਿਸ (ਹਿਰਦੇ-) ਘਰ ਵਿਚ (ਹੇ ਪ੍ਰਭੂ! ਤੂੰ) ਸੱਤਿਆ ਪਾਈ ਹੈ, ਉਸ ਭਾਗਾਂ ਵਾਲੇ (ਹਿਰਦੇ-) ਘਰ ਵਿਚ (ਮਾਨੋ) ਪੰਜ ਕਿਸਮਾਂ ਦੇ ਸਾਜ਼ਾਂ ਦੀਆਂ ਮਿਲਵੀਆਂ ਸੁਰਾਂ ਵੱਜ ਪੈਂਦੀਆਂ ਹਨ (ਭਾਵ, ਉਸ ਹਿਰਦੇ ਵਿਚ ਪੂਰਨ ਆਨੰਦ ਬਣ ਜਾਂਦਾ ਹੈ), ਤਿਤੁ ਸਭਾਗੈ ਘਰਿ = ਉਸ ਭਾਗਾਂ ਵਾਲੇ (ਹਿਰਦੇ-) ਘਰ ਵਿਚ। ਕਲਾ = ਸੱਤਿਆ। ਜਿਤੁ ਘਰਿ = ਜਿਸ ਘਰ ਵਿਚ। ਧਾਰੀਆ = ਤੂੰ ਪਾਈ ਹੈ।',
    },
    {
      id: 'HBAQ',
      src: 'ਪੰਚ ਦੂਤ ਤੁਧੁ ਵਸਿ ਕੀਤੇ; ਕਾਲੁ ਕੰਟਕੁ ਮਾਰਿਆ ॥',
      pronunciation: 'pañc dūt tudh was kīte; kāl kañṭak māriā ‖',
      translation:
        'Through You, we subdue the five demons of desire, and slay Death, the torturer.',
      vicar:
        '(ਹੇ ਪ੍ਰਭੂ!) ਉਸ ਦੇ ਪੰਜੇ ਕਾਮਾਦਿਕ ਵੈਰੀ ਤੂੰ ਕਾਬੂ ਵਿਚ ਕਰ ਦੇਂਦਾ ਹੈਂ, ਤੇ ਡਰਾਣ ਵਾਲਾ ਕਾਲ (ਭਾਵ, ਮੌਤ ਦਾ ਡਰ) ਦੂਰ ਕਰ ਦੇਂਦਾ ਹੈਂ। ਪੰਚ ਦੂਤ = ਕਾਮਾਦਿਕ ਪੰਜ ਵੈਰੀ। ਕੰਟਕੁ = ਕੰਡਾ। ਕੰਟਕੁ ਕਾਲੁ = ਡਰਾਉਣਾ ਕਾਲ, ਮੌਤ ਦਾ ਡਰ।',
    },
    {
      id: '7859',
      src: 'ਧੁਰਿ ਕਰਮਿ ਪਾਇਆ ਤੁਧੁ. ਜਿਨ ਕਉ; ਸਿ. ਨਾਮਿ ਹਰਿ ਕੈ ਲਾਗੇ ॥',
      pronunciation: 'dhur karam pāiā tudhu. jin kau; si. nām har kē lāge ‖',
      translation:
        "Those who have such pre-ordained destiny are attached to the Lord's Name.",
      vicar:
        'ਪਰ ਸਿਰਫ਼ ਉਹੀ ਮਨੁੱਖ ਹਰਿ-ਨਾਮ ਵਿਚ ਜੁੜਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਦੇ ਭਾਗਾਂ ਵਿਚ ਤੂੰ ਧੁਰ ਤੋਂ ਹੀ ਆਪਣੀ ਮੇਹਰ ਨਾਲ (ਸਿਮਰਨ ਦਾ ਲੇਖ ਲਿਖ ਕੇ) ਰੱਖ ਦਿੱਤਾ ਹੈ। ਧੁਰਿ = ਧੁਰ ਤੋਂ। ਕਰਮਿ = ਮੇਹਰ ਨਾਲ। ਸਿ = ਸੇ, ਉਹ ਬੰਦੇ। ਨਾਮਿ = ਨਾਮ ਵਿਚ।',
    },
    {
      id: '4RHQ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਤਹ ਸੁਖੁ ਹੋਆ; ਤਿਤੁ ਘਰਿ ਅਨਹਦ ਵਾਜੇ ॥੫॥',
      pronunciation: 'kahē nānaku. tah sukh hoā; tit ghar anahad vāje ‖5‖',
      translation:
        'Says Nanak, they are at peace, and the unstruck sound current vibrates within their homes. ||5||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਉਸ ਹਿਰਦੇ-ਘਰ ਵਿਚ ਸੁਖ ਪੈਦਾ ਹੁੰਦਾ ਹੈ, ਉਸ ਹਿਰਦੇ ਵਿਚ (ਮਾਨੋ) ਇਕ-ਰਸ (ਵਾਜੇ) ਵੱਜਦੇ ਹਨ ॥੫॥ ਅਨਹਦ = ਅਨ-ਹਦ, ਬਿਨਾ ਵਜਾਏ ਵੱਜਣ ਵਾਲੇ, ਇਕ-ਰਸ, ਲਗਾਤਾਰ ॥੫॥',
    },
    {
      id: '0225',
      src: 'ਸਾਚੀ ਲਿਵੈ ਬਿਨੁ; ਦੇਹ ਨਿਮਾਣੀ ॥',
      pronunciation: 'sācī livē binu; deh nimāṇī ‖',
      translation:
        'Without the true love of devotion, the body is without honor.',
      vicar:
        'ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਦੇ ਚਰਨਾਂ ਦੀ ਲਗਨ (ਦੇ ਆਨੰਦ) ਤੋਂ ਬਿਨਾ ਇਹ (ਮਨੁੱਖਾ) ਸਰੀਰ ਨਿਆਸਰਾ ਜੇਹਾ ਹੀ ਰਹਿੰਦਾ ਹੈ। ਸਾਚੀ ਲਿਵ = ਸੱਚੀ ਲਗਨ, ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲੀ ਲਗਨ, ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਨਾਲ ਪ੍ਰੀਤ। ਦੇਹ = ਸਰੀਰ। ਨਿਮਾਣੀ = ਨਿਆਸਰੀ ਜੇਹੀ, ਹੌਲੇ ਮੇਲ ਦੀ।',
    },
    {
      id: 'F8JR',
      src: 'ਦੇਹ ਨਿਮਾਣੀ. ਲਿਵੈ ਬਾਝਹੁ; ਕਿਆ ਕਰੇ ਵੇਚਾਰੀਆ ॥',
      pronunciation: 'deh nimāṇī. livē bājhahu; kiā kare vecārīā ‖',
      translation:
        'The body is dishonored without devotional love; what can the poor wretches do?',
      vicar:
        'ਪ੍ਰਭੂ-ਚਰਨਾਂ ਦੀ ਪ੍ਰੀਤ ਤੋਂ ਬਿਨਾ ਨਿਆਸਰਾ ਹੋਇਆ ਹੋਇਆ ਇਹ ਸਰੀਰ ਜੋ ਕੁਝ ਭੀ ਕਰਦਾ ਹੈ ਨਕਾਰੇ ਕੰਮ ਹੀ ਕਰਦਾ ਹੈ। ਕਿਆ ਕਰੇ = ਕੀਹ ਕਰਦੀ ਹੈ? ਜੋ ਕੁਝ ਕਰਦੀ ਹੈ ਨਕਾਰੇ ਕੰਮ ਹੀ ਕਰਦੀ ਹੈ।',
    },
    {
      id: '224E',
      src: 'ਤੁਧੁ ਬਾਝੁ ਸਮਰਥ. ਕੋਇ ਨਾਹੀ; ਕ੍ਰਿਪਾ ਕਰਿ ਬਨਵਾਰੀਆ ॥',
      pronunciation: 'tudh bājh samarath. koi nāhī; kripā kar banavārīā ‖',
      translation:
        'No one except You is all-powerful; please bestow Your Mercy, O Lord of all nature.',
      vicar:
        'ਹੇ ਜਗਤ ਦੇ ਮਾਲਕ! ਤੂੰ ਹੀ ਕਿਰਪਾ ਕਰ! (ਤਾ ਕਿ ਇਹ ਗੁਰੂ ਦੇ ਸ਼ਬਦ ਵਿਚ ਲੱਗ ਕੇ ਸੁਧਰ ਜਾਏ) ਕੋਈ ਹੋਰ ਇਸ ਨੂੰ ਸੁਚੱਜੇ ਪਾਸੇ ਲਾਣ ਜੋਗਾ ਹੀ ਨਹੀਂ। ਬਨਵਾਰੀ = ਹੇ ਜਗਤ-ਵਾੜੀ ਦੇ ਮਾਲਕ!',
    },
    {
      id: 'TJQN',
      src: 'ਏਸ ਨਉ. ਹੋਰੁ ਥਾਉ ਨਾਹੀ; ਸਬਦਿ ਲਾਗਿ ਸਵਾਰੀਆ ॥',
      pronunciation: 'es nau. hor thāu nāhī; sabad lāg savārīā ‖',
      translation:
        'There is no place of rest, other than the Name; attached to the Shabad, we are embellished with beauty.',
      vicar:
        'ਤੈਥੋਂ ਬਿਨਾ ਕੋਈ ਹੋਰ ਥਾਂ ਨਹੀਂ ਜਿਥੇ ਇਹ ਸਰੀਰ ਸੁਚੱਜੇ ਪਾਸੇ ਲੱਗ ਸਕੇ। (ਤੇਰੀ ਕ੍ਰਿਪਾ ਨਾਲ ਹੀ) ਇਹ ਗੁਰੂ ਦੇ ਸ਼ਬਦ ਵਿਚ ਲੱਗ ਕੇ ਸੁਧਰ ਸਕਦਾ ਹੈ। ਸਵਾਰੀਆ = ਸੁਚੱਜੇ ਪਾਸੇ ਲਾਈ ਜਾ ਸਕਦੀ ਹੈ।',
    },
    {
      id: 'JUXQ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਲਿਵੈ ਬਾਝਹੁ; ਕਿਆ ਕਰੇ ਵੇਚਾਰੀਆ ॥੬॥',
      pronunciation: 'kahē nānaku. livē bājhahu; kiā kare vecārīā ‖6‖',
      translation:
        'Says Nanak, without devotional love, what can the poor wretches do? ||6||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਦੀ ਪ੍ਰੀਤ ਤੋਂ ਬਿਨਾ ਇਹ ਸਰੀਰ ਪਰ-ਅਧੀਨ (ਭਾਵ, ਮਾਇਆ ਦੇ ਪ੍ਰਭਾਵ ਹੇਠ) ਹੈ ਤੇ ਜੋ ਕੁਝ ਕਰਦਾ ਹੈ ਨਿਕੰਮਾ ਕੰਮ ਹੀ ਕਰਦਾ ਹੈ ॥੬॥ ਵੇਚਾਰੀਆ = ਪਰ-ਅਧੀਨ, ਨਿਮਾਣੀ ਜਿਹੀ, ਮਾਇਆ ਦੇ ਪ੍ਰਭਾਵ ਹੇਠ ॥੬॥',
    },
    {
      id: 'ZDQR',
      src: 'ਆਨੰਦੁ ਆਨੰਦੁ ਸਭੁ ਕੋ ਕਹੈ; ਆਨੰਦੁ ਗੁਰੂ ਤੇ ਜਾਣਿਆ ॥',
      pronunciation: 'ānañd ānañd sabh ko kahē; ānañd gurū te jāṇiā ‖',
      translation:
        'Bliss, bliss - everyone talks of bliss; bliss is known only through the Guru.',
      vicar:
        'ਆਖਣ ਨੂੰ ਤਾਂ ਹਰ ਕੋਈ ਆਖ ਦੇਂਦਾ ਹੈ ਕਿ ਮੈਨੂੰ ਆਨੰਦ ਪ੍ਰਾਪਤ ਹੋ ਗਿਆ ਹੈ, ਪਰ (ਅਸਲ) ਆਨੰਦ ਦੀ ਸੂਝ ਗੁਰੂ ਤੋਂ ਹੀ ਮਿਲਦੀ ਹੈ। ਸਭੁ ਕੋ = ਹਰੇਕ ਜੀਵ।',
    },
    {
      id: 'SCHK',
      src: 'ਜਾਣਿਆ ਆਨੰਦੁ ਸਦਾ ਗੁਰ ਤੇ; ਕ੍ਰਿਪਾ ਕਰੇ ਪਿਆਰਿਆ ॥',
      pronunciation: 'jāṇiā ānañd sadā gur te; kripā kare piāriā ‖',
      translation:
        'Eternal bliss in known only through the Guru, when the Beloved Lord grants His Grace.',
      vicar:
        'ਹੇ ਪਿਆਰੇ ਭਾਈ! (ਅਸਲ) ਆਨੰਦ ਦੀ ਸੂਝ ਸਦਾ ਗੁਰੂ ਤੋਂ ਹੀ ਮਿਲਦੀ ਹੈ। (ਉਹ ਮਨੁੱਖ ਅਸਲ ਆਨੰਦ ਨਾਲ ਸਾਂਝ ਪਾਂਦਾ ਹੈ, ਜਿਸ ਉਤੇ ਗੁਰੂ) ਕਿਰਪਾ ਕਰਦਾ ਹੈ। ਪਿਆਰਿਆ = ਹੇ ਪਿਆਰੇ ਭਾਈ! ਕ੍ਰਿਪਾ ਕਰੇ = ਜਦੋਂ ਗੁਰੂ ਕਿਰਪਾ ਕਰਦਾ ਹੈ।',
    },
    {
      id: 'R29X',
      src: 'ਕਰਿ ਕਿਰਪਾ ਕਿਲਵਿਖ ਕਟੇ; ਗਿਆਨ ਅੰਜਨੁ ਸਾਰਿਆ ॥',
      pronunciation: 'kar kirapā kilavikh kaṭe; giān añjan sāriā ‖',
      translation:
        'Granting His Grace, He cuts away our sins; He blesses us with the healing ointment of spiritual wisdom.',
      vicar:
        'ਗੁਰੂ ਮੇਹਰ ਕਰ ਕੇ (ਉਸ ਦੇ) (ਅੰਦਰੋਂ) ਪਾਪ ਕੱਟ ਦੇਂਦਾ ਹੈ, ਤੇ (ਉਸ ਦੀਆਂ ਵਿਚਾਰ-ਅੱਖਾਂ ਵਿਚ) ਆਤਮਕ ਜੀਵਨ ਦੀ ਸੂਝ ਦਾ ਸੁਰਮਾ ਪਾਂਦਾ ਹੈ। ਕਿਲਵਿਖ = ਪਾਪ। ਅੰਜਨੁ = ਸੁਰਮਾ। ਸਾਰਿਆ = (ਅੱਖਾਂ ਵਿਚ) ਪਾਂਦਾ ਹੈ।',
    },
    {
      id: 'CU3H',
      src: 'ਅੰਦਰਹੁ ਜਿਨ ਕਾ ਮੋਹੁ ਤੁਟਾ; ਤਿਨ ਕਾ ਸਬਦੁ ਸਚੈ ਸਵਾਰਿਆ ॥',
      pronunciation: 'añdarah jin kā moh tuṭā; tin kā sabad sacē savāriā ‖',
      translation:
        'Those who eradicate attachment from within themselves, are adorned with the Shabad, the Word of the True Lord.',
      vicar:
        'ਜਿਨ੍ਹਾਂ ਮਨੁੱਖਾਂ ਦੇ ਮਨ ਵਿਚੋਂ ਮਾਇਆ ਦਾ ਮੋਹ ਮੁੱਕ ਜਾਂਦਾ ਹੈ, ਅਕਾਲ ਪੁਰਖ ਉਹਨਾਂ ਦਾ ਬੋਲ ਹੀ ਸੁਚੱਜਾ ਮਿੱਠਾ ਕਰ ਦੇਂਦਾ ਹੈ। ਅੰਦਰਹੁ = ਮਨ ਵਿਚੋਂ। ਸਚੈ = ਸਦਾ-ਥਿਰ (ਪਰਮਾਤਮਾ) ਨੇ। ਸਬਦੁ = ਬੋਲ। ਸਬਦੁ ਸਵਾਰਿਆ = ਬੋਲ ਸਵਾਰ ਦਿੱਤਾ (ਭਾਵ, ਖਰ੍ਹਵੇ ਬੋਲ ਨਿੰਦਾ ਆਦਿਕ ਦੇ ਬੋਲ ਨਹੀਂ ਬੋਲਦਾ)।',
    },
    {
      id: 'G2W5',
      src: 'ਕਹੈ; ਨਾਨਕੁ. ਏਹੁ ਅਨੰਦੁ ਹੈ; ਆਨੰਦੁ ਗੁਰ ਤੇ ਜਾਣਿਆ ॥੭॥',
      pronunciation: 'kahē; nānaku. eh anañd hē; ānañd gur te jāṇiā ‖7‖',
      translation:
        'Says Nanak, this alone is bliss - bliss which is known through the Guru. ||7||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਅਸਲ ਆਨੰਦ ਇਹੀ ਹੈ, ਤੇ ਇਹ ਆਨੰਦ ਗੁਰੂ ਤੋਂ ਹੀ ਸਮਝਿਆ ਜਾ ਸਕਦਾ ਹੈ ॥੭॥ ਏਹੁ ਅਨੰਦੁ ਹੈ = ਅਸਲ ਆਤਮਕ ਆਨੰਦ ਇਹ ਹੈ (ਕਿ ਮਨੁੱਖ ਦਾ ਖਰ੍ਹਵਾ ਤੇ ਨਿੰਦਾ ਆਦਿਕ ਵਾਲਾ ਸੁਭਾਉ ਹੀ ਨਹੀਂ ਰਹਿੰਦਾ) ॥੭॥',
    },
    {
      id: 'ZVK9',
      src: 'ਬਾਬਾ. ਜਿਸੁ ਤੂ ਦੇਹਿ; ਸੋਈ ਜਨੁ ਪਾਵੈ ॥',
      pronunciation: 'bābā. jis tū dehi; soī jan pāvē ‖',
      translation: 'O Baba, he alone receives it, unto whom You give it.',
      vicar:
        'ਹੇ ਪ੍ਰਭੂ! ਜਿਸ ਮਨੁੱਖ ਨੂੰ ਤੂੰ (ਆਤਮਕ ਆਨੰਦ ਦੀ ਦਾਤਿ) ਦੇਂਦਾ ਹੈਂ ਉਹ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ। ਬਾਬਾ = ਹੇ ਹਰੀ! ਦੇਹਿ = (ਆਨੰਦ ਦੀ ਦਾਤਿ) ਦੇਂਦਾ ਹੈਂ।',
    },
    {
      id: 'NVTD',
      src: 'ਪਾਵੈ ਤ ਸੋ ਜਨੁ. ਦੇਹਿ ਜਿਸ ਨੋ; ਹੋਰਿ ਕਿਆ ਕਰਹਿ ਵੇਚਾਰਿਆ ॥',
      pronunciation: 'pāvē ta so janu. deh jis no; hor kiā karah vecāriā ‖',
      translation:
        'He alone receives it, unto whom You give it; what can the other poor wretched beings do?',
      vicar:
        'ਉਹੀ ਮਨੁੱਖ (ਇਸ ਦਾਤ ਨੂੰ) ਮਾਣਦਾ ਹੈ ਜਿਸ ਨੂੰ ਤੂੰ ਦਿੰਦਾ ਹੈਂ, ਹੋਰਨਾਂ ਵਿਚਾਰਿਆਂ ਦੀ (ਮਾਇਆ ਦੇ ਹੜ੍ਹ ਅੱਗੇ) ਕੋਈ ਪੇਸ਼ ਨਹੀਂ ਜਾਂਦੀ। ਹੋਰਿ ਵੇਚਾਰਿਆ = ਹੋਰ ਵਿਚਾਰੇ ਜੀਵ। ਕਿਆ ਕਰਹਿ = ਕੀਹ ਕਰ ਸਕਦੇ ਹਨ? ਮਾਇਆ ਅੱਗੇ ਉਹਨਾਂ ਦੀ ਪੇਸ਼ ਨਹੀਂ ਜਾਂਦੀ।',
    },
    {
      id: 'TK51',
      src: 'ਇਕਿ ਭਰਮਿ ਭੂਲੇ. ਫਿਰਹਿ ਦਹ ਦਿਸਿ; ਇਕਿ. ਨਾਮਿ ਲਾਗਿ ਸਵਾਰਿਆ ॥',
      pronunciation: 'ik bharam bhūle. phirah dah disi; iki. nām lāg savāriā ‖',
      translation:
        'Some are deluded by doubt, wandering in the ten directions; some are adorned with attachment to the Naam.',
      vicar:
        'ਕਈ ਬੰਦੇ (ਮਾਇਆ ਦੀ) ਭਟਕਣਾ ਵਿਚ (ਅਸਲ ਰਸਤੇ ਤੋਂ) ਭੁੱਲੇ ਹੋਏ ਦਸੀਂ ਪਾਸੀਂ ਦੌੜਦੇ ਫਿਰਦੇ ਹਨ, ਕਈ (ਭਾਗਾਂ ਵਾਲਿਆਂ ਨੂੰ) ਤੂੰ ਆਪਣੇ ਨਾਮ ਵਿਚ ਜੋੜ ਕੇ (ਉਹਨਾਂ ਦਾ ਜਨਮ) ਸਵਾਰ ਦੇਂਦਾ ਹੈਂ। ਇਕਿ = ਕਈ ਜੀਵ। ਭਰਮਿ = (ਮਾਇਆ ਦੀ) ਭਟਕਣਾ ਵਿਚ। ਦਹਦਿਸਿ = ਦਸੀਂ ਪਾਸੀਂ।',
    },
    {
      id: 'BCFP',
      src: 'ਗੁਰ ਪਰਸਾਦੀ. ਮਨੁ ਭਇਆ ਨਿਰਮਲੁ; ਜਿਨਾ ਭਾਣਾ ਭਾਵਏ ॥',
      pronunciation: 'gur parasādī. man bhaiā niramalu; jinā bhāṇā bhāwae ‖',
      translation:
        "By Guru's Grace, the mind becomes immaculate and pure, for those who follow God's Will.",
      vicar:
        '(ਇਸ ਤਰ੍ਹਾਂ ਤੇਰੀ ਮੇਹਰ ਨਾਲ) ਜਿਨ੍ਹਾਂ ਨੂੰ ਤੇਰੀ ਰਜ਼ਾ ਪਿਆਰੀ ਲੱਗਣ ਲੱਗ ਪੈਂਦੀ ਹੈ, ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਉਹਨਾਂ ਦਾ ਮਨ ਪਵਿਤ੍ਰ ਹੋ ਜਾਂਦਾ ਹੈ (ਤੇ ਉਹ ਆਤਮਕ ਆਨੰਦ ਮਾਣਦੇ ਹਨ, ਭਾਣਾ = ਰਜ਼ਾ।',
    },
    {
      id: 'DW95',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਸੁ ਦੇਹਿ ਪਿਆਰੇ; ਸੋਈ ਜਨੁ ਪਾਵਏ ॥੮॥',
      pronunciation: 'kahē nānaku. jis deh piāre; soī jan pāwae ‖8‖',
      translation:
        'Says Nanak, he alone receives it, unto whom You give it, O Beloved Lord. ||8||',
      vicar:
        '(ਪਰ) ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਹੇ ਪ੍ਰਭੂ!) ਜਿਸ ਨੂੰ ਤੂੰ (ਆਤਮਕ ਆਨੰਦ ਦੀ ਦਾਤਿ) ਬਖ਼ਸ਼ਦਾ ਹੈਂ ਉਹੀ ਇਸ ਨੂੰ ਮਾਣ ਸਕਦਾ ਹੈ ॥੮॥',
    },
    {
      id: '05E5',
      src: 'ਆਵਹੁ ਸੰਤ ਪਿਆਰਿਹੋ; ਅਕਥ ਕੀ ਕਰਹ ਕਹਾਣੀ ॥',
      pronunciation: 'āwah sañt piāriho; akath kī karah kahāṇī ‖',
      translation:
        'Come, Beloved Saints, let us speak the Unspoken Speech of the Lord.',
      vicar:
        'ਹੇ ਪਿਆਰੇ ਸੰਤ ਜਨੋ! ਆਓ, ਅਸੀਂ (ਰਲ ਕੇ) ਬੇਅੰਤ ਗੁਣਾਂ ਵਾਲੇ ਪਰਮਾਤਮਾ ਦੀਆਂ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀਆਂ ਗੱਲਾਂ ਕਰੀਏ, ਅਕਥ = ਜਿਸ ਦੇ ਸਾਰੇ ਗੁਣ ਬਿਆਨ ਨ ਕੀਤੇ ਜਾ ਸਕਣ।',
    },
    {
      id: 'FU61',
      src: 'ਕਰਹ ਕਹਾਣੀ ਅਕਥ ਕੇਰੀ; ਕਿਤੁ ਦੁਆਰੈ ਪਾਈਐ ॥',
      pronunciation: 'karah kahāṇī akath kerī; kit duārē pāīē ‖',
      translation:
        'How can we speak the Unspoken Speech of the Lord? Through which door will we find Him?',
      vicar:
        'ਉਸ ਪ੍ਰਭੂ ਦੀਆਂ ਕਹਾਣੀਆਂ ਸੁਣੀਏ ਸੁਣਾਈਏ ਜਿਸ ਦੇ ਗੁਣ ਬਿਆਨ ਤੋਂ ਪਰੇ ਹਨ। (ਪਰ ਜੇ ਤੁਸੀ ਪੁੱਛੋ ਕਿ) ਉਹ ਪ੍ਰਭੂ ਕਿਸ ਤਰੀਕੇ ਨਾਲ ਮਿਲਦਾ ਹੈ? ਕਰਹ = ਅਸੀਂ ਕਰੀਏ। ਕਿਤੁ ਦੁਆਰੈ = ਕਿਸ ਵਸੀਲੇ ਨਾਲ? ਕੇਰੀ = ਦੀ',
    },
    {
      id: '3GVV',
      src: 'ਤਨੁ ਮਨੁ ਧਨੁ ਸਭੁ. ਸਉਪਿ ਗੁਰ ਕਉ; ਹੁਕਮਿ ਮੰਨਿਐ ਪਾਈਐ ॥',
      pronunciation: 'tan man dhan sabhu. saup gur kau; hukam mañniē pāīē ‖',
      translation:
        'Surrender body, mind, wealth, and everything to the Guru; obey the Order of His Will, and you will find Him.',
      vicar:
        '(ਤਾਂ ਉੱਤਰ ਇਹ ਹੈ ਕਿ ਆਪਣਾ ਆਪ ਮਾਇਆ ਦੇ ਹਵਾਲੇ ਕਰਨ ਦੇ ਥਾਂ) ਆਪਣਾ ਤਨ ਮਨ ਧਨ ਸਭ ਕੁਝ ਗੁਰੂ ਦੇ ਹਵਾਲੇ ਕਰੋ (ਇਸ ਤਰ੍ਹਾਂ) ਜੇ ਗੁਰੂ ਦਾ ਹੁਕਮ ਮਿੱਠਾ ਲੱਗਣ ਲੱਗ ਪਏ ਤਾਂ ਪਰਮਾਤਮਾ ਮਿਲ ਪੈਂਦਾ ਹੈ। ਸਉਪਿ = ਹਵਾਲੇ ਕਰ ਦਿਹੁ। ਹੁਕਮਿ ਮੰਨਿਐ = ਜੇ (ਪ੍ਰਭੂ ਦਾ) ਹੁਕਮ (ਸਿਰ ਮੱਥੇ ਤੇ) ਮੰਨ ਲਿਆ ਜਾਏ।',
    },
    {
      id: '2TCU',
      src: 'ਹੁਕਮੁ ਮੰਨਿਹੁ ਗੁਰੂ ਕੇਰਾ; ਗਾਵਹੁ ਸਚੀ ਬਾਣੀ ॥',
      pronunciation: 'hukam mañnih gurū kerā; gāwah sacī bāṇī ‖',
      translation:
        "Obey the Hukam of the Guru's Command, and sing the True Word of His Bani.",
      vicar:
        '(ਸੋ, ਸੰਤ ਜਨੋ!) ਗੁਰੂ ਦੇ ਹੁਕਮ ਉੱਤੇ ਤੁਰੋ ਤੇ ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲੇ ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਗਾਇਆ ਕਰੋ। ਕੇਰਾ = ਦਾ।',
    },
    {
      id: 'QDB5',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਕਥਿਹੁ. ਅਕਥ ਕਹਾਣੀ ॥੯॥',
      pronunciation: 'kahē nānaku. suṇah sañtahu; kathihu. akath kahāṇī ‖9‖',
      translation:
        'Says Nanak, listen, O Saints, and speak the Unspoken Speech of the Lord. ||9||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਸੰਤ ਜਨੋ ਸੁਣੋ, (ਉਸ ਨੂੰ ਮਿਲਣ ਦਾ ਅਤੇ ਆਤਮਕ ਆਨੰਦ ਮਾਣਨ ਦਾ ਸਹੀ ਰਸਤਾ ਇਹੀ ਹੈ ਕਿ) ਉਸ ਅਕੱਥ ਪ੍ਰਭੂ ਦੀਆਂ ਕਹਾਣੀਆਂ ਕਰਿਆ ਕਰੋ ॥੯॥',
    },
    {
      id: 'JN46',
      src: 'ਏ ਮਨ ਚੰਚਲਾ; ਚਤੁਰਾਈ ਕਿਨੈ. ਨ ਪਾਇਆ ॥',
      pronunciation: 'e man cañcalā; caturāī kinē. na pāiā ‖',
      translation:
        'O fickle mind, through cleverness, no one has found the Lord.',
      vicar:
        'ਹੇ ਚੰਚਲ ਮਨ! ਚਲਾਕੀਆਂ ਨਾਲ ਕਿਸੇ ਨੇ ਭੀ (ਆਤਮਕ ਆਨੰਦ) ਹਾਸਲ ਨਹੀਂ ਕੀਤਾ। ਕਿਨੈ = ਕਿਸੇ ਮਨੁੱਖ ਨੇ ਭੀ।',
    },
    {
      id: '3LD3',
      src: 'ਚਤੁਰਾਈ. ਨ ਪਾਇਆ ਕਿਨੈ; ਤੂ ਸੁਣਿ ਮੰਨ ਮੇਰਿਆ ॥',
      pronunciation: 'caturāī. na pāiā kinē; tū suṇ mañn meriā ‖',
      translation:
        'Through cleverness, no one has found Him; listen, O my mind.',
      vicar:
        "ਹੇ ਮੇਰੇ ਮਨ! ਤੂੰ (ਧਿਆਨ ਨਾਲ) ਸੁਣ ਲੈ ਕਿ ਕਿਸੇ ਜੀਵ ਨੇ ਭੀ ਚਤੁਰਾਈ ਨਾਲ (ਪਰਮਾਤਮਾ ਦੇ ਮਿਲਾਪ ਦਾ ਆਨੰਦ) ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤਾ। ਮੰਨ ਮੇਰਿਆ = ਹੇ ਮੇਰੇ ਮਨ! {ਲਫ਼ਜ਼ 'ਮੰਨ' ਦੀ (ੰ) ਇਕ ਮਾਤ੍ਰਾ ਵਧਾਣ ਵਾਸਤੇ ਹੀ ਹੈ, ਅਸਲ ਲਫ਼ਜ਼ 'ਮਨ' ਹੀ ਹੈ}।",
    },
    {
      id: '27NL',
      src: 'ਏਹ ਮਾਇਆ ਮੋਹਣੀ; ਜਿਨਿ ਏਤੁ ਭਰਮਿ ਭੁਲਾਇਆ ॥',
      pronunciation: 'eh māiā mohaṇī; jin et bharam bhulāiā ‖',
      translation:
        'This Maya is so fascinating; because of it, people wander in doubt.',
      vicar:
        '(ਅੰਦਰੋਂ ਮੋਹਣੀ ਮਾਇਆ ਵਿਚ ਭੀ ਫਸਿਆ ਰਹੇ, ਤੇ, ਬਾਹਰੋਂ ਨਿਰੀਆਂ ਗੱਲਾਂ ਨਾਲ ਆਤਮਕ ਆਨੰਦ ਚਾਹੇ, ਇਹ ਨਹੀਂ ਹੋ ਸਕਦਾ)। ਇਹ ਮਾਇਆ ਜੀਵਾਂ ਨੂੰ ਆਪਣੇ ਮੋਹ ਵਿਚ ਫਸਾਣ ਲਈ ਬੜੀ ਡਾਢੀ ਹੈ, ਇਸ ਨੇ ਇਸ ਭੁਲੇਖੇ ਵਿਚ ਪਾਇਆ ਹੋਇਆ ਹੈ ਕਿ ਮੋਹ ਮਿੱਠੀ ਚੀਜ਼ ਹੈ, ਇਸ ਤਰ੍ਹਾਂ ਕੁਰਾਹੇ ਪਾਈ ਰੱਖਦੀ ਹੈ। ਜਿਨਿ = ਜਿਸ (ਮਾਇਆ) ਨੇ। ਏਤੁ ਭਰਮਿ = ਇਸ ਭੁਲੇਖੇ ਵਿਚ ਕਿ ਮੋਹ ਇਕ ਮਿੱਠੀ ਚੀਜ਼ ਹੈ। ਭੁਲਾਇਆ = ਕੁਰਾਹੇ ਪਾ ਦਿੱਤਾ।',
    },
    {
      id: 'S5RG',
      src: 'ਮਾਇਆ ਤ ਮੋਹਣੀ ਤਿਨੈ ਕੀਤੀ; ਜਿਨਿ ਠਗਉਲੀ ਪਾਈਆ ॥',
      pronunciation: 'māiā ta mohaṇī tinē kītī; jin ṭhagaulī pāīā ‖',
      translation:
        'This fascinating Maya was created by the One who has administered this potion.',
      vicar:
        '(ਪਰ ਜੀਵ ਦੇ ਭੀ ਕੀਹ ਵੱਸ?) ਜਿਸ ਪ੍ਰਭੂ ਨੇ ਮਾਇਆ ਦੇ ਮੋਹ ਦੀ ਠਗਬੂਟੀ (ਜੀਵਾਂ ਨੂੰ) ਚੰਬੋੜੀ ਹੈ ਉਸੇ ਨੇ ਇਹ ਮੋਹਣੀ ਮਾਇਆ ਪੈਦਾ ਕੀਤੀ ਹੈ। ਤਿਨੈ = ਉਸੇ (ਪ੍ਰਭੂ) ਨੇ। ਜਿਨਿ = ਜਿਸ (ਪ੍ਰਭੂ) ਨੇ। ਠਗਉਲੀ = ਠਗ-ਬੂਟੀ।',
    },
    {
      id: 'DKG7',
      src: 'ਕੁਰਬਾਣੁ ਕੀਤਾ ਤਿਸੈ ਵਿਟਹੁ; ਜਿਨਿ ਮੋਹੁ ਮੀਠਾ ਲਾਇਆ ॥',
      pronunciation: 'kurabāṇ kītā tisē viṭahu; jin moh mīṭhā lāiā ‖',
      translation:
        'I am a sacrifice to the One who has made emotional attachment sweet.',
      vicar:
        '(ਸੋ, ਹੇ ਮੇਰੇ ਮਨ! ਆਪਣੇ ਆਪ ਨੂੰ ਮਾਇਆ ਤੋਂ ਸਦਕੇ ਕਰਨ ਦੇ ਥਾਂ) ਉਸ ਪ੍ਰਭੂ ਤੋਂ ਹੀ ਸਦਕੇ ਕਰੋ ਜਿਸ ਨੇ ਮਿੱਠਾ ਮੋਹ ਲਾਇਆ ਹੈ (ਤਦੋਂ ਹੀ ਇਹ ਮਿੱਠਾ ਮੋਹ ਮੁੱਕਦਾ ਹੈ)। ਕੁਰਬਾਣੁ = ਸਦਕੇ, ਵਾਰਨੇ। ਵਿਟਹੁ = ਤੋਂ।',
    },
    {
      id: 'UW8N',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਮਨ ਚੰਚਲ; ਚਤੁਰਾਈ ਕਿਨੈ. ਨ ਪਾਇਆ ॥੧੦॥',
      pronunciation: 'kahē nānaku. man cañcal; caturāī kinē. na pāiā ‖10‖',
      translation:
        'Says Nanak, O fickle mind, no one has found Him through cleverness. ||10||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ (ਮੇਰੇ) ਚੰਚਲ ਮਨ! ਚਤੁਰਾਈਆਂ ਨਾਲ ਕਿਸੇ ਨੇ (ਪਰਮਾਤਮਾ ਦੇ ਮਿਲਾਪ ਦਾ ਆਤਮਕ ਆਨੰਦ) ਨਹੀਂ ਲੱਭਾ ॥੧੦॥',
    },
    {
      id: 'HLNA',
      src: 'ਏ ਮਨ ਪਿਆਰਿਆ; ਤੂ ਸਦਾ ਸਚੁ ਸਮਾਲੇ ॥',
      pronunciation: 'e man piāriā; tū sadā sac samāle ‖',
      translation: 'O beloved mind, contemplate the True Lord forever.',
      vicar:
        'ਹੇ ਪਿਆਰੇ ਮਨ! (ਜੇ ਤੂੰ ਸਦਾ ਦਾ ਆਤਮਕ ਆਨੰਦ ਲੋੜਦਾ ਹੈਂ ਤਾਂ) ਸਦਾ ਸੱਚੇ ਪ੍ਰਭੂ ਨੂੰ (ਆਪਣੇ ਅੰਦਰ) ਸੰਭਾਲ ਰੱਖ! ਸਮਾਲੇ = ਸਮਾਲਿ, ਚੇਤੇ ਰੱਖ।',
    },
    {
      id: 'DER9',
      src: 'ਏਹੁ ਕੁਟੰਬੁ. ਤੂ ਜਿ ਦੇਖਦਾ; ਚਲੈ ਨਾਹੀ. ਤੇਰੈ ਨਾਲੇ ॥',
      pronunciation: 'eh kuṭañbu. tū ja dekhadā; calē nāhī. terē nāle ‖',
      translation: 'This family which you see shall not go along with you.',
      vicar:
        'ਇਹ ਜੇਹੜਾ ਪਰਵਾਰ ਤੂੰ ਵੇਖਦਾ ਹੈਂ, ਇਸ ਨੇ ਤੇਰੇ ਨਾਲ ਨਹੀਂ ਨਿਭਣਾ। ਜਿ = ਜੇਹੜਾ।',
    },
    {
      id: 'F6T1',
      src: 'ਸਾਥਿ ਤੇਰੈ. ਚਲੈ ਨਾਹੀ; ਤਿਸੁ ਨਾਲਿ. ਕਿਉ ਚਿਤੁ ਲਾਈਐ ॥',
      pronunciation: 'sāth terē. calē nāhī; tis nāli. kiu cit lāīē ‖',
      translation:
        'They shall not go along with you, so why do you focus your attention on them?',
      vicar:
        'ਇਸ ਪਰਵਾਰ ਦੇ ਮੋਹ ਵਿਚ ਕਿਉਂ ਫਸਦਾ ਹੈਂ? ਇਸ ਨੇ ਤੇਰੇ ਨਾਲ ਤੋੜ ਸਦਾ ਦਾ ਸਾਥ ਨਹੀਂ ਨਿਬਾਹ ਸਕਣਾ।',
    },
    {
      id: '6ES4',
      src: 'ਐਸਾ ਕੰਮੁ ਮੂਲੇ. ਨ ਕੀਚੈ; ਜਿਤੁ ਅੰਤਿ ਪਛੋਤਾਈਐ ॥',
      pronunciation: 'ēsā kañm mūle. na kīcē; jit añt pachotāīē ‖',
      translation: "Don't do anything that you will regret in the end.",
      vicar:
        'ਜਿਸ ਕੰਮ ਦੇ ਕੀਤਿਆਂ ਆਖ਼ਰ ਹੱਥ ਮਲਣੇ ਪੈਣ, ਉਹ ਕੰਮ ਕਦੇ ਭੀ ਕਰਨਾ ਨਹੀਂ ਚਾਹੀਦਾ। ਮੂਲੇ ਨ = ਬਿਲਕੁਲ ਨਹੀਂ। ਕੀਚੈ = ਕਰਨਾ ਚਾਹੀਦਾ। ਜਿਤੁ = ਜਿਸ ਕਰਕੇ। ਅੰਤਿ = ਅੰਤ ਵੇਲੇ, ਆਖ਼ਰ ਨੂੰ',
    },
    {
      id: 'CS43',
      src: 'ਸਤਿਗੁਰੂ ਕਾ ਉਪਦੇਸੁ ਸੁਣਿ ਤੂ; ਹੋਵੈ ਤੇਰੈ ਨਾਲੇ ॥',
      pronunciation: 'satigurū kā upades suṇ tū; hovē terē nāle ‖',
      translation:
        'Listen to the Teachings of the True Guru - these shall go along with you.',
      vicar:
        'ਸਤਿਗੁਰੂ ਦੀ ਸਿੱਖਿਆ (ਗਹੁ ਨਾਲ) ਸੁਣ, ਇਹ ਗੁਰ-ਉਪਦੇਸ਼ ਸਦਾ ਚੇਤੇ ਰੱਖਣਾ ਚਾਹੀਦਾ ਹੈ।',
    },
    {
      id: '640W',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਮਨ ਪਿਆਰੇ; ਤੂ ਸਦਾ ਸਚੁ ਸਮਾਲੇ ॥੧੧॥',
      pronunciation: 'kahē nānaku. man piāre; tū sadā sac samāle ‖11‖',
      translation:
        'Says Nanak, O beloved mind, contemplate the True Lord forever. ||11||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਪਿਆਰੇ ਮਨ! (ਜੇ ਤੂੰ ਆਨੰਦ ਲੋੜਦਾ ਹੈਂ ਤਾਂ) ਸਦਾ-ਥਿਰ ਪਰਮਾਤਮਾ ਨੂੰ ਹਰ ਵੇਲੇ (ਆਪਣੇ ਅੰਦਰ) ਸਾਂਭ ਕੇ ਰੱਖ ॥੧੧॥',
    },
    {
      id: '0Q8G',
      src: 'ਅਗਮ ਅਗੋਚਰਾ; ਤੇਰਾ ਅੰਤੁ. ਨ ਪਾਇਆ ॥',
      pronunciation: 'agam agocarā; terā añtu. na pāiā ‖',
      translation:
        'O inaccessible and unfathomable Lord, Your limits cannot be found.',
      vicar:
        '(ਹੇ ਪਿਆਰੇ ਮਨ! ਸਦਾ ਪ੍ਰਭੂ ਨੂੰ ਆਪਣੇ ਅੰਦਰ ਸੰਭਾਲ ਰੱਖ, ਤੇ ਉਸ ਦੇ ਅੱਗੇ ਇਉਂ ਅਰਜ਼ੋਈ ਕਰ-) ਹੇ ਅਪਹੁੰਚ ਹਰੀ! ਹੇ ਇੰਦ੍ਰਿਆਂ ਦੀ ਪਹੁੰਚ ਤੋਂ ਪਰੇ ਰਹਿਣ ਵਾਲੇ ਪ੍ਰਭੂ! (ਤੇਰੇ ਗੁਣਾਂ ਦਾ) ਕਿਸੇ ਨੇ ਅੰਤ ਨਹੀਂ ਲੱਭਾ। ਅਗਮ = ਹੇ ਅਪਹੁੰਚ ਪ੍ਰਭੂ! ਅਗੋਚਰਾ = ਹੇ ਅਗੋਚਰ ਹਰੀ! ਅਗੋਚਰ = ਅ-ਗੋ-ਚਰ, ਜਿਸ ਤਕ ਗਿਆਨ ਇੰਦ੍ਰਿਆਂ ਦੀ ਪਹੁੰਚ ਨ ਹੋ ਸਕੇ।',
    },
    {
      id: '5D6H',
      src: 'ਅੰਤੋ. ਨ ਪਾਇਆ ਕਿਨੈ ਤੇਰਾ; ਆਪਣਾ ਆਪੁ ਤੂ ਜਾਣਹੇ ॥',
      pronunciation: 'añto. na pāiā kinē terā; āpaṇā āp tū jāṇahe ‖',
      translation: 'No one has found Your limits; only You Yourself know.',
      vicar:
        'ਆਪਣੇ (ਅਸਲ) ਸਰੂਪ ਨੂੰ ਤੂੰ ਆਪ ਹੀ ਜਾਣਦਾ ਹੈਂ, ਹੋਰ ਕੋਈ ਜੀਵ ਤੇਰੇ ਗੁਣਾਂ ਦਾ ਅਖ਼ੀਰ ਨਹੀਂ ਲੱਭ ਸਕਦਾ। ਕਿਨੈ = ਕਿਸੇ ਨੇ ਭੀ। ਆਪੁ = ਆਪਣੇ ਸਰੂਪ ਨੂੰ। ਜਾਣਹੇ = ਜਾਣਹਿ, ਤੂੰ ਜਾਣਦਾ ਹੈਂ।',
    },
    {
      id: '1GVQ',
      src: 'ਜੀਅ ਜੰਤ ਸਭਿ ਖੇਲੁ ਤੇਰਾ; ਕਿਆ ਕੋ ਆਖਿ ਵਖਾਣਏ ॥',
      pronunciation: 'jīa jañt sabh khel terā; kiā ko ākh wakhāṇae ‖',
      translation:
        'All living beings and creatures are Your play; how can anyone describe You?',
      vicar:
        'ਕੋਈ ਹੋਰ ਜੀਵ (ਤੇਰੇ ਗੁਣਾਂ ਨੂੰ) ਆਖ ਕੇ ਬਿਆਨ ਕਰੇ ਭੀ ਕਿਸ ਤਰ੍ਹਾਂ? ਇਹ ਸਾਰੇ ਜੀਵ (ਤਾਂ) ਤੇਰਾ ਹੀ ਰਚਿਆ ਹੋਇਆ ਇਕ ਖੇਲ ਹੈ। ਸਭਿ = ਸਾਰੇ। ਆਖਿ = ਆਖ ਕੇ। ਵਖਾਣਏ = ਵਖਾਣੈ, ਬਿਆਨ ਕਰੇ। ਕੋ = ਕੋਈ ਜੀਵ!',
    },
    {
      id: 'PWVW',
      src: 'ਆਖਹਿ ਤ ਵੇਖਹਿ ਸਭੁ ਤੂਹੈ; ਜਿਨਿ ਜਗਤੁ ਉਪਾਇਆ ॥',
      pronunciation: 'ākhah ta vekhah sabh tūhē; jin jagat upāiā ‖',
      translation:
        'You speak, and You gaze upon all; You created the Universe.',
      vicar:
        'ਹਰੇਕ ਜੀਵ ਵਿਚ ਤੂੰ ਆਪ ਹੀ ਬੋਲਦਾ ਹੈਂ, ਹਰੇਕ ਜੀਵ ਦੀ ਤੂੰ ਆਪ ਹੀ ਸੰਭਾਲ ਕਰਦਾ ਹੈਂ (ਤੂੰ ਹੀ ਕਰਦਾ ਹੈਂ) ਜਿਸ ਨੇ ਇਹ ਸੰਸਾਰ ਪੈਦਾ ਕੀਤਾ ਹੈ। ਆਖਹਿ = ਤੂੰ ਆਖਦਾ ਹੈਂ, ਤੂੰ ਬੋਲਦਾ ਹੈਂ। ਵੇਖਹਿ = ਤੂੰ ਸੰਭਾਲ ਕਰਦਾ ਹੈਂ। ਜਿਨਿ = ਜਿਸ ਤੈਂ ਨੇ।',
    },
    {
      id: 'MRE6',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਤੂ ਸਦਾ ਅਗੰਮੁ ਹੈ; ਤੇਰਾ ਅੰਤੁ ਨ ਪਾਇਆ ॥੧੨॥',
      pronunciation: 'kahē nānaku. tū sadā agañm hē; terā añt na pāiā ‖12‖',
      translation:
        'Says Nanak, You are forever inaccessible; Your limits cannot be found. ||12||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਹੇ ਮੇਰੇ ਪਿਆਰੇ ਮਨ! ਪ੍ਰਭੂ ਅੱਗੇ ਇਉਂ ਅਰਜ਼ੋਈ ਕਰ-) ਤੂੰ ਸਦਾ ਅਪਹੁੰਚ ਹੈਂ, (ਕਿਸੇ ਜੀਵ ਨੇ ਤੇਰੇ ਗੁਣਾਂ ਦਾ ਕਦੇ) ਅੰਤ ਨਹੀਂ ਲੱਭਾ ॥੧੨॥',
    },
    {
      id: 'P4XV',
      src: 'ਸੁਰਿ ਨਰ ਮੁਨਿ ਜਨ. ਅੰਮ੍ਰਿਤੁ ਖੋਜਦੇ; ਸੁ ਅੰਮ੍ਰਿਤੁ. ਗੁਰ ਤੇ ਪਾਇਆ ॥',
      pronunciation:
        'sur nar mun jan. añmrit khojade; sa añmritu. gur te pāiā ‖',
      translation:
        'The angelic beings and the silent sages search for the Ambrosial Nectar; this Amrit is obtained from the Guru.',
      vicar:
        '(ਆਤਮਕ ਆਨੰਦ ਇਕ ਐਸਾ) ਅੰਮ੍ਰਿਤ (ਹੈ ਜਿਸ) ਨੂੰ ਦੇਵਤੇ ਮਨੁੱਖ ਮੁਨੀ ਲੋਕ ਲੱਭਦੇ ਫਿਰਦੇ ਹਨ, (ਪਰ) ਇਹ ਅੰਮ੍ਰਿਤ ਗੁਰੂ ਤੋਂ ਹੀ ਮਿਲਦਾ ਹੈ। ਸੁਰਿ = ਦੇਵਤੇ। ਮੁਨਿ ਜਨ = ਮੁਨੀ ਲੋਕ, ਰਿਸ਼ੀ। ਅੰਮ੍ਰਿਤੁ = ਆਤਮਕ ਆਨੰਦ ਦੇਣ ਵਾਲਾ ਨਾਮ-ਜਲ।',
    },
    {
      id: '01SM',
      src: 'ਪਾਇਆ ਅੰਮ੍ਰਿਤੁ. ਗੁਰਿ ਕ੍ਰਿਪਾ ਕੀਨੀ; ਸਚਾ ਮਨਿ ਵਸਾਇਆ ॥',
      pronunciation: 'pāiā añmritu. gur kripā kīnī; sacā man wasāiā ‖',
      translation:
        'This Amrit is obtained, when the Guru grants His Grace; He enshrines the True Lord within the mind.',
      vicar:
        'ਜਿਸ ਮਨੁੱਖ ਉੱਤੇ ਗੁਰੂ ਨੇ ਮੇਹਰ ਕੀਤੀ ਉਸ ਨੇ (ਇਹ) ਅੰਮ੍ਰਿਤ ਪ੍ਰਾਪਤ ਕਰ ਲਿਆ (ਕਿਉਂਕਿ) ਉਸ ਨੇ ਸਦਾ ਕਾਇਮ ਰਹਿਣ ਵਾਲਾ ਪ੍ਰਭੂ ਆਪਣੇ ਮਨ ਵਿਚ ਟਿਕਾ ਲਿਆ। ਗੁਰਿ = ਗੁਰੂ ਨੇ। ਮਨਿ = ਮਨ ਵਿਚ। ਸਭਿ = ਸਾਰੇ।',
    },
    {
      id: 'VZHF',
      src: 'ਜੀਅ ਜੰਤ ਸਭਿ ਤੁਧੁ ਉਪਾਏ; ਇਕਿ ਵੇਖਿ. ਪਰਸਣਿ ਆਇਆ ॥',
      pronunciation: 'jīa jañt sabh tudh upāe; ik vekhi. parasaṇ āiā ‖',
      translation:
        'All living beings and creatures were created by You; only some come to see the Guru, and seek His blessing.',
      vicar:
        'ਹੇ ਪ੍ਰਭੂ! ਸਾਰੇ ਜੀਅ ਜੰਤ ਤੂੰ ਹੀ ਪੈਦਾ ਕੀਤੇ ਹਨ (ਤੂੰ ਹੀ ਇਹਨਾਂ ਨੂੰ ਪ੍ਰੇਰਦਾ ਹੈਂ, ਤੇਰੀ ਪ੍ਰੇਰਨਾ ਨਾਲ ਹੀ) ਕਈ ਜੀਵ (ਗੁਰੂ ਦਾ) ਦੀਦਾਰ ਕਰ ਕੇ (ਉਸ ਦੇ) ਚਰਨ ਛੁਹਣ ਆਉਂਦੇ ਹਨ, ਇਕਿ = ਕਈ ਜੀਵ। ਵੇਖਿ = (ਗੁਰੂ ਨੂੰ) ਵੇਖ ਕੇ। ਪਰਸਣਿ = (ਗੁਰੂ ਦੇ ਚਰਨ) ਪਰਸਣ ਲਈ।',
    },
    {
      id: 'PPYM',
      src: 'ਲਬੁ ਲੋਭੁ ਅਹੰਕਾਰੁ ਚੂਕਾ; ਸਤਿਗੁਰੂ ਭਲਾ ਭਾਇਆ ॥',
      pronunciation: 'lab lobh ahañkār cūkā; satigurū bhalā bhāiā ‖',
      translation:
        'Their greed, avarice and egotism are dispelled, and the True Guru seems sweet.',
      vicar:
        'ਸਤਿਗੁਰੂ ਉਹਨਾਂ ਨੂੰ ਪਿਆਰਾ ਲੱਗਦਾ ਹੈ (ਸਤਿਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਉਹਨਾਂ ਦਾ) ਲੱਬ ਲੋਭ ਤੇ ਅਹੰਕਾਰ ਦੂਰ ਹੋ ਜਾਂਦਾ ਹੈ। ਭਲਾ ਭਾਇਆ = ਮਿੱਠਾ ਲੱਗਦਾ ਹੈ, ਪਿਆਰਾ ਲੱਗਦਾ ਹੈ।',
    },
    {
      id: 'V50J',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਸ ਨੋ ਆਪਿ ਤੁਠਾ; ਤਿਨਿ. ਅੰਮ੍ਰਿਤੁ ਗੁਰ ਤੇ ਪਾਇਆ ॥੧੩॥',
      pronunciation:
        'kahē nānaku. jis no āp tuṭhā; tini. añmrit gur te pāiā ‖13‖',
      translation:
        'Says Nanak, those with whom the Lord is pleased, obtain the Amrit, through the Guru. ||13||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਪ੍ਰਭੂ ਜਿਸ ਮਨੁੱਖ ਉਤੇ ਪ੍ਰਸੰਨ ਹੁੰਦਾ ਹੈ, ਉਸ ਮਨੁੱਖ ਨੇ (ਆਤਮਕ ਆਨੰਦ-ਰੂਪ) ਅੰਮ੍ਰਿਤ ਗੁਰੂ ਤੋਂ ਪ੍ਰਾਪਤ ਕਰ ਲਿਆ ਹੈ ॥੧੩॥ ਤੇ = ਤੋਂ ॥੧੩॥',
    },
    {
      id: 'WR06',
      src: 'ਭਗਤਾ ਕੀ; ਚਾਲ ਨਿਰਾਲੀ ॥',
      pronunciation: 'bhagatā kī; cāl nirālī ‖',
      translation: 'The lifestyle of the devotees is unique and distinct.',
      vicar:
        '(ਜੇਹੜੇ ਸੁਭਾਗ ਬੰਦੇ ਆਤਮਕ ਆਨੰਦ ਮਾਣਦੇ ਹਨ ਉਹੀ ਭਗਤ ਹਨ ਤੇ ਉਹਨਾਂ) ਭਗਤਾਂ ਦੀ ਜੀਵਨ-ਜੁਗਤੀ (ਦੁਨੀਆ ਦੇ ਲੋਕਾਂ ਨਾਲੋਂ ਸਦਾ) ਵੱਖਰੀ ਹੁੰਦੀ ਹੈ, ਭਗਤ = ਆਤਮਕ ਆਨੰਦ ਮਾਣਨ ਵਾਲੇ ਬੰਦੇ। ਚਾਲ = ਜੀਵਨ ਜੁਗਤੀ।',
    },
    {
      id: 'QPB1',
      src: 'ਚਾਲਾ ਨਿਰਾਲੀ ਭਗਤਾਹ ਕੇਰੀ; ਬਿਖਮ ਮਾਰਗਿ ਚਲਣਾ ॥',
      pronunciation: 'cālā nirālī bhagatāh kerī; bikham mārag calaṇā ‖',
      translation:
        "The devotees' lifestyle is unique and distinct; they follow the most difficult path.",
      vicar:
        '(ਇਹ ਪੱਕੀ ਗੱਲ ਹੈ ਕਿ ਉਹਨਾਂ) ਭਗਤਾਂ ਦੀ ਜੀਵਨ-ਜੁਗਤੀ (ਹੋਰਨਾਂ ਨਾਲੋਂ) ਵੱਖਰੀ ਹੁੰਦੀ ਹੈ। ਉਹ (ਬੜੇ) ਔਖੇ ਰਸਤੇ ਉਤੇ ਤੁਰਦੇ ਹਨ। ਨਿਰਾਲੀ = ਵੱਖਰੀ। ਕੇਰੀ = ਦੀ। ਬਿਖਮ = ਔਖਾ। ਮਾਰਗਿ = ਰਾਹ ਉਤੇ।',
    },
    {
      id: 'F6SD',
      src: 'ਲਬੁ ਲੋਭੁ ਅਹੰਕਾਰੁ ਤਜਿ ਤ੍ਰਿਸਨਾ; ਬਹੁਤੁ. ਨਾਹੀ ਬੋਲਣਾ ॥',
      pronunciation: 'lab lobh ahañkār taj trisanā; bahutu. nāhī bolaṇā ‖',
      translation:
        'They renounce greed, avarice, egotism and desire; they do not talk too much.',
      vicar:
        'ਉਹ ਲੱਬ ਲੋਭ ਅਹੰਕਾਰ ਤੇ ਮਾਇਆ ਦੀ ਤ੍ਰਿਸ਼ਨਾ ਤਿਆਗਦੇ ਹਨ ਤੇ ਬਹੁਤਾ ਨਹੀਂ ਬੋਲਦੇ (ਭਾਵ, ਆਪਣੀ ਸੋਭਾ ਨਹੀਂ ਕਰਦੇ ਫਿਰਦੇ)। ਤਜਿ = ਤਿਆਗ ਕੇ।',
    },
    {
      id: 'RE0D',
      src: 'ਖੰਨਿਅਹੁ ਤਿਖੀ. ਵਾਲਹੁ ਨਿਕੀ; ਏਤੁ ਮਾਰਗਿ ਜਾਣਾ ॥',
      pronunciation: 'khañniah tikhī. vālah nikī; et mārag jāṇā ‖',
      translation:
        'The path they take is sharper than a two-edged sword, and finer than a hair.',
      vicar:
        'ਇਸ ਰਸਤੇ ਉਤੇ ਤੁਰਨਾ (ਬੜੀ ਔਖੀ ਖੇਡ ਹੈ ਕਿਉਂਕਿ ਇਹ ਰਸਤਾ) ਖੰਡੇ ਦੀ ਧਾਰ ਨਾਲੋਂ ਤ੍ਰਿੱਖਾ ਹੈ ਤੇ ਵਾਲ ਨਾਲੋਂ ਪਤਲਾ ਹੈ (ਇਸ ਉਤੋਂ ਡਿੱਗਣ ਦੀ ਭੀ ਸੰਭਾਵਨਾ ਹਰ ਵੇਲੇ ਬਣੀ ਰਹਿੰਦੀ ਹੈ ਕਿਉਂਕਿ ਦੁਨੀਆ ਵਾਲੀ ਵਾਸਨਾ ਮਨ ਦੀ ਅਡੋਲਤਾ ਨੂੰ ਧੱਕਾ ਦੇ ਦੇਂਦੀ ਹੈ)। ਖੰਨਿਅਹੁ = ਖੰਡੇ ਨਾਲੋਂ, ਤਲਵਾਰ ਨਾਲੋਂ। ਵਾਲਹੁ = ਵਾਲ ਨਾਲੋਂ। ਨਿਕੀ = ਬਾਰੀਕ। ਏਤੁ ਮਾਰਗਿ = ਇਸ ਰਸਤੇ ਉਤੇ।',
    },
    {
      id: '6UV1',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਜਿਨੀ ਆਪੁ ਤਜਿਆ; ਹਰਿ ਵਾਸਨਾ ਸਮਾਣੀ ॥',
      pronunciation: 'gur parasādī jinī āp tajiā; har vāsanā samāṇī ‖',
      translation:
        "By Guru's Grace, they shed their selfishness and conceit; their hopes are merged in the Lord.",
      vicar:
        'ਪਰ ਜਿਨ੍ਹਾਂ ਨੇ ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਆਪਾ-ਭਾਵ ਛੱਡ ਦਿੱਤਾ ਹੈ, ਉਹਨਾਂ ਦੀ (ਮਾਇਕ) ਵਾਸਨਾ ਹਰੀ-ਪ੍ਰਭੂ ਦੀ ਯਾਦ ਵਿਚ ਮੁੱਕ ਜਾਂਦੀ ਹੈ। ਆਪੁ = ਆਪਾ-ਭਾਵ।',
    },
    {
      id: '34U3',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਚਾਲ ਭਗਤਾ; ਜੁਗਹੁ ਜੁਗੁ ਨਿਰਾਲੀ ॥੧੪॥',
      pronunciation: 'kahē nānaku. cāl bhagatā; jugah jug nirālī ‖14‖',
      translation:
        'Says Nanak, the lifestyle of the devotees, in each and every age, is unique and distinct. ||14||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਆਤਮਕ ਆਨੰਦ ਮਾਣਨ ਵਾਲੇ) ਭਗਤ ਜਨਾਂ ਦੀ ਜੀਵਨ-ਜੁਗਤੀ ਸਦਾ ਤੋਂ ਹੀ (ਦੁਨੀਆ ਨਾਲੋਂ) ਵੱਖਰੀ ਚਲੀ ਆ ਰਹੀ ਹੈ ॥੧੪॥ ਜੁਗਹੁ ਜੁਗੁ = ਹਰੇਕ ਜੁਗ ਵਿਚ, ਸਦਾ ਹੀ, ਹਰ ਸਮੇ ॥੧੪॥',
    },
    {
      id: '4SA2',
      src: 'ਜਿਉ ਤੂ ਚਲਾਇਹਿ. ਤਿਵ ਚਲਹ ਸੁਆਮੀ; ਹੋਰੁ. ਕਿਆ ਜਾਣਾ ਗੁਣ ਤੇਰੇ ॥',
      pronunciation:
        'jiu tū calāihi. tiv calah suāmī; horu. kiā jāṇā guṇ tere ‖',
      translation:
        'As You make me walk, so do I walk, O my Lord and Master; what else do I know of Your Glorious Virtues?',
      vicar:
        'ਹੇ ਮਾਲਕ-ਪ੍ਰਭੂ! ਜਿਵੇਂ ਤੂੰ (ਸਾਨੂੰ ਜੀਵਾਂ ਨੂੰ ਜੀਵਨ-ਸੜਕ ਉਤੇ) ਤੋਰਦਾ ਹੈਂ, ਤਿਵੇਂ ਅਸੀਂ ਤੁਰਦੇ ਹਾਂ (ਬੱਸ! ਮੈਨੂੰ ਇਤਨੀ ਹੀ ਸੂਝ ਪਈ ਹੈ), ਤੇਰੇ ਗੁਣਾਂ ਦਾ ਹੋਰ ਭੇਤ ਮੈਂ ਨਹੀਂ ਜਾਣਦਾ। ਚਲਹ = ਅਸੀਂ ਜੀਵ ਤੁਰਦੇ ਹਾਂ। ਹੋਰੁ = ਹੋਰ ਭੇਤ। ਕਿਆ ਜਾਣਾ = ਮੈਂ ਨਹੀਂ ਜਾਣਦਾ।',
    },
    {
      id: 'K5MB',
      src: 'ਜਿਵ ਤੂ ਚਲਾਇਹਿ. ਤਿਵੈ ਚਲਹ; ਜਿਨਾ ਮਾਰਗਿ ਪਾਵਹੇ ॥',
      pronunciation: 'jiv tū calāihi. tivē calah; jinā mārag pāwahe ‖',
      translation:
        'As You cause them to walk, they walk - You have placed them on the Path.',
      vicar:
        '(ਮੈਂ ਇਹੀ ਸਮਝਿਆ ਹਾਂ ਕਿ) ਜਿਸ ਰਾਹੇ ਤੂੰ ਸਾਨੂੰ ਤੋਰਦਾ ਹੈਂ, ਉਸੇ ਰਾਹੇ ਅਸੀਂ ਤੁਰਦੇ ਹਾਂ। ਜਿਨ੍ਹਾਂ ਬੰਦਿਆਂ ਨੂੰ (ਆਤਮਕ ਆਨੰਦ ਮਾਣਨ ਦੇ) ਰਸਤੇ ਉਤੇ ਤੋਰਦਾ ਹੈਂ, ਮਾਰਗਿ = (ਆਨੰਦ ਦੇ) ਰਸਤੇ ਉਤੇ। ਪਾਵਹੇ = ਪਾਵਹਿ, ਤੂੰ ਪਾਂਦਾ ਹੈਂ।',
    },
    {
      id: '92ET',
      src: 'ਕਰਿ ਕਿਰਪਾ. ਜਿਨ ਨਾਮਿ ਲਾਇਹਿ; ਸਿ ਹਰਿ ਹਰਿ ਸਦਾ ਧਿਆਵਹੇ ॥',
      pronunciation: 'kar kirapā. jin nām lāihi; sa har har sadā dhiāwahe ‖',
      translation:
        'In Your Mercy, You attach them to the Naam; they meditate forever on the Lord, Har, Har.',
      vicar:
        'ਜਿਨ੍ਹਾਂ ਨੂੰ ਮੇਹਰ ਕਰ ਕੇ ਆਪਣੇ ਨਾਮ ਵਿਚ ਜੋੜਦਾ ਹੈਂ, ਉਹ ਬੰਦੇ ਸਦਾ ਹਰੀ-ਨਾਮ ਸਿਮਰਦੇ ਹਨ। ਲਾਇਹਿ = ਤੂੰ ਲਾਂਦਾ ਹੈਂ। ਸਿ = ਉਹ ਬੰਦੇ। ਧਿਆਵੇ = ਧਿਆਵਹਿ, ਧਿਆਉਂਦੇ ਹਨ।',
    },
    {
      id: '7ZH9',
      src: 'ਜਿਸ ਨੋ ਕਥਾ ਸੁਣਾਇਹਿ ਆਪਣੀ; ਸਿ ਗੁਰਦੁਆਰੈ ਸੁਖੁ ਪਾਵਹੇ ॥',
      pronunciation: 'jis no kathā suṇāih āpaṇī; sa guraduārē sukh pāwahe ‖',
      translation:
        "Those whom You cause to listen to Your sermon, find peace in the Gurdwara, the Guru's Gate.",
      vicar:
        'ਜਿਸ ਜਿਸ ਮਨੁੱਖ ਨੂੰ ਤੂੰ ਆਪਣੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਸੁਣਾਉਂਦਾ ਹੈਂ (ਸੁਣਨ ਵਲ ਪ੍ਰੇਰਦਾ ਹੈਂ), ਉਹ ਬੰਦੇ ਗੁਰੂ ਦੇ ਦਰ ਤੇ (ਪਹੁੰਚ ਕੇ) ਆਤਮਕ ਆਨੰਦ ਮਾਣਦੇ ਹਨ। ਸੁਖੁ = ਆਤਮਕ ਆਨੰਦ।',
    },
    {
      id: 'SKVC',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੇ ਸਾਹਿਬ; ਜਿਉ ਭਾਵੈ ਤਿਵੈ ਚਲਾਵਹੇ ॥੧੫॥',
      pronunciation: 'kahē nānaku. sace sāhib; jiu bhāvē tivē calāwahe ‖15‖',
      translation:
        'Says Nanak, O my True Lord and Master, you make us walk according to Your Will. ||15||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲੇ ਮਾਲਕ! ਜਿਵੇਂ ਤੈਨੂੰ ਚੰਗਾ ਲੱਗਦਾ ਹੈ, ਉਸੇ ਤਰ੍ਹਾਂ ਤੂੰ (ਸਾਨੂੰ ਜੀਵਾਂ ਨੂੰ) ਜੀਵਨ-ਰਾਹ ਉਤੇ ਤੋਰਦਾ ਹੈਂ ॥੧੫॥ ਤਿਵੈ = ਉਸੇ ਤਰ੍ਹਾਂ, ਤਿਉਂ ਹੀ ॥੧੫॥',
    },
    {
      id: 'Q51G',
      src: 'ਏਹੁ ਸੋਹਿਲਾ; ਸਬਦੁ ਸੁਹਾਵਾ ॥',
      pronunciation: 'eh sohilā; sabad suhāvā ‖',
      translation:
        'This song of praise is the Shabad, the most beautiful Word of God.',
      vicar:
        '(ਸਤਿਗੁਰੂ ਦਾ) ਇਹ ਸੋਹਣਾ ਸ਼ਬਦ (ਆਤਮਕ) ਆਨੰਦ ਦੇਣ ਵਾਲਾ ਗੀਤ ਹੈ, ਸੋਹਿਲਾ = ਖ਼ੁਸ਼ੀ ਦਾ ਗੀਤ, ਆਨੰਦ ਦੇਣ ਵਾਲਾ ਗੀਤ।',
    },
    {
      id: 'PXYG',
      src: 'ਸਬਦੋ ਸੁਹਾਵਾ ਸਦਾ ਸੋਹਿਲਾ; ਸਤਿਗੁਰੂ ਸੁਣਾਇਆ ॥',
      pronunciation: 'sabado suhāvā sadā sohilā; satigurū suṇāiā ‖',
      translation:
        'This beauteous Shabad is the everlasting song of praise, spoken by the True Guru.',
      vicar:
        '(ਯਕੀਨ ਜਾਣੋ ਕਿ) ਸਤਿਗੁਰੂ ਨੇ ਜੇਹੜਾ ਸੋਹਣਾ ਸ਼ਬਦ ਸੁਣਾਇਆ ਹੈ ਉਹ ਸਦਾ ਆਤਮਕ ਆਨੰਦ ਦੇਣ ਵਾਲਾ ਹੈ। ਸੁਹਾਵਾ = ਸੋਹਣਾ।',
    },
    {
      id: '9F6P',
      src: 'ਏਹੁ ਤਿਨ ਕੈ ਮੰਨਿ ਵਸਿਆ; ਜਿਨ ਧੁਰਹੁ ਲਿਖਿਆ ਆਇਆ ॥',
      pronunciation: 'eh tin kē mañn wasiā; jin dhurah likhiā āiā ‖',
      translation:
        'This is enshrined in the minds of those who are so pre-destined by the Lord.',
      vicar:
        "ਪਰ ਇਹ ਗੁਰ-ਸ਼ਬਦ ਉਹਨਾਂ ਦੇ ਮਨ ਵਿਚ ਵੱਸਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਦੇ ਮੱਥੇ ਤੇ ਧੁਰੋਂ ਲਿਖਿਆ ਲੇਖ ਉੱਘੜਦਾ ਹੈ। ਏਹੁ = ਇਹ ਸੋਹਿਲਾ। ਮੰਨਿ = ਮਨ ਵਿਚ {ਅੱਖਰ 'ਮ' ਦੀ (ੰ) ਸਿਰਫ਼ ਇਕ ਮਾਤ੍ਰਾ ਵਧਾਣ ਵਾਸਤੇ ਹੈ, ਅਸਲ ਲਫ਼ਜ਼ 'ਮਨ' ਹੀ ਹੈ}।",
    },
    {
      id: '1CEH',
      src: 'ਇਕਿ ਫਿਰਹਿ ਘਨੇਰੇ. ਕਰਹਿ ਗਲਾ; ਗਲੀ ਕਿਨੈ. ਨ ਪਾਇਆ ॥',
      pronunciation: 'ik phirah ghanere. karah galā; galī kinē. na pāiā ‖',
      translation:
        'Some wander around, babbling on and on, but none obtain Him by babbling.',
      vicar:
        'ਬਥੇਰੇ ਅਨੇਕਾਂ ਐਸੇ ਬੰਦੇ ਫਿਰਦੇ ਹਨ (ਜਿਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿਚ ਗੁਰ-ਸ਼ਬਦ ਤਾਂ ਨਹੀਂ ਵੱਸਿਆ, ਪਰ ਗਿਆਨ ਦੀਆਂ) ਗੱਲਾਂ ਕਰਦੇ ਹਨ। ਨਿਰੀਆਂ ਗੱਲਾਂ ਨਾਲ ਆਤਮਕ ਆਨੰਦ ਕਿਸੇ ਨੂੰ ਨਹੀਂ ਮਿਲਿਆ। ਇਕਿ = ਕਈ ਜੀਵ। ਗਲੀ = ਨਿਰੀਆਂ ਗੱਲਾਂ ਕਰਨ ਨਾਲ।',
    },
    {
      id: 'S5T5',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਬਦੁ ਸੋਹਿਲਾ; ਸਤਿਗੁਰੂ ਸੁਣਾਇਆ ॥੧੬॥',
      pronunciation: 'kahē nānaku. sabad sohilā; satigurū suṇāiā ‖16‖',
      translation:
        'Says Nanak, the Shabad, this song of praise, has been spoken by the True Guru. ||16||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਸਤਿਗੁਰੂ ਦਾ ਸੁਣਾਇਆ ਹੋਇਆ ਸ਼ਬਦ ਹੀ ਆਤਮਕ ਆਨੰਦ-ਦਾਤਾ ਹੈ ॥੧੬॥',
    },
    {
      id: 'EF6Z',
      src: 'ਪਵਿਤੁ ਹੋਏ ਸੇ ਜਨਾ; ਜਿਨੀ ਹਰਿ ਧਿਆਇਆ ॥',
      pronunciation: 'pavit hoe se janā; jinī har dhiāiā ‖',
      translation: 'Those humble beings who meditate on the Lord become pure.',
      vicar:
        '(ਗੁਰ ਸ਼ਬਦ ਦਾ ਸਦਕਾ) ਜਿਨ੍ਹਾਂ ਬੰਦਿਆਂ ਨੇ ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ ਸਿਮਰਿਆ (ਉਹਨਾਂ ਦੇ ਅੰਦਰ ਐਸਾ ਆਨੰਦ ਪੈਦਾ ਹੋਇਆ ਕਿ ਮਾਇਆ ਵਾਲੇ ਰਸਾਂ ਦੀ ਉਹਨਾਂ ਨੂੰ ਖਿੱਚ ਹੀ ਨਾਹ ਰਹੀ, ਤੇ) ਉਹ ਬੰਦੇ ਪਵਿਤ੍ਰ ਜੀਵਨ ਵਾਲੇ ਬਣ ਗਏ।',
    },
    {
      id: 'T3V9',
      src: 'ਹਰਿ ਧਿਆਇਆ ਪਵਿਤੁ ਹੋਏ; ਗੁਰਮੁਖਿ ਜਿਨੀ ਧਿਆਇਆ ॥',
      pronunciation: 'har dhiāiā pavit hoe; guramukh jinī dhiāiā ‖',
      translation:
        'Meditating on the Lord, they become pure; as Gurmukh, they meditate on Him.',
      vicar:
        'ਗੁਰੂ ਦੀ ਸਰਨ ਪੈ ਕੇ ਜਿਨ੍ਹਾਂ ਜਿਨ੍ਹਾਂ ਨੇ ਹਰੀ ਦਾ ਨਾਮ ਸਿਮਰਿਆ ਉਹ ਸੁੱਧ ਆਚਰਨ ਵਾਲੇ ਹੋ ਗਏ। ਗੁਰਮੁਖਿ = ਗੁਰੂ ਦੀ ਸਰਨ ਪੈ ਕੇ।',
    },
    {
      id: '5FF5',
      src: 'ਪਵਿਤੁ ਮਾਤਾ ਪਿਤਾ. ਕੁਟੰਬ ਸਹਿਤ ਸਿਉ; ਪਵਿਤੁ ਸੰਗਤਿ ਸਬਾਈਆ ॥',
      pronunciation: 'pavit mātā pitā. kuṭañb sahit siu; pavit sañgat sabāīā ‖',
      translation:
        'They are pure, along with their mothers, fathers, family and friends; all their companions are pure as well.',
      vicar:
        '(ਉਹਨਾਂ ਦੀ ਲਾਗ ਨਾਲ) ਉਹਨਾਂ ਦੇ ਮਾਤਾ ਪਿਤਾ ਪਰਵਾਰ ਦੇ ਜੀਵ ਪਵਿਤ੍ਰ ਜੀਵਨ ਵਾਲੇ ਬਣੇ, ਜਿਨ੍ਹਾਂ ਜਿਨ੍ਹਾਂ ਨੇ ਉਹਨਾਂ ਦੀ ਸੰਗਤ ਕੀਤੀ ਉਹ ਸਾਰੇ ਪਵਿਤ੍ਰ ਹੋ ਗਏ। ਸਹਿਤ ਸਿਉ = ਸਮੇਤ। ਕੁਟੰਬ = ਪਰਵਾਰ। ਸਬਾਈਆ = ਸਾਰੀ ਹੀ।',
    },
    {
      id: 'Z3MV',
      src: 'ਕਹਦੇ ਪਵਿਤੁ. ਸੁਣਦੇ ਪਵਿਤੁ; ਸੇ ਪਵਿਤੁ. ਜਿਨੀ ਮੰਨਿ ਵਸਾਇਆ ॥',
      pronunciation:
        'kahade pavitu. suṇade pavitu; se pavitu. jinī mañn wasāiā ‖',
      translation:
        'Pure are those who speak, and pure are those who listen; those who enshrine it within their minds are pure.',
      vicar:
        'ਹਰੀ-ਨਾਮ (ਇਕ ਐਸਾ ਆਨੰਦ ਦਾ ਸੋਮਾ ਹੈ ਕਿ ਇਸ ਨੂੰ) ਜਪਣ ਵਾਲੇ ਭੀ ਪਵਿਤ੍ਰ ਤੇ ਸੁਣਨ ਵਾਲੇ ਭੀ ਪਵਿਤ੍ਰ ਹੋ ਜਾਂਦੇ ਹਨ, ਜੇਹੜੇ ਇਸ ਨੂੰ ਮਨ ਵਿਚ ਵਸਾਂਦੇ ਹਨ ਉਹ ਭੀ ਪਵਿਤ੍ਰ ਹੋ ਜਾਂਦੇ ਹਨ। ਮੰਨਿ = ਮਨ ਵਿਚ।',
    },
    {
      id: 'YRCK',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੇ ਪਵਿਤੁ; ਜਿਨੀ ਗੁਰਮੁਖਿ ਹਰਿ ਹਰਿ ਧਿਆਇਆ ॥੧੭॥',
      pronunciation:
        'kahē nānaku. se pavitu; jinī guramukh har har dhiāiā ‖17‖',
      translation:
        'Says Nanak, pure and holy are those who, as Gurmukh, meditate on the Lord, Har, Har. ||17||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਜਿਨ੍ਹਾਂ ਬੰਦਿਆਂ ਨੇ ਗੁਰੂ ਦੀ ਸਰਨ ਪੈ ਕੇ ਹਰੀ-ਨਾਮ ਸਿਮਰਿਆ ਹੈ ਉਹ ਸੁੱਧ ਆਚਰਨ ਵਾਲੇ ਹੋ ਗਏ ਹਨ ॥੧੭॥',
    },
    {
      id: 'C5TC',
      src: 'ਕਰਮੀ ਸਹਜੁ. ਨ ਊਪਜੈ; ਵਿਣੁ ਸਹਜੈ. ਸਹਸਾ, ਨ ਜਾਇ ॥',
      pronunciation: 'karamī sahaju. na ūpajē; viṇ sahajē. sahasā, na jāi ‖',
      translation:
        'By religious rituals, intuitive poise is not found; without intuitive poise, skepticism does not depart.',
      vicar:
        'ਮਾਇਆ ਦੇ ਮੋਹ ਵਿਚ ਫਸੇ ਰਿਹਾਂ ਮਨ ਵਿਚ ਸਦਾ ਤੌਖ਼ਲਾ-ਸਹਿਮ ਬਣਿਆ ਰਹਿੰਦਾ ਹੈ, (ਇਹ) ਤੌਖ਼ਲਾ-ਸਹਿਮ ਆਤਮਕ ਆਨੰਦ ਤੋਂ ਬਿਨਾ ਦੂਰ ਨਹੀਂ ਹੁੰਦਾ, (ਤੇ,) ਆਤਮਕ ਆਨੰਦ ਬਾਹਰੋਂ ਧਾਰਮਿਕ ਜਾਪਦੇ ਕਰਮ ਕੀਤਿਆਂ ਪੈਦਾ ਨਹੀਂ ਹੋ ਸਕਦਾ। ਕਰਮੀ = (ਬਾਹਰੋਂ ਧਾਰਮਿਕ ਜਾਪਦੇ) ਕੰਮਾਂ ਨਾਲ, ਕਰਮ-ਕਾਂਡ ਦੀ ਰਾਹੀਂ। ਸਹਜੁ = ਅਡੋਲਤਾ, ਆਤਮਕ ਆਨੰਦ।',
    },
    {
      id: 'Z31K',
      src: 'ਨਹ ਜਾਇ ਸਹਸਾ. ਕਿਤੈ ਸੰਜਮਿ; ਰਹੇ ਕਰਮ ਕਮਾਏ ॥',
      pronunciation: 'nah jāi sahasā. kitē sañjami; rahe karam kamāe ‖',
      translation:
        'Skepticism does not depart by contrived actions; everybody is tired of performing these rituals.',
      vicar:
        'ਅਨੇਕਾਂ ਬੰਦੇ (ਅਜੇਹੇ) ਕਰਮ ਕਰ ਕਰ ਕੇ ਹਾਰ ਗਏ ਹਨ, ਪਰ ਮਨ ਦਾ ਤੌਖ਼ਲਾ-ਸਹਿਮ ਅਜੇਹੇ ਕਿਸੇ ਤਰੀਕੇ ਨਾਲ ਨਹੀਂ ਜਾਂਦਾ। ਸਹਸਾ = (ਮਾਇਆ ਦੇ ਮੋਹ ਤੋਂ ਪੈਦਾ ਹੋਏ) ਚਿੰਤਾ-ਸਹਿਮ। ਕਿਤੈ ਸੰਜਮਿ = ਕਿਸੇ ਜੁਗਤੀ ਨਾਲ। ਰਹੇ = ਥੱਕ ਗਏ।',
    },
    {
      id: 'ADUT',
      src: 'ਸਹਸੈ ਜੀਉ ਮਲੀਣੁ ਹੈ; ਕਿਤੁ ਸੰਜਮਿ ਧੋਤਾ ਜਾਏ ॥',
      pronunciation: 'sahasē jīu malīṇ hē; kit sañjam dhotā jāe ‖',
      translation:
        'The soul is polluted by skepticism; how can it be cleansed?',
      vicar:
        '(ਜਿਤਨਾ ਚਿਰ) ਮਨ ਸਹਿਮ ਵਿਚ (ਹੈ ਉਤਨਾ ਚਿਰ) ਮੈਲਾ ਰਹਿੰਦਾ ਹੈ, ਮਨ ਦੀ ਇਹ ਮੈਲ ਕਿਸੇ (ਬਾਹਰਲੀ) ਜੁਗਤੀ ਨਾਲ ਨਹੀਂ ਧੁਪਦੀ। ਮਲੀਣੁ = ਮੈਲਾ। ਕਿਤੁ = ਕਿਸ ਦੀ ਰਾਹੀਂ? ਕਿਤੁ ਸੰਜਮਿ = ਕਿਸ ਤਰੀਕੇ ਨਾਲ?',
    },
    {
      id: 'SB6Z',
      src: 'ਮੰਨੁ ਧੋਵਹੁ. ਸਬਦਿ ਲਾਗਹੁ; ਹਰਿ ਸਿਉ ਰਹਹੁ. ਚਿਤੁ ਲਾਇ ॥',
      pronunciation: 'mañn dhowahu. sabad lāgahu; har siu rahahu. cit lāi ‖',
      translation:
        'Wash your mind by attaching it to the Shabad, and keep your consciousness focused on the Lord.',
      vicar:
        'ਗੁਰੂ ਦੇ ਸ਼ਬਦ ਵਿਚ ਜੁੜੋ, ਪਰਮਾਤਮਾ ਦੇ ਚਰਨਾਂ ਵਿਚ ਸਦਾ ਚਿੱਤ ਜੋੜੀ ਰੱਖੋ, (ਜੇ) ਮਨ (ਧੋਣਾ ਹੈ ਤਾਂ ਇਸ ਤਰ੍ਹਾਂ) ਧੋਵੋ। ਮੰਨੁ = ਮਨ।',
    },
    {
      id: 'FYD3',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਗੁਰ ਪਰਸਾਦੀ ਸਹਜੁ ਉਪਜੈ; ਇਹੁ ਸਹਸਾ ਇਵ ਜਾਇ ॥੧੮॥',
      pronunciation:
        'kahē nānaku. gur parasādī sahaj upajē; ih sahasā iv jāi ‖18‖',
      translation:
        "Says Nanak, by Guru's Grace, intuitive poise is produced, and this skepticism is dispelled. ||18||",
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਹੀ (ਮਨੁੱਖ ਦੇ ਅੰਦਰ) ਆਤਮਕ ਆਨੰਦ ਪੈਦਾ ਹੁੰਦਾ ਹੈ, ਤੇ ਇਸ ਤਰ੍ਹਾਂ ਮਨ ਦਾ ਤੌਖ਼ਲਾ-ਸਹਿਮ ਦੂਰ ਹੋ ਜਾਂਦਾ ਹੈ ॥੧੮॥ ਇਵ = ਇਸ ਤਰ੍ਹਾਂ ॥੧੮॥',
    },
    {
      id: 'HSD3',
      src: 'ਜੀਅਹੁ ਮੈਲੇ; ਬਾਹਰਹੁ ਨਿਰਮਲ ॥',
      pronunciation: 'jīah mēle; bāharah niramal ‖',
      translation: 'Inwardly polluted, and outwardly pure.',
      vicar:
        '(ਨਿਰੇ ਬਾਹਰੋਂ ਧਾਰਮਿਕ ਦਿੱਸਦੇ ਕਰਮ ਕਰਨ ਵਾਲੇ ਬੰਦੇ) ਮਨ ਵਿਚ (ਵਿਕਾਰਾਂ ਨਾਲ) ਮੈਲੇ ਰਹਿੰਦੇ ਹਨ ਤੇ ਸਿਰਫ਼ ਵੇਖਣ ਨੂੰ ਹੀ ਪਵਿਤ੍ਰ ਜਾਪਦੇ ਹਨ। ਜੀਅਹੁ = ਜਿੰਦ ਤੋਂ, ਮਨ ਵਿਚੋਂ।',
    },
    {
      id: 'SHSP',
      src: 'ਬਾਹਰਹੁ ਨਿਰਮਲ. ਜੀਅਹੁ ਤ ਮੈਲੇ; ਤਿਨੀ ਜਨਮੁ ਜੂਐ ਹਾਰਿਆ ॥',
      pronunciation: 'bāharah niramal. jīah ta mēle; tinī janam jūē hāriā ‖',
      translation:
        'Those who are outwardly pure and yet polluted within, lose their lives in the gamble.',
      vicar:
        'ਤੇ, ਜੇਹੜੇ ਬੰਦੇ ਬਾਹਰੋਂ ਪਵਿਤ੍ਰ ਦਿੱਸਣ, ਉਂਞ ਮਨੋਂ ਵਿਕਾਰੀ ਹੋਣ, ਉਹਨਾਂ ਨੇ ਆਪਣਾ ਜੀਵਨ ਇਉਂ ਵਿਅਰਥ ਗਵਾ ਲਿਆ ਸਮਝੋ ਜਿਵੇਂ ਕੋਈ ਜੁਆਰੀਆ ਜੂਏ ਵਿਚ ਧਨ ਹਾਰ ਆਉਂਦਾ ਹੈ। ਤਿਨੀ = ਉਹਨਾਂ ਬੰਦਿਆਂ ਨੇ।',
    },
    {
      id: '5BTD',
      src: 'ਏਹ ਤਿਸਨਾ ਵਡਾ ਰੋਗੁ ਲਗਾ; ਮਰਣੁ ਮਨਹੁ ਵਿਸਾਰਿਆ ॥',
      pronunciation: 'eh tisanā waḍā rog lagā; maraṇ manah visāriā ‖',
      translation:
        'They contract this terrible disease of desire, and in their minds, they forget about dying.',
      vicar:
        '(ਉਹਨਾਂ ਨੂੰ ਅੰਦਰੋ-ਅੰਦਰ) ਮਾਇਆ ਦੀ ਤ੍ਰਿਸ਼ਨਾ ਦਾ ਭਾਰਾ ਰੋਗ ਖਾਈ ਜਾਂਦਾ ਹੈ, (ਮਾਇਆ ਦੇ ਲਾਲਚ ਵਿਚ) ਮੌਤ ਨੂੰ ਉਹਨਾਂ ਭੁਲਾਇਆ ਹੁੰਦਾ ਹੈ। ਮਰਣੁ = ਮੌਤ।',
    },
    {
      id: 'ELA8',
      src: 'ਵੇਦਾ ਮਹਿ ਨਾਮੁ ਉਤਮੁ. ਸੋ ਸੁਣਹਿ ਨਾਹੀ; ਫਿਰਹਿ ਜਿਉ ਬੇਤਾਲਿਆ ॥',
      pronunciation: 'vedā mah nām utamu. so suṇah nāhī; phirah jiu betāliā ‖',
      translation:
        'In the Vedas, the ultimate objective is the Naam, the Name of the Lord; but they do not hear this, and they wander around like demons.',
      vicar:
        '(ਲੋਕਾਂ ਦੀਆਂ ਨਜ਼ਰਾਂ ਵਿਚ ਧਾਰਮਿਕ ਦਿੱਸਣ ਵਾਸਤੇ ਉਹ ਆਪਣੇ ਬਾਹਰੋਂ ਧਾਰਮਿਕ ਦਿੱਸਦੇ ਕਰਮਾਂ ਦੀ ਵਡਿਆਈ ਦੱਸਣ ਲਈ ਵੇਦ ਆਦਿਕ ਧਰਮ-ਪੁਸਤਕਾਂ ਵਿਚੋਂ ਹਵਾਲੇ ਦੇਂਦੇ ਹਨ, ਪਰ) ਵੇਦ ਆਦਿਕ ਧਰਮ-ਪੁਸਤਕਾਂ ਵਿਚ ਜੋ ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਜਪਣ ਦਾ ਉੱਤਮ ਉਪਦੇਸ਼ ਹੈ ਉਸ ਵਲ ਉਹ ਧਿਆਨ ਨਹੀਂ ਕਰਦੇ, ਤੇ ਭੂਤਾਂ ਵਾਂਗ ਹੀ ਜਗਤ ਵਿਚ ਵਿਚਰਦੇ ਹਨ (ਜੀਵਨ-ਤਾਲ ਤੋਂ ਖੁੰਝੇ ਰਹਿੰਦੇ ਹਨ)। ਬੇਤਾਲੇ = ਭੂਤਨੇ, ਤਾਲ ਤੋਂ, ਖੁੰਝੇ ਹੋਏ।',
    },
    {
      id: '4U4N',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਨ ਸਚੁ ਤਜਿਆ. ਕੂੜੇ ਲਾਗੇ; ਤਿਨੀ ਜਨਮੁ ਜੂਐ ਹਾਰਿਆ ॥੧੯॥',
      pronunciation:
        'kahē nānaku. jin sac tajiā. kūṛe lāge; tinī janam jūē hāriā ‖19‖',
      translation:
        'Says Nanak, those who forsake Truth and cling to falsehood, lose their lives in the gamble. ||19||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਜਿਨ੍ਹਾਂ ਨੇ ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ (-ਸਿਮਰਨ) ਛੱਡਿਆ ਹੋਇਆ ਹੈ, ਤੇ ਜੋ ਮਾਇਆ ਦੇ ਮੋਹ ਵਿਚ ਫਸੇ ਹੋਏ ਹਨ, ਉਹਨਾਂ ਆਪਣੀ ਜੀਵਨ-ਖੇਡ ਜੂਏ ਵਿਚ ਹਾਰ ਲਈ ਸਮਝੋ ॥੧੯॥ ਜਿਨ = ਜਿਨ੍ਹਾਂ ਨੇ ॥੧੯॥',
    },
    {
      id: '5HQX',
      src: 'ਜੀਅਹੁ ਨਿਰਮਲ; ਬਾਹਰਹੁ ਨਿਰਮਲ ॥',
      pronunciation: 'jīah niramal; bāharah niramal ‖',
      translation: 'Inwardly pure, and outwardly pure.',
      vicar: 'ਉਹ ਬੰਦੇ ਮਨੋਂ ਭੀ ਪਵਿਤ੍ਰ ਹੁੰਦੇ ਹਨ, ਤੇ ਬਾਹਰੋਂ ਭੀ ਪਵਿਤ੍ਰ ਹੁੰਦੇ ਹਨ,',
    },
    {
      id: 'V34W',
      src: 'ਬਾਹਰਹੁ ਤ ਨਿਰਮਲ. ਜੀਅਹੁ ਨਿਰਮਲ; ਸਤਿਗੁਰ ਤੇ. ਕਰਣੀ ਕਮਾਣੀ ॥',
      pronunciation:
        'bāharah ta niramal. jīah niramal; satigur te. karaṇī kamāṇī ‖',
      translation:
        'Those who are outwardly pure and also pure within, through the Guru, perform good deeds.',
      vicar:
        'ਜੋ ਬੰਦੇ (ਆਚਰਨ-ਉਸਾਰੀ ਦੀ) ਉਹ ਕਮਾਈ ਕਰਦੇ ਹਨ ਜਿਸ ਦੀ ਹਿਦਾਇਤ ਗੁਰੂ ਤੋਂ ਮਿਲਦੀ ਹੈ, ਉਹ ਮਨੋਂ ਭੀ ਪਵਿਤ੍ਰ ਹੁੰਦੇ ਹਨ, ਤੇ ਬਾਹਰੋਂ ਭੀ ਪਵਿਤ੍ਰ ਹੁੰਦੇ ਹਨ (ਭਾਵ, ਉਹਨਾਂ ਦਾ ਜਗਤ ਨਾਲ ਵਰਤਾਰਾ ਭੀ ਸੁਚੱਜਾ ਹੁੰਦਾ ਹੈ), ਉਹ ਬਾਹਰੋਂ ਭੀ ਪਵਿਤ੍ਰ ਤੇ ਅੰਦਰੋਂ ਭੀ ਸੁੱਚੇ ਰਹਿੰਦੇ ਹਨ। ਸਤਿਗੁਰ ਤੇ = ਗੁਰੂ ਤੋਂ (ਮਿਲੀ ਹੋਈ), ਜਿਸ ਦਾ ਉਪਦੇਸ਼ ਗੁਰੂ ਤੋਂ ਮਿਲਿਆ ਹੈ। ਕਰਣੀ = ਆਚਰਨ, ਕਰਨ-ਯੋਗ ਕੰਮ। ਕਮਾਣੀ = ਕਮਾਈ ਹੈ।',
    },
    {
      id: 'ALMK',
      src: 'ਕੂੜ ਕੀ ਸੋਇ. ਪਹੁਚੈ ਨਾਹੀ; ਮਨਸਾ ਸਚਿ ਸਮਾਣੀ ॥',
      pronunciation: 'kūṛ kī soi. pahucē nāhī; manasā sac samāṇī ‖',
      translation:
        'Not even an iota of falsehood touches them; their hopes are absorbed in the Truth.',
      vicar:
        'ਉਹਨਾਂ ਦੇ ਮਨ ਦਾ ਮਾਇਕ ਫੁਰਨਾ ਸਿਮਰਨ ਵਿਚ ਹੀ ਮੁੱਕ ਜਾਂਦਾ ਹੈ, (ਉਹਨਾਂ ਦੇ ਅੰਦਰ ਇਤਨਾ ਆਤਮਕ ਆਨੰਦ ਬਣਦਾ ਹੈ ਕਿ) ਮਾਇਆ ਦੇ ਮੋਹ ਦੀ ਖ਼ਬਰ ਤਕ ਉਹਨਾਂ ਦੇ ਮਨ ਤਕ ਨਹੀਂ ਪਹੁੰਚਦੀ। ਕੂੜ = ਮਾਇਆ ਦਾ ਮੋਹ। ਸੋਇ = ਖ਼ਬਰ। ਮਨਸਾ = ਮਨ ਦਾ ਫੁਰਨਾ, ਮਨ ਵਿਚ ਮਾਇਆ ਦੇ ਮੋਹ ਦਾ ਫੁਰਨਾ। ਸਚਿ = ਪ੍ਰਭੂ ਦੇ ਸਿਮਰਨ ਵਿਚ।',
    },
    {
      id: 'XY83',
      src: 'ਜਨਮੁ ਰਤਨੁ ਜਿਨੀ ਖਟਿਆ; ਭਲੇ ਸੇ ਵਣਜਾਰੇ ॥',
      pronunciation: 'janam ratan jinī khaṭiā; bhale se waṇajāre ‖',
      translation:
        'Those who earn the jewel of this human life, are the most excellent of merchants.',
      vicar:
        '(ਜੀਵ ਜਗਤ ਵਿਚ ਆਤਮਕ ਆਨੰਦ ਦਾ ਵੱਖਰ ਵਿਹਾਝਣ ਆਏ ਹਨ) ਉਹੀ ਜੀਵ-ਵਪਾਰੀ ਚੰਗੇ ਕਹੇ ਜਾਂਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਨੇ (ਗੁਰੂ ਦੇ ਦੱਸੇ ਰਾਹ ਉਤੇ ਤੁਰ ਕੇ ਨਾਮ-ਕਮਾਈ ਕਰ ਕੇ) ਸ੍ਰੇਸ਼ਟ ਮਨੁੱਖਾ ਜਨਮ ਸਫਲਾ ਕਰ ਲਿਆ। ਵਣਜਾਰੇ = (ਜਗਤ ਵਿਚ ਭਗਤੀ ਦਾ) ਵਜਣ ਕਰਨ ਆਏ ਬੰਦੇ।',
    },
    {
      id: 'MAS1',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਜਿਨ ਮੰਨੁ ਨਿਰਮਲੁ; ਸਦਾ ਰਹਹਿ ਗੁਰ ਨਾਲੇ ॥੨੦॥',
      pronunciation: 'kahē nānaku. jin mañn niramalu; sadā rahah gur nāle ‖20‖',
      translation:
        'Says Nanak, those whose minds are pure, abide with the Guru forever. ||20||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਜਿਨ੍ਹਾਂ ਬੰਦਿਆਂ ਦਾ ਮਨ ਪਵਿਤ੍ਰ ਹੋ ਜਾਂਦਾ ਹੈ (ਜਿਨ੍ਹਾਂ ਦੇ ਅੰਦਰ ਆਤਮਕ ਆਨੰਦ ਬਣ ਜਾਂਦਾ ਹੈ) ਉਹ (ਅੰਤਰ ਆਤਮੇ) ਸਦਾ ਗੁਰੂ ਦੇ ਚਰਨਾਂ ਵਿਚ ਰਹਿੰਦੇ ਹਨ ॥੨੦॥ ਮੰਨੁ = ਮਨ ॥੨੦॥',
    },
    {
      id: 'E30Z',
      src: 'ਜੇ ਕੋ ਸਿਖੁ; ਗੁਰੂ ਸੇਤੀ ਸਨਮੁਖੁ ਹੋਵੈ ॥',
      pronunciation: 'je ko sikhu; gurū setī sanamukh hovē ‖',
      translation: 'If a Sikh turns to the Guru with sincere faith, as sunmukh',
      vicar:
        'ਜੇ ਕੋਈ ਸਿੱਖ ਗੁਰੂ ਦੇ ਸਾਹਮਣੇ ਸੁਰਖ਼ਰੂ ਹੋਣਾ ਚਾਹੁੰਦਾ ਹੈ, ਸੇਤੀ = ਨਾਲ। ਸਨਮੁਖੁ = ਸਾਹਮਣੇ ਮੂੰਹ ਰੱਖ ਸਕਣ ਵਾਲਾ, ਸੁਰਖ਼ਰੂ। ਹੋਵੈ = ਹੋਣਾ ਚਾਹੇ।',
    },
    {
      id: '6VWC',
      src: 'ਹੋਵੈ ਤ ਸਨਮੁਖੁ ਸਿਖੁ ਕੋਈ; ਜੀਅਹੁ ਰਹੈ ਗੁਰ ਨਾਲੇ ॥',
      pronunciation: 'hovē ta sanamukh sikh koī; jīah rahē gur nāle ‖',
      translation:
        'if a Sikh turns to the Guru with sincere faith, as sunmukh, his soul abides with the Guru.',
      vicar:
        'ਜੋ ਸਿੱਖ ਇਹ ਚਾਹੁੰਦਾ ਹੈ ਕਿ ਕਿਸੇ ਲੁਕਵੇਂ ਖੋਟ ਦੇ ਕਾਰਨ ਉਸ ਨੂੰ ਗੁਰੂ ਦੇ ਸਾਹਮਣੇ ਅੱਖਾਂ ਨੀਵੀਆਂ ਨ ਕਰਨੀਆਂ ਪੈਣ, (ਤਾਂ ਰਸਤਾ ਇਕੋ ਹੀ ਹੈ ਕਿ) ਉਹ ਸੱਚੇ ਦਿਲੋਂ ਗੁਰੂ ਦੇ ਚਰਨਾਂ ਵਿਚ ਟਿਕੇ। ਜੀਅਹੁ = ਦਿਲੋਂ। ਗੁਰ ਨਾਲੇ = ਗੁਰੂ ਦੇ ਚਰਨਾਂ ਵਿਚ।',
    },
    {
      id: 'HBZ7',
      src: 'ਗੁਰ ਕੇ ਚਰਨ. ਹਿਰਦੈ ਧਿਆਏ; ਅੰਤਰ ਆਤਮੈ ਸਮਾਲੇ ॥',
      pronunciation: 'gur ke caran. hiradē dhiāe; añtar ātamē samāle ‖',
      translation:
        'Within his heart, he meditates on the lotus feet of the Guru; deep within his soul, he contemplates Him.',
      vicar:
        'ਸਿੱਖ ਗੁਰੂ ਦੇ ਚਰਨਾਂ ਨੂੰ ਆਪਣੇ ਹਿਰਦੇ ਵਿਚ ਥਾਂ ਦੇਵੇ, ਆਪਣੇ ਆਤਮਾ ਦੇ ਅੰਦਰ ਸੰਭਾਲ ਰੱਖੇ। ਸਮਾਲੇ = ਯਾਦ ਰੱਖੇ, ਟਿਕਾਈ ਰੱਖੇ।',
    },
    {
      id: 'YF6T',
      src: 'ਆਪੁ ਛਡਿ. ਸਦਾ ਰਹੈ ਪਰਣੈ; ਗੁਰ ਬਿਨੁ ਅਵਰੁ. ਨ ਜਾਣੈ ਕੋਏ ॥',
      pronunciation: 'āp chaḍi. sadā rahē paraṇē; gur bin awaru. na jāṇē koe ‖',
      translation:
        'Renouncing selfishness and conceit, he remains always on the side of the Guru; he does not know anyone except the Guru.',
      vicar:
        'ਆਪਾ-ਭਾਵ ਛੱਡ ਕੇ ਸਦਾ ਗੁਰੂ ਦੇ ਆਸਰੇ, ਗੁਰੂ ਤੋਂ ਬਿਨਾ ਕਿਸੇ ਹੋਰ ਨੂੰ (ਆਪਣੇ ਆਤਮਕ ਜੀਵਨ ਦਾ, ਆਤਮਕ ਆਨੰਦ ਦਾ ਵਸੀਲਾ) ਨਾ ਸਮਝੇ। ਆਪੁ = ਆਪਾ-ਭਾਵ। ਪਰਣੈ = ਆਸਰੇ।',
    },
    {
      id: '2UCM',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਸੋ ਸਿਖੁ ਸਨਮੁਖੁ ਹੋਏ ॥੨੧॥',
      pronunciation: 'kahē nānaku. suṇah sañtahu; so sikh sanamukh hoe ‖21‖',
      translation:
        'Says Nanak, listen, O Saints: such a Sikh turns toward the Guru with sincere faith, and becomes sunmukh. ||21||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਸੰਤ ਜਨੋ! ਸੁਣੋ ਉਹ ਸਿੱਖ (ਹੀ) ਖਿੜੇ-ਮੱਥੇ ਰਹਿ ਸਕਦਾ ਹੈ (ਉਸ ਦੇ ਹੀ ਅੰਦਰ ਆਤਮਕ ਖੇੜਾ ਹੋ ਸਕਦਾ ਹੈ, ਉਹੀ ਆਤਮਕ ਆਨੰਦ ਮਾਣ ਸਕਦਾ ਹੈ) ॥੨੧॥',
    },
    {
      id: '18BG',
      src: 'ਜੇ ਕੋ. ਗੁਰ ਤੇ ਵੇਮੁਖੁ ਹੋਵੈ; ਬਿਨੁ ਸਤਿਗੁਰ ਮੁਕਤਿ. ਨ ਪਾਵੈ ॥',
      pronunciation: 'je ko. gur te vemukh hovē; bin satigur mukati. na pāvē ‖',
      translation:
        'One who turns away from the Guru, and becomes baymukh - without the True Guru, he shall not find liberation.',
      vicar:
        '(ਜਿਥੇ ਮਾਇਆ ਦੇ ਮੋਹ ਦੇ ਕਾਰਨ ਸਹਿਮ ਹੈ ਉਥੇ ਆਤਮਕ ਆਨੰਦ ਨਹੀਂ ਪਲ੍ਹਰ ਸਕਦਾ, ਪਰ)  ਜੇ ਕੋਈ ਮਨੁੱਖ ਗੁਰੂ ਵਲੋਂ ਮੂੰਹ ਮੋੜ ਲਏ (ਉਸ ਨੂੰ ਆਤਮਕ ਆਨੰਦ ਨਸੀਬ ਨਹੀਂ ਹੋ ਸਕਦਾ ਕਿਉਂਕਿ) ਗੁਰੂ ਤੋਂ ਬਿਨਾ ਮਾਇਆ ਦੇ ਪ੍ਰਭਾਵ ਤੋਂ ਖ਼ਲਾਸੀ ਨਹੀਂ ਮਿਲਦੀ। ਵੇਮੁਖੁ = ਜਿਸ ਨੇ ਮੂੰਹ ਦੂਜੇ ਪਾਸੇ ਕੀਤਾ ਹੋਇਆ ਹੈ। ਮੁਕਤਿ = ਵਿਕਾਰਾਂ ਤੋਂ ਖ਼ਲਾਸੀ, ਮਾਇਆ ਦੇ ਪ੍ਰਭਾਵ ਤੋਂ ਖ਼ਲਾਸੀ।',
    },
    {
      id: '1T4C',
      src: 'ਪਾਵੈ ਮੁਕਤਿ ਨ. ਹੋਰ ਥੈ ਕੋਈ; ਪੁਛਹੁ ਬਿਬੇਕੀਆ ਜਾਏ ॥',
      pronunciation: 'pāvē mukat n. hor thē koī; puchah bibekīā jāe ‖',
      translation:
        'He shall not find liberation anywhere else either; go and ask the wise ones about this.',
      vicar:
        'ਬੇਸ਼ੱਕ ਕਿਸੇ ਵਿਚਾਰਵਾਨਾਂ ਤੋਂ ਜਾ ਕੇ ਪੁੱਛ ਲਵੋ (ਤੇ ਤਸੱਲੀ ਕਰ ਲਵੋ, ਇਹ ਪੱਕੀ ਗੱਲ ਹੈ ਕਿ ਗੁਰੂ ਤੋਂ ਬਿਨਾ) ਕਿਸੇ ਭੀ ਹੋਰ ਥਾਂ ਤੋਂ ਮਾਇਕ ਬੰਧਨਾਂ ਤੋਂ ਖ਼ਲਾਸੀ ਨਹੀਂ ਮਿਲਦੀ। ਹੋਰਥੈ = ਕਿਸੇ ਹੋਰ ਥਾਂ ਤੋਂ। ਬਿਬੇਕੀ = ਪਰਖ ਵਾਲਾ ਬੰਦਾ, ਵਿਚਾਰਵਾਨ। ਜਾਏ = ਜਾਇ, ਜਾ ਕੇ।',
    },
    {
      id: 'E534',
      src: 'ਅਨੇਕ ਜੂਨੀ. ਭਰਮਿ ਆਵੈ; ਵਿਣੁ ਸਤਿਗੁਰ ਮੁਕਤਿ. ਨ ਪਾਏ ॥',
      pronunciation: 'anek jūnī. bharam āvē; viṇ satigur mukati. na pāe ‖',
      translation:
        'He shall wander through countless incarnations; without the True Guru, he shall not find liberation.',
      vicar:
        '(ਮਾਇਆ ਦੇ ਮੋਹ ਵਿਚ ਫਸਿਆ ਮਨੁੱਖ) ਅਨੇਕਾਂ ਜੂਨੀਆਂ ਵਿਚ ਭਟਕਦਾ ਆਉਂਦਾ ਹੈ, ਗੁਰੂ ਦੀ ਸਰਨ ਤੋਂ ਬਿਨਾ ਇਸ ਮੋਹ ਤੋਂ ਖ਼ਲਾਸੀ ਨਹੀਂ ਮਿਲਦੀ। ਭਰਮਿ ਆਵੈ = ਭਟਕ ਕੇ ਆਉਂਦਾ ਹੈ।',
    },
    {
      id: 'HWVB',
      src: 'ਫਿਰਿ ਮੁਕਤਿ ਪਾਏ. ਲਾਗਿ ਚਰਣੀ; ਸਤਿਗੁਰੂ ਸਬਦੁ ਸੁਣਾਏ ॥',
      pronunciation: 'phir mukat pāe. lāg caraṇī; satigurū sabad suṇāe ‖',
      translation:
        'But liberation is attained, when one is attached to the feet of the True Guru, chanting the Word of the Shabad.',
      vicar:
        'ਆਖ਼ਰ ਗੁਰੂ ਦੀ ਚਰਨੀਂ ਲੱਗ ਕੇ ਹੀ ਮਾਇਆ ਦੇ ਮੋਹ ਤੋਂ ਛੁਟਕਾਰਾ ਮਿਲਦਾ ਹੈ ਕਿਉਂਕਿ ਗੁਰੂ (ਸਹੀ ਜੀਵਨ-ਮਾਰਗ ਦਾ) ਉਪਦੇਸ਼ ਸੁਣਾਂਦਾ ਹੈ।',
    },
    {
      id: '9V88',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਵੀਚਾਰਿ ਦੇਖਹੁ; ਵਿਣੁ ਸਤਿਗੁਰ ਮੁਕਤਿ. ਨ ਪਾਏ ॥੨੨॥',
      pronunciation:
        'kahē nānaku. vīcār dekhahu; viṇ satigur mukati. na pāe ‖22‖',
      translation:
        'Says Nanak, contemplate this and see, that without the True Guru, there is no liberation. ||22||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਵਿਚਾਰ ਕੇ ਵੇਖ ਲਵੋ, ਗੁਰੂ ਤੋਂ ਬਿਨਾ ਮਾਇਆ ਦੇ ਬੰਧਨ ਤੋਂ ਆਜ਼ਾਦੀ ਨਹੀਂ ਮਿਲਦੀ, (ਤੇ ਇਸ ਮੁਕਤੀ ਤੋਂ ਬਿਨਾ ਆਤਮਕ ਆਨੰਦ ਦੀ ਪ੍ਰਾਪਤੀ ਨਹੀਂ ਹੋ ਸਕਦੀ) ॥੨੨॥',
    },
    {
      id: '5A6J',
      src: 'ਆਵਹੁ ਸਿਖ. ਸਤਿਗੁਰੂ ਕੇ ਪਿਆਰਿਹੋ; ਗਾਵਹੁ ਸਚੀ ਬਾਣੀ ॥',
      pronunciation: 'āwah sikh. satigurū ke piāriho; gāwah sacī bāṇī ‖',
      translation:
        'Come, O beloved Sikhs of the True Guru, and sing the True Word of His Bani.',
      vicar:
        'ਹੇ ਸਤਿਗੁਰੂ ਦੇ ਪਿਆਰੇ ਸਿੱਖੋ! ਆਵੋ, ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲੇ ਪਰਮਾਤਮਾ ਵਿਚ ਜੋੜਨ ਵਾਲੀ ਬਾਣੀ (ਰਲ ਕੇ) ਗਾਵੋ। ਸਚੀ ਬਾਣੀ = ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਵਾਲੀ ਬਾਣੀ, ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲੇ ਪ੍ਰਭੂ ਵਿਚ ਜੋੜਨ ਵਾਲੀ ਬਾਣੀ।',
    },
    {
      id: 'EPV2',
      src: 'ਬਾਣੀ ਤ ਗਾਵਹੁ ਗੁਰੂ ਕੇਰੀ; ਬਾਣੀਆ ਸਿਰਿ ਬਾਣੀ ॥',
      pronunciation: 'bāṇī ta gāwah gurū kerī; bāṇīā sir bāṇī ‖',
      translation: "Sing the Guru's Bani, the supreme Word of Words.",
      vicar:
        'ਆਪਣੇ ਗੁਰੂ ਦੀ ਬਾਣੀ ਗਾਵੋ, ਇਹ ਬਾਣੀ ਹੋਰ ਸਭ ਬਾਣੀਆਂ ਨਾਲੋਂ ਸ਼ਿਰੋਮਣੀ ਹੈ। ਸਿਰ = ਸਿਰ ਉਤੇ, ਸਭ ਤੋਂ ਸ੍ਰੇਸ਼ਟ।',
    },
    {
      id: 'DDQQ',
      src: 'ਜਿਨ ਕਉ ਨਦਰਿ ਕਰਮੁ ਹੋਵੈ; ਹਿਰਦੈ ਤਿਨਾ ਸਮਾਣੀ ॥',
      pronunciation: 'jin kau nadar karam hovē; hiradē tinā samāṇī ‖',
      translation:
        "Those who are blessed by the Lord's Glance of Grace - their hearts are imbued with this Bani.",
      vicar:
        'ਇਹ ਬਾਣੀ ਉਹਨਾਂ ਬੰਦਿਆਂ ਦੇ ਹਿਰਦੇ ਵਿਚ ਹੀ ਟਿਕਦੀ ਹੈ ਜਿਨ੍ਹਾਂ ਉਤੇ ਪਰਮਾਤਮਾ ਦੀ ਮੇਹਰ ਦੀ ਨਜ਼ਰ ਹੋਵੇ, ਬਖ਼ਸ਼ਸ਼ ਹੋਵੇ। ਨਦਰਿ = ਮੇਹਰ ਦੀ ਨਜ਼ਰ। ਕਰਮੁ = ਬਖ਼ਸ਼ਸ਼।',
    },
    {
      id: 'UBZE',
      src: 'ਪੀਵਹੁ ਅੰਮ੍ਰਿਤੁ. ਸਦਾ ਰਹਹੁ ਹਰਿ ਰੰਗਿ; ਜਪਿਹੁ ਸਾਰਿਗਪਾਣੀ ॥',
      pronunciation: 'pīwah añmritu. sadā rahah har rañgi; japih sārigapāṇī ‖',
      translation:
        "Drink in this Ambrosial Nectar, and remain in the Lord's Love forever; meditate on the Lord, the Sustainer of the world.",
      vicar:
        '(ਹੇ ਪਿਆਰੇ ਗੁਰਸਿੱਖੋ!) ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ ਸਿਮਰੋ, ਪਰਮਾਤਮਾ ਦੇ ਪਿਆਰ ਵਿਚ ਸਦਾ ਜੁੜੇ ਰਹੋ, ਇਹ (ਆਨੰਦ ਦੇਣ ਵਾਲਾ, ਆਤਮਕ ਹੁਲਾਰਾ ਪੈਦਾ ਕਰਨ ਵਾਲਾ) ਨਾਮ-ਜਲ ਪੀਓ। ਹਰਿ ਰੰਗਿ = ਹਰੀ ਦੇ ਪਿਆਰ ਵਿਚ। ਸਾਰਿਗ ਪਾਣੀ = ਧਨੁਖਧਾਰੀ ਪ੍ਰਭੂ। ਕੇਰੀ = ਦੀ। ਅੰਮ੍ਰਿਤ = ਆਤਮਕ ਆਨੰਦ ਦੇਣ ਵਾਲਾ ਨਾਮ-ਜਲ।',
    },
    {
      id: 'UCDS',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਦਾ ਗਾਵਹੁ; ਏਹ ਸਚੀ ਬਾਣੀ ॥੨੩॥',
      pronunciation: 'kahē nānaku. sadā gāwahu; eh sacī bāṇī ‖23‖',
      translation: 'Says Nanak, sing this True Bani forever. ||23||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਹੇ ਗੁਰਸਿੱਖੋ!) ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਵਾਲੀ ਇਹ ਬਾਣੀ ਸਦਾ ਗਾਵੋ (ਇਸੇ ਵਿਚ ਆਤਮਕ ਆਨੰਦ ਹੈ) ॥੨੩॥',
    },
    {
      id: 'R5BM',
      src: 'ਸਤਿਗੁਰੂ ਬਿਨਾ; ਹੋਰ ਕਚੀ ਹੈ ਬਾਣੀ ॥',
      pronunciation: 'satigurū binā; hor kacī hē bāṇī ‖',
      translation: 'Without the True Guru, other songs are false.',
      vicar:
        'ਗੁਰ-ਆਸ਼ੇ ਤੋਂ ਉਲਟ ਬਾਣੀ (ਮਾਇਆ) ਦੀ ਝਲਕ ਦੇ ਸਾਹਮਣੇ ਥਿੜਕਾ ਦੇਣ ਵਾਲੀ ਹੁੰਦੀ ਹੈ। ਸਤਿਗੁਰੂ ਬਿਨਾ = ਗੁਰ-ਆਸ਼ੇ ਤੋਂ ਉਲਟ।',
    },
    {
      id: 'D2XF',
      src: 'ਬਾਣੀ ਤ ਕਚੀ. ਸਤਿਗੁਰੂ ਬਾਝਹੁ; ਹੋਰ ਕਚੀ ਬਾਣੀ ॥',
      pronunciation: 'bāṇī ta kacī. satigurū bājhahu; hor kacī bāṇī ‖',
      translation:
        'The songs are false without the True Guru; all other songs are false.',
      vicar:
        'ਗੁਰ-ਆਸ਼ੇ ਤੋਂ ਉਲਟ ਬਾਣੀ ਮਨੁੱਖ ਦੇ ਮਨ ਨੂੰ ਆਤਮਕ ਆਨੰਦ ਦੇ ਟਿਕਾਣੇ ਤੋਂ ਹੇਠਾਂ ਡੇਗਦੀ ਹੈ। ਕਚੀ = ਹੌਲੇ ਮੇਲ ਦੀ, ਮਨ ਨੂੰ ਨੀਵਾਂ ਕਰਨ ਵਾਲੀ, ਉੱਚੇ ਆਤਮਕ ਆਨੰਦ ਤੋਂ ਹੇਠਾਂ ਲਿਆਉਣ ਵਾਲੀ।',
    },
    {
      id: 'EF4C',
      src: 'ਕਹਦੇ ਕਚੇ; ਸੁਣਦੇ ਕਚੇ; ਕਚੀਂ︀ ਆਖਿ ਵਖਾਣੀ ॥',
      pronunciation: 'kahade kace; suṇade kace; kacīñ ākh wakhāṇī ‖',
      translation:
        'The speakers are false, and the listeners are false; those who speak and recite are false.',
      vicar:
        'ਇਹ ਪੱਕੀ ਗੱਲ ਹੈ ਕਿ ਗੁਰ-ਆਸ਼ੇ ਦੇ ਉਲਟ ਜਾਣ ਵਾਲੀ ਬਾਣੀ ਨੂੰ ਸੁਣਨ ਵਾਲਿਆਂ ਦੇ ਮਨ ਕਮਜ਼ੋਰ ਹੋ ਜਾਂਦੇ ਹਨ, ਸੁਣਨ ਵਾਲਿਆਂ ਦੇ ਮਨ ਭੀ ਥਿੜਕ ਜਾਂਦੇ ਹਨ, ਤੇ ਜੋ ਅਜੇਹੀ ਬਾਣੀ ਦੀ ਪੜ੍ਹ ਪੜ੍ਹ ਕੇ ਵਿਆਖਿਆ ਕਰਦੇ ਹਨ, ਉਹ ਭੀ ਕਮਜ਼ੋਰ ਮਨ ਦੇ ਹੋ ਜਾਂਦੇ ਹਨ। ਕਚੇ = ਉਹ ਬੰਦੇ ਜਿਨ੍ਹਾਂ ਦਾ ਮਨ ਕਮਜ਼ੋਰ ਹੈ, ਜੋ ਮਾਇਆ ਦੇ ਪ੍ਰਭਾਵ ਦੇ ਸਾਹਮਣੇ ਥਿੜਕ ਸਕਦੇ ਹਨ। ਸੁਣਦੇ ਕਚੇ = ਸੁਣਨ ਵਾਲਿਆਂ ਦੇ ਮਨ ਭੀ ਥਿੜਕ ਜਾਂਦੇ ਹਨ।',
    },
    {
      id: 'U8YD',
      src: 'ਹਰਿ ਹਰਿ ਨਿਤ ਕਰਹਿ ਰਸਨਾ; ਕਹਿਆ ਕਛੂ. ਨ ਜਾਣੀ ॥',
      pronunciation: 'har har nit karah rasanā; kahiā kachū. na jāṇī ‖',
      translation:
        "They may continually chant, 'Har, Har' with their tongues, but they do not know what they are saying.",
      vicar:
        'ਜੇ ਉਹ ਬੰਦੇ ਜੀਭ-ਨਾਲ ਹਰੀ-ਨਾਮ ਭੀ ਬੋਲਣ ਤਾਂ ਭੀ ਜੋ ਕੁਝ ਉਹ ਬੋਲਦੇ ਹਨ ਉਸ ਨਾਲ ਉਹਨਾਂ ਦੀ ਡੂੰਘੀ ਸਾਂਝ ਨਹੀਂ ਪੈਂਦੀ, ਕਹਿਆ = ਜੋ ਕੁਝ ਮੂੰਹੋਂ ਆਖਦੇ ਹਨ।',
    },
    {
      id: 'E49U',
      src: 'ਚਿਤੁ ਜਿਨ ਕਾ. ਹਿਰਿ ਲਇਆ ਮਾਇਆ; ਬੋਲਨਿ ਪਏ ਰਵਾਣੀ ॥',
      pronunciation: 'cit jin kā. hir laiā māiā; bolan pae ravāṇī ‖',
      translation:
        'Their consciousness is lured by Maya; they are just reciting mechanically.',
      vicar:
        'ਕਿਉਂਕਿ ਉਹਨਾਂ ਦੇ ਮਨ ਨੂੰ ਮਾਇਆ ਨੇ ਮੋਹ ਰੱਖਿਆ ਹੈ, ਉਹ ਜੋ ਕੁਝ ਬੋਲਦੇ ਹਨ ਜ਼ਬਾਨੀ ਜ਼ਬਾਨੀ ਹੀ ਬੋਲਦੇ ਹਨ। ਹਿਰਿ ਲਇਆ = ਚੁਰਾ ਲਿਆ। ਰਵਾਣੀ = ਜ਼ਬਾਨੀ ਜ਼ਬਾਨੀ, ਉਤੋਂ ਉਤੋਂ।',
    },
    {
      id: 'T3PH',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਤਿਗੁਰੂ ਬਾਝਹੁ; ਹੋਰ ਕਚੀ ਬਾਣੀ ॥੨੪॥',
      pronunciation: 'kahē nānaku. satigurū bājhahu; hor kacī bāṇī ‖24‖',
      translation:
        'Says Nanak, without the True Guru, other songs are false. ||24||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਗੁਰ-ਆਸ਼ੇ ਤੋਂ ਉਲਟ ਬਾਣੀ ਮਨੁੱਖ ਦੇ ਮਨ ਨੂੰ ਆਤਮਕ ਆਨੰਦ ਦੇ ਟਿਕਾਣੇ ਤੋਂ ਹੇਠਾਂ ਡੇਗਦੀ ਹੈ ॥੨੪॥ ਕਚੀ = ਕੱਚਿਆਂ ਨੇ, ਕਮਜ਼ੋਰ ਮਨ ਵਾਲਿਆਂ ਨੇ ॥੨੪॥',
    },
    {
      id: 'UJ4T',
      src: 'ਗੁਰ ਕਾ ਸਬਦੁ. ਰਤੰਨੁ ਹੈ; ਹੀਰੇ ਜਿਤੁ ਜੜਾਉ ॥',
      pronunciation: 'gur kā sabadu. ratañn hē; hīre jit jaṛāu ‖',
      translation:
        "The Word of the Guru's Shabad is a jewel, studded with diamonds.",
      vicar:
        'ਸਤਿਗੁਰੂ ਦਾ ਸ਼ਬਦ ਇਕ ਐਸੀ ਅਮੋਲਕ ਦਾਤ ਹੈ ਜਿਸ ਵਿਚ ਪਰਮਾਤਮਾ ਦੀਆਂ ਵਡਿਆਈਆਂ ਭਰੀਆਂ ਪਈਆਂ ਹਨ। ਰਤੰਨੁ = ਰਤਨ, ਅਮੋਲਕ ਦਾਤਿ। ਜਿਤੁ = ਜਿਸ (ਸ਼ਬਦ) ਵਿਚ। ਹੀਰੇ = ਪਰਮਾਤਮਾ ਦੇ ਗੁਣ। ਜੜਾਉ = ਜੜੇ ਹੋਏ।',
    },
    {
      id: '0S9X',
      src: 'ਸਬਦੁ ਰਤਨੁ ਜਿਤੁ ਮੰਨੁ ਲਾਗਾ; ਏਹੁ ਹੋਆ ਸਮਾਉ ॥',
      pronunciation: 'sabad ratan jit mañn lāgā; eh hoā samāu ‖',
      translation:
        'The mind which is attached to this jewel, merges into the Shabad.',
      vicar:
        'ਸ਼ਬਦ, ਮਾਨੋ, (ਐਸਾ) ਰਤਨ ਹੈ, ਕਿ ਉਸ ਦੀ ਰਾਹੀਂ (ਮਨੁੱਖ ਦਾ) ਮਨ (ਪਰਮਾਤਮਾ ਦੀ ਯਾਦ ਵਿਚ) ਟਿਕ ਜਾਂਦਾ ਹੈ (ਪਰਮਾਤਮਾ ਵਿਚ) ਇਕ ਅਸਚਰਜ ਲੀਨਤਾ ਬਣੀ ਰਹਿੰਦੀ ਹੈ। ਮੰਨੁ = ਮਨ। ਏਹੁ ਸਮਾਉ = ਐਸੀ ਲੀਨਤਾ।',
    },
    {
      id: 'YXC6',
      src: 'ਸਬਦ ਸੇਤੀ ਮਨੁ ਮਿਲਿਆ; ਸਚੈ ਲਾਇਆ ਭਾਉ ॥',
      pronunciation: 'sabad setī man miliā; sacē lāiā bhāu ‖',
      translation:
        'One whose mind is attuned to the Shabad, enshrines love for the True Lord.',
      vicar:
        'ਜੇ ਸ਼ਬਦ ਵਿਚ (ਮਨੁੱਖ ਦਾ) ਮਨ ਜੁੜ ਜਾਏ, ਤਾਂ (ਇਸ ਦੀ ਬਰਕਤਿ ਨਾਲ) ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲੇ ਪ੍ਰਭੂ ਵਿਚ (ਉਸ ਦਾ) ਪ੍ਰੇਮ ਬਣ ਜਾਂਦਾ ਹੈ। ਸਚੈ = ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਵਿਚ। ਭਾਉ = ਪਿਆਰ।',
    },
    {
      id: '1C5U',
      src: 'ਆਪੇ ਹੀਰਾ. ਰਤਨੁ ਆਪੇ; ਜਿਸ ਨੋ ਦੇਇ ਬੁਝਾਇ ॥',
      pronunciation: 'āpe hīrā. ratan āpe; jis no dei bujhāi ‖',
      translation:
        'He Himself is the diamond, and He Himself is the jewel; one who is blessed, understands its value.',
      vicar:
        '(ਉਸ ਦੇ ਅੰਦਰ ਪਰਮਾਤਮਾ ਦਾ) ਹੀਰਾ-ਨਾਮ ਹੀ ਟਿਕਿਆ ਰਹਿੰਦਾ ਹੈ, (ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦਾ) ਰਤਨ-ਸ਼ਬਦ ਹੀ ਟਿਕਿਆ ਰਹਿੰਦਾ ਹੈ। (ਪਰ ਇਹ ਦਾਤ ਉਸ ਨੂੰ ਹੀ ਮਿਲਦੀ ਹੈ) ਜਿਸ ਨੂੰ (ਪ੍ਰਭੂ ਆਪ ਇਹ) ਸੂਝ ਬਖ਼ਸ਼ਦਾ ਹੈ। ਬੁਝਾਇ ਦੇਇ = ਸੂਝ ਦੇਂਦਾ ਹੈ।',
    },
    {
      id: '99QJ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਬਦੁ ਰਤਨੁ ਹੈ; ਹੀਰਾ ਜਿਤੁ ਜੜਾਉ ॥੨੫॥',
      pronunciation: 'kahē nānaku. sabad ratan hē; hīrā jit jaṛāu ‖25‖',
      translation:
        'Says Nanak, the Shabad is a jewel, studded with diamonds. ||25||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਗੁਰੂ ਦਾ ਸ਼ਬਦ, ਮਾਨੋ, ਇਕ ਰਤਨ ਹੈ ਜਿਸ ਵਿਚ ਪ੍ਰਭੂ ਦਾ ਨਾਮ-ਰੂਪ ਹੀਰਾ ਜੜਿਆ ਹੋਇਆ ਹੈ ॥੨੫॥ ਹੀਰਾ = ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ। ਆਪੇ = ਆਪ ਹੀ ॥੨੫॥',
    },
    {
      id: 'QW7A',
      src: 'ਸਿਵ ਸਕਤਿ. ਆਪਿ ਉਪਾਇ ਕੈ ਕਰਤਾ; ਆਪੇ ਹੁਕਮੁ ਵਰਤਾਏ ॥',
      pronunciation: 'siv sakati. āp upāi kē karatā; āpe hukam waratāe ‖',
      translation:
        'He Himself created Shiva and Shakti, mind and matter; the Creator subjects them to His Command.',
      vicar:
        'ਜੀਵਾਤਮਾ ਅਤੇ ਮਾਇਆ ਪੈਦਾ ਕਰ ਕੇ ਪਰਮਾਤਮਾ ਆਪ ਹੀ (ਇਹ) ਹੁਕਮ ਵਰਤਾਂਦਾ ਹੈ ਕਿ (ਮਾਇਆ ਦਾ ਜ਼ੋਰ ਜੀਵਾਂ ਉਤੇ ਪਿਆ ਰਹੇ)। ਸਿਵ = ਚੇਤਨ ਸੱਤਾ, ਜੀਵਾਤਮਾ। ਸਕਤਿ = ਮਾਇਆ। ਆਪੇ = ਆਪ ਹੀ।',
    },
    {
      id: 'BW7T',
      src: 'ਹੁਕਮੁ ਵਰਤਾਏ ਆਪਿ ਵੇਖੈ; ਗੁਰਮੁਖਿ ਕਿਸੈ ਬੁਝਾਏ ॥',
      pronunciation: 'hukam waratāe āp vekhē; guramukh kisē bujhāe ‖',
      translation:
        'Enforcing His Order, He Himself sees all. How rare are those who, as Gurmukh, come to know Him.',
      vicar:
        'ਪ੍ਰਭੂ ਆਪ ਹੀ ਇਹ ਹੁਕਮ ਵਰਤਾਂਦਾ ਹੈ, ਆਪ ਹੀ ਇਹ ਖੇਡ ਵੇਖਦਾ ਹੈ (ਕਿ ਕਿਸ ਤਰ੍ਹਾਂ ਜੀਵ ਮਾਇਆ ਦੇ ਹੱਥਾਂ ਉਤੇ ਨੱਚ ਰਹੇ ਹਨ), ਕਿਸੇ ਕਿਸੇ ਵਿਰਲੇ ਨੂੰ ਗੁਰੂ ਦੀ ਰਾਹੀਂ (ਇਸ ਖੇਡ ਦੀ) ਸੂਝ ਦੇ ਦੇਂਦਾ ਹੈ। ਹੁਕਮੁ = (ਇਹ) ਹੁਕਮ (ਕਿ ਜੀਵਾਂ ਉਤੇ) ਮਾਇਆ ਦਾ ਪ੍ਰਭਾਵ ਪਿਆ ਰਹੇ। ਗੁਰਮੁਖਿ = ਗੁਰੂ ਦੀ ਰਾਹੀਂ। ਕਿਸੈ = ਕਿਸੇ (ਵਿਰਲੇ) ਨੂੰ। ਬੁਝਾਏ = ਸੂਝ ਦੇਂਦਾ ਹੈ।',
    },
    {
      id: '79EN',
      src: 'ਤੋੜੇ ਬੰਧਨ. ਹੋਵੈ ਮੁਕਤੁ; ਸਬਦੁ ਮੰਨਿ ਵਸਾਏ ॥',
      pronunciation: 'toṛe bañdhan. hovē mukatu; sabad mañn wasāe ‖',
      translation:
        'They break their bonds, and attain liberation; they enshrine the Shabad within their minds.',
      vicar:
        '(ਜਿਸ ਨੂੰ ਸੂਝ ਬਖ਼ਸ਼ਦਾ ਹੈ ਉਸ ਦੇ) ਮਾਇਆ (ਦੇ ਮੋਹ) ਦੇ ਬੰਧਨ ਤੋੜ ਦੇਂਦਾ ਹੈ, ਉਹ ਬੰਦਾ ਮਾਇਆ ਦੇ ਬੰਧਨਾਂ ਤੋਂ ਸੁਤੰਤਰ ਹੋ ਜਾਂਦਾ ਹੈ (ਕਿਉਂਕਿ) ਉਹ ਗੁਰੂ ਦਾ ਸ਼ਬਦ ਆਪਣੇ ਮਨ ਵਿਚ ਵਸਾ ਲੈਂਦਾ ਹੈ। ਮੁਕਤੁ = ਮਾਇਆ ਦੇ ਪ੍ਰਭਾਵ ਤੋਂ ਆਜ਼ਾਦ ਸੁਤੰਤਰ। ਮੰਨਿ = ਮਨ ਵਿਚ।',
    },
    {
      id: 'ZFQX',
      src: 'ਗੁਰਮੁਖਿ ਜਿਸ ਨੋ ਆਪਿ ਕਰੇ ਸੁ ਹੋਵੈ; ਏਕਸ ਸਿਉ ਲਿਵ ਲਾਏ ॥',
      pronunciation: 'guramukh jis no āp kare sa hovē; ekas siu liv lāe ‖',
      translation:
        'Those whom the Lord Himself makes Gurmukh, lovingly focus their consciousness on the One Lord.',
      vicar:
        'ਗੁਰੂ ਦੇ ਦੱਸੇ ਰਾਹ ਉਤੇ ਤੁਰਨ ਜੋਗਾ ਉਹੀ ਮਨੁੱਖ ਹੁੰਦਾ ਹੈ ਜਿਸ ਨੂੰ ਪ੍ਰਭੂ ਇਹ ਸਮਰੱਥਾ ਦੇਂਦਾ ਹੈ, ਉਹ ਮਨੁੱਖ ਇਕ ਪਰਮਾਤਮਾ ਦੇ ਚਰਨਾਂ ਵਿਚ ਸੁਰਤ ਜੋੜਦਾ ਹੈ (ਉਸ ਦੇ ਅੰਦਰ ਆਤਮਕ ਆਨੰਦ ਬਣਦਾ ਹੈ, ਤੇ ਉਹ ਮਾਇਆ ਦੇ ਮੋਹ ਵਿਚੋਂ ਨਿਕਲਦਾ ਹੈ)। ਗੁਰਮੁਖਿ = ਗੁਰੂ ਦੇ ਰਾਹ ਉਤੇ ਤੁਰਨ ਵਾਲਾ।',
    },
    {
      id: 'CA75',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਆਪਿ ਕਰਤਾ; ਆਪੇ ਹੁਕਮੁ ਬੁਝਾਏ ॥੨੬॥',
      pronunciation: 'kahē nānaku. āp karatā; āpe hukam bujhāe ‖26‖',
      translation:
        'Says Nanak, He Himself is the Creator; He Himself reveals the Hukam of His Command. ||26||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਪਰਮਾਤਮਾ ਆਪ ਹੀ (ਜੀਵਾਤਮਾ ਤੇ ਮਾਇਆ ਦੀ) ਰਚਨਾ ਕਰਦਾ ਹੈ ਤੇ ਆਪ ਹੀ (ਕਿਸੇ ਵਿਰਲੇ ਨੂੰ ਇਹ) ਸੂਝ ਬਖ਼ਸ਼ਦਾ ਹੈ (ਕਿ ਮਾਇਆ ਦਾ ਪ੍ਰਭਾਵ ਭੀ ਉਸ ਦਾ ਆਪਣਾ ਹੀ) ਹੁਕਮ (ਜਗਤ ਵਿਚ ਵਰਤ ਰਿਹਾ) ਹੈ ॥੨੬॥',
    },
    {
      id: 'D53B',
      src: 'ਸਿਮ੍ਰਿਤਿ ਸਾਸਤ੍ਰ. ਪੁੰਨ ਪਾਪ ਬੀਚਾਰਦੇ; ਤਤੈ ਸਾਰ. ਨ ਜਾਣੀ ॥',
      pronunciation: 'simrit sāsatr. puñn pāp bīcārade; tatē sār. na jāṇī ‖',
      translation:
        'The Simritees and the Shaastras discriminate between good and evil, but they do not know the true essence of reality.',
      vicar:
        'ਸਿੰਮ੍ਰਿਤੀਆਂ ਸ਼ਾਸਤ੍ਰ ਆਦਿਕ ਪੜ੍ਹਨ ਵਾਲੇ ਪੰਡਿਤ ਸਿਰਫ਼ ਇਹੀ ਵਿਚਾਰਾਂ ਕਰਦੇ ਹਨ ਕਿ (ਇਹਨਾਂ ਪੁਸਤਕਾਂ ਅਨੁਸਾਰ) ਪਾਪ ਕੀਹ ਹੈ ਤੇ ਪੁੰਨ ਕੀਹ ਹੈ, ਉਹਨਾਂ ਨੂੰ ਆਤਮਕ ਆਨੰਦ ਦਾ ਰਸ ਨਹੀਂ ਆ ਸਕਦਾ।',
    },
    {
      id: '9SCB',
      src: 'ਤਤੈ ਸਾਰ. ਨ ਜਾਣੀ ਗੁਰੂ ਬਾਝਹੁ; ਤਤੈ ਸਾਰ. ਨ ਜਾਣੀ ॥',
      pronunciation: 'tatē sār. na jāṇī gurū bājhahu; tatē sār. na jāṇī ‖',
      translation:
        'They do not know the true essence of reality without the Guru; they do not know the true essence of reality.',
      vicar:
        '(ਇਹ ਗੱਲ ਯਕੀਨੀ ਜਾਣੋ ਕਿ) ਸਤਿਗੁਰੂ ਦੀ ਸਰਨ ਆਉਣ ਤੋਂ ਬਿਨਾ ਆਤਮਕ ਆਨੰਦ ਦਾ ਰਸ ਨਹੀਂ ਆ ਸਕਦਾ। ਤਤੈ ਸਾਰ = ਤੱਤ ਦੀ ਸੂਝ, ਅਸਲੀਅਤ ਦੀ ਸਮਝ, ਜੋ ਅਸਲ ਗ੍ਰਹਿਣ = ਜੋਗ ਵਸਤ ਹੈ ਉਸ ਦੀ ਸਮਝ, ਆਤਮਕ ਆਨੰਦ ਦੀ ਸਮਝ।',
    },
    {
      id: 'XSZ9',
      src: 'ਤਿਹੀ ਗੁਣੀ ਸੰਸਾਰੁ. ਭ੍ਰਮਿ ਸੁਤਾ; ਸੁਤਿਆ ਰੈਣਿ ਵਿਹਾਣੀ ॥',
      pronunciation: 'tihī guṇī sañsāru. bhram sutā; sutiā rēṇ vihāṇī ‖',
      translation:
        'The world is asleep in the three modes and doubt; it passes the night of its life sleeping.',
      vicar:
        'ਜਗਤ ਤਿੰਨਾਂ ਗੁਣਾਂ ਵਿਚ ਹੀ ਭਟਕ ਭਟਕ ਕੇ ਗ਼ਾਫ਼ਿਲ ਹੋਇਆ ਪਿਆ ਹੈ, ਮਾਇਆ ਦੇ ਮੋਹ ਵਿਚ ਸੁੱਤਿਆਂ ਦੀ ਹੀ ਸਾਰੀ ਉਮਰ ਗੁਜ਼ਰ ਜਾਂਦੀ ਹੈ (ਸਿੰਮ੍ਰਿਤੀਆਂ ਸ਼ਾਸਤ੍ਰਾਂ ਦੀਆਂ ਵਿਚਾਰਾਂ ਇਸ ਨੀਂਦ ਵਿਚੋਂ ਜਗਾ ਨਹੀਂ ਸਕਦੀਆਂ)। ਤਿਹੀ ਗੁਣੀ = ਮਾਇਆ ਦੇ ਤਿੰਨ ਸੁਭਾਵਾਂ ਵਿਚ। ਭ੍ਰਮਿ = ਭਟਕ ਭਟਕ ਕੇ। ਰੈਣਿ = ਉਮਰ, ਰਾਤ।',
    },
    {
      id: '8K5G',
      src: 'ਗੁਰ ਕਿਰਪਾ ਤੇ. ਸੇ ਜਨ ਜਾਗੇ. ਜਿਨਾ ਹਰਿ ਮਨਿ ਵਸਿਆ; ਬੋਲਹਿ ਅੰਮ੍ਰਿਤ ਬਾਣੀ ॥',
      pronunciation:
        'gur kirapā te. se jan jāge. jinā har man wasiā; bolah añmrit bāṇī ‖',
      translation:
        "Those humble beings remain awake and aware, within whose minds, by Guru's Grace, the Lord abides; they chant the Ambrosial Word of the Guru's Bani.",
      vicar:
        '(ਮੋਹ ਦੀ ਨੀਂਦ ਵਿਚੋਂ) ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ (ਸਿਰਫ਼) ਉਹ ਮਨੁੱਖ ਜਾਗਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਦੇ ਅੰਦਰ ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ ਵੱਸਦਾ ਹੈ ਜੋ ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਉਚਾਰਦੇ ਹਨ। ਸੇ = ਉਹ ਬੰਦੇ। ਮਨਿ = ਮਨ ਵਿਚ।',
    },
    {
      id: 'GGQ6',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸੋ ਤਤੁ ਪਾਏ. ਜਿਸ ਨੋ ਅਨਦਿਨੁ ਹਰਿ ਲਿਵ ਲਾਗੈ; ਜਾਗਤ ਰੈਣਿ ਵਿਹਾਣੀ ॥੨੭॥',
      pronunciation:
        'kahē nānaku. so tat pāe. jis no anadin har liv lāgē; jāgat rēṇ vihāṇī ‖27‖',
      translation:
        'Says Nanak, they alone obtain the essence of reality, who night and day remain lovingly absorbed in the Lord; they pass the night of their life awake and aware. ||27||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਉਹੀ ਮਨੁੱਖ ਆਤਮਕ ਆਨੰਦ ਮਾਣਦਾ ਹੈ ਜੋ ਹਰ ਵੇਲੇ ਪ੍ਰਭੂ ਦੀ ਯਾਦ ਦੀ ਲਗਨ ਵਿਚ ਟਿਕਿਆ ਰਹਿੰਦਾ ਹੈ, ਤੇ ਜਿਸ ਦੀ ਉਮਰ (ਇਸ ਤਰ੍ਹਾਂ ਮੋਹ ਦੀ ਨੀਂਦ ਵਿਚੋਂ) ਜਾਗਦਿਆਂ ਬੀਤਦੀ ਹੈ ॥੨੭॥ ਅਨਦਿਨੁ = ਹਰ ਰੋਜ਼, ਹਰ ਵੇਲੇ। ਅੰਮ੍ਰਿਤ ਬਾਣੀ = ਆਤਮਕ ਜੀਵਨ ਦੇਣ ਵਾਲੀ ਬਾਣੀ। ਜਾਗਤ = ਵਿਕਾਰਾਂ ਵਲੋਂ ਸੁਚੇਤ ਰਹਿੰਦਿਆਂ ॥੨੭॥',
    },
    {
      id: '5PUH',
      src: 'ਮਾਤਾ ਕੇ ਉਦਰ ਮਹਿ. ਪ੍ਰਤਿਪਾਲ ਕਰੇ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੀਐ ॥',
      pronunciation:
        'mātā ke udar mahi. pratipāl kare; so. kiu manah visārīē ‖',
      translation:
        "He nourished us in the mother's womb; why forget Him from the mind?",
      vicar:
        '(ਜੇ ਆਤਮਕ ਆਨੰਦ ਪ੍ਰਾਪਤ ਕਰਨਾ ਹੈ ਤਾਂ) ਉਸ ਪਰਮਾਤਮਾ ਨੂੰ ਕਦੇ ਭੁਲਾਣਾ ਨਹੀਂ ਚਾਹੀਦਾ, ਜੋ ਮਾਂ ਦੇ ਪੇਟ ਵਿਚ (ਭੀ) ਪਾਲਣਾ ਕਰਦਾ ਹੈ। ਉਦਰ = ਪੇਟ। ਮਨਹੁ = ਮਨ ਤੋਂ। ਕਿਉ ਵਿਸਾਰੀਐ = ਵਿਸਾਰਨਾ ਨਹੀਂ ਚਾਹੀਦਾ।',
    },
    {
      id: 'RF9L',
      src: 'ਮਨਹੁ. ਕਿਉ ਵਿਸਾਰੀਐ, ਏਵਡੁ ਦਾਤਾ; ਜਿ ਅਗਨਿ ਮਹਿ. ਆਹਾਰੁ ਪਹੁਚਾਵਏ ॥',
      pronunciation:
        'manahu. kiu visārīē, ewaḍ dātā; ja agan mahi. āhār pahucāwae ‖',
      translation:
        'Why forget from the mind such a Great Giver, who gave us sustenance in the fire of the womb?',
      vicar:
        'ਇਤਨੇ ਵੱਡੇ ਦਾਤੇ ਨੂੰ ਮਨੋਂ ਭੁਲਾਣਾ ਨਹੀਂ ਚਾਹੀਦਾ ਜੋ (ਮਾਂ ਦੇ ਪੇਟ ਦੀ) ਅੱਗ ਵਿਚ (ਭੀ) ਖ਼ੁਰਾਕ ਅਪੜਾਂਦਾ ਹੈ। ਏਵਡੁ = ਇਤਨਾ ਵੱਡਾ। ਅਗਨਿ = ਅੱਗ। ਆਹਾਰੁ = ਖ਼ੁਰਾਕ।',
    },
    {
      id: 'L1Q2',
      src: 'ਓਸ ਨੋ ਕਿਹੁ ਪੋਹਿ. ਨ ਸਕੀ; ਜਿਸ ਨਉ ਆਪਣੀ ਲਿਵ ਲਾਵਏ ॥',
      pronunciation: 'os no kih pohi. na sakī; jis nau āpaṇī liv lāwae ‖',
      translation:
        'Nothing can harm one, whom the Lord inspires to embrace His Love.',
      vicar:
        '(ਇਹ ਮੋਹ ਹੀ ਹੈ ਜੋ ਆਨੰਦ ਤੋਂ ਵਾਂਜਿਆਂ ਰੱਖਦਾ ਹੈ, ਪਰ) ਉਸ ਬੰਦੇ ਨੂੰ (ਮੋਹ ਆਦਿਕ) ਕੁਝ ਭੀ ਪੋਹ ਨਹੀਂ ਸਕਦਾ ਜਿਸ ਨੂੰ ਪ੍ਰਭੂ ਆਪਣੇ ਚਰਨਾਂ ਦੀ ਪ੍ਰੀਤ ਬਖ਼ਸ਼ਦਾ ਹੈ। ਓਸ ਨੋ = ਉਸ ਬੰਦੇ ਨੂੰ। ਕਿਹੁ = ਕੁਝ।',
    },
    {
      id: 'SXM1',
      src: 'ਆਪਣੀ ਲਿਵ ਆਪੇ ਲਾਏ; ਗੁਰਮੁਖਿ ਸਦਾ ਸਮਾਲੀਐ ॥',
      pronunciation: 'āpaṇī liv āpe lāe; guramukh sadā samālīē ‖',
      translation:
        'He Himself is the love, and He Himself is the embrace; the Gurmukh contemplates Him forever.',
      vicar:
        '(ਪਰ ਜੀਵ ਦੇ ਕੀਹ ਵੱਸ?) ਪ੍ਰਭੂ ਆਪ ਹੀ ਆਪਣੀ ਪ੍ਰੀਤ ਦੀ ਦਾਤ ਦੇਂਦਾ ਹੈ। ਗੁਰੂ ਦੀ ਸਰਨ ਪੈ ਕੇ ਉਸ ਨੂੰ ਸਿਮਰਦੇ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ। ਲਿਵ = ਪ੍ਰੀਤ। ਗੁਰਮੁਖਿ = ਗੁਰੂ ਦੀ ਰਾਹੀਂ। ਸਮਾਲੀਐ = ਸਿਮਰਨਾ ਚਾਹੀਦਾ ਹੈ, ਹਿਰਦੇ ਵਿਚ ਵਸਾਣਾ ਚਾਹੀਦਾ ਹੈ।',
    },
    {
      id: 'XR8Y',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਏਵਡੁ ਦਾਤਾ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੀਐ ॥੨੮॥',
      pronunciation: 'kahē nānaku. ewaḍ dātā; so. kiu manah visārīē ‖28‖',
      translation:
        'Says Nanak, why forget such a Great Giver from the mind? ||28||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਜੇ ਆਤਮਕ ਆਨੰਦ ਦੀ ਲੋੜ ਹੈ ਤਾਂ) ਇਤਨੇ ਵੱਡੇ ਦਾਤਾਰ ਪ੍ਰਭੂ ਨੂੰ ਕਦੇ ਭੀ ਭੁਲਾਣਾ ਨਹੀਂ ਚਾਹੀਦਾ ॥੨੮॥',
    },
    {
      id: 'G8GB',
      src: 'ਜੈਸੀ ਅਗਨਿ ਉਦਰ ਮਹਿ; ਤੈਸੀ ਬਾਹਰਿ ਮਾਇਆ ॥',
      pronunciation: 'jēsī agan udar mahi; tēsī bāhar māiā ‖',
      translation: 'As is the fire within the womb, so is Maya outside.',
      vicar:
        'ਜਿਵੇਂ ਮਾਂ ਦੇ ਪੇਟ ਵਿਚ ਅੱਗ ਹੈ ਤਿਵੇਂ ਬਾਹਰ ਜਗਤ ਵਿਚ ਮਾਇਆ (ਦੁਖਦਾਈ) ਹੈ। ਉਦਰ = ਮਾਂ ਦਾ ਪੇਟ। ਬਾਹਰਿ = ਸੰਸਾਰ ਵਿਚ।',
    },
    {
      id: 'Y1WZ',
      src: 'ਮਾਇਆ ਅਗਨਿ ਸਭ ਇਕੋ ਜੇਹੀ; ਕਰਤੈ ਖੇਲੁ ਰਚਾਇਆ ॥',
      pronunciation: 'māiā agan sabh iko jehī; karatē khel racāiā ‖',
      translation:
        'The fire of Maya is one and the same; the Creator has staged this play.',
      vicar:
        'ਮਾਇਆ ਤੇ ਅੱਗ ਇਕੋ ਜਿਹੀਆਂ ਹੀ ਹਨ, ਕਰਤਾਰ ਨੇ ਐਸੀ ਹੀ ਖੇਡ ਰਚ ਦਿੱਤੀ ਹੈ। ਕਰਤੈ = ਕਰਤਾਰ ਨੇ।',
    },
    {
      id: 'M74D',
      src: 'ਜਾ ਤਿਸੁ ਭਾਣਾ. ਤਾ ਜੰਮਿਆ; ਪਰਵਾਰਿ ਭਲਾ ਭਾਇਆ ॥',
      pronunciation: 'jā tis bhāṇā. tā jañmiā; paravār bhalā bhāiā ‖',
      translation:
        'According to His Will, the child is born, and the family is very pleased.',
      vicar:
        'ਜਦੋਂ ਪਰਮਾਤਮਾ ਦੀ ਰਜ਼ਾ ਹੁੰਦੀ ਹੈ ਜੀਵ ਪੈਦਾ ਹੁੰਦਾ ਹੈ ਪਰਵਾਰ ਵਿਚ ਪਿਆਰਾ ਲੱਗਦਾ ਹੈ। ਜਾ ਤਿਸੁ ਭਾਣਾ = ਜਦੋਂ ਉਸ ਪ੍ਰਭੂ ਨੂੰ ਚੰਗਾ ਲੱਗਾ। ਪਰਵਾਰਿ = ਪਰਵਾਰ ਵਿਚ। ਭਲਾ ਭਾਇਆ = ਪਿਆਰਾ ਲੱਗਣ ਲੱਗ ਪਿਆ।',
    },
    {
      id: 'S1WY',
      src: 'ਲਿਵ ਛੁੜਕੀ. ਲਗੀ ਤ੍ਰਿਸਨਾ; ਮਾਇਆ. ਅਮਰੁ ਵਰਤਾਇਆ ॥',
      pronunciation: 'liv chuṛakī. lagī trisanā; māiā. amar waratāiā ‖',
      translation:
        'Love for the Lord wears off, and the child becomes attached to desires; the script of Maya runs its course.',
      vicar:
        '(ਪਰਵਾਰ ਦੇ ਜੀਵ ਉਸ ਨਵੇਂ ਜੰਮੇ ਬਾਲ ਨੂੰ ਪਿਆਰ ਕਰਦੇ ਹਨ, ਇਸ ਪਿਆਰ ਵਿਚ ਫਸ ਕੇ ਉਸ ਦੀ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਨਾਲੋਂ) ਪ੍ਰੀਤ ਦੀ ਤਾਰ ਟੁੱਟ ਜਾਂਦੀ ਹੈ, ਮਾਇਆ ਦੀ ਤ੍ਰਿਸ਼ਨਾ ਆ ਚੰਬੜਦੀ ਹੈ, ਮਾਇਆ (ਉਸ ਉਤੇ) ਆਪਣਾ ਜ਼ੋਰ ਪਾ ਲੈਂਦੀ ਹੈ। ਛੁੜਕੀ = ਮੁੱਕ ਗਈ, ਟੁੱਟ ਗਈ। ਅਮਰੁ = ਹੁਕਮ। ਅਮਰੁ ਵਰਤਾਇਆ = ਹੁਕਮ ਚਲਾ ਦਿੱਤਾ, ਜ਼ੋਰ ਪਾ ਲਿਆ।',
    },
    {
      id: '4EN8',
      src: 'ਏਹ ਮਾਇਆ. ਜਿਤੁ ਹਰਿ ਵਿਸਰੈ; ਮੋਹੁ ਉਪਜੈ. ਭਾਉ ਦੂਜਾ ਲਾਇਆ ॥',
      pronunciation: 'eh māiā. jit har visarē; moh upajē. bhāu dūjā lāiā ‖',
      translation:
        'This is Maya, by which the Lord is forgotten; emotional attachment and love of duality well up.',
      vicar:
        'ਮਾਇਆ ਹੈ ਹੀ ਐਸੀ ਕਿ ਇਸ ਦੀ ਰਾਹੀਂ ਰੱਬ ਭੁੱਲ ਜਾਂਦਾ ਹੈ, (ਦੁਨੀਆ ਦਾ) ਮੋਹ ਪੈਦਾ ਹੋ ਜਾਂਦਾ ਹੈ, (ਰੱਬ ਤੋਂ ਬਿਨਾ) ਹੋਰ ਹੋਰ ਪਿਆਰ ਉਪਜ ਪੈਂਦਾ ਹੈ (ਫਿਰ ਅਜੇਹੀ ਹਾਲਤ ਵਿਚ ਆਤਮਕ ਆਨੰਦ ਕਿਥੋਂ ਮਿਲੇ?) ਜਿਤੁ = ਜਿਸ ਦੀ ਰਾਹੀਂ। ਭਾਉ ਦੂਜਾ = ਪ੍ਰਭੂ ਤੋਂ ਬਿਨਾ ਹੋਰ ਦਾ ਪਿਆਰ।',
    },
    {
      id: '4AX7',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਗੁਰ ਪਰਸਾਦੀ. ਜਿਨਾ ਲਿਵ ਲਾਗੀ; ਤਿਨੀ ਵਿਚੇ ਮਾਇਆ ਪਾਇਆ ॥੨੯॥',
      pronunciation:
        'kahē nānaku. gur parasādī. jinā liv lāgī; tinī vice māiā pāiā ‖29‖',
      translation:
        "Says Nanak, by Guru's Grace, those who enshrine love for the Lord find Him, in the midst of Maya. ||29||",
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਜਿਨ੍ਹਾਂ ਬੰਦਿਆਂ ਦੀ ਪ੍ਰੀਤ ਦੀ ਡੋਰ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਵਿਚ ਜੁੜੀ ਰਹਿੰਦੀ ਹੈ, ਉਹਨਾਂ ਨੂੰ ਮਾਇਆ ਵਿਚ ਵਰਤਦਿਆਂ ਹੀ (ਆਤਮਕ ਆਨੰਦ) ਮਿਲ ਪੈਂਦਾ ਹੈ ॥੨੯॥',
    },
    {
      id: '66A2',
      src: 'ਹਰਿ ਆਪਿ ਅਮੁਲਕੁ ਹੈ; ਮੁਲਿ. ਨ ਪਾਇਆ ਜਾਇ ॥',
      pronunciation: 'har āp amulak hē; muli. na pāiā jāi ‖',
      translation:
        'The Lord Himself is priceless; His worth cannot be estimated.',
      vicar:
        '(ਜਦ ਤਕ ਪਰਮਾਤਮਾ ਦਾ ਮਿਲਾਪ ਨਾ ਹੋਵੇ ਤਦ ਤਕ ਆਨੰਦ ਨਹੀਂ ਮਾਣਿਆ ਜਾ ਸਕਦਾ, ਪਰ) ਪ੍ਰਭੂ ਦਾ ਮੁੱਲ ਨਹੀਂ ਪੈ ਸਕਦਾ, ਪਰਮਾਤਮਾ (ਧਨ ਆਦਿਕ) ਕਿਸੇ ਕੀਮਤ ਤੋਂ ਨਹੀਂ ਮਿਲ ਸਕਦਾ। ਅਮੁਲਕੁ = ਜੋ ਕਿਸੇ ਕੀਮਤ ਤੋਂ ਮਿਲ ਨ ਸਕੇ।',
    },
    {
      id: '33YW',
      src: 'ਮੁਲਿ. ਨ ਪਾਇਆ ਜਾਇ. ਕਿਸੈ ਵਿਟਹੁ; ਰਹੇ ਲੋਕ ਵਿਲਲਾਇ ॥',
      pronunciation: 'muli. na pāiā jāi. kisē viṭahu; rahe lok vilalāi ‖',
      translation:
        'His worth cannot be estimated, even though people have grown weary of trying.',
      vicar:
        'ਜੀਵ ਖਪ ਖਪ ਕੇ ਹਾਰ ਗਏ, ਕਿਸੇ ਨੂੰ (ਧਨ ਆਦਿਕ) ਕੀਮਤ ਦੇ ਕੇ ਪਰਮਾਤਮਾ ਨਹੀਂ ਮਿਲਿਆ। ਮੁਲਿ = ਕੀਮਤ ਨਾਲ, ਕੀਮਤ ਦੇ ਕੇ। ਕਿਸੈ ਵਿਟਹੁ = ਕਿਸੇ ਭੀ ਬੰਦੇ ਤੋਂ। ਵਿਲਲਾਇ = ਖਪ ਖਪ ਕੇ। ਰਹੇ = ਰਹਿ ਗਏ, ਥੱਕ ਗਏ, ਹਾਰ ਗਏ।',
    },
    {
      id: '8PGN',
      src: 'ਐਸਾ ਸਤਿਗੁਰੁ. ਜੇ ਮਿਲੈ, ਤਿਸ ਨੋ ਸਿਰੁ ਸਉਪੀਐ; ਵਿਚਹੁ ਆਪੁ ਜਾਇ ॥',
      pronunciation: 'ēsā satiguru. je milē, tis no sir saupīē; vicah āp jāi ‖',
      translation:
        'If you meet such a True Guru, offer your head to Him; your selfishness and conceit will be eradicated from within.',
      vicar:
        '(ਹਾਂ,) ਜੇ ਅਜੇਹਾ ਗੁਰੂ ਮਿਲ ਪਏ (ਜਿਸ ਦੇ ਮਿਲਿਆਂ ਮਨੁੱਖ ਦੇ ਅੰਦਰੋਂ ਆਪਾ-ਭਾਵ ਨਿਕਲ ਜਾਏ) ਤਾਂ ਉਸ ਗੁਰੂ ਦੇ ਅੱਗੇ ਆਪਣਾ ਸਿਰ ਭੇਟ ਕਰ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ (ਆਪਣਾ ਆਪ ਅਰਪਣ ਕਰ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ), ਆਪੁ = ਆਪਾ-ਭਾਵ।',
    },
    {
      id: '6BAF',
      src: 'ਜਿਸ ਦਾ ਜੀਉ. ਤਿਸੁ ਮਿਲਿ ਰਹੈ; ਹਰਿ ਵਸੈ ਮਨਿ ਆਇ ॥',
      pronunciation: 'jis dā jīu. tis mil rahē; har wasē man āi ‖',
      translation:
        'Your soul belongs to Him; remain united with Him, and the Lord will come to dwell in your mind.',
      vicar:
        '(ਤੇ ਜਿਸ ਗੁਰੂ ਦੇ ਮਿਲਿਆਂ) ਜੀਵ ਉਸ ਹਰੀ ਦੇ ਚਰਨਾਂ ਵਿਚ ਜੁੜਿਆ ਰਹੇ ਉਹ ਹਰੀ ਉਸ ਦੇ ਮਨ ਵਿਚ ਵੱਸ ਪਏ ਜਿਸ ਦਾ ਇਹ ਪੈਦਾ ਕੀਤਾ ਹੋਇਆ ਹੈ। ਜਿਸ ਦਾ = ਜਿਸ ਪਰਮਾਤਮਾ ਦਾ ਪੈਦਾ ਕੀਤਾ ਹੋਇਆ। ਜੀਉ = ਜੀਵ। ਮਨਿ = ਮਨ ਵਿਚ।',
    },
    {
      id: 'UYFE',
      src: 'ਹਰਿ ਆਪਿ ਅਮੁਲਕੁ ਹੈ. ਭਾਗ ਤਿਨਾ ਕੇ ਨਾਨਕਾ; ਜਿਨ ਹਰਿ ਪਲੈ ਪਾਇ ॥੩੦॥',
      pronunciation:
        'har āp amulak hē. bhāg tinā ke nānakā; jin har palē pāi ‖30‖',
      translation:
        'The Lord Himself is priceless; very fortunate are those, O Nanak, who attain to the Lord. ||30||',
      vicar:
        'ਹੇ ਨਾਨਕ! ਪਰਮਾਤਮਾ ਦਾ ਮੁੱਲ ਨਹੀਂ ਪੈ ਸਕਦਾ (ਕਿਸੇ ਕੀਮਤ ਤੋਂ ਨਹੀਂ ਮਿਲਦਾ, ਪਰ) ਪਰਮਾਤਮਾ ਜਿਨ੍ਹਾਂ ਨੂੰ (ਗੁਰੂ ਦੇ) ਲੜ ਲਾ ਦੇਂਦਾ ਹੈ ਉਹਨਾਂ ਦੇ ਭਾਗ ਜਾਗ ਪੈਂਦੇ ਹਨ (ਉਹ ਆਤਮਕ ਆਨੰਦ ਮਾਣਦੇ ਹਨ) ॥੩੦॥ ਪਲੈ ਪਾਇ = (ਗੁਰੂ ਦੇ) ਲੜ ਲਾ ਦੇਂਦਾ ਹੈ ॥੩੦॥',
    },
    {
      id: 'T5F2',
      src: 'ਹਰਿ ਰਾਸਿ ਮੇਰੀ; ਮਨੁ ਵਣਜਾਰਾ ॥',
      pronunciation: 'har rās merī; man waṇajārā ‖',
      translation: 'The Lord is my capital; my mind is the merchant.',
      vicar:
        'ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ ਮੇਰੀ ਰਾਸਿ-ਪੂੰਜੀ ਹੈ ਤੇ ਮੇਰਾ ਮਨ ਵਪਾਰੀ ਹੋ ਗਿਆ ਹੈ। ਰਾਸਿ = ਵਣਜ-ਵਪਾਰ ਕਰਨ ਵਾਸਤੇ ਧਨ ਦੀ ਪੂੰਜੀ। ਵਣਜਾਰਾ = ਵਣਜ ਕਰਨ ਵਾਲਾ।',
    },
    {
      id: 'BALT',
      src: 'ਹਰਿ ਰਾਸਿ ਮੇਰੀ. ਮਨੁ ਵਣਜਾਰਾ; ਸਤਿਗੁਰ ਤੇ ਰਾਸਿ ਜਾਣੀ ॥',
      pronunciation: 'har rās merī. man waṇajārā; satigur te rās jāṇī ‖',
      translation:
        'The Lord is my capital, and my mind is the merchant; through the True Guru, I know my capital.',
      vicar:
        'ਆਪਣੇ ਗੁਰੂ ਤੋਂ ਮੈਨੂੰ ਸਮਝ ਆਈ ਹੈ ਕਿ (ਆਤਮਕ ਆਨੰਦ ਦੀ ਖੱਟੀ ਖੱਟਣ ਲਈ) ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ ਹੀ ਮੇਰੀ ਰਾਸਿ-ਪੂੰਜੀ (ਹੋ ਸਕਦੀ ਹੈ), ਮੇਰਾ ਮਨ (ਇਸ ਵਣਜ ਦਾ) ਵਪਾਰੀ ਬਣ ਗਿਆ ਹੈ। ਸਤਿਗੁਰ ਤੇ ਜਾਣੀ = ਗੁਰੂ ਤੋਂ ਪਛਾਣ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
    },
    {
      id: 'USCW',
      src: 'ਹਰਿ ਹਰਿ ਨਿਤ ਜਪਿਹੁ ਜੀਅਹੁ; ਲਾਹਾ ਖਟਿਹੁ ਦਿਹਾੜੀ ॥',
      pronunciation: 'har har nit japih jīahu; lāhā khaṭih dihāṛī ‖',
      translation:
        'Meditate continually on the Lord, Har, Har, O my soul, and you shall collect your profits daily.',
      vicar:
        'ਤੁਸੀ ਭੀ ਪ੍ਰੇਮ ਨਾਲ ਸਦਾ ਹਰੀ ਦਾ ਨਾਮ ਜਪਿਆ ਕਰੋ, ਤੇ ਹਰ ਰੋਜ਼ (ਆਤਮਕ ਆਨੰਦ ਦਾ) ਲਾਭ ਖੱਟੋ। ਜੀਅਹੁ = ਦਿਲੋਂ, ਪੂਰੇ ਪ੍ਰੇਮ ਨਾਲ। ਦਿਹਾੜੀ = ਹਰ ਰੋਜ਼।',
    },
    {
      id: 'Q9HT',
      src: 'ਏਹੁ ਧਨੁ ਤਿਨਾ ਮਿਲਿਆ; ਜਿਨ ਹਰਿ ਆਪੇ ਭਾਣਾ ॥',
      pronunciation: 'eh dhan tinā miliā; jin har āpe bhāṇā ‖',
      translation:
        "This wealth is obtained by those who are pleasing to the Lord's Will.",
      vicar:
        '(ਹਰੀ-ਨਾਮ ਦਾ, ਆਤਮਕ ਆਨੰਦ ਦਾ) ਇਹ ਧਨ ਉਹਨਾਂ ਨੂੰ ਹੀ ਮਿਲਦਾ ਹੈ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਦੇਣਾ ਪ੍ਰਭੂ ਨੂੰ ਆਪ ਹੀ ਚੰਗਾ ਲੱਗਦਾ ਹੈ। ਭਾਣਾ = ਚੰਗਾ ਲੱਗਾ।',
    },
    {
      id: 'BV30',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਹਰਿ ਰਾਸਿ ਮੇਰੀ; ਮਨੁ ਹੋਆ ਵਣਜਾਰਾ ॥੩੧॥',
      pronunciation: 'kahē nānaku. har rās merī; man hoā waṇajārā ‖31‖',
      translation:
        'Says Nanak, the Lord is my capital, and my mind is the merchant. ||31||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਪਰਮਾਤਮਾ ਦਾ ਨਾਮ ਮੇਰੀ ਪੂੰਜੀ ਬਣ ਗਈ ਹੈ (ਹੁਣ ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਮੈਂ ਆਤਮਕ ਆਨੰਦ ਦੀ ਖੱਟੀ ਖੱਟਦਾ ਹਾਂ) ॥੩੧॥',
    },
    {
      id: 'BLCS',
      src: 'ਏ ਰਸਨਾ. ਤੂ ਅਨ ਰਸਿ ਰਾਚਿ ਰਹੀ; ਤੇਰੀ ਪਿਆਸ. ਨ ਜਾਇ ॥',
      pronunciation: 'e rasanā. tū an ras rāc rahī; terī piās. na jāi ‖',
      translation:
        'O my tongue, you are engrossed in other tastes, but your thirsty desire is not quenched.',
      vicar:
        'ਹੇ (ਮੇਰੀ) ਜੀਭ! ਤੂੰ ਹੋਰ ਹੋਰ ਸੁਆਦ ਵਿਚ ਮਸਤ ਹੋ ਰਹੀ ਹੈਂ, (ਇਸ ਤਰ੍ਹਾਂ) ਤੇਰਾ ਸੁਆਦਾਂ ਦਾ ਚਸਕਾ ਦੂਰ ਨਹੀਂ ਹੋ ਸਕਦਾ। ਏ ਰਸਨਾ = ਹੇ (ਮੇਰੀ) ਜੀਭ! ਅਨ ਰਸਿ = ਹੋਰ ਹੋਰ ਰਸ ਵਿਚ। ਰਾਚਿ ਰਹੀ = ਮਸਤ ਹੋ ਰਹੀ ਹੈਂ। ਪਿਆਸ = ਸੁਆਦਾਂ ਦਾ ਚਸਕਾ।',
    },
    {
      id: 'UN2J',
      src: 'ਪਿਆਸ. ਨ ਜਾਇ ਹੋਰਤੁ ਕਿਤੈ; ਜਿਚਰੁ ਹਰਿ ਰਸੁ ਪਲੈ. ਨ ਪਾਇ ॥',
      pronunciation: 'piās. na jāi horat kitē; jicar har ras palē. na pāi ‖',
      translation:
        'Your thirst shall not be quenched by any means, until you attain the subtle essence of the Lord.',
      vicar:
        'ਜਿਤਨਾ ਚਿਰ ਪਰਮਾਤਮਾ ਦੇ ਸਿਮਰਨ ਦਾ ਆਨੰਦ ਪ੍ਰਾਪਤ ਨਾ ਹੋਵੇ, (ਉਤਨਾ ਚਿਰ) ਕਿਸੇ ਹੋਰ ਥਾਂ ਤੋਂ ਸੁਆਦਾਂ ਦਾ ਚਸਕਾ ਮਿਟ ਨਹੀਂ ਸਕਦਾ। ਹੋਰਤੁ ਕਿਤੈ = ਕਿਸੇ ਹੋਰ ਥਾਂ ਤੋਂ। ਪਲੈ ਨ ਪਾਇ = ਨਹੀਂ ਮਿਲਦਾ।',
    },
    {
      id: '9YRZ',
      src: 'ਹਰਿ ਰਸੁ ਪਾਇ ਪਲੈ. ਪੀਐ ਹਰਿ ਰਸੁ; ਬਹੁੜਿ. ਨ ਤ੍ਰਿਸਨਾ ਲਾਗੈ, ਆਇ ॥',
      pronunciation:
        'har ras pāi palē. pīē har rasu; bahuṛi. na trisanā lāgē, āi ‖',
      translation:
        'If you do obtain the subtle essence of the Lord, and drink in this essence of the Lord, you shall not be troubled by desire again.',
      vicar:
        'ਜਿਸ ਮਨੁੱਖ ਨੂੰ ਪਰਮਾਤਮਾ ਦੇ ਨਾਮ ਦਾ ਆਨੰਦ ਮਿਲ ਜਾਏ, ਜੋ ਮਨੁੱਖ ਹਰੀ-ਸਿਮਰਨ ਦਾ ਸੁਆਦ ਮਾਣਨ ਲੱਗ ਪਏ, ਉਸ ਨੂੰ ਮਾਇਆ ਦੀ ਤ੍ਰਿਸ਼ਨਾ ਨਹੀਂ ਪੋਹ ਸਕਦੀ। ਪੀਐ = ਪੀਂਦਾ ਹੈ। ਬਹੁੜਿ = ਮੁੜ, ਫਿਰ।',
    },
    {
      id: '323D',
      src: 'ਏਹੁ ਹਰਿ ਰਸੁ. ਕਰਮੀ ਪਾਈਐ; ਸਤਿਗੁਰੁ ਮਿਲੈ ਜਿਸੁ ਆਇ ॥',
      pronunciation: 'eh har rasu. karamī pāīē; satigur milē jis āi ‖',
      translation:
        'This subtle essence of the Lord is obtained by good karma, when one comes to meet with the True Guru.',
      vicar:
        'ਪਰ ਇਹ ਹਰੀ-ਨਾਮ ਦਾ ਆਨੰਦ ਪ੍ਰਭੂ ਦੀ ਮੇਹਰ ਨਾਲ ਮਿਲਦਾ ਹੈ (ਉਸ ਨੂੰ ਮਿਲਦਾ ਹੈ) ਜਿਸ ਨੂੰ ਗੁਰੂ ਮਿਲੇ। ਕਰਮੀ = ਪ੍ਰਭੂ ਦੀ ਮੇਹਰ ਨਾਲ।',
    },
    {
      id: 'A6T2',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਹੋਰਿ ਅਨ ਰਸ ਸਭਿ ਵੀਸਰੇ; ਜਾ ਹਰਿ ਵਸੈ ਮਨਿ ਆਇ ॥੩੨॥',
      pronunciation:
        'kahē nānaku. hor an ras sabh vīsare; jā har wasē man āi ‖32‖',
      translation:
        'Says Nanak, all other tastes and essences are forgotten, when the Lord comes to dwell within the mind. ||32||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਜਦੋਂ ਹਰੀ-ਸਿਮਰਨ ਦਾ ਆਨੰਦ ਮਨ ਵਿਚ ਵੱਸ ਪਏ, ਤਦੋਂ ਹੋਰ ਹੋਰ ਸਾਰੇ ਚਸਕੇ ਭੁੱਲ ਜਾਂਦੇ ਹਨ ॥੩੨॥ ਹੋਰਿ ਅਨ ਰਸ = ਹੋਰ ਦੂਜੇ ਸਾਰੇ ਸੁਆਦ। ਸਭਿ = ਸਾਰੇ। ਮਨ = ਮਨ ਵਿਚ ॥੩੨॥',
    },
    {
      id: 'H0V6',
      src: 'ਏ ਸਰੀਰਾ ਮੇਰਿਆ. ਹਰਿ ਤੁਮ ਮਹਿ ਜੋਤਿ ਰਖੀ; ਤਾ ਤੂ. ਜਗ ਮਹਿ ਆਇਆ ॥',
      pronunciation:
        'e sarīrā meriā. har tum mah jot rakhī; tā tū. jag mah āiā ‖',
      translation:
        'O my body, the Lord infused His Light into you, and then you came into the world.',
      vicar:
        'ਮੇਰੇ ਸਰੀਰ! (ਤੂੰ ਦੁਨੀਆ ਦੇ ਪਦਾਰਥਾਂ ਵਿਚੋਂ ਅਨੰਦ ਢੂੰਢਦਾ ਹੈਂ, ਪਰ ਆਨੰਦ ਦਾ ਸੋਮਾ ਤਾਂ ਪਰਮਾਤਮਾ ਹੈ ਜੋ ਤੇਰੇ ਅੰਦਰ ਵੱਸਦਾ ਹੈ) ਤੂੰ ਜਗਤ ਵਿਚ ਆਇਆ ਹੀ ਤਦੋਂ, ਜਦੋਂ ਹਰੀ ਨੇ ਆਪਣੀ ਜੋਤਿ ਤੇਰੇ ਅੰਦਰ ਰੱਖ ਦਿੱਤੀ।',
    },
    {
      id: '8RG4',
      src: 'ਹਰਿ ਜੋਤਿ ਰਖੀ. ਤੁਧੁ ਵਿਚਿ; ਤਾ ਤੂ ਜਗ ਮਹਿ ਆਇਆ ॥',
      pronunciation: 'har jot rakhī. tudh vici; tā tū jag mah āiā ‖',
      translation:
        'The Lord infused His Light into you, and then you came into the world.',
      vicar:
        '(ਇਹ ਯਕੀਨ ਜਾਣ ਕਿ) ਜਦੋਂ ਪਰਮਾਤਮਾ ਨੇ ਤੇਰੇ ਅੰਦਰ ਆਪਣੀ ਜੋਤਿ ਰੱਖੀ, ਤਦੋਂ ਤੂੰ ਜਗਤ ਵਿਚ ਜੰਮਿਆ।',
    },
    {
      id: 'Y8HW',
      src: 'ਹਰਿ ਆਪੇ ਮਾਤਾ. ਆਪੇ ਪਿਤਾ; ਜਿਨਿ ਜੀਉ ਉਪਾਇ. ਜਗਤੁ ਦਿਖਾਇਆ ॥',
      pronunciation: 'har āpe mātā. āpe pitā; jin jīu upāi. jagat dikhāiā ‖',
      translation:
        'The Lord Himself is your mother, and He Himself is your father; He created the created beings, and revealed the world to them.',
      vicar:
        'ਜੇਹੜਾ ਪਰਮਾਤਮਾ ਜੀਵ ਪੈਦਾ ਕਰਕੇ ਉਸ ਨੂੰ ਜਗਤ ਵਿਚ ਭੇਜਦਾ ਹੈ ਉਹ ਆਪ ਹੀ ਇਸ ਦੀ ਮਾਂ ਹੈ ਆਪ ਹੀ ਇਸ ਦਾ ਪਿਤਾ ਹੈ (ਪ੍ਰਭੂ ਆਪ ਹੀ ਮਾਪਿਆਂ ਵਾਂਗ ਜੀਵ ਨੂੰ ਹਰ ਤਰ੍ਹਾਂ ਦਾ ਸੁਖ ਦੇਂਦਾ ਹੈ, ਸੁਖ ਆਨੰਦ ਦਾ ਦਾਤਾ ਹੈ ਹੀ ਪ੍ਰਭੂ ਆਪ। ਪਰ ਜੀਵ ਜਗਤ ਵਿਚੋਂ ਮਾਇਕ ਪਦਾਰਥਾਂ ਵਿਚੋਂ ਆਨੰਦ ਭਾਲਦਾ ਹੈ)। ਜੀਉ = ਜੀਵ। ਉਪਾਇ = ਪੈਦਾ ਕਰ ਕੇ। ਜਗਤੁ ਦਿਖਾਇਆ = ਜੀਵ ਨੂੰ ਜਗਤ ਵਿਚ ਭੇਜਦਾ ਹੈ।',
    },
    {
      id: 'F6PW',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਬੁਝਿਆ. ਤਾ ਚਲਤੁ ਹੋਆ; ਚਲਤੁ ਨਦਰੀ ਆਇਆ ॥',
      pronunciation: 'gur parasādī bujhiā. tā calat hoā; calat nadarī āiā ‖',
      translation:
        "By Guru's Grace, some understand, and then it's a show; it seems like just a show.",
      vicar:
        'ਜਦੋਂ ਗੁਰੂ ਦੀ ਮੇਹਰ ਨਾਲ ਜੀਵ ਨੂੰ ਗਿਆਨ ਹੁੰਦਾ ਹੈ ਤਾਂ ਇਸ ਨੂੰ ਸਮਝ ਆਉਂਦੀ ਹੈ ਕਿ ਇਹ ਜਗਤ ਤਾਂ ਇਕ ਖੇਡ ਹੀ ਹੈ, ਫਿਰ ਜੀਵ ਨੂੰ ਇਹ ਜਗਤ (ਮਦਾਰੀ ਦਾ) ਇਕ ਤਮਾਸ਼ਾ ਹੀ ਦਿੱਸ ਪੈਂਦਾ ਹੈ (ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲਾ ਆਤਮਕ ਆਨੰਦ ਇਸ ਵਿਚ ਨਹੀਂ ਹੋ ਸਕਦਾ)। ਚਲਤੁ = ਖੇਡ, ਤਮਾਸ਼ਾ।',
    },
    {
      id: 'D4YY',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸ੍ਰਿਸਟਿ ਕਾ ਮੂਲੁ ਰਚਿਆ. ਜੋਤਿ ਰਾਖੀ; ਤਾ ਤੂ ਜਗ ਮਹਿ ਆਇਆ ॥੩੩॥',
      pronunciation:
        'kahē nānaku. srisaṭ kā mūl raciā. jot rākhī; tā tū jag mah āiā ‖33‖',
      translation:
        'Says Nanak, He laid the foundation of the Universe, and infused His Light, and then you came into the world. ||33||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਹੇ ਮੇਰੇ ਸਰੀਰ! ਜਦੋਂ ਪ੍ਰਭੂ ਨੇ ਜਗਤ-ਰਚਨਾ ਦਾ ਮੁੱਢ ਬੱਧਾ, ਤੇਰੇ ਅੰਦਰ ਆਪਣੀ ਜੋਤਿ ਪਾਈ, ਤਦੋਂ ਤੂੰ ਜਗਤ ਵਿਚ ਜਨਮਿਆ ॥੩੩॥ ਮੂਲੁ ਰਚਿਆ = ਮੁੱਢ ਬੱਧਾ। ਜਿਨਿ = ਜਿਸ (ਪਰਮਾਤਮਾ) ਨੇ ॥੩੩॥',
    },
    {
      id: 'FFNC',
      src: 'ਮਨਿ ਚਾਉ ਭਇਆ; ਪ੍ਰਭ ਆਗਮੁ ਸੁਣਿਆ ॥',
      pronunciation: 'man cāu bhaiā; prabh āgam suṇiā ‖',
      translation: "My mind has become joyful, hearing of God's coming.",
      vicar:
        'ਆਪਣੀ ਹਿਰਦੇ-ਸੇਜ ਉਤੇ ਪ੍ਰਭੂ-ਪਤੀ ਦਾ ਆਉਣਾ ਮੈਂ ਸੁਣ ਲਿਆ ਹੈ (ਮੈਂ ਅਨੁਭਵ ਕਰ ਲਿਆ ਹੈ ਕਿ ਪ੍ਰਭੂ ਮੇਰੇ ਹਿਰਦੇ ਵਿਚ ਆ ਵੱਸਿਆ ਹੈ ਹੁਣ) ਮੇਰੇ ਮਨ ਵਿਚ ਆਨੰਦ ਬਣ ਗਿਆ ਹੈ। ਚਾਉ = ਆਨੰਦ। ਪ੍ਰਭ ਆਗਮੁ = ਪ੍ਰਭੂ ਦਾ ਆਉਣਾ।',
    },
    {
      id: '14FA',
      src: 'ਹਰਿ ਮੰਗਲੁ ਗਾਉ ਸਖੀ; ਗ੍ਰਿਹੁ ਮੰਦਰੁ ਬਣਿਆ ॥',
      pronunciation: 'har mañgal gāu sakhī; grih mañdar baṇiā ‖',
      translation:
        "Sing the songs of joy to welcome the Lord, O my companions; my household has become the Lord's Mansion.",
      vicar:
        'ਹੇ ਮੇਰੀ ਜਿੰਦੇ! ਮੇਰਾ ਇਹ ਹਿਰਦਾ-ਘਰ ਪ੍ਰਭੂ-ਪਤੀ ਦਾ ਨਿਵਾਸ-ਅਸਥਾਨ ਬਣ ਗਿਆ ਹੈ, ਹੁਣ ਤੂੰ ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦਾ ਗੀਤ ਗਾ। ਸਖੀ = ਹੇ ਸਖੀ! ਹੇ ਜਿੰਦੇ! ਮੰਗਲੁ = ਖ਼ੁਸ਼ੀ ਦਾ ਗੀਤ, ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦਾ ਗੀਤ। ਗ੍ਰਿਹੁ = ਹਿਰਦਾ-ਘਰ। ਮੰਦਰੁ = ਪ੍ਰਭੂ ਦਾ ਨਿਵਾਸ-ਅਸਥਾਨ।',
    },
    {
      id: 'FJDA',
      src: 'ਹਰਿ ਗਾਉ ਮੰਗਲੁ ਨਿਤ ਸਖੀਏ; ਸੋਗੁ ਦੂਖੁ. ਨ ਵਿਆਪਏ ॥',
      pronunciation: 'har gāu mañgal nit sakhīe; sog dūkhu. na viāpae ‖',
      translation:
        'Sing continually the songs of joy to welcome the Lord, O my companions, and sorrow and suffering will not afflict you.',
      vicar:
        'ਹੇ ਜਿੰਦੇ! ਸਦਾ ਪ੍ਰਭੂ ਦੀ ਵਡਿਆਈ ਦਾ ਗੀਤ ਗਾਂਦੀ ਰਹੁ, (ਇਹ ਤਰ੍ਹਾਂ) ਕੋਈ ਫ਼ਿਕਰ ਕੋਈ ਦੁੱਖ (ਆਪਣਾ) ਜ਼ੋਰ ਨਹੀਂ ਪਾ ਸਕਦਾ। ਨ ਵਿਆਪਏ = ਨਹੀਂ ਵਿਆਪਦਾ, ਆਪਣਾ ਦਬਾਉ ਨਹੀਂ ਪਾਂਦਾ।',
    },
    {
      id: 'DLHV',
      src: 'ਗੁਰ ਚਰਨ ਲਾਗੇ. ਦਿਨ ਸਭਾਗੇ; ਆਪਣਾ ਪਿਰੁ ਜਾਪਏ ॥',
      pronunciation: 'gur caran lāge. din sabhāge; āpaṇā pir jāpae ‖',
      translation:
        "Blessed is that day, when I am attached to the Guru's feet and meditate on my Husband Lord.",
      vicar:
        'ਉਹ ਦਿਨ ਭਾਗਾਂ ਵਾਲੇ ਹੁੰਦੇ ਹਨ ਜਦੋਂ (ਮੱਥਾ) ਗੁਰੂ ਦੇ ਚਰਨਾਂ ਉਤੇ ਟਿਕੇ, ਪਿਆਰਾ ਪਤੀ-ਪ੍ਰਭੂ (ਹਿਰਦੇ ਵਿਚ) ਦਿੱਸ ਪੈਂਦਾ ਹੈ। ਸਭਾਗੇ = ਭਾਗਾਂ ਵਾਲੇ। ਜਾਪਏ = ਦਿੱਸ ਪਿਆ ਹੈ।',
    },
    {
      id: 'WBAJ',
      src: 'ਅਨਹਤ ਬਾਣੀ. ਗੁਰ ਸਬਦਿ ਜਾਣੀ; ਹਰਿ ਨਾਮੁ ਹਰਿ ਰਸੁ ਭੋਗੋ ॥',
      pronunciation: 'anahat bāṇī. gur sabad jāṇī; har nām har ras bhogo ‖',
      translation:
        "I have come to know the unstruck sound current and the Word of the Guru's Shabad; I enjoy the sublime essence of the Lord, the Lord's Name.",
      vicar:
        'ਗੁਰੂ ਦੇ ਸ਼ਬਦ ਦੀ ਰਾਹੀਂ ਇਕ-ਰਸ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਰੌ ਨਾਲ ਸਾਂਝ ਬਣ ਜਾਂਦੀ ਹੈ, ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਪ੍ਰਾਪਤ ਹੋ ਜਾਂਦਾ ਹੈ, ਪ੍ਰਭੂ-ਮਿਲਾਪ ਦਾ ਆਨੰਦ ਮਾਣੀਦਾ ਹੈ। ਅਨਹਤ = ਇਕ-ਰਸ। ਅਨਹਤ ਬਾਣੀ = ਇਕ-ਰਸ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਰੌ। ਸਬਦਿ = ਸ਼ਬਦ ਦੀ ਰਾਹੀਂ।',
    },
    {
      id: '6QZ1',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਪ੍ਰਭੁ ਆਪਿ ਮਿਲਿਆ; ਕਰਣ ਕਾਰਣ ਜੋਗੋ ॥੩੪॥',
      pronunciation: 'kahē nānaku. prabh āp miliā; karaṇ kāraṇ jogo ‖34‖',
      translation:
        'Says Nanak, God Himself has met me; He is the Doer, the Cause of causes. ||34||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਹੇ ਜਿੰਦੇ! ਖ਼ੁਸ਼ੀ ਦਾ ਗੀਤ ਗਾ) ਸਭ ਕੁਝ ਕਰਨ ਦੇ ਸਮਰੱਥ ਪ੍ਰਭੂ ਆਪ ਆ ਕੇ ਮੈਨੂੰ ਮਿਲ ਪਿਆ ਹੈ ॥੩੪॥ ਜੋਗੋ = ਸਮਰੱਥ ॥੩੪॥',
    },
    {
      id: 'ZJ5T',
      src: 'ਏ ਸਰੀਰਾ ਮੇਰਿਆ. ਇਸੁ ਜਗ ਮਹਿ ਆਇ ਕੈ; ਕਿਆ ਤੁਧੁ ਕਰਮ ਕਮਾਇਆ ॥',
      pronunciation:
        'e sarīrā meriā. is jag mah āi kē; kiā tudh karam kamāiā ‖',
      translation:
        'O my body, why have you come into this world? What actions have you committed?',
      vicar:
        'ਹੇ ਮੇਰੇ ਸਰੀਰ! ਇਸ ਜਗਤ ਵਿਚ ਜਨਮ ਲੈ ਕੇ ਤੂੰ ਹੋਰ ਹੋਰ ਕੰਮ ਹੀ ਕਰਦਾ ਰਿਹਾ। ਕਿਆ ਕਰਮ = ਕੇਹੜੇ ਕੰਮ? ਹੋਰ ਹੋਰ ਕੰਮ ਹੀ।',
    },
    {
      id: 'W964',
      src: 'ਕਿ ਕਰਮ ਕਮਾਇਆ. ਤੁਧੁ ਸਰੀਰਾ; ਜਾ ਤੂ. ਜਗ ਮਹਿ ਆਇਆ ॥',
      pronunciation: 'ka karam kamāiā. tudh sarīrā; jā tū. jag mah āiā ‖',
      translation:
        'And what actions have you committed, O my body, since you came into this world?',
      vicar:
        'ਜਦੋਂ ਦਾ ਤੂੰ ਸੰਸਾਰ ਵਿਚ ਆਇਆ ਹੈਂ, ਤੂੰ (ਪ੍ਰਭੂ-ਸਿਮਰਨ ਤੋਂ ਬਿਨਾ) ਹੋਰ ਹੋਰ ਕੰਮ ਹੀ ਕਰਦਾ ਰਿਹਾ।',
    },
    {
      id: '41X4',
      src: 'ਜਿਨਿ ਹਰਿ ਤੇਰਾ ਰਚਨੁ ਰਚਿਆ; ਸੋ ਹਰਿ ਮਨਿ. ਨ ਵਸਾਇਆ ॥',
      pronunciation: 'jin har terā racan raciā; so har mani. na wasāiā ‖',
      translation:
        'The Lord who formed your form - you have not enshrined that Lord in your mind.',
      vicar:
        'ਜਿਸ ਹਰੀ ਨੇ ਤੈਨੂੰ ਪੈਦਾ ਕੀਤਾ ਹੈ, ਉਸ ਨੂੰ ਤੂੰ ਆਪਣੇ ਮਨ ਵਿਚ ਨਹੀਂ ਵਸਾਇਆ (ਉਸ ਦੀ ਯਾਦ ਵਿਚ ਕਦੇ ਨਹੀਂ ਜੁੜਿਆ)। ਜਿਨਿ ਹਰਿ = ਜਿਸ ਹਰੀ ਨੇ। ਤੇਰਾ ਰਚਨੁ ਰਚਿਆ = ਤੈਨੂੰ ਪੈਦਾ ਕੀਤਾ। ਮਨਿ = ਮਨ ਵਿਚ।',
    },
    {
      id: 'Q645',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਹਰਿ ਮੰਨਿ ਵਸਿਆ; ਪੂਰਬਿ ਲਿਖਿਆ ਪਾਇਆ ॥',
      pronunciation: 'gur parasādī har mañn wasiā; pūrab likhiā pāiā ‖',
      translation:
        "By Guru's Grace, the Lord abides within the mind, and one's pre-ordained destiny is fulfilled.",
      vicar:
        '(ਪਰ, ਹੇ ਸਰੀਰ! ਤੇਰੇ ਭੀ ਕੀਹ ਵੱਸ?) ਜਿਸ ਮਨੁੱਖ ਦੇ ਪੂਰਬਲੇ ਕੀਤੇ ਕਰਮਾਂ ਦੇ ਸੰਸਕਾਰ ਉੱਘੜਦੇ ਹਨ, ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਉਸ ਦੇ ਮਨ ਵਿਚ ਪਰਮਾਤਮਾ ਵੱਸਦਾ ਹੈ (ਉਹੀ ਹਰੀ-ਸਿਮਰਨ ਵਿਚ ਜੁੜਦਾ ਹੈ)। ਮੰਨਿ = ਮਨ ਵਿਚ।',
    },
    {
      id: 'KHSD',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਏਹੁ ਸਰੀਰੁ ਪਰਵਾਣੁ ਹੋਆ; ਜਿਨਿ ਸਤਿਗੁਰ ਸਿਉ ਚਿਤੁ ਲਾਇਆ ॥੩੫॥',
      pronunciation:
        'kahē nānaku. eh sarīr paravāṇ hoā; jin satigur siu cit lāiā ‖35‖',
      translation:
        "Says Nanak, this body is adorned and honored, when one's consciousness is focused on the True Guru. ||35||",
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਜਿਸ ਮਨੁੱਖ ਨੇ ਗੁਰੂ-ਚਰਨਾਂ ਵਿਚ ਚਿੱਤ ਜੋੜ ਲਿਆ, (ਉਸ ਦਾ) ਇਹ ਸਰੀਰ ਸਫਲ ਹੋ ਜਾਂਦਾ ਹੈ (ਉਹ ਮਨੁੱਖ ਉਹ ਮਨੋਰਥ ਪੂਰਾ ਕਰ ਲੈਂਦਾ ਹੈ ਜਿਸ ਵਾਸਤੇ ਇਹ ਬਣਾਇਆ ਗਿਆ) ॥੩੫॥ ਜਿਨਿ = ਜਿਸ ਮਨੁੱਖ ਨੇ। ਪਰਵਾਣੁ = ਕਬੂਲ, ਸਫਲ ॥੩੫॥',
    },
    {
      id: 'LWNF',
      src: 'ਏ ਨੇਤ੍ਰਹੁ ਮੇਰਿਹੋ. ਹਰਿ ਤੁਮ ਮਹਿ ਜੋਤਿ ਧਰੀ; ਹਰਿ ਬਿਨੁ ਅਵਰੁ. ਨ ਦੇਖਹੁ ਕੋਈ ॥',
      pronunciation:
        'e netrah meriho. har tum mah jot dharī; har bin awaru. na dekhah koī ‖',
      translation:
        'O my eyes, the Lord has infused His Light into you; do not look upon any other than the Lord.',
      vicar:
        'ਹੇ ਮੇਰੀਓ ਅੱਖੀਓ! ਪਰਮਾਤਮਾ ਨੇ ਤੁਹਾਡੇ ਅੰਦਰ (ਆਪਣੀ) ਜੋਤਿ ਟਿਕਾਈ ਹੈ (ਤਾਹੀਏਂ ਤੁਸੀ ਵੇਖਣ-ਜੋਗੀਆਂ ਹੋ) ਜਿੱਧਰ ਤੱਕੋ, ਪਰਮਾਤਮਾ ਦਾ ਹੀ ਦੀਦਾਰ ਕਰੋ। ਨੇਤ੍ਰ = ਅੱਖਾਂ। ਜੋਤਿ = ਰੋਸ਼ਨੀ।',
    },
    {
      id: '15NN',
      src: 'ਹਰਿ ਬਿਨੁ ਅਵਰੁ. ਨ ਦੇਖਹੁ ਕੋਈ; ਨਦਰੀ ਹਰਿ ਨਿਹਾਲਿਆ ॥',
      pronunciation: 'har bin awaru. na dekhah koī; nadarī har nihāliā ‖',
      translation:
        'Do not look upon any other than the Lord; the Lord alone is worthy of beholding.',
      vicar:
        'ਪਰਮਾਤਮਾ ਤੋਂ ਬਿਨਾ ਹੋਰ ਕੋਈ ਗ਼ੈਰ ਨਾ ਦਿੱਸੇ, ਨਿਗਾਹ ਨਾਲ ਹਰੀ ਨੂੰ ਵੇਖੋ। ਨਿਹਾਲਿਆ = ਨਿਹਾਲੋ, ਵੇਖੋ। ਨਦਰੀ = ਨਜ਼ਰ ਨਾਲ, ਅੱਖਾਂ ਨਾਲ।',
    },
    {
      id: 'WA02',
      src: 'ਏਹੁ ਵਿਸੁ ਸੰਸਾਰੁ. ਤੁਮ ਦੇਖਦੇ. ਏਹੁ ਹਰਿ ਕਾ ਰੂਪੁ ਹੈ; ਹਰਿ ਰੂਪੁ ਨਦਰੀ ਆਇਆ ॥',
      pronunciation:
        'eh vis sañsāru. tum dekhade. eh har kā rūp hē; har rūp nadarī āiā ‖',
      translation:
        'This whole world which you see is the image of the Lord; only the image of the Lord is seen.',
      vicar:
        '(ਹੇ ਅੱਖੀਓ!) ਇਹ ਸਾਰਾ ਸੰਸਾਰ ਜੋ ਤੁਸੀ ਵੇਖ ਰਹੀਆਂ ਹੋ, ਇਹ ਪ੍ਰਭੂ ਦਾ ਹੀ ਰੂਪ ਹੈ, ਪ੍ਰਭੂ ਦਾ ਹੀ ਰੂਪ ਦਿੱਸ ਰਿਹਾ ਹੈ। ਵਿਸੁ = ਵਿਸ਼੍ਵ, ਸਾਰਾ। ਨਦਰੀ ਆਇਆ = ਦਿੱਸਦਾ ਹੈ।',
    },
    {
      id: 'U6WS',
      src: 'ਗੁਰ ਪਰਸਾਦੀ ਬੁਝਿਆ. ਜਾ ਵੇਖਾ ਹਰਿ ਇਕੁ ਹੈ; ਹਰਿ ਬਿਨੁ ਅਵਰੁ. ਨ ਕੋਈ ॥',
      pronunciation:
        'gur parasādī bujhiā. jā vekhā har ik hē; har bin awaru. na koī ‖',
      translation:
        "By Guru's Grace, I understand, and I see only the One Lord; there is no one except the Lord.",
      vicar:
        'ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਮੈਨੂੰ ਸਮਝ ਪਈ ਹੈ, ਹੁਣ ਮੈਂ ਜਦੋਂ (ਚੁਫੇਰੇ) ਵੇਖਦਾ ਹਾਂ, ਹਰ ਥਾਂ ਇਕ ਪਰਮਾਤਮਾ ਹੀ ਦਿੱਸਦਾ ਹੈ, ਉਸ ਤੋਂ ਬਿਨਾ ਹੋਰ ਕੁਝ ਨਹੀਂ।',
    },
    {
      id: 'AG7C',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਏਹਿ ਨੇਤ੍ਰ ਅੰਧ ਸੇ; ਸਤਿਗੁਰਿ ਮਿਲਿਐ. ਦਿਬ ਦ੍ਰਿਸਟਿ ਹੋਈ ॥੩੬॥',
      pronunciation:
        'kahē nānaku. eh netr añdh se; satigur miliē. dib drisaṭ hoī ‖36‖',
      translation:
        'Says Nanak, these eyes were blind; but meeting the True Guru, they became all-seeing. ||36||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ (ਗੁਰੂ ਨੂੰ ਮਿਲਣ ਤੋਂ ਪਹਿਲਾਂ) ਇਹ ਅੱਖੀਆਂ (ਅਸਲ ਵਿਚ) ਅੰਨ੍ਹੀਆਂ ਸਨ, ਜਦੋਂ ਗੁਰੂ ਮਿਲਿਆ, ਇਹਨਾਂ ਵਿਚ ਰੌਸ਼ਨੀ ਆਈ (ਇਹਨਾਂ ਨੂੰ ਹਰ ਥਾਂ ਪਰਮਾਤਮਾ ਦਿੱਸਣ ਲੱਗਾ। ਇਹੀ ਦੀਦਾਰ ਆਨੰਦ-ਮੂਲ ਹੈ) ॥੩੬॥ ਅੰਧ = ਅੰਨ੍ਹੇ। ਸੇ = ਸਨ। ਦਿਬ = (ਦਿਵ੍ਯ) ਚਮਕੀਲੀ, ਰੋਸ਼ਨ। ਦ੍ਰਿਸਟਿ = ਨਜ਼ਰ ॥੩੬॥',
    },
    {
      id: '12QN',
      src: 'ਏ ਸ੍ਰਵਣਹੁ ਮੇਰਿਹੋ; ਸਾਚੈ ਸੁਨਣੈ ਨੋ ਪਠਾਏ ॥',
      pronunciation: 'e srawaṇah meriho; sācē sunaṇē no paṭhāe ‖',
      translation: 'O my ears, you were created only to hear the Truth.',
      vicar:
        'ਹੇ ਮੇਰੇ ਕੰਨੋ! ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਸੁਣਨ ਵਾਸਤੇ ਬਣਾਇਆ ਹੈ, ਸ੍ਰਵਣ = ਕੰਨ। ਪਠਾਏ = ਭੇਜੇ।',
    },
    {
      id: '1K3K',
      src: 'ਸਾਚੈ ਸੁਨਣੈ ਨੋ ਪਠਾਏ. ਸਰੀਰਿ ਲਾਏ; ਸੁਣਹੁ ਸਤਿ ਬਾਣੀ ॥',
      pronunciation: 'sācē sunaṇē no paṭhāe. sarīr lāe; suṇah sat bāṇī ‖',
      translation:
        'To hear the Truth, you were created and attached to the body; listen to the True Bani.',
      vicar:
        'ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਸੁਣਿਆ ਕਰੋ, ਸਦਾ-ਥਿਰ ਕਰਤਾਰ ਨੇ ਤੁਹਾਨੂੰ ਇਹੀ ਸੁਣਨ ਵਾਸਤੇ ਬਣਾਇਆ ਹੈ, ਇਸ ਸਰੀਰ ਵਿਚ ਥਾਪਿਆ ਹੈ। ਸਾਚੈ = ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਨੇ। ਸਰੀਰਿ = ਸਰੀਰ ਵਿਚ। ਸਤਿ ਬਾਣੀ = ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਵਾਲੀ ਬਾਣੀ।',
    },
    {
      id: 'BSJX',
      src: 'ਜਿਤੁ ਸੁਣੀ. ਮਨੁ ਤਨੁ ਹਰਿਆ ਹੋਆ; ਰਸਨਾ ਰਸਿ ਸਮਾਣੀ ॥',
      pronunciation: 'jit suṇī. man tan hariā hoā; rasanā ras samāṇī ‖',
      translation:
        'Hearing it, the mind and body are rejuvenated, and the tongue is absorbed in Ambrosial Nectar.',
      vicar:
        'ਇਸ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਦੇ ਸੁਣਨ ਨਾਲ ਤਨ ਮਨ ਆਨੰਦ-ਭਰਪੂਰ ਹੋ ਜਾਂਦਾ ਹੈ, ਜੀਭ ਆਨੰਦ ਵਿਚ ਮਸਤ ਹੋ ਜਾਂਦੀ ਹੈ। ਜਿਤੁ = ਜਿਸ ਦੀ ਰਾਹੀਂ। ਜਿਤੁ ਸੁਣੀ = ਜਿਸ ਦੇ ਸੁਣਨ ਨਾਲ। ਰਸਿ = ਆਨੰਦ ਵਿਚ। ਹਰਿਆ = ਖਿੜਿਆ, ਆਨੰਦ-ਭਰਪੂਰ। ਰਸਨਾ = ਜੀਭ।',
    },
    {
      id: 'YT8B',
      src: 'ਸਚੁ ਅਲਖ ਵਿਡਾਣੀ; ਤਾ ਕੀ ਗਤਿ ਕਹੀ. ਨ ਜਾਏ ॥',
      pronunciation: 'sac alakh viḍāṇī; tā kī gat kahī. na jāe ‖',
      translation:
        'The True Lord is unseen and wondrous; His state cannot be described.',
      vicar:
        'ਸਦਾ-ਥਿਰ ਪਰਮਾਤਮਾ ਤਾਂ ਅਸਚਰਜ-ਰੂਪ ਹੈ, ਉਸ ਦਾ ਕੋਈ ਚਿਹਨ-ਚੱਕ੍ਰ ਦੱਸਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ, ਇਹ ਨਹੀਂ ਕਿਹਾ ਜਾ ਸਕਦਾ ਕਿ ਉਹ ਕਿਹੋ ਜਿਹਾ ਹੈ। ਵਿਡਾਣੀ = ਅਸਚਰਜ। ਗਤਿ = ਹਾਲਤ।',
    },
    {
      id: 'DTNR',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਅੰਮ੍ਰਿਤ ਨਾਮੁ ਸੁਣਹੁ. ਪਵਿਤ੍ਰ ਹੋਵਹੁ; ਸਾਚੈ ਸੁਨਣੈ ਨੋ ਪਠਾਏ ॥੩੭॥',
      pronunciation:
        'kahē nānaku. añmrit nām suṇahu. pavitr howahu; sācē sunaṇē no paṭhāe ‖37‖',
      translation:
        'Says Nanak, listen to the Ambrosial Naam and become holy; you were created only to hear the Truth. ||37||',
      vicar:
        '(ਉਸ ਦੇ ਗੁਣ ਕਹਿਣ ਸੁਣਨ ਨਾਲ ਸਿਰਫ਼ ਇਹੀ ਲਾਭ ਹੁੰਦਾ ਹੈ ਕਿ ਮਨੁੱਖ ਨੂੰ ਆਤਮਕ ਆਨੰਦ ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ, ਤਾਹੀਏਂ) ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਆਤਮਕ ਆਨੰਦ ਦੇਣ ਵਾਲਾ ਨਾਮ ਸੁਣਿਆ ਕਰੋ, ਤੁਸੀ ਪਵਿਤ੍ਰ ਹੋ ਜਾਵੋਗੇ, ਪਰਮਾਤਮਾ ਨੇ ਤੁਹਾਨੂੰ ਇਹੀ ਸੁਣਨ ਵਾਸਤੇ ਭੇਜਿਆ (ਬਣਾਇਆ) ਹੈ ॥੩੭॥ ਅੰਮ੍ਰਿਤ = ਆਤਮਕ ਆਨੰਦ ਦੇਣ ਵਾਲਾ ॥੩੭॥',
    },
    {
      id: 'FJM8',
      src: 'ਹਰਿ ਜੀਉ. ਗੁਫਾ ਅੰਦਰਿ ਰਖਿ ਕੈ; ਵਾਜਾ ਪਵਣੁ ਵਜਾਇਆ ॥',
      pronunciation: 'har jīu. guphā añdar rakh kē; vājā pawaṇ wajāiā ‖',
      translation:
        'The Lord placed the soul to the cave of the body, and blew the breath of life into the musical instrument of the body.',
      vicar:
        'ਪਰਮਾਤਮਾ ਨੇ ਜਿੰਦ ਨੂੰ ਸਰੀਰ-ਗੁਫ਼ਾ ਵਿਚ ਟਿਕਾ ਕੇ ਜੀਵ ਨੂੰ ਬੋਲਣ ਦੀ ਸ਼ਕਤੀ ਦਿੱਤੀ। ਜੀਉ = ਜਿੰਦ। ਗੁਫਾ = ਸਰੀਰ। ਪਵਣੁ ਵਾਜਾ ਵਜਾਇਆ = ਸੁਆਸ-ਰੂਪ ਵਾਜਾ ਵਜਾਇਆ, ਬੋਲਣ ਦੀ ਸ਼ਕਤੀ ਦਿੱਤੀ।',
    },
    {
      id: 'JTHC',
      src: 'ਵਜਾਇਆ ਵਾਜਾ ਪਉਣ. ਨਉ ਦੁਆਰੇ ਪਰਗਟੁ ਕੀਏ; ਦਸਵਾ ਗੁਪਤੁ ਰਖਾਇਆ ॥',
      pronunciation:
        'wajāiā vājā pauṇ. nau duāre paragaṭ kīe; dasavā gupat rakhāiā ‖',
      translation:
        'He blew the breath of life into the musical instrument of the body, and revealed the nine doors; but He kept the Tenth Door hidden.',
      vicar:
        'ਸਰੀਰ ਨੂੰ ਬੋਲਣ ਦੀ ਸ਼ਕਤੀ ਦਿੱਤੀ, ਨੱਕ ਕੰਨ ਆਦਿਕ ਨੌ ਕਰਮ-ਇੰਦ੍ਰੀਆਂ ਪਰਤੱਖ ਤੌਰ ਤੇ ਬਣਾਈਆਂ, ਦਸਵੇਂ ਦਰ (ਦਿਮਾਗ਼) ਨੂੰ ਲੁਕਵਾਂ ਰੱਖਿਆ। ਨਉ ਦੁਆਰੇ = ਨੌ ਗੋਲਕਾਂ, ੧ ਮੂੰਹ, ੨ ਕੰਨ, ੨ ਅੱਖਾਂ, ੨ ਨਾਸਾਂ, ਗੁਦਾ, ਲਿੰਗ।',
    },
    {
      id: 'F41Z',
      src: 'ਗੁਰਦੁਆਰੈ ਲਾਇ ਭਾਵਨੀ; ਇਕਨਾ ਦਸਵਾ ਦੁਆਰੁ ਦਿਖਾਇਆ ॥',
      pronunciation: 'guraduārē lāi bhāwanī; ikanā dasavā duār dikhāiā ‖',
      translation:
        "Through the Gurdwara, the Guru's Gate, some are blessed with loving faith, and the Tenth Door is revealed to them.",
      vicar:
        'ਪ੍ਰਭੂ ਨੇ ਜਿਨ੍ਹਾਂ ਨੂੰ ਗੁਰੂ ਦੇ ਦਰ ਤੇ ਅਪੜਾ ਕੇ ਆਪਣੇ ਨਾਮ ਦੀ ਸਰਧਾ ਬਖ਼ਸ਼ੀ, ਉਹਨਾਂ ਨੂੰ ਦਸਵਾਂ ਦਰ ਭੀ ਵਿਖਾ ਦਿੱਤਾ (ਉਹਨਾਂ ਨੂੰ ਸਿਮਰਨ ਦੀ ਵਿਚਾਰ-ਸੱਤਿਆ ਭੀ ਦੇ ਦਿੱਤੀ ਜੋ ਆਤਮਕ ਆਨੰਦ ਦਾ ਮੂਲ ਹੈ)। ਦਸਵਾ ਦੁਆਰ = (ਭਾਵ,) ਦਿਮਾਗ਼ (ਜਿਸ ਦੀ ਰਾਹੀਂ ਮਨੁੱਖ ਵਿਚਾਰ ਕਰ ਸਕਦਾ ਹੈ)। ਭਾਵਨੀ = ਸਰਧਾ, ਪ੍ਰੇਮ।',
    },
    {
      id: '8G4V',
      src: 'ਤਹ ਅਨੇਕ ਰੂਪ ਨਾਉ ਨਵ ਨਿਧਿ; ਤਿਸ ਦਾ ਅੰਤੁ. ਨ ਜਾਈ ਪਾਇਆ ॥',
      pronunciation: 'tah anek rūp nāu nav nidhi; tis dā añtu. na jāī pāiā ‖',
      translation:
        'There are many images of the Lord, and the nine treasures of the Naam; His limits cannot be found.',
      vicar:
        'ਉਸ ਅਵਸਥਾ ਵਿਚ ਮਨੁੱਖ ਨੂੰ ਅਨੇਕਾਂ ਰੰਗਾਂ ਰੂਪਾਂ ਵਿਚ ਵਿਆਪਕ ਪ੍ਰਭੂ ਦਾ ਉਹ ਨਾਮ-ਰੂਪਾਂ ਨੌ ਖ਼ਜ਼ਾਨਿਆਂ ਦਾ ਭੰਡਾਰ ਭੀ ਪ੍ਰਾਪਤ ਹੋ ਜਾਂਦਾ ਹੈ ਜਿਸ ਦਾ ਅੰਤ ਨਹੀਂ ਪੈ ਸਕਦਾ (ਜੋ ਕਦੇ ਮੁੱਕਦਾ ਨਹੀਂ)। ਤਹ = ਉਸ ਅਵਸਥਾ ਵਿਚ। ਅਨੇਕ ਰੂਪ ਨਾਉ = ਅਨੇਕਾਂ ਰੂਪਾਂ ਵਾਲੇ ਪ੍ਰਭੂ ਦਾ ਨਾਮ। ਨਿਧਿ = ਖ਼ਜ਼ਾਨਾ।',
    },
    {
      id: 'MDJQ',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਹਰਿ ਪਿਆਰੈ ਜੀਉ. ਗੁਫਾ ਅੰਦਰਿ ਰਖਿ ਕੈ; ਵਾਜਾ ਪਵਣੁ ਵਜਾਇਆ ॥੩੮॥',
      pronunciation:
        'kahē nānaku. har piārē jīu. guphā añdar rakh kē; vājā pawaṇ wajāiā ‖38‖',
      translation:
        'Says Nanak, the Lord placed the soul to the cave of the body, and blew the breath of life into the musical instrument of the body. ||38||',
      vicar:
        'ਨਾਨਕ ਆਖਦਾ ਹੈ ਕਿ ਪਿਆਰੇ ਪ੍ਰਭੂ ਨੇ ਜਿੰਦ ਨੂੰ ਸਰੀਰ-ਗੁਫ਼ਾ ਵਿਚ ਟਿਕਾ ਕੇ ਜੀਵ ਨੂੰ ਬੋਲਣ ਦੀ ਸ਼ਕਤੀ ਭੀ ਦਿੱਤੀ ॥੩੮॥',
    },
    {
      id: 'R6CF',
      src: 'ਏਹੁ ਸਾਚਾ ਸੋਹਿਲਾ; ਸਾਚੈ ਘਰਿ ਗਾਵਹੁ ॥',
      pronunciation: 'eh sācā sohilā; sācē ghar gāwah ‖',
      translation:
        'Sing this true song of praise in the true home of your soul.',
      vicar:
        'ਪਰਮਾਤਮਾ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਇਹ ਬਾਣੀ ਸਾਧ ਸੰਗਤ ਵਿਚ (ਬੈਠ ਕੇ) ਗਾਵਿਆ ਕਰੋ। ਸੋਹਿਲਾ = ਖ਼ੁਸ਼ੀ ਦਾ ਗੀਤ, ਆਤਮਕ ਆਨੰਦ ਪੈਦਾ ਕਰਨ ਵਾਲਾ ਗੀਤ, ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ। ਸਾਚੈ ਘਰਿ = ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲੇ ਘਰ ਵਿਚ, ਸਾਧ ਸੰਗਤ ਵਿਚ।',
    },
    {
      id: 'EJTE',
      src: 'ਗਾਵਹੁ ਤ ਸੋਹਿਲਾ ਘਰਿ ਸਾਚੈ; ਜਿਥੈ ਸਦਾ ਸਚੁ ਧਿਆਵਹੇ ॥',
      pronunciation: 'gāwah ta sohilā ghar sācē; jithē sadā sac dhiāwahe ‖',
      translation:
        'Sing the song of praise in your true home; meditate there on the True Lord forever.',
      vicar:
        'ਉਸ ਸਤ ਸੰਗ ਵਿਚ ਆਮਤਕ ਅਨੰਦ ਦੇਣ ਵਾਲੀ ਬਾਣੀ ਗਾਵਿਆ ਕਰੋ, ਜਿਥੇ (ਗੁਰਮੁਖਿ ਜਨ) ਸਦਾ-ਥਿਰ ਰਹਿਣ ਵਾਲੇ ਪ੍ਰਭੂ ਨੂੰ ਸਦਾ ਗਾਂਦੇ ਹਨ। ਸਚੁ = ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ। ਗਾਵਹੁ = ਗਾਵਹਿ, (ਸਤ ਸੰਗੀ) ਗਾਂਦੇ ਹਨ।',
    },
    {
      id: '0RQ1',
      src: 'ਸਚੋ ਧਿਆਵਹਿ ਜਾ ਤੁਧੁ ਭਾਵਹਿ; ਗੁਰਮੁਖਿ ਜਿਨਾ ਬੁਝਾਵਹੇ ॥',
      pronunciation: 'saco dhiāwah jā tudh bhāwahi; guramukh jinā bujhāwahe ‖',
      translation:
        'They alone meditate on You, O True Lord, who are pleasing to Your Will; as Gurmukh, they understand.',
      vicar:
        'ਹੇ ਪ੍ਰਭੂ! ਤੈਨੂੰ ਸਦਾ-ਥਿਰ ਨੂੰ ਤਦੋਂ ਹੀ ਜੀਵ ਸਿਮਰਦੇ ਹਨ ਜਦੋਂ ਤੈਨੂੰ ਚੰਗੇ ਲੱਗਣ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਤੂੰ ਗੁਰੂ ਦੀ ਰਾਹੀਂ ਇਹ ਸੂਝ ਬਖ਼ਸ਼ੇਂ। ਭਾਵਹਿ = ਜੇ ਤੈਨੂੰ ਚੰਗੇ ਲੱਗਣ, ਹੇ ਪ੍ਰਭੂ! ਬੁਝਾਵਹੇ = ਤੂੰ ਸੂਝ ਬਖ਼ਸ਼ੇਂ। ਗੁਰਮੁਖਿ = ਗੁਰੂ ਦੀ ਰਾਹੀਂ।',
    },
    {
      id: '1RVB',
      src: 'ਇਹੁ ਸਚੁ ਸਭਨਾ ਕਾ ਖਸਮੁ ਹੈ; ਜਿਸੁ ਬਖਸੇ. ਸੋ ਜਨੁ ਪਾਵਹੇ ॥',
      pronunciation:
        'ih sac sabhanā kā khasam hē; jis bakhase. so jan pāwahe ‖',
      translation:
        'This Truth is the Lord and Master of all; whoever is blessed, obtains it.',
      vicar:
        'ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਸਭ ਜੀਵਾਂ ਦਾ ਮਾਲਕ ਹੈ, ਜਿਸ ਜਿਸ ਉਤੇ ਉਹ ਮੇਹਰ ਕਰਦਾ ਹੈ ਉਹ ਉਹ ਜੀਵ ਤੈਨੂੰ ਪ੍ਰਾਪਤ ਕਰ ਲੈਂਦੇ ਹਨ। ਪਾਵਹੇ = ਪ੍ਰਾਪਤ ਕਰਦੇ ਹਨ, ਪਾਵਹਿ।',
    },
    {
      id: 'CTN5',
      src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੁ ਸੋਹਿਲਾ; ਸਚੈ ਘਰਿ ਗਾਵਹੇ ॥੩੯॥',
      pronunciation: 'kahē nānaku. sac sohilā; sacē ghar gāwahe ‖39‖',
      translation:
        'Says Nanak, sing the true song of praise in the true home of your soul. ||39||',
      vicar:
        'ਤੇ, ਨਾਨਕ ਆਖਦਾ ਹੈ, ਉਹ ਸਤ ਸੰਗਤ ਵਿਚ (ਬੈਠ ਕੇ) ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਵਾਲੀ ਬਾਣੀ ਗਾਂਦੇ ਹਨ ॥੩੯॥ ਗਾਵਹੇ = ਗਾਵਹਿ, ਗਾਂਦੇ ਹਨ ॥੩੯॥',
    },
    {
      id: 'ELHF',
      src: 'ਅਨਦੁ ਸੁਣਹੁ ਵਡਭਾਗੀਹੋ; ਸਗਲ ਮਨੋਰਥ ਪੂਰੇ ॥',
      pronunciation: 'anad suṇah waḍabhāgīho; sagal manorath pūre ‖',
      translation:
        'Listen to the song of bliss, O most fortunate ones; all your longings shall be fulfilled.',
      vicar:
        'ਹੇ ਵੱਡੇ ਭਾਗਾਂ ਵਾਲਿਓ! ਸੁਣੋ, ਆਨੰਦ ਇਹ ਹੈ ਕਿ (ਉਸ ਅਵਸਥਾ ਵਿਚ) ਮਨ ਦੀਆਂ ਸਾਰੀਆਂ ਦੌੜਾਂ ਮੁੱਕ ਜਾਂਦੀਆਂ ਹਨ (ਸਾਰੇ ਸੰਕਲਪ ਸਿਰੇ ਚੜ੍ਹ ਜਾਂਦੇ ਹਨ),',
    },
    {
      id: 'EDPZ',
      src: 'ਪਾਰਬ੍ਰਹਮੁ ਪ੍ਰਭੁ ਪਾਇਆ; ਉਤਰੇ ਸਗਲ ਵਿਸੂਰੇ ॥',
      pronunciation: 'pārabraham prabh pāiā; utare sagal visūre ‖',
      translation:
        'I have obtained the Supreme Lord God, and all sorrows have been forgotten.',
      vicar:
        'ਪਰਮ ਆਤਮਾ ਪ੍ਰਭੂ ਮਿਲ ਪੈਂਦਾ ਹੈ, ਸਾਰੇ ਚਿੰਤਾ-ਝੌਰੇ ਮਨ ਤੋਂ ਲਹਿ ਜਾਂਦੇ ਹਨ। ਵਿਸੂਰੇ = ਚਿੰਤਾ-ਝੋਰੇ। ਸੰਤਾਪ = ਕਲੇਸ਼।',
    },
    {
      id: '2UQS',
      src: 'ਦੂਖ ਰੋਗ ਸੰਤਾਪ ਉਤਰੇ; ਸੁਣੀ ਸਚੀ ਬਾਣੀ ॥',
      pronunciation: 'dūkh rog sañtāp utare; suṇī sacī bāṇī ‖',
      translation:
        'Pain, illness and suffering have departed, listening to the True Bani.',
      vicar:
        'ਅਕਾਲ ਪੁਰਖ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਸੁਣਿਆਂ ਸਾਰੇ ਦੁੱਖ ਰੋਗ ਕਲੇਸ਼ ਮਿਟ ਜਾਂਦੇ ਹਨ। ਸਚੀ ਬਾਣੀ = ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ।',
    },
    {
      id: 'DLUB',
      src: 'ਸੰਤ ਸਾਜਨ ਭਏ ਸਰਸੇ; ਪੂਰੇ ਗੁਰ ਤੇ ਜਾਣੀ ॥',
      pronunciation: 'sañt sājan bhae sarase; pūre gur te jāṇī ‖',
      translation:
        'The Saints and their friends are in ecstasy, knowing the Perfect Guru.',
      vicar:
        'ਜੇਹੜੇ ਸੰਤ ਗੁਰਮੁਖਿ ਪੂਰੇ ਗੁਰੂ ਤੋਂ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਬਾਣੀ ਨਾਲ ਸਾਂਝੀ ਪਾਣੀ ਸਿੱਖ ਲੈਂਦੇ ਹਨ ਉਹਨਾਂ ਦੇ ਹਿਰਦੇ ਖਿੜ ਆਉਂਦੇ ਹਨ। ਸਰਸੇ = ਸ-ਰਸ, ਰਹੇ, ਆਨੰਦ-ਭਰਪੂਰ। ਗੁਰ ਤੇ = ਗੁਰੂ ਤੋਂ। ਸਤਿਗੁਰੁ ਰਹਿਆ',
    },
    {
      id: '51FD',
      src: 'ਸੁਣਤੇ ਪੁਨੀਤ. ਕਹਤੇ ਪਵਿਤੁ; ਸਤਿਗੁਰੁ ਰਹਿਆ ਭਰਪੂਰੇ ॥',
      pronunciation: 'suṇate punīt. kahate pavitu; satigur rahiā bharapūre ‖',
      translation:
        'Pure are the listeners, and pure are the speakers; the True Guru is all-pervading and permeating.',
      vicar:
        'ਇਸ ਬਾਣੀ ਨੂੰ ਸੁਣਨ ਵਾਲੇ ਉਚਾਰਨ ਵਾਲੇ ਸਭ ਪਵਿਤ੍ਰ-ਆਤਮਕ ਹੋ ਜਾਂਦੇ ਹਨ, ਇਸ ਬਾਣੀ ਵਿਚ ਉਹਨਾਂ ਨੂੰ ਸਤਿਗੁਰੂ ਹੀ ਦਿੱਸਦਾ ਹੈ। ਭਰਪੂਰੇ = ਗੁਰੂ (ਆਪਣੀ ਬਾਣੀ ਵਿਚ) ਭਰਪੂਰ ਹੈ, ਬਾਣੀ ਗੁਰੂ-ਰੂਪ ਹੈ।',
    },
    {
      id: 'C1W0',
      src: 'ਬਿਨਵੰਤਿ ਨਾਨਕੁ. ਗੁਰ ਚਰਣ ਲਾਗੇ; ਵਾਜੇ ਅਨਹਦ ਤੂਰੇ ॥੪੦॥੧॥',
      pronunciation: 'binawañt nānaku. gur caraṇ lāge; vāje anahad tūre ‖40‖1‖',
      translation:
        "Prays Nanak, touching the Guru's Feet, the unstruck sound current of the celestial bugles vibrates and resounds. ||40||1||",
      vicar:
        'ਨਾਨਕ ਬੇਨਤੀ ਕਰਦਾ ਹੈ-ਜੇਹੜੇ ਬੰਦੇ ਗੁਰੂ ਦੀ ਚਰਨੀਂ ਲੱਗਦੇ ਹਨ, ਉਹਨਾਂ ਦੇ ਅੰਦਰ ਇਕ-ਰਸ (ਖ਼ੁਸ਼ੀ ਦੇ) ਵਾਜੇ ਵੱਜ ਪੈਂਦੇ ਹਨ (ਉਹਨਾਂ ਦੇ ਅੰਦਰ ਆਤਮਕ ਆਨੰਦ ਪੈਦਾ ਹੋ ਜਾਂਦਾ ਹੈ) ॥੪੦॥੧॥ ਅਨਹਦ = ਇਕ-ਰਸ। ਤੂਰੇ = ਵਾਜੇ। ਮਨੋਰਥ = ਮਨ ਦੀਆਂ ਦੌੜਾਂ ॥੪੦॥੧॥',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
