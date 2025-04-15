import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Repeat, Volume2 } from 'lucide-react-native';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { useProgressStore } from '@/store/progress-store';
import colors from '@/constants/colors';
import { VocabularyWord } from '@/types/vocabulary';

export default function LearnScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getList, markWordAsLearned } = useVocabularyStore();
  const { addLearningSession } = useProgressStore();
  
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Date>(null);
  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>([]);
  
  useEffect(() => {
    if (id) {
      const vocabularyList = getList(id as string);
      setList(vocabularyList);
      
      if (vocabularyList && vocabularyList.words && vocabularyList.words.length > 0) {
        // Filter out already learned words and shuffle the remaining
        const notLearnedWords = vocabularyList.words
          .filter(word => !word.learned)
          .sort(() => Math.random() - 0.5);
        
        // If there are no unlearned words, use all words
        const wordsToLearn = notLearnedWords.length > 0 
          ? notLearnedWords 
          : [...vocabularyList.words].sort(() => Math.random() - 0.5);
        
        // Limit to 20 words per session
        setSessionWords(wordsToLearn.slice(0, 20));
      }
      
      setIsLoading(false);
      setStartTime(new Date());
    }
  }, [id, getList]);
  
  const handleMarkLearned = useCallback(() => {
    if (!sessionWords[currentWordIndex]) return;
    
    const wordId = sessionWords[currentWordIndex].id;
    
    // Add to learned words if not already there
    if (!learnedWords.includes(wordId)) {
      setLearnedWords(prev => [...prev, wordId]);
    }
    
    // Mark as learned in the store
    markWordAsLearned(id as string, wordId, true);
    
    // Move to next word
    handleNextWord();
  }, [currentWordIndex, sessionWords, learnedWords, id, markWordAsLearned]);
  
  const handleNextWord = useCallback(() => {
    if (currentWordIndex < sessionWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowTranslation(false);
    } else {
      // End of session
      const endTime = new Date();
      const sessionTimeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      
      // Save learning session
      addLearningSession({
        listId: id as string,
        wordsStudied: sessionWords.length,
        timeSpent: sessionTimeSpent,
        wordsLearned: learnedWords.length
      });
      
      // Navigate back to list
      router.back();
    }
  }, [currentWordIndex, sessionWords, startTime, learnedWords, id, addLearningSession, router]);
  
  const toggleTranslation = useCallback(() => {
    setShowTranslation(prev => !prev);
  }, []);
  
  const handlePlayAudio = useCallback(() => {
    // Audio playback would be implemented here
    // For now, just show a placeholder
    console.log("Playing audio for:", sessionWords[currentWordIndex]?.sourceText);
  }, [currentWordIndex, sessionWords]);
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Öğrenme",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.dark.primary} />
          <Text style={styles.loadingText}>Kelimeler yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!list || !sessionWords || sessionWords.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Öğrenme",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bu liste için öğrenme oturumu oluşturulamadı.</Text>
          <Text style={styles.emptySubtext}>Listede kelime bulunmuyor veya bir hata oluştu.</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Listeye Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const currentWord = sessionWords[currentWordIndex];
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Öğrenme: ${list.title}`,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentWordIndex + 1) / sessionWords.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentWordIndex + 1} / {sessionWords.length}
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.wordCard}>
            <View style={styles.wordHeader}>
              <Text style={styles.sourceLanguage}>{list.sourceLanguage.toUpperCase()}</Text>
              <TouchableOpacity 
                style={styles.audioButton}
                onPress={handlePlayAudio}
              >
                <Volume2 size={20} color={colors.dark.text} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.wordText}>{currentWord.sourceText}</Text>
            
            {currentWord.example && (
              <Text style={styles.exampleText}>
                "{currentWord.example}"
              </Text>
            )}
            
            <TouchableOpacity 
              style={styles.translationButton}
              onPress={toggleTranslation}
            >
              <Text style={styles.translationButtonText}>
                {showTranslation ? 'Çeviriyi Gizle' : 'Çeviriyi Göster'}
              </Text>
              <Repeat size={16} color={colors.dark.primary} />
            </TouchableOpacity>
            
            {showTranslation && (
              <View style={styles.translationContainer}>
                <Text style={styles.targetLanguage}>{list.targetLanguage.toUpperCase()}</Text>
                <Text style={styles.translationText}>{currentWord.targetText}</Text>
                
                {currentWord.exampleTranslation && (
                  <Text style={styles.exampleTranslationText}>
                    "{currentWord.exampleTranslation}"
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.learnedButton}
            onPress={handleMarkLearned}
          >
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.learnedButtonText}>Öğrendim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleNextWord}
          >
            <XCircle size={20} color={colors.dark.text} />
            <Text style={styles.skipButtonText}>Atla</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.dark.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.dark.card,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.dark.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    minWidth: 50,
    textAlign: 'right',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  wordCard: {
    backgroundColor: colors.dark.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sourceLanguage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.textSecondary,
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  exampleText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    fontStyle: 'italic',
    marginBottom: 24,
    textAlign: 'center',
  },
  translationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  translationButtonText: {
    fontSize: 16,
    color: colors.dark.primary,
    fontWeight: '600',
  },
  translationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  targetLanguage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  translationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  exampleTranslationText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  learnedButton: {
    flex: 1,
    backgroundColor: colors.dark.success,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  learnedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  skipButton: {
    flex: 1,
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
});