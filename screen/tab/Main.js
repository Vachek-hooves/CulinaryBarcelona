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
import CustomLoader from '../../components/ui/CustomLoader';
import SearchingPlace from '../../components/ui/SearchingPlace';
import { useState } from 'react';
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

const Main = ({navigation}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory)

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigation.navigate('SearchingResults', {
        category: selectedCategory,
      });
    }, 3000)
  };

  if (isSearching) {
    return <SearchingPlace />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/onboarding/i5.png')}
        style={styles.backgroundImage}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', '#000000']}
          style={styles.gradient}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                    style={[
                      styles.categoryCard,
                      selectedCategory?.id === category.id &&
                        styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory(category)}>
                    <Image source={category.icon} style={styles.categoryIcon} />
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.gameSection}>
                <Text style={styles.gameSectionTitle}>
                  Play 'Guess the Dish'
                </Text>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handleSearch}>
                  <Text style={styles.playButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  selectedCategory: {
    borderColor: '#FF4B55',
    borderWidth: 2,
  },
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
