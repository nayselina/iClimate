import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffColors } from '@/constants/staff-colors';
import { ADVISORY_FILTERS, AdvisoryCategory, STAFF_ADVISORIES, StaffAdvisory } from '@/contexts/staff-data';

const CATEGORY_TINTS: Record<string, { bg: string; text: string; iconBg: string; iconColor: string }> = {
  'Planting Tips': { bg: '#E1F3E7', text: StaffColors.accent, iconBg: '#E1F3E7', iconColor: StaffColors.accent },
  'Irrigation Tips': { bg: '#E3ECFB', text: '#3E6FD9', iconBg: '#E3ECFB', iconColor: '#3E6FD9' },
  'Climate Awareness': { bg: '#FCEBD3', text: '#C97A1F', iconBg: '#FCEBD3', iconColor: '#C97A1F' },
  'Harvesting Tips': { bg: StaffColors.surfaceMuted, text: StaffColors.textMid, iconBg: StaffColors.surfaceMuted, iconColor: StaffColors.textMid },
};

export default function ManageAdvisoriesScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(AdvisoryCategory | 'All')>('All');
  const [items, setItems] = useState<StaffAdvisory[]>(STAFF_ADVISORIES);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter = filter === 'All' || item.category === filter;
      const matchesQuery =
        query.trim().length === 0 || item.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [items, query, filter]);

  const handleEdit = (item: StaffAdvisory) => {
    Alert.alert('Edit Advisory', `Hook this up to your edit flow for "${item.title}".`);
  };

  const handleDelete = (item: StaffAdvisory) => {
    Alert.alert('Delete Advisory', `Remove "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((a) => a.id !== item.id)),
      },
    ]);
  };

  const handleAdd = () => {
    Alert.alert('New Advisory', 'Hook this up to your create-advisory flow.');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StaffHeader title="Manage Advisories" />

      <View style={styles.flexFill}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={16} color={StaffColors.textFaint} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search advisories..."
                  placeholderTextColor={StaffColors.textFaint}
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

                <View style={styles.actionsRow}>
                  <Pressable style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Ionicons name="create-outline" size={14} color="#3E6FD9" />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                  <Pressable style={styles.deleteButton} onPress={() => handleDelete(item)}>
                    <Ionicons name="trash-outline" size={14} color="#D9453E" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="help-buoy-outline" size={28} color={StaffColors.textFaint} />
              <Text style={styles.emptyText}>No advisories match your search.</Text>
            </View>
          }
        />

        <Pressable style={styles.fab} onPress={handleAdd} hitSlop={6}>
          <Ionicons name="add" size={26} color="#ffffff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: StaffColors.bg },
  flexFill: { flex: 1 },
  content: { padding: 16, paddingBottom: 96 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: StaffColors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: StaffColors.border,
  },
  searchInput: { flex: 1, fontSize: 13.5, color: StaffColors.textDark },

  filterRow: { gap: 8, marginBottom: 16, paddingRight: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: StaffColors.card,
    borderWidth: 1,
    borderColor: StaffColors.border,
  },
  filterChipActive: { backgroundColor: StaffColors.deepGreen, borderColor: StaffColors.deepGreen },
  filterChipText: { fontSize: 12.5, fontWeight: '600', color: StaffColors.textMid },
  filterChipTextActive: { color: '#ffffff' },

  card: {
    backgroundColor: StaffColors.card,
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
  title: { fontSize: 15, fontWeight: '700', color: StaffColors.textDark, marginBottom: 6 },
  excerpt: { fontSize: 12.5, color: StaffColors.textMid, lineHeight: 18, marginBottom: 14 },

  actionsRow: { flexDirection: 'row', gap: 10 },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#E3ECFB',
    borderRadius: 10,
    paddingVertical: 10,
  },
  editButtonText: { fontSize: 12.5, fontWeight: '700', color: '#3E6FD9' },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FBE3E3',
    borderRadius: 10,
    paddingVertical: 10,
  },
  deleteButtonText: { fontSize: 12.5, fontWeight: '700', color: '#D9453E' },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 13, color: StaffColors.textFaint },

  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: StaffColors.deepGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});