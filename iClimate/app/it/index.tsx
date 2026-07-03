import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITHeader } from '@/components/it/ITHeader';
import { ITColors } from '@/constants/it-colors';
import { CURRENT_IT_USER, RECENT_ACTIVITY, SYSTEM_STATS } from '@/contexts/it-data';

const ACTIVITY_TONE = {
  success: { bg: ITColors.successBg, icon: ITColors.successIcon, badgeBg: '#E1F3E7', badgeText: '#1E8A4C', badgeLabel: 'SUCCESS' },
  warning: { bg: ITColors.warningBg, icon: ITColors.warningIcon, badgeBg: '#FBE3E3', badgeText: '#D9453E', badgeLabel: 'WARNING' },
  info: { bg: ITColors.infoBg, icon: ITColors.infoIcon, badgeBg: '#E3ECFB', badgeText: '#3E6FD9', badgeLabel: 'INFO' },
} as const;

function formatToday() {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = now.getDate();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${weekday}, ${month} ${day} \u00b7 ${time}`;
}

function getFirstName(fullName: string) {
  return fullName.split(' ')[0];
}

export default function ITDashboard() {
  const quickAccess = [
    {
      label: 'Users',
      icon: 'people-outline' as const,
      bg: '#E3ECFB',
      iconColor: '#3E6FD9',
      onPress: () => router.push('/it/users'),
    },
    {
      label: 'Reports',
      icon: 'bar-chart-outline' as const,
      bg: '#E1F3E7',
      iconColor: ITColors.accent,
      onPress: () => router.push('/it/reports'),
    },
    {
      label: 'Settings',
      icon: 'settings-outline' as const,
      bg: '#EFE7FB',
      iconColor: '#7C5CD9',
      onPress: () => router.push('/it/settings'),
    },
  ];

  return (
    <View style={styles.screen}>
      <ITHeader dateLabel={formatToday()} />

      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
            <View style={styles.welcomeRow}>
              <Text style={styles.welcomeName}>{getFirstName(CURRENT_IT_USER.fullName)} Personnel</Text>
              <Text style={styles.wave}>{'\ud83d\udc4b'}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>SYSTEM OVERVIEW</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: ITColors.surfaceMuted }]}>
                <Ionicons name="people-outline" size={18} color={ITColors.textMid} />
              </View>
              <Text style={styles.statLabel}>TOTAL USERS</Text>
              <Text style={styles.statValue}>{SYSTEM_STATS.totalUsers}</Text>
              <Text style={styles.statDeltaPositive}>{'\u2197'} {SYSTEM_STATS.totalUsersDelta}</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: ITColors.infoBg }]}>
                <Ionicons name="location-outline" size={18} color={ITColors.infoIcon} />
              </View>
              <Text style={styles.statLabel}>TOTAL FARMERS</Text>
              <Text style={styles.statValue}>{SYSTEM_STATS.totalFarmers}</Text>
              <Text style={styles.statSub}>
                MAO: {SYSTEM_STATS.farmersByOffice.mao} \u00b7 IT: {SYSTEM_STATS.farmersByOffice.it}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FCEBD3' }]}>
                <Ionicons name="megaphone-outline" size={18} color="#C97A1F" />
              </View>
              <Text style={styles.statLabel}>ANNOUNCEMENTS</Text>
              <Text style={styles.statValue}>{SYSTEM_STATS.announcements}</Text>
              <Text style={styles.statDeltaPositive}>{'\u2197'} {SYSTEM_STATS.announcementsStatus}</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#EFE7FB' }]}>
                <Ionicons name="bulb-outline" size={18} color="#7C5CD9" />
              </View>
              <Text style={styles.statLabel}>ADVISORIES</Text>
              <Text style={styles.statValue}>{SYSTEM_STATS.advisories}</Text>
              <Text style={styles.statSubPurple}>{SYSTEM_STATS.advisoriesStatus}</Text>
            </View>
          </View>

          <View style={styles.systemStatusCard}>
            <Ionicons name="lock-closed-outline" size={16} color={ITColors.infoIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.systemStatusTitle}>System Status: Healthy</Text>
              <Text style={styles.systemStatusDetail}>
                Database {SYSTEM_STATS.dbUsedGb}/{SYSTEM_STATS.dbTotalGb} GB used \u00b7 {SYSTEM_STATS.uptimePct}% uptime
              </Text>
              <Text style={styles.systemStatusDetail}>
                PAGASA API {SYSTEM_STATS.pagasaConnected ? 'connected and syncing.' : 'disconnected.'}
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 22 }]}>QUICK ACCESS</Text>
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

          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { marginTop: 0 }]}>RECENT ACTIVITY</Text>
            <Text style={styles.viewAll}>View all {'\u2192'}</Text>
          </View>

          {RECENT_ACTIVITY.map((activity) => {
            const tone = ACTIVITY_TONE[activity.tone];
            return (
              <View key={activity.id} style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: tone.bg }]}>
                  <Ionicons name={activity.icon} size={16} color={tone.icon} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.activityTopRow}>
                    <Text style={styles.activityLabel} numberOfLines={1}>{activity.label}</Text>
                    <View style={[styles.activityBadge, { backgroundColor: tone.badgeBg }]}>
                      <Text style={[styles.activityBadgeText, { color: tone.badgeText }]}>{tone.badgeLabel}</Text>
                    </View>
                  </View>
                  <Text style={styles.activityDetail}>{activity.detail}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: ITColors.bg },
  content: { padding: 16, paddingBottom: 32 },

  welcomeBlock: { marginBottom: 18 },
  welcomeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: ITColors.textFaint,
    marginBottom: 4,
  },
  welcomeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  welcomeName: { fontSize: 22, fontWeight: '800', color: ITColors.textDark },
  wave: { fontSize: 20 },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: ITColors.textFaint,
    marginBottom: 12,
  },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCard: {
    width: '47.5%',
    backgroundColor: ITColors.card,
    borderRadius: 16,
    padding: 14,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3, color: ITColors.textFaint, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '800', color: ITColors.textDark, marginBottom: 4 },
  statDeltaPositive: { fontSize: 10.5, fontWeight: '700', color: ITColors.accent },
  statSub: { fontSize: 10.5, fontWeight: '600', color: ITColors.infoIcon },
  statSubPurple: { fontSize: 10.5, fontWeight: '600', color: '#7C5CD9' },

  systemStatusCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: ITColors.infoBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'flex-start',
  },
  systemStatusTitle: { fontSize: 12.5, fontWeight: '800', color: ITColors.textDark, marginBottom: 4 },
  systemStatusDetail: { fontSize: 11.5, color: ITColors.textMid, lineHeight: 16 },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  quickTile: {
    width: '31%',
    backgroundColor: ITColors.card,
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
  quickLabel: { fontSize: 11.5, fontWeight: '700', color: ITColors.textDark },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  viewAll: { fontSize: 12.5, fontWeight: '700', color: ITColors.accent },

  activityCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: ITColors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3, gap: 8 },
  activityLabel: { fontSize: 12.5, fontWeight: '700', color: ITColors.textDark, flexShrink: 1 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  activityBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  activityDetail: { fontSize: 11.5, color: ITColors.textMid, lineHeight: 16, marginBottom: 5 },
  activityTime: { fontSize: 10.5, color: ITColors.textFaint, fontWeight: '600' },
});