import { Package, AlertTriangle, Boxes, DollarSign } from "lucide-react";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";
import { ChartBar } from "@/components/report/ChartBar";

const stockData = [
  { barang: "Mangga Harum Manis", stok: "150 kg", masuk: "+200", keluar: "-180", sisa: 2, status: "Aman" },
  { barang: "Apel Fuji Import", stok: "80 kg", masuk: "+100", keluar: "-95", sisa: 2, status: "Aman" },
  { barang: "Semangka Merah", stok: "200 kg", masuk: "+300", keluar: "-250", sisa: 0, status: "Aman" },
  { barang: "Pisang Cavendish", stok: "45 ikat", masuk: "+80", keluar: "-65", sisa: 3, status: "Aman" },
  { barang: "Jeruk Mandarin", stok: "60 kg", masuk: "+100", keluar: "-85", sisa: 4, status: "Aman" },
  { barang: "Anggur Red Globe", stok: "35 kg", masuk: "+50", keluar: "-40", sisa: 1, status: "Aman" },
  { barang: "Strawberry", stok: "8 pack", masuk: "+30", keluar: "-28", sisa: 0, status: "Rendah" },
  { barang: "Durian Musang King", stok: "25 kg", masuk: "+40", keluar: "-30", sisa: 0, status: "Aman" },
];

const comparisonData = [
  { name: "Mangga", masuk: 200, keluar: 180 },
  { name: "Apel Fuji", masuk: 100, keluar: 95 },
  { name: "Semangka", masuk: 300, keluar: 250 },
  { name: "Pisang", masuk: 80, keluar: 65 },
  { name: "Jeruk", masuk: 100, keluar: 85 },
  { name: "Anggur", masuk: 50, keluar: 40 },
];

export function TabStok() {
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
        <SummaryCard title="Total SKU" value="12" icon={Package} />
        <SummaryCard title="Stok Rendah" value="1" subtitle="▲ Strawberry < Min" subtitleColor="destructive" icon={AlertTriangle} />
        <SummaryCard title="Total Stok Barang" value="29 unit" subtitle="▲ Terkini" subtitleColor="success" icon={Boxes} />
        <SummaryCard title="Nilai Stok" value="Rp 18.4 Jt" icon={DollarSign} />
      </div>

      <TableLaporan title="📦 Laporan Stok Barang" columns={columns} data={stockData} />

      <ChartBar
        title="Perbandingan Stok Masuk vs Keluar"
        data={comparisonData}
        bars={[
          { dataKey: "masuk", color: "#10B981", name: "Masuk" },
          { dataKey: "keluar", color: "#111827", name: "Keluar" },
        ]}
        layout="vertical"
      />
    </div>
  );
}
