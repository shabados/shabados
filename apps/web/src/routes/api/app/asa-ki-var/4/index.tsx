import type { RequestHandler } from '@builder.io/qwik-city';

const data = {
  title: {
    unicode: 'ਆਸਾ ਕੀ ਵਾਰ (ਛੱਕਾ 4)',
    roman: 'Āsā kī vār (chakkā 4)',
  },
  paging: {
    previous: 'asa-ki-var/3',
    next: 'asa-ki-var/5',
  },
  data: [
    {
      id: 'S2LT',
      src: 'ਦੀਨ ਦਇਆਲ ਸੁਣਿ ਬੇਨਤੀ; ਹਰਿ ਪ੍ਰਭ ਹਰਿ ਰਾਇਆ, ਰਾਮ ਰਾਜੇ ॥',
      pronunciation: 'dīn daiāl suṇ benatī; har prabh har rāiā, rām rāje ‖',
      translation:
        'O Merciful to the meek, hear my prayer, O Lord God; You are my Master, O Lord King.',
    },
    {
      id: 'EKJP',
      src: 'ਹਉ ਮਾਗਉ ਸਰਣਿ ਹਰਿ ਨਾਮ ਕੀ; ਹਰਿ ਹਰਿ ਮੁਖਿ ਪਾਇਆ ॥',
      pronunciation: 'hau māgau saraṇ har nām kī; har har mukh pāiā ‖',
      translation:
        "I beg for the Sanctuary of the Lord's Name, Har, Har; please, place it in my mouth.",
    },
    {
      id: '9FY8',
      src: 'ਭਗਤਿ ਵਛਲੁ. ਹਰਿ ਬਿਰਦੁ ਹੈ; ਹਰਿ ਲਾਜ ਰਖਾਇਆ ॥',
      pronunciation: 'bhagat wachalu. har birad hē; har lāj rakhāiā ‖',
      translation:
        "It is the Lord's natural way to love His devotees; O Lord, please preserve my honor!",
    },
    {
      id: '9607',
      src: 'ਜਨੁ ਨਾਨਕੁ ਸਰਣਾਗਤੀ; ਹਰਿ ਨਾਮਿ ਤਰਾਇਆ ॥੪॥੮॥੧੫॥',
      pronunciation: 'jan nānak saraṇāgatī; har nām tarāiā ‖4‖8‖15‖',
      translation:
        'Servant Nanak has entered His Sanctuary, and has been saved by the Name of the Lord. ||4||8||15||',
    },
    {
      id: '1XXX',
      src: 'ਸਲੋਕ ਮਃ ੧ ॥',
      pronunciation: 'salok mẖ 1 ‖',
      translation: 'Salok, First Mehl:',
    },
    {
      id: 'W3RM',
      src: 'ਭੈ ਵਿਚਿ; ਪਵਣੁ ਵਹੈ ਸਦਵਾਉ ॥',
      pronunciation: 'bhē vici; pawaṇ wahē sadavāu ‖',
      translation: 'In the Fear of God, the wind and breezes ever blow.',
    },
    {
      id: 'D11B',
      src: 'ਭੈ ਵਿਚਿ; ਚਲਹਿ ਲਖ ਦਰੀਆਉ ॥',
      pronunciation: 'bhē vici; calah lakh darīāu ‖',
      translation: 'In the Fear of God, thousands of rivers flow.',
    },
    {
      id: 'LF00',
      src: 'ਭੈ ਵਿਚਿ; ਅਗਨਿ ਕਢੈ ਵੇਗਾਰਿ ॥',
      pronunciation: 'bhē vici; agan kaḍhē vegār ‖',
      translation: 'In the Fear of God, fire is forced to labor.',
    },
    {
      id: 'CW8D',
      src: 'ਭੈ ਵਿਚਿ; ਧਰਤੀ ਦਬੀ ਭਾਰਿ ॥',
      pronunciation: 'bhē vici; dharatī dabī bhār ‖',
      translation: 'In the Fear of God, the earth is crushed under its burden.',
    },
    {
      id: 'QU0B',
      src: 'ਭੈ ਵਿਚਿ; ਇੰਦੁ ਫਿਰੈ ਸਿਰ ਭਾਰਿ ॥',
      pronunciation: 'bhē vici; iñd phirē sir bhār ‖',
      translation: 'In the Fear of God, the clouds move across the sky.',
    },
    {
      id: '3AG6',
      src: 'ਭੈ ਵਿਚਿ; ਰਾਜਾ ਧਰਮ ਦੁਆਰੁ ॥',
      pronunciation: 'bhē vici; rājā dharam duār ‖',
      translation:
        'In the Fear of God, the Righteous Judge of Dharma stands at His Door.',
    },
    {
      id: 'SXZD',
      src: 'ਭੈ ਵਿਚਿ ਸੂਰਜੁ; ਭੈ ਵਿਚਿ ਚੰਦੁ ॥',
      pronunciation: 'bhē vic sūraju; bhē vic cañd ‖',
      translation:
        'In the Fear of God, the sun shines, and in the Fear of God, the moon reflects.',
    },
    {
      id: '7LTR',
      src: 'ਕੋਹ ਕਰੋੜੀ ਚਲਤ; ਨ ਅੰਤੁ ॥',
      pronunciation: 'koh karoṛī calat; na añt ‖',
      translation: 'They travel millions of miles, endlessly.',
    },
    {
      id: 'A7J0',
      src: 'ਭੈ ਵਿਚਿ; ਸਿਧ ਬੁਧ ਸੁਰ ਨਾਥ ॥',
      pronunciation: 'bhē vici; sidh budh sur nāth ‖',
      translation:
        'In the Fear of God, the Siddhas exist, as do the Buddhas, the demi-gods and Yogis.',
    },
    {
      id: '2WFN',
      src: 'ਭੈ ਵਿਚਿ; ਆਡਾਣੇ ਆਕਾਸ ॥',
      pronunciation: 'bhē vici; āḍāṇe ākās ‖',
      translation:
        'In the Fear of God, the Akaashic ethers are stretched across the sky.',
    },
    {
      id: 'QXCX',
      src: 'ਭੈ ਵਿਚਿ; ਜੋਧ ਮਹਾਬਲ ਸੂਰ ॥',
      pronunciation: 'bhē vici; jodh mahābal sūr ‖',
      translation:
        'In the Fear of God, the warriors and the most powerful heroes exist.',
    },
    {
      id: 'KUE7',
      src: 'ਭੈ ਵਿਚਿ; ਆਵਹਿ ਜਾਵਹਿ ਪੂਰ ॥',
      pronunciation: 'bhē vici; āwah jāwah pūr ‖',
      translation: 'In the Fear of God, multitudes come and go.',
    },
    {
      id: 'ARLE',
      src: 'ਸਗਲਿਆ; ਭਉ ਲਿਖਿਆ ਸਿਰਿ ਲੇਖੁ ॥',
      pronunciation: 'sagaliā; bhau likhiā sir lekh ‖',
      translation:
        'God has inscribed the Inscription of His Fear upon the heads of all.',
    },
    {
      id: 'QHW8',
      src: 'ਨਾਨਕ. ਨਿਰਭਉ ਨਿਰੰਕਾਰੁ; ਸਚੁ ਏਕੁ ॥੧॥',
      pronunciation: 'nānak. nirabhau nirañkāru; sac ek ‖1‖',
      translation:
        'O Nanak, the Fearless Lord, the Formless Lord, the True Lord, is One. ||1||',
    },
    {
      id: '6YYP',
      src: 'ਮਃ ੧ ॥',
      pronunciation: 'mẖ 1 ‖',
      translation: 'First Mehl:',
    },
    {
      id: 'ECUL',
      src: 'ਨਾਨਕ. ਨਿਰਭਉ ਨਿਰੰਕਾਰੁ; ਹੋਰਿ ਕੇਤੇ ਰਾਮ ਰਵਾਲ ॥',
      pronunciation: 'nānak. nirabhau nirañkāru; hor kete rām ravāl ‖',
      translation:
        'O Nanak, the Lord is fearless and formless; myriads of others, like Rama, are mere dust before Him.',
    },
    {
      id: '33GA',
      src: 'ਕੇਤੀਆ ਕੰਨੑ ਕਹਾਣੀਆ; ਕੇਤੇ ਬੇਦ ਬੀਚਾਰ ॥',
      pronunciation: 'ketīā kañn kahāṇīā; kete bed bīcār ‖',
      translation:
        'There are so many stories of Krishna, so many who reflect over the Vedas.',
    },
    {
      id: 'B11F',
      src: 'ਕੇਤੇ ਨਚਹਿ ਮੰਗਤੇ; ਗਿੜਿ ਮੁੜਿ ਪੂਰਹਿ ਤਾਲ ॥',
      pronunciation: 'kete nacah mañgate; giṛ muṛ pūrah tāl ‖',
      translation: 'So many beggars dance, spinning around to the beat.',
    },
    {
      id: '7NHM',
      src: 'ਬਾਜਾਰੀ ਬਾਜਾਰ ਮਹਿ; ਆਇ ਕਢਹਿ ਬਾਜਾਰ ॥',
      pronunciation: 'bājārī bājār mahi; āi kaḍhah bājār ‖',
      translation:
        'The magicians perform their magic in the market place, creating a false illusion.',
    },
    {
      id: '7WZH',
      src: 'ਗਾਵਹਿ ਰਾਜੇ ਰਾਣੀਆ; ਬੋਲਹਿ ਆਲ ਪਤਾਲ ॥',
      pronunciation: 'gāwah rāje rāṇīā; bolah āl patāl ‖',
      translation: 'They sing as kings and queens, and speak of this and that.',
    },
    {
      id: 'DUH0',
      src: 'ਲਖ ਟਕਿਆ ਕੇ ਮੁੰਦੜੇ; ਲਖ ਟਕਿਆ ਕੇ ਹਾਰ ॥',
      pronunciation: 'lakh ṭakiā ke muñdaṛe; lakh ṭakiā ke hār ‖',
      translation:
        'They wear earrings, and necklaces worth thousands of dollars.',
    },
    {
      id: 'LHBA',
      src: 'ਜਿਤੁ ਤਨਿ ਪਾਈਅਹਿ ਨਾਨਕਾ; ਸੇ ਤਨ ਹੋਵਹਿ ਛਾਰ ॥',
      pronunciation: 'jit tan pāīah nānakā; se tan howah chār ‖',
      translation:
        'Those bodies on which they are worn, O Nanak, those bodies turn to ashes.',
    },
    {
      id: 'H9ZU',
      src: 'ਗਿਆਨੁ. ਨ ਗਲੀਈ ਢੂਢੀਐ; ਕਥਨਾ ਕਰੜਾ ਸਾਰੁ ॥',
      pronunciation: 'giānu. na galīī ḍhūḍhīē; kathanā karaṛā sār ‖',
      translation:
        'Wisdom cannot be found through mere words. To explain it is as hard as iron.',
    },
    {
      id: 'J35Q',
      src: 'ਕਰਮਿ ਮਿਲੈ. ਤਾ ਪਾਈਐ; ਹੋਰ ਹਿਕਮਤਿ ਹੁਕਮੁ. ਖੁਆਰੁ ॥੨॥',
      pronunciation: 'karam milē. tā pāīē; hor hikamat hukamu. khuār ‖2‖',
      translation:
        'When the Lord bestows His Grace, then alone it is received; other tricks and orders are useless. ||2||',
    },
    {
      id: 'UUTZ',
      src: 'ਪਉੜੀ ॥',
      pronunciation: 'pauṛī ‖',
      translation: 'Pauree:',
    },
    {
      id: 'ZZTA',
      src: 'ਨਦਰਿ ਕਰਹਿ. ਜੇ ਆਪਣੀ; ਤਾ ਨਦਰੀ ਸਤਿਗੁਰੁ ਪਾਇਆ ॥',
      pronunciation: 'nadar karahi. je āpaṇī; tā nadarī satigur pāiā ‖',
      translation:
        'If the Merciful Lord shows His Mercy, then the True Guru is found.',
    },
    {
      id: 'LESG',
      src: 'ਏਹੁ ਜੀਉ ਬਹੁਤੇ ਜਨਮ ਭਰੰਮਿਆ; ਤਾ ਸਤਿਗੁਰਿ ਸਬਦੁ ਸੁਣਾਇਆ ॥',
      pronunciation: 'eh jīu bahute janam bharañmiā; tā satigur sabad suṇāiā ‖',
      translation:
        'This soul wandered through countless incarnations, until the True Guru instructed it in the Word of the Shabad.',
    },
    {
      id: 'DBKA',
      src: 'ਸਤਿਗੁਰ ਜੇਵਡੁ. ਦਾਤਾ ਕੋ ਨਹੀ; ਸਭਿ ਸੁਣਿਅਹੁ ਲੋਕ ਸਬਾਇਆ ॥',
      pronunciation: 'satigur jewaḍu. dātā ko nahī; sabh suṇiah lok sabāiā ‖',
      translation:
        'There is no giver as great as the True Guru; hear this, all you people.',
    },
    {
      id: 'T8FJ',
      src: 'ਸਤਿਗੁਰਿ ਮਿਲਿਐ. ਸਚੁ ਪਾਇਆ; ਜਿਨੑੀ ਵਿਚਹੁ ਆਪੁ ਗਵਾਇਆ ॥',
      pronunciation: 'satigur miliē. sac pāiā; jinī vicah āp gavāiā ‖',
      translation:
        'Meeting the True Guru, the True Lord is found; He removes self-conceit from within,',
    },
    {
      id: '765B',
      src: 'ਜਿਨਿ; ਸਚੋ ਸਚੁ ਬੁਝਾਇਆ ॥੪॥',
      pronunciation: 'jini; saco sac bujhāiā ‖4‖',
      translation: 'and instructs us in the Truth of Truths. ||4||',
    },
  ],
};

export const onGet: RequestHandler = async ({ json }) => {
  json(200, data);
};
