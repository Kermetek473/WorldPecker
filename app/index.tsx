import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const { user, login } = useAuthStore();
  
  // Navigasyon hatası düzeltmesi: useEffect içinde bir timeout kullanarak
  // Root Layout'un monte edilmesini bekleyelim
  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      const timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [user]);
  
  const handleDemoLogin = async () => {
    // Demo kullanıcı bilgileri ile giriş yap
    await login('test@example.com', 'password123');
  };
  
  return (
    <LinearGradient
      colors={['#000000', '#121212', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://i.imgur.com/g19wxZn.jpeg' }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Almanca Öğrenmeyi Kolaylaştırın</Text>
        <Text style={styles.subtitle}>
          Netflix dizilerinden altyazıları içe aktarın ve eğlenceli bir şekilde Almanca öğrenin.
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Giriş Yap"
            onPress={() => router.push('/login')}
            style={styles.button}
          />
          
          <Button
            title="Kayıt Ol"
            onPress={() => router.push('/register')}
            variant="outline"
            style={styles.button}
          />
          
          <TouchableOpacity 
            style={styles.demoButton}
            onPress={handleDemoLogin}
          >
            <Text style={styles.demoButtonText}>Demo Kullanıcı ile Devam Et</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    width: '100%',
  },
  demoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.dark.secondary,
    borderRadius: 8,
    backgroundColor: 'rgba(77, 171, 247, 0.1)',
  },
  demoButtonText: {
    color: colors.dark.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});