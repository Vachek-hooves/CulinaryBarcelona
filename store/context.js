import {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {quiz} from '../data/quiz';

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [quizData, setQuizData] = useState(quiz);
  const [unlockedCategories, setUnlockedCategories] = useState([
    'Guess the Dish',
  ]); // First category unlocked by default
  console.log(quizData);
  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadFavorites();
    loadQuizData();
    loadUnlockedCategories();
  }, []);

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Load quiz data from AsyncStorage
  const loadQuizData = async () => {
    try {
      const storedQuizData = await AsyncStorage.getItem('quizData');
      if (storedQuizData) {
        setQuizData(JSON.parse(storedQuizData));
      } else {
        // Initialize quiz data if not exists
        await AsyncStorage.setItem('quizData', JSON.stringify(quiz));
      }
    } catch (error) {
      console.error('Error loading quiz data:', error);
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

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    quizData,
    saveQuizData,
    unlockedCategories,
    unlockCategory,
    isCategoryUnlocked,
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
