import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo o immagine di benvenuto */}
      <Image
        source={require('../assets/logo.png')} // metti qui il tuo logo, o commenta se non ce l'hai
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Benvenuto in Appointment Manager</Text>
      <Text style={styles.subtitle}>Organizza facilmente i tuoi appuntamenti</Text>

      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Accedi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Registrati</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#007AFF',
  },
  signUpButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
