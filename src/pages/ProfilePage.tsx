import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const ProfilePage = () => {
  const { role } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      <div className="glass-card p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-foreground">
            A
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Arjun Mehta</h2>
            <p className="text-sm text-muted-foreground capitalize flex items-center gap-1">
              <Shield className="h-3 w-3" /> {role}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "arjun.mehta@example.com" },
            { icon: Phone, label: "Phone", value: "+91 98765 43210" },
            { icon: MapPin, label: "Location", value: "Mumbai, India" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm text-foreground font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
