import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert, Modal, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  Clock, 
  LogOut, 
  Moon, 
  Settings, 
  Trash2, 
  User, 
  Volume2,
  Globe,
  Languages
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useSettingsStore, LANGUAGES } from '@/store/settings-store';
import { useProgressStore } from '@/store/progress-store';
import colors from '@/constants/colors';
import { useTheme } from '@/context/theme-context';
import Button from '@/components/Button';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { resetProgress } = useProgressStore();
  const { theme, setTheme } = useTheme();
  const { 
    notificationsEnabled, 
    showTranslations, 
    autoPlayAudio,
    quizDifficulty,
    dailyGoal,
    selectedLanguage,
    nativeLanguage,
    darkMode,
    updateSettings,
    setSelectedLanguage,
    setNativeLanguage
  } = useSettingsStore();
  
  const [languageModalVisible, setLanguageModalVisible] = React.useState(false);
  const [selectingNative, setSelectingNative] = React.useState(false);
  const [dailyGoalModalVisible, setDailyGoalModalVisible] = React.useState(false);
  const [tempDailyGoal, setTempDailyGoal] = React.useState(dailyGoal);
  
  // Update theme when darkMode changes
  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);
  
  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          onPress: () => {
            logout();
            router.replace('/');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleResetProgress = () => {
    Alert.alert(
      'İlerlemeyi Sıfırla',
      'Tüm ilerleme verileriniz silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sıfırla',
          onPress: resetProgress,
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleChangeDifficulty = () => {
    Alert.alert(
      'Quiz Zorluğu',
      'Quiz sorularının zorluğunu seçin',
      [
        {
          text: 'Kolay',
          onPress: () => updateSettings({ quizDifficulty: 'easy' }),
        },
        {
          text: 'Orta',
          onPress: () => updateSettings({ quizDifficulty: 'medium' }),
        },
        {
          text: 'Zor',
          onPress: () => updateSettings({ quizDifficulty: 'hard' }),
        },
        {
          text: 'İptal',
          style: 'cancel',
        },
      ]
    );
  };
  
  const openLanguageModal = (isNative = false) => {
    setSelectingNative(isNative);
    setLanguageModalVisible(true);
  };
  
  const handleSelectLanguage = (languageCode: string) => {
    if (selectingNative) {
      setNativeLanguage(languageCode);
    } else {
      setSelectedLanguage(languageCode);
    }
    setLanguageModalVisible(false);
  };
  
  const handleDarkModeToggle = (value: boolean) => {
    updateSettings({ darkMode: value });
  };
  
  const openDailyGoalModal = () => {
    setTempDailyGoal(dailyGoal);
    setDailyGoalModalVisible(true);
  };
  
  const handleSaveDailyGoal = () => {
    updateSettings({ dailyGoal: tempDailyGoal });
    setDailyGoalModalVisible(false);
  };
  
  // Get colors from theme context
  const { colors: themeColors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: themeColors.text }]}>Ayarlar</Text>
        
        <View style={[styles.profileSection, { backgroundColor: themeColors.cardBackground }]}>
          <View style={[styles.profileIcon, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
            <User size={32} color={themeColors.text} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: themeColors.text }]}>{user?.username || 'Kullanıcı'}</Text>
            <Text style={[styles.profileEmail, { color: themeColors.textSecondary }]}>{user?.email || 'kullanici@ornek.com'}</Text>
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Dil Ayarları</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => openLanguageModal(false)}
          >
            <View style={styles.settingInfo}>
              <Globe size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Öğrenilen Dil</Text>
            </View>
            <View style={[styles.settingValue, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Text style={[styles.settingValueText, { color: themeColors.textSecondary }]}>
                {selectedLanguage.flag} {selectedLanguage.nativeName}
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => openLanguageModal(true)}
          >
            <View style={styles.settingInfo}>
              <Languages size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Ana Diliniz</Text>
            </View>
            <View style={[styles.settingValue, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Text style={[styles.settingValueText, { color: themeColors.textSecondary }]}>
                {nativeLanguage.flag} {nativeLanguage.nativeName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Uygulama Ayarları</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Bildirimler</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => updateSettings({ notificationsEnabled: value })}
              trackColor={{ false: themeColors.border, true: themeColors.primary }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Çevirileri Göster</Text>
            </View>
            <Switch
              value={showTranslations}
              onValueChange={(value) => updateSettings({ showTranslations: value })}
              trackColor={{ false: themeColors.border, true: themeColors.primary }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Volume2 size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Otomatik Ses Çalma</Text>
            </View>
            <Switch
              value={autoPlayAudio}
              onValueChange={(value) => updateSettings({ autoPlayAudio: value })}
              trackColor={{ false: themeColors.border, true: themeColors.primary }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleChangeDifficulty}
          >
            <View style={styles.settingInfo}>
              <Settings size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Quiz Zorluğu</Text>
            </View>
            <View style={[styles.settingValue, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Text style={[styles.settingValueText, { color: themeColors.textSecondary }]}>
                {quizDifficulty === 'easy' ? 'Kolay' : 
                 quizDifficulty === 'medium' ? 'Orta' : 'Zor'}
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={openDailyGoalModal}
          >
            <View style={styles.settingInfo}>
              <Clock size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Günlük Hedef</Text>
            </View>
            <View style={[styles.settingValue, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Text style={[styles.settingValueText, { color: themeColors.textSecondary }]}>{dailyGoal} kelime</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={themeColors.text} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Karanlık Mod</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: themeColors.border, true: themeColors.primary }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Hesap</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleResetProgress}
          >
            <View style={styles.settingInfo}>
              <Trash2 size={20} color={themeColors.error} />
              <Text style={[styles.settingText, { color: themeColors.error }]}>
                İlerlemeyi Sıfırla
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleLogout}
          >
            <View style={styles.settingInfo}>
              <LogOut size={20} color={themeColors.error} />
              <Text style={[styles.settingText, { color: themeColors.error }]}>
                Çıkış Yap
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.textSecondary }]}>Sürüm 1.0.0</Text>
          <Text style={[styles.footerText, { color: themeColors.textSecondary }]}>© 2023 Dil Öğrenme Uygulaması</Text>
        </View>
      </ScrollView>
      
      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              {selectingNative ? 'Ana Dilinizi Seçin' : 'Öğrenmek İstediğiniz Dili Seçin'}
            </Text>
            
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={() => handleSelectLanguage(item.code)}
                >
                  <Text style={styles.languageFlag}>{item.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={[styles.languageName, { color: themeColors.text }]}>{item.nativeName}</Text>
                    <Text style={[styles.languageNameEn, { color: themeColors.textSecondary }]}>{item.name}</Text>
                  </View>
                  {((selectingNative && nativeLanguage.code === item.code) || 
                    (!selectingNative && selectedLanguage.code === item.code)) && (
                    <View style={[styles.selectedIndicator, { backgroundColor: themeColors.primary }]} />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: themeColors.border }]} />}
            />
            
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: themeColors.primary }]}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Daily Goal Modal */}
      <Modal
        visible={dailyGoalModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDailyGoalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Günlük Kelime Hedefi
            </Text>
            
            <View style={styles.goalSliderContainer}>
              <View style={styles.goalOptions}>
                {[5, 10, 15, 20, 25, 30].map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    style={[
                      styles.goalOption,
                      tempDailyGoal === goal && [styles.selectedGoal, { backgroundColor: themeColors.primary }]
                    ]}
                    onPress={() => setTempDailyGoal(goal)}
                  >
                    <Text 
                      style={[
                        styles.goalText, 
                        { color: tempDailyGoal === goal ? '#fff' : themeColors.text }
                      ]}
                    >
                      {goal}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={[styles.goalDescription, { color: themeColors.textSecondary }]}>
                Her gün {tempDailyGoal} yeni kelime öğrenmeyi hedefliyorsunuz.
              </Text>
            </View>
            
            <View style={styles.modalButtons}>
              <Button
                title="İptal"
                onPress={() => setDailyGoalModalVisible(false)}
                variant="outline"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Kaydet"
                onPress={handleSaveDailyGoal}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
  settingValue: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  settingValueText: {
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  languageNameEn: {
    fontSize: 14,
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  separator: {
    height: 1,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  goalSliderContainer: {
    marginVertical: 20,
  },
  goalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  goalOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedGoal: {
    borderWidth: 0,
  },
  goalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalDescription: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
});