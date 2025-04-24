// src/screens/PatientFormScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../../supabase';

export default function PatientFormScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setError(null);
    // Recupera sessione e user_id
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session.user.id;

    // Inserisci il nuovo paziente
    const { error } = await supabase
      .from('patients')
      .insert([{
        user_id: userId,
        name: `${firstName} ${lastName}`,   // campo obbligatorio
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        notes: notes
    }]);

    if (error) {
      console.log('Errore salvataggio paziente:', error.message);
      setError(error.message);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nuovo Paziente</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Nome"
      />

      <Text style={styles.label}>Cognome:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Cognome"
      />

      <Text style={styles.label}>Numero di telefono:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Telefono"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={[styles.input, styles.notes]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Note"
        multiline
      />

      <View style={styles.buttons}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
        <Button title="Salva" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  notes: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
