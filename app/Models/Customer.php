<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
    ];

    public function deliveryOrder()
    {
        return $this->hasMany(DeliveryOrder::class);
    }

    public function invoice()
    {
        return $this->hasMany(Invoice::class);
    }
}
