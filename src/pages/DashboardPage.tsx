import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  balanceTrend,
  expenseTrend,
  spendingBreakdown,
  formatCurrency,
  delay,
} from "@/lib/mockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AnimatedNumber = ({ target }: { target: number }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{formatCurrency(val)}</>;
};

const StatCard = ({
  title,
  value,
  change,
  positive,
  icon: Icon,
  variant,
}: {
  title: string;
  value: number;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  variant: string;
}) => (
  <motion.div
    variants={item}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
    className={`glass-card-hover p-6 ${variant}`}
  >
    <div className="flex items-center justify-between mb-5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>
      <div className="h-11 w-11 rounded-xl bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
        <Icon className="h-5 w-5 text-foreground/80" />
      </div>
    </div>
    <p className="text-3xl font-extrabold text-foreground tracking-tight">
      <AnimatedNumber target={value} />
    </p>
    <div className="flex items-center gap-1.5 mt-3">
      {positive ? (
        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-success/10">
          <ArrowUpRight className="h-3.5 w-3.5 text-success" />
          <span className="text-xs font-semibold text-success">{change}</span>
        </div>
      ) : (
        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-destructive/10">
          <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
          <span className="text-xs font-semibold text-destructive">{change}</span>
        </div>
      )}
      <span className="text-xs text-muted-foreground ml-1">vs last month</span>
    </div>
  </motion.div>
);

const chartTooltipStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "12px",
  color: "#1a1a2e",
  fontSize: "12px",
  fontWeight: 600,
  padding: "10px 14px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  backdropFilter: "blur(8px)",
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    delay(800).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Animated background orbs */}
      <div className="dashboard-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-7xl mx-auto relative z-10"
      >
        <motion.div variants={item} className="space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Arjun</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Balance" value={192000} change="+9.7%" positive icon={Wallet} variant="stat-card-green" />
          <StatCard title="Income" value={174000} change="+12.3%" positive icon={TrendingUp} variant="stat-card-blue" />
          <StatCard title="Expenses" value={26369} change="-8.1%" positive={false} icon={TrendingDown} variant="stat-card-red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item} className="glass-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-6">Balance Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,18%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [formatCurrency(v), "Balance"]} />
                <Area type="monotone" dataKey="balance" stroke="hsl(160,84%,39%)" strokeWidth={2.5} fill="url(#balGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="glass-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-6">Expense Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={expenseTrend}>
                <defs>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0,72%,51%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(0,72%,51%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,18%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [formatCurrency(v), "Expenses"]} />
                <Area type="monotone" dataKey="expense" stroke="hsl(0,72%,51%)" strokeWidth={2.5} fill="url(#expGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-6">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={spendingBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={60} paddingAngle={4} strokeWidth={0}>
                {spendingBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [formatCurrency(v)]} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(215,15%,55%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </>
  );
};

export default DashboardPage;
