<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cart_code',
        'note',
    ];

    public function deliveryOrderItem()
    {
        return $this->hasMany(DeliveryOrderItem::class);
    }
}
