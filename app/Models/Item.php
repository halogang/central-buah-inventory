<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Warehouse;

class Item extends Model
{
    protected $fillable = [
        'icon',
        'name',
        'category_id',
        'unit',
        'warehouse_id',
        'purchase_price',
        'selling_price',
        'stock',
        'min_stock',
        'bad_stock',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
