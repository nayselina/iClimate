import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffColors } from '@/constants/staff-colors';
import { DASHBOARD_STATS, QUICK_MANAGEMENT } from '@/contexts/staff-data';

function formatToday() {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = now.getDate();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${weekday}, ${month} ${day} \u00b7 ${time}`;
}

export default function StaffDashboard() {
  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StaffHeader dateLabel={formatToday()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeLabel}>WELCOME BACK</Text>

        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsGrid}>
          {DASHBOARD_STATS.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.bg }]}>
                <Ionicons name={stat.icon} size={17} color={stat.iconColor} />
              </View>
              <Text style={styles.statLabel}>{stat.label.toUpperCase()}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTrend}>{stat.trend}</Text>
            </View>
          ))}
        </View>

        <View style={styles.decisionCard}>
          <View style={styles.decisionIconWrap}>
            <Ionicons name="information-circle-outline" size={18} color={StaffColors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.decisionTitle}>Decision Support System</Text>
            <Text style={styles.decisionBody}>
              iClimate analyzes weather data and generates yield predictions automatically. Your role is to
              manage content and issue advisories.
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Quick Management</Text>
        <View style={styles.quickGrid}>
          {QUICK_MANAGEMENT.map((item) => (
            <Pressable
              key={item.id}
              style={styles.quickCard}
              onPress={() => router.push(item.route as never)}>
              <View style={[styles.quickIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={18} color={item.iconColor} />
              </View>
              <Text style={styles.quickLabel}>{item.label}</Text>
              <Text style={styles.quickCount}>{item.countLabel}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: StaffColors.bg },
  content: { padding: 16, paddingBottom: 32 },

  welcomeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: StaffColors.textFaint,
    marginBottom: 16,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: StaffColors.textDark,
    letterSpacing: 0.2,
    marginBottom: 12,
  },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
  statCard: {
    width: '47.5%',
    backgroundColor: StaffColors.card,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3, color: StaffColors.textFaint, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '800', color: StaffColors.textDark, marginBottom: 4 },
  statTrend: { fontSize: 11, fontWeight: '700', color: StaffColors.accent },

  decisionCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: StaffColors.accentSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 6,
  },
  decisionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decisionTitle: { fontSize: 13, fontWeight: '800', color: StaffColors.textDark, marginBottom: 4 },
  decisionBody: { fontSize: 12, color: StaffColors.textMid, lineHeight: 17 },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickCard: {
    width: '47.5%',
    backgroundColor: StaffColors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickLabel: { fontSize: 13.5, fontWeight: '700', color: StaffColors.textDark, marginBottom: 4 },
  quickCount: { fontSize: 11.5, color: StaffColors.textFaint, fontWeight: '600' },
});