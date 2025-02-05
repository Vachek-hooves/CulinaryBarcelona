import {StyleSheet, View, Image, Share} from 'react-native';
import React, {useState} from 'react';
import MapView, {PROVIDER_DEFAULT, Marker} from 'react-native-maps';
import {PLACES} from '../../data/places';
import PlaceDetailsModal from '../../components/ui/PlaceDetailsModal';
import {useBarcelonaContext} from '../../store/context';

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const {toggleFavorite, isFavorite} = useBarcelonaContext();

  const handleShare = async () => {
    if (!selectedPlace) return;
    
    try {
      await Share.share({
        message: `Check out ${selectedPlace.name}!\n\n${selectedPlace.description}\n\nAddress: ${selectedPlace.address}`,
        title: selectedPlace.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 41.390205,
          longitude: 2.154007,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            onPress={() => setSelectedPlace(place)}
          >
            <Image
              source={require('../../assets/icons/marker.png')}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>

      <PlaceDetailsModal
        isVisible={!!selectedPlace}
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onOpenMaps={() => {/* Handle maps navigation */}}
        onToggleFavorite={() => toggleFavorite(selectedPlace)}
        onShare={handleShare}
        isFavorite={selectedPlace ? isFavorite(selectedPlace.id) : false}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
