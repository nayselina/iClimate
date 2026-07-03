import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffColors } from '@/constants/staff-colors';
import { STAFF_NOTIFICATIONS } from '@/contexts/staff-data';
import { useStaffUI } from '@/contexts/staff-ui';

const TYPE_ICON: Record<string, { icon: keyof typeof Ionicons.glyphMap; bg: string; color: string }> = {
  warning: { icon: 'warning-outline', bg: StaffColors.warningBg, color: StaffColors.warningIcon },
  info: { icon: 'time-outline', bg: StaffColors.infoBg, color: StaffColors.infoIcon },
  success: { icon: 'checkmark-circle-outline', bg: StaffColors.successBg, color: StaffColors.successIcon },
  announcement: { icon: 'megaphone-outline', bg: StaffColors.neutralBg, color: StaffColors.neutralIcon },
  advisory: { icon: 'help-buoy-outline', bg: StaffColors.infoBg, color: StaffColors.infoIcon },
};

type StaffHeaderProps = {
  title?: string;
  dateLabel?: string;
};

export function StaffHeader({ title, dateLabel }: StaffHeaderProps) {
  const { toggleSidebar } = useStaffUI();
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = STAFF_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={toggleSidebar} style={styles.iconButton} hitSlop={8}>
          <Ionicons name="menu" size={20} color="#ffffff" />
        </Pressable>

        <View style={styles.titleWrap}>
          {dateLabel ? (
            <Text style={styles.dateLabel} numberOfLines={1}>
              {dateLabel}
            </Text>
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        <Pressable onPress={() => setNotifOpen(true)} style={styles.iconButton} hitSlop={8}>
          <Ionicons name="notifications-outline" size={19} color="#ffffff" />
          {unreadCount > 0 ? <View style={styles.badgeDot} /> : null}
        </Pressable>
      </View>

      <Modal visible={notifOpen} transparent animationType="fade" onRequestClose={() => setNotifOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setNotifOpen(false)}>
          <Pressable style={styles.notifPanel} onPress={(e) => e.stopPropagation()}>
            <View style={styles.notifHeaderRow}>
              <Text style={styles.notifHeaderTitle}>Notifications</Text>
              <Pressable
                hitSlop={6}
                onPress={() => {
                  setNotifOpen(false);
                  router.push('/staff/notifications' as never);
                }}>
                <Text style={styles.markAllReadText}>Mark all read</Text>
              </Pressable>
            </View>

            {STAFF_NOTIFICATIONS.slice(0, 3).map((n) => {
              const tone = TYPE_ICON[n.type];
              return (
                <View key={n.id} style={styles.notifRow}>
                  <View style={[styles.notifIcon, { backgroundColor: tone.bg }]}>
                    <Ionicons name={tone.icon} size={15} color={tone.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notifTitle}>{n.title}</Text>
                    <Text style={styles.notifMessage}>{n.message}</Text>
                  </View>
                  <Text style={styles.notifTime}>{n.timeAgo}</Text>
                </View>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: StaffColors.deepGreen },
  header: {
    backgroundColor: StaffColors.deepGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  titleWrap: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  title: { fontSize: 16, fontWeight: '800', color: '#ffffff' },
  dateLabel: { fontSize: 12.5, fontWeight: '700', color: 'rgba(255,255,255,0.85)', letterSpacing: 0.2 },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F5B342',
    borderWidth: 1.5,
    borderColor: StaffColors.deepGreen,
  },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  notifPanel: {
    position: 'absolute',
    top: 90,
    right: 16,
    left: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  notifHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  notifHeaderTitle: { fontSize: 14.5, fontWeight: '800', color: StaffColors.textDark },
  markAllReadText: { fontSize: 12, fontWeight: '700', color: StaffColors.accent },
  notifRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 10 },
  notifIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: 12.5, fontWeight: '700', color: StaffColors.textDark, marginBottom: 2 },
  notifMessage: { fontSize: 11.5, color: StaffColors.textMid, lineHeight: 15 },
  notifTime: { fontSize: 10, fontWeight: '700', color: StaffColors.textFaint },
});