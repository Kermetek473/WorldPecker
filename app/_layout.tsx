import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from '../context/theme-context';
import { useVocabularyStore } from '../store/vocabulary-store';
import { sampleVocabularyLists } from '../mocks/sample-episodes';
import { ArrowLeft } from 'lucide-react-native';
import { useSettingsStore } from '@/store/settings-store';
import { useTheme } from '@/context/theme-context';

export default function RootLayout() {
  const { lists, addSampleLists } = useVocabularyStore();
  const { darkMode } = useSettingsStore();
  
  // Add sample lists on first app load
  useEffect(() => {
    if (!lists || lists.length === 0) {
      try {
        addSampleLists(sampleVocabularyLists);
      } catch (error) {
        console.error('Error adding sample lists:', error);
      }
    }
  }, []);
  
  return (
    <ThemeProvider value={darkMode ? 'dark' : 'light'}>
      <StackNavigator />
    </ThemeProvider>
  );
}

function StackNavigator() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackVisible: true,
        headerLeft: ({ canGoBack }) => 
          canGoBack ? (
            <View>
              <ArrowLeft size={24} color={colors.text} />
            </View>
          ) : null,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="import-subtitles" options={{ headerShown: true, title: 'Altyazı İçe Aktar' }} />
      <Stack.Screen name="video-import" options={{ headerShown: true, title: 'Video İçe Aktar' }} />
      <Stack.Screen name="downloaded-episodes" options={{ headerShown: true, title: 'İndirilen Bölümler' }} />
      <Stack.Screen name="episode-browser" options={{ headerShown: true, title: 'Bölüm Tarayıcısı' }} />
      <Stack.Screen name="episode-details" options={{ headerShown: true, title: 'Bölüm Detayları' }} />
      <Stack.Screen name="game/character-select" options={{ headerShown: true, title: 'Karakter Seç' }} />
      <Stack.Screen name="game/intro" options={{ headerShown: true, title: 'Giriş' }} />
      <Stack.Screen name="game/level/[id]" options={{ headerShown: true, title: 'Seviye' }} />
      <Stack.Screen name="game/conversation/[id]" options={{ headerShown: true, title: 'Konuşma' }} />
      <Stack.Screen name="game/vocabulary/[id]" options={{ headerShown: true, title: 'Kelimeler' }} />
      <Stack.Screen name="game/mission/[id]" options={{ headerShown: true, title: 'Görev' }} />
    </Stack>
  );
}