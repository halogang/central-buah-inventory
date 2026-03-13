<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OpnameStock extends Model
{
    use HasFactory;

    protected $fillable = [
        'opname_number',
        'date',
        'warehouse_id',
        'user_id',
        'note'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function items()
    {
        return $this->hasMany(OpnameStockItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}