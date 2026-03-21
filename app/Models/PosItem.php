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
        
        'quantity',
        'base_price',
        'price',
        'total'
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
