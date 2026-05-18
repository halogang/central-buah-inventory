<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OpnameStockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'opname_stock_id',
        'item_id',
        'system_stock',
        'physical_stock',
        'difference'
    ];

    protected $casts = [
        'system_stock' => 'decimal:3',
        'physical_stock' => 'decimal:3',
        'difference' => 'decimal:3',
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