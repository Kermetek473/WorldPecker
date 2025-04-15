import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/game-store';
import { useSettingsStore } from '@/store/settings-store';
import colors from '@/constants/colors';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { Stack } from 'expo-router';

export default function IntroScreen() {
  const router = useRouter();
  const { selectedCharacter, getCurrentLevel } = useGameStore();
  const { selectedLanguage } = useSettingsStore();
  const [currentStep, setCurrentStep] = useState(0);
  
  const currentLevel = getCurrentLevel();
  
  // Get intro steps based on selected language
  const getIntroSteps = () => {
    // Intro steps are in Turkish, but reference the target language
    return [
      {
        title: 'Dil Maceranıza Hoş Geldiniz!',
        description: `${selectedCharacter?.name || 'karakteriniz'} ile birlikte interaktif konuşmalar ve görevler aracılığıyla ${selectedLanguage.nativeName} dilini öğreneceksiniz.`,
      },
      {
        title: 'Nasıl Çalışır',
        description: 'Her seviye farklı görevler içerir. XP kazanmak ve yeni seviyeler açmak için bunları tamamlayın.',
      },
      {
        title: 'Yolculuğunuz Başlıyor',
        description: `İlk hedefiniz: ${currentLevel?.title || 'şehir'}. Burada günlük yaşam için temel ifadeleri ve kelimeleri öğreneceksiniz.`,
      },
    ];
  };
  
  const introSteps = getIntroSteps();
  
  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/(tabs)/game');
    }
  };
  
  const handleBackPress = () => {
    router.back();
  };
  
  // Get button text based on current step
  const getButtonText = () => {
    const isLastStep = currentStep === introSteps.length - 1;
    return isLastStep ? 'Başla' : 'İleri';
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <Stack.Screen options={{ 
        title: 'Giriş',
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
      
      <View style={styles.content}>
        {selectedCharacter && (
          <View style={styles.characterContainer}>
            <Image
              source={{ uri: selectedCharacter.avatar }}
              style={styles.characterImage}
            />
          </View>
        )}
        
        <View style={styles.stepIndicator}>
          {introSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                currentStep === index && styles.stepDotActive
              ]}
            />
          ))}
        </View>
        
        <Text style={styles.title}>{introSteps[currentStep].title}</Text>
        <Text style={styles.description}>{introSteps[currentStep].description}</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>{getButtonText()}</Text>
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
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterContainer: {
    marginBottom: 32,
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: colors.dark.primary,
  },
  stepIndicator: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.dark.inactive,
    marginHorizontal: 4,
  },
  stepDotActive: {
    backgroundColor: colors.dark.primary,
    width: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
  },
  nextButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
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