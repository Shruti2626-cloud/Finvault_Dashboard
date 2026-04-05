export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "credit" | "debit";
}

export interface Stock {
  name: string;
  symbol: string;
  invested: number;
  current: number;
}

export const transactions: Transaction[] = [
  { id: "1", date: "2025-04-01", description: "Freelance Payment", amount: 45000, category: "Income", type: "credit" },
  { id: "2", date: "2025-04-02", description: "Grocery Store", amount: 2340, category: "Grocery", type: "debit" },
  { id: "3", date: "2025-04-03", description: "Flight Booking", amount: 8500, category: "Travel", type: "debit" },
  { id: "4", date: "2025-04-04", description: "Restaurant", amount: 1200, category: "Food", type: "debit" },
  { id: "5", date: "2025-04-05", description: "Salary", amount: 85000, category: "Income", type: "credit" },
  { id: "6", date: "2025-04-06", description: "Amazon Purchase", amount: 3400, category: "Shopping", type: "debit" },
  { id: "7", date: "2025-04-07", description: "Uber Ride", amount: 450, category: "Travel", type: "debit" },
  { id: "8", date: "2025-04-08", description: "Stationery", amount: 680, category: "Stationery", type: "debit" },
  { id: "9", date: "2025-04-09", description: "Dividend", amount: 12000, category: "Income", type: "credit" },
  { id: "10", date: "2025-04-10", description: "Swiggy Order", amount: 890, category: "Food", type: "debit" },
  { id: "11", date: "2025-04-11", description: "Office Supplies", amount: 1500, category: "Stationery", type: "debit" },
  { id: "12", date: "2025-04-12", description: "Hotel Stay", amount: 6200, category: "Travel", type: "debit" },
  { id: "13", date: "2025-04-13", description: "Client Payment", amount: 32000, category: "Income", type: "credit" },
  { id: "14", date: "2025-04-14", description: "Vegetables", amount: 560, category: "Grocery", type: "debit" },
  { id: "15", date: "2025-04-15", description: "Netflix Sub", amount: 649, category: "Others", type: "debit" },
];

export const balanceTrend = [
  { month: "Oct", balance: 125000 },
  { month: "Nov", balance: 142000 },
  { month: "Dec", balance: 138000 },
  { month: "Jan", balance: 156000 },
  { month: "Feb", balance: 168000 },
  { month: "Mar", balance: 175000 },
  { month: "Apr", balance: 192000 },
];

export const expenseTrend = [
  { month: "Oct", expense: 42000 },
  { month: "Nov", expense: 38000 },
  { month: "Dec", expense: 51000 },
  { month: "Jan", expense: 35000 },
  { month: "Feb", expense: 44000 },
  { month: "Mar", expense: 39000 },
  { month: "Apr", expense: 26369 },
];

export const spendingBreakdown = [
  { name: "Food", value: 2090, color: "hsl(160, 84%, 39%)" },
  { name: "Travel", value: 15150, color: "hsl(210, 90%, 55%)" },
  { name: "Grocery", value: 2900, color: "hsl(38, 92%, 50%)" },
  { name: "Stationery", value: 2180, color: "hsl(250, 80%, 62%)" },
  { name: "Shopping", value: 3400, color: "hsl(330, 70%, 55%)" },
  { name: "Others", value: 649, color: "hsl(0, 0%, 50%)" },
];

export const stocks: Stock[] = [
  { name: "Reliance Industries", symbol: "RELIANCE", invested: 50000, current: 58500 },
  { name: "TCS", symbol: "TCS", invested: 40000, current: 37200 },
  { name: "Infosys", symbol: "INFY", invested: 35000, current: 41300 },
  { name: "HDFC Bank", symbol: "HDFCBANK", invested: 60000, current: 63000 },
  { name: "ITC", symbol: "ITC", invested: 25000, current: 29800 },
  { name: "Wipro", symbol: "WIPRO", invested: 20000, current: 18400 },
];

export const marketIndices = [
  { name: "NIFTY 50", value: 22456.80, change: 1.24 },
  { name: "SENSEX", value: 73890.45, change: -0.38 },
];

export const formatCurrency = (val: number) =>
  "₹" + val.toLocaleString("en-IN");

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
