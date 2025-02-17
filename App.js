import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ContentScreen from './src/screens/ContentScreen'; // Importando a tela que vai exibir filmes e séries
import SeriesDetailsScreen from './src/screens/SeriesDetailsScreen';
import WatchListScreen from './src/screens/WatchListScreen';
import { UserProvider } from './src/contexts/UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Oculta o cabeçalho padrão do React Navigation
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Content" component={ContentScreen} />
          <Stack.Screen name="SeriesDetails" component={SeriesDetailsScreen} />
          <Stack.Screen name="WatchList" component={WatchListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
