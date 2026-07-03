import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { StaffColors } from '@/constants/staff-colors';
import { StaffSidebar } from '@/components/staff/StaffSidebar';
import { StaffUIProvider } from '@/contexts/staff-ui';

export default function StaffLayout() {
  return (
    <StaffUIProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: StaffColors.accent,
          tabBarInactiveTintColor: StaffColors.textFaint,
          tabBarStyle: {
            height: 62,
            paddingTop: 6,
            paddingBottom: 10,
            borderTopColor: StaffColors.border,
            backgroundColor: StaffColors.card,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="announcements"
          options={{
            title: 'Announce.',
            tabBarIcon: ({ color, size }) => <Ionicons name="megaphone-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="feedback"
          options={{
            title: 'Feedback',
            tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-outline" size={size} color={color} />,
          }}
        />

        {/* Reachable via sidebar / bell / quick-access, hidden from the tab bar */}
        <Tabs.Screen name="advisories" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
      </Tabs>

      {/* Rendered above the tab navigator so it overlays every screen */}
      <StaffSidebar />
    </StaffUIProvider>
  );
}