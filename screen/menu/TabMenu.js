import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main} from '../tab';
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen name="Main" component={Main} />
    </Tab.Navigator>
  );
};

export default TabMenu;

const styles = StyleSheet.create({});
