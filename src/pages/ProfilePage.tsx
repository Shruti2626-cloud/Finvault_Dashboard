import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Shield, Edit3, Star, Landmark } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const INFO_ROWS = [
  {
    icon: Mail, label: "Email", value: "arjun.mehta@example.com",
    gradient: "from-blue-500/15 to-indigo-500/5", border: "border-blue-400/25",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600", iconShadow: "shadow-blue-500/30",
  },
  {
    icon: Phone, label: "Phone", value: "+91 98765 43210",
    gradient: "from-emerald-500/15 to-teal-500/5", border: "border-emerald-400/25",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600", iconShadow: "shadow-emerald-500/30",
  },
  {
    icon: MapPin, label: "Location", value: "Mumbai, India",
    gradient: "from-rose-500/15 to-pink-500/5", border: "border-rose-400/25",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600", iconShadow: "shadow-rose-500/30",
  },
  {
    icon: Landmark, label: "Account Details", value: "XXXXXXXX6567  •  IFSC: HDFC0001234  •  Type: Savings",
    gradient: "from-amber-500/15 to-orange-500/5", border: "border-amber-400/25",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600", iconShadow: "shadow-amber-500/30",
  },
];

const ProfilePage = () => {
  const { role } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden border border-border">
        {/* Gradient banner wrapped hero */}
        <div className="h-44 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 relative px-8 flex flex-col justify-end pb-8 rounded-t-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent)]" />
          
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <Star className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
            <span className="text-xs text-white font-bold capitalize">{role}</span>
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="h-24 w-24 shrink-0 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-4xl font-extrabold text-white border-4 border-white/20 shadow-2xl shadow-indigo-900/50">
              A
            </div>
            
            <div className="text-white mt-2">
              <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">Arjun Mehta</h2>
              <p className="text-sm font-medium text-white/90 flex items-center gap-1.5 mt-1.5">
                <Shield className="h-4 w-4 text-white/80" />
                <span className="capitalize">{role}</span>
                <span className="mx-2 text-white/40">●</span>
                <span className="text-green-300 tracking-wide">Active</span>
              </p>
            </div>
            
            <div className="ml-auto mt-2">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 text-sm font-bold text-white hover:bg-white/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                <Edit3 className="h-4 w-4" /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="bg-card px-8 pb-8 pt-8 rounded-b-2xl">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Portfolio Value", value: "₹2,48,200", color: "text-violet-500 dark:text-violet-400" },
              { label: "Total Income",    value: "₹1,74,000", color: "text-emerald-500 dark:text-emerald-400" },
              { label: "Total Expenses",  value: "₹26,369",   color: "text-rose-500 dark:text-rose-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-secondary/40 border border-border">
                <p className={`text-lg font-extrabold ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Info rows */}
          <div className="space-y-3">
            {INFO_ROWS.map(({ icon: Icon, label, value, gradient, border, iconBg, iconShadow }) => (
              <div key={label}
                className={`flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-r ${gradient} ${border}`}>
                <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center shadow-md ${iconShadow} shrink-0`}>
                  <Icon className="h-4.5 w-4.5 text-white h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-foreground font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ProfilePage;
