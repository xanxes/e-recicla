import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:        { flex: 1, padding: 20, backgroundColor: '#f4f7f6' },
  center:           { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#f4f7f6' },
  logoText:         { fontSize: 36, fontWeight: 'bold', color: '#002753', fontFamily: 'monospace' },

  // Login
  inputLabel:       { fontSize: 12, fontWeight: 'bold', color: '#002753', marginBottom: 6, marginLeft: 2 },
  input:            { width: '100%', backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, elevation: 3 },
  btnTech:          { backgroundColor: '#002753', padding: 18, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnText:          { color: '#fff', fontWeight: 'bold' },

  // Home - perfil
  profileCard:      { backgroundColor: '#002753', padding: 20, borderRadius: 20, marginBottom: 15 },
  profileHeader:    { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar:           { width: 45, height: 45, borderRadius: 22, backgroundColor: '#00FF00', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  userName:         { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userLevel:        { color: '#00FF00', fontSize: 12 },
  xpBarContainer:   { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 },
  xpBar:            { height: '100%', backgroundColor: '#00FF00', borderRadius: 4 },
  xpText:           { color: '#aaa', fontSize: 10, marginTop: 5, textAlign: 'right' },

  // Home - cards
  mainPointsCard:   { backgroundColor: '#fff', padding: 25, borderRadius: 20, alignItems: 'center', marginVertical: 15, elevation: 3, borderLeftWidth: 5, borderLeftColor: '#00FF00' },
  pointsBig:        { fontSize: 50, fontWeight: 'bold', color: '#002753' },
  labelDark:        { fontSize: 10, fontWeight: 'bold', color: '#888' },
  subText:          { color: '#4CAF50', fontSize: 11 },

  // Home - impacto
  impactGrid:       { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  impactItem:       { backgroundColor: '#fff', padding: 15, borderRadius: 15, width: '48%', alignItems: 'center', elevation: 2 },
  impactVal:        { fontSize: 18, fontWeight: 'bold', color: '#002753' },
  impactLabel:      { fontSize: 11, color: '#666', marginTop: 4 },

  // Home - reward
  rewardCard:       { backgroundColor: '#E8F5E9', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 15 },
  rewardIcon:       { width: 40, height: 40, borderRadius: 10, backgroundColor: '#002753', justifyContent: 'center', alignItems: 'center' },
  rewardTitle:      { fontWeight: 'bold', color: '#002753' },
  rewardSub:        { fontSize: 11, color: '#666' },

  // Home - histórico
  historicoItem:    { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8, elevation: 1 },
  historicoDesc:    { flex: 1, color: '#333', fontSize: 13 },
  historicoPts:     { fontWeight: 'bold', fontSize: 13 },

  // Scanner
  scanOverlay:      { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 20 },

  // Ranking
  filterBar:        { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  filterBtn:        { padding: 10, borderRadius: 20, width: '30%', alignItems: 'center', backgroundColor: '#ddd' },
  filterBtnActive:  { backgroundColor: '#002753' },
  rankItem:         { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1 },
  rankItemDestaque: { backgroundColor: '#E8F5E9', borderWidth: 1.5, borderColor: '#00AA00' },
  rankPos:          { color: '#00FF00', fontWeight: 'bold', fontSize: 16, minWidth: 30 },

  // Loja
  lojaItem:         { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  lojaNome:         { fontWeight: 'bold', color: '#002753', fontSize: 15 },
  lojaSubtitle:     { fontSize: 11, color: '#888', marginTop: 2 },
  btnSmall:         { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8 },
  btnDisabled:      { backgroundColor: '#ccc', padding: 10, borderRadius: 8 },

  // Geral
  sectionTitle:     { fontSize: 18, fontWeight: 'bold', color: '#002753', marginVertical: 10 },
});

export default styles;