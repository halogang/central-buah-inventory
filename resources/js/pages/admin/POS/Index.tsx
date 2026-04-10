import { Head, usePage } from "@inertiajs/react";
import { useState, useCallback } from "react";
import type { CartItem, PaymentMethod, Product } from "@/data/products";
import AppLayout from "@/layouts/app-layout";
import { notify } from "@/lib/notify";
import type { BreadcrumbItem } from '@/types';
import CartPanel from "./components/CartPanel";
import PaymentModal, { SuccessModal } from "./components/PaymentModal";
import ProductGrid from "./components/ProductGrid";

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
    stock: Number(item.stock),
    unit: item.unit ?? "pcs",
    image: item.image ?? null,
    image_url: item.image_url ?? null,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("tunai");
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState({ total: 0, cashReceived: 0, change: 0 });

  const addToCart = useCallback((product: Product) => {
    let shouldNotify = false;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        if (existing.qty >= product.stock) {
          shouldNotify = true;
          return prev;
        }

        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      if (product.stock <= 0) {
        shouldNotify = true;
        return prev;
      }

      return [...prev, { product, qty: 1, customPrice: null }];
    });

    if (shouldNotify) {
      notify.error('Stok tidak cukup!');
    }
  }, []);

  const changeQty = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;

        const newQty = item.qty + delta;

        // 🚫 tidak boleh kurang dari 1
        if (newQty < 1) return item;

        // 🚫 tidak boleh lebih dari stock
        if (newQty > item.product.stock) return item;

        return { ...item, qty: newQty };
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

  const handlePaySuccess = (cashReceived: number, change: number, finalTotal: number) => {
    setLastTransaction({ total: finalTotal, cashReceived, change });
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
        <Head title="POS Kasir" >
          <meta name="robots" content="noindex" />
        </Head>
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
