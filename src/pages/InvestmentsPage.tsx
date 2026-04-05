import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { stocks, marketIndices, formatCurrency, delay } from "@/lib/mockData";

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const InvestmentsPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { delay(700).then(() => setLoading(false)); }, []);

  const totalInvested = stocks.reduce((a, s) => a + s.invested, 0);
  const totalCurrent = stocks.reduce((a, s) => a + s.current, 0);
  const totalPL = totalCurrent - totalInvested;

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
        <h1 className="text-2xl font-bold text-foreground">Investments</h1>
        <p className="text-sm text-muted-foreground">Portfolio overview</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {marketIndices.map((idx) => (
          <motion.div key={idx.name} variants={item} className="glass-card-hover p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{idx.name}</p>
              <p className="text-xl font-bold text-foreground">{idx.value.toLocaleString("en-IN")}</p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold ${idx.change >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
              {idx.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {Math.abs(idx.change)}%
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="glass-card p-5 flex flex-wrap gap-8">
        <div>
          <p className="text-sm text-muted-foreground">Total Invested</p>
          <p className="text-xl font-bold text-foreground">{formatCurrency(totalInvested)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className="text-xl font-bold text-foreground">{formatCurrency(totalCurrent)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">P&L</p>
          <p className={`text-xl font-bold ${totalPL >= 0 ? "text-success" : "text-destructive"}`}>
            {totalPL >= 0 ? "+" : ""}{formatCurrency(totalPL)}
          </p>
        </div>
      </motion.div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Stock</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Symbol</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium">Invested</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium">Current</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium">P&L %</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s, i) => {
                const pl = ((s.current - s.invested) / s.invested * 100).toFixed(1);
                const positive = s.current >= s.invested;
                return (
                  <motion.tr
                    key={s.symbol}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-5 py-3 text-foreground font-medium">{s.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.symbol}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">{formatCurrency(s.invested)}</td>
                    <td className="px-5 py-3 text-right text-foreground font-medium">{formatCurrency(s.current)}</td>
                    <td className={`px-5 py-3 text-right font-semibold ${positive ? "text-success" : "text-destructive"}`}>
                      <span className="inline-flex items-center gap-1">
                        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {positive ? "+" : ""}{pl}%
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentsPage;
