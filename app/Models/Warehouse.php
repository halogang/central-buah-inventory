<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class Warehouse extends Model
{
    protected $fillable = [
        'name',
        'address',
        'user_id',
        'branch_id',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function stockOpnames()
    {
        return $this->hasMany(OpnameStock::class);
    }

    public function stockMovement()
    {
        return $this->hasOne(StockMovement::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
