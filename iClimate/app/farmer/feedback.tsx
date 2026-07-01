import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { FarmerHeader } from '@/components/farmer/FarmerHeader';
import { FarmerColors } from '@/constants/farmer-colors';

type Category = 'Bug Report' | 'Suggestion' | 'Content Issue' | 'Other';

const CATEGORIES: { key: Category; icon: string }[] = [
  { key: 'Bug Report', icon: '\ud83d\udc1e' },
  { key: 'Suggestion', icon: '\ud83d\udca1' },
  { key: 'Content Issue', icon: '\ud83d\udcc4' },
  { key: 'Other', icon: '\u2753' },
];

export default function FeedbackScreen() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<Category>('Bug Report');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Missing information', 'Please fill in the subject and message before submitting.');
      return;
    }
    setSubmitting(true);
    try {
      // TODO: replace with real API call
      // await api.submitFeedback({ subject, category, message });
      await new Promise((resolve) => setTimeout(resolve, 500));
      Alert.alert('Thank you!', 'Your feedback has been submitted.');
      setSubject('');
      setMessage('');
      setCategory('Bug Report');
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <FarmerHeader title="Feedback" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.intro}>Tell us how we can improve iClimate</Text>

          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Weather alerts arrive too late"
            placeholderTextColor={FarmerColors.textFaint}
            value={subject}
            onChangeText={setSubject}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((c) => {
              const active = c.key === category;
              return (
                <Pressable
                  key={c.key}
                  onPress={() => setCategory(c.key)}
                  style={[styles.categoryChip, active && styles.categoryChipActive]}>
                  <Text style={styles.categoryEmoji}>{c.icon}</Text>
                  <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{c.key}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your feedback in detail..."
            placeholderTextColor={FarmerColors.textFaint}
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
          />

          <Pressable
            style={[styles.submitButton, submitting && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={submitting}>
            <Ionicons name="send" size={15} color="#ffffff" />
            <Text style={styles.submitText}>{submitting ? 'Sending...' : 'Submit Feedback'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: FarmerColors.bg },
  content: { padding: 16, paddingBottom: 40 },
  intro: { fontSize: 13, color: FarmerColors.textMid, marginBottom: 20 },

  label: { fontSize: 12.5, fontWeight: '700', color: FarmerColors.textDark, marginBottom: 8, marginTop: 4 },
  input: {
    backgroundColor: FarmerColors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: FarmerColors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13.5,
    color: FarmerColors.textDark,
    marginBottom: 18,
  },
  textArea: { height: 140, paddingTop: 12 },

  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  categoryChip: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: FarmerColors.card,
    borderWidth: 1,
    borderColor: FarmerColors.border,
  },
  categoryChipActive: {
    borderColor: FarmerColors.accent,
    backgroundColor: FarmerColors.accentSoft,
  },
  categoryEmoji: { fontSize: 14 },
  categoryText: { fontSize: 12.5, fontWeight: '600', color: FarmerColors.textMid },
  categoryTextActive: { color: FarmerColors.accent, fontWeight: '700' },

  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: FarmerColors.deepGreen,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 8,
  },
  submitText: { color: '#ffffff', fontSize: 14.5, fontWeight: '700' },
});