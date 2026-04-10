import { TrendingUp, DollarSign, Settings, Wallet } from "lucide-react";
import { ChartCashflow } from "@/components/report/ChartCashflow";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";
import { formatCurrency } from "@/helpers/format";

export function TabLabaRugi({ data }: { data: any }) {
  const columns = [
    { key: "bulan", label: "Bulan" },
    { key: "pendapatan", label: "Pendapatan", align: "right" as const, render: (v: number) => formatCurrency(v) },
    { key: "hpp", label: "HPP", align: "right" as const, render: (v: number) => <span className="text-destructive">{formatCurrency(v)}</span> },
    { key: "bebanOps", label: "Beban Ops", align: "right" as const, render: (v: number) => <span className="text-destructive">{formatCurrency(v)}</span> },
    { key: "labaBersih", label: "Laba Bersih", align: "right" as const, render: (v: number) => <span className="text-primary font-semibold">{formatCurrency(v)}</span> },
    { key: "margin", label: "Margin", align: "right" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Pendapatan" value={formatCurrency(data.summary.pendapatan)} subtitle="▲ +2.4%" subtitleColor="success" icon={TrendingUp} />
        <SummaryCard title="HPP" value={formatCurrency(data.summary.hpp)} subtitle="▲ -21.4% vs lalu" subtitleColor="success" icon={DollarSign} />
        <SummaryCard title="Beban Ops" value={formatCurrency(data.summary.bebanOps)} subtitle="▲ 35.8% total" subtitleColor="destructive" icon={Settings} />
        <SummaryCard title="Laba Bersih" value={formatCurrency(data.summary.labaBersih)} subtitle={`▲ Margin ${data.summary.margin}%`} subtitleColor="success" icon={Wallet} />
      </div>

      <ChartCashflow
        title="📈 Tren Laba Rugi 2026"
        data={data.chart}
        lines={[
          { dataKey: "pendapatan", color: "#10B981", name: "Pendapatan" },
          { dataKey: "hpp", color: "#EF4444", name: "HPP" },
          { dataKey: "bebanOps", color: "#6B7280", name: "Beban Ops" },
          { dataKey: "labaBersih", color: "#10B981", name: "Laba Bersih" },
        ]}
      />

      <TableLaporan title="Laporan Laba Rugi" columns={columns} data={data.table} />
    </div>
  );
}
