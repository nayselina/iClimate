import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FarmerHeader } from '@/components/farmer/FarmerHeader';
import { FarmerColors } from '@/constants/farmer-colors';
import { CURRENT_FARMER, UPDATES_PREVIEW } from '@/contexts/farmer-data';

const TONE_STYLES = {
  warning: { bg: FarmerColors.warningBg, icon: FarmerColors.warningIcon },
  info: { bg: FarmerColors.infoBg, icon: FarmerColors.infoIcon },
} as const;

type QuickAccessItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  iconColor: string;
  onPress: () => void;
};

function getFirstName(fullName: string) {
  return fullName.split(' ')[0];
}

function formatToday() {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = now.getDate();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${weekday}, ${month} ${day} \u00b7 ${time}`;
}

export default function FarmerDashboard() {
  const quickAccess: QuickAccessItem[] = [
    {
      label: 'Announce.',
      icon: 'megaphone-outline',
      bg: '#FCEBD3',
      iconColor: '#C97A1F',
      onPress: () => router.push('/farmer/announcements'),
    },
    {
      label: 'Advisories',
      icon: 'help-buoy-outline',
      bg: '#E3ECFB',
      iconColor: '#3E6FD9',
      onPress: () => router.push('/farmer/advisories'),
    },
    {
      label: 'Calendar',
      icon: 'calendar-outline',
      bg: '#E1F3E7',
      iconColor: FarmerColors.accent,
      onPress: () => router.push('/farmer/calendar'),
    },
    {
      label: 'Notifications',
      icon: 'notifications-outline',
      bg: '#E1F3E7',
      iconColor: FarmerColors.accent,
      onPress: () => router.push('/farmer/notifications'),
    },
    {
      label: 'Feedback',
      icon: 'chatbubble-outline',
      bg: '#FBE3E3',
      iconColor: '#D9453E',
      onPress: () => router.push('/farmer/feedback'),
    },
    {
      label: 'Profile',
      icon: 'person-outline',
      bg: FarmerColors.surfaceMuted,
      iconColor: FarmerColors.textMid,
      onPress: () => router.push('/farmer/profile'),
    },
  ];

  return (
    <View style={styles.screen}>
      <FarmerHeader dateLabel={formatToday()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeBlock}>
          <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeName}>Kuya {getFirstName(CURRENT_FARMER.fullName)}</Text>
            <Text style={styles.wave}>{'\ud83d\udc4b'}</Text>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileHeaderRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{CURRENT_FARMER.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName} numberOfLines={1}>
                {CURRENT_FARMER.fullName}
              </Text>
              <View style={styles.pillRow}>
                <View style={[styles.pill, { backgroundColor: '#FBE7EF' }]}>
                  <Text style={[styles.pillText, { color: '#C74B7C' }]}>{CURRENT_FARMER.barangay.split(',')[0]}</Text>
                </View>
                <View style={[styles.pill, { backgroundColor: FarmerColors.accentSoft }]}>
                  <Text style={[styles.pillText, { color: FarmerColors.accent }]}>
                    {CURRENT_FARMER.farmType} \u00b7 {CURRENT_FARMER.irrigationType}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Farm Area</Text>
              <Text style={styles.statValue}>{CURRENT_FARMER.farmAreaHa.toFixed(2)} ha</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Current Yield</Text>
              <Text style={styles.statValue}>{CURRENT_FARMER.currentYieldTHa.toFixed(1)} t/ha</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <Pressable onPress={() => router.push('/farmer/announcements')} hitSlop={8}>
            <Text style={styles.viewAll}>View all \u2192</Text>
          </Pressable>
        </View>

        {UPDATES_PREVIEW.map((update) => {
          const tone = TONE_STYLES[update.tone];
          return (
            <View key={update.id} style={styles.updateCard}>
              <View style={[styles.updateIcon, { backgroundColor: tone.bg }]}>
                <Ionicons name={update.icon} size={17} color={tone.icon} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.updateLabel}>{update.label}</Text>
                <Text style={styles.updateExcerpt}>{update.excerpt}</Text>
                <Text style={styles.updateTime}>{update.time}</Text>
              </View>
            </View>
          );
        })}

        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Quick Access</Text>
        <View style={styles.quickGrid}>
          {quickAccess.map((item) => (
            <Pressable key={item.label} style={styles.quickTile} onPress={item.onPress}>
              <View style={[styles.quickIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={18} color={item.iconColor} />
              </View>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: FarmerColors.bg },
  content: { padding: 16, paddingBottom: 32 },

  welcomeBlock: { marginBottom: 16 },
  welcomeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: FarmerColors.textFaint,
    marginBottom: 4,
  },
  welcomeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  welcomeName: { fontSize: 22, fontWeight: '800', color: FarmerColors.textDark },
  wave: { fontSize: 20 },

  profileCard: {
    backgroundColor: FarmerColors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  profileHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: FarmerColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  profileName: { fontSize: 15, fontWeight: '700', color: FarmerColors.textDark, marginBottom: 6 },
  pillRow: { flexDirection: 'row', gap: 6 },
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  pillText: { fontSize: 10.5, fontWeight: '700' },

  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: FarmerColors.border,
    paddingTop: 14,
  },
  statBlock: { flex: 1 },
  statLabel: { fontSize: 11.5, color: FarmerColors.textFaint, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '800', color: FarmerColors.textDark },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: FarmerColors.textDark, letterSpacing: 0.2 },
  viewAll: { fontSize: 12.5, fontWeight: '700', color: FarmerColors.accent },

  updateCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: FarmerColors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  updateIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateLabel: { fontSize: 12.5, fontWeight: '700', color: FarmerColors.textDark, marginBottom: 3 },
  updateExcerpt: { fontSize: 12, color: FarmerColors.textMid, lineHeight: 17, marginBottom: 6 },
  updateTime: { fontSize: 10.5, color: FarmerColors.textFaint, fontWeight: '600' },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickTile: {
    width: '31%',
    backgroundColor: FarmerColors.card,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: { fontSize: 11.5, fontWeight: '700', color: FarmerColors.textDark },
});