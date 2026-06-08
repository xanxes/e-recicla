import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User, Battery, Recycle, ShoppingBag, ChevronRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { NIVEIS } from '../constants';
import styles from '../styles';

const HomeScreen = () => {
  // Pega os dados do contexto global
  const { user, pontos, historico } = useApp();

  // Calcula o nível atual (1 nível a cada 500 pontos)
  const nivelIndex  = Math.min(Math.floor(pontos / 500), NIVEIS.length - 1);

  // Calcula o progresso dentro do nível atual (0% a 100%)
  const xpProgresso = (pontos % 500) / 5;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Card de perfil com barra de XP */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User color="#fff" />
          </View>
          <View>
            <Text style={styles.userName}>{user}</Text>
            <Text style={styles.userLevel}>Nível {nivelIndex + 1}: {NIVEIS[nivelIndex]}</Text>
          </View>
        </View>

        {/* Barra de progresso: width muda dinamicamente com o XP */}
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBar, { width: `${xpProgresso}%` }]} />
        </View>
        <Text style={styles.xpText}>{500 - (pontos % 500)} pts para o próximo nível</Text>
      </View>

      {/* Saldo total de pontos */}
      <View style={styles.mainPointsCard}>
        <Text style={styles.labelDark}>SALDO ECO-COINS</Text>
        <Text style={styles.pointsBig}>{pontos}</Text>
        <Text style={styles.subText}>Seu impacto está sendo computado 🚀</Text>
      </View>

      {/* Métricas de impacto ambiental calculadas a partir dos pontos */}
      <Text style={styles.sectionTitle}>Seu Impactômetro 📊</Text>
      <View style={styles.impactGrid}>
        <View style={styles.impactItem}>
          <Battery color="#00FF00" size={24} />
          <Text style={styles.impactVal}>{(pontos * 0.05).toFixed(1)}kg</Text>
          <Text style={styles.impactLabel}>Metais Retidos</Text>
        </View>
        <View style={styles.impactItem}>
          <Recycle color="#3498db" size={24} />
          <Text style={styles.impactVal}>{(pontos / 10).toFixed(0)}</Text>
          <Text style={styles.impactLabel}>Itens Reciclados</Text>
        </View>
      </View>

      {/* Card de objetivo — muda a mensagem se já tem pontos suficientes */}
      <Text style={styles.sectionTitle}>Foco no Objetivo 🎯</Text>
      <TouchableOpacity style={styles.rewardCard}>
        <View style={styles.rewardIcon}>
          <ShoppingBag color="#fff" size={20} />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.rewardTitle}>Café na Cantina</Text>
          <Text style={styles.rewardSub}>
            {pontos >= 300 ? 'Disponível! Vá à Loja 🎉' : `Faltam ${300 - pontos} pts`}
          </Text>
        </View>
        <ChevronRight color="#002753" size={20} />
      </TouchableOpacity>

      {/* Histórico: só aparece se tiver pelo menos uma ação registrada */}
      {historico.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Últimas Atividades 📋</Text>
          {/* Mostra só as 5 mais recentes */}
          {historico.slice(0, 5).map((item, i) => (
            <View key={i} style={styles.historicoItem}>
              <Text style={styles.historicoDesc}>{item.desc}</Text>
              {/* Verde para ganhos, vermelho para gastos */}
              <Text style={[styles.historicoPts, { color: item.pts > 0 ? '#4CAF50' : '#e74c3c' }]}>
                {item.pts > 0 ? `+${item.pts}` : item.pts} pts
              </Text>
            </View>
          ))}
        </>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default HomeScreen;