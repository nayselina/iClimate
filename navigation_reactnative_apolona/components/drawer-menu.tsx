import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  activeItem: 'home' | 'settings';
  onClose: () => void;
  onNavigate: (screen: 'home' | 'settings') => void;
};

export function DrawerMenu({ visible, activeItem, onClose, onNavigate }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Drawer Menus</Text>
          </View>

          <TouchableOpacity
            style={[styles.item, activeItem === 'home' && styles.itemActive]}
            onPress={() => onNavigate('home')}
            activeOpacity={0.7}>
            <Ionicons
              name="home-outline"
              size={22}
              color={activeItem === 'home' ? '#6a00f4' : '#333'}
            />
            <Text style={[styles.itemText, activeItem === 'home' && styles.itemTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, activeItem === 'settings' && styles.itemActive]}
            onPress={() => onNavigate('settings')}
            activeOpacity={0.7}>
            <Ionicons
              name="settings-outline"
              size={22}
              color={activeItem === 'settings' ? '#6a00f4' : '#333'}
            />
            <Text style={[styles.itemText, activeItem === 'settings' && styles.itemTextActive]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  panel: {
    width: '80%',
    backgroundColor: '#fff',
    paddingTop: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  drawerTitle: { fontSize: 20, fontWeight: '700', color: '#111' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  itemActive: { backgroundColor: '#f0eaff' },
  itemText: { fontSize: 15, fontWeight: '500', color: '#333' },
  itemTextActive: { color: '#6a00f4' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
});