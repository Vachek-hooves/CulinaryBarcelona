import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  ImageBackground,
} from 'react-native';
import {useBarcelonaContext} from '../../store/context';
import MapModal from '../../components/ui/MapModal';
import {useState} from 'react';

const Favorites = () => {
  const {favorites, toggleFavorite} = useBarcelonaContext();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const getTodayHours = place => {
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
    return place.hours[currentDay];
  };

  const handleShare = async place => {
    try {
      await Share.share({
        message: `Check out ${place.name}!\n\n${
          place.description
        }\n\nAddress: ${place.address}\nHours today: ${getTodayHours(place)}`,
        title: place.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No saved spots yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/bg/bg.png')}
        style={{flex:1}}>
        <Text style={styles.title}>Saved Spots</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {favorites.map(place => (
            <View key={place.id} style={styles.card}>
              <Image source={{uri: place.image}} style={styles.placeImage} />
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{place.category}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.description}>{place.description}</Text>

                <View style={styles.hoursContainer}>
                  <Image
                    source={require('../../assets/icons/clock.png')}
                    style={styles.clockIcon}
                  />
                  <Text style={styles.hoursText}>
                    Hours: {getTodayHours(place)}
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.mapsButton}
                    onPress={() => setSelectedPlace(place)}>
                    <Text style={styles.mapsButtonText}>Open in maps</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => toggleFavorite(place)}>
                    <Image
                      source={require('../../assets/icons/bookmark.png')}
                      style={[styles.actionIcon, styles.actionIconActive]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleShare(place)}>
                    <Image
                      source={require('../../assets/icons/share.png')}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {selectedPlace && (
          <MapModal
            isVisible={true}
            onClose={() => setSelectedPlace(null)}
            coordinates={selectedPlace.coordinates}
            placeName={selectedPlace.name}
          />
        )}
        <View style={{height: 90}} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 16,
  },
  placeName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
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
  actionIconActive: {
    tintColor: '#FF4B55',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999999',
    fontSize: 18,
  },
});

export default Favorites;
