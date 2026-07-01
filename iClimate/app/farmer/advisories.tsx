import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { FarmerHeader } from '@/components/farmer/FarmerHeader';
import { FarmerColors } from '@/constants/farmer-colors';
import { ADVISORIES, ADVISORY_FILTERS, AdvisoryCategory } from '@/contexts/farmer-data';

const CATEGORY_TINTS: Record<string, { bg: string; text: string; iconBg: string; iconColor: string }> = {
  'Planting Tips': { bg: '#E1F3E7', text: FarmerColors.accent, iconBg: '#E1F3E7', iconColor: FarmerColors.accent },
  'Irrigation Tips': { bg: '#E3ECFB', text: '#3E6FD9', iconBg: '#E3ECFB', iconColor: '#3E6FD9' },
  'Climate Awareness': { bg: '#FCEBD3', text: '#C97A1F', iconBg: '#FCEBD3', iconColor: '#C97A1F' },
  'Harvesting Tips': { bg: FarmerColors.surfaceMuted, text: FarmerColors.textMid, iconBg: FarmerColors.surfaceMuted, iconColor: FarmerColors.textMid },
};

export default function AdvisoriesScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(AdvisoryCategory | 'All')>('All');

  const filtered = useMemo(() => {
    return ADVISORIES.filter((item) => {
      const matchesFilter = filter === 'All' || item.category === filter;
      const matchesQuery =
        query.trim().length === 0 || item.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <View style={styles.screen}>
      <FarmerHeader title="Advisories" />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={16} color={FarmerColors.textFaint} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search advisories..."
                placeholderTextColor={FarmerColors.textFaint}
                value={query}
                onChangeText={setQuery}
              />
            </View>

            <FlatList
              horizontal
              data={ADVISORY_FILTERS}
              keyExtractor={(f) => f}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
              renderItem={({ item: f }) => {
                const active = f === filter;
                return (
                  <Pressable
                    onPress={() => setFilter(f)}
                    style={[styles.filterChip, active && styles.filterChipActive]}>
                    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{f}</Text>
                  </Pressable>
                );
              }}
            />
          </>
        }
        renderItem={({ item }) => {
          const tint = CATEGORY_TINTS[item.category] ?? CATEGORY_TINTS['Harvesting Tips'];
          return (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={[styles.iconCircle, { backgroundColor: tint.iconBg }]}>
                  <Ionicons name={item.icon} size={18} color={tint.iconColor} />
                </View>
                <View style={[styles.categoryPill, { backgroundColor: tint.bg }]}>
                  <Text style={[styles.categoryPillText, { color: tint.text }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.excerpt}>{item.excerpt}</Text>
              <Pressable hitSlop={6}>
                <View style={styles.readMoreRow}>
                  <Text style={styles.readMore}>Read Full Advisory</Text>
                  <Ionicons name="chevron-forward" size={13} color={FarmerColors.accent} />
                </View>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="help-buoy-outline" size={28} color={FarmerColors.textFaint} />
            <Text style={styles.emptyText}>No advisories match your search.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: FarmerColors.bg },
  content: { padding: 16, paddingBottom: 32 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: FarmerColors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: FarmerColors.border,
  },
  searchInput: { flex: 1, fontSize: 13.5, color: FarmerColors.textDark },

  filterRow: { gap: 8, marginBottom: 16, paddingRight: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: FarmerColors.card,
    borderWidth: 1,
    borderColor: FarmerColors.border,
  },
  filterChipActive: { backgroundColor: FarmerColors.deepGreen, borderColor: FarmerColors.deepGreen },
  filterChipText: { fontSize: 12.5, fontWeight: '600', color: FarmerColors.textMid },
  filterChipTextActive: { color: '#ffffff' },

  card: {
    backgroundColor: FarmerColors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  categoryPillText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  title: { fontSize: 15, fontWeight: '700', color: FarmerColors.textDark, marginBottom: 6 },
  excerpt: { fontSize: 12.5, color: FarmerColors.textMid, lineHeight: 18, marginBottom: 10 },
  readMoreRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  readMore: { fontSize: 12.5, fontWeight: '700', color: FarmerColors.accent },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 13, color: FarmerColors.textFaint },
});