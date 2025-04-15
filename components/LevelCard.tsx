import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GameLevel } from '@/types/game';
import colors from '@/constants/colors';
import { MapPin, Lock, Check } from 'lucide-react-native';
import ProgressBar from './ProgressBar';

interface LevelCardProps {
  level: GameLevel;
  onPress: (level: GameLevel) => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onPress }) => {
  // Calculate progress
  const completedMissions = level.missions.filter(m => m.completed).length;
  const totalMissions = level.missions.length;
  const progress = totalMissions > 0 ? completedMissions / totalMissions : 0;
  const isCompleted = level.completed || (completedMissions === totalMissions && totalMissions > 0);
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        level.locked && styles.lockedContainer,
        isCompleted && styles.completedContainer
      ]}
      onPress={() => !level.locked && onPress(level)}
      activeOpacity={level.locked ? 1 : 0.7}
      disabled={level.locked}
    >
      <View style={styles.header}>
        <View style={[
          styles.levelBadge,
          level.locked && styles.lockedLevelBadge,
          isCompleted && styles.completedLevelBadge
        ]}>
          <Text style={styles.levelNumber}>{level.number}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            level.locked && styles.lockedText,
            isCompleted && styles.completedText
          ]}>
            {level.title}
          </Text>
          <View style={styles.locationContainer}>
            <View>
              <MapPin size={16} color={level.locked ? colors.dark.inactive : (isCompleted ? colors.dark.success : colors.dark.textSecondary)} />
            </View>
            <Text style={[
              styles.locationText,
              level.locked && styles.lockedText,
              isCompleted && styles.completedLocationText
            ]}>
              {level.location}
            </Text>
          </View>
        </View>
        {level.locked ? (
          <View style={styles.lockContainer}>
            <View>
              <Lock size={20} color={colors.dark.inactive} />
            </View>
          </View>
        ) : isCompleted ? (
          <View style={styles.completedIconContainer}>
            <View>
              <Check size={20} color={colors.dark.success} />
            </View>
          </View>
        ) : null}
      </View>
      
      <Text style={[
        styles.description,
        level.locked && styles.lockedText,
        isCompleted && styles.completedDescription
      ]}>
        {level.description}
      </Text>
      
      {!level.locked && (
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={progress} 
            progressColor={isCompleted ? colors.dark.success : undefined}
          />
          <Text style={[
            styles.progressText,
            isCompleted && styles.completedProgressText
          ]}>
            {completedMissions}/{totalMissions} görev tamamlandı
          </Text>
        </View>
      )}
      
      {level.locked && (
        <View style={styles.requiredXpContainer}>
          <Text style={styles.requiredXpText}>
            Açmak için {level.requiredXP} XP gerekli
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  lockedContainer: {
    opacity: 0.8,
  },
  completedContainer: {
    borderLeftWidth: 3,
    borderLeftColor: colors.dark.success,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lockedLevelBadge: {
    backgroundColor: colors.dark.inactive,
  },
  completedLevelBadge: {
    backgroundColor: colors.dark.success,
  },
  levelNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  completedText: {
    color: colors.dark.success,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  completedLocationText: {
    color: colors.dark.success,
    opacity: 0.8,
  },
  lockContainer: {
    marginLeft: 12,
  },
  completedIconContainer: {
    marginLeft: 12,
  },
  description: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  completedDescription: {
    color: colors.dark.textSecondary,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  completedProgressText: {
    color: colors.dark.success,
  },
  requiredXpContainer: {
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  requiredXpText: {
    fontSize: 12,
    color: colors.dark.inactive,
  },
  lockedText: {
    color: colors.dark.inactive,
  },
});

export default LevelCard;