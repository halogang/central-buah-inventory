import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { SummaryCard } from "@/components/report/SummaryCard";
import { ChartCashflow } from "@/components/report/ChartCashflow";
import { TableLaporan } from "@/components/report/TableLaporan";
import { formatCurrency } from "@/helpers/format";

const cashflowData = [
  { name: "Sep", pendapatan: 42000000, pengeluaran: 28000000 },
  { name: "Okt", pendapatan: 48000000, pengeluaran: 30000000 },
  { name: "Nov", pendapatan: 45000000, pengeluaran: 32000000 },
  { name: "Des", pendapatan: 42000000, pengeluaran: 35000000 },
  { name: "Jan", pendapatan: 50000000, pengeluaran: 30000000 },
  { name: "Feb", pendapatan: 58000000, pengeluaran: 32000000 },
];

const pettyCashData = [
  { tanggal: "2026-02-18", keterangan: "Modal Awal", jenis: "Modal", jumlah: 10000000 },
  { tanggal: "2026-02-16", keterangan: "Beli kantong plastik", jenis: "Pengeluaran", jumlah: -150000 },
  { tanggal: "2026-02-17", keterangan: "Bayar listrik", jenis: "Pengeluaran", jumlah: -800000 },
  { tanggal: "2026-02-17", keterangan: "Tambah modal", jenis: "Modal", jumlah: 2000000 },
  { tanggal: "2026-02-16", keterangan: "Beli es batu", jenis: "Pengeluaran", jumlah: -50000 },
];

const dailyCashData = [
  { tanggal: "2026-02-03", modal: 10000000, pendapatan: 250000, pengeluaran: null, saldo: 9750000 },
  { tanggal: "2026-02-05", modal: null, pendapatan: null, pengeluaran: 800000, saldo: 8950000 },
  { tanggal: "2026-02-05", modal: 2000000, pendapatan: 150000, pengeluaran: null, saldo: 10800000 },
  { tanggal: "2026-02-08", modal: null, pendapatan: null, pengeluaran: 500000, saldo: 10300000 },
  { tanggal: "2026-02-10", modal: null, pendapatan: null, pengeluaran: 350000, saldo: 7950000 },
  { tanggal: "2026-02-12", modal: null, pendapatan: null, pengeluaran: 1200000, saldo: 8750000 },
  { tanggal: "2026-02-15", modal: 3000000, pendapatan: 450000, pengeluaran: null, saldo: 11350000 },
  { tanggal: "2026-02-16", modal: null, pendapatan: 80000, pengeluaran: null, saldo: 11250000 },
  { tanggal: "2026-02-17", modal: 2000000, pendapatan: 800000, pengeluaran: null, saldo: 12450000 },
  { tanggal: "2026-02-18", modal: 10000000, pendapatan: 180000, pengeluaran: null, saldo: 22300000 },
  { tanggal: "2026-02-20", modal: null, pendapatan: null, pengeluaran: 600000, saldo: 21700000 },
  { tanggal: "2026-02-22", modal: null, pendapatan: 300000, pengeluaran: null, saldo: 21400000 },
  { tanggal: "2026-02-24", modal: null, pendapatan: null, pengeluaran: 400000, saldo: 21000000 },
];

type KeuanganData = {
  summary: {
    income: number;
    expense: number;
    net: number;
  };
  cashflow: {
    name: string;
    pendapatan: number;
    pengeluaran: number;
  }[];
  pettyCash: {
    tanggal: string;
    keterangan: string;
    jenis: string;
    jumlah: number;
  }[];
  dailyCash: {
    tanggal: string;
    modal: number | null;
    pendapatan: number | null;
    pengeluaran: number | null;
    saldo: number;
  }[];
};

type Props = {
  data: KeuanganData
}

export function TabKeuangan({ data }: Props) {
  const pettyCashColumns = [
    { key: "tanggal", label: "Tanggal" },
    { key: "keterangan", label: "Keterangan" },
    {
      key: "jenis",
      label: "Jenis",
      render: (v: string) => (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
          v === "Modal" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
        }`}>
          {v}
        </span>
      ),
    },
    {
      key: "jumlah",
      label: "Jumlah",
      align: "right" as const,
      render: (v: number) => (
        <span className={v >= 0 ? "text-primary font-medium" : "text-destructive font-medium"}>
          {formatCurrency(v)}
        </span>
      ),
    },
  ];

  const dailyColumns = [
    { key: "tanggal", label: "Tanggal" },
    {
      key: "modal",
      label: "Modal Masuk",
      align: "right" as const,
      render: (v: number | null) => <span className="text-primary font-medium">{formatCurrency(v)}</span>,
    },
    {
      key: "pengeluaran",
      label: "Pengeluaran",
      align: "right" as const,
      render: (v: number | null) => <span className="text-destructive font-medium">{formatCurrency(v)}</span>,
    },
    {
      key: "saldo",
      label: "Saldo",
      align: "right" as const,
      render: (v: number) => <span className="font-semibold">{formatCurrency(v)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Total Pendapatan" value={formatCurrency(data.summary.income)} subtitleColor="success" icon={TrendingUp} />
        <SummaryCard title="Total Pengeluaran" value={formatCurrency(data.summary.expense)} subtitleColor="destructive" icon={TrendingDown} />
        <SummaryCard title="Kas Bersih" value={formatCurrency(data.summary.net)}  subtitleColor="success" icon={DollarSign} />
        {/* <SummaryCard title="Piutang" value="Rp 12.7 Jt" subtitle="▲ 8 Piutang" subtitleColor="muted" icon={Wallet} /> */}
      </div>

      {/* Cashflow Chart */}
      <ChartCashflow
        title="📊 Grafik Arus Kas Tahunan 2026"
        data={data.cashflow}
        lines={[
          { dataKey: "pendapatan", color: "#10B981", name: "Pendapatan" },
          { dataKey: "pengeluaran", color: "#EF4444", name: "Pengeluaran" },
        ]}
      />

      {/* Petty Cash Table */}
      <TableLaporan
        title="🗂 Detail Modal/Petty Cash"
        columns={pettyCashColumns}
        data={data.pettyCash}
        footer={
          <div className="flex justify-between px-6 py-4">
            <span className="text-sm font-semibold">Sisa Petty Cash</span>
            <span className="text-sm font-bold text-primary">Rp 11.000.000</span>
          </div>
        }
      />

      {/* Daily Cash Table */}
      <TableLaporan
        title="📅 Detail Modal Cash per Tanggal"
        columns={dailyColumns}
        data={data.dailyCash}
        footer={
          <div className="grid grid-cols-3 gap-4 px-4 py-4">
            <div className="rounded-xl bg-primary/5 p-4 text-center">
              <p className="text-xs text-muted-foreground">🔥 Total Pendapatan</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(data.summary.income)}</p>
            </div>
            <div className="rounded-xl bg-destructive/5 p-4 text-center">
              <p className="text-xs text-muted-foreground">💸 Total Pengeluaran</p>
              <p className="text-lg font-bold text-destructive">{formatCurrency(data.summary.expense)}</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">💰 Sisa Petty Cash</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(data.summary.net)}</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
