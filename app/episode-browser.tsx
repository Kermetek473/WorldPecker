import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, Download, ArrowLeft } from 'lucide-react-native';
import colors from '@/constants/colors';

// Define types for our data
interface Show {
  id: string;
  title: string;
  language: string;
  thumbnail: string;
  description: string;
  seasons: number;
  episodes: number;
}

interface Episode {
  id: string;
  season: string;
  episode: string;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
}

// Sample shows available for browsing
const availableShows: Show[] = [
  {
    id: 'dark',
    title: 'Dark',
    language: 'Almanca',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Winden kasabasında kaybolan çocukların gizemi.",
    seasons: 3,
    episodes: 26,
  },
  {
    id: 'avengers',
    title: 'Avengers',
    language: 'Almanca',
    thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2ZW5nZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Dünyanın en güçlü kahramanları, evrenin yarısını yok etmek isteyen Thanos'a karşı birleşiyor.",
    seasons: 4,
    episodes: 8,
  },
  {
    id: 'iron-man',
    title: 'Iron Man',
    language: 'Almanca',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlyb24lMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    description: "Milyarder mucit Tony Stark, bir saldırı sonrası esir düşer ve hayatta kalmak için güçlü bir zırh yapar.",
    seasons: 3,
    episodes: 3,
  },
  {
    id: 'black-mirror',
    title: 'Black Mirror',
    language: 'Almanca',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Teknolojinin karanlık yüzünü anlatan antoloji dizisi.",
    seasons: 5,
    episodes: 22,
  },
  {
    id: 'kung-fu-panda',
    title: 'Kung Fu Panda',
    language: 'Almanca',
    thumbnail: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlcmxpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Tembel bir panda olan Po, beklenmedik bir şekilde efsanevi kung fu savaşçısı olmak için seçilir.",
    seasons: 3,
    episodes: 6,
  }
];

// Sample episodes for Dark
const darkEpisodes: Episode[] = [
  {
    id: 'dark-s01e01',
    season: 'S01',
    episode: 'E01',
    title: 'Sırlar',
    duration: '52 dk',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Winden kasabasında bir çocuk kaybolur ve dört aile arasındaki karanlık sırlar ortaya çıkmaya başlar.",
  },
  {
    id: 'dark-s01e02',
    season: 'S01',
    episode: 'E02',
    title: 'Yalanlar',
    duration: '45 dk',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Mikkel'in kaybolması, kasabadaki diğer kayıp vakalarını hatırlatır.",
  },
  {
    id: 'dark-s01e03',
    season: 'S01',
    episode: 'E03',
    title: 'Geçmiş ve Şimdi',
    duration: '46 dk',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Jonas, babasının intiharından sonra okula döner ve arkadaşlarıyla birlikte mağarayı keşfetmeye karar verir.",
  },
  {
    id: 'dark-s01e04',
    season: 'S01',
    episode: 'E04',
    title: 'Çift Hayatlar',
    duration: '48 dk',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Charlotte ve Ulrich, Helge Doppler'in geçmişini araştırırken şok edici gerçeklerle karşılaşırlar.",
  },
  {
    id: 'dark-s01e05',
    season: 'S01',
    episode: 'E05',
    title: 'Hakikatler',
    duration: '45 dk',
    thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Hannah, Ulrich'e karşı duygularını açığa vurur. Jonas, babasının intiharının ardındaki gerçeği öğrenir.",
  }
];

// Sample episodes for Avengers
const avengersEpisodes: Episode[] = [
  {
    id: 'avengers-infinity-war',
    season: 'Film',
    episode: 'Infinity War',
    title: 'Avengers: Infinity War',
    duration: '149 dk',
    thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2ZW5nZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Thanos, sonsuz gücü elde etmek için altı Sonsuzluk Taşı'nı toplamaya çalışırken, Avengers ve müttefikleri onu durdurmak için bir araya gelir.",
  },
  {
    id: 'avengers-endgame',
    season: 'Film',
    episode: 'Endgame',
    title: 'Avengers: Endgame',
    duration: '181 dk',
    thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2ZW5nZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Thanos'un yıkımından sonra kalan Avengers, evrenin dengesini yeniden sağlamak için son bir hamle yapar.",
  }
];

