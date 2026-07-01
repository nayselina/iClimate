import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaoColors } from '@/constants/mao-colors';

// Extra tokens used by the iClimate landing redesign.
// Defined locally so we don't have to touch the shared constants file.
const IC = {
  deepGreen: '#173626',
  deepGreenDark: '#122a1d',
  deepGreenSoft: '#20492f',
  mintText: '#bfe6c2',
  mintTextFaint: '#8fbf95',
  chipBg: 'rgba(255,255,255,0.08)',
  chipBorder: 'rgba(255,255,255,0.18)',
  white: '#ffffff',
  cream: '#f4f1e8',
  bulletBg: '#2f6a44',
  cardYieldBg: '#e9f3ea',
};

const FEATURES = [
  {
    icon: 'server-outline' as const,
    tint: '#2f6a44',
    title: 'Historical Climate & Rice Data',
    desc: 'Access multi-year climate and rice production records from Lian, Batangas.',
  },
  {
    icon: 'cloud-outline' as const,
    tint: '#3d7a52',
    title: 'Climate Monitoring Dashboard',
    desc: 'Visualize rainfall, humidity, temperature, and weather trends through interactive analytics.',
  },
  {
    icon: 'trending-up-outline' as const,
    tint: '#4c8a5f',
    title: 'Rice Yield Prediction System',
    desc: 'Predict seasonal rice yield outcomes using climate and agricultural datasets.',
  },
  {
    icon: 'calendar-outline' as const,
    tint: '#7fb87f',
    title: 'Planting Schedule Advisory',
    desc: 'Recommend suitable planting periods for wet and dry seasons.',
  },
  {
    icon: 'stats-chart-outline' as const,
    tint: '#2f6a44',
    title: 'Climate-Yield Correlation Analysis',
    desc: 'Analyze the relationship between weather patterns and rice productivity.',
  },
  {
    icon: 'document-text-outline' as const,
    tint: '#3d7a52',
    title: 'Seasonal and Barangay Reports',
    desc: 'Generate reports and visual analytics by season and barangay.',
  },
  {
    icon: 'warning-outline' as const,
    tint: '#4c8a5f',
    title: 'Weather Risk Alert System',
    desc: 'Provide alerts for droughts, typhoons, flooding, and heavy rainfall.',
  },
  {
    icon: 'file-tray-stacked-outline' as const,
    tint: '#7fb87f',
    title: 'Centralized Agricultural Database',
    desc: 'Store and manage climate, production, and agricultural records securely.',
  },
];

const ROLES = [
  {
    icon: 'leaf-outline' as const,
    title: 'Rice Farmers',
    desc: 'Access climate monitoring, rice yield prediction, planting advisories, seasonal reports, and weather risk alerts through a farmer-friendly dashboard.',
    features: ['Climate Dashboard', 'Yield Prediction', 'Planting Advisory', 'Weather Alerts', 'Seasonal Reports'],
    href: '/farmer',
  },
  {
    icon: 'people-outline' as const,
    title: 'MAO Staff with Technicians',
    desc: 'Monitor rice production trends, validate agricultural records, analyze climate-yield relationships, and generate reports for agricultural planning and farmer support.',
    features: ['Production Monitoring', 'Climate Analytics', 'Report Generation', 'Data Validation', 'Forecast Monitoring'],
    href: '/staff',
  },
  {
    icon: 'hardware-chip-outline' as const,
    title: 'IT Personnel',
    desc: 'Maintain the system infrastructure, manage databases and user accounts, monitor API integrations, and ensure system security and performance.',
    features: ['User Management', 'System Monitoring', 'Database Maintenance', 'Security Control', 'Backup & Recovery'],
    href: '/it',
  },
];

