<?php

namespace Database\Seeders;

use App\Models\Cart;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    public function run(): void
    {
        $carts = [
            [
                'name' => 'Keranjang Apel',
                'cart_code' => 'CRT-APL-01',
                'note' => 'Kapasitas ±20kg'
            ],
            [
                'name' => 'Keranjang Jambu',
                'cart_code' => 'CRT-JMB-01',
                'note' => 'Kapasitas ±15kg'
            ],
            [
                'name' => 'Keranjang Durian',
                'cart_code' => 'CRT-DRN-01',
                'note' => 'Keranjang khusus durian (kuat)'
            ],
            [
                'name' => 'Keranjang Pisang',
                'cart_code' => 'CRT-PSG-01',
                'note' => 'Keranjang ventilasi'
            ],
            [
                'name' => 'Keranjang Kayu',
                'cart_code' => 'CRT-KYU-01',
                'note' => 'Keranjang distribusi'
            ],
        ];

        foreach ($carts as $cart) {
            Cart::create($cart);
        }
    }
}