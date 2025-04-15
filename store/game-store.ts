import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameCharacter, GameLevel, Conversation, DialogueNode, Mission, PlayerProgress, Quiz } from '@/types/game';
import { getGameCharacters, getGameLevels, getGameConversations, getGameQuizzes } from '@/mocks/game-data';

interface GameState {
  characters: GameCharacter[];
  levels: GameLevel[];
  conversations: Conversation[];
  quizzes: Quiz[];
  selectedCharacter: GameCharacter | null;
  hasStartedGame: boolean;
  playerProgress: PlayerProgress;
  currentLanguage: string; // Track current language
}

interface GameStore extends GameState {
  initializeGame: (languageCode: string) => void;
  selectCharacter: (characterId: string) => void;
  startGame: () => void;
  completeLevel: (levelId: string) => void;
  completeMission: (levelId: string, missionId: string) => void;
  unlockLevel: (levelId: string) => void;
  unlockMission: (levelId: string, missionId: string) => void;
  addXP: (amount: number) => void;
  getLevel: (levelId: string) => GameLevel | undefined;
  getMission: (levelId: string, missionId: string) => Mission | undefined;
  getConversation: (conversationId: string) => Conversation | undefined;
  getDialogue: (conversationId: string, dialogueId: string) => DialogueNode | undefined;
  getQuiz: (quizId: string) => Quiz | undefined;
  getCharacter: (characterId: string) => GameCharacter | undefined;
  getCurrentLevel: () => GameLevel | undefined;
  getCompletionPercentage: () => number;
  getCompletedMissionsCount: (levelId: string) => number;
  getTotalMissionsCount: (levelId: string) => number;
  resetGame: () => void;
}

