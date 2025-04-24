// src/screens/AppointmentDetailsScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { supabase } from '../../supabase';

export default function AppointmentDetailsScreen({ route, navigation }) {
  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      // 1) Prendi i dettagli dell'appuntamento
      const { data: appt, error: apptError } = await supabase
        .from('appointments')
        .select('type, date_time, notes, patient_id')
        .eq('id', appointmentId)
        .single();
      if (apptError) {
        console.log('Errore fetch appointment:', apptError.message);
        setLoading(false);
        return;
      }
      setAppointment(appt);

      // 2) Prendi il nome del paziente collegato
      const { data: pat, error: patError } = await supabase
        .from('patients')
        .select('name')
        .eq('id', appt.patient_id)
        .single();
      if (patError) console.log('Errore fetch patient:', patError.message);
      else setPatientName(pat.name);

      setLoading(false);
    };
    fetchDetails();
  }, [appointmentId]);

  if (loading) {
    return <ActivityIndicator style={styles.center} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButton}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.label}>Paziente:</Text>
      <Text style={styles.value}>{patientName}</Text>

      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.value}>{appointment.type}</Text>

      <Text style={styles.label}>Data e Ora:</Text>
      <Text style={styles.value}>
        {new Date(appointment.date_time).toLocaleString()}
      </Text>

      <Text style={styles.label}>Note:</Text>
      <Text style={styles.value}>{appointment.notes}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  value: { fontSize: 16, marginTop: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
