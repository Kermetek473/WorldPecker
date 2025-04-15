import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mission } from '@/types/game';
import colors from '@/constants/colors';
import { MessageCircle, Book, Award, Lock, Check, HelpCircle, FileText, Headphones } from 'lucide-react-native';

interface MissionCardProps {
  mission: Mission;
  onPress: (mission: Mission) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onPress }) => {
  // Get icon based on mission type
  const getMissionIcon = () => {
    switch (mission.type) {
      case 'conversation':
        return <MessageCircle size={20} color={mission.locked ? colors.dark.inactive : colors.dark.primary} />;
      case 'vocabulary':
        return <Book size={20} color={mission.locked ? colors.dark.inactive : colors.dark.primary} />;
      case 'quiz':
        return <HelpCircle size={20} color={mission.locked ? colors.dark.inactive : colors.dark.primary} />;
      case 'grammar':
        return <FileText size={20} color={mission.locked ? colors.dark.inactive : colors.dark.primary} />;
      case 'listening':
        return <Headphones size={20} color={mission.locked ? colors.dark.inactive : colors.dark.primary} />;
      default:
        return <Award size={20} color={mission.locked ? colors.dark.inactive : colors.dark.primary} />;
    }
  };
  
  // Get status text based on mission state
  const getStatusText = () => {
    if (mission.completed) {
      return 'Tamamlandı';
    }
    if (mission.locked) {
      return 'Kilitli';
    }
    return 'Devam Et';
  };
  
  // Get status icon based on mission state
  const getStatusIcon = () => {
    if (mission.completed) {
      return <Check size={16} color={colors.dark.success} />;
    }
    if (mission.locked) {
      return <Lock size={16} color={colors.dark.inactive} />;
    }
    return null;
  };
  
  // Debug info
  console.log(`Rendering mission: ${mission.id}, type: ${mission.type}, quizId: ${mission.quizId || 'none'}, locked: ${mission.locked}, completed: ${mission.completed}`);
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        mission.locked && styles.lockedContainer,
        mission.completed && styles.completedContainer
      ]}
      onPress={() => !mission.locked && onPress(mission)}
      activeOpacity={mission.locked ? 1 : 0.7}
      disabled={mission.locked}
    >
      <View style={[
        styles.iconContainer,
        mission.locked && styles.lockedIconContainer,
        mission.completed && styles.completedIconContainer
      ]}>
        {getMissionIcon()}
      </View>
      <View style={styles.content}>
        <Text style={[
          styles.title,
          mission.locked && styles.lockedText,
          mission.completed && styles.completedText
        ]}>
          {mission.title}
        </Text>
        <Text style={[
          styles.description,
          mission.locked && styles.lockedText
        ]}>
          {mission.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.difficultyContainer}>
            {Array(mission.difficulty).fill(0).map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.difficultyDot,
                  mission.locked && styles.lockedDifficultyDot,
                  mission.completed && styles.completedDifficultyDot
                ]} 
              />
            ))}
            {Array(3 - mission.difficulty).fill(0).map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.difficultyDotEmpty,
                  mission.locked && styles.lockedDifficultyDot,
                  mission.completed && styles.completedDifficultyDotEmpty
                ]} 
              />
            ))}
          </View>
          <View style={[
            styles.statusContainer,
            mission.completed && styles.completedStatus,
            mission.locked && styles.lockedStatus
          ]}>
            {getStatusIcon()}
            <Text style={[
              styles.statusText,
              mission.completed && styles.completedStatusText,
              mission.locked && styles.lockedStatusText
            ]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
      </View>
      <View style={[
        styles.xpContainer,
        mission.locked && styles.lockedXpContainer,
        mission.completed && styles.completedXpContainer
      ]}>
        <Text style={[
          styles.xpText,
          mission.locked && styles.lockedText,
          mission.completed && styles.completedXpText
        ]}>
          {mission.xpReward} XP
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockedContainer: {
    opacity: 0.7,
  },
  completedContainer: {
    borderLeftWidth: 3,
    borderLeftColor: colors.dark.success,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lockedIconContainer: {
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
  },
  completedIconContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  completedText: {
    color: colors.dark.success,
  },
  description: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dark.primary,
    marginRight: 4,
  },
  difficultyDotEmpty: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.dark.primary,
    marginRight: 4,
  },
  lockedDifficultyDot: {
    backgroundColor: colors.dark.inactive,
    borderColor: colors.dark.inactive,
  },
  completedDifficultyDot: {
    backgroundColor: colors.dark.success,
  },
  completedDifficultyDotEmpty: {
    borderColor: colors.dark.success,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  completedStatus: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  lockedStatus: {
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
  },
  statusText: {
    fontSize: 12,
    color: colors.dark.primary,
    marginLeft: 4,
  },
  completedStatusText: {
    color: colors.dark.success,
  },
  lockedStatusText: {
    color: colors.dark.inactive,
  },
  xpContainer: {
    marginLeft: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  lockedXpContainer: {
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
  },
  completedXpContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  xpText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.dark.primary,
  },
  completedXpText: {
    color: colors.dark.success,
  },
  lockedText: {
    color: colors.dark.inactive,
  },
});

export default MissionCard;