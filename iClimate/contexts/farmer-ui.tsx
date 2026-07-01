import React, { createContext, useContext, useMemo, useState } from 'react';

import { NOTIFICATIONS } from '@/contexts/farmer-data';

type FarmerUIContextValue = {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  unreadCount: number;
};

const FarmerUIContext = createContext<FarmerUIContextValue | undefined>(undefined);

export function FarmerUIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = useMemo(
    () => NOTIFICATIONS.filter((n) => n.unread).length,
    []
  );

  const value = useMemo(
    () => ({
      sidebarOpen,
      openSidebar: () => setSidebarOpen(true),
      closeSidebar: () => setSidebarOpen(false),
      unreadCount,
    }),
    [sidebarOpen, unreadCount]
  );

  return <FarmerUIContext.Provider value={value}>{children}</FarmerUIContext.Provider>;
}

export function useFarmerUI() {
  const ctx = useContext(FarmerUIContext);
  if (!ctx) {
    throw new Error('useFarmerUI must be used within a FarmerUIProvider');
  }
  return ctx;
}