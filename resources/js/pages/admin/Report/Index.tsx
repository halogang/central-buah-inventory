import { useState } from "react";
import { DollarSign, Package, ShoppingCart, Receipt, TrendingDown } from "lucide-react";
import { FilterBar } from "@/components/report/FilterBar";
import { ExportButtons } from "@/components/report/ExportButtons";
import { TabKeuangan } from "./components/KeuaganTab";
import { TabStok } from "./components/StokTab";
import { TabPenjualan } from "./components/PenjualanTab";
import { TabPengeluaran } from "./components/PengeluaranTab";
import { TabLabaRugi } from "./components/LabaRugiTab";
import AppLayout from "@/layouts/app-layout";

const TABS = [
  { id: "keuangan", label: "Keuangan", icon: DollarSign },
  { id: "stok", label: "Stok", icon: Package },
  { id: "penjualan", label: "Penjualan", icon: ShoppingCart },
  { id: "pengeluaran", label: "Pengeluaran", icon: Receipt },
  { id: "laba-rugi", label: "Laba Rugi", icon: TrendingDown },
];

export default function LaporanPage() {
  const [activeTab, setActiveTab] = useState("keuangan");
  const [month, setMonth] = useState(1); // Februari
  const [year, setYear] = useState(2026);

  return (
    <AppLayout>
        <div className="p-4 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Laporan</h1>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1">
                {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-100 ${
                        isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    >
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                    </button>
                );
                })}
            </div>

            {/* Filters & Export */}
            <div className="flex items-center justify-between">
                <FilterBar month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
                <ExportButtons />
            </div>

            {/* Tab Content */}
            {activeTab === "keuangan" && <TabKeuangan />}
            {activeTab === "stok" && <TabStok />}
            {activeTab === "penjualan" && <TabPenjualan />}
            {activeTab === "pengeluaran" && <TabPengeluaran />}
            {activeTab === "laba-rugi" && <TabLabaRugi />}
            </div>
    </AppLayout>
  );
}
