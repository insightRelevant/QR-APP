import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [qrData, setQrData] = useState('');
  const nombreInputRef = useRef(null); // Ref para el campo de nombre

  const handleAbrirFormulario = () => {
    setModalVisible(true);
  };

  const handleCerrarFormulario = () => {
    setModalVisible(false);
  };

  const handleGuardarDatos = () => {
    // Generar el ID único basado en los datos
    const uniqueID = generateUniqueID();
    const data = `${nombre}, ${telefono}, ID: ${uniqueID}`;

    // Guardar el QR Data y cerrar el formulario
    setQrData(data);
    setModalVisible(false);
  };

  const generateUniqueID = () => {
    // Generar un ID único simple para este ejemplo (puedes usar UUID o un método más robusto)
    const timestamp = Date.now().toString();
    const randomNumber = Math.floor(Math.random() * 10000).toString();
    return timestamp + randomNumber;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gestiona tu evento con tu QR con QrAppdroid!</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Escanear QR</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleAbrirFormulario}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Generar acceso a Invitado</Text>
      </TouchableOpacity>

      {/* Modal para el formulario */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCerrarFormulario}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ingrese sus datos:</Text>
              <TextInput
                ref={nombreInputRef}
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(text) => setNombre(text)}
                value={nombre}
                autoFocus={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                onChangeText={(text) => setTelefono(text)}
                value={telefono}
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleGuardarDatos}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={handleCerrarFormulario}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Mostrar QR */}
      {qrData !== '' && (
        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Código QR generado:</Text>
          <QRCode
            value={qrData}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#28a745',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
