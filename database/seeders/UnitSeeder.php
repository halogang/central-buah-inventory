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
            ['unit_code' => 'sisir', 'description' => 'Sisir'],
            ['unit_code' => 'biji', 'description' => 'Biji / Buah'],
            ['unit_code' => 'pack', 'description' => 'Pack / Box'],
        ];

        foreach($units as $unit) {
            Unit::create($unit);
        }
    }
}
