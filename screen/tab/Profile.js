import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useBarcelonaContext} from '../../store/context';

const CHALLENGE_ICONS = {
  map: require('../../assets/icons/map.png'),
  utensils: require('../../assets/icons/utensils.png'),
  star: require('../../assets/icons/star.png'),
};

const Profile = () => {
  const {getChallengesProgress} = useBarcelonaContext();
  const challenges = getChallengesProgress();
  console.log(challenges);
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my progress in Barcelona Food Guide!\n\nExplorer: ${challenges.explorer.progress}%\nCuisine Knower: ${challenges.cuisineKnower.progress}%\nCuisine Expert: ${challenges.cuisineExpert.progress}%`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>My profile</Text>

        <Text style={styles.sectionTitle}>Your rewards:</Text>
        <View style={styles.rewardsContainer}>
          <View
            style={[
              styles.rewardIcon,
              challenges.explorer.progress === 100 && styles.rewardAchieved,
            ]}>
            <Image
              source={require('../../assets/icons/map.png')}
              style={styles.icon}
            />
          </View>
          <View
            style={[
              styles.rewardIcon,
              challenges.cuisineKnower.progress === 100 &&
                styles.rewardAchieved,
            ]}>
            <Image
              source={require('../../assets/icons/utensils.png')}
              style={styles.icon}
            />
          </View>
          <View
            style={[
              styles.rewardIcon,
              challenges.cuisineExpert.progress === 100 &&
                styles.rewardAchieved,
            ]}>
            <Image
              source={require('../../assets/icons/star.png')}
              style={styles.icon}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Challenges:</Text>
        <View style={styles.challengesContainer}>
          {Object.values(challenges).map((challenge, index) => (
            <View key={index} style={styles.challengeItem}>
              <View style={styles.challengeHeader}>
                <Image
                  source={CHALLENGE_ICONS[challenge.icon]}
                  style={styles.challengeIcon}
                />
                <View>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDescription}>
                    {challenge.description}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${challenge.progress}%`},
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{challenge.progress}%</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  rewardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  rewardAchieved: {
    backgroundColor: '#4CAF50',
    opacity: 1,
  },
  icon: {
    width: 60,
    height: 60,
    // tintColor: 'white',
  },
  challengesContainer: {
    gap: 20,
  },
  challengeItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeIcon: {
    width: 32,
    height: 32,
    // tintColor: '#FF4B55',
    marginRight: 12,
  },
  challengeTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  challengeDescription: {
    color: '#999999',
    fontSize: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4B55',
    borderRadius: 2,
  },
  progressText: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'right',
  },
  shareButton: {
    backgroundColor: '#FF4B55',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    marginTop:20
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
