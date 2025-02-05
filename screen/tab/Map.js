import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import { PLACES } from '../../data/places';

const Map = () => {
  const initialRegion = {
    latitude: 41.390205,  // Barcelona center
    longitude: 2.154007,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

 

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={initialRegion}
 
      >
        {PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            title={place.name}
            description={place.description}
          >
            <Image 
              source={require('../../assets/icons/marker.png')}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>
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
  }
});