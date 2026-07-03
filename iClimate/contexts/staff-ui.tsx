import React, { createContext, useContext, useMemo, useState } from 'react';

type StaffUIContextValue = {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

const StaffUIContext = createContext<StaffUIContextValue | undefined>(undefined);

export function StaffUIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = useMemo(
    () => ({
      sidebarOpen,
      openSidebar: () => setSidebarOpen(true),
      closeSidebar: () => setSidebarOpen(false),
      toggleSidebar: () => setSidebarOpen((prev) => !prev),
    }),
    [sidebarOpen]
  );

  return <StaffUIContext.Provider value={value}>{children}</StaffUIContext.Provider>;
}

export function useStaffUI() {
  const ctx = useContext(StaffUIContext);
  if (!ctx) {
    throw new Error('useStaffUI must be used within a StaffUIProvider');
  }
  return ctx;
}