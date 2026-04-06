import { ShoppingCart, DollarSign, AlertCircle, Receipt } from "lucide-react";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";
import { ChartBar } from "@/components/report/ChartBar";
import { ChartDonut } from "@/components/report/ChartDonut";

const salesByProduct = [
  { name: "Mangga", value: 180 },
  { name: "Apel Fuji", value: 130 },
  { name: "Semangka", value: 250 },
  { name: "Pisang", value: 65 },
  { name: "Jeruk", value: 85 },
  { name: "Anggur", value: 40 },
];

const categoryData = [
  { name: "Buah Lokal", value: 45, color: "#10B981" },
  { name: "Buah Import", value: 25, color: "#059669" },
  { name: "Buah Potong", value: 20, color: "#111827" },
  { name: "Paket Parcel", value: 10, color: "#6B7280" },
];

const detailData = [
  { produk: "Mangga", terjual: 180, revenue: 4500000, persen: "22.4%" },
  { produk: "Apel Fuji", terjual: 95, revenue: 3225000, persen: "16.2%" },
  { produk: "Semangka", terjual: 250, revenue: 2500000, persen: "12.5%" },
  { produk: "Pisang", terjual: 65, revenue: 1300000, persen: "4.5%" },
  { produk: "Jeruk", terjual: 85, revenue: 3825000, persen: "17.2%" },
  { produk: "Anggur", terjual: 40, revenue: 2400000, persen: "12.1%" },
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
