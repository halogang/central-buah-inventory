<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'name',
        'category_id',
        'unit_id',
        'warehouse_id',
        'purchase_price',
        'selling_price',
        'stock',
        'min_stock',
        'bad_stock',
    ];
    
    protected $casts = [
        'purchase_price' => 'integer',
        'selling_price' => 'integer',
        'stock' => 'integer',
        'min_stock' => 'integer',
        'bad_stock' => 'integer',
    ];

    protected $appends = ['image_url'];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function deliveryOrderItems()
    {
        return $this->hasMany(DeliveryOrderItem::class);
    }

    public function opnameStockItems()
    {
        return $this->hasMany(OpnameStockItem::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset($this->image)
            : null;
    }
}
