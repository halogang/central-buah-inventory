import { Package, AlertTriangle, Boxes, DollarSign } from "lucide-react";
import { ChartBar } from "@/components/report/ChartBar";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";
import { formatCurrency } from "@/helpers/format";

export function TabStok({ data }: { data: any }) {
  const columns = [
    { key: "barang", label: "Barang" },
    { key: "stok", label: "Stok", align: "right" as const },
    {
      key: "masuk",
      label: "Masuk",
      align: "right" as const,
      render: (v: string) => <span className="text-primary font-medium">{v}</span>,
    },
    {
      key: "keluar",
      label: "Keluar",
      align: "right" as const,
      render: (v: string) => <span className="text-destructive font-medium">{v}</span>,
    },
    { key: "sisa", label: "Sisa", align: "right" as const },
    {
      key: "status",
      label: "Status",
      align: "right" as const,
      render: (v: string) => (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
          v === "Aman" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
        }`}>
          {v}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total SKU" value={data.summary.totalSku} icon={Package} />
        <SummaryCard title="Stok Rendah" value={data.summary.lowStock}  icon={AlertTriangle} />
        <SummaryCard title="Total Stok Barang" value={data.summary.totalStock + " Unit"}  subtitleColor="success" icon={Boxes} />
        <SummaryCard title="Nilai Stok" value={formatCurrency(data.summary.stockValue)} icon={DollarSign} />
      </div>

      <TableLaporan title="📦 Laporan Stok Barang" columns={columns} data={data.table} />

      <ChartBar
        title="Perbandingan Stok Masuk vs Keluar"
        data={data.chart}
        bars={[
          { dataKey: "masuk", color: "#10B981", name: "Masuk" },
          { dataKey: "keluar", color: "#111827", name: "Keluar" },
        ]}
        layout="vertical"
      />
    </div>
  );
}
