import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, Target, ShoppingBag, Layers, Activity, Lightbulb } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";
import { 
  expenseTrend, cashFlowTrend, formatCurrency, delay, 
  budgetUtilization, topMerchants, fixedVsVariable, generateHeatmapData 
} from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const INSIGHTS = [
  { text: "Travel is your largest expense category at ₹15,150 — consider budgeting limits.", color: "from-blue-500/20 to-indigo-500/5", border: "border-blue-400/25", dot: "bg-blue-400" },
  { text: "Income increased 12.3% this month — great momentum.", color: "from-emerald-500/20 to-teal-500/5", border: "border-emerald-400/25", dot: "bg-emerald-400" },
  { text: "Food expenses are well under control at ₹2,090.", color: "from-violet-500/20 to-purple-500/5", border: "border-violet-400/25", dot: "bg-violet-400" },
];

const AnalyticsPage = () => {
  const { theme } = useApp();
  const [loading, setLoading] = useState(true);
  const [incPrediction, setIncPrediction] = useState<number | null>(null);
  const [expPrediction, setExpPrediction] = useState<number | null>(null);

  // Generate heatmap once
  const heatmap = useMemo(() => generateHeatmapData(), []);

  useEffect(() => {
    delay(700).then(() => setLoading(false));
    delay(2000).then(() => {
      const avgExp = expenseTrend.reduce((a, b) => a + b.expense, 0) / expenseTrend.length;
      setExpPrediction(Math.round(avgExp * 1.05));
      setIncPrediction(182500); // Mock prediction
    });
  }, []);

  const lastTwoExp = expenseTrend.slice(-2);
  const expChange = ((lastTwoExp[1].expense - lastTwoExp[0].expense) / lastTwoExp[0].expense * 100).toFixed(1);
  const expPositive = Number(expChange) <= 0;
  const incChange = "+12.3";

  const isDark = theme === "dark";
  const chartTooltipStyle = isDark
    ? { backgroundColor: "hsl(228,15%,14%)", border: "1px solid hsl(228,12%,22%)", borderRadius: "8px", color: "hsl(210,20%,95%)", fontSize: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3)" }
    : { backgroundColor: "rgba(255,255,255,0.97)", border: "1px solid hsl(220,14%,86%)", borderRadius: "8px", color: "hsl(224,20%,14%)", fontSize: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" };
  const axisColor = isDark ? "hsl(215,15%,50%)" : "hsl(220,12%,38%)";
  const gridColor  = isDark ? "hsl(228,12%,18%)" : "hsl(220,14%,86%)";

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto pb-10">

      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep financial insights and predictive modeling</p>
      </motion.div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Income Change */}
        <motion.div variants={item}
          className="relative overflow-hidden rounded-2xl p-6 border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent backdrop-blur-xl"
          whileHover={{ y: -4 }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Income Change</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-500 dark:text-emerald-400">{incChange}%</p>
          <p className="text-xs text-muted-foreground mt-1">Increased vs last month</p>
        </motion.div>

        {/* Predicted Income */}
        <motion.div variants={item}
          className="relative overflow-hidden rounded-2xl p-6 border border-blue-400/30 bg-gradient-to-br from-blue-500/20 via-sky-500/10 to-transparent backdrop-blur-xl"
          whileHover={{ y: -4 }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Income AI</span>
          </div>
          {incPrediction ? (
            <>
              <p className="text-2xl font-extrabold text-foreground">{formatCurrency(incPrediction)}</p>
              <p className="text-xs text-blue-500 dark:text-blue-400 font-semibold mt-1">Predicted for next month</p>
            </>
          ) : (
            <div className="space-y-2 mt-2">
              <div className="h-7 w-32 bg-blue-400/20 rounded animate-pulse" />
              <div className="h-4 w-48 bg-blue-400/10 rounded animate-pulse" />
            </div>
          )}
        </motion.div>

        {/* Expense Change */}
        <motion.div variants={item}
          className={`relative overflow-hidden rounded-2xl p-6 border backdrop-blur-xl ${
            expPositive
              ? "border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent"
              : "border-rose-400/30 bg-gradient-to-br from-rose-500/20 via-red-500/10 to-transparent"
          }`}
          whileHover={{ y: -4 }}>
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl ${expPositive ? "bg-emerald-400/10" : "bg-rose-400/10"}`} />
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-lg ${
              expPositive ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30" : "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30"
            }`}>
              {expPositive ? <TrendingDown className="h-5 w-5 text-white" /> : <TrendingUp className="h-5 w-5 text-white" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expense Change</span>
          </div>
          <p className={`text-2xl font-extrabold ${expPositive ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
            {expChange}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">{expPositive ? "Decreased" : "Increased"} vs last month</p>
        </motion.div>

        {/* Predicted Expense */}
        <motion.div variants={item}
          className="relative overflow-hidden rounded-2xl p-6 border border-violet-400/30 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent backdrop-blur-xl"
          whileHover={{ y: -4 }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-400/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expense AI</span>
          </div>
          {expPrediction ? (
            <>
              <p className="text-2xl font-extrabold text-foreground">{formatCurrency(expPrediction)}</p>
              <p className="text-xs text-violet-500 dark:text-violet-400 font-semibold mt-1">Predicted for next month</p>
            </>
          ) : (
            <div className="space-y-2 mt-2">
              <div className="h-7 w-32 bg-violet-400/20 rounded animate-pulse" />
              <div className="h-4 w-48 bg-violet-400/10 rounded animate-pulse" />
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ROW 1: Dual Chart (col-span-2) + Savings Gauge (col-span-1) */}
        <motion.div variants={item} className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-5 rounded-full bg-blue-500 inline-block" />
            <h3 className="font-bold text-foreground">Income vs. Expense Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={cashFlowTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number, name: string) => [formatCurrency(v), name.charAt(0).toUpperCase() + name.slice(1)]} />
              <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-1 glass-card p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <Target className="h-8 w-8 text-emerald-500 mb-4 opacity-80" />
          <h3 className="font-bold text-foreground text-lg mb-1">Savings Rate</h3>
          <p className="text-xs text-muted-foreground mb-6">Current Month Performance</p>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Speedometer Gauge */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 block">
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="8" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeDasharray="251.2" />
              {/* 84.8% of 251.2 = 213 */}
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="8" stroke="url(#emeraldGrad)" strokeDasharray="251.2" strokeDashoffset="38.2" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              <defs>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <p className="text-4xl font-extrabold text-foreground tracking-tighter">84.8<span className="text-xl text-muted-foreground">%</span></p>
              <p className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1">Excellent</p>
            </div>
          </div>

          <p className="text-sm font-medium text-foreground mt-4">Target: 50.0%</p>
        </motion.div>

        {/* ROW 2: 3 Micro-panels */}
        <motion.div variants={item} className="glass-card p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-5 rounded-full bg-orange-400 inline-block" />
            <h3 className="font-bold text-foreground">Budget Utilization</h3>
          </div>
          <div className="space-y-5 flex-1 justify-center flex flex-col">
            {budgetUtilization.map((b) => (
              <div key={b.category}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-foreground">{b.category}</span>
                  <span className="text-muted-foreground text-xs"><strong className="text-foreground">{formatCurrency(b.spent)}</strong> / {formatCurrency(b.limit)}</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(b.spent / b.limit) * 100}%` }} 
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${b.color}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-5 rounded-full bg-purple-400 inline-block" />
            <h3 className="font-bold text-foreground">Cost Rigidity</h3>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fixedVsVariable} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {fixedVsVariable.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {fixedVsVariable.map(f => (
              <div key={f.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: f.color }} />
                  <span className="text-muted-foreground">{f.name}</span>
                </div>
                <span className="font-bold text-foreground">{formatCurrency(f.value)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-5 rounded-full bg-rose-400 inline-block" />
            <h3 className="font-bold text-foreground">Cash Flow Heatmap</h3>
          </div>
          
          <div className="mb-6">
            <div className="grid grid-cols-7 gap-1.5 opacity-90">
              {heatmap.map((d) => {
                let color = "bg-secondary";
                if (d.intensity === 1) color = "bg-rose-500/30";
                if (d.intensity === 2) color = "bg-rose-500/60";
                if (d.intensity === 3) color = "bg-rose-500";
                return (
                  <div key={d.day} className={`aspect-square rounded-sm ${color} transition-all hover:scale-110 hover:ring-2 hover:ring-rose-400 cursor-pointer`} title={`Day ${d.day}: ${d.intensity === 0 ? 'No spend' : 'High spend'}`} />
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2 uppercase tracking-widest">April Timeline</p>
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Top Merchants</p>
            <div className="space-y-3">
              {topMerchants.map(m => (
                <div key={m.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                    {m.name}
                  </div>
                  <span className="font-bold text-rose-500 dark:text-rose-400">{formatCurrency(m.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Key Insights */}
      <motion.div variants={item} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-bold text-foreground">Key Insights from Current Month's Transactions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INSIGHTS.map((insight, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${insight.border} bg-gradient-to-br ${insight.color}`}>
              <div className="flex items-start gap-3">
                <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 shadow-sm ${insight.dot}`} />
                <p className="text-sm text-foreground/90 font-medium leading-relaxed">{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default AnalyticsPage;
