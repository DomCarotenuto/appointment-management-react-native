// src/screens/SettingsScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { session } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Impostazioni</Text>

      <View style={styles.row}>
        <Text>Modalità:</Text>
        <Button
          title={theme === 'light' ? 'Passa a Dark' : 'Passa a Light'}
          onPress={toggleTheme}
        />
      </View>

      <View style={styles.row}>
        <Text>Notifica:</Text>
        <Text style={styles.text}>
          {session?.user?.id
            ? '30 minuti prima'  // placeholder, poi leggerai da user_settings
            : '—'}
        </Text>
      </View>

      {/* In futuro aggiungeremo picker o slider per cambiare offset notifiche */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
});
