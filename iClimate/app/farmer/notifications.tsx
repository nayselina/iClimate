import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { FarmerHeader } from '@/components/farmer/FarmerHeader';
import { FarmerColors } from '@/constants/farmer-colors';
import { AppNotification, NOTIFICATIONS, NotificationType } from '@/contexts/farmer-data';

const TYPE_STYLE: Record<NotificationType, { bg: string; icon: keyof typeof Ionicons.glyphMap; iconColor: string; accent: string }> = {
  warning: { bg: FarmerColors.warningBg, icon: 'warning-outline', iconColor: FarmerColors.warningIcon, accent: FarmerColors.warningIcon },
  info: { bg: FarmerColors.infoBg, icon: 'time-outline', iconColor: FarmerColors.infoIcon, accent: FarmerColors.infoIcon },
  success: { bg: FarmerColors.successBg, icon: 'checkmark-circle-outline', iconColor: FarmerColors.successIcon, accent: FarmerColors.successIcon },
  announcement: { bg: FarmerColors.neutralBg, icon: 'megaphone-outline', iconColor: FarmerColors.neutralIcon, accent: FarmerColors.neutralIcon },
  advisory: { bg: FarmerColors.infoBg, icon: 'help-buoy-outline', iconColor: FarmerColors.infoIcon, accent: FarmerColors.infoIcon },
};

export default function NotificationsScreen() {
  const [items, setItems] = useState<AppNotification[]>(NOTIFICATIONS);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <View style={styles.screen}>
      <FarmerHeader title="Notifications" />

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
            <Ionicons name="notifications-off-outline" size={28} color={FarmerColors.textFaint} />
            <Text style={styles.emptyText}>You&apos;re all caught up.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: FarmerColors.bg },
  content: { padding: 16, paddingBottom: 32 },
  markAllRow: { alignItems: 'flex-end', marginBottom: 14 },
  markAllText: { fontSize: 12.5, fontWeight: '700', color: FarmerColors.accent },

  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: FarmerColors.card,
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
  title: { fontSize: 13.5, fontWeight: '700', color: FarmerColors.textDark, marginBottom: 3 },
  message: { fontSize: 12, color: FarmerColors.textMid, lineHeight: 17, marginBottom: 6 },
  time: { fontSize: 10.5, color: FarmerColors.textFaint, fontWeight: '600' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: FarmerColors.accent,
    marginTop: 4,
  },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 13, color: FarmerColors.textFaint },
});