import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITHeader } from '@/components/it/ITHeader';
import { ITColors } from '@/constants/it-colors';
import {
  ADVISORY_BREAKDOWN,
  ANNOUNCEMENT_BREAKDOWN,
  FARMER_REGISTRATIONS,
  ReportBar,
  TOTAL_ADVISORIES,
  TOTAL_ANNOUNCEMENTS,
  TOTAL_FARMER_REGISTRATIONS,
} from '@/contexts/it-data';

function ReportBarRow({ item }: { item: ReportBar }) {
  const pct = Math.min(100, Math.round((item.value / item.max) * 100));
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{item.label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: item.color }]} />
      </View>
      <Text style={styles.barValue}>{item.value}</Text>
    </View>
  );
}

export default function ReportsScreen() {
  const maxRegistration = Math.max(...FARMER_REGISTRATIONS.map((r) => r.count));

  return (
    <View style={styles.screen}>
      <ITHeader title="Reports" />

      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cardIcon, { backgroundColor: '#FCEBD3' }]}>
                  <Ionicons name="megaphone-outline" size={16} color="#C97A1F" />
                </View>
                <Text style={styles.cardTitle}>Announcements</Text>
              </View>
              <Text style={styles.cardTotal}>{TOTAL_ANNOUNCEMENTS}</Text>
            </View>
            {ANNOUNCEMENT_BREAKDOWN.map((item) => (
              <ReportBarRow key={item.label} item={item} />
            ))}
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cardIcon, { backgroundColor: '#EFE7FB' }]}>
                  <Ionicons name="bulb-outline" size={16} color="#7C5CD9" />
                </View>
                <Text style={styles.cardTitle}>Advisories</Text>
              </View>
              <Text style={styles.cardTotal}>{TOTAL_ADVISORIES}</Text>
            </View>
            {ADVISORY_BREAKDOWN.map((item) => (
              <ReportBarRow key={item.label} item={item} />
            ))}
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cardIcon, { backgroundColor: ITColors.surfaceMuted }]}>
                  <Ionicons name="person-outline" size={16} color={ITColors.textMid} />
                </View>
                <Text style={styles.cardTitle}>Farmer Registrations</Text>
              </View>
              <Text style={styles.cardTotal}>{TOTAL_FARMER_REGISTRATIONS}</Text>
            </View>
            <View style={styles.pillGrid}>
              {FARMER_REGISTRATIONS.map((reg) => (
                <View key={reg.barangay} style={styles.pillRow}>
                  <Text style={styles.pillLabel}>{reg.barangay}</Text>
                  <View style={styles.pillBadge}>
                    <Text style={styles.pillBadgeText}>{reg.count}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: ITColors.bg },
  content: { padding: 16, paddingBottom: 32 },

  card: {
    backgroundColor: ITColors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 14.5, fontWeight: '800', color: ITColors.textDark },
  cardTotal: { fontSize: 18, fontWeight: '800', color: ITColors.textDark },

  barRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  barLabel: { width: 108, fontSize: 11.5, fontWeight: '700', color: ITColors.textMid },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: ITColors.surfaceMuted,
    overflow: 'hidden',
  },
  barFill: { height: 8, borderRadius: 4 },
  barValue: { width: 18, fontSize: 11.5, fontWeight: '700', color: ITColors.textDark, textAlign: 'right' },

  pillGrid: { gap: 10 },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  pillLabel: { fontSize: 13, fontWeight: '700', color: ITColors.textDark },
  pillBadge: {
    backgroundColor: ITColors.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  pillBadgeText: { fontSize: 12, fontWeight: '800', color: ITColors.accent },
});