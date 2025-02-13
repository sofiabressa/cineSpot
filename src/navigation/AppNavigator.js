import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import { LoginScreen, RegisterScreen } from '../screens/LoginScreen'; // Importe as telas de login e registro

// Importando o LayoutComum
import LayoutComum from '../components/LayoutComum';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
          component={() => (
            <LayoutComum>
              <HomeScreen />
            </LayoutComum>
          )}
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={() => (
            <LayoutComum>
              <MovieDetailsScreen />
            </LayoutComum>
          )}
        />
        <Stack.Screen 
          name="Search" 
          component={() => (
            <LayoutComum>
              <SearchScreen />
            </LayoutComum>
          )}
        />
        <Stack.Screen 
          name="Login" 
          component={() => (
            <LayoutComum>
              <LoginScreen />
            </LayoutComum>
          )}
        />
        <Stack.Screen 
          name="Register" 
          component={() => (
            <LayoutComum>
              <RegisterScreen />
            </LayoutComum>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;