import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {useBarcelonaContext} from '../../store/context';
import GameOverModal from '../../components/ui/GameOverModal';

const QuizGame = ({route, navigation}) => {
  const {quizData, unlockNextLevel, addCorrectGuess} = useBarcelonaContext();
  const {levelIndex} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);

  const currentLevel = quizData[levelIndex];
  const currentQuestion = currentLevel.questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleGameOver = () => {
    setIsGameOverModalVisible(true);
  };

  const handleModalClose = () => {
    setIsGameOverModalVisible(false);
    navigation.navigate('TabMenu', {screen: 'Game'});
  };

  const formatTime = time => {
    return `00:${time < 10 ? '0' : ''}${time}`;
  };

  const handleAnswerPress = async answer => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      await addCorrectGuess();
    }

    // Wait for visual feedback before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < currentLevel.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(10);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        // Level completed
        const allQuestionsAnswered =
          score + (isCorrect ? 1 : 0) === currentLevel.questions.length;

        if (allQuestionsAnswered) {
          unlockNextLevel(levelIndex);
        }

        Alert.alert(
          allQuestionsAnswered ? 'Congratulations!' : 'Level Complete',
          `Your final score: ${score + (isCorrect ? 1 : 0)}${
            allQuestionsAnswered ? '\nNext level unlocked!' : ''
          }`,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('TabMenu', {screen: 'Game'}),
            },
          ],
        );
      }
    }, 1000);
  };

  const getOptionStyle = option => {
    if (selectedAnswer === option) {
      return {
        backgroundColor: isAnswerCorrect ? '#4CAF50' : '#FF4B55',
      };
    }
    return {};
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Level {levelIndex + 1}</Text>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        {/* Score */}
        <Text style={styles.score}>Score: {score}</Text>

        {/* Question Image */}
        <Image
          source={currentQuestion.image}
          style={styles.questionImage}
          resizeMode="cover"
        />

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, getOptionStyle(option)]}
              onPress={() => handleAnswerPress(option)}
              disabled={selectedAnswer !== null}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Game Over Modal */}
        <GameOverModal
          isVisible={isGameOverModalVisible}
          score={score}
          onClose={handleModalClose}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  timerContainer: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  timerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.8,
    borderRadius: 12,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizGame;
