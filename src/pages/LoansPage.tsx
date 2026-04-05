import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Landmark, CheckCircle2, Clock, Wallet, Car, Home, GraduationCap, Building2 } from "lucide-react";
import { formatCurrency, delay, loansData } from "@/lib/mockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const typeIconMap = {
  Home: Home,
  Auto: Car,
  Personal: Wallet,
  Education: GraduationCap,
};

const LoansPage = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Active" | "Paid Off">("All");

  useEffect(() => {
    delay(500).then(() => setLoading(false));
  }, []);

  const filteredLoans = useMemo(() => {
    let data = [...loansData];
    if (filter !== "All") data = data.filter((l) => l.status === filter);
    // Sort from latest (newest start date) to oldest
    data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    return data;
  }, [filter]);

  // Aggregate Stats
  const activeLoans = loansData.filter((l) => l.status === "Active");
  const totalActiveDebt = activeLoans.reduce((acc, l) => acc + (l.totalEmis - l.paidEmis) * l.emi, 0);
  const totalMonthlyEmi = activeLoans.reduce((acc, l) => acc + l.emi, 0);
  const paidOffCount = loansData.filter((l) => l.status === "Paid Off").length;

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Loans Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your active liabilities and paid-off debt</p>
        </motion.div>
        
        <motion.div variants={item} className="p-1 bg-secondary border border-border rounded-xl inline-flex w-fit shadow-sm">
          {["All", "Active", "Paid Off"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                filter === f ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div variants={item} whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="p-6 rounded-2xl glass-card border border-rose-500/10 bg-gradient-to-br from-rose-500/20 via-rose-500/5 to-transparent relative overflow-hidden group hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl opacity-70 group-hover:bg-rose-500/30 transition-colors" />
          <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">Total Active Debt</p>
          <p className="text-3xl font-black text-foreground">{formatCurrency(totalActiveDebt)}</p>
          <p className="text-sm text-muted-foreground mt-2">Outstanding balance across {activeLoans.length} loans</p>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="p-6 rounded-2xl glass-card border border-amber-500/10 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent relative overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl opacity-70 group-hover:bg-amber-500/30 transition-colors" />
          <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Monthly EMI Burden</p>
          <p className="text-3xl font-black text-foreground">{formatCurrency(totalMonthlyEmi)}</p>
          <p className="text-sm text-muted-foreground mt-2">Deducted from income monthly</p>
        </motion.div>

        <motion.div variants={item} whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="p-6 rounded-2xl glass-card border border-emerald-500/10 bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl opacity-70 group-hover:bg-emerald-500/30 transition-colors" />
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Loans Paid Off</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-foreground">{paidOffCount}</p>
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Successfully cleared liabilities</p>
        </motion.div>
      </div>

      {/* Grid of Loans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {filteredLoans.map((loan) => {
          const Icon = typeIconMap[loan.type] || Landmark;
          const isActive = loan.status === "Active";
          const progressPercent = (loan.paidEmis / loan.totalEmis) * 100;
          const pendingEmis = loan.totalEmis - loan.paidEmis;

          return (
            <motion.div 
              key={loan.id} 
              variants={item}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                isActive 
                  ? "bg-card border-border shadow-xl shadow-black/5 dark:shadow-rose-900/10" 
                  : "bg-secondary/30 border-transparent opacity-80 mix-blend-luminosity grayscale-[20%]"
              }`}
            >
              {/* Top Accent Strip */}
              <div className={`h-1.5 w-full ${isActive ? "bg-gradient-to-r from-rose-500 to-orange-400" : "bg-emerald-500"}`} />

              <div className="p-6">
                {/* Header line */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-inner ${isActive ? "bg-rose-500/10" : "bg-emerald-500/10"}`}>
                      <Icon className={`h-6 w-6 ${isActive ? "text-rose-500" : "text-emerald-500"}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{loan.provider}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Building2 className="h-3.5 w-3.5" />
                        {loan.type} Loan &bull; {loan.interestRate}% ROI
                      </p>
                    </div>
                  </div>
                  <div>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                        <Clock className="h-3.5 w-3.5" /> Ongoing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Cleared
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-3xl font-black text-foreground tracking-tight">{formatCurrency(loan.amount)}</p>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">Principal Amount</p>
                    </div>
                    {isActive && (
                      <div className="text-right">
                        <p className="text-rose-500 dark:text-rose-400 font-bold">{progressPercent.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">Paid Off</p>
                      </div>
                    )}
                  </div>
                  
                  {isActive && (
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mt-4 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Details Grid */}
                {isActive ? (
                  <div className="grid grid-cols-2 gap-4 bg-secondary/40 p-4 rounded-2xl border border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
                      <p className="text-lg font-bold text-foreground">{formatCurrency(loan.emi)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pending EMIs</p>
                      <p className="text-lg font-bold text-rose-500 dark:text-rose-400">{pendingEmis} <span className="text-xs text-muted-foreground font-medium">/ {loan.totalEmis}</span></p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                    <div>
                      <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mb-1">Status</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Fully Repaid</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-emerald-500/30" />
                  </div>
                )}
                
              </div>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
};

export default LoansPage;
