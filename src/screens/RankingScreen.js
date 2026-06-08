import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import styles from '../styles';

const RankingScreen = () => {
  const { user, pontos, ranking } = useApp();

  // Filtro selecionado (visual apenas — os dados são os mesmos por enquanto)
  const [filtro, setFiltro] = useState('CAMPUS');

  // Monta o ranking final: remove o usuário atual da lista (para não duplicar),
  // adiciona ele com os pontos reais, e ordena do maior para o menor
  const rankingFinal = [...ranking]
    .filter(r => r.n !== user)
    .concat({ id: 'eu', n: `${user} (Você)`, p: pontos })
    .sort((a, b) => b.p - a.p);

  return (
    <View style={styles.container}>

      {/* Botões de filtro */}
      <View style={styles.filterBar}>
        {['CAMPUS', 'CURSO', 'GLOBAL'].map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltro(f)}
            style={[styles.filterBtn, filtro === f && styles.filterBtnActive]}
          >
            <Text style={{ color: filtro === f ? '#fff' : '#002753', fontWeight: 'bold' }}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista do ranking — FlatList é mais eficiente que ScrollView para listas */}
      <FlatList
        data={rankingFinal}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          // Destaca a linha do usuário logado com borda verde
          <View style={[styles.rankItem, item.id === 'eu' && styles.rankItemDestaque]}>
            <Text style={styles.rankPos}>#{index + 1}</Text>
            <Text style={{ flex: 1, marginLeft: 15, fontWeight: 'bold', color: item.id === 'eu' ? '#002753' : '#333' }}>
              {item.n}
            </Text>
            <Text style={{ fontWeight: 'bold', color: '#00AA00' }}>{item.p} pts</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RankingScreen;