import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import colors from '@/constants/colors';
import { VocabularyWord } from '@/types/vocabulary';

interface Question {
  id: string;
  word: VocabularyWord;
  options?: string[];
  correctAnswer: string;
  type: 'translate' | 'multiple-choice';
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (wordId: string, isCorrect: boolean) => void;
  questionType: 'translate' | 'multiple-choice';
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer,
  questionType
}) => {
  const [answer, setAnswer] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Reset state when question changes
  useEffect(() => {
    setAnswer('');
    setSelectedIndex(null);
    setAnswered(false);
    setIsCorrect(false);
  }, [question]);
  
  const handleCheckAnswer = () => {
    if (answered) return;
    
    let correct = false;
    
    if (questionType === 'translate') {
      // For translation questions, check if the answer is correct
      // Normalize both strings for comparison (lowercase, trim)
      const normalizedAnswer = answer.toLowerCase().trim();
      const normalizedCorrect = question.correctAnswer.toLowerCase().trim();
      
      correct = normalizedAnswer === normalizedCorrect;
    } else if (questionType === 'multiple-choice' && selectedIndex !== null && question.options) {
      // For multiple choice, check if the selected option is correct
      const selectedOption = question.options[selectedIndex];
      correct = selectedOption === question.correctAnswer;
    }
    
    setIsCorrect(correct);
    setAnswered(true);
    onAnswer(question.id, correct);
    Keyboard.dismiss();
  };
  
  const handleSelectOption = (index: number) => {
    if (answered) return;
    
    setSelectedIndex(index);
  };
  
  const renderTranslateQuestion = () => {
    return (
      <View style={styles.translateContainer}>
        <Text style={styles.questionText}>Bu kelimenin anlamı nedir?</Text>
        <Text style={styles.wordText}>{question.word.sourceText}</Text>
        
        <TextInput
          style={[
            styles.answerInput,
            answered && (isCorrect ? styles.correctInput : styles.incorrectInput)
          ]}
          placeholder="Çevirinizi yazın..."
          placeholderTextColor={colors.dark.textSecondary}
          value={answer}
          onChangeText={setAnswer}
          editable={!answered}
          autoCapitalize="none"
          onSubmitEditing={handleCheckAnswer}
        />
        
        {answered && (
          <View style={styles.feedbackContainer}>
            {isCorrect ? (
              <View style={styles.correctFeedback}>
                <CheckCircle size={20} color={colors.dark.success} />
                <Text style={styles.correctText}>Doğru!</Text>
              </View>
            ) : (
              <View style={styles.incorrectFeedback}>
                <XCircle size={20} color={colors.dark.error} />
                <Text style={styles.incorrectText}>
                  Yanlış! Doğru cevap: <Text style={styles.correctAnswer}>{question.correctAnswer}</Text>
                </Text>
              </View>
            )}
          </View>
        )}
        
        {!answered && (
          <TouchableOpacity 
            style={styles.checkButton}
            onPress={handleCheckAnswer}
            disabled={!answer.trim()}
          >
            <Text style={styles.checkButtonText}>Kontrol Et</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const renderMultipleChoiceQuestion = () => {
    if (!question.options) return null;
    
    return (
      <View style={styles.multipleChoiceContainer}>
        <Text style={styles.questionText}>Bu kelimenin anlamını seçin:</Text>
        <Text style={styles.wordText}>{question.word.sourceText}</Text>
        
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedIndex === index && styles.selectedOption,
                answered && option === question.correctAnswer && styles.correctOption,
                answered && selectedIndex === index && option !== question.correctAnswer && styles.incorrectOption
              ]}
              onPress={() => handleSelectOption(index)}
              disabled={answered}
            >
              <Text 
                style={[
                  styles.optionText,
                  selectedIndex === index && styles.selectedOptionText,
                  answered && option === question.correctAnswer && styles.correctOptionText,
                  answered && selectedIndex === index && option !== question.correctAnswer && styles.incorrectOptionText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {answered && (
          <View style={styles.feedbackContainer}>
            {isCorrect ? (
              <View style={styles.correctFeedback}>
                <CheckCircle size={20} color={colors.dark.success} />
                <Text style={styles.correctText}>Doğru!</Text>
              </View>
            ) : (
              <View style={styles.incorrectFeedback}>
                <XCircle size={20} color={colors.dark.error} />
                <Text style={styles.incorrectText}>
                  Yanlış! Doğru cevap: <Text style={styles.correctAnswer}>{question.correctAnswer}</Text>
                </Text>
              </View>
            )}
          </View>
        )}
        
        {!answered && (
          <TouchableOpacity 
            style={styles.checkButton}
            onPress={handleCheckAnswer}
            disabled={selectedIndex === null}
          >
            <Text style={styles.checkButtonText}>Kontrol Et</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {questionType === 'translate' ? renderTranslateQuestion() : renderMultipleChoiceQuestion()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  translateContainer: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 20,
  },
  multipleChoiceContainer: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    padding: 20,
  },
  questionText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 12,
  },
  wordText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  answerInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.dark.text,
    marginBottom: 16,
  },
  correctInput: {
    borderWidth: 1,
    borderColor: colors.dark.success,
  },
  incorrectInput: {
    borderWidth: 1,
    borderColor: colors.dark.error,
  },
  feedbackContainer: {
    marginBottom: 16,
  },
  correctFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  incorrectFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  correctText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.dark.success,
  },
  incorrectText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.dark.error,
    flex: 1,
  },
  correctAnswer: {
    fontWeight: 'bold',
  },
  checkButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: 'rgba(77, 171, 247, 0.2)',
    borderWidth: 1,
    borderColor: colors.dark.primary,
  },
  correctOption: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    borderWidth: 1,
    borderColor: colors.dark.success,
  },
  incorrectOption: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    borderWidth: 1,
    borderColor: colors.dark.error,
  },
  optionText: {
    fontSize: 16,
    color: colors.dark.text,
  },
  selectedOptionText: {
    color: colors.dark.primary,
    fontWeight: 'bold',
  },
  correctOptionText: {
    color: colors.dark.success,
    fontWeight: 'bold',
  },
  incorrectOptionText: {
    color: colors.dark.error,
    fontWeight: 'bold',
  },
});

export default QuizQuestion;