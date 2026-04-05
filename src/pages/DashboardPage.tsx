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
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const AnimatedNumber = ({ target }: { target: number }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.floor(p * target));
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
  <motion.div variants={item} whileHover={{ y: -4 }} className={`glass-card-hover p-6 ${variant}`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
        <Icon className="h-5 w-5 text-foreground" />
      </div>
    </div>
    <p className="text-3xl font-bold text-foreground tracking-tight">
      <AnimatedNumber target={value} />
    </p>
    <div className="flex items-center gap-1 mt-2">
      {positive ? (
        <ArrowUpRight className="h-4 w-4 text-success" />
      ) : (
        <ArrowDownRight className="h-4 w-4 text-destructive" />
      )}
      <span className={`text-sm font-medium ${positive ? "text-success" : "text-destructive"}`}>
        {change}
      </span>
      <span className="text-xs text-muted-foreground ml-1">vs last month</span>
    </div>
  </motion.div>
);

const chartTooltipStyle = {
  backgroundColor: "hsl(228 15% 14%)",
  border: "1px solid hsl(228 12% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 95%)",
  fontSize: "12px",
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    delay(800).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Arjun</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Total Balance" value={192000} change="+9.7%" positive icon={Wallet} variant="stat-card-green" />
        <StatCard title="Income" value={174000} change="+12.3%" positive icon={TrendingUp} variant="stat-card-blue" />
        <StatCard title="Expenses" value={26369} change="-8.1%" positive={false} icon={TrendingDown} variant="stat-card-red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Balance Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={balanceTrend}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215,15%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215,15%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [formatCurrency(v), "Balance"]} />
              <Line type="monotone" dataKey="balance" stroke="hsl(160,84%,39%)" strokeWidth={2.5} dot={false} fill="url(#balGrad)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Expense Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={expenseTrend}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0,72%,51%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(0,72%,51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215,15%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215,15%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [formatCurrency(v), "Expenses"]} />
              <Line type="monotone" dataKey="expense" stroke="hsl(0,72%,51%)" strokeWidth={2.5} dot={false} fill="url(#expGrad)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Spending Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={spendingBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={4} strokeWidth={0}>
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
  );
};

export default DashboardPage;
