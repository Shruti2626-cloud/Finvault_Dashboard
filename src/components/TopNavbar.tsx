import { useApp } from "@/contexts/AppContext";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { transactions } from "@/lib/mockData";

const TopNavbar = () => {
  const { role, setRole } = useApp();
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
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 ml-6">

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
                    role === r ? "text-white" : "text-muted-foreground"
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
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
              A
            </div>

            <div>
              <p className="text-sm font-semibold">Arjun Mehta</p>
              <span className="text-xs text-gray-400 capitalize">
                {role}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* 🔔 NOTIFICATION MODAL */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="glass-card p-6 w-[400px] max-h-[500px] overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-sm text-muted-foreground"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-start"
                >
                  <div>
                    <p className="text-sm">{n.text}</p>
                    <span className="text-xs text-muted-foreground">
                      {n.date}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      n.type === "credit"
                        ? "text-green-400"
                        : "text-red-400"
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