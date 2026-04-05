import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import AppSidebar from "@/components/AppSidebar";
import TopNavbar from "@/components/TopNavbar";
import { useApp } from "@/contexts/AppContext";

const DashboardLayout = () => {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col min-h-screen"
      >
        <TopNavbar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
