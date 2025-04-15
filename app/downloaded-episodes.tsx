import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Calendar, Search, X, Download, Play, ArrowLeft } from 'lucide-react-native';
import { sampleEpisodes } from '@/mocks/sample-episodes';
import colors from '@/constants/colors';
import { Episode } from '@/types/dictionary';

export default function DownloadedEpisodesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEpisodes = sampleEpisodes.filter(episode => 
    episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    episode.episode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleEpisodePress = (episode: Episode) => {
    try {
      // Navigate to the episode details screen with proper params
      router.push({
        pathname: '/episode-details',
        params: {
          episodeId: episode.id
        }
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert(
        "Hata",
        "Bölüm açılırken bir hata oluştu. Lütfen tekrar deneyin.",
        [{ text: "Tamam" }]
      );
    }
  };

  const handleGoBack = () => {
    router.push('/(tabs)/create');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen 
        options={{ 
          title: 'İndirilen Bölümler',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.dark.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Bölüm ara..."
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
      
      {filteredEpisodes.length > 0 ? (
        <FlatList
          data={filteredEpisodes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.episodeCard}
              onPress={() => handleEpisodePress(item)}
              activeOpacity={0.7}
            >
              <Image 
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              
              <View style={styles.episodeInfo}>
                <View style={styles.episodeHeader}>
                  <Text style={styles.episodeTitle}>{item.title}</Text>
                  <View style={styles.languageBadge}>
                    <Text style={styles.languageText}>{item.language}</Text>
                  </View>
                </View>
                
                <Text style={styles.episodeName}>{item.episode}</Text>
                <Text style={styles.episodeDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                
                <View style={styles.episodeFooter}>
                  <View style={styles.footerItem}>
                    <Calendar size={14} color={colors.dark.textSecondary} />
                    <Text style={styles.footerText}>
                      {formatDate(item.downloadDate)}
                    </Text>
                  </View>
                  
                  <View style={styles.footerItem}>
                    <FileText size={14} color={colors.dark.textSecondary} />
                    <Text style={styles.footerText}>
                      {item.subtitleCount || 0} altyazı
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEpisodePress(item)}
                >
                  <Play size={20} color={colors.dark.primary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          {searchQuery.length > 0 ? (
            <>
              <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
              <Text style={styles.emptyText}>
                "{searchQuery}" araması için sonuç bulunamadı. Lütfen başka bir arama yapmayı deneyin.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.emptyTitle}>Henüz İndirilen Bölüm Yok</Text>
              <Text style={styles.emptyText}>
                Henüz hiç bölüm indirmediniz. Bölüm indirmek için "Yeni İndir" butonuna tıklayın.
              </Text>
              <TouchableOpacity 
                style={styles.downloadButton}
                onPress={() => router.push('/episode-browser')}
              >
                <Download size={20} color="#fff" />
                <Text style={styles.downloadButtonText}>Yeni Bölüm İndir</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
    backgroundColor: colors.dark.cardBackground,
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
  episodeCard: {
    flexDirection: 'row',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 140,
  },
  episodeInfo: {
    flex: 1,
    padding: 12,
  },
  episodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  episodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
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
  episodeName: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  episodeDescription: {
    fontSize: 14,
    color: colors.dark.text,
    marginBottom: 12,
  },
  episodeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  actions: {
    justifyContent: 'center',
    padding: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});