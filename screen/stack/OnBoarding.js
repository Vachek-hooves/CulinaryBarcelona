import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions,ScrollView } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')

const onboardingData = [
  {
    title: 'Welcome to Culinary Barcelona!',
    description:" Discover the best culinary spots in Barcelona – from tapas to desserts, seafood and wine bars. Let's make your food journey unforgettable!",
    image: require('../../assets/image/onboarding/i1.png'),
    buttonText: 'Get Started'
  },
  {
    title: 'Explore Culinary Categories',
    description: '',
    image: require('../../assets/image/onboarding/i2.png'),
    categories: ['Tapas', 'Desserts', 'Seafood', 'Wine Bars'],
    buttonText: 'Next'
  },
  {
    title: 'Navigate with Ease',
    description: 'Find your next culinary destination with our interactive map! Filter by category, explore interesting spots, and get directions in a tap!',
    image: require('../../assets/image/onboarding/i3.png'),
    buttonText: 'Next'
  },
  {
    title: 'Save Your Favorites',
    description: 'Loved a place? Save it for later! Share your top picks with friends and inspire them to join your food adventure.',
    image: require('../../assets/image/onboarding/i4.png'),
    buttonText: 'Next'
  },
  {
    title: 'Play & Learn',
    description: 'Test your culinary knowledge with our fun mini-game! Guess local dishes and discover interesting facts about them.',
    image: require('../../assets/image/onboarding/i5.png'),
    buttonText: "Let's Explore!"
  }
]

const OnBoarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }else{
      navigation.navigate('TabMenu',{screen:'Main'})
    }
  }

  const renderCategories = () => {
    if (onboardingData[currentIndex].categories) {
      return (
        <View style={styles.categoriesContainer}>
          {onboardingData[currentIndex].categories.map((category, index) => (
            <View key={index} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      )
    }
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={onboardingData[currentIndex].image}
          style={styles.backgroundImage}
          />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)', '#000000']}
          style={styles.gradient}
          locations={[0, 0.7, 0.8, 0.9]}
          />
      </View>

          <ScrollView>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
        {onboardingData[currentIndex].description ? (
          <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>
        ) : renderCategories()}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{onboardingData[currentIndex].buttonText}</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageContainer: {
    height: '60%', // Image takes up roughly half the screen
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#FF4B55',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto', // Pushes button to bottom
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
  },
  categoryText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
})