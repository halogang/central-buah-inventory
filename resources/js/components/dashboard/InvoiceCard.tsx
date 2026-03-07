import { Invoice } from "@/types/dashboard";

const formatCurrency = (n: number) =>
  `Rp ${n.toLocaleString("id-ID")}`;

const InvoiceItem = ({ invoice }: { invoice: Invoice }) => (
  <div className="bg-chart-4/5 border border-chart-4/25 dark:bg-chart-3/5 dark:border-chart-3/25 rounded-lg p-3 flex items-center justify-between">
    <div>
      <p className="text-[11px] text-muted-foreground font-mono">{invoice.invoiceNumber}</p>
      <p className="font-medium text-sm text-foreground">{invoice.company}</p>
    </div>
    <p className="font-semibold text-sm text-chart-4 dark:text-chart-3  ">{formatCurrency(invoice.amount)}</p>
  </div>
);

const InvoiceCard = ({ invoices }: { invoices: Invoice[] }) => (
  <div className="bg-card rounded-xl border border-border shadow-card p-5">
    <h2 className="font-semibold text-foreground mb-4">Invoice Belum Lunas</h2>
    <div className="space-y-3">
      {invoices.map((inv) => (
        <InvoiceItem key={inv.id} invoice={inv} />
      ))}
    </div>
  </div>
);

export default InvoiceCard;
