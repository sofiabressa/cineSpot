import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';  // Importando o Stack
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import ContentScreen from '../screens/ContentScreen';
import SeriesDetailsScreen from '../screens/SeriesDetailsScreen';
import WatchListScreen from '../screens/WatchListScreen';

// Importando o LayoutComum
import LayoutComum from '../components/LayoutComum';

// Importando o UserContext
import { UserContext } from '../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';  // Importando os ícones

const Stack = createStackNavigator();  // Definindo o Stack Navigator

// Componente para envolver telas com LayoutComum
const ScreenWithLayout = (Component) => (props) => (
  <LayoutComum>
    <Component {...props} />
  </LayoutComum>
);

const AppNavigator = () => {
  const { user, loading } = useContext(UserContext); // Use o UserContext para verificar o estado de autenticação

  if (loading) {
    return null; // Ou um componente de carregamento (ex: <ActivityIndicator />)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}  // A tela inicial depende do usuário
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho padrão do React Navigation
        }}
      >
        {/* Tela inicial */}
        <Stack.Screen 
          name="Home" 
          component={ScreenWithLayout(HomeScreen)} 
        />
        {/* Tela de detalhes do filme */}
        <Stack.Screen 
          name="MovieDetails" 
          component={ScreenWithLayout(MovieDetailsScreen)} 
        />
        {/* Tela de detalhes da série */}
        <Stack.Screen 
          name="SeriesDetails" 
          component={ScreenWithLayout(SeriesDetailsScreen)} 
        />
        {/* Tela de busca */}
        <Stack.Screen 
          name="Search" 
          component={ScreenWithLayout(SearchScreen)} 
        />
        {/* Tela de login */}
        <Stack.Screen 
          name="Login" 
          component={ScreenWithLayout(LoginScreen)} 
        />
        {/* Tela de conteúdo (filmes ou séries) */}
        <Stack.Screen 
          name="Content" 
          component={ScreenWithLayout(ContentScreen)} 
        />
        {/* Tela de filmes favoritados */}
        <Stack.Screen 
          name="WatchList" 
          component={ScreenWithLayout(WatchListScreen)} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
