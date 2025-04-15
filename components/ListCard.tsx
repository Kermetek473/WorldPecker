import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, BookOpen, Trash2 } from 'lucide-react-native';
import { VocabularyList } from '@/types/vocabulary';
import ProgressBar from './ProgressBar';
import colors from '@/constants/colors';

interface ListCardProps {
  list: VocabularyList;
  onPress: () => void;
  onDelete?: (listId: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ list, onPress, onDelete }) => {
  const progress = list.totalWords > 0 ? list.learnedWords / list.totalWords : 0;
  
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onPress
    if (onDelete) {
      onDelete(list.id);
    }
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <BookOpen size={24} color={colors.dark.primary} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{list.title}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {list.description}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          {onDelete && (
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDelete}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Trash2 size={18} color={colors.dark.error} />
            </TouchableOpacity>
          )}
          <ChevronRight size={20} color={colors.dark.textSecondary} />
        </View>
      </View>
      
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          {list.learnedWords} / {list.totalWords} kelime öğrenildi
        </Text>
        <ProgressBar progress={progress} height={6} />
      </View>
      
      {list.source && (
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>Kaynak: {list.source}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  description: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: 4,
  },
  stats: {
    marginTop: 16,
  },
  statsText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 4,
  },
  sourceContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
});

export default ListCard;