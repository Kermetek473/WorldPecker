import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DictionaryEntry, DictionaryStore } from '@/types/dictionary';
import { dictionaryData } from '@/mocks/dictionary-data';
import { useSettingsStore } from './settings-store';

export const useDictionaryStore = create<DictionaryStore>()(
  persist(
    (set, get) => ({
      entries: dictionaryData,
      recentSearches: [],
      favorites: [],
      isLoading: false,
      error: null,

      searchWord: (query, sourceLanguage, targetLanguage) => {
        const { entries } = get();
        if (!query) return [];
        
        const normalizedQuery = query.toLowerCase().trim();
        
        // Get default languages from settings if not provided
        const settings = useSettingsStore.getState();
        const defaultSourceLanguage = sourceLanguage || settings.selectedLanguage.code;
        const defaultTargetLanguage = targetLanguage || settings.nativeLanguage.code;
        
        return entries.filter(
          entry => 
            (entry.sourceLanguage === defaultSourceLanguage && 
             entry.targetLanguage === defaultTargetLanguage) &&
            (entry.sourceText.toLowerCase().includes(normalizedQuery) ||
             entry.targetText.toLowerCase().includes(normalizedQuery))
        );
      },

      getEntriesByLetter: (letter, sourceLanguage, targetLanguage) => {
        const { entries } = get();
        if (!letter) return [];
        
        // Get default languages from settings if not provided
        const settings = useSettingsStore.getState();
        const defaultSourceLanguage = sourceLanguage || settings.selectedLanguage.code;
        const defaultTargetLanguage = targetLanguage || settings.nativeLanguage.code;
        
        // Filter entries by first letter and language
        return entries.filter(
          entry => 
            (entry.sourceLanguage === defaultSourceLanguage && 
             entry.targetLanguage === defaultTargetLanguage) &&
            entry.sourceText.toUpperCase().startsWith(letter)
        );
      },

      getAllEntries: (sourceLanguage, targetLanguage) => {
        const { entries } = get();
        
        // Get default languages from settings if not provided
        const settings = useSettingsStore.getState();
        const defaultSourceLanguage = sourceLanguage || settings.selectedLanguage.code;
        const defaultTargetLanguage = targetLanguage || settings.nativeLanguage.code;
        
        // Filter entries by language pair only
        return entries.filter(
          entry => 
            entry.sourceLanguage === defaultSourceLanguage && 
            entry.targetLanguage === defaultTargetLanguage
        );
      },

      addToFavorites: (wordId: string) => {
        set((state) => ({
          favorites: [...state.favorites, wordId]
        }));
      },

      removeFromFavorites: (wordId: string) => {
        set((state) => ({
          favorites: state.favorites.filter(id => id !== wordId)
        }));
      },

      addToRecentSearches: (word: string) => {
        set((state) => {
          // Remove if already exists to avoid duplicates
          const filteredSearches = state.recentSearches.filter(
            search => search !== word
          );
          
          // Add to beginning and limit to 10 recent searches
          return {
            recentSearches: [word, ...filteredSearches].slice(0, 10)
          };
        });
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: 'dictionary-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);