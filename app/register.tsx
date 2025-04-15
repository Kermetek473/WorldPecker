import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
    
    if (!email) {
      errors.email = 'E-posta adresi gerekli';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
      isValid = false;
    }
    
    if (!username) {
      errors.username = 'Kullanıcı adı gerekli';
      isValid = false;
    } else if (username.length < 3) {
      errors.username = 'Kullanıcı adı en az 3 karakter olmalı';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Şifre gerekli';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalı';
      isValid = false;
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Şifre tekrarı gerekli';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleRegister = async () => {
    if (validateForm()) {
      await register(email, username, password);
      
      // If registration is successful, the auth store will update the user
      // and the useEffect in the welcome screen will redirect to home
    }
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Almanca öğrenmeye başlamak için kayıt olun</Text>
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
          label="Kullanıcı Adı"
          placeholder="Kullanıcı adınızı girin"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          error={formErrors.username}
          leftIcon={<User size={20} color={colors.dark.textSecondary} />}
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
        
        <Input
          label="Şifre Tekrarı"
          placeholder="Şifrenizi tekrar girin"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={formErrors.confirmPassword}
          leftIcon={<Lock size={20} color={colors.dark.textSecondary} />}
        />
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <Button
          title="Kayıt Ol"
          onPress={handleRegister}
          loading={isLoading}
          style={styles.button}
        />
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Zaten hesabınız var mı?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Giriş Yapın</Text>
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
  errorText: {
    color: colors.dark.error,
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: colors.dark.textSecondary,
  },
  loginLink: {
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