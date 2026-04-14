import { Image, Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import type { Product } from "@/data/products";
import { formatCurrency } from "@/helpers/format";
import { usePagination } from "@/hooks/use-pagination";

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

  const {
    currentPage,
    totalPages,
    paginatedData,
    goTo,
  } = usePagination(filtered, 12);

  return (
    <div className="flex-1 flex flex-col min-w-0 pr-0 md:pr-6">
      {/* Header */}
      <div className="pb-6">
        <h1 className="text-xl font-bold text-foreground">POS Kasir</h1>
      </div>

      {/* Search */}
      <div className="pb-4">
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

      {/* MOBILE LIST */}
      <div className="flex flex-col gap-2 sm:hidden">
        {paginatedData.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductClick(product)}
            className="flex items-center gap-3 border rounded-lg bg-card active:scale-[0.98] pr-3"
          >
            <div className="w-14 h-14 rounded-md bg-muted flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img src={product.image} className="w-full h-full object-cover" />
              ) : (
                <Image className="w-6 h-6 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">{product.name}</div>
              <div className="text-xs text-muted-foreground">
                {product.stock} {product.unit}
              </div>
            </div>

            <div className="font-bold text-sm text-orange-400">
              {formatCurrency(product.price)}
            </div>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {paginatedData.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-card rounded-xl border border-border p-4 text-left hover:pos-card-hover hover:shadow-md transition-all duration-150 active:scale-[0.97] group"
            >
              <div className="w-full h-32 mb-3 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-150"
                  />
                ) : (
                  <Image className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              <div className="font-semibold text-md text-foreground leading-tight">{product.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {product.stock ?? '0'} {product.unit}
              </div>
              <div className="font-bold text-md pos-price-text tabular-nums text-orange-400">
                {formatCurrency(product.price)}
              </div>
            </button>
          ))}
        </div>

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goTo}
        />
      </div>
    </div>
  );
};

export default ProductGrid;
