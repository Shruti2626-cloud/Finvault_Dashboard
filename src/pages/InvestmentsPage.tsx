import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, BarChart2, PieChart as PieIcon, Wallet } from "lucide-react";
import { stocks, marketIndices, formatCurrency, delay } from "@/lib/mockData";

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

// index colors
const INDEX_CONFIG = [
  { gradient: "from-emerald-500/20 to-teal-500/5", border: "border-emerald-400/30", numColor: "text-emerald-500 dark:text-emerald-400" },
  { gradient: "from-blue-500/20 to-indigo-500/5",  border: "border-blue-400/30",   numColor: "text-blue-500 dark:text-blue-400" },
];

const InvestmentsPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { delay(700).then(() => setLoading(false)); }, []);

  const totalInvested = stocks.reduce((a, s) => a + s.invested, 0);
  const totalCurrent  = stocks.reduce((a, s) => a + s.current, 0);
  const totalPL       = totalCurrent - totalInvested;
  const plPct         = ((totalPL / totalInvested) * 100).toFixed(2);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Investments</h1>
        <p className="text-sm text-muted-foreground">Portfolio overview &amp; market indices</p>
      </motion.div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {marketIndices.map((idx, i) => {
          const cfg = INDEX_CONFIG[i] ?? INDEX_CONFIG[0];
          const positive = idx.change >= 0;
          return (
            <motion.div key={idx.name} variants={item} whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-2xl p-6 border backdrop-blur-xl bg-gradient-to-br ${cfg.gradient} ${cfg.border}`}>
              <div className="absolute top-0 right-0 w-28 h-28 opacity-20 blur-2xl rounded-full"
                style={{ background: positive ? "radial-gradient(circle,#10b981,transparent)" : "radial-gradient(circle,#f43f5e,transparent)" }} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{idx.name}</p>
                  <p className={`text-2xl font-extrabold ${cfg.numColor}`}>{idx.value.toLocaleString("en-IN")}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold ${
                  positive ? "bg-emerald-500/20 text-emerald-500 dark:text-emerald-400" : "bg-rose-500/20 text-rose-500 dark:text-rose-400"
                }`}>
                  {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(idx.change)}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Portfolio Summary */}
      <motion.div variants={item}
        className="rounded-2xl p-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500">
        <div className="rounded-[calc(1rem-2px)] bg-card p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Invested</p>
              <p className="text-xl font-extrabold text-foreground">{formatCurrency(totalInvested)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
              <PieIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Current Value</p>
              <p className="text-xl font-extrabold text-foreground">{formatCurrency(totalCurrent)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
              totalPL >= 0 ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30" : "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30"
            }`}>
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">P&amp;L</p>
              <p className={`text-xl font-extrabold ${totalPL >= 0 ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                {totalPL >= 0 ? "+" : ""}{formatCurrency(totalPL)}
                <span className="text-sm ml-1 opacity-70">({totalPL >= 0 ? "+" : ""}{plPct}%)</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stocks Table */}
      <motion.div variants={item} className="glass-card overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                {["Stock", "Symbol", "Invested", "Current", "P&L %"].map((h, i) => (
                  <th key={h} className={`px-5 py-3.5 text-muted-foreground font-semibold ${i >= 2 ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stocks.map((s, i) => {
                const pl = ((s.current - s.invested) / s.invested * 100).toFixed(1);
                const positive = s.current >= s.invested;
                // alternating subtle row tints
                const rowBg = i % 2 === 0 ? "" : "bg-secondary/10";
                return (
                  <motion.tr key={s.symbol}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b border-border/40 hover:bg-secondary/30 transition-colors ${rowBg}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                          positive ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-rose-500 to-red-600"
                        }`}>
                          {s.symbol.slice(0, 2)}
                        </div>
                        <span className="text-foreground font-semibold">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground text-xs font-mono font-bold">{s.symbol}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-muted-foreground tabular-nums">{formatCurrency(s.invested)}</td>
                    <td className="px-5 py-3.5 text-right text-foreground font-semibold tabular-nums">{formatCurrency(s.current)}</td>
                    <td className={`px-5 py-3.5 text-right font-bold tabular-nums ${positive ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                      <span className={`inline-flex items-center justify-end gap-1 px-2.5 py-1 rounded-lg ${
                        positive ? "bg-emerald-500/10" : "bg-rose-500/10"
                      }`}>
                        {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                        {positive ? "+" : ""}{pl}%
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default InvestmentsPage;
