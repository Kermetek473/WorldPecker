import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Award, RefreshCw } from 'lucide-react-native';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { useProgressStore } from '@/store/progress-store';
import QuizQuestion from '@/components/QuizQuestion';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import { VocabularyWord } from '@/types/vocabulary';

type QuestionType = 'translate' | 'multiple-choice';

interface Question {
  id: string;
  word: VocabularyWord;
  options?: string[];
  correctAnswer: string;
  type: QuestionType;
}

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getList } = useVocabularyStore();
  const { addQuizResult } = useProgressStore();
  
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: boolean}>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionType, setQuestionType] = useState<QuestionType>('translate');
  const [startTime, setStartTime] = useState<Date>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  
  useEffect(() => {
    if (id) {
      const vocabularyList = getList(id as string);
      setList(vocabularyList);
      
      if (vocabularyList && vocabularyList.words && vocabularyList.words.length > 0) {
        // Prepare questions
        prepareQuestions(vocabularyList.words);
      }
      
      setIsLoading(false);
      setStartTime(new Date());
    }
  }, [id, getList]);
  
  const prepareQuestions = useCallback((words: VocabularyWord[]) => {
    if (!words || words.length === 0) return;
    
    // Shuffle words
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    
    // Limit to 10 questions or less if fewer words
    const selectedWords = shuffledWords.slice(0, Math.min(10, shuffledWords.length));
    
    // Create questions with alternating types
    const newQuestions: Question[] = selectedWords.map((word, index) => {
      const type: QuestionType = index % 2 === 0 ? 'translate' : 'multiple-choice';
      
      // For multiple choice, create options
      let options: string[] = [];
      if (type === 'multiple-choice') {
        // Get the correct answer
        const correctAnswer = word.targetText;
        
        // Get 3 random incorrect options from other words
        const otherWords = words.filter(w => w.id !== word.id);
        const shuffledOtherWords = [...otherWords].sort(() => Math.random() - 0.5);
        const incorrectOptions = shuffledOtherWords
          .slice(0, Math.min(3, shuffledOtherWords.length))
          .map(w => w.targetText);
        
        // Combine correct and incorrect options and shuffle
        options = [...incorrectOptions, correctAnswer].sort(() => Math.random() - 0.5);
      }
      
      return {
        id: word.id,
        word,
        options: options.length > 0 ? options : undefined,
        correctAnswer: word.targetText,
        type
      };
    });
    
    setQuestions(newQuestions);
    setQuestionType(newQuestions[0]?.type || 'translate');
  }, []);
  
  const handleAnswer = useCallback((wordId: string, isCorrect: boolean) => {
    // Update answers
    setAnswers(prev => ({
      ...prev,
      [wordId]: isCorrect
    }));
    
    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  }, []);
  
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionType(questions[currentQuestionIndex + 1].type);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Calculate time spent
      const endTime = new Date();
      const quizTimeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      setTimeSpent(quizTimeSpent);
      
      // Save quiz results
      if (id) {
        addQuizResult(id as string, {
          date: new Date().toISOString(),
          score,
          total: questions.length,
          answers,
          timeSpent: quizTimeSpent,
          category: 'vocabulary'
        });
      }
    }
  }, [currentQuestionIndex, questions, score, answers, id, addQuizResult, startTime]);
  
  const handleRestartQuiz = useCallback(() => {
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers({});
    setQuizCompleted(false);
    setStartTime(new Date());
    
    // Prepare new questions
    if (list && list.words) {
      prepareQuestions(list.words);
    }
  }, [list, prepareQuestions]);
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Quiz",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.dark.primary} />
          <Text style={styles.loadingText}>Quiz yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!list || !list.words || list.words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Quiz",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bu liste için quiz oluşturulamadı.</Text>
          <Text style={styles.emptySubtext}>Listede kelime bulunmuyor veya bir hata oluştu.</Text>
          <Button 
            title="Listeye Dön" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Quiz Sonuçları",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.dark.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <Award size={80} color={colors.dark.primary} />
          <Text style={styles.resultsTitle}>Quiz Tamamlandı!</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              Skorunuz: <Text style={styles.scoreValue}>{score}/{questions.length}</Text>
            </Text>
            <Text style={styles.percentageText}>%{percentage}</Text>
          </View>
          
          <View style={styles.quizStats}>
            <View style={styles.quizStatItem}>
              <Clock size={20} color={colors.dark.textSecondary} />
              <Text style={styles.quizStatText}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            </View>
            <View style={styles.quizStatItem}>
              <Award size={20} color={percentage >= 70 ? colors.dark.success : colors.dark.error} />
              <Text 
                style={[
                  styles.quizStatText, 
                  {color: percentage >= 70 ? colors.dark.success : colors.dark.error}
                ]}
              >
                {percentage >= 70 ? 'Başarılı' : 'Geliştirilmeli'}
              </Text>
            </View>
          </View>
          
          <View style={styles.resultsSummary}>
            {questions.map((question, index) => (
              <View key={question.id} style={styles.resultItem}>
                <View style={styles.resultNumber}>
                  <Text style={styles.resultNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultWord}>{question.word.sourceText}</Text>
                  <Text style={styles.resultTranslation}>{question.word.targetText}</Text>
                </View>
                {answers[question.id] ? (
                  <CheckCircle size={24} color={colors.dark.success} />
                ) : (
                  <XCircle size={24} color={colors.dark.error} />
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <Button 
              title="Quizi Tekrarla" 
              onPress={handleRestartQuiz}
              icon={<RefreshCw size={20} color="#fff" />}
              style={styles.restartButton}
            />
            <Button 
              title="Listeye Dön" 
              onPress={() => router.back()}
              style={styles.backToListButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Quiz: ${list.title}`,
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
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
      </View>
      
      {questions.length > 0 && (
        <View style={styles.quizContainer}>
          <QuizQuestion
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionType={questionType}
          />
          
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Sonraki Soru' : 'Quizi Tamamla'}
            </Text>
            <ArrowRight size={20} color={colors.dark.text} />
          </TouchableOpacity>
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
    width: '80%',
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
  quizContainer: {
    flex: 1,
    padding: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginRight: 8,
  },
  resultsContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginTop: 16,
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    color: colors.dark.text,
    marginBottom: 8,
  },
  scoreValue: {
    fontWeight: 'bold',
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark.primary,
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
  },
  quizStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizStatText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
  },
  resultsSummary: {
    width: '100%',
    marginBottom: 32,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  resultNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark.textSecondary,
  },
  resultContent: {
    flex: 1,
  },
  resultWord: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 2,
  },
  resultTranslation: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  actionsContainer: {
    width: '100%',
    gap: 16,
  },
  restartButton: {
    backgroundColor: colors.dark.secondary,
  },
  backToListButton: {
    backgroundColor: colors.dark.textSecondary,
  },
});