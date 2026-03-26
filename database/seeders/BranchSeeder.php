<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = [
            [
                'name' => 'Retail',
                'address' => 'Jl. Lingkar Timur',
                'contact' => '08123456789'
            ],
            [
                'name' => 'Grosir',
                'address' => 'Jl. Lingkar Utara',
                'contact' => '08987654321'
            ],
        ];

        foreach($branches as $branch) {
            Branch::create($branch);
        }
    }
}
