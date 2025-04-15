import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { QuizQuestion } from '@/types/game';
import colors from '@/constants/colors';
import { CheckCircle, XCircle } from 'lucide-react-native';

interface QuizQuestionComponentProps {
  question: QuizQuestion;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

const QuizQuestionComponent: React.FC<QuizQuestionComponentProps> = ({ 
  question, 
  onAnswer 
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Debug: Log question data
  console.log("Rendering question:", question.id);
  console.log("Question text:", question.text);
  console.log("Number of options:", question.options.length);
  
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent changing answer after submission
    
    console.log("Option selected:", optionId);
    setSelectedOptionId(optionId);
    
    // Find if the selected option is correct
    const selectedOption = question.options.find(option => option.id === optionId);
    const isCorrect = selectedOption?.isCorrect || false;
    
    console.log("Is correct answer:", isCorrect);
    
    // Show feedback
    setShowFeedback(true);
    
    // Notify parent component
    onAnswer(question.id, isCorrect);
  };
  
  const getOptionStyle = (optionId: string) => {
    if (!showFeedback) {
      return optionId === selectedOptionId 
        ? styles.optionSelected 
        : styles.option;
    }
    
    const option = question.options.find(o => o.id === optionId);
    
    if (option?.isCorrect) {
      return styles.optionCorrect;
    }
    
    if (optionId === selectedOptionId && !option?.isCorrect) {
      return styles.optionIncorrect;
    }
    
    return styles.option;
  };
  
  const getOptionTextStyle = (optionId: string) => {
    if (!showFeedback) {
      return optionId === selectedOptionId 
        ? styles.optionTextSelected 
        : styles.optionText;
    }
    
    const option = question.options.find(o => o.id === optionId);
    
    if (option?.isCorrect) {
      return styles.optionTextCorrect;
    }
    
    if (optionId === selectedOptionId && !option?.isCorrect) {
      return styles.optionTextIncorrect;
    }
    
    return styles.optionText;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={getOptionStyle(option.id)}
            onPress={() => handleOptionSelect(option.id)}
            disabled={showFeedback}
          >
            <Text style={getOptionTextStyle(option.id)}>{option.text}</Text>
            
            {showFeedback && option.isCorrect && (
              <CheckCircle size={20} color={colors.dark.success} />
            )}
            
            {showFeedback && selectedOptionId === option.id && !option.isCorrect && (
              <XCircle size={20} color={colors.dark.error} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>
            {selectedOptionId && question.options.find(o => o.id === selectedOptionId)?.isCorrect
              ? 'Doğru cevap!'
              : `Doğru cevap: ${question.correctAnswer}`
            }
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: colors.dark.text,
    flex: 1,
  },
  optionTextSelected: {
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: 'bold',
    flex: 1,
  },
  optionTextCorrect: {
    fontSize: 16,
    color: colors.dark.success,
    fontWeight: 'bold',
    flex: 1,
  },
  optionTextIncorrect: {
    fontSize: 16,
    color: colors.dark.error,
    fontWeight: 'bold',
    flex: 1,
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: colors.dark.text,
    textAlign: 'center',
  },
});

export default QuizQuestionComponent;