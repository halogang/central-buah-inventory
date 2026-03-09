<?php

namespace Database\Seeders;

use App\Models\Cart;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $carts = [
            ['name' => 'Keranjang Apel', 'unit_id' => 1, 'weight' => 5],
            ['name' => 'Keranjang Jambu', 'unit_id' => 1, 'weight' => 4],
            ['name' => 'Keranjang Durian', 'unit_id' => 1, 'weight' => 6],
            ['name' => 'Keranjang Pisang', 'unit_id' => 1, 'weight' => 7],
            ['name' => 'Keranjang Kayu', 'unit_id' => 1, 'weight' => 3],
        ];

        foreach($carts as $cart)
        {
            Cart::create($cart);
        }
    }
}
