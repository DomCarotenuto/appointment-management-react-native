// src/screens/AppointmentListScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button
} from 'react-native';
import { supabase } from '../../supabase';
import { useAuth } from '../context/AuthContext';

export default function AppointmentListScreen({ navigation }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('id, type, date_time')
      .eq('user_id', user.id)
      .order('date_time', { ascending: true });
    if (error) console.log('Errore fetch appuntamenti:', error.message);
    else setAppointments(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: item.id })}
    >
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.date}>{new Date(item.date_time).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Bottone Indietro */}
      <View style={styles.backButton}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>I miei appuntamenti</Text>
        <Button title="Nuovo" onPress={() => navigation.navigate('AppointmentForm')} />
      </View>

      {loading ? (
        <ActivityIndicator style={styles.center} />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={appointments.length === 0 && styles.center}
          ListEmptyComponent={<Text>Nessun appuntamento trovato.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { marginBottom: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  type: { fontSize: 18 },
  date: { fontSize: 14, color: '#666' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
