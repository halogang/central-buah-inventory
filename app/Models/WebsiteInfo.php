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
        'footer_copyright',
        'hero_image',
        'about_content',
        'about_image'
    ];

    protected $appends = ['hero_image_url', 'about_image_url'];

    public function getHeroImageUrlAttribute()
    {
        return $this->hero_image
            ? asset($this->hero_image)
            : null;
    }

    public function getAboutImageUrlAttribute()
    {
        return $this->about_image
            ? asset($this->about_image)
            : null;
    }
}
