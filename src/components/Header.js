import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ onMenuPress, onSearchPress, onLoginPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Ícone de menu (opcional) */}
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={30} color="white" style={styles.icon} />
      </TouchableOpacity>

      {/* Nome CineSpot (centralizado) */}
      <View style={styles.centerContainer}>
        <Text style={styles.title}>CineSpot</Text>
      </View>

      {/* Ícones de busca e login (alinhados à direita) */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="search" size={30} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLoginPress}>
          <Ionicons name="person" size={30} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111', // Cor de fundo escura
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5, // Sombra para dar profundidade
  },
  centerContainer: {
    flex: 1, // Ocupa o espaço restante para centralizar o título
    alignItems: 'center', // Centraliza o texto
  },
  rightContainer: {
    flexDirection: 'row', // Alinha os ícones horizontalmente
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.5,  // Espaço entre as letras para dar um efeito elegante
  },
  icon: {
    marginHorizontal: 10, // Espaçamento entre os ícones
  },
});

export default Header;