import {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {quiz} from '../data/quiz';
import { PLACES } from '../data/places';

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [quizData, setQuizData] = useState(quiz);
  const [unlockedCategories, setUnlockedCategories] = useState([
    'Guess the Dish',
  ]); // First category unlocked by default
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadInitialData();
    loadUnlockedCategories();
  }, []);

  const loadInitialData = async () => {
    try {
      const [
        storedFavorites,
        storedQuizData,
        storedVisitedPlaces,
        storedCorrectGuesses
      ] = await Promise.all([
        AsyncStorage.getItem('favorites'),
        AsyncStorage.getItem('quizData'),
        AsyncStorage.getItem('visitedPlaces'),
        AsyncStorage.getItem('correctGuesses')
      ]);

      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      if (storedQuizData) setQuizData(JSON.parse(storedQuizData));
      if (storedVisitedPlaces) setVisitedPlaces(JSON.parse(storedVisitedPlaces));
      if (storedCorrectGuesses) setCorrectGuesses(JSON.parse(storedCorrectGuesses));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Load unlocked categories from AsyncStorage
  const loadUnlockedCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('unlockedCategories');
      if (storedCategories) {
        setUnlockedCategories(JSON.parse(storedCategories));
      } else {
        // Initialize with default unlocked category
        await AsyncStorage.setItem(
          'unlockedCategories',
          JSON.stringify(['Guess the Dish']),
        );
      }
    } catch (error) {
      console.error('Error loading unlocked categories:', error);
    }
  };

  // Save favorites to AsyncStorage
  const saveFavorites = async newFavorites => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Save quiz data to AsyncStorage
  const saveQuizData = async newQuizData => {
    try {
      await AsyncStorage.setItem('quizData', JSON.stringify(newQuizData));
      setQuizData(newQuizData);
    } catch (error) {
      console.error('Error saving quiz data:', error);
    }
  };

  // Save unlocked categories to AsyncStorage
  const saveUnlockedCategories = async newCategories => {
    try {
      await AsyncStorage.setItem(
        'unlockedCategories',
        JSON.stringify(newCategories),
      );
      setUnlockedCategories(newCategories);
    } catch (error) {
      console.error('Error saving unlocked categories:', error);
    }
  };

  // Toggle favorite
  const toggleFavorite = place => {
    const isFavorite = favorites.some(fav => fav.id === place.id);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== place.id);
    } else {
      newFavorites = [...favorites, place];
    }

    saveFavorites(newFavorites);
  };

  // Check if place is favorite
  const isFavorite = placeId => {
    return favorites.some(fav => fav.id === placeId);
  };

  // Unlock a new category
  const unlockCategory = categoryName => {
    if (!unlockedCategories.includes(categoryName)) {
      const newCategories = [...unlockedCategories, categoryName];
      saveUnlockedCategories(newCategories);
    }
  };

  // Check if category is unlocked
  const isCategoryUnlocked = categoryName => {
    return unlockedCategories.includes(categoryName);
  };

  // New function to unlock next level
  const unlockNextLevel = async (currentLevelIndex) => {
    try {
      if (currentLevelIndex < quizData.length - 1) {
        const updatedQuizData = [...quizData];
        updatedQuizData[currentLevelIndex + 1].isLocked = false;
        
        // Save to AsyncStorage and update state
        await AsyncStorage.setItem('quizData', JSON.stringify(updatedQuizData));
        setQuizData(updatedQuizData);
      }
    } catch (error) {
      console.error('Error unlocking next level:', error);
    }
  };

  // Add place to visited
  const addVisitedPlace = async (placeId) => {
    try {
      const newVisitedPlaces = [...new Set([...visitedPlaces, placeId])];
      await AsyncStorage.setItem('visitedPlaces', JSON.stringify(newVisitedPlaces));
      setVisitedPlaces(newVisitedPlaces);
    } catch (error) {
      console.error('Error adding visited place:', error);
    }
  };

  // Add correct guess
  const addCorrectGuess = async () => {
    try {
      const newCount = correctGuesses + 1;
      await AsyncStorage.setItem('correctGuesses', JSON.stringify(newCount));
      setCorrectGuesses(newCount);
    } catch (error) {
      console.error('Error updating correct guesses:', error);
    }
  };

  // Calculate challenges progress
  const getChallengesProgress = () => {
    return {
      explorer: {
        title: 'Explorer',
        description: 'Discover 10 spots',
        progress: Math.min((visitedPlaces.length / 10) * 100, 100),
        icon: 'map'
      },
      cuisineKnower: {
        title: 'Cuisine Knower',
        description: 'Guess 1 dish',
        progress: Math.min((correctGuesses / 1) * 100, 100),
        icon: 'utensils'
      },
      cuisineExpert: {
        title: 'Cuisine Expert',
        description: 'Guess 5 dishes',
        progress: Math.min((correctGuesses / 5) * 100, 100),
        icon: 'star'
      }
    };
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    quizData,
    saveQuizData,
    unlockedCategories,
    unlockCategory,
    isCategoryUnlocked,
    unlockNextLevel,
    visitedPlaces,
    addVisitedPlace,
    correctGuesses,
    addCorrectGuess,
    getChallengesProgress
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useBarcelonaContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      'useBarcelonaContext must be used within a ContextProvider',
    );
  }
  return context;
};
