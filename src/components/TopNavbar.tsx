import { useApp } from "@/contexts/AppContext";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

const TopNavbar = () => {
  const { role, setRole } = useApp();

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions, invoices, or reports..."
            className="h-9 w-64 rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-secondary rounded-lg p-0.5">
          {(["viewer", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {role === r && (
                <motion.div
                  layoutId="role-pill"
                  className="absolute inset-0 rounded-md bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className={`relative z-10 ${role === r ? "text-primary-foreground" : "text-muted-foreground"}`}>
                {r}
              </span>
            </button>
          ))}
        </div>

        <button className="relative h-9 w-9 rounded-lg border border-border bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-foreground">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-none">Arjun Mehta</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
