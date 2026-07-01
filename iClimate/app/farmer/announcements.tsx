import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { FarmerHeader } from '@/components/farmer/FarmerHeader';
import { FarmerColors } from '@/constants/farmer-colors';
import { ANNOUNCEMENTS, ANNOUNCEMENT_FILTERS, AnnouncementCategory } from '@/contexts/farmer-data';

const CATEGORY_TINTS: Record<string, { bg: string; text: string }> = {
  'Seed Distribution': { bg: '#FCEBD3', text: '#C97A1F' },
  'Training Programs': { bg: '#E3ECFB', text: '#3E6FD9' },
  'Fertilizer Distribution': { bg: '#E1F3E7', text: FarmerColors.accent },
  Events: { bg: '#FBE3E3', text: '#D9453E' },
  News: { bg: FarmerColors.surfaceMuted, text: FarmerColors.textMid },
};

export default function AnnouncementsScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(AnnouncementCategory | 'All')>('All');

  const filtered = useMemo(() => {
    return ANNOUNCEMENTS.filter((item) => {
      const matchesFilter = filter === 'All' || item.category === filter;
      const matchesQuery =
        query.trim().length === 0 || item.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <View style={styles.screen}>
      <FarmerHeader title="Announcements" />

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
                placeholder="Search announcements..."
                placeholderTextColor={FarmerColors.textFaint}
                value={query}
                onChangeText={setQuery}
              />
            </View>

            <View style={styles.filterRow}>
              {ANNOUNCEMENT_FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <Pressable
                    key={f}
                    onPress={() => setFilter(f)}
                    style={[styles.filterChip, active && styles.filterChipActive]}>
                    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{f}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        }
        renderItem={({ item }) => {
          const tint = CATEGORY_TINTS[item.category] ?? CATEGORY_TINTS.News;
          return (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={[styles.categoryPill, { backgroundColor: tint.bg }]}>
                  <Text style={[styles.categoryPillText, { color: tint.text }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.excerpt}>{item.excerpt}</Text>
              <Pressable hitSlop={6}>
                <View style={styles.readMoreRow}>
                  <Text style={styles.readMore}>Read More</Text>
                  <Ionicons name="chevron-forward" size={13} color={FarmerColors.accent} />
                </View>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="megaphone-outline" size={28} color={FarmerColors.textFaint} />
            <Text style={styles.emptyText}>No announcements match your search.</Text>
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

  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
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
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  categoryPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  categoryPillText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  date: { fontSize: 11.5, color: FarmerColors.textFaint, fontWeight: '600' },
  title: { fontSize: 15, fontWeight: '700', color: FarmerColors.textDark, marginBottom: 6 },
  excerpt: { fontSize: 12.5, color: FarmerColors.textMid, lineHeight: 18, marginBottom: 10 },
  readMoreRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  readMore: { fontSize: 12.5, fontWeight: '700', color: FarmerColors.accent },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 13, color: FarmerColors.textFaint },
});