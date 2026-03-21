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
        'price',
        'cart_id',
        'cart_weight',
        'cart_qty',
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