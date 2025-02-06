import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {useBarcelonaContext} from '../../store/context';

const Game = ({navigation}) => {
  const {quizData} = useBarcelonaContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess The Dish</Text>

      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/question.png')}
            style={styles.questionIcon}
          />
        </View>

        <Text style={styles.gameName}>Guess The Dish</Text>

        <Text style={styles.description}>
          In this game you have to guess which local dish of Barcelona is shown
          in the photo.{'\n'}
          The time limit is 10 seconds.
        </Text>

        <Text style={styles.levelsTitle}>Levels:</Text>

        <View style={styles.levelsGrid}>
          {quizData.map((level, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('QuizGame', {levelIndex: index})
              }
              style={({pressed}) => [
                styles.levelButton,
                !level.isLocked && styles.unlockedLevel,
                pressed && !level.isLocked && styles.pressedLevel,
              ]}
              disabled={level.isLocked}>
              <Text style={styles.levelNumber}>{index + 1}</Text>
              <Text
                style={[
                  styles.levelText,
                  !level.isLocked && styles.unlockedLevelText,
                ]}>
                level
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF4B55',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  gameName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  levelsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 12,
  },
  levelButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    opacity: 0.5,
  },
  unlockedLevel: {
    backgroundColor: '#FF4B55',
    opacity: 1,
  },
  pressedLevel: {
    opacity: 0.8,
  },
  levelNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  levelText: {
    color: '#999999',
    fontSize: 14,
  },
  unlockedLevelText: {
    color: 'white',
  },
});

export default Game;
