import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Edit2, Plus, Trash2, Play, Award } from 'lucide-react-native';
import WordCard from '@/components/WordCard';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { useVocabularyStore } from '@/store/vocabulary-store';
import colors from '@/constants/colors';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lists, deleteList, toggleWordLearned } = useVocabularyStore();
  const [list, setList] = useState(lists.find(l => l.id === id));
  
  // Add back button to header
  useEffect(() => {
    if (list) {
      // Update the header with the list title
      router.setParams({ title: list.title });
    }
  }, [list]);
  
  useEffect(() => {
    // Update list when lists change (e.g., when a word is toggled)
    const updatedList = lists.find(l => l.id === id);
    if (updatedList) {
      setList(updatedList);
    } else {
      // If list is deleted, go back to lists screen
      router.replace('/(tabs)/lists');
    }
  }, [lists, id]);

  const handleGoBack = () => {
    router.back();
  };
  
  if (!list) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Liste bulunamadı</Text>
        <Button 
          title="Geri Dön" 
          onPress={() => router.replace('/(tabs)/lists')} 
          icon={<ArrowLeft size={20} color="#fff" />}
        />
      </SafeAreaView>
    );
  }
  
  const learnedWords = list.words.filter(word => word.learned).length;
  const progress = list.words.length > 0 ? learnedWords / list.words.length : 0;
  
  const handleDeleteList = () => {
    Alert.alert(
      'Listeyi Sil',
      `"${list.title}" listesini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => {
            deleteList(list.id);
            router.replace('/(tabs)/lists');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleToggleWord = (wordId: string) => {
    toggleWordLearned(list.id, wordId);
  };
  
  const handleStartQuiz = () => {
    if (list.words.length < 4) {
      Alert.alert(
        'Yetersiz Kelime',
        'Quiz başlatmak için en az 4 kelimeye ihtiyacınız var.',
        [{ text: 'Tamam' }]
      );
      return;
    }
    
    router.push(`/list/${list.id}/quiz`);
  };
  
  const handleStartLearning = () => {
    if (list.words.length === 0) {
      Alert.alert(
        'Kelime Yok',
        'Öğrenmeye başlamak için önce listeye kelime eklemelisiniz.',
        [{ text: 'Tamam' }]
      );
      return;
    }
    
    router.push(`/list/${list.id}/learn`);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen 
        options={{
          title: list.title,
          headerBackTitle: 'Geri',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{list.title}</Text>
          {list.sourceShow && (
            <Text style={styles.source}>
              {list.sourceShow} {list.sourceEpisode || ''}
            </Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push(`/list/${list.id}/edit`)}
        >
          <Edit2 size={20} color={colors.dark.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>İlerleme</Text>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>
          {learnedWords}/{list.words.length} kelime öğrenildi
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <Button
          title="Öğrenmeye Başla"
          onPress={handleStartLearning}
          icon={<Play size={20} color="#fff" />}
          style={styles.actionButton}
        />
        
        <Button
          title="Quiz Başlat"
          onPress={handleStartQuiz}
          variant="secondary"
          icon={<Award size={20} color="#fff" />}
          style={styles.actionButton}
        />
      </View>
      
      <View style={styles.wordsHeader}>
        <Text style={styles.wordsTitle}>Kelimeler ({list.words.length})</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push(`/list/${list.id}/add-word`)}
        >
          <Plus size={20} color={colors.dark.primary} />
          <Text style={styles.addButtonText}>Kelime Ekle</Text>
        </TouchableOpacity>
      </View>
      
      {list.words.length > 0 ? (
        <FlatList
          data={list.words}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WordCard
              word={item}
              onToggle={() => handleToggleWord(item.id)}
            />
          )}
          contentContainerStyle={styles.wordsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Henüz Kelime Yok</Text>
          <Text style={styles.emptyText}>
            Bu listeye henüz kelime eklenmemiş. Kelime eklemek için "Kelime Ekle" butonuna tıklayın.
          </Text>
          <Button
            title="Kelime Ekle"
            onPress={() => router.push(`/list/${list.id}/add-word`)}
            icon={<Plus size={20} color="#fff" />}
            style={styles.emptyButton}
          />
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDeleteList}
      >
        <Trash2 size={20} color={colors.dark.error} />
        <Text style={styles.deleteButtonText}>Listeyi Sil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  headerButton: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  source: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    backgroundColor: colors.dark.card,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  wordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  wordsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: '600',
  },
  wordsList: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    marginTop: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    color: colors.dark.error,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: colors.dark.error,
    textAlign: 'center',
    margin: 24,
  },
});