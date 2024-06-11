import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 13)',
    roman: 'Āsā kī vār (chakkā 13)',
  },
  paging: {
    previous: 'asa-ki-var/12',
    next: 'asa-ki-var/14',
  },
  data: [
    {
      id: 'Z27P',
      src: 'ਆਸਾ ਮਹਲਾ ੪ ॥',
      pronunciation: 'āsā mahalā 4 ‖',
      translation: 'Aasaa, Fourth Mehl:',
    },
    {
      id: 'DWSJ',
      src: 'ਜਿਨ ਮਸਤਕਿ ਧੁਰਿ ਹਰਿ ਲਿਖਿਆ; ਤਿਨਾ ਸਤਿਗੁਰੁ ਮਿਲਿਆ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jin masatak dhur har likhiā; tinā satigur miliā, rām rāje ‖',
      translation:
        'Those who have the blessed pre-ordained destiny of the Lord written on their foreheads, meet the True Guru, the Lord King.',
    },
    {
      id: 'ZWLK',
      src: 'ਅਗਿਆਨੁ ਅੰਧੇਰਾ ਕਟਿਆ; ਗੁਰ ਗਿਆਨੁ ਘਟਿ ਬਲਿਆ ॥',
      pronunciation: 'agiān añdherā kaṭiā; gur giān ghaṭ baliā ‖',
      translation:
        'The Guru removes the darkness of ignorance, and spiritual wisdom illuminates their hearts.',
    },
    {
      id: 'AAYJ',
      src: 'ਹਰਿ ਲਧਾ ਰਤਨੁ ਪਦਾਰਥੋ; ਫਿਰਿ. ਬਹੁੜਿ ਨ ਚਲਿਆ ॥',
      pronunciation: 'har ladhā ratan padāratho; phiri. bahuṛ na caliā ‖',
      translation:
        'They find the wealth of the jewel of the Lord, and then, they do not wander any longer.',
    },
    {
      id: 'HKK1',
      src: 'ਜਨ ਨਾਨਕ. ਨਾਮੁ ਆਰਾਧਿਆ; ਆਰਾਧਿ ਹਰਿ ਮਿਲਿਆ ॥੧॥',
      pronunciation: 'jan nānak. nām ārādhiā; ārādh har miliā ‖1‖',
      translation:
        'Servant Nanak meditates on the Naam, the Name of the Lord, and in meditation, he meets the Lord. ||1||',
    },
    {
      id: 'CRZ2',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'WVMZ',
      src: 'ਨਾਨਕ. ਮੇਰੁ ਸਰੀਰ ਕਾ; ਇਕੁ ਰਥੁ ਇਕੁ ਰਥਵਾਹੁ ॥',
      pronunciation: 'nānak. mer sarīr kā; ik rath ik rathavāh ‖',
      translation:
        'O Nanak, the soul of the body has one chariot and one charioteer.',
    },
    {
      id: 'ZELJ',
      src: 'ਜੁਗੁ ਜੁਗੁ ਫੇਰਿ ਵਟਾਈਅਹਿ; ਗਿਆਨੀ ਬੁਝਹਿ ਤਾਹਿ ॥',
      pronunciation: 'jug jug pher waṭāīahi; giānī bujhah tāh ‖',
      translation:
        'In age after age they change; the spiritually wise understand this.',
    },
    {
      id: 'N1D0',
      src: 'ਸਤਜੁਗਿ. ਰਥੁ ਸੰਤੋਖ ਕਾ; ਧਰਮੁ ਅਗੈ ਰਥਵਾਹੁ ॥',
      pronunciation: 'satajugi. rath sañtokh kā; dharam agē rathavāh ‖',
      translation:
        'In the Golden Age of Sat Yuga, contentment was the chariot and righteousness the charioteer.',
    },
    {
      id: 'X3Y5',
      src: 'ਤ੍ਰੇਤੈ ਰਥੁ ਜਤੈ ਕਾ; ਜੋਰੁ ਅਗੈ ਰਥਵਾਹੁ ॥',
      pronunciation: 'tretē rath jatē kā; jor agē rathavāh ‖',
      translation:
        'In the Silver Age of Traytaa Yuga, celibacy was the chariot and power the charioteer.',
    },
    {
      id: '79KY',
      src: 'ਦੁਆਪੁਰਿ ਰਥੁ ਤਪੈ ਕਾ; ਸਤੁ ਅਗੈ ਰਥਵਾਹੁ ॥',
      pronunciation: 'duāpur rath tapē kā; sat agē rathavāh ‖',
      translation:
        'In the Brass Age of Dwaapar Yuga, penance was the chariot and truth the charioteer.',
    },
    {
      id: 'NALP',
      src: 'ਕਲਜੁਗਿ ਰਥੁ ਅਗਨਿ ਕਾ; ਕੂੜੁ ਅਗੈ ਰਥਵਾਹੁ ॥੧॥',
      pronunciation: 'kalajug rath agan kā; kūṛ agē rathavāh ‖1‖',
      translation:
        'In the Iron Age of Kali Yuga, fire is the chariot and falsehood the charioteer. ||1||',
    },
    {
      id: 'PYH7',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'JC8S',
      src: 'ਸਾਮ ਕਹੈ ਸੇਤੰਬਰੁ ਸੁਆਮੀ; ਸਚ ਮਹਿ ਆਛੈ. ਸਾਚਿ ਰਹੇ ॥',
      pronunciation: 'sām kahē setañbar suāmī; sac mah āchē. sāc rahe ‖',
      translation:
        'The Sama Veda says that the Lord Master is robed in white; in the Age of Truth,',
    },
    {
      id: 'ETZL',
      src: 'ਸਭੁ ਕੋ; ਸਚਿ ਸਮਾਵੈ ॥',
      pronunciation: 'sabh ko; sac samāvē ‖',
      translation:
        'Everyone desired Truth, abided in Truth, and was merged in the Truth.',
    },
    {
      id: 'UYQ1',
      src: 'ਰਿਗੁ ਕਹੈ; ਰਹਿਆ ਭਰਪੂਰਿ ॥',
      pronunciation: 'rig kahē; rahiā bharapūr ‖',
      translation:
        'The Rig Veda says that God is permeating and pervading everywhere;',
    },
    {
      id: '0PVB',
      src: 'ਰਾਮ ਨਾਮੁ; ਦੇਵਾ ਮਹਿ ਸੂਰੁ ॥',
      pronunciation: 'rām nāmu; devā mah sūr ‖',
      translation: "among the deities, the Lord's Name is the most exalted.",
    },
    {
      id: 'QT4E',
      src: 'ਨਾਇ ਲਇਐ; ਪਰਾਛਤ ਜਾਹਿ ॥',
      pronunciation: 'nāi laiē; parāchat jāh ‖',
      translation: 'Chanting the Name, sins depart;',
    },
    {
      id: 'KLLS',
      src: 'ਨਾਨਕ; ਤਉ ਮੋਖੰਤਰੁ ਪਾਹਿ ॥',
      pronunciation: 'nānak; tau mokhañtar pāh ‖',
      translation: 'O Nanak, then, one obtains salvation.',
    },
    {
      id: 'BURJ',
      src: 'ਜੁਜ ਮਹਿ ਜੋਰਿ ਛਲੀ ਚੰਦ੍ਰਾਵਲਿ; ਕਾਨੑ ਕ੍ਰਿਸਨੁ ਜਾਦਮੁ ਭਇਆ ॥',
      pronunciation: 'juj mah jor chalī cañdrāwali; kān krisan jādam bhaiā ‖',
      translation:
        'In the Jujar Veda, Kaan Krishna of the Yaadva tribe seduced Chandraavali by force.',
    },
    {
      id: 'YKNE',
      src: 'ਪਾਰਜਾਤੁ. ਗੋਪੀ ਲੈ ਆਇਆ; ਬਿੰਦ੍ਰਾਬਨ ਮਹਿ ਰੰਗੁ ਕੀਆ ॥',
      pronunciation: 'pārajātu. gopī lē āiā; biñdrāban mah rañg kīā ‖',
      translation:
        'He brought the Elysian Tree for his milk-maid, and revelled in Brindaaban.',
    },
    {
      id: 'SD6Y',
      src: 'ਕਲਿ ਮਹਿ. ਬੇਦੁ ਅਥਰਬਣੁ ਹੂਆ; ਨਾਉ ਖੁਦਾਈ ਅਲਹੁ ਭਇਆ ॥',
      pronunciation: 'kal mahi. bed atharabaṇ hūā; nāu khudāī alah bhaiā ‖',
      translation:
        'In the Dark Age of Kali Yuga, the Atharva Veda became prominent; Allah became the Name of God.',
    },
    {
      id: 'R619',
      src: 'ਨੀਲ ਬਸਤ੍ਰ ਲੇ ਕਪੜੇ ਪਹਿਰੇ; ਤੁਰਕ ਪਠਾਣੀ ਅਮਲੁ ਕੀਆ ॥',
      pronunciation: 'nīl basatr le kapaṛe pahire; turak paṭhāṇī amal kīā ‖',
      translation:
        "Men began to wear blue robes and garments; Turks and Pat'haans assumed power.",
    },
    {
      id: '4TUF',
      src: 'ਚਾਰੇ ਵੇਦ ਹੋਏ ਸਚਿਆਰ ॥',
      pronunciation: 'cāre ved hoe saciār ‖',
      translation: 'The four Vedas each claim to be true.',
    },
    {
      id: 'JFM7',
      src: 'ਪੜਹਿ ਗੁਣਹਿ ਤਿਨੑ ਚਾਰ ਵੀਚਾਰ ॥',
      pronunciation: 'paṛah guṇah tin cār vīcār ‖',
      translation: 'Reading and studying them, four doctrines are found.',
    },
    {
      id: 'GZ5U',
      src: 'ਭਾਉ ਭਗਤਿ ਕਰਿ; ਨੀਚੁ ਸਦਾਏ ॥',
      pronunciation: 'bhāu bhagat kari; nīc sadāe ‖',
      translation: 'With loving devotional worship, abiding in humility,',
    },
    {
      id: 'E2XY',
      src: 'ਤਉ ਨਾਨਕ; ਮੋਖੰਤਰੁ ਪਾਏ ॥੨॥',
      pronunciation: 'tau nānak; mokhañtar pāe ‖2‖',
      translation: 'O Nanak, salvation is attained. ||2||',
    },
    {
      id: 'C8U1',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'BB7H',
      src: 'ਸਤਿਗੁਰ ਵਿਟਹੁ ਵਾਰਿਆ; ਜਿਤੁ ਮਿਲਿਐ ਖਸਮੁ ਸਮਾਲਿਆ ॥',
      pronunciation: 'satigur viṭah vāriā; jit miliē khasam samāliā ‖',
      translation:
        'I am a sacrifice to the True Guru; meeting Him, I have come to cherish the Lord Master.',
    },
    {
      id: '9H3B',
      src: 'ਜਿਨਿ ਕਰਿ ਉਪਦੇਸੁ. ਗਿਆਨ ਅੰਜਨੁ ਦੀਆ; ਇਨੑੀ ਨੇਤ੍ਰੀ ਜਗਤੁ ਨਿਹਾਲਿਆ ॥',
      pronunciation:
        'jin kar upadesu. giān añjan dīā; inī netrī jagat nihāliā ‖',
      translation:
        'He has taught me and given me the healing ointment of spiritual wisdom, and with these eyes, I behold the world.',
    },
    {
      id: 'P8XD',
      src: 'ਖਸਮੁ ਛੋਡਿ ਦੂਜੈ ਲਗੇ; ਡੁਬੇ ਸੇ ਵਣਜਾਰਿਆ ॥',
      pronunciation: 'khasam choḍ dūjē lage; ḍube se waṇajāriā ‖',
      translation:
        'Those dealers who abandon their Lord and Master and attach themselves to another, are drowned.',
    },
    {
      id: 'HPE6',
      src: 'ਸਤਿਗੁਰੂ ਹੈ ਬੋਹਿਥਾ; ਵਿਰਲੈ ਕਿਨੈ ਵੀਚਾਰਿਆ ॥',
      pronunciation: 'satigurū hē bohithā; viralē kinē vīcāriā ‖',
      translation:
        'The True Guru is the boat, but few are those who realize this.',
    },
    {
      id: 'YQYL',
      src: 'ਕਰਿ ਕਿਰਪਾ ਪਾਰਿ ਉਤਾਰਿਆ ॥੧੩॥',
      pronunciation: 'kar kirapā pār utāriā ‖13‖',
      translation: 'Granting His Grace, He carries them across. ||13||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
