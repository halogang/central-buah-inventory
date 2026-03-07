import { AlertTriangle } from "lucide-react";
import { Product } from "@/types/dashboard";

const LowStockItem = ({ product }: { product: Product }) => (
  <div className="bg-red-500/5 border border-red-500/25 rounded-lg p-3">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{product.emoji}</span>
      <div>
        <p className="font-medium text-sm text-foreground">{product.name}</p>
        <p className="text-xs text-red-500">
          Sisa: {product.stock} {product.unit} (min: {product.minStock})
        </p>
      </div>
    </div>
  </div>
);

const LowStockCard = ({ products }: { products: Product[] }) => (
  <div className="bg-card rounded-xl border border-border shadow-card p-5">
    <div className="flex items-center gap-2 mb-4">
      <AlertTriangle size={18} className="text-orange-500" />
      <h2 className="font-semibold text-foreground">Stok Menipis</h2>
    </div>
    <div className="space-y-3">
      {products.map((p) => (
        <LowStockItem key={p.id} product={p} />
      ))}
    </div>
  </div>
);

export default LowStockCard;
