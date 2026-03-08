import type { Transaction, Product, Invoice, StatCard } from "@/types/dashboard";

export const statsData: StatCard[] = [
  { label: "Total Produk", value: "12", trend: "+3", icon: "package", color: "success" },
  { label: "Total Stok", value: "938", trend: "+120", icon: "boxes", color: "info" },
  { label: "Pendapatan", value: "Rp 14.500.000", trend: "+18%", icon: "trending-up", color: "warning" },
  { label: "Stok Menipis", value: "1", trend: "", icon: "alert-triangle", color: "danger" },
];

export const transactions: Transaction[] = [
  { id: "1", company: "PT Segar Abadi", date: "2026-02-18", itemCount: 5, amount: 2500000, status: "selesai", type: "in" },
  { id: "2", company: "Hotel Grand Mercure", date: "2026-02-18", itemCount: 8, amount: 4200000, status: "dikirim", type: "out" },
  { id: "3", company: "CV Import Fruits", date: "2026-02-17", itemCount: 3, amount: 5800000, status: "selesai", type: "in" },
  { id: "4", company: "Catering Ibu Sri", date: "2026-02-17", itemCount: 4, amount: 1800000, status: "selesai", type: "out" },
  { id: "5", company: "Supermarket FreshMart", date: "2026-02-16", itemCount: 12, amount: 8500000, status: "draft", type: "out" },
];

export const lowStockProducts: Product[] = [
  { id: "1", name: "Strawberry", emoji: "🍓", stock: 8, minStock: 10, unit: "pack" },
];

export const unpaidInvoices: Invoice[] = [
  { id: "1", invoiceNumber: "INV/20260218/001", company: "Hotel Grand Mercure", amount: 4200000 },
  { id: "2", invoiceNumber: "INV/20260216/001", company: "Supermarket FreshMart", amount: 8500000 },
];
