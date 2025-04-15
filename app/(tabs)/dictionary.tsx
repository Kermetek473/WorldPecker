import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, X, History, Heart, Trash2, Languages } from 'lucide-react-native';
import { useDictionaryStore } from '@/store/dictionary-store';
import { useSettingsStore } from '@/store/settings-store';
import DictionaryEntry from '@/components/DictionaryEntry';
import AlphabetSelector from '@/components/AlphabetSelector';
import colors from '@/constants/colors';

export default function DictionaryScreen() {
  const router = useRouter();
  const { 
    entries, 
    searchWord, 
    recentSearches, 
    favorites, 
    addToRecentSearches, 
    clearRecentSearches,
    getEntriesByLetter,
    getAllEntries
  } = useDictionaryStore();
  const { selectedLanguage, nativeLanguage } = useSettingsStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchWord>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [letterResults, setLetterResults] = useState<ReturnType<typeof getEntriesByLetter>>([]);
  
  // Update letter results when language or selected letter changes
  useEffect(() => {
    if (selectedLetter) {
      const results = getEntriesByLetter(selectedLetter, selectedLanguage.code, nativeLanguage.code);
      setLetterResults(results);
    } else {
      // When "Tümü" is selected, show all entries for the current language pair
      const allEntries = getAllEntries(selectedLanguage.code, nativeLanguage.code);
      setLetterResults(allEntries);
    }
  }, [selectedLetter, selectedLanguage, nativeLanguage]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API search delay
    const timer = setTimeout(() => {
      const results = searchWord(searchQuery, selectedLanguage.code, nativeLanguage.code);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLanguage, nativeLanguage]);
  
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    addToRecentSearches(searchQuery);
    setShowRecent(false);
    setSelectedLetter(null); // Clear letter filter when searching
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const handleSelectRecent = (query: string) => {
    setSearchQuery(query);
    setShowRecent(false);
    setSelectedLetter(null); // Clear letter filter when selecting recent search
  };
  
  const handleClearRecent = () => {
    Alert.alert(
      'Son Aramaları Temizle',
      'Tüm son aramaları silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Temizle',
          onPress: clearRecentSearches,
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleWordPress = (wordId: string) => {
    router.push(`/dictionary/${wordId}`);
  };
  
  const handleSelectLetter = (letter: string | null) => {
    setSelectedLetter(letter);
    setSearchQuery(''); // Clear search when selecting a letter
    setSearchResults([]);
  };
  
  const renderEmptySearch = () => {
    if (isSearching) return null;
    
    if (searchQuery.trim() !== '' && searchResults.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            "{searchQuery}" için sonuç bulunamadı
          </Text>
          <Text style={styles.emptySubtext}>
            Farklı bir kelime aramayı deneyin veya yazımı kontrol edin
          </Text>
        </View>
      );
    }
    
    if (selectedLetter && letterResults.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            "{selectedLetter}" ile başlayan kelime bulunamadı
          </Text>
          <Text style={styles.emptySubtext}>
            Başka bir harf seçmeyi deneyin
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.initialContainer}>
        <View style={styles.welcomeContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/Ql4jOvh.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>HOŞGELDİNİZ</Text>
            <Text style={styles.welcomeSubtitle}>Dil Öğrenme Uygulaması</Text>
          </View>
        </View>
        <View>
          <Languages size={60} color={colors.dark.textSecondary} />
        </View>
        <Text style={styles.initialText}>
          {selectedLanguage.flag} {selectedLanguage.name} - {nativeLanguage.flag} {nativeLanguage.name}
        </Text>
        <Text style={styles.initialSubtext}>
          Sözlükte aramak için bir kelime yazın veya bir harf seçin
        </Text>
      </View>
    );
  };
  
  const renderFavorites = () => {
    const favoriteEntries = entries.filter(
      entry => 
        favorites.includes(entry.id) && 
        entry.sourceLanguage === selectedLanguage.code && 
        entry.targetLanguage === nativeLanguage.code
    );
    
    if (favoriteEntries.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <View>
            <Heart size={60} color={colors.dark.textSecondary} />
          </View>
          <Text style={styles.emptyText}>
            Henüz favori kelimeniz yok
          </Text>
          <Text style={styles.emptySubtext}>
            Favori kelimeleriniz burada görünecek
          </Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DictionaryEntry
            entry={item}
            isFavorite={true}
            onPress={() => handleWordPress(item.id)}
            onToggleFavorite={() => useDictionaryStore.getState().removeFromFavorites(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image 
            source={{ uri: 'https://i.imgur.com/Ql4jOvh.png' }} 
            style={styles.headerLogo} 
            resizeMode="contain"
          />
          <Text style={styles.title}>Sözlük</Text>
        </View>
        <View style={styles.languageInfo}>
          <Text style={styles.languageText}>
            {selectedLanguage.flag} {selectedLanguage.name} - {nativeLanguage.flag} {nativeLanguage.name}
          </Text>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <View>
            <Search size={20} color={colors.dark.textSecondary} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Kelime ara..."
            placeholderTextColor={colors.dark.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            onFocus={() => setShowRecent(true)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <View>
                <X size={18} color={colors.dark.textSecondary} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              !showFavorites && styles.activeTab
            ]}
            onPress={() => setShowFavorites(false)}
          >
            <Text style={[
              styles.tabText, 
              !showFavorites && styles.activeTabText
            ]}>
              Arama
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              showFavorites && styles.activeTab
            ]}
            onPress={() => setShowFavorites(true)}
          >
            <Text style={[
              styles.tabText, 
              showFavorites && styles.activeTabText
            ]}>
              Favoriler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {!showFavorites && (
        <AlphabetSelector 
          onSelectLetter={handleSelectLetter}
          selectedLetter={selectedLetter}
          language={selectedLanguage.code}
        />
      )}
      
      {showRecent && recentSearches.length > 0 && !showFavorites && !selectedLetter && (
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <View style={styles.recentTitleContainer}>
              <View>
                <History size={16} color={colors.dark.textSecondary} />
              </View>
              <Text style={styles.recentTitle}>Son Aramalar</Text>
            </View>
            <TouchableOpacity onPress={handleClearRecent}>
              <View>
                <Trash2 size={16} color={colors.dark.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>
          
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() => handleSelectRecent(search)}
            >
              <View>
                <History size={16} color={colors.dark.textSecondary} />
              </View>
              <Text style={styles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.dark.primary} />
        </View>
      ) : (
        <>
          {showFavorites ? (
            renderFavorites()
          ) : (
            searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <DictionaryEntry
                    entry={item}
                    isFavorite={favorites.includes(item.id)}
                    onPress={() => handleWordPress(item.id)}
                    onToggleFavorite={() => {
                      if (favorites.includes(item.id)) {
                        useDictionaryStore.getState().removeFromFavorites(item.id);
                      } else {
                        useDictionaryStore.getState().addToFavorites(item.id);
                      }
                    }}
                  />
                )}
                contentContainerStyle={styles.listContent}
              />
            ) : letterResults.length > 0 ? (
              <FlatList
                data={letterResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <DictionaryEntry
                    entry={item}
                    isFavorite={favorites.includes(item.id)}
                    onPress={() => handleWordPress(item.id)}
                    onToggleFavorite={() => {
                      if (favorites.includes(item.id)) {
                        useDictionaryStore.getState().removeFromFavorites(item.id);
                      } else {
                        useDictionaryStore.getState().addToFavorites(item.id);
                      }
                    }}
                  />
                )}
                contentContainerStyle={styles.listContent}
              />
            ) : (
              renderEmptySearch()
            )
          )}
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
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  languageInfo: {
    marginBottom: 8,
  },
  languageText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: colors.dark.text,
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.dark.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
  },
  activeTabText: {
    color: colors.dark.primary,
    fontWeight: '600',
  },
  recentContainer: {
    backgroundColor: colors.dark.card,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 12,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.textSecondary,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  recentText: {
    fontSize: 16,
    color: colors.dark.text,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark.text,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  initialText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark.text,
    marginTop: 16,
    textAlign: 'center',
  },
  initialSubtext: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.dark.primary,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.dark.text,
  },
});