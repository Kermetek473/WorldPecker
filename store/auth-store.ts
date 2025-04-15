import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '@/types/auth';

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
];

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
          );
          
          if (!user) {
            throw new Error('Geçersiz e-posta veya şifre');
          }
          
          const { password: _, ...userWithoutPassword } = user;
          
          set({
            user: userWithoutPassword as User,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Giriş başarısız',
            isLoading: false,
          });
        }
      },

      register: async (email, username, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user already exists
          const userExists = MOCK_USERS.some((u) => u.email === email);
          
          if (userExists) {
            throw new Error('Bu e-posta adresi zaten kullanılıyor');
          }
          
          // Create new user
          const newUser = {
            id: String(MOCK_USERS.length + 1),
            email,
            username,
            password,
            createdAt: new Date().toISOString(),
          };
          
          MOCK_USERS.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          
          set({
            user: userWithoutPassword as User,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Kayıt başarısız',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);