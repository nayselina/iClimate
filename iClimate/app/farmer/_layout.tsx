import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { FarmerColors } from '@/constants/farmer-colors';
import { FarmerSidebar } from '@/components/farmer/FarmerSidebar';
import { FarmerUIProvider } from '@/contexts/farmer-ui';

export default function FarmerLayout() {
  return (
    <FarmerUIProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: FarmerColors.accent,
          tabBarInactiveTintColor: FarmerColors.textFaint,
          tabBarStyle: {
            height: 62,
            paddingTop: 6,
            paddingBottom: 10,
            borderTopColor: FarmerColors.border,
            backgroundColor: FarmerColors.card,
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
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />

        {/* Reachable via sidebar / bell / quick-access, hidden from the tab bar */}
        <Tabs.Screen name="advisories" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
        <Tabs.Screen name="feedback" options={{ href: null }} />
      </Tabs>

      {/* Rendered above the tab navigator so it overlays every screen */}
      <FarmerSidebar />
    </FarmerUIProvider>
  );
}