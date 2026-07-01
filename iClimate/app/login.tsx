import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
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
  deepGreenDark: '#0f2a1c',
  panelGreen: 'rgba(255,255,255,0.08)',
  panelBorder: 'rgba(255,255,255,0.16)',
  bulletBg: 'rgba(255,255,255,0.14)',
  mintText: '#bfe6c2',
  demoChipBg: 'rgba(255,255,255,0.06)',
  demoChipBorder: 'rgba(255,255,255,0.16)',
};

type Role = 'farmer' | 'mao' | 'it';

const ROLES: { key: Role; label: string }[] = [
  { key: 'farmer', label: 'Farmer' },
  { key: 'mao', label: 'MAO staff' },
  { key: 'it', label: 'IT staff' },
];

// Maps each role to its destination route.
const ROLE_ROUTES: Record<Role, string> = {
  farmer: '/farmer',
  mao: '/staff',
  it: '/it',
};

const DEMO_ACCOUNTS: { role: Role; label: string; email: string }[] = [
  { role: 'it', label: 'IT Personnel', email: 'it@iclimate.ph' },
  { role: 'mao', label: 'MAO Staff', email: 'mao@lian.gov...' },
  { role: 'farmer', label: 'Farmer', email: 'farmer@lian.ph' },
];

export default function LoginScreen() {
  const [role, setRole] = useState<Role>('farmer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please enter your username and password.');
      return;
    }

    setSubmitting(true);
    try {
      // TODO: replace with real authentication call.
      // const result = await api.login({ role, username, password });

      // Route based on the selected role.
      router.replace(ROLE_ROUTES[role] as any);
    } catch (error) {
      Alert.alert('Login failed', 'Please check your credentials and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoAccount = (demo: (typeof DEMO_ACCOUNTS)[number]) => {
    setRole(demo.role);
    setUsername(demo.email);
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

          <Text style={styles.heroSubtitle}>
            Weather Impact Analysis on Rice Production in Lian, Batangas
          </Text>

          <View style={styles.guidancePanel}>
            <Text style={styles.guidanceTitle}>Login Guidance</Text>

            {[
              'Enter your registered email address and password',
              'Use "Remember Me" to save your credentials for faster login',
              'Click "Forgot Password?" if you need to reset your password',
              'For demonstration, use the test accounts below the form',
            ].map((tip) => (
              <View key={tip} style={styles.guidanceRow}>
                <View style={styles.guidanceCheck}>
                  <Ionicons name="checkmark" size={12} color={IC.mintText} />
                </View>
                <Text style={styles.guidanceText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={10}>
            <Ionicons name="arrow-back" size={16} color={MaoColors.accentGreen} />
            <Text style={styles.backText}>Back to Home</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>Sign in to access your dashboard</Text>

          <Text style={styles.roleLabel}>I am logging in as</Text>
          <View style={styles.roleRow}>
            {ROLES.map((r) => {
              const active = r.key === role;
              return (
                <Pressable
                  key={r.key}
                  onPress={() => setRole(r.key)}
                  style={[styles.roleChip, active && styles.roleChipActive]}>
                  {active && (
                    <Ionicons
                      name="checkmark"
                      size={13}
                      color={MaoColors.accentGreen}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text style={[styles.roleChipText, active && styles.roleChipTextActive]}>
                    {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              placeholderTextColor={MaoColors.textFaint}
              autoCapitalize="none"
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
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

          <View style={styles.rememberRow}>
            <Pressable style={styles.rememberLeft} onPress={() => setRememberMe((v) => !v)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Ionicons name="checkmark" size={12} color="#ffffff" />}
              </View>
              <Text style={styles.rememberText}>Remember Me</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert('Forgot password', 'Please contact MAO Lian.')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.loginButton, submitting && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={submitting}>
            <Text style={styles.loginButtonText}>{submitting ? 'Signing in…' : 'Sign In'}</Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <Link href="/create-account" asChild>
              <Pressable>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.dividerLine} />

          <Text style={styles.demoLabel}>DEMO TEST ACCOUNTS</Text>
          <View style={styles.demoGrid}>
            {DEMO_ACCOUNTS.map((demo) => (
              <Pressable
                key={demo.role}
                style={styles.demoChip}
                onPress={() => fillDemoAccount(demo)}>
                <Text style={styles.demoChipLabel}>{demo.label}</Text>
                <Text style={styles.demoChipEmail} numberOfLines={1}>
                  {demo.email}
                </Text>
              </Pressable>
            ))}
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
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 32,
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
    marginBottom: 22,
  },

  guidancePanel: {
    width: '100%',
    backgroundColor: IC.panelGreen,
    borderWidth: 1,
    borderColor: IC.panelBorder,
    borderRadius: 16,
    padding: 18,
  },
  guidanceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#d7f0c9',
    marginBottom: 12,
  },
  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  guidanceCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: IC.bulletBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  guidanceText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.9)',
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
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: MaoColors.textFaint,
    marginBottom: 8,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: MaoColors.border,
  },
  roleChipActive: {
    backgroundColor: MaoColors.accentGreenSoft,
    borderColor: MaoColors.accentGreen,
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: MaoColors.textMid,
  },
  roleChipTextActive: {
    color: MaoColors.accentGreen,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: MaoColors.textFaint,
    marginBottom: 6,
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: MaoColors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: MaoColors.textDark,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: MaoColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: MaoColors.accentGreen,
    borderColor: MaoColors.accentGreen,
  },
  rememberText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: MaoColors.textMid,
  },
  forgotText: {
    fontSize: 12.5,
    color: MaoColors.accentGreen,
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: MaoColors.accentGreen,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 18,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
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
  dividerLine: {
    height: 1,
    backgroundColor: MaoColors.border,
    marginBottom: 16,
  },
  demoLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: MaoColors.textFaint,
    textAlign: 'center',
    marginBottom: 12,
  },
  demoGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  demoChip: {
    flex: 1,
    backgroundColor: MaoColors.surfaceMuted,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  demoChipLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: MaoColors.textDark,
    marginBottom: 2,
  },
  demoChipEmail: {
    fontSize: 9.5,
    color: MaoColors.accentGreen,
    fontWeight: '600',
  },
});