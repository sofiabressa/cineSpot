import React, { useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { searchQuery });
    }
  };

  const handleSearchPress = () => {
    searchInputRef.current.focus();
  };

  const handleNavigation = (contentType) => {
    if (contentType === 'watchlist') {
      navigation.navigate('WatchList'); // Navega para a tela da WatchList
    } else {
      navigation.navigate('Content', { contentType }); // Navega para Filmes ou Séries
    }
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
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
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
    height: 60, // Altura fixa para o Header
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    marginRight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 15,
    paddingHorizontal: 8,
    height: 30,
    flex: 0.3,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    paddingVertical: 8,
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