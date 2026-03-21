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
        'status'
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
