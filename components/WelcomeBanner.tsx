import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';

interface WelcomeBannerProps {
  username?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ username }) => {
  return (
    <LinearGradient
      colors={[colors.dark.primary, colors.dark.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={{ 
            uri: 'https://i.imgur.com/g19wxZn.jpeg'
          }}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>HOŞGELDİNİZ</Text>
          {username && (
            <Text style={styles.usernameText}>{username}</Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  usernameText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  }
});

export default WelcomeBanner;