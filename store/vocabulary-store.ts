import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VocabularyList, VocabularyWord, VocabularyStore, SubtitleEntry, ImportedSubtitle, Word } from '@/types/vocabulary';
import { useSettingsStore } from './settings-store';

// Helper function to extract words from subtitles
const extractWordsFromSubtitles = (subtitles: SubtitleEntry[]): string[] => {
  const allWords = subtitles
    .map(entry => entry.text
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1)
      .map(word => word.toLowerCase())
    )
    .flat();
  
  // Remove duplicates
  return [...new Set(allWords)];
};

// Sample translations for demo purposes
const sampleTranslations = {
  'haus': 'Ev',
  'schule': 'Okul',
  'freund': 'Arkadaş',
  'buch': 'Kitap',
  'wasser': 'Su',
  'mann': 'Adam',
  'frau': 'Kadın',
  'kind': 'Çocuk',
  'auto': 'Araba',
  'hund': 'Köpek',
  'katze': 'Kedi',
  'stadt': 'Şehir',
  'land': 'Ülke',
  'essen': 'Yemek',
  'trinken': 'İçmek',
  'gehen': 'Gitmek',
  'kommen': 'Gelmek',
  'sehen': 'Görmek',
  'hören': 'Duymak',
  'sprechen': 'Konuşmak',
  'lernen': 'Öğrenmek',
  'arbeiten': 'Çalışmak',
  'spielen': 'Oynamak',
  'lesen': 'Okumak',
  'schreiben': 'Yazmak',
  'verstehen': 'Anlamak',
  'wissen': 'Bilmek',
  'denken': 'Düşünmek',
  'fühlen': 'Hissetmek',
  'lieben': 'Sevmek',
  'hassen': 'Nefret etmek',
  'leben': 'Yaşamak',
  'sterben': 'Ölmek',
  'zeit': 'Zaman',
  'tag': 'Gün',
  'nacht': 'Gece',
  'morgen': 'Sabah',
  'abend': 'Akşam',
  'heute': 'Bugün',
  'gestern': 'Dün',
  'morgen': 'Yarın',
  'jahr': 'Yıl',
  'monat': 'Ay',
  'woche': 'Hafta',
  'stunde': 'Saat',
  'minute': 'Dakika',
  'sekunde': 'Saniye',
  'farbe': 'Renk',
  'rot': 'Kırmızı',
  'blau': 'Mavi',
  'grün': 'Yeşil',
  'gelb': 'Sarı',
  'schwarz': 'Siyah',
  'weiß': 'Beyaz',
  'groß': 'Büyük',
  'klein': 'Küçük',
  'alt': 'Yaşlı',
  'jung': 'Genç',
  'neu': 'Yeni',
  'gut': 'İyi',
  'schlecht': 'Kötü',
  'schön': 'Güzel',
  'hässlich': 'Çirkin',
  'schnell': 'Hızlı',
  'langsam': 'Yavaş',
  'leicht': 'Kolay',
  'schwer': 'Zor',
  'hoch': 'Yüksek',
  'niedrig': 'Alçak',
  'weit': 'Uzak',
  'nah': 'Yakın',
  'viel': 'Çok',
  'wenig': 'Az',
  'alle': 'Hepsi',
  'einige': 'Bazıları',
  'niemand': 'Hiç kimse',
  'jemand': 'Birisi',
  'etwas': 'Bir şey',
  'nichts': 'Hiçbir şey',
  'immer': 'Her zaman',
  'nie': 'Asla',
  'oft': 'Sık sık',
  'selten': 'Nadiren',
  'manchmal': 'Bazen',
  'jetzt': 'Şimdi',
  'später': 'Sonra',
  'früher': 'Önce',
  'hier': 'Burada',
  'dort': 'Orada',
  'oben': 'Yukarıda',
  'unten': 'Aşağıda',
  'links': 'Solda',
  'rechts': 'Sağda',
  'innen': 'İçeride',
  'außen': 'Dışarıda',
  'ja': 'Evet',
  'nein': 'Hayır',
  'vielleicht': 'Belki',
  'warum': 'Neden',
  'wie': 'Nasıl',
  'wo': 'Nerede',
  'wann': 'Ne zaman',
  'wer': 'Kim',
  'was': 'Ne',
  'welche': 'Hangi',
  'dieser': 'Bu',
  'jener': 'Şu',
  'mein': 'Benim',
  'dein': 'Senin',
  'sein': 'Onun',
  'ihr': 'Onun',
  'unser': 'Bizim',
  'euer': 'Sizin',
  'ihr': 'Onların',
  'ich': 'Ben',
  'du': 'Sen',
  'er': 'O',
  'sie': 'O',
  'es': 'O',
  'wir': 'Biz',
  'ihr': 'Siz',
  'sie': 'Onlar',
  'und': 'Ve',
  'oder': 'Veya',
  'aber': 'Ama',
  'denn': 'Çünkü',
  'weil': 'Çünkü',
  'wenn': 'Eğer',
  'obwohl': 'Rağmen',
  'dass': 'Ki',
  'als': 'Olarak',
  'wie': 'Gibi',
  'in': 'İçinde',
  'an': 'Üzerinde',
  'auf': 'Üzerinde',
  'unter': 'Altında',
  'über': 'Üzerinde',
  'vor': 'Önünde',
  'hinter': 'Arkasında',
  'neben': 'Yanında',
  'zwischen': 'Arasında',
  'mit': 'İle',
  'ohne': 'Olmadan',
  'für': 'İçin',
  'gegen': 'Karşı',
  'um': 'Etrafında',
  'durch': 'Aracılığıyla',
  'zu': 'İçin',
  'von': 'Den',
  'nach': 'Sonra',
  'bei': 'Yanında',
  'seit': 'Beri',
  'bis': 'Kadar',
  'aus': 'Dışarı',
  'eins': 'Bir',
  'zwei': 'İki',
  'drei': 'Üç',
  'vier': 'Dört',
  'fünf': 'Beş',
  'sechs': 'Altı',
  'sieben': 'Yedi',
  'acht': 'Sekiz',
  'neun': 'Dokuz',
  'zehn': 'On',
  'hundert': 'Yüz',
  'tausend': 'Bin',
  'million': 'Milyon',
  'milliarde': 'Milyar',
  'erste': 'Birinci',
  'zweite': 'İkinci',
  'dritte': 'Üçüncü',
  'vierte': 'Dördüncü',
  'fünfte': 'Beşinci',
  'letzte': 'Sonuncu',
  'nächste': 'Sonraki',
  'vorige': 'Önceki',
  'montag': 'Pazartesi',
  'dienstag': 'Salı',
  'mittwoch': 'Çarşamba',
  'donnerstag': 'Perşembe',
  'freitag': 'Cuma',
  'samstag': 'Cumartesi',
  'sonntag': 'Pazar',
  'januar': 'Ocak',
  'februar': 'Şubat',
  'märz': 'Mart',
  'april': 'Nisan',
  'mai': 'Mayıs',
  'juni': 'Haziran',
  'juli': 'Temmuz',
  'august': 'Ağustos',
  'september': 'Eylül',
  'oktober': 'Ekim',
  'november': 'Kasım',
  'dezember': 'Aralık',
  'familie': 'Aile',
  'eltern': 'Ebeveynler',
  'vater': 'Baba',
  'mutter': 'Anne',
  'sohn': 'Oğul',
  'tochter': 'Kız',
  'bruder': 'Erkek kardeş',
  'schwester': 'Kız kardeş',
  'großvater': 'Büyükbaba',
  'großmutter': 'Büyükanne',
  'onkel': 'Amca',
  'tante': 'Teyze',
  'cousin': 'Kuzen',
  'neffe': 'Yeğen',
  'nichte': 'Yeğen',
  'körper': 'Vücut',
  'kopf': 'Kafa',
  'haar': 'Saç',
  'gesicht': 'Yüz',
  'auge': 'Göz',
  'nase': 'Burun',
  'mund': 'Ağız',
  'ohr': 'Kulak',
  'hand': 'El',
  'finger': 'Parmak',
  'fuß': 'Ayak',
  'bein': 'Bacak',
  'arm': 'Kol',
  'herz': 'Kalp',
  'blut': 'Kan',
  'gehirn': 'Beyin',
  'essen': 'Yemek',
  'frühstück': 'Kahvaltı',
  'mittagessen': 'Öğle yemeği',
  'abendessen': 'Akşam yemeği',
  'brot': 'Ekmek',
  'butter': 'Tereyağı',
  'käse': 'Peynir',
  'fleisch': 'Et',
  'fisch': 'Balık',
  'gemüse': 'Sebze',
  'obst': 'Meyve',
  'apfel': 'Elma',
  'banane': 'Muz',
  'orange': 'Portakal',
  'kartoffel': 'Patates',
  'tomate': 'Domates',
  'zwiebel': 'Soğan',
  'reis': 'Pirinç',
  'nudeln': 'Makarna',
  'suppe': 'Çorba',
  'salat': 'Salata',
  'kuchen': 'Pasta',
  'schokolade': 'Çikolata',
  'zucker': 'Şeker',
  'salz': 'Tuz',
  'pfeffer': 'Biber',
  'öl': 'Yağ',
  'essig': 'Sirke',
  'kaffee': 'Kahve',
  'tee': 'Çay',
  'milch': 'Süt',
  'saft': 'Meyve suyu',
  'wein': 'Şarap',
  'bier': 'Bira',
  'wasser': 'Su',
  'kleidung': 'Giyim',
  'hemd': 'Gömlek',
  'hose': 'Pantolon',
  'rock': 'Etek',
  'kleid': 'Elbise',
  'jacke': 'Ceket',
  'mantel': 'Palto',
  'pullover': 'Kazak',
  'schuhe': 'Ayakkabılar',
  'socken': 'Çoraplar',
  'unterwäsche': 'İç çamaşırı',
  'hut': 'Şapka',
  'mütze': 'Bere',
  'schal': 'Atkı',
  'handschuhe': 'Eldivenler',
  'tasche': 'Çanta',
  'schmuck': 'Takı',
  'ring': 'Yüzük',
  'kette': 'Kolye',
  'uhr': 'Saat',
  'brille': 'Gözlük',
  'haus': 'Ev',
  'wohnung': 'Daire',
  'zimmer': 'Oda',
  'küche': 'Mutfak',
  'badezimmer': 'Banyo',
  'schlafzimmer': 'Yatak odası',
  'wohnzimmer': 'Oturma odası',
  'esszimmer': 'Yemek odası',
  'flur': 'Koridor',
  'treppe': 'Merdiven',
  'tür': 'Kapı',
  'fenster': 'Pencere',
  'wand': 'Duvar',
  'boden': 'Zemin',
  'decke': 'Tavan',
  'dach': 'Çatı',
  'garten': 'Bahçe',
  'möbel': 'Mobilya',
  'tisch': 'Masa',
  'stuhl': 'Sandalye',
  'sessel': 'Koltuk',
  'sofa': 'Kanepe',
  'bett': 'Yatak',
  'schrank': 'Dolap',
  'regal': 'Raf',
  'lampe': 'Lamba',
  'teppich': 'Halı',
  'vorhang': 'Perde',
  'kissen': 'Yastık',
  'decke': 'Battaniye',
  'spiegel': 'Ayna',
  'bild': 'Resim',
  'uhr': 'Saat',
  'vase': 'Vazo',
  'pflanze': 'Bitki',
  'blume': 'Çiçek',
  'baum': 'Ağaç',
  'gras': 'Çimen',
  'wald': 'Orman',
  'berg': 'Dağ',
  'fluss': 'Nehir',
  'see': 'Göl',
  'meer': 'Deniz',
  'strand': 'Plaj',
  'insel': 'Ada',
  'wüste': 'Çöl',
  'himmel': 'Gökyüzü',
  'sonne': 'Güneş',
  'mond': 'Ay',
  'stern': 'Yıldız',
  'wolke': 'Bulut',
  'regen': 'Yağmur',
  'schnee': 'Kar',
  'eis': 'Buz',
  'nebel': 'Sis',
  'wind': 'Rüzgar',
  'sturm': 'Fırtına',
  'gewitter': 'Gök gürültüsü',
  'blitz': 'Şimşek',
  'regenbogen': 'Gökkuşağı',
  'wetter': 'Hava durumu',
  'jahreszeit': 'Mevsim',
  'frühling': 'İlkbahar',
  'sommer': 'Yaz',
  'herbst': 'Sonbahar',
  'winter': 'Kış',
  'tier': 'Hayvan',
  'hund': 'Köpek',
  'katze': 'Kedi',
  'pferd': 'At',
  'kuh': 'İnek',
  'schwein': 'Domuz',
  'schaf': 'Koyun',
  'ziege': 'Keçi',
  'huhn': 'Tavuk',
  'ente': 'Ördek',
  'gans': 'Kaz',
  'vogel': 'Kuş',
  'fisch': 'Balık',
  'maus': 'Fare',
  'ratte': 'Sıçan',
  'kaninchen': 'Tavşan',
  'bär': 'Ayı',
  'wolf': 'Kurt',
  'fuchs': 'Tilki',
  'hirsch': 'Geyik',
  'löwe': 'Aslan',
  'tiger': 'Kaplan',
  'elefant': 'Fil',
  'giraffe': 'Zürafa',
  'affe': 'Maymun',
  'schlange': 'Yılan',
  'frosch': 'Kurbağa',
  'schildkröte': 'Kaplumbağa',
  'insekt': 'Böcek',
  'spinne': 'Örümcek',
  'biene': 'Arı',
  'schmetterling': 'Kelebek',
  'fliege': 'Sinek',
  'mücke': 'Sivrisinek',
  'ameise': 'Karınca',
  'verkehr': 'Trafik',
  'straße': 'Cadde',
  'kreuzung': 'Kavşak',
  'ampel': 'Trafik ışığı',
  'zebrastreifen': 'Yaya geçidi',
  'brücke': 'Köprü',
  'tunnel': 'Tünel',
  'auto': 'Araba',
  'bus': 'Otobüs',
  'zug': 'Tren',
  'straßenbahn': 'Tramvay',
  'u-bahn': 'Metro',
  'fahrrad': 'Bisiklet',
  'motorrad': 'Motosiklet',
  'lastwagen': 'Kamyon',
  'flugzeug': 'Uçak',
  'hubschrauber': 'Helikopter',
  'schiff': 'Gemi',
  'boot': 'Tekne',
  'hafen': 'Liman',
  'flughafen': 'Havalimanı',
  'bahnhof': 'Tren istasyonu',
  'bushaltestelle': 'Otobüs durağı',
  'tankstelle': 'Benzin istasyonu',
  'parkplatz': 'Otopark',
  'garage': 'Garaj',
  'arbeit': 'İş',
  'beruf': 'Meslek',
  'büro': 'Ofis',
  'fabrik': 'Fabrika',
  'werkstatt': 'Atölye',
  'baustelle': 'İnşaat alanı',
  'chef': 'Patron',
  'kollege': 'İş arkadaşı',
  'kunde': 'Müşteri',
  'gehalt': 'Maaş',
  'lohn': 'Ücret',
  'arbeitszeit': 'Çalışma saati',
  'pause': 'Mola',
  'urlaub': 'Tatil',
  'feierabend': 'İş günü sonu',
  'wochenende': 'Hafta sonu',
  'feiertag': 'Resmi tatil',
  'bildung': 'Eğitim',
  'schule': 'Okul',
  'universität': 'Üniversite',
  'klasse': 'Sınıf',
  'kurs': 'Kurs',
  'lehrer': 'Öğretmen',
  'professor': 'Profesör',
  'schüler': 'Öğrenci',
  'student': 'Üniversite öğrencisi',
  'hausaufgabe': 'Ev ödevi',
  'prüfung': 'Sınav',
  'note': 'Not',
  'zeugnis': 'Karne',
  'diplom': 'Diploma',
  'abschluss': 'Mezuniyet',
  'fach': 'Ders',
  'mathematik': 'Matematik',
  'physik': 'Fizik',
  'chemie': 'Kimya',
  'biologie': 'Biyoloji',
  'geschichte': 'Tarih',
  'geographie': 'Coğrafya',
  'sprache': 'Dil',
  'deutsch': 'Almanca',
  'englisch': 'İngilizce',
  'französisch': 'Fransızca',
  'spanisch': 'İspanyolca',
  'italienisch': 'İtalyanca',
  'russisch': 'Rusça',
  'chinesisch': 'Çince',
  'japanisch': 'Japonca',
  'arabisch': 'Arapça',
  'türkisch': 'Türkçe',
  'kunst': 'Sanat',
  'musik': 'Müzik',
  'sport': 'Spor',
  'fußball': 'Futbol',
  'basketball': 'Basketbol',
  'volleyball': 'Voleybol',
  'tennis': 'Tenis',
  'schwimmen': 'Yüzme',
  'laufen': 'Koşma',
  'radfahren': 'Bisiklet sürme',
  'wandern': 'Yürüyüş',
  'skifahren': 'Kayak',
  'tanzen': 'Dans',
  'singen': 'Şarkı söyleme',
  'malen': 'Resim yapma',
  'zeichnen': 'Çizim',
  'fotografieren': 'Fotoğraf çekme',
  'lesen': 'Okuma',
  'schreiben': 'Yazma',
  'kochen': 'Yemek pişirme',
  'backen': 'Fırında pişirme',
  'gärtnern': 'Bahçıvanlık',
  'reisen': 'Seyahat',
  'camping': 'Kamp yapma',
  'angeln': 'Balık tutma',
  'jagen': 'Avlanma',
  'sammeln': 'Koleksiyon yapma',
  'basteln': 'El işi',
  'nähen': 'Dikiş',
  'stricken': 'Örgü',
  'häkeln': 'Tığ işi',
  'fernsehen': 'Televizyon izleme',
  'radio': 'Radyo',
  'film': 'Film',
  'kino': 'Sinema',
  'theater': 'Tiyatro',
  'konzert': 'Konser',
  'museum': 'Müze',
  'ausstellung': 'Sergi',
  'party': 'Parti',
  'fest': 'Festival',
  'hochzeit': 'Düğün',
  'geburtstag': 'Doğum günü',
  'jubiläum': 'Yıldönümü',
  'weihnachten': 'Noel',
  'ostern': 'Paskalya',
  'silvester': 'Yılbaşı',
  'karneval': 'Karnaval',
  'gesundheit': 'Sağlık',
  'krankheit': 'Hastalık',
  'schmerz': 'Ağrı',
  'fieber': 'Ateş',
  'husten': 'Öksürük',
  'schnupfen': 'Nezle',
  'kopfschmerzen': 'Baş ağrısı',
  'zahnschmerzen': 'Diş ağrısı',
  'bauchschmerzen': 'Karın ağrısı',
  'arzt': 'Doktor',
  'zahnarzt': 'Diş hekimi',
  'apotheke': 'Eczane',
  'krankenhaus': 'Hastane',
  'medikament': 'İlaç',
  'rezept': 'Reçete',
  'versicherung': 'Sigorta',
  'impfung': 'Aşı',
  'operation': 'Ameliyat',
  'unfall': 'Kaza',
  'verletzung': 'Yaralanma',
  'wunde': 'Yara',
  'blutung': 'Kanama',
  'bruch': 'Kırık',
  'verstauchung': 'Burkulma',
  'verbrennung': 'Yanık',
  'vergiftung': 'Zehirlenme',
  'allergie': 'Alerji',
  'diät': 'Diyet',
  'ernährung': 'Beslenme',
  'vitamin': 'Vitamin',
  'mineral': 'Mineral',
  'eiweiß': 'Protein',
  'fett': 'Yağ',
  'kohlenhydrat': 'Karbonhidrat',
  'kalorie': 'Kalori',
  'gewicht': 'Ağırlık',
  'größe': 'Boy',
  'alter': 'Yaş',
  'geburt': 'Doğum',
  'tod': 'Ölüm',
  'leben': 'Hayat',
  'glück': 'Mutluluk',
  'freude': 'Sevinç',
  'trauer': 'Üzüntü',
  'angst': 'Korku',
  'wut': 'Öfke',
  'überraschung': 'Sürpriz',
  'ekel': 'İğrenme',
  'liebe': 'Aşk',
  'hass': 'Nefret',
  'eifersucht': 'Kıskançlık',
  'neid': 'Haset',
  'stolz': 'Gurur',
  'scham': 'Utanç',
  'schuld': 'Suçluluk',
  'vertrauen': 'Güven',
  'misstrauen': 'Güvensizlik',
  'hoffnung': 'Umut',
  'verzweiflung': 'Umutsuzluk',
  'zufriedenheit': 'Memnuniyet',
  'unzufriedenheit': 'Memnuniyetsizlik',
  'ruhe': 'Huzur',
  'stress': 'Stres',
  'entspannung': 'Rahatlama',
  'anspannung': 'Gerginlik',
  'müdigkeit': 'Yorgunluk',
  'energie': 'Enerji',
  'schlaf': 'Uyku',
  'traum': 'Rüya',
  'albtraum': 'Kabus',
  'gedanke': 'Düşünce',
  'idee': 'Fikir',
  'meinung': 'Görüş',
  'glaube': 'İnanç',
  'religion': 'Din',
  'gott': 'Tanrı',
  'kirche': 'Kilise',
  'moschee': 'Cami',
  'synagoge': 'Sinagog',
  'tempel': 'Tapınak',
  'gebet': 'Dua',
  'segen': 'Kutsama',
  'fluch': 'Lanet',
  'himmel': 'Cennet',
  'hölle': 'Cehennem',
  'engel': 'Melek',
  'teufel': 'Şeytan',
  'seele': 'Ruh',
  'geist': 'Hayalet',
  'magie': 'Büyü',
  'hexe': 'Cadı',
  'zauberer': 'Büyücü',
  'wissenschaft': 'Bilim',
  'forschung': 'Araştırma',
  'entdeckung': 'Keşif',
  'erfindung': 'İcat',
  'experiment': 'Deney',
  'theorie': 'Teori',
  'beweis': 'Kanıt',
  'fakt': 'Gerçek',
  'wahrheit': 'Hakikat',
  'lüge': 'Yalan',
  'geheimnis': 'Sır',
  'rätsel': 'Bilmece',
  'problem': 'Sorun',
  'lösung': 'Çözüm',
  'frage': 'Soru',
  'antwort': 'Cevap',
  'information': 'Bilgi',
  'nachricht': 'Haber',
  'zeitung': 'Gazete',
  'zeitschrift': 'Dergi',
  'buch': 'Kitap',
  'roman': 'Roman',
  'gedicht': 'Şiir',
  'märchen': 'Masal',
  'geschichte': 'Hikaye',
  'brief': 'Mektup',
  'karte': 'Kart',
  'notiz': 'Not',
  'liste': 'Liste',
  'formular': 'Form',
  'vertrag': 'Sözleşme',
  'unterschrift': 'İmza',
  'stempel': 'Damga',
  'telefon': 'Telefon',
  'handy': 'Cep telefonu',
  'computer': 'Bilgisayar',
  'laptop': 'Dizüstü bilgisayar',
  'tablet': 'Tablet',
  'internet': 'İnternet',
  'website': 'Web sitesi',
  'e-mail': 'E-posta',
  'passwort': 'Şifre',
  'benutzer': 'Kullanıcı',
  'konto': 'Hesap',
  'netzwerk': 'Ağ',
  'drucker': 'Yazıcı',
  'scanner': 'Tarayıcı',
  'kamera': 'Kamera',
  'foto': 'Fotoğraf',
  'video': 'Video',
  'musik': 'Müzik',
  'lied': 'Şarkı',
  'melodie': 'Melodi',
  'rhythmus': 'Ritim',
  'instrument': 'Enstrüman',
  'klavier': 'Piyano',
  'gitarre': 'Gitar',
  'geige': 'Keman',
  'flöte': 'Flüt',
  'trommel': 'Davul',
  'trompete': 'Trompet',
  'orchester': 'Orkestra',
  'band': 'Grup',
  'sänger': 'Şarkıcı',
  'musiker': 'Müzisyen',
  'komponist': 'Besteci',
  'dirigent': 'Şef',
  'publikum': 'İzleyici',
  'applaus': 'Alkış',
  'geld': 'Para',
  'münze': 'Madeni para',
  'schein': 'Kağıt para',
  'währung': 'Para birimi',
  'euro': 'Euro',
  'dollar': 'Dolar',
  'pfund': 'Pound',
  'yen': 'Yen',
  'rubel': 'Ruble',
  'lira': 'Lira',
  'bank': 'Banka',
  'konto': 'Hesap',
  'kredit': 'Kredi',
  'schulden': 'Borç',
  'zinsen': 'Faiz',
  'aktie': 'Hisse senedi',
  'börse': 'Borsa',
  'investition': 'Yatırım',
  'gewinn': 'Kar',
  'verlust': 'Zarar',
  'steuer': 'Vergi',
  'preis': 'Fiyat',
  'kosten': 'Maliyet',
  'wert': 'Değer',
  'rabatt': 'İndirim',
  'angebot': 'Teklif',
  'nachfrage': 'Talep',
  'verkauf': 'Satış',
  'kauf': 'Alım',
  'miete': 'Kira',
  'rechnung': 'Fatura',
  'quittung': 'Makbuz',
  'geschäft': 'İş',
  'laden': 'Dükkan',
  'markt': 'Pazar',
  'supermarkt': 'Süpermarket',
  'kaufhaus': 'Alışveriş merkezi',
  'boutique': 'Butik',
  'bäckerei': 'Fırın',
  'metzgerei': 'Kasap',
  'apotheke': 'Eczane',
  'buchhandlung': 'Kitapçı',
  'kiosk': 'Büfe',
  'restaurant': 'Restoran',
  'café': 'Kafe',
  'bar': 'Bar',
  'disco': 'Disko',
  'club': 'Kulüp',
  'hotel': 'Otel',
  'pension': 'Pansiyon',
  'jugendherberge': 'Gençlik hosteli',
  'campingplatz': 'Kamp alanı',
  'reisebüro': 'Seyahat acentesi',
  'fluggesellschaft': 'Havayolu şirketi',
  'reisepass': 'Pasaport',
  'visum': 'Vize',
  'zoll': 'Gümrük',
  'grenze': 'Sınır',
  'ausland': 'Yurtdışı',
  'inland': 'Yurtiçi',
  'heimat': 'Memleket',
  'fremde': 'Yabancı',
  'tourist': 'Turist',
  'einheimischer': 'Yerli',
  'auswanderer': 'Göçmen',
  'einwanderer': 'Göçmen',
  'flüchtling': 'Mülteci',
  'asyl': 'Sığınma',
  'staat': 'Devlet',
  'nation': 'Ulus',
  'volk': 'Halk',
  'gesellschaft': 'Toplum',
  'gemeinschaft': 'Topluluk',
  'bürger': 'Vatandaş',
  'einwohner': 'Sakin',
  'nachbar': 'Komşu',
  'freund': 'Arkadaş',
  'bekannter': 'Tanıdık',
  'fremder': 'Yabancı',
  'feind': 'Düşman',
  'politik': 'Politika',
  'regierung': 'Hükümet',
  'parlament': 'Parlamento',
  'präsident': 'Başkan',
  'kanzler': 'Başbakan',
  'minister': 'Bakan',
  'abgeordneter': 'Milletvekili',
  'partei': 'Parti',
  'wahl': 'Seçim',
  'stimme': 'Oy',
  'kandidat': 'Aday',
  'demokratie': 'Demokrasi',
  'diktatur': 'Diktatörlük',
  'monarchie': 'Monarşi',
  'republik': 'Cumhuriyet',
  'verfassung': 'Anayasa',
  'gesetz': 'Kanun',
  'recht': 'Hukuk',
  'pflicht': 'Görev',
  'freiheit': 'Özgürlük',
  'gleichheit': 'Eşitlik',
  'gerechtigkeit': 'Adalet',
  'ungerechtigkeit': 'Adaletsizlik',
  'diskriminierung': 'Ayrımcılık',
  'rassismus': 'Irkçılık',
  'sexismus': 'Cinsiyetçilik',
  'vorurteil': 'Önyargı',
  'toleranz': 'Hoşgörü',
  'intoleranz': 'Hoşgörüsüzlük',
  'respekt': 'Saygı',
  'ehre': 'Onur',
  'würde': 'Haysiyet',
  'stolz': 'Gurur',
  'scham': 'Utanç',
  'schuld': 'Suç',
  'unschuld': 'Masumiyet',
  'strafe': 'Ceza',
  'belohnung': 'Ödül',
  'lob': 'Övgü',
  'kritik': 'Eleştiri',
  'beschwerde': 'Şikayet',
  'entschuldigung': 'Özür',
  'verzeihung': 'Af',
  'dank': 'Teşekkür',
  'bitte': 'Rica',
  'hilfe': 'Yardım',
  'unterstützung': 'Destek',
  'rat': 'Tavsiye',
  'tipp': 'İpucu',
  'warnung': 'Uyarı',
  'gefahr': 'Tehlike',
  'risiko': 'Risk',
  'sicherheit': 'Güvenlik',
  'schutz': 'Koruma',
  'verteidigung': 'Savunma',
  'angriff': 'Saldırı',
  'kampf': 'Savaş',
  'krieg': 'Savaş',
  'frieden': 'Barış',
  'konflikt': 'Çatışma',
  'streit': 'Tartışma',
  'diskussion': 'Tartışma',
  'debatte': 'Münazara',
  'gespräch': 'Konuşma',
  'unterhaltung': 'Sohbet',
  'kommunikation': 'İletişim',
  'sprache': 'Dil',
  'wort': 'Kelime',
  'satz': 'Cümle',
  'grammatik': 'Dilbilgisi',
  'rechtschreibung': 'İmla',
  'aussprache': 'Telaffuz',
  'übersetzung': 'Çeviri',
  'dolmetscher': 'Tercüman',
  'bedeutung': 'Anlam',
  'definition': 'Tanım',
  'erklärung': 'Açıklama',
  'beschreibung': 'Tanımlama',
  'beispiel': 'Örnek',
  'vergleich': 'Karşılaştırma',
  'unterschied': 'Fark',
  'ähnlichkeit': 'Benzerlik',
  'gegenteil': 'Zıt',
  'anfang': 'Başlangıç',
  'ende': 'Son',
  'mitte': 'Orta',
  'seite': 'Taraf',
  'oben': 'Üst',
  'unten': 'Alt',
  'vorne': 'Ön',
  'hinten': 'Arka',
  'innen': 'İç',
  'außen': 'Dış',
  'links': 'Sol',
  'rechts': 'Sağ',
  'gerade': 'Düz',
  'kurve': 'Eğri',
  'kreis': 'Daire',
  'quadrat': 'Kare',
  'dreieck': 'Üçgen',
  'rechteck': 'Dikdörtgen',
  'linie': 'Çizgi',
  'punkt': 'Nokta',
  'ecke': 'Köşe',
  'kante': 'Kenar',
  'fläche': 'Yüzey',
  'volumen': 'Hacim',
  'länge': 'Uzunluk',
  'breite': 'Genişlik',
  'höhe': 'Yükseklik',
  'tiefe': 'Derinlik',
  'abstand': 'Mesafe',
  'entfernung': 'Uzaklık',
  'richtung': 'Yön',
  'norden': 'Kuzey',
  'süden': 'Güney',
  'osten': 'Doğu',
  'westen': 'Batı',
  'karte': 'Harita',
  'kompass': 'Pusula',
  'position': 'Konum',
  'ort': 'Yer',
  'adresse': 'Adres',
  'straße': 'Sokak',
  'hausnummer': 'Bina numarası',
  'postleitzahl': 'Posta kodu',
  'stadt': 'Şehir',
  'dorf': 'Köy',
  'land': 'Ülke',
  'kontinent': 'Kıta',
  'europa': 'Avrupa',
  'asien': 'Asya',
  'afrika': 'Afrika',
  'amerika': 'Amerika',
  'australien': 'Avustralya',
  'antarktis': 'Antarktika',
  'deutschland': 'Almanya',
  'österreich': 'Avusturya',
  'schweiz': 'İsviçre',
  'frankreich': 'Fransa',
  'italien': 'İtalya',
  'spanien': 'İspanya',
  'portugal': 'Portekiz',
  'griechenland': 'Yunanistan',
  'türkei': 'Türkiye',
  'russland': 'Rusya',
  'china': 'Çin',
  'japan': 'Japonya',
  'indien': 'Hindistan',
  'ägypten': 'Mısır',
  'marokko': 'Fas',
  'südafrika': 'Güney Afrika',
  'usa': 'ABD',
  'kanada': 'Kanada',
  'mexiko': 'Meksika',
  'brasilien': 'Brezilya',
  'argentinien': 'Arjantin',
  'australien': 'Avustralya',
  'neuseeland': 'Yeni Zelanda',
  'berlin': 'Berlin',
  'wien': 'Viyana',
  'bern': 'Bern',
  'paris': 'Paris',
  'rom': 'Roma',
  'madrid': 'Madrid',
  'lissabon': 'Lizbon',
  'athen': 'Atina',
  'ankara': 'Ankara',
  'istanbul': 'İstanbul',
  'moskau': 'Moskova',
  'peking': 'Pekin',
  'tokio': 'Tokyo',
  'neu-delhi': 'Yeni Delhi',
  'kairo': 'Kahire',
  'rabat': 'Rabat',
  'pretoria': 'Pretoria',
  'washington': 'Washington',
  'ottawa': 'Ottawa',
  'mexiko-stadt': 'Meksiko City',
  'brasília': 'Brasilia',
  'buenos-aires': 'Buenos Aires',
  'canberra': 'Canberra',
  'wellington': 'Wellington',
  'hamburg': 'Hamburg',
  'münchen': 'Münih',
  'köln': 'Köln',
  'frankfurt': 'Frankfurt',
  'stuttgart': 'Stuttgart',
  'düsseldorf': 'Düsseldorf',
  'dortmund': 'Dortmund',
  'essen': 'Essen',
  'leipzig': 'Leipzig',
  'dresden': 'Dresden',
  'hannover': 'Hannover',
  'nürnberg': 'Nürnberg',
  'duisburg': 'Duisburg',
  'bochum': 'Bochum',
  'wuppertal': 'Wuppertal',
  'bielefeld': 'Bielefeld',
  'bonn': 'Bonn',
  'münster': 'Münster',
  'karlsruhe': 'Karlsruhe',
  'mannheim': 'Mannheim',
  'augsburg': 'Augsburg',
  'wiesbaden': 'Wiesbaden',
  'gelsenkirchen': 'Gelsenkirchen',
  'mönchengladbach': 'Mönchengladbach',
  'braunschweig': 'Braunschweig',
  'chemnitz': 'Chemnitz',
  'kiel': 'Kiel',
  'aachen': 'Aachen',
  'halle': 'Halle',
  'magdeburg': 'Magdeburg',
  'freiburg': 'Freiburg',
  'krefeld': 'Krefeld',
  'lübeck': 'Lübeck',
  'oberhausen': 'Oberhausen',
  'erfurt': 'Erfurt',
  'mainz': 'Mainz',
  'rostock': 'Rostock',
  'kassel': 'Kassel',
  'hagen': 'Hagen',
  'hamm': 'Hamm',
  'saarbrücken': 'Saarbrücken',
  'mülheim': 'Mülheim',
  'potsdam': 'Potsdam',
  'ludwigshafen': 'Ludwigshafen',
  'oldenburg': 'Oldenburg',
  'leverkusen': 'Leverkusen',
  'osnabrück': 'Osnabrück',
  'solingen': 'Solingen',
  'heidelberg': 'Heidelberg',
  'herne': 'Herne',
  'neuss': 'Neuss',
  'darmstadt': 'Darmstadt',
  'paderborn': 'Paderborn',
  'regensburg': 'Regensburg',
  'ingolstadt': 'Ingolstadt',
  'würzburg': 'Würzburg',
  'fürth': 'Fürth',
  'wolfsburg': 'Wolfsburg',
  'offenbach': 'Offenbach',
  'ulm': 'Ulm',
  'heilbronn': 'Heilbronn',
  'pforzheim': 'Pforzheim',
  'göttingen': 'Göttingen',
  'bottrop': 'Bottrop',
  'trier': 'Trier',
  'recklinghausen': 'Recklinghausen',
  'reutlingen': 'Reutlingen',
  'bremerhaven': 'Bremerhaven',
  'koblenz': 'Koblenz',
  'bergisch-gladbach': 'Bergisch Gladbach',
  'jena': 'Jena',
  'remscheid': 'Remscheid',
  'erlangen': 'Erlangen',
  'moers': 'Moers',
  'siegen': 'Siegen',
  'hildesheim': 'Hildesheim',
  'salzgitter': 'Salzgitter',
  // Additional common words
  'hallo': 'Merhaba',
  'tschüss': 'Hoşça kal',
  'auf wiedersehen': 'Güle güle',
  'guten morgen': 'Günaydın',
  'guten tag': 'İyi günler',
  'guten abend': 'İyi akşamlar',
  'gute nacht': 'İyi geceler',
  'willkommen': 'Hoş geldiniz',
  'bitte': 'Lütfen',
  'danke': 'Teşekkür ederim',
  'entschuldigung': 'Özür dilerim',
  'es tut mir leid': 'Üzgünüm',
  'hilfe': 'Yardım',
  'wie geht es dir': 'Nasılsın',
  'mir geht es gut': 'İyiyim',
  'ich verstehe nicht': 'Anlamıyorum',
  'ich weiß nicht': 'Bilmiyorum',
  'ich liebe dich': 'Seni seviyorum',
  'alles gute': 'İyi şanslar',
  'herzlichen glückwunsch': 'Tebrikler',
  'frohe weihnachten': 'Mutlu Noeller',
  'frohes neues jahr': 'Mutlu yıllar',
  'alles ist miteinander verbunden': 'Her şey birbiriyle bağlantılı',
  'die frage ist nicht wo sondern wann': 'Soru nerede değil, ne zaman',
  'die vergangenheit beeinflusst die zukunft': 'Geçmiş geleceği etkiler',
  'was wir wissen ist ein tropfen': 'Bildiklerimiz bir damla',
  'was wir nicht wissen ein ozean': 'Bilmediklerimiz bir okyanus'
};

