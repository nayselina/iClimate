import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITHeader } from '@/components/it/ITHeader';
import { ITColors } from '@/constants/it-colors';
import { CURRENT_IT_USER } from '@/contexts/it-data';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function SettingsScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing information', 'Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match', 'New password and confirmation must match.');
      return;
    }
    setSubmitting(true);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      Alert.alert('Password Updated', 'Your password has been changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ITHeader title="Account Settings" />

      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{CURRENT_IT_USER.initials}</Text>
            </View>
            <Text style={styles.name}>{CURRENT_IT_USER.fullName}</Text>
            <Text style={styles.subLabel}>{CURRENT_IT_USER.email}</Text>
          </View>

          <Text style={styles.sectionTitle}>ACCOUNT INFORMATION</Text>
          <View style={styles.card}>
            <InfoRow label="Role" value={CURRENT_IT_USER.role} />
            <InfoRow label="Municipality" value={CURRENT_IT_USER.municipality} />
            <InfoRow label="Last Login" value={CURRENT_IT_USER.lastLogin} />
          </View>

          <Text style={styles.sectionTitle}>CHANGE PASSWORD</Text>

          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            placeholderTextColor={ITColors.textFaint}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor={ITColors.textFaint}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter new password"
            placeholderTextColor={ITColors.textFaint}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Pressable
            style={[styles.updateButton, submitting && { opacity: 0.7 }]}
            onPress={handleUpdatePassword}
            disabled={submitting}>
            <Ionicons name="lock-closed" size={15} color="#ffffff" />
            <Text style={styles.updateButtonText}>
              {submitting ? 'Updating...' : 'Update Password'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.logoutButton}
            onPress={() => router.replace('/login')}>
            <Ionicons name="log-out-outline" size={15} color="#D9453E" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: ITColors.bg },
  content: { padding: 16, paddingBottom: 40 },

  profileHeader: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3E7FA8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#ffffff', fontSize: 24, fontWeight: '800' },
  name: { fontSize: 17, fontWeight: '800', color: ITColors.textDark, marginBottom: 2 },
  subLabel: { fontSize: 12.5, color: ITColors.textFaint },

  sectionTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: ITColors.accent,
    marginBottom: 10,
    marginTop: 4,
  },

  card: {
    backgroundColor: ITColors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: ITColors.border,
  },
  infoLabel: { fontSize: 12.5, color: ITColors.textFaint },
  infoValue: { fontSize: 13, fontWeight: '700', color: ITColors.textDark },

  label: { fontSize: 12.5, fontWeight: '700', color: ITColors.textDark, marginBottom: 8, marginTop: 4 },
  input: {
    backgroundColor: ITColors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ITColors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13.5,
    color: ITColors.textDark,
    marginBottom: 16,
  },

  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: ITColors.deepGreen,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 12,
  },
  updateButtonText: { color: '#ffffff', fontSize: 14.5, fontWeight: '700' },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FBE3E3',
    borderRadius: 12,
    paddingVertical: 14,
  },
  logoutButtonText: { color: '#D9453E', fontSize: 14, fontWeight: '700' },
});