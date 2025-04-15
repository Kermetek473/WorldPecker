import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import colors from '@/constants/colors';

interface AlphabetSelectorProps {
  onSelectLetter: (letter: string | null) => void;
  selectedLetter: string | null;
  language?: string; // Language code to determine which alphabet to show
}

const AlphabetSelector: React.FC<AlphabetSelectorProps> = ({
  onSelectLetter,
  selectedLetter,
  language = 'en',
}) => {
  // Get the appropriate alphabet based on language
  const getAlphabet = () => {
    switch (language) {
      case 'de': // German
        return [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'Ä', 'Ö', 'Ü', 'ß'
        ];
      case 'fr': // French
        return [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'À', 'Â', 'Æ', 'Ç', 'É', 'È', 'Ê', 'Ë', 'Î', 'Ï', 'Ô', 'Œ', 'Ù', 'Û', 'Ü', 'Ÿ'
        ];
      case 'es': // Spanish
        return [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'Á', 'É', 'Í', 'Ó', 'Ú', 'Ü'
        ];
      case 'it': // Italian
        return [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'À', 'È', 'É', 'Ì', 'Í', 'Ò', 'Ó', 'Ù', 'Ú'
        ];
      default: // English and others
        return [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
    }
  };

  const alphabet = getAlphabet();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.letterButton,
          selectedLetter === null && styles.selectedLetterButton
        ]}
        onPress={() => onSelectLetter(null)}
      >
        <Text style={[
          styles.letterText,
          selectedLetter === null && styles.selectedLetterText
        ]}>
          Tümü
        </Text>
      </TouchableOpacity>
      
      {alphabet.map((letter) => (
        <TouchableOpacity
          key={letter}
          style={[
            styles.letterButton,
            selectedLetter === letter && styles.selectedLetterButton
          ]}
          onPress={() => onSelectLetter(letter)}
        >
          <Text style={[
            styles.letterText,
            selectedLetter === letter && styles.selectedLetterText
          ]}>
            {letter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  letterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: colors.dark.card,
  },
  selectedLetterButton: {
    backgroundColor: colors.dark.primary,
  },
  letterText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
  },
  selectedLetterText: {
    color: '#fff',
  },
});

export default AlphabetSelector;