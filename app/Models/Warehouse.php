<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class Warehouse extends Model
{
    protected $fillable = [
        'name',
        'address',
        'capacity',
        'pic',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function stockOpnames()
    {
        return $this->hasMany(StockOpname::class);
    }
}
