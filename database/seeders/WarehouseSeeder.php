<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $spv = User::where('username', 'spv_gudang')->first();

        $warehouses = [
            [
                'name' => 'Gudang Pusat Jakarta',
                'address' => 'Jl. Industri No. 123, Jakarta',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Surabaya',
                'address' => 'Jl. Raya Surabaya No. 456, Surabaya',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Bandung',
                'address' => 'Jalan Mangga No. 789, Bandung',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Medan',
                'address' => 'Jl. Gatot Subroto No. 101, Medan',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Yogyakarta',
                'address' => 'Jl. Ahmad Yani No. 202, Yogyakarta',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Semarang',
                'address' => 'Jl. Diponegoro No. 303, Semarang',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Makassar',
                'address' => 'Jl. Sultan Hasanuddin No. 404, Makassar',
                'user_id' => $spv?->id,
                'status' => 'nonactive'
            ],
            [
                'name' => 'Gudang Palembang',
                'address' => 'Jl. Sudirman No. 505, Palembang',
                'user_id' => $spv?->id,
                'status' => 'active'
            ],
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::create($warehouse);
        }
    }
}