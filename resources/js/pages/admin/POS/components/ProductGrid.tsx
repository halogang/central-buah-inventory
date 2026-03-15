import { Apple, Image, Search } from "lucide-react";
import { Product } from "@/data/products";
import { formatCurrency } from "@/helpers/format";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onProductClick: (product: Product) => void;
}

const ProductGrid = ({ products, searchQuery, onSearchChange, onProductClick }: ProductGridProps) => {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="pr-6 py-4">
        <h1 className="text-xl font-bold text-foreground">POS Kasir</h1>
      </div>

      {/* Search */}
      <div className="pr-6 pb-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari buah..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto pr-6 pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-card rounded-xl border border-border p-4 text-left hover:pos-card-hover hover:shadow-md transition-all duration-150 active:scale-[0.97] group"
            >
              <Image className="w-12 h-12 object-contain mb-3 group-hover:scale-110 transition-transform duration-150 text-muted-foreground"/>
              <div className="font-semibold text-md text-foreground leading-tight">{product.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {product.stock} {product.unit}
              </div>
              <div className="font-bold text-md pos-price-text tabular-nums text-orange-400">
                {formatCurrency(product.price)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
