import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useTheme } from '@/context/theme-context';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 24,
  onRatingChange,
  readOnly = false
}) => {
  const { colors: themeColors } = useTheme();
  
  const handlePress = (selectedRating: number) => {
    if (readOnly) return;
    
    // If user taps the same star again, allow them to remove the rating
    if (selectedRating === rating) {
      onRatingChange?.(0);
    } else {
      onRatingChange?.(selectedRating);
    }
  };
  
  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= rating;
        
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(starValue)}
            disabled={readOnly}
            style={styles.starContainer}
            activeOpacity={readOnly ? 1 : 0.7}
            hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
          >
            <Star
              size={size}
              color={filled ? themeColors.accent : themeColors.inactive}
              fill={filled ? themeColors.accent : 'transparent'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    padding: 2,
  }
});

export default StarRating;