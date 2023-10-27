import type { RequestHandler } from '@builder.io/qwik-city'

const data = {
  title: {
    unicode: 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ',
    roman: 'Twa-Prasād Swaye',
  },
  paging: {
    previous: 'jap-sahib',
    next: 'kabyo-bac-benti-copai',
  },
  data: [
    {
      id: '4YJS',
      src: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      pronunciation: 'ik oañkār satigur prasād ‖',
      translation:
        'The Lord is One and He can be attained through the grace of the true Guru.',
    },
    {
      id: 'EZH0',
      src: 'ਪਾਤਿਸਾਹੀ ੧੦ ॥',
      pronunciation: 'pātisāhī 10 ‖',
      translation: 'The Tenth Sovereign.',
    },
    {
      id: 'B1FB',
      src: 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ ॥ ਸਵੱਯੇ ॥',
      pronunciation: 'twa prasād ‖ sawayye ‖',
      translation: 'BY THY GRACE SWAYYAS',
    },
    {
      id: '674B',
      src: 'ਸ੍ਰਾਵਗ ਸੁੱਧ ਸਮੂਹ ਸਿਧਾਨ ਕੇ; ਦੇਖਿ ਫਿਰਿਓ ਘਰ ਜੋਗ ਜਤੀ ਕੇ ॥',
      pronunciation:
        'srāwag suddh samūh sidhān ke; dekh phirio ghar jog jatī ke ‖',
      translation:
        'I have seen during my tours pure Sravaks (Jaina and Buddhist monks), group of adepts and abodes of ascetics and Yogi.',
    },
    {
      id: 'ZTA0',
      src: 'ਸੂਰ ਸੁਰਾਰਦਨ, ਸੁੱਧ ਸੁਧਾਦਿਕ; ਸੰਤ ਸਮੂਹ ਅਨੇਕ ਮਤੀ ਕੇ ॥',
      pronunciation: 'sūr surāradan, suddh sudhādik; sañt samūh anek matī ke ‖',
      translation:
        'Valiant heroes, demons killing gods, gods drinking nectar and assemblies of saints of various sects.',
    },
    {
      id: 'HEUN',
      src: 'ਸਾਰੇ ਹੀ ਦੇਸ ਕੋ ਦੇਖਿ ਰਹਿਓ; ਮਤ ਕੋਊ ਨ ਦੇਖੀਅਤ ਪ੍ਰਾਨਪਤੀ ਕੇ ॥',
      pronunciation:
        'sāre hī des ko dekh rahio; mat koū na dekhīat prānapatī ke ‖',
      translation:
        'I have seen the disciplines of the religious systems of all the countries, but seen none of the Lord, the Master of my life.',
    },
    {
      id: '0AY2',
      src: 'ਸ੍ਰੀ ਭਗਵਾਨ ਕੀ ਭਾਇ ਕ੍ਰਿਪਾ ਹੂ ਤੇ; ਏਕ ਰਤੀ ਬਿਨੁ, ਏਕ ਰਤੀ ਕੇ ॥੧॥੨੧॥',
      pronunciation:
        'srī bhagavān kī bhāi kripā hū te; ek ratī binu, ek ratī ke ‖1‖21‖',
      translation:
        'They are worth nothing without an iota of the Grace of the Lord. 1.21.',
    },
    {
      id: 'U1ML',
      src: 'ਮਾਤੇ ਮਤੰਗ, ਜਰੇ ਜਰ ਸੰਗ; ਅਨੂਪ ਉਤੰਗ ਸੁਰੰਗ ਸਵਾਰੇ ॥',
      pronunciation: 'māte matañg, jare jar sañg; anūp utañg surañg savāre ‖',
      translation:
        'With intoxicated elephants, studded with gold, incomparable and huge, painted in bright colours.',
    },
    {
      id: '211X',
      src: 'ਕੋਟ ਤੁਰੰਗ, ਕੁਰੰਗ ਸੇ ਕੂਦਤ; ਪਉਨ ਕੇ ਗਉਨ ਕੋ ਜਾਤ ਨਿਵਾਰੇ ॥',
      pronunciation:
        'koṭ turañg, kurañg se kūdat; paun ke gaun ko jāt nivāre ‖',
      translation:
        'With millions of horses galloping like deer, moving faster than the wind.',
    },
    {
      id: 'MBND',
      src: 'ਭਾਰੀ ਭੁਜਾਨ ਕੇ ਭੂਪ, ਭਲੀ ਬਿਧਿ; ਨਿਆਵਤ ਸੀਸ, ਨ ਜਾਤ ਬਿਚਾਰੇ ॥',
      pronunciation:
        'bhārī bhujān ke bhūp, bhalī bidhi; niāwat sīs, na jāt bicāre ‖',
      translation:
        'With many kings indescribable, having long arms (of heavy allied forces), bowing their heads in fine array.',
    },
    {
      id: '9TDS',
      src: 'ਏਤੇ ਭਏ, ਤੁ ਕਹਾ ਭਏ ਭੂਪਤਿ, ਅੰਤ ਕੋ, ਨਾਂਗੇ ਹੀ ਪਾਂਇ ਪਧਾਰੇ ॥੨॥੨੨॥',
      pronunciation:
        'ete bhae, ta kahā bhae bhūpati, añt ko, nāñge hī pāñi padhāre ‖2‖22‖',
      translation:
        'What matters if such mighty emperors were there, because they had to leave the world with bare feet.2.22.',
    },
    {
      id: 'F7WT',
      src: 'ਜੀਤ ਫਿਰੈ ਸਭ ਦੇਸ ਦਿਸਾਨ ਕੋ; ਬਾਜਤ ਢੋਲ, ਮ੍ਰਿਦੰਗ, ਨਗਾਰੇ ॥',
      pronunciation:
        'jīt phirē sabh des disān ko; bājat ḍhol, mridañg, nagāre ‖',
      translation:
        'With the beat of drums and trumpets if the emperor conquers all the countries.',
    },
    {
      id: 'RJJZ',
      src: 'ਗੁੰਜਤ ਗੂੜ ਗਜਾਨ ਕੇ ਸੁੰਦਰ ਹਿੰਸਤ ਹੈਂ ਹਯਰਾਜ ਹਜਾਰੇ ॥',
      pronunciation: 'guñjat gūṛ gajān ke suñdar hiñsat hēñ hayarāj hajāre ‖',
      translation:
        'Along with many beautiful roaring elephants and thousands of neighing houses of best breed.',
    },
    {
      id: '6TYZ',
      src: 'ਭੂਤ ਭਵਿੱਖ ਭਵਾਨ ਕੇ ਭੂਪਤ; ਕਉਨੁ ਗਨੈ, ਨਹੀਂ ਜਾਤ ਬਿਚਾਰੇ ॥',
      pronunciation:
        'bhūt bhavikkh bhavān ke bhūpat; kaun ganē, nahīñ jāt bicāre ‖',
      translation:
        'Such like emperors of the past, present and future cannot be counted and ascertained.',
    },
    {
      id: 'RWCX',
      src: 'ਸ੍ਰੀ ਪਤਿ ਸ੍ਰੀ ਭਗਵਾਨ ਭਜੇ ਬਿਨੁ; ਅੰਤ ਕਉ, ਅੰਤ ਕੇ ਧਾਮ ਸਿਧਾਰੇ ॥੩॥੨੩॥',
      pronunciation:
        'srī pat srī bhagavān bhaje binu; añt kau, añt ke dhām sidhāre ‖3‖23‖',
      translation:
        'But without remembering the Name of the Lord, they ultimately leave for their final abode. 3.23.',
    },
    {
      id: 'A426',
      src: 'ਤੀਰਥ ਨਾਨ ਦਇਆ ਦਮ ਦਾਨ ਸੁ ਸੰਜਮ ਨੇਮ ਅਨੇਕ ਬਿਸੇਖੈ ॥',
      pronunciation: 'tīrath nān daiā dam dān sa sañjam nem anek bisekhē ‖',
      translation:
        'Taking bath at holy places, exercising mercy, controlling passions, performing acts of charity, practicing austerity and many special rituals.',
    },
    {
      id: 'DNSB',
      src: 'ਬੇਦ ਪੁਰਾਨ, ਕਤੇਬ ਕੁਰਾਨ; ਜਮੀਨ ਜਮਾਨ ਸਬਾਨ ਕੇ ਪੇਖੈ ॥',
      pronunciation: 'bed purān, kateb kurān; jamīn jamān sabān ke pekhē ‖',
      translation:
        'Studying of Vedas, Puranas and holy Quran and scanning all this world and the next world.',
    },
    {
      id: 'TLVC',
      src: 'ਪਉਨ ਅਹਾਰ, ਜਤੀ ਜਤ ਧਾਰ; ਸਬੈ ਸੁ ਬਿਚਾਰ ਹਜਾਰ ਕ ਦੇਖੈ ॥',
      pronunciation: 'paun ahār, jatī jat dhār; sabē sa bicār hajār ka dekhē ‖',
      translation:
        'Subsisting only on air, practicing continence and meeting thousands of persons of all good thoughts.',
    },
    {
      id: 'EKAF',
      src: 'ਸ੍ਰੀ ਭਗਵਾਨ ਭਜੇ ਬਿਨੁ ਭੂਪਤਿ; ਏਕ ਰਤੀ ਬਿਨੁ, ਏਕ ਨ ਲੇਖੈ ॥੪॥੨੪॥',
      pronunciation:
        'srī bhagavān bhaje bin bhūpati; ek ratī binu, ek na lekhē ‖4‖24‖',
      translation:
        'But O King! Without the remembrance of the Name of the Lord, all this is of no account, being without an iota of the Grace of the Lord. 4.24.',
    },
    {
      id: 'C20T',
      src: 'ਸੁੱਧ ਸਿਪਾਹ, ਦੁਰੰਤ ਦੁਬਾਹ; ਸੁ ਸਾਜ ਸਨਾਹ, ਦੁਰਜਾਨ ਦਲੈਂਗੇ ॥',
      pronunciation:
        'suddh sipāh, durañt dubāh; sa sāj sanāh, durajān dalēñge ‖',
      translation:
        'The trained soldiers, mightly and invincible, clad in coat of mail, who would be able to crush the enemies.',
    },
    {
      id: '8VPV',
      src: 'ਭਾਰੀ ਗੁਮਾਨ ਭਰੇ ਮਨ ਮੈਂ; ਕਰ ਪਰਬਤ ਪੰਖ, ਹਲੇ ਨ ਹਲੈਂਗੇ ॥',
      pronunciation:
        'bhārī gumān bhare man mēñ; kar parabat pañkh, hale na halēñge ‖',
      translation:
        'With great ego in their mind that they would not be vanquished even if the mountains move with wings.',
    },
    {
      id: 'K1AS',
      src: 'ਤੋਰਿ ਅਰੀਨ, ਮਰੋਰਿ ਮਵਾਸਨ; ਮਾਤੇ ਮਤੰਗਨਿ ਮਾਨ ਮਲੈਂਗੇ ॥',
      pronunciation: 'tor arīn, maror mavāsan; māte matañgan mān malēñge ‖',
      translation:
        'They would destroy the enemies, twist the rebels and smash the pride of intoxicated elephants.',
    },
    {
      id: 'G091',
      src: 'ਸ੍ਰੀ ਪਤਿ ਸ੍ਰੀ ਭਗਵਾਨ ਕ੍ਰਿਪਾ ਬਿਨੁ; ਤਿਆਗਿ ਜਹਾਨ, ਨਿਦਾਨ ਚਲੈਂਗੇ ॥੫॥੨੫॥',
      pronunciation:
        'srī pat srī bhagavān kripā binu; tiāg jahān, nidān calēñge ‖5‖25‖',
      translation:
        'But without the Grace of the Lord-God, they would ultimately leave the world. 5.25.',
    },
    {
      id: 'DUTX',
      src: 'ਬੀਰ ਅਪਾਰ, ਬਡੇ ਬਰਿਆਰ; ਅਬਿਚਾਰਹਿ, ਸਾਰ ਕੀ ਧਾਰ ਭਛੱਯਾ ॥',
      pronunciation:
        'bīr apār, baḍe bariār; abicārahi, sār kī dhār bhachayyā ‖',
      translation:
        'Innumerable brave and mighty heroes, fearlessly facing the edge of the sword.',
    },
    {
      id: 'JK3G',
      src: 'ਤੋਰਤ ਦੇਸ, ਮਲਿੰਦ ਮਵਾਸਨ; ਮਾਤੇ ਗਜਾਨ ਕੇ ਮਾਨ, ਮਲੱਯਾ ॥',
      pronunciation: 'torat des, maliñd mavāsan; māte gajān ke mān, malayyā ‖',
      translation:
        'Conquering the countries, subjugating the rebels and crushing the pride of the intoxicated elephants.',
    },
    {
      id: 'H016',
      src: 'ਗਾੜ੍ਹੇ ਗੜ੍ਹਾਨ ਕੋ ਤੋੜਨਹਾਰ; ਸੁ ਬਾਤਨ ਹੀਂ, ਚਕ ਚਾਰ ਲਵੱਯਾ ॥',
      pronunciation:
        'gāṛhe gaṛhān ko toṛanahār; sa bātan hīñ, cak cār lawayyā ‖',
      translation:
        'Capturing the strong forts and conquering all sides with mere threats.',
    },
    {
      id: '6U4L',
      src: 'ਸਾਹਿਬੁ ਸ੍ਰੀ ਸਭ ਕੋ ਸਿਰ ਨਾਇਕ; ਜਾਚਕ ਅਨੇਕ, ਸੁ ਏਕ ਦਿਵੱਯਾ ॥੬॥੨੬॥',
      pronunciation:
        'sāhib srī sabh ko sir nāik; jācak anek, sa ek diwayyā ‖6‖26‖',
      translation:
        'The Lord God is the Cammander of all and is the only Donor, the beggars are many. 6.26.',
    },
    {
      id: 'N5KM',
      src: 'ਦਾਨਵ, ਦੇਵ, ਫਨਿੰਦ, ਨਿਸਾਚਰ; ਭੂਤ, ਭਵਿਖ, ਭਵਾਨ ਜਪੈਂਗੇ ॥',
      pronunciation:
        'dānav, dev, phaniñd, nisācar; bhūt, bhavikh, bhavān japēñge ‖',
      translation:
        'Demons, gods, huge serpents, ghosts, past, present and future would repeat His Name.',
    },
    {
      id: '6K4J',
      src: 'ਜੀਵ ਜਿਤੇ ਜਲ ਮੈ, ਥਲ ਮੈ; ਪਲ ਹੀ ਪਲ ਮੈ, ਸਭ ਥਾਪ ਥਪੈਂਗੇ ॥',
      pronunciation:
        'jīv jite jal mē, thal mē; pal hī pal mē, sabh thāp thapēñge ‖',
      translation:
        'All the creatures in the sea and on land would increase and the heaps of sins would be destroyed.',
    },
    {
      id: '4RJ3',
      src: 'ਪੁੰਨ ਪ੍ਰਤਾਪਨ ਬਾਢ ਜੈਤ ਧੁਨ; ਪਾਪਨ ਕੇ, ਬਹੁ ਪੁੰਜ ਖਪੈਂਗੇ ॥',
      pronunciation:
        'puñn pratāpan bāḍh jēt dhun; pāpan ke, bah puñj khapēñge ‖',
      translation:
        'The praises of the glories of virtues would increase and the heaps of sins would be destroyed',
    },
    {
      id: '2CH6',
      src: 'ਸਾਧ ਸਮੂਹ ਪ੍ਰਸੰਨ ਫਿਰੈਂ ਜਗ; ਸਤ੍ਰ ਸਭੈ ਅਵਲੋਕ ਚਪੈਂਗੇ ॥੭॥੨੭॥',
      pronunciation:
        'sādh samūh prasañn phirēñ jag; satr sabhē awalok capēñge ‖7‖27‖',
      translation:
        'All the saints would wander in the world with bliss and the enemies would be annoyed on seeing them.7.27.',
    },
    {
      id: '8X52',
      src: 'ਮਾਨਵ, ਇੰਦ੍ਰ, ਗਜਿੰਦ੍ਰ, ਨਰਾਧਪ; ਜੌਨ ਤ੍ਰਿਲੋਕ ਕੋ ਰਾਜ ਕਰੈਂਗੇ ॥',
      pronunciation:
        'mānav, iñdr, gajiñdr, narādhap; jōn trilok ko rāj karēñge ‖',
      translation:
        'King of men and elephants, emperors who would rule over the three worlds.',
    },
    {
      id: 'DTH6',
      src: 'ਕੋਟਿ ਇਸਨਾਨ ਗਜਾਦਿਕ ਦਾਨ; ਅਨੇਕ ਸੁਅੰਬਰ ਸਾਜਿ, ਬਰੈਂਗੇ ॥',
      pronunciation: 'koṭ isanān gajādik dān; anek suañbar sāji, barēñge ‖',
      translation:
        'Who would perform millions of ablutions, give elephants and other animals in charity and arrange many svayyamuaras (self-marriage functions) for weddings.',
    },
    {
      id: 'K51Y',
      src: 'ਬ੍ਰਹਮ, ਮਹੇਸਰ, ਬਿਸਨ, ਸਚੀਪਤਿ; ਅੰਤ ਫਸੇ, ਜਮ ਫਾਸ ਪਰੈਂਗੇ ॥',
      pronunciation:
        'braham, mahesar, bisan, sacīpati; añt phase, jam phās parēñge ‖',
      translation:
        'Brahma, Shiva, Vishnu and Consort of Sachi (Indra) would ultimately fall in the noose of death.',
    },
    {
      id: '904M',
      src: 'ਜੇ ਨਰ, ਸ੍ਰੀ ਪਤਿ ਕੇ ਪ੍ਰਸ ਹੈਂ ਪਗ; ਤੇ ਨਰ, ਫੇਰ ਨ ਦੇਹ ਧਰੈਂਗੇ ॥੮॥੨੮॥',
      pronunciation:
        'je nar, srī pat ke pras hēñ pag; te nar, pher na deh dharēñge ‖8‖28‖',
      translation:
        'But those who fall at the feet of Lord-God, they would not appear again in physical form. 8.28.',
    },
    {
      id: '3G1K',
      src: 'ਕਹਾ ਭਯੋ ਜੋ ਦੋਊ ਲੋਚਨ ਮੂੰਦ ਕੈ ਬੈਠਿ ਰਹਿਓ ਬਕ ਧਿਆਨ ਲਗਾਇਓ ॥',
      pronunciation:
        'kahā bhayo jo doū locan mūñd kē bēṭh rahio bak dhiān lagāio ‖',
      translation:
        'Of what use it is if one sits and meditates like a crane with his eyes closed.',
    },
    {
      id: '0Q4J',
      src: 'ਨ੍ਹਾਤ ਫਿਰਿਓ ਲੀਏ ਸਾਤ ਸਮੁਦ੍ਰਨਿ ਲੋਕ ਗਯੋ ਪਰਲੋਕ ਗਵਾਇਓ ॥',
      pronunciation: 'nhāt phirio līe sāt samudran lok gayo paralok gavāio ‖',
      translation:
        'If he takes bath at holy places upto the seventh sea, he loses this world and also the next world.',
    },
    {
      id: '74U2',
      src: 'ਬਾਸ ਕੀਓ ਬਿਖਿਆਨ ਸੋਂ ਬੈਠ ਕੈ; ਐਸੇ ਹੀ ਐਸੇ ਸੁ ਬੈਸ ਬਿਤਾਇਓ ॥',
      pronunciation: 'bās kīo bikhiān soñ bēṭh kē; ēse hī ēse sa bēs bitāio ‖',
      translation:
        'He spends his life in such performing evil actions and wastes his life in such pursuits.',
    },
    {
      id: 'LCQL',
      src: 'ਸਾਚੁ ਕਹੋਂ, ਸੁਨ ਲੇਹੁ ਸਭੈ; ਜਿਨ ਪ੍ਰੇਮ ਕੀਓ, ਤਿਨ ਹੀ ਪ੍ਰਭੁ ਪਾਇਓ ॥੯॥੨੯॥',
      pronunciation:
        'sāc kahoñ, sun leh sabhē; jin prem kīo, tin hī prabh pāio ‖9‖29‖',
      translation:
        'I speak Truth, all should turn their ears towards it: he, who is absorbed in True Love, he would realize the Lord. 9.29.',
    },
    {
      id: 'VJN8',
      src: 'ਕਾਹੂ ਲੈ ਪਾਹਨ ਪੂਜ ਧਰਯੋ ਸਿਰ; ਕਾਹੂ ਲੈ ਲਿੰਗ ਗਰੇ ਲਟਕਾਇਓ ॥',
      pronunciation:
        'kāhū lē pāhan pūj dharayo sir; kāhū lē liñg gare laṭakāio ‖',
      translation:
        'Someone worshipped stone and placed it on his head. Someone hung the phallus (lingam) from his neck.',
    },
    {
      id: 'BUP9',
      src: 'ਕਾਹੂ ਲਖਿਓ ਹਰਿ ਅਵਾਚੀ ਦਿਸਾ ਮਹਿ; ਕਾਹੂ, ਪਛਾਹ ਕੋ ਸੀਸੁ ਨਿਵਾਇਓ ॥',
      pronunciation:
        'kāhū lakhio har avācī disā mahi; kāhū, pachāh ko sīs nivāio ‖',
      translation:
        'Someone visualized God in the South and someone bowed his head towards the West.',
    },
    {
      id: 'ZDA3',
      src: 'ਕੋਊ, ਬੁਤਾਨ ਕੋ ਪੂਜਤ ਹੈ ਪਸੁ; ਕੋਊ, ਮ੍ਰਿਤਾਨ ਕੋ ਪੂਜਨ ਧਾਇਓ ॥',
      pronunciation:
        'koū, butān ko pūjat hē pasu; koū, mritān ko pūjan dhāio ‖',
      translation:
        'Some fool worships the idols and someone goes to worship the dead.',
    },
    {
      id: 'DY6J',
      src: 'ਕੂਰ ਕ੍ਰਿਆ ਉਰਝਿਓ ਸਭ ਹੀ ਜਗ; ਸ੍ਰੀ ਭਗਵਾਨ ਕੋ ਭੇਦੁ ਨ ਪਾਇਓ ॥੧੦॥੩੦॥',
      pronunciation:
        'kūr kriā urajhio sabh hī jag; srī bhagavān ko bhed na pāio ‖10‖30‖',
      translation:
        'The whole world is entangled in false rituals and has not known the secret of Lord-God 10.30.',
    },
  ],
}

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data)
}
