import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { notify } from "@/lib/notify";
import { formatDecimal } from "@/helpers/format";

interface Warehouse {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  stock: number;
  warehouse_id: number;
}

interface MoveStockModalProps {
  warehouses: Warehouse[];
  onClose: () => void;
}

export default function MoveStockModal({ warehouses, onClose }: MoveStockModalProps) {
  const [sourceWarehouse, setSourceWarehouse] = useState<string>("");
  const [sourceItem, setSourceItem] = useState<string>("");
  const [destinationWarehouse, setDestinationWarehouse] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [selectedDestinationItem, setSelectedDestinationItem] = useState<string>("");
  const [sourceItems, setSourceItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch items from source warehouse
  useEffect(() => {
    if (sourceWarehouse) {
      setSourceItem("");
      setDestinationWarehouse("");
      setSourceItems([]);
      setSearchResults([]);
      setSelectedDestinationItem("");
      setError("");

      axios
        .get(`/api/warehouses/${sourceWarehouse}/items`)
        .then((res) => {
          setSourceItems(res.data);
        })
        .catch((err) => {
          setError("Failed to fetch items from source warehouse");
        });
    }
  }, [sourceWarehouse]);

  // Search for items in destination warehouse when source item is selected
  useEffect(() => {
    if (sourceItem && destinationWarehouse) {
      setSelectedDestinationItem("");
      setError("");

      const selectedItem = sourceItems.find((item) => item.id === parseInt(sourceItem));
      if (selectedItem) {
        axios
          .get(
            `/api/warehouses/${destinationWarehouse}/items/search?name=${encodeURIComponent(
              selectedItem.name
            )}`
          )
          .then((res) => {
            if (res.data.length === 0) {
              setError(
                `No items found with name "${selectedItem.name}" in the destination warehouse`
              );
            }
            setSearchResults(res.data);
          })
          .catch((err) => {
            setError("Failed to search items in destination warehouse");
          });
      }
    }
  }, [sourceItem, destinationWarehouse, sourceItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sourceWarehouse || !sourceItem || !destinationWarehouse || !selectedDestinationItem || !quantity) {
        notify.error("Semua field wajib diisi");
        return;
    }

    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
        notify.error("Jumlah harus lebih dari 0");
        return;
    }

    const selectedSource = sourceItems.find(
        (item) => item.id === parseInt(sourceItem)
    );

    if (selectedSource && quantityNum > selectedSource.stock) {
        notify.error(`Stok tidak cukup. Tersedia: ${selectedSource.stock}`);
        return;
    }

    const loading = notify.loading("Memindahkan stok...");

    router.post(
        "/stok/movement/move-stock",
        {
        source_item_id: sourceItem,
        destination_item_id: selectedDestinationItem,
        quantity: quantityNum,
        source_warehouse_id: sourceWarehouse,
        destination_warehouse_id: destinationWarehouse,
        },
        {
        onSuccess: () => {
            notify.dismiss(loading);
            notify.success("Stok berhasil dipindahkan");
            onClose();
        },
        onError: (errors: Record<string, string>) => {
            notify.dismiss(loading);

            console.log(errors);

            notify.error(
                Object.values(errors).join("\n")
            );
        },
        }
    );
    };

  const selectedSourceItem = sourceItems.find((item) => item.id === parseInt(sourceItem));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Move Stock Between Warehouses</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source Warehouse Selection */}
          <div>
            <Label htmlFor="source-warehouse" className="text-sm font-medium">
              Source Warehouse
            </Label>
            <Select value={sourceWarehouse} onValueChange={setSourceWarehouse}>
              <SelectTrigger id="source-warehouse">
                <SelectValue placeholder="Select source warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Source Item Selection */}
          <div>
            <Label htmlFor="source-item" className="text-sm font-medium">
              Select Item
            </Label>
            <Select value={sourceItem} onValueChange={setSourceItem} disabled={!sourceWarehouse}>
              <SelectTrigger id="source-item">
                <SelectValue placeholder="Select item from source warehouse" />
              </SelectTrigger>
              <SelectContent>
                {sourceItems.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name} (Stock: {formatDecimal(item.stock)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Destination Warehouse Selection */}
          <div>
            <Label htmlFor="dest-warehouse" className="text-sm font-medium">
              Destination Warehouse
            </Label>
            <Select value={destinationWarehouse} onValueChange={setDestinationWarehouse} disabled={!sourceItem}>
              <SelectTrigger id="dest-warehouse">
                <SelectValue placeholder="Select destination warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses
                  .filter((w) => w.id !== parseInt(sourceWarehouse))
                  .map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Destination Item Display */}
          {destinationWarehouse && selectedDestinationItem && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-900">
                Destination Item:
              </div>
              <div className="text-lg font-semibold text-blue-700 mt-1">
                {searchResults.find((item) => item.id === parseInt(selectedDestinationItem))?.name}
                {searchResults.find((item) => item.id === parseInt(selectedDestinationItem)) && (
                  <span className="text-sm text-blue-600 ml-2">
                    (Current Stock: {searchResults.find((item) => item.id === parseInt(selectedDestinationItem))?.stock})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Search Results / Destination Item Selection */}
          {destinationWarehouse && (
            <div>
              <Label htmlFor="dest-item" className="text-sm font-medium">
                Matching Items in Destination
              </Label>
              {searchResults.length > 0 ? (
                <Select value={selectedDestinationItem} onValueChange={setSelectedDestinationItem}>
                  <SelectTrigger id="dest-item">
                    <SelectValue placeholder="Select destination item" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchResults.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name} (Stock: {formatDecimal(item.stock)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : error ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                </div>
              ) : (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-600 text-sm">
                  Searching for matching items...
                </div>
              )}
            </div>
          )}

          {/* Quantity Input */}
          <div>
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity to Move
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={!selectedDestinationItem}
              min="1"
              max={selectedSourceItem?.stock}
            />
            {selectedSourceItem && (
              <p className="text-xs text-gray-500 mt-1">
                Available: {formatDecimal(selectedSourceItem.stock)}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !sourceWarehouse || !sourceItem || !destinationWarehouse || !selectedDestinationItem || !quantity}
            >
              {loading ? "Processing..." : "Move Stock"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
