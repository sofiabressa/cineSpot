import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const Header = ({ onMenuPress, onSearchPress }) => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); // Acesse o estado do usuário

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const handleProfilePress = () => {
    if (user) {
      // Redireciona para a tela de perfil
      navigation.navigate('Profile');
    } else {
      // Redireciona para a tela de login
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Ícone de menu (opcional) */}
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={30} color="white" style={styles.icon} />
      </TouchableOpacity>

      {/* Nome CineSpot (clicável) */}
      <TouchableOpacity onPress={handleLogoPress}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>CineSpot</Text>
        </View>
      </TouchableOpacity>

      {/* Ícones de busca e perfil (alinhados à direita) */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="search" size={30} color="white" style={styles.icon} />
        </TouchableOpacity>

        {/* Mensagem de boas-vindas e ícone de perfil */}
        {user ? (
          <View style={styles.userContainer}>
            <Text style={styles.welcomeText}>Bem-vindo, {user.email}!</Text>
            <TouchableOpacity onPress={handleProfilePress}>
              <Ionicons name="person" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleProfilePress}>
            <Ionicons name="person" size={30} color="white" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Header;