import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback,
  Keyboard, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { Cpu } from 'lucide-react-native';
import { storage } from '../context/AppContext';
import { STORAGE_KEYS } from '../constants';
import styles from '../styles';

const LoginScreen = ({ onLogin }) => {
  const [nome,      setNome]      = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading,   setLoading]   = useState(false); // controla o spinner do botão

  const handleLogin = async () => {
    // Validações básicas antes de prosseguir
    if (nome.trim().length < 3)      return Alert.alert('Erro', 'Informe seu nome completo.');
    if (matricula.trim().length < 3) return Alert.alert('Erro', 'Informe sua matrícula.');

    setLoading(true);

    // Usa a matrícula em minúsculas como chave única no storage
    // Isso garante que cada aluno tenha seus próprios dados salvos
    const chaveUser = matricula.trim().toLowerCase();

    const savedUser   = await storage.get(STORAGE_KEYS.USER);
    const savedPontos = await storage.get(STORAGE_KEYS.PONTOS, 0);

    // Se a matrícula já existia, mantém os pontos. Se é nova, começa do zero
    const pontosIniciais = savedUser === chaveUser ? savedPontos : 0;

    // Salva o novo usuário e passa os dados para o contexto via onLogin
    await storage.set(STORAGE_KEYS.USER,   chaveUser);
    await storage.set(STORAGE_KEYS.PONTOS, pontosIniciais);

    // Pequeno delay para mostrar o loading (simula autenticação)
    setTimeout(() => onLogin(nome.trim(), pontosIniciais), 800);
  };

  return (
    // KeyboardAvoidingView empurra o conteúdo para cima quando o teclado abre
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#f4f7f6' }}
    >
      {/* Toca fora dos inputs para fechar o teclado */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.center}>
          <Cpu color="#00FF00" size={80} />
          <Text style={styles.logoText}>{'>'} E-Recicla_</Text>

          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={styles.inputLabel}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Maria Silva"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Matrícula</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 202300123"
              value={matricula}
              onChangeText={setMatricula}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.btnTech} onPress={handleLogin} disabled={loading}>
              {/* Mostra spinner enquanto carrega, texto quando está pronto */}
              {loading
                ? <ActivityIndicator color="#00FF00" />
                : <Text style={styles.btnText}>AUTENTICAR NO CAMPUS</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;