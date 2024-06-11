import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 20)',
    roman: 'Āsā kī vār (chakkā 20)',
  },
  paging: {
    previous: 'asa-ki-var/19',
    next: 'asa-ki-var/21',
  },
  data: [
    {
      id: 'CQKF',
      src: 'ਗੁਰਸਿਖਾ ਮਨਿ ਵਾਧਾਈਆ; ਜਿਨ ਮੇਰਾ ਸਤਿਗੁਰੂ ਡਿਠਾ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'gurasikhā man vādhāīā; jin merā satigurū ḍiṭhā, rām rāje ‖',
      translation:
        'The minds of the Gursikhs rejoice, because they have seen my True Guru, O Lord King.',
    },
    {
      id: '8TZC',
      src: 'ਕੋਈ ਕਰਿ ਗਲ ਸੁਣਾਵੈ. ਹਰਿ ਨਾਮ ਕੀ; ਸੋ ਲਗੈ ਗੁਰਸਿਖਾ ਮਨਿ ਮਿਠਾ ॥',
      pronunciation:
        'koī kar gal suṇāvē. har nām kī; so lagē gurasikhā man miṭhā ‖',
      translation:
        "If someone recites to them the story of the Lord's Name, it seems so sweet to the mind of those Gursikhs.",
    },
    {
      id: 'W3S3',
      src: 'ਹਰਿ ਦਰਗਹ ਗੁਰਸਿਖ ਪੈਨਾਈਅਹਿ ਜਿਨੑਾ; ਮੇਰਾ ਸਤਿਗੁਰੁ ਤੁਠਾ ॥',
      pronunciation: 'har daragah gurasikh pēnāīah jinā; merā satigur tuṭhā ‖',
      translation:
        'The Gursikhs are robed in honor in the Court of the Lord; my True Guru is very pleased with them.',
    },
    {
      id: '3G4A',
      src: 'ਜਨ ਨਾਨਕੁ. ਹਰਿ ਹਰਿ ਹੋਇਆ; ਹਰਿ ਹਰਿ ਮਨਿ ਵੁਠਾ ॥੪॥੧੨॥੧੯॥',
      pronunciation: 'jan nānaku. har har hoiā; har har man wuṭhā ‖4‖12‖19‖',
      translation:
        'Servant Nanak has become the Lord, Har, Har; the Lord, Har, Har, abides within his mind. ||4||12||19||',
    },
    {
      id: '0G6S',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: '04GR',
      src: 'ਨਾਨਕ. ਫਿਕੈ ਬੋਲਿਐ; ਤਨੁ ਮਨੁ ਫਿਕਾ ਹੋਇ ॥',
      pronunciation: 'nānak. phikē boliē; tan man phikā hoi ‖',
      translation:
        'O Nanak, speaking insipid words, the body and mind become insipid.',
    },
    {
      id: 'JX28',
      src: 'ਫਿਕੋ ਫਿਕਾ ਸਦੀਐ; ਫਿਕੇ ਫਿਕੀ ਸੋਇ ॥',
      pronunciation: 'phiko phikā sadīē; phike phikī soi ‖',
      translation:
        'He is called the most insipid of the insipid; the most insipid of the insipid is his reputation.',
    },
    {
      id: 'E78Z',
      src: 'ਫਿਕਾ ਦਰਗਹ ਸਟੀਐ; ਮੁਹਿ ਥੁਕਾ ਫਿਕੇ ਪਾਇ ॥',
      pronunciation: 'phikā daragah saṭīē; muh thukā phike pāi ‖',
      translation:
        "The insipid person is discarded in the Court of the Lord, and the insipid one's face is spat upon.",
    },
    {
      id: '175D',
      src: 'ਫਿਕਾ ਮੂਰਖੁ ਆਖੀਐ; ਪਾਣਾ ਲਹੈ ਸਜਾਇ ॥੧॥',
      pronunciation: 'phikā mūrakh ākhīē; pāṇā lahē sajāi ‖1‖',
      translation:
        'The insipid one is called a fool; he is beaten with shoes in punishment. ||1||',
    },
    {
      id: 'U3GE',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'GUZL',
      src: 'ਅੰਦਰਹੁ ਝੂਠੇ ਪੈਜ ਬਾਹਰਿ; ਦੁਨੀਆ ਅੰਦਰਿ ਫੈਲੁ ॥',
      pronunciation: 'añdarah jhūṭhe pēj bāhari; dunīā añdar phēl ‖',
      translation:
        'Those who are false within, and honorable on the outside, are very common in this world.',
    },
    {
      id: '80NU',
      src: 'ਅਠਸਠਿ ਤੀਰਥ ਜੇ ਨਾਵਹਿ; ਉਤਰੈ ਨਾਹੀ. ਮੈਲੁ ॥',
      pronunciation: 'aṭhasaṭh tīrath je nāwahi; utarē nāhī. mēl ‖',
      translation:
        'Even though they may bathe at the sixty-eight sacred shrines of pilgrimage, still, their filth does not depart.',
    },
    {
      id: 'GU0V',
      src: 'ਜਿਨੑ ਪਟੁ ਅੰਦਰਿ, ਬਾਹਰਿ ਗੁਦੜੁ; ਤੇ ਭਲੇ ਸੰਸਾਰਿ ॥',
      pronunciation: 'jin paṭ añdari, bāhar gudaṛu; te bhale sañsār ‖',
      translation:
        'Those who have silk on the inside and rags on the outside, are the good ones in this world.',
    },
    {
      id: 'UM3C',
      src: 'ਤਿਨੑ ਨੇਹੁ ਲਗਾ ਰਬ ਸੇਤੀ; ਦੇਖਨੑੇ ਵੀਚਾਰਿ ॥',
      pronunciation: 'tin neh lagā rab setī; dekhane vīcār ‖',
      translation:
        'They embrace love for the Lord, and contemplate beholding Him.',
    },
    {
      id: '47RP',
      src: 'ਰੰਗਿ ਹਸਹਿ, ਰੰਗਿ ਰੋਵਹਿ; ਚੁਪ ਭੀ ਕਰਿ ਜਾਹਿ ॥',
      pronunciation: 'rañg hasahi, rañg rowahi; cup bhī kar jāh ‖',
      translation:
        "In the Lord's Love, they laugh, and in the Lord's Love, they weep, and also keep silent.",
    },
    {
      id: '48G7',
      src: 'ਪਰਵਾਹ ਨਾਹੀ. ਕਿਸੈ ਕੇਰੀ; ਬਾਝੁ ਸਚੇ ਨਾਹ ॥',
      pronunciation: 'paravāh nāhī. kisē kerī; bājh sace nāh ‖',
      translation:
        'They do not care for anything else, except their True Husband Lord.',
    },
    {
      id: 'YQJA',
      src: 'ਦਰਿ ਵਾਟ ਉਪਰਿ ਖਰਚੁ ਮੰਗਾ; ਜਬੈ ਦੇਇ. ਤ ਖਾਹਿ ॥',
      pronunciation: 'dar vāṭ upar kharac mañgā; jabē dei. ta khāh ‖',
      translation:
        "Sitting, waiting at the Lord's Door, they beg for food, and when He gives to them, they eat.",
    },
    {
      id: '2JFF',
      src: 'ਦੀਬਾਨੁ ਏਕੋ. ਕਲਮ ਏਕਾ; ਹਮਾ ਤੁਮੑਾ ਮੇਲੁ ॥',
      pronunciation: 'dībān eko. kalam ekā; hamā tumā mel ‖',
      translation:
        'There is only One Court of the Lord, and He has only one pen; there, you and I shall meet.',
    },
    {
      id: 'GM2C',
      src: 'ਦਰਿ ਲਏ ਲੇਖਾ. ਪੀੜਿ ਛੁਟੈ; ਨਾਨਕਾ. ਜਿਉ ਤੇਲੁ ॥੨॥',
      pronunciation: 'dar lae lekhā. pīṛ chuṭē; nānakā. jiu tel ‖2‖',
      translation:
        'In the Court of the Lord, the accounts are examined; O Nanak, the sinners are crushed, like oil seeds in the press. ||2||',
    },
    {
      id: 'Z5NY',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: '5AG5',
      src: 'ਆਪੇ ਹੀ ਕਰਣਾ ਕੀਓ; ਕਲ ਆਪੇ ਹੀ ਤੈ ਧਾਰੀਐ ॥',
      pronunciation: 'āpe hī karaṇā kīo; kal āpe hī tē dhārīē ‖',
      translation:
        'You Yourself created the creation; You Yourself infused Your power into it.',
    },
    {
      id: '5GW5',
      src: 'ਦੇਖਹਿ ਕੀਤਾ ਆਪਣਾ; ਧਰਿ ਕਚੀ ਪਕੀ ਸਾਰੀਐ ॥',
      pronunciation: 'dekhah kītā āpaṇā; dhar kacī pakī sārīē ‖',
      translation:
        'You behold Your creation, like the losing and winning dice of the earth.',
    },
    {
      id: '4VJ3',
      src: 'ਜੋ ਆਇਆ ਸੋ ਚਲਸੀ; ਸਭੁ ਕੋਈ ਆਈ ਵਾਰੀਐ ॥',
      pronunciation: 'jo āiā so calasī; sabh koī āī vārīē ‖',
      translation: 'Whoever has come, shall depart; all shall have their turn.',
    },
    {
      id: 'Q1GP',
      src: 'ਜਿਸ ਕੇ ਜੀਅ ਪਰਾਣ ਹਹਿ; ਕਿਉ ਸਾਹਿਬੁ ਮਨਹੁ ਵਿਸਾਰੀਐ ॥',
      pronunciation: 'jis ke jīa parāṇ hahi; kiu sāhib manah visārīē ‖',
      translation:
        'He who owns our soul, and our very breath of life - why should we forget that Lord and Master from our minds?',
    },
    {
      id: 'V5J1',
      src: 'ਆਪਣ ਹਥੀ ਆਪਣਾ; ਆਪੇ ਹੀ ਕਾਜੁ ਸਵਾਰੀਐ ॥੨੦॥',
      pronunciation: 'āpaṇ hathī āpaṇā; āpe hī kāj savārīē ‖20‖',
      translation: 'With our own hands, let us resolve our own affairs. ||20||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
