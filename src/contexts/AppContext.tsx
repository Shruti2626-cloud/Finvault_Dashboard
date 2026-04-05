import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "viewer";

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (o: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{ role, setRole, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
