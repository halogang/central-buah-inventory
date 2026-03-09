<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteInfo extends Model
{
    protected $fillable = [
        'nama_usaha',
        'alamat',
        'kontak',
        'email',
        'npwp',
        'jam_operasional',
        'logo',
        'favicon',
        'link_maps',
        'facebook',
        'instagram',
        'whatsapp',
        'footer_copyright'
    ];
}
