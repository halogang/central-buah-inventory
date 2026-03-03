<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Category;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::whereIn('type', ['barang'])->get();
        $warehouses = Warehouse::all();

        $items = [
            // Buah Segar
            ['icon' => '🍌', 'name' => 'Pisang Cavendish', 'category_id' => 1, 'unit' => 'kg', 'warehouse_id' => 1, 'purchase_price' => 8000, 'selling_price' => 12000, 'stock' => 500, 'min_stock' => 100, 'bad_stock' => 10],
            ['icon' => '🍎', 'name' => 'Apel Merah', 'category_id' => 1, 'unit' => 'kg', 'warehouse_id' => 1, 'purchase_price' => 15000, 'selling_price' => 20000, 'stock' => 300, 'min_stock' => 50, 'bad_stock' => 5],
            ['icon' => '🍊', 'name' => 'Jeruk Manis', 'category_id' => 1, 'unit' => 'kg', 'warehouse_id' => 1, 'purchase_price' => 10000, 'selling_price' => 14000, 'stock' => 400, 'min_stock' => 80, 'bad_stock' => 8],
            ['icon' => '🥭', 'name' => 'Mangga Harum Manis', 'category_id' => 1, 'unit' => 'kg', 'warehouse_id' => 2, 'purchase_price' => 12000, 'selling_price' => 18000, 'stock' => 350, 'min_stock' => 60, 'bad_stock' => 7],
            ['icon' => '🍍', 'name' => 'Nanas Segar', 'category_id' => 1, 'unit' => 'buah', 'warehouse_id' => 2, 'purchase_price' => 5000, 'selling_price' => 7000, 'stock' => 200, 'min_stock' => 40, 'bad_stock' => 4],
            ['icon' => '🍓', 'name' => 'Strawberry Segar', 'category_id' => 1, 'unit' => 'kg', 'warehouse_id' => 3, 'purchase_price' => 35000, 'selling_price' => 45000, 'stock' => 50, 'min_stock' => 10, 'bad_stock' => 2],

            // Sayuran
            ['icon' => '🥬', 'name' => 'Bayam Segar', 'category_id' => 2, 'unit' => 'ikat', 'warehouse_id' => 1, 'purchase_price' => 3000, 'selling_price' => 5000, 'stock' => 600, 'min_stock' => 100, 'bad_stock' => 15],
            ['icon' => '🥒', 'name' => 'Timun', 'category_id' => 2, 'unit' => 'kg', 'warehouse_id' => 1, 'purchase_price' => 4000, 'selling_price' => 6000, 'stock' => 400, 'min_stock' => 70, 'bad_stock' => 10],
            ['icon' => '🧅', 'name' => 'Bawang Merah', 'category_id' => 2, 'unit' => 'kg', 'warehouse_id' => 2, 'purchase_price' => 6000, 'selling_price' => 9000, 'stock' => 300, 'min_stock' => 60, 'bad_stock' => 8],
            ['icon' => '🧄', 'name' => 'Bawang Putih', 'category_id' => 2, 'unit' => 'kg', 'warehouse_id' => 2, 'purchase_price' => 12000, 'selling_price' => 16000, 'stock' => 200, 'min_stock' => 40, 'bad_stock' => 5],
            ['icon' => '🥕', 'name' => 'Wortel', 'category_id' => 2, 'unit' => 'kg', 'warehouse_id' => 3, 'purchase_price' => 7000, 'selling_price' => 10000, 'stock' => 250, 'min_stock' => 50, 'bad_stock' => 6],
            ['icon' => '🍅', 'name' => 'Tomat', 'category_id' => 2, 'unit' => 'kg', 'warehouse_id' => 3, 'purchase_price' => 5000, 'selling_price' => 8000, 'stock' => 300, 'min_stock' => 60, 'bad_stock' => 8],

            // Daging & Ikan
            ['icon' => '🐔', 'name' => 'Daging Ayam Segar', 'category_id' => 3, 'unit' => 'kg', 'warehouse_id' => 1, 'purchase_price' => 28000, 'selling_price' => 35000, 'stock' => 150, 'min_stock' => 30, 'bad_stock' => 3],
            ['icon' => '🥓', 'name' => 'Daging Sapi', 'category_id' => 3, 'unit' => 'kg', 'warehouse_id' => 2, 'purchase_price' => 45000, 'selling_price' => 55000, 'stock' => 80, 'min_stock' => 15, 'bad_stock' => 2],
            ['icon' => '🐟', 'name' => 'Ikan Lele Segar', 'category_id' => 3, 'unit' => 'kg', 'warehouse_id' => 3, 'purchase_price' => 20000, 'selling_price' => 28000, 'stock' => 120, 'min_stock' => 25, 'bad_stock' => 3],
            ['icon' => '🦐', 'name' => 'Udang Segar', 'category_id' => 3, 'unit' => 'kg', 'warehouse_id' => 3, 'purchase_price' => 60000, 'selling_price' => 80000, 'stock' => 50, 'min_stock' => 10, 'bad_stock' => 1],

            // Produk Olahan
            ['icon' => '🍞', 'name' => 'Roti Putih', 'category_id' => 4, 'unit' => 'bungkus', 'warehouse_id' => 1, 'purchase_price' => 8000, 'selling_price' => 10000, 'stock' => 400, 'min_stock' => 80, 'bad_stock' => 10],
            ['icon' => '🧀', 'name' => 'Keju Cheddar', 'category_id' => 4, 'unit' => 'bungkus', 'warehouse_id' => 2, 'purchase_price' => 32000, 'selling_price' => 40000, 'stock' => 100, 'min_stock' => 20, 'bad_stock' => 2],
            ['icon' => '🥛', 'name' => 'Susu UHT', 'category_id' => 4, 'unit' => 'karton', 'warehouse_id' => 1, 'purchase_price' => 9000, 'selling_price' => 11000, 'stock' => 500, 'min_stock' => 100, 'bad_stock' => 10],

            // Bumbu & Rempah
            ['icon' => '🌶️', 'name' => 'Cabe Merah', 'category_id' => 5, 'unit' => 'kg', 'warehouse_id' => 4, 'purchase_price' => 20000, 'selling_price' => 28000, 'stock' => 100, 'min_stock' => 20, 'bad_stock' => 3],
            ['icon' => '🫒', 'name' => 'Minyak Goreng', 'category_id' => 5, 'unit' => 'liter', 'warehouse_id' => 4, 'purchase_price' => 10000, 'selling_price' => 13000, 'stock' => 300, 'min_stock' => 50, 'bad_stock' => 5],
            ['icon' => '🧂', 'name' => 'Garam Halus', 'category_id' => 5, 'unit' => 'kg', 'warehouse_id' => 4, 'purchase_price' => 2000, 'selling_price' => 3500, 'stock' => 200, 'min_stock' => 40, 'bad_stock' => 5],

            // Minuman
            ['icon' => '🥤', 'name' => 'Air Minum Kemasan', 'category_id' => 6, 'unit' => 'karton', 'warehouse_id' => 5, 'purchase_price' => 12000, 'selling_price' => 15000, 'stock' => 1000, 'min_stock' => 200, 'bad_stock' => 20],
            ['icon' => '🧃', 'name' => 'Jus Kemasan', 'category_id' => 6, 'unit' => 'karton', 'warehouse_id' => 5, 'purchase_price' => 8000, 'selling_price' => 10000, 'stock' => 500, 'min_stock' => 100, 'bad_stock' => 10],
            ['icon' => '☕', 'name' => 'Kopi Instan', 'category_id' => 6, 'unit' => 'kg', 'warehouse_id' => 6, 'purchase_price' => 35000, 'selling_price' => 45000, 'stock' => 150, 'min_stock' => 30, 'bad_stock' => 3],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
