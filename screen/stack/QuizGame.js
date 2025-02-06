import {StyleSheet, Text, View} from 'react-native';
import {useBarcelonaContext} from '../../store/context';

const QuizGame = ({route}) => {
  const {quizData, isCategoryUnlocked} = useBarcelonaContext();

  const {levelIndex} = route.params;

  const level = quizData[levelIndex];

  console.log(levelIndex);
  return (
    <View>
      <Text>QuizGame</Text>
    </View>
  );
};

export default QuizGame;

const styles = StyleSheet.create({});
