import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffColors } from '@/constants/staff-colors';
import {
  ANNOUNCEMENT_FILTERS,
  AnnouncementCategory,
  STAFF_ANNOUNCEMENTS,
  StaffAnnouncement,
} from '@/contexts/staff-data';

const CATEGORY_TINTS: Record<string, { bg: string; text: string }> = {
  'Seed Distribution': { bg: '#FCEBD3', text: '#C97A1F' },
  'Training Programs': { bg: '#E3ECFB', text: '#3E6FD9' },
  'Fertilizer Distribution': { bg: '#E1F3E7', text: StaffColors.accent },
  Events: { bg: '#FBE3E3', text: '#D9453E' },
  News: { bg: StaffColors.surfaceMuted, text: StaffColors.textMid },
};

export default function ManageAnnouncementsScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(AnnouncementCategory | 'All')>('All');
  const [items, setItems] = useState<StaffAnnouncement[]>(STAFF_ANNOUNCEMENTS);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter = filter === 'All' || item.category === filter;
      const matchesQuery =
        query.trim().length === 0 || item.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [items, query, filter]);

  const handleEdit = (item: StaffAnnouncement) => {
    Alert.alert('Edit Announcement', `Hook this up to your edit flow for "${item.title}".`);
  };

  const handleDelete = (item: StaffAnnouncement) => {
    Alert.alert('Delete Announcement', `Remove "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((a) => a.id !== item.id)),
      },
    ]);
  };

  const handleAdd = () => {
    Alert.alert('New Announcement', 'Hook this up to your create-announcement flow.');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StaffHeader title="Manage Announcements" />

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
                  placeholder="Search announcements..."
                  placeholderTextColor={StaffColors.textFaint}
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
              <Ionicons name="megaphone-outline" size={28} color={StaffColors.textFaint} />
              <Text style={styles.emptyText}>No announcements match your search.</Text>
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

  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
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
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  categoryPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  categoryPillText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  date: { fontSize: 11.5, color: StaffColors.textFaint, fontWeight: '600' },
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