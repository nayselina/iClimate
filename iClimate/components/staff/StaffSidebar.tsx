import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffColors } from '@/constants/staff-colors';
import { CURRENT_OFFICER } from '@/contexts/staff-data';
import { useStaffUI } from '@/contexts/staff-ui';

type NavItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home-outline', route: '/staff' },
  { key: 'announcements', label: 'Manage Announce.', icon: 'megaphone-outline', route: '/staff/announcements' },
  { key: 'advisories', label: 'Manage Advisories', icon: 'help-buoy-outline', route: '/staff/advisories' },
  { key: 'calendar', label: 'Manage Calendar', icon: 'calendar-outline', route: '/staff/calendar' },
  { key: 'feedback', label: 'View Feedback', icon: 'chatbubble-outline', route: '/staff/feedback' },
];

export function StaffSidebar() {
  const { sidebarOpen, closeSidebar } = useStaffUI();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    closeSidebar();
    router.push(route as never);
  };

  const handleLogout = () => {
    closeSidebar();
    router.replace('/login' as never);
  };

  return (
    <Modal visible={sidebarOpen} transparent animationType="fade" onRequestClose={closeSidebar}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={closeSidebar} />

        <SafeAreaView edges={['top', 'bottom']} style={styles.panel}>
          <View style={styles.profileBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{CURRENT_OFFICER.initials}</Text>
            </View>
            <Text style={styles.officerName}>{CURRENT_OFFICER.role}</Text>
            <Text style={styles.officeName}>{CURRENT_OFFICER.office}</Text>
          </View>

          <View style={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.route;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => handleNavigate(item.route)}
                  style={[styles.navRow, active && styles.navRowActive]}>
                  <Ionicons name={item.icon} size={18} color={active ? '#ffffff' : 'rgba(255,255,255,0.75)'} />
                  <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.spacer} />

          <Pressable style={styles.logoutRow} onPress={handleLogout} hitSlop={6}>
            <Ionicons name="log-out-outline" size={18} color="#E38472" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  panel: {
    width: '82%',
    maxWidth: 320,
    backgroundColor: StaffColors.deepGreen,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
  },

  profileBlock: { marginBottom: 28 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: StaffColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: { color: '#ffffff', fontSize: 19, fontWeight: '800' },
  officerName: { fontSize: 16.5, fontWeight: '800', color: '#ffffff', marginBottom: 2 },
  officeName: { fontSize: 12.5, color: 'rgba(255,255,255,0.55)' },

  navList: { gap: 4 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  navRowActive: { backgroundColor: 'rgba(255,255,255,0.1)' },
  navLabel: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.75)' },
  navLabelActive: { color: '#ffffff', fontWeight: '700' },

  spacer: { flex: 1 },

  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: '#E38472' },
});