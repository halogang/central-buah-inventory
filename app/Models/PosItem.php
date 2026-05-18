<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PosItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'pos_id',
        
        'item_id',
        'item_name',
        'unit',
        'discount',
        'subtotal',
        
        'quantity',
        'base_price',
        'price',
        'total'
    ];

    protected $casts = [
        'quantity' => 'decimal:3',
        'base_price' => 'decimal:2',
        'price' => 'decimal:2',
        'discount' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function pos()
    {
        return $this->belongsTo(Pos::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