export default function LandingScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const aboutY = useRef(0);
  const featuresY = useRef(0);
  const usersY = useRef(0);

  const scrollToSection = (y: number) => {
    setMenuOpen(false);
    // small delay so the menu panel collapses before we measure/scroll
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: Math.max(y - 12, 0), animated: true });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <View style={styles.logoCircle}>
              <Ionicons name="leaf-outline" size={16} color={IC.white} />
            </View>
            <Text style={styles.topBarTitle}>
              i<Text style={{ color: IC.mintText }}>Climate</Text>
            </Text>
          </View>
          <Pressable onPress={() => setMenuOpen((v) => !v)} hitSlop={10}>
            <Ionicons name={menuOpen ? 'close-outline' : 'menu-outline'} size={24} color={IC.white} />
          </Pressable>
        </View>

        {/* Dropdown menu */}
        {menuOpen && (
          <View style={styles.menuPanel}>
            <Pressable style={styles.menuItem} onPress={() => scrollToSection(aboutY.current)}>
              <Ionicons name="information-circle-outline" size={18} color={IC.mintText} />
              <Text style={styles.menuItemText}>About</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => scrollToSection(featuresY.current)}>
              <Ionicons name="home-outline" size={18} color={IC.mintText} />
              <Text style={styles.menuItemText}>Features</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => scrollToSection(usersY.current)}>
              <Ionicons name="people-outline" size={18} color={IC.mintText} />
              <Text style={styles.menuItemText}>Users</Text>
            </Pressable>
            <View style={styles.menuDivider} />
            <Link href="/login" asChild>
              <Pressable style={styles.menuLoginButton} onPress={() => setMenuOpen(false)}>
                <Text style={styles.menuLoginText}>Log In</Text>
              </Pressable>
            </Link>
            <Link href="/create-account" asChild>
              <Pressable style={styles.menuGetStartedButton} onPress={() => setMenuOpen(false)}>
                <Text style={styles.menuGetStartedText}>Get Started</Text>
              </Pressable>
            </Link>
          </View>
        )}

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.locationChip}>
              <Ionicons name="location-outline" size={12} color={IC.mintText} />
              <Text style={styles.locationChipText}>LIAN, BATANGAS</Text>
            </View>

            <Text style={styles.heroTitle}>iClimate</Text>
            <Text style={styles.heroSubtitle}>DECISION SUPPORT SYSTEM</Text>
            <View style={styles.heroDivider} />

            <Text style={styles.heroDescription}>
              A Web-Based Weather Impact Analysis and Rice Yield Prediction System for Lian,
              Batangas designed to support Rice Farmers, MAO Staff with Technicians, and IT
              Personnel through climate monitoring, forecasting, and agricultural analytics.
            </Text>

            {/* Getting started card */}
            <View style={styles.gettingStartedCard}>
              <View style={styles.gettingStartedHeader}>
                <Ionicons name="information-circle-outline" size={16} color={IC.mintText} />
                <Text style={styles.gettingStartedTitle}>Getting Started</Text>
              </View>

              <View style={styles.stepRow}>
                <View style={styles.stepBullet}>
                  <Text style={styles.stepBulletText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  <Text style={styles.stepTextBold}>Farmers: </Text>
                  Create an account to access climate data and planting recommendations
                </Text>
              </View>
              <View style={styles.stepRow}>
                <View style={styles.stepBullet}>
                  <Text style={styles.stepBulletText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  <Text style={styles.stepTextBold}>Existing users: </Text>
                  Log in to access your dashboard
                </Text>
              </View>
              <View style={styles.stepRow}>
                <View style={styles.stepBullet}>
                  <Text style={styles.stepBulletText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  <Text style={styles.stepTextBold}>MAO & IT Personnel: </Text>
                  Contact system administrator for access credentials
                </Text>
              </View>
            </View>
          </View>

          {/* About */}
          <View onLayout={(e) => (aboutY.current = e.nativeEvent.layout.y)}>
            <Text style={styles.eyebrow}>ABOUT THE CAPSTONE STUDY</Text>
            <Text style={styles.sectionTitleDark}>Climate-Informed Rice Production and Forecasting</Text>
            <Text style={styles.bodyText}>
              Rice production in Lian, Batangas plays a vital role in local food sustainability and
              farmer livelihoods. However, changing climate conditions such as rainfall variability,
              temperature changes, droughts, and typhoons can directly affect rice productivity and
              farming schedules.
            </Text>
            <Text style={styles.bodyText}>
              The iClimate system integrates PAGASA climate data with local rice production records
              from the Municipal Agricultural Office (MAO) to provide climate analysis, rice yield
              prediction, planting schedule recommendations, and decision-support analytics for
              farmers, MAO staff, and IT personnel.
            </Text>
            <Text style={[styles.bodyText, { marginBottom: 28 }]}>
              This platform supports climate-informed agricultural decision-making by combining
              historical weather analysis, forecasting models, and interactive dashboard
              visualization tools.
            </Text>
          </View>

          {/* Features */}
          <View onLayout={(e) => (featuresY.current = e.nativeEvent.layout.y)}>
            <Text style={[styles.eyebrow, styles.centerText]}>CORE CAPABILITIES</Text>
            <Text style={[styles.sectionTitleDark, styles.centerText]}>System Features</Text>
            <Text style={[styles.bodySubtle, styles.centerText, { marginBottom: 16 }]}>
              Comprehensive climate data and rice production tools for informed agricultural
              decision-making
            </Text>

            <View style={styles.featureGrid}>
              {FEATURES.map((f) => (
                <View key={f.title} style={styles.featureCard}>
                  <View style={[styles.featureIconCircle, { backgroundColor: f.tint }]}>
                    <Ionicons name={f.icon} size={18} color="#ffffff" />
                  </View>
                  <Text style={styles.featureCardTitle}>{f.title}</Text>
                  <Text style={styles.featureCardDesc}>{f.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Users */}
          <View onLayout={(e) => (usersY.current = e.nativeEvent.layout.y)}>
            <Text style={[styles.eyebrow, styles.centerText, { marginTop: 32 }]}>USER ROLES</Text>
            <Text style={[styles.sectionTitleDark, styles.centerText]}>Who Uses iClimate?</Text>
            <Text style={[styles.bodySubtle, styles.centerText, { marginBottom: 16 }]}>
              Three specialized user roles — Rice Farmers, MAO Staff with Technicians, and IT
              Personnel — each with dedicated features and dashboards for climate-informed
              agricultural decision-making.
            </Text>

            <View style={styles.roleList}>
              {ROLES.map((r) => (
                <View key={r.title} style={styles.roleCard}>
                  <View style={styles.roleIconCircle}>
                    <Ionicons name={r.icon} size={20} color={MaoColors.accentGreen} />
                  </View>
                  <Text style={styles.roleTitle}>{r.title}</Text>
                  <Text style={styles.roleDesc}>{r.desc}</Text>

                  <View style={styles.roleDividerFull} />

                  <Text style={styles.roleFeaturesLabel}>KEY FEATURES</Text>
                  {r.features.map((feat) => (
                    <View key={feat} style={styles.roleFeatureRow}>
                      <Ionicons name="checkmark-circle" size={14} color={MaoColors.accentGreen} />
                      <Text style={styles.roleFeatureText}>{feat}</Text>
                    </View>
                  ))}

                  <Link href={r.href as any} asChild>
                    <Pressable style={styles.roleButton}>
                      <Text style={styles.roleButtonText}>View Dashboard</Text>
                      <Ionicons name="home-outline" size={14} color="#ffffff" />
                    </Pressable>
                  </Link>
                </View>
              ))}
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
            <Text style={styles.ctaSubtitle}>
              Access climate analysis, rice yield insights, and forecasting tools for Lian,
              Batangas
            </Text>
            <View style={styles.ctaRow}>
              <Link href="/login" asChild>
                <Pressable style={styles.ctaLoginButton}>
                  <Ionicons name="home-outline" size={15} color={IC.deepGreenDark} />
                  <Text style={styles.ctaLoginText}>Log In</Text>
                </Pressable>
              </Link>
              <Link href="/create-account" asChild>
                <Pressable style={styles.ctaSignupButton}>
                  <Ionicons name="home-outline" size={15} color={IC.deepGreenDark} />
                  <Text style={styles.ctaSignupText}>Sign Up</Text>
                </Pressable>
              </Link>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerLogoRow}>
              <View style={styles.logoCircle}>
                <Ionicons name="leaf-outline" size={16} color={IC.white} />
              </View>
              <Text style={styles.footerTitle}>
                i<Text style={{ color: IC.mintText }}>Climate</Text>
              </Text>
            </View>
            <Text style={styles.footerTagline}>Decision Support System</Text>
            <Text style={styles.footerDescription}>
              A Web-Based Weather Impact Analysis and Rice Yield Prediction System for Lian,
              Batangas.{'\n\n'}
              A climate-informed agricultural decision-support platform integrating PAGASA climate
              data and local rice production records to support farmers, MAO staff, and IT
              personnel through forecasting, monitoring, and analytics.
            </Text>
            <View style={styles.capstoneChip}>
              <Text style={styles.capstoneChipText}>Capstone Research Project</Text>
            </View>
            <Text style={styles.footerCopyright}>© 2026 MAO Lian, Batangas · v1.0.0</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: IC.deepGreenDark,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: IC.deepGreenDark,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: MaoColors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontStyle: 'italic',
    color: IC.white,
  },

  // Dropdown menu
  menuPanel: {
    backgroundColor: IC.deepGreenDark,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 4,
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: IC.white,
  },
  menuDivider: {
    height: 1,
    backgroundColor: IC.chipBorder,
    marginVertical: 8,
  },
  menuLoginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuLoginText: {
    fontSize: 14,
    fontWeight: '700',
    color: IC.white,
  },
  menuGetStartedButton: {
    backgroundColor: MaoColors.accentGreen,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  menuGetStartedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // Hero
  hero: {
    backgroundColor: IC.deepGreen,
    paddingHorizontal: 22,
    paddingTop: 32,
    paddingBottom: 36,
    alignItems: 'center',
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: IC.chipBg,
    borderWidth: 1,
    borderColor: IC.chipBorder,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 22,
  },
  locationChipText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: IC.mintText,
  },
  heroTitle: {
    fontSize: 34,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2,
    color: IC.mintText,
    marginBottom: 14,
  },
  heroDivider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: MaoColors.accentGreen,
    marginBottom: 18,
  },
  heroDescription: {
    fontSize: 13.5,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 24,
  },

  gettingStartedCard: {
    width: '100%',
    backgroundColor: IC.deepGreenSoft,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: IC.chipBorder,
    padding: 18,
  },
  gettingStartedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  gettingStartedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepBullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: IC.bulletBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepBulletText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.85)',
  },
  stepTextBold: {
    fontWeight: '700',
    color: '#ffffff',
  },

  // About / shared section text
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: MaoColors.accentGreen,
    marginTop: 28,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitleDark: {
    fontSize: 22,
    fontWeight: '800',
    color: MaoColors.textDark,
    marginHorizontal: 20,
    marginBottom: 12,
    lineHeight: 28,
  },
  bodyText: {
    fontSize: 13.5,
    lineHeight: 21,
    color: MaoColors.textMid,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  bodySubtle: {
    fontSize: 13,
    lineHeight: 20,
    color: MaoColors.textFaint,
    marginHorizontal: 20,
  },
  centerText: {
    textAlign: 'center',
  },

  // Features grid (2 columns, mobile-optimized)
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: MaoColors.surfaceMuted,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  featureIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureCardTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: MaoColors.textDark,
    marginBottom: 4,
    lineHeight: 16,
  },
  featureCardDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: MaoColors.textFaint,
  },

  // Roles (stacked, mobile-optimized)
  roleList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: MaoColors.border,
    padding: 18,
  },
  roleIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: MaoColors.accentGreenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: MaoColors.textDark,
    marginBottom: 6,
  },
  roleDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    color: MaoColors.textMid,
  },
  roleDividerFull: {
    height: 1,
    backgroundColor: MaoColors.border,
    marginVertical: 14,
  },
  roleFeaturesLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: MaoColors.textFaint,
    marginBottom: 8,
  },
  roleFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  roleFeatureText: {
    fontSize: 12.5,
    color: MaoColors.textMid,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: MaoColors.accentGreen,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
  },
  roleButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },

  // CTA
  ctaCard: {
    backgroundColor: IC.deepGreenSoft,
    marginTop: 32,
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 26,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  ctaLoginButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 13,
  },
  ctaLoginText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: IC.deepGreenDark,
  },
  ctaSignupButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a9d6a2',
    borderRadius: 10,
    paddingVertical: 13,
  },
  ctaSignupText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: IC.deepGreenDark,
  },

  // Footer
  footer: {
    backgroundColor: IC.deepGreenDark,
    marginTop: 32,
    paddingHorizontal: 22,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#ffffff',
  },
  footerTagline: {
    fontSize: 12,
    fontWeight: '600',
    color: IC.mintText,
    marginBottom: 14,
  },
  footerDescription: {
    fontSize: 12.5,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 18,
  },
  capstoneChip: {
    backgroundColor: IC.chipBg,
    borderWidth: 1,
    borderColor: IC.chipBorder,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 16,
  },
  capstoneChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: IC.mintTextFaint,
  },
  footerCopyright: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
});