export interface VocabularyWord {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLanguage: string;
  targetLanguage: string;
  example?: string;
  exampleTranslation?: string;
  learned: boolean;
  createdAt: string;
  // For backward compatibility
  german?: string;
  turkish?: string;
  sourceShow?: string;
  sourceEpisode?: string;
}

export interface Word extends VocabularyWord {
  german: string;
  turkish: string;
}

export interface VocabularyList {
  id: string;
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  words: VocabularyWord[];
  createdAt: string;
  updatedAt: string;
  sourceShow?: string;
  sourceEpisode?: string;
  totalWords?: number;
  learnedWords?: number;
  source?: string;
}

export interface SubtitleEntry {
  startTime: string;
  endTime: string;
  text: string;
}

export interface ImportedSubtitle {
  showName: string;
  episodeName?: string;
  language: string;
  entries: SubtitleEntry[];
}

export interface VocabularyStore {
  lists: VocabularyList[];
  
  createList: (title: string, description?: string, sourceLanguage?: string, targetLanguage?: string) => string;
  updateList: (listId: string, updates: Partial<VocabularyList>) => void;
  deleteList: (listId: string) => void;
  
  addWord: (listId: string, word: Partial<VocabularyWord>) => string;
  updateWord: (listId: string, wordId: string, updates: Partial<VocabularyWord>) => void;
  deleteWord: (listId: string, wordId: string) => void;
  markWordAsLearned: (listId: string, wordId: string, learned?: boolean) => void;
  
  getList: (listId: string) => VocabularyList | null;
  getWord: (listId: string, wordId: string) => VocabularyWord | null;
  
  importFromSubtitles: (subtitle: ImportedSubtitle, selectedEntries: SubtitleEntry[]) => VocabularyList;
  setCurrentList: (listId: string) => void;
  addSampleLists: (sampleLists: VocabularyList[]) => void;
}