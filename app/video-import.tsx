import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, Upload, FileText, Check, AlertCircle, ArrowLeft } from 'lucide-react-native';
import Button from '@/components/Button';
import { 
  sampleEpisodes, 
  sampleSubtitleData, 
  avengersSubtitleData, 
  ironManSubtitleData, 
  blackMirrorSubtitleData, 
  kungFuPandaSubtitleData 
} from '@/mocks/sample-episodes';
import colors from '@/constants/colors';

export default function VideoImportScreen() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState('');
  
  const handleSelectVideo = (videoId: string) => {
    setSelectedVideo(videoId);
    setError('');
  };
  
  const handleUpload = () => {
    if (!selectedVideo) {
      setError('Lütfen bir video seçin');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            
            // After 2 seconds, navigate to the import-subtitles screen
            setTimeout(() => {
              const episode = sampleEpisodes.find(ep => ep.id === selectedVideo);
              if (episode) {
                // Get the appropriate subtitle data based on the selected video
                let subtitleData;
                switch (episode.title) {
                  case 'Dark':
                    subtitleData = sampleSubtitleData;
                    break;
                  case 'Avengers':
                    subtitleData = avengersSubtitleData;
                    break;
                  case 'Iron Man':
                    subtitleData = ironManSubtitleData;
                    break;
                  case 'Black Mirror':
                    subtitleData = blackMirrorSubtitleData;
                    break;
                  case 'Kung Fu Panda':
                    subtitleData = kungFuPandaSubtitleData;
                    break;
                  default:
                    subtitleData = sampleSubtitleData;
                }
                
                router.push({
                  pathname: '/import-subtitles',
                  params: {
                    showName: episode.title,
                    episodeName: episode.episode,
                    fromDownloaded: 'true',
                    episodeId: episode.id,
                    justDownloaded: 'true',
                    subtitleDataKey: episode.title.toLowerCase().replace(/\s+/g, '-')
                  }
                });
              }
            }, 2000);
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const handleGoBack = () => {
    router.push('/(tabs)/create');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen 
        options={{ 
          title: 'Video İçe Aktar',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Video ve Altyazı İçe Aktar</Text>
        <Text style={styles.description}>
          Almanca video dosyasını yükleyin, sistem otomatik olarak altyazıları çıkaracak ve kelime listesi oluşturacak.
        </Text>
        
        {!isUploading && !uploadComplete ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Seç</Text>
              <Text style={styles.sectionDescription}>
                Cihazınızdan bir video seçin veya örnek videolardan birini kullanın
              </Text>
              
              <TouchableOpacity 
                style={styles.uploadButton}
                onPress={() => setError('Bu özellik şu anda demo modunda çalışmaktadır. Lütfen örnek videolardan birini seçin.')}
              >
                <Upload size={24} color={colors.dark.primary} />
                <Text style={styles.uploadButtonText}>Cihazdan Video Seç</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Örnek Videolar</Text>
              <Text style={styles.sectionDescription}>
                Hızlı başlangıç için örnek videolardan birini seçin
              </Text>
              
              {sampleEpisodes.map(episode => (
                <TouchableOpacity
                  key={episode.id}
                  style={[
                    styles.videoItem,
                    selectedVideo === episode.id && styles.selectedVideoItem
                  ]}
                  onPress={() => handleSelectVideo(episode.id)}
                >
                  <Image 
                    source={{ uri: episode.thumbnail }}
                    style={styles.videoThumbnail}
                    resizeMode="cover"
                  />
                  
                  <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle}>{episode.title}</Text>
                    <Text style={styles.videoEpisode}>{episode.episode}</Text>
                    <Text style={styles.videoDescription} numberOfLines={2}>
                      {episode.description}
                    </Text>
                    <View style={styles.videoMeta}>
                      <Text style={styles.videoLanguage}>{episode.language}</Text>
                      <Text style={styles.videoSubtitles}>
                        {episode.subtitleCount} altyazı
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.checkCircle,
                    selectedVideo === episode.id && styles.selectedCheckCircle
                  ]}>
                    {selectedVideo === episode.id && (
                      <Check size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {error ? (
              <View style={styles.errorBox}>
                <AlertCircle size={20} color={colors.dark.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            
            <Button
              title="Videoyu Yükle ve Altyazıları Çıkar"
              onPress={handleUpload}
              style={styles.button}
              disabled={!selectedVideo}
              icon={<Video size={20} color="#fff" />}
            />
          </>
        ) : (
          <View style={styles.uploadingContainer}>
            {isUploading ? (
              <>
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${uploadProgress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  Video yükleniyor... %{uploadProgress}
                </Text>
                <Text style={styles.progressDescription}>
                  Video yüklendikten sonra altyazılar otomatik olarak çıkarılacak ve kelime listesi oluşturulacak.
                </Text>
              </>
            ) : (
              <>
                <View style={styles.successIcon}>
                  <Check size={40} color={colors.dark.success} />
                </View>
                <Text style={styles.successTitle}>Yükleme Tamamlandı!</Text>
                <Text style={styles.successDescription}>
                  Video başarıyla yüklendi. Altyazılar çıkarılıyor ve kelime listesi oluşturuluyor...
                </Text>
                <ActivityIndicator size="large" color={colors.dark.primary} style={styles.loader} />
              </>
            )}
          </View>
        )}
      </ScrollView>
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
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.primary,
  },
  videoItem: {
    flexDirection: 'row',
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedVideoItem: {
    borderColor: colors.dark.primary,
    backgroundColor: `${colors.dark.primary}10`,
  },
  videoThumbnail: {
    width: 100,
    height: 140,
  },
  videoInfo: {
    flex: 1,
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 2,
  },
  videoEpisode: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    color: colors.dark.text,
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoLanguage: {
    fontSize: 12,
    color: colors.dark.secondary,
  },
  videoSubtitles: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  selectedCheckCircle: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  errorBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 12,
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: colors.dark.error,
  },
  button: {
    marginTop: 8,
  },
  uploadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 24,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.dark.card,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.dark.primary,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  progressDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  loader: {
    marginTop: 24,
  },
});