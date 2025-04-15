import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useGameStore } from '@/store/game-store';
import { useProgressStore } from '@/store/progress-store';
import colors from '@/constants/colors';
import { Award, ArrowRight, ArrowLeft, CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react-native';
import { QuizQuestion } from '@/types/game';
import QuizQuestionComponent from '@/components/QuizQuestionComponent';

export default function GameQuizScreen() {
  const router = useRouter();
  const { id, levelId, missionId } = useLocalSearchParams();
  const { 
    getQuiz, 
    completeMission,
    getMission
  } = useGameStore();
  const { addGameQuizResult } = useProgressStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: boolean}>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [earnedXP, setEarnedXP] = useState(0);
  const [startTime, setStartTime] = useState<Date>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quiz, setQuiz] = useState<{
    id: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
  } | null>(null);
  
  useEffect(() => {
    if (id) {
      const quizData = getQuiz(id as string);
      console.log("Loading quiz with ID:", id);
      console.log("Quiz data found:", quizData ? "Yes" : "No");
      
      if (quizData) {
        setQuiz(quizData);
        console.log("Quiz title:", quizData.title);
        console.log("Number of questions:", quizData.questions.length);
      } else {
        console.error("Quiz not found with ID:", id);
      }
      
      if (levelId && missionId) {
        const mission = getMission(levelId as string, missionId as string);
        if (mission) {
          setEarnedXP(mission.xpReward);
          console.log("Mission found, XP reward:", mission.xpReward);
        } else {
          console.error("Mission not found with levelId:", levelId, "missionId:", missionId);
        }
      }
      
      setIsLoading(false);
      setStartTime(new Date());
    }
  }, [id, getQuiz, getMission, levelId, missionId]);
  
  const handleAnswer = (questionId: string, isCorrect: boolean) => {
    console.log("Answer selected for question:", questionId, "Correct:", isCorrect);
    
    // Update answers
    setAnswers(prev => ({
      ...prev,
      [questionId]: isCorrect
    }));
    
    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (!quiz) return;
    
    console.log("Moving to next question. Current index:", currentQuestionIndex);
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Calculate time spent
      const endTime = new Date();
      const quizTimeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      setTimeSpent(quizTimeSpent);
      
      console.log("Quiz completed. Final score:", score);
      
      // Save quiz results to progress store
      addGameQuizResult(id as string, {
        correctAnswers: score,
        totalQuestions: quiz.questions.length,
        timeSpent: quizTimeSpent,
        levelId: levelId as string,
        missionId: missionId as string
      });
      
      // Complete the mission if levelId and missionId are provided
      if (levelId && missionId) {
        console.log("Completing mission:", missionId, "for level:", levelId);
        completeMission(levelId as string, missionId as string);
        
        // Special case for Berlin level
        if (levelId === 'level1') {
          console.log("This is a mission from Berlin level, checking if it's the last one");
          const level = useGameStore.getState().getLevel(levelId as string);
          if (level) {
            const missionsLeft = level.missions.filter(m => !m.completed && m.id !== missionId).length;
            console.log(`Missions left in Berlin level: ${missionsLeft}`);
            if (missionsLeft === 0) {
              console.log("This was the last mission in Berlin level, unlocking Şehirde Günlük Yaşam");
              // The unlocking will happen in completeMission function
            }
          }
        }
      }
    }
  };
  
  const handleRestartQuiz = () => {
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers({});
    setQuizCompleted(false);
    setStartTime(new Date());
    console.log("Quiz restarted");
  };
  
  const handleFinish = () => {
    // Special case for Berlin level
    if (levelId === 'level1') {
      const level = useGameStore.getState().getLevel(levelId as string);
      if (level && level.missions.every(m => m.completed || m.id === missionId)) {
        console.log("This was the last mission in Berlin level, showing special alert");
        router.push(`/game/level/${levelId}`);
      } else {
        router.back();
      }
    } else {
      router.back();
    }
  };
  
  const handleBackPress = () => {
    router.back();
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <Stack.Screen options={{ 
          title: "Quiz Yükleniyor",
          headerStyle: {
            backgroundColor: colors.dark.background,
          },
          headerTintColor: colors.dark.text,
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
              <ArrowLeft size={20} color={colors.dark.primary} />
              <Text style={styles.headerBackText}>Geri</Text>
            </TouchableOpacity>
          ),
        }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.dark.primary} />
          <Text style={styles.loadingText}>Quiz yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!quiz) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <Stack.Screen options={{ 
          title: "Quiz Bulunamadı",
          headerStyle: {
            backgroundColor: colors.dark.background,
          },
          headerTintColor: colors.dark.text,
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
              <ArrowLeft size={20} color={colors.dark.primary} />
              <Text style={styles.headerBackText}>Geri</Text>
            </TouchableOpacity>
          ),
        }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Quiz bulunamadı. ID: {id}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Geri
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    // Special message for Berlin level completion
    const isLastBerlinMission = levelId === 'level1' && useGameStore.getState().getLevel(levelId as string)?.missions.every(m => m.completed || m.id === missionId);
    
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <Stack.Screen options={{ 
          title: "Quiz Tamamlandı",
          headerStyle: {
            backgroundColor: colors.dark.background,
          },
          headerTintColor: colors.dark.text,
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
              <ArrowLeft size={20} color={colors.dark.primary} />
              <Text style={styles.headerBackText}>Geri</Text>
            </TouchableOpacity>
          ),
        }} />
        
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <View style={styles.completionContainer}>
            <View style={styles.xpBadge}>
              <Award size={24} color={colors.dark.primary} />
              <Text style={styles.xpText}>+{earnedXP} XP</Text>
            </View>
            <Text style={styles.completionText}>
              {isLastBerlinMission 
                ? "Tebrikler! Son görevi tamamladınız. Berlin'e Hoş Geldiniz bölümünü bitirdiniz ve Şehirdeki Günlük Yaşam bölümünün kilidini açtınız!"
                : "Tebrikler! Quiz'i başarıyla tamamladınız."}
            </Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                Skorunuz: <Text style={styles.scoreValue}>{score}/{quiz.questions.length}</Text>
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
              {quiz.questions.map((question, index) => (
                <View key={question.id} style={styles.resultItem}>
                  <View style={styles.resultNumber}>
                    <Text style={styles.resultNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.resultContent}>
                    <Text style={styles.resultWord}>{question.text}</Text>
                    <Text style={styles.resultTranslation}>{question.correctAnswer}</Text>
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
              <TouchableOpacity 
                style={styles.restartButton}
                onPress={handleRestartQuiz}
              >
                <RefreshCw size={20} color="#fff" />
                <Text style={styles.restartButtonText}>Quiz'i Tekrarla</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinish}
              >
                <Text style={styles.finishButtonText}>
                  {isLastBerlinMission ? "Seviyeye Dön ve İlerle" : "Seviyeye Dön"}
                </Text>
                <ArrowRight size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ 
        title: quiz.title,
        headerStyle: {
          backgroundColor: colors.dark.background,
        },
        headerTintColor: colors.dark.text,
        headerLeft: () => (
          <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
            <ArrowLeft size={20} color={colors.dark.primary} />
            <Text style={styles.headerBackText}>Geri</Text>
          </TouchableOpacity>
        ),
      }} />
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} / {quiz.questions.length}
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {quiz.questions.length > 0 && (
          <View style={styles.quizContainer}>
            <QuizQuestionComponent
              key={currentQuestionIndex}
              question={quiz.questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
            
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Sonraki Soru' : 'Quiz\'i Tamamla'}
              </Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>
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
  headerBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerBackText: {
    color: colors.dark.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.dark.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  progressContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.dark.cardBackground,
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
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  resultsContainer: {
    flexGrow: 1,
    padding: 16,
  },
  completionContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 8,
  },
  xpText: {
    color: colors.dark.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  completionText: {
    fontSize: 16,
    color: colors.dark.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
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
    marginBottom: 24,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  restartButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  finishButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});