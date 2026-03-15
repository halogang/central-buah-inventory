<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
        'type',
        'image',
        'icon'
    ];

    protected $appends = ['image_url', 'thumbnail_url'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset($this->image)
            : null;
    }

    public function getThumbnailUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return url(
            dirname($this->image).'/thumb/thumb_'.basename($this->image)
        );
    }
}
