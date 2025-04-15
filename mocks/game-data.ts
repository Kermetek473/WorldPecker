import { GameCharacter, GameLevel, Conversation, Quiz } from '@/types/game';

// Language-specific character data
const charactersByLanguage: Record<string, GameCharacter[]> = {
  de: [
    {
      id: 'luca',
      name: 'Luca',
      description: 'Berlin\'de yaşayan İtalyan bir öğrenci',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'de',
      backstory: 'Luca, yurtdışı dönemini geçirmek için Berlin\'e taşınan 22 yaşında İtalyan bir öğrencidir. Bilgisayar bilimleri okuyor ve Alman kültürünü keşfederken Almancasını geliştirmek istiyor.'
    },
    {
      id: 'emma',
      name: 'Emma',
      description: 'Münih\'te yaşayan Alman bir sanatçı',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'de',
      backstory: 'Emma, Münih\'ten 25 yaşında bir sanatçıdır. Yeni insanlarla tanışmayı ve onlara Alman kültürünü ve dilini öğretmeyi seviyor. Boş zamanlarında resim yapıyor ve sanat galerilerini ziyaret ediyor.'
    },
    {
      id: 'max',
      name: 'Max',
      description: 'Berlin\'den bir Alman tur rehberi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'de',
      backstory: 'Max, Berlin\'den 30 yaşında bir tur rehberidir. Şehri avucunun içi gibi biliyor ve turistlere Berlin\'in gizli hazinelerini göstermeyi seviyor. Almanca, İngilizce ve İspanyolca akıcı konuşuyor.'
    }
  ],
  fr: [
    {
      id: 'sophie',
      name: 'Sophie',
      description: 'Paris\'te yaşayan Fransız bir öğrenci',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'fr',
      backstory: 'Sophie, Sorbonne\'da edebiyat okuyan 23 yaşında bir öğrencidir. Fransız kültürüne olan tutkusunu paylaşmayı ve yabancıların Paris\'i keşfetmelerine yardımcı olmayı seviyor.'
    },
    {
      id: 'pierre',
      name: 'Pierre',
      description: 'Paris\'teki bir bistro\'da çalışan Fransız bir şef',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'fr',
      backstory: 'Pierre, büyükannesiyle yemek yapmayı öğrenen 35 yaşında bir şeftir. Tariflerini paylaşmayı ve müşterileriyle Fransız gastronomisi hakkında konuşmayı seviyor.'
    },
    {
      id: 'claire',
      name: 'Claire',
      description: 'Lyon\'da bir tur rehberi',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'fr',
      backstory: 'Claire, Lyon\'un tüm sırlarını bilen 28 yaşında bir tur rehberidir. Şehrinin tarihine tutkuyla bağlı ve ziyaretçilere Fransız kültürünü tanıtmayı seviyor.'
    }
  ],
  es: [
    {
      id: 'carlos',
      name: 'Carlos',
      description: 'Madrid\'den bir İspanyolca öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'es',
      backstory: 'Carlos, yabancılara İspanyolca öğreten 32 yaşında bir öğretmendir. Kültürünü paylaşmayı ve öğrencilerinin günlük konuşmalar yoluyla İspanyolcalarını geliştirmelerine yardımcı olmayı seviyor.'
    },
    {
      id: 'elena',
      name: 'Elena',
      description: 'Barselona\'dan bir İspanyol sanatçı',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'es',
      backstory: 'Elena, Barselona\'nın Gotik Mahallesi\'nde yaşayan 27 yaşında bir sanatçıdır. Günlerini resim yaparak ve şehrin canlı sanat sahnesini keşfederek geçiriyor.'
    },
    {
      id: 'miguel',
      name: 'Miguel',
      description: 'Sevilla\'dan bir tur rehberi',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'es',
      backstory: 'Miguel, Sevilla\'nın her köşesini bilen 30 yaşında bir tur rehberidir. Flamenko ve Endülüs tarihine tutkuyla bağlı ve bilgisini ziyaretçilerle paylaşmaktan keyif alıyor.'
    }
  ],
  it: [
    {
      id: 'giulia',
      name: 'Giulia',
      description: 'Roma\'dan bir İtalyan öğrenci',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'it',
      backstory: 'Giulia, Roma\'da sanat tarihi okuyan 24 yaşında bir öğrencidir. İtalyan sanatına olan tutkusunu paylaşmayı ve turistlerin Ebedi Şehir\'in gizli hazinelerini keşfetmelerine yardımcı olmayı seviyor.'
    },
    {
      id: 'marco',
      name: 'Marco',
      description: 'Floransa\'dan bir İtalyan şef',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'it',
      backstory: 'Marco, Floransa\'nın merkezinde bir restoran işleten 40 yaşında bir şeftir. Tutkusu geleneksel Toskana mutfağı ve misafirlerine İtalyan gastronomisinin sırlarını öğretmeyi seviyor.'
    },
    {
      id: 'sofia',
      name: 'Sofia',
      description: 'Venedik\'ten bir tur rehberi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'it',
      backstory: 'Sofia, Venedik\'in her kanalını ve köprüsünü bilen 29 yaşında bir tur rehberidir. Serenissima\'nın tarihine tutkuyla bağlı ve ziyaretçilerle anekdotlar ve efsaneler paylaşmayı seviyor.'
    }
  ],
  ja: [
    {
      id: 'hiroshi',
      name: '浩',
      description: 'Tokyo\'da yaşayan bir Japonca öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'ja',
      backstory: '浩は34歳の日本語教師で、外国人に日本語と日本文化を教えることに情熱を持っています。彼は東京で生まれ育ち、街の隅々まで知り尽くしています。'
    },
    {
      id: 'yuki',
      name: '雪',
      description: 'Kyoto\'dan geleneksel bir zanaatkar',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'ja',
      backstory: '雪は27歳の伝統工芸家で、京都で和紙アートを制作しています。彼女は日本の伝統文化に深い知識を持ち、訪問者に日本の美学を紹介するのが好きです。'
    },
    {
      id: 'takeshi',
      name: '武',
      description: 'Osaka\'dan bir şef',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'ja',
      backstory: '武は38歳のシェフで、大阪で小さな居酒屋を経営しています。彼は関西の食文化に詳しく、お客さんと会話しながら料理を提供するのが大好きです。'
    }
  ],
  // Default fallback for any unsupported language
  en: [
    {
      id: 'default',
      name: 'Default',
      description: 'Varsayılan karakter',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      language: 'en',
      backstory: 'Varsayılan karakter hikayesi'
    }
  ]
};

