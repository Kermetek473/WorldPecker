import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, Calendar, Clock, TrendingUp, ChevronDown, ChevronUp, BarChart, BookOpen, Brain } from 'lucide-react-native';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { useProgressStore } from '@/store/progress-store';
import { useGameStore } from '@/store/game-store';
import colors from '@/constants/colors';

export default function ProgressScreen() {
  const { lists } = useVocabularyStore();
  const { dailyStreak, quizResults, learningSessions } = useProgressStore();
  const { levels, getCompletedMissionsCount, getTotalMissionsCount } = useGameStore();
  
  const [expandedSections, setExpandedSections] = useState({
    quizzes: true,
    lists: true,
    game: true,
    learning: false
  });
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Calculate total progress
  const totalWords = lists.reduce((sum, list) => sum + (list.words?.length || 0), 0);
  const learnedWords = lists.reduce((sum, list) => sum + (list.words?.filter(word => word.learned)?.length || 0), 0);
  const overallProgress = totalWords > 0 ? learnedWords / totalWords : 0;
  
  // Calculate average quiz score
  const averageScore = quizResults.length > 0
    ? quizResults.reduce((sum, result) => sum + (result.correctAnswers / result.totalQuestions), 0) / quizResults.length
    : 0;
  
  // Calculate total learning time (in minutes)
  const totalLearningTime = learningSessions.reduce((sum, session) => sum + session.timeSpent, 0) / 60;
  
  // Get recent quiz results (last 5)
  const recentQuizzes = [...quizResults]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Calculate game progress
  const completedMissions = levels.reduce((sum, level) => sum + getCompletedMissionsCount(level.id), 0);
  const totalMissions = levels.reduce((sum, level) => sum + getTotalMissionsCount(level.id), 0);
  const gameProgress = totalMissions > 0 ? completedMissions / totalMissions : 0;
  
  // Calculate learning trends
  const last7DaysQuizzes = quizResults
    .filter(quiz => {
      const quizDate = new Date(quiz.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return quizDate >= sevenDaysAgo;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const quizScoreTrend = last7DaysQuizzes.length > 0
    ? last7DaysQuizzes.map(quiz => (quiz.correctAnswers / quiz.totalQuestions) * 100)
    : [];
  
  const averageScoreTrend = quizScoreTrend.length > 0
    ? quizScoreTrend.reduce((sum, score) => sum + score, 0) / quizScoreTrend.length
    : 0;
  
  const scoreTrendImproving = quizScoreTrend.length >= 2 && 
    quizScoreTrend[quizScoreTrend.length - 1] > quizScoreTrend[0];
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>İlerleme Durumum</Text>
        
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Award size={20} color={colors.dark.primary} />
              <Text style={styles.statTitle}>Günlük Seri</Text>
            </View>
            <Text style={styles.statValue}>{dailyStreak} gün</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <BookOpen size={20} color={colors.dark.secondary} />
              <Text style={styles.statTitle}>Öğrenilen</Text>
            </View>
            <Text style={styles.statValue}>{learnedWords} kelime</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Clock size={20} color={colors.dark.success} />
              <Text style={styles.statTitle}>Toplam Süre</Text>
            </View>
            <Text style={styles.statValue}>{Math.round(totalLearningTime)} dk</Text>
          </Card>
        </View>
        
        <Card>
          <Text style={styles.cardTitle}>Genel İlerleme</Text>
          <ProgressBar 
            progress={overallProgress} 
            showPercentage 
            label="Tüm Kelimeler" 
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            Toplam {totalWords} kelimeden {learnedWords} tanesini öğrendiniz.
          </Text>
        </Card>
        
        <Card>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => toggleSection('quizzes')}
          >
            <View style={styles.sectionTitleContainer}>
              <BarChart size={20} color={colors.dark.primary} />
              <Text style={styles.cardTitle}>Quiz Performansı</Text>
            </View>
            {expandedSections.quizzes ? (
              <ChevronUp size={20} color={colors.dark.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.dark.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.quizzes && (
            <>
              <View style={styles.quizStatsContainer}>
                <View style={styles.quizStat}>
                  <Text style={styles.quizStatValue}>{quizResults.length}</Text>
                  <Text style={styles.quizStatLabel}>Tamamlanan Quiz</Text>
                </View>
                <View style={styles.quizStat}>
                  <Text style={styles.quizStatValue}>%{Math.round(averageScore * 100)}</Text>
                  <Text style={styles.quizStatLabel}>Ortalama Skor</Text>
                </View>
              </View>
              
              {quizScoreTrend.length > 0 && (
                <View style={styles.trendContainer}>
                  <View style={styles.trendHeader}>
                    <Text style={styles.trendTitle}>Son 7 Gün Trend</Text>
                    <Text 
                      style={[
                        styles.trendValue, 
                        { color: scoreTrendImproving ? colors.dark.success : colors.dark.error }
                      ]}
                    >
                      {scoreTrendImproving ? '↑' : '↓'} %{Math.round(averageScoreTrend)}
                    </Text>
                  </View>
                  <View style={styles.trendBarContainer}>
                    {quizScoreTrend.map((score, index) => (
                      <View 
                        key={index} 
                        style={[
                          styles.trendBar, 
                          { 
                            height: `${Math.max(score, 10)}%`,
                            backgroundColor: score >= 70 ? colors.dark.success : colors.dark.error
                          }
                        ]} 
                      />
                    ))}
                  </View>
                </View>
              )}
              
              {recentQuizzes.length > 0 ? (
                <>
                  <Text style={styles.recentQuizzesTitle}>Son Quizler</Text>
                  {recentQuizzes.map((quiz, index) => {
                    const date = new Date(quiz.date);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    const score = Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100);
                    
                    return (
                      <View key={index} style={styles.quizResultItem}>
                        <View style={styles.quizResultInfo}>
                          <Calendar size={16} color={colors.dark.textSecondary} />
                          <Text style={styles.quizResultDate}>{formattedDate}</Text>
                        </View>
                        <View style={styles.quizResultScore}>
                          <Text style={styles.quizResultScoreText}>
                            {quiz.correctAnswers}/{quiz.totalQuestions}
                          </Text>
                          <Text 
                            style={[
                              styles.quizResultPercentage,
                              { color: score >= 70 ? colors.dark.success : colors.dark.error }
                            ]}
                          >
                            %{score}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </>
              ) : (
                <Text style={styles.emptyText}>
                  Henüz hiç quiz tamamlamadınız. Bilginizi test etmek için bir quiz başlatın.
                </Text>
              )}
            </>
          )}
        </Card>
        
        <Card>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => toggleSection('game')}
          >
            <View style={styles.sectionTitleContainer}>
              <Award size={20} color={colors.dark.primary} />
              <Text style={styles.cardTitle}>Oyun İlerlemesi</Text>
            </View>
            {expandedSections.game ? (
              <ChevronUp size={20} color={colors.dark.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.dark.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.game && (
            <>
              <ProgressBar 
                progress={gameProgress} 
                showPercentage 
                label="Tüm Görevler" 
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>
                Toplam {totalMissions} görevden {completedMissions} tanesini tamamladınız.
              </Text>
              
              <View style={styles.levelProgressContainer}>
                {levels.map(level => {
                  const completedLevelMissions = getCompletedMissionsCount(level.id);
                  const totalLevelMissions = getTotalMissionsCount(level.id);
                  const levelProgress = totalLevelMissions > 0 ? completedLevelMissions / totalLevelMissions : 0;
                  
                  return (
                    <View key={level.id} style={styles.levelProgressItem}>
                      <View style={styles.levelHeader}>
                        <Text style={styles.levelTitle}>{level.title}</Text>
                        <Text style={styles.levelProgressText}>
                          {completedLevelMissions}/{totalLevelMissions}
                        </Text>
                      </View>
                      <ProgressBar 
                        progress={levelProgress} 
                        height={6} 
                        progressColor={level.color || colors.dark.primary}
                      />
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </Card>
        
        <Card>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => toggleSection('lists')}
          >
            <View style={styles.sectionTitleContainer}>
              <BookOpen size={20} color={colors.dark.primary} />
              <Text style={styles.cardTitle}>Liste Bazında İlerleme</Text>
            </View>
            {expandedSections.lists ? (
              <ChevronUp size={20} color={colors.dark.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.dark.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.lists && (
            <>
              {lists.length > 0 ? (
                lists.map(list => {
                  const listWords = list.words?.length || 0;
                  const listLearnedWords = list.words?.filter(word => word.learned)?.length || 0;
                  const progress = listWords > 0 ? listLearnedWords / listWords : 0;
                  
                  return (
                    <View key={list.id} style={styles.listProgressItem}>
                      <Text style={styles.listProgressTitle}>{list.title}</Text>
                      <ProgressBar 
                        progress={progress} 
                        height={6} 
                        style={styles.listProgressBar}
                      />
                      <Text style={styles.listProgressText}>
                        {listLearnedWords}/{listWords} kelime öğrenildi
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text style={styles.emptyText}>
                  Henüz hiç kelime listeniz yok. İlerlemenizi görmek için önce bir liste oluşturun.
                </Text>
              )}
            </>
          )}
        </Card>
        
        <Card>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => toggleSection('learning')}
          >
            <View style={styles.sectionTitleContainer}>
              <Brain size={20} color={colors.dark.primary} />
              <Text style={styles.cardTitle}>Öğrenme Oturumları</Text>
            </View>
            {expandedSections.learning ? (
              <ChevronUp size={20} color={colors.dark.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.dark.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.learning && (
            <>
              {learningSessions.length > 0 ? (
                <>
                  <View style={styles.learningStatsContainer}>
                    <View style={styles.learningStat}>
                      <Text style={styles.learningStatValue}>{learningSessions.length}</Text>
                      <Text style={styles.learningStatLabel}>Toplam Oturum</Text>
                    </View>
                    <View style={styles.learningStat}>
                      <Text style={styles.learningStatValue}>
                        {Math.round(totalLearningTime)}
                      </Text>
                      <Text style={styles.learningStatLabel}>Dakika</Text>
                    </View>
                    <View style={styles.learningStat}>
                      <Text style={styles.learningStatValue}>
                        {learningSessions.reduce((sum, session) => sum + session.wordsStudied, 0)}
                      </Text>
                      <Text style={styles.learningStatLabel}>Çalışılan Kelime</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.recentSessionsTitle}>Son Oturumlar</Text>
                  {learningSessions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((session, index) => {
                      const date = new Date(session.date);
                      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                      const minutes = Math.round(session.timeSpent / 60);
                      
                      return (
                        <View key={index} style={styles.sessionItem}>
                          <View style={styles.sessionInfo}>
                            <Calendar size={16} color={colors.dark.textSecondary} />
                            <Text style={styles.sessionDate}>{formattedDate}</Text>
                          </View>
                          <View style={styles.sessionDetails}>
                            <Text style={styles.sessionWordsStudied}>
                              {session.wordsStudied} kelime
                            </Text>
                            <Text style={styles.sessionTime}>
                              {minutes} dakika
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </>
              ) : (
                <Text style={styles.emptyText}>
                  Henüz hiç öğrenme oturumu kaydetmediniz. Kelime öğrenmeye başlayın.
                </Text>
              )}
            </>
          )}
        </Card>
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
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  statTitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  quizStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  quizStat: {
    alignItems: 'center',
  },
  quizStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  quizStatLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 4,
  },
  trendContainer: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.text,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trendBarContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  trendBar: {
    width: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  recentQuizzesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 12,
  },
  quizResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  quizResultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizResultDate: {
    fontSize: 14,
    color: colors.dark.text,
  },
  quizResultScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizResultScoreText: {
    fontSize: 14,
    color: colors.dark.text,
  },
  quizResultPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  levelProgressContainer: {
    marginTop: 16,
  },
  levelProgressItem: {
    marginBottom: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
  },
  levelProgressText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  listProgressItem: {
    marginBottom: 16,
  },
  listProgressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 8,
  },
  listProgressBar: {
    marginBottom: 4,
  },
  listProgressText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  learningStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  learningStat: {
    alignItems: 'center',
  },
  learningStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  learningStatLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 4,
  },
  recentSessionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 12,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sessionDate: {
    fontSize: 14,
    color: colors.dark.text,
  },
  sessionDetails: {
    alignItems: 'flex-end',
  },
  sessionWordsStudied: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.text,
  },
  sessionTime: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  emptyText: {
    color: colors.dark.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
});