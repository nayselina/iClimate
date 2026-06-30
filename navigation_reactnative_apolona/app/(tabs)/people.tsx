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

const PEOPLE = [
  { id: '1', name: 'Doc Calvin Placio', specialty: 'Cardiologist' },
  { id: '2', name: 'Doc Harrold Chaps', specialty: 'Pediatrician' },
  { id: '3', name: 'Doc Oliver', specialty: 'General Physician' },
  { id: '4', name: 'Dr. Maria Santos', specialty: 'Dermatologist' },
  { id: '5', name: 'Dr. Arnel Mendoza', specialty: 'Neurologist' },
];

export default function PeopleScreen() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderItem = ({ item }: { item: (typeof PEOPLE)[0] }) => (
    <View style={styles.row}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={26} color="#bbb" />
        </View>
        <View style={styles.dot} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/chat/[id]',
            params: { id: item.id, name: String(item.name) },
          })
        }>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#3b9ddd" />
      </TouchableOpacity>
    </View>
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
          <Ionicons name="search" size={16} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search people or specialization"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      <FlatList
        data={PEOPLE}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.sectionLabel}>Active Now ({PEOPLE.length})</Text>}
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
  safe: { flex: 1, backgroundColor: '#6a00f4' },
  header: {
    backgroundColor: '#6a00f4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  headerTitle: { flex: 1, color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  searchContainer: { padding: 10, backgroundColor: '#fff' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  list: { backgroundColor: '#fff' },
  sectionLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    backgroundColor: '#fff',
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#25d366',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#111' },
  specialty: { fontSize: 13, color: '#555', marginTop: 2 },
  separator: { height: 0.5, backgroundColor: '#f0f0f0', marginLeft: 78 },
});