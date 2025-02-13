import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { getPopularMovies } from '../services/movieService';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text) {
      const results = await getPopularMovies(); // Adapte para pesquisar por texto.
      setMovies(results);
    }
  };

  const renderMovie = ({ item }) => <Text>{item.title}</Text>;

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} onSearchTextChange={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
