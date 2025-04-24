// src/screens/PatientListScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
  Platform
} from 'react-native';
import { supabase } from '../../supabase';
import { useAuth } from '../context/AuthContext';

export default function PatientListScreen({ navigation }) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) console.log('Errore fetch pazienti:', error.message);
    else setPatients(data);
    setLoading(false);
  };

  // Filtra i pazienti in base alla ricerca
  const filteredPatients = patients.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PatientDetails', { patientId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Bottone Indietro */}
      <View style={styles.backButton}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.title}>Rubrica Pazienti</Text>

      {/* Ricerca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cerca paziente..."
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />

      {/* Nuovo Paziente */}
      <View style={styles.newButton}>
        <Button title="Nuovo Paziente" onPress={() => navigation.navigate('PatientForm')} />
      </View>

      {loading ? (
        <ActivityIndicator style={styles.center} />
      ) : (
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={
            filteredPatients.length === 0 ? styles.center : null
          }
          ListEmptyComponent={<Text>Nessun paziente trovato.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: Platform.OS === 'web' ? 8 : 6,
    marginBottom: 12,
  },
  newButton: { marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 18 },
  phone: { fontSize: 14, color: '#666' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
