import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਅਰਦਾਸ',
    roman: 'Ardās',
  },
  data: [
    {
      id: 'S2AC',
      src: 'ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹ ॥',
      pronunciation: 'ik oañkār vāhigurū jī kī fatah ‖',
      translation: 'The Lord is One and the Victory is of the True Guru.',
    },
    {
      id: 'F5WM',
      src: 'ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਸਹਾਇ ॥',
      pronunciation: 'srī bhagautī jī sahāi ‖',
      translation: 'May SRI BHAGAUTI JI (The Sword) be Helpful.',
    },
    {
      id: 'D82Q',
      src: 'ਵਾਰ ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਕੀ ॥',
      pronunciation: 'vār srī bhagautī jī kī ‖',
      translation: 'The Heroic Poem of Sri Bhagauti Ji',
    },
    {
      id: 'N0NV',
      src: 'ਪਾਤਿਸਾਹੀ ੧੦ ॥',
      pronunciation: 'pātisāhī 10 ‖',
      translation: '(By) TheTenth King (Guru).',
    },
    {
      id: 'PSRF',
      src: 'ਪ੍ਰਿਥਮ ਭਗੌਤੀ ਸਿਮਰਿ ਕੈ ਗੁਰ ਨਾਨਕ ਲਈਂ ਧਿਆਇ ॥',
      pronunciation: 'pritham bhagōtī simar kē gur nānak laīñ dhiāi ‖',
      translation:
        'In the beginning I remember Bhagauti, the Lord (Whose symbol is the sword and then I remember Guru Nanak.',
    },
    {
      id: 'KL7X',
      src: 'ਫਿਰ ਅੰਗਦ ਗੁਰ ਤੇ ਅਮਰਦਾਸੁ ਰਾਮਦਾਸੈ ਹੋਈਂ ਸਹਾਇ ॥',
      pronunciation: 'phir añgad gur te amaradās rāmadāsē hoīñ sahāi ‖',
      translation:
        'Then I remember Guru Arjan, Guru Amar Das and Guru Ram Das, may they be helpful to me.',
    },
    {
      id: 'KGYS',
      src: 'ਅਰਜਨ ਹਰਿਗੋਬਿੰਦ ਨੋ ਸਿਮਰੌ ਸ੍ਰੀ ਹਰਿਰਾਇ ॥',
      pronunciation: 'arajan harigobiñd no simarō srī harirāi ‖',
      translation:
        'Then I remember Guru Arjan, Guru Hargobind and Guru Har Rai.',
    },
    {
      id: 'B36J',
      src: 'ਸ੍ਰੀ ਹਰਿਕ੍ਰਿਸ਼ਨ ਧਿਆਈਐ ਜਿਸ ਡਿਠੇ ਸਭਿ ਦੁਖਿ ਜਾਇ ॥',
      pronunciation: 'srī harikrishan dhiāīē jis ḍiṭhe sabh dukh jāi ‖',
      translation:
        '(After them) I remember Guru Har Kishan, by whose sight all the sufferings vanish.',
    },
    {
      id: 'BT4L',
      src: 'ਤੇਗ ਬਹਾਦਰ ਸਿਮਰਿਐ ਘਰ ਨਉ ਨਿਧਿ ਆਵੈ ਧਾਇ ॥',
      pronunciation: 'teg bahādar simariē ghar nau nidh āvē dhāi ‖',
      translation:
        'Then I do remember Guru Tegh Bahadur, though whose Grace the nine treasures come running to my house.',
    },
    {
      id: '5RGE',
      src: 'ਸਭ ਥਾਈਂ ਹੋਇ ਸਹਾਇ ॥੧॥',
      pronunciation: 'sabh thāīñ hoi sahāi ‖1‖',
      translation: 'May they be helpful to me everywhere.1.',
    },
    {
      id: '2HY4',
      src: 'ਦਸਵਾਂ ਪਾਤਿਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਸਾਹਿਬ ਜੀ; ਸਭ ਥਾਈਂ ਹੋਇ ਸਹਾਇ ।',
      pronunciation:
        'dasavāñ pātishāh srī gurū gobiñd siñgh sāhib jī; sabh thāīñ hoi sahāi |',
      translation:
        'Then think of the tenth lord, revered Guru Gobind Singh, who comes to rescue everywhere.',
    },
    {
      id: 'V26Z',
      src: 'ਦਸਾਂ ਪਾਤਿਸ਼ਾਹੀਆਂ ਦੀ ਜੋਤ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਪਾਠ ਦੀਦਾਰ ਦਾ ਧਿਆਨ ਧਰ ਕੇ ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'dasāñ pātishāhīāñ dī jot srī gurū grañth sāhib jī de pāṭh dīdār dā dhiān dhar ke bolo jī vāhigurū |',
      translation:
        'The embodiment of the light of all ten sovereign lordships, the Guru Granth Sahib - think of the view and reading of it and say, "Waheguru".',
    },
    {
      id: 'NVNP',
      src: 'ਪੰਜਾਂ ਪਿਆਰਿਆਂ, ਚੌਹਾਂ ਸਾਹਿਬਜ਼ਾਦਿਆਂ, ਚਾਲ੍ਹੀਆਂ ਮੁਕਤਿਆਂ, ਹਠੀਆਂ, ਜਪੀਆਂ, ਤਪੀਆਂ, ਜਿਹਨਾਂ ਨਾਮ ਜਪਿਆ, ਵੰਡ ਛਕਿਆ, ਦੇਗ ਚਲਾਈ, ਤੇਗ ਵਾਹੀ, ਦੇਖ ਕੇ ਅਣਡਿੱਤ ਕੀਤਾ, ਤਿਨ੍ਹਾਂ ਪਿਆਰਿਆਂ, ਸਚਿਆਰਿਆਂ ਦੀ ਕਮਾਈ ਦਾ ਧਿਆਨ ਧਰ ਕੇ, ਖ਼ਾਲਸਾ ਜੀ; ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'pañjāñ piāriāñ, cōhāñ sāhibazādiāñ, cālhīāñ mukatiāñ, haṭhīāñ, japīāñ, tapīāñ, jihanāñ nām japiā, wañḍ chakiā, deg calāī, teg vāhī, dekh ke aṇaḍitt kītā, tinhāñ piāriāñ, saciāriāñ dī kamāī dā dhiān dhar ke, ḳhālasā jī; bolo jī vāhigurū |',
      translation:
        'Meditating on the achievement of the dear and truthful ones, including the five beloved ones, the four sons of the tenth Guru, forty liberated ones, steadfast ones, constant repeaters of the Divine Name, those given to assiduous devotion, those who repeated the Naam, shared their fare with others, ran free kitchen, wielded the sword and ever looked faults and shortcomings, say "Waheguru", O Khalsa.',
    },
    {
      id: '8EEH',
      src: 'ਜਿਨ੍ਹਾਂ ਸਿੰਘਾਂ ਸਿੰਘਣੀਆਂ ਨੇ ਧਰਮ ਹੇਤ ਸੀਸ ਦਿੱਤੇ, ਬੰਦ ਬੰਦ ਕਟਾਏ, ਖੋਪਰੀਆਂ ਲੁਹਾਈਆਂ, ਚਰਖੜੀਆਂ ਤੇ ਚੜੇ, ਆਰਿਆਂ ਨਾਲ ਚਿਰਾਏ ਗਏ, ਗੁਰਦਵਾਰਿਆਂ ਦੀ ਸੇਵਾ ਲਈ ਕੁਰਬਾਨੀਆਂ ਕੀਤੀਆਂ, ਧਰਮ ਨਹੀਂ ਹਾਰਿਆ, ਸਿੱਖੀ ਕੇਸਾਂ ਸੁਆਸਾਂ ਨਾਲ ਨਿਬਾਹੀ, ਤਿਨ੍ਹਾਂ ਦੀ ਕਮਾਈ ਦਾ ਧਿਆਨ ਧਰ ਕੇ ਖ਼ਾਲਸਾ ਜੀ; ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'jinhāñ siñghāñ siñghaṇīāñ ne dharam het sīs ditte, bañd bañd kaṭāe, khoparīāñ luhāīāñ, carakhaṛīāñ te caṛe, āriāñ nāl cirāe gae, guradavāriāñ dī sevā laī kurabānīāñ kītīāñ, dharam nahīñ hāriā, sikkhī kesāñ suāsāñ nāl nibāhī, tinhāñ dī kamāī dā dhiān dhar ke ḳhālasā jī; bolo jī vāhigurū |',
      translation:
        'Meditating on the achievement of the male and female members of the Khalsa who laid down their lives in the cause of dharma (religion and righteousness), got their bodies dismembered bit by bit, got their skulls sawn off, got mounted on spiked wheels, got their bodies sawn, made sacrifices in the service of the shrines (gurdwaras), did not betray their faith, sustained their adherence to the Sikh faith with sacred unshorn hair up till their last breath, say, "Waheguru", O Khalsa.',
    },
    {
      id: 'RZCQ',
      src: 'ਪੰਜਾਂ ਤਖ਼ਤਾਂ, ਸਰਬੱਤ ਗੁਰਦੁਆਰਿਆਂ ਦਾ ਧਿਆਨ ਧਰ ਕੇ ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'pañjāñ tḳhtāñ, sarabatt guraduāriāñ dā dhiān dhar ke bolo jī vāhigurū |',
      translation:
        'Thinking of the five thrones (seats of religious authority) and all gurdwaras, say, "Waheguru", O Khalsa.',
    },
    {
      id: '817H',
      src: 'ਪ੍ਰਿਥਮੇ ਸਰਬੱਤ ਖ਼ਾਲਸਾ ਜੀ ਕੀ ਅਰਦਾਸ ਹੈ ਜੀ, ਸਰਬੱਤ ਖ਼ਾਲਸਾ ਜੀ ਕੋ ਵਾਹਿਗੁਰੂ, ਵਾਹਿਗੁਰੂ, ਵਾਹਿਗੁਰੂ ਚਿੱਤ ਆਵੇ, ਚਿੱਤ ਆਵਨ ਕਾ ਸਦਕਾ ਸਰਬ ਸੁਖ ਹੋਵੇ ।',
      pronunciation:
        'prithame sarabatt ḳhālasā jī kī aradās hē jī, sarabatt ḳhālasā jī ko vāhigurū, vāhigurū, vāhigurū citt āve, citt āwan kā sadakā sarab sukh hove |',
      translation:
        'Now it is the prayer of the whole Khalsa. May the conscience of the whole Khalsa be informed by Waheguru, Waheguru, Waheguru and, in consequence of such remembrance, may total well-being obtain.',
    },
    {
      id: 'LP62',
      src: 'ਜਹਾਂ ਜਹਾਂ ਖ਼ਾਲਸਾ ਜੀ ਸਾਹਿਬ, ਤਹਾਂ ਤਹਾਂ ਰਛਿਆਂ ਰਿਆਇਤ, ਦੇਗ ਤੇਗ ਫ਼ਤਹ, ਬਿਰਦ ਕੀ ਪੈਜ, ਪੰਥ ਕੀ ਜੀਤ, ਸ੍ਰੀ ਸਾਹਿਬ ਜੀ ਸਹਾਇ, ਖ਼ਾਲਸੇ ਜੀ ਕੇ ਬੋਲ ਬਾਲੇ, ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'jahāñ jahāñ ḳhālasā jī sāhib, tahāñ tahāñ rachiāñ riāit, deg teg fatah, birad kī pēj, pañth kī jīt, srī sāhib jī sahāi, ḳhālase jī ke bol bāle, bolo jī vāhigurū |',
      translation:
        'Wherever there are communities of the Khalsa, may there be Divine protection and grace, and ascendance of the supply of needs and of the holy sword, protection of the tradition of grace, victory to the Panth, the succor of the holy sword, and ascendance of the Khalsa. Say, O Khalsa, "Waheguru".',
    },
    {
      id: 'F1YX',
      src: 'ਸਿੱਖਾਂ ਨੂੰ ਸਿੱਖੀ ਦਾਨ, ਕੇਸ ਦਾਨ, ਰਹਿਤ ਦਾਨ, ਬਿਬੇਕ ਦਾਨ, ਵਿਸਾਹ ਦਾਨ, ਭਰੋਸਾ ਦਾਨ, ਦਾਨਾਂ ਸਿਰ ਦਾਨ ਨਾਮ ਦਾਨ, ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਜੀ ਦੇ ਇਸ਼ਨਾਨ, ਚੌਂਕੀਆ, ਝੰਡੇ, ਬੁੰਗੇ ਜੁਗੋ ਜੁਗ ਅਟੱਲ, ਧਰਮ ਕਾ ਜੈਕਾਰ, ਬੋਲੋ ਜੀ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'sikkhāñ nūñ sikkhī dān, kes dān, rahit dān, bibek dān, visāh dān, bharosā dān, dānāñ sir dān nām dān, srī añmritasar jī de ishanān, cōñkīā, jhañḍe, buñge jugo jug aṭall, dharam kā jēkār, bolo jī vāhigurū |',
      translation:
        'Unto the Sikhs the gift of the Sikh faith, the gift of the untrimmed hair, the gift of the disciple of their faith, the gift of sense of discrimination, the gift of truest, the gift of confidence, above all, the gift of meditation on the Divine and bath in the Amritsar (holy tank at Amritsar). May hymns-singing missionary parties, the flags, the hostels, abide from age to age. May righteousness reign supreme. Say, "Waheguru".',
    },
    {
      id: 'ARN7',
      src: 'ਸਿੱਖਾਂ ਦਾ ਮਨ ਨੀਵਾਂ, ਮਤ ਉੱਚੀ, ਮਤ ਦਾ ਰਾਖਾ ਆਪਿ ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'sikkhāñ dā man nīvāñ, mat uccī, mat dā rākhā āp vāhigurū |',
      translation:
        'May the Khalsa be imbued with humility and high wisdom! May Waheguru guard its understanding!',
    },
    {
      id: 'P8FV',
      src: 'ਹੇ ਅਕਾਲ ਪੁਰਖ ਆਪਣੇ ਪੰਥ ਦੇ ਸਦਾ ਸਹਾਈ ਦਾਤਾਰ ਜੀਓ ।',
      pronunciation: 'he akāl purakh āpaṇe pañth de sadā sahāī dātār jīo |',
      translation:
        'O Immortal Being, eternal helper of Thy Panth, benevolent Lord,',
    },
    {
      id: 'EUMU',
      src: 'ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ ਤੇ ਹੋਰ ਗੁਰਦੁਆਰਿਆਂ ਗੁਰਧਾਮਾਂ ਦੇ, ਜਿਨ੍ਹਾਂ ਤੋਂ ਪੰਥ ਨੂੰ ਵਿਛੋੜਿਆ ਗਿਆ ਹੈ, ਖੁਲ੍ਹੇ ਦਰਸ਼ਨ ਦੀਦਾਰ ਤੇ ਸੇਵਾ ਸੰਭਾਲ ਦਾ ਦਾਨ ਖ਼ਾਲਸਾ ਜੀ ਨੂੰ ਬਖਸ਼ੋ ।',
      pronunciation:
        'srī nanakāṇā sāhib te hor guraduāriāñ guradhāmāñ de, jinhāñ toñ pañth nūñ vichoṛiā giā hē, khulhe darashan dīdār te sevā sañbhāl dā dān ḳhālasā jī nūñ bakhasho |',
      translation:
        'Bestow on the Khalsa the beneficence of unobstructed visit to the free management of Nankana Sahib and other shrines and places of the Guru from which the Panth have been separated.',
    },
    {
      id: 'VVYJ',
      src: 'ਹੇ ਨਿਮਾਣਿਆਂ ਦੇ ਮਾਣ, ਨਿਤਾਣਿਆਂ ਦੇ ਤਾਣ, ਨਿਓਟਿਆਂ ਦੀ ਓਟ, ਸੱਚੇ ਪਿਤਾ, ਵਾਹਿਗੁਰੂ ।',
      pronunciation:
        'he nimāṇiāñ de māṇ, nitāṇiāñ de tāṇ, nioṭiāñ dī oṭ, sacce pitā, vāhigurū |',
      translation:
        'O Thou, the honor of the humble, the strength of the weak, aid unto those who have none to rely on, True Father, Waheguru,',
    },
    {
      id: 'TQAC',
      src: 'ਆਪ ਦੇ ਹਜ਼ੂਰ ... ਦੀ ਅਰਦਾਸ ਹੈ ਜੀ ।',
      pronunciation: 'āp de hazūr ... dī aradās hē jī |',
      translation: 'We humbly render to you ...',
    },
    {
      id: '5WUU',
      src: 'ਅੱਖਰ ਵਾਧਾ ਘਾਟਾ ਭੁੱਲ ਚੁੱਕ ਮਾਫ ਕਰਨੀ ।',
      pronunciation: 'akkhar vādhā ghāṭā bhull cukk māph karanī |',
      translation:
        'Pardon any impermissible accretions, omissions, errors, mistakes.',
    },
    {
      id: '5G3X',
      src: 'ਸਰਬੱਤ ਦੇ ਕਾਰਜ ਰਾਸ ਕਰਨੇ ।',
      pronunciation: 'sarabatt de kāraj rās karane |',
      translation: 'Fulfill the purposes of all.',
    },
    {
      id: '23VT',
      src: 'ਸੇਈ ਪਿਆਰੇ ਮੇਲ, ਜਿਨ੍ਹਾਂ ਮਿਲਿਆਂ ਤੇਰਾ ਨਾਮ ਚਿਤ ਆਵੇ ।',
      pronunciation: 'seī piāre mel, jinhāñ miliāñ terā nām cit āve |',
      translation:
        'Grant us the association of those dear ones, on meeting whom one is reminded of Your Name.',
    },
    {
      id: 'Z4ZP',
      src: 'ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ ।',
      pronunciation: 'nānak nām caṛhadī kalā, tere bhāṇe sarabatt dā bhalā |',
      translation:
        'O Nanak, may the Naam (Holy) be ever in ascendance! In Thy will may the good of all prevail!',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
