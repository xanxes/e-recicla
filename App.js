import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Leaf, QrCode, Trophy, ShoppingBag } from 'lucide-react-native';

// Contexto global que guarda os dados do usuário
import { AppProvider, useApp } from './src/context/AppContext';

// Telas do app
import LoginScreen   from './src/screens/LoginScreen';
import HomeScreen    from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import RankingScreen from './src/screens/RankingScreen';
import StoreScreen   from './src/screens/StoreScreen';

// Cria o navegador de abas (barra inferior)
const Tab = createBottomTabNavigator();

// Abas do app com seus ícones
const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00FF00',
        tabBarStyle: { backgroundColor: '#002753', height: 60, paddingBottom: 10 },
        headerTitleStyle: { color: '#002753', fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Home"    component={HomeScreen}    options={{ tabBarIcon: ({ color }) => <Leaf        color={color} /> }} />
      <Tab.Screen name="Scan"    component={ScannerScreen} options={{ tabBarIcon: ({ color }) => <QrCode      color={color} /> }} />
      <Tab.Screen name="Ranking" component={RankingScreen} options={{ tabBarIcon: ({ color }) => <Trophy      color={color} /> }} />
      <Tab.Screen name="Loja"    component={StoreScreen}   options={{ tabBarIcon: ({ color }) => <ShoppingBag color={color} /> }} />
    </Tab.Navigator>
  </NavigationContainer>
);

// Decide se mostra o login ou o app principal
const Root = () => {
  const { isLoggedIn, handleLogin } = useApp();
  return isLoggedIn ? <AppNavigator /> : <LoginScreen onLogin={handleLogin} />;
};

// Ponto de entrada do app — AppProvider envolve tudo para compartilhar os dados
export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}