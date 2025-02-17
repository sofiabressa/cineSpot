import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { searchMovies } from '../services/movieService'; // Importe a função de busca
import MovieCard from '../components/MovieCard';
import LayoutComum from '../components/LayoutComum';

const SearchScreen = ({ route, navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = route.params; // Recebe o termo de pesquisa da navegação

  const { width } = Dimensions.get('window');
  const numColumns = width > 768 ? 4 : width > 500 ? 3 : 2;

  useEffect(() => {
    const fetchSearchResults = async () => {
      const data = await searchMovies(searchQuery); // Busca filmes com base no termo
      setMovies(data);
      setLoading(false);
    };
    fetchSearchResults();
  }, [searchQuery]); // Executa sempre que o termo de pesquisa mudar

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <LayoutComum>
      <View style={styles.container}>
        <Text style={styles.title}>Resultados para: "{searchQuery}"</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={numColumns}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
          ListEmptyComponent={
            <Text style={styles.noResults}>Nenhum filme encontrado.</Text>
          }
        />
      </View>
    </LayoutComum>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
});

export default SearchScreen;