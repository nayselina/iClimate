import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffColors } from '@/constants/staff-colors';
import { FEEDBACK_FILTERS, FeedbackCategory, STAFF_FEEDBACK, StaffFeedbackItem } from '@/contexts/staff-data';

const CATEGORY_TINTS: Record<string, { bg: string; text: string }> = {
  'Reported Issue': { bg: '#FBE3E3', text: '#D9453E' },
  Suggestions: { bg: '#E3ECFB', text: '#3E6FD9' },
  Feedback: { bg: '#E1F3E7', text: StaffColors.accent },
};

const AVATAR_TINTS = ['#1E8E5A', '#3E6FD9', '#C97A1F', '#D9453E'];

function avatarColor(seed: string) {
  const idx = seed.charCodeAt(0) % AVATAR_TINTS.length;
  return AVATAR_TINTS[idx];
}

export default function ViewFeedbackScreen() {
  const [filter, setFilter] = useState<(FeedbackCategory | 'All')>('All');
  const [items, setItems] = useState<StaffFeedbackItem[]>(STAFF_FEEDBACK);

  const filtered = useMemo(() => {
    return items.filter((item) => filter === 'All' || item.category === filter);
  }, [items, filter]);

  const handleReply = (item: StaffFeedbackItem) => {
    if (item.status === 'Replied') {
      Alert.alert('Already Replied', `You already replied to ${item.name}.`);
      return;
    }
    Alert.alert('Reply', `Hook this up to your reply flow for ${item.name}.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send Reply',
        onPress: () =>
          setItems((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: 'Replied' } : f))),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StaffHeader title="View Feedback" />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            horizontal
            data={FEEDBACK_FILTERS}
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
        }
        renderItem={({ item }) => {
          const tint = CATEGORY_TINTS[item.category] ?? CATEGORY_TINTS.Feedback;
          const replied = item.status === 'Replied';
          return (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={[styles.avatar, { backgroundColor: avatarColor(item.name) }]}>
                  <Text style={styles.avatarText}>{item.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.barangay}>{item.barangay}</Text>
                </View>
                <View style={[styles.categoryPill, { backgroundColor: tint.bg }]}>
                  <Text style={[styles.categoryPillText, { color: tint.text }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.quote}>&ldquo;{item.quote}&rdquo;</Text>

              <View style={styles.footerRow}>
                <Text style={styles.date}>{item.date}</Text>
                <Pressable onPress={() => handleReply(item)} hitSlop={6}>
                  <View style={styles.replyRow}>
                    {replied ? (
                      <>
                        <Text style={styles.repliedText}>Replied</Text>
                        <Ionicons name="checkmark" size={13} color={StaffColors.accent} />
                      </>
                    ) : (
                      <>
                        <Text style={styles.replyText}>Reply</Text>
                        <Ionicons name="chevron-forward" size={13} color={StaffColors.accent} />
                      </>
                    )}
                  </View>
                </Pressable>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-outline" size={28} color={StaffColors.textFaint} />
            <Text style={styles.emptyText}>No feedback in this category.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: StaffColors.bg },
  content: { padding: 16, paddingBottom: 32 },

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
  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  name: { fontSize: 13.5, fontWeight: '700', color: StaffColors.textDark },
  barangay: { fontSize: 11.5, color: StaffColors.textFaint },
  categoryPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  categoryPillText: { fontSize: 9.5, fontWeight: '800', letterSpacing: 0.3 },

  title: { fontSize: 14.5, fontWeight: '700', color: StaffColors.textDark, marginBottom: 6 },
  quote: { fontSize: 12.5, color: StaffColors.textMid, lineHeight: 18, marginBottom: 12, fontStyle: 'italic' },

  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  date: { fontSize: 11, color: StaffColors.textFaint, fontWeight: '600' },
  replyRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  replyText: { fontSize: 12.5, fontWeight: '700', color: StaffColors.accent },
  repliedText: { fontSize: 12.5, fontWeight: '700', color: StaffColors.accent },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 13, color: StaffColors.textFaint },
});