import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 23)',
    roman: 'Āsā kī vār (chakkā 23)',
  },
  paging: {
    previous: 'asa-ki-var/22',
    next: 'asa-ki-var/24',
  },
  data: [
    {
      id: '8QNY',
      src: 'ਜਿਨੑਾ ਅੰਤਰਿ. ਗੁਰਮੁਖਿ ਪ੍ਰੀਤਿ ਹੈ; ਤਿਨੑ ਹਰਿ ਰਖਣਹਾਰਾ. ਰਾਮ ਰਾਜੇ ॥',
      pronunciation:
        'jinā añtari. guramukh prīt hē; tin har rakhaṇahārā. rām rāje ‖',
      translation:
        'Those Gurmukhs, who are filled with His Love, have the Lord as their Saving Grace, O Lord King.',
    },
    {
      id: 'BY0B',
      src: 'ਤਿਨੑ ਕੀ ਨਿੰਦਾ. ਕੋਈ ਕਿਆ ਕਰੇ; ਜਿਨੑ ਹਰਿ ਨਾਮੁ ਪਿਆਰਾ ॥',
      pronunciation: 'tin kī niñdā. koī kiā kare; jin har nām piārā ‖',
      translation:
        "How can anyone slander them? The Lord's Name is dear to them.",
    },
    {
      id: 'JRFY',
      src: 'ਜਿਨ ਹਰਿ ਸੇਤੀ. ਮਨੁ ਮਾਨਿਆ; ਸਭ ਦੁਸਟ ਝਖ ਮਾਰਾ ॥',
      pronunciation: 'jin har setī. man māniā; sabh dusaṭ jhakh mārā ‖',
      translation:
        'Those whose minds are in harmony with the Lord - all their enemies attack them in vain.',
    },
    {
      id: '9GDB',
      src: 'ਜਨ ਨਾਨਕ. ਨਾਮੁ ਧਿਆਇਆ; ਹਰਿ ਰਖਣਹਾਰਾ ॥੩॥',
      pronunciation: 'jan nānak. nām dhiāiā; har rakhaṇahārā ‖3‖',
      translation:
        'Servant Nanak meditates on the Naam, the Name of the Lord, the Lord Protector. ||3||',
    },
    {
      id: 'DKP7',
      src: 'ਸਲੋਕੁ ਮਹਲਾ ੨ ॥',
      pronunciation: 'salok mahalā 2 ‖',
      translation: 'Salok, Second Mehl:',
    },
    {
      id: '8B1V',
      src: 'ਏਹ ਕਿਨੇਹੀ ਦਾਤਿ; ਆਪਸ ਤੇ ਜੋ ਪਾਈਐ ॥',
      pronunciation: 'eh kinehī dāti; āpas te jo pāīē ‖',
      translation:
        'What sort of gift is this, which we receive only by our own asking?',
    },
    {
      id: '1TGB',
      src: 'ਨਾਨਕ. ਸਾ ਕਰਮਾਤਿ; ਸਾਹਿਬ ਤੁਠੈ ਜੋ ਮਿਲੈ ॥੧॥',
      pronunciation: 'nānak. sā karamāti; sāhib tuṭhē jo milē ‖1‖',
      translation:
        'O Nanak, that is the most wonderful gift, which is received from the Lord, when He is totally pleased. ||1||',
    },
    {
      id: '1M3N',
      src: 'ਮਹਲਾ ੨ ॥',
      pronunciation: 'mahalā 2 ‖',
      translation: 'Second Mehl:',
    },
    {
      id: 'TDSS',
      src: 'ਏਹ ਕਿਨੇਹੀ ਚਾਕਰੀ; ਜਿਤੁ ਭਉ ਖਸਮ ਨ ਜਾਇ ॥',
      pronunciation: 'eh kinehī cākarī; jit bhau khasam na jāi ‖',
      translation:
        'What sort of service is this, by which the fear of the Lord Master does not depart?',
    },
    {
      id: 'YV54',
      src: 'ਨਾਨਕ. ਸੇਵਕੁ ਕਾਢੀਐ; ਜਿ ਸੇਤੀ ਖਸਮ ਸਮਾਇ ॥੨॥',
      pronunciation: 'nānak. sewak kāḍhīē; ja setī khasam samāi ‖2‖',
      translation:
        'O Nanak, he alone is called a servant, who merges with the Lord Master. ||2||',
    },
    {
      id: 'ETC9',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'FBVD',
      src: 'ਨਾਨਕ. ਅੰਤ ਨ ਜਾਪਨੑੀ; ਹਰਿ ਤਾ ਕੇ ਪਾਰਾਵਾਰ ॥',
      pronunciation: 'nānak. añt na jāpanī; har tā ke pārāvār ‖',
      translation:
        "O Nanak, the Lord's limits cannot be known; He has no end or limitation.",
    },
    {
      id: 'Y219',
      src: 'ਆਪਿ ਕਰਾਏ ਸਾਖਤੀ; ਫਿਰਿ ਆਪਿ ਕਰਾਏ ਮਾਰ ॥',
      pronunciation: 'āp karāe sākhatī; phir āp karāe mār ‖',
      translation: 'He Himself creates, and then He Himself destroys.',
    },
    {
      id: 'TZKR',
      src: 'ਇਕਨੑਾ ਗਲੀ ਜੰਜੀਰੀਆ; ਇਕਿ ਤੁਰੀ ਚੜਹਿ ਬਿਸੀਆਰ ॥',
      pronunciation: 'ikanā galī jañjīrīā; ik turī caṛah bisīār ‖',
      translation:
        'Some have chains around their necks, while some ride on many horses.',
    },
    {
      id: '1CDA',
      src: 'ਆਪਿ ਕਰਾਏ. ਕਰੇ ਆਪਿ; ਹਉ. ਕੈ ਸਿਉ ਕਰੀ ਪੁਕਾਰ ॥',
      pronunciation: 'āp karāe. kare āpi; hau. kē siu karī pukār ‖',
      translation:
        'He Himself acts, and He Himself causes us to act. Unto whom should I complain?',
    },
    {
      id: 'H8KA',
      src: 'ਨਾਨਕ. ਕਰਣਾ ਜਿਨਿ ਕੀਆ; ਫਿਰਿ ਤਿਸ ਹੀ ਕਰਣੀ ਸਾਰ ॥੨੩॥',
      pronunciation: 'nānak. karaṇā jin kīā; phir tis hī karaṇī sār ‖23‖',
      translation:
        'O Nanak, the One who created the creation - He Himself takes care of it. ||23||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
