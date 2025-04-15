import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Award, TrendingUp, Plus } from 'lucide-react-native';
import ListCard from '@/components/ListCard';
import ProgressBar from '@/components/ProgressBar';
import WelcomeBanner from '@/components/WelcomeBanner';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { useProgressStore } from '@/store/progress-store';
import { sampleVocabularyLists } from '@/mocks/sample-episodes';
import colors from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { lists, addSampleLists } = useVocabularyStore();
  const { dailyStreak, quizResults, updateDailyStreak } = useProgressStore();
  
  useEffect(() => {
    // Add sample lists if none exist
    if (!lists || lists.length === 0) {
      addSampleLists(sampleVocabularyLists);
    }
    
    // Update daily streak
    updateDailyStreak();
  }, []);
  
  // Get recent lists (up to 3) - with null check
  const recentLists = lists && lists.length > 0 
    ? [...lists].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 3)
    : [];
  
  // Calculate total progress across all lists - with null checks
  const totalWords = lists && lists.length > 0
    ? lists.reduce((sum, list) => sum + (list.words?.length || 0), 0)
    : 0;
    
  const learnedWords = lists && lists.length > 0
    ? lists.reduce((sum, list) => 
        sum + (list.words?.filter(word => word.learned)?.length || 0), 0)
    : 0;
    
  const totalProgress = totalWords > 0 ? learnedWords / totalWords : 0;
  
  // Get recent quiz results - with null check
  const recentQuizzes = quizResults && quizResults.length > 0
    ? [...quizResults].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)
    : [];
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WelcomeBanner />
        
        <View style={styles.header}>
          <Text style={styles.title}>Merhaba!</Text>
          <View style={styles.streakContainer}>
            <TrendingUp size={20} color={colors.dark.primary} />
            <Text style={styles.streakText}>{dailyStreak || 0} günlük seri</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Toplam İlerleme</Text>
              <BookOpen size={20} color={colors.dark.primary} />
            </View>
            <Text style={styles.statValue}>
              {learnedWords}/{totalWords} kelime
            </Text>
            <ProgressBar progress={totalProgress} />
          </View>
          
          <View style={styles.statRow}>
            <View style={[styles.statCard, styles.smallStatCard]}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Quizler</Text>
                <Award size={20} color={colors.dark.secondary} />
              </View>
              <Text style={styles.statValue}>{quizResults?.length || 0}</Text>
            </View>
            
            <View style={[styles.statCard, styles.smallStatCard]}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Listeler</Text>
                <BookOpen size={20} color={colors.dark.secondary} />
              </View>
              <Text style={styles.statValue}>{lists?.length || 0}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son Listeler</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/lists')}>
            <Text style={styles.seeAllText}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        
        {recentLists.length > 0 ? (
          recentLists.map(list => (
            <ListCard
              key={list.id}
              list={{
                ...list,
                totalWords: list.words?.length || 0,
                learnedWords: list.words?.filter(word => word.learned)?.length || 0,
                source: list.sourceShow ? `${list.sourceShow} ${list.sourceEpisode || ''}` : undefined
              }}
              onPress={() => router.push(`/list/${list.id}`)}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Henüz Liste Yok</Text>
            <Text style={styles.emptyText}>
              Kelime listeniz bulunmuyor. Yeni bir liste oluşturmak için aşağıdaki butona tıklayın.
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => router.push('/(tabs)/create')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Plus size={20} color="#fff" />
                <Text style={styles.createButtonText}>Yeni Liste Oluştur</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        
        {recentQuizzes.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Son Quizler</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/progress')}>
                <Text style={styles.seeAllText}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
            
            {recentQuizzes.map((quiz, index) => {
              const quizList = lists?.find(l => l.id === quiz.listId);
              const quizDate = new Date(quiz.date);
              const formattedDate = quizDate.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
              });
              
              return (
                <TouchableOpacity 
                  key={index}
                  style={styles.quizCard}
                  onPress={() => router.push(`/list/${quiz.listId}/quiz`)}
                >
                  <View style={styles.quizInfo}>
                    <Award size={20} color={colors.dark.primary} />
                    <View style={styles.quizDetails}>
                      <Text style={styles.quizTitle}>
                        {quizList?.title || 'Bilinmeyen Liste'}
                      </Text>
                      <Text style={styles.quizDate}>{formattedDate}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.quizScore}>
                    <Text style={styles.quizScoreText}>
                      {quiz.correctAnswers}/{quiz.totalQuestions}
                    </Text>
                    <Text style={styles.quizScorePercent}>
                      %{Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
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
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.primary,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
  },
  smallStatCard: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  quizCard: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quizDetails: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
  },
  quizDate: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  quizScore: {
    alignItems: 'flex-end',
  },
  quizScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  quizScorePercent: {
    fontSize: 14,
    color: colors.dark.primary,
  },
});