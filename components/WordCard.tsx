import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { VocabularyWord } from '@/types/vocabulary';
import colors from '@/constants/colors';

interface WordCardProps {
  word: VocabularyWord;
  showTranslation?: boolean;
  onToggleTranslation?: () => void;
  onMarkLearned?: (learned: boolean) => void;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  showTranslation = true,
  onToggleTranslation,
  onMarkLearned,
}) => {
  // Handle both old and new word structure
  const germanText = word.german || word.sourceText;
  const turkishText = word.turkish || word.targetText;
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.german}>{germanText}</Text>
        {word.learned && (
          <View style={styles.learnedBadge}>
            <Text style={styles.learnedText}>Öğrenildi</Text>
          </View>
        )}
      </View>
      
      {showTranslation && (
        <Text style={styles.turkish}>{turkishText}</Text>
      )}
      
      {!showTranslation && onToggleTranslation && (
        <TouchableOpacity 
          style={styles.showButton} 
          onPress={onToggleTranslation}
        >
          <Text style={styles.showButtonText}>Çeviriyi Göster</Text>
        </TouchableOpacity>
      )}
      
      {word.example && (
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleLabel}>Örnek:</Text>
          <Text style={styles.example}>{word.example}</Text>
        </View>
      )}
      
      {word.sourceShow && (
        <Text style={styles.source}>
          Kaynak: {word.sourceShow} {word.sourceEpisode ? `- ${word.sourceEpisode}` : ''}
        </Text>
      )}
      
      {onMarkLearned && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.learnedButton]}
            onPress={() => onMarkLearned(true)}
          >
            <Check size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Öğrendim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.notLearnedButton]}
            onPress={() => onMarkLearned(false)}
          >
            <X size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Tekrar Et</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  german: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  turkish: {
    fontSize: 18,
    color: colors.dark.secondary,
    marginBottom: 12,
  },
  exampleContainer: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  exampleLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 4,
  },
  example: {
    fontSize: 16,
    color: colors.dark.text,
    fontStyle: 'italic',
  },
  source: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginTop: 12,
  },
  learnedBadge: {
    backgroundColor: colors.dark.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  learnedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  showButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  showButtonText: {
    color: colors.dark.secondary,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    gap: 8,
  },
  learnedButton: {
    backgroundColor: colors.dark.success,
  },
  notLearnedButton: {
    backgroundColor: colors.dark.error,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default WordCard;