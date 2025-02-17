import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { fetchMovies, fetchSeries } from '../services/movieService'; // Importe as funções de busca
import MovieCard from '../components/MovieCard';
import LayoutComum from '../components/LayoutComum';

const ContentScreen = ({ route, navigation }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const { contentType } = route.params;
  
    useEffect(() => {
      const fetchData = async () => {
        let data;
        if (contentType === 'movies') {
          data = await fetchMovies();
        } else if (contentType === 'series') {
          data = await fetchSeries();
        }
        setContent(data);
        setLoading(false);
      };
      fetchData();
    }, [contentType]);
  
    const renderItem = ({ item }) => (
      <MovieCard
        movie={item}
        onPress={() => navigation.navigate('Details', { id: item.id, type: contentType })}
      />
    );
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    return (
      <LayoutComum>
        <FlatList
          data={content}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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

export default ContentScreen;