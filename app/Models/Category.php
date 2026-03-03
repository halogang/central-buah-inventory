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
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
