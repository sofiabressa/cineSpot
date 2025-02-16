import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { getPopularMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import LayoutComum from '../components/LayoutComum';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { width } = Dimensions.get('window');
  const numColumns = width > 768 ? 4 : width > 500 ? 3 : 2;

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
      <View style={styles.container}>
        <Text style={styles.title}>Filmes Populares</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={numColumns}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
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
  listContent: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
