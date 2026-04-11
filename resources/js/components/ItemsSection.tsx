import { Image, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format";
import { SearchInput } from "./search-input";

interface Category {
  id: number;
  name: string;
  image_url?: string;
  description?: string;
  items?: Item[];
}

interface Unit {
  id: number;
  unit_code: string
}

interface Item {
  id: number;
  name: string;
  category?: Category;
  unit?: Unit;
  selling_price: number;
  stock: number;
  image?: string; 
  image_url?: string; 
}

interface Props {
  items: Item[];
  categories: Category[];
}

  
const ItemsSection = ({ categories = [] }: Props) => {

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const filteredItems =
    selectedCategory?.items?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCategory(null);
    };
  
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="katalog" className="py-20 md:py-28">
      <div className="container mx-auto px-4">

        <h2 className="font-display text-primary text-3xl md:text-4xl font-bold text-center mb-2">
          Katalog Buah
        </h2>
        <p className="font-display text-muted-foreground text-lg md:text-xl text-center">
          Pilihan buah segar berkualitas tinggi
        </p>

        {/* CATEGORY GRID */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => {

            // ambil item yang termasuk category ini
            const categoryItems = category.items ?? [];

            // jumlah produk
            const productCount = categoryItems.length;

            // Hitung harga minimal dan maksimal
            let minSelling = 0;
            let maxSelling = 0;

            if (productCount > 0) {
              minSelling = Math.min(...categoryItems.map(item => item.selling_price));
              maxSelling = Math.max(...categoryItems.map(item => item.selling_price));
            }

            //jumlah stok
            const totalStock =
              productCount > 0
              ? categoryItems.reduce((sum, item) => sum + item.stock, 0)
              : 0;

            return (
              <div
                key={category.id}
                className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      <Image className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-card-foreground">{category.name}</h3>
                  {productCount > 0 ? (
                    <p className="mt-1 text-sm font-medium text-primary">
                      {formatCurrency(minSelling)} - {formatCurrency(maxSelling)}/kg
                    </p>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Belum ada produk</p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant={totalStock > 0 ? "default" : "destructive"} className="text-xs">
                      {totalStock > 0 ? `Stock: ${totalStock} kg` : "Stok kosong"}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearch("");
                    }}
                  >
                    Lihat Produk
                  </Button>
                </div>
              </div>
            )
          })}

        </div>

        {/* MODAL */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-card rounded-xl w-full max-w-2xl p-6">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {selectedCategory.name}
                </h3>

                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X />
                </Button>
              </div>

              {/* SEARCH */}
              <div className="mb-4">
                <SearchInput
                  placeholder="Cari Produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* ITEM LIST */}
              <div className="space-y-3 max-h-100 overflow-y-auto">

                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 border rounded-lg p-3"
                  >

                    {/* IMAGE */}
                    {item.image ? (
                        <img
                            src={item.image_url}
                            alt={item.image}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg text-xs text-muted-foreground">
                            <Image />
                        </div>
                    )}

                    {/* INFO */}
                    <div className="flex items-start justify-between text-sm w-full">

                      <div className="font-medium flex flex-col">
                        <span className="">{item.name}</span>
                        <span className="text-primary font-medium">
                          {formatCurrency(item.selling_price)}
                        </span>
                      </div>

                      <Badge
                        variant={item.stock > 0 ? "default" : "destructive"}
                      >
                        {item.stock > 0
                          ? `Stok ${item.stock} ${item.unit?.unit_code}`
                          : "Stok kosong"}
                      </Badge>
                    </div>
                  </div>
                ))}

                {filteredItems.length === 0 && (
                  <p className="text-center text-muted-foreground py-6">
                    Produk tidak ditemukan
                  </p>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default ItemsSection;
