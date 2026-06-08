import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import { QrCode } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import styles from '../styles';

const ScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { ganharPontos } = useApp();

  const scanLock = useRef(false);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  useFocusEffect(
    useCallback(() => {
      scanLock.current = false;
      setCameraAtiva(true);

      return () => {
        setCameraAtiva(false);
        scanLock.current = false;
      };
    }, [])
  );

  // ── NOVA LÓGICA DE VALIDAÇÃO DE QR CODES ─────────────────────────
  const handleScan = useCallback(({ data }) => {
    if (scanLock.current) return;
    scanLock.current = true; // Trava a câmera para não ler 2x seguidas

    let pontos = 0;
    let titulo = '';
    let icone = '';

    // Verifica qual é o texto gravado no QR Code lido
    if (data.startsWith('E_RECICLA_ELETRONICO')) {
      pontos = 50;
      titulo = 'Eletrônico';
      icone = '💻';
    } else if (data.startsWith('E_RECICLA_PAPEL')) {
      pontos = 5;
      titulo = 'Papel';
      icone = '📄';
    } else if (data.startsWith('E_RECICLA_PLASTICO')) {
      pontos = 10;
      titulo = 'Plástico';
      icone = '🥤';
    } else if (data.startsWith('E_RECICLA_VIDRO')) {
      pontos = 15;
      titulo = 'Vidro';
      icone = '🍾';
    } else if (data.startsWith('E_RECICLA_METAL')) {
      pontos = 20;
      titulo = 'Metal';
      icone = '🥫';
    } else {
      // Se não começar com nenhum dos textos acima, é um QR Code inválido
      Alert.alert(
        '❌ QR Code Inválido',
        'Este código não pertence a um ecoponto válido do E-Recicla.',
        [{ text: 'OK', onPress: () => { scanLock.current = false; } }]
      );
      return; // Interrompe a função aqui, não dá pontos
    }

    // Se passou pela validação acima, registra os pontos no Contexto
    const descricaoHistorico = `${icone} Reciclagem: ${titulo}`;
    ganharPontos(pontos, descricaoHistorico);

    // Mostra a mensagem de sucesso
    Alert.alert(
      `${icone} ${titulo} Reciclado!`, 
      `+${pontos} pontos adicionados à sua conta!`, 
      [{ text: 'OK', onPress: () => { scanLock.current = false; } }]
    );

  }, [ganharPontos]);
  // ─────────────────────────────────────────────────────────────

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <QrCode color="#002753" size={60} />
        <Text style={{ marginVertical: 15, textAlign: 'center', color: '#555' }}>
          Precisamos da câmera para escanear os QR Codes dos Ecopontos.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btnTech}>
          <Text style={styles.btnText}>Ativar Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!cameraAtiva) {
    return (
      <View style={styles.center}>
        <QrCode color="#002753" size={60} />
        <Text style={{ marginVertical: 15, color: '#555' }}>Câmera desligada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />
      <View style={styles.scanOverlay}>
        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
          APONTE PARA O QR CODE NO ECOPONTO
        </Text>
      </View>
    </View>
  );
};

export default ScannerScreen;