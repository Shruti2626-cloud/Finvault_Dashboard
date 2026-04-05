import { useApp } from "@/contexts/AppContext";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { transactions } from "@/lib/mockData";

const TopNavbar = () => {
  const { role, setRole, theme, setTheme } = useApp();
  const navigate = useNavigate();

  // ✅ Notification state
  const [showNotifications, setShowNotifications] = useState(false);

  // ✅ Create notification data from transactions
  const notifications = transactions
    .slice(0, 8)
    .reverse()
    .map((txn) => ({
      id: txn.id,
      text:
        txn.type === "credit"
          ? `₹${txn.amount} credited (${txn.category})`
          : `₹${txn.amount} debited for ${txn.category}`,
      date: txn.date,
      type: txn.type,
    }));

  return (
    <>
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-md sticky top-0 z-30">

        {/* 🔍 SEARCH BAR */}
        <div className="flex-1 max-w-2xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions, invoices, or reports..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary backdrop-blur-md border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 ml-6">

  {/* 🌙☀️ THEME TOGGLE */}
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="h-9 w-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-sm transition hover:scale-105 hover:bg-secondary"
  >
    {theme === "dark" ? (
      <Moon className="h-4 w-4 text-muted-foreground" />
    ) : (
      <Sun className="h-4 w-4 text-amber-500" />
    )}
  </button>

          {/* ROLE SWITCH */}
          <div className="flex items-center bg-secondary rounded-lg p-0.5 relative">
            {(["viewer", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="relative px-3 py-1 text-sm rounded-md transition"
              >
                {role === r && (
                  <motion.div
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-md bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span
                  className={`relative z-10 capitalize ${
                    role === r ? "text-primary-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {r}
                </span>
              </button>
            ))}
          </div>

          {/* 🔔 NOTIFICATION BUTTON */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative h-9 w-9 rounded-lg border border-border bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {/* 👤 PROFILE */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold text-sm">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Arjun Mehta</p>
              <span className="text-xs text-muted-foreground capitalize">
                {role}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* 🔔 NOTIFICATION MODAL */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50">

          <div className="glass-card p-6 w-[400px] max-h-[500px] overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-lg bg-secondary/50 border border-border flex justify-between items-start"
                >
                  <div>
                    <p className="text-sm text-foreground">{n.text}</p>
                    <span className="text-xs text-muted-foreground">
                      {n.date}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      n.type === "credit"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {n.type}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;