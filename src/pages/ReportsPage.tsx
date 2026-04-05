import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, TrendingUp, TrendingDown, ChevronRight, X, Sparkles, Receipt, Briefcase, Calculator, Eye } from "lucide-react";
import { invoices, currentMonthReport, reportsList, formatCurrency, delay, stocks } from "@/lib/mockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// sort oldest to newest
const sortedInvoices = [...invoices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const getInvoiceIcon = (type: string) => {
  switch (type) {
    case "Subscription": return Receipt;
    case "Tax": return Calculator;
    case "Salary": return Briefcase;
    default: return FileText;
  }
};

const getInvoiceColor = (type: string) => {
  switch (type) {
    case "Subscription": return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-400/20";
    case "Tax": return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-400/20";
    case "Salary": return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-400/20";
    default: return "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-400/20";
  }
};

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const totalInvested = stocks.reduce((a, s) => a + s.invested, 0);

  useEffect(() => { delay(600).then(() => setLoading(false)); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto pb-10">

      <motion.div variants={item} className="flex flex-wrap gap-4 justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports &amp; Invoices</h1>
          <p className="text-sm text-muted-foreground">Monthly insights and document management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">
          <Download className="h-4 w-4" /> Export All
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COLUMN: REPORTS */}
        <div className="space-y-6">

          <motion.div variants={item} className="rounded-2xl overflow-hidden border border-border bg-card">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-500 p-6 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">{currentMonthReport.month} Summary</h2>
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Current Month</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/20">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/15 to-teal-500/5">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Income</p>
                  <p className="text-xl font-extrabold text-emerald-500 dark:text-emerald-400">{formatCurrency(currentMonthReport.income)}</p>
                </div>
                <div className="p-4 rounded-xl border border-rose-400/25 bg-gradient-to-br from-rose-500/15 to-red-500/5">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5"><TrendingDown className="h-3.5 w-3.5 text-rose-500" /> Expense</p>
                  <p className="text-xl font-extrabold text-rose-500 dark:text-rose-400">{formatCurrency(currentMonthReport.expense)}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-500/15 to-indigo-500/5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Investment</p>
                <p className="text-2xl font-extrabold text-blue-500 dark:text-blue-400">{formatCurrency(totalInvested)}</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Net Profit</p>
                  <p className="text-2xl font-extrabold text-foreground">{formatCurrency(currentMonthReport.profit)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Top Category</p>
                  <p className="text-sm font-bold text-blue-500 dark:text-blue-400">{currentMonthReport.topCategory.name} ({formatCurrency(currentMonthReport.topCategory.amount)})</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-500/15 to-purple-500/5 border border-violet-400/25">
                <Sparkles className="h-5 w-5 text-violet-500 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground font-medium leading-relaxed">{currentMonthReport.insight}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1.5 w-5 rounded-full bg-gradient-to-r from-primary to-accent inline-block" />
              <h3 className="font-bold text-foreground">Past Reports</h3>
            </div>
            <div className="space-y-2">
              {reportsList.map((m, i) => (
                <div key={m} onClick={() => setSelectedMonth(m)}
                  className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card cursor-pointer hover:bg-secondary/50 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-foreground">{m}</p>
                  </div>
                  <button className="text-xs font-semibold text-primary/70 group-hover:text-primary flex items-center gap-1 transition-colors">
                    View <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: INVOICES */}
        <motion.div variants={item} className="glass-card flex flex-col overflow-hidden h-full">
          <div className="p-6 border-b border-border bg-secondary/20">
            <h3 className="font-bold text-foreground text-lg mb-1">Invoices &amp; Documents</h3>
            <p className="text-xs text-muted-foreground">Chronological list (Oldest to Newest)</p>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
              {sortedInvoices.map((inv) => {
                const Icon = getInvoiceIcon(inv.type);
                const colorClass = getInvoiceColor(inv.type);
                return (
                  <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground line-clamp-1">{inv.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className="text-xs font-medium text-foreground">{formatCurrency(inv.amount)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400" : "bg-amber-500/10 text-amber-500 dark:text-amber-400"
                        }`}>
                        {inv.status}
                      </span>
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedMonth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-sm rounded-2xl border border-border shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Report: {selectedMonth}</h3>
                </div>
                <button onClick={() => setSelectedMonth(null)} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 text-center space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Generated Successfully</h4>
                  <p className="text-sm text-muted-foreground">The detailed financial report for {selectedMonth} is ready to view or download.</p>
                </div>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold mt-2 hover:opacity-90 transition-opacity">
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default ReportsPage;
