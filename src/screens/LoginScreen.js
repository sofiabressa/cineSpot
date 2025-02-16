import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o ícone do Google
import { UserContext } from '../contexts/UserContext'; // Substitua o AuthContext pelo UserContext
import LayoutComum from '../components/LayoutComum'; // Importe o LayoutComum

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e registro

  const { login, register, googleLogin } = useContext(UserContext); // Use o UserContext

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Login com e-mail e senha
        await login(email, password);
        navigation.navigate('Home'); // Navega para a tela inicial após o login
      } else {
        // Registro com e-mail e senha
        await register(email, password);
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        setIsLogin(true); // Volta para a tela de login após o registro
      }
    } catch (error) {
      Alert.alert('Erro', error.message); // Exibe uma mensagem de erro se algo der errado
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); // Função de login com Google do UserContext
      navigation.navigate('Home'); // Navega para a tela inicial após o login com Google
    } catch (error) {
      Alert.alert('Erro', error.message); // Exibe uma mensagem de erro se o login falhar
    }
  };

  return (
    <LayoutComum> {/* Envolve o conteúdo com LayoutComum */}
      <View style={styles.container}>
        <View style={styles.formContainer}> {/* Contêiner do formulário */}
          <Text style={styles.title}>{isLogin ? 'Login' : 'Criar Conta'}</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Registrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <MaterialIcons name="google" size={24} color="#DB4437" /> {/* Ícone do Google */}
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.link}>
              {isLogin ? 'Criar uma conta' : 'Já tem uma conta? Faça login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutComum>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco
  },
  formContainer: {
    width: '30%', // Largura reduzida do contêiner do formulário
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Cinza transparente
    padding: 20,
    borderRadius: 10, // Bordas arredondadas
    shadowColor: '#000', // Sombra para dar um efeito elevado
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Sombra no Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Cor do texto escuro
    textAlign: 'center', // Centraliza o texto
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff', // Cor de fundo do input
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  googleButtonText: {
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10, // Espaçamento entre o ícone e o texto
  },
  link: {
    marginTop: 15,
    color: '#007BFF',
    textAlign: 'center', // Centraliza o texto
  },
});

export default LoginScreen; // Exportação padrão