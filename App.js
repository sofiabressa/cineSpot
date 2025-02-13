import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import { LoginScreen, RegisterScreen } from './src/screens/LoginScreen'; // Importe as telas de login e registro

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho padrão do React Navigation
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} // Use o componente diretamente
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetailsScreen} // Use o componente diretamente
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} // Use o componente diretamente
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} // Use o componente diretamente
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} // Use o componente diretamente
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}