import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Volume2, ArrowLeft, Share2 } from 'lucide-react-native';
import { useDictionaryStore } from '@/store/dictionary-store';
import { useSettingsStore } from '@/store/settings-store';
import colors from '@/constants/colors';

export default function DictionaryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { entries, favorites, addToFavorites, removeFromFavorites } = useDictionaryStore();
  const { selectedLanguage } = useSettingsStore();
  
  const [entry, setEntry] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingExampleIndex, setPlayingExampleIndex] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundEntry = entries.find(e => e.id === id);
      setEntry(foundEntry);
      setIsFavorite(favorites.includes(id as string));
    }
  }, [id, entries, favorites]);
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id as string);
    } else {
      addToFavorites(id as string);
    }
    setIsFavorite(!isFavorite);
  };
  
  const playAudio = async (text, isExample = false, exampleIndex = null) => {
    try {
      if (isExample) {
        setPlayingExampleIndex(exampleIndex);
      } else {
        setIsPlaying(true);
      }
      
      if (Platform.OS === 'web') {
        // Use Web Speech API for web
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = `${selectedLanguage.code}-${selectedLanguage.code.toUpperCase()}`;
        
        // Set up completion handler
        utterance.onend = () => {
          if (isExample) {
            setPlayingExampleIndex(null);
          } else {
            setIsPlaying(false);
          }
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // For native platforms, we would use a different approach
        // This is a placeholder for now
        console.log("Playing audio for:", text);
        
        // Simulate audio playback completion
        setTimeout(() => {
          if (isExample) {
            setPlayingExampleIndex(null);
          } else {
            setIsPlaying(false);
          }
        }, text.length * 100); // Rough estimate based on text length
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      if (isExample) {
        setPlayingExampleIndex(null);
      } else {
        setIsPlaying(false);
      }
    }
  };
  
  // Get gender display based on language
  const getGenderDisplay = () => {
    if (!entry || !entry.gender) return null;
    
    switch (entry.sourceLanguage) {
      case 'de': // German
        return entry.gender === 'masculine' ? 'der' : 
               entry.gender === 'feminine' ? 'die' : 'das';
      case 'fr': // French
        return entry.gender === 'masculine' ? 'le' : 'la';
      case 'es': // Spanish
        return entry.gender === 'masculine' ? 'el' : 'la';
      case 'it': // Italian
        return entry.gender === 'masculine' ? 'il' : 'la';
      default:
        return null;
    }
  };
  
  // Determine text color for language level
  const getLevelColor = () => {
    if (!entry) return colors.dark.textSecondary;
    
    switch (entry.level) {
      case 'A1':
      case 'A2':
        return colors.dark.success;
      case 'B1':
      case 'B2':
        return colors.dark.secondary;
      case 'C1':
      case 'C2':
        return colors.dark.primary;
      default:
        return colors.dark.textSecondary;
    }
  };
  
  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: true,
            title: "Kelime Detayı",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: entry.sourceText,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity 
                onPress={handleToggleFavorite}
                style={styles.headerButton}
              >
                <Heart 
                  size={24} 
                  color={isFavorite ? colors.dark.primary : colors.dark.text} 
                  fill={isFavorite ? colors.dark.primary : 'none'} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  // Share functionality would go here
                  console.log("Share:", entry.sourceText);
                }}
                style={styles.headerButton}
              >
                <Share2 size={24} color={colors.dark.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.wordHeader}>
          <View style={styles.wordContainer}>
            <Text style={styles.sourceText}>{entry.sourceText}</Text>
            <TouchableOpacity 
              style={styles.audioButton} 
              onPress={() => playAudio(entry.sourceText)}
              disabled={isPlaying}
            >
              <Volume2 
                size={24} 
                color={isPlaying ? colors.dark.primary : colors.dark.text} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.levelContainer}>
            <View style={[styles.levelBadge, { backgroundColor: `${getLevelColor()}20` }]}>
              <Text style={[styles.levelText, { color: getLevelColor() }]}>{entry.level}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.targetText}>{entry.targetText}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Sözcük Türü:</Text>
            <Text style={styles.infoValue}>{entry.partOfSpeech}</Text>
          </View>
          
          {getGenderDisplay() && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cinsiyet:</Text>
              <Text style={styles.infoValue}>{getGenderDisplay()}</Text>
            </View>
          )}
          
          {entry.plural && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Çoğul:</Text>
              <Text style={styles.infoValue}>{entry.plural}</Text>
            </View>
          )}
        </View>
        
        {entry.synonyms && entry.synonyms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eş Anlamlılar</Text>
            <View style={styles.synonymsContainer}>
              {entry.synonyms.map((synonym, index) => (
                <View key={index} style={styles.synonymBadge}>
                  <Text style={styles.synonymText}>{synonym}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {entry.examples && entry.examples.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Örnek Cümleler</Text>
            {entry.examples.map((example, index) => (
              <View key={index} style={styles.exampleItem}>
                <View style={styles.exampleHeader}>
                  <Text style={styles.exampleText}>{example.text}</Text>
                  <TouchableOpacity 
                    style={styles.exampleAudioButton}
                    onPress={() => playAudio(example.text, true, index)}
                    disabled={playingExampleIndex === index}
                  >
                    <Volume2 
                      size={18} 
                      color={playingExampleIndex === index ? colors.dark.primary : colors.dark.secondary} 
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.exampleTranslation}>{example.translation}</Text>
              </View>
            ))}
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
  headerButton: {
    padding: 8,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.dark.text,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginRight: 12,
  },
  audioButton: {
    padding: 8,
  },
  levelContainer: {
    alignItems: 'flex-end',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  targetText: {
    fontSize: 24,
    color: colors.dark.secondary,
    marginBottom: 24,
  },
  infoContainer: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.dark.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 12,
  },
  synonymsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  synonymBadge: {
    backgroundColor: 'rgba(77, 171, 247, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  synonymText: {
    color: colors.dark.secondary,
    fontSize: 14,
  },
  exampleItem: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 16,
    color: colors.dark.text,
    fontStyle: 'italic',
    flex: 1,
    marginRight: 8,
  },
  exampleAudioButton: {
    padding: 4,
  },
  exampleTranslation: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
});