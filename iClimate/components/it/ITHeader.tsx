import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITColors } from '@/constants/it-colors';
import { useITUI } from '@/contexts/it-ui';
import { IT_NOTIFICATIONS } from '@/contexts/it-data';

type ITHeaderProps = {
  title?: string;
  dateLabel?: string;
};

export function ITHeader({ title, dateLabel }: ITHeaderProps) {
  const { openSidebar, toggleNotifications } = useITUI();
  const unreadCount = IT_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={openSidebar} hitSlop={10} style={styles.iconButton}>
          <Ionicons name="menu" size={20} color="#ffffff" />
        </Pressable>

        {dateLabel ? (
          <Text style={styles.dateLabel}>{dateLabel}</Text>
        ) : (
          <Text style={styles.titleLabel}>{title}</Text>
        )}

        <Pressable onPress={toggleNotifications} hitSlop={10} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={19} color="#ffffff" />
          {unreadCount > 0 ? <View style={styles.badge} /> : null}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: ITColors.headerBg },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ITColors.headerBg,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ITColors.gold,
  },
  dateLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: ITColors.textOnDarkFaint,
  },
  titleLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
});