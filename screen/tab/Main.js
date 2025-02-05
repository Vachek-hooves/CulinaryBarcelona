import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const categories = [
  {
    id: 1,
    title: 'Tapas',
    icon: require('../../assets/icons/tapas.png'),
  },
  {
    id: 2,
    title: 'Desserts',
    icon: require('../../assets/icons/desserts.png'),
  },
  {
    id: 3,
    title: 'Seafood',
    icon: require('../../assets/icons/seafood.png'),
  },
  {
    id: 4,
    title: 'Wine Bars',
    icon: require('../../assets/icons/wine.png'),
  },
];

const Main = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/image/onboarding/i5.png')}
          style={styles.backgroundImage}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)', '#000000']}
            style={styles.gradient}>
            <View style={styles.content}>
              <Image
                source={require('../../assets/image/logo/logo.png')}
                style={styles.logo}
              />
              {/* <Text style={styles.logo}>CULINARY BARCELONA</Text> */}

              <Text style={styles.sectionTitle}>Explore Categories</Text>
              <View style={styles.categoriesGrid}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.categoryCard}>
                    <Image source={category.icon} style={styles.categoryIcon} />
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.gameSection}>
                <Text style={styles.gameSectionTitle}>
                  Play 'Guess the Dish'
                </Text>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playButtonText}>Play</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logo: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    tintColor: '#FF4B55',
    marginBottom: 10,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  gameSection: {
    marginTop: 'auto',
    marginBottom: 100,
  },
  gameSectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#FF4B55',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
