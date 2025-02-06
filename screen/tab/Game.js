import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Game = ({ navigation }) => {
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
          In this game you have to guess which local dish of Barcelona is shown in the photo.{'\n'}
          The time limit is 10 seconds.
        </Text>

        <Text style={styles.levelsTitle}>Levels:</Text>

        <View style={styles.levelsGrid}>
          <TouchableOpacity style={[styles.levelButton, styles.activeLevel]}>
            <Text style={[styles.levelNumber]}>1</Text>
            <Text style={[styles.levelText]}>level</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelNumber}>2</Text>
            <Text style={styles.levelText}>level</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelNumber}>3</Text>
            <Text style={styles.levelText}>level</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelNumber}>4</Text>
            <Text style={styles.levelText}>level</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelNumber}>5</Text>
            <Text style={styles.levelText}>level</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

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
  },
  activeLevel: {
    backgroundColor: '#FF4B55',
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
  }
})

export default Game