import React from 'react';

import { createStackNavigator } from "@react-navigation/stack"
import { fixtimerbug } from './fixtimerbug';

const Stack = createStackNavigator()
//Screens
import Home from './screens/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

fixtimerbug()
export const MyStackNavigation = () =>
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FCCF5F",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal",
      },
    }}
  >

    <Stack.Screen
      name="Home"
      component={Home}
      options={{ title: "Notas" }}
    />


  </Stack.Navigator>



export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

