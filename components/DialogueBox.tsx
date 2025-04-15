import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DialogueNode, GameCharacter, DialogueOption } from '@/types/game';
import colors from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';

interface DialogueBoxProps {
  dialogue: DialogueNode;
  character: GameCharacter;
  onSelectOption: (option: DialogueOption) => void;
  isEnd?: boolean;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ 
  dialogue, 
  character, 
  onSelectOption,
  isEnd = false
}) => {
  const { showTranslations, nativeLanguage } = useSettingsStore();
  
  return (
    <View style={styles.container}>
      <View style={styles.characterInfo}>
        <Image 
          source={{ uri: character.avatar }} 
          style={styles.avatar}
        />
        <Text style={styles.characterName}>{character.name}</Text>
      </View>
      
      <View style={styles.dialogueContainer}>
        <Text style={styles.dialogueText}>{dialogue.text}</Text>
        
        {showTranslations && dialogue.translation && (
          <Text style={styles.translationText}>{dialogue.translation}</Text>
        )}
      </View>
      
      {!isEnd && dialogue.options.length > 0 && (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Cevabınız:</Text>
          
          {dialogue.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => onSelectOption(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option.text}</Text>
              {showTranslations && option.translation && (
                <Text style={styles.optionTranslation}>{option.translation}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
  },
  characterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  dialogueContainer: {
    padding: 16,
  },
  dialogueText: {
    fontSize: 16,
    color: colors.dark.text,
    lineHeight: 24,
  },
  translationText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  optionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
  },
  optionsTitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: colors.dark.primary,
  },
  optionTranslation: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default DialogueBox;