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

            'alamat' => 'Jl. Dr. Soetomo, Cikento, Gunungsimping, Kec. Cilacap Tengah, Kabupaten Cilacap, Jawa Tengah 53211',

            'kontak' => '081327346635',

            'email' => 'centralbuahsutomo@gmail.com',

            'npwp' => '12.345.678.9-123.000',

            'jam_operasional' => '08:00 - 17:00',

            'logo' => null,

            'favicon' => null,

            'link_maps' => 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d374.36859189116336!2d109.07988371199855!3d-7.356117940528571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sid!4v1773282524767!5m2!1sen!2sid',

            'facebook' => 'https://facebook.com/centralbuahsutomo',

            'instagram' => 'https://instagram.com/centralbuahsutomo',

            'whatsapp' => '6281234567890',

            'footer_copyright' => '© 2026 Central Buah Sutomo. All rights reserved.',
        ]);
    }
}