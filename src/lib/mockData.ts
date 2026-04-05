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

export interface Invoice {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "Subscription" | "Tax" | "Salary" | "Payment";
  status: "Paid" | "Pending";
}

export const invoices: Invoice[] = [
  { id: "inv-001", title: "Freelance Design Retainer", date: "2026-04-10", amount: 45000, type: "Payment", status: "Paid" },
  { id: "inv-002", title: "Quarterly Advance Tax", date: "2026-04-05", amount: 15500, type: "Tax", status: "Paid" },
  { id: "inv-003", title: "Figma Pro Yearly", date: "2026-03-28", amount: 12500, type: "Subscription", status: "Paid" },
  { id: "inv-004", title: "March Main Salary", date: "2026-03-31", amount: 85000, type: "Salary", status: "Paid" },
  { id: "inv-005", title: "AWS Cloud Hosting", date: "2026-04-20", amount: 4200, type: "Subscription", status: "Pending" },
  { id: "inv-006", title: "Professional Tax", date: "2026-04-25", amount: 2500, type: "Tax", status: "Pending" },
];

export const currentMonthReport = {
  month: "April 2026",
  income: 174000,
  expense: 26369,
  profit: 147631,
  insight: "Your savings rate this month stands at an impressive 84.8%. Strong financial discipline!",
  topCategory: { name: "Travel", amount: 15150 },
};

export const reportsList = [
  "March 2026", "February 2026", "January 2026", "December 2025", "November 2025"
];

export const cashFlowTrend = [
  { month: "Oct", income: 145000, expense: 42000 },
  { month: "Nov", income: 152000, expense: 38000 },
  { month: "Dec", income: 180000, expense: 51000 },
  { month: "Jan", income: 148000, expense: 35000 },
  { month: "Feb", income: 155000, expense: 44000 },
  { month: "Mar", income: 165000, expense: 39000 },
  { month: "Apr", income: 174000, expense: 26369 },
];

export const fixedVsVariable = [
  { name: "Fixed (Rent, EMI, Subs)", value: 45000, color: "hsl(250, 80%, 62%)" },
  { name: "Variable (Food, Travel, Misc)", value: 25000, color: "hsl(210, 90%, 55%)" },
];

export const budgetUtilization = [
  { category: "Food & Dining", spent: 2090, limit: 5000, color: "bg-emerald-500" },
  { category: "Travel & Fuel", spent: 15150, limit: 12000, color: "bg-rose-500" },
  { category: "Shopping", spent: 3400, limit: 10000, color: "bg-blue-500" },
];

export const topMerchants = [
  { name: "Amazon", amount: 12500, type: "Shopping" },
  { name: "Uber", amount: 8450, type: "Travel" },
  { name: "Swiggy", amount: 4200, type: "Food" },
];

export const generateHeatmapData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    intensity: Math.floor(Math.random() * 4), // 0: none, 1: low, 2: med, 3: high
  }));
};

export interface Loan {
  id: string;
  provider: string;
  type: "Home" | "Auto" | "Personal" | "Education";
  amount: number;
  emi: number;
  totalEmis: number;
  paidEmis: number;
  interestRate: number;
  status: "Active" | "Paid Off";
  startDate: string;
}

export const loansData: Loan[] = [
  { id: "L1", provider: "HDFC Bank", type: "Home", amount: 4500000, emi: 38500, totalEmis: 240, paidEmis: 35, interestRate: 8.5, status: "Active", startDate: "2023-05-10" },
  { id: "L2", provider: "SBI", type: "Auto", amount: 800000, emi: 18400, totalEmis: 60, paidEmis: 60, interestRate: 9.0, status: "Paid Off", startDate: "2019-02-15" },
  { id: "L3", provider: "ICICI Bank", type: "Personal", amount: 500000, emi: 16500, totalEmis: 36, paidEmis: 12, interestRate: 11.5, status: "Active", startDate: "2025-04-01" },
  { id: "L4", provider: "Axis Bank", type: "Education", amount: 1200000, emi: 22000, totalEmis: 84, paidEmis: 84, interestRate: 7.5, status: "Paid Off", startDate: "2016-08-20" },
];

export interface CreditCard {
  id: string;
  bank: string;
  name: string;
  network: "Visa" | "Mastercard" | "Amex" | "RuPay";
  last4: string;
  limit: number;
  spent: number;
  payable: number;
  rewards: number;
  expiry: string;
  status: "Active" | "Deactivated";
  colorStart: string;
  colorEnd: string;
}

export const cardsData: CreditCard[] = [
  { id: "C1", bank: "HDFC Bank", name: "Regalia Gold", network: "Visa", last4: "4092", limit: 500000, spent: 125000, payable: 45000, rewards: 12500, expiry: "12/28", status: "Active", colorStart: "from-amber-600", colorEnd: "to-yellow-700" },
  { id: "C2", bank: "American Express", name: "Platinum Reserve", network: "Amex", last4: "8821", limit: 800000, spent: 340000, payable: 340000, rewards: 85000, expiry: "08/27", status: "Active", colorStart: "from-slate-700", colorEnd: "to-slate-900" },
  { id: "C3", bank: "ICICI Bank", name: "Amazon Pay", network: "Visa", last4: "1154", limit: 200000, spent: 18000, payable: 18000, rewards: 2400, expiry: "03/29", status: "Active", colorStart: "from-orange-500", colorEnd: "to-rose-600" },
  { id: "C4", bank: "SBI Card", name: "SimplyCLICK", network: "Mastercard", last4: "9910", limit: 100000, spent: 95000, payable: 0, rewards: 1200, expiry: "05/24", status: "Deactivated", colorStart: "from-blue-600", colorEnd: "to-indigo-800" },
];

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
