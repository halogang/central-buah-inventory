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
  onItemDiscount: (
    productId: string,
    discount: number
  ) => void;
}

const CartPanel = ({
  cart,
  paymentMethod,
  onPaymentMethodChange,
  paymentMethods,
  onQtyChange,
  onRemove,
  onCustomPrice,
  onItemDiscount,
  onPay,
}: CartPanelProps) => {
  const can = useCan();

  const subtotal = cart.reduce(
    (sum, item) => {
      const line =
        (item.customPrice ??
          item.product.price)
        * item.qty;

      return (
        sum +
        line -
        (item.itemDiscount ?? 0)
      );
    },
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const [editingDiscountId, setEditingDiscountId] =
    useState<string | null>(null);

  const [discountValue, setDiscountValue] =
    useState('');

  const handleDiscountStart = (
    item: CartItem
  ) => {
    setEditingDiscountId(item.product.id);
    setDiscountValue(
      String(item.itemDiscount ?? 0)
    );
  };

  const handleDiscountConfirm = (
    productId: string
  ) => {
    const val = parseInt(discountValue);

    if (!isNaN(val) && val >= 0) {
      onItemDiscount(productId, val);
    }

    setEditingDiscountId(null);
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
        {cart.map((item) => {
          const price =
            item.customPrice ?? item.product.price;

          const lineTotal =
            price * item.qty -
            (item.itemDiscount ?? 0);

          return (
            (
              <div
                key={item.product.id}
                className="bg-background rounded-xl border border-border p-3 animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <div className="flex items-start gap-3">
                  {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt="Produk"
                        className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-150"
                      />
                    ) : (
                      <Apple className="w-10 h-10 text-muted-foreground" />
                    )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate">{item.product.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-sm pos-price-text font-semibold tabular-nums">
                        {formatRupiah(item.customPrice ?? item.product.price)}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                        Total: {formatRupiah(lineTotal)}
                      </div>
                    <div className="">
                      {editingDiscountId === item.product.id ? (
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={discountValue}
                            onChange={(e)=>
                              setDiscountValue(
                                e.target.value
                              )
                            }
                            className="w-20 h-7 border rounded px-2"
                          />

                          <button
                            onClick={() =>
                              handleDiscountConfirm(
                                item.product.id
                              )
                            }
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleDiscountStart(item)
                          }
                          className="text-xs text-blue-600 cursor-pointer"
                        >
                          Diskon:
                          {formatRupiah(
                            item.itemDiscount ?? 0
                          )}
                        </button>
                      )}
                    </div>
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
            )
          )
        })}
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
