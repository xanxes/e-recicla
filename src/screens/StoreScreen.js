import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { ITENS_LOJA } from '../constants';
import styles from '../styles';

const StoreScreen = () => {
  const { pontos, gastarPontos, resgates, resetApp } = useApp();

  // ── Botão secreto de reset (para demonstrações) ──────────────
  // Conta toques no rodapé. 5 toques em até 2s abre o menu de reset
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  const handleSecretTap = () => {
    tapCount.current += 1;

    // Reinicia o contador se demorar mais de 2s entre toques
    clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 2000);

    // Ao chegar em 5 toques, abre o alert de confirmação
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      Alert.alert(
        '🔧 Modo Demo',
        'Limpar todos os dados e voltar ao login?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Limpar tudo', style: 'destructive', onPress: resetApp },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Troque seus Eco-Coins 🛍️</Text>

      {/* Mostra o saldo atual */}
      <View style={[styles.mainPointsCard, { marginBottom: 20 }]}>
        <Text style={styles.labelDark}>SEU SALDO</Text>
        <Text style={[styles.pointsBig, { fontSize: 36 }]}>{pontos} pts</Text>
      </View>

      {/* Lista de itens da loja vindos das constants */}
      {ITENS_LOJA.map(item => {
        const qtdResgatada = resgates[item.id] || 0;   // quantas vezes já resgatou
        const podeResgatar = pontos >= item.p;          // tem saldo suficiente?

        return (
          <View key={item.id} style={styles.lojaItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lojaNome}>{item.n}</Text>
              <Text style={styles.lojaSubtitle}>
                {qtdResgatada > 0 ? `Resgatado ${qtdResgatada}x` : 'Disponível para resgate'}
              </Text>
            </View>

            {/* Botão verde se pode resgatar, cinza se não tem saldo */}
            <TouchableOpacity
              style={podeResgatar ? styles.btnSmall : styles.btnDisabled}
              onPress={() => podeResgatar && gastarPontos(item.p, item.n, item.id)}
              disabled={!podeResgatar}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.p} pts</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <View style={{ height: 40 }} />

      {/* Rodapé com botão secreto — texto discreto, área de toque generosa */}
      <TouchableOpacity
        onPress={handleSecretTap}
        style={{ paddingVertical: 20, paddingHorizontal: 40, alignSelf: 'center', marginBottom: 30 }}
      >
        <Text style={{ color: '#ddd', fontSize: 11 }}>v1.0.0</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StoreScreen;