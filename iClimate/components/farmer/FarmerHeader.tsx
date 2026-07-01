import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FarmerColors } from '@/constants/farmer-colors';
import { useFarmerUI } from '@/contexts/farmer-ui';

type FarmerHeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
};

export function FarmerHeader({
  title,
  showBack = false,
  onBackPress,
  rightAction,
}: FarmerHeaderProps) {
  const { openSidebar } = useFarmerUI();

  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {showBack ? (
          <Pressable onPress={onBackPress} hitSlop={10} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color={FarmerColors.onDark} />
          </Pressable>
        ) : (
          <Pressable onPress={openSidebar} hitSlop={10} style={styles.iconBtn}>
            <Ionicons name="menu" size={24} color={FarmerColors.onDark} />
          </Pressable>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.side, styles.rightSide]}>
        {rightAction ?? <View style={styles.iconBtn} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: FarmerColors.deepGreen,
    paddingTop: 44,
    paddingBottom: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: FarmerColors.deepGreenBorder,
  },
  side: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FarmerColors.deepGreenSoft,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: FarmerColors.onDark,
  },
});