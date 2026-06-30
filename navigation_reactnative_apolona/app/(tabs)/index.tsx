import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerMenu } from '@/components/drawer-menu';

const CHATS = [
  {
    id: '1',
    name: 'Doc Calvin Placio',
    preview: 'Ayan, mas mabuti para mabilis natin ma-finalize...',
  },
  {
    id: '2',
    name: 'Doc Harrold Chaps',
    preview: 'Sige, i-send mo na lang sa email ko yung draft.',
  },
  {
    id: '3',
    name: 'Doc Oliver',
    preview: 'Naka-leave ako bukas, sa Huwebes na natin ituloy',
  },
];

export default function ChatsScreen() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderItem = ({ item }: { item: (typeof CHATS)[0] }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        router.push({
          pathname: '/chat/[id]',
          params: { id: item.id, name: String(item.name) },
        })
      }
      activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={26} color="#bbb" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.preview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#6a00f4" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stack Navigation</Text>
        <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={16} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      <Text style={styles.listLabel}>Message List</Text>

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />

      <DrawerMenu
        visible={drawerOpen}
        activeItem="home"
        onClose={() => setDrawerOpen(false)}
        onNavigate={(screen) => {
          setDrawerOpen(false);
          if (screen === 'settings') router.push('/settings');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#6a00f4',
  },
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
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  listLabel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111',
    fontWeight: '500',
    backgroundColor: '#fff',
  },
  list: { backgroundColor: '#fff' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#111' },
  preview: { fontSize: 13, color: '#888', marginTop: 2 },
  separator: {
    height: 0.5,
    backgroundColor: '#f0f0f0',
    marginLeft: 78,
  },
});