import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FarmerHeader } from '@/components/farmer/FarmerHeader';
import { FarmerColors } from '@/constants/farmer-colors';
import { CURRENT_FARMER } from '@/contexts/farmer-data';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ActionRow({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable style={styles.actionRow} onPress={onPress}>
      <View style={styles.actionLeft}>
        <Ionicons name={icon} size={17} color={danger ? '#D9453E' : FarmerColors.textMid} />
        <Text style={[styles.actionLabel, danger && { color: '#D9453E' }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={FarmerColors.textFaint} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <FarmerHeader title="Profile" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{CURRENT_FARMER.initials}</Text>
          </View>
          <Text style={styles.name}>{CURRENT_FARMER.fullName}</Text>
          <Text style={styles.subLabel}>Farmer ID: {CURRENT_FARMER.farmerId}</Text>
        </View>

        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.card}>
          <InfoRow label="Full Name" value={CURRENT_FARMER.fullName} />
          <InfoRow label="Contact Number" value={CURRENT_FARMER.contactNumber} />
          <InfoRow label="Address" value={CURRENT_FARMER.address} />
          <InfoRow label="Barangay" value={CURRENT_FARMER.barangay} />
        </View>

        <Text style={styles.sectionTitle}>Farm Information</Text>
        <View style={styles.card}>
          <InfoRow label="Farm Area" value={`${CURRENT_FARMER.farmAreaHa.toFixed(2)} ha`} />
          <InfoRow label="Farm Type" value={`${CURRENT_FARMER.farmType} \u00b7 ${CURRENT_FARMER.irrigationType}`} />
          <InfoRow label="Association" value={CURRENT_FARMER.association} />
        </View>

        <View style={[styles.card, styles.actionsCard]}>
          <ActionRow
            icon="create-outline"
            label="Edit Profile"
            onPress={() => Alert.alert('Edit Profile', 'Hook this up to your edit-profile screen.')}
          />
          <View style={styles.actionDivider} />
          <ActionRow
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() => Alert.alert('Change Password', 'Hook this up to your change-password flow.')}
          />
          <View style={styles.actionDivider} />
          <ActionRow
            icon="log-out-outline"
            label="Logout"
            danger
            onPress={() => router.replace('/login')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: FarmerColors.bg },
  content: { padding: 16, paddingBottom: 32 },

  profileHeader: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: FarmerColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#ffffff', fontSize: 24, fontWeight: '800' },
  name: { fontSize: 17, fontWeight: '800', color: FarmerColors.textDark, marginBottom: 2 },
  subLabel: { fontSize: 12.5, color: FarmerColors.textFaint },

  sectionTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: FarmerColors.accent,
    marginBottom: 10,
    marginTop: 4,
  },

  card: {
    backgroundColor: FarmerColors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: FarmerColors.border,
  },
  infoLabel: { fontSize: 12.5, color: FarmerColors.textFaint },
  infoValue: { fontSize: 13, fontWeight: '700', color: FarmerColors.textDark },

  actionsCard: { paddingVertical: 4 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionLabel: { fontSize: 13.5, fontWeight: '600', color: FarmerColors.textDark },
  actionDivider: { height: 1, backgroundColor: FarmerColors.border },
});