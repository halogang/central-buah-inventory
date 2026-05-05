import { Minus, Plus, Trash2, Pencil, ShoppingCart, Apple } from "lucide-react";
import { useState } from "react";
import type { CartItem, PaymentMethod} from "@/data/products";
import { formatRupiah } from "@/data/products";
import { useCan } from "@/utils/permissions";

interface CartPanelProps {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (m: PaymentMethod) => void;
  paymentMethods: any[];
  onQtyChange: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onCustomPrice: (productId: string, price: number) => void;
  onPay: () => void;
}

const CartPanel = ({
  cart,
  paymentMethod,
  onPaymentMethodChange,
  paymentMethods,
  onQtyChange,
  onRemove,
  onCustomPrice,
  onPay,
}: CartPanelProps) => {
  const can = useCan();

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.customPrice ?? item.product.price) * item.qty,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEditStart = (item: CartItem) => {
    setEditingId(item.product.id);
    setEditValue(String(item.customPrice ?? item.product.price));
  };

  const handleEditConfirm = (productId: string) => {
    const val = parseInt(editValue);
    if (!isNaN(val) && val > 0) {
      onCustomPrice(productId, val);
    }
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const methods = paymentMethods.map((pm: any) => ({
    key: pm.name,
    label: pm.name,
    icon: pm.icon,
  }));

  return (
    <div className="w-full md:w-120 md:min-w-95 bg-card border md:rounded-xl rounded-none flex flex-col h-fit">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} className="text-foreground" />
          <span className="font-bold text-foreground">Keranjang</span>
        </div>
        <span className="text-sm pos-price-text font-semibold">{totalItems} item</span>
      </div>

      {/* Cart items */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 h-70 max-h-90">
        {cart.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-12">
            Keranjang kosong
          </div>
        )}
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="bg-background rounded-xl border border-border p-3 animate-in fade-in-0 zoom-in-95 duration-150"
          >
            <div className="flex items-start gap-3">
              {item.product.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-150"
                  />
                ) : (
                  <Apple className="w-10 h-10 text-muted-foreground" />
                )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">{item.product.name}</div>
                {editingId === item.product.id ? (
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditConfirm(item.product.id);
                        if (e.key === "Escape") handleEditCancel();
                      }}
                      className="w-24 h-7 px-2 text-sm border border-accent rounded-md bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent tabular-nums"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditConfirm(item.product.id)}
                      className="text-xs font-semibold pos-success-text px-1"
                    >
                      OK
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-xs text-muted-foreground px-1"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm pos-price-text font-semibold tabular-nums">
                      {formatRupiah(item.customPrice ?? item.product.price)}
                    </span>
                    <button onClick={() => handleEditStart(item)} className="text-muted-foreground hover:text-foreground">
                      <Pencil size={12} />
                    </button>
                    {item.customPrice !== null && (
                      <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-medium">
                        Custom
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onQtyChange(item.product.id, -1)}
                  className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-semibold text-sm text-foreground tabular-nums">
                  {item.qty}
                </span>
                <button
                  onClick={() => onQtyChange(item.product.id, 1)}
                  className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Plus size={14} />
                </button>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-5 py-4 space-y-3">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">Subtotal</span>
          <span className="text-lg font-bold text-foreground tabular-nums">{formatRupiah(subtotal)}</span>
        </div>

        {/* Payment methods */}
        <div className="grid grid-cols-3 gap-2">
          {methods.map((m) => (
            <button
              key={m.key}
              onClick={() => onPaymentMethodChange(m.key)}
              className={`h-12 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all border ${
                paymentMethod === m.key
                  ? "bg-accent text-accent-foreground border-accent shadow-sm"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
            >
              <span className="text-base">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Pay button */}
        {can('pos.create') && (
          <button
            onClick={onPay}
            disabled={cart.length === 0}
            className="w-full h-12 rounded-xl pos-pay-gradient text-primary-foreground bg-primary font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <ShoppingCart size={16} />
            Bayar {formatRupiah(subtotal)}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
