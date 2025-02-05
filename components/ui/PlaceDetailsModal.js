import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PlaceDetailsModal = ({ isVisible, place, onClose, onOpenMaps, onToggleFavorite, onShare, isFavorite }) => {
  if (!place) return null;

  const getTodayHours = () => {
    const today = new Date();
    const daysMap = {
      0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'
    };
    const currentDay = daysMap[today.getDay()];
    return place.hours[currentDay];
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.categoryTitle}>{place.category}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Image source={{uri: place.image}} style={styles.placeImage} />

          <View style={styles.detailsContainer}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.description}>{place.description}</Text>

            <View style={styles.hoursContainer}>
              <Image 
                source={require('../../assets/icons/clock.png')}
                style={styles.clockIcon}
              />
              <Text style={styles.hoursText}>Hours: {getTodayHours()}</Text>
            </View>

            <View style={styles.actionButtons}>
              {/* <TouchableOpacity 
                style={styles.mapsButton}
                onPress={onOpenMaps}
              >
                <Text style={styles.mapsButtonText}>Open in maps</Text>
              </TouchableOpacity> */}

              <TouchableOpacity 
                style={[styles.iconButton, isFavorite && styles.iconButtonActive]}
                onPress={onToggleFavorite}
              >
                <Image 
                  source={require('../../assets/icons/bookmark.png')}
                  style={[styles.actionIcon, isFavorite && styles.actionIconActive]}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.iconButton}
                onPress={onShare}
              >
                <Image 
                  source={require('../../assets/icons/share.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  placeImage: {
    width: '100%',
    height: '50%',
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
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
  iconButtonActive: {
    backgroundColor: '#FF4B55',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  actionIconActive: {
    tintColor: 'white',
  },
});

export default PlaceDetailsModal;