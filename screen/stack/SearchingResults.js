import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PLACES} from '../../data/places';
import SearchingPlace from '../../components/ui/SearchingPlace';
import {useBarcelonaContext} from '../../store/context';
import MapModal from '../../components/ui/MapModal';

const SearchingResults = ({route, navigation}) => {
  const {favorites, toggleFavorite, isFavorite} = useBarcelonaContext();
  const {category} = route.params;
  const [randomPlace, setRandomPlace] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const getRandomPlace = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const placesInCategory = PLACES.filter(
        place => place.category === category.title,
      );
      const randomIndex = Math.floor(Math.random() * placesInCategory.length);
      setRandomPlace(placesInCategory[randomIndex]);
      setIsSearching(false);
    }, 1500);
  };

  useEffect(() => {
    getRandomPlace();
  }, [category]);

  // Early return if still searching or no place loaded
  if (isSearching) {
    return <SearchingPlace category={category.title} />;
  }

  if (!randomPlace) {
    return null;
  }

  const getTodayHours = () => {
    const today = new Date();

    const daysMap = {
      0: 'sun',
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
    };

    const currentDay = daysMap[today.getDay()];

    return randomPlace.hours[currentDay];
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${randomPlace.name}!\n\n${
          randomPlace.description
        }\n\nAddress: ${randomPlace.address}\nHours today: ${getTodayHours()}`,
        title: randomPlace.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBookmark = () => {
    toggleFavorite(randomPlace);
  };

  const handleOpenMap = () => {
    if (randomPlace?.coordinates) {
      setIsMapVisible(true);
    }
  };

  const handleCloseMap = () => {
    setIsMapVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingTop: 40}}>
        <View style={styles.headerContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('TabMenu', {screen: 'Main'})}
            >
            <Image
              source={require('../../assets/icons/home.png')}
              style={styles.homeIcon}
            />
          </TouchableOpacity>
        </View>

        <Image source={{uri: randomPlace.image}} style={styles.placeImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.placeName}>{randomPlace.name}</Text>
          <Text style={styles.placeDescription}>{randomPlace.description}</Text>

          <View style={styles.hoursContainer}>
            <Image
              source={require('../../assets/icons/clock.png')}
              style={styles.clockIcon}
            />
            <Text style={styles.hoursText}>Hours: {getTodayHours()}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.mapsButton} onPress={handleOpenMap}>
              <Text style={styles.mapsButtonText}>Open in maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.iconButton,
                isFavorite(randomPlace.id) && styles.iconButtonActive,
              ]}
              onPress={handleBookmark}>
              <Image
                source={require('../../assets/icons/bookmark.png')}
                style={[
                  styles.actionIcon,
                  isFavorite(randomPlace.id) && styles.actionIconActive,
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={getRandomPlace}>
          <Text style={styles.searchButtonText}>Search new</Text>
        </TouchableOpacity>
      </ScrollView>

      {randomPlace && (
        <MapModal
          isVisible={isMapVisible}
          onClose={handleCloseMap}
          coordinates={randomPlace.coordinates}
          placeName={randomPlace.name}
        />
      )}
    </View>
  );
};

export default SearchingResults;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    // position: 'absolute',
    // top: 20,
    // left: 20,
    backgroundColor: '#DF393E',
    padding: 10,
    borderRadius: 12,
    width: 55,
    margin: 20,
  },
  homeIcon: {
    width: 34,
    height: 34,
  },
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
  iconButtonActive: {
    backgroundColor: '#FF4B55',
  },
  actionIconActive: {
    tintColor: 'white',
  },
});
