import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, RANKING_INICIAL } from '../constants';

// ─────────────────────────────────────────────────────────────
// FUNÇÕES DE STORAGE
// Camada simples que encapsula o AsyncStorage:
// - Converte objetos para texto (JSON) ao salvar
// - Converte de volta para objeto ao ler
// ─────────────────────────────────────────────────────────────

export const storage = {
  // Lê um valor. Se não existir, retorna o "fallback"
  get: async (key, fallback = null) => {
    try {
      const valor = await AsyncStorage.getItem(key);
      return valor !== null ? JSON.parse(valor) : fallback;
    } catch {
      return fallback;
    }
  },

  // Salva um valor convertendo para texto
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

// ─────────────────────────────────────────────────────────────
// CONTEXTO
// O contexto é o "estado global" do app. Em vez de passar
// dados de tela em tela via props, qualquer tela pode chamar
// useApp() e acessar os dados diretamente.
// ─────────────────────────────────────────────────────────────

const AppContext = createContext();

// Hook que as telas usam para acessar o contexto
export const useApp = () => useContext(AppContext);

// Componente que envolve o app inteiro e fornece os dados
export const AppProvider = ({ children }) => {

  // Estados globais do app
  const [isLoggedIn, setIsLoggedIn] = useState(false); // está logado?
  const [user,       setUser]       = useState('');     // nome do usuário
  const [pontos,     setPontos]     = useState(0);      // pontos acumulados
  const [historico,  setHistorico]  = useState([]);     // lista de ações feitas
  const [resgates,   setResgates]   = useState({});     // itens resgatados na loja
  const [ranking,    setRanking]    = useState([]);     // lista do ranking

  // ── 1. Ao abrir o app, tenta carregar sessão salva ──────────
  // Se o usuário já usou o app antes, entra direto sem precisar logar
  useEffect(() => {
    const carregarSessao = async () => {
      const savedUser = await storage.get(STORAGE_KEYS.USER);

      // Se não tinha ninguém logado antes, fica na tela de login
      if (!savedUser) return;

      // Carrega todos os dados salvos
      const savedPontos    = await storage.get(STORAGE_KEYS.PONTOS,    0);
      const savedHistorico = await storage.get(STORAGE_KEYS.HISTORICO, []);
      const savedResgates  = await storage.get(STORAGE_KEYS.RESGATES,  {});
      const savedRanking   = await storage.get(STORAGE_KEYS.RANKING,   RANKING_INICIAL);

      // Popula os estados e entra no app
      setUser(savedUser);
      setPontos(savedPontos);
      setHistorico(savedHistorico);
      setResgates(savedResgates);
      setRanking(savedRanking);
      setIsLoggedIn(true);
    };

    carregarSessao();
  }, []); // [] = roda só uma vez quando o app abre

  // ── 2. Salva automaticamente quando os dados mudam ──────────
  // useEffect com dependência: roda sempre que a variável muda
  useEffect(() => { if (isLoggedIn) storage.set(STORAGE_KEYS.PONTOS,    pontos);    }, [pontos]);
  useEffect(() => { if (isLoggedIn) storage.set(STORAGE_KEYS.HISTORICO, historico); }, [historico]);
  useEffect(() => { if (isLoggedIn) storage.set(STORAGE_KEYS.RESGATES,  resgates);  }, [resgates]);

  // ── 3. Login ─────────────────────────────────────────────────
  // Chamado pela LoginScreen após validar nome e matrícula
  const handleLogin = useCallback(async (nomeUsuario, pontosIniciais) => {
    // Carrega dados existentes desse usuário (se já usou antes)
    const savedHistorico = await storage.get(STORAGE_KEYS.HISTORICO, []);
    const savedResgates  = await storage.get(STORAGE_KEYS.RESGATES,  {});
    const savedRanking   = await storage.get(STORAGE_KEYS.RANKING,   RANKING_INICIAL);

    setUser(nomeUsuario);
    setPontos(pontosIniciais);
    setHistorico(savedHistorico);
    setResgates(savedResgates);
    setRanking(savedRanking);
    setIsLoggedIn(true);
  }, []);

  // ── 4. Ganhar pontos (chamado pelo Scanner) ──────────────────
  const ganharPontos = useCallback((valor, descricao = 'Reciclagem') => {
    // Adiciona os pontos ao total
    setPontos(p => p + valor);

    // Registra no histórico (mantém só os últimos 50)
    setHistorico(h => [
      { desc: descricao, pts: valor, data: new Date().toLocaleDateString('pt-BR') },
      ...h,
    ].slice(0, 50));
  }, []);

  // ── 5. Gastar pontos (chamado pela Loja) ────────────────────
  const gastarPontos = useCallback((valor, nomeItem = 'Item', itemId = null) => {
    setPontos(p => {
      // Bloqueia se não tiver saldo suficiente
      if (p < valor) {
        Alert.alert('Saldo insuficiente', `Você precisa de ${valor} pts.`);
        return p; // retorna sem mudar nada
      }

      Alert.alert('✅ Resgate realizado!', `Você resgatou: ${nomeItem}`);

      // Registra o gasto no histórico com pontos negativos
      setHistorico(h => [
        { desc: `Resgate: ${nomeItem}`, pts: -valor, data: new Date().toLocaleDateString('pt-BR') },
        ...h,
      ].slice(0, 50));

      // Incrementa o contador de resgates desse item
      if (itemId) {
        setResgates(r => ({ ...r, [itemId]: (r[itemId] || 0) + 1 }));
      }

      return p - valor; // retorna o novo saldo
    });
  }, []);

  // ── 6. Reset para demo ───────────────────────────────────────
  // Limpa tudo do AsyncStorage e volta para o login
  const resetApp = useCallback(async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    setUser('');
    setPontos(0);
    setHistorico([]);
    setResgates({});
    setRanking([]);
  }, []);

  // Tudo que as telas podem acessar via useApp()
  return (
    <AppContext.Provider value={{
      isLoggedIn, user, pontos, historico, resgates, ranking,
      handleLogin, ganharPontos, gastarPontos, resetApp,
    }}>
      {children}
    </AppContext.Provider>
  );
};