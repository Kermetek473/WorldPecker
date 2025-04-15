import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GameCharacter } from '@/types/game';
import colors from '@/constants/colors';
import { Check } from 'lucide-react-native';

interface CharacterCardProps {
  character: GameCharacter;
  selected: boolean;
  onSelect: (character: GameCharacter) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, selected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={() => onSelect(character)}
      activeOpacity={0.7}
      testID={`character-card-${character.id}`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: character.avatar }}
          style={styles.image}
          resizeMode="cover"
        />
        {selected && (
          <View style={styles.checkmark}>
            <View>
              <Check size={20} color="#fff" />
            </View>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.description}>{character.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: colors.dark.primary,
  },
  imageContainer: {
    position: 'relative',
    height: 150,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.dark.primary,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
});

export default CharacterCard;