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
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
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
    whileHover={{ y: -5 }}
    className={`glass-card glass-card-hover p-6 ${variant} relative overflow-hidden`}
  >
    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-2xl"></div>

    <div className="flex items-center justify-between mb-5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
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
      <span className="text-xs text-muted-foreground ml-1">
        vs last month
      </span>
    </div>
  </motion.div>
);

const chartTooltipStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "12px",
  fontSize: "12px",
  padding: "10px 14px",
};

const DashboardPage = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
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
    <div className="relative min-h-screen text-white overflow-hidden bg-black">

      {/* 🌌 VIBRANT FINTECH BACKGROUND */}
<div className="absolute inset-0 -z-10 overflow-hidden">

  {/* Base gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#020617]" />

  {/* Glow blobs */}
  <div className="absolute w-[600px] h-[600px] bg-purple-600/40 blur-[150px] rounded-full top-[-200px] left-[-200px]" />
  <div className="absolute w-[500px] h-[500px] bg-blue-500/40 blur-[150px] rounded-full bottom-[-150px] right-[-150px]" />
  <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 blur-[120px] rounded-full top-[40%] left-[50%]" />

  {/* Subtle grid overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)]" />

</div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-10 max-w-7xl mx-auto relative z-10 px-4"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, Arjun
          </p>
        </div>

        {/* 💳 STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Balance" value={192000} change="+9.7%" positive icon={Wallet} variant="stat-card-green" />
          <StatCard title="Income" value={174000} change="+12.3%" positive icon={TrendingUp} variant="stat-card-blue" />
          <StatCard title="Expenses" value={26369} change="-8.1%" positive={false} icon={TrendingDown} variant="stat-card-red" />
        </div>

        {/* 🚀 QUICK ACTIONS (NEW) */}
        <motion.div variants={item} className="glass-card p-6 transition hover:scale-[1.02] hover:shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
  { title: "Send Money", subtitle: "Transfer funds", color: "from-blue-500 to-indigo-500" },
  { title: "Deposit", subtitle: "Add funds", color: "from-green-500 to-emerald-500" },
  { title: "Withdraw", subtitle: "Cash out", color: "from-orange-500 to-red-500" },
  { title: "Exchange", subtitle: "Convert currency", color: "from-purple-500 to-pink-500" },
].map((item, i) => (
  <div
    key={i}
    onClick={() => setActiveAction(item.title)}
    className={`cursor-pointer glass-card-hover p-4 rounded-xl border border-white/10 transition hover:scale-105 bg-gradient-to-br ${item.color}/20`}
  >
    {/* KEEP YOUR EXISTING ICON PART */}
    
    <p className="font-semibold">{item.title}</p>
    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
  </div>
))}
          </div>
        </motion.div>

        {/* 📈 CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item} className="glass-card p-6">
            <h3 className="mb-6">Balance Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={balanceTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area dataKey="balance" stroke="#10b981" fillOpacity={0.2} fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="glass-card p-6 transition hover:scale-[1.02] hover:shadow-xl">
            <h3 className="mb-6">Expense Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={expenseTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area dataKey="expense" stroke="#ef4444" fillOpacity={0.2} fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* 🥧 PIE CHART (UPDATED ANIMATION) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="glass-card p-6 transition hover:scale-[1.02] hover:shadow-xl">
          <h3 className="mb-6">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={spendingBreakdown}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                isAnimationActive={true}
                animationDuration={1200}
              >
                {spendingBreakdown.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.color}
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6 transition hover:scale-[1.02] hover:shadow-xl">
  <h3 className="text-lg font-semibold mb-4">AI Insights</h3>

  <div className="space-y-3">
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-sm text-muted-foreground">
        You are likely to spend more on <span className="text-red-400 font-semibold">Food</span> next month.
      </p>
    </div>

    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-sm text-muted-foreground">
        Your expenses increased by <span className="text-yellow-400 font-semibold">8%</span> compared to last month.
      </p>
    </div>

    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-sm text-muted-foreground">
        Consider reducing <span className="text-purple-400 font-semibold">subscription spending</span> to save more.
      </p>
    </div>
  </div>
</motion.div>
</div>

{activeAction && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-xl w-[350px] glass-card">
      <h2 className="text-lg font-semibold mb-4">{activeAction}</h2>

      <div className="space-y-3">
        <input className="w-full p-2 rounded bg-white/10" placeholder="Enter amount" />
        <input className="w-full p-2 rounded bg-white/10" placeholder="Select account" />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => setActiveAction(null)} className="px-4 py-2 bg-white/10 rounded">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded">
          Continue
        </button>
      </div>
    </div>
  </div>
)}

      </motion.div>
    </div>
  );
};

export default DashboardPage;