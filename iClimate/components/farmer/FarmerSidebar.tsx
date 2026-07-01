import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { FarmerColors } from '@/constants/farmer-colors';
import { useFarmerUI } from '@/contexts/farmer-ui';
import { CURRENT_FARMER } from '@/contexts/farmer-data';

type NavItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: 'home-outline', route: '/farmer' },
  { label: 'Announcements', icon: 'megaphone-outline', route: '/farmer/announcements' },
  { label: 'Advisories', icon: 'leaf-outline', route: '/farmer/advisories' },
  { label: 'Calendar', icon: 'calendar-outline', route: '/farmer/calendar' },
  { label: 'Notifications', icon: 'notifications-outline', route: '/farmer/notifications' },
  { label: 'Feedback', icon: 'chatbubble-outline', route: '/farmer/feedback' },
  { label: 'Profile', icon: 'person-outline', route: '/farmer/profile' },
];

export function FarmerSidebar() {
  const { sidebarOpen, closeSidebar } = useFarmerUI();
  const router = useRouter();

  const handleNavigate = (route: string) => {
    closeSidebar();
    router.push(route as any);
  };

  return (
    <Modal
      visible={sidebarOpen}
      animationType="fade"
      transparent
      onRequestClose={closeSidebar}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={closeSidebar} />

        <View style={styles.panel}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{CURRENT_FARMER.initials}</Text>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {CURRENT_FARMER.fullName}
            </Text>
            <Text style={styles.subLabel}>{CURRENT_FARMER.farmerId}</Text>
            <Text style={styles.subLabel}>{CURRENT_FARMER.barangay}</Text>
          </View>

          <ScrollView style={styles.navList} showsVerticalScrollIndicator={false}>
            {NAV_ITEMS.map((item) => (
              <Pressable
                key={item.route}
                style={styles.navRow}
                onPress={() => handleNavigate(item.route)}
              >
                <Ionicons name={item.icon} size={20} color={FarmerColors.onDark} />
                <Text style={styles.navLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable style={styles.closeBtn} onPress={closeSidebar}>
            <Ionicons name="close-outline" size={18} color={FarmerColors.onDark} />
            <Text style={styles.closeLabel}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  panel: {
    width: 260,
    backgroundColor: FarmerColors.deepGreen,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: FarmerColors.deepGreenBorder,
    paddingBottom: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: FarmerColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: { color: FarmerColors.onDark, fontWeight: '700', fontSize: 16 },
  name: { color: FarmerColors.onDark, fontWeight: '700', fontSize: 15 },
  subLabel: { color: FarmerColors.onDarkMuted, fontSize: 12, marginTop: 2 },
  navList: { flex: 1 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  navLabel: { color: FarmerColors.onDark, fontSize: 14, fontWeight: '600' },
  closeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: FarmerColors.deepGreenSoft,
    marginTop: 8,
  },
  closeLabel: { color: FarmerColors.onDark, fontWeight: '600', fontSize: 13 },
});