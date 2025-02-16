import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const LayoutComum = ({ children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => console.log('Menu pressionado')}
        onSearchPress={() => console.log('Pesquisa pressionada')}
        onLoginPress={() => navigation.navigate('Login')}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
});

export default LayoutComum;
