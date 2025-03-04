import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { getMovieDetails, getMovieCast, getMovieStreaming, getMovieCertifications } from '../services/movieService';
import { addToFavorites, removeFromFavorites, checkIfFavorite } from '../services/favoriteService';
import LayoutComum from '../components/LayoutComum';
import { Heart } from 'lucide-react-native';

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [certifications, setCertifications] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
  
        const creditsData = await getMovieCast(movieId);
        console.log('Elenco do filme:', creditsData); // Verifique o que está sendo retornado
        setCast(creditsData);
  
        const streamingData = await getMovieStreaming(movieId);
        setStreamingPlatforms(streamingData);
  
        const certificationsData = await getMovieCertifications(movieId);
        setCertifications(certificationsData);
  
        const favoriteStatus = await checkIfFavorite(movieId, 'movie');
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [movieId]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(movieId, 'movie'); // Passa o media_type como 'movie'
      } else {
        await addToFavorites(movieId, 'movie'); // Passa o media_type como 'movie'
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <LayoutComum>
      <ScrollView style={styles.container}>
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` }} style={styles.banner}>
          <View style={styles.overlay}>
            <View style={styles.posterContainer}>
              <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
            </View>
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.infoText}>{new Date(movie.release_date).toLocaleDateString()}</Text>
              <Text style={styles.infoText}>{movie.genres.map(genre => genre.name).join(', ')}</Text>
              <Text style={styles.infoText}>Duração: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</Text>
              <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>

              {/* Streaming abaixo da nota */}
              <View style={styles.streamingContainer}>
                <Text style={styles.streamingTitle}>Disponível em:</Text>
                <View style={styles.streamingPlatformsContainer}>
                  {streamingPlatforms.length > 0 ? (
                    streamingPlatforms.map((platform) => (
                      <View key={platform.provider_id} style={styles.streamingItem}>
                        <Image
                          style={styles.streamingIcon}
                          source={{ uri: `https://image.tmdb.org/t/p/w500${platform.logo_path}` }}
                        />
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noStreaming}>Não disponível em plataformas de streaming.</Text>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
              <Heart size={32} color={isFavorite ? 'red' : 'white'} fill={isFavorite ? 'red' : 'none'} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Sinopse */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        {/* Elenco */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Elenco</Text>
          <FlatList
            horizontal
            data={cast}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.castItem}>
                <Image style={styles.castImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }} />
                <Text style={styles.castName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </LayoutComum>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1c' },
  banner: { width: '100%', height: 340, justifyContent: 'flex-end' },
  overlay: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 20 },
  posterContainer: { marginRight: 20 },
  poster: { width: 200, height: 300, borderRadius: 10 },
  movieInfo: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  infoText: { fontSize: 16, color: '#ddd', marginTop: 5 },
  rating: { fontSize: 18, color: '#ffcc00', marginTop: 10 },
  detailsContainer: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#444' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  streamingTitle: { fontSize: 16, color: '#fff', marginBottom: 10 }, // Tamanho menor para "Streaming"
  overview: { fontSize: 16, color: '#ddd', lineHeight: 22 },
  castItem: { alignItems: 'center', marginRight: 15 },
  castImage: { width: 80, height: 80, borderRadius: 40 },
  castName: { fontSize: 14, color: '#fff', marginTop: 5, textAlign: 'center' },
  favoriteButton: { position: 'absolute', top: 20, right: 20 },
  streamingContainer: { marginTop: 10 }, // Container da seção de streaming
  streamingPlatformsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  streamingItem: { margin: 10 },
  streamingIcon: { width: 50, height: 50, resizeMode: 'contain', marginRight: 10 },
  noStreaming: { fontSize: 16, color: '#999', textAlign: 'left' },
});

export default MovieDetailsScreen;