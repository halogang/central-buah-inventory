<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeliveryOrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'delivery_order_id',
        'item_id',
        'quantity',
        'bad_stock',
        'unit_price',
        'price',
        'cart_id',
        'cart_weight',
        'cart_qty',
    ];

    protected $casts = [
        'quantity' => 'decimal:3',
        'bad_stock' => 'decimal:3',
        'unit_price' => 'decimal:2',
        'price' => 'decimal:2',
        'cart_weight' => 'decimal:3',
        'cart_qty' => 'decimal:3',
    ];

    public function deliveryOrder()
    {
        return $this->belongsTo(DeliveryOrder::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}