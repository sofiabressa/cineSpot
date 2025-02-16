import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import LoginScreen from './src/screens/LoginScreen'; // Importação correta do LoginScreen
import { UserProvider } from './src/contexts/UserContext'; // Substitua o AuthProvider pelo UserProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>  {/* Envolvendo a navegação com o UserProvider */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home" // Defina a tela inicial como "Home" ou "Login", conforme necessário
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
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}