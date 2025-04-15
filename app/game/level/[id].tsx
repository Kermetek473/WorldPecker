import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useGameStore } from '@/store/game-store';
import { useSettingsStore } from '@/store/settings-store';
import colors from '@/constants/colors';
import { MapPin, Award, ArrowLeft, AlertCircle } from 'lucide-react-native';
import MissionCard from '@/components/MissionCard';
import ProgressBar from '@/components/ProgressBar';
import { Mission } from '@/types/game';

export default function LevelScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getLevel, playerProgress, getQuiz, levels } = useGameStore();
  const { selectedLanguage } = useSettingsStore();
  
  const level = getLevel(id as string);
  
  // Debug: Log level and missions
  console.log("Level ID:", id);
  console.log("Level found:", level ? "Yes" : "No");
  if (level) {
    console.log("Level title:", level.title);
    console.log("Number of missions:", level.missions.length);
    level.missions.forEach(mission => {
      console.log(`- Mission: ${mission.id}, type: ${mission.type}, quizId: ${mission.quizId || 'none'}, locked: ${mission.locked}, completed: ${mission.completed}`);
      if (mission.quizId) {
        const quiz = getQuiz(mission.quizId);
        console.log(`  Quiz found: ${quiz ? 'Yes' : 'No'}`);
        if (quiz) {
          console.log(`  Quiz title: ${quiz.title}, questions: ${quiz.questions.length}`);
        }
      }
    });
  }
  // Find next level
  const nextLevel = level ? levels.find(l => l.number === level.number + 1) : null;
  console.log("Next level:", nextLevel ? nextLevel.title : "None");
  
  if (!level) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Seviye bulunamadı. ID: {id}
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
  
  const completedMissions = level.missions.filter(m => m.completed).length;
  const totalMissions = level.missions.length;
  const progress = totalMissions > 0 ? completedMissions / totalMissions : 0;
  const allMissionsCompleted = completedMissions === totalMissions;
  
  const handleMissionPress = (mission: Mission) => {
    console.log("Mission pressed:", mission.id, "Type:", mission.type);
    
    if (mission.type === 'conversation' && mission.conversationId) {
      console.log("Navigating to conversation:", mission.conversationId);
      router.push(`/game/conversation/${mission.conversationId}?levelId=${level.id}&missionId=${mission.id}`);
    } else if (mission.type === 'vocabulary' && mission.vocabularyListId) {
      console.log("Navigating to vocabulary:", mission.vocabularyListId);
      router.push(`/game/vocabulary/${mission.vocabularyListId}?levelId=${level.id}&missionId=${mission.id}`);
    } else if (mission.type === 'quiz' && mission.quizId) {
      console.log("Navigating to quiz:", mission.quizId);
      router.push(`/game/quiz/${mission.quizId}?levelId=${level.id}&missionId=${mission.id}`);
    } else {
      // For other mission types
      console.log("Navigating to generic mission screen");
      router.push(`/game/mission/${mission.id}?levelId=${level.id}`);
    }
  };
  
  const handleBackPress = () => {
    router.back();
  };
  
  const handleNextLevel = () => {
    if (nextLevel && !nextLevel.locked) {
      router.push(`/game/level/${nextLevel.id}`);
    } else if (nextLevel && nextLevel.locked) {
      // Special case for Berlin level
      if (level.id === 'level1' && nextLevel.id === 'level2') {
        Alert.alert(
          "Tebrikler!",
          "Berlin'e Hoş Geldiniz bölümünü tamamladınız! Şehirdeki Günlük Yaşam bölümünün kilidi açıldı.",
          [{ 
            text: "Devam Et", 
            onPress: () => {
              // Force unlock the next level
              useGameStore.getState().unlockLevel('level2');
              setTimeout(() => {
                router.push(`/game/level/level2`);
              }, 100);
            }
          }]
        );
      } else {
        Alert.alert(
          "Seviye Kilitli",
          `Bu seviyeyi açmak için ${nextLevel.requiredXP} XP'ye ihtiyacınız var. Şu anki XP: ${playerProgress.xp}`,
          [{ text: "Tamam", style: "default" }]
        );
      }
    } else {
      Alert.alert(
        "Tebrikler!",
        "Tüm seviyeleri tamamladınız!",
        [{ text: "Tamam", style: "default" }]
      );
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ 
        title: level.title,
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
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.levelHeader}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>{level.number}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{level.title}</Text>
            <View style={styles.locationContainer}>
              <View>
                <MapPin size={16} color={colors.dark.textSecondary} />
              </View>
              <Text style={styles.locationText}>{level.location}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.levelDescription}>{level.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>İlerleme</Text>
            <View style={styles.xpContainer}>
              <View>
                <Award size={16} color={colors.dark.primary} />
              </View>
              <Text style={styles.xpText}>{playerProgress.xp} XP</Text>
            </View>
          </View>
          <ProgressBar progress={progress} />
          <Text style={styles.progressText}>{completedMissions}/{totalMissions} görev tamamlandı</Text>
        </View>
        
        {allMissionsCompleted && nextLevel && (
          <TouchableOpacity 
            style={[
              styles.nextLevelButton,
              nextLevel.locked && level.id !== 'level1' && styles.nextLevelButtonLocked
            ]}
            onPress={handleNextLevel}
            activeOpacity={0.7}
          >
            {nextLevel.locked && level.id !== 'level1' ? (
              <>
                <AlertCircle size={20} color={colors.dark.inactive} />
                <Text style={styles.nextLevelButtonTextLocked}>
                  Sonraki Seviye Kilitli ({nextLevel.requiredXP} XP gerekli)
                </Text>
              </>
            ) : (
              <Text style={styles.nextLevelButtonText}>
                {level.id === 'level1' ? 'Şehirdeki Günlük Yaşam Seviyesine Geç' : `Sonraki Seviyeye Geç: ${nextLevel.title}`}
              </Text>
            )}
          </TouchableOpacity>
        )}
        
        <View style={styles.missionsContainer}>
          <Text style={styles.sectionTitle}>Görevler</Text>
          
          {level.missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onPress={handleMissionPress}
            />
          ))}
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
  scrollContent: {
    padding: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    backgroundColor: colors.dark.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  levelNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  levelDescription: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  progressContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  xpText: {
    color: colors.dark.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  progressText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  missionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
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
  nextLevelButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  nextLevelButtonLocked: {
    backgroundColor: 'rgba(100, 116, 139, 0.2)',
  },
  nextLevelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  nextLevelButtonTextLocked: {
    color: colors.dark.inactive,
    fontWeight: '600',
    fontSize: 16,
  },
});