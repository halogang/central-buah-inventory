<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
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
