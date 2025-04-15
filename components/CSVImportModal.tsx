import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { X, FileText, Check } from 'lucide-react-native';
import Button from '@/components/Button';
import { blackMirrorSubtitleData, avengersSubtitleData, ironManSubtitleData, kungFuPandaSubtitleData } from '@/mocks/sample-episodes';
import { SubtitleEntry } from '@/types/vocabulary';
import colors from '@/constants/colors';

interface CSVImportModalProps {
  visible: boolean;
  onClose: () => void;
  onImport: (subtitles: string, showName: string, episodeName: string) => void;
}

const CSVImportModal: React.FC<CSVImportModalProps> = ({
  visible,
  onClose,
  onImport
}) => {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [customCSV, setCustomCSV] = useState('');
  const [showName, setShowName] = useState('');
  const [episodeName, setEpisodeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Convert subtitle entries to SRT format string
  const convertToSRT = (entries: SubtitleEntry[]): string => {
    return entries.map((entry, index) => {
      return `${index + 1}
${entry.startTime} --> ${entry.endTime}
${entry.text}

`;
    }).join('');
  };
  
  const examples = [
    {
      id: 'dark',
      title: 'Dark',
      description: 'Staffel 1, Episode 1 - "Sırlar"',
      subtitles: convertToSRT(blackMirrorSubtitleData.entries),
      thumbnail: 'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      wordCount: 42
    },
    {
      id: 'avengers',
      title: 'Avengers',
      description: 'Infinity War',
      subtitles: convertToSRT(avengersSubtitleData.entries),
      thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2ZW5nZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      wordCount: 56
    },
    {
      id: 'iron-man',
      title: 'Iron Man',
      description: 'Bölüm 1',
      subtitles: convertToSRT(ironManSubtitleData.entries),
      thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlyb24lMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      wordCount: 48
    },
    {
      id: 'black-mirror',
      title: 'Black Mirror',
      description: 'S01E03 - "The Entire History of You"',
      subtitles: convertToSRT(blackMirrorSubtitleData.entries),
      thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWlycm9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      wordCount: 65
    },
    {
      id: 'kung-fu-panda',
      title: 'Kung Fu Panda',
      description: 'Bölüm 1',
      subtitles: convertToSRT(kungFuPandaSubtitleData.entries),
      thumbnail: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlcmxpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      wordCount: 38
    }
  ];
  
  const handleImport = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      if (selectedExample) {
        const example = examples.find(ex => ex.id === selectedExample);
        if (example) {
          onImport(
            example.subtitles,
            example.title,
            example.description
          );
        }
      } else if (customCSV.trim()) {
        onImport(
          customCSV,
          showName || 'Benutzerdefinierte Untertitel',
          episodeName || ''
        );
      }
      
      setIsLoading(false);
      onClose();
    }, 1000);
  };
  
  const handleSelectExample = (id: string) => {
    setSelectedExample(id === selectedExample ? null : id);
    setCustomCSV('');
  };
  
  const handleCustomCSVChange = (text: string) => {
    setCustomCSV(text);
    setSelectedExample(null);
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>CSV Altyazı İçe Aktar</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.dark.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Örnek Altyazılar</Text>
            <Text style={styles.sectionDescription}>
              Hızlı başlangıç için hazır altyazı örneklerinden birini seçin
            </Text>
            
            {examples.map(example => (
              <TouchableOpacity
                key={example.id}
                style={[
                  styles.exampleItem,
                  selectedExample === example.id && styles.selectedExampleItem
                ]}
                onPress={() => handleSelectExample(example.id)}
              >
                <Image 
                  source={{ uri: example.thumbnail }}
                  style={styles.exampleThumbnail}
                  resizeMode="cover"
                />
                
                <View style={styles.exampleContent}>
                  <Text style={styles.exampleTitle}>{example.title}</Text>
                  <Text style={styles.exampleDescription}>{example.description}</Text>
                  <View style={styles.exampleStats}>
                    <Text style={styles.exampleInfo}>
                      {example.subtitles.split('\n\n').length} altyazı satırı
                    </Text>
                    <Text style={styles.exampleInfo}>
                      {example.wordCount} kelime
                    </Text>
                    <Text style={styles.exampleInfo}>
                      Almanca
                    </Text>
                  </View>
                </View>
                
                <View style={[
                  styles.checkCircle,
                  selectedExample === example.id && styles.selectedCheckCircle
                ]}>
                  {selectedExample === example.id && (
                    <Check size={16} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Özel CSV Yükle</Text>
            <Text style={styles.sectionDescription}>
              Kendi SRT formatındaki altyazı dosyanızı yapıştırın
            </Text>
            
            <TextInput
              style={styles.csvInput}
              placeholder="SRT formatındaki altyazı metnini buraya yapıştırın..."
              placeholderTextColor={colors.dark.textSecondary}
              multiline
              numberOfLines={8}
              value={customCSV}
              onChangeText={handleCustomCSVChange}
            />
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Dizi/Film Adı</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: Dark, Avengers"
                placeholderTextColor={colors.dark.textSecondary}
                value={showName}
                onChangeText={setShowName}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Bölüm (İsteğe Bağlı)</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: S01E05"
                placeholderTextColor={colors.dark.textSecondary}
                value={episodeName}
                onChangeText={setEpisodeName}
              />
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <Button
              title="İptal"
              onPress={onClose}
              variant="outline"
              style={styles.footerButton}
            />
            <Button
              title="İçe Aktar"
              onPress={handleImport}
              style={styles.footerButton}
              disabled={!selectedExample && !customCSV.trim()}
              icon={isLoading ? undefined : <FileText size={16} color="#fff" />}
            >
              {isLoading && <ActivityIndicator size="small" color="#fff" />}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: colors.dark.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
    maxHeight: '70%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedExampleItem: {
    borderColor: colors.dark.primary,
    backgroundColor: `${colors.dark.primary}10`,
  },
  exampleThumbnail: {
    width: 80,
    height: 100,
  },
  exampleContent: {
    flex: 1,
    padding: 12,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  exampleStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleInfo: {
    fontSize: 12,
    color: colors.dark.secondary,
    backgroundColor: 'rgba(77, 171, 247, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  selectedCheckCircle: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  csvInput: {
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
    padding: 12,
    fontSize: 14,
    color: colors.dark.text,
    marginBottom: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.dark.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.dark.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
    padding: 12,
    fontSize: 14,
    color: colors.dark.text,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
    gap: 12,
  },
  footerButton: {
    flex: 1,
  },
});

export default CSVImportModal;