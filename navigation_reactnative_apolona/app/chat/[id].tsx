import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Message = { id: string; type: 'sent' | 'recv'; text: string };

const INITIAL_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', type: 'sent', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.' },
    { id: 'm2', type: 'recv', text: 'Good day! Libre ako mamayang 2:00 PM onwards.' },
    { id: 'm3', type: 'sent', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.' },
    { id: 'm4', type: 'recv', text: 'See you later!' },
  ],
  '2': [
    { id: 'm1', type: 'sent', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.' },
    { id: 'm2', type: 'recv', text: 'Good day! Libre ako mamayang 2:00 PM onwards.' },
    { id: 'm3', type: 'sent', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.' },
    { id: 'm4', type: 'recv', text: 'See you later!' },
  ],
  '3': [
    { id: 'm1', type: 'sent', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.' },
    { id: 'm2', type: 'recv', text: 'Good day! Libre ako mamayang 2:00 PM onwards.' },
    { id: 'm3', type: 'sent', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.' },
    { id: 'm4', type: 'recv', text: 'See you later!' },
  ],
  '4': [
    { id: 'm1', type: 'sent', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.' },
    { id: 'm2', type: 'recv', text: 'Good day! Libre ako mamayang 2:00 PM onwards.' },
    { id: 'm3', type: 'sent', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.' },
    { id: 'm4', type: 'recv', text: 'See you later!' },
  ],
  '5': [
    { id: 'm1', type: 'sent', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.' },
    { id: 'm2', type: 'recv', text: 'Good day! Libre ako mamayang 2:00 PM onwards.' },
    { id: 'm3', type: 'sent', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.' },
    { id: 'm4', type: 'recv', text: 'See you later!' },
  ],
};

const NAME_FALLBACK: Record<string, string> = {
  '1': 'Doc Calvin Placio',
  '2': 'Doc Harrold Chaps',
  '3': 'Doc Oliver',
  '4': 'Dr. Maria Santos',
  '5': 'Dr. Arnel Mendoza',
};

export default function ChatScreen() {
  const params = useLocalSearchParams<{ id: string; name: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '1');
  const rawName = Array.isArray(params.name) ? params.name[0] : params.name;
  const name = rawName && rawName.trim().length > 0 ? rawName : (NAME_FALLBACK[id] ?? 'Chat');

  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>(
    INITIAL_MESSAGES[id] ?? []
  );
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: Message = { id: Date.now().toString(), type: 'sent', text };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderBubble = ({ item }: { item: Message }) => (
    <View style={[styles.bubbleRow, item.type === 'sent' ? styles.sentRow : styles.recvRow]}>
      <View style={[styles.bubble, item.type === 'sent' ? styles.sentBubble : styles.recvBubble]}>
        <Text style={item.type === 'sent' ? styles.sentText : styles.recvText}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: '' }} />

      {/* top/left/right only — bottom handled by the white inputArea */}
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor="#6a00f4" />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{name}</Text>
          <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderBubble}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder="Aa"
              placeholderTextColor="#aaa"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Ionicons name="send" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#6a00f4' },
  flex: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#6a00f4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  messageList: { padding: 14, gap: 8 },
  bubbleRow: { flexDirection: 'row', marginVertical: 4 },
  sentRow: { justifyContent: 'flex-end' },
  recvRow: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '72%', padding: 10, borderRadius: 18 },
  sentBubble: { backgroundColor: '#3b9ddd', borderBottomRightRadius: 4 },
  recvBubble: { backgroundColor: '#f0f0f0', borderBottomLeftRadius: 4 },
  sentText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  recvText: { color: '#111', fontSize: 14, lineHeight: 20 },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 24,        // absorbs the bottom home-indicator space
    borderTopWidth: 0.5,
    borderTopColor: '#e8e8e8',
    backgroundColor: '#fff', // stays white all the way to the bottom
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontSize: 14,
    color: '#333',
    maxHeight: 100,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b9ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});