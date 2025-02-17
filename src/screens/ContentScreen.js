import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getPopularMovies, getPopularTVShows, getMoviesByGenre, getTVShowsByGenre } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import SerieCard from '../components/SerieCard';  // Importando o SerieCard
import LayoutComum from '../components/LayoutComum';

// IDs dos gêneros para filmes e séries
const movieGenres = [
  { id: 28, name: 'Ação' },
  { id: 12, name: 'Aventura' },
  { id: 16, name: 'Animação' },
  { id: 35, name: 'Comédia' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentário' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Família' },
  { id: 14, name: 'Fantasia' },
  { id: 36, name: 'História' },
  { id: 27, name: 'Terror' },
  { id: 10402, name: 'Música' },
  { id: 9648, name: 'Mistério' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Ficção Científica' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'Guerra' },
  { id: 37, name: 'Faroeste' },
];

const seriesGenres = [
  { id: 10759, name: 'Ação & Aventura' },
  { id: 16, name: 'Animação' },
  { id: 35, name: 'Comédia' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentário' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Família' },
  { id: 10765, name: 'Sci-Fi & Fantasia' },
  { id: 36, name: 'História' },
  { id: 27, name: 'Terror' },
  { id: 10762, name: 'Infantil' },
  { id: 9648, name: 'Mistério' },
  { id: 10763, name: 'Notícias' },
  { id: 10764, name: 'Reality' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'Guerra & Política' },
  { id: 37, name: 'Faroeste' },
];

const ContentScreen = ({ route, navigation }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  const { contentType } = route.params; // 'movies' ou 'series'
  const { width } = Dimensions.get('window');
  const cardWidth = 160; // Largura do MovieCard
  const margin = 8; // Margem entre os itens
  const numColumns = Math.floor(width / (cardWidth + margin * 2)); // Número de colunas dinâmico

  useEffect(() => {
    // Define os gêneros com base no tipo de conteúdo
    setGenres(contentType === 'movies' ? movieGenres : seriesGenres);

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

  // Função para filtrar por gênero
  const handleGenreFilter = async (genreId) => {
    setLoading(true);
    setSelectedGenre(genreId);

    let data;
    if (contentType === 'movies') {
      data = await getMoviesByGenre(genreId);
    } else if (contentType === 'series') {
      data = await getTVShowsByGenre(genreId);
    }

    setContent(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    if (contentType === 'movies') {
      return (
        <MovieCard
          movie={item}
          onPress={() => {
            navigation.navigate('MovieDetails', { movieId: item.id });
          }}
        />
      );
    } else if (contentType === 'series') {
      return (
        <SerieCard
          serie={item}
          onPress={() => {
            navigation.navigate('SeriesDetails', { tvId: item.id });
          }}
        />
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  // Título dinâmico com base no gênero selecionado
  const selectedGenreName = genres.find((genre) => genre.id === selectedGenre)?.name || 'Populares';
  
  // Ajuste para o título conforme tipo de conteúdo
  const title = selectedGenre
    ? `Resultados para ${contentType === 'movies' ? 'filmes' : 'séries'} de ${selectedGenreName}`
    : `${contentType === 'movies' ? 'Filmes Populares' : 'Séries Populares'}`;

  return (
    <LayoutComum>
      <View style={styles.container}>
        {/* Barra lateral de gêneros */}
        <View style={styles.sidebar}>
          <ScrollView contentContainerStyle={styles.sidebarContent}>
            <Text style={styles.sidebarTitle}>Gêneros</Text>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreItem,
                  selectedGenre === genre.id && styles.selectedGenreItem,
                ]}
                onPress={() => handleGenreFilter(genre.id)}
              >
                <Text style={styles.genreText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <FlatList
            data={content}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={numColumns} // Número de colunas dinâmico
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper} // Estilo para as colunas
          />
        </View>
      </View>
    </LayoutComum>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
  },
  sidebar: {
    width: 150, // Largura da barra lateral (ajuste conforme necessário)
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  sidebarContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  genreItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedGenreItem: {
    backgroundColor: '#e0e0e0',
  },
  genreText: {
    fontSize: 12,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
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
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ContentScreen;
