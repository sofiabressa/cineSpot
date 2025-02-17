import React, { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { getPopularMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import LayoutComum from '../components/LayoutComum';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calcula o número de colunas com base na largura da tela
  const { width } = Dimensions.get('window');
  const cardWidth = 160; // Largura do MovieCard
  const margin = 8; // Margem entre os itens
  const numColumns = Math.floor(width / (cardWidth + margin * 2)); // Considera a margem

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

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
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Filmes Populares</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={numColumns} // Número de colunas dinâmico
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper} // Estilo para as colunas
        />
      </SafeAreaView>
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
  listContent: {
    paddingHorizontal: 8, // Espaçamento horizontal para evitar cortes
  },
  columnWrapper: {
    justifyContent: 'space-between', // Distribui o espaço entre os itens
  },
});

export default HomeScreen;