// Language-specific level data
const levelsByLanguage: Record<string, GameLevel[]> = {
  de: [
    {
      id: 'level1',
      number: 1,
      title: 'Berlin\'e Hoş Geldiniz',
      description: 'Yolculuğunuz Almanya\'nın başkentinde başlıyor. Temel selamlaşmaları öğrenin ve kendinizi tanıtın.',
      location: 'Berlin Hauptbahnhof',
      missions: [
        {
          id: 'mission1_1',
          title: 'Temel Selamlaşmalar',
          description: 'Temel Almanca selamlaşmalar hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_1',
          completed: false,
          locked: false
        },
        {
          id: 'mission1_2',
          title: 'Kendini Tanıtma',
          description: 'Almanca\'da kendinizi nasıl tanıtacağınızı ve kişisel bilgileri nasıl paylaşacağınızı öğrenin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission1_3',
          title: 'Kafede',
          description: 'Bir Alman kafesinde sipariş verme hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 0,
      completed: false,
      locked: false
    },
    {
      id: 'level2',
      number: 2,
      title: 'Şehirde Günlük Yaşam',
      description: 'Berlin\'deki günlük yaşamı keşfedin ve günlük durumlarla nasıl başa çıkacağınızı öğrenin.',
      location: 'Alexanderplatz',
      missions: [
        {
          id: 'mission2_1',
          title: 'Alışverişe Çıkmak',
          description: 'Alışveriş kelimeleri ve ifadeleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 60,
          quizId: 'quiz2_1',
          completed: false,
          locked: true
        },
        {
          id: 'mission2_2',
          title: 'Toplu Taşıma',
          description: 'Bilet nasıl alınır ve tarifeler nasıl sorulur öğrenin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 70,
          quizId: 'quiz2_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission2_3',
          title: 'Restoranda',
          description: 'Almanya\'da restoran ziyaretleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 70,
          quizId: 'quiz2_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 100, // Reduced from 150 to make it easier to unlock through XP as well
      completed: false,
      locked: true
    },
    // More German levels...
    {
      id: 'level3',
      number: 3,
      title: 'Kültür ve Boş Zaman',
      description: 'Alman kültürünü ve boş zaman aktivitelerini keşfedin.',
      location: 'Museumsinsel',
      missions: [
        {
          id: 'mission3_1',
          title: 'Müze Ziyareti',
          description: 'Müzeler ve sanat terimleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 80,
          quizId: 'quiz3_1',
          completed: false,
          locked: true
        },
        {
          id: 'mission3_2',
          title: 'Kültürel Kelimeler',
          description: 'Kültürel terimlerle kelime dağarcığınızı genişletin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 80,
          quizId: 'quiz3_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission3_3',
          title: 'Etkinlikler',
          description: 'Etkinlikler ve bilet satın alma hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 80,
          quizId: 'quiz3_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 350,
      completed: false,
      locked: true
    },
    // More German levels...
  ],
  fr: [
    {
      id: 'level1',
      number: 1,
      title: 'Paris\'e Hoş Geldiniz',
      description: 'Yolculuğunuz Fransa\'nın başkentinde başlıyor. Temel selamlaşmaları öğrenin ve kendinizi tanıtın.',
      location: 'Gare du Nord',
      missions: [
        {
          id: 'mission1_1',
          title: 'Temel Selamlaşmalar',
          description: 'Temel Fransızca selamlaşmalar hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_1',
          completed: false,
          locked: false
        },
        {
          id: 'mission1_2',
          title: 'Kendini Tanıtma',
          description: 'Fransızca\'da kendinizi nasıl tanıtacağınızı ve kişisel bilgileri nasıl paylaşacağınızı öğrenin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission1_3',
          title: 'Kafede',
          description: 'Bir Fransız kafesinde sipariş verme hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 0,
      completed: false,
      locked: false
    },
    {
      id: 'level2',
      number: 2,
      title: 'Günlük Yaşam',
      description: 'Paris\'teki günlük yaşamı keşfedin ve günlük durumlarla nasıl başa çıkacağınızı öğrenin.',
      location: 'Montmartre',
      missions: [
        {
          id: 'mission2_1',
          title: 'Alışverişe Çıkmak',
          description: 'Alışveriş kelimeleri ve ifadeleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 60,
          quizId: 'quiz2_1',
          completed: false,
          locked: true
        },
        {
          id: 'mission2_2',
          title: 'Toplu Taşıma',
          description: 'Bilet nasıl alınır ve tarifeler nasıl sorulur öğrenin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 70,
          quizId: 'quiz2_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission2_3',
          title: 'Restoranda',
          description: 'Fransa\'da restoran ziyaretleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 70,
          quizId: 'quiz2_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 100, // Reduced from 150 to make it easier to unlock
      completed: false,
      locked: true
    },
    // More French levels...
  ],
  es: [
    {
      id: 'level1',
      number: 1,
      title: 'Madrid\'e Hoş Geldiniz',
      description: 'Yolculuğunuz İspanya\'nın başkentinde başlıyor. Temel selamlaşmaları öğrenin ve kendinizi tanıtın.',
      location: 'Estación de Atocha',
      missions: [
        {
          id: 'mission1_1',
          title: 'Temel Selamlaşmalar',
          description: 'Temel İspanyolca selamlaşmalar hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_1',
          completed: false,
          locked: false
        },
        {
          id: 'mission1_2',
          title: 'Kendini Tanıtma',
          description: 'İspanyolca\'da kendinizi nasıl tanıtacağınızı ve kişisel bilgileri nasıl paylaşacağınızı öğrenin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission1_3',
          title: 'Kafede',
          description: 'Bir İspanyol kafesinde sipariş verme hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 0,
      completed: false,
      locked: false
    },
    {
      id: 'level2',
      number: 2,
      title: 'Şehirde Günlük Yaşam',
      description: 'Madrid\'deki günlük yaşamı keşfedin ve günlük durumlarla nasıl başa çıkacağınızı öğrenin.',
      location: 'Plaza Mayor',
      missions: [
        {
          id: 'mission2_1',
          title: 'Alışverişe Çıkmak',
          description: 'Alışveriş kelimeleri ve ifadeleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 60,
          quizId: 'quiz2_1',
          completed: false,
          locked: true
        },
        {
          id: 'mission2_2',
          title: 'Toplu Taşıma',
          description: 'Bilet nasıl alınır ve tarifeler nasıl sorulur öğrenin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 70,
          quizId: 'quiz2_2',
          completed: false,
          locked: true
        },
        {
          id: 'mission2_3',
          title: 'Restoranda',
          description: 'İspanya\'da restoran ziyaretleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 2,
          xpReward: 70,
          quizId: 'quiz2_3',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 100, // Reduced from 150 to make it easier to unlock
      completed: false,
      locked: true
    },
    // More Spanish levels...
  ],
  // Default fallback for any unsupported language
  en: [
    {
      id: 'level1',
      number: 1,
      title: 'Londra\'ya Hoş Geldiniz',
      description: 'Yolculuğunuz İngiltere\'nin başkentinde başlıyor. Temel selamlaşmaları öğrenin ve kendinizi tanıtın.',
      location: 'King\'s Cross Station',
      missions: [
        {
          id: 'mission1_1',
          title: 'Temel Selamlaşmalar',
          description: 'Temel İngilizce selamlaşmalar hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 50,
          quizId: 'quiz1_1',
          completed: false,
          locked: false
        }
      ],
      requiredXP: 0,
      completed: false,
      locked: false
    },
    {
      id: 'level2',
      number: 2,
      title: 'Şehirde Günlük Yaşam',
      description: 'Londra\'daki günlük yaşamı keşfedin ve günlük durumlarla nasıl başa çıkacağınızı öğrenin.',
      location: 'Piccadilly Circus',
      missions: [
        {
          id: 'mission2_1',
          title: 'Alışverişe Çıkmak',
          description: 'Alışveriş kelimeleri ve ifadeleri hakkındaki bilginizi test edin.',
          type: 'quiz',
          difficulty: 1,
          xpReward: 60,
          quizId: 'quiz2_1',
          completed: false,
          locked: true
        }
      ],
      requiredXP: 100,
      completed: false,
      locked: true
    }
  ]
};

// Language-specific conversation data
const conversationsByLanguage: Record<string, Conversation[]> = {
  de: [
    {
      id: 'conv1_1',
      title: 'İlk Karşılaşmalar',
      description: 'Almanca\'da kendinizi nasıl tanıtacağınızı ve temel selamlaşmaları öğrenin.',
      characterId: 'emma',
      startDialogueId: 'dialog1_1_1',
      dialogues: {
        'dialog1_1_1': {
          id: 'dialog1_1_1',
          characterId: 'emma',
          text: 'Hallo! Ich bin Emma. Wie heißt du?',
          options: [
            {
              id: 'option1_1_1_1',
              text: 'Hallo! Ich heiße [Name].',
              response: 'Schön, dich kennenzulernen, [Name]! Woher kommst du?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            },
            {
              id: 'option1_1_1_2',
              text: 'Ich bin [Name].',
              response: 'Hallo [Name]! Schön, dich kennenzulernen. Woher kommst du?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            },
            {
              id: 'option1_1_1_3',
              text: 'Mein Name ist [Name].',
              response: 'Hallo [Name]! Freut mich, dich kennenzulernen. Woher kommst du?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            }
          ]
        },
        'dialog1_1_2': {
          id: 'dialog1_1_2',
          characterId: 'emma',
          text: 'Woher kommst du?',
          options: [
            {
              id: 'option1_1_2_1',
              text: 'Ich komme aus [Land].',
              response: 'Oh, [Land] ist sehr schön! Wie lange lernst du schon Deutsch?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_3'
            },
            {
              id: 'option1_1_2_2',
              text: 'Ich bin aus [Land].',
              response: '[Land] ist ein interessantes Land! Wie lange lernst du schon Deutsch?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_3'
            },
            {
              id: 'option1_1_2_3',
              text: 'Meine Heimat ist [Land].',
              response: 'Ah, [Land]! Ich war noch nie dort. Wie lange lernst du schon Deutsch?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_3'
            }
          ]
        },
        // More German dialogues...
        'dialog1_1_3': {
          id: 'dialog1_1_3',
          characterId: 'emma',
          text: 'Wie lange lernst du schon Deutsch?',
          options: [
            {
              id: 'option1_1_3_1',
              text: 'Ich lerne seit [Zeit] Deutsch.',
              response: 'Das ist toll! Deutsch ist nicht einfach, aber du machst das sehr gut.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_4'
            },
            {
              id: 'option1_1_3_2',
              text: 'Ich habe vor [Zeit] angefangen, Deutsch zu lernen.',
              response: 'Sehr gut! Du sprichst schon recht gut für diese Zeit.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_4'
            },
            {
              id: 'option1_1_3_3',
              text: 'Ich bin Anfänger/in.',
              response: 'Kein Problem! Jeder fängt mal an. Du machst das schon sehr gut.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_4'
            }
          ]
        },
        'dialog1_1_4': {
          id: 'dialog1_1_4',
          characterId: 'emma',
          text: 'Was machst du in Berlin?',
          options: [
            {
              id: 'option1_1_4_1',
              text: 'Ich bin Tourist/in und möchte Berlin kennenlernen.',
              response: 'Berlin ist eine tolle Stadt mit vielen Sehenswürdigkeiten. Ich kann dir gerne ein paar Tipps geben.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_5'
            },
            {
              id: 'option1_1_4_2',
              text: 'Ich studiere hier für ein Semester.',
              response: 'Das ist super! An welcher Universität studierst du?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_5'
            },
            {
              id: 'option1_1_4_3',
              text: 'Ich arbeite hier für einige Zeit.',
              response: 'Interessant! In welchem Bereich arbeitest du?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_5'
            }
          ]
        },
        'dialog1_1_5': {
          id: 'dialog1_1_5',
          characterId: 'emma',
          text: 'Es war sehr nett, dich kennenzulernen! Ich hoffe, wir sehen uns bald wieder.',
          options: [
            {
              id: 'option1_1_5_1',
              text: 'Es hat mich auch gefreut! Bis bald!',
              response: 'Bis bald! Viel Spaß in Berlin!',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            },
            {
              id: 'option1_1_5_2',
              text: 'Danke für das Gespräch! Auf Wiedersehen!',
              response: 'Gerne! Auf Wiedersehen und einen schönen Tag noch!',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            },
            {
              id: 'option1_1_5_3',
              text: 'Tschüss! Bis zum nächsten Mal!',
              response: 'Tschüss! Ich freue mich auf unser nächstes Treffen!',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            }
          ]
        },
        'dialog1_1_end': {
          id: 'dialog1_1_end',
          characterId: 'emma',
          text: 'Tebrikler! İlk Almanca konuşmanızı başarıyla tamamladınız!',
          options: [],
          isEnd: true
        }
      },
      completed: false
    },
    // More German conversations...
  ],
  fr: [
    {
      id: 'conv1_1',
      title: 'İlk Karşılaşmalar',
      description: 'Fransızca\'da kendinizi nasıl tanıtacağınızı ve temel selamlaşmaları öğrenin.',
      characterId: 'sophie',
      startDialogueId: 'dialog1_1_1',
      dialogues: {
        'dialog1_1_1': {
          id: 'dialog1_1_1',
          characterId: 'sophie',
          text: 'Bonjour ! Je m\'appelle Sophie. Comment vous appelez-vous ?',
          options: [
            {
              id: 'option1_1_1_1',
              text: 'Bonjour ! Je m\'appelle [Nom].',
              response: 'Enchantée de faire votre connaissance, [Nom] ! D\'où venez-vous ?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            },
            {
              id: 'option1_1_1_2',
              text: 'Je suis [Nom].',
              response: 'Bonjour [Nom] ! Ravie de vous rencontrer. D\'où venez-vous ?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            },
            {
              id: 'option1_1_1_3',
              text: 'Mon nom est [Nom].',
              response: 'Bonjour [Nom] ! Enchantée de faire votre connaissance. D\'où venez-vous ?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            }
          ]
        },
        'dialog1_1_2': {
          id: 'dialog1_1_2',
          characterId: 'sophie',
          text: 'D\'où venez-vous ?',
          options: [
            {
              id: 'option1_1_2_1',
              text: 'Je viens de [Pays].',
              response: 'Oh, [Pays] est très beau ! Depuis combien de temps apprenez-vous le français ?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_3'
            },
            {
              id: 'option1_1_2_2',
              text: 'Je suis de [Pays].',
              response: '[Pays] est un pays intéressant ! Depuis combien de temps apprenez-vous le français ?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_3'
            },
            {
              id: 'option1_1_2_3',
              text: 'Mon pays d\'origine est [Pays].',
              response: 'Ah, [Pays] ! Je n\'y suis jamais allée. Depuis combien de temps apprenez-vous le français ?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_3'
            }
          ]
        },
        // More French dialogues...
        'dialog1_1_3': {
          id: 'dialog1_1_3',
          characterId: 'sophie',
          text: 'Depuis combien de temps apprenez-vous le français ?',
          options: [
            {
              id: 'option1_1_3_1',
              text: 'J\'apprends le français depuis [Temps].',
              response: 'C\'est formidable ! Le français n\'est pas facile, mais vous vous débrouillez très bien.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            },
            {
              id: 'option1_1_3_2',
              text: 'J\'ai commencé à apprendre le français il y a [Temps].',
              response: 'Très bien ! Vous parlez déjà assez bien pour cette période.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            },
            {
              id: 'option1_1_3_3',
              text: 'Je suis débutant(e).',
              response: 'Pas de problème ! Tout le monde commence quelque part. Vous vous débrouillez déjà très bien.',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            }
          ]
        },
        'dialog1_1_end': {
          id: 'dialog1_1_end',
          characterId: 'sophie',
          text: 'Tebrikler! İlk Fransızca konuşmanızı başarıyla tamamladınız!',
          options: [],
          isEnd: true
        }
      },
      completed: false
    },
    // More French conversations...
  ],
  es: [
    {
      id: 'conv1_1',
      title: 'İlk Karşılaşmalar',
      description: 'İspanyolca\'da kendinizi nasıl tanıtacağınızı ve temel selamlaşmaları öğrenin.',
      characterId: 'carlos',
      startDialogueId: 'dialog1_1_1',
      dialogues: {
        'dialog1_1_1': {
          id: 'dialog1_1_1',
          characterId: 'carlos',
          text: '¡Hola! Me llamo Carlos. ¿Cómo te llamas?',
          options: [
            {
              id: 'option1_1_1_1',
              text: '¡Hola! Me llamo [Nombre].',
              response: '¡Encantado de conocerte, [Nombre]! ¿De dónde eres?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_2'
            }
          ]
        },
        'dialog1_1_2': {
          id: 'dialog1_1_2',
          characterId: 'carlos',
          text: '¿De dónde eres?',
          options: [
            {
              id: 'option1_1_2_1',
              text: 'Soy de [País].',
              response: '¡Qué interesante! ¿Cuánto tiempo llevas estudiando español?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            }
          ]
        },
        'dialog1_1_end': {
          id: 'dialog1_1_end',
          characterId: 'carlos',
          text: 'Tebrikler! İlk İspanyolca konuşmanızı başarıyla tamamladınız.',
          options: [],
          isEnd: true
        }
      },
      completed: false
    }
  ],
  // Default fallback for any unsupported language
  en: [
    {
      id: 'conv1_1',
      title: 'İlk Karşılaşmalar',
      description: 'İngilizce\'de kendinizi nasıl tanıtacağınızı ve temel selamlaşmaları öğrenin.',
      characterId: 'default',
      startDialogueId: 'dialog1_1_1',
      dialogues: {
        'dialog1_1_1': {
          id: 'dialog1_1_1',
          characterId: 'default',
          text: 'Hello! I am Default. What is your name?',
          options: [
            {
              id: 'option1_1_1_1',
              text: 'Hello! My name is [Name].',
              response: 'Nice to meet you, [Name]! Where are you from?',
              isCorrect: true,
              nextDialogueId: 'dialog1_1_end'
            }
          ]
        },
        'dialog1_1_end': {
          id: 'dialog1_1_end',
          characterId: 'default',
          text: 'Tebrikler! İlk İngilizce konuşmanızı başarıyla tamamladınız!',
          options: [],
          isEnd: true
        }
      },
      completed: false
    }
  ]
};

// Language-specific quiz data
const quizzesByLanguage: Record<string, Quiz[]> = {
  de: [
    {
      id: 'quiz1_1',
      title: 'Temel Selamlaşmalar',
      description: 'Temel Almanca selamlaşmalar hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q1_1_1',
          text: 'Almanca\'da "Günaydın" nasıl denir?',
          options: [
            {
              id: 'q1_1_1_a',
              text: 'Guten Morgen',
              isCorrect: true
            },
            {
              id: 'q1_1_1_b',
              text: 'Guten Abend',
              isCorrect: false
            },
            {
              id: 'q1_1_1_c',
              text: 'Gute Nacht',
              isCorrect: false
            },
            {
              id: 'q1_1_1_d',
              text: 'Guten Tag',
              isCorrect: false
            }
          ],
          correctAnswer: 'Guten Morgen'
        },
        {
          id: 'q1_1_2',
          text: 'Almanca\'da nasıl vedalaşılır?',
          options: [
            {
              id: 'q1_1_2_a',
              text: 'Hallo',
              isCorrect: false
            },
            {
              id: 'q1_1_2_b',
              text: 'Auf Wiedersehen',
              isCorrect: true
            },
            {
              id: 'q1_1_2_c',
              text: 'Guten Tag',
              isCorrect: false
            },
            {
              id: 'q1_1_2_d',
              text: 'Wie geht\'s?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Auf Wiedersehen'
        },
        {
          id: 'q1_1_3',
          text: 'Almanca\'da "Nasılsın?" nasıl sorulur?',
          options: [
            {
              id: 'q1_1_3_a',
              text: 'Wie heißt du?',
              isCorrect: false
            },
            {
              id: 'q1_1_3_b',
              text: 'Woher kommst du?',
              isCorrect: false
            },
            {
              id: 'q1_1_3_c',
              text: 'Wie geht es dir?',
              isCorrect: true
            },
            {
              id: 'q1_1_3_d',
              text: 'Was machst du?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wie geht es dir?'
        },
        {
          id: 'q1_1_4',
          text: '"Tschüss" ne anlama gelir?',
          options: [
            {
              id: 'q1_1_4_a',
              text: 'Merhaba',
              isCorrect: false
            },
            {
              id: 'q1_1_4_b',
              text: 'Teşekkürler',
              isCorrect: false
            },
            {
              id: 'q1_1_4_c',
              text: 'Rica ederim',
              isCorrect: false
            },
            {
              id: 'q1_1_4_d',
              text: 'Hoşça kal',
              isCorrect: true
            }
          ],
          correctAnswer: 'Hoşça kal'
        },
        {
          id: 'q1_1_5',
          text: 'Almanca\'da "İyi geceler" nasıl denir?',
          options: [
            {
              id: 'q1_1_5_a',
              text: 'Guten Morgen',
              isCorrect: false
            },
            {
              id: 'q1_1_5_b',
              text: 'Guten Abend',
              isCorrect: false
            },
            {
              id: 'q1_1_5_c',
              text: 'Gute Nacht',
              isCorrect: true
            },
            {
              id: 'q1_1_5_d',
              text: 'Guten Tag',
              isCorrect: false
            }
          ],
          correctAnswer: 'Gute Nacht'
        }
      ]
    },
    {
      id: 'quiz1_2',
      title: 'Kendini Tanıtma',
      description: 'Almanca\'da kendinizi nasıl tanıtacağınız hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q1_2_1',
          text: 'Almanca\'da isim nasıl sorulur?',
          options: [
            {
              id: 'q1_2_1_a',
              text: 'Wie alt bist du?',
              isCorrect: false
            },
            {
              id: 'q1_2_1_b',
              text: 'Wie heißt du?',
              isCorrect: true
            },
            {
              id: 'q1_2_1_c',
              text: 'Woher kommst du?',
              isCorrect: false
            },
            {
              id: 'q1_2_1_d',
              text: 'Was machst du?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wie heißt du?'
        },
        {
          id: 'q1_2_2',
          text: 'Almanca\'da nereli olduğunuz nasıl sorulur?',
          options: [
            {
              id: 'q1_2_2_a',
              text: 'Wie alt bist du?',
              isCorrect: false
            },
            {
              id: 'q1_2_2_b',
              text: 'Wie heißt du?',
              isCorrect: false
            },
            {
              id: 'q1_2_2_c',
              text: 'Woher kommst du?',
              isCorrect: true
            },
            {
              id: 'q1_2_2_d',
              text: 'Was machst du?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Woher kommst du?'
        },
        {
          id: 'q1_2_3',
          text: 'Almanca\'da "Ben 25 yaşındayım" nasıl denir?',
          options: [
            {
              id: 'q1_2_3_a',
              text: 'Ich heiße 25 Jahre.',
              isCorrect: false
            },
            {
              id: 'q1_2_3_b',
              text: 'Ich bin 25 Jahre alt.',
              isCorrect: true
            },
            {
              id: 'q1_2_3_c',
              text: 'Ich komme 25 Jahre.',
              isCorrect: false
            },
            {
              id: 'q1_2_3_d',
              text: 'Ich mache 25 Jahre.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich bin 25 Jahre alt.'
        },
        {
          id: 'q1_2_4',
          text: 'Almanca\'da "Ben Almanya\'dan geliyorum" nasıl denir?',
          options: [
            {
              id: 'q1_2_4_a',
              text: 'Ich bin aus Deutschland.',
              isCorrect: false
            },
            {
              id: 'q1_2_4_b',
              text: 'Ich heiße aus Deutschland.',
              isCorrect: false
            },
            {
              id: 'q1_2_4_c',
              text: 'Ich komme aus Deutschland.',
              isCorrect: true
            },
            {
              id: 'q1_2_4_d',
              text: 'Ich wohne Deutschland.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich komme aus Deutschland.'
        },
        {
          id: 'q1_2_5',
          text: 'Almanca\'da meslek nasıl sorulur?',
          options: [
            {
              id: 'q1_2_5_a',
              text: 'Was machst du beruflich?',
              isCorrect: true
            },
            {
              id: 'q1_2_5_b',
              text: 'Wie alt bist du?',
              isCorrect: false
            },
            {
              id: 'q1_2_5_c',
              text: 'Woher kommst du?',
              isCorrect: false
            },
            {
              id: 'q1_2_5_d',
              text: 'Wie heißt du?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Was machst du beruflich?'
        }
      ]
    },
    {
      id: 'quiz1_3',
      title: 'Kafede',
      description: 'Bir Alman kafesinde sipariş verme hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q1_3_1',
          text: 'Almanca\'da kahve nasıl sipariş edilir?',
          options: [
            {
              id: 'q1_3_1_a',
              text: 'Ich möchte einen Kaffee, bitte.',
              isCorrect: true
            },
            {
              id: 'q1_3_1_b',
              text: 'Ich will Kaffee.',
              isCorrect: false
            },
            {
              id: 'q1_3_1_c',
              text: 'Gib mir Kaffee.',
              isCorrect: false
            },
            {
              id: 'q1_3_1_d',
              text: 'Kaffee für mich.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich möchte einen Kaffee, bitte.'
        },
        {
          id: 'q1_3_2',
          text: 'Almanca\'da menü nasıl istenir?',
          options: [
            {
              id: 'q1_3_2_a',
              text: 'Wo ist das Essen?',
              isCorrect: false
            },
            {
              id: 'q1_3_2_b',
              text: 'Kann ich die Speisekarte haben, bitte?',
              isCorrect: true
            },
            {
              id: 'q1_3_2_c',
              text: 'Was gibt es zu essen?',
              isCorrect: false
            },
            {
              id: 'q1_3_2_d',
              text: 'Ich will essen.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Kann ich die Speisekarte haben, bitte?'
        },
        {
          id: 'q1_3_3',
          text: 'Almanca\'da hesap nasıl istenir?',
          options: [
            {
              id: 'q1_3_3_a',
              text: 'Ich möchte bezahlen, bitte.',
              isCorrect: false
            },
            {
              id: 'q1_3_3_b',
              text: 'Die Rechnung, bitte.',
              isCorrect: true
            },
            {
              id: 'q1_3_3_c',
              text: 'Ich bin fertig.',
              isCorrect: false
            },
            {
              id: 'q1_3_3_d',
              text: 'Kann ich gehen?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Die Rechnung, bitte.'
        },
        {
          id: 'q1_3_4',
          text: '"Zum Mitnehmen" ne anlama gelir?',
          options: [
            {
              id: 'q1_3_4_a',
              text: 'Burada yemek için',
              isCorrect: false
            },
            {
              id: 'q1_3_4_b',
              text: 'Paket olarak',
              isCorrect: true
            },
            {
              id: 'q1_3_4_c',
              text: 'Paylaşmak için',
              isCorrect: false
            },
            {
              id: 'q1_3_4_d',
              text: 'Tatmak için',
              isCorrect: false
            }
          ],
          correctAnswer: 'Paket olarak'
        },
        {
          id: 'q1_3_5',
          text: 'Almanca\'da "Limonlu çay istiyorum" nasıl denir?',
          options: [
            {
              id: 'q1_3_5_a',
              text: 'Ich möchte einen Tee mit Zucker.',
              isCorrect: false
            },
            {
              id: 'q1_3_5_b',
              text: 'Ich möchte einen Tee mit Milch.',
              isCorrect: false
            },
            {
              id: 'q1_3_5_c',
              text: 'Ich möchte einen Tee mit Zitrone.',
              isCorrect: true
            },
            {
              id: 'q1_3_5_d',
              text: 'Ich möchte einen Tee ohne alles.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich möchte einen Tee mit Zitrone.'
        }
      ]
    },
    // More German quizzes...
    {
      id: 'quiz2_1',
      title: 'Alışverişe Çıkmak',
      description: 'Alışveriş kelimeleri ve ifadeleri hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q2_1_1',
          text: 'Almanca\'da "Süpermarket" nasıl denir?',
          options: [
            {
              id: 'q2_1_1_a',
              text: 'Supermarkt',
              isCorrect: true
            },
            {
              id: 'q2_1_1_b',
              text: 'Kaufhaus',
              isCorrect: false
            },
            {
              id: 'q2_1_1_c',
              text: 'Marktplatz',
              isCorrect: false
            },
            {
              id: 'q2_1_1_d',
              text: 'Einkaufszentrum',
              isCorrect: false
            }
          ],
          correctAnswer: 'Supermarkt'
        },
        {
          id: 'q2_1_2',
          text: 'Almanca\'da fiyat nasıl sorulur?',
          options: [
            {
              id: 'q2_1_2_a',
              text: 'Wie teuer ist das?',
              isCorrect: true
            },
            {
              id: 'q2_1_2_b',
              text: 'Was kostet?',
              isCorrect: false
            },
            {
              id: 'q2_1_2_c',
              text: 'Wie viel?',
              isCorrect: false
            },
            {
              id: 'q2_1_2_d',
              text: 'Preis bitte?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wie teuer ist das?'
        },
        {
          id: 'q2_1_3',
          text: 'Süpermarkette "Kasse" ne anlama gelir?',
          options: [
            {
              id: 'q2_1_3_a',
              text: 'Alışveriş arabası',
              isCorrect: false
            },
            {
              id: 'q2_1_3_b',
              text: 'Kasa',
              isCorrect: true
            },
            {
              id: 'q2_1_3_c',
              text: 'Raf',
              isCorrect: false
            },
            {
              id: 'q2_1_3_d',
              text: 'Poşet',
              isCorrect: false
            }
          ],
          correctAnswer: 'Kasa'
        },
        {
          id: 'q2_1_4',
          text: 'Almanca\'da "Arıyorum..." nasıl denir?',
          options: [
            {
              id: 'q2_1_4_a',
              text: 'Ich finde...',
              isCorrect: false
            },
            {
              id: 'q2_1_4_b',
              text: 'Ich brauche...',
              isCorrect: false
            },
            {
              id: 'q2_1_4_c',
              text: 'Ich suche...',
              isCorrect: true
            },
            {
              id: 'q2_1_4_d',
              text: 'Ich will...',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich suche...'
        },
        {
          id: 'q2_1_5',
          text: '"Rabatt" ne anlama gelir?',
          options: [
            {
              id: 'q2_1_5_a',
              text: 'Fiyat',
              isCorrect: false
            },
            {
              id: 'q2_1_5_b',
              text: 'İndirim',
              isCorrect: true
            },
            {
              id: 'q2_1_5_c',
              text: 'Fatura',
              isCorrect: false
            },
            {
              id: 'q2_1_5_d',
              text: 'Fiş',
              isCorrect: false
            }
          ],
          correctAnswer: 'İndirim'
        }
      ]
    },
    {
      id: 'quiz2_2',
      title: 'Toplu Taşıma',
      description: 'Almanya\'daki toplu taşıma hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q2_2_1',
          text: 'Almanca\'da "Metro" nasıl denir?',
          options: [
            {
              id: 'q2_2_1_a',
              text: 'U-Bahn',
              isCorrect: true
            },
            {
              id: 'q2_2_1_b',
              text: 'S-Bahn',
              isCorrect: false
            },
            {
              id: 'q2_2_1_c',
              text: 'Straßenbahn',
              isCorrect: false
            },
            {
              id: 'q2_2_1_d',
              text: 'Bus',
              isCorrect: false
            }
          ],
          correctAnswer: 'U-Bahn'
        },
        {
          id: 'q2_2_2',
          text: 'Bilet nasıl istenir?',
          options: [
            {
              id: 'q2_2_2_a',
              text: 'Wo ist der Zug?',
              isCorrect: false
            },
            {
              id: 'q2_2_2_b',
              text: 'Ich möchte eine Fahrkarte, bitte.',
              isCorrect: true
            },
            {
              id: 'q2_2_2_c',
              text: 'Wann fährt der Bus?',
              isCorrect: false
            },
            {
              id: 'q2_2_2_d',
              text: 'Wie viel kostet das Auto?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich möchte eine Fahrkarte, bitte.'
        },
        {
          id: 'q2_2_3',
          text: '"Haltestelle" ne anlama gelir?',
          options: [
            {
              id: 'q2_2_3_a',
              text: 'İstasyon',
              isCorrect: false
            },
            {
              id: 'q2_2_3_b',
              text: 'Durak',
              isCorrect: true
            },
            {
              id: 'q2_2_3_c',
              text: 'Havalimanı',
              isCorrect: false
            },
            {
              id: 'q2_2_3_d',
              text: 'Otopark',
              isCorrect: false
            }
          ],
          correctAnswer: 'Durak'
        },
        {
          id: 'q2_2_4',
          text: 'Sefer tarifesi nasıl sorulur?',
          options: [
            {
              id: 'q2_2_4_a',
              text: 'Wo ist der Fahrplan?',
              isCorrect: true
            },
            {
              id: 'q2_2_4_b',
              text: 'Wann kommt der Zug?',
              isCorrect: false
            },
            {
              id: 'q2_2_4_c',
              text: 'Wie viel kostet das Ticket?',
              isCorrect: false
            },
            {
              id: 'q2_2_4_d',
              text: 'Wo ist der Ausgang?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wo ist der Fahrplan?'
        },
        {
          id: 'q2_2_5',
          text: '"Umsteigen" ne anlama gelir?',
          options: [
            {
              id: 'q2_2_5_a',
              text: 'İnmek',
              isCorrect: false
            },
            {
              id: 'q2_2_5_b',
              text: 'Binmek',
              isCorrect: false
            },
            {
              id: 'q2_2_5_c',
              text: 'Aktarma yapmak',
              isCorrect: true
            },
            {
              id: 'q2_2_5_d',
              text: 'Hareket etmek',
              isCorrect: false
            }
          ],
          correctAnswer: 'Aktarma yapmak'
        }
      ]
    },
    {
      id: 'quiz2_3',
      title: 'Restoranda',
      description: 'Almanya\'da restoran ziyaretleri hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q2_3_1',
          text: 'Masa nasıl rezerve edilir?',
          options: [
            {
              id: 'q2_3_1_a',
              text: 'Ich möchte einen Tisch reservieren, bitte.',
              isCorrect: true
            },
            {
              id: 'q2_3_1_b',
              text: 'Ich will essen.',
              isCorrect: false
            },
            {
              id: 'q2_3_1_c',
              text: 'Wo ist die Toilette?',
              isCorrect: false
            },
            {
              id: 'q2_3_1_d',
              text: 'Die Rechnung, bitte.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich möchte einen Tisch reservieren, bitte.'
        },
        {
          id: 'q2_3_2',
          text: 'Yemek nasıl sipariş edilir?',
          options: [
            {
              id: 'q2_3_2_a',
              text: 'Ich nehme das Schnitzel, bitte.',
              isCorrect: true
            },
            {
              id: 'q2_3_2_b',
              text: 'Ich will Schnitzel.',
              isCorrect: false
            },
            {
              id: 'q2_3_2_c',
              text: 'Gib mir Schnitzel.',
              isCorrect: false
            },
            {
              id: 'q2_3_2_d',
              text: 'Schnitzel für mich.',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich nehme das Schnitzel, bitte.'
        },
        {
          id: 'q2_3_3',
          text: '"Vorspeise" ne anlama gelir?',
          options: [
            {
              id: 'q2_3_3_a',
              text: 'Ana yemek',
              isCorrect: false
            },
            {
              id: 'q2_3_3_b',
              text: 'Tatlı',
              isCorrect: false
            },
            {
              id: 'q2_3_3_c',
              text: 'Başlangıç',
              isCorrect: true
            },
            {
              id: 'q2_3_3_d',
              text: 'İçecek',
              isCorrect: false
            }
          ],
          correctAnswer: 'Başlangıç'
        },
        {
          id: 'q2_3_4',
          text: 'Tavsiye nasıl istenir?',
          options: [
            {
              id: 'q2_3_4_a',
              text: 'Was können Sie empfehlen?',
              isCorrect: true
            },
            {
              id: 'q2_3_4_b',
              text: 'Was ist das Beste?',
              isCorrect: false
            },
            {
              id: 'q2_3_4_c',
              text: 'Was ist gut?',
              isCorrect: false
            },
            {
              id: 'q2_3_4_d',
              text: 'Was soll ich essen?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Was können Sie empfehlen?'
        },
        {
          id: 'q2_3_5',
          text: 'Almanca\'da "Afiyet olsun" nasıl denir?',
          options: [
            {
              id: 'q2_3_5_a',
              text: 'Viel Spaß',
              isCorrect: false
            },
            {
              id: 'q2_3_5_b',
              text: 'Guten Appetit',
              isCorrect: true
            },
            {
              id: 'q2_3_5_c',
              text: 'Prost',
              isCorrect: false
            },
            {
              id: 'q2_3_5_d',
              text: 'Gesundheit',
              isCorrect: false
            }
          ],
          correctAnswer: 'Guten Appetit'
        }
      ]
    },
    {
      id: 'quiz3_1',
      title: 'Müze Ziyareti',
      description: 'Müzeler ve sanat terimleri hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q3_1_1',
          text: 'Açılış saatleri nasıl sorulur?',
          options: [
            {
              id: 'q3_1_1_a',
              text: 'Wann öffnet das Museum?',
              isCorrect: true
            },
            {
              id: 'q3_1_1_b',
              text: 'Wo ist das Museum?',
              isCorrect: false
            },
            {
              id: 'q3_1_1_c',
              text: 'Wie viel kostet der Eintritt?',
              isCorrect: false
            },
            {
              id: 'q3_1_1_d',
              text: 'Gibt es eine Führung?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wann öffnet das Museum?'
        },
        {
          id: 'q3_1_2',
          text: '"Ausstellung" ne anlama gelir?',
          options: [
            {
              id: 'q3_1_2_a',
              text: 'Tablo',
              isCorrect: false
            },
            {
              id: 'q3_1_2_b',
              text: 'Heykel',
              isCorrect: false
            },
            {
              id: 'q3_1_2_c',
              text: 'Sergi',
              isCorrect: true
            },
            {
              id: 'q3_1_2_d',
              text: 'Sanatçı',
              isCorrect: false
            }
          ],
          correctAnswer: 'Sergi'
        },
        {
          id: 'q3_1_3',
          text: 'Rehberli tur nasıl sorulur?',
          options: [
            {
              id: 'q3_1_3_a',
              text: 'Gibt es eine Führung?',
              isCorrect: true
            },
            {
              id: 'q3_1_3_b',
              text: 'Wo ist die Toilette?',
              isCorrect: false
            },
            {
              id: 'q3_1_3_c',
              text: 'Wie viel kostet der Eintritt?',
              isCorrect: false
            },
            {
              id: 'q3_1_3_d',
              text: 'Wann schließt das Museum?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Gibt es eine Führung?'
        },
        {
          id: 'q3_1_4',
          text: '"Gemälde" ne anlama gelir?',
          options: [
            {
              id: 'q3_1_4_a',
              text: 'Heykel',
              isCorrect: false
            },
            {
              id: 'q3_1_4_b',
              text: 'Fotoğraf',
              isCorrect: false
            },
            {
              id: 'q3_1_4_c',
              text: 'Tablo',
              isCorrect: true
            },
            {
              id: 'q3_1_4_d',
              text: 'Çizim',
              isCorrect: false
            }
          ],
          correctAnswer: 'Tablo'
        },
        {
          id: 'q3_1_5',
          text: 'Sesli rehber nasıl sorulur?',
          options: [
            {
              id: 'q3_1_5_a',
              text: 'Wo ist der Audioguide?',
              isCorrect: true
            },
            {
              id: 'q3_1_5_b',
              text: 'Gibt es einen Katalog?',
              isCorrect: false
            },
            {
              id: 'q3_1_5_c',
              text: 'Wo ist der Ausgang?',
              isCorrect: false
            },
            {
              id: 'q3_1_5_d',
              text: 'Darf ich fotografieren?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wo ist der Audioguide?'
        }
      ]
    },
    {
      id: 'quiz3_2',
      title: 'Kültürel Kelimeler',
      description: 'Kültürel terimlerle kelime dağarcığınızı genişletin.',
      questions: [
        {
          id: 'q3_2_1',
          text: '"Konzert" ne anlama gelir?',
          options: [
            {
              id: 'q3_2_1_a',
              text: 'Tiyatro',
              isCorrect: false
            },
            {
              id: 'q3_2_1_b',
              text: 'Sinema',
              isCorrect: false
            },
            {
              id: 'q3_2_1_c',
              text: 'Konser',
              isCorrect: true
            },
            {
              id: 'q3_2_1_d',
              text: 'Müze',
              isCorrect: false
            }
          ],
          correctAnswer: 'Konser'
        },
        {
          id: 'q3_2_2',
          text: '"Theaterstück" nedir?',
          options: [
            {
              id: 'q3_2_2_a',
              text: 'Film',
              isCorrect: false
            },
            {
              id: 'q3_2_2_b',
              text: 'Tiyatro oyunu',
              isCorrect: true
            },
            {
              id: 'q3_2_2_c',
              text: 'Şarkı',
              isCorrect: false
            },
            {
              id: 'q3_2_2_d',
              text: 'Kitap',
              isCorrect: false
            }
          ],
          correctAnswer: 'Tiyatro oyunu'
        },
        {
          id: 'q3_2_3',
          text: '"Oper" ne anlama gelir?',
          options: [
            {
              id: 'q3_2_3_a',
              text: 'Bale',
              isCorrect: false
            },
            {
              id: 'q3_2_3_b',
              text: 'Konser',
              isCorrect: false
            },
            {
              id: 'q3_2_3_c',
              text: 'Opera',
              isCorrect: true
            },
            {
              id: 'q3_2_3_d',
              text: 'Sergi',
              isCorrect: false
            }
          ],
          correctAnswer: 'Opera'
        },
        {
          id: 'q3_2_4',
          text: '"Galerie" nedir?',
          options: [
            {
              id: 'q3_2_4_a',
              text: 'Restoran',
              isCorrect: false
            },
            {
              id: 'q3_2_4_b',
              text: 'Sinema',
              isCorrect: false
            },
            {
              id: 'q3_2_4_c',
              text: 'Galeri',
              isCorrect: true
            },
            {
              id: 'q3_2_4_d',
              text: 'Kafe',
              isCorrect: false
            }
          ],
          correctAnswer: 'Galeri'
        },
        {
          id: 'q3_2_5',
          text: '"Festival" ne anlama gelir?',
          options: [
            {
              id: 'q3_2_5_a',
              text: 'Parti',
              isCorrect: false
            },
            {
              id: 'q3_2_5_b',
              text: 'Festival',
              isCorrect: true
            },
            {
              id: 'q3_2_5_c',
              text: 'Konser',
              isCorrect: false
            },
            {
              id: 'q3_2_5_d',
              text: 'Kutlama',
              isCorrect: false
            }
          ],
          correctAnswer: 'Festival'
        }
      ]
    },
    {
      id: 'quiz3_3',
      title: 'Etkinlikler',
      description: 'Etkinlikler ve bilet satın alma hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q3_3_1',
          text: 'Bilet nasıl alınır?',
          options: [
            {
              id: 'q3_3_1_a',
              text: 'Ich möchte Tickets kaufen, bitte.',
              isCorrect: true
            },
            {
              id: 'q3_3_1_b',
              text: 'Wo ist die Veranstaltung?',
              isCorrect: false
            },
            {
              id: 'q3_3_1_c',
              text: 'Wann beginnt das Konzert?',
              isCorrect: false
            },
            {
              id: 'q3_3_1_d',
              text: 'Wie viel kostet der Eintritt?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Ich möchte Tickets kaufen, bitte.'
        },
        {
          id: 'q3_3_2',
          text: 'Etkinlik yeri nasıl sorulur?',
          options: [
            {
              id: 'q3_3_2_a',
              text: 'Wann ist die Veranstaltung?',
              isCorrect: false
            },
            {
              id: 'q3_3_2_b',
              text: 'Wo findet die Veranstaltung statt?',
              isCorrect: true
            },
            {
              id: 'q3_3_2_c',
              text: 'Wie viel kostet der Eintritt?',
              isCorrect: false
            },
            {
              id: 'q3_3_2_d',
              text: 'Gibt es noch Tickets?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wo findet die Veranstaltung statt?'
        },
        {
          id: 'q3_3_3',
          text: '"Ausverkauft" ne anlama gelir?',
          options: [
            {
              id: 'q3_3_3_a',
              text: 'Ucuz',
              isCorrect: false
            },
            {
              id: 'q3_3_3_b',
              text: 'Pahalı',
              isCorrect: false
            },
            {
              id: 'q3_3_3_c',
              text: 'Tükenmiş',
              isCorrect: true
            },
            {
              id: 'q3_3_3_d',
              text: 'Mevcut',
              isCorrect: false
            }
          ],
          correctAnswer: 'Tükenmiş'
        },
        {
          id: 'q3_3_4',
          text: 'Etkinlik saati nasıl sorulur?',
          options: [
            {
              id: 'q3_3_4_a',
              text: 'Wann beginnt die Veranstaltung?',
              isCorrect: true
            },
            {
              id: 'q3_3_4_b',
              text: 'Wo ist die Veranstaltung?',
              isCorrect: false
            },
            {
              id: 'q3_3_4_c',
              text: 'Wie viel kostet der Eintritt?',
              isCorrect: false
            },
            {
              id: 'q3_3_4_d',
              text: 'Gibt es noch Tickets?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Wann beginnt die Veranstaltung?'
        },
        {
          id: 'q3_3_5',
          text: '"Ermäßigung" ne anlama gelir?',
          options: [
            {
              id: 'q3_3_5_a',
              text: 'İndirim',
              isCorrect: true
            },
            {
              id: 'q3_3_5_b',
              text: 'Ek ücret',
              isCorrect: false
            },
            {
              id: 'q3_3_5_c',
              text: 'İptal',
              isCorrect: false
            },
            {
              id: 'q3_3_5_d',
              text: 'Rezervasyon',
              isCorrect: false
            }
          ],
          correctAnswer: 'İndirim'
        }
      ]
    }
  ],
  fr: [
    {
      id: 'quiz1_1',
      title: 'Temel Selamlaşmalar',
      description: 'Temel Fransızca selamlaşmalar hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q1_1_1',
          text: 'Fransızca\'da "Merhaba" nasıl denir?',
          options: [
            {
              id: 'q1_1_1_a',
              text: 'Bonjour',
              isCorrect: true
            },
            {
              id: 'q1_1_1_b',
              text: 'Bonsoir',
              isCorrect: false
            },
            {
              id: 'q1_1_1_c',
              text: 'Bonne nuit',
              isCorrect: false
            },
            {
              id: 'q1_1_1_d',
              text: 'Au revoir',
              isCorrect: false
            }
          ],
          correctAnswer: 'Bonjour'
        },
        {
          id: 'q1_1_2',
          text: 'Fransızca\'da "Hoşça kal" nasıl denir?',
          options: [
            {
              id: 'q1_1_2_a',
              text: 'Bonjour',
              isCorrect: false
            },
            {
              id: 'q1_1_2_b',
              text: 'Au revoir',
              isCorrect: true
            },
            {
              id: 'q1_1_2_c',
              text: 'Bonsoir',
              isCorrect: false
            },
            {
              id: 'q1_1_2_d',
              text: 'Comment ça va?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Au revoir'
        },
        {
          id: 'q1_1_3',
          text: 'Fransızca\'da "Nasılsın?" nasıl sorulur?',
          options: [
            {
              id: 'q1_1_3_a',
              text: 'Comment tu t\'appelles?',
              isCorrect: false
            },
            {
              id: 'q1_1_3_b',
              text: 'D\'où viens-tu?',
              isCorrect: false
            },
            {
              id: 'q1_1_3_c',
              text: 'Comment ça va?',
              isCorrect: true
            },
            {
              id: 'q1_1_3_d',
              text: 'Que fais-tu?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Comment ça va?'
        },
        {
          id: 'q1_1_4',
          text: '"Salut" ne anlama gelir?',
          options: [
            {
              id: 'q1_1_4_a',
              text: 'Merhaba (resmi olmayan)',
              isCorrect: true
            },
            {
              id: 'q1_1_4_b',
              text: 'Teşekkürler',
              isCorrect: false
            },
            {
              id: 'q1_1_4_c',
              text: 'Lütfen',
              isCorrect: false
            },
            {
              id: 'q1_1_4_d',
              text: 'Hoşça kal',
              isCorrect: false
            }
          ],
          correctAnswer: 'Merhaba (resmi olmayan)'
        },
        {
          id: 'q1_1_5',
          text: 'Fransızca\'da "İyi geceler" nasıl denir?',
          options: [
            {
              id: 'q1_1_5_a',
              text: 'Bonjour',
              isCorrect: false
            },
            {
              id: 'q1_1_5_b',
              text: 'Bonsoir',
              isCorrect: false
            },
            {
              id: 'q1_1_5_c',
              text: 'Bonne nuit',
              isCorrect: true
            },
            {
              id: 'q1_1_5_d',
              text: 'Au revoir',
              isCorrect: false
            }
          ],
          correctAnswer: 'Bonne nuit'
        }
      ]
    },
    // More French quizzes...
  ],
  es: [
    {
      id: 'quiz1_1',
      title: 'Temel Selamlaşmalar',
      description: 'Temel İspanyolca selamlaşmalar hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q1_1_1',
          text: 'İspanyolca\'da "Günaydın" nasıl denir?',
          options: [
            {
              id: 'q1_1_1_a',
              text: 'Buenos días',
              isCorrect: true
            },
            {
              id: 'q1_1_1_b',
              text: 'Buenas noches',
              isCorrect: false
            },
            {
              id: 'q1_1_1_c',
              text: 'Buenas tardes',
              isCorrect: false
            },
            {
              id: 'q1_1_1_d',
              text: 'Adiós',
              isCorrect: false
            }
          ],
          correctAnswer: 'Buenos días'
        },
        {
          id: 'q1_1_2',
          text: 'İspanyolca\'da "Hoşça kal" nasıl denir?',
          options: [
            {
              id: 'q1_1_2_a',
              text: 'Hola',
              isCorrect: false
            },
            {
              id: 'q1_1_2_b',
              text: 'Adiós',
              isCorrect: true
            },
            {
              id: 'q1_1_2_c',
              text: 'Buenos días',
              isCorrect: false
            },
            {
              id: 'q1_1_2_d',
              text: '¿Cómo estás?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Adiós'
        },
        {
          id: 'q1_1_3',
          text: 'İspanyolca\'da "Nasılsın?" nasıl sorulur?',
          options: [
            {
              id: 'q1_1_3_a',
              text: '¿Cómo te llamas?',
              isCorrect: false
            },
            {
              id: 'q1_1_3_b',
              text: '¿De dónde eres?',
              isCorrect: false
            },
            {
              id: 'q1_1_3_c',
              text: '¿Cómo estás?',
              isCorrect: true
            },
            {
              id: 'q1_1_3_d',
              text: '¿Qué haces?',
              isCorrect: false
            }
          ],
          correctAnswer: '¿Cómo estás?'
        }
      ]
    }
  ],
  // Default fallback for any unsupported language
  en: [
    {
      id: 'quiz1_1',
      title: 'Temel Selamlaşmalar',
      description: 'Temel İngilizce selamlaşmalar hakkındaki bilginizi test edin.',
      questions: [
        {
          id: 'q1_1_1',
          text: 'İngilizce\'de "Günaydın" nasıl denir?',
          options: [
            {
              id: 'q1_1_1_a',
              text: 'Good morning',
              isCorrect: true
            },
            {
              id: 'q1_1_1_b',
              text: 'Good evening',
              isCorrect: false
            },
            {
              id: 'q1_1_1_c',
              text: 'Good night',
              isCorrect: false
            },
            {
              id: 'q1_1_1_d',
              text: 'Good day',
              isCorrect: false
            }
          ],
          correctAnswer: 'Good morning'
        },
        {
          id: 'q1_1_2',
          text: 'İngilizce\'de hoşça kal nasıl denir?',
          options: [
            {
              id: 'q1_1_2_a',
              text: 'Hello',
              isCorrect: false
            },
            {
              id: 'q1_1_2_b',
              text: 'Goodbye',
              isCorrect: true
            },
            {
              id: 'q1_1_2_c',
              text: 'Good day',
              isCorrect: false
            },
            {
              id: 'q1_1_2_d',
              text: 'How are you?',
              isCorrect: false
            }
          ],
          correctAnswer: 'Goodbye'
        }
      ]
    }
  ]
};

// Helper functions to get game data based on language
export const getGameCharacters = (languageCode: string): GameCharacter[] => {
  // Check if the language code exists in our data
  if (languageCode in charactersByLanguage) {
    return charactersByLanguage[languageCode as keyof typeof charactersByLanguage];
  }
  // Fallback to English if the language is not supported
  return charactersByLanguage.en;
};

export const getGameLevels = (languageCode: string): GameLevel[] => {
  // Check if the language code exists in our data
  if (languageCode in levelsByLanguage) {
    return levelsByLanguage[languageCode as keyof typeof levelsByLanguage];
  }
  // Fallback to English if the language is not supported
  return levelsByLanguage.en;
};

export const getGameConversations = (languageCode: string): Conversation[] => {
  // Check if the language code exists in our data
  if (languageCode in conversationsByLanguage) {
    return conversationsByLanguage[languageCode as keyof typeof conversationsByLanguage];
  }
  // Fallback to English if the language is not supported
  return conversationsByLanguage.en;
};

export const getGameQuizzes = (languageCode: string): Quiz[] => {
  // Check if the language code exists in our data
  if (languageCode in quizzesByLanguage) {
    return quizzesByLanguage[languageCode as keyof typeof quizzesByLanguage];
  }
  // Fallback to English if the language is not supported
  return quizzesByLanguage.en;
};