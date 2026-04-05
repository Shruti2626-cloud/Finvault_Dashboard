import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Role = "admin" | "viewer";
type Theme = "dark" | "light";

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (o: boolean) => void;

  // ✅ NEW THEME STATE
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ THEME STATE (default dark)
  const [theme, setTheme] = useState<Theme>("dark");

  // ✅ APPLY THEME TO HTML
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        sidebarOpen,
        setSidebarOpen,

        // ✅ PROVIDE THEME
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};