import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: number;
  name: string;
  icon: string;
  description?: string;
}

interface Item {
  id: number;
  name: string;
  category?: Category;
  unit: string;
  selling_price: number;
  stock: number;
}

interface Props {
  items: Item[];
  categories: Category[];
}

const ItemsSection = ({ items, categories }: Props) => {
  // const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // const filteredItems = items.filter(
  //   (item) => item.category?.id === selectedCategory?.id
  // );

  return (
    <section id="products" className="py-20 md:py-28">
      <div className="container mx-auto px-4">

        <h2 className="font-display text-3xl md:text-4xl font-bold text-center">
          Fruit Categories
        </h2>

        {/* CATEGORY GRID */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-card rounded-lg shadow-card p-6 text-center hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-3">{category.icon ?? "🍎"}</div>

              <h3 className="font-semibold">{category.name}</h3>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                // onClick={() => setSelectedCategory(category)}
              >
                View Items
              </Button>
            </div>
          ))}

        </div>

        {/* MODAL */}
        {/* {selectedCategory && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-card rounded-lg w-full max-w-3xl p-6">

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {selectedCategory.name} Items
                </h3>

                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                >
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4"
                  >
                    <h4 className="font-semibold">{item.name}</h4>

                    <p className="text-sm text-primary">
                      Rp {item.selling_price.toLocaleString()} / {item.unit}
                    </p>

                    <Badge
                      variant={item.stock > 0 ? "default" : "destructive"}
                      className="mt-2"
                    >
                      {item.stock > 0
                        ? `Stock: ${item.stock}`
                        : "Out of Stock"}
                    </Badge>
                  </div>
                ))}

                {filteredItems.length === 0 && (
                  <p className="text-muted-foreground">
                    No items in this category.
                  </p>
                )}

              </div>
            </div>

          </div>
        )} */}

      </div>
    </section>
  );
};

export default ItemsSection;
