import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

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

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
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
      <Image
        source={onboardingData[currentIndex].image}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.logo}>CULINARY BARCELONA</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
          {onboardingData[currentIndex].description ? (
            <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>
          ) : renderCategories()}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{onboardingData[currentIndex].buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    justifyContent: 'space-between',
    paddingTop: 100,
  },
  logo: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    marginBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#FF4B55',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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