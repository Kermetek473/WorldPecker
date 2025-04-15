import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface ProgressBarProps {
  progress: number;
  height?: number;
  progressColor?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  label?: string;
  style?: object;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 8,
  progressColor = colors.dark.primary,
  backgroundColor = colors.dark.border,
  showPercentage = false,
  label,
  style
}) => {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(clampedProgress * 100);
  
  return (
    <View style={[styles.wrapper, style]}>
      {(label || showPercentage) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && <Text style={styles.percentage}>%{percentage}</Text>}
        </View>
      )}
      <View style={[styles.container, { height, backgroundColor }]}>
        <View 
          style={[
            styles.progress, 
            { 
              width: `${clampedProgress * 100}%`,
              backgroundColor: progressColor
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark.primary,
  },
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProgressBar;