<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            // Kategori Barang (Buah)
            ['name' => 'Apel', 'type' => 'barang'],
            ['name' => 'Pir', 'type' => 'barang'],
            ['name' => 'Jeruk', 'type' => 'barang'],
            ['name' => 'Anggur', 'type' => 'barang'],
            ['name' => 'Mangga', 'type' => 'barang'],
            ['name' => 'Pisang', 'type' => 'barang'],
            ['name' => 'Semangka', 'type' => 'barang'],
            ['name' => 'Melon', 'type' => 'barang'],
            ['name' => 'Nanas', 'type' => 'barang'],
            ['name' => 'Kurma', 'type' => 'barang'],
            ['name' => 'Lemon', 'type' => 'barang'],
            ['name' => 'Lainnya', 'type' => 'barang'],

            // Pengeluaran (biar tetap ada)
            ['name' => 'Gaji Karyawan', 'type' => 'pengeluaran'],
            ['name' => 'Sewa Tempat', 'type' => 'pengeluaran'],
            ['name' => 'Listrik & Air', 'type' => 'pengeluaran'],
            ['name' => 'Transportasi', 'type' => 'pengeluaran'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
