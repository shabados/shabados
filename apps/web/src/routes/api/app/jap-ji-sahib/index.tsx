import type { RequestHandler } from '@builder.io/qwik-city'

const data = [
  {
    id: '0NVY',
    src: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ; ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
    pronunciation:
      'ik oañkār sat nām karatā purakh nirabhau niravēru; akāl mūrat ajūnī sēbhañ gur prasād ‖',
    translation:
      "One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. Image Of The Undying, Beyond Birth, Self-Existent. By Guru's Grace ~",
  },
  {
    id: 'RBP6',
    src: '॥ ਜਪੁ ॥',
    pronunciation: '‖ jap ‖',
    translation: 'Chant And Meditate:',
  },
  {
    id: 'J92N',
    src: 'ਆਦਿ ਸਚੁ; ਜੁਗਾਦਿ ਸਚੁ ॥',
    pronunciation: 'ād sacu; jugād sac ‖',
    translation: 'True In The Primal Beginning. True Throughout The Ages.',
  },
  {
    id: 'K0U6',
    src: 'ਹੈ ਭੀ ਸਚੁ; ਨਾਨਕ. ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥',
    pronunciation: 'hē bhī sacu; nānak. hosī bhī sac ‖1‖',
    translation: 'True Here And Now. O Nanak, Forever And Ever True. ||1||',
  },
  {
    id: 'BL70',
    src: 'ਸੋਚੈ. ਸੋਚਿ ਨ ਹੋਵਈ; ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥',
    pronunciation: 'socē. soc na howaī; je socī lakh vār ‖',
    translation:
      'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times.',
  },
  {
    id: 'GJW9',
    src: 'ਚੁਪੈ. ਚੁਪ ਨ ਹੋਵਈ; ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥',
    pronunciation: 'cupē. cup na howaī; je lāi rahā liv tār ‖',
    translation:
      'By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.',
  },
  {
    id: 'ZERL',
    src: 'ਭੁਖਿਆ. ਭੁਖ ਨ ਉਤਰੀ; ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ ॥',
    pronunciation: 'bhukhiā. bhukh na utarī; je bañnā purīā bhār ‖',
    translation:
      'The hunger of the hungry is not appeased, even by piling up loads of worldly goods.',
  },
  {
    id: '9MN2',
    src: 'ਸਹਸ ਸਿਆਣਪਾ. ਲਖ ਹੋਹਿ; ਤ ਇਕ. ਨ ਚਲੈ ਨਾਲਿ ॥',
    pronunciation: 'sahas siāṇapā. lakh hohi; ta ik. na calē nāl ‖',
    translation:
      'Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end.',
  },
  {
    id: 'MK1Q',
    src: 'ਕਿਵ. ਸਚਿਆਰਾ ਹੋਈਐ; ਕਿਵ. ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥',
    pronunciation: 'kiv. saciārā hoīē; kiv. kūṛē tuṭē pāl ‖',
    translation:
      'So how can you become truthful? And how can the veil of illusion be torn away?',
  },
  {
    id: 'H0PC',
    src: 'ਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ; ਨਾਨਕ. ਲਿਖਿਆ ਨਾਲਿ ॥੧॥',
    pronunciation: 'hukam rajāī calaṇā; nānak. likhiā nāl ‖1‖',
    translation:
      'O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will. ||1||',
  },
  {
    id: '60LK',
    src: 'ਹੁਕਮੀ. ਹੋਵਨਿ ਆਕਾਰ; ਹੁਕਮੁ. ਨ ਕਹਿਆ ਜਾਈ ॥',
    pronunciation: 'hukamī. howan ākār; hukamu. na kahiā jāī ‖',
    translation:
      'By His Command, bodies are created; His Command cannot be described.',
  },
  {
    id: 'UVSL',
    src: 'ਹੁਕਮੀ. ਹੋਵਨਿ ਜੀਅ; ਹੁਕਮਿ. ਮਿਲੈ ਵਡਿਆਈ ॥',
    pronunciation: 'hukamī. howan jīa; hukami. milē waḍiāī ‖',
    translation:
      'By His Command, souls come into being; by His Command, glory and greatness are obtained.',
  },
  {
    id: 'GLXS',
    src: 'ਹੁਕਮੀ, ਉਤਮੁ ਨੀਚੁ; ਹੁਕਮਿ ਲਿਖਿ, ਦੁਖ ਸੁਖ ਪਾਈਅਹਿ ॥',
    pronunciation: 'hukamī, utam nīcu; hukam likhi, dukh sukh pāīah ‖',
    translation:
      'By His Command, some are high and some are low; by His Written Command, pain and pleasure are obtained.',
  },
  {
    id: 'P2VG',
    src: 'ਇਕਨਾ. ਹੁਕਮੀ ਬਖਸੀਸ; ਇਕਿ, ਹੁਕਮੀ ਸਦਾ ਭਵਾਈਅਹਿ ॥',
    pronunciation: 'ikanā. hukamī bakhasīs; iki, hukamī sadā bhavāīah ‖',
    translation:
      'Some, by His Command, are blessed and forgiven; others, by His Command, wander aimlessly forever.',
  },
  {
    id: 'MX4P',
    src: 'ਹੁਕਮੈ ਅੰਦਰਿ. ਸਭੁ ਕੋ; ਬਾਹਰਿ ਹੁਕਮ. ਨ ਕੋਇ ॥',
    pronunciation: 'hukamē añdari. sabh ko; bāhar hukam. na koi ‖',
    translation:
      'Everyone is subject to His Command; no one is beyond His Command.',
  },
  {
    id: 'FKUU',
    src: 'ਨਾਨਕ. ਹੁਕਮੈ ਜੇ ਬੁਝੈ; ਤ ਹਉਮੈ. ਕਹੈ ਨ ਕੋਇ ॥੨॥',
    pronunciation: 'nānak. hukamē je bujhē; ta haumē. kahē na koi ‖2‖',
    translation:
      'O Nanak, one who understands His Command, does not speak in ego. ||2||',
  },
  {
    id: 'VUQD',
    src: 'ਗਾਵੈ ਕੋ ਤਾਣੁ; ਹੋਵੈ ਕਿਸੈ ਤਾਣੁ ॥',
    pronunciation: 'gāvē ko tāṇu; hovē kisē tāṇ ‖',
    translation: 'Some sing of His Power-who has that Power?',
  },
  {
    id: '7AC7',
    src: 'ਗਾਵੈ ਕੋ ਦਾਤਿ; ਜਾਣੈ ਨੀਸਾਣੁ ॥',
    pronunciation: 'gāvē ko dāti; jāṇē nīsāṇ ‖',
    translation: 'Some sing of His Gifts, and know His Sign and Insignia.',
  },
  {
    id: 'MB8C',
    src: 'ਗਾਵੈ ਕੋ; ਗੁਣ ਵਡਿਆਈਆ ਚਾਰ ॥',
    pronunciation: 'gāvē ko; guṇ waḍiāīā cār ‖',
    translation: 'Some sing of His Glorious Virtues, Greatness and Beauty.',
  },
  {
    id: 'C5NR',
    src: 'ਗਾਵੈ ਕੋ; ਵਿਦਿਆ ਵਿਖਮੁ ਵੀਚਾਰੁ ॥',
    pronunciation: 'gāvē ko; vidiā vikham vīcār ‖',
    translation:
      'Some sing of knowledge obtained of Him, through difficult philosophical studies.',
  },
  {
    id: 'HZSG',
    src: 'ਗਾਵੈ ਕੋ; ਸਾਜਿ ਕਰੇ ਤਨੁ ਖੇਹ ॥',
    pronunciation: 'gāvē ko; sāj kare tan kheh ‖',
    translation:
      'Some sing that He fashions the body, and then again reduces it to dust.',
  },
  {
    id: '13CH',
    src: 'ਗਾਵੈ ਕੋ; ਜੀਅ ਲੈ ਫਿਰਿ ਦੇਹ ॥',
    pronunciation: 'gāvē ko; jīa lē phir deh ‖',
    translation:
      'Some sing that He takes life away, and then again restores it.',
  },
  {
    id: '4SBX',
    src: 'ਗਾਵੈ ਕੋ; ਜਾਪੈ ਦਿਸੈ ਦੂਰਿ ॥',
    pronunciation: 'gāvē ko; jāpē disē dūr ‖',
    translation: 'Some sing that He seems so very far away.',
  },
  {
    id: 'ELAE',
    src: 'ਗਾਵੈ ਕੋ; ਵੇਖੈ ਹਾਦਰਾ ਹਦੂਰਿ ॥',
    pronunciation: 'gāvē ko; vekhē hādarā hadūr ‖',
    translation:
      'Some sing that He watches over us, face to face, ever-present.',
  },
  {
    id: '7922',
    src: 'ਕਥਨਾ ਕਥੀ; ਨ ਆਵੈ ਤੋਟਿ ॥',
    pronunciation: 'kathanā kathī; na āvē toṭ ‖',
    translation: 'There is no shortage of those who preach and teach.',
  },
  {
    id: 'Y9R8',
    src: 'ਕਥਿ ਕਥਿ ਕਥੀ; ਕੋਟੀ. ਕੋਟਿ ਕੋਟਿ ॥',
    pronunciation: 'kath kath kathī; koṭī. koṭ koṭ ‖',
    translation:
      'Millions upon millions offer millions of sermons and stories.',
  },
  {
    id: '1UMU',
    src: 'ਦੇਦਾ ਦੇ; ਲੈਦੇ ਥਕਿ ਪਾਹਿ ॥',
    pronunciation: 'dedā de; lēde thak pāh ‖',
    translation:
      'The Great Giver keeps on giving, while those who receive grow weary of receiving.',
  },
  {
    id: '32FN',
    src: 'ਜੁਗਾ ਜੁਗੰਤਰਿ; ਖਾਹੀ ਖਾਹਿ ॥',
    pronunciation: 'jugā jugañtari; khāhī khāh ‖',
    translation: 'Throughout the ages, consumers consume.',
  },
  {
    id: 'Q13S',
    src: 'ਹੁਕਮੀ; ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥',
    pronunciation: 'hukamī; hukam calāe rāh ‖',
    translation: 'The Commander, by His Command, leads us to walk on the Path.',
  },
  {
    id: '6VSN',
    src: 'ਨਾਨਕ; ਵਿਗਸੈ ਵੇਪਰਵਾਹੁ ॥੩॥',
    pronunciation: 'nānak; vigasē veparavāh ‖3‖',
    translation: 'O Nanak, He blossoms forth, Carefree and Untroubled. ||3||',
  },
  {
    id: 'PU7L',
    src: 'ਸਾਚਾ ਸਾਹਿਬੁ. ਸਾਚੁ ਨਾਇ; ਭਾਖਿਆ ਭਾਉ ਅਪਾਰੁ ॥',
    pronunciation: 'sācā sāhibu. sāc nāi; bhākhiā bhāu apār ‖',
    translation:
      'True is the Master, True is His Name-speak it with infinite love.',
  },
  {
    id: 'AY0H',
    src: 'ਆਖਹਿ. ਮੰਗਹਿ, ਦੇਹਿ ਦੇਹਿ; ਦਾਤਿ ਕਰੇ ਦਾਤਾਰੁ ॥',
    pronunciation: 'ākhahi. mañgahi, deh dehi; dāt kare dātār ‖',
    translation:
      'People beg and pray, "Give to us, give to us", and the Great Giver gives His Gifts.',
  },
  {
    id: 'NFYC',
    src: 'ਫੇਰਿ. ਕਿ ਅਗੈ ਰਖੀਐ; ਜਿਤੁ ਦਿਸੈ ਦਰਬਾਰੁ ॥',
    pronunciation: 'pheri. ka agē rakhīē; jit disē darabār ‖',
    translation:
      'So what offering can we place before Him, by which we might see the Darbaar of His Court?',
  },
  {
    id: 'XPT5',
    src: 'ਮੁਹੌ. ਕਿ ਬੋਲਣੁ ਬੋਲੀਐ; ਜਿਤੁ ਸੁਣਿ ਧਰੇ ਪਿਆਰੁ ॥',
    pronunciation: 'muhō. ka bolaṇ bolīē; jit suṇ dhare piār ‖',
    translation: 'What words can we speak to evoke His Love?',
  },
  {
    id: 'Y0C8',
    src: 'ਅੰਮ੍ਰਿਤ ਵੇਲਾ ਸਚੁ ਨਾਉ; ਵਡਿਆਈ ਵੀਚਾਰੁ ॥',
    pronunciation: 'añmrit velā sac nāu; waḍiāī vīcār ‖',
    translation:
      'In the Amrit Vaylaa, the ambrosial hours before dawn, chant the True Name, and contemplate His Glorious Greatness.',
  },
  {
    id: 'L7P6',
    src: 'ਕਰਮੀ ਆਵੈ ਕਪੜਾ; ਨਦਰੀ ਮੋਖੁ ਦੁਆਰੁ ॥',
    pronunciation: 'karamī āvē kapaṛā; nadarī mokh duār ‖',
    translation:
      'By the karma of past actions, the robe of this physical body is obtained. By His Grace, the Gate of Liberation is found.',
  },
  {
    id: 'HJP9',
    src: 'ਨਾਨਕ. ਏਵੈ ਜਾਣੀਐ; ਸਭੁ ਆਪੇ ਸਚਿਆਰੁ ॥੪॥',
    pronunciation: 'nānak. evē jāṇīē; sabh āpe saciār ‖4‖',
    translation: 'O Nanak, know this well: the True One Himself is All. ||4||',
  },
  {
    id: '34GD',
    src: 'ਥਾਪਿਆ ਨ ਜਾਇ; ਕੀਤਾ ਨ ਹੋਇ ॥',
    pronunciation: 'thāpiā na jāi; kītā na hoi ‖',
    translation: 'He cannot be established, He cannot be created.',
  },
  {
    id: '8KH1',
    src: 'ਆਪੇ ਆਪਿ; ਨਿਰੰਜਨੁ ਸੋਇ ॥',
    pronunciation: 'āpe āpi; nirañjan soi ‖',
    translation: 'He Himself is Immaculate and Pure.',
  },
  {
    id: 'TPDM',
    src: 'ਜਿਨਿ ਸੇਵਿਆ; ਤਿਨਿ ਪਾਇਆ ਮਾਨੁ ॥',
    pronunciation: 'jin seviā; tin pāiā mān ‖',
    translation: 'Those who serve Him are honored.',
  },
  {
    id: '3K42',
    src: 'ਨਾਨਕ; ਗਾਵੀਐ ਗੁਣੀ ਨਿਧਾਨੁ ॥',
    pronunciation: 'nānak; gāvīē guṇī nidhān ‖',
    translation: 'O Nanak, sing of the Lord, the Treasure of Excellence.',
  },
  {
    id: 'H4D8',
    src: 'ਗਾਵੀਐ ਸੁਣੀਐ; ਮਨਿ ਰਖੀਐ ਭਾਉ ॥',
    pronunciation: 'gāvīē suṇīē; man rakhīē bhāu ‖',
    translation: 'Sing, and listen, and let your mind be filled with love.',
  },
  {
    id: 'TE18',
    src: 'ਦੁਖੁ ਪਰਹਰਿ; ਸੁਖੁ ਘਰਿ, ਲੈ ਜਾਇ ॥',
    pronunciation: 'dukh parahari; sukh ghari, lē jāi ‖',
    translation:
      'Your pain shall be sent far away, and peace shall come to your home.',
  },
  {
    id: '3PHR',
    src: 'ਗੁਰਮੁਖਿ ਨਾਦੰ. ਗੁਰਮੁਖਿ ਵੇਦੰ; ਗੁਰਮੁਖਿ. ਰਹਿਆ ਸਮਾਈ ॥',
    pronunciation: 'guramukh nādañ. guramukh vedañ; guramukhi. rahiā samāī ‖',
    translation:
      "The Guru's Word is the Sound-current of the Naad; the Guru's Word is the Wisdom of the Vedas; the Guru's Word is all-pervading.",
  },
  {
    id: '5YV5',
    src: 'ਗੁਰੁ ਈਸਰੁ ਗੁਰੁ ਗੋਰਖੁ, ਬਰਮਾ ਗੁਰੁ; ਪਾਰਬਤੀ ਮਾਈ ॥',
    pronunciation: 'gur īsar gur gorakhu, baramā guru; pārabatī māī ‖',
    translation:
      'The Guru is Shiva, the Guru is Vishnu and Brahma; the Guru is Paarvati and Lakhshmi.',
  },
  {
    id: 'X1GF',
    src: 'ਜੇ ਹਉ ਜਾਣਾ, ਆਖਾ ਨਾਹੀ; ਕਹਣਾ ਕਥਨੁ ਨ ਜਾਈ ॥',
    pronunciation: 'je hau jāṇā, ākhā nāhī; kahaṇā kathan na jāī ‖',
    translation:
      'Even knowing God, I cannot describe Him; He cannot be described in words.',
  },
  {
    id: '5KPL',
    src: 'ਗੁਰਾ; ਇਕ ਦੇਹਿ ਬੁਝਾਈ ॥',
    pronunciation: 'gurā; ik deh bujhāī ‖',
    translation: 'The Guru has given me this one understanding:',
  },
  {
    id: 'DJAR',
    src: 'ਸਭਨਾ ਜੀਆ ਕਾ, ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥',
    pronunciation: 'sabhanā jīā kā, ik dātā; so. mē visar na jāī ‖5‖',
    translation:
      'there is only the One, the Giver of all souls. May I never forget Him! ||5||',
  },
  {
    id: '7NRN',
    src: 'ਤੀਰਥਿ ਨਾਵਾ, ਜੇ ਤਿਸੁ ਭਾਵਾ; ਵਿਣੁ ਭਾਣੇ. ਕਿ ਨਾਇ ਕਰੀ ॥',
    pronunciation: 'tīrath nāvā, je tis bhāvā; viṇ bhāṇe. ka nāi karī ‖',
    translation:
      'If I am pleasing to Him, then that is my pilgrimage and cleansing bath. Without pleasing Him, what good are ritual cleansings?',
  },
  {
    id: '8HGP',
    src: 'ਜੇਤੀ ਸਿਰਠਿ. ਉਪਾਈ ਵੇਖਾ; ਵਿਣੁ ਕਰਮਾ. ਕਿ ਮਿਲੈ ਲਈ ॥',
    pronunciation: 'jetī siraṭhi. upāī vekhā; viṇ karamā. ka milē laī ‖',
    translation:
      'I gaze upon all the created beings: without the karma of good actions, what are they given to receive?',
  },
  {
    id: 'J6KZ',
    src: 'ਮਤਿ ਵਿਚਿ, ਰਤਨ ਜਵਾਹਰ ਮਾਣਿਕ; ਜੇ ਇਕ ਗੁਰ ਕੀ ਸਿਖ ਸੁਣੀ ॥',
    pronunciation: 'mat vici, ratan javāhar māṇik; je ik gur kī sikh suṇī ‖',
    translation:
      "Within the mind are gems, jewels and rubies, if you listen to the Guru's Teachings, even once.",
  },
  {
    id: 'NVVQ',
    src: 'ਗੁਰਾ; ਇਕ ਦੇਹਿ ਬੁਝਾਈ ॥',
    pronunciation: 'gurā; ik deh bujhāī ‖',
    translation: 'The Guru has given me this one understanding:',
  },
  {
    id: 'AGUV',
    src: 'ਸਭਨਾ ਜੀਆ ਕਾ. ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੬॥',
    pronunciation: 'sabhanā jīā kā. ik dātā; so. mē visar na jāī ‖6‖',
    translation:
      'there is only the One, the Giver of all souls. May I never forget Him! ||6||',
  },
  {
    id: 'MLKE',
    src: 'ਜੇ ਜੁਗ ਚਾਰੇ ਆਰਜਾ; ਹੋਰ ਦਸੂਣੀ ਹੋਇ ॥',
    pronunciation: 'je jug cāre ārajā; hor dasūṇī hoi ‖',
    translation:
      'Even if you could live throughout the four ages, or even ten times more,',
  },
  {
    id: 'C69U',
    src: 'ਨਵਾ ਖੰਡਾ ਵਿਚਿ ਜਾਣੀਐ; ਨਾਲਿ ਚਲੈ, ਸਭੁ ਕੋਇ ॥',
    pronunciation: 'navā khañḍā vic jāṇīē; nāl calē, sabh koi ‖',
    translation:
      'and even if you were known throughout the nine continents and followed by all,',
  },
  {
    id: 'CZ4N',
    src: 'ਚੰਗਾ ਨਾਉ ਰਖਾਇ ਕੈ; ਜਸੁ ਕੀਰਤਿ, ਜਗਿ ਲੇਇ ॥',
    pronunciation: 'cañgā nāu rakhāi kē; jas kīrati, jag lei ‖',
    translation:
      'with a good name and reputation, with praise and fame throughout the world-',
  },
  {
    id: 'EPP1',
    src: 'ਜੇ ਤਿਸੁ. ਨਦਰਿ ਨ ਆਵਈ; ਤ ਵਾਤ ਨ ਪੁਛੈ ਕੇ ॥',
    pronunciation: 'je tisu. nadar na āwaī; ta vāt na puchē ke ‖',
    translation:
      'still, if the Lord does not bless you with His Glance of Grace, then who cares? What is the use?',
  },
  {
    id: 'FTM0',
    src: 'ਕੀਟਾ ਅੰਦਰਿ. ਕੀਟੁ ਕਰਿ; ਦੋਸੀ. ਦੋਸੁ ਧਰੇ ॥',
    pronunciation: 'kīṭā añdari. kīṭ kari; dosī. dos dhare ‖',
    translation:
      'Among worms, you would be considered a lowly worm, and even contemptible sinners would hold you in contempt.',
  },
  {
    id: 'Q2DD',
    src: 'ਨਾਨਕ. ਨਿਰਗੁਣਿ ਗੁਣੁ ਕਰੇ; ਗੁਣਵੰਤਿਆ, ਗੁਣੁ ਦੇ ॥',
    pronunciation: 'nānak. niraguṇ guṇ kare; guṇawañtiā, guṇ de ‖',
    translation:
      'O Nanak, God blesses the unworthy with virtue, and bestows virtue on the virtuous.',
  },
  {
    id: 'SYSB',
    src: 'ਤੇਹਾ. ਕੋਇ ਨ ਸੁਝਈ; ਜਿ. ਤਿਸੁ ਗੁਣੁ ਕੋਇ ਕਰੇ ॥੭॥',
    pronunciation: 'tehā. koi na sujhaī; ji. tis guṇ koi kare ‖7‖',
    translation:
      'No one can even imagine anyone who can bestow virtue upon Him. ||7||',
  },
  {
    id: 'ZYF3',
    src: 'ਸੁਣਿਐ; ਸਿਧ ਪੀਰ ਸੁਰਿ ਨਾਥ ॥',
    pronunciation: 'suṇiē; sidh pīr sur nāth ‖',
    translation:
      'Listening-the Siddhas, the spiritual teachers, the heroic warriors, the yogic masters.',
  },
  {
    id: 'A7FY',
    src: 'ਸੁਣਿਐ; ਧਰਤਿ ਧਵਲ ਆਕਾਸ ॥',
    pronunciation: 'suṇiē; dharat dhawal ākās ‖',
    translation: 'Listening-the earth, its support and the Akaashic ethers.',
  },
  {
    id: 'QYGU',
    src: 'ਸੁਣਿਐ; ਦੀਪ ਲੋਅ ਪਾਤਾਲ ॥',
    pronunciation: 'suṇiē; dīp loa pātāl ‖',
    translation:
      'Listening-the oceans, the lands of the world and the nether regions of the underworld.',
  },
  {
    id: 'F28C',
    src: 'ਸੁਣਿਐ; ਪੋਹਿ ਨ ਸਕੈ ਕਾਲੁ ॥',
    pronunciation: 'suṇiē; poh na sakē kāl ‖',
    translation: 'Listening-Death cannot even touch you.',
  },
  {
    id: '3477',
    src: 'ਨਾਨਕ. ਭਗਤਾ; ਸਦਾ ਵਿਗਾਸੁ ॥',
    pronunciation: 'nānak. bhagatā; sadā vigās ‖',
    translation: 'O Nanak, the devotees are forever in bliss.',
  },
  {
    id: 'FVWP',
    src: 'ਸੁਣਿਐ; ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੮॥',
    pronunciation: 'suṇiē; dūkh pāp kā nās ‖8‖',
    translation: 'Listening-pain and sin are erased. ||8||',
  },
  {
    id: 'TENR',
    src: 'ਸੁਣਿਐ; ਈਸਰੁ ਬਰਮਾ ਇੰਦੁ ॥',
    pronunciation: 'suṇiē; īsar baramā iñd ‖',
    translation: 'Listening-Shiva, Brahma and Indra.',
  },
  {
    id: '7M4S',
    src: 'ਸੁਣਿਐ; ਮੁਖਿ ਸਾਲਾਹਣ ਮੰਦੁ ॥',
    pronunciation: 'suṇiē; mukh sālāhaṇ mañd ‖',
    translation: 'Listening-even foul-mouthed people praise Him.',
  },
  {
    id: 'UCWQ',
    src: 'ਸੁਣਿਐ; ਜੋਗ ਜੁਗਤਿ ਤਨਿ ਭੇਦ ॥',
    pronunciation: 'suṇiē; jog jugat tan bhed ‖',
    translation:
      'Listening-the technology of Yoga and the secrets of the body.',
  },
  {
    id: 'BXPY',
    src: 'ਸੁਣਿਐ; ਸਾਸਤ ਸਿਮ੍ਰਿਤਿ ਵੇਦ ॥',
    pronunciation: 'suṇiē; sāsat simrit ved ‖',
    translation: 'Listening-the Shaastras, the Simritees and the Vedas.',
  },
  {
    id: 'GXL1',
    src: 'ਨਾਨਕ. ਭਗਤਾ; ਸਦਾ ਵਿਗਾਸੁ ॥',
    pronunciation: 'nānak. bhagatā; sadā vigās ‖',
    translation: 'O Nanak, the devotees are forever in bliss.',
  },
  {
    id: '97SA',
    src: 'ਸੁਣਿਐ; ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੯॥',
    pronunciation: 'suṇiē; dūkh pāp kā nās ‖9‖',
    translation: 'Listening-pain and sin are erased. ||9||',
  },
  {
    id: '62ZU',
    src: 'ਸੁਣਿਐ; ਸਤੁ ਸੰਤੋਖੁ ਗਿਆਨੁ ॥',
    pronunciation: 'suṇiē; sat sañtokh giān ‖',
    translation: 'Listening-truth, contentment and spiritual wisdom.',
  },
  {
    id: 'RT8C',
    src: 'ਸੁਣਿਐ; ਅਠਸਠਿ ਕਾ ਇਸਨਾਨੁ ॥',
    pronunciation: 'suṇiē; aṭhasaṭh kā isanān ‖',
    translation:
      'Listening-take your cleansing bath at the sixty-eight places of pilgrimage.',
  },
  {
    id: 'KDHE',
    src: 'ਸੁਣਿਐ; ਪੜਿ ਪੜਿ ਪਾਵਹਿ ਮਾਨੁ ॥',
    pronunciation: 'suṇiē; paṛ paṛ pāwah mān ‖',
    translation: 'Listening-reading and reciting, honor is obtained.',
  },
  {
    id: '7T0L',
    src: 'ਸੁਣਿਐ; ਲਾਗੈ ਸਹਜਿ ਧਿਆਨੁ ॥',
    pronunciation: 'suṇiē; lāgē sahaj dhiān ‖',
    translation: 'Listening-intuitively grasp the essence of meditation.',
  },
  {
    id: 'WXKL',
    src: 'ਨਾਨਕ. ਭਗਤਾ; ਸਦਾ ਵਿਗਾਸੁ ॥',
    pronunciation: 'nānak. bhagatā; sadā vigās ‖',
    translation: 'O Nanak, the devotees are forever in bliss.',
  },
  {
    id: 'EV0P',
    src: 'ਸੁਣਿਐ; ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੧੦॥',
    pronunciation: 'suṇiē; dūkh pāp kā nās ‖10‖',
    translation: 'Listening-pain and sin are erased. ||10||',
  },
  {
    id: 'YAQ2',
    src: 'ਸੁਣਿਐ; ਸਰਾ ਗੁਣਾ ਕੇ ਗਾਹ ॥',
    pronunciation: 'suṇiē; sarā guṇā ke gāh ‖',
    translation: 'Listening-dive deep into the ocean of virtue.',
  },
  {
    id: 'HCMF',
    src: 'ਸੁਣਿਐ; ਸੇਖ ਪੀਰ ਪਾਤਿਸਾਹ ॥',
    pronunciation: 'suṇiē; sekh pīr pātisāh ‖',
    translation:
      'Listening-the Shaykhs, religious scholars, spiritual teachers and emperors.',
  },
  {
    id: 'PSFG',
    src: 'ਸੁਣਿਐ; ਅੰਧੇ ਪਾਵਹਿ ਰਾਹੁ ॥',
    pronunciation: 'suṇiē; añdhe pāwah rāh ‖',
    translation: 'Listening-even the blind find the Path.',
  },
  {
    id: '7J2W',
    src: 'ਸੁਣਿਐ; ਹਾਥ ਹੋਵੈ ਅਸਗਾਹੁ ॥',
    pronunciation: 'suṇiē; hāth hovē asagāh ‖',
    translation: 'Listening-the Unreachable comes within your grasp.',
  },
  {
    id: 'PQ8D',
    src: 'ਨਾਨਕ. ਭਗਤਾ; ਸਦਾ ਵਿਗਾਸੁ ॥',
    pronunciation: 'nānak. bhagatā; sadā vigās ‖',
    translation: 'O Nanak, the devotees are forever in bliss.',
  },
  {
    id: 'VC8U',
    src: 'ਸੁਣਿਐ; ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੧੧॥',
    pronunciation: 'suṇiē; dūkh pāp kā nās ‖11‖',
    translation: 'Listening-pain and sin are erased. ||11||',
  },
  {
    id: 'NM9A',
    src: 'ਮੰਨੇ ਕੀ ਗਤਿ; ਕਹੀ ਨ ਜਾਇ ॥',
    pronunciation: 'mañne kī gati; kahī na jāi ‖',
    translation: 'The state of the faithful cannot be described.',
  },
  {
    id: 'ZZT7',
    src: 'ਜੇ ਕੋ ਕਹੈ; ਪਿਛੈ ਪਛੁਤਾਇ ॥',
    pronunciation: 'je ko kahē; pichē pachutāi ‖',
    translation: 'One who tries to describe this shall regret the attempt.',
  },
  {
    id: 'MER7',
    src: 'ਕਾਗਦਿ ਕਲਮ; ਨ ਲਿਖਣਹਾਰੁ ॥',
    pronunciation: 'kāgad kalam; na likhaṇahār ‖',
    translation: 'No paper, no pen, no scribe',
  },
  {
    id: 'R15V',
    src: 'ਮੰਨੇ ਕਾ; ਬਹਿ ਕਰਨਿ ਵੀਚਾਰੁ ॥',
    pronunciation: 'mañne kā; bah karan vīcār ‖',
    translation: 'can record the state of the faithful.',
  },
  {
    id: 'NS3T',
    src: 'ਐਸਾ ਨਾਮੁ; ਨਿਰੰਜਨੁ ਹੋਇ ॥',
    pronunciation: 'ēsā nāmu; nirañjan hoi ‖',
    translation: 'Such is the Name of the Immaculate Lord.',
  },
  {
    id: 'B5CT',
    src: 'ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ; ਮਨਿ ਕੋਇ ॥੧੨॥',
    pronunciation: 'je ko mañn jāṇē; man koi ‖12‖',
    translation:
      'Only one who has faith comes to know such a state of mind. ||12||',
  },
  {
    id: '2GA0',
    src: 'ਮੰਨੈ; ਸੁਰਤਿ ਹੋਵੈ ਮਨਿ ਬੁਧਿ ॥',
    pronunciation: 'mañnē; surat hovē man budh ‖',
    translation: 'The faithful have intuitive awareness and intelligence.',
  },
  {
    id: 'V1LA',
    src: 'ਮੰਨੈ; ਸਗਲ ਭਵਣ ਕੀ ਸੁਧਿ ॥',
    pronunciation: 'mañnē; sagal bhawaṇ kī sudh ‖',
    translation: 'The faithful know about all worlds and realms.',
  },
  {
    id: 'B3JS',
    src: 'ਮੰਨੈ; ਮੁਹਿ ਚੋਟਾ ਨਾ ਖਾਇ ॥',
    pronunciation: 'mañnē; muh coṭā nā khāi ‖',
    translation: 'The faithful shall never be struck across the face.',
  },
  {
    id: 'VQ72',
    src: 'ਮੰਨੈ; ਜਮ ਕੈ ਸਾਥਿ ਨ ਜਾਇ ॥',
    pronunciation: 'mañnē; jam kē sāth na jāi ‖',
    translation: 'The faithful do not have to go with the Messenger of Death.',
  },
  {
    id: 'RZQP',
    src: 'ਐਸਾ ਨਾਮੁ; ਨਿਰੰਜਨੁ ਹੋਇ ॥',
    pronunciation: 'ēsā nāmu; nirañjan hoi ‖',
    translation: 'Such is the Name of the Immaculate Lord.',
  },
  {
    id: '92E4',
    src: 'ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ; ਮਨਿ ਕੋਇ ॥੧੩॥',
    pronunciation: 'je ko mañn jāṇē; man koi ‖13‖',
    translation:
      'Only one who has faith comes to know such a state of mind. ||13||',
  },
  {
    id: '8NGG',
    src: 'ਮੰਨੈ; ਮਾਰਗਿ ਠਾਕ ਨ ਪਾਇ ॥',
    pronunciation: 'mañnē; mārag ṭhāk na pāi ‖',
    translation: 'The path of the faithful shall never be blocked.',
  },
  {
    id: '3A8V',
    src: 'ਮੰਨੈ; ਪਤਿ ਸਿਉ ਪਰਗਟੁ ਜਾਇ ॥',
    pronunciation: 'mañnē; pat siu paragaṭ jāi ‖',
    translation: 'The faithful shall depart with honor and fame.',
  },
  {
    id: 'R9RA',
    src: 'ਮੰਨੈ; ਮਗੁ ਨ ਚਲੈ, ਪੰਥੁ ॥',
    pronunciation: 'mañnē; mag na calē, pañth ‖',
    translation: 'The faithful do not follow empty religious rituals.',
  },
  {
    id: '6VHT',
    src: 'ਮੰਨੈ; ਧਰਮ ਸੇਤੀ ਸਨਬੰਧੁ ॥',
    pronunciation: 'mañnē; dharam setī sanabañdh ‖',
    translation: 'The faithful are firmly bound to the Dharma.',
  },
  {
    id: '314W',
    src: 'ਐਸਾ ਨਾਮੁ; ਨਿਰੰਜਨੁ ਹੋਇ ॥',
    pronunciation: 'ēsā nāmu; nirañjan hoi ‖',
    translation: 'Such is the Name of the Immaculate Lord.',
  },
  {
    id: 'NLHT',
    src: 'ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ; ਮਨਿ ਕੋਇ ॥੧੪॥',
    pronunciation: 'je ko mañn jāṇē; man koi ‖14‖',
    translation:
      'Only one who has faith comes to know such a state of mind. ||14||',
  },
  {
    id: 'EEV2',
    src: 'ਮੰਨੈ; ਪਾਵਹਿ ਮੋਖੁ ਦੁਆਰੁ ॥',
    pronunciation: 'mañnē; pāwah mokh duār ‖',
    translation: 'The faithful find the Door of Liberation.',
  },
  {
    id: 'XDGX',
    src: 'ਮੰਨੈ; ਪਰਵਾਰੈ ਸਾਧਾਰੁ ॥',
    pronunciation: 'mañnē; paravārē sādhār ‖',
    translation: 'The faithful uplift and redeem their family and relations.',
  },
  {
    id: 'EMX5',
    src: 'ਮੰਨੈ; ਤਰੈ ਤਾਰੇ ਗੁਰੁ ਸਿਖ ॥',
    pronunciation: 'mañnē; tarē tāre gur sikh ‖',
    translation:
      'The faithful are saved, and carried across with the Sikhs of the Guru.',
  },
  {
    id: 'PD82',
    src: 'ਮੰਨੈ; ਨਾਨਕ. ਭਵਹਿ ਨ ਭਿਖ ॥',
    pronunciation: 'mañnē; nānak. bhawah na bhikh ‖',
    translation: 'The faithful, O Nanak, do not wander around begging.',
  },
  {
    id: 'V24N',
    src: 'ਐਸਾ ਨਾਮੁ; ਨਿਰੰਜਨੁ ਹੋਇ ॥',
    pronunciation: 'ēsā nāmu; nirañjan hoi ‖',
    translation: 'Such is the Name of the Immaculate Lord.',
  },
  {
    id: 'Y8UM',
    src: 'ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ; ਮਨਿ ਕੋਇ ॥੧੫॥',
    pronunciation: 'je ko mañn jāṇē; man koi ‖15‖',
    translation:
      'Only one who has faith comes to know such a state of mind. ||15||',
  },
  {
    id: 'K3GP',
    src: 'ਪੰਚ ਪਰਵਾਣ; ਪੰਚ ਪਰਧਾਨੁ ॥',
    pronunciation: 'pañc paravāṇ; pañc paradhān ‖',
    translation: 'The chosen ones, the self-elect, are accepted and approved.',
  },
  {
    id: '4XG0',
    src: 'ਪੰਚੇ ਪਾਵਹਿ; ਦਰਗਹਿ ਮਾਨੁ ॥',
    pronunciation: 'pañce pāwahi; daragah mān ‖',
    translation: 'The chosen ones are honored in the Court of the Lord.',
  },
  {
    id: 'SYQV',
    src: 'ਪੰਚੇ ਸੋਹਹਿ; ਦਰਿ ਰਾਜਾਨੁ ॥',
    pronunciation: 'pañce sohahi; dar rājān ‖',
    translation: 'The chosen ones look beautiful in the courts of kings.',
  },
  {
    id: 'WBA3',
    src: 'ਪੰਚਾ ਕਾ; ਗੁਰੁ ਏਕੁ ਧਿਆਨੁ ॥',
    pronunciation: 'pañcā kā; gur ek dhiān ‖',
    translation: 'The chosen ones meditate single-mindedly on the Guru.',
  },
  {
    id: 'VPS6',
    src: 'ਜੇ ਕੋ ਕਹੈ; ਕਰੈ ਵੀਚਾਰੁ ॥',
    pronunciation: 'je ko kahē; karē vīcār ‖',
    translation:
      'No matter how much anyone tries to explain and describe them,',
  },
  {
    id: 'ZP00',
    src: 'ਕਰਤੇ ਕੈ ਕਰਣੈ; ਨਾਹੀ ਸੁਮਾਰੁ ॥',
    pronunciation: 'karate kē karaṇē; nāhī sumār ‖',
    translation: 'the actions of the Creator cannot be counted.',
  },
  {
    id: 'JUGS',
    src: 'ਧੌਲੁ ਧਰਮੁ; ਦਇਆ ਕਾ ਪੂਤੁ ॥',
    pronunciation: 'dhōl dharamu; daiā kā pūt ‖',
    translation: 'The mythical bull is Dharma, the son of compassion;',
  },
  {
    id: 'BRQJ',
    src: 'ਸੰਤੋਖੁ ਥਾਪਿ ਰਖਿਆ; ਜਿਨਿ ਸੂਤਿ ॥',
    pronunciation: 'sañtokh thāp rakhiā; jin sūt ‖',
    translation: 'this is what patiently holds the earth in its place.',
  },
  {
    id: 'M2D6',
    src: 'ਜੇ ਕੋ ਬੁਝੈ; ਹੋਵੈ ਸਚਿਆਰੁ ॥',
    pronunciation: 'je ko bujhē; hovē saciār ‖',
    translation: 'One who understands this becomes truthful.',
  },
  {
    id: 'TH49',
    src: 'ਧਵਲੈ ਉਪਰਿ; ਕੇਤਾ ਭਾਰੁ ॥',
    pronunciation: 'dhawalē upari; ketā bhār ‖',
    translation: 'What a great load there is on the bull!',
  },
  {
    id: 'F3DS',
    src: 'ਧਰਤੀ ਹੋਰੁ; ਪਰੈ ਹੋਰੁ ਹੋਰੁ ॥',
    pronunciation: 'dharatī horu; parē hor hor ‖',
    translation: 'So many worlds beyond this world-so very many!',
  },
  {
    id: 'DLGR',
    src: 'ਤਿਸ ਤੇ ਭਾਰੁ ਤਲੈ; ਕਵਣੁ ਜੋਰੁ ॥',
    pronunciation: 'tis te bhār talē; kawaṇ jor ‖',
    translation: 'What power holds them, and supports their weight?',
  },
  {
    id: 'TU5M',
    src: 'ਜੀਅ ਜਾਤਿ; ਰੰਗਾ ਕੇ ਨਾਵ ॥',
    pronunciation: 'jīa jāti; rañgā ke nāv ‖',
    translation: 'The names and the colors of the assorted species of beings',
  },
  {
    id: '45QD',
    src: 'ਸਭਨਾ ਲਿਖਿਆ; ਵੁੜੀ ਕਲਾਮ ॥',
    pronunciation: 'sabhanā likhiā; wuṛī kalām ‖',
    translation: 'were all inscribed by the Ever-flowing Pen of God.',
  },
  {
    id: 'U280',
    src: 'ਏਹੁ ਲੇਖਾ; ਲਿਖਿ ਜਾਣੈ ਕੋਇ ॥',
    pronunciation: 'eh lekhā; likh jāṇē koi ‖',
    translation: 'Who knows how to write this account?',
  },
  {
    id: '3EN4',
    src: 'ਲੇਖਾ ਲਿਖਿਆ; ਕੇਤਾ ਹੋਇ ॥',
    pronunciation: 'lekhā likhiā; ketā hoi ‖',
    translation: 'Just imagine what a huge scroll it would take!',
  },
  {
    id: 'KC1Y',
    src: 'ਕੇਤਾ ਤਾਣੁ; ਸੁਆਲਿਹੁ ਰੂਪੁ ॥',
    pronunciation: 'ketā tāṇu; suālih rūp ‖',
    translation: 'What power! What fascinating beauty!',
  },
  {
    id: 'RQ99',
    src: 'ਕੇਤੀ ਦਾਤਿ; ਜਾਣੈ ਕੌਣੁ ਕੂਤੁ ॥',
    pronunciation: 'ketī dāti; jāṇē kōṇ kūt ‖',
    translation: 'And what gifts! Who can know their extent?',
  },
  {
    id: 'ADTJ',
    src: 'ਕੀਤਾ ਪਸਾਉ; ਏਕੋ ਕਵਾਉ ॥',
    pronunciation: 'kītā pasāu; eko kavāu ‖',
    translation: 'You created the vast expanse of the Universe with One Word!',
  },
  {
    id: 'YG5R',
    src: 'ਤਿਸ ਤੇ ਹੋਏ; ਲਖ ਦਰੀਆਉ ॥',
    pronunciation: 'tis te hoe; lakh darīāu ‖',
    translation: 'Hundreds of thousands of rivers began to flow.',
  },
  {
    id: 'WUJB',
    src: 'ਕੁਦਰਤਿ ਕਵਣ; ਕਹਾ ਵੀਚਾਰੁ ॥',
    pronunciation: 'kudarat kawaṇ; kahā vīcār ‖',
    translation: 'How can Your Creative Potency be described?',
  },
  {
    id: 'MF67',
    src: 'ਵਾਰਿਆ ਨ ਜਾਵਾ; ਏਕ ਵਾਰ ॥',
    pronunciation: 'vāriā na jāvā; ek vār ‖',
    translation: 'I cannot even once be a sacrifice to You.',
  },
  {
    id: 'Y8MW',
    src: 'ਜੋ ਤੁਧੁ ਭਾਵੈ; ਸਾਈ ਭਲੀ ਕਾਰ ॥',
    pronunciation: 'jo tudh bhāvē; sāī bhalī kār ‖',
    translation: 'Whatever pleases You is the only good done,',
  },
  {
    id: '33K1',
    src: 'ਤੂ ਸਦਾ ਸਲਾਮਤਿ; ਨਿਰੰਕਾਰ ॥੧੬॥',
    pronunciation: 'tū sadā salāmati; nirañkār ‖16‖',
    translation: 'You, Eternal and Formless One! ||16||',
  },
  {
    id: '5Z42',
    src: 'ਅਸੰਖ ਜਪ; ਅਸੰਖ ਭਾਉ ॥',
    pronunciation: 'asañkh jap; asañkh bhāu ‖',
    translation: 'Countless meditations, countless loves.',
  },
  {
    id: '203N',
    src: 'ਅਸੰਖ ਪੂਜਾ; ਅਸੰਖ ਤਪ ਤਾਉ ॥',
    pronunciation: 'asañkh pūjā; asañkh tap tāu ‖',
    translation: 'Countless worship services, countless austere disciplines.',
  },
  {
    id: 'G4FX',
    src: 'ਅਸੰਖ ਗਰੰਥ; ਮੁਖਿ ਵੇਦ ਪਾਠ ॥',
    pronunciation: 'asañkh garañth; mukh ved pāṭh ‖',
    translation: 'Countless scriptures, and ritual recitations of the Vedas.',
  },
  {
    id: '011M',
    src: 'ਅਸੰਖ ਜੋਗ; ਮਨਿ ਰਹਹਿ ਉਦਾਸ ॥',
    pronunciation: 'asañkh jog; man rahah udās ‖',
    translation: 'Countless Yogis, whose minds remain detached from the world.',
  },
  {
    id: 'GRXU',
    src: 'ਅਸੰਖ ਭਗਤ; ਗੁਣ ਗਿਆਨ ਵੀਚਾਰ ॥',
    pronunciation: 'asañkh bhagat; guṇ giān vīcār ‖',
    translation:
      'Countless devotees contemplate the Wisdom and Virtues of the Lord.',
  },
  {
    id: 'KRAN',
    src: 'ਅਸੰਖ ਸਤੀ; ਅਸੰਖ ਦਾਤਾਰ ॥',
    pronunciation: 'asañkh satī; asañkh dātār ‖',
    translation: 'Countless the holy, countless the givers.',
  },
  {
    id: '1F9S',
    src: 'ਅਸੰਖ ਸੂਰ; ਮੁਹ ਭਖ ਸਾਰ ॥',
    pronunciation: 'asañkh sūr; muh bhakh sār ‖',
    translation:
      'Countless heroic spiritual warriors, who bear the brunt of the attack in battle (who with their mouths eat steel).',
  },
  {
    id: 'LF7G',
    src: 'ਅਸੰਖ ਮੋਨਿ; ਲਿਵ ਲਾਇ ਤਾਰ ॥',
    pronunciation: 'asañkh moni; liv lāi tār ‖',
    translation: 'Countless silent sages, vibrating the String of His Love.',
  },
  {
    id: '3NQR',
    src: 'ਕੁਦਰਤਿ ਕਵਣ; ਕਹਾ ਵੀਚਾਰੁ ॥',
    pronunciation: 'kudarat kawaṇ; kahā vīcār ‖',
    translation: 'How can Your Creative Potency be described?',
  },
  {
    id: '44CB',
    src: 'ਵਾਰਿਆ ਨ ਜਾਵਾ; ਏਕ ਵਾਰ ॥',
    pronunciation: 'vāriā na jāvā; ek vār ‖',
    translation: 'I cannot even once be a sacrifice to You.',
  },
  {
    id: '86A1',
    src: 'ਜੋ ਤੁਧੁ ਭਾਵੈ; ਸਾਈ ਭਲੀ ਕਾਰ ॥',
    pronunciation: 'jo tudh bhāvē; sāī bhalī kār ‖',
    translation: 'Whatever pleases You is the only good done,',
  },
  {
    id: '9Y0C',
    src: 'ਤੂ ਸਦਾ ਸਲਾਮਤਿ; ਨਿਰੰਕਾਰ ॥੧੭॥',
    pronunciation: 'tū sadā salāmati; nirañkār ‖17‖',
    translation: 'You, Eternal and Formless One. ||17||',
  },
  {
    id: '77V0',
    src: 'ਅਸੰਖ ਮੂਰਖ; ਅੰਧ ਘੋਰ ॥',
    pronunciation: 'asañkh mūrakh; añdh ghor ‖',
    translation: 'Countless fools, blinded by ignorance.',
  },
  {
    id: 'BXZ6',
    src: 'ਅਸੰਖ ਚੋਰ; ਹਰਾਮਖੋਰ ॥',
    pronunciation: 'asañkh cor; harāmakhor ‖',
    translation: 'Countless thieves and embezzlers.',
  },
  {
    id: 'SHAV',
    src: 'ਅਸੰਖ ਅਮਰ; ਕਰਿ ਜਾਹਿ ਜੋਰ ॥',
    pronunciation: 'asañkh amar; kar jāh jor ‖',
    translation: 'Countless impose their will by force.',
  },
  {
    id: 'DUUN',
    src: 'ਅਸੰਖ ਗਲਵਢ; ਹਤਿਆ ਕਮਾਹਿ ॥',
    pronunciation: 'asañkh galawaḍh; hatiā kamāh ‖',
    translation: 'Countless cut-throats and ruthless killers.',
  },
  {
    id: 'WESS',
    src: 'ਅਸੰਖ ਪਾਪੀ; ਪਾਪੁ ਕਰਿ ਜਾਹਿ ॥',
    pronunciation: 'asañkh pāpī; pāp kar jāh ‖',
    translation: 'Countless sinners who keep on sinning.',
  },
  {
    id: 'EKX0',
    src: 'ਅਸੰਖ ਕੂੜਿਆਰ; ਕੂੜੇ ਫਿਰਾਹਿ ॥',
    pronunciation: 'asañkh kūṛiār; kūṛe phirāh ‖',
    translation: 'Countless liars, wandering lost in their lies.',
  },
  {
    id: '0HA1',
    src: 'ਅਸੰਖ ਮਲੇਛ; ਮਲੁ ਭਖਿ ਖਾਹਿ ॥',
    pronunciation: 'asañkh malech; mal bhakh khāh ‖',
    translation: 'Countless wretches, eating filth as their ration.',
  },
  {
    id: 'XZLU',
    src: 'ਅਸੰਖ ਨਿੰਦਕ; ਸਿਰਿ ਕਰਹਿ ਭਾਰੁ ॥',
    pronunciation: 'asañkh niñdak; sir karah bhār ‖',
    translation:
      'Countless slanderers, carrying the weight of their stupid mistakes on their heads.',
  },
  {
    id: 'RT3D',
    src: 'ਨਾਨਕੁ; ਨੀਚੁ ਕਹੈ ਵੀਚਾਰੁ ॥',
    pronunciation: 'nānaku; nīc kahē vīcār ‖',
    translation: 'Nanak describes the state of the lowly.',
  },
  {
    id: '3N2N',
    src: 'ਵਾਰਿਆ ਨ ਜਾਵਾ; ਏਕ ਵਾਰ ॥',
    pronunciation: 'vāriā na jāvā; ek vār ‖',
    translation: 'I cannot even once be a sacrifice to You.',
  },
  {
    id: 'QWLN',
    src: 'ਜੋ ਤੁਧੁ ਭਾਵੈ; ਸਾਈ ਭਲੀ ਕਾਰ ॥',
    pronunciation: 'jo tudh bhāvē; sāī bhalī kār ‖',
    translation: 'Whatever pleases You is the only good done,',
  },
  {
    id: 'C9VV',
    src: 'ਤੂ ਸਦਾ ਸਲਾਮਤਿ; ਨਿਰੰਕਾਰ ॥੧੮॥',
    pronunciation: 'tū sadā salāmati; nirañkār ‖18‖',
    translation: 'You, Eternal and Formless One. ||18||',
  },
  {
    id: 'VWZQ',
    src: 'ਅਸੰਖ ਨਾਵ; ਅਸੰਖ ਥਾਵ ॥',
    pronunciation: 'asañkh nāv; asañkh thāv ‖',
    translation: 'Countless names, countless places.',
  },
  {
    id: '2YCD',
    src: 'ਅਗੰਮ ਅਗੰਮ; ਅਸੰਖ ਲੋਅ ॥',
    pronunciation: 'agañm agañm; asañkh loa ‖',
    translation: 'Inaccessible, unapproachable, countless celestial realms.',
  },
  {
    id: '878C',
    src: 'ਅਸੰਖ ਕਹਹਿ; ਸਿਰਿ ਭਾਰੁ ਹੋਇ ॥',
    pronunciation: 'asañkh kahahi; sir bhār hoi ‖',
    translation:
      'Even to call them countless is to carry the weight on your head.',
  },
  {
    id: 'CYS8',
    src: 'ਅਖਰੀ ਨਾਮੁ; ਅਖਰੀ ਸਾਲਾਹ ॥',
    pronunciation: 'akharī nāmu; akharī sālāh ‖',
    translation:
      'From the Word, comes the Naam; from the Word, comes Your Praise.',
  },
  {
    id: 'ZZGR',
    src: 'ਅਖਰੀ; ਗਿਆਨੁ ਗੀਤ ਗੁਣ ਗਾਹ ॥',
    pronunciation: 'akharī; giān gīt guṇ gāh ‖',
    translation:
      'From the Word, comes spiritual wisdom, singing the Songs of Your Glory.',
  },
  {
    id: 'UYP2',
    src: 'ਅਖਰੀ; ਲਿਖਣੁ ਬੋਲਣੁ ਬਾਣਿ ॥',
    pronunciation: 'akharī; likhaṇ bolaṇ bāṇ ‖',
    translation: 'From the Word, come the written and spoken words and hymns.',
  },
  {
    id: '7C0T',
    src: 'ਅਖਰਾ ਸਿਰਿ; ਸੰਜੋਗੁ ਵਖਾਣਿ ॥',
    pronunciation: 'akharā siri; sañjog wakhāṇ ‖',
    translation: "From the Word, comes destiny, written on one's forehead.",
  },
  {
    id: '4R85',
    src: 'ਜਿਨਿ ਏਹਿ ਲਿਖੇ; ਤਿਸੁ ਸਿਰਿ ਨਾਹਿ ॥',
    pronunciation: 'jin eh likhe; tis sir nāh ‖',
    translation:
      'But the One who wrote these Words of Destiny-no words are written on His Forehead.',
  },
  {
    id: 'PJLP',
    src: 'ਜਿਵ ਫੁਰਮਾਏ; ਤਿਵ ਤਿਵ ਪਾਹਿ ॥',
    pronunciation: 'jiv phuramāe; tiv tiv pāh ‖',
    translation: 'As He ordains, so do we receive.',
  },
  {
    id: '15VH',
    src: 'ਜੇਤਾ ਕੀਤਾ; ਤੇਤਾ ਨਾਉ ॥',
    pronunciation: 'jetā kītā; tetā nāu ‖',
    translation: 'The created universe is the manifestation of Your Name.',
  },
  {
    id: '9D4Y',
    src: 'ਵਿਣੁ ਨਾਵੈ; ਨਾਹੀ ਕੋ ਥਾਉ ॥',
    pronunciation: 'viṇ nāvē; nāhī ko thāu ‖',
    translation: 'Without Your Name, there is no place at all.',
  },
  {
    id: '043J',
    src: 'ਕੁਦਰਤਿ ਕਵਣ; ਕਹਾ ਵੀਚਾਰੁ ॥',
    pronunciation: 'kudarat kawaṇ; kahā vīcār ‖',
    translation: 'How can I describe Your Creative Power?',
  },
  {
    id: '8F4V',
    src: 'ਵਾਰਿਆ ਨ ਜਾਵਾ; ਏਕ ਵਾਰ ॥',
    pronunciation: 'vāriā na jāvā; ek vār ‖',
    translation: 'I cannot even once be a sacrifice to You.',
  },
  {
    id: 'BTSX',
    src: 'ਜੋ ਤੁਧੁ ਭਾਵੈ; ਸਾਈ ਭਲੀ ਕਾਰ ॥',
    pronunciation: 'jo tudh bhāvē; sāī bhalī kār ‖',
    translation: 'Whatever pleases You is the only good done,',
  },
  {
    id: '15AZ',
    src: 'ਤੂ ਸਦਾ ਸਲਾਮਤਿ; ਨਿਰੰਕਾਰ ॥੧੯॥',
    pronunciation: 'tū sadā salāmati; nirañkār ‖19‖',
    translation: 'You, Eternal and Formless One. ||19||',
  },
  {
    id: '6FSH',
    src: 'ਭਰੀਐ ਹਥੁ ਪੈਰੁ; ਤਨੁ ਦੇਹ ॥',
    pronunciation: 'bharīē hath pēru; tan deh ‖',
    translation: 'When the hands and the feet and the body are dirty,',
  },
  {
    id: '22V7',
    src: 'ਪਾਣੀ ਧੋਤੈ; ਉਤਰਸੁ ਖੇਹ ॥',
    pronunciation: 'pāṇī dhotē; utaras kheh ‖',
    translation: 'water can wash away the dirt.',
  },
  {
    id: 'LD59',
    src: 'ਮੂਤ ਪਲੀਤੀ; ਕਪੜੁ ਹੋਇ ॥',
    pronunciation: 'mūt palītī; kapaṛ hoi ‖',
    translation: 'When the clothes are soiled and stained by urine,',
  },
  {
    id: 'AXQC',
    src: 'ਦੇ ਸਾਬੂਣੁ; ਲਈਐ ਓਹੁ ਧੋਇ ॥',
    pronunciation: 'de sābūṇu; laīē oh dhoi ‖',
    translation: 'soap can wash them clean.',
  },
  {
    id: '3R6D',
    src: 'ਭਰੀਐ ਮਤਿ; ਪਾਪਾ ਕੈ ਸੰਗਿ ॥',
    pronunciation: 'bharīē mati; pāpā kē sañg ‖',
    translation: 'But when the intellect is stained and polluted by sin,',
  },
  {
    id: 'H2Z4',
    src: 'ਓਹੁ ਧੋਪੈ; ਨਾਵੈ ਕੈ ਰੰਗਿ ॥',
    pronunciation: 'oh dhopē; nāvē kē rañg ‖',
    translation: 'it can only be cleansed by the Love of the Name.',
  },
  {
    id: '5AWU',
    src: 'ਪੁੰਨੀ ਪਾਪੀ; ਆਖਣੁ ਨਾਹਿ ॥',
    pronunciation: 'puñnī pāpī; ākhaṇ nāh ‖',
    translation: 'Virtue and vice do not come by mere words;',
  },
  {
    id: '1U42',
    src: 'ਕਰਿ ਕਰਿ ਕਰਣਾ; ਲਿਖਿ ਲੈ ਜਾਹੁ ॥',
    pronunciation: 'kar kar karaṇā; likh lē jāh ‖',
    translation:
      'actions repeated, over and over again, are engraved on the soul.',
  },
  {
    id: 'VCR2',
    src: 'ਆਪੇ ਬੀਜਿ; ਆਪੇ ਹੀ ਖਾਹੁ ॥',
    pronunciation: 'āpe bīji; āpe hī khāh ‖',
    translation: 'You shall harvest what you plant.',
  },
  {
    id: 'JQ73',
    src: 'ਨਾਨਕ; ਹੁਕਮੀ ਆਵਹੁ ਜਾਹੁ ॥੨੦॥',
    pronunciation: 'nānak; hukamī āwah jāh ‖20‖',
    translation:
      "O Nanak, by the Hukam of God's Command, we come and go in reincarnation. ||20||",
  },
  {
    id: '9RPP',
    src: 'ਤੀਰਥੁ ਤਪੁ; ਦਇਆ ਦਤੁ ਦਾਨੁ ॥',
    pronunciation: 'tīrath tapu; daiā dat dān ‖',
    translation: 'Pilgrimages, austere discipline, compassion and charity',
  },
  {
    id: '79QT',
    src: 'ਜੇ ਕੋ ਪਾਵੈ; ਤਿਲ ਕਾ ਮਾਨੁ ॥',
    pronunciation: 'je ko pāvē; til kā mān ‖',
    translation: 'these, by themselves, bring only an iota of merit.',
  },
  {
    id: 'ND4F',
    src: 'ਸੁਣਿਆ ਮੰਨਿਆ; ਮਨਿ ਕੀਤਾ ਭਾਉ ॥',
    pronunciation: 'suṇiā mañniā; man kītā bhāu ‖',
    translation: 'Listening and believing with love and humility in your mind,',
  },
  {
    id: 'W7L9',
    src: 'ਅੰਤਰਗਤਿ; ਤੀਰਥਿ ਮਲਿ ਨਾਉ ॥',
    pronunciation: 'añtaragati; tīrath mal nāu ‖',
    translation:
      'cleanse yourself with the Name, at the sacred shrine deep within.',
  },
  {
    id: '6MYT',
    src: 'ਸਭਿ ਗੁਣ ਤੇਰੇ; ਮੈ ਨਾਹੀ ਕੋਇ ॥',
    pronunciation: 'sabh guṇ tere; mē nāhī koi ‖',
    translation: 'All virtues are Yours, Lord, I have none at all.',
  },
  {
    id: 'BCM6',
    src: 'ਵਿਣੁ ਗੁਣ ਕੀਤੇ; ਭਗਤਿ ਨ ਹੋਇ ॥',
    pronunciation: 'viṇ guṇ kīte; bhagat na hoi ‖',
    translation: 'Without virtue, there is no devotional worship.',
  },
  {
    id: 'E30D',
    src: 'ਸੁਅਸਤਿ ਆਥਿ; ਬਾਣੀ ਬਰਮਾਉ ॥',
    pronunciation: 'suasat āthi; bāṇī baramāu ‖',
    translation:
      'I bow to the Lord of the World, to His Word, to Brahma the Creator.',
  },
  {
    id: '4SDK',
    src: 'ਸਤਿ ਸੁਹਾਣੁ; ਸਦਾ ਮਨਿ ਚਾਉ ॥',
    pronunciation: 'sat suhāṇu; sadā man cāu ‖',
    translation: 'He is Beautiful, True and Eternally Joyful.',
  },
  {
    id: 'V7HC',
    src: 'ਕਵਣੁ ਸੁ ਵੇਲਾ, ਵਖਤੁ ਕਵਣੁ; ਕਵਣ ਥਿਤਿ, ਕਵਣੁ ਵਾਰੁ ॥',
    pronunciation: 'kawaṇ sa velā, wakhat kawaṇu; kawaṇ thiti, kawaṇ vār ‖',
    translation:
      'What was that time, and what was that moment? What was that day, and what was that date?',
  },
  {
    id: 'G0TE',
    src: 'ਕਵਣਿ ਸਿ ਰੁਤੀ. ਮਾਹੁ ਕਵਣੁ; ਜਿਤੁ ਹੋਆ ਆਕਾਰੁ ॥',
    pronunciation: 'kawaṇ sa rutī. māh kawaṇu; jit hoā ākār ‖',
    translation:
      'What was that season, and what was that month, when the Universe was created?',
  },
  {
    id: 'WN0J',
    src: 'ਵੇਲ. ਨ ਪਾਈਆ ਪੰਡਤੀ; ਜਿ ਹੋਵੈ ਲੇਖੁ ਪੁਰਾਣੁ ॥',
    pronunciation: 'vel. na pāīā pañḍatī; ja hovē lekh purāṇ ‖',
    translation:
      'The Pandits, the religious scholars, cannot find that time, even if it is written in the Puraanas.',
  },
  {
    id: 'MP96',
    src: 'ਵਖਤੁ. ਨ ਪਾਇਓ ਕਾਦੀਆ; ਜਿ ਲਿਖਨਿ ਲੇਖੁ ਕੁਰਾਣੁ ॥',
    pronunciation: 'wakhatu. na pāio kādīā; ja likhan lekh kurāṇ ‖',
    translation: 'That time is not known to the Qazis, who study the Koran.',
  },
  {
    id: 'S0KM',
    src: 'ਥਿਤਿ ਵਾਰੁ ਨਾ ਜੋਗੀ ਜਾਣੈ; ਰੁਤਿ ਮਾਹੁ ਨਾ ਕੋਈ ॥',
    pronunciation: 'thit vār nā jogī jāṇē; rut māh nā koī ‖',
    translation:
      'The day and the date are not known to the Yogis, nor is the month or the season.',
  },
  {
    id: 'YXDC',
    src: 'ਜਾ ਕਰਤਾ, ਸਿਰਠੀ ਕਉ ਸਾਜੇ; ਆਪੇ ਜਾਣੈ ਸੋਈ ॥',
    pronunciation: 'jā karatā, siraṭhī kau sāje; āpe jāṇē soī ‖',
    translation: 'The Creator who created this creation-only He Himself knows.',
  },
  {
    id: 'XEQL',
    src: 'ਕਿਵ ਕਰਿ ਆਖਾ, ਕਿਵ ਸਾਲਾਹੀ; ਕਿਉ ਵਰਨੀ. ਕਿਵ ਜਾਣਾ ॥',
    pronunciation: 'kiv kar ākhā, kiv sālāhī; kiu waranī. kiv jāṇā ‖',
    translation:
      'How can we speak of Him? How can we praise Him? How can we describe Him? How can we know Him?',
  },
  {
    id: 'RW45',
    src: 'ਨਾਨਕ. ਆਖਣਿ ਸਭੁ ਕੋ ਆਖੈ; ਇਕ ਦੂ ਇਕੁ, ਸਿਆਣਾ ॥',
    pronunciation: 'nānak. ākhaṇ sabh ko ākhē; ik dū iku, siāṇā ‖',
    translation:
      'O Nanak, everyone speaks of Him, each one wiser than the rest.',
  },
  {
    id: 'FN4U',
    src: 'ਵਡਾ ਸਾਹਿਬੁ, ਵਡੀ ਨਾਈ; ਕੀਤਾ ਜਾ ਕਾ ਹੋਵੈ ॥',
    pronunciation: 'waḍā sāhibu, waḍī nāī; kītā jā kā hovē ‖',
    translation:
      'Great is the Master, Great is His Name. Whatever happens is according to His Will.',
  },
  {
    id: 'SM79',
    src: 'ਨਾਨਕ. ਜੇ ਕੋ ਆਪੌ ਜਾਣੈ; ਅਗੈ ਗਇਆ ਨ ਸੋਹੈ ॥੨੧॥',
    pronunciation: 'nānak. je ko āpō jāṇē; agē gaiā na sohē ‖21‖',
    translation:
      'O Nanak, one who claims to know everything shall not be decorated in the world hereafter. ||21||',
  },
  {
    id: 'YB5R',
    src: 'ਪਾਤਾਲਾ ਪਾਤਾਲ ਲਖ; ਆਗਾਸਾ ਆਗਾਸ ॥',
    pronunciation: 'pātālā pātāl lakh; āgāsā āgās ‖',
    translation:
      'There are nether worlds beneath nether worlds, and hundreds of thousands of heavenly worlds above.',
  },
  {
    id: 'CWGK',
    src: 'ਓੜਕ ਓੜਕ ਭਾਲਿ ਥਕੇ; ਵੇਦ ਕਹਨਿ ਇਕ ਵਾਤ ॥',
    pronunciation: 'oṛak oṛak bhāl thake; ved kahan ik vāt ‖',
    translation:
      'The Vedas say that you can search and search for them all, until you grow weary.',
  },
  {
    id: '2B00',
    src: 'ਸਹਸ ਅਠਾਰਹ ਕਹਨਿ ਕਤੇਬਾ; ਅਸੁਲੂ ਇਕੁ ਧਾਤੁ ॥',
    pronunciation: 'sahas aṭhārah kahan katebā; asulū ik dhāt ‖',
    translation:
      'The scriptures say that there are 18,000 worlds, but in reality, there is only One Universe.',
  },
  {
    id: '1H1W',
    src: 'ਲੇਖਾ ਹੋਇ ਤ ਲਿਖੀਐ; ਲੇਖੈ ਹੋਇ ਵਿਣਾਸੁ ॥',
    pronunciation: 'lekhā hoi ta likhīē; lekhē hoi viṇās ‖',
    translation:
      'If you try to write an account of this, you will surely finish yourself before you finish writing it.',
  },
  {
    id: 'WR3V',
    src: 'ਨਾਨਕ. ਵਡਾ ਆਖੀਐ; ਆਪੇ ਜਾਣੈ ਆਪੁ ॥੨੨॥',
    pronunciation: 'nānak. waḍā ākhīē; āpe jāṇē āp ‖22‖',
    translation: 'O Nanak, call Him Great! He Himself knows Himself. ||22||',
  },
  {
    id: 'YTFR',
    src: 'ਸਾਲਾਹੀ ਸਾਲਾਹਿ; ਏਤੀ ਸੁਰਤਿ ਨ ਪਾਈਆ ॥',
    pronunciation: 'sālāhī sālāhi; etī surat na pāīā ‖',
    translation:
      'The praisers praise the Lord, but they do not obtain intuitive understanding',
  },
  {
    id: '5WQP',
    src: 'ਨਦੀਆ ਅਤੈ ਵਾਹ; ਪਵਹਿ ਸਮੁੰਦਿ, ਨ ਜਾਣੀਅਹਿ ॥',
    pronunciation: 'nadīā atē vāh; pawah samuñdi, na jāṇīah ‖',
    translation:
      'the streams and rivers flowing into the ocean do not know its vastness.',
  },
  {
    id: 'X2T8',
    src: 'ਸਮੁੰਦ ਸਾਹ ਸੁਲਤਾਨ; ਗਿਰਹਾ ਸੇਤੀ ਮਾਲੁ ਧਨੁ ॥',
    pronunciation: 'samuñd sāh sulatān; girahā setī māl dhan ‖',
    translation:
      'Even kings and emperors, with mountains of property and oceans of wealth',
  },
  {
    id: '5K0J',
    src: 'ਕੀੜੀ ਤੁਲਿ ਨ ਹੋਵਨੀ; ਜੇ ਤਿਸੁ, ਮਨਹੁ ਨ ਵੀਸਰਹਿ ॥੨੩॥',
    pronunciation: 'kīṛī tul na howanī; je tisu, manah na vīsarah ‖23‖',
    translation:
      '-these are not even equal to an ant, who does not forget God. ||23||',
  },
  {
    id: '40DA',
    src: 'ਅੰਤੁ ਨ. ਸਿਫਤੀ; ਕਹਣਿ. ਨ ਅੰਤੁ ॥',
    pronunciation: 'añt n. siphatī; kahaṇi. na añt ‖',
    translation: 'Endless are His Praises, endless are those who speak them.',
  },
  {
    id: 'VKD8',
    src: 'ਅੰਤੁ ਨ. ਕਰਣੈ; ਦੇਣਿ. ਨ ਅੰਤੁ ॥',
    pronunciation: 'añt n. karaṇē; deṇi. na añt ‖',
    translation: 'Endless are His Actions, endless are His Gifts.',
  },
  {
    id: 'X8NU',
    src: 'ਅੰਤੁ ਨ. ਵੇਖਣਿ; ਸੁਣਣਿ. ਨ ਅੰਤੁ ॥',
    pronunciation: 'añt n. vekhaṇi; suṇaṇi. na añt ‖',
    translation: 'Endless is His Vision, endless is His Hearing.',
  },
  {
    id: 'N8DF',
    src: 'ਅੰਤੁ ਨ ਜਾਪੈ; ਕਿਆ ਮਨਿ ਮੰਤੁ ॥',
    pronunciation: 'añt na jāpē; kiā man mañt ‖',
    translation:
      'His limits cannot be perceived. What is the Mystery of His Mind?',
  },
  {
    id: 'WHBU',
    src: 'ਅੰਤੁ ਨ ਜਾਪੈ; ਕੀਤਾ ਆਕਾਰੁ ॥',
    pronunciation: 'añt na jāpē; kītā ākār ‖',
    translation: 'The limits of the created universe cannot be perceived.',
  },
  {
    id: '5T92',
    src: 'ਅੰਤੁ ਨ ਜਾਪੈ ਪਾਰਾਵਾਰੁ ॥',
    pronunciation: 'añt na jāpē pārāvār ‖',
    translation: 'Its limits here and beyond cannot be perceived.',
  },
  {
    id: 'LDZY',
    src: 'ਅੰਤ ਕਾਰਣਿ; ਕੇਤੇ ਬਿਲਲਾਹਿ ॥',
    pronunciation: 'añt kāraṇi; kete bilalāh ‖',
    translation: 'Many struggle to know His limits,',
  },
  {
    id: 'J73M',
    src: 'ਤਾ ਕੇ ਅੰਤ; ਨ ਪਾਏ ਜਾਹਿ ॥',
    pronunciation: 'tā ke añt; na pāe jāh ‖',
    translation: 'but His limits cannot be found.',
  },
  {
    id: 'CXK7',
    src: 'ਏਹੁ ਅੰਤੁ; ਨ ਜਾਣੈ ਕੋਇ ॥',
    pronunciation: 'eh añtu; na jāṇē koi ‖',
    translation: 'No one can know these limits.',
  },
  {
    id: 'WRQ5',
    src: 'ਬਹੁਤਾ ਕਹੀਐ; ਬਹੁਤਾ ਹੋਇ ॥',
    pronunciation: 'bahutā kahīē; bahutā hoi ‖',
    translation:
      'The more you say about them, the more there still remains to be said.',
  },
  {
    id: '0W15',
    src: 'ਵਡਾ ਸਾਹਿਬੁ; ਊਚਾ ਥਾਉ ॥',
    pronunciation: 'waḍā sāhibu; ūcā thāu ‖',
    translation: 'Great is the Master, High is His Heavenly Home.',
  },
  {
    id: 'E6WZ',
    src: 'ਊਚੇ ਉਪਰਿ; ਊਚਾ ਨਾਉ ॥',
    pronunciation: 'ūce upari; ūcā nāu ‖',
    translation: 'Highest of the High, above all is His Name.',
  },
  {
    id: 'BLFR',
    src: 'ਏਵਡੁ ਊਚਾ; ਹੋਵੈ ਕੋਇ ॥',
    pronunciation: 'ewaḍ ūcā; hovē koi ‖',
    translation: 'Only one as Great and as High as God',
  },
  {
    id: 'J79G',
    src: 'ਤਿਸੁ ਊਚੇ ਕਉ; ਜਾਣੈ ਸੋਇ ॥',
    pronunciation: 'tis ūce kau; jāṇē soi ‖',
    translation: 'can know His Lofty and Exalted State.',
  },
  {
    id: 'RMD4',
    src: 'ਜੇਵਡੁ ਆਪਿ; ਜਾਣੈ ਆਪਿ ਆਪਿ ॥',
    pronunciation: 'jewaḍ āpi; jāṇē āp āp ‖',
    translation: 'Only He Himself is that Great. He Himself knows Himself.',
  },
  {
    id: 'W145',
    src: 'ਨਾਨਕ ਨਦਰੀ; ਕਰਮੀ ਦਾਤਿ ॥੨੪॥',
    pronunciation: 'nānak nadarī; karamī dāt ‖24‖',
    translation:
      'O Nanak, by His Glance of Grace, He bestows His Blessings. ||24||',
  },
  {
    id: 'YXH5',
    src: 'ਬਹੁਤਾ ਕਰਮੁ; ਲਿਖਿਆ ਨਾ ਜਾਇ ॥',
    pronunciation: 'bahutā karamu; likhiā nā jāi ‖',
    translation:
      'His Blessings are so abundant that there can be no written account of them.',
  },
  {
    id: 'QRM0',
    src: 'ਵਡਾ ਦਾਤਾ; ਤਿਲੁ ਨ ਤਮਾਇ ॥',
    pronunciation: 'waḍā dātā; til na tamāi ‖',
    translation: 'The Great Giver does not hold back anything.',
  },
  {
    id: '8F5K',
    src: 'ਕੇਤੇ ਮੰਗਹਿ; ਜੋਧ ਅਪਾਰ ॥',
    pronunciation: 'kete mañgahi; jodh apār ‖',
    translation:
      'There are so many great, heroic warriors begging at the Door of the Infinite Lord.',
  },
  {
    id: 'WATD',
    src: 'ਕੇਤਿਆ ਗਣਤ; ਨਹੀ ਵੀਚਾਰੁ ॥',
    pronunciation: 'ketiā gaṇat; nahī vīcār ‖',
    translation:
      'So many contemplate and dwell upon Him, that they cannot be counted.',
  },
  {
    id: 'E536',
    src: 'ਕੇਤੇ; ਖਪਿ ਤੁਟਹਿ ਵੇਕਾਰ ॥',
    pronunciation: 'kete; khap tuṭah vekār ‖',
    translation: 'So many waste away to death engaged in corruption.',
  },
  {
    id: 'MZZ6',
    src: 'ਕੇਤੇ; ਲੈ ਲੈ ਮੁਕਰੁ ਪਾਹਿ ॥',
    pronunciation: 'kete; lē lē mukar pāh ‖',
    translation: 'So many take and take again, and then deny receiving.',
  },
  {
    id: '3N29',
    src: 'ਕੇਤੇ ਮੂਰਖ; ਖਾਹੀ ਖਾਹਿ ॥',
    pronunciation: 'kete mūrakh; khāhī khāh ‖',
    translation: 'So many foolish consumers keep on consuming.',
  },
  {
    id: 'TRBN',
    src: 'ਕੇਤਿਆ; ਦੂਖ ਭੂਖ ਸਦ ਮਾਰ ॥',
    pronunciation: 'ketiā; dūkh bhūkh sad mār ‖',
    translation: 'So many endure distress, deprivation and constant abuse.',
  },
  {
    id: '5AFL',
    src: 'ਏਹਿ ਭਿ ਦਾਤਿ ਤੇਰੀ; ਦਾਤਾਰ ॥',
    pronunciation: 'eh bha dāt terī; dātār ‖',
    translation: 'Even these are Your Gifts, O Great Giver!',
  },
  {
    id: 'W1JH',
    src: 'ਬੰਦਿ ਖਲਾਸੀ; ਭਾਣੈ ਹੋਇ ॥',
    pronunciation: 'bañd khalāsī; bhāṇē hoi ‖',
    translation: 'Liberation from bondage comes only by Your Will.',
  },
  {
    id: '85FC',
    src: 'ਹੋਰੁ; ਆਖਿ ਨ ਸਕੈ ਕੋਇ ॥',
    pronunciation: 'horu; ākh na sakē koi ‖',
    translation: 'No one else has any say in this.',
  },
  {
    id: '7AFD',
    src: 'ਜੇ ਕੋ ਖਾਇਕੁ; ਆਖਣਿ ਪਾਇ ॥',
    pronunciation: 'je ko khāiku; ākhaṇ pāi ‖',
    translation: 'If some fool should presume to say that he does,',
  },
  {
    id: 'R3S4',
    src: 'ਓਹੁ ਜਾਣੈ; ਜੇਤੀਆ ਮੁਹਿ ਖਾਇ ॥',
    pronunciation: 'oh jāṇē; jetīā muh khāi ‖',
    translation: 'he shall learn, and feel the effects of his folly.',
  },
  {
    id: 'GXTL',
    src: 'ਆਪੇ ਜਾਣੈ; ਆਪੇ ਦੇਇ ॥',
    pronunciation: 'āpe jāṇē; āpe dei ‖',
    translation: 'He Himself knows, He Himself gives.',
  },
  {
    id: 'JWU4',
    src: 'ਆਖਹਿ; ਸਿ ਭਿ ਕੇਈ ਕੇਇ ॥',
    pronunciation: 'ākhahi; sa bh keī kei ‖',
    translation: 'Few, very few are those who acknowledge this.',
  },
  {
    id: 'ZDF9',
    src: 'ਜਿਸ ਨੋ ਬਖਸੇ; ਸਿਫਤਿ ਸਾਲਾਹ ॥',
    pronunciation: 'jis no bakhase; siphat sālāh ‖',
    translation: 'One who is blessed to sing the Praises of the Lord,',
  },
  {
    id: 'B8J0',
    src: 'ਨਾਨਕ; ਪਾਤਿਸਾਹੀ ਪਾਤਿਸਾਹੁ ॥੨੫॥',
    pronunciation: 'nānak; pātisāhī pātisāh ‖25‖',
    translation: 'O Nanak, is the king of kings. ||25||',
  },
  {
    id: 'MU2K',
    src: 'ਅਮੁਲ ਗੁਣ; ਅਮੁਲ ਵਾਪਾਰ ॥',
    pronunciation: 'amul guṇ; amul vāpār ‖',
    translation: 'Priceless are His Virtues, Priceless are His Dealings.',
  },
  {
    id: 'XEQ3',
    src: 'ਅਮੁਲ ਵਾਪਾਰੀਏ; ਅਮੁਲ ਭੰਡਾਰ ॥',
    pronunciation: 'amul vāpārīe; amul bhañḍār ‖',
    translation: 'Priceless are His Dealers, Priceless are His Treasures.',
  },
  {
    id: 'EU2A',
    src: 'ਅਮੁਲ ਆਵਹਿ; ਅਮੁਲ ਲੈ ਜਾਹਿ ॥',
    pronunciation: 'amul āwahi; amul lē jāh ‖',
    translation:
      'Priceless are those who come to Him, Priceless are those who buy from Him.',
  },
  {
    id: 'T80Z',
    src: 'ਅਮੁਲ ਭਾਇ; ਅਮੁਲਾ ਸਮਾਹਿ ॥',
    pronunciation: 'amul bhāi; amulā samāh ‖',
    translation: 'Priceless is Love for Him, Priceless is absorption into Him.',
  },
  {
    id: '0T04',
    src: 'ਅਮੁਲੁ ਧਰਮੁ; ਅਮੁਲੁ ਦੀਬਾਣੁ ॥',
    pronunciation: 'amul dharamu; amul dībāṇ ‖',
    translation:
      'Priceless is the Divine Law of Dharma, Priceless is the Divine Court of Justice.',
  },
  {
    id: 'YH93',
    src: 'ਅਮੁਲੁ ਤੁਲੁ; ਅਮੁਲੁ ਪਰਵਾਣੁ ॥',
    pronunciation: 'amul tulu; amul paravāṇ ‖',
    translation: 'Priceless are the scales, priceless are the weights.',
  },
  {
    id: '7UZX',
    src: 'ਅਮੁਲੁ ਬਖਸੀਸ; ਅਮੁਲੁ ਨੀਸਾਣੁ ॥',
    pronunciation: 'amul bakhasīs; amul nīsāṇ ‖',
    translation:
      'Priceless are His Blessings, Priceless is His Banner and Insignia.',
  },
  {
    id: 'NKLS',
    src: 'ਅਮੁਲੁ ਕਰਮੁ; ਅਮੁਲੁ ਫੁਰਮਾਣੁ ॥',
    pronunciation: 'amul karamu; amul phuramāṇ ‖',
    translation: 'Priceless is His Mercy, Priceless is His Royal Command.',
  },
  {
    id: 'ABFZ',
    src: 'ਅਮੁਲੋ ਅਮੁਲੁ; ਆਖਿਆ ਨ ਜਾਇ ॥',
    pronunciation: 'amulo amulu; ākhiā na jāi ‖',
    translation: 'Priceless, O Priceless beyond expression!',
  },
  {
    id: 'D11C',
    src: 'ਆਖਿ ਆਖਿ; ਰਹੇ ਲਿਵ ਲਾਇ ॥',
    pronunciation: 'ākh ākhi; rahe liv lāi ‖',
    translation: 'Speak of Him continually, and remain absorbed in His Love.',
  },
  {
    id: '99JY',
    src: 'ਆਖਹਿ ਵੇਦ; ਪਾਠ ਪੁਰਾਣ ॥',
    pronunciation: 'ākhah ved; pāṭh purāṇ ‖',
    translation: 'The Vedas and the Puraanas speak.',
  },
  {
    id: 'ZEVZ',
    src: 'ਆਖਹਿ; ਪੜੇ ਕਰਹਿ ਵਖਿਆਣ ॥',
    pronunciation: 'ākhahi; paṛe karah wakhiāṇ ‖',
    translation: 'The scholars speak and lecture.',
  },
  {
    id: 'FDPH',
    src: 'ਆਖਹਿ ਬਰਮੇ; ਆਖਹਿ ਇੰਦ ॥',
    pronunciation: 'ākhah barame; ākhah iñd ‖',
    translation: 'Brahma speaks, Indra speaks.',
  },
  {
    id: 'WTLL',
    src: 'ਆਖਹਿ ਗੋਪੀ; ਤੈ ਗੋਵਿੰਦ ॥',
    pronunciation: 'ākhah gopī; tē goviñd ‖',
    translation: 'The Gopis and Krishna speak.',
  },
  {
    id: 'Q9NN',
    src: 'ਆਖਹਿ ਈਸਰ; ਆਖਹਿ ਸਿਧ ॥',
    pronunciation: 'ākhah īsar; ākhah sidh ‖',
    translation: 'Shiva speaks, the Siddhas speak.',
  },
  {
    id: 'SQND',
    src: 'ਆਖਹਿ; ਕੇਤੇ ਕੀਤੇ ਬੁਧ ॥',
    pronunciation: 'ākhahi; kete kīte budh ‖',
    translation: 'The many created Buddhas speak.',
  },
  {
    id: 'ABKG',
    src: 'ਆਖਹਿ ਦਾਨਵ; ਆਖਹਿ ਦੇਵ ॥',
    pronunciation: 'ākhah dānav; ākhah dev ‖',
    translation: 'The demons speak, the demi-gods speak.',
  },
  {
    id: 'M8B4',
    src: 'ਆਖਹਿ ਸੁਰਿ ਨਰ; ਮੁਨਿ ਜਨ ਸੇਵ ॥',
    pronunciation: 'ākhah sur nar; mun jan sev ‖',
    translation:
      'The spiritual warriors, the heavenly beings, the silent sages, the humble and serviceful speak.',
  },
  {
    id: '3XVL',
    src: 'ਕੇਤੇ ਆਖਹਿ; ਆਖਣਿ ਪਾਹਿ ॥',
    pronunciation: 'kete ākhahi; ākhaṇ pāh ‖',
    translation: 'Many speak and try to describe Him.',
  },
  {
    id: '71Q6',
    src: 'ਕੇਤੇ ਕਹਿ ਕਹਿ; ਉਠਿ ਉਠਿ ਜਾਹਿ ॥',
    pronunciation: 'kete kah kahi; uṭh uṭh jāh ‖',
    translation:
      'Many have spoken of Him over and over again, and have then arisen and departed.',
  },
  {
    id: '4YZF',
    src: 'ਏਤੇ ਕੀਤੇ; ਹੋਰਿ ਕਰੇਹਿ ॥',
    pronunciation: 'ete kīte; hor kareh ‖',
    translation: 'If He were to create as many again as there already are,',
  },
  {
    id: 'F5CB',
    src: 'ਤਾ. ਆਖਿ ਨ ਸਕਹਿ; ਕੇਈ ਕੇਇ ॥',
    pronunciation: 'tā. ākh na sakahi; keī kei ‖',
    translation: 'even then, they could not describe Him.',
  },
  {
    id: 'M1HS',
    src: 'ਜੇਵਡੁ ਭਾਵੈ; ਤੇਵਡੁ ਹੋਇ ॥',
    pronunciation: 'jewaḍ bhāvē; tewaḍ hoi ‖',
    translation: 'He is as Great as He wishes to be.',
  },
  {
    id: 'JCDQ',
    src: 'ਨਾਨਕ ਜਾਣੈ; ਸਾਚਾ ਸੋਇ ॥',
    pronunciation: 'nānak jāṇē; sācā soi ‖',
    translation: 'O Nanak, the True Lord knows.',
  },
  {
    id: '33KG',
    src: 'ਜੇ ਕੋ ਆਖੈ; ਬੋਲੁਵਿਗਾੜੁ ॥',
    pronunciation: 'je ko ākhē; boluvigāṛ ‖',
    translation: 'If anyone presumes to describe God,',
  },
  {
    id: 'G676',
    src: 'ਤਾ ਲਿਖੀਐ; ਸਿਰਿ ਗਾਵਾਰਾ ਗਾਵਾਰੁ ॥੨੬॥',
    pronunciation: 'tā likhīē; sir gāvārā gāvār ‖26‖',
    translation: 'he shall be known as the greatest fool of fools! ||26||',
  },
  {
    id: 'G6UD',
    src: 'ਸੋ ਦਰੁ ਕੇਹਾ, ਸੋ ਘਰੁ ਕੇਹਾ; ਜਿਤੁ ਬਹਿ ਸਰਬ ਸਮਾਲੇ ॥',
    pronunciation: 'so dar kehā, so ghar kehā; jit bah sarab samāle ‖',
    translation:
      'Where is that Gate, and where is that Dwelling, in which You sit and take care of all?',
  },
  {
    id: '3HYE',
    src: 'ਵਾਜੇ ਨਾਦ ਅਨੇਕ ਅਸੰਖਾ; ਕੇਤੇ ਵਾਵਣਹਾਰੇ ॥',
    pronunciation: 'vāje nād anek asañkhā; kete vāwaṇahāre ‖',
    translation:
      'The Sound-current of the Naad vibrates there, and countless musicians play on all sorts of instruments there.',
  },
  {
    id: '4DUL',
    src: 'ਕੇਤੇ. ਰਾਗ ਪਰੀ ਸਿਉ ਕਹੀਅਨਿ; ਕੇਤੇ ਗਾਵਣਹਾਰੇ ॥',
    pronunciation: 'kete. rāg parī siu kahīani; kete gāwaṇahāre ‖',
    translation: 'So many Ragas, so many musicians singing there.',
  },
  {
    id: 'WXCD',
    src: 'ਗਾਵਹਿ ਤੁਹਨੋ ਪਉਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ; ਗਾਵੈ ਰਾਜਾ ਧਰਮੁ ਦੁਆਰੇ ॥',
    pronunciation: 'gāwah tuhano pauṇ pāṇī bēsañtaru; gāvē rājā dharam duāre ‖',
    translation:
      'The praanic wind, water and fire sing; the Righteous Judge of Dharma sings at Your Door.',
  },
  {
    id: 'VNN6',
    src: 'ਗਾਵਹਿ ਚਿਤੁ ਗੁਪਤੁ, ਲਿਖਿ ਜਾਣਹਿ; ਲਿਖਿ ਲਿਖਿ ਧਰਮੁ ਵੀਚਾਰੇ ॥',
    pronunciation: 'gāwah cit gupatu, likh jāṇahi; likh likh dharam vīcāre ‖',
    translation:
      'Chitr and Gupt, the angels of the conscious and the subconscious who record actions, and the Righteous Judge of Dharma who judges this record sing.',
  },
  {
    id: '6DR6',
    src: 'ਗਾਵਹਿ ਈਸਰੁ ਬਰਮਾ ਦੇਵੀ; ਸੋਹਨਿ ਸਦਾ ਸਵਾਰੇ ॥',
    pronunciation: 'gāwah īsar baramā devī; sohan sadā savāre ‖',
    translation: 'Shiva, Brahma and the Goddess of Beauty, ever adorned, sing.',
  },
  {
    id: 'SLHX',
    src: 'ਗਾਵਹਿ ਇੰਦ, ਇਦਾਸਣਿ ਬੈਠੇ; ਦੇਵਤਿਆ ਦਰਿ ਨਾਲੇ ॥',
    pronunciation: 'gāwah iñd, idāsaṇ bēṭhe; dewatiā dar nāle ‖',
    translation:
      'Indra, seated upon His Throne, sings with the deities at Your Door.',
  },
  {
    id: 'TAMR',
    src: 'ਗਾਵਹਿ ਸਿਧ. ਸਮਾਧੀ ਅੰਦਰਿ; ਗਾਵਨਿ ਸਾਧ ਵਿਚਾਰੇ ॥',
    pronunciation: 'gāwah sidh. samādhī añdari; gāwan sādh vicāre ‖',
    translation:
      'The Siddhas in Samaadhi sing; the Saadhus sing in contemplation.',
  },
  {
    id: 'Z22B',
    src: 'ਗਾਵਨਿ ਜਤੀ ਸਤੀ ਸੰਤੋਖੀ; ਗਾਵਹਿ ਵੀਰ ਕਰਾਰੇ ॥',
    pronunciation: 'gāwan jatī satī sañtokhī; gāwah vīr karāre ‖',
    translation:
      'The celibates, the fanatics, the peacefully accepting and the fearless warriors sing.',
  },
  {
    id: 'NU8S',
    src: 'ਗਾਵਨਿ ਪੰਡਿਤ ਪੜਨਿ ਰਖੀਸਰ; ਜੁਗੁ ਜੁਗੁ ਵੇਦਾ ਨਾਲੇ ॥',
    pronunciation: 'gāwan pañḍit paṛan rakhīsar; jug jug vedā nāle ‖',
    translation:
      'The Pandits, the religious scholars who recite the Vedas, with the supreme sages of all the ages, sing.',
  },
  {
    id: 'BZ16',
    src: 'ਗਾਵਹਿ ਮੋਹਣੀਆ ਮਨੁ ਮੋਹਨਿ; ਸੁਰਗਾ ਮਛ ਪਇਆਲੇ ॥',
    pronunciation: 'gāwah mohaṇīā man mohani; suragā mach paiāle ‖',
    translation:
      'The Mohinis, the enchanting heavenly beauties who entice hearts in this world, in paradise, and in the underworld of the subconscious sing.',
  },
  {
    id: 'RURG',
    src: 'ਗਾਵਨਿ ਰਤਨ ਉਪਾਏ ਤੇਰੇ; ਅਠਸਠਿ ਤੀਰਥ ਨਾਲੇ ॥',
    pronunciation: 'gāwan ratan upāe tere; aṭhasaṭh tīrath nāle ‖',
    translation:
      'The celestial jewels created by You, and the sixty-eight holy places of pilgrimage sing.',
  },
  {
    id: 'T08A',
    src: 'ਗਾਵਹਿ ਜੋਧ ਮਹਾਬਲ ਸੂਰਾ; ਗਾਵਹਿ ਖਾਣੀ ਚਾਰੇ ॥',
    pronunciation: 'gāwah jodh mahābal sūrā; gāwah khāṇī cāre ‖',
    translation:
      'The brave and mighty warriors sing; the spiritual heroes and the four sources of creation sing.',
  },
  {
    id: '99PA',
    src: 'ਗਾਵਹਿ ਖੰਡ ਮੰਡਲ ਵਰਭੰਡਾ; ਕਰਿ ਕਰਿ ਰਖੇ ਧਾਰੇ ॥',
    pronunciation: 'gāwah khañḍ mañḍal warabhañḍā; kar kar rakhe dhāre ‖',
    translation:
      'The planets, solar systems and galaxies, created and arranged by Your Hand, sing.',
  },
  {
    id: 'SP1N',
    src: 'ਸੇਈ ਤੁਧੁਨੋ ਗਾਵਹਿ, ਜੋ ਤੁਧੁ ਭਾਵਨਿ; ਰਤੇ ਤੇਰੇ ਭਗਤ ਰਸਾਲੇ ॥',
    pronunciation:
      'seī tudhuno gāwahi, jo tudh bhāwani; rate tere bhagat rasāle ‖',
    translation:
      'They alone sing, who are pleasing to Your Will. Your devotees are imbued with the Nectar of Your Essence.',
  },
  {
    id: 'TB32',
    src: 'ਹੋਰਿ ਕੇਤੇ ਗਾਵਨਿ, ਸੇ. ਮੈ ਚਿਤਿ ਨ ਆਵਨਿ; ਨਾਨਕੁ. ਕਿਆ ਵੀਚਾਰੇ ॥',
    pronunciation: 'hor kete gāwani, se. mē cit na āwani; nānaku. kiā vīcāre ‖',
    translation:
      'So many others sing, they do not come to mind. O Nanak, how can I consider them all?',
  },
  {
    id: '3BSB',
    src: 'ਸੋਈ ਸੋਈ ਸਦਾ ਸਚੁ ਸਾਹਿਬੁ; ਸਾਚਾ ਸਾਚੀ ਨਾਈ ॥',
    pronunciation: 'soī soī sadā sac sāhibu; sācā sācī nāī ‖',
    translation: 'That True Lord is True, Forever True, and True is His Name.',
  },
  {
    id: 'Q2ZY',
    src: 'ਹੈ ਭੀ ਹੋਸੀ, ਜਾਇ ਨ ਜਾਸੀ; ਰਚਨਾ ਜਿਨਿ ਰਚਾਈ ॥',
    pronunciation: 'hē bhī hosī, jāi na jāsī; racanā jin racāī ‖',
    translation:
      'He is, and shall always be. He shall not depart, even when this Universe which He has created departs.',
  },
  {
    id: 'MC85',
    src: 'ਰੰਗੀ ਰੰਗੀ ਭਾਤੀ, ਕਰਿ ਕਰਿ ਜਿਨਸੀ; ਮਾਇਆ ਜਿਨਿ ਉਪਾਈ ॥',
    pronunciation: 'rañgī rañgī bhātī, kar kar jinasī; māiā jin upāī ‖',
    translation:
      'He created the world, with its various colors, species of beings, and the variety of Maya.',
  },
  {
    id: '9GWC',
    src: 'ਕਰਿ ਕਰਿ ਵੇਖੈ. ਕੀਤਾ ਆਪਣਾ; ਜਿਵ ਤਿਸ ਦੀ ਵਡਿਆਈ ॥',
    pronunciation: 'kar kar vekhē. kītā āpaṇā; jiv tis dī waḍiāī ‖',
    translation:
      'Having created the creation, He watches over it Himself, by His Greatness.',
  },
  {
    id: '5GNH',
    src: 'ਜੋ ਤਿਸੁ ਭਾਵੈ. ਸੋਈ ਕਰਸੀ; ਹੁਕਮੁ. ਨ ਕਰਣਾ ਜਾਈ ॥',
    pronunciation: 'jo tis bhāvē. soī karasī; hukamu. na karaṇā jāī ‖',
    translation: 'He does whatever He pleases. No order can be issued to Him.',
  },
  {
    id: 'DT5S',
    src: 'ਸੋ ਪਾਤਿਸਾਹੁ. ਸਾਹਾ ਪਾਤਿਸਾਹਿਬੁ; ਨਾਨਕ. ਰਹਣੁ ਰਜਾਈ ॥੨੭॥',
    pronunciation: 'so pātisāhu. sāhā pātisāhibu; nānak. rahaṇ rajāī ‖27‖',
    translation:
      'He is the King, the King of kings, the Supreme Lord and Master of kings. Nanak remains subject to His Will. ||27||',
  },
  {
    id: '2Y9L',
    src: 'ਮੁੰਦਾ ਸੰਤੋਖੁ, ਸਰਮੁ ਪਤੁ ਝੋਲੀ; ਧਿਆਨ ਕੀ. ਕਰਹਿ ਬਿਭੂਤਿ ॥',
    pronunciation: 'muñdā sañtokhu, saram pat jholī; dhiān kī. karah bibhūt ‖',
    translation:
      'Make contentment your ear-rings, humility your begging bowl, and meditation the ashes you apply to your body.',
  },
  {
    id: 'ZEPX',
    src: 'ਖਿੰਥਾ, ਕਾਲੁ ਕੁਆਰੀ ਕਾਇਆ; ਜੁਗਤਿ ਡੰਡਾ ਪਰਤੀਤਿ ॥',
    pronunciation: 'khiñthā, kāl kuārī kāiā; jugat ḍañḍā paratīt ‖',
    translation:
      'Let the remembrance of death be the patched coat you wear, let the purity of virginity be your way in the world, and let faith in the Lord be your walking stick.',
  },
  {
    id: 'UNDR',
    src: 'ਆਈ ਪੰਥੀ ਸਗਲ ਜਮਾਤੀ; ਮਨਿ ਜੀਤੈ ਜਗੁ ਜੀਤੁ ॥',
    pronunciation: 'āī pañthī sagal jamātī; man jītē jag jīt ‖',
    translation:
      'See the brotherhood of all mankind as the highest order of Yogis; conquer your own mind, and conquer the world.',
  },
  {
    id: 'CBB2',
    src: 'ਆਦੇਸੁ; ਤਿਸੈ ਆਦੇਸੁ ॥',
    pronunciation: 'ādesu; tisē ādes ‖',
    translation: 'I bow to Him, I humbly bow.',
  },
  {
    id: 'CBMX',
    src: 'ਆਦਿ ਅਨੀਲੁ. ਅਨਾਦਿ ਅਨਾਹਤਿ; ਜੁਗੁ ਜੁਗੁ ਏਕੋ ਵੇਸੁ ॥੨੮॥',
    pronunciation: 'ād anīlu. anād anāhati; jug jug eko ves ‖28‖',
    translation:
      'The Primal One, the Pure Light, without beginning, without end. Throughout all the ages, He is One and the Same. ||28||',
  },
  {
    id: 'FFJA',
    src: 'ਭੁਗਤਿ ਗਿਆਨੁ, ਦਇਆ ਭੰਡਾਰਣਿ; ਘਟਿ ਘਟਿ ਵਾਜਹਿ ਨਾਦ ॥',
    pronunciation: 'bhugat giānu, daiā bhañḍāraṇi; ghaṭ ghaṭ vājah nād ‖',
    translation:
      'Let spiritual wisdom be your food, and compassion your attendant. The Sound-current of the Naad vibrates in each and every heart.',
  },
  {
    id: '6V6K',
    src: 'ਆਪਿ ਨਾਥੁ, ਨਾਥੀ ਸਭ ਜਾ ਕੀ; ਰਿਧਿ ਸਿਧਿ ਅਵਰਾ ਸਾਦ ॥',
    pronunciation: 'āp nāthu, nāthī sabh jā kī; ridh sidh awarā sād ‖',
    translation:
      'He Himself is the Supreme Master of all; wealth and miraculous spiritual powers, and all other external tastes and pleasures, are all like beads on a string.',
  },
  {
    id: '8TCX',
    src: 'ਸੰਜੋਗੁ ਵਿਜੋਗੁ ਦੁਇ, ਕਾਰ ਚਲਾਵਹਿ; ਲੇਖੇ ਆਵਹਿ ਭਾਗ ॥',
    pronunciation: 'sañjog vijog dui, kār calāwahi; lekhe āwah bhāg ‖',
    translation:
      'Union with Him, and separation from Him, come by His Will. We come to receive what is written in our destiny.',
  },
  {
    id: '481K',
    src: 'ਆਦੇਸੁ; ਤਿਸੈ ਆਦੇਸੁ ॥',
    pronunciation: 'ādesu; tisē ādes ‖',
    translation: 'I bow to Him, I humbly bow.',
  },
  {
    id: '0QT9',
    src: 'ਆਦਿ ਅਨੀਲੁ. ਅਨਾਦਿ ਅਨਾਹਤਿ; ਜੁਗੁ ਜੁਗੁ ਏਕੋ ਵੇਸੁ ॥੨੯॥',
    pronunciation: 'ād anīlu. anād anāhati; jug jug eko ves ‖29‖',
    translation:
      'The Primal One, the Pure Light, without beginning, without end. Throughout all the ages, He is One and the Same. ||29||',
  },
  {
    id: '7F2E',
    src: 'ਏਕਾ ਮਾਈ. ਜੁਗਤਿ ਵਿਆਈ; ਤਿਨਿ ਚੇਲੇ ਪਰਵਾਣੁ ॥',
    pronunciation: 'ekā māī. jugat viāī; tin cele paravāṇ ‖',
    translation:
      'The One Divine Mother conceived and gave birth to the three deities.',
  },
  {
    id: 'VRZR',
    src: 'ਇਕੁ ਸੰਸਾਰੀ. ਇਕੁ ਭੰਡਾਰੀ; ਇਕੁ ਲਾਏ ਦੀਬਾਣੁ ॥',
    pronunciation: 'ik sañsārī. ik bhañḍārī; ik lāe dībāṇ ‖',
    translation:
      'One, the Creator of the World; One, the Sustainer; and One, the Destroyer.',
  },
  {
    id: '6Q3P',
    src: 'ਜਿਵ ਤਿਸੁ ਭਾਵੈ. ਤਿਵੈ ਚਲਾਵੈ; ਜਿਵ ਹੋਵੈ ਫੁਰਮਾਣੁ ॥',
    pronunciation: 'jiv tis bhāvē. tivē calāvē; jiv hovē phuramāṇ ‖',
    translation:
      'He makes things happen according to the Pleasure of His Will. Such is His Celestial Order.',
  },
  {
    id: 'YMXX',
    src: 'ਓਹੁ ਵੇਖੈ, ਓਨਾ ਨਦਰਿ ਨ ਆਵੈ; ਬਹੁਤਾ ਏਹੁ ਵਿਡਾਣੁ ॥',
    pronunciation: 'oh vekhē, onā nadar na āvē; bahutā eh viḍāṇ ‖',
    translation:
      'He watches over all, but none see Him. How wonderful this is!',
  },
  {
    id: 'A3DN',
    src: 'ਆਦੇਸੁ; ਤਿਸੈ ਆਦੇਸੁ ॥',
    pronunciation: 'ādesu; tisē ādes ‖',
    translation: 'I bow to Him, I humbly bow.',
  },
  {
    id: '2JDC',
    src: 'ਆਦਿ ਅਨੀਲੁ. ਅਨਾਦਿ ਅਨਾਹਤਿ; ਜੁਗੁ ਜੁਗੁ ਏਕੋ ਵੇਸੁ ॥੩੦॥',
    pronunciation: 'ād anīlu. anād anāhati; jug jug eko ves ‖30‖',
    translation:
      'The Primal One, the Pure Light, without beginning, without end. Throughout all the ages, He is One and the Same. ||30||',
  },
  {
    id: '6YHD',
    src: 'ਆਸਣੁ ਲੋਇ ਲੋਇ; ਭੰਡਾਰ ॥',
    pronunciation: 'āsaṇ loi loi; bhañḍār ‖',
    translation:
      'On world after world are His Seats of Authority and His Storehouses.',
  },
  {
    id: '3AYC',
    src: 'ਜੋ ਕਿਛੁ ਪਾਇਆ; ਸੁ ਏਕਾ ਵਾਰ ॥',
    pronunciation: 'jo kich pāiā; sa ekā vār ‖',
    translation: 'Whatever was put into them, was put there once and for all.',
  },
  {
    id: 'SKBT',
    src: 'ਕਰਿ ਕਰਿ ਵੇਖੈ; ਸਿਰਜਣਹਾਰੁ ॥',
    pronunciation: 'kar kar vekhē; sirajaṇahār ‖',
    translation:
      'Having created the creation, the Creator Lord watches over it.',
  },
  {
    id: 'E1CC',
    src: 'ਨਾਨਕ. ਸਚੇ ਕੀ; ਸਾਚੀ ਕਾਰ ॥',
    pronunciation: 'nānak. sace kī; sācī kār ‖',
    translation: 'O Nanak, True is the Creation of the True Lord.',
  },
  {
    id: '9STB',
    src: 'ਆਦੇਸੁ; ਤਿਸੈ ਆਦੇਸੁ ॥',
    pronunciation: 'ādesu; tisē ādes ‖',
    translation: 'I bow to Him, I humbly bow.',
  },
  {
    id: '1RNS',
    src: 'ਆਦਿ ਅਨੀਲੁ. ਅਨਾਦਿ ਅਨਾਹਤਿ; ਜੁਗੁ ਜੁਗੁ ਏਕੋ ਵੇਸੁ ॥੩੧॥',
    pronunciation: 'ād anīlu. anād anāhati; jug jug eko ves ‖31‖',
    translation:
      'The Primal One, the Pure Light, without beginning, without end. Throughout all the ages, He is One and the Same. ||31||',
  },
  {
    id: 'FZ3S',
    src: 'ਇਕ ਦੂ ਜੀਭੌ. ਲਖ ਹੋਹਿ; ਲਖ ਹੋਵਹਿ ਲਖ ਵੀਸ ॥',
    pronunciation: 'ik dū jībhō. lakh hohi; lakh howah lakh vīs ‖',
    translation:
      'If I had 100,000 tongues, and these were then multiplied twenty times more, with each tongue,',
  },
  {
    id: 'QG45',
    src: 'ਲਖੁ ਲਖੁ ਗੇੜਾ ਆਖੀਅਹਿ; ਏਕੁ ਨਾਮੁ ਜਗਦੀਸ ॥',
    pronunciation: 'lakh lakh geṛā ākhīahi; ek nām jagadīs ‖',
    translation:
      'I would repeat, hundreds of thousands of times, the Name of the One, the Lord of the Universe.',
  },
  {
    id: '6PAP',
    src: 'ਏਤੁ ਰਾਹਿ, ਪਤਿ ਪਵੜੀਆ; ਚੜੀਐ ਹੋਇ ਇਕੀਸ ॥',
    pronunciation: 'et rāhi, pat pawaṛīā; caṛīē hoi ikīs ‖',
    translation:
      'Along this path to our Husband Lord, we climb the steps of the ladder, and come to merge with Him.',
  },
  {
    id: 'AGTS',
    src: 'ਸੁਣਿ ਗਲਾ ਆਕਾਸ ਕੀ; ਕੀਟਾ ਆਈ ਰੀਸ ॥',
    pronunciation: 'suṇ galā ākās kī; kīṭā āī rīs ‖',
    translation:
      'Hearing of the etheric realms, even worms long to come back home.',
  },
  {
    id: 'HT8B',
    src: 'ਨਾਨਕ. ਨਦਰੀ ਪਾਈਐ; ਕੂੜੀ. ਕੂੜੈ ਠੀਸ ॥੩੨॥',
    pronunciation: 'nānak. nadarī pāīē; kūṛī. kūṛē ṭhīs ‖32‖',
    translation:
      'O Nanak, by His Grace He is obtained. False are the boastings of the false. ||32||',
  },
  {
    id: 'NW8V',
    src: 'ਆਖਣਿ ਜੋਰੁ; ਚੁਪੈ. ਨਹ ਜੋਰੁ ॥',
    pronunciation: 'ākhaṇ joru; cupē. nah jor ‖',
    translation: 'No power to speak, no power to keep silent.',
  },
  {
    id: '8XBB',
    src: 'ਜੋਰੁ ਨ. ਮੰਗਣਿ; ਦੇਣਿ. ਨ ਜੋਰੁ ॥',
    pronunciation: 'jor n. mañgaṇi; deṇi. na jor ‖',
    translation: 'No power to beg, no power to give.',
  },
  {
    id: 'P07R',
    src: 'ਜੋਰੁ ਨ. ਜੀਵਣਿ; ਮਰਣਿ. ਨਹ ਜੋਰੁ ॥',
    pronunciation: 'jor n. jīwaṇi; maraṇi. nah jor ‖',
    translation: 'No power to live, no power to die.',
  },
  {
    id: 'YKT7',
    src: 'ਜੋਰੁ ਨ. ਰਾਜਿ ਮਾਲਿ; ਮਨਿ ਸੋਰੁ ॥',
    pronunciation: 'jor n. rāj māli; man sor ‖',
    translation: 'No power to rule, with wealth and occult mental powers.',
  },
  {
    id: '0GPM',
    src: 'ਜੋਰੁ ਨ ਸੁਰਤੀ; ਗਿਆਨਿ ਵੀਚਾਰਿ ॥',
    pronunciation: 'jor na suratī; giān vīcār ‖',
    translation:
      'No power to gain intuitive understanding, spiritual wisdom and meditation.',
  },
  {
    id: 'WQC9',
    src: 'ਜੋਰੁ ਨ ਜੁਗਤੀ; ਛੁਟੈ ਸੰਸਾਰੁ ॥',
    pronunciation: 'jor na jugatī; chuṭē sañsār ‖',
    translation: 'No power to find the way to escape from the world.',
  },
  {
    id: 'BPJS',
    src: 'ਜਿਸੁ ਹਥਿ ਜੋਰੁ; ਕਰਿ ਵੇਖੈ ਸੋਇ ॥',
    pronunciation: 'jis hath joru; kar vekhē soi ‖',
    translation: 'He alone has the Power in His Hands. He watches over all.',
  },
  {
    id: 'FWE0',
    src: 'ਨਾਨਕ; ਉਤਮੁ ਨੀਚੁ ਨ ਕੋਇ ॥੩੩॥',
    pronunciation: 'nānak; utam nīc na koi ‖33‖',
    translation: 'O Nanak, no one is high or low. ||33||',
  },
  {
    id: 'KCH3',
    src: 'ਰਾਤੀ ਰੁਤੀ; ਥਿਤੀ ਵਾਰ ॥',
    pronunciation: 'rātī rutī; thitī vār ‖',
    translation: 'Nights, days, weeks and seasons;',
  },
  {
    id: 'ZREW',
    src: 'ਪਵਣ ਪਾਣੀ; ਅਗਨੀ ਪਾਤਾਲ ॥',
    pronunciation: 'pawaṇ pāṇī; aganī pātāl ‖',
    translation: 'wind, water, fire and the nether regions',
  },
  {
    id: 'U8TR',
    src: 'ਤਿਸੁ ਵਿਚਿ, ਧਰਤੀ ਥਾਪਿ ਰਖੀ; ਧਰਮ ਸਾਲ ॥',
    pronunciation: 'tis vici, dharatī thāp rakhī; dharam sāl ‖',
    translation:
      'in the midst of these, He established the earth as a home for Dharma.',
  },
  {
    id: '5KTJ',
    src: 'ਤਿਸੁ ਵਿਚਿ; ਜੀਅ ਜੁਗਤਿ ਕੇ ਰੰਗ ॥',
    pronunciation: 'tis vici; jīa jugat ke rañg ‖',
    translation: 'Upon it, He placed the various species of beings.',
  },
  {
    id: '3TLN',
    src: 'ਤਿਨ ਕੇ ਨਾਮ; ਅਨੇਕ ਅਨੰਤ ॥',
    pronunciation: 'tin ke nām; anek anañt ‖',
    translation: 'Their names are uncounted and endless.',
  },
  {
    id: 'AKMD',
    src: 'ਕਰਮੀ ਕਰਮੀ; ਹੋਇ ਵੀਚਾਰੁ ॥',
    pronunciation: 'karamī karamī; hoi vīcār ‖',
    translation: 'By their deeds and their actions, they shall be judged.',
  },
  {
    id: 'Q66G',
    src: 'ਸਚਾ ਆਪਿ; ਸਚਾ ਦਰਬਾਰੁ ॥',
    pronunciation: 'sacā āpi; sacā darabār ‖',
    translation: 'God Himself is True, and True is His Court.',
  },
  {
    id: '7RB7',
    src: 'ਤਿਥੈ ਸੋਹਨਿ; ਪੰਚ ਪਰਵਾਣੁ ॥',
    pronunciation: 'tithē sohani; pañc paravāṇ ‖',
    translation:
      'There, in perfect grace and ease, sit the self-elect, the self-realized Saints.',
  },
  {
    id: 'U1LH',
    src: 'ਨਦਰੀ ਕਰਮਿ; ਪਵੈ ਨੀਸਾਣੁ ॥',
    pronunciation: 'nadarī karami; pavē nīsāṇ ‖',
    translation: 'They receive the Mark of Grace from the Merciful Lord.',
  },
  {
    id: 'U24Q',
    src: 'ਕਚ ਪਕਾਈ; ਓਥੈ ਪਾਇ ॥',
    pronunciation: 'kac pakāī; othē pāi ‖',
    translation:
      'The ripe and the unripe, the good and the bad, shall there be judged.',
  },
  {
    id: '7VQN',
    src: 'ਨਾਨਕ; ਗਇਆ ਜਾਪੈ ਜਾਇ ॥੩੪॥',
    pronunciation: 'nānak; gaiā jāpē jāi ‖34‖',
    translation: 'O Nanak, when you go home, you will see this. ||34||',
  },
  {
    id: '24CD',
    src: 'ਧਰਮ ਖੰਡ ਕਾ; ਏਹੋ ਧਰਮੁ ॥',
    pronunciation: 'dharam khañḍ kā; eho dharam ‖',
    translation: 'This is righteous living in the realm of Dharma.',
  },
  {
    id: 'K1RK',
    src: 'ਗਿਆਨ ਖੰਡ ਕਾ; ਆਖਹੁ ਕਰਮੁ ॥',
    pronunciation: 'giān khañḍ kā; ākhah karam ‖',
    translation: 'And now we speak of the realm of spiritual wisdom.',
  },
  {
    id: 'N50P',
    src: 'ਕੇਤੇ ਪਵਣ ਪਾਣੀ ਵੈਸੰਤਰ; ਕੇਤੇ ਕਾਨ ਮਹੇਸ ॥',
    pronunciation: 'kete pawaṇ pāṇī vēsañtar; kete kān mahes ‖',
    translation:
      'So many winds, waters and fires; so many Krishnas and Shivas.',
  },
  {
    id: '4WPT',
    src: 'ਕੇਤੇ ਬਰਮੇ ਘਾੜਤਿ ਘੜੀਅਹਿ; ਰੂਪ ਰੰਗ ਕੇ ਵੇਸ ॥',
    pronunciation: 'kete barame ghāṛat ghaṛīahi; rūp rañg ke ves ‖',
    translation:
      'So many Brahmas, fashioning forms of great beauty, adorned and dressed in many colors.',
  },
  {
    id: 'FEM5',
    src: 'ਕੇਤੀਆ ਕਰਮ ਭੂਮੀ, ਮੇਰ ਕੇਤੇ; ਕੇਤੇ ਧੂ, ਉਪਦੇਸ ॥',
    pronunciation: 'ketīā karam bhūmī, mer kete; kete dhū, upades ‖',
    translation:
      'So many worlds and lands for working out karma. So very many lessons to be learned!',
  },
  {
    id: 'Q0HU',
    src: 'ਕੇਤੇ ਇੰਦ ਚੰਦ, ਸੂਰ ਕੇਤੇ; ਕੇਤੇ ਮੰਡਲ ਦੇਸ ॥',
    pronunciation: 'kete iñd cañd, sūr kete; kete mañḍal des ‖',
    translation:
      'So many Indras, so many moons and suns, so many worlds and lands.',
  },
  {
    id: 'D1W9',
    src: 'ਕੇਤੇ ਸਿਧ ਬੁਧ, ਨਾਥ ਕੇਤੇ; ਕੇਤੇ ਦੇਵੀ ਵੇਸ ॥',
    pronunciation: 'kete sidh budh, nāth kete; kete devī ves ‖',
    translation:
      'So many Siddhas and Buddhas, so many Yogic masters. So many goddesses of various kinds.',
  },
  {
    id: '1Q0R',
    src: 'ਕੇਤੇ ਦੇਵ ਦਾਨਵ, ਮੁਨਿ ਕੇਤੇ; ਕੇਤੇ ਰਤਨ ਸਮੁੰਦ ॥',
    pronunciation: 'kete dev dānav, mun kete; kete ratan samuñd ‖',
    translation:
      'So many demi-gods and demons, so many silent sages. So many oceans of jewels.',
  },
  {
    id: '2ZEN',
    src: 'ਕੇਤੀਆ ਖਾਣੀ, ਕੇਤੀਆ ਬਾਣੀ; ਕੇਤੇ ਪਾਤ ਨਰਿੰਦ ॥',
    pronunciation: 'ketīā khāṇī, ketīā bāṇī; kete pāt nariñd ‖',
    translation:
      'So many ways of life, so many languages. So many dynasties of rulers.',
  },
  {
    id: 'LWRF',
    src: 'ਕੇਤੀਆ ਸੁਰਤੀ. ਸੇਵਕ ਕੇਤੇ; ਨਾਨਕ. ਅੰਤੁ ਨ ਅੰਤੁ ॥੩੫॥',
    pronunciation: 'ketīā suratī. sewak kete; nānak. añt na añt ‖35‖',
    translation:
      'So many intuitive people, so many selfless servants. O Nanak, His limit has no limit! ||35||',
  },
  {
    id: 'RSBW',
    src: 'ਗਿਆਨ ਖੰਡ ਮਹਿ; ਗਿਆਨੁ ਪਰਚੰਡੁ ॥',
    pronunciation: 'giān khañḍ mahi; giān paracañḍ ‖',
    translation: 'In the realm of wisdom, spiritual wisdom reigns supreme.',
  },
  {
    id: 'K59J',
    src: 'ਤਿਥੈ ਨਾਦ ਬਿਨੋਦ; ਕੋਡ ਅਨੰਦੁ ॥',
    pronunciation: 'tithē nād binod; koḍ anañd ‖',
    translation:
      'The Sound-current of the Naad vibrates there, amidst the sounds and the sights of bliss.',
  },
  {
    id: 'RZ2R',
    src: 'ਸਰਮ ਖੰਡ ਕੀ; ਬਾਣੀ ਰੂਪੁ ॥',
    pronunciation: 'saram khañḍ kī; bāṇī rūp ‖',
    translation: 'In the realm of humility, the Word is Beauty.',
  },
  {
    id: 'L3PT',
    src: 'ਤਿਥੈ ਘਾੜਤਿ ਘੜੀਐ; ਬਹੁਤੁ ਅਨੂਪੁ ॥',
    pronunciation: 'tithē ghāṛat ghaṛīē; bahut anūp ‖',
    translation: 'Forms of incomparable beauty are fashioned there.',
  },
  {
    id: 'C8DN',
    src: 'ਤਾ ਕੀਆ ਗਲਾ; ਕਥੀਆ ਨਾ ਜਾਹਿ ॥',
    pronunciation: 'tā kīā galā; kathīā nā jāh ‖',
    translation: 'These things cannot be described.',
  },
  {
    id: 'Z1ZK',
    src: 'ਜੇ ਕੋ ਕਹੈ; ਪਿਛੈ ਪਛੁਤਾਇ ॥',
    pronunciation: 'je ko kahē; pichē pachutāi ‖',
    translation: 'One who tries to speak of these shall regret the attempt.',
  },
  {
    id: '4Q9F',
    src: 'ਤਿਥੈ ਘੜੀਐ; ਸੁਰਤਿ ਮਤਿ ਮਨਿ ਬੁਧਿ ॥',
    pronunciation: 'tithē ghaṛīē; surat mat man budh ‖',
    translation:
      'The intuitive consciousness, intellect and understanding of the mind are shaped there.',
  },
  {
    id: 'AMXU',
    src: 'ਤਿਥੈ ਘੜੀਐ; ਸੁਰਾ ਸਿਧਾ ਕੀ ਸੁਧਿ ॥੩੬॥',
    pronunciation: 'tithē ghaṛīē; surā sidhā kī sudh ‖36‖',
    translation:
      'The consciousness of the spiritual warriors and the Siddhas, the beings of spiritual perfection, are shaped there. ||36||',
  },
  {
    id: '5ULX',
    src: 'ਕਰਮ ਖੰਡ ਕੀ; ਬਾਣੀ ਜੋਰੁ ॥',
    pronunciation: 'karam khañḍ kī; bāṇī jor ‖',
    translation: 'In the realm of karma, the Word is Power.',
  },
  {
    id: 'BJM6',
    src: 'ਤਿਥੈ; ਹੋਰੁ ਨ ਕੋਈ ਹੋਰੁ ॥',
    pronunciation: 'tithē; hor na koī hor ‖',
    translation: 'No one else dwells there,',
  },
  {
    id: 'BNJ2',
    src: 'ਤਿਥੈ; ਜੋਧ ਮਹਾਬਲ ਸੂਰ ॥',
    pronunciation: 'tithē; jodh mahābal sūr ‖',
    translation: 'except the warriors of great power, the spiritual heroes.',
  },
  {
    id: '7VNW',
    src: 'ਤਿਨ ਮਹਿ; ਰਾਮੁ ਰਹਿਆ ਭਰਪੂਰ ॥',
    pronunciation: 'tin mahi; rām rahiā bharapūr ‖',
    translation: "They are totally fulfilled, imbued with the Lord's Essence.",
  },
  {
    id: 'WE5M',
    src: 'ਤਿਥੈ; ਸੀਤੋ ਸੀਤਾ ਮਹਿਮਾ ਮਾਹਿ ॥',
    pronunciation: 'tithē; sīto sītā mahimā māh ‖',
    translation:
      'Myriads of Sitas are there, cool and calm in their majestic glory.',
  },
  {
    id: '9LXP',
    src: 'ਤਾ ਕੇ ਰੂਪ; ਨ ਕਥਨੇ ਜਾਹਿ ॥',
    pronunciation: 'tā ke rūp; na kathane jāh ‖',
    translation: 'Their beauty cannot be described.',
  },
  {
    id: 'YCB7',
    src: 'ਨਾ ਓਹਿ ਮਰਹਿ; ਨ ਠਾਗੇ ਜਾਹਿ ॥',
    pronunciation: 'nā oh marahi; na ṭhāge jāh ‖',
    translation: 'Neither death nor deception comes to those,',
  },
  {
    id: '7V61',
    src: 'ਜਿਨ ਕੈ; ਰਾਮੁ ਵਸੈ ਮਨ ਮਾਹਿ ॥',
    pronunciation: 'jin kē; rām wasē man māh ‖',
    translation: 'within whose minds the Lord abides.',
  },
  {
    id: 'MT5G',
    src: 'ਤਿਥੈ ਭਗਤ ਵਸਹਿ; ਕੇ ਲੋਅ ॥',
    pronunciation: 'tithē bhagat wasahi; ke loa ‖',
    translation: 'The devotees of many worlds dwell there.',
  },
  {
    id: 'UMUK',
    src: 'ਕਰਹਿ ਅਨੰਦੁ; ਸਚਾ ਮਨਿ ਸੋਇ ॥',
    pronunciation: 'karah anañdu; sacā man soi ‖',
    translation: 'They celebrate; their minds are imbued with the True Lord.',
  },
  {
    id: 'RQ4A',
    src: 'ਸਚ ਖੰਡਿ ਵਸੈ ਨਿਰੰਕਾਰੁ ॥',
    pronunciation: 'sac khañḍ wasē nirañkār ‖',
    translation: 'In the realm of Truth, the Formless Lord abides.',
  },
  {
    id: 'ANCE',
    src: 'ਕਰਿ ਕਰਿ ਵੇਖੈ; ਨਦਰਿ ਨਿਹਾਲ ॥',
    pronunciation: 'kar kar vekhē; nadar nihāl ‖',
    translation:
      'Having created the creation, He watches over it. By His Glance of Grace, He bestows happiness.',
  },
  {
    id: 'GSN9',
    src: 'ਤਿਥੈ ਖੰਡ ਮੰਡਲ; ਵਰਭੰਡ ॥',
    pronunciation: 'tithē khañḍ mañḍal; warabhañḍ ‖',
    translation: 'There are planets, solar systems and galaxies.',
  },
  {
    id: 'VG6U',
    src: 'ਜੇ ਕੋ ਕਥੈ; ਤ. ਅੰਤ ਨ ਅੰਤ ॥',
    pronunciation: 'je ko kathē; t. añt na añt ‖',
    translation: 'If one speaks of them, there is no limit, no end.',
  },
  {
    id: 'MDYU',
    src: 'ਤਿਥੈ. ਲੋਅ ਲੋਅ; ਆਕਾਰ ॥',
    pronunciation: 'tithē. loa loa; ākār ‖',
    translation: 'There are worlds upon worlds of His Creation.',
  },
  {
    id: 'UHV5',
    src: 'ਜਿਵ ਜਿਵ ਹੁਕਮੁ; ਤਿਵੈ ਤਿਵ ਕਾਰ ॥',
    pronunciation: 'jiv jiv hukamu; tivē tiv kār ‖',
    translation: 'As He commands, so they exist.',
  },
  {
    id: '2953',
    src: 'ਵੇਖੈ ਵਿਗਸੈ; ਕਰਿ ਵੀਚਾਰੁ ॥',
    pronunciation: 'vekhē vigasē; kar vīcār ‖',
    translation:
      'He watches over all, and contemplating the creation, He rejoices.',
  },
  {
    id: '9AJ4',
    src: 'ਨਾਨਕ ਕਥਨਾ; ਕਰੜਾ ਸਾਰੁ ॥੩੭॥',
    pronunciation: 'nānak kathanā; karaṛā sār ‖37‖',
    translation: 'O Nanak, to describe this is as hard as steel! ||37||',
  },
  {
    id: 'BEWM',
    src: 'ਜਤੁ ਪਾਹਾਰਾ; ਧੀਰਜੁ ਸੁਨਿਆਰੁ ॥',
    pronunciation: 'jat pāhārā; dhīraj suniār ‖',
    translation: 'Let self-control be the furnace, and patience the goldsmith.',
  },
  {
    id: 'XXEE',
    src: 'ਅਹਰਣਿ ਮਤਿ; ਵੇਦੁ ਹਥੀਆਰੁ ॥',
    pronunciation: 'aharaṇ mati; ved hathīār ‖',
    translation:
      'Let understanding be the anvil, and spiritual wisdom the tools.',
  },
  {
    id: '0VWK',
    src: 'ਭਉ ਖਲਾ; ਅਗਨਿ ਤਪ ਤਾਉ ॥',
    pronunciation: 'bhau khalā; agan tap tāu ‖',
    translation:
      "With the Fear of God as the bellows, fan the flames of tapa, the body's inner heat.",
  },
  {
    id: '9762',
    src: 'ਭਾਂਡਾ ਭਾਉ; ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥',
    pronunciation: 'bhāñḍā bhāu; añmrit tit ḍhāl ‖',
    translation: 'In the crucible of love, melt the Nectar of the Name,',
  },
  {
    id: '766E',
    src: 'ਘੜੀਐ ਸਬਦੁ; ਸਚੀ ਟਕਸਾਲ ॥',
    pronunciation: 'ghaṛīē sabadu; sacī ṭakasāl ‖',
    translation: 'and mint the True Coin of the Shabad, the Word of God.',
  },
  {
    id: 'C1Y3',
    src: 'ਜਿਨ ਕਉ ਨਦਰਿ ਕਰਮੁ; ਤਿਨ ਕਾਰ ॥',
    pronunciation: 'jin kau nadar karamu; tin kār ‖',
    translation:
      'Such is the karma of those upon whom He has cast His Glance of Grace.',
  },
  {
    id: 'K552',
    src: 'ਨਾਨਕ ਨਦਰੀ; ਨਦਰਿ ਨਿਹਾਲ ॥੩੮॥',
    pronunciation: 'nānak nadarī; nadar nihāl ‖38‖',
    translation:
      'O Nanak, the Merciful Lord, by His Grace, uplifts and exalts them. ||38||',
  },
  {
    id: 'XQLL',
    src: 'ਸਲੋਕੁ ॥',
    pronunciation: 'salok ‖',
    translation: 'Salok:',
  },
  {
    id: '62FB',
    src: 'ਪਵਣੁ ਗੁਰੂ, ਪਾਣੀ ਪਿਤਾ; ਮਾਤਾ ਧਰਤਿ ਮਹਤੁ ॥',
    pronunciation: 'pawaṇ gurū, pāṇī pitā; mātā dharat mahat ‖',
    translation:
      'Air is the Guru, Water is the Father, and Earth is the Great Mother of all.',
  },
  {
    id: '8TXG',
    src: 'ਦਿਵਸੁ ਰਾਤਿ ਦੁਇ, ਦਾਈ ਦਾਇਆ; ਖੇਲੈ ਸਗਲ ਜਗਤੁ ॥',
    pronunciation: 'diwas rāt dui, dāī dāiā; khelē sagal jagat ‖',
    translation:
      'Day and night are the two nurses, in whose lap all the world is at play.',
  },
  {
    id: 'Q495',
    src: 'ਚੰਗਿਆਈਆ ਬੁਰਿਆਈਆ; ਵਾਚੈ ਧਰਮੁ ਹਦੂਰਿ ॥',
    pronunciation: 'cañgiāīā buriāīā; vācē dharam hadūr ‖',
    translation:
      'Good deeds and bad deeds-the record is read out in the Presence of the Lord of Dharma.',
  },
  {
    id: '2D8J',
    src: 'ਕਰਮੀ ਆਪੋ ਆਪਣੀ; ਕੇ ਨੇੜੈ ਕੇ ਦੂਰਿ ॥',
    pronunciation: 'karamī āpo āpaṇī; ke neṛē ke dūr ‖',
    translation:
      'According to their own actions, some are drawn closer, and some are driven farther away.',
  },
  {
    id: 'V9TG',
    src: 'ਜਿਨੀ. ਨਾਮੁ ਧਿਆਇਆ; ਗਏ ਮਸਕਤਿ ਘਾਲਿ ॥',
    pronunciation: 'jinī. nām dhiāiā; gae masakat ghāl ‖',
    translation:
      'Those who have meditated on the Naam, the Name of the Lord, and departed after having worked by the sweat of their brows',
  },
  {
    id: '9WAL',
    src: 'ਨਾਨਕ. ਤੇ ਮੁਖ ਉਜਲੇ; ਕੇਤੀ ਛੁਟੀ ਨਾਲਿ ॥੧॥',
    pronunciation: 'nānak. te mukh ujale; ketī chuṭī nāl ‖1‖',
    translation:
      '-O Nanak, their faces are radiant in the Court of the Lord, and many are saved along with them! ||1||',
  },
]

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data)
}
