import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main, Profile, Map, Favotites, Game, Favorites} from '../tab';

const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF4B55',
        tabBarInactiveTintColor: '#666666',
      }}>
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/tabIcons/game.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF4B55' : '#666666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/tabIcons/map.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF4B55' : '#666666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/tabIcons/main.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF4B55' : '#666666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/tabIcons/favorites.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF4B55' : '#666666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/tabIcons/profile.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF4B55' : '#666666'},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabMenu;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 5,
    paddingTop: 5,
    position: 'absolute',
    // left: 50,
    // right: 30,
    bottom: 30,
    // borderRadius: 30,
    elevation: 10, // for Android shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    paddingTop: 10,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: '#DF393E',
    borderTopWidth: 2,
  },
  tabIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
});
