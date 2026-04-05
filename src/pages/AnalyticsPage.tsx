import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { expenseTrend, spendingBreakdown, formatCurrency, delay } from "@/lib/mockData";

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const chartTooltipStyle = {
  backgroundColor: "hsl(228 15% 14%)",
  border: "1px solid hsl(228 12% 22%)",
  borderRadius: "8px",
  color: "hsl(210 20% 95%)",
  fontSize: "12px",
};

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    delay(700).then(() => setLoading(false));
    delay(2000).then(() => {
      const avg = expenseTrend.reduce((a, b) => a + b.expense, 0) / expenseTrend.length;
      setPrediction(Math.round(avg * 1.05));
    });
  }, []);

  const highest = [...spendingBreakdown].sort((a, b) => b.value - a.value)[0];
  const lastTwo = expenseTrend.slice(-2);
  const monthChange = ((lastTwo[1].expense - lastTwo[0].expense) / lastTwo[0].expense * 100).toFixed(1);
  const monthPositive = Number(monthChange) <= 0;

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
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Insights into your spending</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div variants={item} className="glass-card-hover p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Highest Category</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{highest.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{formatCurrency(highest.value)} spent</p>
        </motion.div>

        <motion.div variants={item} className="glass-card-hover p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
              {monthPositive ? <TrendingDown className="h-5 w-5 text-success" /> : <TrendingUp className="h-5 w-5 text-destructive" />}
            </div>
            <span className="text-sm font-medium text-muted-foreground">Monthly Change</span>
          </div>
          <p className={`text-2xl font-bold ${monthPositive ? "text-success" : "text-destructive"}`}>{monthChange}%</p>
          <p className="text-sm text-muted-foreground mt-1">{monthPositive ? "Decreased" : "Increased"} vs last month</p>
        </motion.div>

        <motion.div variants={item} className="glass-card-hover p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Brain className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">AI Prediction</span>
          </div>
          {prediction ? (
            <>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(prediction)}</p>
              <p className="text-sm text-muted-foreground mt-1">Predicted next month expense</p>
            </>
          ) : (
            <div className="space-y-2 mt-2">
              <div className="h-6 w-32 bg-secondary rounded animate-pulse" />
              <div className="h-4 w-48 bg-secondary rounded animate-pulse" />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Expense Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenseTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,20%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(215,15%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215,15%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [formatCurrency(v), "Expense"]} />
            <Bar dataKey="expense" fill="hsl(250,80%,62%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Key Insights</h3>
        <div className="space-y-3">
          {[
            "Travel is your largest expense category at ₹15,150 — consider budgeting limits.",
            "Income increased 12.3% this month — great momentum.",
            `Spending ${monthPositive ? "decreased" : "increased"} by ${Math.abs(Number(monthChange))}% vs last month.`,
            "Food expenses are well under control at ₹2,090.",
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <p className="text-sm text-secondary-foreground">{insight}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsPage;
