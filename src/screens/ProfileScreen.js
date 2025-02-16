import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Conteúdo da tela de perfil */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem-vindo, {user?.email}!</Text>

        {/* Botão de Configurações */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#222',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;