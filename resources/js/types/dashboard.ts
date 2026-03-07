export interface Transaction {
  id: string;
  company: string;
  date: string;
  itemCount: number;
  amount: number;
  status: "selesai" | "dikirim" | "draft";
  type: "in" | "out";
}

export interface Product {
  id: string;
  name: string;
  emoji: string;
  stock: number;
  minStock: number;
  unit: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
}

export interface StatCard {
  label: string;
  value: string;
  trend: string;
  icon: string;
  color: "success" | "info" | "warning" | "danger";
}
