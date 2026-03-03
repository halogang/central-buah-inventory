<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            ['name' => 'Tunai', 'icon' => '💵', 'status' => 'active'],
            ['name' => 'Transfer Bank BCA', 'icon' => '🏦', 'status' => 'active'],
            ['name' => 'Transfer Bank Mandiri', 'icon' => '🏦', 'status' => 'active'],
            ['name' => 'QRIS', 'icon' => '📱', 'status' => 'active'],
            ['name' => 'Gopay', 'icon' => '💳', 'status' => 'active'],
            ['name' => 'OVO', 'icon' => '💳', 'status' => 'active'],
        ];

        foreach ($methods as $method) {
            PaymentMethod::create($method);
        }
    }
}