export const useVocabularyStore = create<VocabularyStore>()(
  persist(
    (set, get) => ({
      lists: [],
      
      createList: (title, description = '', sourceLanguage, targetLanguage) => {
        // Get default languages from settings if not provided
        const settings = useSettingsStore.getState();
        const defaultSourceLanguage = sourceLanguage || (settings.selectedLanguage?.code || 'de');
        const defaultTargetLanguage = targetLanguage || (settings.nativeLanguage?.code || 'tr');
        
        const newList: VocabularyList = {
          id: Date.now().toString(),
          title,
          description,
          sourceLanguage: defaultSourceLanguage,
          targetLanguage: defaultTargetLanguage,
          words: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          lists: [...(state.lists || []), newList]
        }));
        
        return newList.id;
      },
      
      updateList: (listId, updates) => {
        set((state) => ({
          lists: (state.lists || []).map((list) => 
            list.id === listId 
              ? { 
                  ...list, 
                  ...updates, 
                  updatedAt: new Date().toISOString() 
                } 
              : list
          )
        }));
      },
      
      deleteList: (listId) => {
        console.log("Deleting list with ID in store:", listId);
        set((state) => {
          const newLists = (state.lists || []).filter((list) => list.id !== listId);
          console.log(`Lists before: ${state.lists.length}, after: ${newLists.length}`);
          return { lists: newLists };
        });
      },
      
      addWord: (listId, word) => {
        const list = get().lists?.find(list => list.id === listId);
        if (!list) return '';
        
        const newWord: VocabularyWord = {
          id: Date.now().toString(),
          sourceLanguage: word.sourceLanguage || list.sourceLanguage,
          targetLanguage: word.targetLanguage || list.targetLanguage,
          sourceText: word.sourceText || '',
          targetText: word.targetText || '',
          example: word.example || '',
          exampleTranslation: word.exampleTranslation || '',
          learned: word.learned || false,
          createdAt: new Date().toISOString(),
          german: word.sourceText || '',
          turkish: word.targetText || '',
          sourceShow: list.sourceShow,
          sourceEpisode: list.sourceEpisode,
        };
        
        set((state) => ({
          lists: (state.lists || []).map((list) => 
            list.id === listId 
              ? { 
                  ...list, 
                  words: [...(list.words || []), newWord],
                  updatedAt: new Date().toISOString() 
                } 
              : list
          )
        }));
        
        return newWord.id;
      },
      
      updateWord: (listId, wordId, updates) => {
        set((state) => ({
          lists: (state.lists || []).map((list) => 
            list.id === listId 
              ? { 
                  ...list, 
                  words: (list.words || []).map((word) => 
                    word.id === wordId 
                      ? { ...word, ...updates } 
                      : word
                  ),
                  updatedAt: new Date().toISOString() 
                } 
              : list
          )
        }));
      },
      
      deleteWord: (listId, wordId) => {
        set((state) => ({
          lists: (state.lists || []).map((list) => 
            list.id === listId 
              ? { 
                  ...list, 
                  words: (list.words || []).filter((word) => word.id !== wordId),
                  updatedAt: new Date().toISOString() 
                } 
              : list
          )
        }));
      },
      
      markWordAsLearned: (listId, wordId, learned = true) => {
        set((state) => ({
          lists: (state.lists || []).map((list) => 
            list.id === listId 
              ? { 
                  ...list, 
                  words: (list.words || []).map((word) => 
                    word.id === wordId 
                      ? { ...word, learned } 
                      : word
                  ),
                  updatedAt: new Date().toISOString() 
                } 
              : list
          )
        }));
      },
      
      toggleWordLearned: (listId, wordId) => {
        set((state) => {
          const list = state.lists.find(list => list.id === listId);
          if (!list) return state;
          
          const word = list.words.find(word => word.id === wordId);
          if (!word) return state;
          
          return {
            lists: state.lists.map(list => 
              list.id === listId 
                ? {
                    ...list,
                    words: list.words.map(word => 
                      word.id === wordId 
                        ? { ...word, learned: !word.learned }
                        : word
                    ),
                    updatedAt: new Date().toISOString()
                  }
                : list
            )
          };
        });
      },
      
      getList: (listId) => {
        return get().lists?.find((list) => list.id === listId) || null;
      },
      
      getWord: (listId, wordId) => {
        const list = get().lists?.find((list) => list.id === listId);
        if (!list) return null;
        
        return list.words?.find((word) => word.id === wordId) || null;
      },
      
      importFromSubtitles: (subtitle: ImportedSubtitle, selectedEntries: SubtitleEntry[]) => {
        try {
          // Get default languages from settings
          const settings = useSettingsStore.getState();
          const defaultTargetLanguage = settings.nativeLanguage?.code || 'tr';
          
          // Create a new list for the imported subtitles
          const listTitle = subtitle.episodeName 
            ? `${subtitle.showName} - ${subtitle.episodeName}`
            : subtitle.showName;
            
          const listDescription = `${subtitle.language} altyazılarından içe aktarıldı. ${selectedEntries.length} altyazı satırı içerir.`;
          
          const newList: VocabularyList = {
            id: Date.now().toString(),
            title: listTitle,
            description: listDescription,
            sourceLanguage: 'de', // Assuming German for subtitles
            targetLanguage: defaultTargetLanguage,
            words: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sourceShow: subtitle.showName,
            sourceEpisode: subtitle.episodeName,
            totalWords: 0,
            learnedWords: 0,
          };
          
          // Extract words from selected subtitles
          const extractedWords = extractWordsFromSubtitles(selectedEntries);
          
          // Create vocabulary words from extracted words
          const vocabularyWords: VocabularyWord[] = [];
          
          extractedWords.forEach(word => {
            // Check if we have a translation for this word
            const translation = sampleTranslations[word.toLowerCase()] || '';
            
            if (translation) {
              // Find an example sentence containing this word
              const exampleEntry = selectedEntries.find(entry => 
                entry.text.toLowerCase().includes(word.toLowerCase())
              );
              
              const newWord: VocabularyWord = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
                sourceLanguage: 'de',
                targetLanguage: defaultTargetLanguage,
                sourceText: word,
                targetText: translation,
                example: exampleEntry ? exampleEntry.text : '',
                exampleTranslation: '',
                learned: false,
                createdAt: new Date().toISOString(),
                german: word,
                turkish: translation,
                sourceShow: subtitle.showName,
                sourceEpisode: subtitle.episodeName,
              };
              
              vocabularyWords.push(newWord);
            }
          });
          
          // Add words to the list
          newList.words = vocabularyWords;
          newList.totalWords = vocabularyWords.length;
          
          // Add the list to the store
          set((state) => ({
            lists: [...(state.lists || []), newList]
          }));
          
          return newList;
        } catch (error) {
          console.error("Error in importFromSubtitles:", error);
          // Return a default list in case of error
          return {
            id: Date.now().toString(),
            title: subtitle.showName || "İçe Aktarılan Liste",
            description: "İçe aktarma sırasında bir hata oluştu.",
            sourceLanguage: 'de',
            targetLanguage: 'tr',
            words: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
      },
      
      setCurrentList: (listId) => {
        // This is a no-op in this implementation, but could be used to track the current list
      },
      
      // Add sample lists for demonstration
      addSampleLists: (sampleLists) => {
        try {
          // Check if sampleLists is defined
          if (!sampleLists || !Array.isArray(sampleLists)) {
            console.warn('No sample lists provided or invalid format');
            return;
          }
          
          // Only add if we don't already have these lists
          const existingIds = get().lists ? get().lists.map(list => list.id) : [];
          const listsToAdd = sampleLists.filter(list => !existingIds.includes(list.id));
          
          if (listsToAdd.length > 0) {
            set((state) => ({
              lists: [...(state.lists || []), ...listsToAdd]
            }));
          }
        } catch (error) {
          console.error("Error in addSampleLists:", error);
        }
      },
      
      // Create a quiz from imported words
      createQuizFromImport: (listId, wordCount = 10) => {
        try {
          const list = get().getList(listId);
          if (!list || !list.words || list.words.length === 0) {
            console.warn('No list found or list has no words');
            return null;
          }
          
          // Create a new quiz list
          const quizList: VocabularyList = {
            id: Date.now().toString(),
            title: `Quiz: ${list.title}`,
            description: `Quiz oluşturuldu: ${list.description}`,
            sourceLanguage: list.sourceLanguage,
            targetLanguage: list.targetLanguage,
            words: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sourceShow: list.sourceShow,
            sourceEpisode: list.sourceEpisode,
            source: 'quiz'
          };
          
          // Select random words from the list
          const availableWords = [...list.words];
          const selectedWords: VocabularyWord[] = [];
          
          // Limit to the smaller of wordCount or available words
          const count = Math.min(wordCount, availableWords.length);
          
          for (let i = 0; i < count; i++) {
            if (availableWords.length === 0) break;
            
            // Select a random word
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const selectedWord = availableWords[randomIndex];
            
            // Remove the selected word from available words
            availableWords.splice(randomIndex, 1);
            
            // Add to selected words
            selectedWords.push({
              ...selectedWord,
              id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
              learned: false,
              createdAt: new Date().toISOString()
            });
          }
          
          // Add words to the quiz list
          quizList.words = selectedWords;
          
          // Add the quiz list to the store
          set((state) => ({
            lists: [...(state.lists || []), quizList]
          }));
          
          return quizList;
        } catch (error) {
          console.error("Error in createQuizFromImport:", error);
          return null;
        }
      }
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);