import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ITColors } from '@/constants/it-colors';
import { useITUI } from '@/contexts/it-ui';
import { IT_NOTIFICATIONS, ITNotification, ITNotificationType } from '@/contexts/it-data';

const TYPE_STYLE: Record<ITNotificationType, { bg: string; icon: keyof typeof Ionicons.glyphMap; iconColor: string }> = {
  warning: { bg: ITColors.warningBg, icon: 'warning-outline', iconColor: ITColors.warningIcon },
  info: { bg: ITColors.infoBg, icon: 'time-outline', iconColor: ITColors.infoIcon },
  success: { bg: ITColors.successBg, icon: 'checkmark-circle-outline', iconColor: ITColors.successIcon },
};

export function ITNotificationsPanel() {
  const { notificationsOpen, closeNotifications } = useITUI();
  const [items, setItems] = useState<ITNotification[]>(IT_NOTIFICATIONS);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <Modal
      visible={notificationsOpen}
      animationType="fade"
      transparent
      onRequestClose={closeNotifications}
      statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={closeNotifications}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Pressable onPress={markAllRead} hitSlop={8}>
              <Text style={styles.markAll}>Mark all read</Text>
            </Pressable>
          </View>

          {items.map((item) => {
            const tone = TYPE_STYLE[item.type];
            return (
              <View key={item.id} style={styles.row}>
                <View style={[styles.iconCircle, { backgroundColor: tone.bg }]}>
                  <Ionicons name={tone.icon} size={16} color={tone.iconColor} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.message}>{item.message}</Text>
                  <Text style={styles.time}>{item.timeAgo}</Text>
                </View>
              </View>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  panel: {
    position: 'absolute',
    top: 100,
    right: 16,
    left: 16,
    backgroundColor: ITColors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: { fontSize: 15, fontWeight: '800', color: ITColors.textDark },
  markAll: { fontSize: 12, fontWeight: '700', color: ITColors.accent },

  row: { flexDirection: 'row', gap: 10, paddingVertical: 10, alignItems: 'flex-start' },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 13, fontWeight: '700', color: ITColors.textDark, marginBottom: 2 },
  message: { fontSize: 11.5, color: ITColors.textMid, lineHeight: 16, marginBottom: 4 },
  time: { fontSize: 10, color: ITColors.textFaint, fontWeight: '700' },
});