import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Intro, OnBoarding} from './screen/stack';
import TabMenu from './screen/menu/TabMenu';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="TabMenu" component={TabMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
