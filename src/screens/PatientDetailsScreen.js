// src/screens/PatientDetailsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { supabase } from '../../supabase';

export default function PatientDetailsScreen({ route, navigation }) {
  const { patientId } = route.params;
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('first_name, last_name, phone, notes')
        .eq('id', patientId)
        .single();
      if (error) {
        console.log('Errore fetch paziente:', error.message);
      } else {
        setPatient(data);
      }
      setLoading(false);
    };
    fetchPatient();
  }, [patientId]);

  if (loading) {
    return <ActivityIndicator style={styles.center} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButton}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{patient.first_name}</Text>

      <Text style={styles.label}>Cognome:</Text>
      <Text style={styles.value}>{patient.last_name}</Text>

      <Text style={styles.label}>Telefono:</Text>
      <Text style={styles.value}>{patient.phone}</Text>

      <Text style={styles.label}>Note:</Text>
      <Text style={styles.value}>{patient.notes}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
