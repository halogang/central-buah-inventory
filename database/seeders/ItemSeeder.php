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
            ['image' => '', 'name' => 'Pisang Cavendish', 'branch_id' => random_int(1, 2), 'category_id' => 1, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 8000, 'selling_price' => 12000, 'stock' => 500, 'min_stock' => 100, 'bad_stock' => 10],
            ['image' => '', 'name' => 'Apel Merah', 'branch_id' => random_int(1, 2), 'category_id' => 1, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 15000, 'selling_price' => 20000, 'stock' => 300, 'min_stock' => 50, 'bad_stock' => 5],
            ['image' => '', 'name' => 'Jeruk Manis', 'branch_id' => random_int(1, 2), 'category_id' => 1, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 10000, 'selling_price' => 14000, 'stock' => 400, 'min_stock' => 80, 'bad_stock' => 8],
            ['image' => '', 'name' => 'Mangga Harum Manis', 'branch_id' => random_int(1, 2), 'category_id' => 1, 'unit_id' => random_int(1, 4), 'warehouse_id' => 2, 'purchase_price' => 12000, 'selling_price' => 18000, 'stock' => 350, 'min_stock' => 60, 'bad_stock' => 7],
            ['image' => '', 'name' => 'Nanas Segar', 'branch_id' => random_int(1, 2), 'category_id' => 1, 'unit_id' => random_int(1, 4), 'warehouse_id' => 2, 'purchase_price' => 5000, 'selling_price' => 7000, 'stock' => 200, 'min_stock' => 40, 'bad_stock' => 4],
            ['image' => '', 'name' => 'Strawberry Segar', 'branch_id' => random_int(1, 2), 'category_id' => 1, 'unit_id' => random_int(1, 4), 'warehouse_id' => 3, 'purchase_price' => 35000, 'selling_price' => 45000, 'stock' => 50, 'min_stock' => 10, 'bad_stock' => 2],

            // Sayuran
            ['image' => '', 'name' => 'Bayam Segar', 'branch_id' => random_int(1, 2), 'category_id' => 2, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 3000, 'selling_price' => 5000, 'stock' => 600, 'min_stock' => 100, 'bad_stock' => 15],
            ['image' => '', 'name' => 'Timun', 'branch_id' => random_int(1, 2), 'category_id' => 2, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 4000, 'selling_price' => 6000, 'stock' => 400, 'min_stock' => 70, 'bad_stock' => 10],
            ['image' => '', 'name' => 'Bawang Merah', 'branch_id' => random_int(1, 2), 'category_id' => 2, 'unit_id' => random_int(1, 4), 'warehouse_id' => 2, 'purchase_price' => 6000, 'selling_price' => 9000, 'stock' => 300, 'min_stock' => 60, 'bad_stock' => 8],
            ['image' => '', 'name' => 'Bawang Putih', 'branch_id' => random_int(1, 2), 'category_id' => 2, 'unit_id' => random_int(1, 4), 'warehouse_id' => 2, 'purchase_price' => 12000, 'selling_price' => 16000, 'stock' => 200, 'min_stock' => 40, 'bad_stock' => 5],
            ['image' => '', 'name' => 'Wortel', 'branch_id' => random_int(1, 2), 'category_id' => 2, 'unit_id' => random_int(1, 4), 'warehouse_id' => 3, 'purchase_price' => 7000, 'selling_price' => 10000, 'stock' => 250, 'min_stock' => 50, 'bad_stock' => 6],
            ['image' => '', 'name' => 'Tomat', 'branch_id' => random_int(1, 2), 'category_id' => 2, 'unit_id' => random_int(1, 4), 'warehouse_id' => 3, 'purchase_price' => 5000, 'selling_price' => 8000, 'stock' => 300, 'min_stock' => 60, 'bad_stock' => 8],

            // Daging & Ikan
            ['image' => '', 'name' => 'Daging Ayam Segar', 'branch_id' => random_int(1, 2), 'category_id' => 3, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 28000, 'selling_price' => 35000, 'stock' => 150, 'min_stock' => 30, 'bad_stock' => 3],
            ['image' => '', 'name' => 'Daging Sapi', 'branch_id' => random_int(1, 2), 'category_id' => 3, 'unit_id' => random_int(1, 4), 'warehouse_id' => 2, 'purchase_price' => 45000, 'selling_price' => 55000, 'stock' => 80, 'min_stock' => 15, 'bad_stock' => 2],
            ['image' => '', 'name' => 'Ikan Lele Segar', 'branch_id' => random_int(1, 2), 'category_id' => 3, 'unit_id' => random_int(1, 4), 'warehouse_id' => 3, 'purchase_price' => 20000, 'selling_price' => 28000, 'stock' => 120, 'min_stock' => 25, 'bad_stock' => 3],
            ['image' => '', 'name' => 'Udang Segar', 'branch_id' => random_int(1, 2), 'category_id' => 3, 'unit_id' => random_int(1, 4), 'warehouse_id' => 3, 'purchase_price' => 60000, 'selling_price' => 80000, 'stock' => 50, 'min_stock' => 10, 'bad_stock' => 1],

            // Produk Olahan
            ['image' => '', 'name' => 'Roti Putih', 'branch_id' => random_int(1, 2), 'category_id' => 4, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 8000, 'selling_price' => 10000, 'stock' => 400, 'min_stock' => 80, 'bad_stock' => 10],
            ['image' => '', 'name' => 'Keju Cheddar', 'branch_id' => random_int(1, 2), 'category_id' => 4, 'unit_id' => random_int(1, 4), 'warehouse_id' => 2, 'purchase_price' => 32000, 'selling_price' => 40000, 'stock' => 100, 'min_stock' => 20, 'bad_stock' => 2],
            ['image' => '', 'name' => 'Susu UHT', 'branch_id' => random_int(1, 2), 'category_id' => 4, 'unit_id' => random_int(1, 4), 'warehouse_id' => 1, 'purchase_price' => 9000, 'selling_price' => 11000, 'stock' => 500, 'min_stock' => 100, 'bad_stock' => 10],

            // Bumbu & Rempah
            ['image' => '', 'name' => 'Cabe Merah', 'branch_id' => random_int(1, 2), 'category_id' => 5, 'unit_id' => random_int(1, 4), 'warehouse_id' => 4, 'purchase_price' => 20000, 'selling_price' => 28000, 'stock' => 100, 'min_stock' => 20, 'bad_stock' => 3],
            ['image' => '', 'name' => 'Minyak Goreng', 'branch_id' => random_int(1, 2), 'category_id' => 5, 'unit_id' => random_int(1, 4), 'warehouse_id' => 4, 'purchase_price' => 10000, 'selling_price' => 13000, 'stock' => 300, 'min_stock' => 50, 'bad_stock' => 5],
            ['image' => '', 'name' => 'Garam Halus', 'branch_id' => random_int(1, 2), 'category_id' => 5, 'unit_id' => random_int(1, 4), 'warehouse_id' => 4, 'purchase_price' => 2000, 'selling_price' => 3500, 'stock' => 200, 'min_stock' => 40, 'bad_stock' => 5],

            // Minuman
            ['image' => '', 'name' => 'Air Minum Kemasan', 'branch_id' => random_int(1, 2), 'category_id' => 6, 'unit_id' => random_int(1, 4), 'warehouse_id' => 5, 'purchase_price' => 12000, 'selling_price' => 15000, 'stock' => 1000, 'min_stock' => 200, 'bad_stock' => 20],
            ['image' => '', 'name' => 'Jus Kemasan', 'branch_id' => random_int(1, 2), 'category_id' => 6, 'unit_id' => random_int(1, 4), 'warehouse_id' => 5, 'purchase_price' => 8000, 'selling_price' => 10000, 'stock' => 500, 'min_stock' => 100, 'bad_stock' => 10],
            ['image' => '', 'name' => 'Kopi Instan', 'branch_id' => random_int(1, 2), 'category_id' => 6, 'unit_id' => random_int(1, 4), 'warehouse_id' => 6, 'purchase_price' => 35000, 'selling_price' => 45000, 'stock' => 150, 'min_stock' => 30, 'bad_stock' => 3],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
