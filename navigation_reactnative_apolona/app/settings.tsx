import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerMenu } from '@/components/drawer-menu';

type SettingRow = {
  label: string;
  dotColor: string;
  value?: string;
};

const PROFILE_ROWS: SettingRow[] = [
  { label: 'Active Status', dotColor: '#00d68f', value: 'On' },
  { label: 'Username', dotColor: '#3b9ddd', value: 'm.me/johndoe' },
];

const PREF_ROWS: SettingRow[] = [
  { label: 'Notifications & Sounds', dotColor: '#e84040', value: 'On' },
  { label: 'Dark Mode', dotColor: '#111', value: 'System' },
  { label: 'Data Saver', dotColor: '#25d366', value: 'Off' },
];

const ACCOUNT_ROWS: SettingRow[] = [
  { label: 'Account Settings', dotColor: '#bbb' },
  { label: 'Report Technical Problem', dotColor: '#f5a623' },
  { label: 'Legal & Policies', dotColor: '#bbb' },
];

function SettingsSection({ label, rows }: { label: string; rows: SettingRow[] }) {
  return (
    <>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.group}>
        {rows.map((row, i) => (
          <TouchableOpacity
            key={row.label}
            style={[styles.row, i < rows.length - 1 && styles.rowBorder]}
            activeOpacity={0.7}>
            <View style={[styles.dot, { backgroundColor: row.dotColor }]} />
            <Text style={styles.rowLabel}>{row.label}</Text>
            {row.value ? <Text style={styles.rowValue}>{row.value}</Text> : null}
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#6a00f4" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>JM</Text>
          </View>
          <Text style={styles.profileName}>Jason Magsino</Text>
          <Text style={styles.profileEdit}>Edit Profile</Text>
        </View>

        <SettingsSection label="Profile" rows={PROFILE_ROWS} />
        <SettingsSection label="Preferences" rows={PREF_ROWS} />
        <SettingsSection label="Account & Legal" rows={ACCOUNT_ROWS} />

        <Text style={styles.versionText}>Messenger Clone v1.0.0</Text>
      </ScrollView>

      <TouchableOpacity style={styles.backBar} onPress={() => router.replace('/(tabs)')}>
        <Ionicons name="arrow-undo" size={18} color="#3b9ddd" />
        <Text style={styles.backText}>Back to Chats</Text>
      </TouchableOpacity>

      <DrawerMenu
        visible={drawerOpen}
        activeItem="settings"
        onClose={() => setDrawerOpen(false)}
        onNavigate={(screen) => {
          setDrawerOpen(false);
          if (screen === 'home') router.replace('/(tabs)');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f2f2f7' },
  header: {
    backgroundColor: '#6a00f4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  headerTitle: { flex: 1, color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  body: { flex: 1 },
  profileCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b9ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileInitials: { color: '#fff', fontSize: 26, fontWeight: '700' },
  profileName: { fontSize: 18, fontWeight: '700', color: '#111' },
  profileEdit: { fontSize: 13, color: '#888', marginTop: 2 },
  groupLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  group: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 0,
    marginBottom: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 14,
  },
  rowBorder: { borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  dot: { width: 30, height: 30, borderRadius: 15 },
  rowLabel: { flex: 1, fontSize: 15, color: '#111' },
  rowValue: { fontSize: 14, color: '#aaa' },
  versionText: { textAlign: 'center', fontSize: 12, color: '#aaa', paddingVertical: 12 },
  backBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  backText: { color: '#3b9ddd', fontSize: 13, fontWeight: '500' },
});