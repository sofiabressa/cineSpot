import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { getTVShowDetails, getTVShowCast, getTVShowStreaming, getTVShowCertifications } from '../services/movieService';
import { addToFavorites, removeFromFavorites, checkIfFavorite } from '../services/favoriteService';
import LayoutComum from '../components/LayoutComum';
import { Heart } from 'lucide-react-native';

const SeriesDetailsScreen = ({ route }) => {
  const { tvId } = route.params;
  const [tvShow, setTVShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [certifications, setCertifications] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const tvShowData = await getTVShowDetails(tvId);
        setTVShow(tvShowData);

        const creditsData = await getTVShowCast(tvId);
        setCast(creditsData.cast);

        const streamingData = await getTVShowStreaming(tvId);
        setStreamingPlatforms(streamingData);

        const certificationsData = await getTVShowCertifications(tvId);
        setCertifications(certificationsData);

        // Verifica se a série está nos favoritos
        const favoriteStatus = await checkIfFavorite(tvId);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [tvId]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(tvId);
      } else {
        await addToFavorites(tvId);
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
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}` }} style={styles.banner}>
          <View style={styles.overlay}>
            <View style={styles.posterContainer}>
              <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }} />
            </View>
            <View style={styles.tvShowInfo}>
              <Text style={styles.title}>{tvShow.name}</Text>
              <Text style={styles.infoText}>{new Date(tvShow.first_air_date).toLocaleDateString()}</Text>
              <Text style={styles.infoText}>{tvShow.genres.map(genre => genre.name).join(', ')}</Text>
              <Text style={styles.infoText}>Episódios: {tvShow.number_of_episodes}</Text>
              <Text style={styles.rating}>⭐ {tvShow.vote_average.toFixed(1)}</Text>
            </View>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
              <Heart size={32} color={isFavorite ? 'red' : 'white'} fill={isFavorite ? 'red' : 'none'} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.overview}>{tvShow.overview}</Text>
        </View>

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
  tvShowInfo: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  infoText: { fontSize: 16, color: '#ddd', marginTop: 5 },
  rating: { fontSize: 18, color: '#ffcc00', marginTop: 10 },
  detailsContainer: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#444' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  overview: { fontSize: 16, color: '#ddd', lineHeight: 22 },
  castItem: { alignItems: 'center', marginRight: 15 },
  castImage: { width: 80, height: 80, borderRadius: 40 },
  castName: { fontSize: 14, color: '#fff', marginTop: 5, textAlign: 'center' },
  favoriteButton: { position: 'absolute', top: 20, right: 20 },
});

export default SeriesDetailsScreen;
