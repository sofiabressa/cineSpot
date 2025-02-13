import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header'; // Importe o Header
import { useNavigation } from '@react-navigation/native'; // Adicione o useNavigation

const LayoutComum = ({ children }) => {
  const navigation = useNavigation(); // Hook para navegação

  const handleMenuPress = () => {
    // Lógica para abrir o menu (se necessário)
    console.log('Menu pressionado');
  };

  const handleSearchPress = () => {
    // Lógica para abrir a pesquisa
    console.log('Pesquisa pressionada');
  };

  const handleLoginPress = () => {
    // Navegar para a tela de login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Usando o Header com a função de login */}
      <Header
        onMenuPress={handleMenuPress}
        onSearchPress={handleSearchPress}
        onLoginPress={handleLoginPress}
      />
      <View style={styles.content}>
        {children}  {/* O conteúdo da tela será renderizado aqui */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo do seu app
  },
  content: {
    flex: 1, // O conteúdo da tela ocupará o restante do espaço
  },
});

export default LayoutComum;