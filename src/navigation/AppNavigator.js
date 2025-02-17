import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';  // Importando o Drawer
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import ContentScreen from '../screens/ContentScreen';  // Importando ContentScreen

// Importando o LayoutComum
import LayoutComum from '../components/LayoutComum';

// Importando o UserContext
import { UserContext } from '../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';  // Importando os ícones

const Drawer = createDrawerNavigator();  // Definindo o Drawer Navigator

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
      <Drawer.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho padrão do React Navigation
          drawerIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />  // Ícone do menu hambúrguer
          ),
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={ScreenWithLayout(HomeScreen)} 
        />
        <Drawer.Screen 
          name="MovieDetails" 
          component={ScreenWithLayout(MovieDetailsScreen)} 
        />
        <Drawer.Screen 
          name="Search" 
          component={ScreenWithLayout(SearchScreen)} 
        />
        <Drawer.Screen 
          name="Login" 
          component={ScreenWithLayout(LoginScreen)} 
        />
        <Drawer.Screen 
          name="Content" 
          component={ScreenWithLayout(ContentScreen)} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
