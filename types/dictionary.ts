export interface Example {
  text: string;
  translation: string;
}

export interface DictionaryEntry {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLanguage: string;
  targetLanguage: string;
  partOfSpeech: string;
  gender?: string;
  plural?: string;
  examples: Example[];
  synonyms?: string[];
  level?: string;
}

export interface DictionaryStore {
  entries: DictionaryEntry[];
  recentSearches: string[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;

  searchWord: (query: string, sourceLanguage?: string, targetLanguage?: string) => DictionaryEntry[];
  getEntriesByLetter: (letter: string, sourceLanguage?: string, targetLanguage?: string) => DictionaryEntry[];
  getAllEntries: (sourceLanguage?: string, targetLanguage?: string) => DictionaryEntry[];
  
  addToFavorites: (wordId: string) => void;
  removeFromFavorites: (wordId: string) => void;
  
  addToRecentSearches: (word: string) => void;
  clearRecentSearches: () => void;
}