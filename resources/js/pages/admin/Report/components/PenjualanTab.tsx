import { ShoppingCart, DollarSign, AlertCircle, Receipt } from "lucide-react";
import { ChartBar } from "@/components/report/ChartBar";
import { ChartDonut } from "@/components/report/ChartDonut";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";

const categoryData = [
  { name: "Buah Lokal", value: 45, color: "#10B981" },
  { name: "Buah Import", value: 25, color: "#059669" },
  { name: "Buah Potong", value: 20, color: "#111827" },
  { name: "Paket Parcel", value: 10, color: "#6B7280" },
];

const formatRp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function TabPenjualan({ data }: { data: any }) {
  const columns = [
    { key: "produk", label: "Produk" },
    { key: "terjual", label: "Terjual", align: "right" as const },
    {
      key: "revenue",
      label: "Revenue",
      align: "right" as const,
      render: (v: number) => <span className="text-primary font-medium">{formatRp(v)}</span>,
    },
    { key: "persen", label: "% Total", align: "right" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Terjual" value={data.summary.totalTerjual} subtitle="▲ +17% bulan lalu" subtitleColor="success" icon={ShoppingCart} />
        <SummaryCard title="Revenue" value={formatRp(data.summary.revenue)} subtitle="▲ +8.3%" subtitleColor="success" icon={DollarSign} />
        <SummaryCard title="Bad Stock" value={data.summary.badStock ?? 0} subtitle="▲ 5 Tipe barang" subtitleColor="destructive" icon={AlertCircle} />
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
          <ChartDonut title="Penjualan per Kategori" data={categoryData} />
        </div>
      </div>

      <TableLaporan title="Detail Penjualan per Produk" columns={columns} data={data.table} />
    </div>
  );
}
