import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 12)',
    roman: 'Āsā kī vār (chakkā 12)',
  },
  paging: {
    previous: 'asa-ki-var/11',
    next: 'asa-ki-var/13',
  },
  data: [
    {
      id: 'RR5B',
      src: 'ਜਿਉ ਭਾਵੈ ਤਿਉ ਰਾਖਿ ਲੈ; ਹਮ ਸਰਣਿ ਪ੍ਰਭ ਆਏ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'jiu bhāvē tiu rākh lē; ham saraṇ prabh āe, rām rāje ‖',
      translation:
        'As it pleases You, You save me; I have come seeking Your Sanctuary, O God, O Lord King.',
    },
    {
      id: 'E8GQ',
      src: 'ਹਮ ਭੂਲਿ ਵਿਗਾੜਹ ਦਿਨਸੁ ਰਾਤਿ; ਹਰਿ ਲਾਜ ਰਖਾਏ ॥',
      pronunciation: 'ham bhūl vigāṛah dinas rāti; har lāj rakhāe ‖',
      translation:
        'I am wandering around, ruining myself day and night; O Lord, please save my honor!',
    },
    {
      id: 'B000',
      src: 'ਹਮ ਬਾਰਿਕ. ਤੂੰ ਗੁਰੁ ਪਿਤਾ ਹੈ; ਦੇ ਮਤਿ ਸਮਝਾਏ ॥',
      pronunciation: 'ham bārik. tūñ gur pitā hē; de mat samajhāe ‖',
      translation:
        'I am just a child; You, O Guru, are my father. Please give me understanding and instruction.',
    },
    {
      id: '02AY',
      src: 'ਜਨੁ ਨਾਨਕੁ ਦਾਸੁ ਹਰਿ ਕਾਂਢਿਆ; ਹਰਿ ਪੈਜ ਰਖਾਏ ॥੪॥੧੦॥੧੭॥',
      pronunciation: 'jan nānak dās har kāñḍhiā; har pēj rakhāe ‖4‖10‖17‖',
      translation:
        "Servant Nanak is known as the Lord's slave; O Lord, please preserve his honor! ||4||10||17||",
    },
    {
      id: 'NAD0',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'LHJ7',
      src: 'ਦੁਖੁ ਦਾਰੂ. ਸੁਖੁ ਰੋਗੁ ਭਇਆ; ਜਾ ਸੁਖੁ. ਤਾਮਿ ਨ ਹੋਈ ॥',
      pronunciation: 'dukh dārū. sukh rog bhaiā; jā sukhu. tām na hoī ‖',
      translation:
        'Suffering is the medicine, and pleasure the disease, because where there is pleasure, there is no desire for God.',
    },
    {
      id: 'TYSQ',
      src: 'ਤੂੰ ਕਰਤਾ ਕਰਣਾ, ਮੈ ਨਾਹੀ; ਜਾ ਹਉ ਕਰੀ. ਨ ਹੋਈ ॥੧॥',
      pronunciation: 'tūñ karatā karaṇā, mē nāhī; jā hau karī. na hoī ‖1‖',
      translation:
        'You are the Creator Lord; I can do nothing. Even if I try, nothing happens. ||1||',
    },
    {
      id: '2Z0P',
      src: 'ਬਲਿਹਾਰੀ ਕੁਦਰਤਿ ਵਸਿਆ ॥',
      pronunciation: 'balihārī kudarat wasiā ‖',
      translation:
        'I am a sacrifice to Your almighty creative power which is pervading everywhere.',
    },
    {
      id: 'QHBC',
      src: 'ਤੇਰਾ ਅੰਤੁ. ਨ ਜਾਈ ਲਖਿਆ ॥੧॥ ਰਹਾਉ ॥',
      pronunciation: 'terā añtu. na jāī lakhiā ‖1‖ rahāu ‖',
      translation: 'Your limits cannot be known. ||1||Pause||',
    },
    {
      id: '3CC1',
      src: 'ਜਾਤਿ ਮਹਿ ਜੋਤਿ. ਜੋਤਿ ਮਹਿ ਜਾਤਾ; ਅਕਲ ਕਲਾ ਭਰਪੂਰਿ ਰਹਿਆ ॥',
      pronunciation: 'jāt mah joti. jot mah jātā; akal kalā bharapūr rahiā ‖',
      translation:
        'Your Light is in Your creatures, and Your creatures are in Your Light; Your almighty power is pervading everywhere.',
    },
    {
      id: 'CABV',
      src: 'ਤੂੰ ਸਚਾ ਸਾਹਿਬੁ. ਸਿਫਤਿ ਸੁਆਲੑਿਉ; ਜਿਨਿ ਕੀਤੀ. ਸੋ ਪਾਰਿ ਪਇਆ ॥',
      pronunciation: 'tūñ sacā sāhibu. siphat suāliu; jin kītī. so pār paiā ‖',
      translation:
        'You are the True Lord and Master; Your Praise is so beautiful. One who sings it, is carried across.',
    },
    {
      id: 'K9PD',
      src: 'ਕਹੁ ਨਾਨਕ. ਕਰਤੇ ਕੀਆ ਬਾਤਾ; ਜੋ ਕਿਛੁ ਕਰਣਾ, ਸੁ ਕਰਿ ਰਹਿਆ ॥੨॥',
      pronunciation:
        'kah nānak. karate kīā bātā; jo kich karaṇā, sa kar rahiā ‖2‖',
      translation:
        'Nanak speaks the stories of the Creator Lord; whatever He is to do, He does. ||2||',
    },
    {
      id: 'LPM7',
      src: 'ਮਃ ੨ ॥',
      pronunciation: 'mẖ 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'YX0K',
      src: 'ਜੋਗ ਸਬਦੰ. ਗਿਆਨ ਸਬਦੰ; ਬੇਦ ਸਬਦੰ ਬ੍ਰਾਹਮਣਹ ॥',
      pronunciation: 'jog sabadañ. giān sabadañ; bed sabadañ brāhamaṇah ‖',
      translation:
        'The Way of Yoga is the Way of spiritual wisdom; the Vedas are the Way of the Brahmins.',
    },
    {
      id: 'AMBJ',
      src: 'ਖਤ੍ਰੀ ਸਬਦੰ; ਸੂਰ ਸਬਦੰ; ਸੂਦ੍ਰ ਸਬਦੰ ਪਰਾ ਕ੍ਰਿਤਹ ॥',
      pronunciation: 'khatrī sabadañ; sūr sabadañ; sūdr sabadañ parā kritah ‖',
      translation:
        'The Way of the Khshatriya is the Way of bravery; the Way of the Shudras is service to others.',
    },
    {
      id: '102P',
      src: 'ਸਰਬ ਸਬਦੰ. ਏਕ ਸਬਦੰ; ਜੇ ਕੋ ਜਾਣੈ ਭੇਉ ॥',
      pronunciation: 'sarab sabadañ. ek sabadañ; je ko jāṇē bheu ‖',
      translation:
        'The Way of all is the Way of the One; Nanak is a slave to one who knows this secret;',
    },
    {
      id: '6N8Y',
      src: 'ਨਾਨਕੁ ਤਾ ਕਾ ਦਾਸੁ ਹੈ; ਸੋਈ ਨਿਰੰਜਨ ਦੇਉ ॥੩॥',
      pronunciation: 'nānak tā kā dās hē; soī nirañjan deu ‖3‖',
      translation: 'He himself is the Immaculate Divine Lord. ||3||',
    },
    {
      id: '7MQX',
      src: 'ਮਃ ੨ ॥',
      pronunciation: 'mẖ 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'BPQJ',
      src: 'ਏਕ ਕ੍ਰਿਸਨੰ. ਸਰਬ ਦੇਵਾ; ਦੇਵ ਦੇਵਾ ਤ ਆਤਮਾ ॥',
      pronunciation: 'ek krisanañ. sarab devā; dev devā ta ātamā ‖',
      translation:
        'The One Lord Krishna is the Divine Lord of all; He is the Divinity of the individual soul.',
    },
    {
      id: '092B',
      src: 'ਆਤਮਾ ਬਾਸੁਦੇਵਸੵਿ; ਜੇ ਕੋ ਜਾਣੈ ਭੇਉ ॥',
      pronunciation: 'ātamā bāsudewasyi; je ko jāṇē bheu ‖',
      translation:
        'Nanak is a slave to anyone who understands this mystery of the all-pervading Lord;',
    },
    {
      id: 'ENTD',
      src: 'ਨਾਨਕੁ ਤਾ ਕਾ ਦਾਸੁ ਹੈ; ਸੋਈ ਨਿਰੰਜਨ ਦੇਉ ॥੪॥',
      pronunciation: 'nānak tā kā dās hē; soī nirañjan deu ‖4‖',
      translation: 'He himself is the Immaculate Divine Lord. ||4||',
    },
    {
      id: 'SMS7',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'UEJL',
      src: 'ਕੁੰਭੇ ਬਧਾ. ਜਲੁ ਰਹੈ; ਜਲ ਬਿਨੁ. ਕੁੰਭੁ ਨ ਹੋਇ ॥',
      pronunciation: 'kuñbhe badhā. jal rahē; jal binu. kuñbh na hoi ‖',
      translation:
        'Water remains confined within the pitcher, but without water, the pitcher could not have been formed;',
    },
    {
      id: 'AQXM',
      src: 'ਗਿਆਨ ਕਾ ਬਧਾ. ਮਨੁ ਰਹੈ; ਗੁਰ ਬਿਨੁ. ਗਿਆਨੁ ਨ ਹੋਇ ॥੫॥',
      pronunciation: 'giān kā badhā. man rahē; gur binu. giān na hoi ‖5‖',
      translation:
        'just so, the mind is restrained by spiritual wisdom, but without the Guru, there is no spiritual wisdom. ||5||',
    },
    {
      id: '8BF6',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'B47Z',
      src: 'ਪੜਿਆ ਹੋਵੈ ਗੁਨਹਗਾਰੁ; ਤਾ ਓਮੀ ਸਾਧੁ. ਨ ਮਾਰੀਐ ॥',
      pronunciation: 'paṛiā hovē gunahagāru; tā omī sādhu. na mārīē ‖',
      translation:
        'If an educated person is a sinner, then the illiterate holy man is not to be punished.',
    },
    {
      id: 'JRBV',
      src: 'ਜੇਹਾ ਘਾਲੇ ਘਾਲਣਾ; ਤੇਵੇਹੋ ਨਾਉ ਪਚਾਰੀਐ ॥',
      pronunciation: 'jehā ghāle ghālaṇā; teveho nāu pacārīē ‖',
      translation: 'As are the deeds done, so is the reputation one acquires.',
    },
    {
      id: 'ULJM',
      src: 'ਐਸੀ ਕਲਾ. ਨ ਖੇਡੀਐ; ਜਿਤੁ ਦਰਗਹ ਗਇਆ. ਹਾਰੀਐ ॥',
      pronunciation: 'ēsī kalā. na kheḍīē; jit daragah gaiā. hārīē ‖',
      translation:
        'So do not play such a game, which will bring you to ruin at the Court of the Lord.',
    },
    {
      id: 'WJSN',
      src: 'ਪੜਿਆ ਅਤੈ ਓਮੀਆ; ਵੀਚਾਰੁ ਅਗੈ ਵੀਚਾਰੀਐ ॥',
      pronunciation: 'paṛiā atē omīā; vīcār agē vīcārīē ‖',
      translation:
        'The accounts of the educated and the illiterate shall be judged in the world hereafter.',
    },
    {
      id: '6CXR',
      src: 'ਮੁਹਿ ਚਲੈ; ਸੁ ਅਗੈ ਮਾਰੀਐ ॥੧੨॥',
      pronunciation: 'muh calē; sa agē mārīē ‖12‖',
      translation:
        'One who stubbornly follows his own mind shall suffer in the world hereafter. ||12||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
