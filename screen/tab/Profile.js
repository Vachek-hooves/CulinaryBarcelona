import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useBarcelonaContext} from '../../store/context';

const CHALLENGE_ICONS = {
  map: require('../../assets/icons/map.png'),
  utensils: require('../../assets/icons/utensils.png'),
  star: require('../../assets/icons/star.png'),
};

const REWARD_COLORS = {
  explorer: '#7173FF', // Purple/Blue for map
  cuisineKnower: '#39DF6B', // Green for utensils
  cuisineExpert: '#FFAF2E', // Orange/Yellow for star
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

  const getRewardStyle = challengeKey => {
    const challenge = challenges[challengeKey];
    return {
      backgroundColor: challenge.progress === 100 ? 'transparent' : '#1A1A1A',
      borderWidth: 4,
      borderColor:
        challenge.progress === 100
          ? REWARD_COLORS[challengeKey]
          : 'transparent',
      opacity: challenge.progress === 100 ? 1 : 0.5,
    };
  };

  const getIconTintColor = challengeKey => {
    const challenge = challenges[challengeKey];
    return challenge.progress === 100 ? REWARD_COLORS[challengeKey] : '#999999';
  };

  const getChallengeIconStyle = progress => ({
    tintColor: progress === 100 ? '#DF393E' : '#999999',
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/bg/bg.png')}
        style={{flex: 1,paddingHorizontal:15}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>My profile</Text>

          <Text style={styles.sectionTitle}>Your rewards:</Text>
          <View style={styles.rewardsContainer}>
            <View style={[styles.rewardIcon, getRewardStyle('explorer')]}>
              <Image
                source={CHALLENGE_ICONS.map}
                style={[styles.icon, {tintColor: getIconTintColor('explorer')}]}
              />
            </View>
            <View style={[styles.rewardIcon, getRewardStyle('cuisineKnower')]}>
              <Image
                source={CHALLENGE_ICONS.utensils}
                style={[
                  styles.icon,
                  {tintColor: getIconTintColor('cuisineKnower')},
                ]}
              />
            </View>
            <View style={[styles.rewardIcon, getRewardStyle('cuisineExpert')]}>
              <Image
                source={CHALLENGE_ICONS.star}
                style={[
                  styles.icon,
                  {tintColor: getIconTintColor('cuisineExpert')},
                ]}
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
                    style={[
                      styles.challengeIcon,
                      getChallengeIconStyle(challenge.progress),
                    ]}
                  />
                  <View>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeDescription}>
                      {challenge.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {width: `${challenge.progress}%`},
                        challenge.progress === 100 && styles.progressComplete,
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{challenge.progress}%</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{height: 70}} />
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
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  challengesContainer: {
    gap: 20,
  },
  challengeItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  challengeTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  challengeDescription: {
    color: '#999999',
    fontSize: 14,
  },
  progressContainer: {
    width: 94,
    height: 34,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DF393E',
    position: 'absolute',
    left: 0,
  },
  progressComplete: {
    backgroundColor: '#DF393E',
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
  shareButton: {
    backgroundColor: '#FF4B55',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    marginTop: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
