import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Search, CheckCircle, Circle, BookOpen, BookCheck, List, FileText, ArrowLeft } from 'lucide-react-native';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { 
  sampleSubtitleData, 
  avengersSubtitleData, 
  ironManSubtitleData, 
  blackMirrorSubtitleData, 
  kungFuPandaSubtitleData 
} from '@/mocks/sample-episodes';
import SubtitleItem from '@/components/SubtitleItem';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import { SubtitleEntry } from '@/types/vocabulary';

export default function ImportSubtitlesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { importFromSubtitles, createQuizFromImport } = useVocabularyStore();
  
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState<SubtitleEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubtitles, setFilteredSubtitles] = useState<SubtitleEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importedListId, setImportedListId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState({
    showName: params.showName as string || 'Bilinmeyen Dizi',
    episodeName: params.episodeName as string || '',
    language: 'Almanca'
  });
  
  useEffect(() => {
    // Determine which subtitle data to use based on the show name
    let subtitleData;
    const subtitleDataKey = params.subtitleDataKey as string || '';
    
    if (subtitleDataKey === 'dark' || params.showName === 'Dark') {
      subtitleData = sampleSubtitleData;
    } else if (subtitleDataKey === 'avengers' || params.showName === 'Avengers') {
      subtitleData = avengersSubtitleData;
    } else if (subtitleDataKey === 'iron-man' || params.showName === 'Iron Man') {
      subtitleData = ironManSubtitleData;
    } else if (subtitleDataKey === 'black-mirror' || params.showName === 'Black Mirror') {
      subtitleData = blackMirrorSubtitleData;
    } else if (subtitleDataKey === 'kung-fu-panda' || params.showName === 'Kung Fu Panda') {
      subtitleData = kungFuPandaSubtitleData;
    } else {
      subtitleData = sampleSubtitleData;
    }
    
    setSubtitles(subtitleData.entries);
    setFilteredSubtitles(subtitleData.entries);
    setShowInfo({
      showName: subtitleData.showName,
      episodeName: subtitleData.episodeName,
      language: subtitleData.language
    });
    
    setIsLoading(false);
  }, [params]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSubtitles(subtitles);
    } else {
      const filtered = subtitles.filter(subtitle => 
        subtitle.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSubtitles(filtered);
    }
  }, [searchQuery, subtitles]);
  
  const handleToggleSelect = (subtitle: SubtitleEntry) => {
    const isSelected = selectedSubtitles.some(
      s => s.startTime === subtitle.startTime && s.text === subtitle.text
    );
    
    if (isSelected) {
      setSelectedSubtitles(selectedSubtitles.filter(
        s => !(s.startTime === subtitle.startTime && s.text === subtitle.text)
      ));
    } else {
      setSelectedSubtitles([...selectedSubtitles, subtitle]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedSubtitles.length === filteredSubtitles.length) {
      setSelectedSubtitles([]);
    } else {
      setSelectedSubtitles([...filteredSubtitles]);
    }
  };
  
  const handleImport = async () => {
    if (selectedSubtitles.length === 0) {
      Alert.alert('Uyarı', 'Lütfen en az bir altyazı seçin.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Import the selected subtitles
      const importedList = importFromSubtitles(
        {
          showName: showInfo.showName,
          episodeName: showInfo.episodeName,
          language: showInfo.language,
          entries: selectedSubtitles
        },
        selectedSubtitles
      );
      
      setImportedListId(importedList.id);
      setImportSuccess(true);
    } catch (error) {
      console.error('Error importing subtitles:', error);
      Alert.alert('Hata', 'Altyazıları içe aktarırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateQuiz = () => {
    if (!importedListId) return;
    
    try {
      const quizList = createQuizFromImport(importedListId);
      
      if (quizList) {
        Alert.alert(
          'Quiz Oluşturuldu',
          `"${quizList.title}" adlı quiz oluşturuldu. Şimdi quizi açmak ister misiniz?`,
          [
            {
              text: 'Hayır',
              style: 'cancel'
            },
            {
              text: 'Evet',
              onPress: () => router.push(`/list/${quizList.id}/quiz`)
            }
          ]
        );
      } else {
        Alert.alert('Hata', 'Quiz oluşturulurken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      Alert.alert('Hata', 'Quiz oluşturulurken bir hata oluştu.');
    }
  };
  
  const handleViewList = () => {
    if (importedListId) {
      router.push(`/list/${importedListId}`);
    }
  };

  const handleGoBack = () => {
    // Check if we came from episode details
    if (params.episodeId) {
      router.push({
        pathname: '/episode-details',
        params: { episodeId: params.episodeId }
      });
    } 
    // Check if we came from downloaded episodes
    else if (params.fromDownloaded === 'true') {
      router.push('/downloaded-episodes');
    }
    // Otherwise go back to create screen
    else {
      router.push('/(tabs)/create');
    }
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Altyazı İçe Aktar',
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            )
          }} 
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.dark.primary} />
          <Text style={styles.loadingText}>Altyazılar yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (importSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Altyazı İçe Aktar',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.push('/(tabs)/lists')} style={styles.headerButton}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            )
          }} 
        />
        <View style={styles.successContainer}>
          <CheckCircle size={60} color={colors.dark.success} />
          <Text style={styles.successTitle}>İçe Aktarma Başarılı!</Text>
          <Text style={styles.successText}>
            {selectedSubtitles.length} altyazı satırı başarıyla içe aktarıldı.
          </Text>
          
          <View style={styles.actionsContainer}>
            <Button 
              title="Kelime Listesini Görüntüle" 
              onPress={handleViewList}
              icon={<BookOpen size={20} color="#fff" />}
              style={styles.actionButton}
            />
            
            <Button 
              title="Quiz Oluştur" 
              onPress={handleCreateQuiz}
              icon={<BookCheck size={20} color="#fff" />}
              style={[styles.actionButton, { backgroundColor: colors.dark.secondary }]}
            />
            
            <Button 
              title="Listelere Dön" 
              onPress={() => router.push('/lists')}
              icon={<List size={20} color="#fff" />}
              style={[styles.actionButton, { backgroundColor: colors.dark.textSecondary }]}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: 'Altyazı İçe Aktar',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      <View style={styles.header}>
        <View style={styles.showInfo}>
          <Text style={styles.showTitle}>{showInfo.showName}</Text>
          {showInfo.episodeName && (
            <Text style={styles.episodeTitle}>{showInfo.episodeName}</Text>
          )}
          <Text style={styles.languageText}>{showInfo.language}</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.dark.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Altyazılarda ara..."
            placeholderTextColor={colors.dark.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.selectionHeader}>
          <TouchableOpacity 
            style={styles.selectAllButton} 
            onPress={handleSelectAll}
          >
            {selectedSubtitles.length === filteredSubtitles.length ? (
              <CheckCircle size={20} color={colors.dark.primary} />
            ) : (
              <Circle size={20} color={colors.dark.textSecondary} />
            )}
            <Text style={styles.selectAllText}>
              {selectedSubtitles.length === filteredSubtitles.length
                ? 'Tümünü Kaldır'
                : 'Tümünü Seç'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.selectionCount}>
            {selectedSubtitles.length} / {filteredSubtitles.length} seçildi
          </Text>
        </View>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.dark.primary} />
          <Text style={styles.loadingText}>Altyazılar içe aktarılıyor...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredSubtitles}
            keyExtractor={(item, index) => `${item.startTime}-${index}`}
            renderItem={({ item }) => (
              <SubtitleItem
                entry={item}
                isSelected={selectedSubtitles.some(
                  s => s.startTime === item.startTime && s.text === item.text
                )}
                onToggleSelect={() => handleToggleSelect(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
          
          <View style={styles.footer}>
            <Button
              title="İçe Aktar"
              onPress={handleImport}
              disabled={selectedSubtitles.length === 0}
              icon={<FileText size={20} color="#fff" />}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  headerButton: {
    padding: 8,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  showInfo: {
    marginBottom: 16,
  },
  showTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  episodeTitle: {
    fontSize: 16,
    color: colors.dark.text,
    marginTop: 4,
  },
  languageText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.dark.text,
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 8,
    color: colors.dark.text,
    fontSize: 14,
  },
  selectionCount: {
    color: colors.dark.textSecondary,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.dark.text,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  actionsContainer: {
    width: '100%',
    gap: 16,
  },
  actionButton: {
    marginBottom: 0,
  },
});