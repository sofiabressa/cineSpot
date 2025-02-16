import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';

// Importando o LayoutComum
import LayoutComum from '../components/LayoutComum';

// Importando o UserContext
import { UserContext } from '../contexts/UserContext';

const Stack = createStackNavigator();

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
        initialRouteName={user ? "Home" : "Login"} // Define a tela inicial com base no estado de autenticação
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho padrão do React Navigation
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={ScreenWithLayout(HomeScreen)} // Envolve HomeScreen com LayoutComum
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={ScreenWithLayout(MovieDetailsScreen)} // Envolve MovieDetailsScreen com LayoutComum
        />
        <Stack.Screen 
          name="Search" 
          component={ScreenWithLayout(SearchScreen)} // Envolve SearchScreen com LayoutComum
        />
        <Stack.Screen 
          name="Login" 
          component={ScreenWithLayout(LoginScreen)} // Envolve LoginScreen com LayoutComum
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;