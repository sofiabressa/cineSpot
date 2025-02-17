import React, { useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); // Acesse o estado do usuário
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o texto da pesquisa
  const searchInputRef = useRef(null); // Referência para o TextInput

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

  const handleSearch = () => {
    if (searchQuery.trim()) { // Verifica se o campo de pesquisa não está vazio
      navigation.navigate('Search', { searchQuery }); // Navega para a SearchScreen com o termo de pesquisa
    }
  };

  const handleSearchPress = () => {
    searchInputRef.current.focus(); // Foca no TextInput ao clicar no ícone de pesquisa
  };

  const handleNavigation = (contentType) => {
    navigation.navigate('Content', { contentType }); // Navega para a tela ContentScreen com o tipo de conteúdo (filmes ou séries)
  };

  return (
    <View style={styles.headerContainer}>
      {/* Nome CineSpot, Sessões e Barra de Pesquisa (lado esquerdo) */}
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Text style={styles.title}>CineSpot</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('movies')}>
          <Text style={styles.sessionText}>Filmes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('series')}>
          <Text style={styles.sessionText}>Séries</Text>
        </TouchableOpacity>
        {user && (
          <TouchableOpacity onPress={() => handleNavigation('watchlist')}>
            <Text style={styles.sessionText}>WatchList</Text>
          </TouchableOpacity>
        )}
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            ref={searchInputRef} // Referência para o TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery} // Atualiza o estado com o texto digitado
            onSubmitEditing={handleSearch} // Executa a pesquisa ao pressionar "Enter"
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <Ionicons name="search" size={18} color="white" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Ícones de perfil e login (lado direito) */}
      <View style={styles.rightContainer}>
        {user ? (
          <View style={styles.userContainer}>
            <Text style={styles.welcomeText}>Bem-vindo, {user.email}!</Text>
            <TouchableOpacity onPress={handleProfilePress}>
              <Ionicons name="person" size={24} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleProfilePress}>
            <Ionicons name="person" size={24} color="white" style={styles.icon} />
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ocupa todo o espaço disponível à esquerda
  },
  sessionText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 12,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginRight: 20, // Espaço maior entre o nome CineSpot e as sessões
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 15,
    paddingHorizontal: 8,
    height: 30, // Aumentei a altura para facilitar o clique
    flex: 0.3, // Faz a barra de pesquisa ocupar o restante do espaço disponível
    marginLeft: 10, // Espaço maior entre a barra de pesquisa e as sessões
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    paddingVertical: 8, // Aumentei o padding para facilitar o clique
  },
  searchIcon: {
    marginLeft: 6,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 12,
    marginRight: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
});

export default Header;
