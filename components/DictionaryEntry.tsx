import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Heart, Volume2, ChevronDown, ChevronUp } from 'lucide-react-native';
import { DictionaryEntry as DictionaryEntryType } from '@/types/dictionary';
import { useSettingsStore } from '@/store/settings-store';
import colors from '@/constants/colors';

interface DictionaryEntryProps {
  entry: DictionaryEntryType;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

const DictionaryEntry: React.FC<DictionaryEntryProps> = ({
  entry,
  isFavorite,
  onPress,
  onToggleFavorite,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playingExampleIndex, setPlayingExampleIndex] = useState<number | null>(null);
  const { selectedLanguage } = useSettingsStore();
  
  // Determine text color for language level
  const getLevelColor = () => {
    switch (entry.level) {
      case 'A1':
      case 'A2':
        return colors.dark.success;
      case 'B1':
      case 'B2':
        return colors.dark.secondary;
      case 'C1':
      case 'C2':
        return colors.dark.primary;
      default:
        return colors.dark.textSecondary;
    }
  };

  const playAudio = async (text: string, isExample: boolean = false, exampleIndex: number | null = null, e?: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering the card's onPress
    }
    
    try {
      if (isExample) {
        setPlayingExampleIndex(exampleIndex);
      } else {
        setIsPlaying(true);
      }
      
      if (Platform.OS === 'web') {
        // Use Web Speech API for web
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = `${selectedLanguage.code}-${selectedLanguage.code.toUpperCase()}`;
        
        // Set up completion handler
        utterance.onend = () => {
          if (isExample) {
            setPlayingExampleIndex(null);
          } else {
            setIsPlaying(false);
          }
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // For native platforms, we would use a different approach
        // This is a placeholder for now
        console.log("Playing audio for:", text);
        
        // Simulate audio playback completion
        setTimeout(() => {
          if (isExample) {
            setPlayingExampleIndex(null);
          } else {
            setIsPlaying(false);
          }
        }, text.length * 100); // Rough estimate based on text length
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      if (isExample) {
        setPlayingExampleIndex(null);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handlePlayAudio = (e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => {
    playAudio(entry.sourceText, false, null, e);
  };
  
  const handlePlayExample = (example: string, index: number, e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => {
    playAudio(example, true, index, e);
  };
  
  const toggleExpanded = (e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Get gender display based on language
  const getGenderDisplay = () => {
    if (!entry.gender) return null;
    
    switch (entry.sourceLanguage) {
      case 'de': // German
        return entry.gender === 'masculine' ? 'der' : 
               entry.gender === 'feminine' ? 'die' : 'das';
      case 'fr': // French
        return entry.gender === 'masculine' ? 'le' : 'la';
      case 'es': // Spanish
        return entry.gender === 'masculine' ? 'el' : 'la';
      case 'it': // Italian
        return entry.gender === 'masculine' ? 'il' : 'la';
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.wordContainer}>
          <Text style={styles.sourceText}>{entry.sourceText}</Text>
          <View style={[styles.levelBadge, { backgroundColor: `${getLevelColor()}20` }]}>
            <Text style={[styles.levelText, { color: getLevelColor() }]}>{entry.level}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.audioButton} 
            onPress={handlePlayAudio}
            disabled={isPlaying}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Volume2 
              size={18} 
              color={isPlaying ? colors.dark.primary : colors.dark.textSecondary} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={onToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart 
              size={20} 
              color={isFavorite ? colors.dark.primary : colors.dark.textSecondary} 
              fill={isFavorite ? colors.dark.primary : 'none'} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.targetText}>{entry.targetText}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.partOfSpeech}>{entry.partOfSpeech}</Text>
        {getGenderDisplay() && (
          <Text style={styles.gender}>{getGenderDisplay()}</Text>
        )}
        
        {entry.examples.length > 0 && (
          <TouchableOpacity 
            style={styles.expandButton} 
            onPress={toggleExpanded}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.expandText}>
              {expanded ? "Örnekleri Gizle" : "Örnekleri Göster"}
            </Text>
            {expanded ? (
              <ChevronUp size={16} color={colors.dark.secondary} />
            ) : (
              <ChevronDown size={16} color={colors.dark.secondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {expanded && entry.examples.length > 0 && (
        <View style={styles.examplesContainer}>
          {entry.examples.slice(0, 2).map((example, index) => (
            <View key={index} style={styles.exampleItem}>
              <View style={styles.exampleContent}>
                <View style={styles.exampleTextContainer}>
                  <Text style={styles.exampleText}>{example.text}</Text>
                  <Text style={styles.exampleTranslation}>{example.translation}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.exampleAudioButton}
                  onPress={(e) => handlePlayExample(example.text, index, e)}
                  disabled={playingExampleIndex === index}
                >
                  <Volume2 
                    size={14} 
                    color={playingExampleIndex === index ? colors.dark.primary : colors.dark.secondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginRight: 8,
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  audioButton: {
    padding: 4,
  },
  favoriteButton: {
    padding: 4,
  },
  targetText: {
    fontSize: 16,
    color: colors.dark.secondary,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  partOfSpeech: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginRight: 8,
  },
  gender: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontStyle: 'italic',
    marginRight: 8,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  expandText: {
    fontSize: 12,
    color: colors.dark.secondary,
    marginRight: 4,
  },
  examplesContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(170, 170, 170, 0.2)',
    paddingTop: 12,
  },
  exampleItem: {
    marginBottom: 8,
  },
  exampleContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  exampleTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  exampleText: {
    fontSize: 14,
    color: colors.dark.text,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  exampleTranslation: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    fontStyle: 'normal',
  },
  exampleAudioButton: {
    padding: 4,
    marginTop: 2,
  },
});

export default DictionaryEntry;