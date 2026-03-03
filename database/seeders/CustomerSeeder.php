<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['name' => 'Toko Indah Jaya', 'phone' => '021-1111111', 'address' => 'Jl. Gatot Subroto No. 1, Jakarta'],
            ['name' => 'Pasar Swalayan Maju', 'phone' => '021-2222222', 'address' => 'Jl. Sudirman No. 2, Jakarta'],
            ['name' => 'Restoran Masakan Nusantara', 'phone' => '021-3333333', 'address' => 'Jl. Thamrin No. 3, Jakarta'],
            ['name' => 'Hotel Megah Prima', 'phone' => '021-4444444', 'address' => 'Jl. Kuningan No. 4, Jakarta'],
            ['name' => 'Cafe Kopi Nikmat', 'phone' => '031-5555555', 'address' => 'Jl. Basuki No. 5, Surabaya'],
            ['name' => 'Warung Mie Surabaya', 'phone' => '031-6666666', 'address' => 'Jl. Embong Malun No. 6, Surabaya'],
            ['name' => 'Supermarket Bandung', 'phone' => '022-7777777', 'address' => 'Jl. Diponegoro No. 7, Bandung'],
            ['name' => 'Toko Kelontong Sentosa', 'phone' => '022-8888888', 'address' => 'Jl. Braga No. 8, Bandung'],
            ['name' => 'Kedai Nasi Gorengan', 'phone' => '0274-9999999', 'address' => 'Jl. Malioboro No. 9, Yogyakarta'],
            ['name' => 'Restoran Padang Asri', 'phone' => '0274-1010101', 'address' => 'Jl. Sosio No. 10, Yogyakarta'],
            ['name' => 'Toko Buah Segar', 'phone' => '024-1111111', 'address' => 'Jl. Pandanaran No. 11, Semarang'],
            ['name' => 'Pasar Besar Semarang', 'phone' => '024-1212121', 'address' => 'Jl. Penggirian No. 12, Semarang'],
            ['name' => 'Hotel Medan Indah', 'phone' => '061-1313131', 'address' => 'Jl. Veteran No. 13, Medan'],
            ['name' => 'Restoran Seafood', 'phone' => '061-1414141', 'address' => 'Jl. Diponegoro No. 14, Medan'],
            ['name' => 'Toko Sayur Makassar', 'phone' => '0411-1515151', 'address' => 'Jl. Ahmad Yani No. 15, Makassar'],
            ['name' => 'Warung Kopi Makassar', 'phone' => '0411-1616161', 'address' => 'Jl. Pettarani No. 16, Makassar'],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