// Sample episodes for Iron Man
const ironManEpisodes: Episode[] = [
  {
    id: 'iron-man-1',
    season: 'Film',
    episode: 'Bölüm 1',
    title: 'Iron Man',
    duration: '126 dk',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlyb24lMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    description: "Silah üreticisi Tony Stark, Afganistan'da esir düştükten sonra hayatta kalmak için güçlü bir zırh yapar ve Iron Man olur.",
  },
  {
    id: 'iron-man-2',
    season: 'Film',
    episode: 'Bölüm 2',
    title: 'Iron Man 2',
    duration: '124 dk',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlyb24lMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    description: "Tony Stark, Iron Man kimliğini dünyaya açıkladıktan sonra, hükümetin teknolojisini istemesi ve yeni düşmanlarla yüzleşmesi gerekir.",
  },
  {
    id: 'iron-man-3',
    season: 'Film',
    episode: 'Bölüm 3',
    title: 'Iron Man 3',
    duration: '130 dk',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlyb24lMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    description: "Tony Stark, New York savaşından sonra anksiyete atakları yaşarken, gizemli bir terörist olan Mandarin ile karşı karşıya gelir.",
  }
];

// Sample episodes for Black Mirror
const blackMirrorEpisodes: Episode[] = [
  {
    id: 'black-mirror-s01e01',
    season: 'S01',
    episode: 'E01',
    title: 'The National Anthem',
    duration: '44 dk',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Bir prensesin kaçırılması sonucu Başbakan'ın yüzleştiği ahlaki ikilem.",
  },
  {
    id: 'black-mirror-s01e02',
    season: 'S01',
    episode: 'E02',
    title: 'Fifteen Million Merits',
    duration: '61 dk',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Bisiklet çevirerek puan kazanan insanların yaşadığı distopik bir gelecek.',
  },
  {
    id: 'black-mirror-s01e03',
    season: 'S01',
    episode: 'E03',
    title: 'The Entire History of You',
    duration: '49 dk',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Hafızalarını kaydedip geri izleyebilen insanların hikayesi.",
  },
  {
    id: 'black-mirror-s02e01',
    season: 'S02',
    episode: 'E01',
    title: 'Be Right Back',
    duration: '48 dk',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: "Ölen sevgilisinin sosyal medya verilerinden bir kopyasını yaratan kadının hikayesi.",
  },
  {
    id: 'black-mirror-s02e02',
    season: 'S02',
    episode: 'E02',
    title: 'White Bear',
    duration: '42 dk',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Hafızasını kaybeden bir kadının korkutucu bir dünyada uyanması.',
  }
];

// Sample episodes for Kung Fu Panda
const kungFuPandaEpisodes: Episode[] = [
  {
    id: 'kung-fu-panda-1',
    season: 'Film',
    episode: 'Bölüm 1',
    title: 'Kung Fu Panda',
    duration: '92 dk',
    thumbnail: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlcmxpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Tembel bir panda olan Po, beklenmedik bir şekilde efsanevi kung fu savaşçısı olmak için seçilir.",
  },
  {
    id: 'kung-fu-panda-2',
    season: 'Film',
    episode: 'Bölüm 2',
    title: 'Kung Fu Panda 2',
    duration: '90 dk',
    thumbnail: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlcmxpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Po, Çin'i fethetmeye çalışan kötü bir tavus kuşu olan Lord Shen'e karşı savaşır ve kendi geçmişiyle yüzleşir.",
  },
  {
    id: 'kung-fu-panda-3',
    season: 'Film',
    episode: 'Bölüm 3',
    title: 'Kung Fu Panda 3',
    duration: '95 dk',
    thumbnail: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlcmxpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: "Po, ruhlar aleminden gelen güçlü bir düşman olan Kai'ye karşı savaşmak için diğer pandaları eğitmelidir.",
  }
];

