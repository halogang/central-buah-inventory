<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OpnameStockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_opname_id',
        'item_id',
        'system_stock',
        'physical_stock',
        'difference'
    ];

    public function opnameStock()
    {
        return $this->belongsTo(OpnameStock::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}