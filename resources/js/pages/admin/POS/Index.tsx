import { Head, usePage } from "@inertiajs/react";
import { useState, useCallback } from "react";
import type { CartItem, PaymentMethod, Product } from "@/data/products";
import AppLayout from "@/layouts/app-layout";
import { notify } from "@/lib/notify";
import type { BreadcrumbItem } from '@/types';
import CartPanel from "./components/CartPanel";
import PaymentModal, { SuccessModal } from "./components/PaymentModal";
import ProductGrid from "./components/ProductGrid";
import { ShoppingCart } from "lucide-react";
import PosHistory from "./components/PosHistory";
import AppLogoIcon from "@/components/app-logo-icon";
import { formatCurrency } from "@/helpers/format";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Barang',
        href: '/items',
    },
];

  const Index = () => {
  const { productData, posData } = usePage().props as any;
  const products: Product[] = productData.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    price: Number(item.price),
    stock: Number(item.stock),
    unit: item.unit ?? "pcs",
    image: item.image ?? null,
    image_url: item.image_url ?? null,
  }));

  console.log("POS Data:", posData);

  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("tunai");
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState({ total: 0, cashReceived: 0, change: 0, charge: 0 });
  const [showCartMobile, setShowCartMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<"pos" | "riwayat">("pos");

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

  const handlePaySuccess = (cashReceived: number, change: number, charge: number, finalTotal: number) => {
    setLastTransaction({ total: finalTotal, cashReceived, change, charge });
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleNewTransaction = () => {
    setCart([]);
    setShowSuccess(false);
    setPaymentMethod("tunai");
  };

  const handlePrintReceipt = () => {
    const receiptWindow = window.open("", "_blank", "width=400,height=600");

    const now = new Date();

    const posNumber = `POS-${
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0")
    }`;

    if (!receiptWindow) return;

    const itemsHtml = cart
      .map((item) => {
        const price = item.customPrice ?? item.product.price;
        return `
          <div class="item">
            <div>${item.product.name} x${item.qty}</div>
            <div>${(price * item.qty).toLocaleString("id-ID")}</div>
          </div>
        `;
      })
      .join("");

    receiptWindow.document.write(`
      <html>
        <head>
            <title>Struk</title>
            <style>
              @media print {
                  @page {
                      size: A4;
                      margin: 0;
                  }

                  body {
                      margin: 0;
                      padding: 0;
                  }
              }

              body {
                  font-family: monospace;
                  background: white;
              }

              .container {
                  padding: 60px 40px;
                  margin: 0 auto;   /* 🔥 center di A4 */
              }

              .center {
                  text-align: center;
              }

              .logo img {
                  width: 120px; /* 🔥 BESARKAN LOGO */
              }

              .title {
                  font-size: 32px;
                  font-weight: bold;
              }

              .subtitle {
                  font-size: 26px;
              }

              .divider {
                  border-top: 2px dashed #000;
                  margin: 10px 0;
              }

              .item {
                  display: flex;
                  justify-content: space-between;
                  font-size: 20px; /* 🔥 NAIKKAN */
                  margin: 6px 0;
              }

              .total {
                  font-weight: bold;
                  font-size: 22px;
              }

              .meta {
                  font-size: 20px;
                  margin-top: 10px;
                  display: flex;
                  justify-content: space-between;
              }
          </style>
        </head>

        <body class="container">
            <div class="container">
                <div class="center">
                    <div class="logo">
                        <img src="/logo.png" />
                    </div>
                    <div class="title">Central Buah</div>
                    <div class="subtitle">POS Kasir</div>
                </div>

                <div class="meta">
                    <div>${new Date().toLocaleString("id-ID")}</div>
                    <div>${posNumber}</div>
                </div>

                <div class="divider"></div>

                ${itemsHtml}

                <div class="divider"></div>

                <div class="item">
                    <div>biaya tambahan</div>
                    <div>${formatCurrency(lastTransaction.charge)}</div>
                </div>

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${formatCurrency(lastTransaction.total)}</div>
                </div>

                <div class="item">
                    <div>${paymentMethod}</div>
                    <div>${formatCurrency(lastTransaction.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${formatCurrency(lastTransaction.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `);

    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();

    handleNewTransaction();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="POS Kasir" >
          <meta name="robots" content="noindex" />
        </Head>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 gap-2">
            <button
                type="button"
                onClick={() => setActiveTab('pos')}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'pos'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
                {/* <Tag className="size-4" /> */}
                POS
            </button>
            <button
                type="button"
                onClick={() => setActiveTab('riwayat')}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'riwayat'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
                {/* <Wallet className="size-4" /> */}
                Riwayat
            </button>
          </div>
          {activeTab === 'pos' ? (
            <div className="flex md:flex-row flex-col flex-1">
              <ProductGrid
                products={products}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onProductClick={addToCart}
                />
                <div className="hidden md:block">
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
                {cart.length > 0 && (
                  <button
                    onClick={() => setShowCartMobile(true)}
                    className="fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
                  >
                    <ShoppingCart className="size-4"/> {cart.length}
                  </button>
                )}

                {showCartMobile && (
                  <div className="fixed inset-0 z-999 md:hidden">
                    {/* overlay */}
                    <div
                      className="absolute inset-0 bg-black/40"
                      onClick={() => setShowCartMobile(false)}
                    />

                    {/* drawer */}
                    <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom">
                      <CartPanel
                        cart={cart}
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                        onQtyChange={changeQty}
                        onRemove={removeFromCart}
                        onCustomPrice={setCustomPrice}
                        onPay={() => {
                          setShowCartMobile(false);
                          setShowPayment(true);
                        }}
                      />
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <PosHistory
              data={posData}

            />
          )}

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
