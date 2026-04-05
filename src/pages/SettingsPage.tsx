import { motion } from "framer-motion";
import { Bell, Lock, Globe, Palette, ChevronRight, MessageSquare, HelpCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const SETTINGS = [
  {
    icon: Bell, title: "Notifications", desc: "Manage alert preferences",
    gradient: "from-amber-500/15 to-orange-500/5", border: "border-amber-400/25",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500", iconShadow: "shadow-amber-500/30",
    arrowColor: "text-amber-400",
    tag: { label: "On", color: "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400" },
  },
  {
    icon: Lock, title: "Security", desc: "Password and 2FA settings",
    gradient: "from-blue-500/15 to-indigo-500/5", border: "border-blue-400/25",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600", iconShadow: "shadow-blue-500/30",
    arrowColor: "text-blue-400",
    tag: { label: "2FA Active", color: "bg-blue-500/15 text-blue-500 dark:text-blue-400" },
  },
  {
    icon: Globe, title: "Language", desc: "English (India)",
    gradient: "from-teal-500/15 to-cyan-500/5", border: "border-teal-400/25",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-600", iconShadow: "shadow-teal-500/30",
    arrowColor: "text-teal-400",
    tag: { label: "EN-IN", color: "bg-teal-500/15 text-teal-500 dark:text-teal-400" },
  },
  {
    icon: Palette, title: "Appearance", desc: null, // we fill dynamically
    gradient: "from-violet-500/15 to-purple-500/5", border: "border-violet-400/25",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600", iconShadow: "shadow-violet-500/30",
    arrowColor: "text-violet-400",
    tag: null, // dynamic
  },
];

const SUPPORT_SETTINGS = [
  {
    icon: HelpCircle, title: "Help Centre", desc: "Contact support and FAQs",
    gradient: "from-blue-500/15 to-sky-500/5", border: "border-blue-400/25",
    iconBg: "bg-gradient-to-br from-blue-500 to-sky-500", iconShadow: "shadow-blue-500/30",
    arrowColor: "text-blue-400",
  },
  {
    icon: MessageSquare, title: "Give Feedback", desc: "Help us improve Zenith",
    gradient: "from-emerald-500/15 to-teal-500/5", border: "border-emerald-400/25",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500", iconShadow: "shadow-emerald-500/30",
    arrowColor: "text-emerald-400",
  },
];

const SettingsPage = () => {
  const { theme } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Preferences</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3">
        {SETTINGS.map(({ icon: Icon, title, desc, gradient, border, iconBg, iconShadow, arrowColor, tag }, i) => {
          // dynamic appearance desc + tag
          const displayDesc = title === "Appearance" ? `${theme === "dark" ? "Dark" : "Light"} theme active` : desc;
          const displayTag  = title === "Appearance"
            ? { label: theme === "dark" ? "Dark" : "Light", color: theme === "dark" ? "bg-slate-500/20 text-slate-300" : "bg-sky-500/15 text-sky-600" }
            : tag;

          return (
            <motion.div key={title}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ x: 4 }}
              className={`group flex items-center justify-between p-5 rounded-2xl border cursor-pointer bg-gradient-to-r ${gradient} ${border} transition-all duration-200`}>
              <div className="flex items-center gap-4">
                <div className={`h-11 w-11 rounded-xl ${iconBg} flex items-center justify-center shadow-md ${iconShadow} shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{displayDesc}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {displayTag && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${displayTag.color}`}>
                    {displayTag.label}
                  </span>
                )}
                <ChevronRight className={`h-4 w-4 ${arrowColor} transition-transform group-hover:translate-x-1`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Section label: Support */}
      <div className="flex items-center gap-3 mt-8 mb-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Support</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3">
        {SUPPORT_SETTINGS.map(({ icon: Icon, title, desc, gradient, border, iconBg, iconShadow, arrowColor }, i) => (
          <motion.div key={title}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (SETTINGS.length + i) * 0.07 }}
            whileHover={{ x: 4 }}
            className={`group flex items-center justify-between p-5 rounded-2xl border cursor-pointer bg-gradient-to-r ${gradient} ${border} transition-all duration-200`}>
            <div className="flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl ${iconBg} flex items-center justify-center shadow-md ${iconShadow} shrink-0`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ChevronRight className={`h-4 w-4 ${arrowColor} transition-transform group-hover:translate-x-1`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="mt-8 p-5 rounded-2xl border border-rose-400/30 bg-gradient-to-r from-rose-500/10 to-red-500/5">
        <p className="text-sm font-bold text-rose-500 dark:text-rose-400 mb-1">Danger Zone</p>
        <p className="text-xs text-muted-foreground mb-4">These actions are irreversible. Please be careful.</p>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 rounded-xl border border-rose-400/40 text-rose-500 dark:text-rose-400 text-sm font-semibold hover:bg-rose-500/10 transition-colors">
            Reset Account
          </button>
          <button className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors">
            Delete Account
          </button>
        </div>
      </div>

    </motion.div>
  );
};

export default SettingsPage;
