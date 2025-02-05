import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main,  Profile, Map, Favotites, Game} from '../tab';

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
        component={Favotites}
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
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
