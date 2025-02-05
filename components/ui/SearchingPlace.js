import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect} from 'react';
import CustomLoader from './CustomLoader';

const SearchingPlace = ({category}) => {
  console.log('searching place', category);
  return (
    <View style={styles.container}>
      <CustomLoader />

      <Text style={styles.categoryText}>{category}</Text>
      <Text style={styles.searchingText}>Searching the place for you...</Text>
      <View style={styles.waitContainer}>
        <Text style={styles.waitText}>Please wait...</Text>
      </View>
    </View>
  );
};

export default SearchingPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: '#FF4B55',
    borderRadius: 10,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 4,
    backgroundColor: '#FF4B55',
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  searchingText: {
    color: '#999999',
    fontSize: 16,
    marginBottom: 30,
  },
  waitContainer: {
    backgroundColor: 'rgba(255, 75, 85, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  waitText: {
    color: '#FF4B55',
    fontSize: 16,
    fontWeight: '500',
  },
});
