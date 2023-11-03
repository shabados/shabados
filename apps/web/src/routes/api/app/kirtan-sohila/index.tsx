import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਜਪੁ ਜੀ ਸਾਹਿਬ',
    roman: 'Jap Jī Sāhib',
  },
  data: [
    {
      id: 'EJU3',
      src: 'ਸੋਹਿਲਾ ਰਾਗੁ ਗਉੜੀ ਦੀਪਕੀ ਮਹਲਾ ੧ ॥',
      pronunciation: 'sohilā rāg gauṛī dīpakī mahalā 1 ‖',
      translation:
        'Sohilaa ~ The Song Of Praise. Raag Gauree Deepakee, First Mehl:',
    },
    {
      id: '3S3R',
      src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation: 'ik oañkār satigur prasād ‖',
      translation: 'One Universal Creator God. By The Grace Of The True Guru:',
    },
    {
      id: 'ZGW1',
      src: 'ਜੈ ਘਰਿ ਕੀਰਤਿ ਆਖੀਐ; ਕਰਤੇ ਕਾ ਹੋਇ ਬੀਚਾਰੋ ॥',
      pronunciation: 'jē ghar kīrat ākhīē; karate kā hoi bīcāro ‖',
      translation:
        'In that house where the Praises of the Creator are chanted and contemplated',
    },
    {
      id: 'C4LK',
      src: 'ਤਿਤੁ ਘਰਿ. ਗਾਵਹੁ ਸੋਹਿਲਾ; ਸਿਵਰਿਹੁ ਸਿਰਜਣਹਾਰੋ ॥੧॥',
      pronunciation: 'tit ghari. gāwah sohilā; siwarih sirajaṇahāro ‖1‖',
      translation:
        '-in that house, sing Songs of Praise; meditate and remember the Creator Lord. ||1||',
    },
    {
      id: 'Q8LX',
      src: 'ਤੁਮ ਗਾਵਹੁ; ਮੇਰੇ ਨਿਰਭਉ ਕਾ ਸੋਹਿਲਾ ॥',
      pronunciation: 'tum gāwahu; mere nirabhau kā sohilā ‖',
      translation: 'Sing the Songs of Praise of my Fearless Lord.',
    },
    {
      id: 'CAY7',
      src: 'ਹਉ ਵਾਰੀ; ਜਿਤੁ ਸੋਹਿਲੈ ਸਦਾ ਸੁਖੁ ਹੋਇ ॥੧॥ ਰਹਾਉ ॥',
      pronunciation: 'hau vārī; jit sohilē sadā sukh hoi ‖1‖ rahāu ‖',
      translation:
        'I am a sacrifice to that Song of Praise which brings eternal peace. ||1||Pause||',
    },
    {
      id: 'QUH2',
      src: 'ਨਿਤ ਨਿਤ ਜੀਅੜੇ ਸਮਾਲੀਅਨਿ; ਦੇਖੈਗਾ ਦੇਵਣਹਾਰੁ ॥',
      pronunciation: 'nit nit jīaṛe samālīani; dekhēgā dewaṇahār ‖',
      translation:
        'Day after day, He cares for His beings; the Great Giver watches over all.',
    },
    {
      id: '1051',
      src: 'ਤੇਰੇ ਦਾਨੈ. ਕੀਮਤਿ ਨਾ ਪਵੈ; ਤਿਸੁ ਦਾਤੇ ਕਵਣੁ ਸੁਮਾਰੁ ॥੨॥',
      pronunciation: 'tere dānē. kīmat nā pavē; tis dāte kawaṇ sumār ‖2‖',
      translation:
        'Your Gifts cannot be appraised; how can anyone compare to the Giver? ||2||',
    },
    {
      id: 'SW9M',
      src: 'ਸੰਬਤਿ ਸਾਹਾ ਲਿਖਿਆ; ਮਿਲਿ ਕਰਿ ਪਾਵਹੁ ਤੇਲੁ ॥',
      pronunciation: 'sañbat sāhā likhiā; mil kar pāwah tel ‖',
      translation:
        'The day of my wedding is pre-ordained. Come, gather together and pour the oil over the threshold.',
    },
    {
      id: 'N9S9',
      src: 'ਦੇਹੁ ਸਜਣ ਅਸੀਸੜੀਆ; ਜਿਉ ਹੋਵੈ ਸਾਹਿਬ ਸਿਉ ਮੇਲੁ ॥੩॥',
      pronunciation: 'deh sajaṇ asīsaṛīā; jiu hovē sāhib siu mel ‖3‖',
      translation:
        'My friends, give me your blessings, that I may merge with my Lord and Master. ||3||',
    },
    {
      id: 'CE8B',
      src: 'ਘਰਿ ਘਰਿ ਏਹੋ ਪਾਹੁਚਾ; ਸਦੜੇ ਨਿਤ ਪਵੰਨਿ ॥',
      pronunciation: 'ghar ghar eho pāhucā; sadaṛe nit pawañn ‖',
      translation:
        'Unto each and every home, into each and every heart, this summons is sent out; the call comes each and every day.',
    },
    {
      id: '37AH',
      src: 'ਸਦਣਹਾਰਾ ਸਿਮਰੀਐ; ਨਾਨਕ. ਸੇ ਦਿਹ ਆਵੰਨਿ ॥੪॥੧॥',
      pronunciation: 'sadaṇahārā simarīē; nānak. se dih āwañn ‖4‖1‖',
      translation:
        'Remember in meditation the One who summons us; O Nanak, that day is drawing near! ||4||1||',
    },
    {
      id: '51N3',
      src: 'ਰਾਗੁ ਆਸਾ ਮਹਲਾ ੧ ॥',
      pronunciation: 'rāg āsā mahalā 1 ‖',
      translation: 'Raag Aasaa, First Mehl:',
    },
    {
      id: 'H9XK',
      src: 'ਛਿਅ ਘਰ, ਛਿਅ ਗੁਰ; ਛਿਅ ਉਪਦੇਸ ॥',
      pronunciation: 'chia ghar, chia gur; chia upades ‖',
      translation:
        'There are six schools of philosophy, six teachers, and six sets of teachings.',
    },
    {
      id: 'ATCX',
      src: 'ਗੁਰੁ ਗੁਰੁ ਏਕੋ; ਵੇਸ ਅਨੇਕ ॥੧॥',
      pronunciation: 'gur gur eko; ves anek ‖1‖',
      translation:
        'But the Teacher of teachers is the One, who appears in so many forms. ||1||',
    },
    {
      id: 'JHL9',
      src: 'ਬਾਬਾ, ਜੈ ਘਰਿ; ਕਰਤੇ ਕੀਰਤਿ ਹੋਇ ॥',
      pronunciation: 'bābā, jē ghari; karate kīrat hoi ‖',
      translation:
        'O Baba: that system in which the Praises of the Creator are sung',
    },
    {
      id: 'BG3B',
      src: 'ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥',
      pronunciation: 'so ghar rākhu; waḍāī toi ‖1‖ rahāu ‖',
      translation:
        '-follow that system; in it rests true greatness. ||1||Pause||',
    },
    {
      id: '7JT8',
      src: 'ਵਿਸੁਏ ਚਸਿਆ, ਘੜੀਆ ਪਹਰਾ; ਥਿਤੀ ਵਾਰੀ ਮਾਹੁ ਹੋਆ ॥',
      pronunciation: 'visue casiā, ghaṛīā paharā; thitī vārī māh hoā ‖',
      translation: 'The seconds, minutes and hours, days, weeks and months,',
    },
    {
      id: '8GAV',
      src: 'ਸੂਰਜੁ; ਏਕੋ ਰੁਤਿ ਅਨੇਕ ॥ ਨਾਨਕ ਕਰਤੇ ਕੇ ਕੇਤੇ ਵੇਸ ॥੨॥੨॥',
      pronunciation: 'sūraju; eko rut anek ‖ nānak karate ke kete ves ‖2‖2‖',
      translation:
        'And the various seasons originate from the one sun; O Nanak, in just the same way, the many forms originate from the Creator. ||2||2||',
    },
    {
      id: '46PB',
      src: 'ਰਾਗੁ ਧਨਾਸਰੀ ਮਹਲਾ ੧ ॥',
      pronunciation: 'rāg dhanāsarī mahalā 1 ‖',
      translation: 'Raag Dhanaasaree, First Mehl:',
    },
    {
      id: 'DMKL',
      src: 'ਗਗਨ ਮੈ ਥਾਲੁ. ਰਵਿ ਚੰਦੁ ਦੀਪਕ ਬਨੇ; ਤਾਰਿਕਾ ਮੰਡਲ, ਜਨਕ ਮੋਤੀ ॥',
      pronunciation:
        'gagan mē thālu. rav cañd dīpak bane; tārikā mañḍal, janak motī ‖',
      translation:
        'Upon that cosmic plate of the sky, the sun and the moon are the lamps. The stars and their orbs are the studded pearls.',
    },
    {
      id: 'CWTS',
      src: 'ਧੂਪੁ ਮਲਆਨਲੋ, ਪਵਣੁ ਚਵਰੋ ਕਰੇ; ਸਗਲ ਬਨਰਾਇ, ਫੂਲੰਤ ਜੋਤੀ ॥੧॥',
      pronunciation:
        'dhūp malaānalo, pawaṇ cawaro kare; sagal banarāi, phūlañt jotī ‖1‖',
      translation:
        'The fragrance of sandalwood in the air is the temple incense, and the wind is the fan. All the plants of the world are the altar flowers in offering to You, O Luminous Lord. ||1||',
    },
    {
      id: '5L8J',
      src: 'ਕੈਸੀ; ਆਰਤੀ ਹੋਇ ॥ ਭਵ ਖੰਡਨਾ; ਤੇਰੀ ਆਰਤੀ ॥',
      pronunciation: 'kēsī; āratī hoi ‖ bhav khañḍanā; terī āratī ‖',
      translation:
        'What a beautiful Aartee, lamp-lit worship service this is! O Destroyer of Fear, this is Your Ceremony of Light.',
    },
    {
      id: '83N9',
      src: 'ਅਨਹਤਾ ਸਬਦ; ਵਾਜੰਤ ਭੇਰੀ ॥੧॥ ਰਹਾਉ ॥',
      pronunciation: 'anahatā sabad; vājañt bherī ‖1‖ rahāu ‖',
      translation:
        'The Unstruck Sound-current of the Shabad is the vibration of the temple drums. ||1||Pause||',
    },
    {
      id: '77XK',
      src: 'ਸਹਸ ਤਵ ਨੈਨ, ਨਨ ਨੈਨ ਹਹਿ ਤੋਹਿ ਕਉ; ਸਹਸ ਮੂਰਤਿ, ਨਨਾ ਏਕ ਤੋੁਹੀ ॥',
      pronunciation:
        'sahas tav nēn, nan nēn hah toh kau; sahas mūrati, nanā ek tohī ‖',
      translation:
        'You have thousands of eyes, and yet You have no eyes. You have thousands of forms, and yet You do not have even one.',
    },
    {
      id: '472J',
      src: 'ਸਹਸ ਪਦ ਬਿਮਲ, ਨਨ ਏਕ ਪਦ; ਗੰਧ ਬਿਨੁ, ਸਹਸ ਤਵ ਗੰਧ; ਇਵ ਚਲਤ ਮੋਹੀ ॥੨॥',
      pronunciation:
        'sahas pad bimal, nan ek pad; gañdh binu, sahas tav gañdh; iv calat mohī ‖2‖',
      translation:
        'You have thousands of Lotus Feet, and yet You do not have even one foot. You have no nose, but you have thousands of noses. This Play of Yours entrances me. ||2||',
    },
    {
      id: '215J',
      src: 'ਸਭ ਮਹਿ ਜੋਤਿ; ਜੋਤਿ ਹੈ ਸੋਇ ॥',
      pronunciation: 'sabh mah joti; jot hē soi ‖',
      translation: 'Amongst all is the Light-You are that Light.',
    },
    {
      id: 'K7Z2',
      src: 'ਤਿਸ ਦੈ ਚਾਨਣਿ; ਸਭ ਮਹਿ ਚਾਨਣੁ ਹੋਇ ॥',
      pronunciation: 'tis dē cānaṇi; sabh mah cānaṇ hoi ‖',
      translation: 'By this Illumination, that Light is radiant within all.',
    },
    {
      id: 'Y7QW',
      src: 'ਗੁਰ ਸਾਖੀ; ਜੋਤਿ ਪਰਗਟੁ ਹੋਇ ॥',
      pronunciation: 'gur sākhī; jot paragaṭ hoi ‖',
      translation: "Through the Guru's Teachings, the Light shines forth.",
    },
    {
      id: 'P7TK',
      src: 'ਜੋ ਤਿਸੁ ਭਾਵੈ; ਸੁ ਆਰਤੀ ਹੋਇ ॥੩॥',
      pronunciation: 'jo tis bhāvē; sa āratī hoi ‖3‖',
      translation:
        'That which is pleasing to Him is the lamp-lit worship service. ||3||',
    },
    {
      id: '7CLJ',
      src: 'ਹਰਿ ਚਰਣ ਕਵਲ ਮਕਰੰਦ, ਲੋਭਿਤ ਮਨੋ; ਅਨਦਿਨੋੁ, ਮੋਹਿ ਆਹੀ ਪਿਆਸਾ ॥',
      pronunciation:
        'har caraṇ kawal makarañd, lobhit mano; anadinou, moh āhī piāsā ‖',
      translation:
        'My mind is enticed by the honey-sweet Lotus Feet of the Lord. Day and night, I thirst for them.',
    },
    {
      id: 'GA86',
      src: 'ਕ੍ਰਿਪਾ ਜਲੁ ਦੇਹਿ, ਨਾਨਕ ਸਾਰਿੰਗ ਕਉ; ਹੋਇ ਜਾ ਤੇ. ਤੇਰੈ ਨਾਇ ਵਾਸਾ ॥੪॥੩॥',
      pronunciation:
        'kripā jal dehi, nānak sāriñg kau; hoi jā te. terē nāi vāsā ‖4‖3‖',
      translation:
        'Bestow the Water of Your Mercy upon Nanak, the thirsty song-bird, so that he may come to dwell in Your Name. ||4||3||',
    },
    {
      id: '1W54',
      src: 'ਰਾਗੁ ਗਉੜੀ ਪੂਰਬੀ ਮਹਲਾ ੪ ॥',
      pronunciation: 'rāg gauṛī pūrabī mahalā 4 ‖',
      translation: 'Raag Gauree Poorbee, Fourth Mehl:',
    },
    {
      id: 'WWAF',
      src: 'ਕਾਮਿ ਕਰੋਧਿ ਨਗਰੁ ਬਹੁ ਭਰਿਆ; ਮਿਲਿ ਸਾਧੂ ਖੰਡਲ ਖੰਡਾ ਹੇ ॥',
      pronunciation:
        'kām karodh nagar bah bhariā; mil sādhū khañḍal khañḍā he ‖',
      translation:
        'The body-village is filled to overflowing with anger and sexual desire; these were broken into bits when I met with the Holy Saint.',
    },
    {
      id: '5T2R',
      src: 'ਪੂਰਬਿ ਲਿਖਤ ਲਿਖੇ, ਗੁਰੁ ਪਾਇਆ; ਮਨਿ ਹਰਿ ਲਿਵ, ਮੰਡਲ ਮੰਡਾ ਹੇ ॥੧॥',
      pronunciation:
        'pūrab likhat likhe, gur pāiā; man har liv, mañḍal mañḍā he ‖1‖',
      translation:
        "By pre-ordained destiny, I have met with the Guru. I have entered into the realm of the Lord's Love. ||1||",
    },
    {
      id: 'LEKU',
      src: 'ਕਰਿ ਸਾਧੂ ਅੰਜੁਲੀ; ਪੁਨੁ ਵਡਾ ਹੇ ॥',
      pronunciation: 'kar sādhū añjulī; pun waḍā he ‖',
      translation:
        'Greet the Holy Saint with your palms pressed together; this is an act of great merit.',
    },
    {
      id: '3WRN',
      src: 'ਕਰਿ ਡੰਡਉਤ; ਪੁਨੁ ਵਡਾ ਹੇ ॥੧॥ ਰਹਾਉ ॥',
      pronunciation: 'kar ḍañḍaut; pun waḍā he ‖1‖ rahāu ‖',
      translation:
        'Bow down before Him; this is a virtuous action indeed. ||1||Pause||',
    },
    {
      id: 'TCHB',
      src: 'ਸਾਕਤ. ਹਰਿ ਰਸ ਸਾਦੁ. ਨ ਜਾਣਿਆ; ਤਿਨ ਅੰਤਰਿ. ਹਉਮੈ ਕੰਡਾ ਹੇ ॥',
      pronunciation:
        'sākat. har ras sādu. na jāṇiā; tin añtari. haumē kañḍā he ‖',
      translation:
        "The wicked shaaktas, the faithless cynics, do not know the Taste of the Lord's Sublime Essence. The thorn of egotism is embedded deep within them.",
    },
    {
      id: '170S',
      src: 'ਜਿਉ ਜਿਉ ਚਲਹਿ, ਚੁਭੈ ਦੁਖੁ ਪਾਵਹਿ; ਜਮਕਾਲੁ ਸਹਹਿ ਸਿਰਿ ਡੰਡਾ ਹੇ ॥੨॥',
      pronunciation:
        'jiu jiu calahi, cubhē dukh pāwahi; jamakāl sahah sir ḍañḍā he ‖2‖',
      translation:
        'The more they walk away, the deeper it pierces them, and the more they suffer in pain, until finally, the Messenger of Death smashes his club against their heads. ||2||',
    },
    {
      id: 'SN7R',
      src: 'ਹਰਿ ਜਨ, ਹਰਿ ਹਰਿ ਨਾਮਿ ਸਮਾਣੇ; ਦੁਖੁ ਜਨਮ ਮਰਣ ਭਵ ਖੰਡਾ ਹੇ ॥',
      pronunciation:
        'har jan, har har nām samāṇe; dukh janam maraṇ bhav khañḍā he ‖',
      translation:
        'The humble servants of the Lord are absorbed in the Name of the Lord, Har, Har. The pain of birth and the fear of death are eradicated.',
    },
    {
      id: 'DYDF',
      src: 'ਅਬਿਨਾਸੀ ਪੁਰਖੁ ਪਾਇਆ ਪਰਮੇਸਰੁ; ਬਹੁ ਸੋਭ ਖੰਡ ਬ੍ਰਹਮੰਡਾ ਹੇ ॥੩॥',
      pronunciation:
        'abināsī purakh pāiā paramesaru; bah sobh khañḍ brahamañḍā he ‖3‖',
      translation:
        'They have found the Imperishable Supreme Being, the Transcendent Lord God, and they receive great honor throughout all the worlds and realms. ||3||',
    },
    {
      id: '6SJW',
      src: 'ਹਮ ਗਰੀਬ ਮਸਕੀਨ ਪ੍ਰਭ ਤੇਰੇ; ਹਰਿ ਰਾਖੁ ਰਾਖੁ ਵਡ ਵਡਾ ਹੇ ॥',
      pronunciation:
        'ham garīb masakīn prabh tere; har rākh rākh waḍ waḍā he ‖',
      translation:
        'I am poor and meek, God, but I belong to You! Save me-please save me, O Greatest of the Great!',
    },
    {
      id: 'BV7S',
      src: 'ਜਨ ਨਾਨਕ. ਨਾਮੁ ਅਧਾਰੁ ਟੇਕ ਹੈ; ਹਰਿ ਨਾਮੇ ਹੀ ਸੁਖੁ ਮੰਡਾ ਹੇ ॥੪॥੪॥',
      pronunciation:
        'jan nānak. nām adhār ṭek hē; har nāme hī sukh mañḍā he ‖4‖4‖',
      translation:
        'Servant Nanak takes the Sustenance and Support of the Naam. In the Name of the Lord, he enjoys celestial peace. ||4||4||',
    },
    {
      id: 'BRV1',
      src: 'ਰਾਗੁ ਗਉੜੀ ਪੂਰਬੀ ਮਹਲਾ ੫ ॥',
      pronunciation: 'rāg gauṛī pūrabī mahalā 5 ‖',
      translation: 'Raag Gauree Poorbee, Fifth Mehl:',
    },
    {
      id: '2KKC',
      src: 'ਕਰਉ ਬੇਨੰਤੀ, ਸੁਣਹੁ ਮੇਰੇ ਮੀਤਾ; ਸੰਤ ਟਹਲ ਕੀ ਬੇਲਾ ॥',
      pronunciation: 'karau benañtī, suṇah mere mītā; sañt ṭahal kī belā ‖',
      translation:
        'Listen, my friends, I beg of you: now is the time to serve the Saints!',
    },
    {
      id: '4DQT',
      src: 'ਈਹਾ ਖਾਟਿ ਚਲਹੁ, ਹਰਿ ਲਾਹਾ; ਆਗੈ ਬਸਨੁ ਸੁਹੇਲਾ ॥੧॥',
      pronunciation: 'īhā khāṭ calahu, har lāhā; āgē basan suhelā ‖1‖',
      translation:
        "In this world, earn the profit of the Lord's Name, and hereafter, you shall dwell in peace. ||1||",
    },
    {
      id: 'XH0Q',
      src: 'ਅਉਧ ਘਟੈ; ਦਿਨਸੁ ਰੈਣਾਰੇ ॥',
      pronunciation: 'audh ghaṭē; dinas rēṇāre ‖',
      translation: 'This life is diminishing, day and night.',
    },
    {
      id: 'CN6N',
      src: 'ਮਨ ਗੁਰ ਮਿਲਿ; ਕਾਜ ਸਵਾਰੇ ॥੧॥ ਰਹਾਉ ॥',
      pronunciation: 'man gur mili; kāj savāre ‖1‖ rahāu ‖',
      translation:
        'Meeting with the Guru, your affairs shall be resolved. ||1||Pause||',
    },
    {
      id: 'NNL6',
      src: 'ਇਹੁ ਸੰਸਾਰੁ ਬਿਕਾਰੁ ਸੰਸੇ ਮਹਿ; ਤਰਿਓ ਬ੍ਰਹਮ ਗਿਆਨੀ ॥',
      pronunciation: 'ih sañsār bikār sañse mahi; tario braham giānī ‖',
      translation:
        'This world is engrossed in corruption and cynicism. Only those who know God are saved.',
    },
    {
      id: 'UHQW',
      src: 'ਜਿਸਹਿ ਜਗਾਇ, ਪੀਆਵੈ ਇਹੁ ਰਸੁ; ਅਕਥ ਕਥਾ ਤਿਨਿ ਜਾਨੀ ॥੨॥',
      pronunciation: 'jisah jagāi, pīāvē ih rasu; akath kathā tin jānī ‖2‖',
      translation:
        'Only those who are awakened by the Lord to drink in this Sublime Essence, come to know the Unspoken Speech of the Lord. ||2||',
    },
    {
      id: 'V3JU',
      src: 'ਜਾ ਕਉ ਆਏ. ਸੋਈ ਬਿਹਾਝਹੁ; ਹਰਿ ਗੁਰ ਤੇ. ਮਨਹਿ ਬਸੇਰਾ ॥',
      pronunciation: 'jā kau āe. soī bihājhahu; har gur te. manah baserā ‖',
      translation:
        'Purchase only that for which you have come into the world, and through the Guru, the Lord shall dwell within your mind.',
    },
    {
      id: '7NQ6',
      src: 'ਨਿਜ ਘਰਿ ਮਹਲੁ, ਪਾਵਹੁ ਸੁਖ ਸਹਜੇ; ਬਹੁਰਿ. ਨ ਹੋਇਗੋ ਫੇਰਾ ॥੩॥',
      pronunciation:
        'nij ghar mahalu, pāwah sukh sahaje; bahuri. na hoigo pherā ‖3‖',
      translation:
        "Within the home of your own inner being, you shall obtain the Mansion of the Lord's Presence with intuitive ease. You shall not be consigned again to the wheel of reincarnation. ||3||",
    },
    {
      id: 'D1VS',
      src: 'ਅੰਤਰਜਾਮੀ ਪੁਰਖ ਬਿਧਾਤੇ; ਸਰਧਾ ਮਨ ਕੀ ਪੂਰੇ ॥',
      pronunciation: 'añtarajāmī purakh bidhāte; saradhā man kī pūre ‖',
      translation:
        'O Inner-knower, Searcher of Hearts, O Primal Being, Architect of Destiny: please fulfill this yearning of my mind.',
    },
    {
      id: 'VTX4',
      src: 'ਨਾਨਕ ਦਾਸੁ. ਇਹੈ ਸੁਖੁ ਮਾਗੈ; ਮੋ ਕਉ ਕਰਿ ਸੰਤਨ ਕੀ ਧੂਰੇ ॥੪॥੫॥',
      pronunciation:
        'nānak dāsu. ihē sukh māgē; mo kau kar sañtan kī dhūre ‖4‖5‖',
      translation:
        'Nanak, Your slave, begs for this happiness: let me be the dust of the feet of the Saints. ||4||5||',
    },
  ],
};
export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
