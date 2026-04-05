import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, Plus, ArrowUpDown, ShoppingBag, Plane, Utensils, ShoppingCart, BookOpen, Briefcase, Tag } from "lucide-react";
import { transactions as allTx, formatCurrency, delay, Transaction } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";

const categories = ["All", "Income", "Food", "Travel", "Grocery", "Shopping", "Stationery", "Others"];
const types = ["All", "credit", "debit"];

// category → color config
const CATEGORY_CONFIG: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  Income:       { bg: "bg-emerald-500/15 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", icon: Briefcase },
  Food:         { bg: "bg-orange-500/15 dark:bg-orange-500/20",   text: "text-orange-600 dark:text-orange-400",   icon: Utensils },
  Travel:       { bg: "bg-blue-500/15 dark:bg-blue-500/20",       text: "text-blue-600 dark:text-blue-400",       icon: Plane },
  Grocery:      { bg: "bg-teal-500/15 dark:bg-teal-500/20",       text: "text-teal-600 dark:text-teal-400",       icon: ShoppingCart },
  Shopping:     { bg: "bg-pink-500/15 dark:bg-pink-500/20",       text: "text-pink-600 dark:text-pink-400",       icon: ShoppingBag },
  Stationery:   { bg: "bg-violet-500/15 dark:bg-violet-500/20",   text: "text-violet-600 dark:text-violet-400",   icon: BookOpen },
  Others:       { bg: "bg-slate-500/15 dark:bg-slate-500/20",     text: "text-slate-500 dark:text-slate-400",     icon: Tag },
};

const CategoryBadge = ({ category }: { category: string }) => {
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.Others;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <Icon className="h-3 w-3" />
      {category}
    </span>
  );
};

const TransactionsPage = () => {
  const { role } = useApp();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortKey, setSortKey] = useState<"date" | "amount">("date");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => { delay(600).then(() => setLoading(false)); }, []);

  const filtered = useMemo(() => {
    let data = [...allTx];
    if (search) data = data.filter((t) => t.description.toLowerCase().includes(search.toLowerCase()));
    if (catFilter !== "All") data = data.filter((t) => t.category === catFilter);
    if (typeFilter !== "All") data = data.filter((t) => t.type === typeFilter);
    data.sort((a, b) => {
      const m = sortAsc ? 1 : -1;
      if (sortKey === "date") return m * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return m * (a.amount - b.amount);
    });
    return data;
  }, [search, catFilter, typeFilter, sortKey, sortAsc]);

  const toggleSort = (key: "date" | "amount") => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const exportData = (format: "csv" | "json") => {
    let content: string, mime: string, ext: string;
    if (format === "json") { content = JSON.stringify(filtered, null, 2); mime = "application/json"; ext = "json"; }
    else {
      const header = "Date,Description,Amount,Category,Type";
      const rows = filtered.map((t) => `${t.date},${t.description},${t.amount},${t.category},${t.type}`);
      content = [header, ...rows].join("\n"); mime = "text/csv"; ext = "csv";
    }
    const blob = new Blob([content], { type: mime });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `transactions.${ext}`; a.click();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  // summary stats
  const totalCredits = filtered.filter(t => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalDebits  = filtered.filter(t => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-7xl mx-auto">

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} records found</p>
        </div>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-emerald-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">
              <Plus className="h-4 w-4" /> Add
            </button>
          )}
          <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors">
            <Download className="h-4 w-4" /> PDF
          </button>
          <button onClick={() => exportData("csv")} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors">
            <Download className="h-4 w-4" /> CSV
          </button>
          <button onClick={() => exportData("json")} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors">
            <Download className="h-4 w-4" /> JSON
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-4 border border-emerald-400/25 bg-gradient-to-br from-emerald-500/15 to-teal-500/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Credits</p>
          <p className="text-xl font-extrabold text-emerald-500 dark:text-emerald-400">+{formatCurrency(totalCredits)}</p>
        </div>
        <div className="rounded-2xl p-4 border border-rose-400/25 bg-gradient-to-br from-rose-500/15 to-red-500/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Debits</p>
          <p className="text-xl font-extrabold text-rose-500 dark:text-rose-400">-{formatCurrency(totalDebits)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..."
            className="w-full h-10 rounded-xl border border-border bg-secondary/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
          className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40">
          {categories.map((c) => <option key={c} value={c} className="bg-card text-foreground">{c}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground capitalize focus:outline-none focus:ring-2 focus:ring-primary/40">
          {types.map((t) => <option key={t} value={t} className="bg-card text-foreground">{t === "All" ? "All Types" : t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {/* Colored header strip */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-blue-500 via-violet-500 to-rose-500" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-5 py-3.5 text-muted-foreground font-semibold cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => toggleSort("date")}>
                  <span className="inline-flex items-center gap-1.5">Date <ArrowUpDown className="h-3.5 w-3.5" /></span>
                </th>
                <th className="text-left px-5 py-3.5 text-muted-foreground font-semibold">Description</th>
                <th className="text-left px-5 py-3.5 text-muted-foreground font-semibold cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => toggleSort("amount")}>
                  <span className="inline-flex items-center gap-1.5">Amount <ArrowUpDown className="h-3.5 w-3.5" /></span>
                </th>
                <th className="text-left px-5 py-3.5 text-muted-foreground font-semibold">Category</th>
                <th className="text-left px-5 py-3.5 text-muted-foreground font-semibold">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <motion.tr key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025 }}
                  className="border-b border-border/40 hover:bg-secondary/30 transition-colors group">
                  <td className="px-5 py-3.5 text-muted-foreground text-sm">
                    {new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </td>
                  <td className="px-5 py-3.5 text-foreground font-medium">{tx.description}</td>
                  <td className={`px-5 py-3.5 font-bold tabular-nums ${tx.type === "credit" ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                    {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <CategoryBadge category={tx.category} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      tx.type === "credit"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}>{tx.type}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionsPage;
