import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Plus, ArrowUpDown } from "lucide-react";
import { transactions as allTx, formatCurrency, delay, Transaction } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";

const categories = ["All", "Income", "Food", "Travel", "Grocery", "Shopping", "Stationery", "Others"];
const types = ["All", "credit", "debit"];

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
    let content: string;
    let mime: string;
    let ext: string;
    if (format === "json") {
      content = JSON.stringify(filtered, null, 2);
      mime = "application/json";
      ext = "json";
    } else {
      const header = "Date,Description,Amount,Category,Type";
      const rows = filtered.map((t) => `${t.date},${t.description},${t.amount},${t.category},${t.type}`);
      content = [header, ...rows].join("\n");
      mime = "text/csv";
      ext = "csv";
    }
    const blob = new Blob([content], { type: mime });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `transactions.${ext}`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} records</p>
        </div>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" /> Add
            </button>
          )}
          <button onClick={() => exportData("csv")} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors">
            <Download className="h-4 w-4" /> CSV
          </button>
          <button onClick={() => exportData("json")} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors">
            <Download className="h-4 w-4" /> JSON
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full h-9 rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="h-9 rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground focus:outline-none">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-9 rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground capitalize focus:outline-none">
          {types.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
        </select>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium cursor-pointer select-none" onClick={() => toggleSort("date")}>
                  <span className="inline-flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Description</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium cursor-pointer select-none" onClick={() => toggleSort("amount")}>
                  <span className="inline-flex items-center gap-1">Amount <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-5 py-3 text-muted-foreground">{new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                  <td className="px-5 py-3 text-foreground font-medium">{tx.description}</td>
                  <td className={`px-5 py-3 font-semibold ${tx.type === "credit" ? "text-success" : "text-destructive"}`}>
                    {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">{tx.category}</span>
                  </td>
                  <td className="px-5 py-3 capitalize text-muted-foreground">{tx.type}</td>
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
