import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/game-store';
import { useSettingsStore } from '@/store/settings-store';
import { GameLevel } from '@/types/game';
import colors from '@/constants/colors';
import { Award, Play, User, ArrowRight, MessageCircle, RefreshCw } from 'lucide-react-native';
import LevelCard from '@/components/LevelCard';
import ProgressBar from '@/components/ProgressBar';

export default function GameScreen() {
  const router = useRouter();
  const { 
    selectedCharacter, 
    levels, 
    playerProgress, 
    hasStartedGame,
    getCompletionPercentage,
    characters,
    initializeGame,
    resetGame
  } = useGameStore();
  
  const { selectedLanguage } = useSettingsStore();
  
  const [unlockedLevels, setUnlockedLevels] = useState<GameLevel[]>([]);
  const [lockedLevels, setLockedLevels] = useState<GameLevel[]>([]);
  
  useEffect(() => {
    // Filter unlocked and locked levels
    setUnlockedLevels(levels.filter(level => !level.locked));
    setLockedLevels(levels.filter(level => level.locked));
    
    // Debug: Log game state
    console.log("Game started:", hasStartedGame);
    console.log("Selected character:", selectedCharacter?.name || "None");
    console.log("Available characters:", characters.length);
    console.log("Levels:", levels.length);
    console.log("Unlocked levels:", levels.filter(level => !level.locked).length);
    console.log("Current level:", playerProgress.currentLevel);
    console.log("Completed levels:", playerProgress.completedLevels);
    console.log("Completed missions:", playerProgress.completedMissions);
    console.log("XP:", playerProgress.xp);
    
    // Force initialize if no characters loaded
    if (characters.length === 0) {
      console.log("No characters found, forcing initialization");
      initializeGame(selectedLanguage.code);
    }
  }, [levels, hasStartedGame, selectedCharacter, characters, selectedLanguage, playerProgress]);
  
  const handleLevelPress = (level: GameLevel) => {
    router.push(`/game/level/${level.id}`);
  };
  
  const handleStartGame = () => {
    router.push('/game/character-select');
  };
  
  const handleContinueGame = () => {
    if (selectedCharacter) {
      const currentLevel = levels.find(l => l.number === playerProgress.currentLevel);
      if (currentLevel) {
        router.push(`/game/level/${currentLevel.id}`);
      } else {
        // If current level not found, try to find the first unlocked level
        const firstUnlockedLevel = levels.find(l => !l.locked);
        if (firstUnlockedLevel) {
          router.push(`/game/level/${firstUnlockedLevel.id}`);
        } else {
          Alert.alert("Hata", "Oynanabilir seviye bulunamadı.");
        }
      }
    } else {
      router.push('/game/character-select');
    }
  };
  
  const handleResetGame = () => {
    Alert.alert(
      "Oyunu Sıfırla",
      "Tüm ilerlemeniz silinecek. Emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Sıfırla",
          onPress: () => {
            resetGame();
            // Re-initialize the game with the current language
            setTimeout(() => {
              initializeGame(selectedLanguage.code);
            }, 100);
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const completionPercentage = getCompletionPercentage();
  
  if (!hasStartedGame) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <View style={styles.welcomeContainer}>
          <View style={styles.iconContainer}>
            <View>
              <Play size={40} color={colors.dark.primary} />
            </View>
          </View>
          <Text style={styles.welcomeTitle}>
            Dil Macerası
          </Text>
          <Text style={styles.welcomeDescription}>
            İnteraktif bir dil yolculuğuna dalın! Bir karakter seçin ve dil becerilerinizi geliştirmek için görevleri tamamlayın.
          </Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View>
                <User size={24} color={colors.dark.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>
                  Karakterler
                </Text>
                <Text style={styles.featureDescription}>
                  Yolculuk için dil arkadaşınızı seçin
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View>
                <MessageCircle size={24} color={colors.dark.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>
                  Diyaloglar
                </Text>
                <Text style={styles.featureDescription}>
                  Ana dili konuşanlarla sohbet edin
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View>
                <Award size={24} color={colors.dark.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>
                  İlerleme
                </Text>
                <Text style={styles.featureDescription}>
                  XP toplayın ve yeni seviyeler açın
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStartGame}
            activeOpacity={0.7}
          >
            <Text style={styles.startButtonText}>
              Maceraya Başla
            </Text>
            <View>
              <ArrowRight size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Dil Macerası
          </Text>
          <Text style={styles.subtitle}>
            {selectedLanguage.nativeName} öğreniyorsunuz
          </Text>
        </View>
        
        {selectedCharacter ? (
          <View style={styles.characterBanner}>
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{selectedCharacter.name}</Text>
              <Text style={styles.characterDescription}>{selectedCharacter.description}</Text>
            </View>
            <TouchableOpacity 
              style={styles.changeButton}
              onPress={() => router.push('/game/character-select')}
              activeOpacity={0.7}
            >
              <Text style={styles.changeButtonText}>
                Değiştir
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.selectCharacterButton}
            onPress={() => router.push('/game/character-select')}
            activeOpacity={0.7}
          >
            <View>
              <User size={20} color={colors.dark.primary} />
            </View>
            <Text style={styles.selectCharacterText}>
              Karakter Seç
            </Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              İlerlemeniz
            </Text>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>{playerProgress.xp} XP</Text>
            </View>
          </View>
          <ProgressBar progress={completionPercentage / 100} />
          <Text style={styles.progressText}>
            %{Math.round(completionPercentage)} tamamlandı
          </Text>
        </View>
        
        <View style={styles.continueSection}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinueGame}
            activeOpacity={0.7}
          >
            <View>
              <Play size={20} color="#fff" />
            </View>
            <Text style={styles.continueButtonText}>
              Oynamaya Devam Et
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.levelsSection}>
          <Text style={styles.sectionTitle}>
            Mevcut Seviyeler
          </Text>
          
          {unlockedLevels.length > 0 ? (
            unlockedLevels.map((level) => (
              <LevelCard 
                key={level.id} 
                level={level} 
                onPress={handleLevelPress} 
              />
            ))
          ) : (
            <View style={styles.noLevelsContainer}>
              <Text style={styles.noLevelsText}>
                Mevcut seviye yok. Seviyeleri açmak için oyunu başlatın.
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.lockedLevelsSection}>
          <Text style={styles.sectionTitle}>
            Yaklaşan Seviyeler
          </Text>
          
          {lockedLevels.slice(0, 2).map((level) => (
            <LevelCard 
              key={level.id} 
              level={level} 
              onPress={() => {}} 
            />
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handleResetGame}
        >
          <RefreshCw size={16} color={colors.dark.error} />
          <Text style={styles.resetButtonText}>Oyunu Sıfırla</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginTop: 4,
  },
  characterBanner: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  characterDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  changeButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  changeButtonText: {
    color: colors.dark.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  selectCharacterButton: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  selectCharacterText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.primary,
  },
  progressSection: {
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
  xpBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
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
  continueSection: {
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  levelsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
  },
  noLevelsContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  noLevelsText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  lockedLevelsSection: {
    marginBottom: 24,
  },
  welcomeContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
  },
  featureTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  startButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.dark.error,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  resetButtonText: {
    color: colors.dark.error,
    fontSize: 14,
    fontWeight: '500',
  },
});