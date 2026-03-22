import { useState, useCallback } from "react";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import PaymentModal, { SuccessModal } from "./components/PaymentModal";
import { CartItem, PaymentMethod, Product } from "@/data/products";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Barang',
        href: '/items',
    },
];

const Index = () => {
  const { productData } = usePage().props as any;
  const products: Product[] = productData.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    price: Number(item.price),
    unit: item.unit ?? "pcs",
    image: item.image ?? null,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("tunai");
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState({ total: 0, cashReceived: 0, change: 0 });

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1, customPrice: null }];
    });
  }, []);

  const changeQty = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        const newQty = item.qty + delta;
        return newQty >= 1 ? { ...item, qty: newQty } : item;
      })
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const setCustomPrice = useCallback((productId: string, price: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, customPrice: price } : item
      )
    );
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.customPrice ?? item.product.price) * item.qty,
    0
  );

  const handlePaySuccess = (cashReceived: number, change: number) => {
    setLastTransaction({ total: subtotal, cashReceived, change });
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleNewTransaction = () => {
    setCart([]);
    setShowSuccess(false);
    setPaymentMethod("tunai");
  };

  const handlePrintReceipt = () => {
    const lines = [
      "================================",
      "        Central Buah",
      "        POS Kasir",
      "================================",
      "",
      ...cart.map(
        (item) =>
          `${item.product.name} x${item.qty}    ${((item.customPrice ?? item.product.price) * item.qty).toLocaleString("id-ID")}`
      ),
      "",
      "--------------------------------",
      `Total      ${lastTransaction.total.toLocaleString("id-ID")}`,
      `${paymentMethod === "tunai" ? "Tunai" : paymentMethod === "transfer" ? "Transfer" : "QRIS"}      ${lastTransaction.cashReceived.toLocaleString("id-ID")}`,
      `Kembalian   ${lastTransaction.change.toLocaleString("id-ID")}`,
      "--------------------------------",
      "",
      "       Terima Kasih",
      "================================",
    ];

    const receiptWindow = window.open("", "_blank", "width=300,height=500");
    if (receiptWindow) {
      receiptWindow.document.write(
        `<html><head><title>Struk</title><style>body{font-family:monospace;white-space:pre;font-size:12px;padding:20px;}</style></head><body>${lines.join("\n")}</body></html>`
      );
      receiptWindow.document.close();
      receiptWindow.print();
    }

    handleNewTransaction();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="POS Kasir" />
        <div className="p-4">
            <div className="flex flex-1">
                <ProductGrid
                products={products}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onProductClick={addToCart}
                />
                <CartPanel
                cart={cart}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onQtyChange={changeQty}
                onRemove={removeFromCart}
                onCustomPrice={setCustomPrice}
                onPay={() => setShowPayment(true)}
                />
            </div>

            {showPayment && (
                <PaymentModal
                cart={cart}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onClose={() => setShowPayment(false)}
                onSuccess={handlePaySuccess}
                />
            )}

            {showSuccess && (
                <SuccessModal
                total={lastTransaction.total}
                cashReceived={lastTransaction.cashReceived}
                change={lastTransaction.change}
                paymentMethod={paymentMethod}
                cart={cart}
                onNewTransaction={handleNewTransaction}
                onPrintReceipt={handlePrintReceipt}
                />
            )}
            </div>
    </AppLayout>
  );
};

export default Index;
