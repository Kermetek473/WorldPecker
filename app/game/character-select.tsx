import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/game-store';
import { useSettingsStore } from '@/store/settings-store';
import { GameCharacter } from '@/types/game';
import colors from '@/constants/colors';
import { ArrowRight, User, ArrowLeft } from 'lucide-react-native';
import CharacterCard from '@/components/CharacterCard';
import { Stack } from 'expo-router';

export default function CharacterSelectScreen() {
  const router = useRouter();
  const { characters, selectedCharacter, selectCharacter, startGame } = useGameStore();
  const { selectedLanguage } = useSettingsStore();
  
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    selectedCharacter?.id || null
  );
  
  const handleSelectCharacter = (character: GameCharacter) => {
    console.log("Character selected:", character.id);
    setSelectedCharacterId(character.id);
  };
  
  const handleContinue = () => {
    if (selectedCharacterId) {
      console.log("Continuing with character:", selectedCharacterId);
      selectCharacter(selectedCharacterId);
      startGame();
      router.push('/game/intro');
    } else {
      // Show an alert if no character is selected
      Alert.alert(
        'Karakter seçilmedi',
        'Devam etmek için lütfen bir karakter seçin.'
      );
    }
  };
  
  const handleBackPress = () => {
    router.back();
  };
  
  // Debug: Log available characters
  useEffect(() => {
    console.log("Available characters:", characters.length);
    characters.forEach(char => console.log(`- ${char.id}: ${char.name}`));
    console.log("Selected character ID:", selectedCharacterId);
  }, [characters, selectedCharacterId]);
  
  // Force re-render when characters change
  useEffect(() => {
    if (characters.length > 0 && !selectedCharacterId) {
      setSelectedCharacterId(characters[0]?.id || null);
    }
  }, [characters]);
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <Stack.Screen options={{ 
        title: 'Karakter Seç',
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
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <View>
              <User size={32} color={colors.dark.primary} />
            </View>
          </View>
          <Text style={styles.title}>Karakter Seç</Text>
          <Text style={styles.subtitle}>
            Karakteriniz {selectedLanguage.nativeName} dil yolculuğunuzda size eşlik edecek
          </Text>
        </View>
        
        <View style={styles.charactersContainer}>
          {characters.length > 0 ? (
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                selected={selectedCharacterId === character.id}
                onSelect={handleSelectCharacter}
              />
            ))
          ) : (
            <Text style={styles.noCharactersText}>
              Kullanılabilir karakter yok
            </Text>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedCharacterId && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          activeOpacity={0.7}
          disabled={!selectedCharacterId}
        >
          <Text style={styles.continueButtonText}>Devam Et</Text>
          <View>
            <ArrowRight size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  charactersContainer: {
    marginBottom: 16,
  },
  noCharactersText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    padding: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
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
  continueButtonDisabled: {
    backgroundColor: colors.dark.inactive,
  },
  continueButtonText: {
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