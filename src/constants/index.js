// Chaves usadas para salvar e ler dados no AsyncStorage
export const STORAGE_KEYS = {
  USER:      'erecicla_user',
  PONTOS:    'erecicla_pontos',
  HISTORICO: 'erecicla_historico',
  RESGATES:  'erecicla_resgates',
  RANKING:   'erecicla_ranking',
};

// Títulos de nível — o usuário sobe de nível a cada 500 pontos
export const NIVEIS = [
  "Ecoentusiasta", "Calouro Sustentável", "Recruta do Hardware", "Digitador de Ciclos",
  "Monitor de E-Waste", "Analista de Resíduos", "Mestre das Soldas", "Bacharel em BioTech",
  "Engenheiro de Ciclos", "Arquiteto de Logística", "Sênior da Reciclagem", "Líder de Sustentabilidade",
  "Diretor de Eco-Inovação", "PHD em Hardware Reverso", "Cientista Ambiental Estácio",
  "Embaixador do E-Recicla", "Visionário de Sistemas", "Guardião do Silício", "Lenda da Ecologia",
  "Oráculo Sustentável",
];

// Produtos disponíveis na loja (n = nome, p = preço em pontos)
export const ITENS_LOJA = [
  { id: '1', n: 'Café na Cantina',   p: 300  },
  { id: '2', n: 'Copo Sustentável',  p: 1200 },
  { id: '3', n: 'Caderno Reciclado', p: 800  },
  { id: '4', n: 'Desconto na Xerox', p: 500  },
];

// Ranking fictício inicial para demonstração
export const RANKING_INICIAL = [
  { id: '1', n: 'Marcelo (SI)',  p: 2450 },
  { id: '2', n: 'Ana (Eng)',     p: 1800 },
  { id: '3', n: 'João (Adm)',    p: 900  },
];