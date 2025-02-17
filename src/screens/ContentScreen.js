import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { getPopularMovies, getPopularTVShows } from '../services/movieService'; // Ajustando para pegar filmes e séries
import MovieCard from '../components/MovieCard';
import LayoutComum from '../components/LayoutComum';

const ContentScreen = ({ route, navigation }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { contentType } = route.params; // 'movies' ou 'series'
  const { width } = Dimensions.get('window');
  const numColumns = width > 768 ? 4 : width > 500 ? 3 : 2; // Número de colunas baseado na largura da tela

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (contentType === 'movies') {
        data = await getPopularMovies();
      } else if (contentType === 'series') {
        data = await getPopularTVShows();
      }
      setContent(data);
      setLoading(false);
    };

    fetchData();
  }, [contentType]);

  const renderItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => {
        // Verifica o tipo de conteúdo e navega para a tela correta
        if (contentType === 'movies') {
          navigation.navigate('MovieDetails', { movieId: item.id });
        } else if (contentType === 'series') {
          navigation.navigate('SeriesDetails', { tvId: item.id });
        }
      }}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <LayoutComum>
      <View style={styles.container}>
        <Text style={styles.title}>{contentType === 'movies' ? 'Filmes Populares' : 'Séries Populares'}</Text>
        <FlatList
          data={content}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
});

export default ContentScreen;
