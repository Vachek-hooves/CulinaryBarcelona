import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PLACES} from '../../data/places';

const SearchingResults = ({route}) => {
  const {category} = route.params;
  const [randomPlace, setRandomPlace] = useState(null);
  // console.log(category,'category')

  console.log(randomPlace, 'randomPlace');

  useEffect(() => {
    // Filter places by category and get random one
    const placesInCategory = PLACES.filter(
      place => place.category === category.title,
    );
    const randomIndex = Math.floor(Math.random() * placesInCategory.length);
    setRandomPlace(placesInCategory[randomIndex]);
  }, []);

  if (!randomPlace) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1,paddingTop: 40}}>
        <Text style={styles.categoryTitle}>{category.title}</Text>

        <Image source={{uri: randomPlace.image}} style={styles.placeImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.placeName}>{randomPlace.name}</Text>
          <Text style={styles.placeDescription}>{randomPlace.description}</Text>

          <View style={styles.hoursContainer}>
            <Image
              source={require('../../assets/icons/clock.png')}
              style={styles.clockIcon}
            />
            <Text style={styles.hoursText}>Hours: {randomPlace.hours.mon}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.mapsButton}
              onPress={() => {
                /* Handle maps navigation */
              }}>
              <Text style={styles.mapsButtonText}>Open in maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                /* Handle bookmark */
              }}>
              <Image
                source={require('../../assets/icons/bookmark.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                /* Handle share */
              }}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            /* Handle new search */
          }}>
          <Text style={styles.searchButtonText}>Search new</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SearchingResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  placeName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  placeDescription: {
    color: '#999999',
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#FF4B55',
  },
  hoursText: {
    color: 'white',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapsButton: {
    backgroundColor: '#FF4B55',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 12,
  },
  mapsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#333333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  searchButton: {
    backgroundColor: '#FF4B55',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