const DEFAULT_PLAYER_PROGRESS: PlayerProgress = {
  currentLevel: 1,
  completedLevels: [],
  completedMissions: [],
  xp: 0,
};

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      characters: [],
      levels: [],
      conversations: [],
      quizzes: [],
      selectedCharacter: null,
      hasStartedGame: false,
      playerProgress: DEFAULT_PLAYER_PROGRESS,
      currentLanguage: '', // Initialize empty

      initializeGame: (languageCode) => {
        console.log("Initializing game with language:", languageCode);
        
        // Skip if already initialized with this language
        if (get().currentLanguage === languageCode && get().characters.length > 0) {
          console.log("Game already initialized with this language, skipping");
          return;
        }
        
        const characters = getGameCharacters(languageCode);
        const levels = getGameLevels(languageCode);
        const conversations = getGameConversations(languageCode);
        const quizzes = getGameQuizzes(languageCode);
        
        console.log(`Loaded ${characters.length} characters, ${levels.length} levels, ${conversations.length} conversations, ${quizzes.length} quizzes`);
        
        // Debug: Log quiz data
        quizzes.forEach(quiz => {
          console.log(`Quiz: ${quiz.id}, title: ${quiz.title}, questions: ${quiz.questions.length}`);
        });
        
        // Update mission locked status based on player progress
        const { completedMissions } = get().playerProgress;
        
        const updatedLevels = levels.map((level) => {
          // Check if level should be unlocked based on XP
          const shouldLevelBeUnlocked = get().playerProgress.xp >= level.requiredXP;
          
          // Update missions locked status
          const updatedMissions = level.missions.map((mission, index) => {
            // First mission in each level is unlocked if the level is unlocked
            const isFirstMission = index === 0;
            const isPreviousMissionCompleted = index > 0 ? 
              completedMissions.includes(level.missions[index - 1].id) : true;
            
            return {
              ...mission,
              locked: !shouldLevelBeUnlocked || (!isFirstMission && !isPreviousMissionCompleted),
              completed: completedMissions.includes(mission.id)
            };
          });
          
          return {
            ...level,
            locked: !shouldLevelBeUnlocked,
            missions: updatedMissions
          };
        });
        
        // Update selected character if language changed
        let updatedSelectedCharacter = get().selectedCharacter;
        if (get().selectedCharacter && get().currentLanguage !== languageCode) {
          // Try to find a character with the same ID in the new language
          updatedSelectedCharacter = characters.find(c => 
            c.id === get().selectedCharacter?.id
          ) || null;
          
          if (!updatedSelectedCharacter && characters.length > 0) {
            // If no matching character found, select the first one
            updatedSelectedCharacter = characters[0];
          }
        }
        
        set({
          characters,
          levels: updatedLevels,
          conversations,
          quizzes,
          currentLanguage: languageCode,
          selectedCharacter: updatedSelectedCharacter
        });
        
        console.log("Game initialized with:", {
          characters: characters.length,
          levels: updatedLevels.length,
          conversations: conversations.length,
          quizzes: quizzes.length,
          selectedCharacter: updatedSelectedCharacter?.name || "None"
        });
      },

      selectCharacter: (characterId) => {
        const character = get().characters.find(c => c.id === characterId);
        if (character) {
          set({ selectedCharacter: character });
          console.log("Character selected:", character.name);
        } else {
          console.error("Character not found:", characterId);
        }
      },

      startGame: () => {
        set({ hasStartedGame: true });
        console.log("Game started");
        
        // Unlock the first level and its first mission if not already
        const firstLevel = get().levels[0];
        if (firstLevel) {
          const updatedLevels = get().levels.map((level) => {
            if (level.id === firstLevel.id) {
              const updatedMissions = level.missions.map((mission, index) => {
                return {
                  ...mission,
                  locked: index !== 0 // Only unlock the first mission
                };
              });
              
              return {
                ...level,
                locked: false,
                missions: updatedMissions
              };
            }
            return level;
          });
          
          set({ levels: updatedLevels });
        }
      },

      completeLevel: (levelId) => {
        const { playerProgress, levels } = get();
        const level = levels.find(l => l.id === levelId);
        
        if (level && !playerProgress.completedLevels.includes(levelId)) {
          const updatedProgress = {
            ...playerProgress,
            completedLevels: [...playerProgress.completedLevels, levelId],
            currentLevel: Math.max(playerProgress.currentLevel, level.number + 1)
          };
          
          // Find the next level
          const nextLevel = levels.find(l => l.number === level.number + 1);
          
          // Update levels array to unlock the next level
          let updatedLevels = [...levels];
          if (nextLevel) {
            console.log("Unlocking next level:", nextLevel.id);
            updatedLevels = updatedLevels.map(l => {
              if (l.id === nextLevel.id) {
                // Unlock the next level
                const updatedMissions = l.missions.map((mission, index) => {
                  return {
                    ...mission,
                    locked: index !== 0 // Only unlock the first mission
                  };
                });
                
                return {
                  ...l,
                  locked: false,
                  missions: updatedMissions
                };
              }
              return l;
            });
          }
          
          // Special case: If "Berlin'e Hoş Geldiniz" (level1) is completed, unlock "Şehirde Günlük Yaşam" (level2)
          if (level.id === 'level1') {
            console.log("Berlin'e Hoş Geldiniz completed, unlocking Şehirde Günlük Yaşam");
            updatedLevels = updatedLevels.map(l => {
              if (l.id === 'level2') {
                // Unlock the "Şehirde Günlük Yaşam" level regardless of XP
                const updatedMissions = l.missions.map((mission, index) => {
                  return {
                    ...mission,
                    locked: index !== 0 // Only unlock the first mission
                  };
                });
                
                return {
                  ...l,
                  locked: false,
                  missions: updatedMissions
                };
              }
              return l;
            });
          }
          
          set({ 
            playerProgress: updatedProgress,
            levels: updatedLevels
          });
          
          console.log("Level completed:", levelId);
          console.log("Next level unlocked:", nextLevel?.id || "No next level");
        }
      },

      completeMission: (levelId, missionId) => {
        const { playerProgress, levels } = get();
        const level = levels.find(l => l.id === levelId);
        const mission = level?.missions.find(m => m.id === missionId);
        
        if (level && mission && !playerProgress.completedMissions.includes(missionId)) {
          // Add XP reward
          get().addXP(mission.xpReward);
          
          // Mark mission as completed
          const updatedProgress = {
            ...playerProgress,
            completedMissions: [...playerProgress.completedMissions, missionId]
          };
          
          // Update levels to reflect completed mission
          const updatedLevels = levels.map((l) => {
            if (l.id === levelId) {
              const updatedMissions = l.missions.map((m) => {
                if (m.id === missionId) {
                  return { ...m, completed: true };
                }
                
                // Unlock the next mission if it exists
                const currentIndex = l.missions.findIndex(item => item.id === missionId);
                const nextMission = l.missions[currentIndex + 1];
                if (nextMission && m.id === nextMission.id) {
                  return { ...m, locked: false };
                }
                
                return m;
              });
              
              // Check if all missions are completed to mark level as completed
              const allMissionsCompleted = updatedMissions.every(m => m.completed);
              if (allMissionsCompleted) {
                console.log("All missions completed for level:", l.id);
                // We'll call completeLevel after setting the state
              }
              
              return { ...l, missions: updatedMissions };
            }
            return l;
          });
          
          set({ 
            playerProgress: updatedProgress,
            levels: updatedLevels
          });
          
          console.log("Mission completed:", missionId, "XP earned:", mission.xpReward);
          
          // Check if all missions in the level are completed
          const updatedLevel = updatedLevels.find(l => l.id === levelId);
          if (updatedLevel && updatedLevel.missions.every(m => m.completed)) {
            // Complete the level after state update
            setTimeout(() => {
              get().completeLevel(levelId);
            }, 100);
          }
          
          // Special case: If this is the last mission of "Berlin'e Hoş Geldiniz" (level1), 
          // make sure "Şehirde Günlük Yaşam" (level2) is unlocked
          if (levelId === 'level1') {
            const berlinLevel = updatedLevels.find(l => l.id === 'level1');
            if (berlinLevel && berlinLevel.missions.every(m => m.completed || m.id === missionId)) {
              console.log("Last mission of Berlin'e Hoş Geldiniz completed, ensuring Şehirde Günlük Yaşam is unlocked");
              setTimeout(() => {
                get().unlockLevel('level2');
              }, 200);
            }
          }
        }
      },

      unlockLevel: (levelId) => {
        const { levels } = get();
        const updatedLevels = levels.map((level) => {
          if (level.id === levelId) {
            // Unlock the level and its first mission
            const updatedMissions = level.missions.map((mission, index) => {
              return {
                ...mission,
                locked: index !== 0 // Only unlock the first mission
              };
            });
            
            return {
              ...level,
              locked: false,
              missions: updatedMissions
            };
          }
          return level;
        });
        
        set({ levels: updatedLevels });
        console.log("Level unlocked:", levelId);
      },

      unlockMission: (levelId, missionId) => {
        const { levels } = get();
        const updatedLevels = levels.map((level) => {
          if (level.id === levelId) {
            const updatedMissions = level.missions.map((mission) => {
              if (mission.id === missionId) {
                return { ...mission, locked: false };
              }
              return mission;
            });
            
            return { ...level, missions: updatedMissions };
          }
          return level;
        });
        
        set({ levels: updatedLevels });
        console.log("Mission unlocked:", missionId);
      },

      addXP: (amount) => {
        const { playerProgress, levels } = get();
        const updatedProgress = {
          ...playerProgress,
          xp: playerProgress.xp + amount
        };
        
        set({ playerProgress: updatedProgress });
        console.log("XP added:", amount, "Total XP:", updatedProgress.xp);
        
        // Check if any levels should be unlocked based on new XP
        levels.forEach((level) => {
          if (level.locked && updatedProgress.xp >= level.requiredXP) {
            get().unlockLevel(level.id);
          }
        });
      },

      getLevel: (levelId) => {
        return get().levels.find(l => l.id === levelId);
      },

      getMission: (levelId, missionId) => {
        const level = get().getLevel(levelId);
        return level?.missions.find(m => m.id === missionId);
      },

      getConversation: (conversationId) => {
        return get().conversations.find(c => c.id === conversationId);
      },

      getDialogue: (conversationId, dialogueId) => {
        const conversation = get().getConversation(conversationId);
        return conversation?.dialogues[dialogueId];
      },

      getQuiz: (quizId) => {
        const quiz = get().quizzes.find(q => q.id === quizId);
        if (quiz) {
          console.log(`Found quiz: ${quiz.id}, title: ${quiz.title}, questions: ${quiz.questions.length}`);
        } else {
          console.error(`Quiz not found with ID: ${quizId}`);
          console.log("Available quizzes:", get().quizzes.map(q => q.id).join(", "));
        }
        return quiz;
      },

      getCharacter: (characterId) => {
        return get().characters.find(c => c.id === characterId);
      },

      getCurrentLevel: () => {
        const { levels, playerProgress } = get();
        return levels.find(l => l.number === playerProgress.currentLevel);
      },

      getCompletionPercentage: () => {
        const { levels, playerProgress } = get();
        const totalMissions = levels.reduce((total, level) => total + level.missions.length, 0);
        const completedMissions = playerProgress.completedMissions.length;
        
        return totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;
      },

      // Add the missing functions
      getCompletedMissionsCount: (levelId) => {
        const { playerProgress, levels } = get();
        const level = levels.find(l => l.id === levelId);
        
        if (!level) return 0;
        
        return level.missions.filter(mission => 
          playerProgress.completedMissions.includes(mission.id)
        ).length;
      },
      
      getTotalMissionsCount: (levelId) => {
        const { levels } = get();
        const level = levels.find(l => l.id === levelId);
        
        return level ? level.missions.length : 0;
      },

      resetGame: () => {
        set({
          selectedCharacter: null,
          hasStartedGame: false,
          playerProgress: DEFAULT_PLAYER_PROGRESS
        });
        console.log("Game reset");
      }
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedCharacter: state.selectedCharacter,
        hasStartedGame: state.hasStartedGame,
        playerProgress: state.playerProgress,
        currentLanguage: state.currentLanguage
      }),
    }
  )
);

// Initialize game with the selected language when the app starts
// This ensures the game content is in the correct language
const initializeGameWithSelectedLanguage = () => {
  // Use dynamic import to avoid circular dependency
  setTimeout(() => {
    try {
      // Import here to avoid circular dependency
      const { useSettingsStore } = require('./settings-store');
      const selectedLanguage = useSettingsStore.getState().selectedLanguage;
      console.log("Initial game setup with language:", selectedLanguage.code);
      useGameStore.getState().initializeGame(selectedLanguage.code);
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }, 100);
};

// Initialize on first load
initializeGameWithSelectedLanguage();

export { useGameStore };