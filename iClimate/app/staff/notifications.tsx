import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffColors } from '@/constants/staff-colors';
import { AppNotification, NotificationType, STAFF_NOTIFICATIONS } from '@/contexts/staff-data';

const TYPE_STYLE: Record<NotificationType, { bg: string; icon: keyof typeof Ionicons.glyphMap; iconColor: string; accent: string }> = {
  warning: { bg: StaffColors.warningBg, icon: 'warning-outline', iconColor: StaffColors.warningIcon, accent: StaffColors.warningIcon },
  info: { bg: StaffColors.infoBg, icon: 'time-outline', iconColor: StaffColors.infoIcon, accent: StaffColors.infoIcon },
  success: { bg: StaffColors.successBg, icon: 'checkmark-circle-outline', iconColor: StaffColors.successIcon, accent: StaffColors.successIcon },
  announcement: { bg: StaffColors.neutralBg, icon: 'megaphone-outline', iconColor: StaffColors.neutralIcon, accent: StaffColors.neutralIcon },
  advisory: { bg: StaffColors.infoBg, icon: 'help-buoy-outline', iconColor: StaffColors.infoIcon, accent: StaffColors.infoIcon },
};

export default function StaffNotificationsScreen() {
  const [items, setItems] = useState<AppNotification[]>(STAFF_NOTIFICATIONS);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StaffHeader title="Notifications" />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Pressable onPress={markAllRead} style={styles.markAllRow} hitSlop={8}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </Pressable>
        }
        renderItem={({ item }) => {
          const tone = TYPE_STYLE[item.type];
          return (
            <View style={[styles.card, item.unread && { borderLeftColor: tone.accent, borderLeftWidth: 3 }]}>
              <View style={[styles.iconCircle, { backgroundColor: tone.bg }]}>
                <Ionicons name={tone.icon} size={17} color={tone.iconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.timeAgo}</Text>
              </View>
              {item.unread ? <View style={styles.unreadDot} /> : null}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={28} color={StaffColors.textFaint} />
            <Text style={styles.emptyText}>You&apos;re all caught up.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: StaffColors.bg },
  content: { padding: 16, paddingBottom: 32 },
  markAllRow: { alignItems: 'flex-end', marginBottom: 14 },
  markAllText: { fontSize: 12.5, fontWeight: '700', color: StaffColors.accent },

  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: StaffColors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 13.5, fontWeight: '700', color: StaffColors.textDark, marginBottom: 3 },
  message: { fontSize: 12, color: StaffColors.textMid, lineHeight: 17, marginBottom: 6 },
  time: { fontSize: 10.5, color: StaffColors.textFaint, fontWeight: '600' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: StaffColors.accent,
    marginTop: 4,
  },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 13, color: StaffColors.textFaint },
});