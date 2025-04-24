// src/screens/AppointmentFormScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AppointmentFormScreen({ navigation }) {
  const [type, setType] = useState('manuale');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');

  // Carica la rubrica pazienti per l'utente
  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.log('Errore fetch pazienti:', error.message);
      } else {
        setPatients(data);
        setPatientId(data.length > 0 ? data[0].id : '');
      }
    };
    fetchPatients();
  }, []);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const formatDateInputValue = () => date.toISOString().slice(0, 16);
  const onWebDateChange = (e) => setDate(new Date(e.target.value));

  const handleSave = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session.user.id;

    const { error } = await supabase
      .from('appointments')
      .insert([{ user_id: userId, patient_id: patientId, type, date_time: date.toISOString(), notes }]);

    if (error) console.log('Errore salvataggio appuntamento:', error.message);
    else navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Bottone per tornare indietro */}
      <View style={styles.backButton}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.label}>Paziente:</Text>
      <Picker
        selectedValue={patientId}
        onValueChange={setPatientId}
        style={styles.picker}
      >
        {patients.map((p) => (
          <Picker.Item key={p.id} label={p.name} value={p.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Tipo:</Text>
      <Picker
        selectedValue={type}
        onValueChange={setType}
        style={styles.picker}
      >
        <Picker.Item label="Manuale" value="manuale" />
        <Picker.Item label="Strumentale" value="strumentale" />
        <Picker.Item label="Combinato" value="combinato" />
      </Picker>

      <Text style={styles.label}>Data e Ora:</Text>
      {Platform.OS === 'web' ? (
        <input
          style={styles.input}
          type="datetime-local"
          value={formatDateInputValue()}
          onChange={onWebDateChange}
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
            <Text>{date.toLocaleString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={[styles.input, styles.notes]}
        placeholder="Aggiungi note"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* Bottone per salvare l'appuntamento */}
      <Button title="Salva Appuntamento" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { marginBottom: 16 },
  label: { fontSize: 16, marginTop: 12, marginBottom: 4 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 12 },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  notes: { height: 80 },
});
