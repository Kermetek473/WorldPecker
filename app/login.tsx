import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: '',
      password: '',
    };
    
    if (!email) {
      errors.email = 'E-posta adresi gerekli';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Şifre gerekli';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
      
      // If login is successful, the auth store will update the user
      // and the useEffect in the welcome screen will redirect to home
    }
  };
  
  const handleDemoLogin = async () => {
    // Demo kullanıcı bilgileri ile giriş yap
    await login('test@example.com', 'password123');
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Hoş Geldiniz</Text>
        <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
      </View>
      
      <View style={styles.form}>
        <Input
          label="E-posta"
          placeholder="E-posta adresinizi girin"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={formErrors.email}
          leftIcon={<Mail size={20} color={colors.dark.textSecondary} />}
        />
        
        <Input
          label="Şifre"
          placeholder="Şifrenizi girin"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={formErrors.password}
          leftIcon={<Lock size={20} color={colors.dark.textSecondary} />}
        />
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <Button
          title="Giriş Yap"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
        />
        
        <TouchableOpacity 
          style={styles.demoButton}
          onPress={handleDemoLogin}
          disabled={isLoading}
        >
          <Text style={styles.demoButtonText}>Demo Kullanıcı ile Giriş Yap</Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Kayıt Olun</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Geri Dön</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
  demoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
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
  errorText: {
    color: colors.dark.error,
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: colors.dark.textSecondary,
  },
  registerLink: {
    color: colors.dark.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  backButton: {
    marginTop: 32,
    alignSelf: 'center',
  },
  backButtonText: {
    color: colors.dark.textSecondary,
    fontSize: 16,
  },
});