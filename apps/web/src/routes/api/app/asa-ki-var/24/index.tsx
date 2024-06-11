import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 24)',
    roman: 'Āsā kī vār (chakkā 24)',
  },
  paging: {
    previous: 'asa-ki-var/23',
  },
  data: [
    {
      id: 'W8FD',
      src: 'ਹਰਿ ਜੁਗੁ ਜੁਗੁ. ਭਗਤ ਉਪਾਇਆ; ਪੈਜ ਰਖਦਾ ਆਇਆ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'har jug jugu. bhagat upāiā; pēj rakhadā āiā. rām rāje ‖',
      translation:
        'In each and every age, He creates His devotees and preserves their honor, O Lord King.',
    },
    {
      id: '90T1',
      src: 'ਹਰਣਾਖਸੁ ਦੁਸਟੁ ਹਰਿ ਮਾਰਿਆ; ਪ੍ਰਹਲਾਦੁ ਤਰਾਇਆ ॥',
      pronunciation: 'haraṇākhas dusaṭ har māriā; prahalād tarāiā ‖',
      translation:
        'The Lord killed the wicked Harnaakhash, and saved Prahlaad.',
    },
    {
      id: 'DKY1',
      src: 'ਅਹੰਕਾਰੀਆ ਨਿੰਦਕਾ. ਪਿਠਿ ਦੇਇ; ਨਾਮਦੇਉ. ਮੁਖਿ ਲਾਇਆ ॥',
      pronunciation: 'ahañkārīā niñdakā. piṭh dei; nāmadeu. mukh lāiā ‖',
      translation:
        'He turned his back on the egotists and slanderers, and showed His Face to Naam Dayv.',
    },
    {
      id: 'UXJK',
      src: 'ਜਨ ਨਾਨਕ. ਐਸਾ ਹਰਿ ਸੇਵਿਆ; ਅੰਤਿ ਲਏ ਛਡਾਇਆ ॥੪॥੧੩॥੨੦॥',
      pronunciation: 'jan nānak. ēsā har seviā; añt lae chaḍāiā ‖4‖13‖20‖',
      translation:
        'Servant Nanak has so served the Lord, that He will deliver him in the end. ||4||13||20||',
    },
    {
      id: 'GL03',
      src: 'ਸਲੋਕੁ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'KZ71',
      src: 'ਆਪੇ ਭਾਂਡੇ ਸਾਜਿਅਨੁ; ਆਪੇ ਪੂਰਣੁ ਦੇਇ ॥',
      pronunciation: 'āpe bhāñḍe sājianu; āpe pūraṇ dei ‖',
      translation:
        'He Himself fashioned the vessel of the body, and He Himself fills it.',
    },
    {
      id: 'P1HB',
      src: 'ਇਕਨੑੀ ਦੁਧੁ ਸਮਾਈਐ; ਇਕਿ ਚੁਲੑੈ ਰਹਨੑਿ ਚੜੇ ॥',
      pronunciation: 'ikanī dudh samāīē; ik culē rahan caṛe ‖',
      translation:
        'Into some, milk is poured, while others remain on the fire.',
    },
    {
      id: 'QX11',
      src: 'ਇਕਿ ਨਿਹਾਲੀ ਪੈ ਸਵਨੑਿ; ਇਕਿ. ਉਪਰਿ ਰਹਨਿ ਖੜੇ ॥',
      pronunciation: 'ik nihālī pē sawani; iki. upar rahan khaṛe ‖',
      translation:
        'Some lie down and sleep on soft beds, while others remain watchful.',
    },
    {
      id: 'MRZU',
      src: 'ਤਿਨੑਾ ਸਵਾਰੇ ਨਾਨਕਾ; ਜਿਨੑ ਕਉ ਨਦਰਿ ਕਰੇ ॥੧॥',
      pronunciation: 'tinā savāre nānakā; jin kau nadar kare ‖1‖',
      translation:
        'He adorns those, O Nanak, upon whom He casts His Glance of Grace. ||1||',
    },
    {
      id: 'BS7G',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'XX2Z',
      src: 'ਆਪੇ ਸਾਜੇ. ਕਰੇ ਆਪਿ; ਜਾਈ ਭਿ ਰਖੈ ਆਪਿ ॥',
      pronunciation: 'āpe sāje. kare āpi; jāī bha rakhē āp ‖',
      translation:
        'He Himself creates and fashions the world, and He Himself keeps it in order.',
    },
    {
      id: 'SEXU',
      src: 'ਤਿਸੁ ਵਿਚਿ ਜੰਤ ਉਪਾਇ ਕੈ; ਦੇਖੈ ਥਾਪਿ ਉਥਾਪਿ ॥',
      pronunciation: 'tis vic jañt upāi kē; dekhē thāp uthāp ‖',
      translation:
        'Having created the beings within it, He oversees their birth and death.',
    },
    {
      id: 'SS3G',
      src: 'ਕਿਸ ਨੋ ਕਹੀਐ ਨਾਨਕਾ; ਸਭੁ ਕਿਛੁ ਆਪੇ ਆਪਿ ॥੨॥',
      pronunciation: 'kis no kahīē nānakā; sabh kich āpe āp ‖2‖',
      translation:
        'Unto whom should we speak, O Nanak, when He Himself is all-in-all? ||2||',
    },
    {
      id: 'UJDP',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'EFZD',
      src: 'ਵਡੇ ਕੀਆ ਵਡਿਆਈਆ; ਕਿਛੁ ਕਹਣਾ ਕਹਣੁ ਨ ਜਾਇ ॥',
      pronunciation: 'waḍe kīā waḍiāīā; kich kahaṇā kahaṇ na jāi ‖',
      translation:
        'The description of the greatness of the Great Lord cannot be described.',
    },
    {
      id: '8L9N',
      src: 'ਸੋ ਕਰਤਾ ਕਾਦਰ ਕਰੀਮੁ; ਦੇ ਜੀਆ ਰਿਜਕੁ ਸੰਬਾਹਿ ॥',
      pronunciation: 'so karatā kādar karīmu; de jīā rijak sañbāh ‖',
      translation:
        'He is the Creator, all-powerful and benevolent; He gives sustenance to all beings.',
    },
    {
      id: '65UC',
      src: 'ਸਾਈ ਕਾਰ ਕਮਾਵਣੀ; ਧੁਰਿ ਛੋਡੀ ਤਿੰਨੈ ਪਾਇ ॥',
      pronunciation: 'sāī kār kamāwaṇī; dhur choḍī tiñnē pāi ‖',
      translation:
        'The mortal does that work, which has been pre-destined from the very beginning.',
    },
    {
      id: 'B7M8',
      src: 'ਨਾਨਕ. ਏਕੀ ਬਾਹਰੀ; ਹੋਰ ਦੂਜੀ ਨਾਹੀ ਜਾਇ ॥',
      pronunciation: 'nānak. ekī bāharī; hor dūjī nāhī jāi ‖',
      translation:
        'O Nanak, except for the One Lord, there is no other place at all.',
    },
    {
      id: '714G',
      src: 'ਸੋ ਕਰੇ; ਜਿ ਤਿਸੈ ਰਜਾਇ ॥੨੪॥੧॥ ਸੁਧੁ',
      pronunciation: 'so kare; ja tisē rajāi ‖24‖1‖ sudh',
      translation: 'He does whatever He wills. ||24||1|| Sudh||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
