import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, X } from 'lucide-react-native';
import ListCard from '@/components/ListCard';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { sampleVocabularyLists } from '@/mocks/sample-episodes';
import colors from '@/constants/colors';

export default function ListsScreen() {
  const router = useRouter();
  const { lists, addSampleLists, deleteList } = useVocabularyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasAddedSamples, setHasAddedSamples] = useState(false);
  
  // Add sample lists on first load
  useEffect(() => {
    if (!hasAddedSamples && lists.length === 0) {
      addSampleLists(sampleVocabularyLists);
      setHasAddedSamples(true);
    }
  }, [lists, hasAddedSamples]);
  
  const filteredLists = lists.filter(list => 
    list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteList = (listId) => {
    Alert.alert(
      'Listeyi Sil',
      'Bu listeyi silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => {
            console.log("Deleting list with ID:", listId);
            deleteList(listId);
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>Kelime Listelerim</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/create')}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.dark.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Liste ara..."
          placeholderTextColor={colors.dark.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={20} color={colors.dark.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      {filteredLists.length > 0 ? (
        <FlatList
          data={filteredLists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListCard
              list={{
                ...item,
                totalWords: item.words.length,
                learnedWords: item.words.filter(word => word.learned).length,
                source: item.sourceShow ? `${item.sourceShow} ${item.sourceEpisode || ''}` : undefined
              }}
              onPress={() => router.push(`/list/${item.id}`)}
              onDelete={() => handleDeleteList(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          {searchQuery.length > 0 ? (
            <>
              <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
              <Text style={styles.emptyText}>
                "{searchQuery}" araması için sonuç bulunamadı. Lütfen başka bir arama yapmayı deneyin.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.emptyTitle}>Henüz Liste Yok</Text>
              <Text style={styles.emptyText}>
                Kelime listeniz bulunmuyor. Yeni bir liste oluşturmak için sağ üstteki + butonuna tıklayın.
              </Text>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => router.push('/(tabs)/create')}
              >
                <Plus size={20} color="#fff" />
                <Text style={styles.createButtonText}>Yeni Liste Oluştur</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: colors.dark.text,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});