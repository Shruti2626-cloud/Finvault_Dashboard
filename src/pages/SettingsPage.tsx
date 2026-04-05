import { motion } from "framer-motion";
import { Bell, Lock, Globe, Palette } from "lucide-react";

const SettingsPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <div className="space-y-4">
        {[
          { icon: Bell, title: "Notifications", desc: "Manage alert preferences" },
          { icon: Lock, title: "Security", desc: "Password and 2FA settings" },
          { icon: Globe, title: "Language", desc: "English (India)" },
          { icon: Palette, title: "Appearance", desc: "Dark theme active" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass-card-hover p-5 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
            <span className="text-muted-foreground text-lg">›</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsPage;
