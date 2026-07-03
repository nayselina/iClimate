import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITHeader } from '@/components/it/ITHeader';
import { ITColors } from '@/constants/it-colors';
import { BARANGAY_FILTERS, BarangayFilter, FARMERS, Farmer } from '@/contexts/it-data';

export default function UsersScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<BarangayFilter>('All');
  const [farmers, setFarmers] = useState<Farmer[]>(FARMERS);

  const filtered = useMemo(() => {
    return farmers.filter((f) => {
      const matchesFilter = filter === 'All' || f.barangay === filter;
      const matchesQuery =
        query.trim().length === 0 || f.fullName.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [farmers, query, filter]);

  const handleDelete = (farmer: Farmer) => {
    Alert.alert('Delete Farmer', `Remove ${farmer.fullName} from records?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setFarmers((prev) => prev.filter((f) => f.id !== farmer.id)),
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ITHeader title="User Management" />

      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={16} color={ITColors.textFaint} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search farmer..."
                  placeholderTextColor={ITColors.textFaint}
                  value={query}
                  onChangeText={setQuery}
                />
              </View>

              <FlatList
                horizontal
                data={BARANGAY_FILTERS}
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.fullName}</Text>
                  <Text style={styles.refId}>{item.farmerRefId}</Text>
                </View>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>Contact</Text>
                  <Text style={styles.detailValue}>{item.contactNumber}</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>Barangay</Text>
                  <Text style={styles.detailValue}>{item.barangay}</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>Farm Area</Text>
                  <Text style={styles.detailValue}>{item.farmAreaHa.toFixed(2)} ha</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>Farm Type</Text>
                  <Text style={styles.detailValue}>
                    {item.farmType} \u00b7 {item.irrigationType}
                  </Text>
                </View>
              </View>

              <View style={styles.actionsRow}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => Alert.alert('Edit Farmer', `Hook this up to edit ${item.fullName}.`)}>
                  <Ionicons name="create-outline" size={14} color="#3E6FD9" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => handleDelete(item)}>
                  <Ionicons name="trash-outline" size={14} color="#D9453E" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={28} color={ITColors.textFaint} />
              <Text style={styles.emptyText}>No farmers match your search.</Text>
            </View>
          }
        />

        <Pressable
          style={styles.fab}
          onPress={() => Alert.alert('Add Farmer', 'Hook this up to your add-farmer flow.')}>
          <Ionicons name="add" size={26} color="#ffffff" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: ITColors.bg },
  content: { padding: 16, paddingBottom: 90 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: ITColors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: ITColors.border,
  },
  searchInput: { flex: 1, fontSize: 13.5, color: ITColors.textDark },

  filterRow: { gap: 8, marginBottom: 16, paddingRight: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: ITColors.card,
    borderWidth: 1,
    borderColor: ITColors.border,
  },
  filterChipActive: { backgroundColor: ITColors.deepGreen, borderColor: ITColors.deepGreen },
  filterChipText: { fontSize: 12.5, fontWeight: '600', color: ITColors.textMid },
  filterChipTextActive: { color: '#ffffff' },

  card: {
    backgroundColor: ITColors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: ITColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
  name: { fontSize: 14.5, fontWeight: '700', color: ITColors.textDark, marginBottom: 2 },
  refId: { fontSize: 11.5, color: ITColors.textFaint, fontWeight: '600' },

  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14 },
  detailCol: { width: '50%', marginBottom: 10 },
  detailLabel: { fontSize: 11, color: ITColors.textFaint, marginBottom: 3 },
  detailValue: { fontSize: 12.5, fontWeight: '700', color: ITColors.textDark },

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
  emptyText: { fontSize: 13, color: ITColors.textFaint },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ITColors.deepGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});