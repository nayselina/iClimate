import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ItHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IT Staff Dashboard</Text>
      <Text style={styles.subtitle}>Welcome! Build the IT experience here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 14, color: '#666' },
});