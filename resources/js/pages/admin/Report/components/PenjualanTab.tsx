import { ShoppingCart, DollarSign, AlertCircle, Receipt } from "lucide-react";
import { ChartBar } from "@/components/report/ChartBar";
import { ChartDonut } from "@/components/report/ChartDonut";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";
import { formatCurrency } from "@/helpers/format";

const COLORS = [
  "#10B981", // green
  "#059669",
  "#34D399",
  "#6B7280", // gray
  "#9CA3AF",
  "#111827", // dark
  "#6366F1", // indigo
  "#8B5CF6", // purple
  "#F59E0B", // amber
  "#EF4444", // red
];

const formatRp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function TabPenjualan({ data }: { data: any }) {
  const columns = [
    { key: "produk", label: "Produk" },
    { key: "terjual", label: "Terjual", align: "right" as const },
    {
      key: "avg_beli",
      label: "Rata-rata Harga Beli",
      align: "right" as const,
      render: (v: number) => <span className="text-primary font-medium">{formatCurrency(v)}</span>,
    },
    {
      key: "avg_jual",
      label: "Rata-rata Harga Jual",
      align: "right" as const,
      render: (v: number) => <span className="text-primary font-medium">{formatCurrency(v)}</span>,
    },
    {
      key: "revenue",
      label: "Revenue",
      align: "right" as const,
      render: (v: number) => <span className="text-primary font-medium">{formatCurrency(v)}</span>,
    },
    {
      key: "laba",
      label: "Laba",
      align: "right" as const,
      render: (v: number) => <span className="text-primary font-medium">{formatCurrency(v)}</span>,
    },
    {
      key: "persen",
      label: "% Margin",
      align: "right" as const,
      render: (v: number) => <span className="text-primary font-medium">{v}%</span>,
    },
  ];

  const categoriesWithColor = data.categories.map((item: any, index: number) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Terjual" value={data.summary.totalTerjual} icon={ShoppingCart} />
        <SummaryCard title="Revenue" value={formatRp(data.summary.revenue)} icon={DollarSign} />
        <SummaryCard title="Bad Stock" value={data.summary.badStock ?? 0}  icon={AlertCircle} />
        <SummaryCard title="Avg Order" value={formatRp(data.summary.avgOrder ?? 0)} icon={Receipt} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ChartBar
            title="Produk Terlaris"
            data={data.chart}
            bars={[{ dataKey: "value", color: "#10B981", name: "Terjual" }]}
          />
        </div>
        <div className="lg:col-span-2">
          <ChartDonut title="Penjualan per Kategori" data={categoriesWithColor} />
        </div>
      </div>

      <TableLaporan title="Detail Penjualan per Produk" columns={columns} data={data.table} />
    </div>
  );
}
