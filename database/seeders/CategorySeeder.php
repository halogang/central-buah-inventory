<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Buah Segar', 'description' => 'Buah-buahan segar berkualitas tinggi', 'type' => 'barang'],
            ['name' => 'Sayuran', 'description' => 'Sayuran organik dan segar', 'type' => 'barang'],
            ['name' => 'Daging & Ikan', 'description' => 'Daging segar dan hasil laut berkualitas', 'type' => 'barang'],
            ['name' => 'Produk Olahan', 'description' => 'Makanan olahan dan kemasan', 'type' => 'barang'],
            ['name' => 'Bumbu & Rempah', 'description' => 'Bumbu dapur lengkap dan rempah-rempah', 'type' => 'barang'],
            ['name' => 'Minuman', 'description' => 'Berbagai jenis minuman segar', 'type' => 'barang'],
            ['name' => 'Gaji Karyawan', 'description' => 'Pengeluaran gaji karyawan bulanan', 'type' => 'pengeluaran'],
            ['name' => 'Sewa Tempat', 'description' => 'Pengeluaran sewa gudang dan toko', 'type' => 'pengeluaran'],
            ['name' => 'Listrik & Air', 'description' => 'Pengeluaran utilitas listrik dan air', 'type' => 'pengeluaran'],
            ['name' => 'Transportasi', 'description' => 'Pengeluaran transportasi dan logistik', 'type' => 'pengeluaran'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
