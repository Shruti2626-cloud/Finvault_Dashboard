import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  PiggyBank,
  Banknote,
  RefreshCw,
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
import { useApp } from "@/contexts/AppContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
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
  title, value, change, positive, icon: Icon, gradient, iconBg,
}: {
  title: string; value: number; change: string; positive: boolean;
  icon: React.ElementType; gradient: string; iconBg: string;
}) => (
  <motion.div
    variants={item}
    whileHover={{ y: -6 }}
    className={`relative overflow-hidden rounded-2xl p-6 border border-white/10 ${gradient}`}
  >
    {/* shine overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    <div className="flex items-center justify-between mb-5">
      <span className="text-xs font-bold uppercase tracking-widest text-white/70">{title}</span>
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
    <p className="text-3xl font-extrabold text-white tracking-tight">
      <AnimatedNumber target={value} />
    </p>
    <div className="flex items-center gap-1.5 mt-3">
      {positive ? (
        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/20">
          <ArrowUpRight className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-semibold text-white">{change}</span>
        </div>
      ) : (
        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/20">
          <ArrowDownRight className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-semibold text-white">{change}</span>
        </div>
      )}
      <span className="text-xs text-white/60 ml-1">vs last month</span>
    </div>
  </motion.div>
);

const QUICK_ACTIONS = [
  {
    title: "Send Money", subtitle: "Transfer funds", Icon: Send,
    bg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    light: "dark:from-blue-500 dark:to-indigo-500 from-blue-400/20 to-indigo-400/20",
    border: "border-blue-400/40",
  },
  {
    title: "Deposit", subtitle: "Add funds", Icon: PiggyBank,
    bg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    light: "dark:from-emerald-500 dark:to-teal-500 from-emerald-400/20 to-teal-400/20",
    border: "border-emerald-400/40",
  },
  {
    title: "Withdraw", subtitle: "Cash out", Icon: Banknote,
    bg: "bg-gradient-to-br from-orange-500 to-red-500",
    light: "dark:from-orange-500 dark:to-red-500 from-orange-400/20 to-red-400/20",
    border: "border-orange-400/40",
  },
  {
    title: "Exchange", subtitle: "Convert currency", Icon: RefreshCw,
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
    light: "dark:from-purple-500 dark:to-pink-500 from-purple-400/20 to-pink-400/20",
    border: "border-purple-400/40",
  },
];

const AI_INSIGHTS = [
  {
    text: <>You are likely to spend more on <span className="font-bold text-red-400">Food</span> next month.</>,
    accent: "from-red-500/20 to-rose-500/5",
    dot: "bg-red-400",
    border: "border-red-500/20",
  },
  {
    text: <>Your expenses increased by <span className="font-bold text-amber-400">8%</span> compared to last month.</>,
    accent: "from-amber-500/20 to-yellow-500/5",
    dot: "bg-amber-400",
    border: "border-amber-500/20",
  },
  {
    text: <>Consider reducing <span className="font-bold text-violet-400">subscription spending</span> to save more.</>,
    accent: "from-violet-500/20 to-purple-500/5",
    dot: "bg-violet-400",
    border: "border-violet-500/20",
  },
];

const DashboardPage = () => {
  const { theme } = useApp();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { delay(800).then(() => setLoading(false)); }, []);

  const isDark = theme === "dark";
  const chartTooltipStyle = isDark
    ? { backgroundColor: "hsl(228,15%,14%)", border: "1px solid hsl(228,12%,22%)", borderRadius: "12px", fontSize: "12px", padding: "10px 14px", color: "hsl(210,20%,95%)" }
    : { backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid hsl(220,14%,86%)", borderRadius: "12px", fontSize: "12px", padding: "10px 14px", color: "hsl(224,20%,14%)" };
  const axisColor = isDark ? "hsl(215,15%,50%)" : "hsl(220,12%,40%)";
  const gridColor = isDark ? "hsl(228,12%,18%)" : "hsl(220,14%,88%)";

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0b1f3a] to-[#020617] hidden dark:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:hidden" />
        <div className="absolute w-[600px] h-[600px] bg-blue-600/25 blur-[150px] rounded-full top-[-200px] left-[-200px] hidden dark:block" />
        <div className="absolute w-[500px] h-[500px] bg-violet-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-150px] hidden dark:block" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-200/30 blur-[150px] rounded-full top-[-200px] left-[-200px] dark:hidden" />
        <div className="absolute w-[500px] h-[500px] bg-sky-200/25 blur-[150px] rounded-full bottom-[-150px] right-[-150px] dark:hidden" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show"
        className="space-y-8 max-w-7xl mx-auto relative z-10 px-4 py-2">

        {/* Header */}
        <motion.div variants={item} className="space-y-1">
          <h1 className="text-3xl font-extrabold">Welcome back, Arjun</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening with your finances today.</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard title="Total Balance" value={192000} change="+9.7%" positive icon={Wallet}
            gradient="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"
            iconBg="bg-white/20 backdrop-blur-sm" />
          <StatCard title="Income" value={174000} change="+12.3%" positive icon={TrendingUp}
            gradient="bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-600"
            iconBg="bg-white/20 backdrop-blur-sm" />
          <StatCard title="Expenses" value={26369} change="-8.1%" positive={false} icon={TrendingDown}
            gradient="bg-gradient-to-br from-rose-400 via-red-500 to-orange-500"
            iconBg="bg-white/20 backdrop-blur-sm" />
        </div>

        {/* Quick Actions */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <span className="h-1.5 w-5 rounded-full bg-gradient-to-r from-primary to-accent inline-block" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map(({ title, subtitle, Icon, bg, border }, i) => (
              <div
                key={i}
                onClick={() => setActiveAction(title)}
                className={`cursor-pointer group p-5 rounded-2xl border ${border} ${bg} transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
                <Icon className="h-6 w-6 text-white mb-3 relative z-10" />
                <p className="font-bold text-white relative z-10">{title}</p>
                <p className="text-xs text-white/70 relative z-10">{subtitle}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div variants={item} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1.5 w-5 rounded-full bg-emerald-400 inline-block" />
              <h3 className="font-bold text-foreground">Balance Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area dataKey="balance" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#balGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1.5 w-5 rounded-full bg-rose-400 inline-block" />
              <h3 className="font-bold text-foreground">Expense Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={expenseTrend}>
                <defs>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#expGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Pie + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div variants={item} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1.5 w-5 rounded-full bg-violet-400 inline-block" />
              <h3 className="font-bold text-foreground">Spending Breakdown (Current Month)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={spendingBreakdown} dataKey="value" cx="50%" cy="50%"
                  outerRadius={110} innerRadius={60} startAngle={90} endAngle={-270}
                  isAnimationActive animationDuration={1200} animationEasing="ease-out">
                  {spendingBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-1.5 w-5 rounded-full bg-amber-400 inline-block" />
              <h3 className="font-bold text-foreground">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {AI_INSIGHTS.map((ins, i) => (
                <div key={i} className={`p-4 rounded-xl border bg-gradient-to-r ${ins.accent} ${ins.border} flex items-start gap-3`}>
                  <span className={`h-2 w-2 rounded-full ${ins.dot} mt-1.5 shrink-0`} />
                  <p className="text-sm text-foreground/90">{ins.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Modal */}
      {activeAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-2xl w-[360px] border border-border">
            <h2 className="text-lg font-bold mb-1">{activeAction}</h2>
            <p className="text-xs text-muted-foreground mb-4">Enter details to proceed</p>
            <div className="space-y-3">
              <input className="w-full p-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Enter amount (₹)" />
              <input className="w-full p-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Select account" />
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setActiveAction(null)} className="px-4 py-2 bg-secondary border border-border rounded-xl text-foreground hover:bg-muted transition-colors text-sm">Cancel</button>
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-xl text-white hover:opacity-90 transition-opacity text-sm font-semibold">Continue</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;