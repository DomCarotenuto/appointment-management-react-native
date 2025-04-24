// src/screens/SignUpScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loading } = useAuth();
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    setError(null);
    const { error } = await signUp(email, password);
    if (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrati</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Registrati" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
