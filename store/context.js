import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from AsyncStorage on app start
    useEffect(() => {
        loadFavorites();
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

    // Save favorites to AsyncStorage
    const saveFavorites = async (newFavorites) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    // Toggle favorite
    const toggleFavorite = (place) => {
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
    const isFavorite = (placeId) => {
        return favorites.some(fav => fav.id === placeId);
    };

    const value = {
        favorites,
        toggleFavorite,
        isFavorite
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useBarcelonaContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useBarcelonaContext must be used within a ContextProvider');
    }
    return context;
}