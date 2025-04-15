import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, FileText, Upload, Video, Download, Tv } from 'lucide-react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CSVImportModal from '@/components/CSVImportModal';
import { useVocabularyStore } from '@/store/vocabulary-store';
import colors from '@/constants/colors';

export default function CreateScreen() {
  const router = useRouter();
  const { createList } = useVocabularyStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  const [showCSVModal, setShowCSVModal] = useState(false);
  
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
  
  const handleCreateList = () => {
    if (validateForm()) {
      createList(title, description, source);
      router.push('/(tabs)/lists');
    }
  };
  
  const handleCSVImport = (subtitles: string, name: string, episode: string) => {
    // Navigate to import-subtitles screen with the data
    router.push({
      pathname: '/import-subtitles',
      params: {
        subtitles: encodeURIComponent(subtitles),
        showName: name,
        episodeName: episode
      }
    });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Yeni Liste Oluştur</Text>
        <Text style={styles.subtitle}>
          Kendi kelime listenizi oluşturun veya Netflix altyazılarından içe aktarın
        </Text>
        
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
            title="Liste Oluştur"
            onPress={handleCreateList}
            style={styles.createButton}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Veya Şunlardan Birini Deneyin</Text>
        
        <View style={styles.optionsContainer}>
          <Card style={styles.optionCard} onPress={() => router.push('/downloaded-episodes')}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(229, 9, 20, 0.1)' }]}>
              <Tv size={24} color={colors.dark.primary} />
            </View>
            <Text style={styles.optionTitle}>İndirilen Bölümler</Text>
            <Text style={styles.optionDescription}>
              Daha önce indirdiğiniz bölümlerin altyazılarını içe aktarın
            </Text>
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>3 Bölüm</Text>
            </View>
          </Card>
          
          <Card style={styles.optionCard} onPress={() => router.push('/episode-browser')}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(229, 9, 20, 0.1)' }]}>
              <Download size={24} color={colors.dark.primary} />
            </View>
            <Text style={styles.optionTitle}>Bölüm İndir</Text>
            <Text style={styles.optionDescription}>
              Yeni Almanca dizi bölümleri indirin ve altyazılarını içe aktarın
            </Text>
          </Card>
          
          <Card style={styles.optionCard} onPress={() => router.push('/import-subtitles')}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(229, 9, 20, 0.1)' }]}>
              <FileText size={24} color={colors.dark.primary} />
            </View>
            <Text style={styles.optionTitle}>Altyazı İçe Aktar</Text>
            <Text style={styles.optionDescription}>
              Netflix dizilerinden altyazıları içe aktararak kelime listeleri oluşturun
            </Text>
          </Card>
          
          <Card style={styles.optionCard} onPress={() => setShowCSVModal(true)}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(229, 9, 20, 0.1)' }]}>
              <Upload size={24} color={colors.dark.primary} />
            </View>
            <Text style={styles.optionTitle}>Black Mirror Altyazıları</Text>
            <Text style={styles.optionDescription}>
              Black Mirror S01E03 bölümünün Almanca altyazılarını içe aktarın
            </Text>
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>Hazır</Text>
            </View>
          </Card>
          
          <Card style={styles.optionCard} onPress={() => router.push('/video-import')}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(229, 9, 20, 0.1)' }]}>
              <Video size={24} color={colors.dark.primary} />
            </View>
            <Text style={styles.optionTitle}>Video ve Altyazı İçe Aktar</Text>
            <Text style={styles.optionDescription}>
              Almanca video ve altyazılardan otomatik kelime çıkarma ve çevirme
            </Text>
          </Card>
          
          <Card style={styles.optionCard} onPress={() => router.push('/templates')}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(77, 171, 247, 0.1)' }]}>
              <BookOpen size={24} color={colors.dark.secondary} />
            </View>
            <Text style={styles.optionTitle}>Hazır Şablonlar</Text>
            <Text style={styles.optionDescription}>
              Popüler konulara göre hazırlanmış kelime listelerini kullanın
            </Text>
          </Card>
        </View>
      </ScrollView>
      
      <CSVImportModal
        visible={showCSVModal}
        onClose={() => setShowCSVModal(false)}
        onImport={handleCSVImport}
      />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 24,
  },
  form: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  createButton: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    alignItems: 'center',
    position: 'relative',
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  optionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(229, 9, 20, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  optionBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
});