<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Buah Segar', 'description' => 'Buah-buahan segar berkualitas tinggi', 'type' => 'barang', 'icon' => '🍓'],
            ['name' => 'Sayuran', 'description' => 'Sayuran organik dan segar', 'type' => 'barang', 'icon' => '🍍'],
            ['name' => 'Daging & Ikan', 'description' => 'Daging segar dan hasil laut berkualitas', 'type' => 'barang', 'icon' => '🥭'],
            ['name' => 'Produk Olahan', 'description' => 'Makanan olahan dan kemasan', 'type' => 'barang', 'icon' => '🍊'],
            ['name' => 'Bumbu & Rempah', 'description' => 'Bumbu dapur lengkap dan rempah-rempah', 'type' => 'barang', 'icon' => '🍎'],
            ['name' => 'Minuman', 'description' => 'Berbagai jenis minuman segar', 'type' => 'barang', 'icon' => '🍌'],
            ['name' => 'Gaji Karyawan', 'description' => 'Pengeluaran gaji karyawan bulanan', 'type' => 'pengeluaran', 'icon' => '💵'],
            ['name' => 'Sewa Tempat', 'description' => 'Pengeluaran sewa gudang dan toko', 'type' => 'pengeluaran', 'icon' => '💵'],
            ['name' => 'Listrik & Air', 'description' => 'Pengeluaran utilitas listrik dan air', 'type' => 'pengeluaran', 'icon' => '💵'],
            ['name' => 'Transportasi', 'description' => 'Pengeluaran transportasi dan logistik', 'type' => 'pengeluaran', 'icon' => '💵'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
