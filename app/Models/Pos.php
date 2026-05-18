<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pos_number',
        'date',
        'user_id',

        'subtotal',
        'discount',
        'tax',
        'total',

        'payment_method',

        'paid_amount',
        'change_amount',

        'type',
        'charge',
    ];

    protected $casts = [
        'date' => 'date',
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'change_amount' => 'decimal:2',
        'charge' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posItems()
    {
        return $this->hasMany(PosItem::class);
    }
}
