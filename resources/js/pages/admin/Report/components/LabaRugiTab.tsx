import { TrendingUp, DollarSign, Settings, Wallet } from "lucide-react";
import { SummaryCard } from "@/components/report/SummaryCard";
import { ChartCashflow } from "@/components/report/ChartCashflow";
import { TableLaporan } from "@/components/report/TableLaporan";

const trendData = [
  { name: "Sep", pendapatan: 42000000, hpp: 21000000, bebanOps: 4000000, labaBersih: 14000000 },
  { name: "Okt", pendapatan: 48000000, hpp: 25000000, bebanOps: 4200000, labaBersih: 18800000 },
  { name: "Nov", pendapatan: 45000000, hpp: 23000000, bebanOps: 4000000, labaBersih: 16000000 },
  { name: "Des", pendapatan: 42000000, hpp: 30000000, bebanOps: 6000000, labaBersih: 24000000 },
  { name: "Jan", pendapatan: 50000000, hpp: 24000000, bebanOps: 4000000, labaBersih: 21000000 },
  { name: "Feb", pendapatan: 58000000, hpp: 24000000, bebanOps: 8000000, labaBersih: 26000000 },
];

const tableData = [
  { bulan: "Sep 2026", pendapatan: 42000000, hpp: 21000000, bebanOps: 4000000, labaBersih: 14000000, margin: "33.3%" },
  { bulan: "Okt 2026", pendapatan: 48000000, hpp: 25000000, bebanOps: 4200000, labaBersih: 18800000, margin: "39.0%" },
  { bulan: "Nov 2026", pendapatan: 45000000, hpp: 23000000, bebanOps: 4000000, labaBersih: 16000000, margin: "35.6%" },
  { bulan: "Des 2026", pendapatan: 42000000, hpp: 30000000, bebanOps: 6000000, labaBersih: 24000000, margin: "38.7%" },
  { bulan: "Jan 2026", pendapatan: 50000000, hpp: 24000000, bebanOps: 4000000, labaBersih: 21000000, margin: "38.2%" },
  { bulan: "Feb 2026", pendapatan: 58000000, hpp: 24000000, bebanOps: 8000000, labaBersih: 26000000, margin: "44.8%" },
];

const formatRp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function TabLabaRugi() {
  const columns = [
    { key: "bulan", label: "Bulan" },
    { key: "pendapatan", label: "Pendapatan", align: "right" as const, render: (v: number) => formatRp(v) },
    { key: "hpp", label: "HPP", align: "right" as const, render: (v: number) => <span className="text-destructive">{formatRp(v)}</span> },
    { key: "bebanOps", label: "Beban Ops", align: "right" as const, render: (v: number) => <span className="text-destructive">{formatRp(v)}</span> },
    { key: "labaBersih", label: "Laba Bersih", align: "right" as const, render: (v: number) => <span className="text-primary font-semibold">{formatRp(v)}</span> },
    { key: "margin", label: "Margin", align: "right" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Pendapatan" value="Rp 58.000.000" subtitle="▲ +2.4%" subtitleColor="success" icon={TrendingUp} />
        <SummaryCard title="HPP" value="Rp 24.000.000" subtitle="▲ -21.4% vs lalu" subtitleColor="success" icon={DollarSign} />
        <SummaryCard title="Beban Ops" value="Rp 8.000.000" subtitle="▲ 35.8% total" subtitleColor="destructive" icon={Settings} />
        <SummaryCard title="Laba Bersih" value="Rp 26.000.000" subtitle="▲ Margin 44.8%" subtitleColor="success" icon={Wallet} />
      </div>

      <ChartCashflow
        title="📈 Tren Laba Rugi 2026"
        data={trendData}
        lines={[
          { dataKey: "pendapatan", color: "#10B981", name: "Pendapatan" },
          { dataKey: "hpp", color: "#EF4444", name: "HPP" },
          { dataKey: "bebanOps", color: "#6B7280", name: "Beban Ops" },
          { dataKey: "labaBersih", color: "#10B981", name: "Laba Bersih" },
        ]}
      />

      <TableLaporan title="Laporan Laba Rugi" columns={columns} data={tableData} />
    </div>
  );
}
