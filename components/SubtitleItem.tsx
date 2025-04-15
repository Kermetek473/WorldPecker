import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Circle } from 'lucide-react-native';
import { SubtitleEntry } from '@/types/vocabulary';
import colors from '@/constants/colors';

interface SubtitleItemProps {
  entry: SubtitleEntry;
  isSelected?: boolean;
  onToggleSelect: () => void;
}

const SubtitleItem: React.FC<SubtitleItemProps> = ({ 
  entry, 
  isSelected = false, 
  onToggleSelect 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]} 
      onPress={onToggleSelect}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.time}>
          {entry.startTime} - {entry.endTime}
        </Text>
        <Text style={styles.text}>{entry.text}</Text>
      </View>
      
      <View style={[
        styles.checkCircle,
        isSelected && styles.selectedCheckCircle
      ]}>
        {isSelected ? (
          <Check size={16} color="#fff" />
        ) : (
          <Circle size={16} color={colors.dark.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.dark.card,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedContainer: {
    backgroundColor: `${colors.dark.primary}20`,
    borderColor: colors.dark.primary,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: colors.dark.text,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  selectedCheckCircle: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
});

export default SubtitleItem;