import React from "react";
import { useLocation } from "react-router-dom";

interface DashboardProviderProps {
  children: React.ReactNode;
}

interface ProviderValues {
  sidebarOpen?: boolean;
  openSidebar?: () => void;
  closeSidebar?: () => void;
}

const Context = React.createContext<ProviderValues>({});

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const openSidebar = React.useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setSidebarOpen(false);
  }, []);

  React.useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  React.useEffect(() => {
    return () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };
  }, [location, sidebarOpen]);

  return (
    <Context.Provider value={{ sidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </Context.Provider>
  );
}

// custom hook to consume all context values { sidebarOpen, openSidebar, closeSidebar }
export function useDashboardContext() {
  return React.useContext(Context);
}
