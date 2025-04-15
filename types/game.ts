export interface GameCharacter {
  id: string;
  name: string;
  description: string;
  avatar: string;
  language: string;
  backstory: string;
}

export interface DialogueOption {
  id: string;
  text: string;
  response: string;
  isCorrect?: boolean;
  nextDialogueId?: string;
  translation?: string;
}

export interface DialogueNode {
  id: string;
  characterId: string;
  text: string;
  translation?: string;
  options: DialogueOption[];
  isEnd?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  description: string;
  characterId: string;
  startDialogueId: string;
  dialogues: Record<string, DialogueNode>;
  completed: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'conversation' | 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'quiz';
  difficulty: 1 | 2 | 3;
  xpReward: number;
  conversationId?: string;
  vocabularyListId?: string;
  quizId?: string;
  completed: boolean;
  locked: boolean;
}

export interface GameLevel {
  id: string;
  number: number;
  title: string;
  description: string;
  location: string;
  missions: Mission[];
  requiredXP: number;
  completed: boolean;
  locked: boolean;
}

export interface PlayerProgress {
  currentLevel: number;
  xp: number;
  completedMissions: string[];
  completedLevels: string[];
  unlockedCharacters?: string[];
}

export interface GameState {
  selectedCharacter: GameCharacter | null;
  characters: GameCharacter[];
  levels: GameLevel[];
  conversations: Conversation[];
  quizzes: Quiz[];
  playerProgress: PlayerProgress;
  hasStartedGame: boolean;
}

export interface GameStore extends GameState {
  selectCharacter: (characterId: string) => void;
  startGame: () => void;
  resetGame: () => void;
  initializeGameContent: () => void;
  updateGameContentForLanguage: () => void;
  completeMission: (levelId: string, missionId: string) => void;
  completeLevel: (levelId: string) => void;
  unlockLevel: (levelId: string) => void;
  unlockMission: (levelId: string, missionId: string) => void;
  addXP: (amount: number) => void;
  unlockCharacter: (characterId: string) => void;
  getLevel: (levelId: string) => GameLevel | undefined;
  getMission: (levelId: string, missionId: string) => Mission | undefined;
  getConversation: (conversationId: string) => Conversation | undefined;
  getDialogue: (conversationId: string, dialogueId: string) => DialogueNode | undefined;
  getQuiz: (quizId: string) => Quiz | undefined;
  getNextUnlockedLevel: () => GameLevel | undefined;
  getCurrentLevel: () => GameLevel | undefined;
  getCharacter: (characterId: string) => GameCharacter | undefined;
  getCompletionPercentage: () => number;
  initializeGame: (languageCode: string) => void;
}