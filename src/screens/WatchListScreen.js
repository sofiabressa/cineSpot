import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import MovieCard from '../components/MovieCard';
import SerieCard from '../components/SerieCard';  // Importando o SerieCard
import LayoutComum from '../components/LayoutComum';
import { UserContext } from '../contexts/UserContext';
import { getUserFavorites } from '../services/favoriteService';

const WatchListScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { width } = Dimensions.get('window');
  const cardWidth = 160;  // Largura do card
  const margin = 10;  // Aumento do espaçamento entre os cards
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setWatchList([]);
        setLoading(false);
        return;
      }

      try {
        const favorites = await getUserFavorites(); // Busca os favoritos do usuário
        setWatchList(favorites); // Atualiza a lista de favoritos
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <LayoutComum>
        <View style={styles.container}>
          <Text style={styles.title}>Faça login para acessar sua WatchList.</Text>
        </View>
      </LayoutComum>
    );
  }

  const renderItem = ({ item }) => {
    if (!item || !item.id || !(item.title || item.name)) { 
      console.error('Item inválido encontrado:', item);
      return null;
    }

    if (item.media_type === 'movie') {
      return (
        <MovieCard
          movie={item}
          onPress={() => {
            navigation.navigate('MovieDetails', { movieId: item.id });
          }}
        />
      );
    } else if (item.media_type === 'tv') {
      return (
        <SerieCard
          serie={item}
          onPress={() => {
            navigation.navigate('SeriesDetails', { tvId: item.id });
          }}
        />
      );
    }

    return null;
  };

  // Ajuste para `numColumns` dinâmico
  const numColumns = watchList.length > 1 ? Math.floor(width / (cardWidth + margin)) : watchList.length;

  return (
    <LayoutComum>
      <View style={styles.container}>
        <Text style={styles.title}>Sua WatchList</Text>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : watchList.length > 0 ? (
          <FlatList
            data={watchList}
            keyExtractor={(item) => item?.id?.toString() || 'unknown-key'}
            renderItem={renderItem}
            numColumns={numColumns}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <Text style={styles.noResults}>Nenhum filme ou série na WatchList.</Text>
        )}
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
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
  listContent: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'center',  // Centraliza os itens
    alignItems: 'center',      // Garante que os itens fiquem alinhados no centro
  },
});

export default WatchListScreen;
