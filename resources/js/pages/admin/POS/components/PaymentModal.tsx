import { router } from "@inertiajs/react";
import { X, CheckCircle, Printer, Apple, Truck } from "lucide-react";
import { useState } from "react";
import { FormInput, FormSelect } from "@/components/admin";
import type { CartItem, PaymentMethod} from "@/data/products";
import { formatRupiah } from "@/data/products";
import { store } from "@/routes/pos";

interface PaymentModalProps {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (m: PaymentMethod) => void;
  onClose: () => void;
  onSuccess: (cashReceived: number, change: number, charger: number, finalTotal: number) => void;
}

const PaymentModal = ({ cart, paymentMethod, onPaymentMethodChange, onClose, onSuccess }: PaymentModalProps) => {
  const [purchaseType, setPurchaseType] = useState<"self-buying" | "delivery">("self-buying");
  const [charge, setCharge] = useState<number>(10000);

  const total = cart.reduce(
    (sum, item) => sum + (item.customPrice ?? item.product.price) * item.qty,
    0
  );
  const [cashReceived, setCashReceived] = useState<number | "">("");
  const [error, setError] = useState("");

  const finalTotal = total + (purchaseType === "delivery" ? charge : 0);

  const quickAmounts = [
    finalTotal,
    Math.ceil(finalTotal / 10000) * 10000 + 10000,
    100000,
    200000,
    500000,
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  const methods: { key: PaymentMethod; label: string; icon: string }[] = [
    { key: "tunai", label: "Tunai", icon: "💵" },
    { key: "transfer", label: "Transfer", icon: "🏦" },
    { key: "qris", label: "QRIS", icon: "📱" },
  ];


  const handleProcess = () => {
    let paid = finalTotal;
    let changeAmount = 0;

    if (paymentMethod === "tunai") {
      const received = Number(cashReceived);

      if (!received || received < finalTotal) {
        setError("Nominal kurang");
        return;
      }

      paid = received;
      changeAmount = received - finalTotal;
    }

    // 🔥 mapping cart → payload items
    const items = cart.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      unit: item.product.unit ?? "pcs",
      quantity: item.qty,
      base_price: item.product.price,
      price: item.customPrice ?? item.product.price,
      total: (item.customPrice ?? item.product.price) * item.qty,
    }));

    const payload = {
      date: new Date().toISOString().slice(0, 10),
      subtotal: total,
      discount: 0,
      tax: 0,
      total: finalTotal,

      payment_method: paymentMethod,
      paid_amount: paid,
      change_amount: changeAmount,

      type: purchaseType,
      charge: purchaseType === "delivery" ? charge : 0,

      status: 1,
      items,
    };

    router.post(store(), payload, {
      onSuccess: () => {
        onSuccess(paid, changeAmount, charge, finalTotal);
      },
      onError: (errors) => {
        console.error(errors);
        setError("Gagal memproses pembayaran");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Pembayaran</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Items */}
          <div className="bg-background rounded-xl p-4 space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between text-sm">
                <span className="text-foreground">
                  <Apple className="w-4 h-4 inline mr-1.5"/>
                  {item.product.name} x{item.qty}
                </span>
                <span className="font-medium text-foreground tabular-nums">
                  {formatRupiah((item.customPrice ?? item.product.price) * item.qty)}
                </span>
              </div>
            ))}
            {purchaseType === "delivery" && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">
                  <Truck className="w-4 h-4 inline mr-1.5"/>
                  Biaya Antar
                </span>
                <span className="font-medium text-foreground tabular-nums">
                  {formatRupiah(charge)}
                </span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex items-center justify-between">
              <span className="font-bold text-foreground">TOTAL</span>
              <span className="font-bold text-lg pos-price-text tabular-nums">{formatRupiah(finalTotal)}</span>
            </div>
          </div>

          {/* Method */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Metode Pembayaran</div>
            <div className="grid grid-cols-3 gap-2">
              {methods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => { onPaymentMethodChange(m.key); setError(""); }}
                  className={`h-14 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border ${
                    paymentMethod === m.key
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-foreground border-border hover:bg-muted"
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Type */}
          <div>
            <FormSelect
              label="Tipe Pembelian"
              value={purchaseType}
              onChange={(e) => {
                const value = e.target.value as "self-buying" | "delivery";
                setPurchaseType(value);

                // reset charge kalau bukan delivery
                if (value !== "delivery") {
                  setCharge(10000);
                }
              }}
              options={[
                { value: "self-buying", label: "Ambil Sendiri" },
                { value: "delivery", label: "Diantar" },
              ]}
            />

            {/* Charge input kalau delivery */}
            {purchaseType === "delivery" && (
              <div className="mt-3">
                <FormInput
                  label="Biaya Antar"
                  type="number"
                  value={charge}
                  onChange={(e) => setCharge(Number(e.target.value))}
                  placeholder="Masukkan biaya antar..."
                />
              </div>
            )}
          </div>

          {/* Cash input */}
          {paymentMethod === "tunai" && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Jumlah Uang Diterima</div>
              <input
                type="number"
                placeholder="Masukkan nominal..."
                value={cashReceived}
                onChange={(e) => { setCashReceived(e.target.value === "" ? "" : Number(e.target.value)); setError(""); }}
                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-lg font-semibold tabular-nums placeholder:text-muted-foreground placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
              {error && <div className="text-sm text-destructive font-medium mt-1">{error}</div>}
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => { setCashReceived(amount); setError(""); }}
                    className="px-3 h-8 rounded-lg border border-border text-xs font-medium text-foreground bg-background hover:bg-muted transition-colors tabular-nums"
                  >
                    {formatRupiah(amount)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          <button
            onClick={handleProcess}
            className="w-full h-12 rounded-xl pos-pay-gradient text-primary-foreground bg-primary font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span className="text-base">💵</span>
            Proses Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Success Modal ---
interface SuccessModalProps {
  total: number;
  // finalTotal: number;
  cashReceived: number;
  change: number;
  paymentMethod: PaymentMethod;
  cart: CartItem[];
  onNewTransaction: () => void;
  onPrintReceipt: () => void;
}

export const SuccessModal = ({ total, cashReceived, change, paymentMethod, onNewTransaction, onPrintReceipt }: SuccessModalProps) => {
  const methodLabel = paymentMethod === "tunai" ? "Tunai" : paymentMethod === "transfer" ? "Transfer" : "QRIS";

  return (
    <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-sm shadow-2xl text-center">
        <div className="px-6 py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <CheckCircle size={36} className="pos-success-text" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Pembayaran Berhasil!</h2>

          <div className="bg-background rounded-xl p-4 space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Belanja</span>
              <span className="font-semibold text-foreground tabular-nums">{formatRupiah(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dibayar ({methodLabel})</span>
              <span className="font-semibold text-foreground tabular-nums">{formatRupiah(cashReceived)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">Kembalian</span>
              <span className="font-bold text-lg pos-success-text tabular-nums">{formatRupiah(change)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onNewTransaction}
              className="h-11 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
            >
              Transaksi Baru
            </button>
            <button
              onClick={onPrintReceipt}
              className="h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              <Printer size={15} />
              Cetak Struk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
