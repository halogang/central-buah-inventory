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
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'stock' => 'decimal:3',
        'min_stock' => 'decimal:3',
        'bad_stock' => 'decimal:3',
    ];

    protected $appends = ['image_url', 'thumbnail_url'];

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

    public function stockMovement()
    {
        return $this->hasOne(StockMovement::class);
    }

    public function posItem()
    {
        return $this->hasMany(PosItem::class);
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
