import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { ChartCashflow } from "@/components/report/ChartCashflow";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableLaporan } from "@/components/report/TableLaporan";
import { formatCurrency } from "@/helpers/format";

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
