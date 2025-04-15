import { VocabularyList } from '@/types/vocabulary';

// Sample vocabulary lists for demonstration
export const sampleVocabularyLists: VocabularyList[] = [
  {
    id: 'sample-list-1',
    title: 'Temel Almanca Kelimeler',
    description: 'Günlük hayatta sık kullanılan temel Almanca kelimeler',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    words: [
      {
        id: 'word-1',
        sourceText: 'Hallo',
        targetText: 'Merhaba',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Hallo, wie geht es dir?',
        exampleTranslation: 'Merhaba, nasılsın?',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-2',
        sourceText: 'Danke',
        targetText: 'Teşekkürler',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Danke für deine Hilfe.',
        exampleTranslation: 'Yardımın için teşekkürler.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-3',
        sourceText: 'Bitte',
        targetText: 'Rica ederim / Lütfen',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Bitte schön!',
        exampleTranslation: 'Rica ederim!',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-4',
        sourceText: 'Ja',
        targetText: 'Evet',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Ja, ich verstehe.',
        exampleTranslation: 'Evet, anlıyorum.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-5',
        sourceText: 'Nein',
        targetText: 'Hayır',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Nein, das möchte ich nicht.',
        exampleTranslation: 'Hayır, bunu istemiyorum.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-6',
        sourceText: 'Guten Morgen',
        targetText: 'Günaydın',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Guten Morgen! Wie hast du geschlafen?',
        exampleTranslation: 'Günaydın! Nasıl uyudun?',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-7',
        sourceText: 'Guten Tag',
        targetText: 'İyi günler',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Guten Tag, kann ich Ihnen helfen?',
        exampleTranslation: 'İyi günler, size yardımcı olabilir miyim?',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-8',
        sourceText: 'Guten Abend',
        targetText: 'İyi akşamlar',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Guten Abend, schön Sie zu sehen.',
        exampleTranslation: 'İyi akşamlar, sizi görmek güzel.',
        learned: false,
        createdAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-list-2',
    title: 'Dark - Sezon 1 Bölüm 1',
    description: 'Netflix dizisi Dark\'tan öğrenilen kelimeler',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    words: [
      {
        id: 'word-4',
        sourceText: 'die Zeit',
        targetText: 'zaman',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Die Zeit ist eine Illusion.',
        exampleTranslation: 'Zaman bir yanılsamadır.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-5',
        sourceText: 'der Wald',
        targetText: 'orman',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Der Wald verbirgt viele Geheimnisse.',
        exampleTranslation: 'Orman birçok sırrı gizler.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-6',
        sourceText: 'das Geheimnis',
        targetText: 'sır',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Jeder hat seine Geheimnisse.',
        exampleTranslation: 'Herkesin kendi sırları vardır.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-7',
        sourceText: 'die Höhle',
        targetText: 'mağara',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Die Höhle ist dunkel und gefährlich.',
        exampleTranslation: 'Mağara karanlık ve tehlikeli.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-8',
        sourceText: 'verschwinden',
        targetText: 'kaybolmak',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Das Kind ist verschwunden.',
        exampleTranslation: 'Çocuk kayboldu.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'word-9',
        sourceText: 'die Vergangenheit',
        targetText: 'geçmiş',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Die Vergangenheit kann uns nicht loslassen.',
        exampleTranslation: 'Geçmiş bizi bırakamaz.',
        learned: false,
        createdAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceShow: 'Dark',
    sourceEpisode: 'Sezon 1 Bölüm 1',
  },
  {
    id: 'sample-list-3',
    title: 'Yiyecek ve İçecekler',
    description: 'Almanca yiyecek ve içecek kelimeleri',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    words: [
      {
        id: 'food-1',
        sourceText: 'Brot',
        targetText: 'ekmek',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Ich kaufe frisches Brot.',
        exampleTranslation: 'Taze ekmek alıyorum.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-2',
        sourceText: 'Käse',
        targetText: 'peynir',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Ich esse gerne Käse zum Frühstück.',
        exampleTranslation: 'Kahvaltıda peynir yemeyi severim.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-3',
        sourceText: 'Wasser',
        targetText: 'su',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Ich trinke viel Wasser.',
        exampleTranslation: 'Çok su içerim.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-4',
        sourceText: 'Kaffee',
        targetText: 'kahve',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Morgens trinke ich immer Kaffee.',
        exampleTranslation: 'Sabahları her zaman kahve içerim.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-5',
        sourceText: 'Tee',
        targetText: 'çay',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Möchtest du einen Tee?',
        exampleTranslation: 'Bir çay ister misin?',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-6',
        sourceText: 'Apfel',
        targetText: 'elma',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Ich esse jeden Tag einen Apfel.',
        exampleTranslation: 'Her gün bir elma yerim.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-7',
        sourceText: 'Banane',
        targetText: 'muz',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Die Banane ist gelb.',
        exampleTranslation: 'Muz sarıdır.',
        learned: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'food-8',
        sourceText: 'Schokolade',
        targetText: 'çikolata',
        sourceLanguage: 'de',
        targetLanguage: 'tr',
        example: 'Ich liebe Schokolade.',
        exampleTranslation: 'Çikolatayı severim.',
        learned: false,
        createdAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Sample episodes data
export const sampleEpisodes = [
  {
    id: 'episode-1',
    title: 'Dark',
    episode: 'Sezon 1 Bölüm 1',
    thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    language: 'Almanca',
    description: 'Winden kasabasında bir çocuk kaybolur ve dört aile arasındaki karanlık sırlar ortaya çıkmaya başlar.',
    downloadDate: new Date().toISOString(),
    subtitleCount: 42,
  },
  {
    id: 'episode-2',
    title: 'Avengers',
    episode: 'Infinity War',
    thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    language: 'Almanca',
    description: 'Dünyanın en güçlü kahramanları, evrenin yarısını yok etmek isteyen Thanos\'a karşı birleşiyor.',
    downloadDate: new Date().toISOString(),
    subtitleCount: 56,
  },
  {
    id: 'episode-3',
    title: 'Iron Man',
    episode: 'Bölüm 1',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    language: 'Almanca',
    description: 'Milyarder mucit Tony Stark, bir saldırı sonrası esir düşer ve hayatta kalmak için güçlü bir zırh yapar.',
    downloadDate: new Date().toISOString(),
    subtitleCount: 48,
  },
  {
    id: 'episode-4',
    title: 'Black Mirror',
    episode: 'S01E03',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    language: 'Almanca',
    description: 'Teknolojinin insanlar üzerindeki karanlık etkilerini anlatan antoloji dizisinin üçüncü bölümü.',
    downloadDate: new Date().toISOString(),
    subtitleCount: 65,
  },
  {
    id: 'episode-5',
    title: 'Kung Fu Panda',
    episode: 'Bölüm 1',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    language: 'Almanca',
    description: 'Tembel bir panda olan Po, beklenmedik bir şekilde efsanevi kung fu savaşçısı olmak için seçilir.',
    downloadDate: new Date().toISOString(),
    subtitleCount: 38,
  }
];

// Sample subtitle data
export const sampleSubtitleData = {
  showName: 'Dark',
  episodeName: 'Sezon 1 Bölüm 1',
  language: 'Almanca',
  entries: [
    {
      startTime: '00:01:15,000',
      endTime: '00:01:18,000',
      text: 'Alles ist miteinander verbunden.',
    },
    {
      startTime: '00:02:25,000',
      endTime: '00:02:28,000',
      text: 'Die Frage ist nicht wo, sondern wann.',
    },
    {
      startTime: '00:03:45,000',
      endTime: '00:03:48,000',
      text: 'Was wir wissen, ist ein Tropfen. Was wir nicht wissen, ein Ozean.',
    },
    {
      startTime: '00:04:20,000',
      endTime: '00:04:23,000',
      text: 'Die Vergangenheit beeinflusst die Zukunft.',
    },
    {
      startTime: '00:05:10,000',
      endTime: '00:05:13,000',
      text: 'Wir vertrauen darauf, dass die Zeit linear verläuft.',
    },
    {
      startTime: '00:06:05,000',
      endTime: '00:06:08,000',
      text: 'Dass sie für immer vorwärts fließt.',
    },
    {
      startTime: '00:07:30,000',
      endTime: '00:07:33,000',
      text: 'Bis sie eines Tages endet.',
    },
    {
      startTime: '00:08:15,000',
      endTime: '00:08:18,000',
      text: 'Doch was ist, wenn die Zeit keine Linie ist?',
    },
    {
      startTime: '00:09:00,000',
      endTime: '00:09:03,000',
      text: 'Was, wenn sie ein Kreis ist?',
    },
    {
      startTime: '00:10:20,000',
      endTime: '00:10:23,000',
      text: 'Wann ist Michael verschwunden?',
    },
    {
      startTime: '00:11:05,000',
      endTime: '00:11:08,000',
      text: 'Er ist gestern Abend nicht nach Hause gekommen.',
    }
  ]
};

// Sample subtitle data for Avengers
export const avengersSubtitleData = {
  showName: 'Avengers',
  episodeName: 'Infinity War',
  language: 'Almanca',
  entries: [
    {
      startTime: '00:01:10,000',
      endTime: '00:01:13,000',
      text: 'Wir haben einen Code Lila.',
    },
    {
      startTime: '00:02:05,000',
      endTime: '00:02:08,000',
      text: 'Er kommt zu uns.',
    },
    {
      startTime: '00:03:20,000',
      endTime: '00:03:23,000',
      text: 'Evakuiert die Stadt.',
    },
    {
      startTime: '00:04:15,000',
      endTime: '00:04:18,000',
      text: 'Aktiviert alle Verteidigungen.',
    },
    {
      startTime: '00:05:30,000',
      endTime: '00:05:33,000',
      text: 'Und gebt diesem Mann einen Schild.',
    },
    {
      startTime: '00:06:45,000',
      endTime: '00:06:48,000',
      text: 'Spaß wurde überbewertet.',
    },
    {
      startTime: '00:07:20,000',
      endTime: '00:07:23,000',
      text: 'Ich bin immer noch der stärkste Avenger.',
    },
    {
      startTime: '00:08:10,000',
      endTime: '00:08:13,000',
      text: 'Wir müssen den Stein beschützen.',
    },
    {
      startTime: '00:09:25,000',
      endTime: '00:09:28,000',
      text: 'Ich bin Groot.',
    },
    {
      startTime: '00:10:15,000',
      endTime: '00:10:18,000',
      text: 'Wir sind im Endspiel.',
    }
  ]
};

// Sample subtitle data for Iron Man
export const ironManSubtitleData = {
  showName: 'Iron Man',
  episodeName: 'Bölüm 1',
  language: 'Almanca',
  entries: [
    {
      startTime: '00:01:05,000',
      endTime: '00:01:08,000',
      text: 'Ich bin Tony Stark.',
    },
    {
      startTime: '00:02:15,000',
      endTime: '00:02:18,000',
      text: 'Manchmal muss man rennen, bevor man gehen kann.',
    },
    {
      startTime: '00:03:25,000',
      endTime: '00:03:28,000',
      text: 'Ich bin nicht der Typ, der Waffen herstellt.',
    },
    {
      startTime: '00:04:10,000',
      endTime: '00:04:13,000',
      text: 'Ich bin der Typ, der Frieden schafft.',
    },
    {
      startTime: '00:05:20,000',
      endTime: '00:05:23,000',
      text: 'Jarvis, bist du da?',
    },
    {
      startTime: '00:06:30,000',
      endTime: '00:06:33,000',
      text: 'Für Sie immer, Sir.',
    },
    {
      startTime: '00:07:15,000',
      endTime: '00:07:18,000',
      text: 'Ich arbeite an etwas Großem.',
    },
    {
      startTime: '00:08:05,000',
      endTime: '00:08:08,000',
      text: 'Das ist der Anzug. Ich bin es.',
    },
    {
      startTime: '00:09:20,000',
      endTime: '00:09:23,000',
      text: 'Ich bin Iron Man.',
    }
  ]
};

// Sample subtitle data for Black Mirror
export const blackMirrorSubtitleData = {
  showName: 'Black Mirror',
  episodeName: 'S01E03',
  language: 'Almanca',
  entries: [
    {
      startTime: '00:01:20,000',
      endTime: '00:01:23,000',
      text: 'Jede Erinnerung wird aufgezeichnet.',
    },
    {
      startTime: '00:02:10,000',
      endTime: '00:02:13,000',
      text: 'Alles, was Sie sehen, wird gespeichert.',
    },
    {
      startTime: '00:03:05,000',
      endTime: '00:03:08,000',
      text: 'Sie können es jederzeit zurückspulen.',
    },
    {
      startTime: '00:04:25,000',
      endTime: '00:04:28,000',
      text: 'Manchmal ist es besser, nicht alles zu wissen.',
    },
    {
      startTime: '00:05:15,000',
      endTime: '00:05:18,000',
      text: 'Die Technologie hat uns verändert.',
    },
    {
      startTime: '00:06:20,000',
      endTime: '00:06:23,000',
      text: 'Wir sind nicht mehr dieselben Menschen.',
    },
    {
      startTime: '00:07:10,000',
      endTime: '00:07:13,000',
      text: 'Löschen Sie die Erinnerung.',
    },
    {
      startTime: '00:08:30,000',
      endTime: '00:08:33,000',
      text: 'Manche Dinge sollten vergessen werden.',
    },
    {
      startTime: '00:09:15,000',
      endTime: '00:09:18,000',
      text: 'Es ist ein Fluch, alles zu erinnern.',
    }
  ]
};

// Sample subtitle data for Kung Fu Panda
export const kungFuPandaSubtitleData = {
  showName: 'Kung Fu Panda',
  episodeName: 'Bölüm 1',
  language: 'Almanca',
  entries: [
    {
      startTime: '00:01:15,000',
      endTime: '00:01:18,000',
      text: 'Ich liebe Kung Fu!',
    },
    {
      startTime: '00:02:05,000',
      endTime: '00:02:08,000',
      text: 'Ich bin der Drachenkrieger?',
    },
    {
      startTime: '00:03:20,000',
      endTime: '00:03:23,000',
      text: 'Es gibt keine Zufälle.',
    },
    {
      startTime: '00:04:10,000',
      endTime: '00:04:13,000',
      text: 'Gestern ist Geschichte, morgen ist ein Geheimnis.',
    },
    {
      startTime: '00:05:25,000',
      endTime: '00:05:28,000',
      text: 'Aber heute ist ein Geschenk.',
    },
    {
      startTime: '00:06:15,000',
      endTime: '00:06:18,000',
      text: 'Deshalb heißt es Gegenwart.',
    },
    {
      startTime: '00:07:30,000',
      endTime: '00:07:33,000',
      text: 'Ich bin vielleicht fett, aber ich bin immer noch schnell!',
    },
    {
      startTime: '00:08:20,000',
      endTime: '00:08:23,000',
      text: 'Der Weg zum Frieden beginnt mit einem Lächeln.',
    },
    {
      startTime: '00:09:05,000',
      endTime: '00:09:08,000',
      text: 'Mmm... Nudeln!',
    }
  ]
};