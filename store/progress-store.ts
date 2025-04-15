import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QuizResult {
  listId: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // seconds
  category?: string; // vocabulary or game
  levelId?: string; // for game quizzes
  missionId?: string; // for game quizzes
}

interface LearningSession {
  listId: string;
  date: string;
  wordsStudied: number;
  timeSpent: number; // seconds
  wordsLearned?: number;
}

interface ProgressState {
  quizResults: QuizResult[];
  learningSessions: LearningSession[];
  dailyStreak: number;
  lastActive: string | null;
  totalWordsLearned: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface ProgressStore extends ProgressState {
  addQuizResult: (listId: string, result: {
    date: string;
    score: number;
    total: number;
    answers: {[key: string]: boolean};
    timeSpent?: number;
    category?: string;
    levelId?: string;
    missionId?: string;
  }) => void;
  addGameQuizResult: (quizId: string, result: {
    correctAnswers: number;
    totalQuestions: number;
    timeSpent?: number;
    levelId?: string;
    missionId?: string;
  }) => void;
  addLearningSession: (session: Omit<LearningSession, 'date'>) => void;
  updateDailyStreak: () => void;
  resetProgress: () => void;
  setWeeklyGoal: (goal: number) => void;
  updateWeeklyProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      quizResults: [],
      learningSessions: [],
      dailyStreak: 0,
      lastActive: null,
      totalWordsLearned: 0,
      weeklyGoal: 50, // Default weekly goal (words to learn)
      weeklyProgress: 0,

      addQuizResult: (listId, result) => {
        const newResult: QuizResult = {
          listId,
          date: result.date,
          totalQuestions: result.total,
          correctAnswers: result.score,
          timeSpent: result.timeSpent || 0,
          category: result.category || 'vocabulary',
          levelId: result.levelId,
          missionId: result.missionId
        };

        set((state) => ({
          quizResults: [...state.quizResults, newResult],
        }));

        get().updateDailyStreak();
        get().updateWeeklyProgress();
      },
      
      addGameQuizResult: (quizId, result) => {
        const newResult: QuizResult = {
          listId: quizId,
          date: new Date().toISOString(),
          totalQuestions: result.totalQuestions,
          correctAnswers: result.correctAnswers,
          timeSpent: result.timeSpent || 0,
          category: 'game',
          levelId: result.levelId,
          missionId: result.missionId
        };

        set((state) => ({
          quizResults: [...state.quizResults, newResult],
        }));

        get().updateDailyStreak();
      },

      addLearningSession: (session) => {
        const newSession: LearningSession = {
          ...session,
          date: new Date().toISOString(),
        };

        set((state) => ({
          learningSessions: [...state.learningSessions, newSession],
          totalWordsLearned: state.totalWordsLearned + (session.wordsLearned || 0)
        }));

        get().updateDailyStreak();
        get().updateWeeklyProgress();
      },

      updateDailyStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActive, dailyStreak } = get();

        if (!lastActive) {
          set({ dailyStreak: 1, lastActive: today });
          return;
        }

        const lastActiveDate = lastActive.split('T')[0];
        
        if (lastActiveDate === today) {
          // Already updated today
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActiveDate === yesterdayStr) {
          // Consecutive day
          set({ dailyStreak: dailyStreak + 1, lastActive: today });
        } else {
          // Streak broken
          set({ dailyStreak: 1, lastActive: today });
        }
      },
      
      setWeeklyGoal: (goal) => {
        set({ weeklyGoal: goal });
      },
      
      updateWeeklyProgress: () => {
        // Calculate words learned this week
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
        startOfWeek.setHours(0, 0, 0, 0);
        
        const { learningSessions } = get();
        
        const wordsLearnedThisWeek = learningSessions
          .filter(session => {
            const sessionDate = new Date(session.date);
            return sessionDate >= startOfWeek;
          })
          .reduce((sum, session) => sum + (session.wordsLearned || 0), 0);
        
        set({ weeklyProgress: wordsLearnedThisWeek });
      },

      resetProgress: () => {
        set({
          quizResults: [],
          learningSessions: [],
          dailyStreak: 0,
          lastActive: null,
          totalWordsLearned: 0,
          weeklyProgress: 0
        });
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);