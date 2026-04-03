<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = [
            ['unit_code' => 'kg', 'description' => 'Kilogram'],
            ['unit_code' => 'pcs', 'description' => 'Piece'],
            ['unit_code' => 'pcs', 'description' => 'Pack / Box'],
        ];

        foreach($units as $unit) {
            Unit::create($unit);
        }
    }
}
