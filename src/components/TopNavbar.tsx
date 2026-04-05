import { useApp } from "@/contexts/AppContext";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const { role, setRole } = useApp();
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions, invoices, or reports..."
            className="w-full px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div
  onClick={() => navigate("/profile")}
  className="flex items-center gap-2 cursor-pointer"
>
  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
    A
  </div>

  <div>
    <p className="text-sm font-semibold">Arjun Mehta</p>
    <span className="text-xs text-gray-400">Viewer</span>
  </div>
</div>
      </div>
    </header>
  );
};

export default TopNavbar;