export default function EpisodeBrowserScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  const filteredShows = availableShows.filter(show => 
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
  };
  
  const handleBack = () => {
    if (selectedShow) {
      setSelectedShow(null);
    } else {
      router.push('/downloaded-episodes');
    }
  };
  
  const getEpisodesForShow = (showId: string): Episode[] => {
    switch (showId) {
      case 'dark':
        return darkEpisodes;
      case 'avengers':
        return avengersEpisodes;
      case 'iron-man':
        return ironManEpisodes;
      case 'black-mirror':
        return blackMirrorEpisodes;
      case 'kung-fu-panda':
        return kungFuPandaEpisodes;
      default:
        return [];
    }
  };
  
  const handleDownload = (episode: Episode) => {
    setIsDownloading(episode.id);
    
    // Simulate download
    setTimeout(() => {
      setIsDownloading(null);
      
      try {
        // Navigate to the episode details screen
        router.push({
          pathname: '/episode-details',
          params: {
            episodeId: episode.id,
            showName: selectedShow?.title,
            episodeName: `${episode.season}${episode.episode} - ${episode.title}`,
            justDownloaded: 'true'
          }
        });
      } catch (error) {
        console.error("Navigation error:", error);
        setIsDownloading(null);
      }
    }, 2000);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen 
        options={{ 
          title: selectedShow ? selectedShow.title : 'Bölüm Tarayıcısı',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.dark.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder={selectedShow ? "Bölüm ara..." : "Dizi ara..."}
          placeholderTextColor={colors.dark.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={20} color={colors.dark.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      {selectedShow ? (
        // Show episodes for selected show
        <FlatList
          data={getEpisodesForShow(selectedShow.id)}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={styles.showHeaderContainer}>
              <Image 
                source={{ uri: selectedShow.thumbnail }}
                style={styles.showHeaderImage}
                resizeMode="cover"
              />
              <View style={styles.showHeaderOverlay}>
                <Text style={styles.showHeaderTitle}>{selectedShow.title}</Text>
                <Text style={styles.showHeaderInfo}>
                  {selectedShow.seasons} Sezon • {selectedShow.episodes} Bölüm • {selectedShow.language}
                </Text>
                <Text style={styles.showHeaderDescription}>
                  {selectedShow.description}
                </Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.episodeItem}>
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeNumber}>
                  {item.season}{item.episode}
                </Text>
                <View style={styles.episodeDetails}>
                  <Text style={styles.episodeTitle}>{item.title}</Text>
                  <Text style={styles.episodeDuration}>{item.duration}</Text>
                  <Text style={styles.episodeDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.downloadButton}
                onPress={() => handleDownload(item)}
                disabled={isDownloading !== null}
              >
                {isDownloading === item.id ? (
                  <ActivityIndicator size="small" color={colors.dark.primary} />
                ) : (
                  <Download size={20} color={colors.dark.primary} />
                )}
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        // Show list of available shows
        <FlatList
          data={filteredShows}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.showCard}
              onPress={() => handleShowSelect(item)}
              activeOpacity={0.7}
            >
              <Image 
                source={{ uri: item.thumbnail }}
                style={styles.showThumbnail}
                resizeMode="cover"
              />
              
              <View style={styles.showInfo}>
                <View style={styles.showHeaderRow}>
                  <Text style={styles.showTitle}>{item.title}</Text>
                  <View style={styles.languageBadge}>
                    <Text style={styles.languageText}>{item.language}</Text>
                  </View>
                </View>
                
                <Text style={styles.showDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                
                <View style={styles.showStats}>
                  <Text style={styles.showStatsText}>
                    {item.seasons} Sezon • {item.episodes} Bölüm
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: colors.dark.text,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  showCard: {
    flexDirection: 'row',
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  showThumbnail: {
    width: 100,
    height: 140,
  },
  showInfo: {
    flex: 1,
    padding: 12,
  },
  showHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  showTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    flex: 1,
  },
  languageBadge: {
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  languageText: {
    fontSize: 12,
    color: colors.dark.primary,
    fontWeight: '500',
  },
  showDescription: {
    fontSize: 14,
    color: colors.dark.text,
    marginBottom: 12,
  },
  showStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showStatsText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  showHeaderContainer: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    position: 'relative',
  },
  showHeaderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  showHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  showHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  showHeaderInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  showHeaderDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  episodeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  episodeNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.primary,
    width: 60,
  },
  episodeDetails: {
    flex: 1,
  },
  episodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 2,
  },
  episodeDuration: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginBottom: 4,
  },
  episodeDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});