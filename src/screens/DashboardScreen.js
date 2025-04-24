// src/screens/DashboardScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Ciao, {user?.email ?? 'utente'}!
      </Text>

      <Button
        title="I miei appuntamenti"
        onPress={() => navigation.navigate('Appointments')}
      />

      <Button
        title="Rubrica pazienti"
        onPress={() => navigation.navigate('Patients')}
      />

      <Button
        title="Impostazioni"
        onPress={() => navigation.navigate('Settings')}
      />

      <View style={styles.logout}>
        <Button title="Esci" color="red" onPress={() => signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  welcome: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  logout: {
    marginTop: 40,
  },
});
