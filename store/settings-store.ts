import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const LANGUAGES: Language[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

interface SettingsState {
  dailyGoal: number; // Günlük hedef kelime sayısı
  notificationsEnabled: boolean;
  reminderTime: string; // HH:MM formatında
  quizDifficulty: 'easy' | 'medium' | 'hard';
  showTranslations: boolean; // Öğrenme modunda çevirileri göster
  autoPlayAudio: boolean;
  selectedLanguage: Language; // Öğrenilecek dil
  nativeLanguage: Language; // Ana dil
  uiLanguage: Language; // Arayüz dili (her zaman Türkçe olacak)
  darkMode: boolean;
  appRating: number; // App rating from 0-5
}

interface SettingsStore extends SettingsState {
  updateSettings: (settings: Partial<SettingsState>) => void;
  resetSettings: () => void;
  setSelectedLanguage: (languageCode: string) => void;
  setNativeLanguage: (languageCode: string) => void;
  setUILanguage: (languageCode: string) => void;
}

// Türkçe dili
const TURKISH_LANGUAGE = LANGUAGES.find(lang => lang.code === 'tr') || { 
  code: 'tr', 
  name: 'Turkish', 
  nativeName: 'Türkçe', 
  flag: '🇹🇷' 
};

const DEFAULT_SETTINGS: SettingsState = {
  dailyGoal: 10,
  notificationsEnabled: true,
  reminderTime: '20:00',
  quizDifficulty: 'medium',
  showTranslations: true,
  autoPlayAudio: true,
  selectedLanguage: LANGUAGES[0], // Default to German
  nativeLanguage: TURKISH_LANGUAGE, // Default to Turkish
  uiLanguage: TURKISH_LANGUAGE, // UI language is always Turkish
  darkMode: true,
  appRating: 0, // Default to no rating
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,

      updateSettings: (settings) => {
        set((state) => ({
          ...state,
          ...settings,
        }));
        
        // If selectedLanguage is updated, log it
        if (settings.selectedLanguage) {
          console.log("Settings: Language updated to", settings.selectedLanguage.code);
        }
        
        // If app rating is updated, log it
        if (settings.appRating !== undefined) {
          console.log("Settings: App rating updated to", settings.appRating);
        }
        
        // If daily goal is updated, log it
        if (settings.dailyGoal !== undefined) {
          console.log("Settings: Daily goal updated to", settings.dailyGoal);
        }
      },

      resetSettings: () => {
        set(DEFAULT_SETTINGS);
      },

      setSelectedLanguage: (languageCode) => {
        const language = LANGUAGES.find(lang => lang.code === languageCode) || DEFAULT_SETTINGS.selectedLanguage;
        console.log("Settings: Setting selected language to", language.code);
        set((state) => ({
          ...state,
          selectedLanguage: language,
        }));
      },

      setNativeLanguage: (languageCode) => {
        const language = LANGUAGES.find(lang => lang.code === languageCode) || DEFAULT_SETTINGS.nativeLanguage;
        set((state) => ({
          ...state,
          nativeLanguage: language,
        }));
      },

      setUILanguage: (languageCode) => {
        // UI language is always Turkish, but we keep this method for consistency
        const language = TURKISH_LANGUAGE;
        set((state) => ({
          ...state,
          uiLanguage: language,
        }));
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);