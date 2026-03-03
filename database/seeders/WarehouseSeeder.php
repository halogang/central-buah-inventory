<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $warehouses = [
            ['name' => 'Gudang Pusat Jakarta', 'address' => 'Jl. Industri No. 123, Jakarta', 'capacity' => 50000, 'pic' => 'Budi Santoso', 'status' => 'active'],
            ['name' => 'Gudang Surabaya', 'address' => 'Jl. Raya Surabaya No. 456, Surabaya', 'capacity' => 35000, 'pic' => 'Bambang Irawan', 'status' => 'active'],
            ['name' => 'Gudang Bandung', 'address' => 'Jalan Mangga No. 789, Bandung', 'capacity' => 25000, 'pic' => 'Citra Dewi', 'status' => 'active'],
            ['name' => 'Gudang Medan', 'address' => 'Jl. Gatot Subroto No. 101, Medan', 'capacity' => 20000, 'pic' => 'Eka Putra', 'status' => 'active'],
            ['name' => 'Gudang Yogyakarta', 'address' => 'Jl. Ahmad Yani No. 202, Yogyakarta', 'capacity' => 15000, 'pic' => 'Fajar Rahman', 'status' => 'active'],
            ['name' => 'Gudang Semarang', 'address' => 'Jl. Diponegoro No. 303, Semarang', 'capacity' => 18000, 'pic' => 'Gita Mandira', 'status' => 'active'],
            ['name' => 'Gudang Makassar', 'address' => 'Jl. Sultan Hasanuddin No. 404, Makassar', 'capacity' => 12000, 'pic' => 'Hendra Wijaya', 'status' => 'nonactive'],
            ['name' => 'Gudang Palembang', 'address' => 'Jl. Sudirman No. 505, Palembang', 'capacity' => 16000, 'pic' => 'Indah Kusuma', 'status' => 'active'],
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::create($warehouse);
        }
    }
}
