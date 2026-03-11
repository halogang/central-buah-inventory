<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteInfo;

class WebsiteInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WebsiteInfo::create([
            'nama_usaha' => 'Central Buah Sutomo',

            'alamat' => 'Jl. Sutomo No. 123, Medan, Sumatera Utara',

            'kontak' => '0812-3456-7890',

            'email' => 'centralbuahsutomo@gmail.com',

            'npwp' => '12.345.678.9-123.000',

            'jam_operasional' => '08:00 - 17:00',

            'logo' => null,

            'favicon' => null,

            'link_maps' => 'https://maps.google.com/?q=Central+Buah+Sutomo',

            'facebook' => 'https://facebook.com/centralbuahsutomo',

            'instagram' => 'https://instagram.com/centralbuahsutomo',

            'whatsapp' => '6281234567890',

            'footer_copyright' => '© 2026 Central Buah Sutomo. All rights reserved.',
        ]);
    }
}