import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Transaction } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";

const statusStyles: Record<string, string> = {
  selesai: "bg-primary/10 text-primary border-0",
  dikirim: "bg-blue-500/10 text-blue-500 border-0",
  draft: "bg-muted text-muted-foreground border-0",
};

const formatCurrency = (n: number) =>
  `Rp ${n.toLocaleString("id-ID")}`;

const TransactionItem = ({ tx }: { tx: Transaction }) => (
  <div className="flex items-center gap-4 p-4 bg-chart-4/3 dark:bg-chart-3/3 rounded-xl border border-muted-foreground/25">
    <div className={`p-2 rounded-xl ${tx.type === "in" ? "bg-primary/10" : "bg-orange-500/10"}`}>
      {tx.type === "in" ? (
        <ArrowDownLeft size={18} className="text-primary" />
      ) : (
        <ArrowUpRight size={18} className="text-orange-500" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm text-foreground">{tx.company}</p>
      <p className="text-xs text-muted-foreground">
        {tx.date} · {tx.itemCount} item
      </p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-sm text-foreground">{formatCurrency(tx.amount)}</p>
      <Badge variant="secondary" className={`text-[10px] mt-1 ${statusStyles[tx.status]}`}>
        {tx.status}
      </Badge>
    </div>
  </div>
);

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => (
  <div className="bg-card rounded-xl border border-border shadow-card p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-foreground">Transaksi Terakhir</h2>
      <Link href={"/surat-jalan"} className="text-sm font-medium text-primary hover:underline">Lihat Semua</Link>
    </div>
    <div className="grid grid-cols-1 gap-2">
      {transactions.map((tx) => (
        <TransactionItem key={tx.id} tx={tx} />
      ))}
    </div>
  </div>
);

export default TransactionList;
