import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { ITColors } from '@/constants/it-colors';
import { ITSidebar } from '@/components/it/ITSidebar';
import { ITNotificationsPanel } from '@/components/it/ITNotificationsPanel';
import { ITUIProvider } from '@/contexts/it-ui';

export default function ITLayout() {
  return (
    <ITUIProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: ITColors.accent,
          tabBarInactiveTintColor: ITColors.textFaint,
          tabBarStyle: {
            height: 62,
            paddingTop: 6,
            paddingBottom: 10,
            borderTopColor: ITColors.border,
            backgroundColor: ITColors.card,
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
          name="users"
          options={{
            title: 'Users',
            tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: 'Reports',
            tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          }}
        />
      </Tabs>

      {/* Rendered above the tab navigator so they overlay every screen */}
      <ITSidebar />
      <ITNotificationsPanel />
    </ITUIProvider>
  );
}