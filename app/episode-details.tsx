import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Clock, Calendar, Download, Play, ArrowLeft } from 'lucide-react-native';
import { 
  sampleEpisodes, 
  sampleSubtitleData, 
  avengersSubtitleData, 
  ironManSubtitleData, 
  blackMirrorSubtitleData, 
  kungFuPandaSubtitleData 
} from '@/mocks/sample-episodes';
import colors from '@/constants/colors';
import Button from '@/components/Button';

export default function EpisodeDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const episodeId = params.episodeId as string;
  
  const [episode, setEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subtitlesLoading, setSubtitlesLoading] = useState(false);
  
  useEffect(() => {
    // Find the episode from our sample data
    const foundEpisode = sampleEpisodes.find(ep => ep.id === episodeId);
    
    if (foundEpisode) {
      setEpisode(foundEpisode);
    } else {
      Alert.alert(
        "Hata",
        "Bölüm bulunamadı. Lütfen tekrar deneyin.",
        [{ 
          text: "Tamam", 
          onPress: () => router.back() 
        }]
      );
    }
    
    setIsLoading(false);
  }, [episodeId]);
  
  const getSubtitleSample = (title: string) => {
    switch (title) {
      case 'Dark':
        return sampleSubtitleData.entries.slice(0, 5).map(entry => entry.text).join('\n');
      case 'Avengers':
        return avengersSubtitleData.entries.slice(0, 5).map(entry => entry.text).join('\n');
      case 'Iron Man':
        return ironManSubtitleData.entries.slice(0, 5).map(entry => entry.text).join('\n');
      case 'Black Mirror':
        return blackMirrorSubtitleData.entries.slice(0, 5).map(entry => entry.text).join('\n');
      case 'Kung Fu Panda':
        return kungFuPandaSubtitleData.entries.slice(0, 5).map(entry => entry.text).join('\n');
      default:
        return sampleSubtitleData.entries.slice(0, 5).map(entry => entry.text).join('\n');
    }
  };
  
  const handleImportSubtitles = () => {
    if (!episode) return;
    
    setSubtitlesLoading(true);
    
    // Simulate loading subtitles
    setTimeout(() => {
      try {
        // Navigate to import-subtitles with the episode data
        router.push({
          pathname: '/import-subtitles',
          params: {
            showName: episode.title,
            episodeName: episode.episode,
            fromDownloaded: 'true',
            episodeId: episodeId,
            subtitleDataKey: episode.title.toLowerCase().replace(/\s+/g, '-')
          }
        });
      } catch (error) {
        console.error("Navigation error:", error);
        Alert.alert(
          "Hata",
          "Altyazılar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.",
          [{ text: "Tamam" }]
        );
      } finally {
        setSubtitlesLoading(false);
      }
    }, 1000);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleGoBack = () => {
    // Check if we came from just downloaded
    if (params.justDownloaded === 'true') {
      router.push('/downloaded-episodes');
    } else {
      router.back();
    }
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['right', 'left']}>
        <Stack.Screen 
          options={{ 
            title: 'Bölüm Detayları',
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            )
          }} 
        />
        <ActivityIndicator size="large" color={colors.dark.primary} />
        <Text style={styles.loadingText}>Bölüm bilgileri yükleniyor...</Text>
      </SafeAreaView>
    );
  }
  
  if (!episode) {
    return (
      <SafeAreaView style={styles.errorContainer} edges={['right', 'left']}>
        <Stack.Screen 
          options={{ 
            title: 'Bölüm Detayları',
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            )
          }} 
        />
        <Text style={styles.errorText}>Bölüm bulunamadı.</Text>
        <Button 
          title="Geri Dön" 
          onPress={handleGoBack} 
          style={styles.backButtonLarge}
        />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen 
        options={{ 
          title: episode.title,
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: episode.thumbnail }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.episodeTitle}>{episode.title}</Text>
            <Text style={styles.episodeName}>{episode.episode}</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={16} color={colors.dark.textSecondary} />
            <Text style={styles.infoText}>
              İndirilme: {formatDate(episode.downloadDate)}
            </Text>
          </View>
          
          {episode.duration && (
            <View style={styles.infoItem}>
              <Clock size={16} color={colors.dark.textSecondary} />
              <Text style={styles.infoText}>
                Süre: {episode.duration}
              </Text>
            </View>
          )}
          
          <View style={styles.infoItem}>
            <FileText size={16} color={colors.dark.textSecondary} />
            <Text style={styles.infoText}>
              {episode.subtitleCount || 0} altyazı
            </Text>
          </View>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Açıklama</Text>
          <Text style={styles.descriptionText}>{episode.description}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Altyazıları İçe Aktar"
            onPress={handleImportSubtitles}
            icon={<FileText size={18} color="#fff" />}
            loading={subtitlesLoading}
          />
          
          <TouchableOpacity 
            style={styles.watchButton}
            onPress={() => Alert.alert("Bilgi", "Bu özellik henüz aktif değil.")}
          >
            <Play size={20} color={colors.dark.primary} />
            <Text style={styles.watchButtonText}>Bölümü İzle</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.subtitlesInfoContainer}>
          <Text style={styles.subtitlesInfoTitle}>Altyazı Bilgileri</Text>
          <Text style={styles.subtitlesInfoText}>
            Bu bölüm için {episode.subtitleCount || 0} adet altyazı bulunmaktadır. 
            Altyazıları içe aktararak kelime listenize ekleyebilirsiniz.
          </Text>
          
          <View style={styles.subtitlesSample}>
            <Text style={styles.subtitlesSampleTitle}>Örnek Altyazılar:</Text>
            <Text style={styles.subtitlesSampleText}>
              {getSubtitleSample(episode.title)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.dark.text,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.dark.text,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonLarge: {
    marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  episodeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  episodeName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.dark.cardBackground,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: colors.dark.cardBackground,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.dark.text,
    lineHeight: 24,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
    gap: 8,
  },
  watchButtonText: {
    color: colors.dark.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  subtitlesInfoContainer: {
    padding: 16,
    backgroundColor: colors.dark.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  subtitlesInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  subtitlesInfoText: {
    fontSize: 16,
    color: colors.dark.text,
    marginBottom: 16,
  },
  subtitlesSample: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 8,
  },
  subtitlesSampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  subtitlesSampleText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontFamily: 'monospace',
  },
});