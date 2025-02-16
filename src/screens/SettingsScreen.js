import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { user, changePassword, removeAccount } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await changePassword(newPassword);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setNewPassword('');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await removeAccount(deletePassword);
      setShowDeleteModal(false);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      {/* Conteúdo da tela de configurações */}
      <View style={styles.content}>
        <Text style={styles.userEmail}>Logado como: {user?.email}</Text>

        {/* Campo para nova senha */}
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {/* Botão para alterar senha */}
        <TouchableOpacity style={styles.optionButton} onPress={handleChangePassword}>
          <Text style={styles.optionText}>Alterar Senha</Text>
        </TouchableOpacity>

        {/* Botão para excluir conta */}
        <TouchableOpacity style={styles.optionButton} onPress={handleDeleteAccount}>
          <Text style={[styles.optionText, styles.deleteText]}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de confirmação para exclusão */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Digite sua senha para confirmar a exclusão:</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#222',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userEmail: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteText: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#222',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
});

export default SettingsScreen;