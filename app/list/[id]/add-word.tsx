import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useVocabularyStore } from '@/store/vocabulary-store';
import colors from '@/constants/colors';

export default function AddWordScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lists, addWord } = useVocabularyStore();
  
  const [german, setGerman] = useState('');
  const [turkish, setTurkish] = useState('');
  const [example, setExample] = useState('');
  const [sourceShow, setSourceShow] = useState('');
  const [sourceEpisode, setSourceEpisode] = useState('');
  
  const [errors, setErrors] = useState({
    german: '',
    turkish: '',
  });
  
  const list = lists.find(l => l.id === id);
  
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
      german: '',
      turkish: '',
    };
    
    if (!german.trim()) {
      newErrors.german = 'Almanca kelime gerekli';
      isValid = false;
    }
    
    if (!turkish.trim()) {
      newErrors.turkish = 'Türkçe çeviri gerekli';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleAddWord = () => {
    if (validateForm()) {
      addWord(list.id, {
        german,
        turkish,
        example,
        sourceShow: sourceShow || undefined,
        sourceEpisode: sourceEpisode || undefined,
      });
      
      router.back();
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{ title: 'Kelime Ekle' }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{list.title} Listesine Kelime Ekle</Text>
        
        <View style={styles.form}>
          <Input
            label="Almanca"
            placeholder="Almanca kelimeyi girin"
            value={german}
            onChangeText={setGerman}
            error={errors.german}
          />
          
          <Input
            label="Türkçe"
            placeholder="Türkçe çeviriyi girin"
            value={turkish}
            onChangeText={setTurkish}
            error={errors.turkish}
          />
          
          <Input
            label="Örnek Cümle (İsteğe Bağlı)"
            placeholder="Kelimeyi içeren bir örnek cümle girin"
            value={example}
            onChangeText={setExample}
            multiline
            numberOfLines={3}
          />
          
          <Input
            label="Kaynak Dizi/Film (İsteğe Bağlı)"
            placeholder="Örn: Dark, Babylon Berlin"
            value={sourceShow}
            onChangeText={setSourceShow}
          />
          
          <Input
            label="Bölüm (İsteğe Bağlı)"
            placeholder="Örn: S01E05"
            value={sourceEpisode}
            onChangeText={setSourceEpisode}
          />
          
          <Button
            title="Kelime Ekle"
            onPress={handleAddWord}
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
    fontSize: 20,
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