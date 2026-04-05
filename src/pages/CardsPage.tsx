import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard as CardIcon, Wifi, Sparkles, Building2, AlertCircle, RefreshCw, Archive, Zap } from "lucide-react";
import { formatCurrency, delay, cardsData } from "@/lib/mockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

// Mock Logo Paths or Text
const getNetworkLogo = (network: string) => {
  switch (network) {
    case "Visa": return <span className="font-bold italic text-white/90 text-2xl tracking-tighter">VISA</span>;
    case "Mastercard": return (
      <div className="flex">
        <div className="w-8 h-8 rounded-full bg-red-500/80 -mr-3 mix-blend-multiply" />
        <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-multiply" />
      </div>
    );
    case "Amex": return <span className="font-bold text-blue-100/90 text-xl border border-blue-100/30 px-2 py-0.5 rounded bg-blue-900/30">AMEX</span>;
    default: return <span className="font-bold text-white/90">{network}</span>;
  }
};

const CardsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    delay(600).then(() => setLoading(false));
  }, []);

  const activeCards = cardsData.filter(c => c.status === "Active");
  const inactiveCards = cardsData.filter(c => c.status === "Deactivated");

  const totalLimit = activeCards.reduce((acc, c) => acc + c.limit, 0);
  const totalSpent = activeCards.reduce((acc, c) => acc + c.spent, 0);
  const totalPayable = activeCards.reduce((acc, c) => acc + c.payable, 0);
  const totalRewards = activeCards.reduce((acc, c) => acc + c.rewards, 0);
  
  const overallUtilization = (totalSpent / totalLimit) * 100;

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10 max-w-7xl mx-auto pb-10">
      
      {/* Header & Main Stats */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Virtual Wallet</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your credit line, limits, and due payments</p>
        </motion.div>

        <motion.div variants={item} className="p-4 rounded-2xl glass-card border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent flex gap-6 shadow-xl shadow-primary/5">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Total Payable</p>
            <p className="text-2xl font-black text-rose-500 dark:text-rose-400">{formatCurrency(totalPayable)}</p>
          </div>
          <div className="w-px bg-border my-1" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Total Credit Line</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-foreground">{formatCurrency(totalLimit)}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${overallUtilization > 50 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {overallUtilization.toFixed(1)}% Used
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Graphical Cards Row */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" /> Active Plastics
        </h2>
        
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-thin">
          {activeCards.map(card => (
            <motion.div 
              key={card.id}
              whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
              className={`snap-center shrink-0 w-[340px] h-[215px] rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-gradient-to-br ${card.colorStart} ${card.colorEnd} group`}
            >
              {/* Card Glare & Pattern Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
              
              {/* Top Row: Bank & Wifi */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-white/90 font-bold tracking-widest uppercase text-xs opacity-80">{card.bank}</h3>
                  <p className="text-white font-semibold mt-0.5">{card.name}</p>
                </div>
                <Wifi className="text-white/70 h-6 w-6 rotate-90" />
              </div>

              {/* Middle: Emv Card Chip & Number */}
              <div className="relative z-10 mt-2">
                <div className="w-11 h-8 rounded bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 mb-4 opacity-90 shadow-sm" />
                <p className="font-mono text-xl text-white tracking-[0.2em] shadow-black/50 text-shadow-sm">
                  •••• •••• •••• {card.last4}
                </p>
              </div>

              {/* Bottom: Name, Expiry & Network */}
              <div className="relative z-10 flex justify-between items-end mt-2">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">Valid Thru</p>
                  <p className="text-white font-mono tracking-wider">{card.expiry}</p>
                </div>
                <div className="scale-90 origin-bottom-right">
                  {getNetworkLogo(card.network)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Utilization breakdown grids */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeCards.map(card => {
          const utilPct = (card.spent / card.limit) * 100;
          return (
            <div key={`${card.id}-util`} className="glass-card-hover p-6 rounded-2xl border-border flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${card.colorStart} ${card.colorEnd} shadow-inner`}>
                    <CardIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{card.bank} •••• {card.last4}</h3>
                    <p className="text-xs text-muted-foreground">{card.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Payable Now</p>
                  <p className="text-lg font-black text-rose-500 dark:text-rose-400">{formatCurrency(card.payable)}</p>
                </div>
              </div>

              <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-foreground">{formatCurrency(card.spent)} <span className="text-muted-foreground font-normal">Spent</span></span>
                  <span className="text-muted-foreground">{formatCurrency(card.limit)} Limit</span>
                </div>
                <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden relative mb-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${utilPct}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${utilPct > 70 ? 'bg-rose-500' : 'bg-primary'}`}
                  />
                </div>
                <p className="text-xs text-right text-muted-foreground font-medium">{utilPct.toFixed(1)}% Utilized</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-bold text-foreground">{card.rewards.toLocaleString()} <span className="text-muted-foreground font-normal">pts</span></span>
                </div>
                <button className="text-xs font-semibold px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                  Pay Bill
                </button>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Deactivated Archive */}
      {inactiveCards.length > 0 && (
        <motion.div variants={item} className="pt-6 border-t border-border mt-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2 text-muted-foreground">
            <Archive className="h-5 w-5" /> Inactive & Blocked Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactiveCards.map(card => (
              <div key={card.id} className="flex items-start justify-between p-4 rounded-xl border border-border bg-secondary/20 grayscale opacity-70">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-card border border-border shadow-sm">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground line-through decoration-muted-foreground/50">{card.bank} •••• {card.last4}</h3>
                    <p className="text-xs text-muted-foreground">{card.name}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-secondary text-muted-foreground rounded mix-blend-multiply dark:mix-blend-screen">
                  Closed
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default CardsPage;
