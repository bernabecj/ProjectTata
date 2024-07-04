import { Appearance } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from './src/navigations/StackNavigator';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

// Appearance
Appearance.setColorScheme('light');

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Stack"
          component={StackNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;