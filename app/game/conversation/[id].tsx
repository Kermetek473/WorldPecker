import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useGameStore } from '@/store/game-store';
import { useSettingsStore } from '@/store/settings-store';
import colors from '@/constants/colors';
import { Award, ArrowRight, ArrowLeft } from 'lucide-react-native';
import DialogueBox from '@/components/DialogueBox';
import { DialogueOption } from '@/types/game';

export default function ConversationScreen() {
  const router = useRouter();
  const { id, levelId, missionId } = useLocalSearchParams();
  const { 
    getConversation, 
    getCharacter, 
    getDialogue,
    completeMission,
    getLevel
  } = useGameStore();
  const { selectedLanguage } = useSettingsStore();
  
  const conversation = getConversation(id as string);
  const [currentDialogueId, setCurrentDialogueId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  
  useEffect(() => {
    if (conversation) {
      setCurrentDialogueId(conversation.startDialogueId);
    }
  }, [conversation]);
  
  if (!conversation || !currentDialogueId) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Konuşma bulunamadı
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
  
  const currentDialogue = getDialogue(conversation.id, currentDialogueId);
  const character = getCharacter(conversation.characterId);
  
  if (!currentDialogue || !character) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Diyalog veya karakter bulunamadı
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
  
  const handleSelectOption = (option: DialogueOption) => {
    if (option.nextDialogueId) {
      setCurrentDialogueId(option.nextDialogueId);
      
      // Check if this is the end dialogue
      const nextDialogue = getDialogue(conversation.id, option.nextDialogueId);
      if (nextDialogue?.isEnd) {
        // Complete the mission
        if (levelId && missionId) {
          console.log("Completing mission:", missionId, "for level:", levelId);
          const mission = useGameStore.getState().getMission(levelId as string, missionId as string);
          if (mission) {
            setEarnedXP(mission.xpReward);
            completeMission(levelId as string, missionId as string);
            
            // Special case for Berlin level
            if (levelId === 'level1') {
              console.log("This is a mission from Berlin level, checking if it's the last one");
              const level = getLevel(levelId as string);
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
        setIsCompleted(true);
      }
    }
  };
  
  const handleFinish = () => {
    // Special case for Berlin level
    if (levelId === 'level1') {
      const level = getLevel(levelId as string);
      if (level && level.missions.every(m => m.completed || m.id === missionId)) {
        console.log("This was the last mission in Berlin level, showing special alert");
        Alert.alert(
          "Tebrikler!",
          "Berlin'e Hoş Geldiniz bölümünü tamamladınız! Şehirdeki Günlük Yaşam bölümünün kilidi açıldı.",
          [{ 
            text: "Seviyeye Dön", 
            onPress: () => {
              router.push(`/game/level/${levelId}`);
            }
          }]
        );
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
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <Stack.Screen options={{ 
        title: conversation.title,
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
        <DialogueBox
          dialogue={currentDialogue}
          character={character}
          onSelectOption={handleSelectOption}
          isEnd={currentDialogue.isEnd}
        />
        
        {isCompleted && (
          <View style={styles.completionContainer}>
            <View style={styles.xpBadge}>
              <View>
                <Award size={24} color={colors.dark.primary} />
              </View>
              <Text style={styles.xpText}>+{earnedXP} XP</Text>
            </View>
            <Text style={styles.completionText}>
              {levelId === 'level1' && getLevel(levelId as string)?.missions.every(m => m.completed || m.id === missionId)
                ? "Tebrikler! Son görevi tamamladınız. Berlin'e Hoş Geldiniz bölümünü bitirdiniz ve Şehirdeki Günlük Yaşam bölümünün kilidini açtınız!"
                : "Tebrikler! Konuşmayı başarıyla tamamladınız."}
            </Text>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Seviyeye Dön</Text>
              <View>
                <ArrowRight size={20} color="#fff" />
              </View>
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
  scrollContent: {
    padding: 16,
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
  completionContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
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
  finishButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  finishButtonText: {
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
});