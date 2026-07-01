import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { MaoColors } from '@/constants/mao-colors';

// Extra tokens for the iClimate dark-green hero panel.
const IC = {
  deepGreen: '#173626',
  panelGreen: 'rgba(255,255,255,0.08)',
  panelBorder: 'rgba(255,255,255,0.16)',
  bulletBg: 'rgba(255,255,255,0.14)',
  mintText: '#bfe6c2',
  noticeBg: '#5a5a1f',
  noticeBorder: '#8a8a2f',
};

const BARANGAYS = [
  'Balibago',
  'Bagong Kalsada',
  'Bautista',
  'Bucal',
  'Calayo',
  'Camastilisan',
  'Lucsuhin',
  'Malaruhatan',
  'Prinza',
  'Poblacion',
  'Tagumpay',
];

export default function CreateAccountScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

  const [houseStreet, setHouseStreet] = useState('');
  const [sitioPurok, setSitioPurok] = useState('');
  const [barangay, setBarangay] = useState('');
  const [showBarangayPicker, setShowBarangayPicker] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !contactNumber.trim()) {
      Alert.alert('Missing information', 'Please complete your personal information.');
      return;
    }
    if (!barangay) {
      Alert.alert('Missing information', 'Please select your barangay.');
      return;
    }
    if (!username.trim() || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please complete your account information.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Password and confirm password do not match.');
      return;
    }

    setSubmitting(true);
    try {
      // TODO: replace with real registration call.
      // await api.register({ firstName, lastName, middleName, contactNumber, email,
      //   houseStreet, sitioPurok, barangay, username, password });

      // New accounts created here are always farmer accounts.
      router.replace('/farmer' as any);
    } catch (error) {
      Alert.alert('Registration failed', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero / guidance panel */}
        <View style={styles.hero}>
          <View style={styles.heroLogoRow}>
            <View style={styles.logoCircle}>
              <Ionicons name="leaf-outline" size={16} color="#ffffff" />
            </View>
            <Text style={styles.heroLogoText}>
              i<Text style={{ color: IC.mintText }}>Climate</Text>
            </Text>
          </View>

          <Text style={styles.heroSubtitle}>Join the iClimate community as a Rice Farmer</Text>

          <View style={styles.guidancePanel}>
            <Text style={styles.guidanceTitle}>Registration Guide</Text>
            {[
              'Fill in your personal information accurately',
              'Farmer accounts provide access to climate data and recommendations',
              'Create a strong password (min. 8 characters)',
              'Admin and MAO accounts are created by system administrators',
            ].map((tip) => (
              <View key={tip} style={styles.guidanceRow}>
                <View style={styles.guidanceCheck}>
                  <Ionicons name="checkmark" size={12} color={IC.mintText} />
                </View>
                <Text style={styles.guidanceText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.farmerPanel}>
            <View style={styles.farmerPanelHeader}>
              <View style={styles.farmerIconCircle}>
                <Ionicons name="leaf-outline" size={16} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.farmerPanelTitle}>Rice Farmer Account</Text>
                <Text style={styles.farmerPanelSubtitle}>Public registration available</Text>
              </View>
            </View>
            {[
              'Access climate data and forecasts',
              'Receive planting recommendations',
              'Track harvest history and yields',
            ].map((item) => (
              <View key={item} style={styles.guidanceRow}>
                <View style={styles.guidanceCheck}>
                  <Ionicons name="checkmark" size={12} color={IC.mintText} />
                </View>
                <Text style={styles.guidanceText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.noticeBox}>
            <Ionicons name="information-circle-outline" size={16} color="#f3f3c0" />
            <Text style={styles.noticeText}>
              <Text style={styles.noticeTextBold}>MAO Staff and IT Personnel</Text> accounts are
              created by system administrators. Contact your local MAO office for access.
            </Text>
          </View>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={10}>
            <Ionicons name="arrow-back" size={16} color={MaoColors.accentGreen} />
            <Text style={styles.backText}>Back to Home</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Join the iClimate community today</Text>

          <View style={styles.roleBanner}>
            <View style={styles.roleBannerIcon}>
              <Ionicons name="leaf-outline" size={18} color="#ffffff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.roleBannerTitle}>Rice Farmer Account</Text>
              <Text style={styles.roleBannerSubtitle}>
                Access climate data, planting recommendations, and harvest forecasting
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>FIRST NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Juan"
                placeholderTextColor={MaoColors.textFaint}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>LAST NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Dela Cruz"
                placeholderTextColor={MaoColors.textFaint}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Text style={styles.fieldLabel}>MIDDLE NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Middle name (optional)"
            placeholderTextColor={MaoColors.textFaint}
            value={middleName}
            onChangeText={setMiddleName}
          />

          <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor={MaoColors.textFaint}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.fieldLabel}>CONTACT NUMBER</Text>
          <TextInput
            style={styles.input}
            placeholder="09XX XXX XXXX"
            placeholderTextColor={MaoColors.textFaint}
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
          />

          <View style={styles.divider} />

          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={15} color={MaoColors.accentGreen} />
            <Text style={styles.sectionTitle}>Farm information</Text>
          </View>

          <Text style={styles.fieldLabel}>HOUSE NO. / STREET</Text>
          <TextInput
            style={styles.input}
            placeholder="House no. / street"
            placeholderTextColor={MaoColors.textFaint}
            value={houseStreet}
            onChangeText={setHouseStreet}
          />

          <Text style={styles.fieldLabel}>SITIO / PUROK</Text>
          <TextInput
            style={styles.input}
            placeholder="Sitio / purok"
            placeholderTextColor={MaoColors.textFaint}
            value={sitioPurok}
            onChangeText={setSitioPurok}
          />

          <Text style={styles.fieldLabel}>BARANGAY</Text>
          <Pressable
            style={styles.selectInput}
            onPress={() => setShowBarangayPicker((v) => !v)}>
            <Text style={barangay ? styles.selectText : styles.selectPlaceholder}>
              {barangay || 'Select barangay'}
            </Text>
            <Ionicons
              name={showBarangayPicker ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={MaoColors.textFaint}
            />
          </Pressable>

          {showBarangayPicker && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                {BARANGAYS.map((b) => (
                  <Pressable
                    key={b}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setBarangay(b);
                      setShowBarangayPicker(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{b}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.sectionHeader}>
            <Ionicons name="lock-closed-outline" size={15} color={MaoColors.accentGreen} />
            <Text style={styles.sectionTitle}>Account information</Text>
          </View>

          <Text style={styles.fieldLabel}>USERNAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={MaoColors.textFaint}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Create a strong password"
              placeholderTextColor={MaoColors.textFaint}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={MaoColors.textFaint}
              />
            </Pressable>
          </View>

          <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Re-enter your password"
              placeholderTextColor={MaoColors.textFaint}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable onPress={() => setShowConfirmPassword((v) => !v)} hitSlop={10}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={MaoColors.textFaint}
              />
            </Pressable>
          </View>

          <Pressable
            style={[styles.registerButton, submitting && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={submitting}>
            <Text style={styles.registerButtonText}>
              {submitting ? 'Creating account…' : 'Create Account'}
            </Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/login' as any)}>
              <Text style={styles.signupLink}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Hero
  hero: {
    backgroundColor: IC.deepGreen,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 28,
    alignItems: 'center',
  },
  heroLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: MaoColors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogoText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#ffffff',
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 18,
  },

  guidancePanel: {
    width: '100%',
    backgroundColor: IC.panelGreen,
    borderWidth: 1,
    borderColor: IC.panelBorder,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  guidanceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#d7f0c9',
    marginBottom: 10,
  },
  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  guidanceCheck: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: IC.bulletBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  guidanceText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: 'rgba(255,255,255,0.9)',
  },

  farmerPanel: {
    width: '100%',
    backgroundColor: IC.panelGreen,
    borderWidth: 1,
    borderColor: IC.panelBorder,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  farmerPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  farmerIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: MaoColors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  farmerPanelTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  farmerPanelSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },

  noticeBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: IC.noticeBg,
    borderWidth: 1,
    borderColor: IC.noticeBorder,
    borderRadius: 12,
    padding: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#f3f3d0',
  },
  noticeTextBold: {
    fontWeight: '800',
    color: '#ffffff',
  },

  // Form card
  card: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  backText: {
    fontSize: 13,
    fontWeight: '600',
    color: MaoColors.accentGreen,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: MaoColors.textDark,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: MaoColors.textMid,
    marginBottom: 18,
  },
  roleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: MaoColors.accentGreenSoft,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  roleBannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: MaoColors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleBannerTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: MaoColors.textDark,
    marginBottom: 2,
  },
  roleBannerSubtitle: {
    fontSize: 11.5,
    lineHeight: 16,
    color: MaoColors.textMid,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: MaoColors.textDark,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: MaoColors.textFaint,
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: MaoColors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: MaoColors.textDark,
    marginBottom: 10,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: MaoColors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: MaoColors.textDark,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: MaoColors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 14,
    color: MaoColors.textDark,
  },
  selectPlaceholder: {
    fontSize: 14,
    color: MaoColors.textFaint,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: MaoColors.border,
    borderRadius: 10,
    marginTop: -4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: MaoColors.border,
  },
  dropdownItemText: {
    fontSize: 14,
    color: MaoColors.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: MaoColors.border,
    marginVertical: 16,
  },
  registerButton: {
    backgroundColor: MaoColors.accentGreen,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  signupText: {
    fontSize: 13,
    color: MaoColors.textMid,
  },
  signupLink: {
    fontSize: 13,
    color: MaoColors.accentGreen,
    fontWeight: '700',
  },
});