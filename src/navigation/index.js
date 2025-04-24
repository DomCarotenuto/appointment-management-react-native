import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';          // <-- import
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AppointmentListScreen from '../screens/AppointmentListScreen';
import AppointmentFormScreen from '../screens/AppointmentFormScreen';
import AppointmentDetailsScreen from '../screens/AppointmentDetailsScreen';
import PatientListScreen from '../screens/PatientListScreen';
import PatientFormScreen from '../screens/PatientFormScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // UTENTE LOGGATO
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Appointments" component={AppointmentListScreen} />
          <Stack.Screen name="AppointmentForm" component={AppointmentFormScreen} />
          <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
          <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
          <Stack.Screen name="Patients" component={PatientListScreen} />
          <Stack.Screen name="PatientForm" component={PatientFormScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        // UTENTE GUEST
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

