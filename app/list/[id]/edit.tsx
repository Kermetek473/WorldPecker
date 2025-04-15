import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useVocabularyStore } from '@/store/vocabulary-store';
import colors from '@/constants/colors';

export default function EditListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lists, updateList } = useVocabularyStore();
  
  const list = lists.find(l => l.id === id);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  
  useEffect(() => {
    if (list) {
      setTitle(list.title);
      setDescription(list.description);
      setSource(list.source || '');
    }
  }, [list]);
  
  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Liste bulunamadı</Text>
      </View>
    );
  }
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
    };
    
    if (!title.trim()) {
      newErrors.title = 'Liste başlığı gerekli';
      isValid = false;
    }
    
    if (!description.trim()) {
      newErrors.description = 'Liste açıklaması gerekli';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleUpdateList = () => {
    if (validateForm()) {
      updateList(list.id, {
        title,
        description,
        source: source || undefined,
      });
      
      router.back();
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ title: 'Listeyi Düzenle' }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Listeyi Düzenle</Text>
        
        <View style={styles.form}>
          <Input
            label="Liste Başlığı"
            placeholder="Örn: Günlük Konuşma Kelimeleri"
            value={title}
            onChangeText={setTitle}
            error={errors.title}
          />
          
          <Input
            label="Açıklama"
            placeholder="Bu liste hakkında kısa bir açıklama yazın"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            error={errors.description}
          />
          
          <Input
            label="Kaynak (İsteğe Bağlı)"
            placeholder="Örn: Netflix, Kitap, YouTube"
            value={source}
            onChangeText={setSource}
          />
          
          <Button
            title="Değişiklikleri Kaydet"
            onPress={handleUpdateList}
            style={styles.button}
          />
          
          <Button
            title="İptal"
            onPress={() => router.back()}
            variant="outline"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 24,
  },
  form: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    fontSize: 18,
    color: colors.dark.error,
    textAlign: 'center',
    marginTop: 24,
  },
});