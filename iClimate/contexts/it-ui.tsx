import React, { createContext, useContext, useMemo, useState } from 'react';

type ITUIContextValue = {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;

  notificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;
  toggleNotifications: () => void;
};

const ITUIContext = createContext<ITUIContextValue | undefined>(undefined);

export function ITUIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const value = useMemo<ITUIContextValue>(
    () => ({
      sidebarOpen,
      openSidebar: () => setSidebarOpen(true),
      closeSidebar: () => setSidebarOpen(false),

      notificationsOpen,
      openNotifications: () => setNotificationsOpen(true),
      closeNotifications: () => setNotificationsOpen(false),
      toggleNotifications: () => setNotificationsOpen((v) => !v),
    }),
    [sidebarOpen, notificationsOpen]
  );

  return <ITUIContext.Provider value={value}>{children}</ITUIContext.Provider>;
}

export function useITUI() {
  const ctx = useContext(ITUIContext);
  if (!ctx) throw new Error('useITUI must be used within an ITUIProvider');
  return ctx;
}