import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 21)',
    roman: 'Āsā kī vār (chakkā 21)',
  },
  paging: {
    previous: 'asa-ki-var/20',
    next: 'asa-ki-var/22',
  },
  data: [
    {
      id: '4JSV',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ॥',
      pronunciation: 'āsā mahalā 4 ‖',
      translation: 'Aasaa, Fourth Mehl:',
    },
    {
      id: 'AHP7',
      src: 'ਜਿਨੑਾ ਭੇਟਿਆ ਮੇਰਾ ਪੂਰਾ ਸਤਿਗੁਰੂ; ਤਿਨ ਹਰਿ ਨਾਮੁ ਦ੍ਰਿੜਾਵੈ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jinā bheṭiā merā pūrā satigurū; tin har nām driṛāvē. rām rāje ‖',
      translation:
        'Those who meet my Perfect True Guru - He implants within them the Name of the Lord, the Lord King.',
    },
    {
      id: 'W8BH',
      src: 'ਤਿਸ ਕੀ ਤ੍ਰਿਸਨਾ ਭੁਖ ਸਭ ਉਤਰੈ; ਜੋ ਹਰਿ ਨਾਮੁ ਧਿਆਵੈ ॥',
      pronunciation: 'tis kī trisanā bhukh sabh utarē; jo har nām dhiāvē ‖',
      translation:
        "Those who meditate on the Lord's Name have all of their desire and hunger removed.",
    },
    {
      id: 'JRDL',
      src: 'ਜੋ ਹਰਿ ਹਰਿ ਨਾਮੁ ਧਿਆਇਦੇ; ਤਿਨੑ ਜਮੁ. ਨੇੜਿ ਨ ਆਵੈ ॥',
      pronunciation: 'jo har har nām dhiāide; tin jamu. neṛ na āvē ‖',
      translation:
        'Those who meditate on the Name of the Lord, Har, Har - the Messenger of Death cannot even approach them.',
    },
    {
      id: 'B0LD',
      src: 'ਜਨ ਨਾਨਕ ਕਉ. ਹਰਿ ਕ੍ਰਿਪਾ ਕਰਿ; ਨਿਤ ਜਪੈ ਹਰਿ ਨਾਮੁ. ਹਰਿ ਨਾਮਿ ਤਰਾਵੈ ॥੧॥',
      pronunciation:
        'jan nānak kau. har kripā kari; nit japē har nāmu. har nām tarāvē ‖1‖',
      translation:
        'O Lord, shower Your Mercy upon servant Nanak, that he may ever chant the Name of the Lord; through the Name of the Lord, he is saved. ||1||',
    },
    {
      id: 'D38Z',
      src: 'ਸਲੋਕੁ ਮਹਲਾ ੨ ॥',
      pronunciation: 'salok mahalā 2 ‖',
      translation: 'Salok, Second Mehl:',
    },
    {
      id: 'AA7Q',
      src: 'ਏਹ ਕਿਨੇਹੀ ਆਸਕੀ; ਦੂਜੈ ਲਗੈ ਜਾਇ ॥',
      pronunciation: 'eh kinehī āsakī; dūjē lagē jāi ‖',
      translation: 'What sort of love is this, which clings to duality?',
    },
    {
      id: 'G7L1',
      src: 'ਨਾਨਕ. ਆਸਕੁ ਕਾਂਢੀਐ; ਸਦ ਹੀ ਰਹੈ ਸਮਾਇ ॥',
      pronunciation: 'nānak. āsak kāñḍhīē; sad hī rahē samāi ‖',
      translation:
        'O Nanak, he alone is called a lover, who remains forever immersed in absorption.',
    },
    {
      id: '83SY',
      src: 'ਚੰਗੈ ਚੰਗਾ ਕਰਿ ਮੰਨੇ; ਮੰਦੈ ਮੰਦਾ ਹੋਇ ॥',
      pronunciation: 'cañgē cañgā kar mañne; mañdē mañdā hoi ‖',
      translation:
        'But one who feels good only when good is done for him, and feels bad when things go badly',
    },
    {
      id: 'YS0B',
      src: 'ਆਸਕੁ ਏਹੁ. ਨ ਆਖੀਐ; ਜਿ ਲੇਖੈ ਵਰਤੈ ਸੋਇ ॥੧॥',
      pronunciation: 'āsak ehu. na ākhīē; ja lekhē waratē soi ‖1‖',
      translation:
        '- do not call him a lover. He trades only for his own account. ||1||',
    },
    {
      id: 'LD2B',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'LUKA',
      src: 'ਸਲਾਮੁ ਜਬਾਬੁ ਦੋਵੈ ਕਰੇ; ਮੁੰਢਹੁ ਘੁਥਾ ਜਾਇ ॥',
      pronunciation: 'salām jabāb dovē kare; muñḍhah ghuthā jāi ‖',
      translation:
        'One who offers both respectful greetings and rude refusal to his master, has gone wrong from the very beginning.',
    },
    {
      id: 'ZFEP',
      src: 'ਨਾਨਕ. ਦੋਵੈ ਕੂੜੀਆ; ਥਾਇ ਨ ਕਾਈ ਪਾਇ ॥੨॥',
      pronunciation: 'nānak. dovē kūṛīā; thāi na kāī pāi ‖2‖',
      translation:
        'O Nanak, both of his actions are false; he obtains no place in the Court of the Lord. ||2||',
    },
    {
      id: 'Y6VF',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: '2G4U',
      src: 'ਜਿਤੁ ਸੇਵਿਐ ਸੁਖੁ ਪਾਈਐ; ਸੋ ਸਾਹਿਬੁ ਸਦਾ ਸਮੑਾਲੀਐ ॥',
      pronunciation: 'jit seviē sukh pāīē; so sāhib sadā samālīē ‖',
      translation:
        'Serving Him, peace is obtained; meditate and dwell upon that Lord and Master forever.',
    },
    {
      id: 'XZD1',
      src: 'ਜਿਤੁ ਕੀਤਾ ਪਾਈਐ ਆਪਣਾ; ਸਾ ਘਾਲ ਬੁਰੀ. ਕਿਉ ਘਾਲੀਐ ॥',
      pronunciation: 'jit kītā pāīē āpaṇā; sā ghāl burī. kiu ghālīē ‖',
      translation:
        'Why do you do such evil deeds, that you shall have to suffer so?',
    },
    {
      id: 'TNUU',
      src: 'ਮੰਦਾ. ਮੂਲਿ ਨ ਕੀਚਈ; ਦੇ ਲੰਮੀ ਨਦਰਿ ਨਿਹਾਲੀਐ ॥',
      pronunciation: 'mañdā. mūl na kīcaī; de lañmī nadar nihālīē ‖',
      translation:
        'Do not do any evil at all; look ahead to the future with foresight.',
    },
    {
      id: '90MD',
      src: 'ਜਿਉ ਸਾਹਿਬ ਨਾਲਿ. ਨ ਹਾਰੀਐ; ਤੇਵੇਹਾ ਪਾਸਾ ਢਾਲੀਐ ॥',
      pronunciation: 'jiu sāhib nāli. na hārīē; tevehā pāsā ḍhālīē ‖',
      translation:
        'So throw the dice in such a way, that you shall not lose with your Lord and Master.',
    },
    {
      id: 'AQAK',
      src: 'ਕਿਛੁ ਲਾਹੇ ਉਪਰਿ; ਘਾਲੀਐ ॥੨੧॥',
      pronunciation: 'kich lāhe upari; ghālīē ‖21‖',
      translation: 'Do those deeds which shall bring you profit. ||21||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
