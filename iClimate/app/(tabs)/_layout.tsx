import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="create-account" />
        <Stack.Screen name="farmer" />
        <Stack.Screen name="staff" />
        <Stack.Screen name="it" />
      </Stack>
    </SafeAreaProvider>
  );
}