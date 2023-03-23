import type { RequestHandler } from '@builder.io/qwik-city'

const data = [
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
    translation: 'The Lord killed the wicked Harnaakhash, and saved Prahlaad.',
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
    id: '9ANB',
    src: 'ਸੋ ਦਰੁ ਰਾਗੁ ਆਸਾ ਮਹਲਾ ੧ ॥',
    pronunciation: 'so dar rāg āsā mahalā 1 ‖',
    translation: 'So Dar ~ That Door. Raag Aasaa, First Mehl:',
  },
  {
    id: 'GFAU',
    src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
    pronunciation: 'ik oañkār satigur prasād ‖',
    translation: 'One Universal Creator God. By The Grace Of The True Guru:',
  },
  {
    id: 'LH7J',
    src: 'ਸੋ ਦਰੁ ਤੇਰਾ ਕੇਹਾ, ਸੋ ਘਰੁ ਕੇਹਾ; ਜਿਤੁ ਬਹਿ ਸਰਬ ਸਮਾਲੇ ॥',
    pronunciation: 'so dar terā kehā, so ghar kehā; jit bah sarab samāle ‖',
    translation:
      'Where is That Door of Yours, and where is That Home, in which You sit and take care of all?',
  },
  {
    id: '3HXF',
    src: 'ਵਾਜੇ ਤੇਰੇ ਨਾਦ ਅਨੇਕ ਅਸੰਖਾ; ਕੇਤੇ ਤੇਰੇ ਵਾਵਣਹਾਰੇ ॥',
    pronunciation: 'vāje tere nād anek asañkhā; kete tere vāwaṇahāre ‖',
    translation:
      'The Sound-current of the Naad vibrates there for You, and countless musicians play all sorts of instruments there for You.',
  },
  {
    id: 'GBW3',
    src: 'ਕੇਤੇ ਤੇਰੇ, ਰਾਗ ਪਰੀ ਸਿਉ ਕਹੀਅਹਿ; ਕੇਤੇ ਤੇਰੇ ਗਾਵਣਹਾਰੇ ॥',
    pronunciation: 'kete tere, rāg parī siu kahīahi; kete tere gāwaṇahāre ‖',
    translation:
      'There are so many Ragas and musical harmonies to You; so many minstrels sing hymns of You.',
  },
  {
    id: 'J190',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਪਵਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ; ਗਾਵੈ ਰਾਜਾ ਧਰਮੁ ਦੁਆਰੇ ॥',
    pronunciation:
      'gāwan tudhano pawaṇ pāṇī bēsañtaru; gāvē rājā dharam duāre ‖',
    translation:
      'Wind, water and fire sing of You. The Righteous Judge of Dharma sings at Your Door.',
  },
  {
    id: '012K',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਚਿਤੁ ਗੁਪਤੁ ਲਿਖਿ ਜਾਣਨਿ; ਲਿਖਿ ਲਿਖਿ ਧਰਮੁ ਬੀਚਾਰੇ ॥',
    pronunciation:
      'gāwan tudhano cit gupat likh jāṇani; likh likh dharam bīcāre ‖',
    translation:
      'Chitr and Gupt, the angels of the conscious and the subconscious who keep the record of actions, and the Righteous Judge of Dharma who reads this record, sing of You.',
  },
  {
    id: 'NWQV',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਈਸਰੁ ਬ੍ਰਹਮਾ ਦੇਵੀ; ਸੋਹਨਿ ਤੇਰੇ ਸਦਾ ਸਵਾਰੇ ॥',
    pronunciation: 'gāwan tudhano īsar brahamā devī; sohan tere sadā savāre ‖',
    translation:
      'Shiva, Brahma and the Goddess of Beauty, ever adorned by You, sing of You.',
  },
  {
    id: 'BV0B',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਇੰਦ੍ਰ. ਇੰਦ੍ਰਾਸਣਿ ਬੈਠੇ; ਦੇਵਤਿਆ ਦਰਿ ਨਾਲੇ ॥',
    pronunciation: 'gāwan tudhano iñdr. iñdrāsaṇ bēṭhe; dewatiā dar nāle ‖',
    translation:
      'Indra, seated on His Throne, sings of You, with the deities at Your Door.',
  },
  {
    id: '0458',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਸਿਧ ਸਮਾਧੀ ਅੰਦਰਿ; ਗਾਵਨਿ ਤੁਧਨੋ ਸਾਧ ਬੀਚਾਰੇ ॥',
    pronunciation:
      'gāwan tudhano sidh samādhī añdari; gāwan tudhano sādh bīcāre ‖',
    translation:
      'The Siddhas in Samaadhi sing of You; the Saadhus sing of You in contemplation.',
  },
  {
    id: '7AGV',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਜਤੀ ਸਤੀ ਸੰਤੋਖੀ; ਗਾਵਨਿ ਤੁਧਨੋ ਵੀਰ ਕਰਾਰੇ ॥',
    pronunciation:
      'gāwan tudhano jatī satī sañtokhī; gāwan tudhano vīr karāre ‖',
    translation:
      'The celibates, the fanatics, and the peacefully accepting sing of You; the fearless warriors sing of You.',
  },
  {
    id: '8JZZ',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ, ਪੰਡਿਤ ਪੜਨਿ ਰਖੀਸੁਰ; ਜੁਗੁ ਜੁਗੁ ਵੇਦਾ ਨਾਲੇ ॥',
    pronunciation: 'gāwan tudhano, pañḍit paṛan rakhīsur; jug jug vedā nāle ‖',
    translation:
      'The Pandits, the religious scholars who recite the Vedas, with the supreme sages of all the ages, sing of You.',
  },
  {
    id: 'M1J8',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਮੋਹਣੀਆ ਮਨੁ ਮੋਹਨਿ; ਸੁਰਗੁ ਮਛੁ ਪਇਆਲੇ ॥',
    pronunciation: 'gāwan tudhano mohaṇīā man mohani; surag mach paiāle ‖',
    translation:
      'The Mohinis, the enchanting heavenly beauties who entice hearts in paradise, in this world, and in the underworld of the subconscious, sing of You.',
  },
  {
    id: 'J64E',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ, ਰਤਨ ਉਪਾਏ ਤੇਰੇ; ਅਠਸਠਿ ਤੀਰਥ ਨਾਲੇ ॥',
    pronunciation: 'gāwan tudhano, ratan upāe tere; aṭhasaṭh tīrath nāle ‖',
    translation:
      'The celestial jewels created by You, and the sixty-eight sacred shrines of pilgrimage, sing of You.',
  },
  {
    id: 'WSFG',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਜੋਧ ਮਹਾਬਲ ਸੂਰਾ; ਗਾਵਨਿ ਤੁਧਨੋ ਖਾਣੀ ਚਾਰੇ ॥',
    pronunciation:
      'gāwan tudhano jodh mahābal sūrā; gāwan tudhano khāṇī cāre ‖',
    translation:
      'The brave and mighty warriors sing of You. The spiritual heroes and the four sources of creation sing of You.',
  },
  {
    id: 'AEML',
    src: 'ਗਾਵਨਿ ਤੁਧਨੋ ਖੰਡ ਮੰਡਲ ਬ੍ਰਹਮੰਡਾ; ਕਰਿ ਕਰਿ ਰਖੇ ਤੇਰੇ ਧਾਰੇ ॥',
    pronunciation:
      'gāwan tudhano khañḍ mañḍal brahamañḍā; kar kar rakhe tere dhāre ‖',
    translation:
      'The worlds, solar systems and galaxies, created and arranged by Your Hand, sing of You.',
  },
  {
    id: 'S13U',
    src: 'ਸੇਈ ਤੁਧਨੋ ਗਾਵਨਿ, ਜੋ ਤੁਧੁ ਭਾਵਨਿ; ਰਤੇ ਤੇਰੇ ਭਗਤ ਰਸਾਲੇ ॥',
    pronunciation:
      'seī tudhano gāwani, jo tudh bhāwani; rate tere bhagat rasāle ‖',
    translation:
      'They alone sing of You, who are pleasing to Your Will. Your devotees are imbued with Your Sublime Essence.',
  },
  {
    id: '3407',
    src: 'ਹੋਰਿ ਕੇਤੇ ਤੁਧਨੋ ਗਾਵਨਿ, ਸੇ. ਮੈ ਚਿਤਿ ਨ ਆਵਨਿ; ਨਾਨਕੁ. ਕਿਆ ਬੀਚਾਰੇ ॥',
    pronunciation:
      'hor kete tudhano gāwani, se. mē cit na āwani; nānaku. kiā bīcāre ‖',
    translation:
      'So many others sing of You, they do not come to mind. O Nanak, how can I think of them all?',
  },
  {
    id: '3MUK',
    src: 'ਸੋਈ ਸੋਈ ਸਦਾ ਸਚੁ ਸਾਹਿਬੁ; ਸਾਚਾ ਸਾਚੀ ਨਾਈ ॥',
    pronunciation: 'soī soī sadā sac sāhibu; sācā sācī nāī ‖',
    translation: 'That True Lord is True, forever True, and True is His Name.',
  },
  {
    id: 'DG4Z',
    src: 'ਹੈ ਭੀ ਹੋਸੀ, ਜਾਇ ਨ ਜਾਸੀ; ਰਚਨਾ ਜਿਨਿ ਰਚਾਈ ॥',
    pronunciation: 'hē bhī hosī, jāi na jāsī; racanā jin racāī ‖',
    translation:
      'He is, and shall always be. He shall not depart, even when this Universe which He has created departs.',
  },
  {
    id: '52A7',
    src: 'ਰੰਗੀ ਰੰਗੀ ਭਾਤੀ, ਕਰਿ ਕਰਿ ਜਿਨਸੀ; ਮਾਇਆ ਜਿਨਿ ਉਪਾਈ ॥',
    pronunciation: 'rañgī rañgī bhātī, kar kar jinasī; māiā jin upāī ‖',
    translation:
      'He created the world, with its various colors, species of beings, and the variety of Maya.',
  },
  {
    id: 'F8PK',
    src: 'ਕਰਿ ਕਰਿ ਦੇਖੈ. ਕੀਤਾ ਆਪਣਾ; ਜਿਉ ਤਿਸ ਦੀ ਵਡਿਆਈ ॥',
    pronunciation: 'kar kar dekhē. kītā āpaṇā; jiu tis dī waḍiāī ‖',
    translation:
      'Having created the creation, He watches over it Himself, by His Greatness.',
  },
  {
    id: 'RMED',
    src: 'ਜੋ ਤਿਸੁ ਭਾਵੈ ਸੋਈ ਕਰਸੀ; ਫਿਰਿ. ਹੁਕਮੁ ਨ ਕਰਣਾ ਜਾਈ ॥',
    pronunciation: 'jo tis bhāvē soī karasī; phiri. hukam na karaṇā jāī ‖',
    translation:
      'He does whatever He pleases. No one can issue any order to Him.',
  },
  {
    id: 'K69L',
    src: 'ਸੋ ਪਾਤਿਸਾਹੁ ਸਾਹਾ ਪਤਿਸਾਹਿਬੁ; ਨਾਨਕ. ਰਹਣੁ ਰਜਾਈ ॥੧॥',
    pronunciation: 'so pātisāh sāhā patisāhibu; nānak. rahaṇ rajāī ‖1‖',
    translation:
      'He is the King, the King of kings, the Supreme Lord and Master of kings. Nanak remains subject to His Will. ||1||',
  },
  {
    id: 'G9XC',
    src: 'ਆਸਾ ਮਹਲਾ ੧ ॥',
    pronunciation: 'āsā mahalā 1 ‖',
    translation: 'Aasaa, First Mehl:',
  },
  {
    id: '6K1B',
    src: 'ਸੁਣਿ ਵਡਾ; ਆਖੈ ਸਭੁ ਕੋਇ ॥',
    pronunciation: 'suṇ waḍā; ākhē sabh koi ‖',
    translation: 'Hearing of His Greatness, everyone calls Him Great.',
  },
  {
    id: 'JP9V',
    src: 'ਕੇਵਡੁ ਵਡਾ; ਡੀਠਾ ਹੋਇ ॥',
    pronunciation: 'kewaḍ waḍā; ḍīṭhā hoi ‖',
    translation:
      'But just how Great His Greatness is-this is known only to those who have seen Him.',
  },
  {
    id: 'H5HB',
    src: 'ਕੀਮਤਿ ਪਾਇ ਨ ਕਹਿਆ ਜਾਇ ॥',
    pronunciation: 'kīmat pāi na kahiā jāi ‖',
    translation: 'His Value cannot be estimated; He cannot be described.',
  },
  {
    id: 'SVR1',
    src: 'ਕਹਣੈ ਵਾਲੇ ਤੇਰੇ; ਰਹੇ ਸਮਾਇ ॥੧॥',
    pronunciation: 'kahaṇē vāle tere; rahe samāi ‖1‖',
    translation:
      'Those who describe You, Lord, remain immersed and absorbed in You. ||1||',
  },
  {
    id: 'WL9H',
    src: 'ਵਡੇ ਮੇਰੇ ਸਾਹਿਬਾ; ਗਹਿਰ ਗੰਭੀਰਾ ਗੁਣੀ ਗਹੀਰਾ ॥',
    pronunciation: 'waḍe mere sāhibā; gahir gañbhīrā guṇī gahīrā ‖',
    translation:
      'O my Great Lord and Master of Unfathomable Depth, You are the Ocean of Excellence.',
  },
  {
    id: 'AX53',
    src: 'ਕੋਇ ਨ ਜਾਣੈ; ਤੇਰਾ ਕੇਤਾ, ਕੇਵਡੁ ਚੀਰਾ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation: 'koi na jāṇē; terā ketā, kewaḍ cīrā ‖1‖ rahāu ‖',
    translation:
      'No one knows the extent or the vastness of Your Expanse. ||1||Pause||',
  },
  {
    id: 'WC54',
    src: 'ਸਭਿ ਸੁਰਤੀ ਮਿਲਿ; ਸੁਰਤਿ ਕਮਾਈ ॥',
    pronunciation: 'sabh suratī mili; surat kamāī ‖',
    translation: 'All the intuitives met and practiced intuitive meditation.',
  },
  {
    id: 'TXLX',
    src: 'ਸਭ ਕੀਮਤਿ ਮਿਲਿ; ਕੀਮਤਿ ਪਾਈ ॥',
    pronunciation: 'sabh kīmat mili; kīmat pāī ‖',
    translation: 'All the appraisers met and made the appraisal.',
  },
  {
    id: 'YVTH',
    src: 'ਗਿਆਨੀ ਧਿਆਨੀ; ਗੁਰ ਗੁਰਹਾਈ ॥',
    pronunciation: 'giānī dhiānī; gur gurahāī ‖',
    translation:
      'The spiritual teachers, the teachers of meditation, and the teachers of teachers',
  },
  {
    id: 'M65L',
    src: 'ਕਹਣੁ ਨ ਜਾਈ; ਤੇਰੀ ਤਿਲੁ ਵਡਿਆਈ ॥੨॥',
    pronunciation: 'kahaṇ na jāī; terī til waḍiāī ‖2‖',
    translation: '-they cannot describe even an iota of Your Greatness. ||2||',
  },
  {
    id: 'F7WM',
    src: 'ਸਭਿ ਸਤ. ਸਭਿ ਤਪ; ਸਭਿ ਚੰਗਿਆਈਆ ॥',
    pronunciation: 'sabh sat. sabh tap; sabh cañgiāīā ‖',
    translation: 'All Truth, all austere discipline, all goodness,',
  },
  {
    id: 'M6TF',
    src: 'ਸਿਧਾ ਪੁਰਖਾ; ਕੀਆ; ਵਡਿਆਈਆ ॥',
    pronunciation: 'sidhā purakhā; kīā; waḍiāīā ‖',
    translation: 'all the great miraculous spiritual powers of the Siddhas',
  },
  {
    id: 'T68Y',
    src: 'ਤੁਧੁ ਵਿਣੁ; ਸਿਧੀ. ਕਿਨੈ ਨ ਪਾਈਆ ॥',
    pronunciation: 'tudh viṇu; sidhī. kinē na pāīā ‖',
    translation: 'without You, no one has attained such powers.',
  },
  {
    id: '0UHE',
    src: 'ਕਰਮਿ ਮਿਲੈ; ਨਾਹੀ ਠਾਕਿ ਰਹਾਈਆ ॥੩॥',
    pronunciation: 'karam milē; nāhī ṭhāk rahāīā ‖3‖',
    translation:
      'They are received only by Your Grace. No one can block them or stop their flow. ||3||',
  },
  {
    id: '36YB',
    src: 'ਆਖਣ ਵਾਲਾ; ਕਿਆ ਵੇਚਾਰਾ ॥',
    pronunciation: 'ākhaṇ vālā; kiā vecārā ‖',
    translation: 'What can the poor helpless creatures do?',
  },
  {
    id: 'Q5BK',
    src: 'ਸਿਫਤੀ ਭਰੇ; ਤੇਰੇ ਭੰਡਾਰਾ ॥',
    pronunciation: 'siphatī bhare; tere bhañḍārā ‖',
    translation: 'Your Praises are overflowing with Your Treasures.',
  },
  {
    id: '3N6N',
    src: 'ਜਿਸੁ ਤੂ ਦੇਹਿ; ਤਿਸੈ ਕਿਆ ਚਾਰਾ ॥',
    pronunciation: 'jis tū dehi; tisē kiā cārā ‖',
    translation: 'Those, unto whom You give-how can they think of any other?',
  },
  {
    id: 'R8CU',
    src: 'ਨਾਨਕ; ਸਚੁ ਸਵਾਰਣਹਾਰਾ ॥੪॥੨॥',
    pronunciation: 'nānak; sac savāraṇahārā ‖4‖2‖',
    translation: 'O Nanak, the True One embellishes and exalts. ||4||2||',
  },
  {
    id: '5ZH5',
    src: 'ਆਸਾ ਮਹਲਾ ੧ ॥',
    pronunciation: 'āsā mahalā 1 ‖',
    translation: 'Aasaa, First Mehl:',
  },
  {
    id: 'W829',
    src: 'ਆਖਾ ਜੀਵਾ; ਵਿਸਰੈ ਮਰਿ ਜਾਉ ॥',
    pronunciation: 'ākhā jīvā; visarē mar jāu ‖',
    translation: 'Chanting it, I live; forgetting it, I die.',
  },
  {
    id: 'J2BJ',
    src: 'ਆਖਣਿ ਅਉਖਾ; ਸਾਚਾ ਨਾਉ ॥',
    pronunciation: 'ākhaṇ aukhā; sācā nāu ‖',
    translation: 'It is so difficult to chant the True Name.',
  },
  {
    id: '15PS',
    src: 'ਸਾਚੇ ਨਾਮ ਕੀ; ਲਾਗੈ ਭੂਖ ॥',
    pronunciation: 'sāce nām kī; lāgē bhūkh ‖',
    translation: 'If someone feels hunger for the True Name,',
  },
  {
    id: 'S8J4',
    src: 'ਉਤੁ ਭੂਖੈ; ਖਾਇ ਚਲੀਅਹਿ ਦੂਖ ॥੧॥',
    pronunciation: 'ut bhūkhē; khāi calīah dūkh ‖1‖',
    translation: 'that hunger shall consume his pain. ||1||',
  },
  {
    id: '2SET',
    src: 'ਸੋ ਕਿਉ ਵਿਸਰੈ; ਮੇਰੀ ਮਾਇ ॥',
    pronunciation: 'so kiu visarē; merī māi ‖',
    translation: 'How can I forget Him, O my mother?',
  },
  {
    id: '9T2G',
    src: 'ਸਾਚਾ ਸਾਹਿਬੁ; ਸਾਚੈ ਨਾਇ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation: 'sācā sāhibu; sācē nāi ‖1‖ rahāu ‖',
    translation: 'True is the Master, True is His Name. ||1||Pause||',
  },
  {
    id: 'ZMHE',
    src: 'ਸਾਚੇ ਨਾਮ ਕੀ; ਤਿਲੁ ਵਡਿਆਈ ॥',
    pronunciation: 'sāce nām kī; til waḍiāī ‖',
    translation:
      'Trying to describe even an iota of the Greatness of the True Name,',
  },
  {
    id: '3PAD',
    src: 'ਆਖਿ ਥਕੇ; ਕੀਮਤਿ ਨਹੀ ਪਾਈ ॥',
    pronunciation: 'ākh thake; kīmat nahī pāī ‖',
    translation:
      'people have grown weary, but they have not been able to evaluate it.',
  },
  {
    id: 'TM30',
    src: 'ਜੇ ਸਭਿ ਮਿਲਿ ਕੈ; ਆਖਣ ਪਾਹਿ ॥',
    pronunciation: 'je sabh mil kē; ākhaṇ pāh ‖',
    translation: 'Even if everyone were to gather together and speak of Him,',
  },
  {
    id: '6VZM',
    src: 'ਵਡਾ ਨ ਹੋਵੈ; ਘਾਟਿ ਨ ਜਾਇ ॥੨॥',
    pronunciation: 'waḍā na hovē; ghāṭ na jāi ‖2‖',
    translation: 'He would not become any greater or any lesser. ||2||',
  },
  {
    id: 'D3SF',
    src: 'ਨਾ ਓਹੁ ਮਰੈ; ਨ ਹੋਵੈ ਸੋਗੁ ॥',
    pronunciation: 'nā oh marē; na hovē sog ‖',
    translation: 'That Lord does not die; there is no reason to mourn.',
  },
  {
    id: 'JCB0',
    src: 'ਦੇਦਾ ਰਹੈ; ਨ ਚੂਕੈ ਭੋਗੁ ॥',
    pronunciation: 'dedā rahē; na cūkē bhog ‖',
    translation: 'He continues to give, and His Provisions never run short.',
  },
  {
    id: 'KSKR',
    src: 'ਗੁਣੁ ਏਹੋ; ਹੋਰੁ ਨਾਹੀ ਕੋਇ ॥',
    pronunciation: 'guṇ eho; hor nāhī koi ‖',
    translation: 'This Virtue is His alone; there is no other like Him.',
  },
  {
    id: 'DEKT',
    src: 'ਨਾ ਕੋ ਹੋਆ; ਨਾ ਕੋ ਹੋਇ ॥੩॥',
    pronunciation: 'nā ko hoā; nā ko hoi ‖3‖',
    translation: 'There never has been, and there never will be. ||3||',
  },
  {
    id: 'KAQZ',
    src: 'ਜੇਵਡੁ ਆਪਿ; ਤੇਵਡ ਤੇਰੀ ਦਾਤਿ ॥',
    pronunciation: 'jewaḍ āpi; tewaḍ terī dāt ‖',
    translation:
      'As Great as You Yourself are, O Lord, so Great are Your Gifts.',
  },
  {
    id: 'CSBR',
    src: 'ਜਿਨਿ ਦਿਨੁ ਕਰਿ ਕੈ; ਕੀਤੀ ਰਾਤਿ ॥',
    pronunciation: 'jin din kar kē; kītī rāt ‖',
    translation: 'The One who created the day also created the night.',
  },
  {
    id: 'PH3Z',
    src: 'ਖਸਮੁ ਵਿਸਾਰਹਿ; ਤੇ ਕਮਜਾਤਿ ॥',
    pronunciation: 'khasam visārahi; te kamajāt ‖',
    translation:
      'Those who forget their Lord and Master are vile and despicable.',
  },
  {
    id: 'ZTUC',
    src: 'ਨਾਨਕ. ਨਾਵੈ ਬਾਝੁ; ਸਨਾਤਿ ॥੪॥੩॥',
    pronunciation: 'nānak. nāvē bājhu; sanāt ‖4‖3‖',
    translation:
      'O Nanak, without the Name, they are wretched outcasts. ||4||3||',
  },
  {
    id: 'LMBS',
    src: 'ਰਾਗੁ ਗੂਜਰੀ ਮਹਲਾ ੪ ॥',
    pronunciation: 'rāg gūjarī mahalā 4 ‖',
    translation: 'Raag Goojaree, Fourth Mehl:',
  },
  {
    id: '2TNR',
    src: 'ਹਰਿ ਕੇ ਜਨ, ਸਤਿਗੁਰ ਸਤਪੁਰਖਾ; ਬਿਨਉ ਕਰਉ ਗੁਰ ਪਾਸਿ ॥',
    pronunciation: 'har ke jan, satigur satapurakhā; binau karau gur pās ‖',
    translation:
      'O humble servant of the Lord, O True Guru, O True Primal Being: I offer my humble prayer to You, O Guru.',
  },
  {
    id: 'NRC0',
    src: 'ਹਮ ਕੀਰੇ ਕਿਰਮ. ਸਤਿਗੁਰ ਸਰਣਾਈ; ਕਰਿ ਦਇਆ. ਨਾਮੁ ਪਰਗਾਸਿ ॥੧॥',
    pronunciation: 'ham kīre kiram. satigur saraṇāī; kar daiā. nām paragās ‖1‖',
    translation:
      'I am a mere insect, a worm. O True Guru, I seek Your Sanctuary. Please be merciful, and bless me with the Light of the Naam, the Name of the Lord. ||1||',
  },
  {
    id: '6C6N',
    src: 'ਮੇਰੇ ਮੀਤ ਗੁਰਦੇਵ; ਮੋ ਕਉ. ਰਾਮ ਨਾਮੁ ਪਰਗਾਸਿ ॥',
    pronunciation: 'mere mīt guradev; mo kau. rām nām paragās ‖',
    translation:
      'O my Best Friend, O Divine Guru, please enlighten me with the Name of the Lord.',
  },
  {
    id: 'V7G9',
    src: 'ਗੁਰਮਤਿ ਨਾਮੁ, ਮੇਰਾ ਪ੍ਰਾਨ ਸਖਾਈ; ਹਰਿ ਕੀਰਤਿ ਹਮਰੀ ਰਹਰਾਸਿ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation:
      'guramat nāmu, merā prān sakhāī; har kīrat hamarī raharās ‖1‖ rahāu ‖',
    translation:
      "Through the Guru's Teachings, the Naam is my breath of life. The Kirtan of the Lord's Praise is my life's occupation. ||1||Pause||",
  },
  {
    id: 'QEHF',
    src: 'ਹਰਿ ਜਨ ਕੇ ਵਡ ਭਾਗ ਵਡੇਰੇ; ਜਿਨ ਹਰਿ ਹਰਿ ਸਰਧਾ, ਹਰਿ ਪਿਆਸ ॥',
    pronunciation:
      'har jan ke waḍ bhāg waḍere; jin har har saradhā, har piās ‖',
    translation:
      'The servants of the Lord have the greatest good fortune; they have faith in the Lord, and a longing for the Lord.',
  },
  {
    id: 'TZFJ',
    src: 'ਹਰਿ ਹਰਿ ਨਾਮੁ ਮਿਲੈ, ਤ੍ਰਿਪਤਾਸਹਿ; ਮਿਲਿ ਸੰਗਤਿ. ਗੁਣ ਪਰਗਾਸਿ ॥੨॥',
    pronunciation:
      'har har nām milē, tripatāsahi; mil sañgati. guṇ paragās ‖2‖',
    translation:
      'Obtaining the Name of the Lord, Har, Har, they are satisfied; joining the Sangat, the Blessed Congregation, their virtues shine forth. ||2||',
  },
  {
    id: 'J5YR',
    src: 'ਜਿਨ ਹਰਿ ਹਰਿ, ਹਰਿ ਰਸੁ ਨਾਮੁ. ਨ ਪਾਇਆ; ਤੇ ਭਾਗਹੀਣ ਜਮ ਪਾਸਿ ॥',
    pronunciation: 'jin har hari, har ras nāmu. na pāiā; te bhāgahīṇ jam pās ‖',
    translation:
      'Those who have not obtained the Sublime Essence of the Name of the Lord, Har, Har, Har, are most unfortunate; they are led away by the Messenger of Death.',
  },
  {
    id: '3B06',
    src: 'ਜੋ ਸਤਿਗੁਰ ਸਰਣਿ ਸੰਗਤਿ. ਨਹੀ ਆਏ; ਧ੍ਰਿਗੁ ਜੀਵੇ. ਧ੍ਰਿਗੁ ਜੀਵਾਸਿ ॥੩॥',
    pronunciation:
      'jo satigur saraṇ sañgati. nahī āe; dhrig jīve. dhrig jīvās ‖3‖',
    translation:
      'Those who have not sought the Sanctuary of the True Guru and the Sangat, the Holy Congregation-cursed are their lives, and cursed are their hopes of life. ||3||',
  },
  {
    id: '4174',
    src: 'ਜਿਨ ਹਰਿ ਜਨ, ਸਤਿਗੁਰ ਸੰਗਤਿ ਪਾਈ; ਤਿਨ ਧੁਰਿ ਮਸਤਕਿ ਲਿਖਿਆ ਲਿਖਾਸਿ ॥',
    pronunciation:
      'jin har jan, satigur sañgat pāī; tin dhur masatak likhiā likhās ‖',
    translation:
      'Those humble servants of the Lord who have attained the Company of the True Guru, have such pre-ordained destiny inscribed on their foreheads.',
  },
  {
    id: 'H5GP',
    src: 'ਧਨੁ ਧੰਨੁ ਸਤਸੰਗਤਿ, ਜਿਤੁ ਹਰਿ ਰਸੁ ਪਾਇਆ; ਮਿਲਿ ਜਨ ਨਾਨਕ. ਨਾਮੁ ਪਰਗਾਸਿ ॥੪॥੪॥',
    pronunciation:
      'dhan dhañn satasañgati, jit har ras pāiā; mil jan nānak. nām paragās ‖4‖4‖',
    translation:
      "Blessed, blessed is the Sat Sangat, the True Congregation, where the Lord's Essence is obtained. Meeting with His humble servant, O Nanak, the Light of the Naam shines forth. ||4||4||",
  },
  {
    id: '9P2F',
    src: 'ਰਾਗੁ ਗੂਜਰੀ ਮਹਲਾ ੫ ॥',
    pronunciation: 'rāg gūjarī mahalā 5 ‖',
    translation: 'Raag Goojaree, Fifth Mehl:',
  },
  {
    id: '5PF1',
    src: 'ਕਾਹੇ ਰੇ ਮਨ, ਚਿਤਵਹਿ ਉਦਮੁ; ਜਾ ਆਹਰਿ. ਹਰਿ ਜੀਉ ਪਰਿਆ ॥',
    pronunciation: 'kāhe re man, citawah udamu; jā āhari. har jīu pariā ‖',
    translation:
      'Why, O mind, do you plot and plan, when the Dear Lord Himself provides for your care?',
  },
  {
    id: 'ZH72',
    src: 'ਸੈਲ ਪਥਰ ਮਹਿ. ਜੰਤ ਉਪਾਏ; ਤਾ ਕਾ ਰਿਜਕੁ, ਆਗੈ ਕਰਿ ਧਰਿਆ ॥੧॥',
    pronunciation:
      'sēl pathar mahi. jañt upāe; tā kā rijaku, āgē kar dhariā ‖1‖',
    translation:
      'From rocks and stones He created living beings; He places their nourishment before them. ||1||',
  },
  {
    id: 'C143',
    src: 'ਮੇਰੇ ਮਾਧਉ ਜੀ; ਸਤਸੰਗਤਿ ਮਿਲੇ. ਸੁ ਤਰਿਆ ॥',
    pronunciation: 'mere mādhau jī; satasañgat mile. sa tariā ‖',
    translation:
      'O my Dear Lord of souls, one who joins the Sat Sangat, the True Congregation, is saved.',
  },
  {
    id: 'WQNK',
    src: 'ਗੁਰ ਪਰਸਾਦਿ ਪਰਮ ਪਦੁ ਪਾਇਆ; ਸੂਕੇ ਕਾਸਟ ਹਰਿਆ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation: 'gur parasād param pad pāiā; sūke kāsaṭ hariā ‖1‖ rahāu ‖',
    translation:
      "By Guru's Grace, the supreme status is obtained, and the dry wood blossoms forth again in lush greenery. ||1||Pause||",
  },
  {
    id: '7L0M',
    src: 'ਜਨਨਿ ਪਿਤਾ, ਲੋਕ ਸੁਤ ਬਨਿਤਾ; ਕੋਇ ਨ ਕਿਸ ਕੀ ਧਰਿਆ ॥',
    pronunciation: 'janan pitā, lok sut banitā; koi na kis kī dhariā ‖',
    translation:
      'Mothers, fathers, friends, children and spouses-no one is the support of anyone else.',
  },
  {
    id: 'HJQL',
    src: 'ਸਿਰਿ ਸਿਰਿ ਰਿਜਕੁ ਸੰਬਾਹੇ ਠਾਕੁਰੁ; ਕਾਹੇ ਮਨ ਭਉ ਕਰਿਆ ॥੨॥',
    pronunciation: 'sir sir rijak sañbāhe ṭhākuru; kāhe man bhau kariā ‖2‖',
    translation:
      'For each and every person, our Lord and Master provides sustenance. Why are you so afraid, O mind? ||2||',
  },
  {
    id: 'TYVV',
    src: 'ਊਡੇ ਊਡਿ. ਆਵੈ ਸੈ ਕੋਸਾ; ਤਿਸੁ ਪਾਛੈ ਬਚਰੇ ਛਰਿਆ ॥',
    pronunciation: 'ūḍe ūḍi. āvē sē kosā; tis pāchē bacare chariā ‖',
    translation:
      'The flamingoes fly hundreds of miles, leaving their young ones behind.',
  },
  {
    id: '59FL',
    src: 'ਤਿਨ ਕਵਣੁ ਖਲਾਵੈ, ਕਵਣੁ ਚੁਗਾਵੈ; ਮਨ ਮਹਿ. ਸਿਮਰਨੁ ਕਰਿਆ ॥੩॥',
    pronunciation:
      'tin kawaṇ khalāvē, kawaṇ cugāvē; man mahi. simaran kariā ‖3‖',
    translation:
      'Who feeds them, and who teaches them to feed themselves? Have you ever thought of this in your mind? ||3||',
  },
  {
    id: 'F2Z9',
    src: 'ਸਭਿ ਨਿਧਾਨ. ਦਸ ਅਸਟ ਸਿਧਾਨ; ਠਾਕੁਰ ਕਰ ਤਲ ਧਰਿਆ ॥',
    pronunciation: 'sabh nidhān. das asaṭ sidhān; ṭhākur kar tal dhariā ‖',
    translation:
      'All the nine treasures, and the eighteen supernatural powers are held by our Lord and Master in the Palm of His Hand.',
  },
  {
    id: 'URFH',
    src: 'ਜਨ ਨਾਨਕ. ਬਲਿ ਬਲਿ, ਸਦ ਬਲਿ ਜਾਈਐ; ਤੇਰਾ. ਅੰਤੁ ਨ ਪਾਰਾਵਰਿਆ ॥੪॥੫॥',
    pronunciation:
      'jan nānak. bal bali, sad bal jāīē; terā. añt na pārāwariā ‖4‖5‖',
    translation:
      'Servant Nanak is devoted, dedicated, forever a sacrifice to You, Lord. Your Expanse has no limit, no boundary. ||4||5||',
  },
  {
    id: '5Z1H',
    src: 'ਰਾਗੁ ਆਸਾ ਮਹਲਾ ੪ ਸੋ ਪੁਰਖੁ ॥',
    pronunciation: 'rāg āsā mahalā 4 so purakh ‖',
    translation: 'Raag Aasaa, Fourth Mehl, So Purakh ~ That Primal Being:',
  },
  {
    id: 'XLBA',
    src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
    pronunciation: 'ik oañkār satigur prasād ‖',
    translation: 'One Universal Creator God. By The Grace Of The True Guru:',
  },
  {
    id: '546S',
    src: 'ਸੋ ਪੁਰਖੁ ਨਿਰੰਜਨੁ, ਹਰਿ ਪੁਰਖੁ ਨਿਰੰਜਨੁ; ਹਰਿ ਅਗਮਾ ਅਗਮ ਅਪਾਰਾ ॥',
    pronunciation:
      'so purakh nirañjanu, har purakh nirañjanu; har agamā agam apārā ‖',
    translation:
      'That Primal Being is Immaculate and Pure. The Lord, the Primal Being, is Immaculate and Pure. The Lord is Inaccessible, Unreachable and Unrivalled.',
  },
  {
    id: '7A3W',
    src: 'ਸਭਿ ਧਿਆਵਹਿ ਸਭਿ ਧਿਆਵਹਿ ਤੁਧੁ ਜੀ; ਹਰਿ ਸਚੇ ਸਿਰਜਣਹਾਰਾ ॥',
    pronunciation: 'sabh dhiāwah sabh dhiāwah tudh jī; har sace sirajaṇahārā ‖',
    translation:
      'All meditate, all meditate on You, Dear Lord, O True Creator Lord.',
  },
  {
    id: 'R0RP',
    src: 'ਸਭਿ ਜੀਅ ਤੁਮਾਰੇ ਜੀ; ਤੂੰ ਜੀਆ ਕਾ ਦਾਤਾਰਾ ॥',
    pronunciation: 'sabh jīa tumāre jī; tūñ jīā kā dātārā ‖',
    translation: 'All living beings are Yours-You are the Giver of all souls.',
  },
  {
    id: 'Y4GD',
    src: 'ਹਰਿ ਧਿਆਵਹੁ ਸੰਤਹੁ ਜੀ; ਸਭਿ ਦੂਖ ਵਿਸਾਰਣਹਾਰਾ ॥',
    pronunciation: 'har dhiāwah sañtah jī; sabh dūkh visāraṇahārā ‖',
    translation:
      'Meditate on the Lord, O Saints; He is the Dispeller of all sorrow.',
  },
  {
    id: 'RSG2',
    src: 'ਹਰਿ ਆਪੇ ਠਾਕੁਰੁ, ਹਰਿ ਆਪੇ ਸੇਵਕੁ ਜੀ; ਕਿਆ ਨਾਨਕ. ਜੰਤ ਵਿਚਾਰਾ ॥੧॥',
    pronunciation:
      'har āpe ṭhākuru, har āpe sewak jī; kiā nānak. jañt vicārā ‖1‖',
    translation:
      'The Lord Himself is the Master, the Lord Himself is the Servant. O Nanak, the poor beings are wretched and miserable! ||1||',
  },
  {
    id: '19B9',
    src: 'ਤੂੰ ਘਟ ਘਟ ਅੰਤਰਿ, ਸਰਬ ਨਿਰੰਤਰਿ ਜੀ; ਹਰਿ ਏਕੋ ਪੁਰਖੁ ਸਮਾਣਾ ॥',
    pronunciation:
      'tūñ ghaṭ ghaṭ añtari, sarab nirañtar jī; har eko purakh samāṇā ‖',
    translation:
      'You are constant in each and every heart, and in all things. O Dear Lord, you are the One.',
  },
  {
    id: 'L2H2',
    src: 'ਇਕਿ ਦਾਤੇ. ਇਕਿ ਭੇਖਾਰੀ ਜੀ; ਸਭਿ ਤੇਰੇ ਚੋਜ ਵਿਡਾਣਾ ॥',
    pronunciation: 'ik dāte. ik bhekhārī jī; sabh tere coj viḍāṇā ‖',
    translation:
      'Some are givers, and some are beggars. This is all Your Wondrous Play.',
  },
  {
    id: 'VYNS',
    src: 'ਤੂੰ ਆਪੇ ਦਾਤਾ. ਆਪੇ ਭੁਗਤਾ ਜੀ; ਹਉ ਤੁਧੁ ਬਿਨੁ ਅਵਰੁ ਨ ਜਾਣਾ ॥',
    pronunciation: 'tūñ āpe dātā. āpe bhugatā jī; hau tudh bin awar na jāṇā ‖',
    translation:
      'You Yourself are the Giver, and You Yourself are the Enjoyer. I know no other than You.',
  },
  {
    id: 'RBRY',
    src: 'ਤੂੰ ਪਾਰਬ੍ਰਹਮੁ ਬੇਅੰਤੁ ਬੇਅੰਤੁ ਜੀ; ਤੇਰੇ. ਕਿਆ ਗੁਣ ਆਖਿ ਵਖਾਣਾ ॥',
    pronunciation: 'tūñ pārabraham beañt beañt jī; tere. kiā guṇ ākh wakhāṇā ‖',
    translation:
      'You are the Supreme Lord God, Limitless and Infinite. What Virtues of Yours can I speak of and describe?',
  },
  {
    id: 'J3TN',
    src: 'ਜੋ ਸੇਵਹਿ. ਜੋ ਸੇਵਹਿ ਤੁਧੁ ਜੀ; ਜਨੁ ਨਾਨਕੁ. ਤਿਨ ਕੁਰਬਾਣਾ ॥੨॥',
    pronunciation: 'jo sewahi. jo sewah tudh jī; jan nānaku. tin kurabāṇā ‖2‖',
    translation:
      'Unto those who serve You, unto those who serve You, Dear Lord, servant Nanak is a sacrifice. ||2||',
  },
  {
    id: 'WA39',
    src: 'ਹਰਿ ਧਿਆਵਹਿ. ਹਰਿ ਧਿਆਵਹਿ ਤੁਧੁ ਜੀ; ਸੇ ਜਨ. ਜੁਗ ਮਹਿ ਸੁਖਵਾਸੀ ॥',
    pronunciation:
      'har dhiāwahi. har dhiāwah tudh jī; se jan. jug mah sukhavāsī ‖',
    translation:
      'Those who meditate on You, Lord, those who meditate on You-those humble beings dwell in peace in this world.',
  },
  {
    id: 'WXAW',
    src: 'ਸੇ ਮੁਕਤੁ. ਸੇ ਮੁਕਤੁ ਭਏ, ਜਿਨ ਹਰਿ ਧਿਆਇਆ ਜੀ; ਤਿਨ. ਤੂਟੀ ਜਮ ਕੀ ਫਾਸੀ ॥',
    pronunciation:
      'se mukatu. se mukat bhae, jin har dhiāiā jī; tin. tūṭī jam kī phāsī ‖',
    translation:
      'They are liberated, they are liberated-those who meditate on the Lord. For them, the noose of death is cut away.',
  },
  {
    id: 'E68A',
    src: 'ਜਿਨ ਨਿਰਭਉ. ਜਿਨ ਹਰਿ ਨਿਰਭਉ ਧਿਆਇਆ ਜੀ; ਤਿਨ ਕਾ. ਭਉ ਸਭੁ ਗਵਾਸੀ ॥',
    pronunciation:
      'jin nirabhau. jin har nirabhau dhiāiā jī; tin kā. bhau sabh gavāsī ‖',
    translation:
      'Those who meditate on the Fearless One, on the Fearless Lord-all their fears are dispelled.',
  },
  {
    id: 'AZ2A',
    src: 'ਜਿਨ ਸੇਵਿਆ. ਜਿਨ ਸੇਵਿਆ ਮੇਰਾ ਹਰਿ ਜੀ; ਤੇ. ਹਰਿ ਹਰਿ ਰੂਪਿ ਸਮਾਸੀ ॥',
    pronunciation: 'jin seviā. jin seviā merā har jī; te. har har rūp samāsī ‖',
    translation:
      'Those who serve, those who serve my Dear Lord, are absorbed into the Being of the Lord, Har, Har.',
  },
  {
    id: 'ZPJH',
    src: 'ਸੇ ਧੰਨੁ ਸੇ ਧੰਨੁ. ਜਿਨ ਹਰਿ ਧਿਆਇਆ ਜੀ; ਜਨੁ ਨਾਨਕੁ. ਤਿਨ ਬਲਿ ਜਾਸੀ ॥੩॥',
    pronunciation:
      'se dhañn se dhañnu. jin har dhiāiā jī; jan nānaku. tin bal jāsī ‖3‖',
    translation:
      'Blessed are they, blessed are they, who meditate on their Dear Lord. Servant Nanak is a sacrifice to them. ||3||',
  },
  {
    id: 'BWH4',
    src: 'ਤੇਰੀ ਭਗਤਿ ਤੇਰੀ ਭਗਤਿ ਭੰਡਾਰ ਜੀ; ਭਰੇ ਬਿਅੰਤ ਬੇਅੰਤਾ ॥',
    pronunciation: 'terī bhagat terī bhagat bhañḍār jī; bhare biañt beañtā ‖',
    translation:
      'Devotion to You, devotion to You, is a treasure overflowing, infinite and beyond measure.',
  },
  {
    id: 'BZ3S',
    src: 'ਤੇਰੇ ਭਗਤ. ਤੇਰੇ ਭਗਤ. ਸਲਾਹਨਿ ਤੁਧੁ ਜੀ; ਹਰਿ ਅਨਿਕ ਅਨੇਕ ਅਨੰਤਾ ॥',
    pronunciation:
      'tere bhagat. tere bhagat. salāhan tudh jī; har anik anek anañtā ‖',
    translation:
      'Your devotees, Your devotees praise You, Dear Lord, in many and various and countless ways.',
  },
  {
    id: '20JR',
    src: 'ਤੇਰੀ ਅਨਿਕ ਤੇਰੀ ਅਨਿਕ, ਕਰਹਿ ਹਰਿ ਪੂਜਾ ਜੀ; ਤਪੁ ਤਾਪਹਿ, ਜਪਹਿ ਬੇਅੰਤਾ ॥',
    pronunciation:
      'terī anik terī anik, karah har pūjā jī; tap tāpahi, japah beañtā ‖',
    translation:
      'For You, many, for You, so very many perform worship services, O Dear Infinite Lord; they practice disciplined meditation and chant endlessly.',
  },
  {
    id: 'VPRV',
    src: 'ਤੇਰੇ ਅਨੇਕ ਤੇਰੇ ਅਨੇਕ, ਪੜਹਿ ਬਹੁ ਸਿਮ੍ਰਿਤਿ ਸਾਸਤ ਜੀ; ਕਰਿ ਕਿਰਿਆ ਖਟੁ ਕਰਮ ਕਰੰਤਾ ॥',
    pronunciation:
      'tere anek tere anek, paṛah bah simrit sāsat jī; kar kiriā khaṭ karam karañtā ‖',
    translation:
      'For You, many, for You, so very many read the various Simritees and Shaastras. They perform rituals and religious rites.',
  },
  {
    id: 'EG5N',
    src: 'ਸੇ ਭਗਤ ਸੇ ਭਗਤ ਭਲੇ, ਜਨ ਨਾਨਕ ਜੀ; ਜੋ ਭਾਵਹਿ ਮੇਰੇ ਹਰਿ ਭਗਵੰਤਾ ॥੪॥',
    pronunciation:
      'se bhagat se bhagat bhale, jan nānak jī; jo bhāwah mere har bhagawañtā ‖4‖',
    translation:
      'Those devotees, those devotees are sublime, O servant Nanak, who are pleasing to my Dear Lord God. ||4||',
  },
  {
    id: 'DREX',
    src: 'ਤੂੰ ਆਦਿ ਪੁਰਖੁ ਅਪਰੰਪਰੁ ਕਰਤਾ ਜੀ; ਤੁਧੁ ਜੇਵਡੁ. ਅਵਰੁ ਨ ਕੋਈ ॥',
    pronunciation:
      'tūñ ād purakh aparañpar karatā jī; tudh jewaḍu. awar na koī ‖',
    translation:
      'You are the Primal Being, the Most Wonderful Creator. There is no other as Great as You.',
  },
  {
    id: 'X5GM',
    src: 'ਤੂੰ ਜੁਗੁ ਜੁਗੁ ਏਕੋ, ਸਦਾ ਸਦਾ ਤੂੰ ਏਕੋ ਜੀ; ਤੂੰ ਨਿਹਚਲੁ ਕਰਤਾ ਸੋਈ ॥',
    pronunciation:
      'tūñ jug jug eko, sadā sadā tūñ eko jī; tūñ nihacal karatā soī ‖',
    translation:
      'Age after age, You are the One. Forever and ever, You are the One. You never change, O Creator Lord.',
  },
  {
    id: 'XMW3',
    src: 'ਤੁਧੁ ਆਪੇ ਭਾਵੈ ਸੋਈ ਵਰਤੈ ਜੀ; ਤੂੰ ਆਪੇ ਕਰਹਿ ਸੁ ਹੋਈ ॥',
    pronunciation: 'tudh āpe bhāvē soī waratē jī; tūñ āpe karah sa hoī ‖',
    translation:
      'Everything happens according to Your Will. You Yourself accomplish all that occurs.',
  },
  {
    id: 'Z23M',
    src: 'ਤੁਧੁ ਆਪੇ ਸ੍ਰਿਸਟਿ ਸਭ ਉਪਾਈ ਜੀ; ਤੁਧੁ ਆਪੇ ਸਿਰਜਿ ਸਭ ਗੋਈ ॥',
    pronunciation: 'tudh āpe srisaṭ sabh upāī jī; tudh āpe siraj sabh goī ‖',
    translation:
      'You Yourself created the entire universe, and having fashioned it, You Yourself shall destroy it all.',
  },
  {
    id: 'GMYB',
    src: 'ਜਨੁ ਨਾਨਕੁ. ਗੁਣ ਗਾਵੈ ਕਰਤੇ ਕੇ ਜੀ; ਜੋ ਸਭਸੈ ਕਾ ਜਾਣੋਈ ॥੫॥੧॥',
    pronunciation:
      'jan nānaku. guṇ gāvē karate ke jī; jo sabhasē kā jāṇoī ‖5‖1‖',
    translation:
      'Servant Nanak sings the Glorious Praises of the Dear Creator, the Knower of all. ||5||1||',
  },
  {
    id: 'PU4S',
    src: 'ਆਸਾ ਮਹਲਾ ੪ ॥',
    pronunciation: 'āsā mahalā 4 ‖',
    translation: 'Aasaa, Fourth Mehl:',
  },
  {
    id: 'GWN2',
    src: 'ਤੂੰ ਕਰਤਾ ਸਚਿਆਰੁ; ਮੈਡਾ ਸਾਂਈ ॥',
    pronunciation: 'tūñ karatā saciāru; mēḍā sāñī ‖',
    translation: 'You are the True Creator, my Lord and Master.',
  },
  {
    id: 'J4VD',
    src: 'ਜੋ ਤਉ ਭਾਵੈ. ਸੋਈ ਥੀਸੀ; ਜੋ ਤੂੰ ਦੇਹਿ. ਸੋਈ ਹਉ ਪਾਈ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation:
      'jo tau bhāvē. soī thīsī; jo tūñ dehi. soī hau pāī ‖1‖ rahāu ‖',
    translation:
      'Whatever pleases You comes to pass. As You give, so do we receive. ||1||Pause||',
  },
  {
    id: '2Q5J',
    src: 'ਸਭ ਤੇਰੀ; ਤੂੰ ਸਭਨੀ ਧਿਆਇਆ ॥',
    pronunciation: 'sabh terī; tūñ sabhanī dhiāiā ‖',
    translation: 'All belong to You, all meditate on you.',
  },
  {
    id: 'QNAM',
    src: 'ਜਿਸ ਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ; ਤਿਨਿ ਨਾਮ ਰਤਨੁ ਪਾਇਆ ॥',
    pronunciation: 'jis no kripā karahi; tin nām ratan pāiā ‖',
    translation:
      'Those who are blessed with Your Mercy obtain the Jewel of the Naam, the Name of the Lord.',
  },
  {
    id: '118H',
    src: 'ਗੁਰਮੁਖਿ ਲਾਧਾ; ਮਨਮੁਖਿ ਗਵਾਇਆ ॥',
    pronunciation: 'guramukh lādhā; manamukh gavāiā ‖',
    translation:
      'The Gurmukhs obtain it, and the self-willed manmukhs lose it.',
  },
  {
    id: 'WPW0',
    src: 'ਤੁਧੁ ਆਪਿ ਵਿਛੋੜਿਆ; ਆਪਿ ਮਿਲਾਇਆ ॥੧॥',
    pronunciation: 'tudh āp vichoṛiā; āp milāiā ‖1‖',
    translation:
      'You Yourself separate them from Yourself, and You Yourself reunite with them again. ||1||',
  },
  {
    id: 'VSZM',
    src: 'ਤੂੰ ਦਰੀਆਉ; ਸਭ ਤੁਝ ਹੀ ਮਾਹਿ ॥',
    pronunciation: 'tūñ darīāu; sabh tujh hī māh ‖',
    translation: 'You are the River of Life; all are within You.',
  },
  {
    id: 'ZRNB',
    src: 'ਤੁਝ ਬਿਨੁ; ਦੂਜਾ ਕੋਈ ਨਾਹਿ ॥',
    pronunciation: 'tujh binu; dūjā koī nāh ‖',
    translation: 'There is no one except You.',
  },
  {
    id: 'X4LD',
    src: 'ਜੀਅ ਜੰਤ; ਸਭਿ ਤੇਰਾ ਖੇਲੁ ॥',
    pronunciation: 'jīa jañt; sabh terā khel ‖',
    translation: 'All living beings are Your playthings.',
  },
  {
    id: 'R647',
    src: 'ਵਿਜੋਗਿ ਮਿਲਿ. ਵਿਛੁੜਿਆ; ਸੰਜੋਗੀ ਮੇਲੁ ॥੨॥',
    pronunciation: 'vijog mili. vichuṛiā; sañjogī mel ‖2‖',
    translation:
      'The separated ones meet, and by great good fortune, those suffering in separation are reunited once again. ||2||',
  },
  {
    id: 'FPYB',
    src: 'ਜਿਸ ਨੋ ਤੂ ਜਾਣਾਇਹਿ; ਸੋਈ ਜਨੁ ਜਾਣੈ ॥',
    pronunciation: 'jis no tū jāṇāihi; soī jan jāṇē ‖',
    translation: 'They alone understand, whom You inspire to understand;',
  },
  {
    id: '7906',
    src: 'ਹਰਿ ਗੁਣ; ਸਦ ਹੀ ਆਖਿ ਵਖਾਣੈ ॥',
    pronunciation: 'har guṇ; sad hī ākh wakhāṇē ‖',
    translation: "they continually chant and repeat the Lord's Praises.",
  },
  {
    id: 'D9TJ',
    src: 'ਜਿਨਿ ਹਰਿ ਸੇਵਿਆ; ਤਿਨਿ ਸੁਖੁ ਪਾਇਆ ॥',
    pronunciation: 'jin har seviā; tin sukh pāiā ‖',
    translation: 'Those who serve You find peace.',
  },
  {
    id: 'N8TZ',
    src: 'ਸਹਜੇ ਹੀ; ਹਰਿ ਨਾਮਿ ਸਮਾਇਆ ॥੩॥',
    pronunciation: 'sahaje hī; har nām samāiā ‖3‖',
    translation: "They are intuitively absorbed into the Lord's Name. ||3||",
  },
  {
    id: 'XXG7',
    src: 'ਤੂ ਆਪੇ ਕਰਤਾ; ਤੇਰਾ ਕੀਆ ਸਭੁ ਹੋਇ ॥',
    pronunciation: 'tū āpe karatā; terā kīā sabh hoi ‖',
    translation:
      'You Yourself are the Creator. Everything that happens is by Your Doing.',
  },
  {
    id: 'FB8H',
    src: 'ਤੁਧੁ ਬਿਨੁ; ਦੂਜਾ ਅਵਰੁ ਨ ਕੋਇ ॥',
    pronunciation: 'tudh binu; dūjā awar na koi ‖',
    translation: 'There is no one except You.',
  },
  {
    id: 'C9G1',
    src: 'ਤੂ ਕਰਿ ਕਰਿ ਵੇਖਹਿ; ਜਾਣਹਿ ਸੋਇ ॥',
    pronunciation: 'tū kar kar vekhahi; jāṇah soi ‖',
    translation: 'You created the creation; You behold it and understand it.',
  },
  {
    id: 'V9GC',
    src: 'ਜਨ ਨਾਨਕ; ਗੁਰਮੁਖਿ ਪਰਗਟੁ ਹੋਇ ॥੪॥੨॥',
    pronunciation: 'jan nānak; guramukh paragaṭ hoi ‖4‖2‖',
    translation:
      "O servant Nanak, the Lord is revealed through the Gurmukh, the Living Expression of the Guru's Word. ||4||2||",
  },
  {
    id: 'QMNP',
    src: 'ਆਸਾ ਮਹਲਾ ੧ ॥',
    pronunciation: 'āsā mahalā 1 ‖',
    translation: 'Aasaa, First Mehl:',
  },
  {
    id: 'C1M8',
    src: 'ਤਿਤੁ ਸਰਵਰੜੈ, ਭਈਲੇ ਨਿਵਾਸਾ; ਪਾਣੀ ਪਾਵਕੁ ਤਿਨਹਿ ਕੀਆ ॥',
    pronunciation: 'tit sarawaraṛē, bhaīle nivāsā; pāṇī pāwak tinah kīā ‖',
    translation:
      'In that pool, people have made their homes, but the water there is as hot as fire!',
  },
  {
    id: '3BMK',
    src: 'ਪੰਕਜੁ ਮੋਹ, ਪਗੁ ਨਹੀ ਚਾਲੈ; ਹਮ ਦੇਖਾ. ਤਹ ਡੂਬੀਅਲੇ ॥੧॥',
    pronunciation: 'pañkaj moh, pag nahī cālē; ham dekhā. tah ḍūbīale ‖1‖',
    translation:
      'In the swamp of emotional attachment, their feet cannot move. I have seen them drowning there. ||1||',
  },
  {
    id: 'DM2A',
    src: 'ਮਨ. ਏਕੁ ਨ ਚੇਤਸਿ; ਮੂੜ ਮਨਾ ॥',
    pronunciation: 'man. ek na cetasi; mūṛ manā ‖',
    translation: 'In your mind, you do not remember the One Lord-you fool!',
  },
  {
    id: '35VY',
    src: 'ਹਰਿ ਬਿਸਰਤ; ਤੇਰੇ ਗੁਣ ਗਲਿਆ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation: 'har bisarat; tere guṇ galiā ‖1‖ rahāu ‖',
    translation:
      'You have forgotten the Lord; your virtues shall wither away. ||1||Pause||',
  },
  {
    id: 'PBVU',
    src: 'ਨਾ ਹਉ ਜਤੀ ਸਤੀ. ਨਹੀ ਪੜਿਆ; ਮੂਰਖ ਮੁਗਧਾ ਜਨਮੁ ਭਇਆ ॥',
    pronunciation: 'nā hau jatī satī. nahī paṛiā; mūrakh mugadhā janam bhaiā ‖',
    translation:
      'I am not celibate, nor truthful, nor scholarly. I was born foolish and ignorant into this world.',
  },
  {
    id: 'A1MY',
    src: 'ਪ੍ਰਣਵਤਿ ਨਾਨਕ. ਤਿਨ ਕੀ ਸਰਣਾ; ਜਿਨ ਤੂ ਨਾਹੀ ਵੀਸਰਿਆ ॥੨॥੩॥',
    pronunciation: 'praṇawat nānak. tin kī saraṇā; jin tū nāhī vīsariā ‖2‖3‖',
    translation:
      'Prays Nanak, I seek the Sanctuary of those who have not forgotten You, O Lord! ||2||3||',
  },
  {
    id: 'YTAK',
    src: 'ਆਸਾ ਮਹਲਾ ੫ ॥',
    pronunciation: 'āsā mahalā 5 ‖',
    translation: 'Aasaa, Fifth Mehl:',
  },
  {
    id: 'Y2GA',
    src: 'ਭਈ ਪਰਾਪਤਿ; ਮਾਨੁਖ ਦੇਹੁਰੀਆ ॥',
    pronunciation: 'bhaī parāpati; mānukh dehurīā ‖',
    translation: 'This human body has been given to you.',
  },
  {
    id: '4RGG',
    src: 'ਗੋਬਿੰਦ ਮਿਲਣ ਕੀ; ਇਹ ਤੇਰੀ ਬਰੀਆ ॥',
    pronunciation: 'gobiñd milaṇ kī; ih terī barīā ‖',
    translation: 'This is your chance to meet the Lord of the Universe.',
  },
  {
    id: 'QSEF',
    src: 'ਅਵਰਿ ਕਾਜ ਤੇਰੈ; ਕਿਤੈ ਨ ਕਾਮ ॥',
    pronunciation: 'awar kāj terē; kitē na kām ‖',
    translation: 'Nothing else will work.',
  },
  {
    id: '6LJU',
    src: 'ਮਿਲੁ ਸਾਧਸੰਗਤਿ; ਭਜੁ ਕੇਵਲ ਨਾਮ ॥੧॥',
    pronunciation: 'mil sādhasañgati; bhaj kewal nām ‖1‖',
    translation:
      'Join the Saadh Sangat, the Company of the Holy; vibrate and meditate on the Jewel of the Naam. ||1||',
  },
  {
    id: 'RZ95',
    src: 'ਸਰੰਜਾਮਿ ਲਾਗੁ; ਭਵਜਲ ਤਰਨ ਕੈ ॥',
    pronunciation: 'sarañjām lāgu; bhawajal taran kē ‖',
    translation: 'Make every effort to cross over this terrifying world-ocean.',
  },
  {
    id: '9108',
    src: 'ਜਨਮੁ ਬ੍ਰਿਥਾ ਜਾਤ; ਰੰਗਿ ਮਾਇਆ ਕੈ ॥੧॥ ਰਹਾਉ ॥',
    pronunciation: 'janam brithā jāt; rañg māiā kē ‖1‖ rahāu ‖',
    translation:
      'You are squandering this life uselessly in the love of Maya. ||1||Pause||',
  },
  {
    id: '17FB',
    src: 'ਜਪੁ ਤਪੁ ਸੰਜਮੁ ਧਰਮੁ ਨ ਕਮਾਇਆ ॥',
    pronunciation: 'jap tap sañjam dharam na kamāiā ‖',
    translation:
      'I have not practiced meditation, self-discipline, self-restraint or righteous living.',
  },
  {
    id: 'FHZR',
    src: 'ਸੇਵਾ ਸਾਧ ਨ ਜਾਨਿਆ ਹਰਿ ਰਾਇਆ ॥',
    pronunciation: 'sevā sādh na jāniā har rāiā ‖',
    translation:
      'I have not served the Holy; I have not acknowledged the Lord, my King.',
  },
  {
    id: 'BMYR',
    src: 'ਕਹੁ ਨਾਨਕ; ਹਮ ਨੀਚ ਕਰੰਮਾ ॥',
    pronunciation: 'kah nānak; ham nīc karañmā ‖',
    translation: 'Says Nanak, my actions are contemptible!',
  },
  {
    id: '9B0E',
    src: 'ਸਰਣਿ ਪਰੇ ਕੀ; ਰਾਖਹੁ ਸਰਮਾ ॥੨॥੪॥',
    pronunciation: 'saraṇ pare kī; rākhah saramā ‖2‖4‖',
    translation:
      'O Lord, I seek Your Sanctuary; please, preserve my honor! ||2||4||',
  },
  {
    id: 'WJ68',
    src: 'ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥',
    pronunciation: 'ik oañkār vāhigurū jī kī phatah ‖',
    translation: 'The Lord is One and the Victory is of the True Guru.',
  },
  {
    id: 'CHL7',
    src: 'ਪਾਤਿਸਾਹੀ ੧੦ ॥',
    pronunciation: 'pātisāhī 10 ‖',
    translation: '(By) Tenth Master, (in) Deviant Metre,',
  },
  {
    id: '6KNN',
    src: 'ਕਬਿਯੋ ਬਾਚ ਬੇਨਤੀ ॥ ਚੌਪਈ ॥',
    pronunciation: 'kabiyo bāc benatī ‖ cōpaī ‖',
    translation: 'Speech of the poet. Chaupai',
  },
  {
    id: 'R6ML',
    src: 'ਹਮਰੀ ਕਰੋ ਹਾਥ ਦੈ ਰੱਛਾ ॥',
    pronunciation: 'hamarī karo hāth dē racchā ‖',
    translation: 'Protect me O Lord! with Thine own Hands',
  },
  {
    id: 'P1M6',
    src: 'ਪੂਰਨ ਹੋਇ ਚਿਤ ਕੀ ਇੱਛਾ ॥',
    pronunciation: 'pūran hoi cit kī icchā ‖',
    translation: 'all the desires of my heart be fulfilled.',
  },
  {
    id: 'CP5D',
    src: 'ਤਵ ਚਰਨਨ ਮਨ ਰਹੈ ਹਮਾਰਾ ॥',
    pronunciation: 'tav caranan man rahē hamārā ‖',
    translation: 'Let my mind rest under Thy Feet',
  },
  {
    id: 'U8NW',
    src: 'ਅਪਨਾ ਜਾਨ ਕਰੋ ਪ੍ਰਤਿਪਾਰਾ ॥੩੭੭॥',
    pronunciation: 'apanā jān karo pratipārā ‖377‖',
    translation: 'Sustain me, considering me Thine own.377.',
  },
  {
    id: 'QXDA',
    src: 'ਹਮਰੇ ਦੁਸਟ ਸਭੈ ਤੁਮ ਘਾਵਹੁ ॥',
    pronunciation: 'hamare dusaṭ sabhē tum ghāwah ‖',
    translation: 'Destroy, O Lord! all my enemies and',
  },
  {
    id: 'SQJB',
    src: 'ਆਪੁ ਹਾਥ ਦੈ ਮੋਹਿ ਬਚਾਵਹੁ ॥',
    pronunciation: 'āp hāth dē moh bacāwah ‖',
    translation: 'protect me with Thine won Hnads.',
  },
  {
    id: 'AE2T',
    src: 'ਸੁਖੀ ਬਸੈ ਮੋਰੋ ਪਰਿਵਾਰਾ ॥',
    pronunciation: 'sukhī basē moro parivārā ‖',
    translation: 'May my family live in comfort',
  },
  {
    id: 'XFP4',
    src: 'ਸੇਵਕ ਸਿੱਖ ਸਭੈ ਕਰਤਾਰਾ ॥੩੭੮॥',
    pronunciation: 'sewak sikkh sabhē karatārā ‖378‖',
    translation: 'and ease alongwith all my servants and disciples.378.',
  },
  {
    id: 'R1TY',
    src: 'ਮੋ ਰੱਛਾ ਨਿਜ ਕਰ ਦੈ ਕਰਿਯੈ ॥',
    pronunciation: 'mo racchā nij kar dē kariyē ‖',
    translation: 'Protect me O Lord! with Thine own Hands',
  },
  {
    id: 'D8U7',
    src: 'ਸਭ ਬੈਰਨ ਕੋ ਆਜ ਸੰਘਰਿਯੈ ॥',
    pronunciation: 'sabh bēran ko āj sañghariyē ‖',
    translation: 'and destroy this day all my enemies',
  },
  {
    id: 'BG7D',
    src: 'ਪੂਰਨ ਹੋਇ ਹਮਾਰੀ ਆਸਾ ॥',
    pronunciation: 'pūran hoi hamārī āsā ‖',
    translation: 'May all the aspirations be fulfilled',
  },
  {
    id: 'V73H',
    src: 'ਤੋਰ ਭਜਨ ਕੀ ਰਹੈ ਪਿਆਸਾ ॥੩੭੯॥',
    pronunciation: 'tor bhajan kī rahē piāsā ‖379‖',
    translation: 'Let my thirst for Thy Name remain afresh.379.',
  },
  {
    id: 'B4AY',
    src: 'ਤੁਮਹਿ ਛਾਡਿ, ਕੋਈ ਅਵਰ ਨ ਧਿਯਾਊਂ ॥',
    pronunciation: 'tumah chāḍi, koī awar na dhiyāūñ ‖',
    translation: 'I may remember none else except Thee',
  },
  {
    id: 'KSTH',
    src: 'ਜੋ ਬਰ ਚਹੋਂ, ਸੁ ਤੁਮ ਤੇ ਪਾਊਂ ॥',
    pronunciation: 'jo bar cahoñ, sa tum te pāūñ ‖',
    translation: 'And obtain all the required boons from Thee',
  },
  {
    id: 'FHPG',
    src: 'ਸੇਵਕ ਸਿੱਖ ਹਮਾਰੇ ਤਾਰੀਅਹਿ ॥',
    pronunciation: 'sewak sikkh hamāre tārīah ‖',
    translation: 'Let my servants and disciples cross the world-ocean',
  },
  {
    id: '2JMJ',
    src: 'ਚੁਨਿ ਚੁਨਿ ਸਤ੍ਰ ਹਮਾਰੇ ਮਾਰੀਅਹਿ ॥੩੮੦॥',
    pronunciation: 'cun cun satr hamāre mārīah ‖380‖',
    translation: 'All my enemies be singled out and killed.380.',
  },
  {
    id: '6EUL',
    src: 'ਆਪ ਹਾਥ ਦੈ ਮੁਝੈ ਉਬਰਿਯੈ ॥',
    pronunciation: 'āp hāth dē mujhē ubariyē ‖',
    translation: 'Protect me O Lord! with Thine own Hands and',
  },
  {
    id: '4MS3',
    src: 'ਮਰਨ ਕਾਲ ਕਾ ਤ੍ਰਾਸ ਨਿਵਰਿਯੈ ॥',
    pronunciation: 'maran kāl kā trās niwariyē ‖',
    translation: 'relieve me form the fear of death',
  },
  {
    id: 'SLHB',
    src: 'ਹੂਜੋ ਸਦਾ ਹਮਾਰੇ ਪੱਛਾ ॥',
    pronunciation: 'hūjo sadā hamāre pacchā ‖',
    translation: 'May Thou ever Bestow Thy favours on my side',
  },
  {
    id: '5R1H',
    src: 'ਸ੍ਰੀ ਅਸਿਧੁਜ ਜੂ, ਕਰਿਯਹੁ ਰੱਛਾ ॥੩੮੧॥',
    pronunciation: 'srī asidhuj jū, kariyah racchā ‖381‖',
    translation: 'Protect me O Lord! Thou, the Supreme Destroyer.381.',
  },
  {
    id: '3DD4',
    src: 'ਰਾਖਿ ਲੇਹੁ ਮੁਹਿ ਰਾਖਨਹਾਰੇ ॥',
    pronunciation: 'rākh leh muh rākhanahāre ‖',
    translation: 'Protect me, O Protector Lord!',
  },
  {
    id: 'VD48',
    src: 'ਸਾਹਿਬ ਸੰਤ ਸਹਾਇ ਪਿਯਾਰੇ ॥',
    pronunciation: 'sāhib sañt sahāi piyāre ‖',
    translation: 'Most dear, the Protector of the Saints:',
  },
  {
    id: 'XGA3',
    src: 'ਦੀਨ ਬੰਧੁ ਦੁਸਟਨ ਕੇ ਹੰਤਾ ॥',
    pronunciation: 'dīn bañdh dusaṭan ke hañtā ‖',
    translation: 'Friend of poor and the Destroyer of the enemies',
  },
  {
    id: 'P2PS',
    src: 'ਤੁਮ ਹੋ, ਪੁਰੀ ਚਤੁਰਦਸ ਕੰਤਾ ॥੩੮੨॥',
    pronunciation: 'tum ho, purī caturadas kañtā ‖382‖',
    translation: 'Thou art the Master of the fourteen worlds.382.',
  },
  {
    id: 'K6XR',
    src: 'ਕਾਲ ਪਾਇ, ਬ੍ਰਹਮਾ ਬਪੁ ਧਰਾ ॥',
    pronunciation: 'kāl pāi, brahamā bap dharā ‖',
    translation: 'In due time Brahma appeared in physical form',
  },
  {
    id: 'URR4',
    src: 'ਕਾਲ ਪਾਇ, ਸਿਵ ਜੂ ਅਵਤਰਾ ॥',
    pronunciation: 'kāl pāi, siv jū awatarā ‖',
    translation: 'In due time Shiva incarnated',
  },
  {
    id: 'NQX3',
    src: 'ਕਾਲ ਪਾਇ ਕਰ, ਬਿਸਨੁ ਪ੍ਰਕਾਸਾ ॥',
    pronunciation: 'kāl pāi kar, bisan prakāsā ‖',
    translation: 'In due time Vishnu manifested himself',
  },
  {
    id: '7VQC',
    src: 'ਸਕਲ ਕਾਲ ਕਾ ਕੀਆ ਤਮਾਸਾ ॥੩੮੩॥',
    pronunciation: 'sakal kāl kā kīā tamāsā ‖383‖',
    translation: 'All this is the play of the Temporal Lord.383.',
  },
  {
    id: 'A9HF',
    src: 'ਜਵਨ ਕਾਲ, ਜੋਗੀ ਸਿਵ ਕੀਓ ॥',
    pronunciation: 'jawan kāl, jogī siv kīo ‖',
    translation: 'The Temporal Lord, who created Shiva, the Yogi',
  },
  {
    id: '48SM',
    src: 'ਬੇਦ ਰਾਜ, ਬ੍ਰਹਮਾ ਜੂ ਥੀਓ ॥',
    pronunciation: 'bed rāj, brahamā jū thīo ‖',
    translation: 'Who created Brahma, the Master of the Vedas',
  },
  {
    id: 'Z5CD',
    src: 'ਜਵਨ ਕਾਲ, ਸਭ ਲੋਕ ਸਵਾਰਾ ॥',
    pronunciation: 'jawan kāl, sabh lok savārā ‖',
    translation: 'The Temporal Lord who fashioned the entire world',
  },
  {
    id: '7SLL',
    src: 'ਨਮਸਕਾਰ ਹੈ, ਤਾਹਿ ਹਮਾਰਾ ॥੩੮੪॥',
    pronunciation: 'namasakār hē, tāh hamārā ‖384‖',
    translation: 'I salute the same Lord.384.',
  },
  {
    id: '2EJU',
    src: 'ਜਵਨ ਕਾਲ, ਸਭ ਜਗਤ ਬਨਾਯੋ ॥',
    pronunciation: 'jawan kāl, sabh jagat banāyo ‖',
    translation: 'The Temporal Lord, who created the whole world',
  },
  {
    id: '5LAZ',
    src: 'ਦੇਵ ਦੈਤ ਜੱਛਨ ਉਪਜਾਯੋ ॥',
    pronunciation: 'dev dēt jacchan upajāyo ‖',
    translation: 'Who created gods, demons and yakshas',
  },
  {
    id: 'WWUW',
    src: 'ਆਦਿ ਅੰਤਿ, ਏਕੈ ਅਵਤਾਰਾ ॥',
    pronunciation: 'ād añti, ekē awatārā ‖',
    translation: 'He is the only one form the beginning to the end',
  },
  {
    id: 'MKY4',
    src: 'ਸੋਈ, ਗੁਰੂ ਸਮਝਿਯਹੁ ਹਮਾਰਾ ॥੩੮੫॥',
    pronunciation: 'soī, gurū samajhiyah hamārā ‖385‖',
    translation: 'I consider Him only my Guru.385.',
  },
  {
    id: 'TK9G',
    src: 'ਨਮਸਕਾਰ, ਤਿਸ ਹੀ ਕੋ ਹਮਾਰੀ ॥',
    pronunciation: 'namasakār, tis hī ko hamārī ‖',
    translation: 'I salute Him, non else, but Him',
  },
  {
    id: '6C2M',
    src: 'ਸਕਲ ਪ੍ਰਜਾ ਜਿਨ ਆਪ ਸਵਾਰੀ ॥',
    pronunciation: 'sakal prajā jin āp savārī ‖',
    translation: 'Who has created Himself and His subject',
  },
  {
    id: 'HYGL',
    src: 'ਸਿਵਕਨ ਕੋ, ਸਿਵਗੁਨ ਸੁਖ ਦੀਓ ॥',
    pronunciation: 'siwakan ko, siwagun sukh dīo ‖',
    translation: 'He bestows Divine virtues and happiness on His servants',
  },
  {
    id: '5JSD',
    src: 'ਸੱਤ੍ਰੁਨ ਕੋ, ਪਲ ਮੋ ਬਧ ਕੀਓ ॥੩੮੬॥',
    pronunciation: 'sattrun ko, pal mo badh kīo ‖386‖',
    translation: 'He destroys the enemies instantly.386.',
  },
  {
    id: 'KTBW',
    src: 'ਘਟ ਘਟ ਕੇ ਅੰਤਰ ਕੀ ਜਾਨਤ ॥',
    pronunciation: 'ghaṭ ghaṭ ke añtar kī jānat ‖',
    translation: 'He knows the inner feelings of every heart',
  },
  {
    id: 'C4JM',
    src: 'ਭਲੇ ਬੁਰੇ ਕੀ ਪੀਰ ਪਛਾਨਤ ॥',
    pronunciation: 'bhale bure kī pīr pachānat ‖',
    translation: 'He knows the anguish of both good and bad',
  },
  {
    id: 'ZTEV',
    src: 'ਚੀਟੀ ਤੇ ਕੁੰਚਰ ਅਸਥੂਲਾ ॥',
    pronunciation: 'cīṭī te kuñcar asathūlā ‖',
    translation: 'From the ant to the solid elephant',
  },
  {
    id: 'KEE1',
    src: 'ਸਭ ਪਰ, ਕ੍ਰਿਪਾ ਦ੍ਰਿਸਟਿ ਕਰਿ ਫੂਲਾ ॥੩੮੭॥',
    pronunciation: 'sabh par, kripā drisaṭ kar phūlā ‖387‖',
    translation: 'He casts His Graceful glance on all and feels pleased.387.',
  },
  {
    id: '65FT',
    src: 'ਸੰਤਨ ਦੁਖ ਪਾਏ ਤੇ ਦੁਖੀ ॥',
    pronunciation: 'sañtan dukh pāe te dukhī ‖',
    translation: 'He is painful, when He sees His saints in grief',
  },
  {
    id: 'P8Z5',
    src: 'ਸੁਖ ਪਾਏ ਸਾਧੁਨ ਕੇ ਸੁਖੀ ॥',
    pronunciation: 'sukh pāe sādhun ke sukhī ‖',
    translation: 'He is happy, when His saints are happy.',
  },
  {
    id: 'L78Q',
    src: 'ਏਕ ਏਕ ਕੀ ਪੀਰ ਪਛਾਨੈਂ ॥',
    pronunciation: 'ek ek kī pīr pachānēñ ‖',
    translation: 'He knows the agony of everyone',
  },
  {
    id: 'DR9Y',
    src: 'ਘਟ ਘਟ ਕੇ, ਪਟ ਪਟ ਕੀ ਜਾਨੈਂ ॥੩੮੮॥',
    pronunciation: 'ghaṭ ghaṭ ke, paṭ paṭ kī jānēñ ‖388‖',
    translation: 'He knows the innermost secrets of every heart.388.',
  },
  {
    id: 'U9PE',
    src: 'ਜਬ, ਉਦਕਰਖ ਕਰਾ ਕਰਤਾਰਾ ॥',
    pronunciation: 'jab, udakarakh karā karatārā ‖',
    translation: 'When the Creator projected Himself,',
  },
  {
    id: 'KZHP',
    src: 'ਪ੍ਰਜਾ ਧਰਤ, ਤਬ ਦੇਹ ਅਪਾਰਾ ॥',
    pronunciation: 'prajā dharat, tab deh apārā ‖',
    translation: 'His creation manifested itself in innumerable forms',
  },
  {
    id: '42J2',
    src: 'ਜਬ, ਆਕਰਖ ਕਰਤ ਹੋ ਕਬਹੂੰ ॥',
    pronunciation: 'jab, ākarakh karat ho kabahūñ ‖',
    translation: 'When at any time He withdraws His creation,',
  },
  {
    id: 'L0YQ',
    src: 'ਤੁਮ ਮੈ ਮਿਲਤ, ਦੇਹ ਧਰ ਸਭਹੂੰ ॥੩੮੯॥',
    pronunciation: 'tum mē milat, deh dhar sabhahūñ ‖389‖',
    translation: 'all the physical forms are merged in Him.389.',
  },
  {
    id: 'BXD5',
    src: 'ਜੇਤੇ ਬਦਨ ਸ੍ਰਿਸਟਿ ਸਭ ਧਾਰੈ ॥',
    pronunciation: 'jete badan srisaṭ sabh dhārē ‖',
    translation: 'All the bodies of living beings created in the world',
  },
  {
    id: 'VWNC',
    src: 'ਆਪੁ ਆਪਨੀ ਬੂਝ ਉਚਾਰੈ ॥',
    pronunciation: 'āp āpanī būjh ucārē ‖',
    translation: 'speak about Him according to their understanding',
  },
  {
    id: 'R0LK',
    src: 'ਤੁਮ ਸਭ ਹੀ ਤੇ ਰਹਤ ਨਿਰਾਲਮ ॥',
    pronunciation: 'tum sabh hī te rahat nirālam ‖',
    translation: 'But Thou, O Lord! live quite apart from everything',
  },
  {
    id: '9AAW',
    src: 'ਜਾਨਤ ਬੇਦ ਭੇਦ ਅਰ ਆਲਮ ॥੩੯੦॥',
    pronunciation: 'jānat bed bhed ar ālam ‖390‖',
    translation: 'this fact is know to the Vedas and the learned.390.',
  },
  {
    id: '1MMU',
    src: 'ਨਿਰੰਕਾਰ ਨ੍ਰਿਬਿਕਾਰ ਨਿਰਲੰਭ ॥',
    pronunciation: 'nirañkār nribikār niralañbh ‖',
    translation: 'The Lord is Formless, Sinless and shelterless:',
  },
  {
    id: 'T1T4',
    src: 'ਆਦਿ ਅਨੀਲ ਅਨਾਦਿ ਅਸੰਭ ॥',
    pronunciation: 'ād anīl anād asañbh ‖',
    translation:
      'He is the Primal Power, without Blemish, without Beginning and Unborn',
  },
  {
    id: 'YN4A',
    src: 'ਤਾ ਕਾ ਮੂੜ੍ਹ ਉਚਾਰਤ ਭੇਦਾ ॥',
    pronunciation: 'tā kā mūṛh ucārat bhedā ‖',
    translation:
      'The fool claims boastfully about the knowledge of His secrets,',
  },
  {
    id: 'AVLG',
    src: 'ਜਾ ਕੋ ਭੇਵ ਨ ਪਾਵਤ ਬੇਦਾ ॥੩੯੧॥',
    pronunciation: 'jā ko bhev na pāwat bedā ‖391‖',
    translation: 'which even the Vedas do not know.391.',
  },
  {
    id: '6VZ6',
    src: 'ਤਾ ਕੋ ਕਰਿ ਪਾਹਨ ਅਨੁਮਾਨਤ ॥',
    pronunciation: 'tā ko kar pāhan anumānat ‖',
    translation: 'The fool considers Him a stone,',
  },
  {
    id: 'U5RH',
    src: 'ਮਹਾ ਮੂੜ੍ਹ ਕਛੁ ਭੇਦ ਨ ਜਾਨਤ ॥',
    pronunciation: 'mahā mūṛh kach bhed na jānat ‖',
    translation: 'but the great fool does not know any secret',
  },
  {
    id: 'LQH8',
    src: 'ਮਹਾਦੇਵ ਕੋ ਕਹਤ ਸਦਾ ਸਿਵ ॥',
    pronunciation: 'mahādev ko kahat sadā siv ‖',
    translation: 'He calls Shiva “The Eternal Lord,',
  },
  {
    id: 'EANN',
    src: 'ਨਿਰੰਕਾਰ ਕਾ ਚੀਨਤ ਨਹਿ ਭਿਵ ॥੩੯੨॥',
    pronunciation: 'nirañkār kā cīnat nah bhiv ‖392‖',
    translation: '“but he does not know the secret of the Formless Lord.392.',
  },
  {
    id: '9MQD',
    src: 'ਆਪੁ ਆਪਨੀ ਬੁਧਿ ਹੈ ਜੇਤੀ ॥',
    pronunciation: 'āp āpanī budh hē jetī ‖',
    translation: 'According to ones won intellect,',
  },
  {
    id: 'D9E9',
    src: 'ਬਰਨਤ ਭਿੰਨ ਭਿੰਨ ਤੁਹਿ ਤੇਤੀ ॥',
    pronunciation: 'baranat bhiñn bhiñn tuh tetī ‖',
    translation: 'one describes Thee differently',
  },
  {
    id: 'NG2W',
    src: 'ਤੁਮਰਾ ਲਖਾ ਨ ਜਾਇ ਪਸਾਰਾ ॥',
    pronunciation: 'tumarā lakhā na jāi pasārā ‖',
    translation: 'The limits of Thy creation cannot be known',
  },
  {
    id: '6FWW',
    src: 'ਕਿਹ ਬਿਧਿ ਸਜਾ ਪ੍ਰਥਮ ਸੰਸਾਰਾ ॥੩੯੩॥',
    pronunciation: 'kih bidh sajā pratham sañsārā ‖393‖',
    translation: 'and how the world was fashioned in the beginning?393.',
  },
  {
    id: 'HFDS',
    src: 'ਏਕੈ ਰੂਪ ਅਨੂਪ ਸਰੂਪਾ ॥',
    pronunciation: 'ekē rūp anūp sarūpā ‖',
    translation: 'He hath only one unparalleled Form',
  },
  {
    id: 'F3TU',
    src: 'ਰੰਕ ਭਯੋ ਰਾਵ ਕਹੀ ਭੂਪਾ ॥',
    pronunciation: 'rañk bhayo rāv kahī bhūpā ‖',
    translation:
      'He manifests Himself as a poor man or a king at different places',
  },
  {
    id: 'Q6WX',
    src: 'ਅੰਡਜ ਜੇਰਜ ਸੇਤਜ ਕੀਨੀ ॥',
    pronunciation: 'añḍaj jeraj setaj kīnī ‖',
    translation: 'He created creatures from eggs, wombs and perspiration',
  },
  {
    id: '1RMW',
    src: 'ਉਤਭੁਜ ਖਾਨਿ, ਬਹੁਰ ਰਚਿ ਦੀਨੀ ॥੩੯੪॥',
    pronunciation: 'utabhuj khāni, bahur rac dīnī ‖394‖',
    translation: 'Then He created the vegetable kingdom.394.',
  },
  {
    id: '7NL5',
    src: 'ਕਹੂੰ, ਫੂਲਿ ਰਾਜਾ ਹ੍ਵੈ ਬੈਠਾ ॥',
    pronunciation: 'kahūñ, phūl rājā hvē bēṭhā ‖',
    translation: 'Somewhere He sits joyfully as a king',
  },
  {
    id: 'FZV8',
    src: 'ਕਹੂੰ, ਸਿਮਟਿ ਭਿ꠳ਯੋ ਸੰਕਰ ਇਕੈਠਾ ॥',
    pronunciation: 'kahūñ, simaṭ bhiyo sañkar ikēṭhā ‖',
    translation: 'Somewhere He contracts Himself as Shiva, the Yogi',
  },
  {
    id: 'BM8P',
    src: 'ਸਗਰੀ ਸ੍ਰਿਸਟਿ ਦਿਖਾਇ ਅਚੰਭਵ ॥',
    pronunciation: 'sagarī srisaṭ dikhāi acañbhav ‖',
    translation: 'All His creation unfolds wonderful things',
  },
  {
    id: 'JF4B',
    src: 'ਆਦਿ ਜੁਗਾਦਿ ਸਰੂਪ ਸੁਯੰਭਵ ॥੩੯੫॥',
    pronunciation: 'ād jugād sarūp suyañbhav ‖395‖',
    translation:
      'He, the Primal Power, is from the beginning and Self-Existent.395.',
  },
  {
    id: '71QS',
    src: 'ਅਬ, ਰੱਛਾ ਮੇਰੀ ਤੁਮ ਕਰੋ ॥',
    pronunciation: 'ab, racchā merī tum karo ‖',
    translation: 'O Lord! keep me now under Thy protection',
  },
  {
    id: '805N',
    src: 'ਸਿੱਖ ਉਬਾਰਿ ਅਸਿੱਖ ਸੰਘਰੋ ॥',
    pronunciation: 'sikkh ubār asikkh sañgharo ‖',
    translation: 'Protect my disciples and destroy my enemies',
  },
  {
    id: 'SY2L',
    src: 'ਦੁਸ਼ਟ ਜਿਤੇ ਉਠਵਤ ਉਤਪਾਤਾ ॥',
    pronunciation: 'dushaṭ jite uṭhawat utapātā ‖',
    translation: '',
  },
  {
    id: 'QUZX',
    src: 'ਸਕਲ ਮਲੇਛ, ਕਰੋ ਰਣ ਘਾਤਾ ॥੩੯੬॥',
    pronunciation: 'sakal malech, karo raṇ ghātā ‖396‖',
    translation:
      'All the villains creations outrage and all the infidels be destroyed in the battlefield.396.',
  },
  {
    id: 'YHUZ',
    src: 'ਜੇ ਅਸਿਧੁਜ, ਤਵ ਸਰਨੀ ਪਰੇ ॥',
    pronunciation: 'je asidhuj, tav saranī pare ‖',
    translation: '',
  },
  {
    id: 'MZKC',
    src: 'ਤਿਨ ਕੇ ਦੁਸਟ, ਦੁਖਿਤ ਹ੍ਵੈ ਮਰੇ ॥',
    pronunciation: 'tin ke dusaṭ, dukhit hvē mare ‖',
    translation:
      'O Supreme Destroyer! those who sought Thy refuge, their enemies met painful death',
  },
  {
    id: 'HQT7',
    src: 'ਪੁਰਖ ਜਵਨ, ਪਗ ਪਰੇ ਤਿਹਾਰੇ ॥',
    pronunciation: 'purakh jawan, pag pare tihāre ‖',
    translation: '',
  },
  {
    id: 'DG71',
    src: 'ਤਿਨ ਕੇ, ਤੁਮ ਸੰਕਟ ਸਭ ਟਾਰੇ ॥੩੯੭॥',
    pronunciation: 'tin ke, tum sañkaṭ sabh ṭāre ‖397‖',
    translation:
      'The persons who fell at Thy Feet, Thou didst remove all their troubles.397.',
  },
  {
    id: '60B3',
    src: 'ਜੋ ਕਲਿ ਕੋ, ਇਕ ਬਾਰ ਧਿਐਹੈ ॥',
    pronunciation: 'jo kal ko, ik bār dhiēhē ‖',
    translation: '',
  },
  {
    id: 'WYU8',
    src: 'ਤਾ ਕੇ, ਕਾਲ ਨਿਕਟਿ ਨਹਿ ਐਹੈ ॥',
    pronunciation: 'tā ke, kāl nikaṭ nah ēhē ‖',
    translation:
      'Those who meditate even on the Supreme Destroyer, the death cannot approach them',
  },
  {
    id: 'A77Y',
    src: 'ਰੱਛਾ ਹੋਇ ਤਾਹਿ, ਸਭ ਕਾਲਾ ॥',
    pronunciation: 'racchā hoi tāhi, sabh kālā ‖',
    translation: 'They remain protected at all times',
  },
  {
    id: 'XM2F',
    src: 'ਦੁਸਟ ਅਰਿਸਟ ਟਰੇਂ ਤਤਕਾਲਾ ॥੩੯੮॥',
    pronunciation: 'dusaṭ arisaṭ ṭareñ tatakālā ‖398‖',
    translation: 'Their enemies and troubles come to and end instantly.398.',
  },
  {
    id: 'BDK7',
    src: 'ਕ੍ਰਿਪਾ ਦ੍ਰਿਸਟਿ, ਤਨ ਜਾਹਿ ਨਿਹਰਿਹੋ ॥',
    pronunciation: 'kripā drisaṭi, tan jāh nihariho ‖',
    translation: '',
  },
  {
    id: 'GUWQ',
    src: 'ਤਾ ਕੇ ਤਾਪ, ਤਨਕ ਮੋ ਹਰਿਹੋ ॥',
    pronunciation: 'tā ke tāp, tanak mo hariho ‖',
    translation:
      'Upon whomsoever Thou dost cast Thy favourable glance, they are absolved of sins instantly',
  },
  {
    id: '0910',
    src: 'ਰਿੱਧਿ ਸਿੱਧਿ, ਘਰ ਮੋ ਸਭ ਹੋਈ ॥',
    pronunciation: 'riddh siddhi, ghar mo sabh hoī ‖',
    translation:
      'They have all the worldly and spiritual pleasures in their homes',
  },
  {
    id: 'QY45',
    src: 'ਦੁਸ਼ਟ ਛਾਹ, ਛ੍ਵੈ ਸਕੈ ਨ ਕੋਈ ॥੩੯੯॥',
    pronunciation: 'dushaṭ chāh, chvē sakē na koī ‖399‖',
    translation: 'None of th enemies can even touch their shadow.399.',
  },
  {
    id: 'BR5R',
    src: 'ਏਕ ਬਾਰ, ਜਿਨ ਤੁਮੈ ਸੰਭਾਰਾ ॥',
    pronunciation: 'ek bār, jin tumē sañbhārā ‖',
    translation: '',
  },
  {
    id: '6SU7',
    src: 'ਕਾਲ ਫਾਸ ਤੇ, ਤਾਹਿ ਉਬਾਰਾ ॥',
    pronunciation: 'kāl phās te, tāh ubārā ‖',
    translation:
      'He, who remembered Thee even once, Thou didst protect him from the noose of death',
  },
  {
    id: 'U5NC',
    src: 'ਜਿਨ ਨਰ, ਨਾਮ ਤਿਹਾਰੋ ਕਹਾ ॥',
    pronunciation: 'jin nar, nām tihāro kahā ‖',
    translation: '',
  },
  {
    id: 'XWRL',
    src: 'ਦਾਰਿਦ ਦੁਸਟ ਦੋਖ ਤੇ ਰਹਾ ॥੪੦੦॥',
    pronunciation: 'dārid dusaṭ dokh te rahā ‖400‖',
    translation:
      'Those persons, who repeated Thy Name, they were saved from poverty and attacks of enemies.400.',
  },
  {
    id: 'M5M5',
    src: 'ਖੜਗ ਕੇਤ, ਮੈ ਸਰਣਿ ਤਿਹਾਰੀ ॥',
    pronunciation: 'khaṛag ket, mē saraṇ tihārī ‖',
    translation: '',
  },
  {
    id: 'QP2A',
    src: 'ਆਪ, ਹਾਥ ਦੈ ਲੇਹੁ ਉਬਾਰੀ ॥',
    pronunciation: 'āp, hāth dē leh ubārī ‖',
    translation:
      'Bestow thy help own me at all places protect me from the design of my enemies. 401.',
  },
  {
    id: 'LYXN',
    src: 'ਸਰਬ ਠੌਰ, ਮੋ ਹੋਹੁ ਸਹਾਈ ॥',
    pronunciation: 'sarab ṭhōr, mo hoh sahāī ‖',
    translation: '',
  },
  {
    id: 'DM0Z',
    src: 'ਦੁਸਟ ਦੋਖ ਤੇ, ਲੇਹੁ ਬਚਾਈ ॥੪੦੧॥',
    pronunciation: 'dusaṭ dokh te, leh bacāī ‖401‖',
    translation:
      'Bestow Thy help on me at all places and protect me from the designs of my enemies.401.',
  },
  {
    id: '7Q9Z',
    src: 'ਸ੍ਵੈਯਾ ॥',
    pronunciation: 'svēyā ‖',
    translation: 'SWAYYA',
  },
  {
    id: 'YTA6',
    src: 'ਪਾਂਇ ਗਹੇ ਜਬ ਤੇ ਤੁਮਰੇ ਤਬ ਤੇ ਕੋਊ ਆਂਖ ਤਰੇ ਨਹੀਂ ਆਨ꠳ਯੋ ॥',
    pronunciation: 'pāñi gahe jab te tumare tab te koū āñkh tare nahīñ ānyo ‖',
    translation:
      'O God! the day when I caught hold of your feet, I do not bring anyone else under my sight',
  },
  {
    id: 'V2AU',
    src: 'ਰਾਮ ਰਹੀਮ ਪੁਰਾਨ ਕੁਰਾਨ; ਅਨੇਕ ਕਹੈਂ, ਮਤ ਏਕ ਨ ਮਾਨ꠳ਯੋ ॥',
    pronunciation: 'rām rahīm purān kurān; anek kahēñ, mat ek na mānyo ‖',
    translation:
      'None other is liked by me now   the Puranas and the Quran try to know Thee by the names of Ram and Rahim and talk about you through several stories,',
  },
  {
    id: '4DNZ',
    src: 'ਸਿੰਮ੍ਰਿਤ ਸਾਸਤ੍ਰ ਬੇਦ ਸਭੈ; ਬਹੁ ਭੇਦ ਕਹੈਂ, ਹਮ ਏਕ ਨ ਜਾਨ꠳ਯੋ ॥',
    pronunciation:
      'siñmrit sāsatr bed sabhē; bah bhed kahēñ, ham ek na jānyo ‖',
    translation:
      'The Simritis, Shastras and Vedas describe several mysteries of yours, but I do not agree with any of them.',
  },
  {
    id: 'F5YC',
    src: 'ਸ੍ਰੀ ਅਸਿਪਾਨ, ਕ੍ਰਿਪਾ ਤੁਮਰੀ ਕਰਿ; ਮੈ ਨ ਕਹ꠳ਯੋ, ਸਭ ਤੋਹਿ ਬਖਾਨ꠳ਯੋ ॥੮੬੩॥',
    pronunciation:
      'srī asipān, kripā tumarī kari; mē na kahyo, sabh toh bakhānyo ‖863‖',
    translation:
      'O sword-wielder God! This all has been described by Thy Grace, what power can I have to write all this?.863.',
  },
  {
    id: 'UF01',
    src: 'ਦੋਹਰਾ ॥',
    pronunciation: 'doharā ‖',
    translation: 'DOHRA',
  },
  {
    id: '5DKC',
    src: 'ਸਗਲ ਦੁਆਰ ਕਉ ਛਾਡਿ ਕੈ; ਗਹਿਓ ਤੁਹਾਰੋ ਦੁਆਰ ॥',
    pronunciation: 'sagal duār kau chāḍ kē; gahio tuhāro duār ‖',
    translation:
      'O Lord! I have forsaken all other doors and have caught hold of only Thy door. O Lord! Thou has caught hold of my arm',
  },
  {
    id: '2SUA',
    src: 'ਬਾਂਹਿ ਗਹੇ ਕੀ ਲਾਜ ਅਸ; ਗੋਬਿੰਦ ਦਾਸ ਤੁਹਾਰ ॥੮੬੪॥',
    pronunciation: 'bāñh gahe kī lāj as; gobiñd dās tuhār ‖864‖',
    translation:
      'I, Govind, am Thy serf, kindly take (care of me and) protect my honour.864.',
  },
  {
    id: 'LTKA',
    src: 'ਰਾਮਕਲੀ ਮਹਲਾ ੩ ਅਨੰਦੁ ॥',
    pronunciation: 'rāmakalī mahalā 3 anañd ‖',
    translation: 'Raamkalee, Third Mehl, Anand ~ The Song Of Bliss:',
  },
  {
    id: 'GE9G',
    src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
    pronunciation: 'ik oañkār satigur prasād ‖',
    translation: 'One Universal Creator God. By The Grace Of The True Guru:',
  },
  {
    id: '2UEB',
    src: 'ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ; ਸਤਿਗੁਰੂ. ਮੈ ਪਾਇਆ ॥',
    pronunciation: 'anañd bhaiā merī māe; satigurū. mē pāiā ‖',
    translation: 'I am in ecstasy, O my mother, for I have found my True Guru.',
  },
  {
    id: 'BJ01',
    src: 'ਸਤਿਗੁਰੁ. ਤ ਪਾਇਆ ਸਹਜ ਸੇਤੀ; ਮਨਿ ਵਜੀਆ ਵਾਧਾਈਆ ॥',
    pronunciation: 'satiguru. ta pāiā sahaj setī; man wajīā vādhāīā ‖',
    translation:
      'I have found the True Guru, with intuitive ease, and my mind vibrates with the music of bliss.',
  },
  {
    id: '6GJM',
    src: 'ਰਾਗ ਰਤਨ ਪਰਵਾਰ ਪਰੀਆ; ਸਬਦ ਗਾਵਣ ਆਈਆ ॥',
    pronunciation: 'rāg ratan paravār parīā; sabad gāwaṇ āīā ‖',
    translation:
      'The jewelled melodies and their related celestial harmonies have come to sing the Word of the Shabad.',
  },
  {
    id: 'AR69',
    src: 'ਸਬਦੋ ਤ ਗਾਵਹੁ ਹਰੀ ਕੇਰਾ; ਮਨਿ ਜਿਨੀ ਵਸਾਇਆ ॥',
    pronunciation: 'sabado ta gāwah harī kerā; man jinī wasāiā ‖',
    translation:
      'The Lord dwells within the minds of those who sing the Shabad.',
  },
  {
    id: '439Z',
    src: 'ਕਹੈ ਨਾਨਕੁ. ਅਨੰਦੁ ਹੋਆ; ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੧॥',
    pronunciation: 'kahē nānaku. anañd hoā; satigurū mē pāiā ‖1‖',
    translation:
      'Says Nanak, I am in ecstasy, for I have found my True Guru. ||1||',
  },
  {
    id: 'Z58C',
    src: 'ਏ ਮਨ ਮੇਰਿਆ; ਤੂ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥',
    pronunciation: 'e man meriā; tū sadā rah har nāle ‖',
    translation: 'O my mind, remain always with the Lord.',
  },
  {
    id: '5AA1',
    src: 'ਹਰਿ ਨਾਲਿ ਰਹੁ ਤੂ ਮੰਨ ਮੇਰੇ; ਦੂਖ ਸਭਿ ਵਿਸਾਰਣਾ ॥',
    pronunciation: 'har nāl rah tū mañn mere; dūkh sabh visāraṇā ‖',
    translation:
      'Remain always with the Lord, O my mind, and all sufferings will be forgotten.',
  },
  {
    id: 'YGK6',
    src: 'ਅੰਗੀਕਾਰੁ ਓਹੁ ਕਰੇ ਤੇਰਾ; ਕਾਰਜ ਸਭਿ ਸਵਾਰਣਾ ॥',
    pronunciation: 'añgīkār oh kare terā; kāraj sabh savāraṇā ‖',
    translation:
      'He will accept You as His own, and all your affairs will be perfectly arranged.',
  },
  {
    id: '350Z',
    src: 'ਸਭਨਾ ਗਲਾ ਸਮਰਥੁ ਸੁਆਮੀ; ਸੋ. ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੇ ॥',
    pronunciation: 'sabhanā galā samarath suāmī; so. kiu manah visāre ‖',
    translation:
      'Our Lord and Master is all-powerful to do all things, so why forget Him from your mind?',
  },
  {
    id: 'CF7N',
    src: 'ਕਹੈ ਨਾਨਕੁ. ਮੰਨ ਮੇਰੇ; ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥੨॥',
    pronunciation: 'kahē nānaku. mañn mere; sadā rah har nāle ‖2‖',
    translation: 'Says Nanak, O my mind, remain always with the Lord. ||2||',
  },
  {
    id: '4GE3',
    src: 'ਸਾਚੇ ਸਾਹਿਬਾ; ਕਿਆ ਨਾਹੀ. ਘਰਿ ਤੇਰੈ ॥',
    pronunciation: 'sāce sāhibā; kiā nāhī. ghar terē ‖',
    translation:
      'O my True Lord and Master, what is there which is not in Your celestial home?',
  },
  {
    id: '4N3D',
    src: 'ਘਰਿ ਤ ਤੇਰੈ. ਸਭੁ ਕਿਛੁ ਹੈ; ਜਿਸੁ ਦੇਹਿ ਸੁ ਪਾਵਏ ॥',
    pronunciation: 'ghar ta terē. sabh kich hē; jis deh sa pāwae ‖',
    translation:
      'Everything is in Your home; they receive, unto whom You give.',
  },
  {
    id: 'XG9Y',
    src: 'ਸਦਾ ਸਿਫਤਿ ਸਲਾਹ ਤੇਰੀ; ਨਾਮੁ ਮਨਿ ਵਸਾਵਏ ॥',
    pronunciation: 'sadā siphat salāh terī; nām man wasāwae ‖',
    translation:
      'Constantly singing Your Praises and Glories, Your Name is enshrined in the mind.',
  },
  {
    id: 'EWZF',
    src: 'ਨਾਮੁ ਜਿਨ ਕੈ ਮਨਿ ਵਸਿਆ; ਵਾਜੇ ਸਬਦ ਘਨੇਰੇ ॥',
    pronunciation: 'nām jin kē man wasiā; vāje sabad ghanere ‖',
    translation:
      'The divine melody of the Shabad vibrates for those, within whose minds the Naam abides.',
  },
  {
    id: 'KUUL',
    src: 'ਕਹੈ ਨਾਨਕੁ. ਸਚੇ ਸਾਹਿਬ; ਕਿਆ ਨਾਹੀ. ਘਰਿ ਤੇਰੈ ॥੩॥',
    pronunciation: 'kahē nānaku. sace sāhib; kiā nāhī. ghar terē ‖3‖',
    translation:
      'Says Nanak, O my True Lord and Master, what is there which is not in Your home? ||3||',
  },
  {
    id: 'LRXJ',
    src: 'ਸਾਚਾ ਨਾਮੁ; ਮੇਰਾ ਆਧਾਰੋ ॥',
    pronunciation: 'sācā nāmu; merā ādhāro ‖',
    translation: 'The True Name is my only support.',
  },
  {
    id: '176Q',
    src: 'ਸਾਚੁ ਨਾਮੁ ਅਧਾਰੁ ਮੇਰਾ; ਜਿਨਿ ਭੁਖਾ ਸਭਿ ਗਵਾਈਆ ॥',
    pronunciation: 'sāc nām adhār merā; jin bhukhā sabh gavāīā ‖',
    translation: 'The True Name is my only support; it satisfies all hunger.',
  },
  {
    id: '82EB',
    src: 'ਕਰਿ ਸਾਂਤਿ ਸੁਖ ਮਨਿ ਆਇ ਵਸਿਆ; ਜਿਨਿ ਇਛਾ ਸਭਿ ਪੁਜਾਈਆ ॥',
    pronunciation: 'kar sāñt sukh man āi wasiā; jin ichā sabh pujāīā ‖',
    translation:
      'It has brought peace and tranquility to my mind; it has fulfilled all my desires.',
  },
  {
    id: 'XMGJ',
    src: 'ਸਦਾ ਕੁਰਬਾਣੁ ਕੀਤਾ ਗੁਰੂ ਵਿਟਹੁ; ਜਿਸ ਦੀਆ ਏਹਿ ਵਡਿਆਈਆ ॥',
    pronunciation: 'sadā kurabāṇ kītā gurū viṭahu; jis dīā eh waḍiāīā ‖',
    translation:
      'I am forever a sacrifice to the Guru, who possesses such glorious greatness.',
  },
  {
    id: 'P8TM',
    src: 'ਕਹੈ ਨਾਨਕੁ. ਸੁਣਹੁ ਸੰਤਹੁ; ਸਬਦਿ ਧਰਹੁ ਪਿਆਰੋ ॥',
    pronunciation: 'kahē nānaku. suṇah sañtahu; sabad dharah piāro ‖',
    translation: 'Says Nanak, listen, O Saints; enshrine love for the Shabad.',
  },
  {
    id: 'Q3P4',
    src: 'ਸਾਚਾ ਨਾਮੁ; ਮੇਰਾ ਆਧਾਰੋ ॥੪॥',
    pronunciation: 'sācā nāmu; merā ādhāro ‖4‖',
    translation: 'The True Name is my only support. ||4||',
  },
  {
    id: 'QLZ5',
    src: 'ਵਾਜੇ ਪੰਚ ਸਬਦ; ਤਿਤੁ ਘਰਿ ਸਭਾਗੈ ॥',
    pronunciation: 'vāje pañc sabad; tit ghar sabhāgē ‖',
    translation:
      'The Panch Shabad, the five primal sounds, vibrate in that blessed house.',
  },
  {
    id: '4UD1',
    src: 'ਘਰਿ ਸਭਾਗੈ ਸਬਦ ਵਾਜੇ; ਕਲਾ ਜਿਤੁ ਘਰਿ ਧਾਰੀਆ ॥',
    pronunciation: 'ghar sabhāgē sabad vāje; kalā jit ghar dhārīā ‖',
    translation:
      'In that blessed house, the Shabad vibrates; He infuses His almighty power into it.',
  },
  {
    id: 'HBAQ',
    src: 'ਪੰਚ ਦੂਤ ਤੁਧੁ ਵਸਿ ਕੀਤੇ; ਕਾਲੁ ਕੰਟਕੁ ਮਾਰਿਆ ॥',
    pronunciation: 'pañc dūt tudh was kīte; kāl kañṭak māriā ‖',
    translation:
      'Through You, we subdue the five demons of desire, and slay Death, the torturer.',
  },
  {
    id: '7859',
    src: 'ਧੁਰਿ ਕਰਮਿ ਪਾਇਆ ਤੁਧੁ. ਜਿਨ ਕਉ; ਸਿ. ਨਾਮਿ ਹਰਿ ਕੈ ਲਾਗੇ ॥',
    pronunciation: 'dhur karam pāiā tudhu. jin kau; si. nām har kē lāge ‖',
    translation:
      "Those who have such pre-ordained destiny are attached to the Lord's Name.",
  },
  {
    id: '4RHQ',
    src: 'ਕਹੈ ਨਾਨਕੁ. ਤਹ ਸੁਖੁ ਹੋਆ; ਤਿਤੁ ਘਰਿ ਅਨਹਦ ਵਾਜੇ ॥੫॥',
    pronunciation: 'kahē nānaku. tah sukh hoā; tit ghar anahad vāje ‖5‖',
    translation:
      'Says Nanak, they are at peace, and the unstruck sound current vibrates within their homes. ||5||',
  },
  {
    id: 'ELHF',
    src: 'ਅਨਦੁ ਸੁਣਹੁ ਵਡਭਾਗੀਹੋ; ਸਗਲ ਮਨੋਰਥ ਪੂਰੇ ॥',
    pronunciation: 'anad suṇah waḍabhāgīho; sagal manorath pūre ‖',
    translation:
      'Listen to the song of bliss, O most fortunate ones; all your longings shall be fulfilled.',
  },
  {
    id: 'EDPZ',
    src: 'ਪਾਰਬ੍ਰਹਮੁ ਪ੍ਰਭੁ ਪਾਇਆ; ਉਤਰੇ ਸਗਲ ਵਿਸੂਰੇ ॥',
    pronunciation: 'pārabraham prabh pāiā; utare sagal visūre ‖',
    translation:
      'I have obtained the Supreme Lord God, and all sorrows have been forgotten.',
  },
  {
    id: '2UQS',
    src: 'ਦੂਖ ਰੋਗ ਸੰਤਾਪ ਉਤਰੇ; ਸੁਣੀ ਸਚੀ ਬਾਣੀ ॥',
    pronunciation: 'dūkh rog sañtāp utare; suṇī sacī bāṇī ‖',
    translation:
      'Pain, illness and suffering have departed, listening to the True Bani.',
  },
  {
    id: 'DLUB',
    src: 'ਸੰਤ ਸਾਜਨ ਭਏ ਸਰਸੇ; ਪੂਰੇ ਗੁਰ ਤੇ ਜਾਣੀ ॥',
    pronunciation: 'sañt sājan bhae sarase; pūre gur te jāṇī ‖',
    translation:
      'The Saints and their friends are in ecstasy, knowing the Perfect Guru.',
  },
  {
    id: '51FD',
    src: 'ਸੁਣਤੇ ਪੁਨੀਤ. ਕਹਤੇ ਪਵਿਤੁ; ਸਤਿਗੁਰੁ ਰਹਿਆ ਭਰਪੂਰੇ ॥',
    pronunciation: 'suṇate punīt. kahate pavitu; satigur rahiā bharapūre ‖',
    translation:
      'Pure are the listeners, and pure are the speakers; the True Guru is all-pervading and permeating.',
  },
  {
    id: 'C1W0',
    src: 'ਬਿਨਵੰਤਿ ਨਾਨਕੁ. ਗੁਰ ਚਰਣ ਲਾਗੇ; ਵਾਜੇ ਅਨਹਦ ਤੂਰੇ ॥੪੦॥੧॥',
    pronunciation: 'binawañt nānaku. gur caraṇ lāge; vāje anahad tūre ‖40‖1‖',
    translation:
      "Prays Nanak, touching the Guru's Feet, the unstruck sound current of the celestial bugles vibrates and resounds. ||40||1||",
  },
  {
    id: 'PGA7',
    src: 'ਮੁੰਦਾਵਣੀ ਮਹਲਾ ੫ ॥',
    pronunciation: 'muñdāwaṇī mahalā 5 ‖',
    translation: 'Mundaavanee, Fifth Mehl:',
  },
  {
    id: 'WB4V',
    src: 'ਥਾਲ ਵਿਚਿ. ਤਿੰਨਿ ਵਸਤੂ ਪਈਓ; ਸਤੁ ਸੰਤੋਖੁ ਵੀਚਾਰੋ ॥',
    pronunciation: 'thāl vici. tiñn wasatū paīo; sat sañtokh vīcāro ‖',
    translation:
      'Upon this Plate, three things have been placed: Truth, Contentment and Contemplation.',
  },
  {
    id: 'YK5U',
    src: 'ਅੰਮ੍ਰਿਤ ਨਾਮੁ. ਠਾਕੁਰ ਕਾ ਪਇਓ; ਜਿਸ ਕਾ ਸਭਸੁ ਅਧਾਰੋ ॥',
    pronunciation: 'añmrit nāmu. ṭhākur kā paio; jis kā sabhas adhāro ‖',
    translation:
      'The Ambrosial Nectar of the Naam, the Name of our Lord and Master, has been placed upon it as well; it is the Support of all.',
  },
  {
    id: '17SA',
    src: 'ਜੇ ਕੋ ਖਾਵੈ. ਜੇ ਕੋ ਭੁੰਚੈ; ਤਿਸ ਕਾ ਹੋਇ ਉਧਾਰੋ ॥',
    pronunciation: 'je ko khāvē. je ko bhuñcē; tis kā hoi udhāro ‖',
    translation: 'One who eats it and enjoys it shall be saved.',
  },
  {
    id: '64UY',
    src: 'ਏਹ ਵਸਤੁ. ਤਜੀ ਨਹ ਜਾਈ; ਨਿਤ ਨਿਤ ਰਖੁ ਉਰਿ ਧਾਰੋ ॥',
    pronunciation: 'eh wasatu. tajī nah jāī; nit nit rakh ur dhāro ‖',
    translation:
      'This thing can never be forsaken; keep this always and forever in your mind.',
  },
  {
    id: 'U5NP',
    src: 'ਤਮ ਸੰਸਾਰੁ. ਚਰਨ ਲਗਿ ਤਰੀਐ; ਸਭੁ ਨਾਨਕ ਬ੍ਰਹਮ ਪਸਾਰੋ ॥੧॥',
    pronunciation: 'tam sañsāru. caran lag tarīē; sabh nānak braham pasāro ‖1‖',
    translation:
      'The dark world-ocean is crossed over, by grasping the Feet of the Lord; O Nanak, it is all the extension of God. ||1||',
  },
  {
    id: 'DH2P',
    src: 'ਸਲੋਕ ਮਹਲਾ ੫ ॥',
    pronunciation: 'salok mahalā 5 ‖',
    translation: 'Salok, Fifth Mehl:',
  },
  {
    id: 'Z51B',
    src: 'ਤੇਰਾ ਕੀਤਾ. ਜਾਤੋ ਨਾਹੀ; ਮੈਨੋ ਜੋਗੁ ਕੀਤੋਈ ॥',
    pronunciation: 'terā kītā. jāto nāhī; mēno jog kītoī ‖',
    translation:
      'I have not appreciated what You have done for me, Lord; only You can make me worthy.',
  },
  {
    id: 'N41C',
    src: 'ਮੈ ਨਿਰਗੁਣਿਆਰੇ. ਕੋ ਗੁਣੁ ਨਾਹੀ; ਆਪੇ ਤਰਸੁ ਪਇਓਈ ॥',
    pronunciation: 'mē niraguṇiāre. ko guṇ nāhī; āpe taras paioī ‖',
    translation:
      'I am unworthy - I have no worth or virtues at all. You have taken pity on me.',
  },
  {
    id: 'ZCJH',
    src: 'ਤਰਸੁ ਪਇਆ. ਮਿਹਰਾਮਤਿ ਹੋਈ; ਸਤਿਗੁਰੁ ਸਜਣੁ ਮਿਲਿਆ ॥',
    pronunciation: 'taras paiā. miharāmat hoī; satigur sajaṇ miliā ‖',
    translation:
      'You took pity on me, and blessed me with Your Mercy, and I have met the True Guru, my Friend.',
  },
  {
    id: 'VC9N',
    src: 'ਨਾਨਕ. ਨਾਮੁ ਮਿਲੈ ਤਾਂ ਜੀਵਾਂ; ਤਨੁ ਮਨੁ ਥੀਵੈ ਹਰਿਆ ॥੧॥',
    pronunciation: 'nānak. nām milē tāñ jīvāñ; tan man thīvē hariā ‖1‖',
    translation:
      'O Nanak, if I am blessed with the Naam, I live, and my body and mind blossom forth. ||1||',
  },
  {
    id: '01DW',
    src: 'ਪਉੜੀ ॥',
    pronunciation: 'pauṛī ‖',
    translation: 'Pauree:',
  },
  {
    id: 'PE40',
    src: 'ਤਿਥੈ ਤੂ ਸਮਰਥੁ; ਜਿਥੈ ਕੋਇ ਨਾਹਿ ॥',
    pronunciation: 'tithē tū samarathu; jithē koi nāh ‖',
    translation: 'Where You are, Almighty Lord, there is no one else.',
  },
  {
    id: '8NMU',
    src: 'ਓਥੈ ਤੇਰੀ ਰਖ; ਅਗਨੀ ਉਦਰ ਮਾਹਿ ॥',
    pronunciation: 'othē terī rakh; aganī udar māh ‖',
    translation: "There, in the fire of the mother's womb, You protected us.",
  },
  {
    id: 'MNNT',
    src: 'ਸੁਣਿ ਕੈ. ਜਮ ਕੇ ਦੂਤ; ਨਾਇ ਤੇਰੈ. ਛਡਿ ਜਾਹਿ ॥',
    pronunciation: 'suṇ kē. jam ke dūt; nāi terē. chaḍ jāh ‖',
    translation: 'Hearing Your Name, the Messenger of Death runs away.',
  },
  {
    id: '7HQ7',
    src: 'ਭਉਜਲੁ ਬਿਖਮੁ ਅਸਗਾਹੁ; ਗੁਰਸਬਦੀ ਪਾਰਿ ਪਾਹਿ ॥',
    pronunciation: 'bhaujal bikham asagāhu; gurasabadī pār pāh ‖',
    translation:
      "The terrifying, treacherous, impassible world-ocean is crossed over, through the Word of the Guru's Shabad.",
  },
  {
    id: 'Y2CL',
    src: 'ਜਿਨ ਕਉ ਲਗੀ ਪਿਆਸ; ਅੰਮ੍ਰਿਤੁ ਸੇਇ ਖਾਹਿ ॥',
    pronunciation: 'jin kau lagī piās; añmrit sei khāh ‖',
    translation:
      'Those who feel thirst for You, take in Your Ambrosial Nectar.',
  },
  {
    id: '2W6U',
    src: 'ਕਲਿ ਮਹਿ ਏਹੋ ਪੁੰਨੁ; ਗੁਣ ਗੋਵਿੰਦ ਗਾਹਿ ॥',
    pronunciation: 'kal mah eho puñnu; guṇ goviñd gāh ‖',
    translation:
      'This is the only act of goodness in this Dark Age of Kali Yuga, to sing the Glorious Praises of the Lord of the Universe.',
  },
  {
    id: 'RXFG',
    src: 'ਸਭਸੈ ਨੋ ਕਿਰਪਾਲੁ; ਸਮੑਾਲੇ ਸਾਹਿ ਸਾਹਿ ॥',
    pronunciation: 'sabhasē no kirapālu; samāle sāh sāh ‖',
    translation:
      'He is Merciful to all; He sustains us with each and every breath.',
  },
  {
    id: 'CFFK',
    src: 'ਬਿਰਥਾ ਕੋਇ. ਨ ਜਾਇ; ਜਿ ਆਵੈ ਤੁਧੁ ਆਹਿ ॥੯॥',
    pronunciation: 'birathā koi. na jāi; ja āvē tudh āh ‖9‖',
    translation:
      'Those who come to You with love and faith are never turned away empty-handed. ||9||',
  },
  {
    id: 'XVLU',
    src: 'ਸਲੋਕੁ ਮਃ ੫ ॥',
    pronunciation: 'salok mẖ 5 ‖',
    translation: 'Salok, Fifth Mehl:',
  },
  {
    id: '6KV1',
    src: 'ਅੰਤਰਿ ਗੁਰੁ ਆਰਾਧਣਾ; ਜਿਹਵਾ ਜਪਿ ਗੁਰ ਨਾਉ ॥',
    pronunciation: 'añtar gur ārādhaṇā; jihavā jap gur nāu ‖',
    translation:
      "Deep within yourself, worship the Guru in adoration, and with your tongue, chant the Guru's Name.",
  },
  {
    id: 'UJ8E',
    src: 'ਨੇਤ੍ਰੀ ਸਤਿਗੁਰੁ ਪੇਖਣਾ; ਸ੍ਰਵਣੀ ਸੁਨਣਾ ਗੁਰ ਨਾਉ ॥',
    pronunciation: 'netrī satigur pekhaṇā; srawaṇī sunaṇā gur nāu ‖',
    translation:
      "Let your eyes behold the True Guru, and let your ears hear the Guru's Name.",
  },
  {
    id: '25PN',
    src: 'ਸਤਿਗੁਰ ਸੇਤੀ ਰਤਿਆ; ਦਰਗਹ ਪਾਈਐ ਠਾਉ ॥',
    pronunciation: 'satigur setī ratiā; daragah pāīē ṭhāu ‖',
    translation:
      'Attuned to the True Guru, you shall receive a place of honor in the Court of the Lord.',
  },
  {
    id: 'HEXW',
    src: 'ਕਹੁ ਨਾਨਕ. ਕਿਰਪਾ ਕਰੇ; ਜਿਸ ਨੋ ਏਹ ਵਥੁ ਦੇਇ ॥',
    pronunciation: 'kah nānak. kirapā kare; jis no eh wath dei ‖',
    translation:
      'Says Nanak, this treasure is bestowed on those who are blessed with His Mercy.',
  },
  {
    id: '3GLM',
    src: 'ਜਗ ਮਹਿ ਉਤਮ ਕਾਢੀਅਹਿ; ਵਿਰਲੇ ਕੇਈ ਕੇਇ ॥੧॥',
    pronunciation: 'jag mah utam kāḍhīahi; virale keī kei ‖1‖',
    translation:
      'In the midst of the world, they are known as the most pious - they are rare indeed. ||1||',
  },
  {
    id: 'SJ32',
    src: 'ਮਃ ੫ ॥',
    pronunciation: 'mẖ 5 ‖',
    translation: 'Fifth Mehl:',
  },
  {
    id: 'E6H0',
    src: 'ਰਖੇ ਰਖਣਹਾਰਿ; ਆਪਿ ਉਬਾਰਿਅਨੁ ॥',
    pronunciation: 'rakhe rakhaṇahāri; āp ubārian ‖',
    translation: 'O Savior Lord, save us and take us across.',
  },
  {
    id: 'SMGX',
    src: 'ਗੁਰ ਕੀ ਪੈਰੀ ਪਾਇ; ਕਾਜ ਸਵਾਰਿਅਨੁ ॥',
    pronunciation: 'gur kī pērī pāi; kāj savārian ‖',
    translation:
      'Falling at the feet of the Guru, our works are embellished with perfection.',
  },
  {
    id: '17WB',
    src: 'ਹੋਆ ਆਪਿ ਦਇਆਲੁ; ਮਨਹੁ. ਨ ਵਿਸਾਰਿਅਨੁ ॥',
    pronunciation: 'hoā āp daiālu; manahu. na visārian ‖',
    translation:
      'You have become kind, merciful and compassionate; we do not forget You from our minds.',
  },
  {
    id: 'XSPD',
    src: 'ਸਾਧ ਜਨਾ ਕੈ ਸੰਗਿ; ਭਵਜਲੁ ਤਾਰਿਅਨੁ ॥',
    pronunciation: 'sādh janā kē sañgi; bhawajal tārian ‖',
    translation:
      'In the Saadh Sangat, the Company of the Holy, we are carried across the terrifying world-ocean.',
  },
  {
    id: '67S7',
    src: 'ਸਾਕਤ ਨਿੰਦਕ ਦੁਸਟ; ਖਿਨ ਮਾਹਿ ਬਿਦਾਰਿਅਨੁ ॥',
    pronunciation: 'sākat niñdak dusaṭ; khin māh bidārian ‖',
    translation:
      'In an instant, You have destroyed the faithless cynics and slanderous enemies.',
  },
  {
    id: 'N1Y0',
    src: 'ਤਿਸੁ ਸਾਹਿਬ ਕੀ ਟੇਕ; ਨਾਨਕ. ਮਨੈ ਮਾਹਿ ॥',
    pronunciation: 'tis sāhib kī ṭek; nānak. manē māh ‖',
    translation:
      'That Lord and Master is my Anchor and Support; O Nanak, hold firm in your mind.',
  },
  {
    id: 'GDHS',
    src: 'ਜਿਸੁ ਸਿਮਰਤ ਸੁਖੁ ਹੋਇ; ਸਗਲੇ ਦੂਖ ਜਾਹਿ ॥੨॥',
    pronunciation: 'jis simarat sukh hoi; sagale dūkh jāh ‖2‖',
    translation:
      'Remembering Him in meditation, happiness comes, and all sorrows and pains simply vanish. ||2||',
  },
]

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data)
}
