<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            ['name' => 'CV Buah Tropis', 'phone' => '021-2234567', 'address' => 'Jl. Jatinegara, Jakarta Timur'],
            ['name' => 'PT Agro Mandiri', 'phone' => '031-5678901', 'address' => 'Jl. Karang Pilang, Surabaya'],
            ['name' => 'UD Sayuran Segar', 'phone' => '022-9876543', 'address' => 'Jl. Gardujati, Bandung'],
            ['name' => 'Koperasi Petani Subang', 'phone' => '0260-111222', 'address' => 'Jl. Raya Subang, Subang'],
            ['name' => 'PT Perikanan Maju', 'phone' => '031-4445555', 'address' => 'Jl. Pantai Utara, Surabaya'],
            ['name' => 'CV Roti Berkah', 'phone' => '021-6667777', 'address' => 'Jl. Senen, Jakarta Pusat'],
            ['name' => 'UD Bumbu Nusantara', 'phone' => '0274-222333', 'address' => 'Jl. Malioboro, Yogyakarta'],
            ['name' => 'PT Minuman Segar Abadi', 'phone' => '024-444555', 'address' => 'Jl. MT Haryono, Semarang'],
            ['name' => 'CV Ternak Jaya', 'phone' => '0285-666777', 'address' => 'Jl. Raya Cirebon, Cirebon'],
            ['name' => 'UD Daging Premium', 'phone' => '0711-888999', 'address' => 'Jl. Demang Lebar Daun, Palembang'],
            ['name' => 'Koperasi Nelayan Muara', 'phone' => '0411-111222', 'address' => 'Jl. Pelabuhan, Makassar'],
            ['name' => 'PT Hasil Bumi Nusantara', 'phone' => '0261-333444', 'address' => 'Jl. Raya Cianjur, Cianjur'],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
