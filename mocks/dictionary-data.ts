import { DictionaryEntry } from '@/types/dictionary';

export const dictionaryData: DictionaryEntry[] = [
  // German-Turkish Dictionary Entries
  {
    id: 'de-tr-1',
    sourceText: 'Apfel',
    targetText: 'elma',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    plural: 'Äpfel',
    examples: [
      {
        text: 'Ich esse einen Apfel.',
        translation: 'Bir elma yiyorum.'
      },
      {
        text: 'Der Apfel ist rot.',
        translation: 'Elma kırmızı.'
      }
    ],
    synonyms: ['Frucht'],
    level: 'A1'
  },
  {
    id: 'de-tr-2',
    sourceText: 'Buch',
    targetText: 'kitap',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Bücher',
    examples: [
      {
        text: 'Ich lese ein Buch.',
        translation: 'Bir kitap okuyorum.'
      },
      {
        text: 'Das Buch ist interessant.',
        translation: 'Kitap ilginç.'
      }
    ],
    synonyms: ['Band', 'Werk'],
    level: 'A1'
  },
  {
    id: 'de-tr-3',
    sourceText: 'Computer',
    targetText: 'bilgisayar',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    plural: 'Computer',
    examples: [
      {
        text: 'Ich arbeite am Computer.',
        translation: 'Bilgisayarda çalışıyorum.'
      },
      {
        text: 'Der Computer ist neu.',
        translation: 'Bilgisayar yeni.'
      }
    ],
    synonyms: ['Rechner', 'PC'],
    level: 'A1'
  },
  {
    id: 'de-tr-4',
    sourceText: 'Haus',
    targetText: 'ev',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Häuser',
    examples: [
      {
        text: 'Ich wohne in einem Haus.',
        translation: 'Bir evde yaşıyorum.'
      },
      {
        text: 'Das Haus ist groß.',
        translation: 'Ev büyük.'
      }
    ],
    synonyms: ['Gebäude', 'Wohnung'],
    level: 'A1'
  },
  {
    id: 'de-tr-5',
    sourceText: 'Hund',
    targetText: 'köpek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    plural: 'Hunde',
    examples: [
      {
        text: 'Der Hund bellt.',
        translation: 'Köpek havlıyor.'
      },
      {
        text: 'Ich habe einen Hund.',
        translation: 'Benim bir köpeğim var.'
      }
    ],
    synonyms: ['Vierbeiner', 'Wauwau'],
    level: 'A1'
  },
  {
    id: 'de-tr-6',
    sourceText: 'Katze',
    targetText: 'kedi',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Katzen',
    examples: [
      {
        text: 'Die Katze schläft auf dem Sofa.',
        translation: 'Kedi koltukta uyuyor.'
      },
      {
        text: 'Meine Katze ist schwarz.',
        translation: 'Benim kedim siyah.'
      }
    ],
    synonyms: ['Mieze', 'Stubentiger'],
    level: 'A1'
  },
  {
    id: 'de-tr-7',
    sourceText: 'Liebe',
    targetText: 'aşk',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    examples: [
      {
        text: 'Die Liebe ist schön.',
        translation: 'Aşk güzeldir.'
      },
      {
        text: 'Ich spreche über die Liebe.',
        translation: 'Aşk hakkında konuşuyorum.'
      }
    ],
    synonyms: ['Zuneigung', 'Hingabe'],
    level: 'A2'
  },
  {
    id: 'de-tr-8',
    sourceText: 'Mutter',
    targetText: 'anne',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Mütter',
    examples: [
      {
        text: 'Meine Mutter kocht.',
        translation: 'Annem yemek pişiriyor.'
      },
      {
        text: 'Die Mutter liebt ihr Kind.',
        translation: 'Anne çocuğunu seviyor.'
      }
    ],
    synonyms: ['Mama', 'Mutti'],
    level: 'A1'
  },
  {
    id: 'de-tr-9',
    sourceText: 'Nacht',
    targetText: 'gece',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Nächte',
    examples: [
      {
        text: 'Die Nacht ist dunkel.',
        translation: 'Gece karanlık.'
      },
      {
        text: 'Ich arbeite in der Nacht.',
        translation: 'Gece çalışıyorum.'
      }
    ],
    synonyms: ['Dunkelheit', 'Abend'],
    level: 'A1'
  },
  {
    id: 'de-tr-10',
    sourceText: 'Schule',
    targetText: 'okul',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Schulen',
    examples: [
      {
        text: 'Ich gehe zur Schule.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'Die Schule beginnt um 8 Uhr.',
        translation: 'Okul saat 8\'de başlıyor.'
      }
    ],
    synonyms: ['Bildungseinrichtung', 'Lehranstalt'],
    level: 'A1'
  },
  {
    id: 'de-tr-11',
    sourceText: 'Tisch',
    targetText: 'masa',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    plural: 'Tische',
    examples: [
      {
        text: 'Das Buch liegt auf dem Tisch.',
        translation: 'Kitap masanın üzerinde.'
      },
      {
        text: 'Der Tisch ist aus Holz.',
        translation: 'Masa ahşaptan yapılmış.'
      }
    ],
    synonyms: ['Tafel', 'Platte'],
    level: 'A1'
  },
  {
    id: 'de-tr-12',
    sourceText: 'Wasser',
    targetText: 'su',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    examples: [
      {
        text: 'Ich trinke Wasser.',
        translation: 'Su içiyorum.'
      },
      {
        text: 'Das Wasser ist kalt.',
        translation: 'Su soğuk.'
      }
    ],
    synonyms: ['Flüssigkeit', 'H2O'],
    level: 'A1'
  },
  {
    id: 'de-tr-13',
    sourceText: 'Zeit',
    targetText: 'zaman',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    examples: [
      {
        text: 'Ich habe keine Zeit.',
        translation: 'Zamanım yok.'
      },
      {
        text: 'Die Zeit vergeht schnell.',
        translation: 'Zaman hızla geçiyor.'
      }
    ],
    synonyms: ['Dauer', 'Periode'],
    level: 'A1'
  },
  {
    id: 'de-tr-14',
    sourceText: 'gehen',
    targetText: 'gitmek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich gehe zur Schule.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'Wohin gehst du?',
        translation: 'Nereye gidiyorsun?'
      }
    ],
    synonyms: ['laufen', 'spazieren'],
    level: 'A1'
  },
  {
    id: 'de-tr-15',
    sourceText: 'kommen',
    targetText: 'gelmek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich komme aus Deutschland.',
        translation: 'Almanya\'dan geliyorum.'
      },
      {
        text: 'Wann kommst du?',
        translation: 'Ne zaman geliyorsun?'
      }
    ],
    synonyms: ['ankommen', 'eintreffen'],
    level: 'A1'
  },
  
  // Additional German-Turkish entries
  {
    id: 'de-tr-16',
    sourceText: 'Brot',
    targetText: 'ekmek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Brote',
    examples: [
      {
        text: 'Ich kaufe frisches Brot.',
        translation: 'Taze ekmek alıyorum.'
      },
      {
        text: 'Das Brot schmeckt gut.',
        translation: 'Ekmek lezzetli.'
      }
    ],
    synonyms: ['Laib', 'Backware'],
    level: 'A1'
  },
  {
    id: 'de-tr-17',
    sourceText: 'Milch',
    targetText: 'süt',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    examples: [
      {
        text: 'Ich trinke jeden Morgen Milch.',
        translation: 'Her sabah süt içiyorum.'
      },
      {
        text: 'Die Milch ist frisch.',
        translation: 'Süt taze.'
      }
    ],
    synonyms: ['Kuhmilch'],
    level: 'A1'
  },
  {
    id: 'de-tr-18',
    sourceText: 'Freund',
    targetText: 'arkadaş',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    plural: 'Freunde',
    examples: [
      {
        text: 'Er ist mein bester Freund.',
        translation: 'O benim en iyi arkadaşım.'
      },
      {
        text: 'Ich treffe mich mit meinen Freunden.',
        translation: 'Arkadaşlarımla buluşuyorum.'
      }
    ],
    synonyms: ['Kumpel', 'Kamerad'],
    level: 'A1'
  },
  {
    id: 'de-tr-19',
    sourceText: 'Arbeit',
    targetText: 'iş',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    examples: [
      {
        text: 'Ich gehe zur Arbeit.',
        translation: 'İşe gidiyorum.'
      },
      {
        text: 'Die Arbeit ist anstrengend.',
        translation: 'İş yorucu.'
      }
    ],
    synonyms: ['Beschäftigung', 'Tätigkeit'],
    level: 'A1'
  },
  {
    id: 'de-tr-20',
    sourceText: 'Telefon',
    targetText: 'telefon',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Telefone',
    examples: [
      {
        text: 'Mein Telefon klingelt.',
        translation: 'Telefonum çalıyor.'
      },
      {
        text: 'Ich habe ein neues Telefon gekauft.',
        translation: 'Yeni bir telefon satın aldım.'
      }
    ],
    synonyms: ['Handy', 'Mobiltelefon'],
    level: 'A1'
  },
  {
    id: 'de-tr-21',
    sourceText: 'Auto',
    targetText: 'araba',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Autos',
    examples: [
      {
        text: 'Ich fahre mit dem Auto zur Arbeit.',
        translation: 'İşe arabayla gidiyorum.'
      },
      {
        text: 'Das Auto ist rot.',
        translation: 'Araba kırmızı.'
      }
    ],
    synonyms: ['Wagen', 'Fahrzeug'],
    level: 'A1'
  },
  {
    id: 'de-tr-22',
    sourceText: 'Kaffee',
    targetText: 'kahve',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    examples: [
      {
        text: 'Ich trinke jeden Morgen Kaffee.',
        translation: 'Her sabah kahve içiyorum.'
      },
      {
        text: 'Der Kaffee ist heiß.',
        translation: 'Kahve sıcak.'
      }
    ],
    synonyms: ['Mokka', 'Espresso'],
    level: 'A1'
  },
  {
    id: 'de-tr-23',
    sourceText: 'Geld',
    targetText: 'para',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    examples: [
      {
        text: 'Ich habe kein Geld.',
        translation: 'Param yok.'
      },
      {
        text: 'Das Geld liegt auf dem Tisch.',
        translation: 'Para masanın üzerinde.'
      }
    ],
    synonyms: ['Bargeld', 'Währung'],
    level: 'A1'
  },
  {
    id: 'de-tr-24',
    sourceText: 'Uhr',
    targetText: 'saat',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Uhren',
    examples: [
      {
        text: 'Wie spät ist es? Es ist drei Uhr.',
        translation: 'Saat kaç? Saat üç.'
      },
      {
        text: 'Meine Uhr ist kaputt.',
        translation: 'Saatim bozuk.'
      }
    ],
    synonyms: ['Armbanduhr', 'Zeitmesser'],
    level: 'A1'
  },
  {
    id: 'de-tr-25',
    sourceText: 'Fenster',
    targetText: 'pencere',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Fenster',
    examples: [
      {
        text: 'Ich öffne das Fenster.',
        translation: 'Pencereyi açıyorum.'
      },
      {
        text: 'Das Fenster ist schmutzig.',
        translation: 'Pencere kirli.'
      }
    ],
    synonyms: ['Glasfenster', 'Öffnung'],
    level: 'A1'
  },
  {
    id: 'de-tr-26',
    sourceText: 'Tür',
    targetText: 'kapı',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Türen',
    examples: [
      {
        text: 'Bitte schließen Sie die Tür.',
        translation: 'Lütfen kapıyı kapatın.'
      },
      {
        text: 'Die Tür ist offen.',
        translation: 'Kapı açık.'
      }
    ],
    synonyms: ['Eingang', 'Pforte'],
    level: 'A1'
  },
  {
    id: 'de-tr-27',
    sourceText: 'Stuhl',
    targetText: 'sandalye',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'masculine',
    plural: 'Stühle',
    examples: [
      {
        text: 'Ich sitze auf einem Stuhl.',
        translation: 'Bir sandalyede oturuyorum.'
      },
      {
        text: 'Der Stuhl ist bequem.',
        translation: 'Sandalye rahat.'
      }
    ],
    synonyms: ['Sitzgelegenheit', 'Sessel'],
    level: 'A1'
  },
  {
    id: 'de-tr-28',
    sourceText: 'Bett',
    targetText: 'yatak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Betten',
    examples: [
      {
        text: 'Ich schlafe in meinem Bett.',
        translation: 'Yatağımda uyuyorum.'
      },
      {
        text: 'Das Bett ist weich.',
        translation: 'Yatak yumuşak.'
      }
    ],
    synonyms: ['Schlafstätte', 'Liege'],
    level: 'A1'
  },
  {
    id: 'de-tr-29',
    sourceText: 'Küche',
    targetText: 'mutfak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'feminine',
    plural: 'Küchen',
    examples: [
      {
        text: 'Ich koche in der Küche.',
        translation: 'Mutfakta yemek pişiriyorum.'
      },
      {
        text: 'Die Küche ist sauber.',
        translation: 'Mutfak temiz.'
      }
    ],
    synonyms: ['Kochbereich', 'Kochstube'],
    level: 'A1'
  },
  {
    id: 'de-tr-30',
    sourceText: 'Badezimmer',
    targetText: 'banyo',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Substantiv',
    gender: 'neuter',
    plural: 'Badezimmer',
    examples: [
      {
        text: 'Ich dusche im Badezimmer.',
        translation: 'Banyoda duş alıyorum.'
      },
      {
        text: 'Das Badezimmer ist klein.',
        translation: 'Banyo küçük.'
      }
    ],
    synonyms: ['Bad', 'WC'],
    level: 'A1'
  },
  
  // English-Turkish Dictionary Entries
  {
    id: 'en-tr-1',
    sourceText: 'apple',
    targetText: 'elma',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I eat an apple.',
        translation: 'Bir elma yiyorum.'
      },
      {
        text: 'The apple is red.',
        translation: 'Elma kırmızı.'
      }
    ],
    synonyms: ['fruit'],
    level: 'A1'
  },
  {
    id: 'en-tr-2',
    sourceText: 'book',
    targetText: 'kitap',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I read a book.',
        translation: 'Bir kitap okuyorum.'
      },
      {
        text: 'The book is interesting.',
        translation: 'Kitap ilginç.'
      }
    ],
    synonyms: ['volume', 'publication'],
    level: 'A1'
  },
  {
    id: 'en-tr-3',
    sourceText: 'computer',
    targetText: 'bilgisayar',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I work on the computer.',
        translation: 'Bilgisayarda çalışıyorum.'
      },
      {
        text: 'The computer is new.',
        translation: 'Bilgisayar yeni.'
      }
    ],
    synonyms: ['PC', 'laptop'],
    level: 'A1'
  },
  {
    id: 'en-tr-4',
    sourceText: 'dog',
    targetText: 'köpek',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'The dog is barking.',
        translation: 'Köpek havlıyor.'
      },
      {
        text: 'I have a dog.',
        translation: 'Benim bir köpeğim var.'
      }
    ],
    synonyms: ['canine', 'hound', 'pooch'],
    level: 'A1'
  },
  {
    id: 'en-tr-5',
    sourceText: 'house',
    targetText: 'ev',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I live in a house.',
        translation: 'Bir evde yaşıyorum.'
      },
      {
        text: 'The house is big.',
        translation: 'Ev büyük.'
      }
    ],
    synonyms: ['home', 'residence'],
    level: 'A1'
  },
  {
    id: 'en-tr-6',
    sourceText: 'love',
    targetText: 'aşk',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'Love is beautiful.',
        translation: 'Aşk güzeldir.'
      },
      {
        text: 'I talk about love.',
        translation: 'Aşk hakkında konuşuyorum.'
      }
    ],
    synonyms: ['affection', 'adoration'],
    level: 'A2'
  },
  {
    id: 'en-tr-7',
    sourceText: 'mother',
    targetText: 'anne',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'My mother is cooking.',
        translation: 'Annem yemek pişiriyor.'
      },
      {
        text: 'The mother loves her child.',
        translation: 'Anne çocuğunu seviyor.'
      }
    ],
    synonyms: ['mom', 'mama'],
    level: 'A1'
  },
  {
    id: 'en-tr-8',
    sourceText: 'night',
    targetText: 'gece',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'The night is dark.',
        translation: 'Gece karanlık.'
      },
      {
        text: 'I work at night.',
        translation: 'Gece çalışıyorum.'
      }
    ],
    synonyms: ['darkness', 'evening'],
    level: 'A1'
  },
  {
    id: 'en-tr-9',
    sourceText: 'school',
    targetText: 'okul',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I go to school.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'School starts at 8 o\'clock.',
        translation: 'Okul saat 8\'de başlıyor.'
      }
    ],
    synonyms: ['academy', 'educational institution'],
    level: 'A1'
  },
  {
    id: 'en-tr-10',
    sourceText: 'table',
    targetText: 'masa',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'The book is on the table.',
        translation: 'Kitap masanın üzerinde.'
      },
      {
        text: 'The table is made of wood.',
        translation: 'Masa ahşaptan yapılmış.'
      }
    ],
    synonyms: ['desk', 'counter'],
    level: 'A1'
  },
  {
    id: 'en-tr-11',
    sourceText: 'water',
    targetText: 'su',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I drink water.',
        translation: 'Su içiyorum.'
      },
      {
        text: 'The water is cold.',
        translation: 'Su soğuk.'
      }
    ],
    synonyms: ['H2O', 'liquid'],
    level: 'A1'
  },
  {
    id: 'en-tr-12',
    sourceText: 'time',
    targetText: 'zaman',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I have no time.',
        translation: 'Zamanım yok.'
      },
      {
        text: 'Time passes quickly.',
        translation: 'Zaman hızla geçiyor.'
      }
    ],
    synonyms: ['period', 'duration'],
    level: 'A1'
  },
  {
    id: 'en-tr-13',
    sourceText: 'go',
    targetText: 'gitmek',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'verb',
    examples: [
      {
        text: 'I go to school.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'Where are you going?',
        translation: 'Nereye gidiyorsun?'
      }
    ],
    synonyms: ['move', 'travel', 'proceed'],
    level: 'A1'
  },
  {
    id: 'en-tr-14',
    sourceText: 'come',
    targetText: 'gelmek',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'verb',
    examples: [
      {
        text: 'I come from England.',
        translation: 'İngiltere\'den geliyorum.'
      },
      {
        text: 'When are you coming?',
        translation: 'Ne zaman geliyorsun?'
      }
    ],
    synonyms: ['arrive', 'approach'],
    level: 'A1'
  },
  
  // Additional English-Turkish entries
  {
    id: 'en-tr-15',
    sourceText: 'bread',
    targetText: 'ekmek',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I buy fresh bread.',
        translation: 'Taze ekmek alıyorum.'
      },
      {
        text: 'The bread tastes good.',
        translation: 'Ekmek lezzetli.'
      }
    ],
    synonyms: ['loaf', 'baked good'],
    level: 'A1'
  },
  {
    id: 'en-tr-16',
    sourceText: 'milk',
    targetText: 'süt',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I drink milk every morning.',
        translation: 'Her sabah süt içiyorum.'
      },
      {
        text: 'The milk is fresh.',
        translation: 'Süt taze.'
      }
    ],
    synonyms: ['dairy'],
    level: 'A1'
  },
  {
    id: 'en-tr-17',
    sourceText: 'friend',
    targetText: 'arkadaş',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'He is my best friend.',
        translation: 'O benim en iyi arkadaşım.'
      },
      {
        text: 'I meet with my friends.',
        translation: 'Arkadaşlarımla buluşuyorum.'
      }
    ],
    synonyms: ['buddy', 'pal', 'companion'],
    level: 'A1'
  },
  {
    id: 'en-tr-18',
    sourceText: 'work',
    targetText: 'iş',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I go to work.',
        translation: 'İşe gidiyorum.'
      },
      {
        text: 'The work is tiring.',
        translation: 'İş yorucu.'
      }
    ],
    synonyms: ['job', 'employment', 'occupation'],
    level: 'A1'
  },
  {
    id: 'en-tr-19',
    sourceText: 'phone',
    targetText: 'telefon',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'My phone is ringing.',
        translation: 'Telefonum çalıyor.'
      },
      {
        text: 'I bought a new phone.',
        translation: 'Yeni bir telefon satın aldım.'
      }
    ],
    synonyms: ['mobile', 'cell phone'],
    level: 'A1'
  },
  {
    id: 'en-tr-20',
    sourceText: 'car',
    targetText: 'araba',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I drive to work by car.',
        translation: 'İşe arabayla gidiyorum.'
      },
      {
        text: 'The car is red.',
        translation: 'Araba kırmızı.'
      }
    ],
    synonyms: ['automobile', 'vehicle'],
    level: 'A1'
  },
  {
    id: 'en-tr-21',
    sourceText: 'coffee',
    targetText: 'kahve',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I drink coffee every morning.',
        translation: 'Her sabah kahve içiyorum.'
      },
      {
        text: 'The coffee is hot.',
        translation: 'Kahve sıcak.'
      }
    ],
    synonyms: ['java', 'brew'],
    level: 'A1'
  },
  {
    id: 'en-tr-22',
    sourceText: 'money',
    targetText: 'para',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I have no money.',
        translation: 'Param yok.'
      },
      {
        text: 'The money is on the table.',
        translation: 'Para masanın üzerinde.'
      }
    ],
    synonyms: ['cash', 'currency'],
    level: 'A1'
  },
  {
    id: 'en-tr-23',
    sourceText: 'clock',
    targetText: 'saat',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'What time is it? It\'s three o\'clock.',
        translation: 'Saat kaç? Saat üç.'
      },
      {
        text: 'My clock is broken.',
        translation: 'Saatim bozuk.'
      }
    ],
    synonyms: ['timepiece', 'watch'],
    level: 'A1'
  },
  {
    id: 'en-tr-24',
    sourceText: 'window',
    targetText: 'pencere',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'I open the window.',
        translation: 'Pencereyi açıyorum.'
      },
      {
        text: 'The window is dirty.',
        translation: 'Pencere kirli.'
      }
    ],
    synonyms: ['pane', 'opening'],
    level: 'A1'
  },
  {
    id: 'en-tr-25',
    sourceText: 'door',
    targetText: 'kapı',
    sourceLanguage: 'en',
    targetLanguage: 'tr',
    partOfSpeech: 'noun',
    examples: [
      {
        text: 'Please close the door.',
        translation: 'Lütfen kapıyı kapatın.'
      },
      {
        text: 'The door is open.',
        translation: 'Kapı açık.'
      }
    ],
    synonyms: ['entrance', 'gateway'],
    level: 'A1'
  },
  
  // French-Turkish Dictionary Entries
  {
    id: 'fr-tr-1',
    sourceText: 'pomme',
    targetText: 'elma',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'Je mange une pomme.',
        translation: 'Bir elma yiyorum.'
      },
      {
        text: 'La pomme est rouge.',
        translation: 'Elma kırmızı.'
      }
    ],
    synonyms: ['fruit'],
    level: 'A1'
  },
  {
    id: 'fr-tr-2',
    sourceText: 'livre',
    targetText: 'kitap',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Je lis un livre.',
        translation: 'Bir kitap okuyorum.'
      },
      {
        text: 'Le livre est intéressant.',
        translation: 'Kitap ilginç.'
      }
    ],
    synonyms: ['ouvrage', 'bouquin'],
    level: 'A1'
  },
  {
    id: 'fr-tr-3',
    sourceText: 'ordinateur',
    targetText: 'bilgisayar',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Je travaille sur l\'ordinateur.',
        translation: 'Bilgisayarda çalışıyorum.'
      },
      {
        text: 'L\'ordinateur est nouveau.',
        translation: 'Bilgisayar yeni.'
      }
    ],
    synonyms: ['PC', 'machine'],
    level: 'A1'
  },
  {
    id: 'fr-tr-4',
    sourceText: 'chien',
    targetText: 'köpek',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Le chien aboie.',
        translation: 'Köpek havlıyor.'
      },
      {
        text: "J'ai un chien.",
        translation: 'Benim bir köpeğim var.'
      }
    ],
    synonyms: ['toutou', 'cabot'],
    level: 'A1'
  },
  {
    id: 'fr-tr-5',
    sourceText: 'maison',
    targetText: 'ev',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'J\'habite dans une maison.',
        translation: 'Bir evde yaşıyorum.'
      },
      {
        text: 'La maison est grande.',
        translation: 'Ev büyük.'
      }
    ],
    synonyms: ['demeure', 'habitation'],
    level: 'A1'
  },
  {
    id: 'fr-tr-6',
    sourceText: 'amour',
    targetText: 'aşk',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'L\'amour est beau.',
        translation: 'Aşk güzeldir.'
      },
      {
        text: 'Je parle d\'amour.',
        translation: 'Aşk hakkında konuşuyorum.'
      }
    ],
    synonyms: ['affection', 'passion'],
    level: 'A2'
  },
  {
    id: 'fr-tr-7',
    sourceText: 'mère',
    targetText: 'anne',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'Ma mère cuisine.',
        translation: 'Annem yemek pişiriyor.'
      },
      {
        text: 'La mère aime son enfant.',
        translation: 'Anne çocuğunu seviyor.'
      }
    ],
    synonyms: ['maman'],
    level: 'A1'
  },
  {
    id: 'fr-tr-8',
    sourceText: 'nuit',
    targetText: 'gece',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'La nuit est sombre.',
        translation: 'Gece karanlık.'
      },
      {
        text: 'Je travaille la nuit.',
        translation: 'Gece çalışıyorum.'
      }
    ],
    synonyms: ['obscurité', 'soir'],
    level: 'A1'
  },
  {
    id: 'fr-tr-9',
    sourceText: 'école',
    targetText: 'okul',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'Je vais à l\'école.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'L\'école commence à 8 heures.',
        translation: 'Okul saat 8\'de başlıyor.'
      }
    ],
    synonyms: ['établissement scolaire', 'institution'],
    level: 'A1'
  },
  {
    id: 'fr-tr-10',
    sourceText: 'table',
    targetText: 'masa',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'Le livre est sur la table.',
        translation: 'Kitap masanın üzerinde.'
      },
      {
        text: 'La table est en bois.',
        translation: 'Masa ahşaptan yapılmış.'
      }
    ],
    synonyms: ['bureau', 'comptoir'],
    level: 'A1'
  },
  {
    id: 'fr-tr-11',
    sourceText: 'eau',
    targetText: 'su',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'Je bois de l\'eau.',
        translation: 'Su içiyorum.'
      },
      {
        text: 'L\'eau est froide.',
        translation: 'Su soğuk.'
      }
    ],
    synonyms: ['liquide', 'H2O'],
    level: 'A1'
  },
  {
    id: 'fr-tr-12',
    sourceText: 'temps',
    targetText: 'zaman',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Je n\'ai pas de temps.',
        translation: 'Zamanım yok.'
      },
      {
        text: 'Le temps passe vite.',
        translation: 'Zaman hızla geçiyor.'
      }
    ],
    synonyms: ['période', 'durée'],
    level: 'A1'
  },
  {
    id: 'fr-tr-13',
    sourceText: 'aller',
    targetText: 'gitmek',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'verbe',
    examples: [
      {
        text: "Je vais à l'école.",
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'Où vas-tu?',
        translation: 'Nereye gidiyorsun?'
      }
    ],
    synonyms: ['se rendre', 'se déplacer'],
    level: 'A1'
  },
  {
    id: 'fr-tr-14',
    sourceText: 'venir',
    targetText: 'gelmek',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'verbe',
    examples: [
      {
        text: 'Je viens de France.',
        translation: 'Fransa\'dan geliyorum.'
      },
      {
        text: 'Quand viens-tu?',
        translation: 'Ne zaman geliyorsun?'
      }
    ],
    synonyms: ['arriver', 'approcher'],
    level: 'A1'
  },
  
  // Additional French-Turkish entries
  {
    id: 'fr-tr-15',
    sourceText: 'pain',
    targetText: 'ekmek',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'J\'achète du pain frais.',
        translation: 'Taze ekmek alıyorum.'
      },
      {
        text: 'Le pain est bon.',
        translation: 'Ekmek lezzetli.'
      }
    ],
    synonyms: ['baguette', 'miche'],
    level: 'A1'
  },
  {
    id: 'fr-tr-16',
    sourceText: 'lait',
    targetText: 'süt',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Je bois du lait tous les matins.',
        translation: 'Her sabah süt içiyorum.'
      },
      {
        text: 'Le lait est frais.',
        translation: 'Süt taze.'
      }
    ],
    synonyms: ['produit laitier'],
    level: 'A1'
  },
  {
    id: 'fr-tr-17',
    sourceText: 'ami',
    targetText: 'arkadaş',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Il est mon meilleur ami.',
        translation: 'O benim en iyi arkadaşım.'
      },
      {
        text: 'Je rencontre mes amis.',
        translation: 'Arkadaşlarımla buluşuyorum.'
      }
    ],
    synonyms: ['copain', 'camarade'],
    level: 'A1'
  },
  {
    id: 'fr-tr-18',
    sourceText: 'travail',
    targetText: 'iş',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Je vais au travail.',
        translation: 'İşe gidiyorum.'
      },
      {
        text: 'Le travail est fatigant.',
        translation: 'İş yorucu.'
      }
    ],
    synonyms: ['emploi', 'occupation'],
    level: 'A1'
  },
  {
    id: 'fr-tr-19',
    sourceText: 'téléphone',
    targetText: 'telefon',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'masculine',
    examples: [
      {
        text: 'Mon téléphone sonne.',
        translation: 'Telefonum çalıyor.'
      },
      {
        text: 'J\'ai acheté un nouveau téléphone.',
        translation: 'Yeni bir telefon satın aldım.'
      }
    ],
    synonyms: ['portable', 'mobile'],
    level: 'A1'
  },
  {
    id: 'fr-tr-20',
    sourceText: 'voiture',
    targetText: 'araba',
    sourceLanguage: 'fr',
    targetLanguage: 'tr',
    partOfSpeech: 'nom',
    gender: 'feminine',
    examples: [
      {
        text: 'Je vais au travail en voiture.',
        translation: 'İşe arabayla gidiyorum.'
      },
      {
        text: 'La voiture est rouge.',
        translation: 'Araba kırmızı.'
      }
    ],
    synonyms: ['automobile', 'véhicule'],
    level: 'A1'
  },
  
  // Spanish-Turkish Dictionary Entries
  {
    id: 'es-tr-1',
    sourceText: 'manzana',
    targetText: 'elma',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Como una manzana.',
        translation: 'Bir elma yiyorum.'
      },
      {
        text: 'La manzana es roja.',
        translation: 'Elma kırmızı.'
      }
    ],
    synonyms: ['fruta'],
    level: 'A1'
  },
  {
    id: 'es-tr-2',
    sourceText: 'libro',
    targetText: 'kitap',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Leo un libro.',
        translation: 'Bir kitap okuyorum.'
      },
      {
        text: 'El libro es interesante.',
        translation: 'Kitap ilginç.'
      }
    ],
    synonyms: ['volumen', 'obra'],
    level: 'A1'
  },
  {
    id: 'es-tr-3',
    sourceText: 'ordenador',
    targetText: 'bilgisayar',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Trabajo en el ordenador.',
        translation: 'Bilgisayarda çalışıyorum.'
      },
      {
        text: 'El ordenador es nuevo.',
        translation: 'Bilgisayar yeni.'
      }
    ],
    synonyms: ['computadora', 'PC'],
    level: 'A1'
  },
  {
    id: 'es-tr-4',
    sourceText: 'perro',
    targetText: 'köpek',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'El perro ladra.',
        translation: 'Köpek havlıyor.'
      },
      {
        text: 'Tengo un perro.',
        translation: 'Benim bir köpeğim var.'
      }
    ],
    synonyms: ['can', 'chucho'],
    level: 'A1'
  },
  {
    id: 'es-tr-5',
    sourceText: 'casa',
    targetText: 'ev',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Vivo en una casa.',
        translation: 'Bir evde yaşıyorum.'
      },
      {
        text: 'La casa es grande.',
        translation: 'Ev büyük.'
      }
    ],
    synonyms: ['hogar', 'vivienda'],
    level: 'A1'
  },
  {
    id: 'es-tr-6',
    sourceText: 'amor',
    targetText: 'aşk',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'El amor es hermoso.',
        translation: 'Aşk güzeldir.'
      },
      {
        text: 'Hablo de amor.',
        translation: 'Aşk hakkında konuşuyorum.'
      }
    ],
    synonyms: ['cariño', 'afecto'],
    level: 'A2'
  },
  {
    id: 'es-tr-7',
    sourceText: 'madre',
    targetText: 'anne',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Mi madre cocina.',
        translation: 'Annem yemek pişiriyor.'
      },
      {
        text: 'La madre ama a su hijo.',
        translation: 'Anne çocuğunu seviyor.'
      }
    ],
    synonyms: ['mamá', 'progenitora'],
    level: 'A1'
  },
  {
    id: 'es-tr-8',
    sourceText: 'noche',
    targetText: 'gece',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'La noche es oscura.',
        translation: 'Gece karanlık.'
      },
      {
        text: 'Trabajo por la noche.',
        translation: 'Gece çalışıyorum.'
      }
    ],
    synonyms: ['oscuridad', 'anochecer'],
    level: 'A1'
  },
  {
    id: 'es-tr-9',
    sourceText: 'escuela',
    targetText: 'okul',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Voy a la escuela.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'La escuela comienza a las 8.',
        translation: 'Okul saat 8\'de başlıyor.'
      }
    ],
    synonyms: ['colegio', 'centro educativo'],
    level: 'A1'
  },
  {
    id: 'es-tr-10',
    sourceText: 'mesa',
    targetText: 'masa',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'El libro está sobre la mesa.',
        translation: 'Kitap masanın üzerinde.'
      },
      {
        text: 'La mesa es de madera.',
        translation: 'Masa ahşaptan yapılmış.'
      }
    ],
    synonyms: ['escritorio', 'tablero'],
    level: 'A1'
  },
  {
    id: 'es-tr-11',
    sourceText: 'agua',
    targetText: 'su',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Bebo agua.',
        translation: 'Su içiyorum.'
      },
      {
        text: 'El agua está fría.',
        translation: 'Su soğuk.'
      }
    ],
    synonyms: ['líquido', 'H2O'],
    level: 'A1'
  },
  {
    id: 'es-tr-12',
    sourceText: 'tiempo',
    targetText: 'zaman',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'No tengo tiempo.',
        translation: 'Zamanım yok.'
      },
      {
        text: 'El tiempo pasa rápido.',
        translation: 'Zaman hızla geçiyor.'
      }
    ],
    synonyms: ['período', 'duración'],
    level: 'A1'
  },
  {
    id: 'es-tr-13',
    sourceText: 'ir',
    targetText: 'gitmek',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'verbo',
    examples: [
      {
        text: 'Voy a la escuela.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: '¿Adónde vas?',
        translation: 'Nereye gidiyorsun?'
      }
    ],
    synonyms: ['marchar', 'dirigirse'],
    level: 'A1'
  },
  {
    id: 'es-tr-14',
    sourceText: 'venir',
    targetText: 'gelmek',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'verbo',
    examples: [
      {
        text: 'Vengo de España.',
        translation: 'İspanya\'dan geliyorum.'
      },
      {
        text: '¿Cuándo vienes?',
        translation: 'Ne zaman geliyorsun?'
      }
    ],
    synonyms: ['llegar', 'acercarse'],
    level: 'A1'
  },
  
  // Additional Spanish-Turkish entries
  {
    id: 'es-tr-15',
    sourceText: 'pan',
    targetText: 'ekmek',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Compro pan fresco.',
        translation: 'Taze ekmek alıyorum.'
      },
      {
        text: 'El pan está bueno.',
        translation: 'Ekmek lezzetli.'
      }
    ],
    synonyms: ['hogaza', 'barra'],
    level: 'A1'
  },
  {
    id: 'es-tr-16',
    sourceText: 'leche',
    targetText: 'süt',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Bebo leche todas las mañanas.',
        translation: 'Her sabah süt içiyorum.'
      },
      {
        text: 'La leche está fresca.',
        translation: 'Süt taze.'
      }
    ],
    synonyms: ['lácteo'],
    level: 'A1'
  },
  {
    id: 'es-tr-17',
    sourceText: 'amigo',
    targetText: 'arkadaş',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Él es mi mejor amigo.',
        translation: 'O benim en iyi arkadaşım.'
      },
      {
        text: 'Me reúno con mis amigos.',
        translation: 'Arkadaşlarımla buluşuyorum.'
      }
    ],
    synonyms: ['compañero', 'colega'],
    level: 'A1'
  },
  {
    id: 'es-tr-18',
    sourceText: 'trabajo',
    targetText: 'iş',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Voy al trabajo.',
        translation: 'İşe gidiyorum.'
      },
      {
        text: 'El trabajo es cansado.',
        translation: 'İş yorucu.'
      }
    ],
    synonyms: ['empleo', 'ocupación'],
    level: 'A1'
  },
  {
    id: 'es-tr-19',
    sourceText: 'teléfono',
    targetText: 'telefon',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Mi teléfono está sonando.',
        translation: 'Telefonum çalıyor.'
      },
      {
        text: 'He comprado un teléfono nuevo.',
        translation: 'Yeni bir telefon satın aldım.'
      }
    ],
    synonyms: ['móvil', 'celular'],
    level: 'A1'
  },
  {
    id: 'es-tr-20',
    sourceText: 'coche',
    targetText: 'araba',
    sourceLanguage: 'es',
    targetLanguage: 'tr',
    partOfSpeech: 'sustantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Voy al trabajo en coche.',
        translation: 'İşe arabayla gidiyorum.'
      },
      {
        text: 'El coche es rojo.',
        translation: 'Araba kırmızı.'
      }
    ],
    synonyms: ['automóvil', 'vehículo'],
    level: 'A1'
  },
  
  // Italian-Turkish Dictionary Entries
  {
    id: 'it-tr-1',
    sourceText: 'mela',
    targetText: 'elma',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Mangio una mela.',
        translation: 'Bir elma yiyorum.'
      },
      {
        text: 'La mela è rossa.',
        translation: 'Elma kırmızı.'
      }
    ],
    synonyms: ['frutto'],
    level: 'A1'
  },
  {
    id: 'it-tr-2',
    sourceText: 'libro',
    targetText: 'kitap',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Leggo un libro.',
        translation: 'Bir kitap okuyorum.'
      },
      {
        text: 'Il libro è interessante.',
        translation: 'Kitap ilginç.'
      }
    ],
    synonyms: ['volume', 'opera'],
    level: 'A1'
  },
  {
    id: 'it-tr-3',
    sourceText: 'computer',
    targetText: 'bilgisayar',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Lavoro al computer.',
        translation: 'Bilgisayarda çalışıyorum.'
      },
      {
        text: 'Il computer è nuovo.',
        translation: 'Bilgisayar yeni.'
      }
    ],
    synonyms: ['PC', 'calcolatore'],
    level: 'A1'
  },
  {
    id: 'it-tr-4',
    sourceText: 'cane',
    targetText: 'köpek',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Il cane abbaia.',
        translation: 'Köpek havlıyor.'
      },
      {
        text: 'Ho un cane.',
        translation: 'Benim bir köpeğim var.'
      }
    ],
    synonyms: ['fido', 'quattrozampe'],
    level: 'A1'
  },
  {
    id: 'it-tr-5',
    sourceText: 'casa',
    targetText: 'ev',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Vivo in una casa.',
        translation: 'Bir evde yaşıyorum.'
      },
      {
        text: 'La casa è grande.',
        translation: 'Ev büyük.'
      }
    ],
    synonyms: ['abitazione', 'dimora'],
    level: 'A1'
  },
  {
    id: 'it-tr-6',
    sourceText: 'amore',
    targetText: 'aşk',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'L\'amore è bello.',
        translation: 'Aşk güzeldir.'
      },
      {
        text: 'Parlo d\'amore.',
        translation: 'Aşk hakkında konuşuyorum.'
      }
    ],
    synonyms: ['affetto', 'passione'],
    level: 'A2'
  },
  {
    id: 'it-tr-7',
    sourceText: 'madre',
    targetText: 'anne',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Mia madre cucina.',
        translation: 'Annem yemek pişiriyor.'
      },
      {
        text: 'La madre ama suo figlio.',
        translation: 'Anne çocuğunu seviyor.'
      }
    ],
    synonyms: ['mamma', 'genitrice'],
    level: 'A1'
  },
  {
    id: 'it-tr-8',
    sourceText: 'notte',
    targetText: 'gece',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'La notte è buia.',
        translation: 'Gece karanlık.'
      },
      {
        text: 'Lavoro di notte.',
        translation: 'Gece çalışıyorum.'
      }
    ],
    synonyms: ['buio', 'sera'],
    level: 'A1'
  },
  {
    id: 'it-tr-9',
    sourceText: 'scuola',
    targetText: 'okul',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Vado a scuola.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'La scuola inizia alle 8.',
        translation: 'Okul saat 8\'de başlıyor.'
      }
    ],
    synonyms: ['istituto', 'centro educativo'],
    level: 'A1'
  },
  {
    id: 'it-tr-10',
    sourceText: 'tavolo',
    targetText: 'masa',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Il libro è sul tavolo.',
        translation: 'Kitap masanın üzerinde.'
      },
      {
        text: 'Il tavolo è di legno.',
        translation: 'Masa ahşaptan yapılmış.'
      }
    ],
    synonyms: ['scrivania', 'banco'],
    level: 'A1'
  },
  {
    id: 'it-tr-11',
    sourceText: 'acqua',
    targetText: 'su',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Bevo acqua.',
        translation: 'Su içiyorum.'
      },
      {
        text: 'L\'acqua è fredda.',
        translation: 'Su soğuk.'
      }
    ],
    synonyms: ['liquido', 'H2O'],
    level: 'A1'
  },
  {
    id: 'it-tr-12',
    sourceText: 'tempo',
    targetText: 'zaman',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Non ho tempo.',
        translation: 'Zamanım yok.'
      },
      {
        text: 'Il tempo passa velocemente.',
        translation: 'Zaman hızla geçiyor.'
      }
    ],
    synonyms: ['periodo', 'durata'],
    level: 'A1'
  },
  {
    id: 'it-tr-13',
    sourceText: 'andare',
    targetText: 'gitmek',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'verbo',
    examples: [
      {
        text: 'Vado a scuola.',
        translation: 'Okula gidiyorum.'
      },
      {
        text: 'Dove vai?',
        translation: 'Nereye gidiyorsun?'
      }
    ],
    synonyms: ['recarsi', 'dirigersi'],
    level: 'A1'
  },
  {
    id: 'it-tr-14',
    sourceText: 'venire',
    targetText: 'gelmek',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'verbo',
    examples: [
      {
        text: 'Vengo dall\'Italia.',
        translation: 'İtalya\'dan geliyorum.'
      },
      {
        text: 'Quando vieni?',
        translation: 'Ne zaman geliyorsun?'
      }
    ],
    synonyms: ['arrivare', 'giungere'],
    level: 'A1'
  },
  
  // Additional Italian-Turkish entries
  {
    id: 'it-tr-15',
    sourceText: 'pane',
    targetText: 'ekmek',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Compro pane fresco.',
        translation: 'Taze ekmek alıyorum.'
      },
      {
        text: 'Il pane è buono.',
        translation: 'Ekmek lezzetli.'
      }
    ],
    synonyms: ['filone', 'pagnotta'],
    level: 'A1'
  },
  {
    id: 'it-tr-16',
    sourceText: 'latte',
    targetText: 'süt',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Bevo latte ogni mattina.',
        translation: 'Her sabah süt içiyorum.'
      },
      {
        text: 'Il latte è fresco.',
        translation: 'Süt taze.'
      }
    ],
    synonyms: ['latticino'],
    level: 'A1'
  },
  {
    id: 'it-tr-17',
    sourceText: 'amico',
    targetText: 'arkadaş',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Lui è il mio migliore amico.',
        translation: 'O benim en iyi arkadaşım.'
      },
      {
        text: 'Incontro i miei amici.',
        translation: 'Arkadaşlarımla buluşuyorum.'
      }
    ],
    synonyms: ['compagno', 'collega'],
    level: 'A1'
  },
  {
    id: 'it-tr-18',
    sourceText: 'lavoro',
    targetText: 'iş',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Vado al lavoro.',
        translation: 'İşe gidiyorum.'
      },
      {
        text: 'Il lavoro è stancante.',
        translation: 'İş yorucu.'
      }
    ],
    synonyms: ['impiego', 'occupazione'],
    level: 'A1'
  },
  {
    id: 'it-tr-19',
    sourceText: 'telefono',
    targetText: 'telefon',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'masculine',
    examples: [
      {
        text: 'Il mio telefono sta suonando.',
        translation: 'Telefonum çalıyor.'
      },
      {
        text: 'Ho comprato un nuovo telefono.',
        translation: 'Yeni bir telefon satın aldım.'
      }
    ],
    synonyms: ['cellulare', 'mobile'],
    level: 'A1'
  },
  {
    id: 'it-tr-20',
    sourceText: 'macchina',
    targetText: 'araba',
    sourceLanguage: 'it',
    targetLanguage: 'tr',
    partOfSpeech: 'sostantivo',
    gender: 'feminine',
    examples: [
      {
        text: 'Vado al lavoro in macchina.',
        translation: 'İşe arabayla gidiyorum.'
      },
      {
        text: 'La macchina è rossa.',
        translation: 'Araba kırmızı.'
      }
    ],
    synonyms: ['automobile', 'auto'],
    level: 'A1'
  },
  
  // Additional German-Turkish verbs
  {
    id: 'de-tr-31',
    sourceText: 'essen',
    targetText: 'yemek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich esse ein Sandwich.',
        translation: 'Bir sandviç yiyorum.'
      },
      {
        text: 'Was isst du zum Frühstück?',
        translation: 'Kahvaltıda ne yiyorsun?'
      }
    ],
    synonyms: ['speisen', 'verzehren'],
    level: 'A1'
  },
  {
    id: 'de-tr-32',
    sourceText: 'trinken',
    targetText: 'içmek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich trinke Kaffee.',
        translation: 'Kahve içiyorum.'
      },
      {
        text: 'Was möchtest du trinken?',
        translation: 'Ne içmek istersin?'
      }
    ],
    synonyms: ['schlürfen', 'nippen'],
    level: 'A1'
  },
  {
    id: 'de-tr-33',
    sourceText: 'schlafen',
    targetText: 'uyumak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich schlafe acht Stunden pro Nacht.',
        translation: 'Gecede sekiz saat uyuyorum.'
      },
      {
        text: 'Das Kind schläft.',
        translation: 'Çocuk uyuyor.'
      }
    ],
    synonyms: ['ruhen', 'schlummern'],
    level: 'A1'
  },
  {
    id: 'de-tr-34',
    sourceText: 'arbeiten',
    targetText: 'çalışmak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich arbeite in einem Büro.',
        translation: 'Bir ofiste çalışıyorum.'
      },
      {
        text: 'Er arbeitet viel.',
        translation: 'O çok çalışıyor.'
      }
    ],
    synonyms: ['tätig sein', 'schaffen'],
    level: 'A1'
  },
  {
    id: 'de-tr-35',
    sourceText: 'spielen',
    targetText: 'oynamak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Die Kinder spielen im Garten.',
        translation: 'Çocuklar bahçede oynuyor.'
      },
      {
        text: 'Ich spiele Klavier.',
        translation: 'Piyano çalıyorum.'
      }
    ],
    synonyms: ['sich vergnügen', 'tollen'],
    level: 'A1'
  },
  {
    id: 'de-tr-36',
    sourceText: 'lernen',
    targetText: 'öğrenmek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich lerne Deutsch.',
        translation: 'Almanca öğreniyorum.'
      },
      {
        text: 'Sie lernt schnell.',
        translation: 'O hızlı öğreniyor.'
      }
    ],
    synonyms: ['studieren', 'sich aneignen'],
    level: 'A1'
  },
  {
    id: 'de-tr-37',
    sourceText: 'lesen',
    targetText: 'okumak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich lese ein Buch.',
        translation: 'Bir kitap okuyorum.'
      },
      {
        text: 'Er liest die Zeitung.',
        translation: 'O gazete okuyor.'
      }
    ],
    synonyms: ['durchlesen', 'schmökern'],
    level: 'A1'
  },
  {
    id: 'de-tr-38',
    sourceText: 'schreiben',
    targetText: 'yazmak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich schreibe einen Brief.',
        translation: 'Bir mektup yazıyorum.'
      },
      {
        text: 'Sie schreibt einen Roman.',
        translation: 'O bir roman yazıyor.'
      }
    ],
    synonyms: ['verfassen', 'notieren'],
    level: 'A1'
  },
  {
    id: 'de-tr-39',
    sourceText: 'hören',
    targetText: 'duymak',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich höre Musik.',
        translation: 'Müzik dinliyorum.'
      },
      {
        text: 'Hörst du das?',
        translation: 'Bunu duyuyor musun?'
      }
    ],
    synonyms: ['lauschen', 'vernehmen'],
    level: 'A1'
  },
  {
    id: 'de-tr-40',
    sourceText: 'sehen',
    targetText: 'görmek',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Verb',
    examples: [
      {
        text: 'Ich sehe einen Vogel.',
        translation: 'Bir kuş görüyorum.'
      },
      {
        text: 'Siehst du das Haus?',
        translation: 'Evi görüyor musun?'
      }
    ],
    synonyms: ['erblicken', 'wahrnehmen'],
    level: 'A1'
  },
  
  // Additional German-Turkish adjectives
  {
    id: 'de-tr-41',
    sourceText: 'gut',
    targetText: 'iyi',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das Essen ist gut.',
        translation: 'Yemek iyi.'
      },
      {
        text: 'Er ist ein guter Freund.',
        translation: 'O iyi bir arkadaş.'
      }
    ],
    synonyms: ['prima', 'toll'],
    level: 'A1'
  },
  {
    id: 'de-tr-42',
    sourceText: 'schlecht',
    targetText: 'kötü',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das Wetter ist schlecht.',
        translation: 'Hava kötü.'
      },
      {
        text: 'Ich fühle mich schlecht.',
        translation: 'Kendimi kötü hissediyorum.'
      }
    ],
    synonyms: ['übel', 'miserabel'],
    level: 'A1'
  },
  {
    id: 'de-tr-43',
    sourceText: 'groß',
    targetText: 'büyük',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das ist ein großes Haus.',
        translation: 'Bu büyük bir ev.'
      },
      {
        text: 'Er ist groß.',
        translation: 'O uzun boylu.'
      }
    ],
    synonyms: ['riesig', 'umfangreich'],
    level: 'A1'
  },
  {
    id: 'de-tr-44',
    sourceText: 'klein',
    targetText: 'küçük',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das ist ein kleines Auto.',
        translation: 'Bu küçük bir araba.'
      },
      {
        text: 'Die Katze ist klein.',
        translation: 'Kedi küçük.'
      }
    ],
    synonyms: ['winzig', 'gering'],
    level: 'A1'
  },
  {
    id: 'de-tr-45',
    sourceText: 'alt',
    targetText: 'yaşlı',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Mein Großvater ist alt.',
        translation: 'Büyükbabam yaşlı.'
      },
      {
        text: 'Das ist ein altes Gebäude.',
        translation: 'Bu eski bir bina.'
      }
    ],
    synonyms: ['betagt', 'bejahrt'],
    level: 'A1'
  },
  {
    id: 'de-tr-46',
    sourceText: 'jung',
    targetText: 'genç',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Sie ist jung.',
        translation: 'O genç.'
      },
      {
        text: 'Das sind junge Leute.',
        translation: 'Bunlar genç insanlar.'
      }
    ],
    synonyms: ['jugendlich', 'frisch'],
    level: 'A1'
  },
  {
    id: 'de-tr-47',
    sourceText: 'schön',
    targetText: 'güzel',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das ist ein schönes Kleid.',
        translation: 'Bu güzel bir elbise.'
      },
      {
        text: 'Der Park ist schön.',
        translation: 'Park güzel.'
      }
    ],
    synonyms: ['hübsch', 'attraktiv'],
    level: 'A1'
  },
  {
    id: 'de-tr-48',
    sourceText: 'hässlich',
    targetText: 'çirkin',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das ist ein hässliches Gebäude.',
        translation: 'Bu çirkin bir bina.'
      },
      {
        text: 'Der Film war hässlich.',
        translation: 'Film çirkindi.'
      }
    ],
    synonyms: ['unschön', 'unansehnlich'],
    level: 'A1'
  },
  {
    id: 'de-tr-49',
    sourceText: 'schnell',
    targetText: 'hızlı',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Das Auto ist schnell.',
        translation: 'Araba hızlı.'
      },
      {
        text: 'Er läuft schnell.',
        translation: 'O hızlı koşuyor.'
      }
    ],
    synonyms: ['rasch', 'flink'],
    level: 'A1'
  },
  {
    id: 'de-tr-50',
    sourceText: 'langsam',
    targetText: 'yavaş',
    sourceLanguage: 'de',
    targetLanguage: 'tr',
    partOfSpeech: 'Adjektiv',
    examples: [
      {
        text: 'Die Schildkröte ist langsam.',
        translation: 'Kaplumbağa yavaş.'
      },
      {
        text: 'Bitte sprich langsam.',
        translation: 'Lütfen yavaş konuş.'
      }
    ],
    synonyms: ['gemächlich', 'träge'],
    level: 'A1'
  }
];