import { TrendingDown, ShoppingCart, Settings } from "lucide-react";
import { ChartArea } from "@/components/report/ChartArea";
import { SummaryCard } from "@/components/report/SummaryCard";
import { formatCurrency } from "@/helpers/format";

const breakdownData = [
  { category: "Pembelian Stok", amount: 24000000, persen: "65%" },
  { category: "Gaji Karyawan", amount: 5000000, persen: "13%" },
  { category: "Operasional", amount: 2500000, persen: "7%" },
  { category: "Utilitas", amount: 2300000, persen: "7%" },
  { category: "Transportasi", amount: 3000000, persen: "8%" },
];

const trendData = [ 
  { name: "Sep", stok: 20000000, operasional: 8000000, gaji: 5000000 },
  { name: "Okt", stok: 22000000, operasional: 7500000, gaji: 5000000 },
  { name: "Nov", stok: 21000000, operasional: 8500000, gaji: 5000000 },
  { name: "Des", stok: 25000000, operasional: 9000000, gaji: 5000000 },
  { name: "Jan", stok: 23000000, operasional: 7000000, gaji: 5000000 },
  { name: "Feb", stok: 24000000, operasional: 7800000, gaji: 5000000 },
];

const formatRp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

interface Breakdown {
  category: string
  amount: number
  persen: number
}

interface Data {
  summary: {
    total: number
    stok: number
    operasional: number
  };
  breakdown: Breakdown[]
  trend: []
  categories: []
}

const maxAmount = Math.max(...breakdownData.map((d) => d.amount));

export function TabPengeluaran({ data }: { data: Data }) {
  const areas = [
    { dataKey: "stok", color: "#111827", name: "Stok" },
    ...data.categories.map((cat, i) => ({
      dataKey: cat,
      color: ["#6B7280", "#9CA3AF", "#D1D5DB"][i % 3],
      name: cat,
    })),
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard title="Total Pengeluaran" value={formatCurrency(data.summary.total)} subtitle="▼ -3.2% vs lalu" subtitleColor="destructive" icon={TrendingDown} />
        <SummaryCard title="Pembelian Stok" value={formatCurrency(data.summary.stok)} subtitle="▲ 65% Total" subtitleColor="success" icon={ShoppingCart} />
        <SummaryCard title="Beban Operasional" value={formatCurrency(data.summary.operasional)} subtitle="▲ 35% Total" subtitleColor="destructive" icon={Settings} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Breakdown */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-5 text-sm font-semibold text-foreground">Breakdown Pengeluaran</h3>
          <div className="space-y-4">
            {data.breakdown.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{item.category}</span>
                  <span className="text-muted-foreground">{formatRp(item.amount)} ({item.persen}%)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div
                    className="h-2.5 rounded-full bg-primary transition-all"
                    style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <ChartArea
          title="Tren Pengeluaran"
          data={data.trend}
          areas={areas}
        />
      </div>
    </div>
  );
}
