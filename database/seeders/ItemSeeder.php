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
            // PIR
            ['name' => 'Pir Xiangli', 'category_id' => 2, 'unit_id' => 1, 'warehouse_id' => 1, 'stock' => 2.1, 'purchase_price' => 38000, 'selling_price' => 43000, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Pir Century', 'category_id' => 2, 'unit_id' => 1, 'warehouse_id' => 1, 'stock' => 6, 'purchase_price' => 30000, 'selling_price' => 35000, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Pir Golden', 'category_id' => 2, 'unit_id' => 1, 'warehouse_id' => 1, 'stock' => 9, 'purchase_price' => 40000, 'selling_price' => 45000, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Pir Yakli', 'category_id' => 2, 'unit_id' => 1, 'warehouse_id' => 2, 'stock' => 43, 'purchase_price' => 48000, 'selling_price' => 55000, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Pir Sweet', 'category_id' => 2, 'unit_id' => 1, 'warehouse_id' => 2, 'stock' => 43, 'purchase_price' => 48000, 'selling_price' => 55000, 'min_stock' => 2, 'bad_stock' => 0],
            
            // APEL
            ['name' => 'Apel USA', 'category_id' => 1, 'stock' => 13, 'purchase_price' => 800000, 'selling_price' => 45000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Apel Fuji 88', 'category_id' => 1, 'stock' => 23, 'purchase_price' => 61000, 'selling_price' => 40000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Apel Fuji 100', 'category_id' => 1, 'stock' => 8, 'purchase_price' => 35000, 'selling_price' => 45000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Apel Premium', 'category_id' => 1, 'stock' => 3, 'purchase_price' => 60000, 'selling_price' => 55000, 'unit_id' => 1, 'warehouse_id' => 2, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Apel Premium Kisut', 'category_id' => 1, 'stock' => 10, 'purchase_price' => 60000, 'selling_price' => 40000, 'unit_id' => 1, 'warehouse_id' => 2, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Apel GS Hijau', 'category_id' => 1, 'stock' => 10, 'purchase_price' => 60000, 'selling_price' => 40000, 'unit_id' => 1, 'warehouse_id' => 2, 'min_stock' => 2, 'bad_stock' => 0],

            // JERUK
            ['name' => 'Jeruk Ponkam', 'category_id' => 3, 'stock' => 11.3, 'purchase_price' => 26000, 'selling_price' => 43000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Jeruk Santang Daun', 'category_id' => 3, 'stock' => 11.3, 'purchase_price' => 26000, 'selling_price' => 43000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Jeruk Sunkist', 'category_id' => 3, 'stock' => 11.3, 'purchase_price' => 26000, 'selling_price' => 43000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Jeruk Wogam', 'category_id' => 3, 'stock' => 11.3, 'purchase_price' => 26000, 'selling_price' => 43000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Jeruk Medan', 'category_id' => 3, 'stock' => 126, 'purchase_price' => 26000, 'selling_price' => 32000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Jeruk Jember', 'category_id' => 3, 'stock' => 45, 'purchase_price' => 16000, 'selling_price' => 22000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 2, 'bad_stock' => 0],
            ['name' => 'Jeruk Peras', 'category_id' => 3, 'stock' => 35, 'purchase_price' => 7500, 'selling_price' => 12000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 2, 'bad_stock' => 0],

            //ANGGUR
            ['name' => 'Anggur Hijau Kres', 'category_id' => 4, 'stock' => 8, 'purchase_price' => 80000, 'selling_price' => 75000, 'unit_id' => 3, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Anggur AUS', 'category_id' => 4, 'stock' => 2, 'purchase_price' => 80000, 'selling_price' => 110000, 'unit_id' => 3, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],

            // LAINNYA
            ['name' => 'Lemon', 'category_id' => 11, 'stock' => 22, 'purchase_price' => 97500, 'selling_price' => 45000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Semangka', 'category_id' => 7, 'stock' => 200, 'purchase_price' => 16000, 'selling_price' => 20000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Nanas', 'category_id' => 9, 'stock' => 9, 'purchase_price' => 9000, 'selling_price' => 12000, 'unit_id' => 2, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Melon Madu', 'category_id' => 8, 'stock' => 24, 'purchase_price' => 16000, 'selling_price' => 21000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Naga', 'category_id' => 8, 'stock' => 24, 'purchase_price' => 16000, 'selling_price' => 21000, 'unit_id' => 1, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Edamame', 'category_id' => 8, 'stock' => 24, 'purchase_price' => 16000, 'selling_price' => 21000, 'unit_id' => 2, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Alpukat', 'category_id' => 8, 'stock' => 24, 'purchase_price' => 16000, 'selling_price' => 21000, 'unit_id' => 2, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],

            // KURMA
            ['name' => 'Kurma Golden', 'category_id' => 10, 'stock' => 15, 'purchase_price' => 52000, 'selling_price' => 95000, 'unit_id' => 3, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Kurma Anggur', 'category_id' => 10, 'stock' => 27, 'purchase_price' => 45000, 'selling_price' => 20000, 'unit_id' => 2, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Kurma Palm Fruit 250gr', 'category_id' => 10, 'stock' => 10, 'purchase_price' => 660000, 'selling_price' => 60000, 'unit_id' => 2, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],
            ['name' => 'Kurma Palm Fruit 500gr', 'category_id' => 10, 'stock' => 10, 'purchase_price' => 660000, 'selling_price' => 60000, 'unit_id' => 2, 'warehouse_id' => 1, 'min_stock' => 5, 'bad_stock' => 0],


        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
