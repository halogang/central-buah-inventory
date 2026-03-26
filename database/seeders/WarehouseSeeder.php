<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $warehouses = [
            [
                'name' => 'Gudang Pusat Jakarta',
                'address' => 'Jl. Industri No. 123, Jakarta',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Surabaya',
                'address' => 'Jl. Raya Surabaya No. 456, Surabaya',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Bandung',
                'address' => 'Jalan Mangga No. 789, Bandung',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Medan',
                'address' => 'Jl. Gatot Subroto No. 101, Medan',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Yogyakarta',
                'address' => 'Jl. Ahmad Yani No. 202, Yogyakarta',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Semarang',
                'address' => 'Jl. Diponegoro No. 303, Semarang',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
            [
                'name' => 'Gudang Makassar',
                'address' => 'Jl. Sultan Hasanuddin No. 404, Makassar',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'nonactive'
            ],
            [
                'name' => 'Gudang Palembang',
                'address' => 'Jl. Sudirman No. 505, Palembang',
                'branch_id' => random_int(1, 2),
                'user_id' => '',
                'status' => 'active'
            ],
        ];

        $spvUsers = User::with('roles')
                    ->whereHas('roles', function ($q) {
                        $q->where('name', 'spv_gudang');
                    })
                    ->get();

        foreach ($warehouses as $warehouse) {
            $warehouse['user_id'] = $spvUsers->random()->id;

            Warehouse::create($warehouse);
        }
    }
}